import { afterEach, beforeEach, describe, expect, it } from "vitest";
import EaBase from "@core/EaBase";
import { CustomElement } from "@decorator/custom-element";
import { listen } from "@decorator/listen";

@CustomElement("ea-test-listen")
class EaTestListen extends EaBase {
  static calls: string[] = [];

  html(): string {
    return `<button class="btn">btn</button><div class="other">other</div>`;
  }

  @listen("click", ".btn")
  handleBtn(): void {
    EaTestListen.calls.push("btn");
  }

  @listen("ea-ping")
  handlePing(): void {
    EaTestListen.calls.push("ping");
  }

  @listen("scroll", "window")
  handleScroll(): void {
    EaTestListen.calls.push("scroll");
  }
}

const mount = (): EaTestListen => {
  const el = document.createElement("ea-test-listen") as EaTestListen;
  document.body.append(el);
  return el;
};

beforeEach(() => {
  EaTestListen.calls = [];
  document.body.innerHTML = "";
});

afterEach(() => {
  document.body.innerHTML = "";
});

describe("@listen", () => {
  it("选择器命中时触发，未命中不触发", () => {
    const el = mount();
    const btn = el.shadowRoot?.querySelector(".btn") as HTMLButtonElement;
    const other = el.shadowRoot?.querySelector(".other") as HTMLDivElement;

    other.click();
    expect(EaTestListen.calls).toEqual([]);

    btn.click();
    expect(EaTestListen.calls).toEqual(["btn"]);
  });

  it("无选择器时监听宿主自身事件", () => {
    const el = mount();
    el.dispatchEvent(new Event("ea-ping"));
    expect(EaTestListen.calls).toEqual(["ping"]);
  });

  it('"window" 作为目标时监听全局事件', () => {
    mount();
    window.dispatchEvent(new Event("scroll"));
    expect(EaTestListen.calls).toEqual(["scroll"]);
  });

  it("断连后自动解绑", () => {
    const el = mount();
    el.remove();

    el.dispatchEvent(new Event("ea-ping"));
    window.dispatchEvent(new Event("scroll"));
    expect(EaTestListen.calls).toEqual([]);
  });

  it("重连后重新绑定", () => {
    const el = mount();
    el.remove();
    document.body.append(el);

    el.dispatchEvent(new Event("ea-ping"));
    expect(EaTestListen.calls).toEqual(["ping"]);
  });
});
