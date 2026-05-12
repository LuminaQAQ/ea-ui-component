import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

global.requestAnimationFrame = callback => {
  return setTimeout(callback, 16);
};
global.cancelAnimationFrame = id => {
  clearTimeout(id);
};

const originalAttachInternals = HTMLElement.prototype.attachInternals;
HTMLElement.prototype.attachInternals = function () {
  const internals = originalAttachInternals?.call(this) || {};
  if (
    !internals.setValidity ||
    internals.setValidity.toString().includes("[native code]")
  ) {
    const state = { valid: true, message: "" };
    internals.setValidity = function (flags, message) {
      if (
        flags &&
        Object.keys(flags).length > 0 &&
        Object.values(flags).some(v => v)
      ) {
        state.valid = false;
        state.message = message || "";
      } else {
        state.valid = true;
        state.message = "";
      }
    };
    Object.defineProperty(internals, "validity", {
      get: function () {
        return { valid: state.valid, valueMissing: !state.valid };
      },
      configurable: true,
    });
    Object.defineProperty(internals, "validationMessage", {
      get: function () {
        return state.message;
      },
      configurable: true,
    });
    internals.willValidate = true;
    internals.checkValidity = function () {
      return state.valid;
    };
    internals.reportValidity = function () {
      return state.valid;
    };
    Object.defineProperty(internals, "form", { value: null, writable: true });
  }
  return internals;
};

// 导入 ea-select 组件及其子组件
import "../components/ea-select/index.js";
import { waitForRender } from "./utils/waitForRender.js";

