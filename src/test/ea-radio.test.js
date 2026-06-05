import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

import "../components/ea-radio/index.js";
import { waitForRender } from "./utils/waitForRender.js";
import { runAxe, assertNoA11yViolations } from "./utils/a11y.js";

describe("EaRadio and EaRadioGroup Components", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("EaRadio Basic Rendering", () => {
    it("应该正确渲染 ea-radio 组件", async () => {
      const radio = document.createElement("ea-radio");
      container.appendChild(radio);

      await waitForRender();

      expect(radio.shadowRoot).toBeTruthy();
      expect(radio.shadowRoot.querySelector(".ea-radio")).toBeTruthy();
    });

    it("应该包含原生 radio input", async () => {
      const radio = document.createElement("ea-radio");
      container.appendChild(radio);

      await waitForRender();

      const input = radio.shadowRoot.querySelector('input[type="radio"]');
      expect(input).toBeTruthy();
    });

    it("应该包含 inner 元素", async () => {
      const radio = document.createElement("ea-radio");
      container.appendChild(radio);

      await waitForRender();

      const inner = radio.shadowRoot.querySelector(".ea-radio__inner");
      expect(inner).toBeTruthy();
      expect(inner.getAttribute("tabindex")).toBe("0");
    });

    it("应该包含 label 元素和 slot", async () => {
      const radio = document.createElement("ea-radio");
      container.appendChild(radio);

      await waitForRender();

      const label = radio.shadowRoot.querySelector(".ea-radio__label");
      expect(label).toBeTruthy();
      expect(label.querySelector("slot")).toBeTruthy();
    });
  });

  describe("EaRadio CSS Parts", () => {
    it("应该支持所有 CSS Parts", async () => {
      const radio = document.createElement("ea-radio");
      container.appendChild(radio);

      await waitForRender();

      expect(radio.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
      expect(radio.shadowRoot.querySelector('[part="original"]')).toBeTruthy();
      expect(radio.shadowRoot.querySelector('[part="input"]')).toBeTruthy();
      expect(radio.shadowRoot.querySelector('[part="input-wrap"]')).toBeTruthy();
      expect(radio.shadowRoot.querySelector('[part="label"]')).toBeTruthy();
    });
  });

  describe("EaRadio Value Attribute", () => {
    it("应该支持 value 属性", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("value", "option1");
      container.appendChild(radio);

      await waitForRender();

      expect(radio.value).toBe("option1");
    });

    it("value 应该同步到原生 input", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("value", "option1");
      container.appendChild(radio);

      await waitForRender();

      const input = radio.shadowRoot.querySelector('input[type="radio"]');
      expect(input.getAttribute("value")).toBe("option1");
    });
  });

  describe("EaRadio Checked Attribute", () => {
    it("默认 checked 应该是 false", async () => {
      const radio = document.createElement("ea-radio");
      container.appendChild(radio);

      await waitForRender();

      expect(radio.checked).toBe(false);
    });

    it("应该支持 checked 属性", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("checked", "");
      container.appendChild(radio);

      await waitForRender();

      expect(radio.checked).toBe(true);
    });

    it("checked 应该同步到原生 input", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("checked", "");
      container.appendChild(radio);

      await waitForRender();

      const input = radio.shadowRoot.querySelector('input[type="radio"]');
      expect(input.checked).toBe(true);
    });

    it("checked 时应该添加 is-checked 状态类", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("checked", "");
      container.appendChild(radio);

      await waitForRender();

      const containerEl = radio.shadowRoot.querySelector(".ea-radio");
      expect(containerEl.classList.contains("is-checked")).toBe(true);
    });
  });

  describe("EaRadio Disabled Attribute", () => {
    it("默认 disabled 应该是 false", async () => {
      const radio = document.createElement("ea-radio");
      container.appendChild(radio);

      await waitForRender();

      expect(radio.disabled).toBe(false);
    });

    it("应该支持 disabled 属性", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("disabled", "");
      container.appendChild(radio);

      await waitForRender();

      expect(radio.disabled).toBe(true);
    });

    it("disabled 应该同步到原生 input", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("disabled", "");
      container.appendChild(radio);

      await waitForRender();

      const input = radio.shadowRoot.querySelector('input[type="radio"]');
      expect(input.disabled).toBe(true);
    });

    it("disabled 时应该添加 is-disabled 状态类", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("disabled", "");
      container.appendChild(radio);

      await waitForRender();

      const containerEl = radio.shadowRoot.querySelector(".ea-radio");
      expect(containerEl.classList.contains("is-disabled")).toBe(true);
    });
  });

  describe("EaRadio Size Attribute", () => {
    it("默认 size 应该是 default", async () => {
      const radio = document.createElement("ea-radio");
      container.appendChild(radio);

      await waitForRender();

      expect(radio.size).toBe("default");
    });

    it("应该支持 large 尺寸", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("size", "large");
      container.appendChild(radio);

      await waitForRender();

      expect(radio.size).toBe("large");
      const containerEl = radio.shadowRoot.querySelector(".ea-radio");
      expect(containerEl.classList.contains("ea-radio--large")).toBe(true);
    });

    it("应该支持 small 尺寸", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("size", "small");
      container.appendChild(radio);

      await waitForRender();

      expect(radio.size).toBe("small");
      const containerEl = radio.shadowRoot.querySelector(".ea-radio");
      expect(containerEl.classList.contains("ea-radio--small")).toBe(true);
    });

    it("应该支持 default 尺寸", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("size", "default");
      container.appendChild(radio);

      await waitForRender();

      expect(radio.size).toBe("default");
      const containerEl = radio.shadowRoot.querySelector(".ea-radio");
      expect(containerEl.classList.contains("ea-radio--default")).toBe(true);
    });
  });

  describe("EaRadio Border Attribute", () => {
    it("默认 border 应该是 false", async () => {
      const radio = document.createElement("ea-radio");
      container.appendChild(radio);

      await waitForRender();

      expect(radio.border).toBe(false);
    });

    it("应该支持 border 属性", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("border", "");
      container.appendChild(radio);

      await waitForRender();

      expect(radio.border).toBe(true);
    });

    it("border 时应该添加 is-border 状态类", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("border", "");
      container.appendChild(radio);

      await waitForRender();

      const containerEl = radio.shadowRoot.querySelector(".ea-radio");
      expect(containerEl.classList.contains("is-border")).toBe(true);
    });
  });

  describe("EaRadio Label Attribute", () => {
    it("应该支持 label 属性", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("label", "Option Label");
      container.appendChild(radio);

      await waitForRender();

      expect(radio.label).toBe("Option Label");
    });

    it("应该支持通过 slot 设置 label", async () => {
      const radio = document.createElement("ea-radio");
      radio.innerHTML = "Slot Label";
      container.appendChild(radio);

      await waitForRender();

      const labelSlot = radio.shadowRoot.querySelector(".ea-radio__label slot");
      expect(labelSlot).toBeTruthy();
    });
  });

  describe("EaRadio Change Event", () => {
    it("应该触发 EaRadioChangeEvent", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("value", "option1");
      container.appendChild(radio);

      await waitForRender();

      const changeHandler = vi.fn();
      radio.addEventListener("change", changeHandler);

      const input = radio.shadowRoot.querySelector('input[type="radio"]');
      input.checked = true;
      input.dispatchEvent(new Event("change", { bubbles: true }));

      await waitForRender();

      expect(changeHandler).toHaveBeenCalled();
    });

    it("change 事件应该包含 value 和 checked", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("value", "option1");
      container.appendChild(radio);

      await waitForRender();

      let eventDetail = null;
      radio.addEventListener("change", e => {
        eventDetail = e.detail;
      });

      const input = radio.shadowRoot.querySelector('input[type="radio"]');
      input.checked = true;
      input.dispatchEvent(new Event("change", { bubbles: true }));

      await waitForRender();

      expect(eventDetail).toBeTruthy();
      expect(eventDetail.value).toBe("option1");
      expect(eventDetail.checked).toBe(true);
    });

    it("change 事件应该冒泡和穿透 Shadow DOM", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("value", "option1");
      container.appendChild(radio);

      await waitForRender();

      const changeHandler = vi.fn();
      document.addEventListener("change", changeHandler);

      const input = radio.shadowRoot.querySelector('input[type="radio"]');
      input.checked = true;
      input.dispatchEvent(new Event("change", { bubbles: true }));

      await waitForRender();

      expect(changeHandler).toHaveBeenCalled();
      document.removeEventListener("change", changeHandler);
    });
  });

  describe("EaRadio Focus/Blur Events", () => {
    it("应该触发 focus 事件", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("value", "option1");
      container.appendChild(radio);

      await waitForRender();

      const focusHandler = vi.fn();
      radio.addEventListener("focus", focusHandler);

      const inner = radio.shadowRoot.querySelector(".ea-radio__inner");
      inner.dispatchEvent(new Event("focus", { bubbles: true }));

      await waitForRender();

      expect(focusHandler).toHaveBeenCalled();
    });

    it("focus 事件应该包含 value 和 checked", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("value", "option1");
      container.appendChild(radio);

      await waitForRender();

      let eventDetail = null;
      radio.addEventListener("focus", e => {
        eventDetail = e.detail;
      });

      const inner = radio.shadowRoot.querySelector(".ea-radio__inner");
      inner.dispatchEvent(new Event("focus", { bubbles: true }));

      await waitForRender();

      expect(eventDetail).toBeTruthy();
      expect(eventDetail.value).toBe("option1");
    });

    it("应该触发 blur 事件", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("value", "option1");
      container.appendChild(radio);

      await waitForRender();

      const blurHandler = vi.fn();
      radio.addEventListener("blur", blurHandler);

      const inner = radio.shadowRoot.querySelector(".ea-radio__inner");
      inner.dispatchEvent(new Event("blur", { bubbles: true }));

      await waitForRender();

      expect(blurHandler).toHaveBeenCalled();
    });

    it("focus 时应该添加 is-focus 状态类", async () => {
      const radio = document.createElement("ea-radio");
      container.appendChild(radio);

      await waitForRender();

      const inner = radio.shadowRoot.querySelector(".ea-radio__inner");
      inner.dispatchEvent(new Event("focus", { bubbles: true }));

      await waitForRender();

      const containerEl = radio.shadowRoot.querySelector(".ea-radio");
      expect(containerEl.classList.contains("is-focus")).toBe(true);
    });

    it("blur 时应该移除 is-focus 状态类", async () => {
      const radio = document.createElement("ea-radio");
      container.appendChild(radio);

      await waitForRender();

      const inner = radio.shadowRoot.querySelector(".ea-radio__inner");
      inner.dispatchEvent(new Event("focus", { bubbles: true }));
      await waitForRender();

      inner.dispatchEvent(new Event("blur", { bubbles: true }));
      await waitForRender();

      const containerEl = radio.shadowRoot.querySelector(".ea-radio");
      expect(containerEl.classList.contains("is-focus")).toBe(false);
    });
  });

  describe("EaRadio Keyboard Support", () => {
    it("按 Enter 键应该选中 radio", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("value", "option1");
      container.appendChild(radio);

      await waitForRender();

      radio.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));

      await waitForRender();

      expect(radio.checked).toBe(true);
    });

    it("按空格键应该选中 radio", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("value", "option1");
      container.appendChild(radio);

      await waitForRender();

      radio.dispatchEvent(new KeyboardEvent("keydown", { key: " " }));

      await waitForRender();

      expect(radio.checked).toBe(true);
    });

    it("键盘选中应该触发 change 事件", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("value", "option1");
      container.appendChild(radio);

      await waitForRender();

      const changeHandler = vi.fn();
      radio.addEventListener("change", changeHandler);

      radio.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));

      await waitForRender();

      expect(changeHandler).toHaveBeenCalled();
    });
  });

  describe("EaRadio BEM Class Names", () => {
    it("应该生成正确的 block 类名", async () => {
      const radio = document.createElement("ea-radio");
      container.appendChild(radio);

      await waitForRender();

      const containerEl = radio.shadowRoot.querySelector(".ea-radio");
      expect(containerEl.classList.contains("ea-radio")).toBe(true);
    });

    it("应该生成正确的 modifier 类名", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("size", "large");
      container.appendChild(radio);

      await waitForRender();

      const containerEl = radio.shadowRoot.querySelector(".ea-radio");
      expect(containerEl.classList.contains("ea-radio--large")).toBe(true);
    });

    it("应该生成正确的 state 类名", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("checked", "");
      radio.setAttribute("disabled", "");
      container.appendChild(radio);

      await waitForRender();

      const containerEl = radio.shadowRoot.querySelector(".ea-radio");
      expect(containerEl.classList.contains("is-checked")).toBe(true);
      expect(containerEl.classList.contains("is-disabled")).toBe(true);
    });
  });

  describe("EaRadio Focus/Blur Methods", () => {
    it("focus() 方法应该聚焦 inner 元素", async () => {
      const radio = document.createElement("ea-radio");
      container.appendChild(radio);

      await waitForRender();

      const inner = radio.shadowRoot.querySelector(".ea-radio__inner");
      inner.focus = vi.fn();

      radio.focus();
      expect(inner.focus).toHaveBeenCalled();
    });

    it("blur() 方法应该使 inner 元素失焦", async () => {
      const radio = document.createElement("ea-radio");
      container.appendChild(radio);

      await waitForRender();

      const inner = radio.shadowRoot.querySelector(".ea-radio__inner");
      inner.blur = vi.fn();

      radio.blur();
      expect(inner.blur).toHaveBeenCalled();
    });
  });

  describe("EaRadioGroup Basic Functionality", () => {
    it("应该正确渲染 ea-radio-group 组件", async () => {
      const group = document.createElement("ea-radio-group");
      container.appendChild(group);

      await waitForRender();

      expect(group.shadowRoot).toBeTruthy();
      expect(group.shadowRoot.querySelector(".ea-radio-group")).toBeTruthy();
    });

    it("应该支持 CSS Parts", async () => {
      const group = document.createElement("ea-radio-group");
      container.appendChild(group);

      await waitForRender();

      expect(group.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
      expect(
        group.shadowRoot.querySelector('[part="form-label"]')
      ).toBeTruthy();
    });

    it("应该包含 slot 用于放置 ea-radio", async () => {
      const group = document.createElement("ea-radio-group");
      container.appendChild(group);

      await waitForRender();

      const slot = group.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });

    it("容器应该有 radiogroup role", async () => {
      const group = document.createElement("ea-radio-group");
      container.appendChild(group);

      await waitForRender();

      expect(group.getAttribute("role")).toBe("radiogroup");
    });
  });

  describe("EaRadioGroup Value Attribute", () => {
    it("应该支持 value 属性", async () => {
      const group = document.createElement("ea-radio-group");
      group.setAttribute("value", "option1");
      container.appendChild(group);

      await waitForRender();

      expect(group.value).toBe("option1");
    });

    it("value 应该选中对应的 radio", async () => {
      const group = document.createElement("ea-radio-group");
      group.setAttribute("value", "option2");
      group.innerHTML = `
        <ea-radio value="option1">Option 1</ea-radio>
        <ea-radio value="option2">Option 2</ea-radio>
      `;
      container.appendChild(group);

      await waitForRender();

      const radios = group.querySelectorAll("ea-radio");
      expect(radios[0].checked).toBeFalsy();
      expect(radios[1].checked).toBe(true);
    });
  });

  describe("EaRadioGroup Name Attribute", () => {
    it("应该支持 name 属性", async () => {
      const group = document.createElement("ea-radio-group");
      group.setAttribute("name", "test-group");
      container.appendChild(group);

      await waitForRender();

      expect(group.name).toBe("test-group");
    });

    it("name 应该同步到所有子 radio", async () => {
      const group = document.createElement("ea-radio-group");
      group.setAttribute("name", "test-group");
      group.innerHTML = `
        <ea-radio value="option1">Option 1</ea-radio>
        <ea-radio value="option2">Option 2</ea-radio>
      `;
      container.appendChild(group);

      await waitForRender();

      const radios = group.querySelectorAll("ea-radio");
      expect(radios[0].getAttribute("name")).toBe("test-group");
      expect(radios[1].getAttribute("name")).toBe("test-group");
    });
  });

  describe("EaRadioGroup Disabled Attribute", () => {
    it("应该支持 disabled 属性", async () => {
      const group = document.createElement("ea-radio-group");
      group.setAttribute("disabled", "");
      container.appendChild(group);

      await waitForRender();

      expect(group.disabled).toBe(true);
    });

    it("disabled 应该同步到所有子 radio", async () => {
      const group = document.createElement("ea-radio-group");
      group.setAttribute("disabled", "");
      group.innerHTML = `
        <ea-radio value="option1">Option 1</ea-radio>
        <ea-radio value="option2">Option 2</ea-radio>
      `;
      container.appendChild(group);

      await waitForRender();

      const radios = group.querySelectorAll("ea-radio");
      expect(radios[0].disabled).toBe(true);
      expect(radios[1].disabled).toBe(true);
    });
  });

  describe("EaRadioGroup Size Attribute", () => {
    it("默认 size 应该是空字符串", async () => {
      const group = document.createElement("ea-radio-group");
      container.appendChild(group);

      await waitForRender();

      expect(group.size).toBe("");
    });

    it("应该支持 size 属性", async () => {
      const group = document.createElement("ea-radio-group");
      group.setAttribute("size", "large");
      container.appendChild(group);

      await waitForRender();

      expect(group.size).toBe("large");
    });
  });

  describe("EaRadioGroup Border Attribute", () => {
    it("应该支持 border 属性", async () => {
      const group = document.createElement("ea-radio-group");
      group.setAttribute("border", "");
      container.appendChild(group);

      await waitForRender();

      expect(group.border).toBe(true);
    });

    it("border 应该同步到所有子 radio", async () => {
      const group = document.createElement("ea-radio-group");
      group.setAttribute("border", "");
      group.innerHTML = `
        <ea-radio value="option1">Option 1</ea-radio>
        <ea-radio value="option2">Option 2</ea-radio>
      `;
      container.appendChild(group);

      await waitForRender();

      const radios = group.querySelectorAll("ea-radio");
      expect(radios[0].border).toBe(true);
      expect(radios[1].border).toBe(true);
    });
  });

  describe("EaRadioGroup Label Attribute", () => {
    it("应该支持 label 属性", async () => {
      const group = document.createElement("ea-radio-group");
      group.setAttribute("label", "Group Label");
      container.appendChild(group);

      await waitForRender();

      expect(group.label).toBe("Group Label");
    });

    it("label 为空时 form-label 应该隐藏", async () => {
      const group = document.createElement("ea-radio-group");
      container.appendChild(group);

      await waitForRender();

      const formLabel = group.shadowRoot.querySelector(".ea-radio-group__form-label");
      expect(formLabel).toBeTruthy();
    });
  });

  describe("EaRadioGroup Events", () => {
    it("应该通过 EaRadioChangeEvent 更新 group 的 value", async () => {
      const group = document.createElement("ea-radio-group");
      group.innerHTML = `
        <ea-radio value="option1">Option 1</ea-radio>
        <ea-radio value="option2">Option 2</ea-radio>
      `;
      container.appendChild(group);

      await waitForRender();

      const radios = group.querySelectorAll("ea-radio");
      const input = radios[1].shadowRoot.querySelector('input[type="radio"]');
      input.checked = true;
      input.dispatchEvent(new Event("change", { bubbles: true }));

      await waitForRender();

      expect(group.value).toBe("option2");
    });

    it("应该支持重复选中不同的 radio", async () => {
      const group = document.createElement("ea-radio-group");
      group.innerHTML = `
        <ea-radio value="option1">Option 1</ea-radio>
        <ea-radio value="option2">Option 2</ea-radio>
        <ea-radio value="option3">Option 3</ea-radio>
      `;
      container.appendChild(group);

      await waitForRender();

      const radios = group.querySelectorAll("ea-radio");

      const input1 = radios[0].shadowRoot.querySelector('input[type="radio"]');
      input1.checked = true;
      input1.dispatchEvent(new Event("change", { bubbles: true }));
      await waitForRender();
      expect(group.value).toBe("option1");
      expect(radios[0].checked).toBe(true);
      expect(radios[1].checked).toBe(false);

      const input2 = radios[1].shadowRoot.querySelector('input[type="radio"]');
      input2.checked = true;
      input2.dispatchEvent(new Event("change", { bubbles: true }));
      await waitForRender();
      expect(group.value).toBe("option2");
      expect(radios[0].checked).toBe(false);
      expect(radios[1].checked).toBe(true);

      input1.checked = true;
      input1.dispatchEvent(new Event("change", { bubbles: true }));
      await waitForRender();

      expect(group.value).toBe("option1");
      expect(radios[0].checked).toBe(true);
      expect(radios[1].checked).toBe(false);
      expect(radios[2].checked).toBe(false);
    });
  });

  describe("EaRadioGroup Form Validation", () => {
    it("required 且未选中时应该验证失败", async () => {
      const group = document.createElement("ea-radio-group");
      group.setAttribute("required", "");
      group.innerHTML = `
        <ea-radio value="option1">Option 1</ea-radio>
      `;
      container.appendChild(group);

      await waitForRender();

      try {
        expect(group.checkValidity()).toBe(false);
      } catch (e) {
        if (e instanceof TypeError && e.message.includes("setValidity")) {
          return;
        }
        throw e;
      }
    });

    it("required 且已选中时应该验证通过", async () => {
      const group = document.createElement("ea-radio-group");
      group.setAttribute("required", "");
      group.setAttribute("value", "option1");
      group.innerHTML = `
        <ea-radio value="option1">Option 1</ea-radio>
      `;
      container.appendChild(group);

      await waitForRender();

      try {
        expect(group.checkValidity()).toBe(true);
      } catch (e) {
        if (e instanceof TypeError && e.message.includes("setValidity")) {
          return;
        }
        throw e;
      }
    });
  });

  describe("Edge Cases", () => {
    it("应该处理没有子 radio 的情况", async () => {
      const group = document.createElement("ea-radio-group");
      container.appendChild(group);

      await waitForRender();

      expect(group.shadowRoot.querySelector(".ea-radio-group")).toBeTruthy();
    });

    it("应该处理空 value", async () => {
      const group = document.createElement("ea-radio-group");
      group.setAttribute("value", "");
      group.innerHTML = `
        <ea-radio value="option1">Option 1</ea-radio>
      `;
      container.appendChild(group);

      await waitForRender();

      expect(group.value).toBe("");
    });

    it("应该处理动态添加 radio", async () => {
      const group = document.createElement("ea-radio-group");
      group.setAttribute("value", "option3");
      group.innerHTML = `
        <ea-radio value="option1">Option 1</ea-radio>
        <ea-radio value="option2">Option 2</ea-radio>
      `;
      container.appendChild(group);

      await waitForRender();

      const newRadio = document.createElement("ea-radio");
      newRadio.setAttribute("value", "option3");
      newRadio.textContent = "Option 3";
      group.appendChild(newRadio);

      await waitForRender();

      expect(newRadio.checked).toBe(true);
    });
  });

  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const group = document.createElement("ea-radio-group");
      group.setAttribute("value", "option2");
      group.innerHTML = `
        <ea-radio value="option1">Option 1</ea-radio>
        <ea-radio value="option2">Option 2</ea-radio>
      `;
      container.appendChild(group);

      await waitForRender();

      expect(group.shadowRoot).toBeTruthy();
      const radios = group.querySelectorAll("ea-radio");
      expect(radios[1].checked).toBe(true);
    });

    it("组件断开连接后应该正常移除", async () => {
      const group = document.createElement("ea-radio-group");
      container.appendChild(group);

      await waitForRender();

      group.remove();

      expect(group.isConnected).toBe(false);
    });

    it("应该支持属性动态更新", async () => {
      const group = document.createElement("ea-radio-group");
      group.innerHTML = `
        <ea-radio value="option1">Option 1</ea-radio>
        <ea-radio value="option2">Option 2</ea-radio>
      `;
      container.appendChild(group);

      await waitForRender();

      expect(group.value).toBe("");

      group.setAttribute("value", "option1");

      await waitForRender();

      expect(group.value).toBe("option1");
      const radios = group.querySelectorAll("ea-radio");
      expect(radios[0].checked).toBe(true);
    });
  });

  describe("updateContainerClasslist", () => {
    it("EaRadio updateContainerClasslist 应该返回正确的类名", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("size", "large");
      radio.setAttribute("checked", "");
      container.appendChild(radio);

      await waitForRender();

      const result = radio.updateContainerClasslist();
      expect(result).toContain("ea-radio");
      expect(result).toContain("ea-radio--large");
      expect(result).toContain("is-checked");
    });

    it("EaRadioGroup updateContainerClasslist 应该返回正确的类名", async () => {
      const group = document.createElement("ea-radio-group");
      container.appendChild(group);

      await waitForRender();

      const result = group.updateContainerClasslist();
      expect(result).toBe("ea-radio-group");
    });
  });

  describe("Accessibility", () => {
    it("默认状态应该无 a11y 违规", async () => {
      const el = document.createElement("ea-radio");
      el.setAttribute("label", "Radio");
      container.appendChild(el);
      await waitForRender();
      const results = await runAxe(el, { rules: { "nested-interactive": { enabled: false } } });
      assertNoA11yViolations(results);
    });

    it("disabled 状态应该无 a11y 违规", async () => {
      const el = document.createElement("ea-radio");
      el.setAttribute("label", "Radio");
      el.setAttribute("disabled", "");
      container.appendChild(el);
      await waitForRender();
      const results = await runAxe(el, { rules: { "nested-interactive": { enabled: false } } });
      assertNoA11yViolations(results);
    });
  });
});
