import fs from "node:fs";
import path from "node:path";

import { loadConfig } from "../lib/config";
import { regenerateAggregateEntry } from "../lib/aggregate";
import { resolveBuiltinTemplatesDir } from "../lib/template";
import { toPascalCase } from "../lib/naming";
import { ask } from "./add";
import { info, success } from "../lib/output";

export interface CreateOptions {
  /** 目标目录（缺省为 ./<name>） */
  dir?: string;
  /** 组件命名空间前缀（非交互必填） */
  prefix?: string;
  /** 仅预览将创建的文件，不落盘 */
  dryRun?: boolean;
}

/** 项目模板在 templates/ 下的子目录名（模板即真实可运行项目） */
const PROJECT_TEMPLATE_DIR = "project";

const PROJECT_NAME_RE = /^[a-z0-9][a-z0-9._-]*$/;
const PREFIX_RE = /^[a-z][a-z0-9]*$/;

/** 模板内置示例组件 */
const SAMPLE_TAG = "ea-button";
const SAMPLE_CLASS = "EaButton";

/** 相对 cwd 的展示路径（统一正斜杠） */
function relTarget(abs: string): string {
  const rel = path.relative(process.cwd(), abs).split(path.sep).join("/");
  return rel || ".";
}

/** 递归收集模板文件（相对路径，正斜杠） */
function listTemplateFiles(root: string): string[] {
  const out: string[] = [];
  const walk = (dir: string): void => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const abs = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(abs);
      else out.push(path.relative(root, abs).split(path.sep).join("/"));
    }
  };
  walk(root);
  return out.sort();
}

/** 目标目录不存在或为空 */
function isDirEmpty(dir: string): boolean {
  return !fs.existsSync(dir) || fs.readdirSync(dir).length === 0;
}

/** 读取 JSON、交给 mutate 改写后按两空格缩进写回 */
function rewriteJson(
  abs: string,
  mutate: (value: Record<string, any>) => void
): void {
  const value = JSON.parse(fs.readFileSync(abs, "utf-8"));
  mutate(value);
  fs.writeFileSync(abs, JSON.stringify(value, null, 2) + "\n", "utf-8");
}

/** 在文件中批量替换文本 */
function replaceText(abs: string, pairs: [string, string][]): void {
  const text = fs.readFileSync(abs, "utf-8");
  let next = text;
  for (const [from, to] of pairs) next = next.split(from).join(to);
  if (next !== text) fs.writeFileSync(abs, next, "utf-8");
}

/**
 * prefix 与模板默认（ea）不同时，同步改写示例组件与 demo 中的标签/类名：
 * 目录名、同名测试文件、示例源码/样式，以及 index.html 中的标签
 */
function adaptSamplePrefix(target: string, prefix: string): void {
  if (prefix === "ea") return;
  const nextTag = `${prefix}-button`;
  const nextClass = `${toPascalCase(prefix)}Button`;
  const pairs: [string, string][] = [
    [SAMPLE_TAG, nextTag],
    [SAMPLE_CLASS, nextClass],
  ];

  const componentsDir = path.join(target, "src", "components");
  const oldDir = path.join(componentsDir, SAMPLE_TAG);
  if (fs.existsSync(oldDir)) {
    const newDir = path.join(componentsDir, nextTag);
    fs.renameSync(oldDir, newDir);
    const oldTest = path.join(newDir, `${SAMPLE_TAG}.test.ts`);
    if (fs.existsSync(oldTest)) {
      fs.renameSync(oldTest, path.join(newDir, `${nextTag}.test.ts`));
    }
    for (const rel of listTemplateFiles(newDir)) {
      replaceText(path.join(newDir, ...rel.split("/")), pairs);
    }
  }

  for (const rel of ["index.html", "main.ts", "src/index.ts"]) {
    const abs = path.join(target, ...rel.split("/"));
    if (fs.existsSync(abs)) replaceText(abs, pairs);
  }
}

/**
 * ea create：复制内置单包项目模板（本身就是真实可运行项目），
 * 改写 package.json 的 name 与 ea.config.json 的 prefix，示例组件随 prefix 同步，
 * 随后对齐聚合入口骨架。
 */
export async function runCreate(
  name: string | undefined,
  options: CreateOptions = {}
): Promise<void> {
  const cwd = process.cwd();
  let projectName = name?.trim();
  let prefix = options.prefix?.trim();

  if (!projectName) {
    const ans = await ask({
      type: "text",
      name: "projectName",
      message: "项目名",
      initial: "my-elements",
    });
    projectName = String(ans.projectName ?? "").trim();
  }
  if (!projectName || !PROJECT_NAME_RE.test(projectName)) {
    throw new Error(
      `项目名非法：${projectName ?? ""}（须匹配 ${PROJECT_NAME_RE}）`
    );
  }

  if (!prefix) {
    const ans = await ask({
      type: "text",
      name: "prefix",
      message: "组件前缀（如 ea）",
      initial: projectName.split("-")[0] || "ea",
    });
    prefix = String(ans.prefix ?? "").trim();
  }
  if (!prefix || !PREFIX_RE.test(prefix)) {
    throw new Error(`prefix 非法：${prefix ?? ""}（须匹配 ${PREFIX_RE}）`);
  }

  const root = path.join(resolveBuiltinTemplatesDir(), PROJECT_TEMPLATE_DIR);
  if (!fs.existsSync(root)) {
    throw new Error(`内置项目模板缺失：${root}（请复制 packages/cli/templates）`);
  }

  const target = options.dir
    ? path.resolve(cwd, options.dir)
    : path.resolve(cwd, projectName);
  if (!isDirEmpty(target)) {
    throw new Error(
      `目标目录非空：${relTarget(target)}（请换一个目录或先清空）`
    );
  }

  const files = listTemplateFiles(root);

  if (options.dryRun) {
    info(
      `将创建项目 ${projectName}（prefix=${prefix}）到 ${relTarget(target)}/：`
    );
    for (const rel of files) info(`  + ${rel}`);
    return;
  }

  // 模板即真实项目：原样复制
  for (const rel of files) {
    const srcAbs = path.join(root, ...rel.split("/"));
    const destAbs = path.join(target, ...rel.split("/"));
    fs.mkdirSync(path.dirname(destAbs), { recursive: true });
    fs.copyFileSync(srcAbs, destAbs);
  }
  fs.mkdirSync(path.join(target, "src", "components"), { recursive: true });

  // 示例组件随 prefix 同步（标签/类名/目录/测试/demo 标签）
  adaptSamplePrefix(target, prefix);

  // 仅改写两处标识：package 名与组件前缀
  rewriteJson(path.join(target, "package.json"), value => {
    value.name = projectName;
  });
  rewriteJson(path.join(target, "ea.config.json"), value => {
    value.project = { ...value.project, prefix };
  });

  // 按新项目 config 对齐聚合入口骨架（空组件目录 ⇒ 仅保留哨兵，手工导出保留）
  regenerateAggregateEntry(loadConfig(target));

  success(`✓ 项目已创建：${relTarget(target)}/（prefix=${prefix}）`);
  info(
    [
      "",
      `  cd ${relTarget(target)}`,
      "  pnpm install",
      "  ea add my-widget        # 生成第一个组件（需可调用 ea）",
      "  pnpm build / pnpm test / pnpm typecheck",
      "",
    ].join("\n")
  );
}
