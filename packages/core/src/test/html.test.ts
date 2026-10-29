import { describe, expect, it } from "vitest";
import { html } from "@utils/html";

describe("html()", () => {
  it("保留 ea- 自定义元素及其属性（CUSTOM_ELEMENT_HANDLING）", () => {
    const out = html(
      '<ea-button type="primary" data-x="1" aria-label="ok">文字</ea-button>'
    );
    expect(out).toContain("<ea-button");
    expect(out).toContain('type="primary"');
    expect(out).toContain('data-x="1"');
    expect(out).toContain('aria-label="ok"');
    expect(out).toContain("文字");
  });

  it("slot 会被占位保护后再还原", () => {
    const out = html('<div><slot name="icon"></slot><slot></slot></div>');
    expect(out).toContain('<slot name="icon">');
    expect(out).toContain("<slot>");
  });

  it("移除 script 及其内容", () => {
    const out = html("<div>前置</div><script>alert(1)</script>");
    expect(out).not.toContain("script");
    expect(out).not.toContain("alert(1)");
    expect(out).toContain("前置");
  });

  it("未知标签被剥离、文本内容保留", () => {
    const out = html("<my-widget>内容</my-widget>");
    expect(out).not.toContain("my-widget");
    expect(out).toContain("内容");
  });

  it("保留标准表单控件与常见属性", () => {
    const out = html(
      '<input type="text" value="v" disabled placeholder="p" /><a href="/x" target="_blank" rel="noopener">go</a>'
    );
    expect(out).toContain('type="text"');
    expect(out).toContain("disabled");
    expect(out).toContain('placeholder="p"');
    expect(out).toContain('href="/x"');
    expect(out).toContain('target="_blank"');
  });

  it("空串输入返回空串", () => {
    expect(html("")).toBe("");
  });
});
