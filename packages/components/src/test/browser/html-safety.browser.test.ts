import { describe, it, expect, beforeEach, afterEach } from "vitest";

import "../../components/ea-alert/index.ts";
import "../../components/ea-result/index.ts";

describe("HTML 安全边界（真实浏览器）", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.append(container);
  });

  afterEach(() => {
    container.remove();
  });

  it("属性里的 script 不会执行，按字面文本渲染", async () => {
    const flag = "eaAlertScriptRan";
    delete (window as unknown as Record<string, unknown>)[flag];

    (window as unknown as Record<string, unknown>)[flag] = () => undefined;

    const alert = document.createElement("ea-alert");
    alert.setAttribute("heading", "<script>window.eaAlertScriptRan()</script>");
    container.append(alert);
    await (alert as unknown as { updateComplete: Promise<void> })
      .updateComplete;

    const heading =
      alert.shadowRoot!.querySelector<HTMLElement>(".ea-alert__heading");

    expect(heading!.querySelector("script")).toBeNull();
    expect(heading!.textContent).toContain("<script>");
  });

  it("属性里的 img onerror 不会触发网络请求", async () => {
    const result = document.createElement("ea-result");
    result.setAttribute(
      "sub-title",
      '<img src="/not-exist-x.png" onerror="1">'
    );
    container.append(result);
    await (result as unknown as { updateComplete: Promise<void> })
      .updateComplete;

    expect(result.shadowRoot!.querySelector("img[onerror]")).toBeNull();
  });

  it("heading slot 可以承载富文本", async () => {
    const alert = document.createElement("ea-alert");
    alert.innerHTML = '<b slot="heading">Bold</b>';
    container.append(alert);
    await (alert as unknown as { updateComplete: Promise<void> })
      .updateComplete;

    const slot = alert.shadowRoot!.querySelector<HTMLSlotElement>(
      'slot[name="heading"]'
    );

    expect(slot!.assignedElements()[0]?.tagName.toLowerCase()).toBe("b");
  });
});
