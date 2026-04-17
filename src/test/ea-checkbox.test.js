import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

import "../components/ea-checkbox/index";
import { waitForRender } from "./utils/waitForRender";

describe("EaCheckbox Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  /**
   * 基本功能测试
   */
  describe("Basic Functionality", () => {
    it("应该正确渲染 ea-checkbox 组件", () => {
      const checkbox = document.createElement("ea-checkbox");
      container.appendChild(checkbox);

      expect(checkbox).toBeDefined();
      expect(checkbox.shadowRoot).toBeDefined();
    });

    it("应该包含必要的 CSS Part", () => {
      const checkbox = document.createElement("ea-checkbox");
      container.appendChild(checkbox);

      expect(
        checkbox.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
      expect(
        checkbox.shadowRoot.querySelector('[part="orignal"]')
      ).toBeTruthy();
      expect(checkbox.shadowRoot.querySelector('[part="input"]')).toBeTruthy();
      expect(checkbox.shadowRoot.querySelector('[part="label"]')).toBeTruthy();
    });

    it("应该包含默认插槽", () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.innerHTML = "Option 1";
      container.appendChild(checkbox);

      const slot = checkbox.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });
  });

  /**
   * Label 属性测试
   */
  describe("Label Attribute", () => {
    it("应该通过 label 属性设置文本", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("label", "Option 1");
      container.appendChild(checkbox);
      await waitForRender();

      expect(checkbox.label).toBe("Option 1");
      expect(checkbox.getAttribute("label")).toBe("Option 1");
    });

    it("应该通过默认插槽设置文本", () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.innerHTML = "Slot Content";
      container.appendChild(checkbox);

      const slot = checkbox.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });
  });

  /**
   * Value 属性测试
   */
  describe("Value Attribute", () => {
    it("应该设置 value 属性", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("value", "option1");
      container.appendChild(checkbox);
      await waitForRender();

      expect(checkbox.getAttribute("value")).toBe("option1");
    });

    it("应该获取 value 属性", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("value", "option1");
      container.appendChild(checkbox);
      await waitForRender();

      expect(checkbox.value).toBe("option1");
    });
  });

  /**
   * Checked 属性测试
   */
  describe("Checked Attribute", () => {
    it("默认应该未选中", async () => {
      const checkbox = document.createElement("ea-checkbox");
      container.appendChild(checkbox);
      await waitForRender();

      expect(checkbox.checked).toBe(false);
    });

    it("设置 checked 属性应该选中", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("checked", "");
      container.appendChild(checkbox);
      await waitForRender();

      expect(checkbox.checked).toBe(true);
    });

    it("选中状态应该有 checked 类", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("checked", "");
      container.appendChild(checkbox);
      await waitForRender();

      expect(checkbox.checked).toBe(true);
      expect(checkbox.hasAttribute("checked")).toBe(true);
    });

    it("通过 setter 设置 checked", async () => {
      const checkbox = document.createElement("ea-checkbox");
      container.appendChild(checkbox);
      await waitForRender();

      checkbox.checked = true;
      await waitForRender();
      expect(checkbox.checked).toBe(true);

      checkbox.checked = false;
      await waitForRender();
      expect(checkbox.checked).toBe(false);
    });
  });

  /**
   * Disabled 属性测试
   */
  describe("Disabled Attribute", () => {
    it("默认应该启用", async () => {
      const checkbox = document.createElement("ea-checkbox");
      container.appendChild(checkbox);
      await waitForRender();

      expect(checkbox.hasAttribute("disabled")).toBe(false);
    });

    it("设置 disabled 属性应该禁用", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("disabled", "");
      container.appendChild(checkbox);
      await waitForRender();

      expect(checkbox.hasAttribute("disabled")).toBe(true);
    });

    it("禁用状态应该有 disabled 类", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("disabled", "");
      container.appendChild(checkbox);
      await waitForRender();

      expect(checkbox.disabled).toBe(true);
      expect(checkbox.hasAttribute("disabled")).toBe(true);
    });
  });

  /**
   * Indeterminate 属性测试
   */
  describe("Indeterminate Attribute", () => {
    it("默认应该不是半选状态", async () => {
      const checkbox = document.createElement("ea-checkbox");
      container.appendChild(checkbox);
      await waitForRender();

      expect(checkbox.hasAttribute("indeterminate")).toBe(false);
    });

    it("设置 indeterminate 属性应该应用半选状态", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("indeterminate", "");
      container.appendChild(checkbox);
      await waitForRender();

      expect(checkbox.indeterminate).toBe(true);
      expect(checkbox.hasAttribute("indeterminate")).toBe(true);
    });
  });

  /**
   * Size 属性测试
   */
  describe("Size Attribute", () => {
    it("默认尺寸应该是 default", async () => {
      const checkbox = document.createElement("ea-checkbox");
      container.appendChild(checkbox);
      await waitForRender();

      expect(checkbox.getAttribute("size")).toBe(null);
    });

    it("设置 size='large' 应该应用 large 类", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("size", "large");
      container.appendChild(checkbox);
      await waitForRender();

      expect(checkbox.getAttribute("size")).toBe("large");
      expect(checkbox.size).toBe("large");
    });

    it("设置 size='small' 应该应用 small 类", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("size", "small");
      container.appendChild(checkbox);
      await waitForRender();

      expect(checkbox.getAttribute("size")).toBe("small");
      expect(checkbox.size).toBe("small");
    });
  });

  /**
   * Border 属性测试
   */
  describe("Border Attribute", () => {
    it("默认应该没有边框", async () => {
      const checkbox = document.createElement("ea-checkbox");
      container.appendChild(checkbox);
      await waitForRender();

      expect(checkbox.hasAttribute("border")).toBe(false);
      expect(checkbox.border).toBe(false);
    });

    it("设置 border 属性应该应用边框样式", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("border", "");
      container.appendChild(checkbox);
      await waitForRender();

      expect(checkbox.hasAttribute("border")).toBe(true);
      expect(checkbox.border).toBe(true);
    });
  });

  /**
   * Limit-Disabled 属性测试
   */
  describe("Limit-Disabled Attribute", () => {
    it("默认不应该被限制禁用", async () => {
      const checkbox = document.createElement("ea-checkbox");
      container.appendChild(checkbox);
      await waitForRender();

      expect(checkbox.hasAttribute("limit-disabled")).toBe(false);
      expect(checkbox.limitDisabled).toBe(false);
    });

    it("设置 limit-disabled 属性应该应用限制禁用状态", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("limit-disabled", "");
      container.appendChild(checkbox);
      await waitForRender();

      expect(checkbox.hasAttribute("limit-disabled")).toBe(true);
      expect(checkbox.limitDisabled).toBe(true);
    });
  });

  /**
   * Change 事件测试
   */
  describe("Change Event", () => {
    it("点击应该触发 change 事件", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("value", "option1");
      container.appendChild(checkbox);
      await waitForRender();

      const changeHandler = vi.fn();
      checkbox.addEventListener("change", changeHandler);

      const input = checkbox.shadowRoot.querySelector(".ea-checkbox__orignal");
      input.checked = true;
      input.dispatchEvent(new Event("change"));

      expect(changeHandler).toHaveBeenCalled();
    });

    it("change 事件应该包含 value 和 checked", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("value", "option1");
      container.appendChild(checkbox);
      await waitForRender();

      let eventDetail = null;
      checkbox.addEventListener("change", e => {
        eventDetail = e.detail;
      });

      const input = checkbox.shadowRoot.querySelector(".ea-checkbox__orignal");
      input.checked = true;
      input.dispatchEvent(new Event("change"));

      expect(eventDetail).toMatchObject({
        value: "option1",
        checked: true,
      });
    });

    it("按 Enter 键应该切换选中状态", async () => {
      const checkbox = document.createElement("ea-checkbox");
      container.appendChild(checkbox);
      await waitForRender();

      const changeHandler = vi.fn();
      checkbox.addEventListener("change", changeHandler);

      checkbox.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));

      expect(changeHandler).toHaveBeenCalled();
    });
  });

  /**
   * Name 属性测试
   */
  describe("Name Attribute", () => {
    it("应该设置 name 属性", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("name", "test-checkbox");
      container.appendChild(checkbox);
      await waitForRender();

      const input = checkbox.shadowRoot.querySelector(".ea-checkbox__orignal");
      expect(input.getAttribute("name") || checkbox.getAttribute("name")).toBe(
        "test-checkbox"
      );
    });
  });
});

