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
  it("保留 observer / a11y，且不映射 HTML attribute", () => {
    expect(finalize(Panel).props.get("title")).toMatchObject({
      attributeName: null,
      decl: { type: String, default: "标题", observer, a11y },
    });
  });

  it("不进入 observedAttributes", () => {
    const meta = finalize(Panel);

    expect(meta.observed).toEqual([]);
    expect(meta.attrToProp.size).toBe(0);
  });

  it("与 @attribute 分属两张表，归一化结果合并到同一张 props", () => {
    class Both {
      @property({ type: String })
      internal: string = "";

      @attribute({ type: Number })
      count: number = 0;
    }

    const meta = finalize(Both);

    expect([...meta.props.keys()].sort()).toEqual(["count", "internal"]);
    expect(meta.props.get("count")).toMatchObject({ attributeName: "count" });
    expect(meta.props.get("internal")).toMatchObject({ attributeName: null });
    expect(meta.observed).toEqual(["count"]);
  });
});
