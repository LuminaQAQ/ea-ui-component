import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

import {
  BUILTIN_TEMPLATE_FILES,
  TEMPLATE_DOC_FILE,
  resolveBuiltinTemplatesDir,
  renderPlaceholders,
  type RenderContext,
} from "../lib/template";

const tplDir = resolveBuiltinTemplatesDir();
const TOKEN_RE = /___[A-Z0-9_]+___/g;

/** 收集全部模板文件中出现的 token 集合 */
function tokensInTemplates(): Set<string> {
  const set = new Set<string>();
  for (const file of BUILTIN_TEMPLATE_FILES) {
    const text = fs.readFileSync(path.join(tplDir, file), "utf-8");
    for (const m of text.match(TOKEN_RE) ?? []) set.add(m);
  }
  return set;
}

/** 收集 README 中说明的 token 集合 */
function tokensInReadme(): Set<string> {
  const text = fs.readFileSync(path.join(tplDir, TEMPLATE_DOC_FILE), "utf-8");
  return new Set(text.match(TOKEN_RE) ?? []);
}

/** 填满全部（含可选）字段的上下文，用于验证每个 token 都被替换 */
const fullCtx: RenderContext = {
  tagName: "ea-button",
  className: "EaButton",
  summary: "按钮",
  version: "1.0.0",
  name: "button",
  namePascal: "Button",
  prefix: "ea",
  prefixPascal: "Ea",
  subImports: 'import { EaButtonGroup } from "./components/ea-button-group";',
  exportList: "EaButton, EaButtonGroup",
  exportDefault: "export default EaButton;",
  internalDeps: 'import "./components/ea-button-item/index";',
  dependency: " * @dependency ea-button-item",
};

describe("模板与 README 占位符一致性", () => {
  it("README 文档文件随模板存在", () => {
    expect(fs.existsSync(path.join(tplDir, TEMPLATE_DOC_FILE))).toBe(true);
  });

  it("模板使用的每个 token 都在 README 中有说明", () => {
    const documented = tokensInReadme();
    for (const token of tokensInTemplates()) {
      expect(documented.has(token), `README 缺少 ${token} 的说明`).toBe(true);
    }
  });

  it("README 说明的每个 token 都是受支持的 token（渲染后不残留）", () => {
    // 逐 token 独占一行，用填满的上下文渲染；未被 tokenMap 支持的 token 会原样残留
    const lines = [...tokensInReadme()].join("\n");
    const rendered = renderPlaceholders(lines, fullCtx);
    expect(rendered).not.toMatch(TOKEN_RE);
  });

  it("填满上下文后所有模板不残留任何 token（证明均为受支持 token）", () => {
    for (const file of BUILTIN_TEMPLATE_FILES) {
      const raw = fs.readFileSync(path.join(tplDir, file), "utf-8");
      const rendered = renderPlaceholders(raw, fullCtx);
      expect(rendered, `${file} 渲染后仍有未替换 token`).not.toMatch(TOKEN_RE);
    }
  });
});
