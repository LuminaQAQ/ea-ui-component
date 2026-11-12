import { describe, it, expect, beforeEach, afterEach } from "vitest";

import "../../components/ea-input/index.ts";
import "../../components/ea-select/index.ts";

/** 统计表单真正触发的 submit 次数；被拦下的提交不会走到这里 */
const trackSubmit = (form: HTMLFormElement) => {
  const state = { count: 0 };

  form.addEventListener("submit", event => {
    event.preventDefault();
    state.count += 1;
  });

  return state;
};

/** 造一个表单控件并等它渲染完 */
const createField = async (
  form: HTMLFormElement,
  tagName: string,
  attrs: Record<string, string> = {}
) => {
  const field = document.createElement(tagName) as HTMLElement & {
    value: string;
    internals: ElementInternals;
    updateComplete: Promise<void>;
    checkValidity: () => boolean;
    reportValidity: () => boolean;
  };

  Object.entries(attrs).forEach(([name, value]) =>
    field.setAttribute(name, value)
  );
  form.append(field);
  await field.updateComplete;

  return field;
};

describe("表单校验（真实浏览器）", () => {
  let form: HTMLFormElement;

  beforeEach(() => {
    form = document.createElement("form");
    document.body.append(form);
  });

  afterEach(() => {
    form.remove();
  });

  it("native 模式由浏览器拦下提交，submit 监听不收", async () => {
    const field = await createField(form, "ea-input", {
      name: "username",
      required: "",
    });
    const submits = trackSubmit(form);

    expect(field.internals.validity.valid).toBe(false);

    form.requestSubmit();

    expect(submits.count).toBe(0);
  });

  it("native 模式填满后放行提交", async () => {
    const field = await createField(form, "ea-input", {
      name: "username",
      required: "",
    });
    const submits = trackSubmit(form);

    field.value = "abc";
    await field.updateComplete;

    form.requestSubmit();

    expect(submits.count).toBe(1);
  });

  it("text 模式不向浏览器发布失效状态，提交由基类拦住", async () => {
    const field = await createField(form, "ea-input", {
      name: "username",
      required: "",
      "data-error-display": "text",
    });
    const submits = trackSubmit(form);

    expect(field.internals.validity.valid).toBe(true);
    expect(field.checkValidity()).toBe(false);
    expect(field.reportValidity()).toBe(false);

    form.requestSubmit();

    expect(submits.count).toBe(0);
    expect(field.hasAttribute("data-invalid")).toBe(true);
    expect(field.getAttribute("data-invalid-message")).toBe("此项为必填");
  });

  it("同表单混合两种模式时只拦一次，text 控件也能拿到文案", async () => {
    const textField = await createField(form, "ea-input", {
      name: "username",
      required: "",
      "data-error-display": "text",
    });
    const nativeField = await createField(form, "ea-select", {
      name: "city",
      required: "",
      "data-error-display": "native",
    });
    const submits = trackSubmit(form);

    form.requestSubmit();

    expect(submits.count).toBe(0);
    expect(textField.hasAttribute("data-invalid")).toBe(true);
    expect(textField.getAttribute("data-invalid-message")).toBe("此项为必填");
    expect(nativeField.hasAttribute("data-invalid")).toBe(true);
    expect(nativeField.hasAttribute("data-invalid-message")).toBe(false);
  });

  it("多个 text 模式控件同时显示文案，且不参与原生校验", async () => {
    const fields = [];

    for (const name of ["a", "b", "c"]) {
      fields.push(await createField(form, "ea-input", { name, required: "" }));
    }

    fields.forEach(field => field.setAttribute("data-error-display", "text"));

    await Promise.all(fields.map(field => field.updateComplete));

    form.requestSubmit();

    fields.forEach(field => {
      expect(field.getAttribute("data-invalid-message")).toBe("此项为必填");
      expect(field.internals.validity.valid).toBe(true);
    });

    expect(form.checkValidity()).toBe(true);
  });
});
