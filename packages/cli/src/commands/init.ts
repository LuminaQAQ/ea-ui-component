import fs from "node:fs";
import path from "node:path";

import { loadConfig, type ResolvedEaConfig } from "../lib/config";
import {
  GENERATED_END,
  GENERATED_START,
  regenerateAggregateEntry,
} from "../lib/aggregate";
import { ask, rel } from "./add";
import { info, success, warn } from "../lib/output";
import {
  BUILTIN_TEMPLATE_FILES,
  TEMPLATE_DOC_FILE,
  resolveBuiltinTemplatesDir,
} from "../lib/template";

export interface InitOptions {
  /** 写出内置模板到项目目录（二次开发起点） */
  templates?: boolean;
  /** 模板输出目录；缺省时优先取 ea.config.json 的 templates，否则落到 ea-templates/ */
  dir?: string;
  /** 覆盖已存在的同名模板文件 */
  force?: boolean;
  /** 配置向导：非交互地采用探测默认值（不覆盖既有 ea.config.json） */
  defaults?: boolean;
}

/** 未配置 templates 时的默认输出目录 */
const DEFAULT_TEMPLATES_DIR = "ea-templates";

/** 尽力读取已配置的项目模板目录（config 缺失/不完整时返回 undefined，不抛错） */
function readConfiguredTemplatesDir(): string | undefined {
  try {
    return loadConfig().templates;
  } catch {
    return undefined;
  }
}

/** 输出目录解析：--dir > ea.config.json.templates > 默认目录（均相对 cwd） */
function resolveTemplatesTarget(explicitDir?: string): string {
  const target =
    explicitDir ?? readConfiguredTemplatesDir() ?? DEFAULT_TEMPLATES_DIR;
  return path.resolve(process.cwd(), target);
}

/**
 * 将内置模板落盘到项目模板目录，作为二次开发（魔改）的起点。
 * 已存在的同名文件默认跳过（--force 覆盖）；落盘后配合 ea.config.json.templates 即接管生成
 */
export function runInitTemplates(targetDir: string, force = false): void {
  const srcDir = resolveBuiltinTemplatesDir();
  fs.mkdirSync(targetDir, { recursive: true });

  // 模板文件 + 维护契约文档（README 存在于内置目录时一并 eject，非 .tpl 不参与渲染）
  const ejectFiles: string[] = [...BUILTIN_TEMPLATE_FILES];
  if (fs.existsSync(path.join(srcDir, TEMPLATE_DOC_FILE)))
    ejectFiles.push(TEMPLATE_DOC_FILE);

  const written: string[] = [];
  const skipped: string[] = [];
  for (const file of ejectFiles) {
    const to = path.join(targetDir, file);
    if (fs.existsSync(to) && !force) {
      skipped.push(file);
      continue;
    }
    fs.copyFileSync(path.join(srcDir, file), to);
    written.push(file);
  }

  const relDir =
    path.relative(process.cwd(), targetDir).split(path.sep).join("/") || ".";
  success(`\n✓ 内置模板已写出到 ${relDir}/`);
  for (const f of written) info(`  + ${relDir}/${f}`);
  for (const f of skipped) info(`  = ${relDir}/${f}（已存在，--force 覆盖）`);
  info(
    `\n后续：参照 ${relDir}/${TEMPLATE_DOC_FILE} 编辑以上 .tpl 后，` +
      `在 ea.config.json 增加 "templates": "${relDir}"，` +
      `ea add 将优先采用项目模板（未覆盖的文件回落内置）`
  );
}

/** 探测候选：单包形态优先，其次 monorepo 形态 */
const COMPONENT_DIR_CANDIDATES = [
  "src/components",
  "packages/components/src/components",
  "components",
];
const TEST_DIR_CANDIDATES = [
  "src/test",
  "packages/components/src/test",
  "test",
];

/** prefix 格式（与 config 校验一致） */
const PREFIX_RE = /^[a-z][a-z0-9]*$/;

interface WizardValues {
  prefix?: string;
  componentDirs: string;
  testDir: string;
  entry: string;
}

/** 由组件目录推导同包测试目录（src/components → src/test；…/src/components → …/src/test） */
function deriveTestDir(componentDirs: string): string {
  const parent = path.posix.dirname(componentDirs.replace(/\\/g, "/"));
  return parent === "." ? "test" : `${parent}/test`;
}

/** 探测项目布局默认值（按候选顺序取首个已存在目录，均不存在回落单包常规形态） */
function probeDefaults(cwd: string): WizardValues {
  const componentDirs =
    COMPONENT_DIR_CANDIDATES.find(c => fs.existsSync(path.join(cwd, c))) ??
    "src/components";
  const testDir =
    TEST_DIR_CANDIDATES.find(c => fs.existsSync(path.join(cwd, c))) ??
    deriveTestDir(componentDirs);
  return { componentDirs, testDir, entry: `${componentDirs}/index.ts` };
}

