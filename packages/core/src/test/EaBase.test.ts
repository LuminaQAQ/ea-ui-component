import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import EaBase from "@core/EaBase";
import { CustomElement } from "@decorator/custom-element";

const tick = (): Promise<void> =>
  new Promise<void>(resolve => setTimeout(resolve, 0));

const flushMount = async (): Promise<void> => {
  await new Promise<void>(resolve => {
    requestAnimationFrame(() => setTimeout(resolve, 0));
  });
  await tick();
};

@CustomElement("ea-test-base")
class EaTestBase extends EaBase {
  static lifecycle: string[] = [];
  static locales: string[] = [];

  html(): string {
    return `<button class="first">1</button><button class="last">2</button>`;
  }

  $mount(): void {
    EaTestBase.lifecycle.push("mount");
  }

  $mounted(): void {
    EaTestBase.lifecycle.push("mounted");
  }

  $beforeUnmount(): void {
    EaTestBase.lifecycle.push("beforeUnmount");
  }

  $unmounted(): void {
    EaTestBase.lifecycle.push("unmounted");
  }

  $updateLocalization(locale: string): void {
    EaTestBase.locales.push(locale);
  }
}

const mount = async (): Promise<EaTestBase> => {
  const el = document.createElement("ea-test-base") as EaTestBase;
  document.body.append(el);
  await flushMount();
  return el;
};

beforeEach(() => {
  EaTestBase.lifecycle = [];
  EaTestBase.locales = [];
  document.body.innerHTML = "";
});

afterEach(async () => {
  await flushMount();
  document.body.innerHTML = "";
  await flushMount();
});

describe("EaBase 构造与属性", () => {
  it("构造时创建 open 模式的 ShadowRoot", () => {
    const el = document.createElement("ea-test-base");
    expect(el.shadowRoot).not.toBeNull();
    expect(el.shadowRoot?.mode).toBe("open");
  });

  it("locale 默认 en-US，赋值后通过 observer 通知子类", async () => {
    const el = await mount();
    expect(el.locale).toBe("en-US");

    el.locale = "zh-CN";
    await tick();
    expect(el.getAttribute("locale")).toBe("zh-CN");
    expect(EaTestBase.locales).toEqual(["zh-CN"]);
  });

  it("updateComplete 在挂载完成后可用", async () => {
    const el = await mount();
    await expect(el.updateComplete).resolves.toBeUndefined();
  });

  it("updateComplete 等待所有并发更新结束", async () => {
    const el = await mount();

    el._beginUpdate();
    el._beginUpdate();

    let done = false;
    el.updateComplete.then(() => {
      done = true;
    });

    await tick();
    expect(done).toBe(false);

    el._endUpdate();
    await tick();
    expect(done).toBe(false);

    el._endUpdate();
    await tick();
    expect(done).toBe(true);
  });
});

describe("EaBase 事件系统", () => {
  it("emit 派发冒泡且可穿透 shadow 边界的 CustomEvent", () => {
    const el = document.createElement("ea-test-base") as EaTestBase;
    document.body.append(el);

    const listener = vi.fn();
    document.addEventListener("ea-custom", listener);

    el.emit("ea-custom", { detail: { a: 1 } });
    expect(listener).toHaveBeenCalledTimes(1);

    const event = listener.mock.calls[0][0] as CustomEvent;
    expect(event.bubbles).toBe(true);
    expect(event.composed).toBe(true);
    expect(event.detail).toEqual({ a: 1 });

    document.removeEventListener("ea-custom", listener);
  });

  it("默认 $updated 会把属性变更派发为 updated 事件", async () => {
    const el = await mount();
    const listener = vi.fn();
    document.addEventListener("updated", listener);

    el.locale = "en-US";
    await tick();

    expect(listener).toHaveBeenCalled();
    const event = listener.mock.calls[0][0] as CustomEvent;
    expect(event.detail).toMatchObject({ key: "locale" });

    document.removeEventListener("updated", listener);
  });
});

describe("EaBase 生命周期", () => {
  it("挂载顺序为 $mount → $mounted", async () => {
    await mount();
    expect(EaTestBase.lifecycle).toEqual(["mount", "mounted"]);
  });

  it("断连时依次调用 $beforeUnmount / $unmounted 并派发同名事件", async () => {
    const el = await mount();

    // 事件在 disconnectedCallback 内派发，元素已脱离文档树：只能在本元素上监听，document 上的冒泡监听器收不到
    const beforeUnmount = vi.fn();
    const unmounted = vi.fn();
    el.addEventListener("beforeUnmount", beforeUnmount);
    el.addEventListener("unmounted", unmounted);

    el.remove();

    expect(EaTestBase.lifecycle).toEqual([
      "mount",
      "mounted",
      "beforeUnmount",
      "unmounted",
    ]);
    expect(beforeUnmount).toHaveBeenCalledTimes(1);
    expect(unmounted).toHaveBeenCalledTimes(1);
  });

  it("重连会重新执行挂载钩子", async () => {
    const el = await mount();
    el.remove();
    document.body.append(el);
    await flushMount();

    expect(EaTestBase.lifecycle).toEqual([
      "mount",
      "mounted",
      "beforeUnmount",
      "unmounted",
      "mount",
      "mounted",
    ]);
  });

  it("断连后 _isRendered 置空且重连不重建", async () => {
    const el = await mount();
    const internals = el as unknown as { _isRendered: Promise<void> | null };
    expect(internals._isRendered).toBeInstanceOf(Promise);

    el.remove();
    expect(internals._isRendered).toBeNull();

    document.body.append(el);
    await flushMount();
    // 重连后仍然为 null：_rendered resolver 没有被重建
    expect(internals._isRendered).toBeNull();
  });
});

describe("EaBase 焦点工具", () => {
  it("$getFocusableElements 默认只查 Shadow DOM", async () => {
    const el = await mount();
    const light = document.createElement("button");
    el.append(light);

    expect(el.$getFocusableElements().length).toBe(2);
    expect(el.$getFocusableElements("light").length).toBe(1);
    expect(el.$getFocusableElements("all").length).toBe(3);
  });

  it("$focusFirst / $focusLast 聚焦首尾可聚焦元素", async () => {
    const el = await mount();
    el.$focusFirst();
    expect(el.shadowRoot?.activeElement?.className).toBe("first");

    el.$focusLast();
    expect(el.shadowRoot?.activeElement?.className).toBe("last");
  });
});
