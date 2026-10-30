import { describe, expect, it } from "vitest";
import { h } from "@utils/h";

describe("h", () => {
  it("常规标签：类名 + 属性 + 子节点", () => {
    expect(h("div", "cls", { id: "app" }, "内容")).toBe(
      '<div class="cls" id="app">内容</div>'
    );
  });

  it("无类名与属性时仍保留模板中的空格（产出 `<div >`）", () => {
    expect(h("div", "", {}, "x")).toBe("<div >x</div>");
    expect(h("div", "", undefined, "x")).toBe("<div >x</div>");
  });

  it("自闭合标签不加闭合标签", () => {
    expect(h("input", "cls")).toBe('<input class="cls" />');
    expect(h("img", "", { src: "a.png" })).toBe('<img src="a.png"/>');
  });

  it("过滤 script / style 标签", () => {
    expect(h("script", "x", {}, "alert(1)")).toBe("");
    expect(h("style", "x", {}, "a{}")).toBe("");
  });

  it("过滤 on* 事件属性", () => {
    const out = h("button", "btn", { onclick: "alert(1)", id: "b" }, "ok");
    expect(out).toBe('<button class="btn" id="b">ok</button>');
    expect(out).not.toContain("onclick");
  });

  it("属性值支持数字、布尔、数组与嵌套对象", () => {
    const out = h("div", "", {
      "data-num": 1,
      "data-bool": false,
      class: ["a", "b"],
      "data-deep": { role: "note" },
    });
    expect(out).toContain('data-num="1"');
    expect(out).toContain('data-bool="false"');
    expect(out).toContain('class="a b"');
    expect(out).toContain('role="note"');
  });

  it("函数属性值会被执行", () => {
    expect(h("div", "", { title: () => "动态" })).toContain('title="动态"');
  });

  it("子节点：数组扁平化，null / undefined 省略，布尔转为字符串", () => {
    expect(h("div", "", {}, ["a", ["b"], null, undefined, true])).toBe(
      "<div >abtrue</div>"
    );
  });

  it("不转义属性值（仅用于可信模板）", () => {
    const out = h("div", "", { title: '" onmouseover="x' });
    expect(out).toContain('title="" onmouseover="x"');
  });
});
