import { afterEach, beforeEach, describe, expect, it } from "vitest";
import EaBase from "@core/EaBase";
import { CustomElement } from "@decorator/custom-element";
import { attribute } from "@decorator/attribute";

type ObserverCall = [newValue: unknown, oldValue: unknown];

/** 排空一轮宏任务（属性回调是 async，观察者在微任务后执行） */
const tick = (): Promise<void> =>
  new Promise<void>(resolve => setTimeout(resolve, 0));

/** 等待 EaBase 的 rAF 挂载流程跑完 */
const flushMount = async (): Promise<void> => {
  await new Promise<void>(resolve => {
    requestAnimationFrame(() => setTimeout(resolve, 0));
  });
  await tick();
};

@CustomElement("ea-test-widget")
class EaTestWidget extends EaBase {
  static mountLog: string[] = [];
  static observed: ObserverCall[] = [];

  @attribute({
    type: String,
    default: "idle",
    observer(this: EaTestWidget, newVal: unknown, oldVal: unknown) {
      EaTestWidget.observed.push([newVal, oldVal]);
    },
  })
  state: string = "idle";

  @attribute({
    type: Number,
    default: 5,
    observer(this: EaTestWidget, newVal: unknown, oldVal: unknown) {
      EaTestWidget.observed.push([newVal, oldVal]);
    },
  })
  count: number = 5;

  @attribute({ type: Boolean, default: true })
  open: boolean = true;

  @attribute({ type: Boolean, default: false })
  pressed: boolean = false;

  @attribute({ type: Boolean, default: false })
  showIcon: boolean = false;

  @attribute({ type: String, default: "", a11y: { ariaAttr: "aria-label" } })
  label: string = "";

  html(): string {
    return `<span class="inner">${this.state}</span>`;
  }

  $mount(): void {
    EaTestWidget.mountLog.push("mount");
  }

  $mounted(): void {
    EaTestWidget.mountLog.push("mounted");
  }
}

@CustomElement("ea-test-widget-child")
class EaTestWidgetChild extends EaTestWidget {
  @attribute({ type: String, default: "child" })
  extra: string = "child";
}

/** 只挂载，不等待（用于观察“同步渲染、异步挂载”的时序） */
const appendWidget = (): EaTestWidget => {
  const el = document.createElement("ea-test-widget") as EaTestWidget;
  document.body.append(el);
  return el;
};

/** 挂载并等待 rAF 挂载流程完成 */
const mountWidget = async (): Promise<EaTestWidget> => {
  const el = appendWidget();
  await flushMount();
  return el;
};

beforeEach(() => {
  EaTestWidget.mountLog = [];
  EaTestWidget.observed = [];
  document.body.innerHTML = "";
});

afterEach(async () => {
  // 排空本用例产生的挂载回调，避免 rAF 跨用例污染静态日志
  await flushMount();
  document.body.innerHTML = "";
  await flushMount();
});

describe("@CustomElement 注册与包装类", () => {
  it("注册的是包装类，实例仍是用户类", () => {
    expect(customElements.get("ea-test-widget")).toBeDefined();
    expect(document.createElement("ea-test-widget")).toBeInstanceOf(
      EaTestWidget
    );
  });

  it("observedAttributes 同时包含 kebab 与 camel 两种写法（camel 条目实际匹配不到）", () => {
    const observed = (
      customElements.get("ea-test-widget") as unknown as {
        observedAttributes: string[];
      }
    ).observedAttributes;

    expect(observed).toContain("state");
    expect(observed).toContain("showIcon");
    expect(observed).toContain("show-icon");
    // 特征测试：HTML 属性名会被小写化，camelCase 条目是死条目（P1-3）
    expect(observed).not.toContain("showicon");
  });

  it("子类继承父类的 observedAttributes 并追加自身属性", () => {
    const observed = (
      customElements.get("ea-test-widget-child") as unknown as {
        observedAttributes: string[];
      }
    ).observedAttributes;

    expect(observed).toContain("state");
    expect(observed).toContain("extra");
  });

  it("子类实例同时具备父类与自身属性的访问器", async () => {
    const el = document.createElement(
      "ea-test-widget-child"
    ) as EaTestWidgetChild;
    document.body.append(el);

    el.count = 9;
    el.extra = "x";
    expect(el.getAttribute("count")).toBe("9");
    expect(el.getAttribute("extra")).toBe("x");
  });
});

