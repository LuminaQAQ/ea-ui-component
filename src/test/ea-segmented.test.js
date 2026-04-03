import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// 导入 ea-segmented 组件
import "../components/ea-segmented/index.js";

describe("EaSegmented Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    container.style.width = "600px";
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  /**
   * 基础功能测试
   */
  describe("Basic Functionality", () => {
    it("应该正确渲染组件", async () => {
      const segmented = document.createElement("ea-segmented");
      segmented.setAttribute("name", "test");
      segmented.options = ["Mon", "Tue", "Wed"];
      container.appendChild(segmented);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(segmented.shadowRoot).toBeTruthy();
      expect(segmented.shadowRoot.querySelector(".ea-segmented")).toBeTruthy();
    });

    it("应该支持 CSS Parts", async () => {
      const segmented = document.createElement("ea-segmented");
      segmented.setAttribute("name", "test");
      segmented.options = ["Mon", "Tue"];
      container.appendChild(segmented);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(
        segmented.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
      expect(segmented.shadowRoot.querySelector('[part="item"]')).toBeTruthy();
      expect(segmented.shadowRoot.querySelector('[part="label"]')).toBeTruthy();
      expect(segmented.shadowRoot.querySelector('[part="input"]')).toBeTruthy();
      expect(
        segmented.shadowRoot.querySelector('[part="indicator"]')
      ).toBeTruthy();
    });

    it("应该渲染选项列表", async () => {
      const segmented = document.createElement("ea-segmented");
      segmented.setAttribute("name", "week");
      segmented.options = ["Mon", "Tue", "Wed"];
      container.appendChild(segmented);

      await new Promise(resolve => setTimeout(resolve, 100));

      const items = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__item"
      );
      expect(items.length).toBe(3);
    });

    it("应该渲染选项标签", async () => {
      const segmented = document.createElement("ea-segmented");
      segmented.setAttribute("name", "week");
      segmented.options = ["Mon", "Tue", "Wed"];
      container.appendChild(segmented);

      await new Promise(resolve => setTimeout(resolve, 100));

      const labels = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__label"
      );
      expect(labels.length).toBe(3);
      expect(labels[0].textContent.trim()).toBe("Mon");
      expect(labels[1].textContent.trim()).toBe("Tue");
      expect(labels[2].textContent.trim()).toBe("Wed");
    });
  });

  /**
   * Value 属性测试
   */
  describe("Value Attribute", () => {
    it("默认 value 应该是空字符串", async () => {
      const segmented = document.createElement("ea-segmented");
      segmented.setAttribute("name", "week");
      segmented.options = ["Mon", "Tue", "Wed"];
      container.appendChild(segmented);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(segmented.value).toBe("");
    });

    it("应该支持 value 属性设置默认值", async () => {
      const segmented = document.createElement("ea-segmented");
      segmented.setAttribute("name", "week");
      segmented.setAttribute("value", "Tue");
      segmented.options = ["Mon", "Tue", "Wed"];
      container.appendChild(segmented);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(segmented.value).toBe("Tue");
    });

    it("选中的选项应该有 is-checked 类", async () => {
      const segmented = document.createElement("ea-segmented");
      segmented.setAttribute("name", "week");
      segmented.setAttribute("value", "Tue");
      segmented.options = ["Mon", "Tue", "Wed"];
      container.appendChild(segmented);

      await new Promise(resolve => setTimeout(resolve, 100));

      const items = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__item"
      );
      expect(items[1].classList.contains("is-checked")).toBe(true);
    });
  });

  /**
   * Options 属性测试
   */
  describe("Options Attribute", () => {
    it("应该支持字符串数组选项", async () => {
      const segmented = document.createElement("ea-segmented");
      segmented.setAttribute("name", "week");
      segmented.options = ["Mon", "Tue", "Wed", "Thu", "Fri"];
      container.appendChild(segmented);

      await new Promise(resolve => setTimeout(resolve, 100));

      const items = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__item"
      );
      expect(items.length).toBe(5);
    });

    it("应该支持对象数组选项", async () => {
      const segmented = document.createElement("ea-segmented");
      segmented.setAttribute("name", "fruit");
      segmented.options = [
        { label: "Apple", value: "Apple" },
        { label: "Cherry", value: "Cherry" },
        { label: "Grape", value: "Grape" },
      ];
      container.appendChild(segmented);

      await new Promise(resolve => setTimeout(resolve, 100));

      const items = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__item"
      );
      expect(items.length).toBe(3);

      const inputs = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__original"
      );
      expect(inputs[0].value).toBe("Apple");
      expect(inputs[1].value).toBe("Cherry");
      expect(inputs[2].value).toBe("Grape");
    });

    it("空 options 应该不渲染任何选项", async () => {
      const segmented = document.createElement("ea-segmented");
      segmented.setAttribute("name", "week");
      segmented.options = [];
      container.appendChild(segmented);

      await new Promise(resolve => setTimeout(resolve, 100));

      const items = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__item"
      );
      expect(items.length).toBe(0);
    });
  });

  /**
   * Size 属性测试
   */
  describe("Size Attribute", () => {
    it("默认 size 应该是空字符串", async () => {
      const segmented = document.createElement("ea-segmented");
      segmented.setAttribute("name", "week");
      segmented.options = ["Mon", "Tue", "Wed"];
      container.appendChild(segmented);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(segmented.size).toBe("");
    });

    it("应该支持 size 属性设置为 large", async () => {
      const segmented = document.createElement("ea-segmented");
      segmented.setAttribute("name", "week");
      segmented.setAttribute("size", "large");
      segmented.options = ["Mon", "Tue", "Wed"];
      container.appendChild(segmented);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(segmented.size).toBe("large");
    });

    it("应该支持 size 属性设置为 small", async () => {
      const segmented = document.createElement("ea-segmented");
      segmented.setAttribute("name", "week");
      segmented.setAttribute("size", "small");
      segmented.options = ["Mon", "Tue", "Wed"];
      container.appendChild(segmented);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(segmented.size).toBe("small");
    });

    it("应该支持 size 属性设置为 default", async () => {
      const segmented = document.createElement("ea-segmented");
      segmented.setAttribute("name", "week");
      segmented.setAttribute("size", "default");
      segmented.options = ["Mon", "Tue", "Wed"];
      container.appendChild(segmented);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(segmented.size).toBe("default");
    });
  });

  /**
   * Direction 属性测试
   */
  describe("Direction Attribute", () => {
    it("默认 direction 应该是空字符串", async () => {
      const segmented = document.createElement("ea-segmented");
      segmented.setAttribute("name", "week");
      segmented.options = ["Mon", "Tue", "Wed"];
      container.appendChild(segmented);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(segmented.direction).toBe("");
    });

    it("应该支持 direction 属性设置为 horizontal", async () => {
      const segmented = document.createElement("ea-segmented");
      segmented.setAttribute("name", "week");
      segmented.setAttribute("direction", "horizontal");
      segmented.options = ["Mon", "Tue", "Wed"];
      container.appendChild(segmented);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(segmented.direction).toBe("horizontal");
    });

    it("应该支持 direction 属性设置为 vertical", async () => {
      const segmented = document.createElement("ea-segmented");
      segmented.setAttribute("name", "week");
      segmented.setAttribute("direction", "vertical");
      segmented.options = ["Mon", "Tue", "Wed"];
      container.appendChild(segmented);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(segmented.direction).toBe("vertical");
    });
  });

  /**
   * Disabled 属性测试
   */
  describe("Disabled Attribute", () => {
    it("默认 disabled 应该是 false", async () => {
      const segmented = document.createElement("ea-segmented");
      segmented.setAttribute("name", "week");
      segmented.options = ["Mon", "Tue", "Wed"];
      container.appendChild(segmented);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(segmented.disabled === false || segmented.disabled === null).toBe(
        true
      );
    });

    it("应该支持 disabled 属性设置为 true", async () => {
      const segmented = document.createElement("ea-segmented");
      segmented.setAttribute("name", "week");
      segmented.setAttribute("disabled", "");
      segmented.options = ["Mon", "Tue", "Wed"];
      container.appendChild(segmented);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(segmented.disabled).toBe(true);
    });

    it("禁用状态下所有 input 应该被禁用", async () => {
      const segmented = document.createElement("ea-segmented");
      segmented.setAttribute("name", "week");
      segmented.setAttribute("disabled", "");
      segmented.options = ["Mon", "Tue", "Wed"];
      container.appendChild(segmented);

      await new Promise(resolve => setTimeout(resolve, 100));

      const inputs = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__original"
      );
      inputs.forEach(input => {
        expect(input.disabled).toBe(true);
      });
    });

    it("禁用状态下所有 item 应该有 is-disabled 类", async () => {
      const segmented = document.createElement("ea-segmented");
      segmented.setAttribute("name", "week");
      segmented.setAttribute("disabled", "");
      segmented.options = ["Mon", "Tue", "Wed"];
      container.appendChild(segmented);

      await new Promise(resolve => setTimeout(resolve, 100));

      const items = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__item"
      );
      items.forEach(item => {
        expect(item.classList.contains("is-disabled")).toBe(true);
      });
    });

    it("应该支持 options 中的 disabled 属性", async () => {
      const segmented = document.createElement("ea-segmented");
      segmented.setAttribute("name", "week");
      segmented.options = [
        { label: "Mon", value: "Mon", disabled: true },
        { label: "Tue", value: "Tue" },
        { label: "Wed", value: "Wed", disabled: true },
      ];
      container.appendChild(segmented);

      await new Promise(resolve => setTimeout(resolve, 100));

      const items = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__item"
      );
      expect(items[0].classList.contains("is-disabled")).toBe(true);
      expect(items[1].classList.contains("is-disabled")).toBe(false);
      expect(items[2].classList.contains("is-disabled")).toBe(true);
    });
  });

  /**
   * Block 属性测试
   */
  describe("Block Attribute", () => {
    it("默认 block 应该是 false", async () => {
      const segmented = document.createElement("ea-segmented");
      segmented.setAttribute("name", "week");
      segmented.options = ["Mon", "Tue", "Wed"];
      container.appendChild(segmented);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(segmented.block === false || segmented.block === null).toBe(true);
    });

    it("应该支持 block 属性设置为 true", async () => {
      const segmented = document.createElement("ea-segmented");
      segmented.setAttribute("name", "week");
      segmented.setAttribute("block", "");
      segmented.options = ["Mon", "Tue", "Wed"];
      container.appendChild(segmented);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(segmented.block).toBe(true);
    });
  });

  /**
   * PropsConfiguration 属性测试
   */
  describe("PropsConfiguration Attribute", () => {
    it("默认 propsConfiguration 应该包含 label, value, disabled", async () => {
      const segmented = document.createElement("ea-segmented");
      segmented.setAttribute("name", "week");
      container.appendChild(segmented);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(segmented.propsConfiguration).toEqual({
        label: "label",
        value: "value",
        disabled: "disabled",
      });
    });

    it("应该支持自定义 propsConfiguration", async () => {
      const segmented = document.createElement("ea-segmented");
      segmented.setAttribute("name", "week");
      segmented.propsConfiguration = {
        label: "myLabel",
        value: "myValue",
        disabled: "myDisabled",
      };
      segmented.options = [
        { myLabel: "Mon", myValue: "Mon", myDisabled: true },
        { myLabel: "Tue", myValue: "Tue" },
      ];
      container.appendChild(segmented);

      await new Promise(resolve => setTimeout(resolve, 100));

      const labels = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__label"
      );
      expect(labels[0].textContent.trim()).toBe("Mon");
      expect(labels[1].textContent.trim()).toBe("Tue");
    });
  });

  /**
   * 事件测试
   */
  describe("Events", () => {
    it("应该触发 change 事件当选项改变时", async () => {
      const segmented = document.createElement("ea-segmented");
      segmented.setAttribute("name", "week");
      segmented.options = ["Mon", "Tue", "Wed"];
      container.appendChild(segmented);

      await new Promise(resolve => setTimeout(resolve, 100));

      const changeHandler = vi.fn();
      segmented.addEventListener("change", changeHandler);

      const input = segmented.shadowRoot.querySelector('input[value="Tue"]');
      input.click();

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(changeHandler).toHaveBeenCalled();
    });

    it("change 事件应该包含选中的 value", async () => {
      const segmented = document.createElement("ea-segmented");
      segmented.setAttribute("name", "week");
      segmented.options = ["Mon", "Tue", "Wed"];
      container.appendChild(segmented);

      await new Promise(resolve => setTimeout(resolve, 100));

      let eventDetail = null;
      segmented.addEventListener("change", e => {
        eventDetail = e.detail;
      });

      const input = segmented.shadowRoot.querySelector('input[value="Wed"]');
      input.click();

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(eventDetail).toBeTruthy();
      expect(eventDetail.value).toBe("Wed");
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("应该处理重复的选项值", async () => {
      const segmented = document.createElement("ea-segmented");
      segmented.setAttribute("name", "week");
      segmented.options = ["Mon", "Mon", "Tue"];
      container.appendChild(segmented);

      await new Promise(resolve => setTimeout(resolve, 100));

      const items = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__item"
      );
      expect(items.length).toBe(3);
    });

    it("应该处理包含特殊字符的选项", async () => {
      const segmented = document.createElement("ea-segmented");
      segmented.setAttribute("name", "test");
      segmented.options = ["Option 1", "Option-2", "Option_3"];
      container.appendChild(segmented);

      await new Promise(resolve => setTimeout(resolve, 100));

      const labels = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__label"
      );
      expect(labels[0].textContent.trim()).toBe("Option 1");
      expect(labels[1].textContent.trim()).toBe("Option-2");
      expect(labels[2].textContent.trim()).toBe("Option_3");
    });

    it("应该处理很长的选项文本", async () => {
      const segmented = document.createElement("ea-segmented");
      segmented.setAttribute("name", "test");
      segmented.options = [
        "Short",
        "This is a very long option text that should still render correctly",
      ];
      container.appendChild(segmented);

      await new Promise(resolve => setTimeout(resolve, 100));

      const items = segmented.shadowRoot.querySelectorAll(
        ".ea-segmented__item"
      );
      expect(items.length).toBe(2);
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const segmented = document.createElement("ea-segmented");
      segmented.setAttribute("name", "week");
      segmented.setAttribute("value", "Tue");
      segmented.options = ["Mon", "Tue", "Wed"];
      container.appendChild(segmented);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(segmented.shadowRoot).toBeTruthy();
      expect(segmented.value).toBe("Tue");
    });

    it("组件断开连接后应该正常移除", async () => {
      const segmented = document.createElement("ea-segmented");
      segmented.setAttribute("name", "week");
      segmented.options = ["Mon", "Tue", "Wed"];
      container.appendChild(segmented);

      await new Promise(resolve => setTimeout(resolve, 100));

      segmented.remove();

      expect(segmented.isConnected).toBe(false);
    });

    it("应该支持动态更新 options", async () => {
      const segmented = document.createElement("ea-segmented");
      segmented.setAttribute("name", "week");
      segmented.options = ["Mon", "Tue"];
      container.appendChild(segmented);

      await new Promise(resolve => setTimeout(resolve, 100));

      let items = segmented.shadowRoot.querySelectorAll(".ea-segmented__item");
      expect(items.length).toBe(2);

      segmented.options = ["Mon", "Tue", "Wed", "Thu"];

      await new Promise(resolve => setTimeout(resolve, 100));

      items = segmented.shadowRoot.querySelectorAll(".ea-segmented__item");
      expect(items.length).toBe(4);
    });

    it("应该支持动态更新 value", async () => {
      const segmented = document.createElement("ea-segmented");
      segmented.setAttribute("name", "week");
      segmented.setAttribute("value", "Mon");
      segmented.options = ["Mon", "Tue", "Wed"];
      container.appendChild(segmented);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(segmented.value).toBe("Mon");

      segmented.value = "Wed";

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(segmented.value).toBe("Wed");
    });
  });
});
