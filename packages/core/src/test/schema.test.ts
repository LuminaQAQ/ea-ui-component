import { describe, expect, it } from "vitest";
import { attribute } from "@decorator/attribute";
import { property } from "@decorator/property";
import { declareAttribute, declareProperty, finalize } from "../schema";

describe("两张声明表", () => {
  it("static attributes 与 static properties 各自成表", () => {
    class Plain {
      static attributes = {
        max: { type: Number },
        label: { type: String, name: "data-label" },
      };
      static properties = { items: { type: Array } };
    }

    const meta = finalize(Plain);

    expect(meta.observed).toEqual(["max", "data-label"]);
    expect(meta.props.get("max")).toMatchObject({ attributeName: "max" });
    expect(meta.props.get("label")).toMatchObject({
      attributeName: "data-label",
    });
    expect(meta.props.get("items")).toMatchObject({ attributeName: null });
  });

  it("attribute 名省略时按属性名转小写连字符", () => {
    class Kebab {
      static attributes = { showIcon: { type: Boolean } };
    }

    expect(finalize(Kebab).observed).toEqual(["show-icon"]);
    expect(finalize(Kebab).attrToProp.get("show-icon")).toBe("showIcon");
  });

  it("两张表与装饰器混写时结果与书写顺序无关", () => {
    class StaticFirst {
      static attributes = { alpha: { type: String } };

      @attribute({ type: Number })
      beta = 0;
    }

    class DecoratorFirst {
      @attribute({ type: Number })
      beta = 0;

      static attributes = { alpha: { type: String } };
    }

    const a = finalize(StaticFirst);
    const b = finalize(DecoratorFirst);

    expect([...a.props.keys()].sort()).toEqual([...b.props.keys()].sort());
    expect(a.observed).toEqual(b.observed);
  });

  it("同表内装饰器声明覆盖 static 声明", () => {
    class Overridden {
      static attributes = { count: { type: String } };

      @attribute({ type: Number })
      count = 1;
    }

    expect(finalize(Overridden).props.get("count")).toMatchObject({
      attributeName: "count",
      decl: { type: Number },
    });
  });

  it("同层同名不得同时出现在两张表", () => {
    // 两张静态表同名
    class ConflictByStatic {
      static attributes = { count: { type: Number } };
      static properties = { count: { type: Number } };
    }

    // 静态表与装饰器跨表同名
    class ConflictMixed {
      static properties = { count: { type: Number } };

      @attribute({ type: Number })
      count = 0;
    }

    expect(() => finalize(ConflictByStatic)).toThrow(/同时出现在/);
    expect(() => finalize(ConflictMixed)).toThrow(/同时出现在/);
  });
});

describe("跨表改判", () => {
  it("父类 attribute、子类 property：归一化名变 null 并退出观察", () => {
    class Parent {
      @attribute({ type: String })
      name = "";
    }

    class Child extends Parent {
      @property({ type: String })
      name = "";
    }

    const meta = finalize(Child);

    expect(meta.props.get("name")).toMatchObject({ attributeName: null });
    expect(meta.observed).toEqual([]);
  });

  it("父类 property、子类 attribute：归一化名回填并进入观察", () => {
    class Parent {
      @property({ type: String })
      name = "";
    }

    class Child extends Parent {
      @attribute({ type: String })
      name = "";
    }

    const meta = finalize(Child);

    expect(meta.props.get("name")).toMatchObject({ attributeName: "name" });
    expect(meta.observed).toEqual(["name"]);
  });

  it("父类 static attributes、子类 static properties 改判", () => {
    class Parent {
      static attributes = { max: { type: Number } };
    }

    class Child extends Parent {
      static properties = { max: { type: Number } };
    }

    const meta = finalize(Child);

    expect(meta.props.get("max")).toMatchObject({ attributeName: null });
    expect(meta.observed).toEqual([]);
  });

  it("父类 static properties、子类 static attributes 改判", () => {
    class Parent {
      static properties = { items: { type: Array } };
    }

    class Child extends Parent {
      static attributes = { items: { type: Array } };
    }

    const meta = finalize(Child);

    expect(meta.props.get("items")).toMatchObject({ attributeName: "items" });
    expect(meta.observed).toEqual(["items"]);
  });

  it("子类只声明一张静态表时不重复收取父类静态表", () => {
    class Parent {
      static attributes = { a: { type: String } };
    }

    class Child extends Parent {
      static properties = { b: { type: String } };
    }

    const meta = finalize(Child);

    expect(meta.observed).toEqual(["a"]);
    expect(meta.props.get("a")).toMatchObject({ attributeName: "a" });
    expect(meta.props.get("b")).toMatchObject({ attributeName: null });
  });
});

describe("登记簿的作用域", () => {
  it("finalize 之后再登记不改变已生成的元数据", () => {
    class Late {}

    const meta = finalize(Late);
    expect(meta.observed).toEqual([]);

    declareAttribute(Late, "late", { type: String });
    declareProperty(Late, "inner", { type: String });

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

describe("继承与移除", () => {
  it("子类可用 false 从继承中移除属性（两张表皆可）", () => {
    class Parent {
      @attribute({ type: String })
      name = "";

      @property({ type: Number })
      count = 0;
    }

    class Child extends Parent {
      static attributes = { name: false };
      static properties = { count: false };
    }

    const meta = finalize(Child);

    expect(meta.props.has("name")).toBe(false);
    expect(meta.props.has("count")).toBe(false);
    expect(meta.observed).toEqual([]);
  });

  it("子类同名声明覆盖父类", () => {
    class Parent {
      @attribute({ type: String })
      label = "p";
    }

    class Child extends Parent {
      @attribute({ type: Number })
      label: any = 1;
    }

    expect(finalize(Child).props.get("label")).toMatchObject({
      decl: { type: Number },
    });
    expect(finalize(Child).observed).toEqual(["label"]);
  });

  it("两个属性映射到同一 attribute 时保留先声明者", () => {
    class Dup {
      static attributes = {
        a: { type: String, name: "shared" },
        b: { type: String, name: "shared" },
      };
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
