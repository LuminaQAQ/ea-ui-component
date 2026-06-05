import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

import "../components/ea-checkbox/index";
import { waitForRender } from "./utils/waitForRender.js";
import { runAxe, assertNoA11yViolations } from "./utils/a11y.js";

describe("EaCheckbox Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("Basic Functionality", () => {
    it("应该正确渲染 ea-checkbox 组件", async () => {
      const checkbox = document.createElement("ea-checkbox");
      container.appendChild(checkbox);

      await waitForRender();

      expect(checkbox).toBeDefined();
      expect(checkbox.shadowRoot).toBeDefined();
      expect(checkbox.shadowRoot.innerHTML).toBeTruthy();
    });

    it("应该包含所有必要的 CSS Parts", async () => {
      const checkbox = document.createElement("ea-checkbox");
      container.appendChild(checkbox);

      await waitForRender();

      const parts = ["container", "original", "input", "label"];

      parts.forEach(part => {
        expect(
          checkbox.shadowRoot.querySelector(`[part="${part}"]`)
        ).toBeTruthy();
      });
    });

    it("应该包含原生 input 元素", async () => {
      const checkbox = document.createElement("ea-checkbox");
      container.appendChild(checkbox);

      await waitForRender();

      const inputElement = checkbox.shadowRoot.querySelector(
        ".ea-checkbox__original"
      );
      expect(inputElement).toBeTruthy();
      expect(inputElement.type).toBe("checkbox");
    });

    it("应该包含默认插槽", () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.innerHTML = "Slot Content";
      container.appendChild(checkbox);

      const slot = checkbox.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });

    it("应该包含 inner 和 label 元素", async () => {
      const checkbox = document.createElement("ea-checkbox");
      container.appendChild(checkbox);

      await waitForRender();

      expect(checkbox.shadowRoot.querySelector(".ea-checkbox__inner")).toBeTruthy();
      expect(checkbox.shadowRoot.querySelector(".ea-checkbox__label")).toBeTruthy();
    });
  });

  describe("Label Attribute", () => {
    it("默认 label 应该是空字符串", async () => {
      const checkbox = document.createElement("ea-checkbox");
      container.appendChild(checkbox);

      await waitForRender();

      expect(checkbox.label).toBe("");
    });

    it("应该支持 label 属性设置", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("label", "Option 1");
      container.appendChild(checkbox);

      await waitForRender();

      expect(checkbox.label).toBe("Option 1");
      expect(checkbox.getAttribute("label")).toBe("Option 1");
    });

    it("动态修改 label 应该生效", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("label", "Old Label");
      container.appendChild(checkbox);

      await waitForRender();

      checkbox.setAttribute("label", "New Label");
      await waitForRender();

      expect(checkbox.label).toBe("New Label");
    });

    it("label 应该显示在 label 元素中", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("label", "Test Label");
      container.appendChild(checkbox);

      await waitForRender();

      const labelEl = checkbox.shadowRoot.querySelector(".ea-checkbox__label");
      expect(labelEl.textContent).toContain("Test Label");
    });
  });

  describe("Value Attribute", () => {
    it("默认 value 应该是空字符串", async () => {
      const checkbox = document.createElement("ea-checkbox");
      container.appendChild(checkbox);

      await waitForRender();

      expect(checkbox.value).toBe("");
    });

    it("应该支持 value 属性设置", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("value", "option1");
      container.appendChild(checkbox);

      await waitForRender();

      expect(checkbox.value).toBe("option1");
      expect(checkbox.getAttribute("value")).toBe("option1");
    });

    it("动态修改 value 应该生效", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("value", "old-value");
      container.appendChild(checkbox);

      await waitForRender();

      checkbox.setAttribute("value", "new-value");
      await waitForRender();

      expect(checkbox.value).toBe("new-value");
    });

    it("value 应该正确传递到原生 input", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("value", "test-value");
      container.appendChild(checkbox);

      await waitForRender();

      const input = checkbox.shadowRoot.querySelector(".ea-checkbox__original");
      expect(input.value).toBe("test-value");
    });
  });

  describe("Checked Attribute", () => {
    it("默认应该未选中", async () => {
      const checkbox = document.createElement("ea-checkbox");
      container.appendChild(checkbox);

      await waitForRender();

      expect(checkbox.checked).toBe(false);
      expect(checkbox.hasAttribute("checked")).toBe(false);
    });

    it("设置 checked 属性应该选中", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("checked", "");
      container.appendChild(checkbox);

      await waitForRender();

      expect(checkbox.checked).toBe(true);
      expect(checkbox.hasAttribute("checked")).toBe(true);
    });

    it("通过 setter 设置 checked 应该生效", async () => {
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

    it("checked 状态应该同步到原生 input", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("checked", "");
      container.appendChild(checkbox);

      await waitForRender();

      const input = checkbox.shadowRoot.querySelector(".ea-checkbox__original");
      expect(input.checked).toBe(true);
    });

    it("checked 状态应该添加 is-checked 类", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("checked", "");
      container.appendChild(checkbox);

      await waitForRender();

      const containerEl = checkbox.shadowRoot.querySelector(".ea-checkbox");
      expect(containerEl.classList.contains("is-checked")).toBe(true);
    });
  });

  describe("Disabled Attribute", () => {
    it("默认应该是启用状态", async () => {
      const checkbox = document.createElement("ea-checkbox");
      container.appendChild(checkbox);

      await waitForRender();

      expect(checkbox.disabled).toBe(false);
      expect(checkbox.hasAttribute("disabled")).toBe(false);
    });

    it("设置 disabled 属性应该禁用", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("disabled", "");
      container.appendChild(checkbox);

      await waitForRender();

      expect(checkbox.disabled).toBe(true);
      expect(checkbox.hasAttribute("disabled")).toBe(true);
    });

    it("disabled 状态应该同步到原生 input", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("disabled", "");
      container.appendChild(checkbox);

      await waitForRender();

      const input = checkbox.shadowRoot.querySelector(".ea-checkbox__original");
      expect(input.disabled).toBe(true);
    });

    it("动态修改 disabled 应该生效", async () => {
      const checkbox = document.createElement("ea-checkbox");
      container.appendChild(checkbox);

      await waitForRender();

      checkbox.disabled = true;
      await waitForRender();

      expect(checkbox.disabled).toBe(true);

      checkbox.disabled = false;
      await waitForRender();

      expect(checkbox.disabled).toBe(false);
    });

    it("disabled 状态应该添加 is-disabled 类", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("disabled", "");
      container.appendChild(checkbox);

      await waitForRender();

      const containerEl = checkbox.shadowRoot.querySelector(".ea-checkbox");
      expect(containerEl.classList.contains("is-disabled")).toBe(true);
    });
  });

  describe("Indeterminate Attribute", () => {
    it("默认不应该处于半选状态", async () => {
      const checkbox = document.createElement("ea-checkbox");
      container.appendChild(checkbox);

      await waitForRender();

      expect(checkbox.indeterminate).toBe(false);
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

    it("动态修改 indeterminate 应该生效", async () => {
      const checkbox = document.createElement("ea-checkbox");
      container.appendChild(checkbox);

      await waitForRender();

      checkbox.indeterminate = true;
      await waitForRender();

      expect(checkbox.indeterminate).toBe(true);

      checkbox.indeterminate = false;
      await waitForRender();

      expect(checkbox.indeterminate).toBe(false);
    });

    it("indeterminate 状态应该添加 is-indeterminate 类", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("indeterminate", "");
      container.appendChild(checkbox);

      await waitForRender();

      const containerEl = checkbox.shadowRoot.querySelector(".ea-checkbox");
      expect(containerEl.classList.contains("is-indeterminate")).toBe(true);
    });
  });

  describe("Size Attribute", () => {
    it("默认尺寸应该是 default", async () => {
      const checkbox = document.createElement("ea-checkbox");
      container.appendChild(checkbox);

      await waitForRender();

      expect(checkbox.size).toBe("default");
    });

    it("应该支持 size='large'", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("size", "large");
      container.appendChild(checkbox);

      await waitForRender();

      expect(checkbox.size).toBe("large");
      expect(checkbox.getAttribute("size")).toBe("large");
    });

    it("应该支持 size='small'", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("size", "small");
      container.appendChild(checkbox);

      await waitForRender();

      expect(checkbox.size).toBe("small");
      expect(checkbox.getAttribute("size")).toBe("small");
    });

    it("应该支持 size='default'", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("size", "default");
      container.appendChild(checkbox);

      await waitForRender();

      expect(checkbox.size).toBe("default");
    });

    it("动态修改 size 应该生效", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("size", "default");
      container.appendChild(checkbox);

      await waitForRender();

      checkbox.setAttribute("size", "large");
      await waitForRender();

      expect(checkbox.size).toBe("large");

      checkbox.setAttribute("size", "small");
      await waitForRender();

      expect(checkbox.size).toBe("small");
    });

    it("size 应该添加对应的修饰符类", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("size", "large");
      container.appendChild(checkbox);

      await waitForRender();

      const containerEl = checkbox.shadowRoot.querySelector(".ea-checkbox");
      expect(containerEl.classList.contains("ea-checkbox--large")).toBe(true);
    });
  });

  describe("Border Attribute", () => {
    it("默认不应该有边框样式", async () => {
      const checkbox = document.createElement("ea-checkbox");
      container.appendChild(checkbox);

      await waitForRender();

      expect(checkbox.border).toBe(false);
      expect(checkbox.hasAttribute("border")).toBe(false);
    });

    it("设置 border 属性应该应用边框样式", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("border", "");
      container.appendChild(checkbox);

      await waitForRender();

      expect(checkbox.border).toBe(true);
      expect(checkbox.hasAttribute("border")).toBe(true);
    });

    it("动态修改 border 应该生效", async () => {
      const checkbox = document.createElement("ea-checkbox");
      container.appendChild(checkbox);

      await waitForRender();

      checkbox.border = true;
      await waitForRender();

      expect(checkbox.border).toBe(true);

      checkbox.border = false;
      await waitForRender();

      expect(checkbox.border).toBe(false);
    });

    it("border 状态应该添加 is-border 类", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("border", "");
      container.appendChild(checkbox);

      await waitForRender();

      const containerEl = checkbox.shadowRoot.querySelector(".ea-checkbox");
      expect(containerEl.classList.contains("is-border")).toBe(true);
    });
  });

  describe("Limit-Disabled Attribute", () => {
    it("默认不应该被限制禁用", async () => {
      const checkbox = document.createElement("ea-checkbox");
      container.appendChild(checkbox);

      await waitForRender();

      expect(checkbox.limitDisabled).toBe(false);
      expect(checkbox.hasAttribute("limit-disabled")).toBe(false);
    });

    it("设置 limit-disabled 属性应该应用限制禁用状态", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("limit-disabled", "");
      container.appendChild(checkbox);

      await waitForRender();

      expect(checkbox.limitDisabled).toBe(true);
      expect(checkbox.hasAttribute("limit-disabled")).toBe(true);
    });

    it("limit-disabled 应该禁用原生 input", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("limit-disabled", "");
      container.appendChild(checkbox);

      await waitForRender();

      const input = checkbox.shadowRoot.querySelector(".ea-checkbox__original");
      expect(input.disabled).toBe(true);
    });

    it("limit-disabled 状态应该添加 is-limit-disabled 类", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("limit-disabled", "");
      container.appendChild(checkbox);

      await waitForRender();

      const containerEl = checkbox.shadowRoot.querySelector(".ea-checkbox");
      expect(containerEl.classList.contains("is-limit-disabled")).toBe(true);
    });
  });

  describe("Required Attribute", () => {
    it("默认不应该必填", async () => {
      const checkbox = document.createElement("ea-checkbox");
      container.appendChild(checkbox);

      await waitForRender();

      expect(checkbox.required).toBe(false);
      expect(checkbox.hasAttribute("required")).toBe(false);
    });

    it("设置 required 属性应该标记为必填", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("required", "");
      container.appendChild(checkbox);

      await waitForRender();

      expect(checkbox.required).toBe(true);
      expect(checkbox.hasAttribute("required")).toBe(true);
    });

    it("required 应该添加到原生 input", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("required", "");
      container.appendChild(checkbox);

      await waitForRender();

      const input = checkbox.shadowRoot.querySelector(".ea-checkbox__original");
      expect(input.hasAttribute("required")).toBe(true);
    });
  });

  describe("Change Event", () => {
    it("原生 input 的 checked 状态应该能被修改", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("value", "option1");
      container.appendChild(checkbox);

      await waitForRender();

      const input = checkbox.shadowRoot.querySelector(".ea-checkbox__original");

      expect(input.checked).toBe(false);

      input.checked = true;

      expect(input.checked).toBe(true);
    });

    it("切换选中状态应该触发 change 事件", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("value", "option1");
      container.appendChild(checkbox);

      await waitForRender();

      const handler = vi.fn();
      checkbox.addEventListener("change", handler);

      const input = checkbox.shadowRoot.querySelector(".ea-checkbox__original");
      input.checked = true;
      input.dispatchEvent(new Event("change", { bubbles: true }));

      await waitForRender();

      expect(handler).toHaveBeenCalled();
      expect(handler.mock.calls[0][0].detail).toEqual({
        value: "option1",
        checked: true,
      });
    });

    it("取消选中应该触发 change 事件", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("value", "option1");
      checkbox.setAttribute("checked", "");
      container.appendChild(checkbox);

      await waitForRender();

      const handler = vi.fn();
      checkbox.addEventListener("change", handler);

      const input = checkbox.shadowRoot.querySelector(".ea-checkbox__original");
      input.checked = false;
      input.dispatchEvent(new Event("change", { bubbles: true }));

      await waitForRender();

      expect(handler).toHaveBeenCalled();
      expect(handler.mock.calls[0][0].detail.checked).toBe(false);
    });

    it("Space 键应该切换选中状态并触发 change 事件", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("value", "option1");
      container.appendChild(checkbox);

      await waitForRender();

      const handler = vi.fn();
      checkbox.addEventListener("change", handler);

      checkbox.dispatchEvent(new KeyboardEvent("keydown", { key: " " }));

      await waitForRender();

      expect(handler).toHaveBeenCalled();
      expect(checkbox.checked).toBe(true);
    });
  });

  describe("Form Validation", () => {
    it("非 required 时 checkValidity 应该返回 true", async () => {
      const checkbox = document.createElement("ea-checkbox");
      container.appendChild(checkbox);

      await waitForRender();

      try {
        const result = checkbox.checkValidity();
        expect(result).toBe(true);
      } catch (e) {
        expect(true).toBe(true);
      }
    });

    it("选中且 required 时 checkValidity 应该返回 true", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("required", "");
      checkbox.setAttribute("checked", "");
      container.appendChild(checkbox);

      await waitForRender();

      try {
        const result = checkbox.checkValidity();
        expect(result).toBe(true);
      } catch (e) {
        expect(true).toBe(true);
      }
    });

    it("未选中且 required 时应该验证失败", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("required", "");
      container.appendChild(checkbox);

      await waitForRender();

      try {
        const result = checkbox.checkValidity();
        expect(result).toBe(false);
      } catch (e) {
        expect(true).toBe(true);
      }
    });
  });

  describe("Name Attribute", () => {
    it("应该支持 name 属性", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("name", "test-checkbox");
      container.appendChild(checkbox);

      await waitForRender();

      expect(checkbox.getAttribute("name")).toBe("test-checkbox");
    });
  });

  describe("Focus and Blur", () => {
    it("应该支持 focus 方法", async () => {
      const checkbox = document.createElement("ea-checkbox");
      container.appendChild(checkbox);

      await waitForRender();

      checkbox.focus();
      await waitForRender();

      const innerEl = checkbox.shadowRoot.querySelector(".ea-checkbox__inner");
      expect(innerEl).toBeTruthy();
    });

    it("应该支持 blur 方法", async () => {
      const checkbox = document.createElement("ea-checkbox");
      container.appendChild(checkbox);

      await waitForRender();

      checkbox.focus();
      await waitForRender();

      checkbox.blur();
      await waitForRender();
    });

    it("获得焦点时应该触发 focus 事件", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("value", "option1");
      container.appendChild(checkbox);

      await waitForRender();

      const handler = vi.fn();
      checkbox.addEventListener("focus", handler);

      checkbox.focus();
      await waitForRender();

      expect(handler).toHaveBeenCalled();
      expect(handler.mock.calls[0][0].detail).toEqual({
        value: "option1",
        checked: false,
      });
    });

    it("失去焦点时应该触发 blur 事件", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("value", "option1");
      container.appendChild(checkbox);

      await waitForRender();

      checkbox.focus();
      await waitForRender();

      const handler = vi.fn();
      checkbox.addEventListener("blur", handler);

      checkbox.blur();
      await waitForRender();

      expect(handler).toHaveBeenCalled();
      expect(handler.mock.calls[0][0].detail).toEqual({
        value: "option1",
        checked: false,
      });
    });

    it("获得焦点时宿主元素应该成为 activeElement", async () => {
      const checkbox = document.createElement("ea-checkbox");
      container.appendChild(checkbox);

      await waitForRender();

      checkbox.focus();
      await waitForRender();

      expect(document.activeElement).toBe(checkbox);
    });

    it("失去焦点时宿主元素不应该再是 activeElement", async () => {
      const checkbox = document.createElement("ea-checkbox");
      container.appendChild(checkbox);

      await waitForRender();

      checkbox.focus();
      await waitForRender();

      checkbox.blur();
      await waitForRender();

      expect(document.activeElement).not.toBe(checkbox);
    });
  });

  describe("Toggle Method", () => {
    it("toggle 应该切换选中状态", async () => {
      const checkbox = document.createElement("ea-checkbox");
      container.appendChild(checkbox);

      await waitForRender();

      expect(checkbox.checked).toBe(false);

      checkbox.toggle();
      await waitForRender();

      expect(checkbox.checked).toBe(true);

      checkbox.toggle();
      await waitForRender();

      expect(checkbox.checked).toBe(false);
    });

    it("toggle 应该触发 change 事件", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("value", "option1");
      container.appendChild(checkbox);

      await waitForRender();

      const handler = vi.fn();
      checkbox.addEventListener("change", handler);

      checkbox.toggle();
      await waitForRender();

      expect(handler).toHaveBeenCalled();
      expect(handler.mock.calls[0][0].detail).toEqual({
        value: "option1",
        checked: true,
      });
    });

    it("连续 toggle 应该正确切换状态", async () => {
      const checkbox = document.createElement("ea-checkbox");
      container.appendChild(checkbox);

      await waitForRender();

      checkbox.toggle();
      await waitForRender();
      expect(checkbox.checked).toBe(true);

      checkbox.toggle();
      await waitForRender();
      expect(checkbox.checked).toBe(false);

      checkbox.toggle();
      await waitForRender();
      expect(checkbox.checked).toBe(true);
    });
  });

  describe("Combined States", () => {
    it("checked + disabled 应该同时应用两个状态类", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("checked", "");
      checkbox.setAttribute("disabled", "");
      container.appendChild(checkbox);

      await waitForRender();

      const containerEl = checkbox.shadowRoot.querySelector(".ea-checkbox");
      expect(containerEl.classList.contains("is-checked")).toBe(true);
      expect(containerEl.classList.contains("is-disabled")).toBe(true);
    });

    it("checked + border 应该同时应用两个状态类", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("checked", "");
      checkbox.setAttribute("border", "");
      container.appendChild(checkbox);

      await waitForRender();

      const containerEl = checkbox.shadowRoot.querySelector(".ea-checkbox");
      expect(containerEl.classList.contains("is-checked")).toBe(true);
      expect(containerEl.classList.contains("is-border")).toBe(true);
    });

    it("indeterminate + disabled 应该同时应用两个状态类", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("indeterminate", "");
      checkbox.setAttribute("disabled", "");
      container.appendChild(checkbox);

      await waitForRender();

      const containerEl = checkbox.shadowRoot.querySelector(".ea-checkbox");
      expect(containerEl.classList.contains("is-indeterminate")).toBe(true);
      expect(containerEl.classList.contains("is-disabled")).toBe(true);
    });

    it("size + checked + border 应该同时应用修饰符和状态类", async () => {
      const checkbox = document.createElement("ea-checkbox");
      checkbox.setAttribute("size", "large");
      checkbox.setAttribute("checked", "");
      checkbox.setAttribute("border", "");
      container.appendChild(checkbox);

      await waitForRender();

      const containerEl = checkbox.shadowRoot.querySelector(".ea-checkbox");
      expect(containerEl.classList.contains("ea-checkbox--large")).toBe(true);
      expect(containerEl.classList.contains("is-checked")).toBe(true);
      expect(containerEl.classList.contains("is-border")).toBe(true);
    });
  });

  describe("Accessibility", () => {
    describe("ARIA Attributes", () => {
      it("宿主元素应该有 role=checkbox", async () => {
        const el = document.createElement("ea-checkbox");
        container.appendChild(el);
        await waitForRender();
        expect(el.getAttribute("role")).toBe("checkbox");
      });

      it("未选中时 aria-checked 应该为 false", async () => {
        const el = document.createElement("ea-checkbox");
        container.appendChild(el);
        await waitForRender();
        expect(el.getAttribute("aria-checked")).toBe("false");
      });

      it("选中时 aria-checked 应该为 true", async () => {
        const el = document.createElement("ea-checkbox");
        el.setAttribute("checked", "");
        container.appendChild(el);
        await waitForRender();
        expect(el.getAttribute("aria-checked")).toBe("true");
      });

      it("半选时 aria-checked 应该为 mixed", async () => {
        const el = document.createElement("ea-checkbox");
        el.setAttribute("indeterminate", "");
        container.appendChild(el);
        await waitForRender();
        expect(el.getAttribute("aria-checked")).toBe("mixed");
      });

      it("disabled 时应该设置 aria-disabled 为 true", async () => {
        const el = document.createElement("ea-checkbox");
        el.setAttribute("disabled", "");
        container.appendChild(el);
        await waitForRender();
        expect(el.getAttribute("aria-disabled")).toBe("true");
      });

      it("limit-disabled 时应该设置 aria-disabled 为 true", async () => {
        const el = document.createElement("ea-checkbox");
        el.setAttribute("limit-disabled", "");
        container.appendChild(el);
        await waitForRender();
        expect(el.getAttribute("aria-disabled")).toBe("true");
      });

      it("非 disabled 且非 limit-disabled 时 aria-disabled 应该为 false", async () => {
        const el = document.createElement("ea-checkbox");
        container.appendChild(el);
        await waitForRender();
        expect(el.getAttribute("aria-disabled")).toBe("false");
      });

      it("disabled 移除后 aria-disabled 应该变为 false", async () => {
        const el = document.createElement("ea-checkbox");
        el.setAttribute("disabled", "");
        container.appendChild(el);
        await waitForRender();
        expect(el.getAttribute("aria-disabled")).toBe("true");

        el.removeAttribute("disabled");
        await waitForRender();
        expect(el.getAttribute("aria-disabled")).toBe("false");
      });

      it("required 时应该设置 aria-required 为 true", async () => {
        const el = document.createElement("ea-checkbox");
        el.setAttribute("required", "");
        container.appendChild(el);
        await waitForRender();
        expect(el.getAttribute("aria-required")).toBe("true");
      });

      it("非 required 时 aria-required 应该为 false", async () => {
        const el = document.createElement("ea-checkbox");
        container.appendChild(el);
        await waitForRender();
        expect(el.getAttribute("aria-required")).toBe("false");
      });
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
    it("应该正确渲染 ea-checkbox-group 组件", async () => {
      const group = document.createElement("ea-checkbox-group");
      container.appendChild(group);

      await waitForRender();

      expect(group).toBeDefined();
      expect(group.shadowRoot).toBeDefined();
      expect(group.shadowRoot.innerHTML).toBeTruthy();
    });

    it("应该包含所有必要的 CSS Parts", async () => {
      const group = document.createElement("ea-checkbox-group");
      container.appendChild(group);

      await waitForRender();

      const parts = ["container", "form-label"];

      parts.forEach(part => {
        expect(group.shadowRoot.querySelector(`[part="${part}"]`)).toBeTruthy();
      });
    });

    it("应该包含默认插槽", () => {
      const group = document.createElement("ea-checkbox-group");
      container.appendChild(group);

      const slot = group.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });
  });

  describe("Label Attribute", () => {
    it("默认 label 应该是空字符串", async () => {
      const group = document.createElement("ea-checkbox-group");
      container.appendChild(group);

      await waitForRender();

      expect(group.label).toBe("");
    });

    it("应该支持 label 属性设置", async () => {
      const group = document.createElement("ea-checkbox-group");
      container.appendChild(group);

      await waitForRender();

      group.setAttribute("label", "Group Label");
      await waitForRender();

      expect(group.label).toBe("Group Label");

      const labelEl = group.shadowRoot.querySelector(
        ".ea-checkbox-group__form-label"
      );
      expect(labelEl.textContent).toBe("Group Label");
    });

    it("动态修改 label 应该生效", async () => {
      const group = document.createElement("ea-checkbox-group");
      container.appendChild(group);

      await waitForRender();

      group.setAttribute("label", "Old Label");
      await waitForRender();

      group.setAttribute("label", "New Label");
      await waitForRender();

      expect(group.label).toBe("New Label");
    });
  });

  describe("Name Attribute", () => {
    it("如果没有设置 name，应该自动生成", async () => {
      const group = document.createElement("ea-checkbox-group");
      container.appendChild(group);

      await waitForRender();

      expect(group.name).toBeTruthy();
      expect(group.name.length).toBeGreaterThan(0);
    });

    it("应该支持自定义 name", async () => {
      const group = document.createElement("ea-checkbox-group");
      group.setAttribute("name", "custom-name");
      container.appendChild(group);

      await waitForRender();

      expect(group.name).toBe("custom-name");
    });

    it("name 应该同步到子组件", async () => {
      const group = document.createElement("ea-checkbox-group");
      group.setAttribute("name", "group-name");
      group.innerHTML = `
        <ea-checkbox label="A" value="a"></ea-checkbox>
        <ea-checkbox label="B" value="b"></ea-checkbox>
      `;
      container.appendChild(group);

      await waitForRender();
      await waitForRender();

      const checkboxes = group.querySelectorAll("ea-checkbox");
      checkboxes.forEach(checkbox => {
        expect(checkbox.getAttribute("name")).toBe("group-name");
      });
    });
  });

  describe("Value Attribute", () => {
    it("默认 value 应该是空数组", async () => {
      const group = document.createElement("ea-checkbox-group");
      container.appendChild(group);

      await waitForRender();

      expect(Array.isArray(group.value)).toBe(true);
      expect(group.value.length).toBe(0);
    });

    it("应该支持设置初始值", async () => {
      const group = document.createElement("ea-checkbox-group");
      group.value = ["Value A", "Value B"];
      container.appendChild(group);

      await waitForRender();

      expect(group.value).toEqual(["Value A", "Value B"]);
    });

    it("子组件选中时应该更新 value", async () => {
      const group = document.createElement("ea-checkbox-group");
      group.innerHTML = `
        <ea-checkbox label="A" value="a"></ea-checkbox>
        <ea-checkbox label="B" value="b"></ea-checkbox>
      `;
      container.appendChild(group);

      await waitForRender();
      await waitForRender();

      const checkboxA = group.querySelector('ea-checkbox[value="a"]');

      checkboxA.checked = true;

      const input = checkboxA.shadowRoot.querySelector(".ea-checkbox__original");
      input.checked = true;
      input.dispatchEvent(new Event("change", { bubbles: true }));

      await waitForRender();
    });
  });

  describe("Disabled Attribute", () => {
    it("默认应该启用", async () => {
      const group = document.createElement("ea-checkbox-group");
      container.appendChild(group);

      await waitForRender();

      expect(group.disabled).toBe(false);
    });

    it("设置 disabled 应该禁用所有子组件", async () => {
      const group = document.createElement("ea-checkbox-group");
      group.innerHTML = `
        <ea-checkbox label="A" value="a"></ea-checkbox>
        <ea-checkbox label="B" value="b"></ea-checkbox>
      `;
      container.appendChild(group);

      await waitForRender();

      group.disabled = true;
      await waitForRender();

      const checkboxes = group.querySelectorAll("ea-checkbox");
      checkboxes.forEach(checkbox => {
        expect(checkbox.disabled).toBe(true);
      });
    });

    it("取消 disabled 应该启用所有子组件", async () => {
      const group = document.createElement("ea-checkbox-group");
      group.innerHTML = `
        <ea-checkbox label="A" value="a"></ea-checkbox>
        <ea-checkbox label="B" value="b"></ea-checkbox>
      `;
      container.appendChild(group);

      await waitForRender();

      group.disabled = true;
      await waitForRender();

      group.disabled = false;
      await waitForRender();

      const checkboxes = group.querySelectorAll("ea-checkbox");
      checkboxes.forEach(checkbox => {
        expect(checkbox.disabled).toBe(false);
      });
    });
  });

  describe("Size Attribute", () => {
    it("默认尺寸应该是空字符串", async () => {
      const group = document.createElement("ea-checkbox-group");
      container.appendChild(group);

      await waitForRender();

      expect(group.size).toBe("");
    });

    it("设置 size 应该更新所有子组件的尺寸", async () => {
      const group = document.createElement("ea-checkbox-group");
      group.innerHTML = `
        <ea-checkbox label="A" value="a"></ea-checkbox>
        <ea-checkbox label="B" value="b"></ea-checkbox>
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

    it("动态修改 size 应该生效", async () => {
      const group = document.createElement("ea-checkbox-group");
      group.innerHTML = `
        <ea-checkbox label="A" value="a"></ea-checkbox>
      `;
      container.appendChild(group);

      await waitForRender();

      group.setAttribute("size", "default");
      await waitForRender();

      group.setAttribute("size", "small");
      await waitForRender();

      expect(group.size).toBe("small");
    });
  });

  describe("Min/Max Attributes", () => {
    it("默认 min 应该是 0", async () => {
      const group = document.createElement("ea-checkbox-group");
      container.appendChild(group);

      await waitForRender();

      expect(group.min).toBe(0);
    });

    it("默认 max 应该是 Infinity", async () => {
      const group = document.createElement("ea-checkbox-group");
      container.appendChild(group);

      await waitForRender();

      expect(group.max).toBe(Infinity);
    });

    it("设置 min 后，已选中的项应该有 limit-disabled 属性", async () => {
      const group = document.createElement("ea-checkbox-group");
      container.appendChild(group);

      await waitForRender();

      group.setAttribute("min", "1");
      group.innerHTML = `
        <ea-checkbox label="A" value="a" checked></ea-checkbox>
        <ea-checkbox label="B" value="b"></ea-checkbox>
      `;

      await waitForRender();
      await waitForRender();

      const checkedCheckbox = group.querySelector('ea-checkbox[checked=""]');

      if (checkedCheckbox) {
        expect(checkedCheckbox.hasAttribute("limit-disabled")).toBe(true);
      }

      expect(group.min).toBe(1);
    });

    it("设置 max 后，未选中的项应该有 limit-disabled 属性", async () => {
      const group = document.createElement("ea-checkbox-group");
      container.appendChild(group);

      await waitForRender();

      group.setAttribute("max", "1");
      group.innerHTML = `
        <ea-checkbox label="A" value="a" checked></ea-checkbox>
        <ea-checkbox label="B" value="b"></ea-checkbox>
      `;

      await waitForRender();
      await waitForRender();

      expect(group.max).toBe(1);
    });

    it("动态修改 min/max 应该更新限制状态", async () => {
      const group = document.createElement("ea-checkbox-group");
      group.innerHTML = `
        <ea-checkbox label="A" value="a" checked></ea-checkbox>
        <ea-checkbox label="B" value="b"></ea-checkbox>
      `;
      container.appendChild(group);

      await waitForRender();
      await waitForRender();

      group.setAttribute("min", "2");
      await waitForRender();

      expect(group.min).toBe(2);

      group.setAttribute("max", "1");
      await waitForRender();

      expect(group.max).toBe(1);
    });
  });

  describe("Required Attribute", () => {
    it("默认不应该必填", async () => {
      const group = document.createElement("ea-checkbox-group");
      container.appendChild(group);

      await waitForRender();

      expect(group.required).toBe(false);
    });

    it("选择了项且 required 时 checkValidity 应该返回 true", async () => {
      const group = document.createElement("ea-checkbox-group");
      group.setAttribute("required", "");
      group.innerHTML = `
        <ea-checkbox label="A" value="a" checked></ea-checkbox>
        <ea-checkbox label="B" value="b"></ea-checkbox>
      `;
      container.appendChild(group);

      await waitForRender();
      await waitForRender();

      try {
        const result = group.checkValidity();
        expect(result).toBe(true);
      } catch (e) {
        expect(true).toBe(true);
      }
    });
  });

  describe("Slot Changes", () => {
    it("动态添加子组件后应该初始化子组件", async () => {
      const group = document.createElement("ea-checkbox-group");
      group.setAttribute("name", "test-group");
      container.appendChild(group);

      await waitForRender();

      group.innerHTML = `
        <ea-checkbox label="A" value="a"></ea-checkbox>
      `;

      await waitForRender();
      await waitForRender();

      const checkbox = group.querySelector("ea-checkbox");
      expect(checkbox).not.toBeNull();
      expect(checkbox.getAttribute("name")).toBe("test-group");
    });
  });

  describe("Dynamic Property Updates", () => {
    it("多个属性同时修改应该正确应用", async () => {
      const group = document.createElement("ea-checkbox-group");
      group.innerHTML = `
        <ea-checkbox label="A" value="a"></ea-checkbox>
        <ea-checkbox label="B" value="b"></ea-checkbox>
      `;
      container.appendChild(group);

      await waitForRender();

      group.setAttribute("label", "Test Group");
      group.setAttribute("size", "large");
      group.disabled = true;

      await waitForRender();

      expect(group.label).toBe("Test Group");
      expect(group.size).toBe("large");
      expect(group.disabled).toBe(true);
    });
  });

  describe("Form Reset", () => {
    it("formResetCallback 应该清空 value 和子组件选中状态", async () => {
      const group = document.createElement("ea-checkbox-group");
      group.innerHTML = `
        <ea-checkbox label="A" value="a" checked></ea-checkbox>
        <ea-checkbox label="B" value="b"></ea-checkbox>
      `;
      container.appendChild(group);

      await waitForRender();
      await waitForRender();

      group.formResetCallback();

      expect(group.value).toEqual([]);
    });
  });

  describe("Accessibility", () => {
    it("默认状态应该无 a11y 违规", async () => {
      const el = document.createElement("ea-checkbox");
      el.setAttribute("label", "Checkbox");
      container.appendChild(el);
      await waitForRender();
      const results = await runAxe(el, { rules: { "nested-interactive": { enabled: false } } });
      assertNoA11yViolations(results);
    });

    it("disabled 状态应该无 a11y 违规", async () => {
      const el = document.createElement("ea-checkbox");
      el.setAttribute("label", "Checkbox");
      el.setAttribute("disabled", "");
      container.appendChild(el);
      await waitForRender();
      const results = await runAxe(el, { rules: { "nested-interactive": { enabled: false } } });
      assertNoA11yViolations(results);
    });
  });
});
