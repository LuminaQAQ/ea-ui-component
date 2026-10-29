import { describe, expect, it } from "vitest";
import { createBEM } from "@utils/bem";

const bem = createBEM("ea-alert");

describe("createBEM", () => {
  it("基础类名与选择器", () => {
    expect(bem()).toBe("ea-alert");
    expect(bem.b()).toBe("ea-alert");
    expect(bem.cb()).toBe(".ea-alert");
  });

  it("元素类名与选择器", () => {
    expect(bem.e("content")).toBe("ea-alert__content");
    expect(bem.ce("content")).toBe(".ea-alert__content");
  });

  it("修饰符：多个修饰符以空格连接", () => {
    expect(bem.m("primary", "large")).toBe("ea-alert--primary ea-alert--large");
    expect(bem.cm("primary")).toBe(".ea-alert--primary");
  });

  it("状态：统一 is- 前缀", () => {
    expect(bem.s("active", "disabled")).toBe("is-active is-disabled");
    expect(bem.cs("active")).toBe(".is-active");
  });

  it("修饰符对象：true / 空串只输出类名，其余值拼接为 key-value", () => {
    expect(bem({ primary: true, effect: "light" })).toBe(
      "ea-alert ea-alert--primary ea-alert--effect-light"
    );
    expect(bem({ primary: "" })).toBe("ea-alert ea-alert--primary");
  });

  it("修饰符对象：false / undefined / null 不输出", () => {
    const falsy = {
      primary: false,
      effect: undefined,
      size: null,
    } as unknown as Record<string, boolean | string | number>;
    expect(bem(falsy)).toBe("ea-alert");
  });

  it("状态对象：仅 true 与空串生效，非零数字被忽略", () => {
    expect(bem({}, { center: true, hidden: false, size: 1 })).toBe(
      "ea-alert is-center"
    );
  });

  it("修饰符与状态组合输出顺序：块 → 修饰符 → 状态", () => {
    expect(bem({ primary: true }, { center: true, disabled: true })).toBe(
      "ea-alert ea-alert--primary is-center is-disabled"
    );
  });
});
