import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import EaBase from "@core/EaBase";
import { CustomElement } from "@decorator/custom-element";
import { getBaseStyles, setBaseStyles } from "@stores/base-styles";
import { configureDiagnostics, resetDiagnostics } from "@utils/diagnostics";

@CustomElement("ea-test-based", { styles: [".widget { color: red; }"] })
class EaTestBased extends EaBase {
  html(): string {
    return `<span class="widget">x</span>`;
  }
}

/** 挂载一个带类链样式的测试组件，返回其 ShadowRoot 内的样式文本序列 */
const mountStyles = async (): Promise<(string | null)[]> => {
  const el = document.createElement("ea-test-based") as EaTestBased;

  document.body.append(el);
  await el.updateComplete;

  const shadowRoot = el.shadowRoot as ShadowRoot;
  const styles = [...shadowRoot.querySelectorAll("style")].map(
    node => node.textContent
  );

  el.remove();

  return styles;
};

describe("基础样式（setBaseStyles / getBaseStyles）", () => {
  beforeEach(() => {
    setBaseStyles([]);
  });

  afterEach(() => {
    setBaseStyles([]);
    resetDiagnostics();
  });

  it("默认为空，组件只带类链样式", async () => {
    expect(getBaseStyles()).toEqual([]);

    const styles = await mountStyles();

    expect(styles).toEqual([".widget { color: red; }"]);
  });

  it("接受单个字符串或数组，重复内容只保留一份", () => {
    setBaseStyles("a{}");
    expect(getBaseStyles()).toEqual(["a{}"]);

    setBaseStyles(["a{}", "a{}", "b{}"]);
    expect(getBaseStyles()).toEqual(["a{}", "b{}"]);
  });

  it("空值与非字符串被忽略，空数组回到裸样式", () => {
    setBaseStyles(["", "   ", "c{}"]);
    expect(getBaseStyles()).toEqual(["c{}"]);

    setBaseStyles(null);
    expect(getBaseStyles()).toEqual([]);

    setBaseStyles(undefined);
    expect(getBaseStyles()).toEqual([]);
  });

  it("基础样式排在类链样式之前，且与类链重复时只出现一次", async () => {
    setBaseStyles(["/* base-a */", ".widget { color: red; }"]);

    const styles = await mountStyles();

    expect(styles).toEqual(["/* base-a */", ".widget { color: red; }"]);
  });

  it("不支持 adoptedStyleSheets 时降级为 <style> 并告警一次", async () => {
    configureDiagnostics({ filter: () => true });

    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);

    await mountStyles();
    await mountStyles();

    expect(warn).toHaveBeenCalledTimes(1);
    expect(String(warn.mock.calls[0][0])).toContain(
      "styles.adopted-unsupported"
    );

    warn.mockRestore();
  });
});
