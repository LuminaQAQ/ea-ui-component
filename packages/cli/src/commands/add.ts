import fs from "node:fs";
import path from "node:path";

import prompts from "prompts";

import {
  loadConfig,
  type ResolvedEaConfig,
  type ResolvedComponentDir,
} from "../lib/config";
import {
  aggregateLineForSource,
  regenerateAggregateEntry,
} from "../lib/aggregate";
import {
  findBarrelMainClass,
  findClassNames,
  findComponentsImportLine,
  findDefaultObjectExportLine,
  findDynamicRelativeImports,
  findLocalNamedExportLine,
  isThinBarrel,
  rewriteRelativeSpecifierDepths,
} from "../lib/source";
import {
  normalizeName,
  toPascalCase,
  type NormalizedName,
} from "../lib/naming";
import { renderTemplate, type RenderContext } from "../lib/template";
import { c, info, success, warn } from "../lib/output";

export interface AddOptions {
  with?: string[];
  parts?: string[];
  summary?: string;
  internal?: boolean;
  /** 目标组件目录：匹配 componentDirs 候选的 label 或 path（多候选非交互场景必填） */
  dir?: string;
  /** 追加模式：向已存在组件追加附属组件 */
  under?: string;
  /** 追加模式下的附属可见性（公开进薄出口 export 列表；缺省私有） */
  public?: boolean;
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
  /** 是否对外暴露 */
  expose: boolean;
}

interface UnderPlan {
  /** barrel=目标已是薄根复合（纯增量追加）；single=单组件（按需复合化转换） */
  shape: "barrel" | "single";
  dir: string;
  subClass: string;
  mainClass: string;
  /** 目录搬迁（仅 single 形态非空） */
  moves: { from: string; to: string }[];
  /** 搬迁后需删除的原位置文件（仅 single 形态可能有） */
  deletes: string[];
  /** 将写入的文件（含薄根 index.ts 终态） */
  files: PlannedFile[];
  rootPath: string;
  rootContent: string;
  /** 相对导入深度改写记录（预览展示） */
  rewrites: string[];
  /** 落盘后聚合入口的再导出行（私有附属不影响，保持原值） */
  entryLine: string | null;
}

