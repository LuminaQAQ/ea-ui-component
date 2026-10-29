import { describe, expect, it } from "vitest";
import { camelToKebab, kebabToCamel } from "@utils/case-convert";

describe("camelToKebab", () => {
  it.each([
    ["closeText", "close-text"],
    ["showIcon", "show-icon"],
    ["validationMessage", "validation-message"],
    ["a1B", "a1-b"],
    ["already-kebab", "already-kebab"],
    ["lower", "lower"],
    ["", ""],
  ])("%s → %s", (input, expected) => {
    expect(camelToKebab(input)).toBe(expected);
  });

  it("不处理连续大写（仅在小写/数字后插连字符）", () => {
    expect(camelToKebab("ABC")).toBe("abc");
    expect(camelToKebab("aBC")).toBe("a-bc");
  });
});

describe("kebabToCamel", () => {
  it.each([
    ["close-text", "closeText"],
    ["show-icon", "showIcon"],
    ["validation-message", "validationMessage"],
    ["alreadyCamel", "alreadyCamel"],
    ["lower", "lower"],
    ["", ""],
  ])("%s → %s", (input, expected) => {
    expect(kebabToCamel(input)).toBe(expected);
  });

  it("往返转换保持稳定", () => {
    expect(kebabToCamel(camelToKebab("showIcon"))).toBe("showIcon");
  });
});
