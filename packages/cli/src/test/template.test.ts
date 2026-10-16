import { describe, it, expect, vi, afterEach } from "vitest";
import fs from "node:fs";
import path from "node:path";

import {
  renderPlaceholders,
  renderCut,
  loadTemplate,
  renderTemplate,
  resolveBuiltinTemplatesDir,
  TPL_CUT_MARKER,
  BUILTIN_TEMPLATE_FILES,
  type RenderContext,
} from "../lib/template";
import type { ResolvedEaConfig } from "../lib/config";
import { makeTempRoot, removeTempRoot, writeFile } from "./helpers";

const dirs: string[] = [];
function temp(): string {
  const d = makeTempRoot();
  dirs.push(d);
  return d;
}
afterEach(() => {
  while (dirs.length) removeTempRoot(dirs.pop()!);
});

const baseCtx: RenderContext = {
  tagName: "ea-button",
  className: "EaButton",
  summary: "按钮",
  version: "1.2.3",
  name: "button",
  namePascal: "Button",
  prefix: "ea",
  prefixPascal: "Ea",
};

/** 构造仅含 templates 字段的最小 cfg（loadTemplate 只读 templates/cwd） */
function cfgWithTemplates(templates?: string): ResolvedEaConfig {
  return { templates } as unknown as ResolvedEaConfig;
}

describe("renderPlaceholders", () => {
  it("替换全部语义 token", () => {
    const tpl = [
      `tag=___TAG_NAME___`,
      `cls=___CLASS_NAME___`,
      `sum=___SUMMARY___ ver=___VERSION___`,
      `name=___NAME___ pascal=___NAME_PASCAL___`,
      `pfx=___PREFIX___ pfxP=___PREFIX_PASCAL___`,
    ].join("\n");
    const out = renderPlaceholders(tpl, baseCtx);
    expect(out).toContain("tag=ea-button");
    expect(out).toContain("cls=EaButton");
    expect(out).toContain("sum=按钮 ver=1.2.3");
    expect(out).toContain("name=button pascal=Button");
    expect(out).toContain("pfx=ea pfxP=Ea");
    expect(out).not.toContain("___");
  });

  it("空值且独占整行时删除整行", () => {
    const tpl = ["A", "  ___SUB_IMPORTS___  ", "B"].join("\n");
    const out = renderPlaceholders(tpl, { ...baseCtx, subImports: "" });
    expect(out).toBe("A\nB");
  });

  it("非空值正常替换且不删行", () => {
    const tpl = ["A", "___SUB_IMPORTS___", "B"].join("\n");
    const out = renderPlaceholders(tpl, {
      ...baseCtx,
      subImports: "import x;",
    });
    expect(out).toContain("import x;");
    expect(out.split("\n").length).toBeGreaterThanOrEqual(3);
  });

  it("不触碰 JS 模板插值与 SCSS 变量", () => {
    const tpl = "const s = `${___NAME___}`;\n$radius: 4px;";
    const out = renderPlaceholders(tpl, baseCtx);
    expect(out).toContain("${button}");
    expect(out).toContain("$radius: 4px;");
  });

  it("清理仅含空白的内容行", () => {
    const out = renderPlaceholders("line1\n   \nline3", baseCtx);
    expect(out).not.toMatch(/\n[ \t]+\n/);
  });
});

describe("renderCut", () => {
  it("保留 cut 之前内容，丢弃其后", () => {
    const text = ["head", TPL_CUT_MARKER, "tail"].join("\n");
    const out = renderCut(text);
    expect(out).toBe("head\n");
  });
  it("无 cut 标记返回原文", () => {
    expect(renderCut("no marker here")).toBe("no marker here");
  });
});

describe("resolveBuiltinTemplatesDir", () => {
  it("定位到含内置模板的目录", () => {
    const dir = resolveBuiltinTemplatesDir();
    expect(fs.existsSync(path.join(dir, "component.ts.tpl"))).toBe(true);
    for (const f of BUILTIN_TEMPLATE_FILES) {
      expect(fs.existsSync(path.join(dir, f))).toBe(true);
    }
  });
});

describe("loadTemplate", () => {
  it("config.templates 命中项目自定义模板", () => {
    const root = temp();
    writeFile(root, "mytpl/component.ts.tpl", "// custom ___TAG_NAME___\n");
    const text = loadTemplate(
      "component.ts.tpl",
      cfgWithTemplates(path.join(root, "mytpl"))
    );
    expect(text).toBe("// custom ___TAG_NAME___\n");
  });
  it("补全 .tpl 后缀", () => {
    const root = temp();
    writeFile(root, "mytpl/widget.tpl", "ENTRY");
    expect(
      loadTemplate("widget", cfgWithTemplates(path.join(root, "mytpl")))
    ).toBe("ENTRY");
  });
  it("自定义目录缺该文件时回落内置", () => {
    const root = temp();
    const text = loadTemplate(
      "component.ts.tpl",
      cfgWithTemplates(path.join(root, "empty-tpl"))
    );
    expect(text).toContain("class ___CLASS_NAME___");
  });
  it("内置缺失时抛错", () => {
    expect(() => loadTemplate("nope", cfgWithTemplates(undefined))).toThrow(
      /不存在于内置目录/
    );
  });
});

