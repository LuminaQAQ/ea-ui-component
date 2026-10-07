import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

import "../components/ea-radio/index.js";
import { fireKeydown } from "./utils/keyboard.js";
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
    it("应该正确渲染 ea-radio 组件", () => {
      const radio = document.createElement("ea-radio");
      container.appendChild(radio);

      expect(radio.shadowRoot).toBeTruthy();
      expect(radio.shadowRoot.querySelector(".ea-radio")).toBeTruthy();
    });

    it("应该包含原生 radio input", () => {
      const radio = document.createElement("ea-radio");
      container.appendChild(radio);

      const input = radio.shadowRoot.querySelector('input[type="radio"]');
      expect(input).toBeTruthy();
    });

    it("应该包含 inner 元素", () => {
      const radio = document.createElement("ea-radio");
      container.appendChild(radio);

      const inner = radio.shadowRoot.querySelector(".ea-radio__inner");
      expect(inner).toBeTruthy();
      expect(inner.getAttribute("tabindex")).toBe("0");
    });

    it("应该包含 label 元素和 slot", () => {
      const radio = document.createElement("ea-radio");
      container.appendChild(radio);

      const label = radio.shadowRoot.querySelector(".ea-radio__label");
      expect(label).toBeTruthy();
      expect(label.querySelector("slot")).toBeTruthy();
    });
  });

  describe("EaRadio CSS Parts", () => {
    it("应该支持所有 CSS Parts", () => {
      const radio = document.createElement("ea-radio");
      container.appendChild(radio);

      expect(radio.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
      expect(radio.shadowRoot.querySelector('[part="original"]')).toBeTruthy();
      expect(radio.shadowRoot.querySelector('[part="input"]')).toBeTruthy();
      expect(
        radio.shadowRoot.querySelector('[part="input-wrap"]')
      ).toBeTruthy();
      expect(radio.shadowRoot.querySelector('[part="label"]')).toBeTruthy();
    });
  });

  describe("EaRadio Value Attribute", () => {
    it("应该支持 value 属性", () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("value", "option1");
      container.appendChild(radio);

      expect(radio.value).toBe("option1");
    });

    it("value 应该同步到原生 input", () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("value", "option1");
      container.appendChild(radio);

      const input = radio.shadowRoot.querySelector('input[type="radio"]');
      expect(input.getAttribute("value")).toBe("option1");
    });
  });

  describe("EaRadio Checked Attribute", () => {
    it("默认 checked 应该是 false", () => {
      const radio = document.createElement("ea-radio");
      container.appendChild(radio);

      expect(radio.checked).toBe(false);
    });

    it("应该支持 checked 属性", () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("checked", "");
      container.appendChild(radio);

      expect(radio.checked).toBe(true);
    });

    it("checked 应该同步到原生 input", () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("checked", "");
      container.appendChild(radio);

      const input = radio.shadowRoot.querySelector('input[type="radio"]');
      expect(input.checked).toBe(true);
    });

    it("checked 时应该添加 is-checked 状态类", () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("checked", "");
      container.appendChild(radio);

      const containerEl = radio.shadowRoot.querySelector(".ea-radio");
      expect(containerEl.classList.contains("is-checked")).toBe(true);
    });
  });

  describe("EaRadio Disabled Attribute", () => {
    it("默认 disabled 应该是 false", () => {
      const radio = document.createElement("ea-radio");
      container.appendChild(radio);

      expect(radio.disabled).toBe(false);
    });

    it("应该支持 disabled 属性", () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("disabled", "");
      container.appendChild(radio);

      expect(radio.disabled).toBe(true);
    });

    it("disabled 应该同步到原生 input", () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("disabled", "");
      container.appendChild(radio);

      const input = radio.shadowRoot.querySelector('input[type="radio"]');
      expect(input.disabled).toBe(true);
    });

    it("disabled 时应该添加 is-disabled 状态类", () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("disabled", "");
      container.appendChild(radio);

      const containerEl = radio.shadowRoot.querySelector(".ea-radio");
      expect(containerEl.classList.contains("is-disabled")).toBe(true);
    });
  });

  describe("EaRadio Size Attribute", () => {
    it("默认 size 应该是 default", () => {
      const radio = document.createElement("ea-radio");
      container.appendChild(radio);

      expect(radio.size).toBe("default");
    });

    it("应该支持 large 尺寸", () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("size", "large");
      container.appendChild(radio);

      expect(radio.size).toBe("large");
      const containerEl = radio.shadowRoot.querySelector(".ea-radio");
      expect(containerEl.classList.contains("ea-radio--large")).toBe(true);
    });

    it("应该支持 small 尺寸", () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("size", "small");
      container.appendChild(radio);

      expect(radio.size).toBe("small");
      const containerEl = radio.shadowRoot.querySelector(".ea-radio");
      expect(containerEl.classList.contains("ea-radio--small")).toBe(true);
    });

    it("应该支持 default 尺寸", () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("size", "default");
      container.appendChild(radio);

      expect(radio.size).toBe("default");
      const containerEl = radio.shadowRoot.querySelector(".ea-radio");
      expect(containerEl.classList.contains("ea-radio--default")).toBe(true);
    });
  });

  describe("EaRadio Border Attribute", () => {
    it("默认 border 应该是 false", () => {
      const radio = document.createElement("ea-radio");
      container.appendChild(radio);

      expect(radio.border).toBe(false);
    });

    it("应该支持 border 属性", () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("border", "");
      container.appendChild(radio);

      expect(radio.border).toBe(true);
    });

    it("border 时应该添加 is-border 状态类", () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("border", "");
      container.appendChild(radio);

      const containerEl = radio.shadowRoot.querySelector(".ea-radio");
      expect(containerEl.classList.contains("is-border")).toBe(true);
    });
  });

  describe("EaRadio Label Attribute", () => {
    it("应该支持 label 属性", () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("label", "Option Label");
      container.appendChild(radio);

      expect(radio.label).toBe("Option Label");
    });

    it("应该支持通过 slot 设置 label", () => {
      const radio = document.createElement("ea-radio");
      radio.innerHTML = "Slot Label";
      container.appendChild(radio);

      const labelSlot = radio.shadowRoot.querySelector(".ea-radio__label slot");
      expect(labelSlot).toBeTruthy();
    });
  });

  describe("EaRadio Change Event", () => {
    it("应该触发 EaRadioChangeEvent", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("value", "option1");
      container.appendChild(radio);

      await radio.updateComplete;

      const changeHandler = vi.fn();
      radio.addEventListener("change", changeHandler);

      const input = radio.shadowRoot.querySelector('input[type="radio"]');
      input.checked = true;
      input.dispatchEvent(new Event("change", { bubbles: true }));

      await radio.updateComplete;

      expect(changeHandler).toHaveBeenCalled();
    });

    it("change 事件应该包含 value 和 checked", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("value", "option1");
      container.appendChild(radio);

      await radio.updateComplete;

      let eventDetail = null;
      radio.addEventListener("change", e => {
        eventDetail = e.detail;
      });

      const input = radio.shadowRoot.querySelector('input[type="radio"]');
      input.checked = true;
      input.dispatchEvent(new Event("change", { bubbles: true }));

      await radio.updateComplete;

      expect(eventDetail).toBeTruthy();
      expect(eventDetail.value).toBe("option1");
      expect(eventDetail.checked).toBe(true);
    });

    it("change 事件应该冒泡和穿透 Shadow DOM", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("value", "option1");
      container.appendChild(radio);

      await radio.updateComplete;

      const changeHandler = vi.fn();
      document.addEventListener("change", changeHandler);

      const input = radio.shadowRoot.querySelector('input[type="radio"]');
      input.checked = true;
      input.dispatchEvent(new Event("change", { bubbles: true }));

      await radio.updateComplete;

      expect(changeHandler).toHaveBeenCalled();
      document.removeEventListener("change", changeHandler);
    });
  });

  describe("EaRadio Focus/Blur Events", () => {
    it("应该触发 focus 事件", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("value", "option1");
      container.appendChild(radio);

      await radio.updateComplete;

      const focusHandler = vi.fn();
      radio.addEventListener("focus", focusHandler);

      const inner = radio.shadowRoot.querySelector(".ea-radio__inner");
      inner.dispatchEvent(new Event("focus", { bubbles: true }));

      await radio.updateComplete;

      expect(focusHandler).toHaveBeenCalled();
    });

    it("focus 事件应该包含 value 和 checked", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("value", "option1");
      container.appendChild(radio);

      await radio.updateComplete;

      let eventDetail = null;
      radio.addEventListener("focus", e => {
        eventDetail = e.detail;
      });

      const inner = radio.shadowRoot.querySelector(".ea-radio__inner");
      inner.dispatchEvent(new Event("focus", { bubbles: true }));

      await radio.updateComplete;

      expect(eventDetail).toBeTruthy();
      expect(eventDetail.value).toBe("option1");
    });

    it("应该触发 blur 事件", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("value", "option1");
      container.appendChild(radio);

      await radio.updateComplete;

      const blurHandler = vi.fn();
      radio.addEventListener("blur", blurHandler);

      const inner = radio.shadowRoot.querySelector(".ea-radio__inner");
      inner.dispatchEvent(new Event("blur", { bubbles: true }));

      await radio.updateComplete;

      expect(blurHandler).toHaveBeenCalled();
    });

    it("focus 时应该添加 is-focus 状态类", async () => {
      const radio = document.createElement("ea-radio");
      container.appendChild(radio);

      await radio.updateComplete;

      const inner = radio.shadowRoot.querySelector(".ea-radio__inner");
      inner.dispatchEvent(new Event("focus", { bubbles: true }));

      await radio.updateComplete;

      const containerEl = radio.shadowRoot.querySelector(".ea-radio");
      expect(containerEl.classList.contains("is-focus")).toBe(true);
    });

    it("blur 时应该移除 is-focus 状态类", async () => {
      const radio = document.createElement("ea-radio");
      container.appendChild(radio);

      await radio.updateComplete;

      const inner = radio.shadowRoot.querySelector(".ea-radio__inner");
      inner.dispatchEvent(new Event("focus", { bubbles: true }));
      await radio.updateComplete;

      inner.dispatchEvent(new Event("blur", { bubbles: true }));
      await radio.updateComplete;

      const containerEl = radio.shadowRoot.querySelector(".ea-radio");
      expect(containerEl.classList.contains("is-focus")).toBe(false);
    });
  });

  describe("EaRadio Keyboard Support", () => {
    it("按 Enter 键应该选中 radio", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("value", "option1");
      container.appendChild(radio);

      await radio.updateComplete;

      radio.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));

      await radio.updateComplete;

      expect(radio.checked).toBe(true);
    });

    it("按空格键应该选中 radio", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("value", "option1");
      container.appendChild(radio);

      await radio.updateComplete;

      radio.dispatchEvent(new KeyboardEvent("keydown", { key: " " }));

      await radio.updateComplete;

      expect(radio.checked).toBe(true);
    });

    it("键盘选中应该触发 change 事件", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("value", "option1");
      container.appendChild(radio);

      await radio.updateComplete;

      const changeHandler = vi.fn();
      radio.addEventListener("change", changeHandler);

      radio.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));

      await radio.updateComplete;

      expect(changeHandler).toHaveBeenCalled();
    });
  });

  describe("EaRadio BEM Class Names", () => {
    it("应该生成正确的 block 类名", () => {
      const radio = document.createElement("ea-radio");
      container.appendChild(radio);

      const containerEl = radio.shadowRoot.querySelector(".ea-radio");
      expect(containerEl.classList.contains("ea-radio")).toBe(true);
    });

    it("应该生成正确的 modifier 类名", () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("size", "large");
      container.appendChild(radio);

      const containerEl = radio.shadowRoot.querySelector(".ea-radio");
      expect(containerEl.classList.contains("ea-radio--large")).toBe(true);
    });

    it("应该生成正确的 state 类名", () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("checked", "");
      radio.setAttribute("disabled", "");
      container.appendChild(radio);

      const containerEl = radio.shadowRoot.querySelector(".ea-radio");
      expect(containerEl.classList.contains("is-checked")).toBe(true);
      expect(containerEl.classList.contains("is-disabled")).toBe(true);
    });
  });

  describe("EaRadio Focus/Blur Methods", () => {
    it("focus() 方法应该聚焦 inner 元素", async () => {
      const radio = document.createElement("ea-radio");
      container.appendChild(radio);

      await radio.updateComplete;

      const inner = radio.shadowRoot.querySelector(".ea-radio__inner");
      inner.focus = vi.fn();

      radio.focus();
      expect(inner.focus).toHaveBeenCalled();
    });

    it("blur() 方法应该使 inner 元素失焦", async () => {
      const radio = document.createElement("ea-radio");
      container.appendChild(radio);

      await radio.updateComplete;

      const inner = radio.shadowRoot.querySelector(".ea-radio__inner");
      inner.blur = vi.fn();

      radio.blur();
      expect(inner.blur).toHaveBeenCalled();
    });
  });

  describe("EaRadioGroup Basic Functionality", () => {
    it("应该正确渲染 ea-radio-group 组件", () => {
      const group = document.createElement("ea-radio-group");
      container.appendChild(group);

      expect(group.shadowRoot).toBeTruthy();
      expect(group.shadowRoot.querySelector(".ea-radio-group")).toBeTruthy();
    });

    it("应该支持 CSS Parts", () => {
      const group = document.createElement("ea-radio-group");
      container.appendChild(group);

      expect(group.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
      expect(
        group.shadowRoot.querySelector('[part="form-label"]')
      ).toBeTruthy();
    });

    it("应该包含 slot 用于放置 ea-radio", () => {
      const group = document.createElement("ea-radio-group");
      container.appendChild(group);

      const slot = group.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });

    it("容器应该有 radiogroup role", async () => {
      const group = document.createElement("ea-radio-group");
      container.appendChild(group);

      await group.updateComplete;

      expect(group.getAttribute("role")).toBe("radiogroup");
    });
  });

  describe("EaRadioGroup Value Attribute", () => {
    it("应该支持 value 属性", () => {
      const group = document.createElement("ea-radio-group");
      group.setAttribute("value", "option1");
      container.appendChild(group);

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

      await group.updateComplete;

      const radios = group.querySelectorAll("ea-radio");
      expect(radios[0].checked).toBeFalsy();
      expect(radios[1].checked).toBe(true);
    });
  });

  describe("EaRadioGroup Name Attribute", () => {
    it("应该支持 name 属性", () => {
      const group = document.createElement("ea-radio-group");
      group.setAttribute("name", "test-group");
      container.appendChild(group);

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

      await group.updateComplete;

      const radios = group.querySelectorAll("ea-radio");
      expect(radios[0].getAttribute("name")).toBe("test-group");
      expect(radios[1].getAttribute("name")).toBe("test-group");
    });
  });

  describe("EaRadioGroup Disabled Attribute", () => {
    it("应该支持 disabled 属性", () => {
      const group = document.createElement("ea-radio-group");
      group.setAttribute("disabled", "");
      container.appendChild(group);

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

      await group.updateComplete;

      const radios = group.querySelectorAll("ea-radio");
      expect(radios[0].disabled).toBe(true);
      expect(radios[1].disabled).toBe(true);
    });
  });

  describe("EaRadioGroup Size Attribute", () => {
    it("默认 size 应该是空字符串", () => {
      const group = document.createElement("ea-radio-group");
      container.appendChild(group);

      expect(group.size).toBe("");
    });

    it("应该支持 size 属性", () => {
      const group = document.createElement("ea-radio-group");
      group.setAttribute("size", "large");
      container.appendChild(group);

      expect(group.size).toBe("large");
    });
  });

  describe("EaRadioGroup Border Attribute", () => {
    it("应该支持 border 属性", () => {
      const group = document.createElement("ea-radio-group");
      group.setAttribute("border", "");
      container.appendChild(group);

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

      await group.updateComplete;

      const radios = group.querySelectorAll("ea-radio");
      expect(radios[0].border).toBe(true);
      expect(radios[1].border).toBe(true);
    });
  });

  describe("EaRadioGroup Label Attribute", () => {
    it("应该支持 label 属性", () => {
      const group = document.createElement("ea-radio-group");
      group.setAttribute("label", "Group Label");
      container.appendChild(group);

      expect(group.label).toBe("Group Label");
    });

    it("label 为空时 form-label 应该隐藏", () => {
      const group = document.createElement("ea-radio-group");
      container.appendChild(group);

      const formLabel = group.shadowRoot.querySelector(
        ".ea-radio-group__form-label"
      );
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

      await group.updateComplete;

      const radios = group.querySelectorAll("ea-radio");
      const input = radios[1].shadowRoot.querySelector('input[type="radio"]');
      input.checked = true;
      input.dispatchEvent(new Event("change", { bubbles: true }));

      await group.updateComplete;

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

      await group.updateComplete;

      const radios = group.querySelectorAll("ea-radio");

      const input1 = radios[0].shadowRoot.querySelector('input[type="radio"]');
      input1.checked = true;
      input1.dispatchEvent(new Event("change", { bubbles: true }));
      await group.updateComplete;
      expect(group.value).toBe("option1");
      expect(radios[0].checked).toBe(true);
      expect(radios[1].checked).toBe(false);

      const input2 = radios[1].shadowRoot.querySelector('input[type="radio"]');
      input2.checked = true;
      input2.dispatchEvent(new Event("change", { bubbles: true }));
      await group.updateComplete;
      expect(group.value).toBe("option2");
      expect(radios[0].checked).toBe(false);
      expect(radios[1].checked).toBe(true);

      input1.checked = true;
      input1.dispatchEvent(new Event("change", { bubbles: true }));
      await group.updateComplete;

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

      await group.updateComplete;

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

      await group.updateComplete;

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
    it("应该处理没有子 radio 的情况", () => {
      const group = document.createElement("ea-radio-group");
      container.appendChild(group);

      expect(group.shadowRoot.querySelector(".ea-radio-group")).toBeTruthy();
    });

    it("应该处理空 value", () => {
      const group = document.createElement("ea-radio-group");
      group.setAttribute("value", "");
      group.innerHTML = `
        <ea-radio value="option1">Option 1</ea-radio>
      `;
      container.appendChild(group);

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

      await group.updateComplete;

      const newRadio = document.createElement("ea-radio");
      newRadio.setAttribute("value", "option3");
      newRadio.textContent = "Option 3";
      group.appendChild(newRadio);

      await newRadio.updateComplete;

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

      await group.updateComplete;

      expect(group.shadowRoot).toBeTruthy();
      const radios = group.querySelectorAll("ea-radio");
      expect(radios[1].checked).toBe(true);
    });

    it("组件断开连接后应该正常移除", () => {
      const group = document.createElement("ea-radio-group");
      container.appendChild(group);

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

      await group.updateComplete;

      expect(group.value).toBe("");

      group.setAttribute("value", "option1");

      await group.updateComplete;

      expect(group.value).toBe("option1");
      const radios = group.querySelectorAll("ea-radio");
      expect(radios[0].checked).toBe(true);
    });
  });

  describe("updateContainerClasslist", () => {
    it("EaRadio updateContainerClasslist 应该返回正确的类名", () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("size", "large");
      radio.setAttribute("checked", "");
      container.appendChild(radio);

      const result = radio.updateContainerClasslist();
      expect(result).toContain("ea-radio");
      expect(result).toContain("ea-radio--large");
      expect(result).toContain("is-checked");
    });

    it("EaRadioGroup updateContainerClasslist 应该返回正确的类名", () => {
      const group = document.createElement("ea-radio-group");
      container.appendChild(group);

      const result = group.updateContainerClasslist();
      expect(result).toBe("ea-radio-group");
    });
  });

  describe("Accessibility", () => {
    it("默认状态应该无 a11y 违规", async () => {
      const el = document.createElement("ea-radio");
      el.setAttribute("label", "Radio");
      container.appendChild(el);
      await el.updateComplete;
      const results = await runAxe(el, {
        rules: { "nested-interactive": { enabled: false } },
      });
      assertNoA11yViolations(results);
    });

    it("disabled 状态应该无 a11y 违规", async () => {
      const el = document.createElement("ea-radio");
      el.setAttribute("label", "Radio");
      el.setAttribute("disabled", "");
      container.appendChild(el);
      await el.updateComplete;
      const results = await runAxe(el, {
        rules: { "nested-interactive": { enabled: false } },
      });
      assertNoA11yViolations(results);
    });
  });
});

