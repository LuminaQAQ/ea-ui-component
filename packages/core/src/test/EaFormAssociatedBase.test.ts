import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { EaFormAssociatedBase } from "@core/EaFormAssociatedBase";
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

@CustomElement("ea-test-field")
class EaTestField extends EaFormAssociatedBase {
  _input: HTMLInputElement = document.createElement("input");

  get validationTarget(): HTMLInputElement {
    return this._input;
  }
}

/** 指定自己的提示锚点 */
@CustomElement("ea-test-anchor-field")
class EaTestAnchorField extends EaFormAssociatedBase {
  _input: HTMLInputElement = document.createElement("input");

  _anchor: HTMLElement = document.createElement("span");

  get validationTarget(): HTMLInputElement {
    return this._input;
  }

  protected $validationAnchor(): HTMLElement {
    return this._anchor;
  }
}

const observerCalls: Array<[unknown, unknown]> = [];

@CustomElement("ea-test-observer")
class EaTestObserver extends EaFormAssociatedBase {
  @attribute({
    type: Number,
    observer(this: EaTestObserver, value: unknown, previous: unknown) {
      observerCalls.push([value, previous]);
    },
  })
  level: number | null = null;
}

const mount = async (): Promise<EaTestField> => {
  const el = document.createElement("ea-test-field") as EaTestField;
  document.body.append(el);
  await flushMount();
  return el;
};

const mountObserver = async (): Promise<EaTestObserver> => {
  const el = document.createElement("ea-test-observer") as EaTestObserver;
  document.body.append(el);
  await flushMount();
  return el;
};

beforeEach(() => {
  observerCalls.length = 0;
  document.body.innerHTML = "";
});

afterEach(async () => {
  await flushMount();
  document.body.innerHTML = "";
  await flushMount();
});

describe("EaFormAssociatedBase 属性默认值", () => {
  it("name / value 默认为空串，type 默认取标签名，form 默认取 internals.form", async () => {
    const el = await mount();

    expect(el.name).toBe("");
    expect(el.value).toBe("");
    expect(el.type).toBe("ea-test-field");
    expect(el.form).toBeNull();
    expect(el.getForm()).toBeNull();
  });

  it("willValidate / validity / validationMessage 直接读取 internals", async () => {
    const el = await mount();

    expect(el.willValidate).toBe(el.internals.willValidate);
    expect(el.validity?.valid).toBe(el.internals.validity.valid);
    expect(el.validationMessage).toBe(el.internals.validationMessage);
  });

  it("HTML 属性不影响只读派生值", async () => {
    const el = await mount();
    const before = el.validity?.valid;

    el.setAttribute("validity", "x");
    el.setAttribute("willValidate", "true");

    expect(el.validity?.valid).toBe(before);
    expect(typeof el.validity).toBe("object");
    expect(el.willValidate).toBe(el.internals.willValidate);
  });
});

describe("约束下发（初始 / 设置 / 移除）", () => {
  it("初始状态下目标元素不带任何约束属性", async () => {
    const el = await mount();

    for (const attr of [
      "required",
      "min",
      "max",
      "minlength",
      "maxlength",
      "pattern",
    ]) {
      expect(el.validationTarget.hasAttribute(attr)).toBe(false);
    }
  });

  it("设置后转发到 validationTarget", async () => {
    const el = await mount();

    el.required = true;
    el.min = 3;
    el.max = 9;
    el.minlength = 1;
    el.maxlength = 8;
    el.pattern = "\\d+";
    await tick();

    expect(el.validationTarget.hasAttribute("required")).toBe(true);
    expect(el.validationTarget.getAttribute("min")).toBe("3");
    expect(el.validationTarget.getAttribute("max")).toBe("9");
    expect(el.validationTarget.getAttribute("minlength")).toBe("1");
    expect(el.validationTarget.getAttribute("maxlength")).toBe("8");
    expect(el.validationTarget.getAttribute("pattern")).toBe("\\d+");
  });

  it("移除约束后清除目标元素上的同名属性", async () => {
    const el = await mount();

    el.min = 3;
    await tick();
    expect(el.validationTarget.getAttribute("min")).toBe("3");

    el.removeAttribute("min");
    await tick();

    expect(el.min).toBeNull();
    expect(el.validationTarget.hasAttribute("min")).toBe(false);
  });

  it('空串按未设置处理：maxlength="" 不锁死输入', async () => {
    const el = await mount();

    el.setAttribute("maxlength", "");
    await tick();

    expect(el.maxlength).toBeNull();
    expect(el.validationTarget.hasAttribute("maxlength")).toBe(false);
  });

  it("validationTarget 为 undefined 时约束下发静默跳过", async () => {
    @CustomElement("ea-test-field-no-target")
    class EaTestFieldNoTarget extends EaFormAssociatedBase {}

    const el = document.createElement(
      "ea-test-field-no-target"
    ) as EaTestFieldNoTarget;
    document.body.append(el);
    await flushMount();

    expect(() => {
      el.required = true;
      el.min = 1;
    }).not.toThrow();
  });
});

