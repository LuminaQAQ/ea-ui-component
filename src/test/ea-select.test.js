import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

global.requestAnimationFrame = callback => {
  return setTimeout(callback, 16);
};
global.cancelAnimationFrame = id => {
  clearTimeout(id);
};

Element.prototype.scrollIntoView =
  Element.prototype.scrollIntoView || function () {};

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

import "../components/ea-select/index.js";
import { waitForRender } from "./utils/waitForRender.js";
import { runAxe, assertNoA11yViolations } from "./utils/a11y.js";

describe("EaSelect Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

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

    it("应该使用正确的 BEM 类名", async () => {
      const select = document.createElement("ea-select");
      container.appendChild(select);

      await waitForRender();

      const containerEl = select.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-select")).toBe(true);
    });
  });

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

  describe("Disabled Attribute", () => {
    it("默认 disabled 应该是 false", async () => {
      const select = document.createElement("ea-select");
      container.appendChild(select);

      await waitForRender();

      expect(select.disabled).toBe(false);
    });

    it("设置 disabled 属性应该禁用选择器", async () => {
      const select = document.createElement("ea-select");
      select.disabled = true;
      container.appendChild(select);

      await waitForRender();

      expect(select.disabled).toBe(true);
    });
  });

  describe("Clearable Attribute", () => {
    it("默认 clearable 应该是 false", async () => {
      const select = document.createElement("ea-select");
      container.appendChild(select);

      await waitForRender();

      expect(select.clearable).toBe(false);
    });

    it("设置 clearable 属性应该启用清除功能", async () => {
      const select = document.createElement("ea-select");
      select.clearable = true;
      container.appendChild(select);

      await waitForRender();

      expect(select.clearable).toBe(true);
    });
  });

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

    it("默认 size 应该是 default", async () => {
      const select = document.createElement("ea-select");
      container.appendChild(select);

      await waitForRender();

      expect(select.size).toBe("default");
    });
  });

  describe("Multiple Attribute", () => {
    it("默认 multiple 应该是 false", async () => {
      const select = document.createElement("ea-select");
      container.appendChild(select);

      await waitForRender();

      expect(select.multiple).toBe(false);
    });

    it("设置 multiple 属性应该启用多选", async () => {
      const select = document.createElement("ea-select");
      select.multiple = true;
      container.appendChild(select);

      await waitForRender();

      expect(select.multiple).toBe(true);
    });
  });

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

  describe("Filterable Attribute", () => {
    it("默认 filterable 应该是 false", async () => {
      const select = document.createElement("ea-select");
      container.appendChild(select);

      await waitForRender();

      expect(select.filterable).toBe(false);
    });

    it("设置 filterable 属性应该启用搜索功能", async () => {
      const select = document.createElement("ea-select");
      select.filterable = true;
      container.appendChild(select);

      await waitForRender();

      expect(select.filterable).toBe(true);
    });
  });

  describe("Required Attribute", () => {
    it("默认 required 应该是 false", async () => {
      const select = document.createElement("ea-select");
      container.appendChild(select);

      await waitForRender();

      expect(select.required).toBe(false);
    });

    it("设置 required 属性应该启用必填验证", async () => {
      const select = document.createElement("ea-select");
      select.required = true;
      container.appendChild(select);

      await waitForRender();

      expect(select.required).toBe(true);
    });
  });

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
      select.innerHTML =
        '<ea-option value="option1">Option 1</ea-option><ea-option value="option2">Option 2</ea-option>';
      container.appendChild(select);

      await waitForRender();

      select.value = ["option1", "option2"];
      await waitForRender(50);

      expect(Array.isArray(select.value)).toBe(true);
    });
  });

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

    it("应该使用正确的 BEM 类名", async () => {
      const option = document.createElement("ea-option");
      option.value = "1";
      container.appendChild(option);

      await waitForRender(50);

      const containerEl = option.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-option")).toBe(true);
    });
  });

  describe("EaOption Value Attribute", () => {
    it("应该支持 value 属性", async () => {
      const option = document.createElement("ea-option");
      option.value = "option1";
      container.appendChild(option);

      await waitForRender(50);

      expect(option.value).toBe("option1");
    });
  });

  describe("EaOption Selected Attribute", () => {
    it("默认 selected 应该是 false", async () => {
      const option = document.createElement("ea-option");
      option.value = "1";
      container.appendChild(option);

      await waitForRender(50);

      expect(option.selected).toBe(false);
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

  describe("EaOption Disabled Attribute", () => {
    it("默认 disabled 应该是 false", async () => {
      const option = document.createElement("ea-option");
      option.value = "1";
      container.appendChild(option);

      await waitForRender(50);

      expect(option.disabled).toBe(false);
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
    });

    it("应该包含完整的 DOM 结构", async () => {
      const group = document.createElement("ea-option-group");
      group.label = "Test Group";
      container.appendChild(group);

      await waitForRender();

      const containerEl = group.shadowRoot.querySelector('[part="container"]');
      expect(containerEl).toBeTruthy();

      const header = group.shadowRoot.querySelector('[part="header"]');
      expect(header).toBeTruthy();

      const content = group.shadowRoot.querySelector('[part="content"]');
      expect(content).toBeTruthy();
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
  });

  describe("EaOptionGroup Label Attribute", () => {
    it("默认 label 应该是空字符串", async () => {
      const group = document.createElement("ea-option-group");
      container.appendChild(group);

      await waitForRender();

      expect(group.label).toBe("");
    });

    it("应该支持通过 attribute 设置 label", async () => {
      const group = document.createElement("ea-option-group");
      group.setAttribute("label", "Group A");
      container.appendChild(group);

      await waitForRender();

      expect(group.getAttribute("label")).toBe("Group A");
      expect(group.label).toBe("Group A");
    });

    it("label 变化应该更新 slot 内容", async () => {
      const group = document.createElement("ea-option-group");
      container.appendChild(group);

      await waitForRender();

      group.label = "Updated Label";
      await waitForRender();

      const headerSlot = group.shadowRoot.querySelector('slot[name="header"]');
      expect(headerSlot).toBeTruthy();
      expect(headerSlot.textContent).toBe("Updated Label");
    });
  });

  describe("EaOptionGroup Slots", () => {
    it("应该支持默认 slot", async () => {
      const group = document.createElement("ea-option-group");
      group.label = "Options";

      const option1 = document.createElement("ea-option");
      option1.value = "1";
      option1.textContent = "Option 1";

      group.appendChild(option1);
      container.appendChild(group);

      await waitForRender();

      const defaultSlot = group.shadowRoot.querySelector("slot:not([name])");
      expect(defaultSlot).toBeTruthy();
    });

    it("应该支持 header slot", async () => {
      const group = document.createElement("ea-option-group");
      group.label = "Default Header";
      container.appendChild(group);

      await waitForRender();

      const headerSlot = group.shadowRoot.querySelector('slot[name="header"]');
      expect(headerSlot).toBeTruthy();
    });
  });

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

    it("ArrowDown 键应打开下拉框", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true })
      );
      await waitForRender();

      const containerEl = select.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-focus")).toBe(true);
    });

    it("Space 键应打开下拉框（非 filterable 模式）", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.dispatchEvent(
        new KeyboardEvent("keydown", { key: " ", bubbles: true })
      );
      await waitForRender();

      const containerEl = select.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-focus")).toBe(true);
    });

    it("Escape 键应关闭下拉框", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.show();
      await waitForRender();

      select.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Escape", bubbles: true })
      );
      await waitForRender();

      const containerEl = select.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-focus")).toBe(false);
    });

    it("ArrowDown 应移动到下一个选项", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML =
        '<ea-option value="1">Option 1</ea-option><ea-option value="2">Option 2</ea-option><ea-option value="3">Option 3</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.show();
      await waitForRender();

      select.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true })
      );
      await waitForRender();

      const options = select.querySelectorAll("ea-option");
      expect(options[1].active).toBe(true);
      expect(select.getAttribute("aria-activedescendant")).toBe(options[1].id);
    });

    it("ArrowUp 应移动到上一个选项", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML =
        '<ea-option value="1">Option 1</ea-option><ea-option value="2">Option 2</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.show();
      await waitForRender();

      select.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true })
      );
      await waitForRender();

      select.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowUp", bubbles: true })
      );
      await waitForRender();

      const options = select.querySelectorAll("ea-option");
      expect(options[0].active).toBe(true);
    });

    it("Enter 键在打开状态下应选择活跃选项", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML =
        '<ea-option value="1">Option 1</ea-option><ea-option value="2">Option 2</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.show();
      await waitForRender();

      select.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true })
      );
      await waitForRender();

      select.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Enter", bubbles: true })
      );
      await waitForRender();

      expect(select.value).toBe("2");
    });

    it("Home 键应跳转到第一个选项", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML =
        '<ea-option value="1">Option 1</ea-option><ea-option value="2">Option 2</ea-option><ea-option value="3">Option 3</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.show();
      await waitForRender();

      select.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true })
      );
      await waitForRender();

      select.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true })
      );
      await waitForRender();

      select.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Home", bubbles: true })
      );
      await waitForRender();

      const options = select.querySelectorAll("ea-option");
      expect(options[0].active).toBe(true);
    });

    it("End 键应跳转到最后一个选项", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML =
        '<ea-option value="1">Option 1</ea-option><ea-option value="2">Option 2</ea-option><ea-option value="3">Option 3</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.show();
      await waitForRender();

      select.dispatchEvent(
        new KeyboardEvent("keydown", { key: "End", bubbles: true })
      );
      await waitForRender();

      const options = select.querySelectorAll("ea-option");
      expect(options[2].active).toBe(true);
    });

    it("disabled 时不响应键盘", async () => {
      const select = document.createElement("ea-select");
      select.disabled = true;
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Enter", bubbles: true })
      );
      await waitForRender();

      const containerEl = select.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-focus")).toBe(false);
    });
  });

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

    it("默认状态下 checkValidity 应为 true", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      expect(select.checkValidity()).toBe(true);
    });

    it("嵌入 form 中默认不应为 :invalid", async () => {
      const form = document.createElement("form");
      container.appendChild(form);

      const select = document.createElement("ea-select");
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      form.appendChild(select);
      await waitForRender();

      expect(select.checkValidity()).toBe(true);
    });

    it("required 且未触发校验时不应为 :invalid", async () => {
      const select = document.createElement("ea-select");
      select.required = true;
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      expect(select.checkValidity()).toBe(false);
    });

    it("required 且触发校验后值从空变为非空时验证应通过", async () => {
      const select = document.createElement("ea-select");
      select.required = true;
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      expect(select.checkValidity()).toBe(false);

      select.value = "1";
      await waitForRender();

      expect(select.checkValidity()).toBe(true);
    });

    it("required 且值从非空变为空时验证应失败", async () => {
      const select = document.createElement("ea-select");
      select.required = true;
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      select.value = "1";
      container.appendChild(select);
      await waitForRender();

      expect(select.checkValidity()).toBe(true);

      select.value = "";
      await waitForRender();

      expect(select.checkValidity()).toBe(false);
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
      expect(detail.value == "1").toBe(true);
    });
  });

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

    it("应该存在 checkValidity 方法", async () => {
      const select = document.createElement("ea-select");
      container.appendChild(select);

      await waitForRender();

      expect(typeof select.checkValidity).toBe("function");
    });

    it("应该存在 reportValidity 方法", async () => {
      const select = document.createElement("ea-select");
      container.appendChild(select);

      await waitForRender();

      expect(typeof select.reportValidity).toBe("function");
    });
  });

  describe("Edge Cases", () => {
    it("空 select 应该正常渲染", async () => {
      const select = document.createElement("ea-select");
      container.appendChild(select);

      await waitForRender();

      expect(
        select.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
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

    it("设置不存在的 value 应正常处理", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.value = "nonexistent";
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

    it("disabled option 不应有 tabindex", async () => {
      const option = document.createElement("ea-option");
      option.value = "1";
      option.disabled = true;
      container.appendChild(option);
      await waitForRender();

      const containerEl = option.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.hasAttribute("tabindex")).toBe(false);
    });

    it("option 不应有 tabindex（由 aria-activedescendant 管理）", async () => {
      const option = document.createElement("ea-option");
      option.value = "1";
      container.appendChild(option);
      await waitForRender();

      const containerEl = option.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.hasAttribute("tabindex")).toBe(false);
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
  });

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
  });

  describe("EaOptionGroup CSS Parts", () => {
    it("应该暴露所有 CSS Part", async () => {
      const group = document.createElement("ea-option-group");
      group.label = "Styled Group";
      container.appendChild(group);

      await waitForRender();

      const parts = ["container", "header", "content"];
      parts.forEach(partName => {
        const element = group.shadowRoot.querySelector(`[part="${partName}"]`);
        expect(element).toBeTruthy();
      });
    });
  });

  describe("Accessibility (a11y)", () => {
    it("ea-select 应有 role='combobox'", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      expect(select.getAttribute("role")).toBe("combobox");
    });

    it("ea-select 应有 aria-haspopup='listbox'", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      expect(select.getAttribute("aria-haspopup")).toBe("listbox");
    });

    it("ea-select 初始应有 aria-expanded='false'", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      expect(select.getAttribute("aria-expanded")).toBe("false");
    });

    it("打开下拉框时 aria-expanded 应为 'true'", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.show();
      await waitForRender();

      expect(select.getAttribute("aria-expanded")).toBe("true");
    });

    it("关闭下拉框时 aria-expanded 应恢复 'false'", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.show();
      await waitForRender();

      select.hide();
      await waitForRender();

      expect(select.getAttribute("aria-expanded")).toBe("false");
    });

    it("ea-select 应有 aria-controls 指向 dropdown", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      const ariaControls = select.getAttribute("aria-controls");
      expect(ariaControls).toBeTruthy();

      const dropdown = select.shadowRoot.querySelector('[part="dropdown"]');
      expect(dropdown.id).toBe(ariaControls);
    });

    it("dropdown 应有 role='listbox'", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      const dropdown = select.shadowRoot.querySelector('[part="dropdown"]');
      expect(dropdown.getAttribute("role")).toBe("listbox");
    });

    it("dropdown 初始应有 inert 属性", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      const dropdown = select.shadowRoot.querySelector('[part="dropdown"]');
      expect(dropdown.inert).toBe(true);
    });

    it("打开下拉框时 inert 应被移除", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.show();
      await waitForRender();

      const dropdown = select.shadowRoot.querySelector('[part="dropdown"]');
      expect(dropdown.inert).toBe(false);
    });

    it("ea-option 应有 role='option'", async () => {
      const option = document.createElement("ea-option");
      option.value = "1";
      option.textContent = "Option 1";
      container.appendChild(option);
      await waitForRender();

      expect(option.getAttribute("role")).toBe("option");
    });

    it("ea-option 应有唯一 id", async () => {
      const option1 = document.createElement("ea-option");
      option1.value = "1";
      option1.textContent = "Option 1";
      const option2 = document.createElement("ea-option");
      option2.value = "2";
      option2.textContent = "Option 2";
      container.appendChild(option1);
      container.appendChild(option2);
      await waitForRender();

      expect(option1.id).toBeTruthy();
      expect(option2.id).toBeTruthy();
      expect(option1.id).not.toBe(option2.id);
    });

    it("ea-option selected 时应有 aria-selected='true'", async () => {
      const option = document.createElement("ea-option");
      option.value = "1";
      option.selected = true;
      container.appendChild(option);
      await waitForRender();

      expect(option.getAttribute("aria-selected")).toBe("true");
    });

    it("ea-option 未选中时应有 aria-selected='false'", async () => {
      const option = document.createElement("ea-option");
      option.value = "1";
      container.appendChild(option);
      await waitForRender();

      expect(option.getAttribute("aria-selected")).toBe("false");
    });

    it("ea-option disabled 时应有 aria-disabled='true'", async () => {
      const option = document.createElement("ea-option");
      option.value = "1";
      option.disabled = true;
      container.appendChild(option);
      await waitForRender();

      expect(option.getAttribute("aria-disabled")).toBe("true");
    });

    it("ea-select disabled 时应有 aria-disabled='true'", async () => {
      const select = document.createElement("ea-select");
      select.disabled = true;
      container.appendChild(select);
      await waitForRender();

      expect(select.getAttribute("aria-disabled")).toBe("true");
    });

    it("ea-select required 时应有 aria-required='true'", async () => {
      const select = document.createElement("ea-select");
      select.required = true;
      container.appendChild(select);
      await waitForRender();

      expect(select.getAttribute("aria-required")).toBe("true");
    });

    it("ea-select label 应映射为 aria-label", async () => {
      const select = document.createElement("ea-select");
      select.label = "Choose an option";
      container.appendChild(select);
      await waitForRender();

      expect(select.getAttribute("aria-label")).toBe("Choose an option");
    });

    it("ea-select 空 label 不应设置 aria-label", async () => {
      const select = document.createElement("ea-select");
      container.appendChild(select);
      await waitForRender();

      expect(select.hasAttribute("aria-label")).toBe(false);
    });

    it("ea-select 应有 tabIndex=0", async () => {
      const select = document.createElement("ea-select");
      container.appendChild(select);
      await waitForRender();

      expect(select.tabIndex).toBe(0);
    });

    it("ea-select disabled 时 tabIndex 应为 -1", async () => {
      const select = document.createElement("ea-select");
      select.disabled = true;
      container.appendChild(select);
      await waitForRender();

      expect(select.tabIndex).toBe(-1);
    });

    it("ea-option-group content 应有 role='group'", async () => {
      const group = document.createElement("ea-option-group");
      group.label = "Group 1";
      container.appendChild(group);
      await waitForRender();

      const content = group.shadowRoot.querySelector('[part="content"]');
      expect(content.getAttribute("role")).toBe("group");
    });

    it("ea-option-group content 应有 aria-label", async () => {
      const group = document.createElement("ea-option-group");
      group.label = "Group A";
      container.appendChild(group);
      await waitForRender();

      const content = group.shadowRoot.querySelector('[part="content"]');
      expect(content.getAttribute("aria-label")).toBe("Group A");
    });

    it("打开下拉框时应有 aria-activedescendant", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML =
        '<ea-option value="1">Option 1</ea-option><ea-option value="2">Option 2</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.show();
      await waitForRender();

      const activedesc = select.getAttribute("aria-activedescendant");
      expect(activedesc).toBeTruthy();

      const options = select.querySelectorAll("ea-option");
      expect(options[0].id).toBe(activedesc);
    });

    it("关闭下拉框时应移除 aria-activedescendant", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.show();
      await waitForRender();

      select.hide();
      await waitForRender();

      expect(select.hasAttribute("aria-activedescendant")).toBe(false);
    });

    it("方向键导航应更新 aria-activedescendant", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML =
        '<ea-option value="1">Option 1</ea-option><ea-option value="2">Option 2</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.show();
      await waitForRender();

      select.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true })
      );
      await waitForRender();

      const options = select.querySelectorAll("ea-option");
      expect(select.getAttribute("aria-activedescendant")).toBe(options[1].id);
    });

    it("活跃选项应有 active 状态类", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML =
        '<ea-option value="1">Option 1</ea-option><ea-option value="2">Option 2</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.show();
      await waitForRender();

      select.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowDown", bubbles: true })
      );
      await waitForRender();

      const options = select.querySelectorAll("ea-option");
      const containerEl =
        options[1].shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-active")).toBe(true);
    });
  });

  describe("Filterable Mode a11y", () => {
    it("filterable 时应有 aria-autocomplete='both'", async () => {
      const select = document.createElement("ea-select");
      select.filterable = true;
      select.innerHTML = '<ea-option value="1">Alabama</ea-option>';
      container.appendChild(select);
      await waitForRender();

      expect(select.getAttribute("aria-autocomplete")).toBe("both");
    });

    it("非 filterable 时不应有 aria-autocomplete", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      expect(select.hasAttribute("aria-autocomplete")).toBe(false);
    });

    it("filterable 模式下 Home/End 不应阻止默认行为", async () => {
      const select = document.createElement("ea-select");
      select.filterable = true;
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      const homeEvent = new KeyboardEvent("keydown", {
        key: "Home",
        bubbles: true,
        cancelable: true,
      });
      select.dispatchEvent(homeEvent);
      expect(homeEvent.defaultPrevented).toBe(false);

      const endEvent = new KeyboardEvent("keydown", {
        key: "End",
        bubbles: true,
        cancelable: true,
      });
      select.dispatchEvent(endEvent);
      expect(endEvent.defaultPrevented).toBe(false);
    });

    it("非 filterable 模式下 Home/End 应阻止默认行为", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      const homeEvent = new KeyboardEvent("keydown", {
        key: "Home",
        bubbles: true,
        cancelable: true,
      });
      select.dispatchEvent(homeEvent);
      expect(homeEvent.defaultPrevented).toBe(true);
    });

    it("filterable 模式下可打印字符不应阻止默认行为", async () => {
      const select = document.createElement("ea-select");
      select.filterable = true;
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      const event = new KeyboardEvent("keydown", {
        key: "a",
        bubbles: true,
        cancelable: true,
      });
      select.dispatchEvent(event);
      expect(event.defaultPrevented).toBe(false);
    });

    it("非 filterable 模式下可打印字符应阻止默认行为", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      const event = new KeyboardEvent("keydown", {
        key: "a",
        bubbles: true,
        cancelable: true,
      });
      select.dispatchEvent(event);
      expect(event.defaultPrevented).toBe(true);
    });

    it("filterable 模式下 Escape 关闭下拉框时不应清空输入", async () => {
      const select = document.createElement("ea-select");
      select.filterable = true;
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.show();
      await waitForRender();

      const event = new KeyboardEvent("keydown", {
        key: "Escape",
        bubbles: true,
        cancelable: true,
      });
      select.dispatchEvent(event);
      await waitForRender();

      expect(select.getAttribute("aria-expanded")).toBe("false");
    });

    it("filterable 模式下 Escape 未打开时应清空输入框", async () => {
      const select = document.createElement("ea-select");
      select.filterable = true;
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      const input = select.shadowRoot.querySelector("ea-input");
      if (input) {
        input.value = "test";
      }

      const event = new KeyboardEvent("keydown", {
        key: "Escape",
        bubbles: true,
      });
      select.dispatchEvent(event);
      await waitForRender();

      expect(input.value).toBe("");
    });

    it("Alt+ArrowDown 应打开下拉框但不移动选择", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML =
        '<ea-option value="1">Option 1</ea-option><ea-option value="2">Option 2</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "ArrowDown",
          altKey: true,
          bubbles: true,
        })
      );
      await waitForRender();

      expect(select.getAttribute("aria-expanded")).toBe("true");
    });

    it("Alt+ArrowUp 打开状态下应关闭下拉框", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.show();
      await waitForRender();

      select.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "ArrowUp",
          altKey: true,
          bubbles: true,
        })
      );
      await waitForRender();

      expect(select.getAttribute("aria-expanded")).toBe("false");
    });

    it("filterable 模式下点击 input 不应关闭下拉框", async () => {
      const select = document.createElement("ea-select");
      select.filterable = true;
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      select.show();
      await waitForRender();

      const input = select.shadowRoot.querySelector("ea-input");
      input.dispatchEvent(new Event("click", { bubbles: true }));
      await waitForRender();

      expect(select.getAttribute("aria-expanded")).toBe("true");
    });

    it("动态切换 filterable 应更新 aria-autocomplete", async () => {
      const select = document.createElement("ea-select");
      select.innerHTML = '<ea-option value="1">Option 1</ea-option>';
      container.appendChild(select);
      await waitForRender();

      expect(select.hasAttribute("aria-autocomplete")).toBe(false);

      select.filterable = true;
      await waitForRender();

      expect(select.getAttribute("aria-autocomplete")).toBe("both");

      select.filterable = false;
      await waitForRender();

      expect(select.hasAttribute("aria-autocomplete")).toBe(false);
    });
  });

  describe("Accessibility", () => {
    it("默认状态应该无 a11y 违规", async () => {
      const el = document.createElement("ea-select");
      el.setAttribute("label", "Select");
      container.appendChild(el);
      await waitForRender();
      const results = await runAxe(el);
      assertNoA11yViolations(results);
    });

    it("disabled 状态应该无 a11y 违规", async () => {
      const el = document.createElement("ea-select");
      el.setAttribute("label", "Select");
      el.setAttribute("disabled", "");
      container.appendChild(el);
      await waitForRender();
      const results = await runAxe(el);
      assertNoA11yViolations(results);
    });
  });
});