/** commander variadic 选项按逗号逐项 trim */
export function splitNames(raw?: string[]): string[] {
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

/** 名称输入项：hint 常驻示例 + validate 即时报错 */
export function namePrompt(
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
export async function ask(
  questions: prompts.PromptObject<string> | prompts.PromptObject<string>[]
): Promise<Record<string, unknown>> {
  if (!process.stdin.isTTY) {
    throw new Error(
      "非交互环境无法 prompts：请通过命令行参数提供全部输入（如 ea add <name> --summary <text> [--with <sub...>]）"
    );
  }
  return prompts(questions);
}

/** 归一化结果 → 渲染所需的组件信息（补 Pascal 类名与暴露标记） */
function toComponent(n: NormalizedName, expose = true): NamedComponent {
  return { ...n, pascal: toPascalCase(n.bare), expose };
}

/**
 * 按 add 的三步问答收集输入
 */
async function collectInputs(
  rawName: string | undefined,
  publicNames: string[],
  partNames: string[],
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

  // 2. 子组件名：可选。--with = 对外暴露的附属组件；--parts = 私有组件（不暴露）；交互逐个询问后复选暴露
  const pushFlagged = (list: string[], expose: boolean, label: string) => {
    for (const raw of list) {
      const normalized = normalizeName(raw, prefix);

      if ("error" in normalized)
        throw new Error(`${label}名非法：${normalized.error}`);

      if (seen.has(normalized.full)) {
        throw new Error(
          `${label} ${normalized.full} 与主组件/其他子组件/现有目录重名`
        );
      }

      seen.add(normalized.full);
      subs.push(toComponent(normalized, expose));
    }
  };

  if (publicNames.length > 0 || partNames.length > 0) {
    pushFlagged(publicNames, true, "附属组件");
    pushFlagged(partNames, false, "私有组件");
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
      subs.push(toComponent(normalized, true));

      const next = await prompts({
        type: "confirm",
        name: "next",
        message: "继续添加附属组件？",
        initial: false,
      });
      if (next.next === undefined) return null;
      keepGoing = !!next.next;
    }

    // 复选对外暴露：勾选 = 公共子元素（进 barrel + 聚合），未选 = 私有组件（仅主实现副作用注册）
    if (subs.length > 0) {
      const { exposed } = await prompts({
        type: "multiselect",
        name: "exposed",
        message: "勾选对外暴露的组件（未选择则作为私有组件）",
        choices: subs.map(s => ({
          title: s.full,
          value: s.full,
          selected: true,
        })),
        hint: "空格切换 / a 全选 / i 反选",
      });
      if (exposed === undefined) return null;
      const set = new Set<string>(exposed as string[]);
      for (const s of subs) s.expose = set.has(s.full);
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

/** 生成写入计划：单组件三件套 / 复合组件（entry 薄出口 + components/ 附属实现）/ 含私有组件（--parts，仅主实现副作用注册、不进出口） */
function buildPlan(
  cfg: ResolvedEaConfig,
  prefix: string,
  main: NamedComponent,
  subs: NamedComponent[],
  summary: string,
  targetRoot: string
): PlannedFile[] {
  const dir = path.join(targetRoot, main.full);
  const version = detectComponentVersion(dir);
  if (version === "unknown") {
    warn(
      "⚠ 未找到组件所在包的 package.json version，@since 写入 unknown，请生成后手动补全"
    );
  }
  const ctx = makeContext(prefix, version, main, summary);
  const publicSubs = subs.filter(s => s.expose);
  const internalParts = subs.filter(s => !s.expose);
  const hasBarrel = publicSubs.length > 0;
  const pascalPrefix = toPascalCase(prefix);
  // 私有组件：主实现里以副作用 import 注册，并在 JSDoc 追加 @dependency 文档行
  const internalDeps = internalParts
    .map(p => `import "./components/${p.full}/index";`)
    .join("\n");
  const dependency = internalParts.length
    ? internalParts.map(p => ` * @dependency ${p.full}`).join("\n") + "\n *"
    : "";
  const mainImplCtx: RenderContext = { ...ctx, internalDeps, dependency };

  const files: PlannedFile[] = [];
  const scssOf = (implDir: string, implCtx: RenderContext) => ({
    abs: path.join(implDir, "index.scss"),
    content: renderTemplate("component.scss.tpl", cfg, implCtx),
  });
  const implOf = (implDir: string, implCtx: RenderContext) => ({
    abs: path.join(implDir, "index.ts"),
    content: renderTemplate("component.ts.tpl", cfg, implCtx, true),
  });

  // 私有组件实现生成器
  const genPart = (p: NamedComponent) => {
    const pctx = makeContext(prefix, version, p, "");
    files.push(implOf(path.join(dir, "components", p.full), pctx));
    files.push(scssOf(path.join(dir, "components", p.full), pctx));
  };

  if (hasBarrel) {
    // 薄主出口：仅聚合主类 + 对外暴露的附属组件
    const allClasses = [main, ...publicSubs].map(
      c => `${pascalPrefix}${c.pascal}`
    );
    const entryCtx: RenderContext = {
      ...ctx,
      subImports: publicSubs
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
    // 主实现带私有组件副作用注册依赖（保留 TagNameMap 自声明，无值导出段）；附属实现各自独立
    files.push(implOf(path.join(dir, "components", main.full), mainImplCtx));
    files.push(scssOf(path.join(dir, "components", main.full), mainImplCtx));
    for (const s of publicSubs) {
      const sctx = makeContext(prefix, version, s, "");
      files.push(implOf(path.join(dir, "components", s.full), sctx));
      files.push(scssOf(path.join(dir, "components", s.full), sctx));
    }
    for (const p of internalParts) genPart(p);
  } else if (internalParts.length > 0) {
    // 单组件根 + 私有组件：根只具名导出主类，主实现副作用注册私有组件
    files.push({
      abs: path.join(dir, "index.ts"),
      content: renderTemplate("component.ts.tpl", cfg, {
        ...mainImplCtx,
        exportDefault: `export default ${ctx.className};\n`,
      }),
    });
    files.push(scssOf(dir, ctx));
    for (const p of internalParts) genPart(p);
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

/** 候选组件目录的显示文案：对象项优先 label，缺省回落相对 cwd 的路径 */
function dirLabel(d: ResolvedComponentDir): string {
  return d.label ?? rel(d.path);
}

/**
 * 目标组件目录解析：按 --internal 分流候选集，--dir 按 label 或 path 匹配；
 * 唯一候选直接采用，多候选 TTY 单选、非交互缺 --dir 报错；取消返回 null。
 */
async function resolveTargetRoot(
  cfg: ResolvedEaConfig,
  useInternal: boolean,
  dirArg?: string
): Promise<string | null> {
  const candidates = cfg.project.componentDirs.filter(
    d => d.internal === useInternal
  );
  if (candidates.length === 0) {
    throw new Error(
      useInternal
        ? "--internal 需要 componentDirs 中配置 internal: true 的内部组件目录"
        : "componentDirs 中不存在公开组件目录"
    );
  }

  if (dirArg) {
    const abs = path.resolve(process.cwd(), dirArg);
    const hit = candidates.find(d => dirLabel(d) === dirArg || d.path === abs);
    if (!hit) {
      throw new Error(
        `--dir "${dirArg}" 未匹配任何候选组件目录（可选：${candidates
          .map(dirLabel)
          .join("、")}）`
      );
    }
    return hit.path;
  }

  if (candidates.length === 1) return candidates[0].path;

  if (!process.stdin.isTTY) {
    throw new Error(
      `存在多个候选组件目录（${candidates
        .map(dirLabel)
        .join("、")}），非交互环境需用 --dir <label|path> 指定目标目录`
    );
  }

  const { picked } = await ask({
    type: "select",
    name: "picked",
    message: "选择目标组件目录",
    choices: candidates.map(d => ({ title: dirLabel(d), value: d.path })),
  });
  if (picked === undefined) return null;
  return picked as string;
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
  const publicSubs = subs.filter(s => s.expose);
  const internalParts = subs.filter(s => !s.expose);
  const baseDir = path.dirname(files[0].abs);
  // 相对组件根目录的短路径，交由目录树呈现层级，避免整条 cwd 前缀刷屏
  const relPaths = files.map(f =>
    path.relative(baseDir, f.abs).split(path.sep).join("/")
  );

  let kind: string;
  if (publicSubs.length > 0 && internalParts.length > 0)
    kind = `复合组件 + ${internalParts.length} 私有组件`;
  else if (publicSubs.length > 0) kind = "复合组件";
  else if (internalParts.length > 0)
    kind = `单组件 + ${internalParts.length} 私有组件`;
  else kind = "单组件";

  const header = `${c.green("✓")} ${c.bold(`${pascalPrefix}${main.pascal}`)} ${c.dim(
    "/"
  )} ${main.full} ${c.dim("·")} ${kind}`;
  const dirLine = `  ${rel(baseDir)}/`;

  const internalDirs = new Set(internalParts.map(p => p.full));

  return [
    "",
    header,
    "",
    dirLine,
    "",
    renderTree(relPaths, internalDirs),
    "",
    `${c.dim("聚合入口: ")}${entryLine}`,
    "",
  ].join("\n");
}

/** 由相对路径列表渲染目录树：box-drawing 字符，无外部依赖，颜色仅在 TTY 生效；internalDirs 命中的目录标注“私有组件” */
export function renderTree(
  relPaths: string[],
  internalDirs?: Set<string>
): string {
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
        const mark = internalDirs?.has(e.name) ? c.dim("  # 私有组件") : "";
        lines.push(`${indent}${branch}${c.cyan(`${e.name}/`)}${mark}`);
        walk(
          node.dirs.get(e.name)!,
          `${indent}${last ? "    " : c.dim("│   ")}`
        );
      } else {
        lines.push(`${indent}${branch}${e.name}`);
      }
    });
  };
  walk(root, "  ");
  return lines.join("\n");
}

/** 绝对路径 → 相对 cwd 的展示路径（统一正斜杠） */
export function rel(abs: string): string {
  return path.relative(process.cwd(), abs).split(path.sep).join("/");
}

/** 聚合入口将新增的再导出行（镜像组件 index.ts 的具名值导出） */
function previewEntryLine(
  prefix: string,
  main: NamedComponent,
  subs: NamedComponent[]
): string {
  const pascalPrefix = toPascalCase(prefix);
  const names = [main, ...subs.filter(s => s.expose)].map(
    c => `${pascalPrefix}${c.pascal}`
  );
  return `export { ${names.join(", ")} } from "./${main.full}";`;
}

/** 全库组件目录查找：目标可位于任何 componentDirs（公开或 internal） */
function findComponentDirAnywhere(
  cfg: ResolvedEaConfig,
  full: string
): string | null {
  for (const root of cfg.project.componentDirs) {
    const candidate = path.join(root.path, full);
    if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory())
      return candidate;
  }
  return null;
}

/** 目标组件全名解析：输入原样或归一化后命中现有目录均可 */
function resolveExistingName(
  cfg: ResolvedEaConfig,
  raw: string,
  prefix: string
): string {
  const trimmed = raw.trim();
  const candidates = [trimmed];
  const normalized = normalizeName(trimmed, prefix);
  if (!("error" in normalized)) candidates.push(normalized.full);
  for (const candidate of candidates) {
    if (findComponentDirAnywhere(cfg, candidate)) return candidate;
  }
  throw new Error(
    `追加对象 ${trimmed} 不存在（--under 要求目标组件已存在；新组件请用普通 ea add）`
  );
}

/** 向 `export { ... }` / `export default { ... }` 行的花括号列表追加名字；无花括号返回 null */
function addNameToBraces(line: string, name: string): string | null {
  const open = line.indexOf("{");
  const close = line.lastIndexOf("}");
  if (open === -1 || close === -1 || close < open) return null;
  const inner = line
    .slice(open + 1, close)
    .trim()
    .replace(/,\s*$/, "");
  return `${line.slice(0, open + 1)} ${inner ? `${inner}, ` : ""}${name} ${line.slice(close)}`;
}

/** 薄根追加附属组件：公开进具名 import 与出口列表，私有仅侧效应 import 注册 */
function appendSubToBarrel(
  src: string,
  sub: NamedComponent,
  isPublic: boolean,
  pascalPrefix: string
): string {
  const subClass = `${pascalPrefix}${sub.pascal}`;
  const importLine = isPublic
    ? `import { ${subClass} } from "./components/${sub.full}";`
    : `import "./components/${sub.full}";`;

  const eol = src.includes("\r\n") ? "\r\n" : "\n";
  const lines = src.split(/\r?\n/);

  // AST 定位插入点与出口行；插入 import 后其后的行号 +1
  const lastComponentsImport = findComponentsImportLine(src);
  const insertAt = lastComponentsImport >= 0 ? lastComponentsImport + 1 : 0;
  let namedIdx = findLocalNamedExportLine(src);
  let defaultIdx = findDefaultObjectExportLine(src);
  if (namedIdx >= insertAt) namedIdx += 1;
  if (defaultIdx >= insertAt) defaultIdx += 1;

  lines.splice(insertAt, 0, importLine);

  if (isPublic) {
    if (namedIdx === -1) {
      throw new Error(
        "薄根出口缺少具名导出列表（export { ... }），无法追加公开附属组件；请手工调整薄根或改用私有（默认）"
      );
    }
    lines[namedIdx] =
      addNameToBraces(lines[namedIdx], subClass) ?? lines[namedIdx];
    if (defaultIdx !== -1)
      lines[defaultIdx] =
        addNameToBraces(lines[defaultIdx], subClass) ?? lines[defaultIdx];
  }
  return lines.join(eol);
}

/** 追加模式写入计划：薄根纯增量追加 / 单组件按需复合化（实现下移 + 生成薄根） */
function buildUnderPlan(
  cfg: ResolvedEaConfig,
  prefix: string,
  existing: string,
  sub: NamedComponent,
  isPublic: boolean,
  summary: string
): UnderPlan {
  const dir = findComponentDirAnywhere(cfg, existing);
  if (!dir)
    throw new Error(
      `追加对象 ${existing} 不存在（--under 要求目标组件已存在）`
    );
  const rootPath = path.join(dir, "index.ts");
  if (!fs.existsSync(rootPath))
    throw new Error(`目标组件 ${existing} 缺少 ${rel(rootPath)}`);

  const version = detectComponentVersion(dir);
  if (version === "unknown") {
    warn(
      "⚠ 未找到组件所在包的 package.json version，@since 写入 unknown，请生成后手动补全"
    );
  }

  const pascalPrefix = toPascalCase(prefix);
  const subClass = `${pascalPrefix}${sub.pascal}`;
  const subCtx = makeContext(prefix, version, sub, summary);
  const files: PlannedFile[] = [
    {
      abs: path.join(dir, "components", sub.full, "index.ts"),
      content: renderTemplate("component.ts.tpl", cfg, subCtx, true),
    },
    {
      abs: path.join(dir, "components", sub.full, "index.scss"),
      content: renderTemplate("component.scss.tpl", cfg, subCtx),
    },
  ];

  const src = fs.readFileSync(rootPath, "utf-8");
  const moves: { from: string; to: string }[] = [];
  const deletes: string[] = [];
  const rewrites: string[] = [];
  let mainClass: string;
  let rootContent: string;

  if (isThinBarrel(src)) {
    mainClass = findBarrelMainClass(src);
    rootContent = appendSubToBarrel(src, sub, isPublic, pascalPrefix);
  } else {
    const exportedClasses = findClassNames(src, true);
    if (exportedClasses.length === 0) {
      throw new Error(
        `无法识别 ${rel(rootPath)} 的主组件类声明，按需复合化中止（请手工调整或改用普通 ea add）`
      );
    }
    mainClass = exportedClasses[0];

    const unrewritable = findDynamicRelativeImports(src);
    if (unrewritable.length > 0) {
      throw new Error(
        [
          `${rel(rootPath)} 含无法自动改写的动态相对导入，按需复合化中止以免生成坏引用。请手工处理后重试：`,
          ...unrewritable.map(line => `  ${line}`),
        ].join("\n")
      );
    }

    const { text: movedImpl, changed } = rewriteRelativeSpecifierDepths(src);
    rewrites.push(...changed);

    const implDir = path.join(dir, "components", existing);
    moves.push({ from: rootPath, to: path.join(implDir, "index.ts") });
    files.push({ abs: path.join(implDir, "index.ts"), content: movedImpl });

    const rootScss = path.join(dir, "index.scss");
    if (fs.existsSync(rootScss)) {
      const target = path.join(implDir, "index.scss");
      moves.push({ from: rootScss, to: target });
      files.push({ abs: target, content: fs.readFileSync(rootScss, "utf-8") });
      deletes.push(rootScss);
    }

    const bare = existing.startsWith(`${prefix}-`)
      ? existing.slice(prefix.length + 1)
      : existing;
    const entryCtx: RenderContext = {
      tagName: existing,
      className: mainClass,
      summary: "",
      version,
      name: bare,
      namePascal: toPascalCase(bare),
      prefix,
      prefixPascal: pascalPrefix,
      subImports: isPublic
        ? `import { ${subClass} } from "./components/${sub.full}";`
        : `import "./components/${sub.full}";`,
      exportList: isPublic ? `${mainClass}, ${subClass}` : mainClass,
    };
    rootContent = renderTemplate("entry.ts.tpl", cfg, entryCtx);
  }

  files.push({ abs: rootPath, content: rootContent });
  const entryLine = aggregateLineForSource(cfg, dir, rootContent);

  return {
    shape: isThinBarrel(src) ? "barrel" : "single",
    dir,
    subClass,
    mainClass,
    moves,
    deletes,
    files,
    rootPath,
    rootContent,
    rewrites,
    entryLine,
  };
}

/** 追加模式预览：形态、目录搬迁、文件树、薄根终态与聚合入口变化 */
function renderUnderPreview(
  plan: UnderPlan,
  existing: string,
  sub: NamedComponent,
  isPublic: boolean
): string {
  const kind =
    plan.shape === "single"
      ? "单组件按需复合化转换"
      : isPublic
        ? "薄根复合 · 追加公开附属"
        : "薄根复合 · 追加私有附属";
  const header = `${c.green("✓")} ${c.bold(plan.subClass)} ${c.dim("/")} ${sub.full} ${c.dim("·")} 追加到 ${existing} ${c.dim(`（${kind}）`)}`;

  const relPaths = plan.files
    .filter(f => f.abs.startsWith(plan.dir + path.sep))
    .map(f => path.relative(plan.dir, f.abs).split(path.sep).join("/"));

  const sections: string[] = ["", header, ""];

  if (plan.moves.length > 0) {
    sections.push(c.dim("目录搬迁:"));
    for (const m of plan.moves)
      sections.push(`  ${rel(m.from)} ${c.dim("→")} ${rel(m.to)}`);
    if (plan.rewrites.length > 0) {
      sections.push(c.dim("相对导入深度改写:"));
      for (const r of plan.rewrites) sections.push(`  ${r}`);
    }
    sections.push("");
  }

  sections.push(
    c.dim("新增文件:"),
    `  ${rel(plan.dir)}/`,
    "",
    renderTree(relPaths),
    ""
  );

  if (plan.shape === "single") {
    sections.push(
      c.dim(`薄根 ${rel(plan.rootPath)} 终态:`),
      ...plan.rootContent
        .replace(/\s+$/, "")
        .split("\n")
        .map(l => `  ${l}`),
      ""
    );
  }

  const entryText = isPublic
    ? (plan.entryLine ?? c.dim("（无具名值导出）"))
    : c.dim("（私有附属不进聚合出口，标签仍由自身 TagNameMap 全局可用）");
  sections.push(`${c.dim("聚合入口: ")}${entryText}`, "");

  return sections.join("\n");
}

/** ea add <sub> --under <existing>：向已存在组件追加附属组件（默认私有，--public 公开） */
async function runAddUnder(
  cfg: ResolvedEaConfig,
  prefix: string,
  rawSub: string,
  options: AddOptions,
  dryRun: boolean
): Promise<void> {
  const existing = resolveExistingName(cfg, options.under!, prefix);
  const normalized = normalizeName(rawSub, prefix);
  if ("error" in normalized)
    throw new Error(`附属组件名非法：${normalized.error}`);

  const dir = findComponentDirAnywhere(cfg, existing)!;
  if (existingComponentNames(cfg).has(normalized.full)) {
    throw new Error(`附属组件 ${normalized.full} 与现有组件目录重名`);
  }
  if (fs.existsSync(path.join(dir, "components", normalized.full))) {
    throw new Error(`${existing}/components/${normalized.full} 已存在`);
  }

  const isPublic = !!options.public;
  const sub = toComponent(normalized, isPublic);
  const plan = buildUnderPlan(
    cfg,
    prefix,
    existing,
    sub,
    isPublic,
    options.summary ?? ""
  );

  info(renderUnderPreview(plan, existing, sub, isPublic));

  if (dryRun) {
    info("\n--dry-run：未写入任何文件");
    return;
  }

  if (!options.yes) {
    const { confirmed } = await ask({
      type: "confirm",
      name: "confirmed",
      message: `确认追加 ${sub.full} 到 ${existing}？`,
      initial: true,
    });
    if (!confirmed) {
      /* v8 ignore next -- 非 TTY 时 ask 已报错，此处仅处理用户主动拒绝写入 */
      info("已取消写入，未写入任何文件");
      return;
    }
  }

  for (const del of plan.deletes) fs.rmSync(del, { force: true });
  for (const f of plan.files) {
    fs.mkdirSync(path.dirname(f.abs), { recursive: true });
    fs.writeFileSync(f.abs, f.content);
  }
  for (const m of plan.moves) success(`✓ ${rel(m.from)} → ${rel(m.to)}`);
  for (const f of plan.files) success(`✓ 已写入 ${rel(f.abs)}`);

  regenerateAggregateEntry(cfg);
  success(
    `✓ 附属组件 ${sub.full} 已追加到 ${existing}（${isPublic ? "公开，进聚合出口" : "私有，仅注册不进聚合出口"}）`
  );
}

export async function runAdd(
  name: string | undefined,
  options: AddOptions = {}
): Promise<void> {
  const cfg = loadConfig();
  const prefix = requirePrefix(cfg);
  const dryRun = !!options.dryRun;
  const publicNames = splitNames(options.with);
  const partNames = splitNames(options.parts);

  if (options.under) {
    if (publicNames.length > 0 || partNames.length > 0) {
      throw new Error(
        "--under 与 --with/--parts 互斥：追加模式一次只追加一个附属组件"
      );
    }
    if (!name) {
      throw new Error(
        "追加模式需要附属组件名：ea add <sub> --under <existing>"
      );
    }
    await runAddUnder(cfg, prefix, name, options, dryRun);
    return;
  }

  const targetRoot = await resolveTargetRoot(
    cfg,
    !!options.internal,
    options.dir
  );
  if (targetRoot === null) {
    info("已取消：交互输入中止，未写入任何文件");
    return;
  }

  const inputs = await collectInputs(
    name,
    publicNames,
    partNames,
    options.summary,
    cfg,
    prefix
  );
  if (!inputs) {
    info("已取消：交互输入中止，未写入任何文件");
    return;
  }
  const { main, summary } = inputs;

  const files = buildPlan(cfg, prefix, main, inputs.subs, summary, targetRoot);
  const entryLine = previewEntryLine(prefix, main, inputs.subs);

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
