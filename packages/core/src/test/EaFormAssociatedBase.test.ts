import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { EaFormAssociatedBase } from "@core/EaFormAssociatedBase";
import { CustomElement } from "@decorator/custom-element";

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

const mount = async (): Promise<EaTestField> => {
  const el = document.createElement("ea-test-field") as EaTestField;
  document.body.append(el);
  await flushMount();
  return el;
};

beforeEach(() => {
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

  it("特征测试：只读派生值被声明为 @attribute，连接后 willValidate 恒为 false（P1-3）", async () => {
    const el = await mount();
    // Boolean getter：元素已连接时直接返回 false，忽略 internals 的真实值
    expect(el.willValidate).toBe(false);
    expect(el.internals.willValidate).toBe(true);
  });

  it("特征测试：validity 可被 HTML 属性伪造为字符串（P1-3）", async () => {
    const el = await mount();
    expect(el.validity).toBeTypeOf("object");

    el.setAttribute("validity", "x");
    expect(el.validity).toBe("x");
  });
});

describe("约束下发", () => {
  it("required / min / max / minlength / maxlength / pattern 下发到 validationTarget", async () => {
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

    el.pattern = "";
    await tick();
    expect(el.validationTarget.hasAttribute("pattern")).toBe(false);
  });

  it("特征测试：移除约束属性后默认值 0 被写回目标元素（P0-4）", async () => {
    const el = await mount();
    el.min = 3;
    await tick();
    expect(el.validationTarget.getAttribute("min")).toBe("3");

    el.removeAttribute("min");
    await tick();

    // 当前契约：observer 收到默认值 0，于是把 "0" 写进内部 input
    expect(el.validationTarget.getAttribute("min")).toBe("0");
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
  it("formAssociatedCallback 关闭表单原生校验，且断连不恢复（P1-4 特征）", async () => {
    const form = document.createElement("form");
    const el = document.createElement("ea-test-field") as EaTestField;
    form.append(el);
    document.body.append(form);
    await flushMount();

    el.formAssociatedCallback(form);
    expect(form.noValidate).toBe(true);

    el.remove();
    expect(form.noValidate).toBe(true);
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

    // 特征测试：单个字段在一次提交里会被重复校验——
    // 循环内 updateValidity() + checkValidity() 内部又调一次 + 无效字段 reportValidity() 再调一次
    const firstOnce = firstSpy.mock.calls.length;
    const secondOnce = secondSpy.mock.calls.length;
    expect(firstOnce).toBe(3);
    expect(secondOnce).toBe(2);

    // 同一表单只注册一次 submit 监听：第二次提交的调用次数恰好翻倍（否则会成倍叠加）
    form.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true })
    );
    expect(firstSpy).toHaveBeenCalledTimes(firstOnce * 2);
    expect(secondSpy).toHaveBeenCalledTimes(secondOnce * 2);
  });

  it("formResetCallback 固定把 value 置空（P1-4 特征）", async () => {
    const el = await mount();
    el.value = "abc";
    await tick();

    el.formResetCallback();
    expect(el.value).toBe("");
  });

  it("formDisabledCallback 同步 disabled 并重算 validity", async () => {
    const el = await mount();
    const spy = vi.spyOn(el, "updateValidity");

    el.formDisabledCallback(true);
    expect(el.disabled).toBe(true);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
