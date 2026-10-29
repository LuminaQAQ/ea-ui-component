import { describe, expect, it } from "vitest";
import { Enum } from "@utils/Enum";

describe("Enum", () => {
  it("可变参数形式返回数组本身", () => {
    expect(Enum("pending", "success", "error")).toEqual([
      "pending",
      "success",
      "error",
    ]);
  });

  it("数组形式直接返回同一个引用（不复制）", () => {
    const source = ["a", "b"] as const;
    const result = Enum(source);
    expect(result).toBe(source);
  });

  it("单个非数组参数返回单元素数组", () => {
    expect(Enum("only")).toEqual(["only"]);
  });

  it("支持数字与布尔字面量", () => {
    expect(Enum(1, 2, 3)).toEqual([1, 2, 3]);
    expect(Enum(true, false)).toEqual([true, false]);
  });

  it("空参数返回空数组", () => {
    expect(Enum()).toEqual([]);
  });
});