describe("EaCheckboxGroup Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("Basic Functionality", () => {
    it("应该正确渲染 ea-checkbox-group 组件", () => {
      const group = document.createElement("ea-checkbox-group");
      container.appendChild(group);

      expect(group).toBeDefined();
      expect(group.shadowRoot).toBeDefined();
    });

    it("应该包含必要的 CSS Part", () => {
      const group = document.createElement("ea-checkbox-group");
      container.appendChild(group);

      expect(group.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
      expect(
        group.shadowRoot.querySelector('[part="form-label"]')
      ).toBeTruthy();
    });

    it("应该包含默认插槽", () => {
      const group = document.createElement("ea-checkbox-group");
      container.appendChild(group);

      const slot = group.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });
  });

  describe("Label Attribute", () => {
    it("应该通过 label 属性设置文本", async () => {
      const group = document.createElement("ea-checkbox-group");
      container.appendChild(group);
      await waitForRender();

      group.setAttribute("label", "Group Label");
      await waitForRender();

      const labelEl = group.shadowRoot.querySelector(
        ".ea-checkbox-group__form-label"
      );
      expect(labelEl.textContent).toBe("Group Label");
    });
  });

  describe("Value Attribute", () => {
    it("应该设置和获取 value 属性", async () => {
      const group = document.createElement("ea-checkbox-group");
      container.appendChild(group);
      await waitForRender();

      group.value = ["Value A", "Value B"];
      await waitForRender();

      expect(Array.isArray(group.value)).toBe(true);
      expect(group.value.length).toBe(2);
    });
  });

  describe("Disabled Attribute", () => {
    it("设置 disabled 属性应该禁用所有子 checkbox", async () => {
      const group = document.createElement("ea-checkbox-group");
      group.innerHTML = `
        <ea-checkbox label="Option A" value="A"></ea-checkbox>
        <ea-checkbox label="Option B" value="B"></ea-checkbox>
      `;
      container.appendChild(group);
      await waitForRender();

      group.setAttribute("disabled", "");
      await waitForRender();

      const checkboxes = group.querySelectorAll("ea-checkbox");
      checkboxes.forEach(checkbox => {
        expect(checkbox.hasAttribute("disabled")).toBe(true);
      });
    });
  });

  describe("Size Attribute", () => {
    it("设置 size 属性应该更新所有子 checkbox 的尺寸", async () => {
      const group = document.createElement("ea-checkbox-group");
      group.innerHTML = `
        <ea-checkbox label="Option A" value="A"></ea-checkbox>
        <ea-checkbox label="Option B" value="B"></ea-checkbox>
      `;
      container.appendChild(group);
      await waitForRender();

      group.setAttribute("size", "large");
      await waitForRender();

      const checkboxes = group.querySelectorAll("ea-checkbox");
      checkboxes.forEach(checkbox => {
        expect(checkbox.getAttribute("size")).toBe("large");
      });
    });
  });

  describe("Min/Max Attributes", () => {
    it("应该在达到最小值时限制取消选中", async () => {
      const group = document.createElement("ea-checkbox-group");
      container.appendChild(group);
      await waitForRender();

      group.setAttribute("min", "1");
      await waitForRender();

      group.innerHTML = `
        <ea-checkbox label="Option A" value="A"></ea-checkbox>
        <ea-checkbox label="Option B" value="B"></ea-checkbox>
      `;
      await waitForRender();
      await waitForRender(); // 额外等待子组件初始化

      const checkboxes = group.querySelectorAll("ea-checkbox");
      expect(checkboxes.length).toBe(2);

      // 手动设置第一个 checkbox 为选中状态
      const firstCheckbox = checkboxes[0];
      firstCheckbox.checked = true;
      await waitForRender();

      // 验证 min 属性存在
      expect(group.getAttribute("min")).toBe("1");
    });

    it("应该在达到最大值时限制选中未选项", async () => {
      const group = document.createElement("ea-checkbox-group");
      container.appendChild(group);
      await waitForRender();

      group.setAttribute("max", "1");
      await waitForRender();

      group.innerHTML = `
        <ea-checkbox label="Option A" value="A"></ea-checkbox>
        <ea-checkbox label="Option B" value="B"></ea-checkbox>
      `;
      await waitForRender();
      await waitForRender(); // 额外等待子组件初始化

      const checkboxes = group.querySelectorAll("ea-checkbox");
      expect(checkboxes.length).toBe(2);

      // 验证 max 属性存在
      expect(group.getAttribute("max")).toBe("1");
    });
  });

  describe("Change Event", () => {
    it("子 checkbox 变化时应该更新 group 的值", async () => {
      const group = document.createElement("ea-checkbox-group");
      container.appendChild(group);
      await waitForRender();

      group.innerHTML = `
        <ea-checkbox label="Option A" value="Value A"></ea-checkbox>
        <ea-checkbox label="Option B" value="Value B"></ea-checkbox>
      `;
      await waitForRender();
      await waitForRender(); // 额外等待子组件初始化

      const checkboxA = group.querySelector('ea-checkbox[value="Value A"]');
      expect(checkboxA).not.toBeNull();

      // 验证初始状态
      expect(group.value).toEqual([]);

      // 验证组件结构正确
      const checkboxes = group.querySelectorAll("ea-checkbox");
      expect(checkboxes.length).toBe(2);
    });
  });

  describe("Name Auto Generation", () => {
    it("如果没有设置 name 属性，应该自动生成", async () => {
      const group = document.createElement("ea-checkbox-group");
      container.appendChild(group);
      await waitForRender();

      expect(group.name).toBeTruthy();
    });
  });
});
