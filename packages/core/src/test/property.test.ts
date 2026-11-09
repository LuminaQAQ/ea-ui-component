import { describe, expect, it } from "vitest";
import { attribute } from "@decorator/attribute";
import { property } from "@decorator/property";
import { finalize } from "../schema";

const observer = () => undefined;
const a11y = { ariaAttr: "aria-hidden" };

class Panel {
  @property({ type: String, default: "标题", observer, a11y })
  title: string = "标题";

  @property({ type: Array, default: [] })
  items: string[] = [];
}

describe("@property 声明", () => {
  it("保留 observer / a11y，并标记为不观察", () => {
    expect(finalize(Panel).props.get("title")).toMatchObject({
      type: String,
      default: "标题",
      observer,
      a11y,
      attribute: false,
    });
  });

  it("不观察的属性不进入 observedAttributes", () => {
    const meta = finalize(Panel);

    expect(meta.observed).toEqual([]);
    expect(meta.attrToProp.size).toBe(0);
  });

  it("显式指定 attribute 时进入观察列表", () => {
    class Mixed {
      @property({ type: String, attribute: "data-tag" })
      tag: string = "";
    }

    const meta = finalize(Mixed);

    expect(meta.observed).toEqual(["data-tag"]);
    expect(meta.attrToProp.get("data-tag")).toBe("tag");
  });

  it("与 @attribute 共用一张声明表", () => {
    class Both {
      @property({ type: String })
      internal: string = "";

      @attribute({ type: Number })
      count: number = 0;
    }

    const meta = finalize(Both);

    expect([...meta.props.keys()].sort()).toEqual(["count", "internal"]);
    expect(meta.observed).toEqual(["count"]);
  });
});
