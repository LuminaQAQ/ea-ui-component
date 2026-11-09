import { describe, expect, it } from "vitest";
import { attribute } from "@decorator/attribute";
import { finalize } from "../schema";

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

describe("@attribute 声明", () => {
  it("元数据保留全部选项，并默认观察", () => {
    const meta = finalize(Child);

    expect(meta.props.get("disabled")).toMatchObject({
      type: Boolean,
      default: false,
      observer,
      a11y,
      attribute: true,
    });
    expect(meta.props.get("size")).toMatchObject({ type: Number });
  });

  it("沿原型链合并父类声明，子类只拥有自身部分", () => {
    expect(finalize(Base).props.has("name")).toBe(true);
    expect(finalize(Base).props.has("disabled")).toBe(false);

    expect(finalize(Child).props.get("name")).toMatchObject({
      type: String,
      default: "base",
    });
    expect([...finalize(Child).props.keys()].sort()).toEqual([
      "disabled",
      "name",
      "size",
    ]);
  });

  it("观察名只含小写连字符形式", () => {
    class Kebab {
      @attribute({ type: Boolean })
      showIcon = false;
    }

    expect(finalize(Kebab).observed).toEqual(["show-icon"]);
    expect(finalize(Kebab).attrToProp.get("show-icon")).toBe("showIcon");
  });

  it("元数据幂等，重复获取返回同一对象", () => {
    expect(finalize(Child)).toBe(finalize(Child));
  });
});
