import { describe, expect, it } from "vitest";
import { cssLengthToNumber, numberToCssLength } from "@utils/css-length";

describe("cssLengthToNumber", () => {
  it.each([
    ["12px", 12],
    ["1.5rem", 1.5],
    ["-3em", -3],
    [".5em", 0.5],
    ["+2vh", 2],
    ["1e3px", 1000],
    ["100%", 100],
    ["12PX", 12],
    [" 12px ", 12],
  ])("%s → %s", (input, expected) => {
    expect(cssLengthToNumber(input)).toBe(expected);
  });

  it("无单位的 0 合法", () => {
    expect(cssLengthToNumber("0")).toBe(0);
    expect(cssLengthToNumber("-0")).toBe(0);
    expect(cssLengthToNumber("0.0")).toBe(0);
    expect(cssLengthToNumber(".0")).toBe(0);
    expect(cssLengthToNumber("0e5")).toBe(0);
  });

  it("非零值必须带单位", () => {
    expect(Number.isNaN(cssLengthToNumber("12"))).toBe(true);
    expect(Number.isNaN(cssLengthToNumber("12.5.3px"))).toBe(true);
    expect(Number.isNaN(cssLengthToNumber("auto"))).toBe(true);
    expect(Number.isNaN(cssLengthToNumber("px"))).toBe(true);
  });

  it("空值返回 NaN", () => {
    expect(Number.isNaN(cssLengthToNumber(""))).toBe(true);
    expect(Number.isNaN(cssLengthToNumber(undefined))).toBe(true);
    expect(Number.isNaN(cssLengthToNumber(null))).toBe(true);
  });
});

describe("numberToCssLength", () => {
  it("默认单位为 px", () => {
    expect(numberToCssLength(12)).toBe("12px");
  });

  it("支持指定单位（含百分比）", () => {
    expect(numberToCssLength(1.5, "rem")).toBe("1.5rem");
    expect(numberToCssLength(50, "%")).toBe("50%");
  });

  it("与 cssLengthToNumber 往返一致", () => {
    expect(cssLengthToNumber(numberToCssLength(24))).toBe(24);
  });
});