describe("observer 入参", () => {
  it("只归一化 value，previous 初次为 null，移除时 value 为 null", async () => {
    const el = await mountObserver();

    el.setAttribute("level", "2");
    await tick();
    el.removeAttribute("level");
    await tick();

    expect(observerCalls).toEqual([
      [2, null],
      [null, 2],
    ]);
  });
});

describe("校验与表单值", () => {
  it("setCustomValidity 让字段进入无效状态，resetCustomValidity 恢复", async () => {
    const el = await mount();

    el.setCustomValidity("必须填写");
    expect(el.internals.validationMessage).toBe("必须填写");
    expect(el.checkValidity()).toBe(false);

    el.resetCustomValidity();
    expect(el.checkValidity()).toBe(true);
  });

  it("required + 空值由基类判定，不依赖内部元素的 dirty 标记", async () => {
    const el = await mount();
    el.required = true;
    el.value = "";
    await tick();

    el.updateValidity();
    expect(el.checkValidity()).toBe(false);

    el.value = "填好了";
    el._input.value = "填好了";
    el.updateValidity();
    expect(el.checkValidity()).toBe(true);
  });

  it("setValue / removeValue 转发到 internals", async () => {
    const el = await mount();
    const spy = vi.spyOn(el.internals, "setFormValue");

    el.setValue("v");
    el.removeValue();
    expect(spy).toHaveBeenCalledTimes(2);
  });
});

