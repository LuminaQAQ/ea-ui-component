import { describe, expect, it } from "vitest";
import { StylesheetCache } from "@stores/stylesheet-cache";

// jsdom 不一定实现 CSSStyleSheet 构造器/ replaceSync，缺失时跳过
const supported =
  typeof CSSStyleSheet !== "undefined" &&
  typeof (CSSStyleSheet.prototype as { replaceSync?: unknown }).replaceSync ===
    "function";

describe.skipIf(!supported)("StylesheetCache", () => {
  it("同一份 CSS 只创建一次实例", () => {
    StylesheetCache.clear();
    const a = StylesheetCache.getOrCreate(".a{}");
    const b = StylesheetCache.getOrCreate(".a{}");

    expect(a).toBe(b);
    expect(StylesheetCache.size).toBe(1);
    expect(StylesheetCache.has(".a{}")).toBe(true);
  });

  it("不同 CSS 生成不同实例", () => {
    StylesheetCache.clear();
    const a = StylesheetCache.getOrCreate(".a{}");
    const b = StylesheetCache.getOrCreate(".b{}");

    expect(a).not.toBe(b);
    expect(StylesheetCache.size).toBe(2);
  });

  it("clear() 清空缓存", () => {
    StylesheetCache.getOrCreate(".c{}");
    StylesheetCache.clear();

    expect(StylesheetCache.size).toBe(0);
    expect(StylesheetCache.has(".c{}")).toBe(false);
  });
});
