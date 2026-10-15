import fs from "node:fs";
import path from "node:path";

import prompts from "prompts";

import { loadConfig, type ResolvedEaConfig } from "../lib/config";
import { regenerateAggregateEntry } from "../lib/aggregate";
import {
  normalizeName,
  toPascalCase,
  type NormalizedName,
} from "../lib/naming";
import { renderTemplate, type RenderContext } from "../lib/template";
import { c, info, success, warn } from "../lib/output";

export interface AddOptions {
  with?: string[];
  summary?: string;
  internal?: boolean;
  dryRun?: boolean;
  yes?: boolean;
}

/** 计划写入的单个文件 */
interface PlannedFile {
  abs: string;
  content: string;
}

/** 归一化后的组件信息（含渲染所需字段） */
interface NamedComponent extends NormalizedName {
  /** Pascal 裸类名（去前缀），如 Button */
  pascal: string;
}

/** commander variadic 选项按逗号再切一刀，逐项 trim */
function splitNames(raw?: string[]): string[] {
  return (raw ?? [])
    .flatMap(v => v.split(","))
    .map(v => v.trim())
    .filter(Boolean);
}

/**
 * add 前置校验：写操作要求完整配置
 */
function requirePrefix(cfg: ResolvedEaConfig): string {
  if (!cfg.project.prefix) {
    throw new Error(
      'ea add 需要完整配置：ea.config.json 缺少 project.prefix（prefix 是类名/标签名生成的前提）。请配置后重试，如 "prefix": "ea"'
    );
  }
  return cfg.project.prefix;
}

/**
 * 版本号解析(@since)：从目标组件目录向上找最近的 package.json 读其 version；
 * 找不到回退 unknown 并由调用方提示。
 */