describe("@attribute 读写与类型解析", () => {
  it("属性赋值反射到 HTML 属性，读取时按类型解析", async () => {
    const el = await mountWidget();
    el.count = 7;
    expect(el.getAttribute("count")).toBe("7");
    expect(el.count).toBe(7);
  });

  it("observer 收到解析后的新旧值", async () => {
    const el = await mountWidget();
    el.count = 7;
    await tick();
    el.setAttribute("count", "9");
    await tick();

    expect(EaTestWidget.observed).toEqual([
      [7, 5],
      [9, 7],
    ]);
  });

  it('布尔属性：空串为 true，"false" 为 false', async () => {
    const el = await mountWidget();
    el.setAttribute("pressed", "");
    expect(el.pressed).toBe(true);
    el.setAttribute("pressed", "false");
    expect(el.pressed).toBe(false);
  });

  it("布尔默认 true 的属性在连接时被自动写入", async () => {
    const el = await mountWidget();
    expect(el.hasAttribute("open")).toBe(true);
  });

  it("特征测试：移除属性后 observer 收到默认值（P0-4）", async () => {
    const el = await mountWidget();
    el.setAttribute("count", "9");
    await tick();
    el.removeAttribute("count");
    await tick();

    // 当前契约：newVal 为默认值 5，而不是 null / undefined
    expect(EaTestWidget.observed[EaTestWidget.observed.length - 1]).toEqual([
      5, 9,
    ]);
    // 于是观察者无法区分“属性被删除”与“属性被显式设为默认值”；
    // 带约束下发的组件（如 ea-input 的 maxlength）会因此把默认值写回目标元素。
    expect(el.getAttribute("count")).toBeNull();
    expect(el.count).toBe(5);
  });

  it("a11y 配置把值同步到 ARIA 属性", async () => {
    const el = await mountWidget();
    expect(el.getAttribute("aria-label")).toBe("");

    el.setAttribute("label", "说明");
    await tick();
    expect(el.getAttribute("aria-label")).toBe("说明");
  });
});

describe("渲染与生命周期", () => {
  it("connectedCallback 内同步渲染模板，$mount/$mounted 在 rAF 中执行", async () => {
    const el = appendWidget();

    expect(el.shadowRoot?.querySelector(".inner")?.textContent).toBe("idle");
    expect(EaTestWidget.mountLog).toEqual([]);

    await flushMount();
    expect(EaTestWidget.mountLog).toEqual(["mount", "mounted"]);
  });

  it("updateComplete 在挂载完成后 resolve", async () => {
    const el = await mountWidget();
    await expect(el.updateComplete).resolves.toBeUndefined();
  });

  it("断连后重连会重新渲染并重新执行挂载钩子", async () => {
    const el = await mountWidget();
    expect(EaTestWidget.mountLog).toEqual(["mount", "mounted"]);

    el.remove();
    document.body.append(el);
    expect(el.shadowRoot?.querySelector(".inner")).not.toBeNull();

    await flushMount();
    expect(EaTestWidget.mountLog).toEqual([
      "mount",
      "mounted",
      "mount",
      "mounted",
    ]);
  });

  it("模板不会因属性变化自动重渲染（无 diff，靠组件自行更新）", async () => {
    const el = await mountWidget();
    el.state = "active";
    await flushMount();
    expect(el.state).toBe("active");
    expect(el.shadowRoot?.querySelector(".inner")?.textContent).toBe("idle");
  });
});

describe("异步 $mount 的时序（P1-1 特征）", () => {
  it("$mount 未完成时属性 observer 已经执行", async () => {
    let releaseMount: (() => void) | undefined;
    const calls: unknown[] = [];

    @CustomElement("ea-test-async-mount")
    class EaTestAsyncMount extends EaBase {
      @attribute({
        type: String,
        default: "a",
        observer(newVal: unknown) {
          calls.push(newVal);
        },
      })
      value: string = "a";

      $mount(): Promise<void> {
        return new Promise<void>(resolve => {
          releaseMount = resolve;
        });
      }
    }

    const el = document.createElement(
      "ea-test-async-mount"
    ) as EaTestAsyncMount;
    document.body.append(el);

    await flushMount();
    expect(typeof releaseMount).toBe("function");
    expect(calls).toEqual([]);

    el.setAttribute("value", "b");
    await tick();

    // 特征测试：attributeChangedCallback 只等 _isRendered（$mount 被调用），不等挂载完成
    expect(calls).toEqual(["b"]);

    releaseMount?.();
    await flushMount();
  });
});
