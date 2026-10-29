import { describe, expect, it } from "vitest";
import { property } from "@decorator/property";
import { ElementPropertiesMap } from "@stores/element-properties";

const observer = () => undefined;
const a11y = { ariaAttr: "aria-hidden" };

class Panel {
  @property({ type: String, default: "标题", observer, a11y })
  title: string = "标题";

  @property({ type: Array, default: [] })
  items: string[] = [];
}

describe("@property 注册", () => {
  it("按类写入 ElementPropertiesMap，保留 observer / a11y", () => {
    expect(ElementPropertiesMap.get(Panel)).toMatchObject({
      title: { type: String, default: "标题", observer, a11y },
      items: { type: Array, default: [] },
    });
  });

  it("与 @attribute 使用不同的注册表，互不污染", () => {
    expect(Object.keys(ElementPropertiesMap.get(Panel) ?? {}).sort()).toEqual([
      "items",
      "title",
    ]);
  });
});
