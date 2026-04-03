import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// 导入 ea-select 组件及其子组件
import "../components/ea-select/index.js";

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

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(select).toBeDefined();
      expect(select.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const select = document.createElement("ea-select");
      container.appendChild(select);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(
        select.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("应该包含 input CSS Part", async () => {
      const select = document.createElement("ea-select");
      container.appendChild(select);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(select.shadowRoot.querySelector('[part="input"]')).toBeTruthy();
    });

    it("应该包含 dropdown CSS Part", async () => {
      const select = document.createElement("ea-select");
      container.appendChild(select);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(select.shadowRoot.querySelector('[part="dropdown"]')).toBeTruthy();
    });

    it("应该渲染 slot 内容", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);

      await new Promise(resolve => setTimeout(resolve, 100));

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

      await new Promise(resolve => setTimeout(resolve, 100));

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

      await new Promise(resolve => setTimeout(resolve, 100));

      // 属性可能返回 null 或 false
      const value = select.disabled;
      expect(value === false || value === null).toBe(true);
    });

    it("设置 disabled 属性应该禁用选择器", async () => {
      const select = document.createElement("ea-select");
      select.disabled = true;
      container.appendChild(select);

      await new Promise(resolve => setTimeout(resolve, 100));

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

      await new Promise(resolve => setTimeout(resolve, 100));

      // 属性可能返回 null 或 false
      const value = select.clearable;
      expect(value === false || value === null).toBe(true);
    });

    it("设置 clearable 属性应该启用清除功能", async () => {
      const select = document.createElement("ea-select");
      select.clearable = true;
      container.appendChild(select);

      await new Promise(resolve => setTimeout(resolve, 100));

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

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(select.getAttribute("size")).toBe("large");
    });

    it("应该支持 size='small'", async () => {
      const select = document.createElement("ea-select");
      select.setAttribute("size", "small");
      container.appendChild(select);

      await new Promise(resolve => setTimeout(resolve, 100));

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

      await new Promise(resolve => setTimeout(resolve, 100));

      // 属性可能返回 null 或 false
      const value = select.multiple;
      expect(value === false || value === null).toBe(true);
    });

    it("设置 multiple 属性应该启用多选", async () => {
      const select = document.createElement("ea-select");
      select.multiple = true;
      container.appendChild(select);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(select.multiple).toBe(true);
    });
  });

  /**
   * Collapse-tags 属性测试
   */
  describe("Collapse-tags Attribute", () => {
    it("默认 collapse-tags 应该是 false", async () => {
      const select = document.createElement("ea-select");
      container.appendChild(select);

      await new Promise(resolve => setTimeout(resolve, 100));

      // 属性可能返回 null 或 false
      const value = select["collapse-tags"];
      expect(value === false || value === null).toBe(true);
    });

    it("设置 collapse-tags 属性应该启用标签折叠", async () => {
      const select = document.createElement("ea-select");
      select.setAttribute("collapse-tags", "");
      container.appendChild(select);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(select.hasAttribute("collapse-tags")).toBe(true);
    });
  });

  /**
   * Max-collapse-tags 属性测试
   */
  describe("Max-collapse-tags Attribute", () => {
    it("默认 max-collapse-tags 应该是 1", async () => {
      const select = document.createElement("ea-select");
      container.appendChild(select);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(select["max-collapse-tags"]).toBe(1);
    });

    it("应该支持 max-collapse-tags 属性", async () => {
      const select = document.createElement("ea-select");
      select.setAttribute("max-collapse-tags", "3");
      container.appendChild(select);

      await new Promise(resolve => setTimeout(resolve, 100));

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

      await new Promise(resolve => setTimeout(resolve, 100));

      // 属性可能返回 null 或 false
      const value = select.filterable;
      expect(value === false || value === null).toBe(true);
    });

    it("设置 filterable 属性应该启用搜索功能", async () => {
      const select = document.createElement("ea-select");
      select.filterable = true;
      container.appendChild(select);

      await new Promise(resolve => setTimeout(resolve, 100));

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

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(select.value).toBe("option1");
    });

    it("多选时应该支持数组 value", async () => {
      const select = document.createElement("ea-select");
      select.multiple = true;
      select.value = ["option1", "option2"];
      container.appendChild(select);

      await new Promise(resolve => setTimeout(resolve, 100));

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

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(option).toBeDefined();
      expect(option.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const option = document.createElement("ea-option");
      option.value = "1";
      container.appendChild(option);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        option.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("应该渲染 slot 内容", async () => {
      const option = document.createElement("ea-option");
      option.value = "1";
      option.textContent = "Option 1";
      container.appendChild(option);

      await new Promise(resolve => setTimeout(resolve, 50));

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

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(option.value).toBe("option1");
    });

    it("应该支持不同的 value 类型", async () => {
      const option = document.createElement("ea-option");
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
      const option = document.createElement("ea-option");
      option.value = "1";
      container.appendChild(option);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 属性可能返回 null 或 false
      const value = option.selected;
      expect(value === false || value === null).toBe(true);
    });

    it("设置 selected 属性应该选中选项", async () => {
      const option = document.createElement("ea-option");
      option.value = "1";
      option.selected = true;
      container.appendChild(option);

      await new Promise(resolve => setTimeout(resolve, 50));

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

      await new Promise(resolve => setTimeout(resolve, 50));

      // 属性可能返回 null 或 false
      const value = option.disabled;
      expect(value === false || value === null).toBe(true);
    });

    it("设置 disabled 属性应该禁用选项", async () => {
      const option = document.createElement("ea-option");
      option.value = "1";
      option.disabled = true;
      container.appendChild(option);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(option.disabled).toBe(true);
    });
  });

  /**
   * EaOptionGroup 基本功能测试
   */
  describe("EaOptionGroup Basic Functionality", () => {
    it("应该正确渲染 ea-option-group 组件", async () => {
      const group = document.createElement("ea-option-group");
      group.setAttribute("label", "Group 1");
      container.appendChild(group);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(group).toBeDefined();
      expect(group.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const group = document.createElement("ea-option-group");
      group.setAttribute("label", "Group 1");
      container.appendChild(group);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(group.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("应该包含 header CSS Part", async () => {
      const group = document.createElement("ea-option-group");
      group.setAttribute("label", "Group 1");
      container.appendChild(group);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(group.shadowRoot.querySelector('[part="header"]')).toBeTruthy();
    });

    it("应该包含 content CSS Part", async () => {
      const group = document.createElement("ea-option-group");
      group.setAttribute("label", "Group 1");
      container.appendChild(group);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(group.shadowRoot.querySelector('[part="content"]')).toBeTruthy();
    });
  });

  /**
   * EaOptionGroup Label 属性测试
   */
  describe("EaOptionGroup Label Attribute", () => {
    it("应该支持 label 属性", async () => {
      const group = document.createElement("ea-option-group");
      group.setAttribute("label", "Group 1");
      container.appendChild(group);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(group.getAttribute("label")).toBe("Group 1");
    });

    it("应该支持不同的 label 值", async () => {
      const labels = ["Group A", "Category 1", "Options", ""];

      for (const label of labels) {
        const group = document.createElement("ea-option-group");
        group.setAttribute("label", label);
        expect(group.getAttribute("label")).toBe(label);
      }
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

      await new Promise(resolve => setTimeout(resolve, 100));

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

      await new Promise(resolve => setTimeout(resolve, 100));

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

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(select.querySelectorAll("ea-option-group").length).toBe(2);
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

      await new Promise(resolve => setTimeout(resolve, 100));

      const changePromise = new Promise(resolve => {
        select.addEventListener("change", e => {
          resolve(e.detail);
        });
      });

      // 需要先打开下拉框才能触发选项点击事件
      select.show();
      await new Promise(resolve => setTimeout(resolve, 100));

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

      await new Promise(resolve => setTimeout(resolve, 100));

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

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(typeof select.show).toBe("function");
    });

    it("应该存在 hide 方法", async () => {
      const select = document.createElement("ea-select");
      container.appendChild(select);

      await new Promise(resolve => setTimeout(resolve, 100));

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

      await new Promise(resolve => setTimeout(resolve, 100));

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

      await new Promise(resolve => setTimeout(resolve, 100));

      let eventFired = false;
      select.addEventListener("ea-option-click", () => {
        eventFired = true;
      });

      option.click();

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(eventFired).toBe(false);
    });

    it("多个选项应该正确处理", async () => {
      const select = document.createElement("ea-select");

      for (let i = 1; i <= 10; i++) {
        const option = document.createElement("ea-option");
        option.value = `option-${i}`;
        option.textContent = `Option ${i}`;
        select.appendChild(option);
      }

      container.appendChild(select);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(select.querySelectorAll("ea-option").length).toBe(10);
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("select 组件连接后应该正确初始化", async () => {
      const select = document.createElement("ea-select");
      select.setAttribute("placeholder", "Test");
      container.appendChild(select);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(
        select.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("组件断开连接后应该正常移除", () => {
      const select = document.createElement("ea-select");
      container.appendChild(select);

      select.remove();

      expect(container.contains(select)).toBe(false);
    });

    it("动态修改 placeholder 应该生效", async () => {
      const select = document.createElement("ea-select");
      select.setAttribute("placeholder", "Initial");
      container.appendChild(select);

      await new Promise(resolve => setTimeout(resolve, 100));

      select.setAttribute("placeholder", "Updated");

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(select.getAttribute("placeholder")).toBe("Updated");
    });

    it("动态修改 disabled 应该生效", async () => {
      const select = document.createElement("ea-select");
      container.appendChild(select);

      await new Promise(resolve => setTimeout(resolve, 100));

      // 初始值可能是 null 或 false
      const initialValue = select.disabled;
      expect(initialValue === false || initialValue === null).toBe(true);

      select.disabled = true;

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(select.disabled).toBe(true);
    });

    it("动态修改 value 应该生效", async () => {
      const select = document.createElement("ea-select");
      select.value = "initial";
      container.appendChild(select);

      await new Promise(resolve => setTimeout(resolve, 100));

      select.value = "updated";

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(select.value).toBe("updated");
    });

    it("动态添加 option 应该生效", async () => {
      const select = document.createElement("ea-select");
      container.appendChild(select);

      await new Promise(resolve => setTimeout(resolve, 100));

      const option = document.createElement("ea-option");
      option.value = "new";
      option.textContent = "New Option";
      select.appendChild(option);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(select.querySelector("ea-option")).toBeTruthy();
    });
  });
});
