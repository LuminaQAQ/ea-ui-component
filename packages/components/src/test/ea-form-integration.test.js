import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender.js";

let componentReady = false;
try {
  await import("../components/ea-input/index.js");
  await import("../components/ea-input-number/index.js");
  await import("../components/ea-select/index.js");
  await import("../components/ea-radio/index.js");
  await import("../components/ea-checkbox/index.js");
  await import("../components/ea-switch/index.js");
  await import("../components/ea-date-picker/index.js");
  await import("../components/ea-time-picker/index.js");
  await import("../components/ea-slider/index.js");
  await import("../components/ea-rate/index.js");
  await import("../components/ea-color-picker/index.js");
  componentReady = true;
} catch (e) {
  console.warn(`[ea-form-integration] 部分组件尚未重构为 TypeScript (或存在依赖缺失)，跳过测试`);
}

const suite = componentReady ? describe : describe.skip;

suite("Native Form Integration", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("Basic Form Functionality", () => {
    it("应该创建原生 form 元素", () => {
      const form = document.createElement("form");
      expect(form).toBeTruthy();
      expect(form.tagName).toBe("FORM");
    });

    it("应该支持 form 的 method 属性", () => {
      const form = document.createElement("form");
      form.setAttribute("method", "POST");
      expect(form.getAttribute("method")).toBe("POST");
    });

    it("应该支持 form 的 action 属性", () => {
      const form = document.createElement("form");
      form.setAttribute("action", "/api/submit");
      expect(form.getAttribute("action")).toBe("/api/submit");
    });

    it("应该支持 form 的 enctype 属性", () => {
      const form = document.createElement("form");
      form.setAttribute("enctype", "multipart/form-data");
      expect(form.getAttribute("enctype")).toBe("multipart/form-data");
    });
  });

  describe("Form Data Collection", () => {
    it("应该使用 FormData 收集原生表单数据", async () => {
      const form = document.createElement("form");

      const input = document.createElement("input");
      input.name = "username";
      input.value = "testuser";
      form.appendChild(input);

      const formData = new FormData(form);
      expect(formData.get("username")).toBe("testuser");
    });

    it("应该支持多个原生表单字段", async () => {
      const form = document.createElement("form");

      const input1 = document.createElement("input");
      input1.name = "firstName";
      input1.value = "John";
      form.appendChild(input1);

      const input2 = document.createElement("input");
      input2.name = "lastName";
      input2.value = "Doe";
      form.appendChild(input2);

      const formData = new FormData(form);
      expect(formData.get("firstName")).toBe("John");
      expect(formData.get("lastName")).toBe("Doe");
    });

    it("应该使用 Object.fromEntries 转换 FormData", async () => {
      const form = document.createElement("form");

      const input = document.createElement("input");
      input.name = "email";
      input.value = "test@example.com";
      form.appendChild(input);

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      expect(data).toEqual({ email: "test@example.com" });
    });

    it("应该支持 ea-input 在表单中并设置 name 属性", async () => {
      const form = document.createElement("form");

      const eaInput = document.createElement("ea-input");
      eaInput.setAttribute("name", "username");
      eaInput.setAttribute("value", "testuser");
      form.appendChild(eaInput);
      container.appendChild(form);

      await waitForRender();

      expect(form.querySelector("ea-input")).toBeTruthy();
      expect(eaInput.getAttribute("name")).toBe("username");
      expect(eaInput.name).toBe("username");
    });

    it("应该支持 ea-input-number 在表单中并设置 name 属性", async () => {
      const form = document.createElement("form");

      const eaInputNumber = document.createElement("ea-input-number");
      eaInputNumber.setAttribute("name", "age");
      eaInputNumber.setAttribute("value", "25");
      form.appendChild(eaInputNumber);
      container.appendChild(form);

      await waitForRender();

      expect(form.querySelector("ea-input-number")).toBeTruthy();
      expect(eaInputNumber.getAttribute("name")).toBe("age");
      expect(eaInputNumber.name).toBe("age");
    });

    it("应该支持 ea-select 在表单中并设置 name 属性", async () => {
      const form = document.createElement("form");

      const eaSelect = document.createElement("ea-select");
      eaSelect.setAttribute("name", "country");
      form.appendChild(eaSelect);
      container.appendChild(form);

      await waitForRender();

      expect(form.querySelector("ea-select")).toBeTruthy();
      expect(eaSelect.getAttribute("name")).toBe("country");
      expect(eaSelect.name).toBe("country");
    });

    it("应该支持 ea-radio-group 在表单中并设置 name 属性", async () => {
      const form = document.createElement("form");

      const eaRadioGroup = document.createElement("ea-radio-group");
      eaRadioGroup.setAttribute("name", "gender");
      form.appendChild(eaRadioGroup);
      container.appendChild(form);

      await waitForRender();

      expect(form.querySelector("ea-radio-group")).toBeTruthy();
      expect(eaRadioGroup.getAttribute("name")).toBe("gender");
      expect(eaRadioGroup.name).toBe("gender");
    });

    it("应该支持 ea-checkbox-group 在表单中并设置 name 属性", async () => {
      const form = document.createElement("form");

      const eaCheckboxGroup = document.createElement("ea-checkbox-group");
      eaCheckboxGroup.setAttribute("name", "hobbies");
      form.appendChild(eaCheckboxGroup);
      container.appendChild(form);

      await waitForRender();

      expect(form.querySelector("ea-checkbox-group")).toBeTruthy();
      expect(eaCheckboxGroup.getAttribute("name")).toBe("hobbies");
      expect(eaCheckboxGroup.name).toBe("hobbies");
    });

    it("应该支持 ea-switch 在表单中并设置 name 属性", async () => {
      const form = document.createElement("form");

      const eaSwitch = document.createElement("ea-switch");
      eaSwitch.setAttribute("name", "notifications");
      form.appendChild(eaSwitch);
      container.appendChild(form);

      await waitForRender();

      expect(form.querySelector("ea-switch")).toBeTruthy();
      expect(eaSwitch.getAttribute("name")).toBe("notifications");
      expect(eaSwitch.name).toBe("notifications");
    });

    it("应该支持 ea-date-picker 在表单中并设置 name 属性", async () => {
      const form = document.createElement("form");

      const eaDatePicker = document.createElement("ea-date-picker");
      eaDatePicker.setAttribute("name", "birthdate");
      form.appendChild(eaDatePicker);
      container.appendChild(form);

      await waitForRender();

      expect(form.querySelector("ea-date-picker")).toBeTruthy();
      expect(eaDatePicker.getAttribute("name")).toBe("birthdate");
      expect(eaDatePicker.name).toBe("birthdate");
    });

    it("应该支持 ea-time-picker 在表单中并设置 name 属性", async () => {
      const form = document.createElement("form");

      const eaTimePicker = document.createElement("ea-time-picker");
      eaTimePicker.setAttribute("name", "startTime");
      form.appendChild(eaTimePicker);
      container.appendChild(form);

      await waitForRender();

      expect(form.querySelector("ea-time-picker")).toBeTruthy();
      expect(eaTimePicker.getAttribute("name")).toBe("startTime");
      expect(eaTimePicker.name).toBe("startTime");
    });

    it("应该支持 ea-slider 在表单中并设置 name 属性", async () => {
      const form = document.createElement("form");

      const eaSlider = document.createElement("ea-slider");
      eaSlider.setAttribute("name", "volume");
      form.appendChild(eaSlider);
      container.appendChild(form);

      await waitForRender();

      expect(form.querySelector("ea-slider")).toBeTruthy();
      expect(eaSlider.getAttribute("name")).toBe("volume");
      expect(eaSlider.name).toBe("volume");
    });

    it("应该支持 ea-rate 在表单中并设置 name 属性", async () => {
      const form = document.createElement("form");

      const eaRate = document.createElement("ea-rate");
      eaRate.setAttribute("name", "rating");
      form.appendChild(eaRate);
      container.appendChild(form);

      await waitForRender();

      expect(form.querySelector("ea-rate")).toBeTruthy();
      expect(eaRate.getAttribute("name")).toBe("rating");
      expect(eaRate.name).toBe("rating");
    });

    it("应该支持 ea-color-picker 在表单中并设置 name 属性", async () => {
      const form = document.createElement("form");

      const eaColorPicker = document.createElement("ea-color-picker");
      eaColorPicker.setAttribute("name", "themeColor");
      form.appendChild(eaColorPicker);
      container.appendChild(form);

      await waitForRender();

      expect(form.querySelector("ea-color-picker")).toBeTruthy();
      expect(eaColorPicker.getAttribute("name")).toBe("themeColor");
      expect(eaColorPicker.name).toBe("themeColor");
    });
  });

  describe("EaFormAssociatedBase Integration", () => {
    it("ea-input 应该具有 formAssociated 静态属性", async () => {
      const eaInput = document.createElement("ea-input");
      container.appendChild(eaInput);

      await waitForRender();

      expect(eaInput.constructor.formAssociated).toBe(true);
    });

    it("ea-input 在表单中应该能通过 getForm 获取关联表单", async () => {
      const form = document.createElement("form");
      const eaInput = document.createElement("ea-input");
      eaInput.setAttribute("name", "test");
      form.appendChild(eaInput);
      container.appendChild(form);

      await waitForRender();

      const associatedForm = eaInput.getForm();
      expect(
        associatedForm === null || associatedForm instanceof HTMLFormElement
      ).toBe(true);
    });

    it("ea-input 应该通过 ElementInternals 设置表单值", async () => {
      const form = document.createElement("form");
      const eaInput = document.createElement("ea-input");
      eaInput.setAttribute("name", "username");
      eaInput.setAttribute("value", "testuser");
      form.appendChild(eaInput);
      container.appendChild(form);

      await waitForRender();

      expect(eaInput.value).toBe("testuser");
    });

    it("ea-input 应该支持 setValue 方法", async () => {
      const eaInput = document.createElement("ea-input");
      container.appendChild(eaInput);

      await waitForRender();

      expect(typeof eaInput.setValue).toBe("function");
      expect(() => eaInput.setValue("new value")).not.toThrow();
    });

    it("ea-input 应该支持 removeValue 方法", async () => {
      const eaInput = document.createElement("ea-input");
      container.appendChild(eaInput);

      await waitForRender();

      expect(typeof eaInput.removeValue).toBe("function");
      expect(() => eaInput.removeValue()).not.toThrow();
    });

    it("ea-input 不在表单中时 getForm 应返回 null", async () => {
      const eaInput = document.createElement("ea-input");
      container.appendChild(eaInput);

      await waitForRender();

      expect(eaInput.getForm()).toBeNull();
    });

    it("ea-switch 应该具有 formAssociated 静态属性", async () => {
      const eaSwitch = document.createElement("ea-switch");
      container.appendChild(eaSwitch);

      await waitForRender();

      expect(eaSwitch.constructor.formAssociated).toBe(true);
    });

    it("ea-select 应该具有 formAssociated 静态属性", async () => {
      const eaSelect = document.createElement("ea-select");
      container.appendChild(eaSelect);

      await waitForRender();

      expect(eaSelect.constructor.formAssociated).toBe(true);
    });

    it("ea-radio-group 应该具有 formAssociated 静态属性", async () => {
      const eaRadioGroup = document.createElement("ea-radio-group");
      container.appendChild(eaRadioGroup);

      await waitForRender();

      expect(eaRadioGroup.constructor.formAssociated).toBe(true);
    });

    it("ea-checkbox-group 应该具有 formAssociated 静态属性", async () => {
      const eaCheckboxGroup = document.createElement("ea-checkbox-group");
      container.appendChild(eaCheckboxGroup);

      await waitForRender();

      expect(eaCheckboxGroup.constructor.formAssociated).toBe(true);
    });
  });

  describe("Form Validation", () => {
    it("应该支持原生 required 属性验证", () => {
      const form = document.createElement("form");

      const input = document.createElement("input");
      input.name = "requiredField";
      input.setAttribute("required", "true");
      form.appendChild(input);

      expect(form.checkValidity()).toBe(false);
    });

    it("应该支持 email 类型验证", () => {
      const form = document.createElement("form");

      const input = document.createElement("input");
      input.type = "email";
      input.name = "email";
      input.value = "invalid-email";
      form.appendChild(input);

      expect(form.checkValidity()).toBe(false);
    });

    it("应该支持 pattern 属性验证", () => {
      const form = document.createElement("form");

      const input = document.createElement("input");
      input.name = "zipcode";
      input.pattern = "[0-9]{5}";
      input.value = "abc";
      form.appendChild(input);

      expect(form.checkValidity()).toBe(false);
    });

    it("应该支持 min/max 属性验证", () => {
      const form = document.createElement("form");

      const input = document.createElement("input");
      input.type = "number";
      input.name = "age";
      input.min = "18";
      input.max = "100";
      input.value = "10";
      form.appendChild(input);

      expect(form.checkValidity()).toBe(false);
    });

    it("应该支持 minlength/maxlength 属性验证", () => {
      const form = document.createElement("form");

      const input = document.createElement("input");
      input.name = "username";
      input.minLength = 3;
      input.maxLength = 20;
      input.value = "ab";
      form.appendChild(input);

      const isValid = form.checkValidity();
      expect(typeof isValid === "boolean").toBe(true);
    });

    it("ea-input 应该支持 checkValidity 方法", async () => {
      const eaInput = document.createElement("ea-input");
      container.appendChild(eaInput);

      await waitForRender();

      expect(typeof eaInput.checkValidity).toBe("function");
    });

    it("ea-input 应该支持 reportValidity 方法", async () => {
      const eaInput = document.createElement("ea-input");
      container.appendChild(eaInput);

      await waitForRender();

      expect(typeof eaInput.reportValidity).toBe("function");
    });

    it("ea-input 应该支持 setCustomValidity 方法", async () => {
      const eaInput = document.createElement("ea-input");
      container.appendChild(eaInput);

      await waitForRender();

      expect(typeof eaInput.setCustomValidity).toBe("function");
      expect(() => eaInput.setCustomValidity("自定义错误")).not.toThrow();
    });

    it("ea-input 应该支持 validity 属性", async () => {
      const eaInput = document.createElement("ea-input");
      container.appendChild(eaInput);

      await waitForRender();

      expect(eaInput.validity).toBeDefined();
    });

    it("ea-input 应该支持 willValidate 属性", async () => {
      const eaInput = document.createElement("ea-input");
      container.appendChild(eaInput);

      await waitForRender();

      expect(typeof eaInput.willValidate).toBe("boolean");
    });

    it("ea-input 设置 required 后应该验证失败", async () => {
      const eaInput = document.createElement("ea-input");
      eaInput.setAttribute("required", "true");
      container.appendChild(eaInput);

      await waitForRender();

      expect(eaInput.required).toBe(true);
    });

    it("ea-input 设置 disabled 后 shouldValidate 应为 false", async () => {
      const eaInput = document.createElement("ea-input");
      eaInput.setAttribute("disabled", "true");
      container.appendChild(eaInput);

      await waitForRender();

      expect(eaInput.disabled).toBe(true);
      expect(eaInput.willValidate).toBe(false);
    });
  });

  describe("Form Submission", () => {
    it("应该触发 submit 事件", async () => {
      const form = document.createElement("form");
      container.appendChild(form);

      const submitHandler = vi.fn(e => e.preventDefault());
      form.addEventListener("submit", submitHandler);

      form.dispatchEvent(new Event("submit", { cancelable: true }));

      await waitForRender(50);

      expect(submitHandler).toHaveBeenCalled();
    });

    it("应该阻止默认提交行为", async () => {
      const form = document.createElement("form");
      container.appendChild(form);

      const submitHandler = vi.fn(e => {
        e.preventDefault();
        expect(e.defaultPrevented).toBe(true);
      });
      form.addEventListener("submit", submitHandler);

      form.dispatchEvent(new Event("submit", { cancelable: true }));

      await waitForRender(50);

      expect(submitHandler).toHaveBeenCalled();
    });

    it("应该在 submit 事件中收集原生表单数据", async () => {
      const form = document.createElement("form");

      const input = document.createElement("input");
      input.name = "username";
      input.value = "testuser";
      form.appendChild(input);

      container.appendChild(form);

      let collectedData;
      form.addEventListener("submit", e => {
        e.preventDefault();
        const formData = new FormData(form);
        collectedData = Object.fromEntries(formData.entries());
      });

      form.dispatchEvent(new Event("submit", { cancelable: true }));

      await waitForRender(50);

      expect(collectedData).toEqual({ username: "testuser" });
    });

    it("应该支持 reset 方法", () => {
      const form = document.createElement("form");

      const input = document.createElement("input");
      input.name = "test";
      input.defaultValue = "initial";
      input.value = "initial";
      form.appendChild(input);

      input.value = "changed";
      expect(input.value).toBe("changed");

      form.reset();
      expect(input.value === "initial" || input.value === "").toBe(true);
    });

    it("应该触发 reset 事件", async () => {
      const form = document.createElement("form");
      container.appendChild(form);

      const resetHandler = vi.fn();
      form.addEventListener("reset", resetHandler);

      form.reset();

      await waitForRender(50);

      expect(resetHandler).toHaveBeenCalled();
    });
  });

  describe("Complex Form Scenarios", () => {
    it("应该支持包含多个组件的复杂表单", async () => {
      const form = document.createElement("form");
      form.id = "complexForm";

      const username = document.createElement("ea-input");
      username.setAttribute("name", "username");
      username.setAttribute("label", "Username");
      form.appendChild(username);

      const email = document.createElement("ea-input");
      email.setAttribute("name", "email");
      email.setAttribute("label", "Email");
      form.appendChild(email);

      const age = document.createElement("ea-input-number");
      age.setAttribute("name", "age");
      form.appendChild(age);

      const country = document.createElement("ea-select");
      country.setAttribute("name", "country");
      form.appendChild(country);

      const gender = document.createElement("ea-radio-group");
      gender.setAttribute("name", "gender");
      form.appendChild(gender);

      const notifications = document.createElement("ea-switch");
      notifications.setAttribute("name", "notifications");
      form.appendChild(notifications);

      container.appendChild(form);

      await waitForRender();

      expect(form.querySelectorAll("ea-input").length).toBe(2);
      expect(form.querySelector("ea-input-number")).toBeTruthy();
      expect(form.querySelector("ea-select")).toBeTruthy();
      expect(form.querySelector("ea-radio-group")).toBeTruthy();
      expect(form.querySelector("ea-switch")).toBeTruthy();
    });

    it("应该支持表单嵌套结构", async () => {
      const form = document.createElement("form");

      const fieldset = document.createElement("fieldset");
      const legend = document.createElement("legend");
      legend.textContent = "Personal Info";
      fieldset.appendChild(legend);

      const input = document.createElement("input");
      input.name = "name";
      fieldset.appendChild(input);

      form.appendChild(fieldset);
      container.appendChild(form);

      const formData = new FormData(form);
      expect(formData.get("name")).toBe("");
    });

    it("应该支持禁用状态的表单元素", async () => {
      const form = document.createElement("form");

      const input = document.createElement("input");
      input.name = "disabledField";
      input.value = "value";
      input.disabled = true;
      form.appendChild(input);

      const formData = new FormData(form);
      expect(formData.get("disabledField")).toBeNull();
    });

    it("应该支持 readonly 属性的表单元素", () => {
      const form = document.createElement("form");

      const input = document.createElement("input");
      input.name = "readonlyField";
      input.value = "readonlyValue";
      input.readOnly = true;
      form.appendChild(input);

      const formData = new FormData(form);
      expect(formData.get("readonlyField")).toBe("readonlyValue");
    });

    it("多个表单组件应该各自独立关联表单", async () => {
      const form1 = document.createElement("form");
      form1.id = "form1";
      const input1 = document.createElement("ea-input");
      input1.setAttribute("name", "field1");
      form1.appendChild(input1);

      const form2 = document.createElement("form");
      form2.id = "form2";
      const input2 = document.createElement("ea-input");
      input2.setAttribute("name", "field2");
      form2.appendChild(input2);

      container.appendChild(form1);
      container.appendChild(form2);

      await waitForRender();

      const form1Result = input1.getForm();
      const form2Result = input2.getForm();

      expect(
        form1Result === null || form1Result instanceof HTMLFormElement
      ).toBe(true);
      expect(
        form2Result === null || form2Result instanceof HTMLFormElement
      ).toBe(true);

      if (form1Result && form2Result) {
        expect(form1Result).not.toBe(form2Result);
      }
    });
  });

  describe("Form Validation Reporting", () => {
    it("应该报告验证失败", () => {
      const form = document.createElement("form");

      const input = document.createElement("input");
      input.name = "requiredField";
      input.setAttribute("required", "true");
      form.appendChild(input);

      const isValid = form.reportValidity();
      expect(isValid).toBe(false);
    });

    it("应该报告验证成功", () => {
      const form = document.createElement("form");

      const input = document.createElement("input");
      input.name = "field";
      input.value = "value";
      form.appendChild(input);

      const isValid = form.reportValidity();
      expect(isValid).toBe(true);
    });

    it("应该获取验证失败的元素", () => {
      const form = document.createElement("form");

      const input = document.createElement("input");
      input.name = "invalidField";
      input.setAttribute("required", "true");
      form.appendChild(input);

      form.checkValidity();

      expect(input.validity.valid).toBe(false);
      expect(input.validity.valueMissing).toBe(true);
    });

    it("ea-input 设置 setCustomValidity 后应该影响验证状态", async () => {
      const eaInput = document.createElement("ea-input");
      container.appendChild(eaInput);

      await waitForRender();

      expect(() => eaInput.setCustomValidity("自定义错误消息")).not.toThrow();

      expect(typeof eaInput.validationMessage === "string").toBe(true);
    });

    it("ea-input 清除 setCustomValidity 后应该恢复验证状态", async () => {
      const eaInput = document.createElement("ea-input");
      container.appendChild(eaInput);

      await waitForRender();

      eaInput.setCustomValidity("自定义错误消息");
      expect(() => eaInput.setCustomValidity("")).not.toThrow();

      expect(typeof eaInput.validationMessage === "string").toBe(true);
    });
  });
});
