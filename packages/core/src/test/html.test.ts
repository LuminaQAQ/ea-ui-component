import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";

import { resetDiagnostics } from "@utils/diagnostics";
import { escapeHTML, html, setHTML } from "@utils/html";

describe("escapeHTML()", () => {
  it("转义尖括号、引号与与号", () => {
    expect(escapeHTML(`<a href="x">'&'</a>`)).toBe(
      "&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;"
    );
  });

  it("空值归一为空串", () => {
    expect(escapeHTML(null)).toBe("");
    expect(escapeHTML(undefined)).toBe("");
  });

  it("非字符串走 String()", () => {
    expect(escapeHTML(0)).toBe("0");
    expect(escapeHTML(false)).toBe("false");
  });
});

describe("setHTML()", () => {
  it("把字符串写入目标元素", () => {
    const el = document.createElement("div");
    setHTML(el, "<span>hi</span>");
    expect(el.querySelector("span")?.textContent).toBe("hi");
  });

  it("空目标直接忽略", () => {
    expect(() => setHTML(null, "<div></div>")).not.toThrow();
    expect(() => setHTML(undefined, "<div></div>")).not.toThrow();
  });

  it("可以清空目标", () => {
    const el = document.createElement("div");
    el.appendChild(document.createElement("span"));
    setHTML(el, "");
    expect(el.childElementCount).toBe(0);
  });
});

describe("html()", () => {
  let warn: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    resetDiagnostics();
    warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
  });

  afterEach(() => {
    warn.mockRestore();
    resetDiagnostics();
  });

  it("原样返回模板，保留 ea- 自定义元素与属性", () => {
    const template =
      '<ea-button type="primary" data-x="1" aria-label="ok">文字</ea-button>';
    const out = html(template);

    expect(out).toBe(template);
  });

  it("原样保留 slot", () => {
    const template = '<div><slot name="icon"></slot><slot></slot></div>';

    expect(html(template)).toBe(template);
  });

  it("不再清洗模板内容", () => {
    const template = "<div>前置</div><script>alert(1)</script>";

    expect(html(template)).toBe(template);
  });

  it("模板含可疑片段时告警，同一 key 只报一次", () => {
    html("<script>alert(1)</script>");
    html('<img src="x" onerror="alert(1)">');

    expect(warn).toHaveBeenCalledTimes(1);
  });

  it("转义后的动态值不会触发告警", () => {
    html(`<div>${escapeHTML("<script>alert(1)</script>")}</div>`);

    expect(warn).not.toHaveBeenCalled();
  });
});
