import { describe, expect, it } from "vitest";
import parseAttributeValue, {
  parseDefaultValue,
} from "@utils/parseAttributeValue";

const ctx = {};

describe("parseDefaultValue", () => {
  it("函数默认值以传入实例为 this 执行", () => {
    const instance = { name: "ea-input" };
    const result = parseDefaultValue(
      instance,
      function (this: typeof instance) {
        return this.name;
      }
    );
    expect(result).toBe("ea-input");
  });

  it("undefined 默认值回落到 null", () => {
    expect(parseDefaultValue(ctx, undefined)).toBeNull();
  });

  it("非函数默认值原样返回（含 0 / false / 空串）", () => {
    expect(parseDefaultValue(ctx, 0)).toBe(0);
    expect(parseDefaultValue(ctx, false)).toBe(false);
    expect(parseDefaultValue(ctx, "")).toBe("");
  });
});

describe("parseAttributeValue", () => {
  it("null 表示属性被移除，返回默认值", () => {
    expect(parseAttributeValue(ctx, null, Number, 7)).toBe(7);
    expect(parseAttributeValue(ctx, null, String, "x")).toBe("x");
    expect(parseAttributeValue(ctx, null, Boolean, true)).toBe(true);
  });

  it("字符串形式的类型名与构造器等价（未在文档中公开）", () => {
    // 特征测试：实现支持 "String"/"Number"/"Boolean" 字符串，但类型声明里没有这两个字面量
    expect(parseAttributeValue(ctx, "abc", "String" as never)).toBe("abc");
    expect(parseAttributeValue(ctx, "42", "Number" as never)).toBe(42);
    expect(parseAttributeValue(ctx, "true", "Boolean" as never)).toBe(true);
  });

  it("String：原样返回", () => {
    expect(parseAttributeValue(ctx, "  a b  ", String)).toBe("  a b  ");
    expect(parseAttributeValue(ctx, "", String)).toBe("");
  });

  it("Number：可解析则返回数字，否则回落默认值", () => {
    expect(parseAttributeValue(ctx, "42", Number)).toBe(42);
    expect(parseAttributeValue(ctx, "-1.5", Number)).toBe(-1.5);
    expect(parseAttributeValue(ctx, "", Number)).toBe(0);
    expect(parseAttributeValue(ctx, "abc", Number, 9)).toBe(9);
  });

  it('Boolean：仅 "true" 与空串为真', () => {
    expect(parseAttributeValue(ctx, "true", Boolean)).toBe(true);
    expect(parseAttributeValue(ctx, "", Boolean)).toBe(true);
    expect(parseAttributeValue(ctx, "false", Boolean)).toBe(false);
    expect(parseAttributeValue(ctx, "0", Boolean)).toBe(false);
    expect(parseAttributeValue(ctx, "TRUE", Boolean)).toBe(false);
  });

  it("Date：可解析返回 Date，否则回落默认值", () => {
    const date = parseAttributeValue(ctx, "2024-01-02", Date);
    expect(date).toBeInstanceOf(Date);
    expect((date as Date).getUTCFullYear()).toBe(2024);
    expect(parseAttributeValue(ctx, "not-a-date", Date, null)).toBeNull();
  });

  it("Array：按 JSON 解析，失败回落默认值", () => {
    expect(parseAttributeValue(ctx, "[1,2]", Array)).toEqual([1, 2]);
    expect(parseAttributeValue(ctx, "oops", Array, null)).toBeNull();
  });

  it("RegExp：构造成功返回正则，失败回落默认值", () => {
    const reg = parseAttributeValue(ctx, "a+", RegExp) as RegExp;
    expect(reg).toBeInstanceOf(RegExp);
    expect(reg.test("aaa")).toBe(true);
    expect(parseAttributeValue(ctx, "(", RegExp, null)).toBeNull();
  });

  it("Function：不接受属性值，回落默认值（默认为函数时会被当作工厂执行）", () => {
    const fallback = () => 1;
    expect(parseAttributeValue(ctx, "x", Function, fallback)).toBe(1);
    expect(parseAttributeValue(ctx, "x", Function, "raw")).toBe("raw");
  });

  it("枚举数组：命中返回值，未命中回落默认值", () => {
    const variant = ["primary", "danger"];
    expect(parseAttributeValue(ctx, "danger", variant as never)).toBe("danger");
    expect(parseAttributeValue(ctx, "ghost", variant as never, "primary")).toBe(
      "primary"
    );
  });

  it("类型映射对象：命中判定函数后按返回的键继续解析", () => {
    const typeMap = {
      Number: (value: string) => !Number.isNaN(Number(value)),
    };
    expect(parseAttributeValue(ctx, "12", typeMap as never)).toBe(12);
    expect(parseAttributeValue(ctx, "abc", typeMap as never, 0)).toBe(0);
  });

  it("未知类型：原样返回属性值（default 分支的兜底）", () => {
    // 非 object / array 的未知类型走 switch 的 default 分支
    expect(parseAttributeValue(ctx, "raw", "Custom" as never)).toBe("raw");
    // 而空对象类型会进入“类型映射”分支，未命中任何判定函数时回落默认值
    expect(parseAttributeValue(ctx, "raw", {} as never)).toBeNull();
  });
});
