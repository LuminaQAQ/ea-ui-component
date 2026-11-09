import { describe, expect, it } from "vitest";
import { attribute } from "@decorator/attribute";
import { declareProperty, finalize } from "../schema";

describe("声明的两种来源", () => {
  it("只写 static properties 也能生成元数据", () => {
    class Plain {
      static properties = {
        max: { type: Number, default: 5 },
        tag: { type: String, attribute: "data-tag" },
        items: { type: Array, attribute: false },
      };
    }

    const meta = finalize(Plain);

    expect(meta.observed).toEqual(["max", "data-tag"]);
    expect(meta.attrToProp.get("max")).toBe("max");
    expect(meta.attrToProp.get("data-tag")).toBe("tag");
    expect(meta.props.get("items")).toMatchObject({ attribute: false });
  });

  it("static properties 与装饰器混写时结果与书写顺序无关", () => {
    class StaticFirst {
      static properties = { alpha: { type: String } };

      @attribute({ type: Number })
      beta = 0;
    }

    class DecoratorFirst {
      @attribute({ type: Number })
      beta = 0;

      static properties = { alpha: { type: String } };
    }

    const a = finalize(StaticFirst);
    const b = finalize(DecoratorFirst);

    expect([...a.props.keys()].sort()).toEqual([...b.props.keys()].sort());
    expect(a.props).toEqual(b.props);
    expect(a.observed).toEqual(b.observed);
  });

  it("同名的装饰器声明覆盖 static properties", () => {
    class Overridden {
      static properties = { count: { type: String, default: "s" } };

      @attribute({ type: Number, default: 1 })
      count = 1;
    }

    expect(finalize(Overridden).props.get("count")).toMatchObject({
      type: Number,
      default: 1,
    });
  });
});

describe("登记簿的作用域", () => {
  it("finalize 之后再登记不改变已生成的元数据", () => {
    class Late {}

    const meta = finalize(Late);
    expect(meta.observed).toEqual([]);

    declareProperty(Late, "late", { type: String });

    expect(finalize(Late)).toBe(meta);
    expect(finalize(Late).observed).toEqual([]);
  });

  it("每个类只消费自身的登记", () => {
    class Parent {
      @attribute({ type: String })
      name = "";
    }

    class Child extends Parent {
      @attribute({ type: Number })
      size = 0;
    }

    expect(finalize(Parent).observed).toEqual(["name"]);
    expect(finalize(Child).observed).toEqual(["name", "size"]);
  });
});

describe("继承与冲突", () => {
  it("子类可把继承来的属性声明为不观察", () => {
    class Parent {
      @attribute({ type: String })
      name = "";
    }

    class Child extends Parent {
      static properties = { name: false };
    }

    const meta = finalize(Child);

    expect(meta.props.has("name")).toBe(false);
    expect(meta.observed).toEqual([]);
  });

  it("子类同名声明覆盖父类", () => {
    class Parent {
      @attribute({ type: String, default: "p" })
      label = "p";
    }

    class Child extends Parent {
      @attribute({ type: Number, default: 1 })
      label: any = 1;
    }

    expect(finalize(Child).props.get("label")).toMatchObject({
      type: Number,
      default: 1,
    });
    expect(finalize(Child).observed).toEqual(["label"]);
  });

  it("两个属性映射到同一 attribute 时保留先声明者", () => {
    class Dup {
      @attribute({ type: String, attribute: "shared" })
      a = "";

      @attribute({ type: String, attribute: "shared" })
      b = "";
    }

    const meta = finalize(Dup);

    expect(meta.observed).toEqual(["shared"]);
    expect(meta.attrToProp.get("shared")).toBe("a");
  });

  it("元数据只生成一次", () => {
    class Once {
      @attribute({ type: Boolean })
      on = false;
    }

    const first = finalize(Once);

    expect(finalize(Once)).toBe(first);
    expect(finalize(Once).observed).toEqual(["on"]);
  });
});