/** 落盘 ea.config.json（单公开目录用单字符串简写；prefix 未配置时不写入该字段） */
function writeConfigFile(cwd: string, values: WizardValues): string {
  const config = {
    project: {
      ...(values.prefix ? { prefix: values.prefix } : {}),
      componentDirs: values.componentDirs,
      testDir: values.testDir,
      entry: values.entry,
    },
    check: { rootTestWhitelist: [], ignore: [] },
  };
  const abs = path.join(cwd, "ea.config.json");
  fs.writeFileSync(abs, JSON.stringify(config, null, 2) + "\n", "utf-8");
  return abs;
}

/**
 * 聚合入口哨兵骨架生成：不存在时落哨兵标记并按目录投影填充；
 * 已存在入口尝试对齐，无法再生时降级为提示
 */
function ensureEntrySkeleton(cfg: ResolvedEaConfig): void {
  const entry = cfg.project.entry;
  if (!fs.existsSync(entry)) {
    fs.mkdirSync(path.dirname(entry), { recursive: true });
    fs.writeFileSync(entry, `${GENERATED_START}\n${GENERATED_END}\n`, "utf-8");
    success(`✓ 已生成聚合入口哨兵骨架 ${rel(entry)}`);
  } else {
    info(`ℹ 聚合入口已存在，对齐目录投影：${rel(entry)}`);
  }
  try {
    regenerateAggregateEntry(cfg);
  } catch (e) {
    warn(
      `⚠ 聚合入口未同步：${(e as Error).message.split("\n")[0]}（可稍后运行 ea sync 处理）`
    );
  }
}

/**
 * 配置向导：交互式询问 prefix / componentDirs / testDir / entry（--defaults 采用探测默认值），
 * 落盘 ea.config.json 并生成聚合入口哨兵骨架。
 */
async function runConfigWizard(
  cwd: string,
  useDefaults: boolean
): Promise<void> {
  const configPath = path.join(cwd, "ea.config.json");
  if (fs.existsSync(configPath)) {
    if (useDefaults) {
      throw new Error(
        "ea.config.json 已存在；--defaults 不覆盖现有配置（如需重建请先删除该文件）"
      );
    }
    const { overwrite } = await ask({
      type: "confirm",
      name: "overwrite",
      message: "ea.config.json 已存在，是否覆盖？",
      initial: false,
    });
    if (!overwrite) {
      info("已取消：未写入配置");
      return;
    }
  }

  const probed = probeDefaults(cwd);
  let values = probed;

  if (!useDefaults) {
    const answers = await ask([
      {
        type: "text",
        name: "prefix",
        message:
          "组件命名空间前缀（留空则不配置；ea add 需要 prefix 生成类名/标签名）",
        initial: "ea",
      },
      {
        type: "text",
        name: "componentDirs",
        message: "公开组件目录（相对 cwd）",
        initial: probed.componentDirs,
      },
      {
        type: "text",
        name: "testDir",
        message: "共享测试区目录",
        initial: probed.testDir,
      },
      {
        type: "text",
        name: "entry",
        message: "聚合入口文件路径",
        initial: probed.entry,
      },
    ]);
    if (answers.prefix === undefined) {
      info("已取消：未写入配置");
      return;
    }

    const prefix = String(answers.prefix).trim() || undefined;
    if (prefix && !PREFIX_RE.test(prefix)) {
      throw new Error(
        `prefix "${prefix}" 不合法（须匹配 ^[a-z][a-z0-9]*$，如 "ea"）`
      );
    }
    values = {
      prefix,
      componentDirs:
        String(answers.componentDirs).trim() || probed.componentDirs,
      testDir: String(answers.testDir).trim() || probed.testDir,
      entry: String(answers.entry).trim() || probed.entry,
    };
  }

  const abs = writeConfigFile(cwd, values);
  success(`✓ 已写入 ${rel(abs)}`);
  info(
    [
      `  project.componentDirs: ${values.componentDirs}`,
      `  project.testDir: ${values.testDir}`,
      `  project.entry: ${values.entry}`,
      `  project.prefix: ${values.prefix ?? "（未配置）"}`,
    ].join("\n")
  );

  if (!values.prefix) {
    warn(
      "⚠ 未配置 project.prefix：ea add 需要 prefix 生成类名/标签名，请按需补充后使用"
    );
  }

  ensureEntrySkeleton(loadConfig(cwd));
}

/**
 * ea init 入口：默认运行配置向导（交互式，或 --defaults 采用探测默认值）；
 * --templates 将内置模板落盘到项目以进行二次开发。
 */
export async function runInit(options: InitOptions = {}): Promise<void> {
  if (options.templates) {
    runInitTemplates(resolveTemplatesTarget(options.dir), !!options.force);
    return;
  }

  const cwd = process.cwd();
  if (!options.defaults && !process.stdin.isTTY) {
    throw new Error(
      "非交互环境无法运行配置向导：请使用 ea init --defaults（采用探测默认值）"
    );
  }

  await runConfigWizard(cwd, !!options.defaults);
}
