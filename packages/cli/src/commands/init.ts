import fs from "node:fs";
import path from "node:path";

import { loadConfig } from "../lib/config";
import { info, success } from "../lib/output";
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
  const target = explicitDir ?? readConfiguredTemplatesDir() ?? DEFAULT_TEMPLATES_DIR;
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
  if (fs.existsSync(path.join(srcDir, TEMPLATE_DOC_FILE))) ejectFiles.push(TEMPLATE_DOC_FILE);

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

  const relDir = path.relative(process.cwd(), targetDir).split(path.sep).join("/") || ".";
  success(`\n✓ 内置模板已写出到 ${relDir}/`);
  for (const f of written) info(`  + ${relDir}/${f}`);
  for (const f of skipped) info(`  = ${relDir}/${f}（已存在，--force 覆盖）`);
  info(
    `\n后续：参照 ${relDir}/${TEMPLATE_DOC_FILE} 编辑以上 .tpl 后，` +
      `在 ea.config.json 增加 "templates": "${relDir}"，` +
      `ea add 将优先采用项目模板（未覆盖的文件回落内置）`
  );
}

/**
 * ea init 入口。当前实现 --templates（模板落盘）；
 * 交互式配置向导（探测目录/写完整 config）列为后续扩展，此处给出最小引导
 */
export async function runInit(options: InitOptions = {}): Promise<void> {
  if (options.templates) {
    runInitTemplates(resolveTemplatesTarget(options.dir), !!options.force);
    return;
  }
  const cfgExists = fs.existsSync(path.resolve(process.cwd(), "ea.config.json"));
  info(
    [
      "",
      cfgExists
        ? "✓ 已检测到 ea.config.json"
        : 'ℹ 未找到 ea.config.json，请参考 "ea add" 报错中打印的最小骨架创建',
      "ℹ 交互式配置向导暂未实现；当前 init 支持 --templates 将内置模板落盘到项目以进行二次开发",
      "",
      "  ea init --templates            # 写出模板到 ea-templates/（或 config.templates 指定目录）",
      "  ea init --templates --dir <p>  # 指定输出目录",
      "  ea init --templates --force     # 覆盖已存在模板",
      "",
    ].join("\n")
  );
}