describe("renderTemplate", () => {
  it("值内 token 字面量不被二次替换（单遍替换防注入）", () => {
    const out = renderPlaceholders("sum=___SUMMARY___", {
      ...baseCtx,
      summary: "含 ___VERSION___ 字面",
    });
    expect(out).toBe("sum=含 ___VERSION___ 字面");
  });

  it("未知 token 原样保留", () => {
    expect(renderPlaceholders("x=___NOT_A_TOKEN___", baseCtx)).toBe(
      "x=___NOT_A_TOKEN___"
    );
  });

  it("内置模板目录两候选均未命中时抛错并引导 init --templates", () => {
    const existsSpy = vi.spyOn(fs, "existsSync").mockReturnValue(false);

    expect(() => resolveBuiltinTemplatesDir()).toThrow(/未找到内置模板目录/);
    existsSpy.mockRestore();
  });

  it("loadTemplate 渲染链路：config 命中 + 内置回落并存", () => {
    const root = temp();
    // 只覆盖 entry，component 走内置
    writeFile(root, "ovr/entry.tpl", "// overridden ___TAG_NAME___\n");
    const cfg = cfgWithTemplates(path.join(root, "ovr"));
    expect(loadTemplate("entry.tpl", cfg)).toBe(
      "// overridden ___TAG_NAME___\n"
    );
    expect(loadTemplate("component.ts", cfg)).toContain(
      "class ___CLASS_NAME___"
    );
  });
});

describe("renderTemplate cut 行为", () => {
  it("cut=true 截断值导出段并渲染 token", () => {
    const root = temp();
    writeFile(
      root,
      "t/component.ts.tpl",
      [
        `class ___CLASS_NAME___ {}`,
        TPL_CUT_MARKER,
        `export default ___CLASS_NAME___;`,
      ].join("\n")
    );
    const out = renderTemplate(
      "component.ts.tpl",
      cfgWithTemplates(path.join(root, "t")),
      baseCtx,
      true
    );
    expect(out).toBe("class EaButton {}\n");
  });

  it("cut=false 保留导出段并剥离 cut 注释行", () => {
    const root = temp();
    writeFile(
      root,
      "t/component.ts.tpl",
      [
        `class ___CLASS_NAME___ {}`,
        TPL_CUT_MARKER,
        `export default ___CLASS_NAME___;`,
      ].join("\n")
    );
    const out = renderTemplate(
      "component.ts.tpl",
      cfgWithTemplates(path.join(root, "t")),
      baseCtx,
      false
    );
    expect(out).not.toContain(TPL_CUT_MARKER);
    expect(out).toContain("class EaButton {}");
    expect(out).toContain("export default EaButton;");
  });

  it("内置 entry 模板渲染附属导入与导出列表", () => {
    const out = renderTemplate(
      "entry.ts.tpl",
      cfgWithTemplates(undefined),
      {
        ...baseCtx,
        subImports:
          'import { EaButtonGroup } from "./components/ea-button-group";',
        exportList: "EaButton, EaButtonGroup",
      },
      false
    );
    expect(out).toContain("import { EaButton } from");
    expect(out).toContain("EaButtonGroup");
    expect(out).toContain("export { EaButton, EaButtonGroup };");
    expect(out).not.toContain("___EXPORT_LIST___");
  });

  it("内置 component 模板渲染为含 prefix 终态（prefix=abc → abc-button / AbcButton）", () => {
    const out = renderTemplate(
      "component.ts.tpl",
      cfgWithTemplates(undefined),
      {
        tagName: "abc-button",
        className: "AbcButton",
        summary: "按钮",
        version: "1.0.0",
        name: "button",
        namePascal: "Button",
        prefix: "abc",
        prefixPascal: "Abc",
        exportDefault: "export default AbcButton;",
      },
      false
    );
    expect(out).toContain('const TAG_NAME = "abc-button"');
    expect(out).toContain("export class AbcButton");
    expect(out).toContain('"abc-button": AbcButton');
    expect(out).not.toMatch(/\bea-\b/); // 不泄内置默认命名空间
    expect(out).not.toContain("___");
  });
});
