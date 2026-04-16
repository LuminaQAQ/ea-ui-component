import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender.js";

// 导入 ea-select 组件及其子组件
import "../components/ea-select/index.js";

describe("EaSelect Component", () => {
  let container: HTMLDivElement;

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
      const select = document.createElement("ea-select") as any;
      container.appendChild(select);

      await waitForRender();

      expect(select).toBeDefined();
      expect(select.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const select = document.createElement("ea-select") as any;
      container.appendChild(select);

      await waitForRender();

      expect(
        select.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("应该包含 input CSS Part", async () => {
      const select = document.createElement("ea-select") as any;
      container.appendChild(select);

      await waitForRender();

      expect(select.shadowRoot.querySelector('[part="input"]')).toBeTruthy();
    });

    it("应该包含 dropdown CSS Part", async () => {
      const select = document.createElement("ea-select") as any;
      container.appendChild(select);

      await waitForRender();

      expect(select.shadowRoot.querySelector('[part="dropdown"]')).toBeTruthy();
    });

    it("应该渲染 slot 内容", async () => {
      const select = document.createElement("ea-select") as any;
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
      const select = document.createElement("ea-select") as any;
      select.placeholder = "Please select";
      container.appendChild(select);

      await waitForRender();

      expect(select.placeholder).toBe("Please select");
    });

    it("应该支持不同的 placeholder 值", async () => {
      const placeholders = ["Select", "Choose an option", "Pick one", ""];

      for (const placeholder of placeholders) {
        const select = document.createElement("ea-select") as any;
        select.placeholder = placeholder;
        expect(select.placeholder).toBe(placeholder);
      }
    });
  });

  /**
   * Disabled 属性测试
   */
  describe("Disabled Attribute", () => {
    it("默认 disabled 应该是 false", async () => {
      const select = document.createElement("ea-select") as any;
      container.appendChild(select);

      await waitForRender();

      expect(select.disabled).toBe(false);
    });

    it("设置 disabled 属性应该禁用选择器", async () => {
      const select = document.createElement("ea-select") as any;
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
      const select = document.createElement("ea-select") as any;
      container.appendChild(select);

      await waitForRender();

      expect(select.clearable).toBe(false);
    });

    it("设置 clearable 属性应该启用清除功能", async () => {
      const select = document.createElement("ea-select") as any;
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
      const select = document.createElement("ea-select") as any;
      select.size = "large";
      container.appendChild(select);

      await waitForRender();

      expect(select.size).toBe("large");
    });

    it("应该支持 size='small'", async () => {
      const select = document.createElement("ea-select") as any;
      select.size = "small";
      container.appendChild(select);

      await waitForRender();

      expect(select.size).toBe("small");
    });

    it("应该支持不同的 size 值", async () => {
      const sizes = ["large", "default", "small"];

      for (const size of sizes) {
        const select = document.createElement("ea-select") as any;
        select.size = size;
        expect(select.size).toBe(size);
      }
    });
  });

  /**
   * Multiple 属性测试
   */
  describe("Multiple Attribute", () => {
    it("默认 multiple 应该是 false", async () => {
      const select = document.createElement("ea-select") as any;
      container.appendChild(select);

      await waitForRender();

      expect(select.multiple).toBe(false);
    });

    it("设置 multiple 属性应该启用多选", async () => {
      const select = document.createElement("ea-select") as any;
      select.multiple = true;
      container.appendChild(select);

      await waitForRender();

      expect(select.multiple).toBe(true);
    });
  });

  /**
   * CollapseTags 属性测试
   */
  describe("CollapseTags Attribute", () => {
    it("默认 collapseTags 应该是 false", async () => {
      const select = document.createElement("ea-select") as any;
      container.appendChild(select);

      await waitForRender();

      expect(select.collapseTags).toBe(false);
    });

    it("设置 collapseTags 属性应该启用标签折叠", async () => {
      const select = document.createElement("ea-select") as any;
      select.collapseTags = true;
      container.appendChild(select);

      await waitForRender();

      expect(select.collapseTags).toBe(true);
    });
  });

  /**
   * MaxCollapseTags 属性测试
   */
  describe("MaxCollapseTags Attribute", () => {
    it("默认 maxCollapseTags 应该是 1", async () => {
      const select = document.createElement("ea-select") as any;
      container.appendChild(select);

      await waitForRender();

      expect(select.maxCollapseTags).toBe(1);
    });

    it("应该支持 maxCollapseTags 属性", async () => {
      const select = document.createElement("ea-select") as any;
      select.maxCollapseTags = 3;
      container.appendChild(select);

      await waitForRender();

      expect(select.maxCollapseTags).toBe(3);
    });
  });

  /**
   * Filterable 属性测试
   */
  describe("Filterable Attribute", () => {
    it("默认 filterable 应该是 false", async () => {
      const select = document.createElement("ea-select") as any;
      container.appendChild(select);

      await waitForRender();

      expect(select.filterable).toBe(false);
    });

    it("设置 filterable 属性应该启用搜索功能", async () => {
      const select = document.createElement("ea-select") as any;
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
      const select = document.createElement("ea-select") as any;
      select.value = "option1";
      container.appendChild(select);

      await waitForRender();

      expect(select.value).toBe("option1");
    });

    it("多选时应该支持数组 value", async () => {
      const select = document.createElement("ea-select") as any;
      select.multiple = true;
      select.value = ["option1", "option2"];
      container.appendChild(select);

      await waitForRender();

      expect(Array.isArray(select.value)).toBe(true);
    });
  });

  /**
   * EaOption 基本功能测试
   */
  describe("EaOption Basic Functionality", () => {
    it("应该正确渲染 ea-option 组件", async () => {
      const option = document.createElement("ea-option") as any;
      option.value = "1";
      option.textContent = "Option 1";
      container.appendChild(option);

      await waitForRender(50);

      expect(option).toBeDefined();
      expect(option.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const option = document.createElement("ea-option") as any;
      option.value = "1";
      container.appendChild(option);

      await waitForRender(50);

      expect(
        option.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("应该渲染 slot 内容", async () => {
      const option = document.createElement("ea-option") as any;
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
      const option = document.createElement("ea-option") as any;
      option.value = "option1";
      container.appendChild(option);

      await waitForRender(50);

      expect(option.value).toBe("option1");
    });

    it("应该支持不同的 value 类型", async () => {
      const option = document.createElement("ea-option") as any;
      option.value = "string-value";
      expect(option.value).toBe("string-value");

      option.value = 123;
      expect(option.value).toBe(123);
    });
  });

  /**
   * EaOption Selected 属性测试
   */
  describe("EaOption Selected Attribute", () => {
    it("默认 selected 应该是 false", async () => {
      const option = document.createElement("ea-option") as any;
      option.value = "1";
      container.appendChild(option);

      await waitForRender(50);

      expect(option.selected).toBe(false);
    });

    it("设置 selected 属性应该选中选项", async () => {
      const option = document.createElement("ea-option") as any;
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
      const option = document.createElement("ea-option") as any;
      option.value = "1";
      container.appendChild(option);

      await waitForRender(50);

      expect(option.disabled).toBe(false);
    });

    it("设置 disabled 属性应该禁用选项", async () => {
      const option = document.createElement("ea-option") as any;
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
    it("应该正确渲染 ea-option-group 组件", async () => {
      const group = document.createElement("ea-option-group") as any;
      group.label = "Group 1";
      container.appendChild(group);

      await waitForRender(50);

      expect(group).toBeDefined();
      expect(group.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const group = document.createElement("ea-option-group") as any;
      group.label = "Group 1";
      container.appendChild(group);

      await waitForRender(50);

      expect(group.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("应该包含 header CSS Part", async () => {
      const group = document.createElement("ea-option-group") as any;
      group.label = "Group 1";
      container.appendChild(group);

      await waitForRender(50);

      expect(group.shadowRoot.querySelector('[part="header"]')).toBeTruthy();
    });

    it("应该包含 content CSS Part", async () => {
      const group = document.createElement("ea-option-group") as any;
      group.label = "Group 1";
      container.appendChild(group);

      await waitForRender(50);

      expect(group.shadowRoot.querySelector('[part="content"]')).toBeTruthy();
    });
  });

  /**
   * EaOptionGroup Label 属性测试
   */
  describe("EaOptionGroup Label Attribute", () => {
    it("应该支持 label 属性", async () => {
      const group = document.createElement("ea-option-group") as any;
      group.label = "Group 1";
      container.appendChild(group);

      await waitForRender(50);

      expect(group.label).toBe("Group 1");
    });

    it("应该支持不同的 label 值", async () => {
      const labels = ["Group A", "Category 1", "Options", ""];

      for (const label of labels) {
        const group = document.createElement("ea-option-group") as any;
        group.label = label;
        expect(group.label).toBe(label);
      }
    });
  });
});