function detectComponentVersion(startDir: string): string {
  let dir = path.resolve(startDir);
  for (;;) {
    const pkg = path.join(dir, "package.json");
    if (fs.existsSync(pkg)) {
      try {
        const v = JSON.parse(fs.readFileSync(pkg, "utf-8")).version;
        if (typeof v === "string" && v) return v;
      } catch {
        /* 解析失败继续向上查找 */
      }
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return "unknown";
}

/** 名称输入项：hint 常驻示例 + validate 即时报错。 */
function namePrompt(
  message: string,
  prefix: string,
  taken: () => Set<string>
): prompts.PromptObject<string> {
  return {
    type: "text",
    name: "value",
    message,
    hint: `kebab-case，如 my-widget → ${prefix}-my-widget（已有 ${prefix}- 前缀则原样）`,
    validate(input: string) {
      const normalized = normalizeName(input, prefix);

      if ("error" in normalized) return normalized.error;

      if (taken().has(normalized.full))
        return `${normalized.full} 已存在（目录重名）`;
      return true;
    },
  };
}

/** prompts 环节统一入口：无 TTY 时不得挂起等待，直接报错退出（--dry-run 任何环境可预览的前提是参数已给全） */
async function ask(
  questions: prompts.PromptObject<string> | prompts.PromptObject<string>[]
): Promise<Record<string, unknown>> {
  if (!process.stdin.isTTY) {
    throw new Error(
      "非交互环境无法 prompts：请通过命令行参数提供全部输入（如 ea add <name> --summary <text> [--with <sub...>]）"
    );
  }
  return prompts(questions);
}

/** 归一化结果 → 渲染所需的组件信息（补 Pascal 类名） */
function toComponent(n: NormalizedName): NamedComponent {
  return { ...n, pascal: toPascalCase(n.bare) };
}

/**
 * 按 add 的三步问答收集输入
 */
async function collectInputs(
  rawName: string | undefined,
  rawWith: string[],
  rawSummary: string | undefined,
  cfg: ResolvedEaConfig,
  prefix: string
): Promise<{
  main: NamedComponent;
  subs: NamedComponent[];
  summary: string;
} | null> {
  const existing = existingComponentNames(cfg);
  const interactive = !!process.stdin.isTTY;

  // 汇总返回的三项
  let main: NamedComponent;
  const subs: NamedComponent[] = [];
  const seen = new Set<string>(existing);
  let summary = rawSummary ?? "";

  // 1. 主组件名：必填。--name 位置参数即时校验；交互经 validate 兜底后再归一化
  if (rawName) {
    const normalized = normalizeName(rawName, prefix);

    if ("error" in normalized)
      throw new Error(`组件名非法：${normalized.error}`);

    if (existing.has(normalized.full))
      throw new Error(`组件 ${normalized.full} 已存在（目录重名）`);

    main = toComponent(normalized);
  } else {
    const answer = await ask(
      namePrompt("组件名（kebab-case）", prefix, () => existing)
    );
    if (answer.value === undefined) return null;

    const normalized = normalizeName(answer.value as string, prefix);
    /* v8 ignore next -- validate 已即时拦截非法，此处兜底 */
    if ("error" in normalized) return null;

    main = toComponent(normalized);
  }

  seen.add(main.full);

  // 2. 附属组件名：可选。--with 一次性校验全部；交互逐个询问、可循环添加；非 TTY 视为无附属
  if (rawWith.length > 0) {
    for (const raw of rawWith) {
      const normalized = normalizeName(raw, prefix);

      if ("error" in normalized)
        throw new Error(`附属组件名非法：${normalized.error}`);

      if (seen.has(normalized.full)) {
        throw new Error(
          `附属组件 ${normalized.full} 与主组件/其他附属组件/现有目录重名`
        );
      }

      seen.add(normalized.full);
      subs.push(toComponent(normalized));
    }
  } else if (interactive) {
    const { more } = await prompts({
      type: "confirm",
      name: "more",
      message: "是否包含附属组件？",
      initial: false,
    });
    if (more === undefined) return null;

    let keepGoing = more;
    while (keepGoing) {
      const answer = await prompts(
        namePrompt(
          "附属组件名（kebab-case，独立完整标签名）",
          prefix,
          () => seen
        )
      );
      if (answer.value === undefined) return null;

      const normalized = normalizeName(answer.value as string, prefix);
      /* v8 ignore next -- validate 已即时拦截非法，此处兜底 */
      if ("error" in normalized) return null;
      seen.add(normalized.full);
      subs.push(toComponent(normalized));

      const next = await prompts({
        type: "confirm",
        name: "next",
        message: "继续添加附属组件？",
        initial: false,
      });
      if (next.next === undefined) return null;
      keepGoing = !!next.next;
    }
  }

  // 3. 组件摘要：可选。--summary 直用；交互缺省询问（可留空）；非 TTY 留空
  if (!summary && interactive) {
    const answer = await prompts({
      type: "text",
      name: "value",
      message: "组件摘要（@summary JSDoc，可留空）",
    });
    if (answer.value === undefined) return null;
    summary = String(answer.value).trim();
  }

  return { main, subs, summary };
}

/** 现有组件目录名集合（全部 componentDirs 一层子目录，重名检测用） */
function existingComponentNames(cfg: ResolvedEaConfig): Set<string> {
  const names = new Set<string>();
  for (const root of cfg.project.componentDirs) {
    if (!fs.existsSync(root.path)) continue;
    for (const entry of fs.readdirSync(root.path, { withFileTypes: true })) {
      if (entry.isDirectory()) names.add(entry.name);
    }
  }
  return names;
}

/** 组件渲染上下文：由归一化名与版本组装语义 token 所需的完整字段 */
function makeContext(
  prefix: string,
  version: string,
  comp: NamedComponent,
  summary: string
): RenderContext {
  const prefixPascal = toPascalCase(prefix);
  return {
    tagName: comp.full,
    className: `${prefixPascal}${comp.pascal}`,
    summary,
    version,
    name: comp.bare,
    namePascal: comp.pascal,
    prefix,
    prefixPascal,
  };
}

/** 生成写入计划：单组件三件套 / 复合组件（entry 薄出口 + components/ 附属实现） */
function buildPlan(
  cfg: ResolvedEaConfig,
  prefix: string,
  main: NamedComponent,
  subs: NamedComponent[],
  summary: string,
  useInternal: boolean
): PlannedFile[] {
  const targetRoot = resolveTargetRoot(cfg, useInternal);
  const dir = path.join(targetRoot, main.full);
  const version = detectComponentVersion(dir);
  if (version === "unknown") {
    warn(
      "⚠ 未找到组件所在包的 package.json version，@since 写入 unknown，请生成后手动补全"
    );
  }
  const ctx = makeContext(prefix, version, main, summary);
  const composite = subs.length > 0;
  const pascalPrefix = toPascalCase(prefix);

  const files: PlannedFile[] = [];
  const scssOf = (implDir: string, implCtx: RenderContext) => ({
    abs: path.join(implDir, "index.scss"),
    content: renderTemplate("component.scss.tpl", cfg, implCtx),
  });
  const implOf = (implDir: string, implCtx: RenderContext) => ({
    abs: path.join(implDir, "index.ts"),
    content: renderTemplate("component.ts.tpl", cfg, implCtx, true),
  });

  if (composite) {
    // 薄主出口：___SUB_IMPORTS___ = 附属组件 import 块，___EXPORT_LIST___ = 主类 + 附属类名列表（复合主目录无顶层 scss）
    const allClasses = [main, ...subs].map(c => `${pascalPrefix}${c.pascal}`);
    const entryCtx: RenderContext = {
      ...ctx,
      subImports: subs
        .map(
          s =>
            `import { ${pascalPrefix}${s.pascal} } from "./components/${s.full}";`
        )
        .join("\n"),
      exportList: allClasses.join(", "),
    };
    
    files.push({
      abs: path.join(dir, "index.ts"),
      content: renderTemplate("entry.ts.tpl", cfg, entryCtx),
    });
    // 主实现与附属实现均为截断渲染（保留 TagNameMap 自声明，无值导出段），各自用自身名称上下文
    files.push(implOf(path.join(dir, "components", main.full), ctx));
    files.push(scssOf(path.join(dir, "components", main.full), ctx));
    for (const s of subs) {
      const sctx = makeContext(prefix, version, s, "");
      files.push(implOf(path.join(dir, "components", s.full), sctx));
      files.push(scssOf(path.join(dir, "components", s.full), sctx));
    }
  } else {
    files.push({
      abs: path.join(dir, "index.ts"),
      content: renderTemplate("component.ts.tpl", cfg, {
        ...ctx,
        exportDefault: `export default ${ctx.className};\n`,
      }),
    });
    files.push(scssOf(dir, ctx));
  }

  files.push({
    abs: path.join(dir, `${main.full}.test.ts`),
    content: renderTemplate("component.test.ts.tpl", cfg, ctx),
  });
  return files;
}

/** 目标根目录：--internal 取第一个 internal 目录，否则第一个公开目录 */
function resolveTargetRoot(
  cfg: ResolvedEaConfig,
  useInternal: boolean
): string {
  if (useInternal) {
    const internal = cfg.project.componentDirs.find(d => d.internal);
    if (!internal) {
      throw new Error(
        "--internal 需要 componentDirs 中配置 internal: true 的内部组件目录"
      );
    }
    return internal.path;
  }

  const publicDir = cfg.project.componentDirs.find(d => !d.internal);
  if (!publicDir) {
    throw new Error("componentDirs 中不存在公开组件目录");
  }
  
  return publicDir.path;
}

/** 整体预览：归一化回显 + 相对组件根目录的文件树 + 聚合入口新增行（与 confirm / --dry-run 同构复用） */
function renderPreview(
  prefix: string,
  main: NamedComponent,
  subs: NamedComponent[],
  files: PlannedFile[],
  entryLine: string
): string {
  const pascalPrefix = toPascalCase(prefix);
  const composite = subs.length > 0;
  const baseDir = path.dirname(files[0].abs);
  // 相对组件根目录的短路径，交由目录树呈现层级，避免整条 cwd 前缀刷屏
  const relPaths = files.map(f =>
    path.relative(baseDir, f.abs).split(path.sep).join("/")
  );

  const header = `${c.green("✓")} ${c.bold(`${pascalPrefix}${main.pascal}`)} ${c.dim(
    "/"
  )} ${main.full} ${c.dim("·")} ${composite ? "复合组件" : "单组件"}`;
  const dirLine = `  ${rel(baseDir)}/`;

  return [
    "",
    header,
    "",
    dirLine,
    "",
    renderTree(relPaths),
    "",
    `${c.dim("聚合入口: ")}${entryLine}`,
    "",
  ].join("\n");
}

/** 由相对路径列表渲染目录树：box-drawing 字符，无外部依赖，颜色仅在 TTY 生效 */
function renderTree(relPaths: string[]): string {
  interface Node {
    dirs: Map<string, Node>;
    files: string[];
  }
  const root: Node = { dirs: new Map(), files: [] };
  for (const p of relPaths) {
    const parts = p.split("/");
    let cur = root;
    for (let i = 0; i < parts.length - 1; i++) {
      const seg = parts[i];
      let next = cur.dirs.get(seg);
      if (!next) {
        next = { dirs: new Map(), files: [] };
        cur.dirs.set(seg, next);
      }
      cur = next;
    }
    cur.files.push(parts[parts.length - 1]);
  }

  const lines: string[] = [];
  const walk = (node: Node, indent: string): void => {
    const entries = [
      ...[...node.dirs.keys()].map(name => ({ dir: true, name })),
      ...node.files.map(name => ({ dir: false, name })),
    ].sort((a, b) => a.name.localeCompare(b.name));
    entries.forEach((e, idx) => {
      const last = idx === entries.length - 1;
      const branch = c.dim(last ? "└── " : "├── ");
      if (e.dir) {
        lines.push(`${indent}${branch}${c.cyan(`${e.name}/`)}`);
        walk(node.dirs.get(e.name)!, `${indent}${last ? "    " : c.dim("│   ")}`);
      } else {
        lines.push(`${indent}${branch}${e.name}`);
      }
    });
  };
  walk(root, "  ");
  return lines.join("\n");
}

function rel(abs: string): string {
  return path.relative(process.cwd(), abs).split(path.sep).join("/");
}

/** 聚合入口将新增的再导出行（镜像组件 index.ts 的具名值导出） */
function previewEntryLine(
  prefix: string,
  main: NamedComponent,
  subs: NamedComponent[]
): string {
  const pascalPrefix = toPascalCase(prefix);
  const names = [main, ...subs].map(c => `${pascalPrefix}${c.pascal}`);
  return `export { ${names.join(", ")} } from "./${main.full}";`;
}

export async function runAdd(
  name: string | undefined,
  options: AddOptions = {}
): Promise<void> {
  const cfg = loadConfig();
  const prefix = requirePrefix(cfg);
  const dryRun = !!options.dryRun;
  const subs = splitNames(options.with);

  const inputs = await collectInputs(name, subs, options.summary, cfg, prefix);
  if (!inputs) {
    info("已取消：交互输入中止，未写入任何文件");
    return;
  }
  const { main, summary } = inputs;

  const files = buildPlan(
    cfg,
    prefix,
    main,
    inputs.subs,
    summary,
    !!options.internal
  );
  const entryLine = previewEntryLine(prefix, main, inputs.subs);

  // 写盘前防呆：目标组件目录已存在即中止（重名检测后的二次保险，不覆盖存量文件）
  const dir = path.dirname(files[0].abs);
  if (fs.existsSync(dir)) {
    throw new Error(`目标目录已存在：${rel(dir)}，已中止（不覆盖存量文件）`);
  }

  info(renderPreview(prefix, main, inputs.subs, files, entryLine));

  if (dryRun) {
    info("\n--dry-run：未写入任何文件");
    return;
  }

  // --yes：跳过写盘前确认（脚本/CI 非交互场景；仍要求全部输入已由参数给全）
  if (!options.yes) {
    const { confirmed } = await ask({
      type: "confirm",
      name: "confirmed",
      message: "确认写入以上文件？",
      initial: true,
    });
    if (!confirmed) {
      /* v8 ignore next -- 非 TTY 时 ask 已报错，此处仅处理用户主动拒绝写入 */
      info("已取消写入，未写入任何文件");
      return;
    }
  }

  for (const f of files) {
    fs.mkdirSync(path.dirname(f.abs), { recursive: true });
    fs.writeFileSync(f.abs, f.content);
    success(`✓ 已写入 ${rel(f.abs)}`);
  }

  regenerateAggregateEntry(cfg);
  success(`✓ 聚合入口已重建（新增：${entryLine}）`);
}