describe("表单生命周期回调", () => {
  it("minlength / maxlength 由基类统一计算，程序赋值也会触发", async () => {
    const el = await mount();

    el.minlength = 3;
    el.value = "ab";
    el.updateValidity();
    expect(el.validationMessage).toBe("请至少输入 3 个字符");

    el.minlength = null;
    el.maxlength = 1;
    el.value = "abc";
    el.updateValidity();
    expect(el.validationMessage).toBe("请最多输入 1 个字符");

    el.maxlength = null;
    el.value = "a";
    el.updateValidity();
    expect(el.validity?.valid).toBe(true);
  });

  it("不再改写 form.noValidate，也不注册 submit 监听", async () => {
    const form = document.createElement("form");
    const el = document.createElement("ea-test-field") as EaTestField;
    form.append(el);
    document.body.append(form);
    await flushMount();

    expect(form.noValidate).toBe(false);
    expect(form.getAttribute("novalidate")).toBeNull();
  });

  it("formResetCallback 恢复到首次连接时的值", async () => {
    const el = document.createElement("ea-test-field") as EaTestField;
    el.setAttribute("value", "初始值");
    document.body.append(el);
    await flushMount();

    el.value = "改动后";
    await tick();
    expect(el.value).toBe("改动后");

    el.formResetCallback();
    expect(el.value).toBe("初始值");
  });

  it("formDisabledCallback 同步 disabled 并重算 validity", async () => {
    const el = await mount();
    const spy = vi.spyOn(el, "updateValidity");

    el.formDisabledCallback(true);
    expect(el.disabled).toBe(true);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe("校验状态的自动发布", () => {
  it("挂载后就把 required 的校验结果发布到 internals", async () => {
    const el = document.createElement("ea-test-field") as EaTestField;
    el.setAttribute("required", "");
    document.body.append(el);
    await flushMount();

    // 不调 checkValidity / updateValidity：原生提交只读这里
    expect(el.validity?.valid).toBe(false);
    expect(el.validationMessage).toBe("此项为必填");
  });

  it("value 变化后自动重算，无需手动触发", async () => {
    const el = document.createElement("ea-test-field") as EaTestField;
    el.setAttribute("required", "");
    document.body.append(el);
    await flushMount();

    expect(el.validity?.valid).toBe(false);

    el.value = "填好了";
    el._input.value = "填好了";
    await el.updateComplete;

    expect(el.validity?.valid).toBe(true);
  });

  it("首屏不展示错误样式，交互后才展示", async () => {
    const el = document.createElement("ea-test-field") as EaTestField;
    el.setAttribute("required", "");
    document.body.append(el);
    await flushMount();

    expect(el.validity?.valid).toBe(false);
    expect(el.hasAttribute("data-invalid")).toBe(false);

    el.dispatchEvent(new Event("input"));
    expect(el.hasAttribute("data-invalid")).toBe(true);

    el.value = "填好了";
    el._input.value = "填好了";
    await el.updateComplete;

    expect(el.hasAttribute("data-invalid")).toBe(false);
  });

  it("data-validate-trigger=submit 时交互不展示错误，提交被拦才展示", async () => {
    const el = document.createElement("ea-test-field") as EaTestField;
    el.setAttribute("required", "");
    el.setAttribute("data-validate-trigger", "submit");
    document.body.append(el);
    await flushMount();

    el.dispatchEvent(new Event("input"));
    expect(el.hasAttribute("data-invalid")).toBe(false);

    el.dispatchEvent(new Event("invalid"));
    expect(el.hasAttribute("data-invalid")).toBe(true);
  });

  it("data-validate-trigger=manual 时只能由 markTouched 控制错误样式", async () => {
    const el = document.createElement("ea-test-field") as EaTestField;
    el.setAttribute("required", "");
    el.setAttribute("data-validate-trigger", "manual");
    document.body.append(el);
    await flushMount();

    el.dispatchEvent(new Event("input"));
    el.dispatchEvent(new Event("invalid"));
    expect(el.hasAttribute("data-invalid")).toBe(false);

    el.markTouched();
    expect(el.hasAttribute("data-invalid")).toBe(true);

    el.resetTouched();
    expect(el.hasAttribute("data-invalid")).toBe(false);
  });

  it("默认只保留错误样式，不渲染文案", async () => {
    const el = document.createElement("ea-test-field") as EaTestField;
    el.setAttribute("required", "");
    document.body.append(el);
    await flushMount();

    el.markTouched();

    expect(el.hasAttribute("data-invalid")).toBe(true);
    expect(el.hasAttribute("data-invalid-message")).toBe(false);
  });

  it("data-error-display=text 时把校验文案写到宿主属性上", async () => {
    const el = document.createElement("ea-test-field") as EaTestField;
    el.setAttribute("required", "");
    el.setAttribute("data-error-display", "text");
    document.body.append(el);
    await flushMount();

    el.markTouched();

    expect(el.getAttribute("data-invalid-message")).toBe("此项为必填");

    el.resetTouched();
    expect(el.hasAttribute("data-invalid-message")).toBe(false);
  });

  it("form 上的 data-validate-trigger 和 data-error-display 作为默认值生效", async () => {
    const form = document.createElement("form");
    form.setAttribute("data-validate-trigger", "submit");
    form.setAttribute("data-error-display", "text");
    document.body.append(form);

    const el = document.createElement("ea-test-field") as EaTestField;
    el.setAttribute("required", "");
    form.append(el);
    await flushMount();

    expect(el.resolvedValidateTrigger).toBe("submit");
    expect(el.resolvedErrorDisplay).toBe("text");

    // 交互不展示（submit 模式）
    el.dispatchEvent(new Event("input"));
    expect(el.hasAttribute("data-invalid")).toBe(false);

    // 提交被拦后展示，并按 form 配置写文案
    el.dispatchEvent(new Event("invalid"));
    expect(el.hasAttribute("data-invalid")).toBe(true);
    expect(el.getAttribute("data-invalid-message")).toBe("此项为必填");
  });

  it("form 上的统配属性变更后实时生效", async () => {
    const form = document.createElement("form");
    document.body.append(form);

    const el = document.createElement("ea-test-field") as EaTestField;
    el.setAttribute("required", "");
    form.append(el);
    await flushMount();

    el.markTouched();
    expect(el.hasAttribute("data-invalid-message")).toBe(false);

    form.setAttribute("data-error-display", "text");
    await flushMount();

    expect(el.getAttribute("data-invalid-message")).toBe("此项为必填");
  });

  it("自身属性优先于 form 上的统配", async () => {
    const form = document.createElement("form");
    form.setAttribute("data-validate-trigger", "submit");
    document.body.append(form);

    const el = document.createElement("ea-test-field") as EaTestField;
    el.setAttribute("data-validate-trigger", "auto");
    form.append(el);
    await flushMount();

    expect(el.resolvedValidateTrigger).toBe("auto");
  });

  it("挂载后新增 required 也会自动重算", async () => {
    const el = await mount();
    expect(el.validity?.valid).toBe(true);

    el.required = true;
    await el.updateComplete;

    expect(el.validity?.valid).toBe(false);
  });
});

describe("校验提示锚点", () => {
  const stubVisible = (el: HTMLElement): void => {
    vi.spyOn(el, "getBoundingClientRect").mockReturnValue({
      width: 20,
      height: 20,
      top: 0,
      left: 0,
      right: 20,
      bottom: 20,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    } as DOMRect);
  };

  const anchorOf = (spy: { mock: { calls: unknown[][] } }): unknown => {
    const { calls } = spy.mock;
    return calls[calls.length - 1]?.[2];
  };

  it("验证目标是可见原生控件时锚点就是它", async () => {
    const el = await mount();
    el.required = true;
    el.shadowRoot!.append(el._input);
    stubVisible(el._input);

    const spy = vi.spyOn(el.internals, "setValidity");
    el.updateValidity();

    expect(anchorOf(spy)).toBe(el._input);
  });

  it("验证目标不可见时退到 shadow 内可见控件", async () => {
    const el = await mount();
    el.required = true;

    const visible = document.createElement("input");
    el.shadowRoot!.append(visible);
    stubVisible(visible);

    const spy = vi.spyOn(el.internals, "setValidity");
    el.updateValidity();

    expect(anchorOf(spy)).toBe(visible);
  });

  it("子类指定的锚点优先于可见性推论", async () => {
    const el = document.createElement(
      "ea-test-anchor-field"
    ) as EaTestAnchorField;
    el.setAttribute("required", "");
    document.body.append(el);
    await flushMount();

    const spy = vi.spyOn(el.internals, "setValidity");
    el.updateValidity();

    expect(anchorOf(spy)).toBe(el._anchor);
  });

  it("校验通过时不传锚点", async () => {
    const el = await mount();

    const spy = vi.spyOn(el.internals, "setValidity");
    el.updateValidity();

    const { calls } = spy.mock;
    expect(calls[calls.length - 1]?.[0]).toEqual({});
    expect(anchorOf(spy)).toBeUndefined();
  });

  it("setValidity 与 setCustomValidity 复用同一套锚点", async () => {
    const el = await mount();

    const visible = document.createElement("input");
    el.shadowRoot!.append(visible);
    stubVisible(visible);

    const spy = vi.spyOn(el.internals, "setValidity");

    el.setValidity({ valueMissing: true }, "出错了");
    expect(anchorOf(spy)).toBe(visible);

    el.setCustomValidity("自定义错误");
    expect(anchorOf(spy)).toBe(visible);
  });
});

describe("错误提示模式", () => {
  const lastFlags = (spy: { mock: { calls: unknown[][] } }): unknown => {
    const { calls } = spy.mock;
    return calls[calls.length - 1]?.[0];
  };

  const mountTextMode = async (): Promise<EaTestField> => {
    const el = document.createElement("ea-test-field") as EaTestField;
    el.setAttribute("required", "");
    el.setAttribute("data-error-display", "text");
    document.body.append(el);
    await flushMount();
    return el;
  };

  it("text 模式不向 form 发布失效状态", async () => {
    const el = await mountTextMode();

    const spy = vi.spyOn(el.internals, "setValidity");
    el.updateValidity();

    expect(lastFlags(spy)).toEqual({});
    expect(el.internals.validity.valid).toBe(true);
    expect(el.validity?.valid).toBe(false);
    expect(el.validationMessage).toBe("此项为必填");
    expect(el.checkValidity()).toBe(false);
  });

  it("native 模式继续把失效状态交给 form", async () => {
    const el = await mount();
    el.required = true;
    await el.updateComplete;

    expect(el.internals.validity.valid).toBe(false);
    expect(el.checkValidity()).toBe(false);
  });

  it("text 模式下提交被自身拦住，后续 submit 监听收不到", async () => {
    const form = document.createElement("form");
    document.body.append(form);

    const el = document.createElement("ea-test-field") as EaTestField;
    el.setAttribute("required", "");
    el.setAttribute("data-error-display", "text");
    form.append(el);
    await flushMount();

    const handler = vi.fn();
    form.addEventListener("submit", handler);

    const event = new Event("submit", { bubbles: true, cancelable: true });
    const dispatched = form.dispatchEvent(event);

    expect(dispatched).toBe(false);
    expect(event.defaultPrevented).toBe(true);
    expect(handler).not.toHaveBeenCalled();
    expect(el.hasAttribute("data-invalid")).toBe(true);
  });

  it("text 模式校验通过时放行提交", async () => {
    const form = document.createElement("form");
    document.body.append(form);

    const el = document.createElement("ea-test-field") as EaTestField;
    el.setAttribute("data-error-display", "text");
    form.append(el);
    await flushMount();

    const handler = vi.fn();
    form.addEventListener("submit", handler);

    form.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true })
    );

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("同表单的原生控件被拦时，text 模式控件也进入错误态", async () => {
    const form = document.createElement("form");
    document.body.append(form);

    const el = document.createElement("ea-test-field") as EaTestField;
    el.setAttribute("required", "");
    el.setAttribute("data-error-display", "text");
    form.append(el);
    await flushMount();

    const native = document.createElement("input");
    native.required = true;
    form.append(native);

    expect(el.hasAttribute("data-invalid")).toBe(false);

    native.dispatchEvent(new Event("invalid"));

    expect(el.hasAttribute("data-invalid")).toBe(true);
    expect(el.getAttribute("data-invalid-message")).toBe("此项为必填");
  });
});
