import { afterEach, describe, expect, it } from "vitest";
import { getBaseStyles, StylesheetCache } from "@easy-component-ui/core";

import "../../index.ts";

interface EaWidget extends HTMLElement {
  updateComplete: Promise<void>;
}

const createButton = (): EaWidget =>
  document.createElement("ea-button") as EaWidget;

const mount = async (node: EaWidget): Promise<EaWidget> => {
  document.body.append(node);
  await node.updateComplete;
  return node;
};

describe("基础样式注入（真实浏览器）", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    StylesheetCache.clear();
  });

  it("聚合入口注入语义变量层，带 :host 与 :root 双上下文", () => {
    const css = getBaseStyles().join("\n");

    expect(getBaseStyles().length).toBeGreaterThan(0);
    expect(css).toContain(":host,");
    expect(css).toContain(":root");
    expect(css).toContain("--color-white");
  });

  it("基础样式位于 adoptedStyleSheets 首位", async () => {
    const node = await mount(createButton());
    const sheets = node.shadowRoot!.adoptedStyleSheets;

    expect(sheets.length).toBeGreaterThan(1);
    expect(sheets[0].cssRules[0].cssText).toContain("--color-white");
  });

  it("同类实例增加不改变 CSSStyleSheet 数量", async () => {
    const first = await mount(createButton());
    const baseline = StylesheetCache.size;

    expect(baseline).toBeGreaterThan(0);

    const rest = Array.from({ length: 49 }, () => createButton());

    rest.forEach(node => document.body.append(node));
    await Promise.all(rest.map(node => node.updateComplete));

    expect(StylesheetCache.size).toBe(baseline);

    const sharedSheets = new Set(
      [first, ...rest].map(node => node.shadowRoot!.adoptedStyleSheets[0])
    );

    expect(sharedSheets.size).toBe(1);
  });
});
