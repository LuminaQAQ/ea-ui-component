import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// 导入 ea-radio 和 ea-radio-group 组件
import "../components/ea-radio/index.js";

describe("EaRadio and EaRadioGroup Components", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  /**
   * EaRadio 基础功能测试
   */
  describe("EaRadio Basic Functionality", () => {
    it("应该正确渲染 ea-radio 组件", async () => {
      const radio = document.createElement("ea-radio");
      container.appendChild(radio);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(radio.shadowRoot).toBeTruthy();
      expect(radio.shadowRoot.querySelector(".ea-radio")).toBeTruthy();
    });

    it("应该支持 CSS Parts", async () => {
      const radio = document.createElement("ea-radio");
      container.appendChild(radio);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(radio.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
      expect(
        radio.shadowRoot.querySelector('[part="input-wrap"]')
      ).toBeTruthy();
      expect(radio.shadowRoot.querySelector('[part="input"]')).toBeTruthy();
      expect(
        radio.shadowRoot.querySelector('[part="label-wrap"]')
      ).toBeTruthy();
    });

    it("应该包含原生 radio input", async () => {
      const radio = document.createElement("ea-radio");
      container.appendChild(radio);

      await new Promise(resolve => setTimeout(resolve, 50));

      const input = radio.shadowRoot.querySelector('input[type="radio"]');
      expect(input).toBeTruthy();
    });
  });

  /**
   * EaRadio Value 属性测试
   */
  describe("EaRadio Value Attribute", () => {
    it("应该支持 value 属性", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("value", "option1");
      container.appendChild(radio);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(radio.value).toBe("option1");
    });

    it("value 应该同步到原生 input", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("value", "option1");
      container.appendChild(radio);

      await new Promise(resolve => setTimeout(resolve, 50));

      const input = radio.shadowRoot.querySelector('input[type="radio"]');
      expect(input.getAttribute("value")).toBe("option1");
    });
  });

  /**
   * EaRadio Checked 属性测试
   */
  describe("EaRadio Checked Attribute", () => {
    it("默认 checked 应该是 false", async () => {
      const radio = document.createElement("ea-radio");
      container.appendChild(radio);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(radio.checked === false || radio.checked === null).toBe(true);
    });

    it("应该支持 checked 属性", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("checked", "");
      container.appendChild(radio);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(radio.checked).toBe(true);
    });

    it("checked 应该同步到原生 input", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("checked", "");
      container.appendChild(radio);

      await new Promise(resolve => setTimeout(resolve, 50));

      const input = radio.shadowRoot.querySelector('input[type="radio"]');
      expect(input.checked).toBe(true);
    });
  });

  /**
   * EaRadio Disabled 属性测试
   */
  describe("EaRadio Disabled Attribute", () => {
    it("默认 disabled 应该是 false", async () => {
      const radio = document.createElement("ea-radio");
      container.appendChild(radio);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(radio.disabled === false || radio.disabled === null).toBe(true);
    });

    it("应该支持 disabled 属性", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("disabled", "");
      container.appendChild(radio);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(radio.disabled).toBe(true);
    });

    it("disabled 应该同步到原生 input", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("disabled", "");
      container.appendChild(radio);

      await new Promise(resolve => setTimeout(resolve, 50));

      const input = radio.shadowRoot.querySelector('input[type="radio"]');
      expect(input.disabled).toBe(true);
    });
  });

  /**
   * EaRadio Size 属性测试
   */
  describe("EaRadio Size Attribute", () => {
    it("默认 size 应该是空字符串", async () => {
      const radio = document.createElement("ea-radio");
      container.appendChild(radio);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(radio.size === "" || radio.size === null).toBe(true);
    });

    it("应该支持 large 尺寸", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("size", "large");
      container.appendChild(radio);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(radio.size).toBe("large");
      const containerEl = radio.shadowRoot.querySelector(".ea-radio");
      expect(containerEl.classList.contains("ea-radio--large")).toBe(true);
    });

    it("应该支持 small 尺寸", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("size", "small");
      container.appendChild(radio);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(radio.size).toBe("small");
      const containerEl = radio.shadowRoot.querySelector(".ea-radio");
      expect(containerEl.classList.contains("ea-radio--small")).toBe(true);
    });
  });

  /**
   * EaRadio Border 属性测试
   */
  describe("EaRadio Border Attribute", () => {
    it("默认 border 应该是 false", async () => {
      const radio = document.createElement("ea-radio");
      container.appendChild(radio);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(radio.border === false || radio.border === null).toBe(true);
    });

    it("应该支持 border 属性", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("border", "");
      container.appendChild(radio);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(radio.border).toBe(true);
    });
  });

  /**
   * EaRadio Label 属性测试
   */
  describe("EaRadio Label Attribute", () => {
    it("应该支持 label 属性", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("label", "Option Label");
      container.appendChild(radio);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(radio.label).toBe("Option Label");
    });

    it("应该支持通过 slot 设置 label", async () => {
      const radio = document.createElement("ea-radio");
      radio.innerHTML = "Slot Label";
      container.appendChild(radio);

      await new Promise(resolve => setTimeout(resolve, 50));

      const labelSlot = radio.shadowRoot.querySelector(".ea-radio__label slot");
      expect(labelSlot).toBeTruthy();
    });
  });

  /**
   * EaRadio 事件测试
   */
  describe("EaRadio Events", () => {
    it("应该触发 change 事件", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("value", "option1");
      container.appendChild(radio);

      await new Promise(resolve => setTimeout(resolve, 50));

      const changeHandler = vi.fn();
      radio.addEventListener("change", changeHandler);

      const input = radio.shadowRoot.querySelector('input[type="radio"]');
      input.checked = true;
      input.dispatchEvent(new Event("change", { bubbles: true }));

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(changeHandler).toHaveBeenCalled();
    });

    it("change 事件应该包含 value", async () => {
      const radio = document.createElement("ea-radio");
      radio.setAttribute("value", "option1");
      container.appendChild(radio);

      await new Promise(resolve => setTimeout(resolve, 50));

      let eventDetail = null;
      radio.addEventListener("change", e => {
        eventDetail = e.detail;
      });

      const input = radio.shadowRoot.querySelector('input[type="radio"]');
      input.checked = true;
      input.dispatchEvent(new Event("change", { bubbles: true }));

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(eventDetail).toBeTruthy();
      expect(eventDetail.value).toBe("option1");
    });
  });

  /**
   * EaRadioGroup 基础功能测试
   */
  describe("EaRadioGroup Basic Functionality", () => {
    it("应该正确渲染 ea-radio-group 组件", async () => {
      const group = document.createElement("ea-radio-group");
      container.appendChild(group);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(group.shadowRoot).toBeTruthy();
      expect(group.shadowRoot.querySelector(".ea-radio-group")).toBeTruthy();
    });

    it("应该支持 CSS Parts", async () => {
      const group = document.createElement("ea-radio-group");
      container.appendChild(group);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(group.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
      expect(
        group.shadowRoot.querySelector('[part="form-label"]')
      ).toBeTruthy();
    });

    it("应该包含 slot 用于放置 ea-radio", async () => {
      const group = document.createElement("ea-radio-group");
      container.appendChild(group);

      await new Promise(resolve => setTimeout(resolve, 50));

      const slot = group.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });
  });

  /**
   * EaRadioGroup Value 属性测试
   */
  describe("EaRadioGroup Value Attribute", () => {
    it("应该支持 value 属性", async () => {
      const group = document.createElement("ea-radio-group");
      group.setAttribute("value", "option1");
      container.appendChild(group);

      await new Promise(resolve => setTimeout(resolve, 50));

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

      await new Promise(resolve => setTimeout(resolve, 100));

      const radios = group.querySelectorAll("ea-radio");
      expect(radios[0].checked).toBeFalsy();
      expect(radios[1].checked).toBe(true);
    });
  });

  /**
   * EaRadioGroup Name 属性测试
   */
  describe("EaRadioGroup Name Attribute", () => {
    it("应该支持 name 属性", async () => {
      const group = document.createElement("ea-radio-group");
      group.setAttribute("name", "test-group");
      container.appendChild(group);

      await new Promise(resolve => setTimeout(resolve, 50));

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

      await new Promise(resolve => setTimeout(resolve, 100));

      const radios = group.querySelectorAll("ea-radio");
      expect(radios[0].getAttribute("name")).toBe("test-group");
      expect(radios[1].getAttribute("name")).toBe("test-group");
    });
  });

  /**
   * EaRadioGroup Disabled 属性测试
   */
  describe("EaRadioGroup Disabled Attribute", () => {
    it("应该支持 disabled 属性", async () => {
      const group = document.createElement("ea-radio-group");
      group.setAttribute("disabled", "");
      container.appendChild(group);

      await new Promise(resolve => setTimeout(resolve, 50));

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

      await new Promise(resolve => setTimeout(resolve, 100));

      const radios = group.querySelectorAll("ea-radio");
      expect(radios[0].disabled).toBe(true);
      expect(radios[1].disabled).toBe(true);
    });
  });

  /**
   * EaRadioGroup Size 属性测试
   */
  describe("EaRadioGroup Size Attribute", () => {
    it("默认 size 应该是 default", async () => {
      const group = document.createElement("ea-radio-group");
      container.appendChild(group);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(group.size).toBe("default");
    });

    it("应该支持 size 属性", async () => {
      const group = document.createElement("ea-radio-group");
      group.setAttribute("size", "large");
      container.appendChild(group);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(group.size).toBe("large");
    });
  });

  /**
   * EaRadioGroup Border 属性测试
   */
  describe("EaRadioGroup Border Attribute", () => {
    it("应该支持 border 属性", async () => {
      const group = document.createElement("ea-radio-group");
      group.setAttribute("border", "");
      container.appendChild(group);

      await new Promise(resolve => setTimeout(resolve, 50));

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

      await new Promise(resolve => setTimeout(resolve, 100));

      const radios = group.querySelectorAll("ea-radio");
      expect(radios[0].border).toBe(true);
      expect(radios[1].border).toBe(true);
    });
  });

  /**
   * EaRadioGroup 事件测试
   */
  describe("EaRadioGroup Events", () => {
    it("应该触发 change 事件", async () => {
      const group = document.createElement("ea-radio-group");
      group.innerHTML = `
        <ea-radio value="option1">Option 1</ea-radio>
        <ea-radio value="option2">Option 2</ea-radio>
      `;
      container.appendChild(group);

      await new Promise(resolve => setTimeout(resolve, 100));

      const changeHandler = vi.fn();
      group.addEventListener("change", changeHandler);

      const radios = group.querySelectorAll("ea-radio");
      const input = radios[1].shadowRoot.querySelector('input[type="radio"]');
      input.checked = true;
      input.dispatchEvent(new Event("change", { bubbles: true }));

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(changeHandler).toHaveBeenCalled();
    });

    it("change 事件应该更新 group 的 value", async () => {
      const group = document.createElement("ea-radio-group");
      group.innerHTML = `
        <ea-radio value="option1">Option 1</ea-radio>
        <ea-radio value="option2">Option 2</ea-radio>
      `;
      container.appendChild(group);

      await new Promise(resolve => setTimeout(resolve, 100));

      const radios = group.querySelectorAll("ea-radio");
      const input = radios[1].shadowRoot.querySelector('input[type="radio"]');
      input.checked = true;
      input.dispatchEvent(new Event("change", { bubbles: true }));

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(group.value).toBe("option2");
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("应该处理没有子 radio 的情况", async () => {
      const group = document.createElement("ea-radio-group");
      container.appendChild(group);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(group.shadowRoot.querySelector(".ea-radio-group")).toBeTruthy();
    });

    it("应该处理空 value", async () => {
      const group = document.createElement("ea-radio-group");
      group.setAttribute("value", "");
      group.innerHTML = `
        <ea-radio value="option1">Option 1</ea-radio>
      `;
      container.appendChild(group);

      await new Promise(resolve => setTimeout(resolve, 100));

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

      await new Promise(resolve => setTimeout(resolve, 100));

      const newRadio = document.createElement("ea-radio");
      newRadio.setAttribute("value", "option3");
      newRadio.textContent = "Option 3";
      group.appendChild(newRadio);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(newRadio.checked).toBe(true);
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const group = document.createElement("ea-radio-group");
      group.setAttribute("value", "option2");
      group.innerHTML = `
        <ea-radio value="option1">Option 1</ea-radio>
        <ea-radio value="option2">Option 2</ea-radio>
      `;
      container.appendChild(group);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(group.shadowRoot).toBeTruthy();
      const radios = group.querySelectorAll("ea-radio");
      expect(radios[1].checked).toBe(true);
    });

    it("组件断开连接后应该正常移除", async () => {
      const group = document.createElement("ea-radio-group");
      container.appendChild(group);

      await new Promise(resolve => setTimeout(resolve, 50));

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

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(group.value === "" || group.value === null).toBe(true);

      group.setAttribute("value", "option1");

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(group.value).toBe("option1");
      const radios = group.querySelectorAll("ea-radio");
      expect(radios[0].checked).toBe(true);
    });
  });
});