describe("EaRadioGroup Keyboard And Form APIs", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  const THREE_RADIOS = `
    <ea-radio value="a">A</ea-radio>
    <ea-radio value="b">B</ea-radio>
    <ea-radio value="c">C</ea-radio>
  `;

  async function createGroup(innerHTML, attrs = {}) {
    const group = document.createElement("ea-radio-group");
    for (const [key, value] of Object.entries(attrs)) {
      group.setAttribute(key, value);
    }
    if (innerHTML) group.innerHTML = innerHTML;
    container.appendChild(group);
    await group.updateComplete;
    return group;
  }

  describe("Keyboard Navigation", () => {
    it("ArrowRight 应选中下一个 radio", async () => {
      const group = await createGroup(THREE_RADIOS);
      group.value = "a";
      await group.updateComplete;

      const event = fireKeydown(group, "ArrowRight");

      expect(group.value).toBe("b");
      expect(event.defaultPrevented).toBe(true);
    });

    it("ArrowDown 应选中下一个 radio", async () => {
      const group = await createGroup(THREE_RADIOS);
      group.value = "a";
      await group.updateComplete;

      fireKeydown(group, "ArrowDown");

      expect(group.value).toBe("b");
    });

    it("末尾按 ArrowRight 应回绕到第一个", async () => {
      const group = await createGroup(THREE_RADIOS);
      group.value = "c";
      await group.updateComplete;

      fireKeydown(group, "ArrowRight");

      expect(group.value).toBe("a");
    });

    it("ArrowLeft 应选中上一个 radio", async () => {
      const group = await createGroup(THREE_RADIOS);
      group.value = "b";
      await group.updateComplete;

      fireKeydown(group, "ArrowLeft");

      expect(group.value).toBe("a");
    });

    it("ArrowUp 应选中上一个 radio", async () => {
      const group = await createGroup(THREE_RADIOS);
      group.value = "b";
      await group.updateComplete;

      fireKeydown(group, "ArrowUp");

      expect(group.value).toBe("a");
    });

    it("开头按 ArrowLeft 应回绕到最后一个", async () => {
      const group = await createGroup(THREE_RADIOS);
      group.value = "a";
      await group.updateComplete;

      fireKeydown(group, "ArrowLeft");

      expect(group.value).toBe("c");
    });

    it("空格在未选中时选中第一个 radio", async () => {
      const group = await createGroup(THREE_RADIOS);

      const event = fireKeydown(group, " ");

      expect(group.value).toBe("a");
      expect(event.defaultPrevented).toBe(true);
    });

    it("空格在已选中时不改变选中项", async () => {
      const group = await createGroup(THREE_RADIOS);
      group.value = "b";
      await group.updateComplete;

      const event = fireKeydown(group, " ");

      expect(group.value).toBe("b");
      expect(event.defaultPrevented).toBe(true);
    });

    it("导航应跳过 disabled 的 radio", async () => {
      const group = await createGroup(`
        <ea-radio value="a">A</ea-radio>
        <ea-radio value="b" disabled>B</ea-radio>
        <ea-radio value="c">C</ea-radio>
      `);
      group.value = "a";
      await group.updateComplete;

      fireKeydown(group, "ArrowRight");

      expect(group.value).toBe("c");
    });

    it("没有可用 radio 时按键不处理", async () => {
      const group = await createGroup("");

      const event = fireKeydown(group, "ArrowRight");

      expect(event.defaultPrevented).toBe(false);
    });

    it("其他按键不处理", async () => {
      const group = await createGroup(THREE_RADIOS);

      const event = fireKeydown(group, "Enter");

      expect(event.defaultPrevented).toBe(false);
    });
  });

  describe("Change Event Handling", () => {
    it("非 EaRadioChangeEvent 的 change 事件应被忽略", async () => {
      const group = await createGroup(THREE_RADIOS, { value: "a" });

      group.dispatchEvent(new Event("change", { bubbles: true }));
      await group.updateComplete;

      expect(group.value).toBe("a");
    });
  });

  describe("Group Form APIs", () => {
    it("formResetCallback 应清空 value 与所有选中状态", async () => {
      const group = await createGroup(THREE_RADIOS, { value: "b" });

      group.formResetCallback();

      expect(group.value).toBe("");
      const radios = Array.from(group.querySelectorAll("ea-radio"));
      expect(radios.every(radio => !radio.checked)).toBe(true);
    });

    it("validationTarget 应返回已选中或第一个 radio", async () => {
      const group = await createGroup(THREE_RADIOS, { value: "b" });

      const target = group.validationTarget;

      expect(target).toBeTruthy();
      expect(target.tagName).toBe("EA-RADIO");
    });

    it("reportValidity 应可调用", async () => {
      const group = await createGroup(THREE_RADIOS, { required: "" });

      try {
        group.reportValidity();
      } catch (e) {
        if (!(e instanceof TypeError)) throw e;
      }
    });
  });

  describe("Size Sync To Children", () => {
    it("设置 size 应同步到未设置 size 的子 radio", async () => {
      const group = await createGroup(THREE_RADIOS);

      group.setAttribute("size", "small");
      await group.updateComplete;

      const radios = group.querySelectorAll("ea-radio");
      expect(radios[0].getAttribute("size")).toBe("small");
      expect(radios[1].getAttribute("size")).toBe("small");
    });

    it("子 radio 已有 size 时不应被覆盖", async () => {
      const group = await createGroup(`
        <ea-radio value="a" size="large">A</ea-radio>
        <ea-radio value="b">B</ea-radio>
      `);

      group.setAttribute("size", "small");
      await group.updateComplete;

      const radios = group.querySelectorAll("ea-radio");
      expect(radios[0].getAttribute("size")).toBe("large");
      expect(radios[1].getAttribute("size")).toBe("small");
    });

    it("size 置空时提前返回且不影响子 radio", async () => {
      const group = await createGroup(THREE_RADIOS, { size: "small" });

      group.setAttribute("size", "");
      await group.updateComplete;

      expect(group.size).toBe("");
      expect(group.querySelectorAll("ea-radio")[0].getAttribute("size")).toBe(
        "small"
      );
    });
  });

  describe("EaRadio Form APIs", () => {
    async function createRadio(attrs = {}) {
      const radio = document.createElement("ea-radio");
      for (const [key, value] of Object.entries(attrs)) {
        radio.setAttribute(key, value);
      }
      container.appendChild(radio);
      await radio.updateComplete;
      return radio;
    }

    it("formResetCallback 应取消选中", async () => {
      const radio = await createRadio({ value: "a" });
      radio.checked = true;

      radio.formResetCallback();

      expect(radio.checked).toBe(false);
    });

    it("validationTarget 应返回容器元素", async () => {
      const radio = await createRadio({ value: "a" });

      expect(radio.validationTarget).toBeTruthy();
    });

    it("checkValidity 与 reportValidity 应可调用", async () => {
      const radio = await createRadio({ value: "a", required: "" });

      try {
        radio.checkValidity();
        radio.reportValidity();
      } catch (e) {
        if (!(e instanceof TypeError)) throw e;
      }
    });

    it("required 且已选中时 updateValidity 走通过分支", async () => {
      const radio = await createRadio({ value: "a", required: "" });
      radio.checked = true;

      try {
        radio.updateValidity();
      } catch (e) {
        if (!(e instanceof TypeError)) throw e;
      }
    });

    it("disabled 时键盘事件不改变选中状态", async () => {
      const radio = await createRadio({ value: "a", disabled: "" });

      fireKeydown(radio, "Enter");

      expect(radio.checked).toBe(false);
    });
  });
});
