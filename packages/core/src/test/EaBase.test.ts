import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import EaBase from "@core/EaBase";
import { CustomElement } from "@decorator/custom-element";
import { attribute } from "@decorator/attribute";

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

  it("requestUpdate 合并同一轮的多次变更，且不再派发 updated DOM 事件", async () => {
    const el = await mount();
    const listener = vi.fn();
    document.addEventListener("updated", listener);
    const updated = vi.spyOn(el, "$updated");

    el.requestUpdate("locale", "a", "b");
    el.requestUpdate("locale", "b", "c");
    el.requestUpdate("size", undefined, 10);
    await tick();

    expect(listener).not.toHaveBeenCalled();
    expect(updated).toHaveBeenCalledTimes(1);

    const changed = updated.mock.calls[0][0];
    expect(changed.get("locale")).toEqual({ oldValue: "a", newValue: "c" });
    expect(changed.get("size")).toEqual({
      oldValue: undefined,
      newValue: 10,
    });

    document.removeEventListener("updated", listener);
  });

  it("属性变更写入 changed map 并交给 $updated", async () => {
    const el = await mount();
    const updated = vi.spyOn(el, "$updated");

    el.locale = "zh-CN";
    await tick();

    expect(updated).toHaveBeenCalled();
    const calls = updated.mock.calls;
    const changed = calls[calls.length - 1][0];
    expect(changed.get("locale")).toEqual({
      oldValue: null,
      newValue: "zh-CN",
    });
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

  it("lifecycleState 依次经过 mounting → ready，断连后为 disconnected", async () => {
    const el = document.createElement("ea-test-base") as EaTestBase;
    expect(el.lifecycleState).toBe("idle");

    document.body.append(el);
    expect(el.lifecycleState).toBe("mounting");

    await flushMount();
    expect(el.lifecycleState).toBe("ready");

    el.remove();
    expect(el.lifecycleState).toBe("disconnected");
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

// ==================== 属性回调的就绪点契约（B4 第 1 步） ====================

/** 由用例控制何时完成异步 $mount */
let releaseAsyncMount: (() => void) | null = null;

@CustomElement("ea-async-mount-base")
class EaAsyncMountBase extends EaBase {
  static mountedCount = 0;
  static snapshots: { mounted: number; templateReady: boolean }[] = [];

  html(): string {
    return `<span class="async-slot"></span>`;
  }

  @attribute({
    type: String,
    observer(this: EaAsyncMountBase) {
      EaAsyncMountBase.snapshots.push({
        mounted: EaAsyncMountBase.mountedCount,
        templateReady: !!this.shadowRoot?.querySelector(".async-slot"),
      });
    },
  })
  label: string = "";

  async $mount(): Promise<void> {
    await new Promise<void>(resolve => {
      releaseAsyncMount = resolve;
    });
  }

  $mounted(): void {
    EaAsyncMountBase.mountedCount += 1;
  }
}

const mountAsync = async (): Promise<EaAsyncMountBase> => {
  const el = document.createElement("ea-async-mount-base") as EaAsyncMountBase;
  document.body.append(el);
  el.setAttribute("label", "init");
  await flushMount();
  releaseAsyncMount?.();
  await flushMount();
  return el;
};

describe("EaBase 属性回调的就绪点", () => {
  beforeEach(() => {
    releaseAsyncMount = null;
    EaAsyncMountBase.mountedCount = 0;
    EaAsyncMountBase.snapshots = [];
  });

  it("连接前到达的属性变更，等挂载完成后才回调", async () => {
    const el = document.createElement(
      "ea-async-mount-base"
    ) as EaAsyncMountBase;
    el.setAttribute("label", "before");
    document.body.append(el);

    await flushMount();
    expect(EaAsyncMountBase.snapshots).toEqual([]);

    releaseAsyncMount?.();
    await flushMount();
    expect(EaAsyncMountBase.snapshots).toEqual([
      { mounted: 1, templateReady: true },
    ]);
  });

  it("connect 后、rAF 前到达的属性变更，等挂载完成后才回调", async () => {
    const el = document.createElement(
      "ea-async-mount-base"
    ) as EaAsyncMountBase;
    document.body.append(el);
    el.setAttribute("label", "sync-after-connect");

    await flushMount();
    expect(EaAsyncMountBase.snapshots).toEqual([]);

    releaseAsyncMount?.();
    await flushMount();
    expect(EaAsyncMountBase.snapshots).toEqual([
      { mounted: 1, templateReady: true },
    ]);
  });

  it("异步 $mount 期间到达的属性变更，等 $mounted 完成后才回调", async () => {
    const el = document.createElement(
      "ea-async-mount-base"
    ) as EaAsyncMountBase;
    document.body.append(el);
    await flushMount();

    el.setAttribute("label", "during-mount");
    await flushMount();
    expect(EaAsyncMountBase.snapshots).toEqual([]);

    releaseAsyncMount?.();
    await flushMount();
    expect(EaAsyncMountBase.snapshots).toEqual([
      { mounted: 1, templateReady: true },
    ]);
  });

  it("重连后的属性变更重新等待新一轮挂载", async () => {
    const el = await mountAsync();
    expect(EaAsyncMountBase.snapshots).toEqual([
      { mounted: 1, templateReady: true },
    ]);

    EaAsyncMountBase.snapshots = [];
    el.remove();
    document.body.append(el);
    el.setAttribute("label", "after-reconnect");

    await flushMount();
    expect(EaAsyncMountBase.snapshots).toEqual([]);

    releaseAsyncMount?.();
    await flushMount();
    expect(EaAsyncMountBase.snapshots).toEqual([
      { mounted: 2, templateReady: true },
    ]);
  });

  it("断连后的属性变更立即放行，不阻塞也不等待旧门", async () => {
    const el = await mountAsync();
    EaAsyncMountBase.snapshots = [];

    el.remove();
    el.setAttribute("label", "after-disconnect");
    await tick();

    expect(EaAsyncMountBase.snapshots).toEqual([
      { mounted: 1, templateReady: true },
    ]);
  });
});
