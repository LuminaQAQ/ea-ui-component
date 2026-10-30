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

  it("空串按未设置处理：maxlength=\"\" 不锁死输入", async () => {
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

  it("updateValidity 从 validationTarget 读取原生 validity", async () => {
    const el = await mount();
    el.required = true;
    el.value = "";
    await tick();

    el.updateValidity();
    expect(el.checkValidity()).toBe(false);

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
  it("formAssociatedCallback 关闭原生校验，最后一个字段离开时恢复", async () => {
    const form = document.createElement("form");
    const first = document.createElement("ea-test-field") as EaTestField;
    const second = document.createElement("ea-test-field") as EaTestField;
    form.append(first, second);
    document.body.append(form);
    await flushMount();

    first.formAssociatedCallback(form);
    second.formAssociatedCallback(form);
    expect(form.noValidate).toBe(true);

    first.remove();
    await tick();
    expect(form.noValidate).toBe(true);

    second.remove();
    await tick();
    expect(form.noValidate).toBe(false);
  });

  it("提交时校验本库字段，首个无效字段阻断提交", async () => {
    const form = document.createElement("form");
    const first = document.createElement("ea-test-field") as EaTestField;
    const second = document.createElement("ea-test-field") as EaTestField;
    form.append(first, second);
    document.body.append(form);
    await flushMount();

    first.formAssociatedCallback(form);
    second.formAssociatedCallback(form);

    first.required = true;
    first.value = "";
    const firstSpy = vi.spyOn(first, "updateValidity");
    const secondSpy = vi.spyOn(second, "updateValidity");
    await tick();

    const submit = new Event("submit", { cancelable: true, bubbles: true });
    form.dispatchEvent(submit);

    expect(submit.defaultPrevented).toBe(true);
    // 无效字段：循环一次 + reportValidity 内部一次；有效字段：循环一次
    expect(firstSpy).toHaveBeenCalledTimes(2);
    expect(secondSpy).toHaveBeenCalledTimes(1);

    form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
    expect(firstSpy).toHaveBeenCalledTimes(4);
    expect(secondSpy).toHaveBeenCalledTimes(2);
  });

  it("外置控件（form 属性指向表单）也纳入提交校验", async () => {
    const form = document.createElement("form");
    form.id = "ea-external-form";
    document.body.append(form);

    const el = document.createElement("ea-test-field") as EaTestField;
    el.setAttribute("form", "ea-external-form");
    document.body.append(el);
    await flushMount();

    el.formAssociatedCallback(form);
    el.required = true;
    el.value = "";
    await tick();

    const submit = new Event("submit", { cancelable: true });
    form.dispatchEvent(submit);

    expect(submit.defaultPrevented).toBe(true);
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
