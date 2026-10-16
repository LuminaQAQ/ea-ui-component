import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { ResolvedEaConfig } from "./config";

/** 主/附属组件模板出口段截断标记：cut 行之前为类实现 + TagNameMap 自声明，之后为值导出段 */
export const TPL_CUT_MARKER = "// @ea-tpl:cut";

/** 内置模板随包发布的文件名（init --templates 与 loadTemplate 共用） */
export const BUILTIN_TEMPLATE_FILES = [
  "component.ts.tpl",
  "entry.ts.tpl",
  "component.scss.tpl",
  "component.test.ts.tpl",
] as const;

/** 随模板一同 eject 的维护契约文档（init --templates 会拷贝；非 .tpl，不参与渲染） */
export const TEMPLATE_DOC_FILE = "README.md";

export interface RenderContext {
  /** 完整标签名（prefix-name），如 ea-button */
  tagName: string;
  /** 完整类名（PrefixPascal-Name），如 EaButton */
  className: string;
  /** 组件摘要（@summary JSDoc） */
  summary: string;
  /** @since 版本号（取自最近的组件包 package.json） */
  version: string;
  /** 裸 kebab 名（去前缀），如 button */
  name: string;
  /** 裸 Pascal 名（去前缀），如 Button */
  namePascal: string;
  /** 小写前缀，如 ea */
  prefix: string;
  /** Pascal 前缀，如 Ea */
  prefixPascal: string;
  /** 附属组件 import 块（复合主出口 entry 模板用） */
  subImports?: string;
  /** 出口类名列表（entry 模板用，如 EaButton, EaButtonGroup） */
  exportList?: string;
  /** 单组件值导出段（component 模板用，如 export default EaButton;）；附属/复合主实现留空即省略 */
  exportDefault?: string;
  /** 私有组件副作用注册路径（component 模板用，如 import "./components/x/index";）；无则留空即省略 */
  internalDeps?: string;
  /** 私有组件 JSDoc @dependency 块（component 模板用，每行形如 ` * @dependency ea-x-item`）；无则留空即省略 */
  dependency?: string;
}

/** 上下文 → 语义化 token 字面量映射（token 独占整行且值为空时该行一并删除） */
function tokenMap(ctx: RenderContext): Record<string, string> {
  return {
    ___TAG_NAME___: ctx.tagName,
    ___CLASS_NAME___: ctx.className,
    ___SUMMARY___: ctx.summary,
    ___VERSION___: ctx.version,
    ___NAME___: ctx.name,
    ___NAME_PASCAL___: ctx.namePascal,
    ___PREFIX___: ctx.prefix,
    ___PREFIX_PASCAL___: ctx.prefixPascal,
    ___SUB_IMPORTS___: ctx.subImports ?? "",
    ___EXPORT_LIST___: ctx.exportList ?? "",
    ___EXPORT_DEFAULT___: ctx.exportDefault ?? "",
    ___INTERNAL_DEPS___: ctx.internalDeps ?? "",
    ___DEPENDENCY___: ctx.dependency ?? "",
  };
}

/**
 * 语义化占位符替换：逐个 token 全量字符串替换，无正则前瞻/转义。
 * `${...}` JS 模板插值与 SCSS `$var` 因不含 `___` 定界而不被触碰；
 * token 独占整行且解析值为空时（如单组件的 ___SUB_IMPORTS___）删除该行本身
 */
export function renderPlaceholders(text: string, ctx: RenderContext): string {
  const map = tokenMap(ctx);
  let out = text;

  for (const [token, value] of Object.entries(map)) {
    if (value === "") {
      out = out.replace(new RegExp(`^[ \\t]*${token}[ \\t]*\r?\n`, "gm"), "");
    }
  }

  out = out.replace(/___[A-Z0-9_]+___/g, m => map[m] ?? m);
  out = out.replace(/^[ \t]+$/gm, "");
  return out;
}

/**
 * 出口段截断渲染：保留 cut 标记之前的内容（类实现 + TagNameMap 自声明），
 * 丢弃 cut 行及其后的值导出段（复合子/主实现形态）
 */
export function renderCut(text: string): string {
  const idx = text.indexOf(TPL_CUT_MARKER);
  if (idx === -1) return text;
  return text.slice(0, idx).replace(/\s+$/, "") + "\n";
}

/** 非截断渲染：保留 cut 之后的值导出段，但剥离 cut 哨兵注释行本身 */
function stripCutMarker(text: string): string {
  if (!text.includes(TPL_CUT_MARKER)) return text;
  return (
    text
      .split(/\r?\n/)
      .filter(line => line.trim() !== TPL_CUT_MARKER)
      .join("\n")
      .replace(/\n{3,}/g, "\n\n")
      .replace(/\s+$/, "") + "\n"
  );
}

/**
 * 内置模板目录（随包发布，模板文件不进构建产物）：
 * 依次探测 bundle 形态（dist/index.cjs → ../templates）与 tsx 直跑形态（src/lib → ../../templates）
 */
export function resolveBuiltinTemplatesDir(): string {
  const candidates: string[] = [];
  if (typeof __dirname !== "undefined") {
    candidates.push(path.resolve(__dirname, "..", "templates"));
  }
  try {
    const here = path.dirname(fileURLToPath(import.meta.url));
    candidates.push(path.resolve(here, "..", "..", "templates"));
  } catch {
    /* import.meta 不可用（CJS 环境）时忽略该候选 */
  }
  for (const dir of candidates) {
    if (fs.existsSync(path.join(dir, "component.ts.tpl"))) return dir;
  }
  throw new Error(
    `未找到内置模板目录（已探测：${candidates.join("、") || "无"}）。运行 ea init --templates 初始化模板`
  );
}

/**
 * 模板解析链：config.templates 目录（约定同名 .tpl 文件）→ CLI 内置 templates 目录。
 * 三方可整体替换或只覆盖个别文件（内置模板可用 ea init --templates 落盘后二次开发）
 */
export function loadTemplate(name: string, cfg: ResolvedEaConfig): string {
  const fileName = name.endsWith(".tpl") ? name : `${name}.tpl`;
  if (cfg.templates) {
    const custom = path.resolve(process.cwd(), cfg.templates, fileName);
    if (fs.existsSync(custom)) return fs.readFileSync(custom, "utf-8");
  }
  const builtin = path.join(resolveBuiltinTemplatesDir(), fileName);
  if (!fs.existsSync(builtin)) {
    throw new Error(
      `模板 ${fileName} 不存在于内置目录（${path.dirname(builtin)}）`
    );
  }
  return fs.readFileSync(builtin, "utf-8");
}

/** 读取模板并渲染为终态文本；cut=true 时截断值导出段（复合子/主实现形态），否则全文渲染并仅剥离 cut 注释行 */
export function renderTemplate(
  name: string,
  cfg: ResolvedEaConfig,
  ctx: RenderContext,
  cut = false
): string {
  const rendered = renderPlaceholders(loadTemplate(name, cfg), ctx);
  return cut ? renderCut(rendered) : stripCutMarker(rendered);
}
