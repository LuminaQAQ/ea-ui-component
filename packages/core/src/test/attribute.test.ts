import { describe, expect, it } from "vitest";
import { attribute } from "@decorator/attribute";
import { ElementAttributesMap } from "@stores/element-attributes";

const a11y = { ariaAttr: "aria-disabled" };
const observer = () => undefined;

class Base {
  @attribute({ type: String, default: "base" })
  name: string = "base";
}

class Child extends Base {
  @attribute({ type: Boolean, default: false, observer, a11y })
  disabled: boolean = false;

  @attribute({ type: Number })
  size: number = 0;
}

describe("@attribute 注册", () => {
  it("按类写入 ElementAttributesMap，保留全部选项", () => {
    expect(ElementAttributesMap.get(Base)).toMatchObject({
      name: { type: String, default: "base" },
    });

    expect(ElementAttributesMap.get(Child)).toMatchObject({
      disabled: { type: Boolean, default: false, observer, a11y },
      size: { type: Number },
    });
  });

  it("每个类只记录自身声明的属性（继承由包装类沿原型链合并）", () => {
    expect(Object.keys(ElementAttributesMap.get(Base) ?? {})).toEqual(["name"]);
    expect(Object.keys(ElementAttributesMap.get(Child) ?? {}).sort()).toEqual([
      "disabled",
      "size",
    ]);
  });

  it("同一类的多次声明会累积到同一张表", () => {
    // registerPropertyMap 每次都基于已有表展开写入
    const table = ElementAttributesMap.get(Child) ?? {};
    expect(table["disabled"]).toBeDefined();
    expect(table["size"]).toBeDefined();
  });
});
