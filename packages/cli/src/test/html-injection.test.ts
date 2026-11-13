import { describe, expect, it } from "vitest";

import { isSafeInterpolation, scanHtmlInjection } from "../lib/html-injection";

describe("isSafeInterpolation()", () => {
  it("转义与可信模板声明视为安全", () => {
    expect(isSafeInterpolation("escapeHTML(this.heading)")).toBe(true);
    expect(isSafeInterpolation("html(this.heading)")).toBe(true);
  });

  it("内部生成的类名与文案视为安全", () => {
    expect(isSafeInterpolation('bem.e("icon")')).toBe(true);
    expect(isSafeInterpolation("bem()")).toBe(true);
    expect(isSafeInterpolation('i18nManager.t("calendar.today")')).toBe(true);
  });

  it("内部渲染函数视为安全", () => {
    expect(isSafeInterpolation("this._renderDayCells()")).toBe(true);
    expect(isSafeInterpolation("this._getBodyTemplate()")).toBe(true);
  });

  it("常量表查值视为安全", () => {
    expect(isSafeInterpolation("VARIANT_ICON_MAP[this.variant]")).toBe(true);
    expect(isSafeInterpolation("itemOptions[this.variant]")).toBe(true);
  });

  it("回调式渲染视为安全", () => {
    expect(isSafeInterpolation("renderer(index, activeValue)")).toBe(true);
    expect(isSafeInterpolation("renderCallback")).toBe(true);
  });

  it("字面量视为安全", () => {
    expect(isSafeInterpolation("10")).toBe(true);
    expect(isSafeInterpolation('"text"')).toBe(true);
    expect(isSafeInterpolation("null")).toBe(true);
  });

  it("直接插入属性值不安全", () => {
    expect(isSafeInterpolation("this.heading")).toBe(false);
    expect(isSafeInterpolation("this.value.toUpperCase()")).toBe(false);
  });
});

describe("scanHtmlInjection()", () => {
  it("识别 setHTML 内容参数里的属性插值", () => {
    const src = ["setHTML(this._el, `<div>${this.heading}</div>`);"].join("\n");

    const out = scanHtmlInjection(src);

    expect(out).toHaveLength(1);
    expect(out[0].line).toBe(1);
    expect(out[0].expression).toBe("this.heading");
  });

  it("不检查 setHTML 的目标参数", () => {
    const out = scanHtmlInjection('setHTML(this._container, "<div></div>");');

    expect(out).toHaveLength(0);
  });

  it("识别 html() 参数里的属性插值", () => {
    const src = ["const tpl = html(`<b>${this.description}</b>`);"].join("\n");

    const out = scanHtmlInjection(src);

    expect(out).toHaveLength(1);
    expect(out[0].expression).toBe("this.description");
  });

  it("转义后不再报违规", () => {
    const src = [
      "setHTML(this._el, `<div>${escapeHTML(this.heading)}</div>`);",
    ].join("\n");

    expect(scanHtmlInjection(src)).toHaveLength(0);
  });

  it("属性上下文里的插值同样报违规", () => {
    const src = [
      'setHTML(this._el, `<ea-icon name="${this.icon}"></ea-icon>`);',
    ].join("\n");

    const out = scanHtmlInjection(src);

    expect(out).toHaveLength(1);
    expect(out[0].expression).toBe("this.icon");
  });

  it("字符串拼接里的属性插值会被识别", () => {
    const src = ['setHTML(this._el, "<div>" + this.text + "</div>");'].join(
      "\n"
    );

    const out = scanHtmlInjection(src);

    expect(out).toHaveLength(1);
    expect(out[0].expression).toBe("this.text");
  });

  it("html(变量) 视为显式信任，不再展开检查", () => {
    expect(scanHtmlInjection("setHTML(this._el, html(tpl));")).toHaveLength(0);
  });

  it("insertHTML 只检查内容参数", () => {
    const src = [
      'insertHTML(this._el, `<b>${this.content}</b>`, "beforeend");',
    ].join("\n");

    const out = scanHtmlInjection(src);

    expect(out).toHaveLength(1);
    expect(out[0].expression).toBe("this.content");
  });

  it("支持 @ea-html-safe 豁免标记", () => {
    const src = [
      "// @ea-html-safe 内容来自受控配置",
      "setHTML(this._el, `<div>${this.content}</div>`);",
    ].join("\n");

    expect(scanHtmlInjection(src)).toHaveLength(0);
  });

  it("join 链内部的挂载回调仍会被检查", () => {
    const src = [
      'setHTML(this._el, items.map(item => `<i>${item.label}</i>`).join(""));',
    ].join("\n");

    const out = scanHtmlInjection(src);

    expect(out).toHaveLength(1);
    expect(out[0].expression).toBe("item.label");
  });
});