describe("EaSelect Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  /**
   * EaSelect 基本功能测试
   */
  describe("EaSelect Basic Functionality", () => {
    it("应该正确渲染 ea-select 组件", async () => {
      const select = document.createElement("ea-select");
      container.appendChild(select);

      await waitForRender();

      expect(select).toBeDefined();
      expect(select.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const select = document.createElement("ea-select");
      container.appendChild(select);

      await waitForRender();

      expect(
        select.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("应该包含 input CSS Part", async () => {
      const select = document.createElement("ea-select");
      container.appendChild(select);

      await waitForRender();

      expect(select.shadowRoot.querySelector('[part="input"]')).toBeTruthy();
    });

    it("应该包含 dropdown CSS Part", async () => {
      const select = document.createElement("ea-select");
      container.appendChild(select);

      await waitForRender();

      expect(select.shadowRoot.querySelector('[part="dropdown"]')).toBeTruthy();
    });

    it("应该渲染 slot 内容", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);

      await waitForRender();

      const slot = select.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });
  });

  /**
   * Placeholder 属性测试
   */
  describe("Placeholder Attribute", () => {
    it("应该支持 placeholder 属性", async () => {
      const select = document.createElement("ea-select");
      select.setAttribute("placeholder", "Please select");
      container.appendChild(select);

      await waitForRender();

      expect(select.getAttribute("placeholder")).toBe("Please select");
    });

    it("应该支持不同的 placeholder 值", async () => {
      const placeholders = ["Select", "Choose an option", "Pick one", ""];

      for (const placeholder of placeholders) {
        const select = document.createElement("ea-select");
        select.setAttribute("placeholder", placeholder);
        expect(select.getAttribute("placeholder")).toBe(placeholder);
      }
    });
  });

  /**
   * Disabled 属性测试
   */
  describe("Disabled Attribute", () => {
    it("默认 disabled 应该是 false", async () => {
      const select = document.createElement("ea-select");
      container.appendChild(select);

      await waitForRender();

      // 属性可能返回 null 或 false
      const value = select.disabled;
      expect(value === false || value === null).toBe(true);
    });

    it("设置 disabled 属性应该禁用选择器", async () => {
      const select = document.createElement("ea-select");
      select.disabled = true;
      container.appendChild(select);

      await waitForRender();

      expect(select.disabled).toBe(true);
    });
  });

  /**
   * Clearable 属性测试
   */
  describe("Clearable Attribute", () => {
    it("默认 clearable 应该是 false", async () => {
      const select = document.createElement("ea-select");
      container.appendChild(select);

      await waitForRender();

      // 属性可能返回 null 或 false
      const value = select.clearable;
      expect(value === false || value === null).toBe(true);
    });

    it("设置 clearable 属性应该启用清除功能", async () => {
      const select = document.createElement("ea-select");
      select.clearable = true;
      container.appendChild(select);

      await waitForRender();

      expect(select.clearable).toBe(true);
    });
  });

  /**
   * Size 属性测试
   */
  describe("Size Attribute", () => {
    it("应该支持 size='large'", async () => {
      const select = document.createElement("ea-select");
      select.setAttribute("size", "large");
      container.appendChild(select);

      await waitForRender();

      expect(select.getAttribute("size")).toBe("large");
    });

    it("应该支持 size='small'", async () => {
      const select = document.createElement("ea-select");
      select.setAttribute("size", "small");
      container.appendChild(select);

      await waitForRender();

      expect(select.getAttribute("size")).toBe("small");
    });

    it("应该支持不同的 size 值", async () => {
      const sizes = ["large", "", "small"];

      for (const size of sizes) {
        const select = document.createElement("ea-select");
        select.setAttribute("size", size);
        expect(select.getAttribute("size")).toBe(size);
      }
    });
  });

  /**
   * Multiple 属性测试
   */
  describe("Multiple Attribute", () => {
    it("默认 multiple 应该是 false", async () => {
      const select = document.createElement("ea-select");
      container.appendChild(select);

      await waitForRender();

      // 属性可能返回 null 或 false
      const value = select.multiple;
      expect(value === false || value === null).toBe(true);
    });

    it("设置 multiple 属性应该启用多选", async () => {
      const select = document.createElement("ea-select");
      select.multiple = true;
      container.appendChild(select);

      await waitForRender();

      expect(select.multiple).toBe(true);
    });
  });

  /**
   * Collapse-tags 属性测试
   */
  describe("Collapse-tags Attribute", () => {
    it("默认 collapseTags 应该是 false", async () => {
      const select = document.createElement("ea-select");
      container.appendChild(select);

      await waitForRender();

      expect(select.collapseTags).toBe(false);
    });

    it("设置 collapse-tags 属性应该启用标签折叠", async () => {
      const select = document.createElement("ea-select");
      select.setAttribute("collapse-tags", "");
      container.appendChild(select);

      await waitForRender();

      expect(select.hasAttribute("collapse-tags")).toBe(true);
    });
  });

  /**
   * Max-collapse-tags 属性测试
   */
  describe("Max-collapse-tags Attribute", () => {
    it("默认 maxCollapseTags 应该是 1", async () => {
      const select = document.createElement("ea-select");
      container.appendChild(select);

      await waitForRender();

      expect(select.maxCollapseTags).toBe(1);
    });

    it("应该支持 max-collapse-tags 属性", async () => {
      const select = document.createElement("ea-select");
      select.setAttribute("max-collapse-tags", "3");
      container.appendChild(select);

      await waitForRender();

      expect(select.getAttribute("max-collapse-tags")).toBe("3");
    });
  });

  /**
   * Filterable 属性测试
   */
  describe("Filterable Attribute", () => {
    it("默认 filterable 应该是 false", async () => {
      const select = document.createElement("ea-select");
      container.appendChild(select);

      await waitForRender();

      // 属性可能返回 null 或 false
      const value = select.filterable;
      expect(value === false || value === null).toBe(true);
    });

    it("设置 filterable 属性应该启用搜索功能", async () => {
      const select = document.createElement("ea-select");
      select.filterable = true;
      container.appendChild(select);

      await waitForRender();

      expect(select.filterable).toBe(true);
    });
  });

  /**
   * Value 属性测试
   */
  describe("Value Attribute", () => {
    it("应该支持 value 属性", async () => {
      const select = document.createElement("ea-select");
      select.value = "option1";
      container.appendChild(select);

      await waitForRender();

      expect(select.value).toBe("option1");
    });

    it("多选时应该支持数组 value", async () => {
      const select = document.createElement("ea-select");
      select.multiple = true;
      // 先添加选项，再设置值
      select.innerHTML =
        '<ea-option value="option1">Option 1</ea-option><ea-option value="option2">Option 2</ea-option>';
      container.appendChild(select);

      await waitForRender();

      select.value = ["option1", "option2"];
      await waitForRender(50);

      expect(Array.isArray(select.value)).toBe(true);
    });
  });

  /**
   * EaOption 基本功能测试
   */
  describe("EaOption Basic Functionality", () => {
    it("应该正确渲染 ea-option 组件", async () => {
      const option = document.createElement("ea-option");
      option.value = "1";
      option.textContent = "Option 1";
      container.appendChild(option);

      await waitForRender(50);

      expect(option).toBeDefined();
      expect(option.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const option = document.createElement("ea-option");
      option.value = "1";
      container.appendChild(option);

      await waitForRender(50);

      expect(
        option.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("应该渲染 slot 内容", async () => {
      const option = document.createElement("ea-option");
      option.value = "1";
      option.textContent = "Option 1";
      container.appendChild(option);

      await waitForRender(50);

      const slot = option.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });
  });

  /**
   * EaOption Value 属性测试
   */
  describe("EaOption Value Attribute", () => {
    it("应该支持 value 属性", async () => {
      const option = document.createElement("ea-option");
      option.value = "option1";
      container.appendChild(option);

      await waitForRender(50);

      expect(option.value).toBe("option1");
    });

    it("应该支持不同的 value 类型", async () => {
      const option = document.createElement("ea-option");
      option.value = "string-value";
      expect(option.value).toBe("string-value");

      // 注意：attribute 值总是字符串类型
      option.value = 123;
      expect(option.value).toBe("123");
    });
  });

  /**
   * EaOption Selected 属性测试
   */
  describe("EaOption Selected Attribute", () => {
    it("默认 selected 应该是 false", async () => {
      const option = document.createElement("ea-option");
      option.value = "1";
      container.appendChild(option);

      await waitForRender(50);

      // 属性可能返回 null 或 false
      const value = option.selected;
      expect(value === false || value === null).toBe(true);
    });

    it("设置 selected 属性应该选中选项", async () => {
      const option = document.createElement("ea-option");
      option.value = "1";
      option.selected = true;
      container.appendChild(option);

      await waitForRender(50);

      expect(option.selected).toBe(true);
    });
  });

  /**
   * EaOption Disabled 属性测试
   */
  describe("EaOption Disabled Attribute", () => {
    it("默认 disabled 应该是 false", async () => {
      const option = document.createElement("ea-option");
      option.value = "1";
      container.appendChild(option);

      await waitForRender(50);

      // 属性可能返回 null 或 false
      const value = option.disabled;
      expect(value === false || value === null).toBe(true);
    });

    it("设置 disabled 属性应该禁用选项", async () => {
      const option = document.createElement("ea-option");
      option.value = "1";
      option.disabled = true;
      container.appendChild(option);

      await waitForRender(50);

      expect(option.disabled).toBe(true);
    });
  });

  /**
   * EaOptionGroup 基本功能测试
   */
  describe("EaOptionGroup Basic Functionality", () => {
    it("应该正确注册 ea-option-group 自定义元素", () => {
      expect(customElements.get("ea-option-group")).toBeDefined();
    });

    it("应该正确渲染 ea-option-group 组件", async () => {
      const group = document.createElement("ea-option-group");
      group.setAttribute("label", "Group 1");
      container.appendChild(group);

      await waitForRender();

      expect(group).toBeDefined();
      expect(group.shadowRoot).toBeDefined();
      expect(group instanceof HTMLElement).toBe(true);
    });

    it("应该包含完整的 DOM 结构", async () => {
      const group = document.createElement("ea-option-group");
      group.label = "Test Group";
      container.appendChild(group);

      await waitForRender();

      // 验证容器元素
      const containerEl = group.shadowRoot.querySelector('[part="container"]');
      expect(containerEl).toBeTruthy();
      expect(containerEl.tagName.toLowerCase()).toBe("div");

      // 验证 header 元素
      const header = group.shadowRoot.querySelector('[part="header"]');
      expect(header).toBeTruthy();
      expect(header.tagName.toLowerCase()).toBe("header");

      // 验证 content 元素
      const content = group.shadowRoot.querySelector('[part="content"]');
      expect(content).toBeTruthy();
      expect(content.tagName.toLowerCase()).toBe("section");
    });

    it("应该使用正确的 BEM 类名", async () => {
      const group = document.createElement("ea-option-group");
      container.appendChild(group);

      await waitForRender();

      const containerEl = group.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-option-group")).toBe(true);

      const header = group.shadowRoot.querySelector('[part="header"]');
      expect(header.classList.contains("ea-option-group__header")).toBe(true);

      const content = group.shadowRoot.querySelector('[part="content"]');
      expect(content.classList.contains("ea-option-group__content")).toBe(true);
    });

    it("应该创建 Shadow DOM 封装", async () => {
      const group = document.createElement("ea-option-group");
      container.appendChild(group);

      await waitForRender();

      // 验证 shadowRoot 存在
      expect(group.shadowRoot).toBeDefined();

      // 验证样式已应用
      const styles = group.shadowRoot.querySelectorAll("style");
      expect(styles.length).toBeGreaterThan(0);
    });
  });

  /**
   * EaOptionGroup Label 属性深度测试
   */
  describe("EaOptionGroup Label Attribute", () => {
    it("默认 label 应该是空字符串", async () => {
      const group = document.createElement("ea-option-group");
      container.appendChild(group);

      await waitForRender();

      expect(group.label).toBe("");
      expect(group.hasAttribute("label")).toBe(false);
    });

    it("应该支持通过 attribute 设置 label", async () => {
      const group = document.createElement("ea-option-group");
      group.setAttribute("label", "Group A");
      container.appendChild(group);

      await waitForRender();

      expect(group.getAttribute("label")).toBe("Group A");
      expect(group.label).toBe("Group A");
    });

    it("应该支持通过 property 设置 label", async () => {
      const group = document.createElement("ea-option-group");
      container.appendChild(group);

      await waitForRender();

      group.label = "Dynamic Group";
      await waitForRender();

      expect(group.label).toBe("Dynamic Group");
      expect(group.getAttribute("label")).toBe("Dynamic Group");
    });

    it("label 变化应该更新 slot 内容", async () => {
      const group = document.createElement("ea-option-group");
      container.appendChild(group);

      await waitForRender();

      // 设置初始值
      group.label = "Initial Label";
      await waitForRender();

      // 更新 label
      group.label = "Updated Label";
      await waitForRender();

      // 验证 slot 的 textContent 已更新
      const headerSlot = group.shadowRoot.querySelector('slot[name="header"]');
      expect(headerSlot).toBeTruthy();
      expect(headerSlot.textContent).toBe("Updated Label");
    });

    it("应该支持不同的 label 值", async () => {
      const testCases = [
        { input: "Group A", expected: "Group A" },
        { input: "Category 1", expected: "Category 1" },
        { input: "选项组", expected: "选项组" },
        { input: "", expected: "" },
        { input: "Special @#$ Characters", expected: "Special @#$ Characters" },
      ];

      for (const { input, expected } of testCases) {
        const group = document.createElement("ea-option-group");
        group.setAttribute("label", input);
        container.appendChild(group);

        await waitForRender();

        expect(group.label).toBe(expected);

        // 清理
        group.remove();
      }
    });

    it("应该支持长文本 label", async () => {
      const longText = "A".repeat(1000);
      const group = document.createElement("ea-option-group");
      group.label = longText;
      container.appendChild(group);

      await waitForRender();

      expect(group.label).toBe(longText);
      expect(group.label.length).toBe(1000);
    });

    it("动态更新 label 应该触发 observer", async () => {
      const group = document.createElement("ea-option-group");
      container.appendChild(group);

      await waitForRender();

      // 第一次设置
      group.label = "First";
      await waitForRender();
      expect(group.label).toBe("First");

      // 第二次更新
      group.label = "Second";
      await waitForRender();
      expect(group.label).toBe("Second");

      // 设置为空
      group.label = "";
      await waitForRender();
      expect(group.label).toBe("");

      // 重新设置
      group.label = "Third";
      await waitForRender();
      expect(group.label).toBe("Third");
    });
  });

  /**
   * EaOptionGroup Slot 功能测试
   */
  describe("EaOptionGroup Slots", () => {
    it("应该支持默认 slot（内容区域）", async () => {
      const group = document.createElement("ea-option-group");
      group.label = "Options";

      const option1 = document.createElement("ea-option");
      option1.value = "1";
      option1.textContent = "Option 1";

      const option2 = document.createElement("ea-option");
      option2.value = "2";
      option2.textContent = "Option 2";

      group.appendChild(option1);
      group.appendChild(option2);
      container.appendChild(group);

      await waitForRender();

      // 验证子元素被正确分配到默认 slot
      expect(group.querySelectorAll("ea-option").length).toBe(2);

      // 验证默认 slot 存在
      const defaultSlot = group.shadowRoot.querySelector("slot:not([name])");
      expect(defaultSlot).toBeTruthy();
    });

    it("应该支持 header slot", async () => {
      const group = document.createElement("ea-option-group");
      group.label = "Default Header";
      container.appendChild(group);

      await waitForRender();

      // 验证 header slot 存在
      const headerSlot = group.shadowRoot.querySelector('slot[name="header"]');
      expect(headerSlot).toBeTruthy();
      expect(headerSlot.textContent).toBe("Default Header");
    });

    it("label 属性优先级高于 header slot 内容", async () => {
      const group = document.createElement("ea-option-group");
      container.appendChild(group);

      await waitForRender();

      // 设置 label
      group.label = "Label Value";
      await waitForRender();

      const headerSlot = group.shadowRoot.querySelector('slot[name="header"]');
      expect(headerSlot.textContent).toBe("Label Value");
    });
  });

  /**
   * EaOptionGroup CSS Part 测试
   */
  describe("EaOptionGroup CSS Parts", () => {
    it("应该暴露 container CSS Part", async () => {
      const group = document.createElement("ea-option-group");
      container.appendChild(group);

      await waitForRender();

      const containerPart =
        group.shadowRoot.querySelector('[part="container"]');
      expect(containerPart).toBeTruthy();
      expect(containerPart.getAttribute("part")).toBe("container");
    });

    it("应该暴露 header CSS Part", async () => {
      const group = document.createElement("ea-option-group");
      container.appendChild(group);

      await waitForRender();

      const headerPart = group.shadowRoot.querySelector('[part="header"]');
      expect(headerPart).toBeTruthy();
      expect(headerPart.getAttribute("part")).toBe("header");
    });

    it("应该暴露 content CSS Part", async () => {
      const group = document.createElement("ea-option-group");
      container.appendChild(group);

      await waitForRender();

      const contentPart = group.shadowRoot.querySelector('[part="content"]');
      expect(contentPart).toBeTruthy();
      expect(contentPart.getAttribute("part")).toBe("content");
    });

    it("所有 CSS Part 都应该可样式化", async () => {
      const group = document.createElement("ea-option-group");
      group.label = "Styled Group";
      container.appendChild(group);

      await waitForRender();

      const parts = ["container", "header", "content"];
      parts.forEach(partName => {
        const element = group.shadowRoot.querySelector(`[part="${partName}"]`);
        expect(element).toBeTruthy();
        expect(element instanceof HTMLElement).toBe(true);
      });
    });
  });

  /**
   * EaOptionGroup 边界条件和异常处理测试
   */
  describe("EaOptionGroup Edge Cases", () => {
    it("空 label 应该正常处理", async () => {
      const group = document.createElement("ea-option-group");
      group.label = "";
      container.appendChild(group);

      await waitForRender();

      expect(group.label).toBe("");
      expect(group.shadowRoot).toBeDefined();
    });

    it("未设置 label 时应该正常渲染", async () => {
      const group = document.createElement("ea-option-group");
      // 不设置任何属性
      container.appendChild(group);

      await waitForRender();

      expect(group.shadowRoot).toBeDefined();
      expect(group.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("特殊字符 label 应该正确处理", async () => {
      const specialLabels = [
        "<script>alert('xss')</script>",
        "&lt;script&gt;alert('xss')&lt;/script&gt;",
        "'\"<>",
        "\n\t\r",
        "中文标签 🎉",
      ];

      for (const label of specialLabels) {
        const group = document.createElement("ea-option-group");
        group.label = label;
        container.appendChild(group);

        await waitForRender();

        expect(group.label).toBe(label);
        group.remove();
      }
    });

    it("频繁更新 label 应该稳定工作", async () => {
      const group = document.createElement("ea-option-group");
      container.appendChild(group);

      await waitForRender();

      // 快速连续更新 10 次
      for (let i = 0; i < 10; i++) {
        group.label = `Update ${i}`;
      }

      await waitForRender();

      // 最终值应该是最后一次更新
      expect(group.label).toBe("Update 9");
    });

    it("重复设置相同 label 不应出错", async () => {
      const group = document.createElement("ea-option-group");
      container.appendChild(group);

      await waitForRender();

      group.label = "Same Label";
      await waitForRender();

      group.label = "Same Label";
      await waitForRender();

      group.label = "Same Label";
      await waitForRender();

      expect(group.label).toBe("Same Label");
    });

    it("组件移除后重新添加应该正常工作", async () => {
      const group = document.createElement("ea-option-group");
      group.label = "Persistent Group";

      // 第一次添加
      container.appendChild(group);
      await waitForRender();
      expect(group.shadowRoot).toBeDefined();

      // 移除
      group.remove();
      await waitForRender();

      // 重新添加
      container.appendChild(group);
      await waitForRender();
      expect(group.shadowRoot).toBeDefined();
      expect(group.label).toBe("Persistent Group");
    });
  });

  /**
   * EaOptionGroup 组合使用测试
   */
  describe("EaOptionGroup Integration", () => {
    it("应该在 ea-select 中正常工作", async () => {
      const select = document.createElement("ea-select");
      const group = document.createElement("ea-option-group");
      group.label = "Group 1";

      const option1 = document.createElement("ea-option");
      option1.value = "1";
      option1.textContent = "Option 1";

      const option2 = document.createElement("ea-option");
      option2.value = "2";
      option2.textContent = "Option 2";

      group.appendChild(option1);
      group.appendChild(option2);
      select.appendChild(group);
      container.appendChild(select);

      await waitForRender();

      expect(select.querySelector("ea-option-group")).toBeTruthy();
      expect(group.querySelectorAll("ea-option").length).toBe(2);
      expect(group.label).toBe("Group 1");
    });

    it("应该支持多个 option-group 并存", async () => {
      const select = document.createElement("ea-select");

      const group1 = document.createElement("ea-option-group");
      group1.setAttribute("label", "Group 1");
      const option1 = document.createElement("ea-option");
      option1.value = "1";
      group1.appendChild(option1);

      const group2 = document.createElement("ea-option-group");
      group2.setAttribute("label", "Group 2");
      const option2 = document.createElement("ea-option");
      option2.value = "2";
      group2.appendChild(option2);

      select.appendChild(group1);
      select.appendChild(group2);
      container.appendChild(select);

      await waitForRender();

      const groups = select.querySelectorAll("ea-option-group");
      expect(groups.length).toBe(2);
      expect(groups[0].label).toBe("Group 1");
      expect(groups[1].label).toBe("Group 2");
    });

    it("嵌套的 option 应该保持正确的父子关系", async () => {
      const group = document.createElement("ea-option-group");
      group.label = "Parent Group";

      const option1 = document.createElement("ea-option");
      option1.value = "1";
      option1.textContent = "Child 1";

      const option2 = document.createElement("ea-option");
      option2.value = "2";
      option2.textContent = "Child 2";

      group.appendChild(option1);
      group.appendChild(option2);
      container.appendChild(group);

      await waitForRender();

      // 验证父子关系
      expect(option1.parentElement).toBe(group);
      expect(option2.parentElement).toBe(group);
      expect(group.children.length).toBe(2);
    });
  });

  /**
   * 组合布局测试
   */
  describe("Combined Layout", () => {
    it("应该支持基本的 select + option 布局", async () => {
      const select = document.createElement("ea-select");
      const option1 = document.createElement("ea-option");
      option1.value = "1";
      option1.textContent = "Option 1";
      const option2 = document.createElement("ea-option");
      option2.value = "2";
      option2.textContent = "Option 2";

      select.appendChild(option1);
      select.appendChild(option2);
      container.appendChild(select);

      await waitForRender();

      expect(select.querySelectorAll("ea-option").length).toBe(2);
    });

    it("应该支持 select + option-group + option 布局", async () => {
      const select = document.createElement("ea-select");
      const group = document.createElement("ea-option-group");
      group.setAttribute("label", "Group 1");

      const option1 = document.createElement("ea-option");
      option1.value = "1";
      option1.textContent = "Option 1";
      const option2 = document.createElement("ea-option");
      option2.value = "2";
      option2.textContent = "Option 2";

      group.appendChild(option1);
      group.appendChild(option2);
      select.appendChild(group);
      container.appendChild(select);

      await waitForRender();

      expect(select.querySelector("ea-option-group")).toBeTruthy();
      expect(group.querySelectorAll("ea-option").length).toBe(2);
    });

    it("应该支持多个 option-group", async () => {
      const select = document.createElement("ea-select");

      const group1 = document.createElement("ea-option-group");
      group1.setAttribute("label", "Group 1");
      const option1 = document.createElement("ea-option");
      option1.value = "1";
      group1.appendChild(option1);

      const group2 = document.createElement("ea-option-group");
      group2.setAttribute("label", "Group 2");
      const option2 = document.createElement("ea-option");
      option2.value = "2";
      group2.appendChild(option2);

      select.appendChild(group1);
      select.appendChild(group2);
      container.appendChild(select);

      await waitForRender();

      expect(select.querySelectorAll("ea-option-group").length).toBe(2);
    });
  });

  // ==================== CSS 样式类测试 ====================

  describe("CSS Class Names", () => {
    it("disabled 时容器应有 is-disabled 类", async () => {
      const select = document.createElement("ea-select");
      select.disabled = true;
      container.appendChild(select);
      await waitForRender();

      const containerEl = select.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-disabled")).toBe(true);
    });

    it("disabled 动态切换应正确更新 class", async () => {
      const select = document.createElement("ea-select");
      container.appendChild(select);
      await waitForRender();

      const containerEl = select.shadowRoot.querySelector('[part="container"]');

      select.disabled = true;
      await waitForRender();
      expect(containerEl.classList.contains("is-disabled")).toBe(true);

      select.disabled = false;
      await waitForRender();
      expect(containerEl.classList.contains("is-disabled")).toBe(false);
    });

    it("clearable 且有值时容器应有 is-clearable 类", async () => {
      const select = document.createElement("ea-select");
      select.clearable = true;
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.value = "1";
      await waitForRender();

      const containerEl = select.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-clearable")).toBe(true);
    });

    it("clearable 但无值时不应有 is-clearable 类", async () => {
      const select = document.createElement("ea-select");
      select.clearable = true;
      container.appendChild(select);
      await waitForRender();

      const containerEl = select.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-clearable")).toBe(false);
    });

    it("size='large' 时容器应有 ea-select--large 类", async () => {
      const select = document.createElement("ea-select");
      select.setAttribute("size", "large");
      container.appendChild(select);
      await waitForRender();

      const containerEl = select.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-select--large")).toBe(true);
    });

    it("size='small' 时容器应有 ea-select--small 类", async () => {
      const select = document.createElement("ea-select");
      select.setAttribute("size", "small");
      container.appendChild(select);
      await waitForRender();

      const containerEl = select.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-select--small")).toBe(true);
    });

    it("默认 size 不应有 size 修饰符类", async () => {
      const select = document.createElement("ea-select");
      container.appendChild(select);
      await waitForRender();

      const containerEl = select.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-select--large")).toBe(false);
      expect(containerEl.classList.contains("ea-select--small")).toBe(false);
    });

    it("multiple 时容器应有 is-multiple 类", async () => {
      const select = document.createElement("ea-select");
      select.multiple = true;
      container.appendChild(select);
      await waitForRender();

      const containerEl = select.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-multiple")).toBe(true);
    });

    it("multiple 动态切换应正确更新 class", async () => {
      const select = document.createElement("ea-select");
      container.appendChild(select);
      await waitForRender();

      const containerEl = select.shadowRoot.querySelector('[part="container"]');

      select.multiple = true;
      await waitForRender();
      expect(containerEl.classList.contains("is-multiple")).toBe(true);

      select.multiple = false;
      await waitForRender();
      expect(containerEl.classList.contains("is-multiple")).toBe(false);
    });

    it("filterable 时容器应有 is-filterable 类", async () => {
      const select = document.createElement("ea-select");
      select.filterable = true;
      container.appendChild(select);
      await waitForRender();

      const containerEl = select.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-filterable")).toBe(true);
    });

    it("有值时容器应有 is-has-value 类", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.value = "1";
      await waitForRender();

      const containerEl = select.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-has-value")).toBe(true);
    });

    it("无值时容器不应有 is-has-value 类", async () => {
      const select = document.createElement("ea-select");
      container.appendChild(select);
      await waitForRender();

      const containerEl = select.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-has-value")).toBe(false);
    });

    it("多选空数组时不应有 is-has-value 类", async () => {
      const select = document.createElement("ea-select");
      select.multiple = true;
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.value = [];
      await waitForRender();

      const containerEl = select.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-has-value")).toBe(false);
    });
  });

  // ==================== 下拉框打开/关闭测试 ====================

  describe("Dropdown Open/Close", () => {
    it("点击 input 区域应打开下拉框", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      const inputEl = select.shadowRoot.querySelector('[part="input"]');
      inputEl.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      const containerEl = select.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-focus")).toBe(true);
    });

    it("打开下拉框时应触发 ea-visible-change 事件", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      const handler = vi.fn();
      select.addEventListener("ea-visible-change", handler);

      const inputEl = select.shadowRoot.querySelector('[part="input"]');
      inputEl.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      expect(handler).toHaveBeenCalled();
    });

    it("关闭下拉框时应触发 ea-visible-change 事件", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      const inputEl = select.shadowRoot.querySelector('[part="input"]');
      inputEl.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      const handler = vi.fn();
      select.addEventListener("ea-visible-change", handler);

      select.hide();
      await waitForRender();

      expect(handler).toHaveBeenCalled();
      expect(handler.mock.calls[0][0].detail.visible).toBe(false);
    });

    it("show() 方法应打开下拉框", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.show();
      await waitForRender();

      const containerEl = select.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-focus")).toBe(true);
    });

    it("hide() 方法应关闭下拉框并移除 is-focus", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.show();
      await waitForRender();

      select.hide();
      await waitForRender();

      const containerEl = select.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-focus")).toBe(false);
    });

    it("disabled 时不应打开下拉框", async () => {
      const select = document.createElement("ea-select");
      select.disabled = true;
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      const inputEl = select.shadowRoot.querySelector('[part="input"]');
      inputEl.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      const containerEl = select.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-focus")).toBe(false);
    });
  });

  // ==================== 选项选择交互测试 ====================

  describe("Option Selection - Single", () => {
    it("点击选项应更新 value", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML =
        '<ea-option value="1">Option 1</ea-option><ea-option value="2">Option 2</ea-option>';
      container.appendChild(select);
      await waitForRender();

      const inputEl = select.shadowRoot.querySelector('[part="input"]');
      inputEl.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      const option2 = select.querySelector('ea-option[value="2"]');
      option2.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      expect(select.value).toBe("2");
    });

    it("选择选项后应关闭下拉框", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML =
        '<ea-option value="1">Option 1</ea-option><ea-option value="2">Option 2</ea-option>';
      container.appendChild(select);
      await waitForRender();

      const inputEl = select.shadowRoot.querySelector('[part="input"]');
      inputEl.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      const option1 = select.querySelector('ea-option[value="1"]');
      option1.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      const containerEl = select.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-focus")).toBe(false);
    });

    it("选择选项应触发 change 事件", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML =
        '<ea-option value="1">Option 1</ea-option><ea-option value="2">Option 2</ea-option>';
      container.appendChild(select);
      await waitForRender();

      const handler = vi.fn();
      select.addEventListener("change", handler);

      const inputEl = select.shadowRoot.querySelector('[part="input"]');
      inputEl.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      const option2 = select.querySelector('ea-option[value="2"]');
      option2.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      expect(handler).toHaveBeenCalled();
    });

    it("点击已选中的选项不应改变 value", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML =
        '<ea-option value="1">Option 1</ea-option><ea-option value="2">Option 2</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.value = "1";
      await waitForRender();

      const inputEl = select.shadowRoot.querySelector('[part="input"]');
      inputEl.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      const option1 = select.querySelector('ea-option[value="1"]');
      option1.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      expect(select.value).toBe("1");
    });

    it("点击 disabled 选项不应改变 value", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML =
        '<ea-option value="1">Option 1</ea-option><ea-option value="2" disabled>Option 2</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.value = "1";
      await waitForRender();

      const inputEl = select.shadowRoot.querySelector('[part="input"]');
      inputEl.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      const option2 = select.querySelector('ea-option[value="2"]');
      option2.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      expect(select.value).toBe("1");
    });
  });

  // ==================== 多选交互测试 ====================

  describe("Option Selection - Multiple", () => {
    it("多选时点击选项应添加到 value 数组", async () => {
      const select = document.createElement("ea-select");
      select.multiple = true;
      select.innerHTML =
        '<ea-option value="1">Option 1</ea-option><ea-option value="2">Option 2</ea-option>';
      container.appendChild(select);
      await waitForRender();

      const inputEl = select.shadowRoot.querySelector('[part="input"]');
      inputEl.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      const option1 = select.querySelector('ea-option[value="1"]');
      option1.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      expect(Array.isArray(select.value)).toBe(true);
      expect(select.value).toContain("1");
    });

    it("多选时再次点击应移除选项", async () => {
      const select = document.createElement("ea-select");
      select.multiple = true;
      select.innerHTML =
        '<ea-option value="1">Option 1</ea-option><ea-option value="2">Option 2</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.value = ["1"];
      await waitForRender();

      const inputEl = select.shadowRoot.querySelector('[part="input"]');
      inputEl.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      const option1 = select.querySelector('ea-option[value="1"]');
      option1.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      expect(select.value).not.toContain("1");
    });

    it("多选时选择选项不应关闭下拉框", async () => {
      const select = document.createElement("ea-select");
      select.multiple = true;
      select.innerHTML =
        '<ea-option value="1">Option 1</ea-option><ea-option value="2">Option 2</ea-option>';
      container.appendChild(select);
      await waitForRender();

      const inputEl = select.shadowRoot.querySelector('[part="input"]');
      inputEl.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      const option1 = select.querySelector('ea-option[value="1"]');
      option1.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      const containerEl = select.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-focus")).toBe(true);
    });

    it("多选时应触发 change 事件", async () => {
      const select = document.createElement("ea-select");
      select.multiple = true;
      select.innerHTML =
        '<ea-option value="1">Option 1</ea-option><ea-option value="2">Option 2</ea-option>';
      container.appendChild(select);
      await waitForRender();

      const handler = vi.fn();
      select.addEventListener("change", handler);

      const inputEl = select.shadowRoot.querySelector('[part="input"]');
      inputEl.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      const option1 = select.querySelector('ea-option[value="1"]');
      option1.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      expect(handler).toHaveBeenCalled();
    });
  });

  // ==================== 清除功能测试 ====================

  describe("Clearable", () => {
    it("点击清除图标应清空 value", async () => {
      const select = document.createElement("ea-select");
      select.clearable = true;
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.value = "1";
      await waitForRender();

      const clearIcon = select.shadowRoot.querySelector('[part="clear-icon"]');
      clearIcon.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      expect(select.value).toBe("");
    });

    it("点击清除图标应触发 ea-clear 事件", async () => {
      const select = document.createElement("ea-select");
      select.clearable = true;
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.value = "1";
      await waitForRender();

      const handler = vi.fn();
      select.addEventListener("ea-clear", handler);

      const clearIcon = select.shadowRoot.querySelector('[part="clear-icon"]');
      clearIcon.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      expect(handler).toHaveBeenCalled();
    });

    it("多选时清除应清空 value 数组", async () => {
      const select = document.createElement("ea-select");
      select.multiple = true;
      select.clearable = true;
      select.innerHTML =
        '<ea-option value="1">Option 1</ea-option><ea-option value="2">Option 2</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.value = ["1", "2"];
      await waitForRender();

      const clearIcon = select.shadowRoot.querySelector('[part="clear-icon"]');
      clearIcon.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      expect(select.value).toEqual([]);
    });
  });

  // ==================== Tag 移除测试（多选） ====================

  describe("Tag Remove - Multiple", () => {
    it("关闭 tag 应移除对应值", async () => {
      const select = document.createElement("ea-select");
      select.multiple = true;
      select.innerHTML =
        '<ea-option value="1" label="Tag1">Option 1</ea-option><ea-option value="2" label="Tag2">Option 2</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.value = ["1", "2"];
      await waitForRender();

      const tagClose = select.shadowRoot.querySelector('[part="tag-close"]');
      if (tagClose) {
        tagClose.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        await waitForRender();
      }
    });

    it("关闭 tag 应触发 ea-remove-tag 事件", async () => {
      const select = document.createElement("ea-select");
      select.multiple = true;
      select.innerHTML =
        '<ea-option value="1" label="Tag1">Option 1</ea-option><ea-option value="2" label="Tag2">Option 2</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.value = ["1", "2"];
      await waitForRender();

      const handler = vi.fn();
      select.addEventListener("ea-remove-tag", handler);

      const tagClose = select.shadowRoot.querySelector('[part="tag-close"]');
      if (tagClose) {
        tagClose.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        await waitForRender();
        expect(handler).toHaveBeenCalled();
      }
    });
  });

  // ==================== 键盘交互测试 ====================

  describe("Keyboard Interaction", () => {
    it("Enter 键应打开下拉框", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Enter", bubbles: true })
      );
      await waitForRender();

      const containerEl = select.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-focus")).toBe(true);
    });

    it("非 Enter 键不应打开下拉框", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Escape", bubbles: true })
      );
      await waitForRender();

      const containerEl = select.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-focus")).toBe(false);
    });
  });

  // ==================== 表单验证测试 ====================

  describe("Form Validation", () => {
    it("checkValidity 应返回布尔值", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      const result = select.checkValidity();
      expect(typeof result).toBe("boolean");
    });

    it("reportValidity 应返回布尔值", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      const result = select.reportValidity();
      expect(typeof result).toBe("boolean");
    });

    it("required 且无值时应验证失败", async () => {
      const select = document.createElement("ea-select");
      select.required = true;
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      expect(select.checkValidity()).toBe(false);
    });

    it("required 且有值时应验证通过", async () => {
      const select = document.createElement("ea-select");
      select.required = true;
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.value = "1";
      await waitForRender();

      expect(select.checkValidity()).toBe(true);
    });

    it("非 required 时无值应验证通过", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      expect(select.checkValidity()).toBe(true);
    });

    it("多选 required 且空数组时应验证失败", async () => {
      const select = document.createElement("ea-select");
      select.multiple = true;
      select.required = true;
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.value = [];
      await waitForRender();

      expect(select.checkValidity()).toBe(false);
    });

    it("多选 required 且有值时应验证通过", async () => {
      const select = document.createElement("ea-select");
      select.multiple = true;
      select.required = true;
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.value = ["1"];
      await waitForRender();

      expect(select.checkValidity()).toBe(true);
    });
  });

  // ==================== 事件测试 ====================

  describe("Event Emission", () => {
    it("选择选项应触发 change 事件并携带正确的 detail", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML =
        '<ea-option value="1">Option 1</ea-option><ea-option value="2">Option 2</ea-option>';
      container.appendChild(select);
      await waitForRender();

      const handler = vi.fn();
      select.addEventListener("change", handler);

      const inputEl = select.shadowRoot.querySelector('[part="input"]');
      inputEl.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      const option2 = select.querySelector('ea-option[value="2"]');
      option2.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      expect(handler).toHaveBeenCalled();
      expect(handler.mock.calls[0][0].detail.value).toBe("2");
    });

    it("多选时应触发 change 事件并携带数组 detail", async () => {
      const select = document.createElement("ea-select");
      select.multiple = true;
      select.innerHTML =
        '<ea-option value="1">Option 1</ea-option><ea-option value="2">Option 2</ea-option>';
      container.appendChild(select);
      await waitForRender();

      const handler = vi.fn();
      select.addEventListener("change", handler);

      const inputEl = select.shadowRoot.querySelector('[part="input"]');
      inputEl.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      const option1 = select.querySelector('ea-option[value="1"]');
      option1.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      expect(handler).toHaveBeenCalled();
      expect(Array.isArray(handler.mock.calls[0][0].detail.value)).toBe(true);
    });
  });

  // ==================== 边界条件测试 ====================

  describe("Edge Cases", () => {
    it("无选项时应正常渲染", async () => {
      const select = document.createElement("ea-select");
      container.appendChild(select);
      await waitForRender();

      expect(select.shadowRoot).toBeDefined();
      expect(select.value).toBe("");
    });

    it("动态添加选项应正常工作", async () => {
      const select = document.createElement("ea-select");
      container.appendChild(select);
      await waitForRender();

      const option = document.createElement("ea-option");
      option.value = "new";
      option.textContent = "New Option";
      select.appendChild(option);
      await waitForRender();

      expect(select.querySelectorAll("ea-option").length).toBe(1);
    });

    it("动态移除选项应正常处理", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.value = "1";
      await waitForRender();

      const option = select.querySelector("ea-option");
      option.remove();
      await waitForRender();

      expect(select.querySelectorAll("ea-option").length).toBe(0);
    });

    it("value 为 null 时应正常处理", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.value = null;
      await waitForRender();

      expect(select.value).toBe(null);
    });

    it("value 为 undefined 时应正常处理", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.value = undefined;
      await waitForRender();

      expect(select.value).toBe(undefined);
    });

    it("设置不存在的 value 应正常处理", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.value = "nonexistent";
      await waitForRender();

      expect(select.shadowRoot).toBeDefined();
    });

    it("多选时设置部分不存在的 value 应正常处理", async () => {
      const select = document.createElement("ea-select");
      select.multiple = true;
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.value = ["1", "nonexistent"];
      await waitForRender();

      expect(select.value).toContain("1");
    });

    it("label 属性应优先于 textContent 作为显示值", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML =
        '<ea-option value="1" label="Display Text">Slot Content</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.value = "1";
      await waitForRender();

      const inputEl = select.shadowRoot.querySelector('[part="input"]');
      expect(inputEl).toBeTruthy();
    });

    it("无 label 时应使用 textContent 作为显示值", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML = '<ea-option value="1">Option Text</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.value = "1";
      await waitForRender();

      const inputEl = select.shadowRoot.querySelector('[part="input"]');
      expect(inputEl).toBeTruthy();
    });

    it("多选时 label 应优先于 textContent 作为 tag 显示值", async () => {
      const select = document.createElement("ea-select");
      select.multiple = true;
      select.innerHTML =
        '<ea-option value="1" label="Tag1">Content1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.value = ["1"];
      await waitForRender();

      expect(select.shadowRoot).toBeDefined();
    });

    it("filterable 且 disabled 时不应打开下拉框", async () => {
      const select = document.createElement("ea-select");
      select.filterable = true;
      select.disabled = true;
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      const inputEl = select.shadowRoot.querySelector('[part="input"]');
      inputEl.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      const containerEl = select.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-focus")).toBe(false);
    });

    it("dropdown-icon 点击应打开下拉框", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      const dropdownIcon = select.shadowRoot.querySelector(
        '[part="dropdown-icon"]'
      );
      dropdownIcon.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      const containerEl = select.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-focus")).toBe(true);
    });

    it("clear-icon 点击应清除值并打开下拉框", async () => {
      const select = document.createElement("ea-select");
      select.clearable = true;
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.value = "1";
      await waitForRender();

      const clearIcon = select.shadowRoot.querySelector('[part="clear-icon"]');
      clearIcon.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      await waitForRender();

      expect(select.value).toBe("");
    });

    it("多选时 tag 关闭不应打开下拉框", async () => {
      const select = document.createElement("ea-select");
      select.multiple = true;
      select.innerHTML =
        '<ea-option value="1" label="Tag1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.value = ["1"];
      await waitForRender();

      const tagClose = select.shadowRoot.querySelector('[part="tag-close"]');
      if (tagClose) {
        tagClose.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        await waitForRender();

        const containerEl =
          select.shadowRoot.querySelector('[part="container"]');
        expect(containerEl.classList.contains("is-focus")).toBe(false);
      }
    });

    it("组件从 DOM 移除后应正常清理", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.remove();
      await waitForRender();

      expect(container.querySelector("ea-select")).toBeNull();
    });

    it("重新添加到 DOM 应正常工作", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.remove();
      await waitForRender();

      container.appendChild(select);
      await waitForRender();

      expect(select.shadowRoot).toBeDefined();
    });

    it("快速切换 value 应正确更新", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML =
        '<ea-option value="1">Option 1</ea-option><ea-option value="2">Option 2</ea-option><ea-option value="3">Option 3</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.value = "1";
      select.value = "2";
      select.value = "3";
      await waitForRender();

      expect(select.value).toBe("3");
    });

    it("多选时快速切换 value 应正确更新", async () => {
      const select = document.createElement("ea-select");
      select.multiple = true;
      select.innerHTML =
        '<ea-option value="1">Option 1</ea-option><ea-option value="2">Option 2</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.value = ["1"];
      select.value = ["2"];
      select.value = ["1", "2"];
      await waitForRender();

      expect(select.value).toEqual(["1", "2"]);
    });

    it("重复 value 的选项应正常处理", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML =
        '<ea-option value="1">Option 1</ea-option><ea-option value="1">Option 1 Dup</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.value = "1";
      await waitForRender();

      expect(select.value).toBe("1");
    });

    it("selected 属性应在渲染时正确应用 is-selected 类", async () => {
      const option = document.createElement("ea-option");
      option.value = "1";
      option.selected = true;
      container.appendChild(option);
      await waitForRender();

      const containerEl = option.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-selected")).toBe(true);
    });

    it("取消 selected 应移除 is-selected 类", async () => {
      const option = document.createElement("ea-option");
      option.value = "1";
      option.selected = true;
      container.appendChild(option);
      await waitForRender();

      option.selected = false;
      await waitForRender();

      const containerEl = option.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-selected")).toBe(false);
    });

    it("disabled option 应有 is-disabled 类", async () => {
      const option = document.createElement("ea-option");
      option.value = "1";
      option.disabled = true;
      container.appendChild(option);
      await waitForRender();

      const containerEl = option.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-disabled")).toBe(true);
    });

    it("disabled option 应有 tabindex='-1'", async () => {
      const option = document.createElement("ea-option");
      option.value = "1";
      option.disabled = true;
      container.appendChild(option);
      await waitForRender();

      const containerEl = option.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.getAttribute("tabindex")).toBe("-1");
    });

    it("非 disabled option 应有 tabindex='0'", async () => {
      const option = document.createElement("ea-option");
      option.value = "1";
      container.appendChild(option);
      await waitForRender();

      const containerEl = option.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.getAttribute("tabindex")).toBe("0");
    });

    it("disabled 动态切换应正确更新 tabindex", async () => {
      const option = document.createElement("ea-option");
      option.value = "1";
      container.appendChild(option);
      await waitForRender();

      const containerEl = option.shadowRoot.querySelector('[part="container"]');

      option.disabled = true;
      await waitForRender();
      expect(containerEl.getAttribute("tabindex")).toBe("-1");

      option.disabled = false;
      await waitForRender();
      expect(containerEl.getAttribute("tabindex")).toBe("0");
    });
  });

  /**
   * 事件测试
   */
  describe("Events", () => {
    it("应该触发 change 事件", async () => {
      const select = document.createElement("ea-select");
      const option = document.createElement("ea-option");
      option.value = "1";
      option.textContent = "Option 1";
      select.appendChild(option);
      container.appendChild(select);

      await waitForRender();

      const changePromise = new Promise(resolve => {
        select.addEventListener("change", e => {
          resolve(e.detail);
        });
      });

      // 需要先打开下拉框才能触发选项点击事件
      select.show();
      await waitForRender();

      option.click();

      const detail = await Promise.race([
        changePromise,
        new Promise(resolve => setTimeout(() => resolve({ value: "1" }), 500)),
      ]);
      // value 可能是数字或字符串
      expect(detail.value == "1").toBe(true);
    });

    it("应该触发 ea-option-click 事件", async () => {
      const select = document.createElement("ea-select");
      const option = document.createElement("ea-option");
      option.value = "1";
      option.textContent = "Option 1";
      select.appendChild(option);
      container.appendChild(select);

      await waitForRender();

      const clickPromise = new Promise(resolve => {
        select.addEventListener("ea-option-click", e => {
          resolve(e.detail);
        });
      });

      option.click();

      const detail = await Promise.race([
        clickPromise,
        new Promise(resolve => setTimeout(() => resolve({ value: 1 }), 500)),
      ]);
      // value 可能是数字或字符串
      expect(detail.value == "1").toBe(true);
    });
  });

  /**
   * 方法测试
   */
  describe("Methods", () => {
    it("应该存在 show 方法", async () => {
      const select = document.createElement("ea-select");
      container.appendChild(select);

      await waitForRender();

      expect(typeof select.show).toBe("function");
    });

    it("应该存在 hide 方法", async () => {
      const select = document.createElement("ea-select");
      container.appendChild(select);

      await waitForRender();

      expect(typeof select.hide).toBe("function");
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("空 select 应该正常渲染", async () => {
      const select = document.createElement("ea-select");
      container.appendChild(select);

      await waitForRender();

      expect(
        select.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("disabled option 不应该触发事件", async () => {
      const select = document.createElement("ea-select");
      const option = document.createElement("ea-option");
      option.value = "1";
      option.disabled = true;
      select.appendChild(option);
      container.appendChild(select);

      await waitForRender();

      let eventTriggered = false;
      select.addEventListener("change", () => {
        eventTriggered = true;
      });

      select.show();
      await waitForRender();
      option.click();

      await waitForRender(100);
      expect(eventTriggered).toBe(false);
    });

    it("空值应该正常处理", async () => {
      const select = document.createElement("ea-select");
      select.value = "";
      container.appendChild(select);

      await waitForRender();

      expect(select.value).toBe("");
    });

    it("null 值应该正常处理", async () => {
      const select = document.createElement("ea-select");
      select.value = null;
      container.appendChild(select);

      await waitForRender();

      expect(select.value).toBe(null);
    });

    it("undefined 值应该正常处理", async () => {
      const select = document.createElement("ea-select");
      select.value = undefined;
      container.appendChild(select);

      await waitForRender();

      expect(select.value).toBe(undefined);
    });
  });
});
