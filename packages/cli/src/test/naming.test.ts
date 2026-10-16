import { describe, it, expect } from "vitest";
import {
  toPascalCase,
  createNameRe,
  normalizeName,
  validateWcFull,
  RESERVED_TAG_NAMES,
} from "../lib/naming";

describe("toPascalCase", () => {
  it("kebab → Pascal", () => {
    expect(toPascalCase("color-picker")).toBe("ColorPicker");
    expect(toPascalCase("ea-button")).toBe("EaButton");
    expect(toPascalCase("button")).toBe("Button");
    expect(toPascalCase("a-b-c")).toBe("ABC");
  });
});

describe("createNameRe", () => {
  it("配置 prefix 时要求 prefix- 前缀 + kebab-case", () => {
    const re = createNameRe("ea");
    expect(re.test("ea-button")).toBe(true);
    expect(re.test("ea-color-picker")).toBe(true);
    expect(re.test("button")).toBe(false);
    expect(re.test("other-button")).toBe(false);
    expect(re.test("ea-")).toBe(false);
  });

  it("未配置 prefix 时退化为纯 WC 全名格式", () => {
    const re = createNameRe();
    expect(re.test("my-widget")).toBe(true);
    expect(re.test("widget")).toBe(false); // 无连字符不合 WC
    expect(re.test("ea-button")).toBe(true);
  });
});

describe("normalizeName", () => {
  const p = "ea";
  it("裸名拼接前缀", () => {
    expect(normalizeName("button", p)).toEqual({ bare: "button", full: "ea-button" });
  });
  it("已带前缀则剥离得裸名", () => {
    expect(normalizeName("ea-button", p)).toEqual({ bare: "button", full: "ea-button" });
  });
  it("多段 kebab 名", () => {
    expect(normalizeName("color-picker", p)).toEqual({ bare: "color-picker", full: "ea-color-picker" });
    expect(normalizeName("ea-color-picker", p)).toEqual({ bare: "color-picker", full: "ea-color-picker" });
  });
  it("trim 前后空白", () => {
    expect(normalizeName("  button  ", p)).toEqual({ bare: "button", full: "ea-button" });
  });
  it("空输入报错", () => {
    expect(normalizeName("   ", p)).toEqual({ error: "名称不能为空" });
  });
  it("含大写字母报错", () => {
    const r = normalizeName("MyWidget", p) as { error: string };
    expect(r.error).toContain("含大写字母");
  });
  it("输入恰等于前缀报错", () => {
    const r = normalizeName("ea", p) as { error: string };
    expect(r.error).toContain("命名空间前缀");
  });
  it("剥离前缀后裸名为空报错", () => {
    const r = normalizeName("ea-", p) as { error: string };
    expect(r.error).toContain("剥离前缀后裸名为空");
  });
  it("最终全名不合 WC 格式报错", () => {
    // "ea-" 之后是空，上面已拦截；这里用带尾随分隔的另一形态：输入 "ea-a_b"（下划线非法）
    const r = normalizeName("a_b", p) as { error: string };
    expect(r.error).toContain("Web Components 命名规范");
  });
});

describe("validateWcFull", () => {
  it("合法返回 null", () => {
    expect(validateWcFull("ea-button")).toBeNull();
    expect(validateWcFull("my-cool-widget")).toBeNull();
  });
  it("缺连字符 / 非法字符返回原因", () => {
    expect(validateWcFull("widget")).toContain("Web Components 命名规范");
    expect(validateWcFull("-lead")).toContain("Web Components 命名规范");
    expect(validateWcFull("ea-Button")).toContain("Web Components 命名规范");
  });
  it("保留标签名被拦截", () => {
    for (const reserved of RESERVED_TAG_NAMES) {
      expect(validateWcFull(reserved)).toContain("保留标签名");
    }
  });
});
