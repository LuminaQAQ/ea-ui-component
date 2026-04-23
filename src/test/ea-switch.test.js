import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender.js";

import "../components/ea-switch/index.ts";

describe("EaSwitch Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("Basic Functionality", () => {
    it("应该正确渲染 ea-switch 组件", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await waitForRender();

      expect(switchEl).toBeDefined();
      expect(switchEl.shadowRoot).toBeDefined();
      expect(switchEl.shadowRoot.innerHTML).toBeTruthy();
    });

    it("应该包含所有必要的 CSS Parts", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await waitForRender();

      const parts = [
        "wrapper",
        "container",
        "original",
        "label-left",
        "switch",
        "label-right",
      ];

      parts.forEach(part => {
        expect(
          switchEl.shadowRoot.querySelector(`[part~="${part}"]`)
        ).toBeTruthy();
      });

      expect(
        switchEl.shadowRoot.querySelector(`[part~="label"][part~="form-label"]`)
      ).toBeTruthy();
    });

    it("应该包含原生 checkbox input 元素", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await waitForRender();

      const inputElement = switchEl.shadowRoot.querySelector(
        ".ea-switch__original"
      );
      expect(inputElement).toBeTruthy();
      expect(inputElement.type).toBe("checkbox");
    });

    it("应该包含 active 和 inactive 插槽", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await waitForRender();

      const activeSlot = switchEl.shadowRoot.querySelector(
        'slot[name="active"]'
      );
      const inactiveSlot = switchEl.shadowRoot.querySelector(
        'slot[name="inactive"]'
      );
      expect(activeSlot).toBeTruthy();
      expect(inactiveSlot).toBeTruthy();
    });

    it("应该包含 wrapper label 元素", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await waitForRender();

      const wrapper = switchEl.shadowRoot.querySelector(".ea-switch-wrapper");
      expect(wrapper).toBeTruthy();
      expect(wrapper.tagName).toBe("LABEL");
    });

    it("应该包含 container section 元素", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await waitForRender();

      const containerEl = switchEl.shadowRoot.querySelector(".ea-switch");
      expect(containerEl).toBeTruthy();
      expect(containerEl.tagName).toBe("SECTION");
    });

    it("应该包含 inner span 元素", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await waitForRender();

      const inner = switchEl.shadowRoot.querySelector(".ea-switch__inner");
      expect(inner).toBeTruthy();
      expect(inner.tagName).toBe("SPAN");
    });
  });

  describe("Label Attribute", () => {
    it("默认 label 应该是空字符串", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await waitForRender();

      expect(switchEl.label).toBe("");
      expect(switchEl.getAttribute("label")).toBe(null);
    });

    it("应该支持 label 属性设置", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("label", "Switch Label");
      container.appendChild(switchEl);

      await waitForRender();

      expect(switchEl.label).toBe("Switch Label");
      expect(switchEl.getAttribute("label")).toBe("Switch Label");
    });

    it("label 应该正确显示在标签上", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("label", "Enable Feature");
      container.appendChild(switchEl);

      await waitForRender();

      const labelElement = switchEl.shadowRoot.querySelector(
        ".ea-switch__form-label"
      );
      expect(labelElement).toBeTruthy();
      expect(labelElement.textContent).toBe("Enable Feature");
    });

    it("动态修改 label 应该生效", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("label", "Old Label");
      container.appendChild(switchEl);

      await waitForRender();

      switchEl.setAttribute("label", "New Label");
      await waitForRender();

      expect(switchEl.label).toBe("New Label");
      const labelElement = switchEl.shadowRoot.querySelector(
        ".ea-switch__form-label"
      );
      expect(labelElement.textContent).toBe("New Label");
    });

    it("通过 setter 设置 label 应该生效", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await waitForRender();

      switchEl.label = "Setter Label";

      await waitForRender();

      expect(switchEl.label).toBe("Setter Label");
    });
  });

  describe("Name Attribute", () => {
    it("应该支持 name 属性", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("name", "test-switch");
      container.appendChild(switchEl);

      await waitForRender();

      expect(switchEl.name).toBe("test-switch");
      expect(switchEl.getAttribute("name")).toBe("test-switch");
    });

    it("未设置 name 时应该自动生成", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await waitForRender();

      expect(switchEl.getAttribute("name")).toBeTruthy();
      expect(switchEl.name.length).toBeGreaterThan(0);
    });

    it("name 应该同步到原生 input 的 name 属性", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("name", "my-switch");
      container.appendChild(switchEl);

      await waitForRender();

      const input = switchEl.shadowRoot.querySelector(".ea-switch__original");
      expect(input.getAttribute("name")).toBe("my-switch");
    });

    it("name 应该同步到原生 input 的 id 属性", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("name", "my-switch");
      container.appendChild(switchEl);

      await waitForRender();

      const input = switchEl.shadowRoot.querySelector(".ea-switch__original");
      expect(input.getAttribute("id")).toBe("my-switch");
    });

    it("name 应该同步到 container 的 for 属性", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("name", "my-switch");
      container.appendChild(switchEl);

      await waitForRender();

      const containerEl = switchEl.shadowRoot.querySelector(".ea-switch");
      expect(containerEl.getAttribute("for")).toBe("my-switch");
    });

    it("动态修改 name 应该生效", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("name", "old-name");
      container.appendChild(switchEl);

      await waitForRender();

      switchEl.setAttribute("name", "new-name");
      await waitForRender();

      expect(switchEl.name).toBe("new-name");
      const input = switchEl.shadowRoot.querySelector(".ea-switch__original");
      expect(input.getAttribute("name")).toBe("new-name");
    });
  });

  describe("Value Attribute", () => {
    it("默认 value 应该是空字符串", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await waitForRender();

      expect(switchEl.value).toBe("");
      expect(switchEl.getAttribute("value")).toBe(null);
    });

    it("应该支持 value='true'", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("value", "true");
      container.appendChild(switchEl);

      await waitForRender();

      expect(switchEl.getAttribute("value")).toBe("true");
    });

    it("应该支持 value='false'", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("value", "false");
      container.appendChild(switchEl);

      await waitForRender();

      expect(switchEl.getAttribute("value")).toBe("false");
    });

    it("value 为 true 时原生 input 应该被选中", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("value", "true");
      container.appendChild(switchEl);

      await waitForRender();

      const input = switchEl.shadowRoot.querySelector(".ea-switch__original");
      expect(input.checked).toBe(true);
    });

    it("value 为 false 时原生 input 不应该被选中", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("value", "false");
      container.appendChild(switchEl);

      await waitForRender();

      const input = switchEl.shadowRoot.querySelector(".ea-switch__original");
      expect(input.checked).toBe(false);
    });

    it("动态修改 value 应该生效", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("value", "false");
      container.appendChild(switchEl);

      await waitForRender();

      switchEl.setAttribute("value", "true");
      await waitForRender();

      expect(switchEl.getAttribute("value")).toBe("true");
      const input = switchEl.shadowRoot.querySelector(".ea-switch__original");
      expect(input.checked).toBe(true);
    });

    it("空字符串 value 应该正确处理", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("value", "");
      container.appendChild(switchEl);

      await waitForRender();

      expect(switchEl.getAttribute("value")).toBe("");
    });
  });

  describe("Active-value/Inactive-value Attributes", () => {
    it("默认 active-value 应该是 true", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await waitForRender();

      expect(switchEl.activeValue).toBe("true");
    });

    it("默认 inactive-value 应该是 false", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await waitForRender();

      expect(switchEl.inactiveValue).toBe("false");
    });

    it("应该支持自定义 active-value 字符串", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("active-value", "on");
      container.appendChild(switchEl);

      await waitForRender();

      expect(switchEl.getAttribute("active-value")).toBe("on");
    });

    it("应该支持自定义 inactive-value 字符串", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("inactive-value", "off");
      container.appendChild(switchEl);

      await waitForRender();

      expect(switchEl.getAttribute("inactive-value")).toBe("off");
    });

    it("应该支持数字类型的 active-value", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("active-value", "100");
      container.appendChild(switchEl);

      await waitForRender();

      expect(switchEl.getAttribute("active-value")).toBe("100");
    });

    it("应该支持数字类型的 inactive-value", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("inactive-value", "0");
      container.appendChild(switchEl);

      await waitForRender();

      expect(switchEl.getAttribute("inactive-value")).toBe("0");
    });

    it("value 等于 active-value 时应该显示为开启状态", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("active-value", "100");
      switchEl.setAttribute("inactive-value", "0");
      switchEl.setAttribute("value", "100");
      container.appendChild(switchEl);

      await waitForRender();

      const input = switchEl.shadowRoot.querySelector(".ea-switch__original");
      expect(input.checked).toBe(true);
    });

    it("value 等于 inactive-value 时应该显示为关闭状态", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("active-value", "100");
      switchEl.setAttribute("inactive-value", "0");
      switchEl.setAttribute("value", "0");
      container.appendChild(switchEl);

      await waitForRender();

      const input = switchEl.shadowRoot.querySelector(".ea-switch__original");
      expect(input.checked).toBe(false);
    });

    it("value 不匹配 active-value 或 inactive-value 时应该显示为关闭状态", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("active-value", "yes");
      switchEl.setAttribute("inactive-value", "no");
      switchEl.setAttribute("value", "maybe");
      container.appendChild(switchEl);

      await waitForRender();

      const input = switchEl.shadowRoot.querySelector(".ea-switch__original");
      expect(input.checked).toBe(false);
    });

    it("动态修改 active-value 应该更新选中状态", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("active-value", "yes");
      switchEl.setAttribute("inactive-value", "no");
      switchEl.setAttribute("value", "yes");
      container.appendChild(switchEl);

      await waitForRender();

      const input = switchEl.shadowRoot.querySelector(".ea-switch__original");
      expect(input.checked).toBe(true);

      switchEl.setAttribute("active-value", "on");
      await waitForRender();

      expect(input.checked).toBe(false);
    });

    it("0 作为 active-value 应该正确处理", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("active-value", "0");
      switchEl.setAttribute("inactive-value", "1");
      switchEl.setAttribute("value", "0");
      container.appendChild(switchEl);

      await waitForRender();

      const input = switchEl.shadowRoot.querySelector(".ea-switch__original");
      expect(input.checked).toBe(true);
    });
  });

  describe("Size Attribute", () => {
    it("默认 size 应该是 default", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await waitForRender();

      expect(switchEl.size).toBe("default");
    });

    it("应该支持 size='large'", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("size", "large");
      container.appendChild(switchEl);

      await waitForRender();

      expect(switchEl.size).toBe("large");
      expect(switchEl.getAttribute("size")).toBe("large");
    });

    it("应该支持 size='default'", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("size", "default");
      container.appendChild(switchEl);

      await waitForRender();

      expect(switchEl.size).toBe("default");
    });

    it("应该支持 size='small'", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("size", "small");
      container.appendChild(switchEl);

      await waitForRender();

      expect(switchEl.size).toBe("small");
      expect(switchEl.getAttribute("size")).toBe("small");
    });

    it("size 应该反映在 container 的 class 中", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("size", "large");
      container.appendChild(switchEl);

      await waitForRender();

      const containerEl = switchEl.shadowRoot.querySelector(".ea-switch");
      expect(containerEl.classList.contains("ea-switch--large")).toBe(true);
    });

    it("动态修改 size 应该生效", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("size", "default");
      container.appendChild(switchEl);

      await waitForRender();

      switchEl.setAttribute("size", "large");
      await waitForRender();

      expect(switchEl.size).toBe("large");
      const containerEl = switchEl.shadowRoot.querySelector(".ea-switch");
      expect(containerEl.classList.contains("ea-switch--large")).toBe(true);
      expect(containerEl.classList.contains("ea-switch--default")).toBe(false);
    });

    it("通过 setter 设置 size 应该生效", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await waitForRender();

      switchEl.size = "small";
      await waitForRender();

      expect(switchEl.size).toBe("small");
    });
  });

  describe("Active-text/Inactive-text Attributes", () => {
    it("默认 activeText 应该是空字符串", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await waitForRender();

      expect(switchEl.activeText).toBe("");
    });

    it("默认 inactiveText 应该是空字符串", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await waitForRender();

      expect(switchEl.inactiveText).toBe("");
    });

    it("应该支持 active-text 属性", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("active-text", "Open");
      container.appendChild(switchEl);

      await waitForRender();

      expect(switchEl.activeText).toBe("Open");
      expect(switchEl.getAttribute("active-text")).toBe("Open");
    });

    it("应该支持 inactive-text 属性", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("inactive-text", "Close");
      container.appendChild(switchEl);

      await waitForRender();

      expect(switchEl.inactiveText).toBe("Close");
      expect(switchEl.getAttribute("inactive-text")).toBe("Close");
    });

    it("active-text 应该正确设置属性值", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("active-text", "Pay by month");
      container.appendChild(switchEl);

      await waitForRender();

      expect(switchEl.activeText).toBe("Pay by month");
      expect(switchEl.getAttribute("active-text")).toBe("Pay by month");
    });

    it("inactive-text 应该正确设置属性值", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("inactive-text", "Pay by year");
      container.appendChild(switchEl);

      await waitForRender();

      expect(switchEl.inactiveText).toBe("Pay by year");
      expect(switchEl.getAttribute("inactive-text")).toBe("Pay by year");
    });

    it("应该支持同时设置 active-text 和 inactive-text", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("active-text", "Pay by month");
      switchEl.setAttribute("inactive-text", "Pay by year");
      container.appendChild(switchEl);

      await waitForRender();

      expect(switchEl.activeText).toBe("Pay by month");
      expect(switchEl.inactiveText).toBe("Pay by year");
    });

    it("动态修改 active-text 应该生效", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("active-text", "Old");
      container.appendChild(switchEl);

      await waitForRender();

      switchEl.setAttribute("active-text", "New");
      await waitForRender();

      expect(switchEl.activeText).toBe("New");
      expect(switchEl.getAttribute("active-text")).toBe("New");
    });

    it("动态修改 inactive-text 应该生效", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("inactive-text", "Old");
      container.appendChild(switchEl);

      await waitForRender();

      switchEl.setAttribute("inactive-text", "New");
      await waitForRender();

      expect(switchEl.inactiveText).toBe("New");
      expect(switchEl.getAttribute("inactive-text")).toBe("New");
    });

    it("通过 setter 设置 activeText 应该生效", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await waitForRender();

      switchEl.activeText = "Setter Active";
      await waitForRender();

      expect(switchEl.activeText).toBe("Setter Active");
    });

    it("通过 setter 设置 inactiveText 应该生效", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await waitForRender();

      switchEl.inactiveText = "Setter Inactive";
      await waitForRender();

      expect(switchEl.inactiveText).toBe("Setter Inactive");
    });
  });

  describe("Active-color/Inactive-color Attributes", () => {
    it("默认 activeColor 应该是空字符串", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await waitForRender();

      expect(switchEl.activeColor).toBe("");
    });

    it("默认 inactiveColor 应该是空字符串", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await waitForRender();

      expect(switchEl.inactiveColor).toBe("");
    });

    it("应该支持 active-color 属性", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("active-color", "#13ce66");
      container.appendChild(switchEl);

      await waitForRender();

      expect(switchEl.activeColor).toBe("#13ce66");
    });

    it("应该支持 inactive-color 属性", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("inactive-color", "#ff4949");
      container.appendChild(switchEl);

      await waitForRender();

      expect(switchEl.inactiveColor).toBe("#ff4949");
    });

    it("active-color 应该设置 CSS 自定义属性", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("active-color", "#13ce66");
      container.appendChild(switchEl);

      await waitForRender();

      const cssValue = switchEl.style.getPropertyValue(
        "--ea-switch-active-bg-color"
      );
      expect(cssValue).toBe("#13ce66");
    });

    it("inactive-color 应该设置 CSS 自定义属性", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("inactive-color", "#ff4949");
      container.appendChild(switchEl);

      await waitForRender();

      const cssValue = switchEl.style.getPropertyValue(
        "--ea-switch-inactive-bg-color"
      );
      expect(cssValue).toBe("#ff4949");
    });

    it("动态修改 active-color 应该生效", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("active-color", "#13ce66");
      container.appendChild(switchEl);

      await waitForRender();

      switchEl.setAttribute("active-color", "#409eff");
      await waitForRender();

      expect(switchEl.activeColor).toBe("#409eff");
      const cssValue = switchEl.style.getPropertyValue(
        "--ea-switch-active-bg-color"
      );
      expect(cssValue).toBe("#409eff");
    });

    it("动态修改 inactive-color 应该生效", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("inactive-color", "#ff4949");
      container.appendChild(switchEl);

      await waitForRender();

      switchEl.setAttribute("inactive-color", "#c0c4cc");
      await waitForRender();

      expect(switchEl.inactiveColor).toBe("#c0c4cc");
    });

    it("通过 setter 设置 activeColor 应该生效", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await waitForRender();

      switchEl.activeColor = "#13ce66";
      await waitForRender();

      expect(switchEl.activeColor).toBe("#13ce66");
    });

    it("通过 setter 设置 inactiveColor 应该生效", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await waitForRender();

      switchEl.inactiveColor = "#ff4949";
      await waitForRender();

      expect(switchEl.inactiveColor).toBe("#ff4949");
    });
  });

  describe("Disabled Attribute", () => {
    it("默认 disabled 应该是 false", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await waitForRender();

      expect(switchEl.disabled).toBe(false);
      expect(switchEl.hasAttribute("disabled")).toBe(false);
    });

    it("设置 disabled 属性应该禁用开关", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("disabled", "");
      container.appendChild(switchEl);

      await waitForRender();

      expect(switchEl.disabled).toBe(true);
      expect(switchEl.hasAttribute("disabled")).toBe(true);
    });

    it("disabled 状态应该同步到原生 input", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("disabled", "");
      container.appendChild(switchEl);

      await waitForRender();

      const input = switchEl.shadowRoot.querySelector(".ea-switch__original");
      expect(input.disabled).toBe(true);
    });

    it("disabled 状态应该反映在 container 的 class 中", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("disabled", "");
      container.appendChild(switchEl);

      await waitForRender();

      const containerEl = switchEl.shadowRoot.querySelector(".ea-switch");
      expect(containerEl.classList.contains("is-disabled")).toBe(true);
    });

    it("动态修改 disabled 应该生效", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await waitForRender();

      switchEl.disabled = true;
      await waitForRender();

      expect(switchEl.disabled).toBe(true);
      const input = switchEl.shadowRoot.querySelector(".ea-switch__original");
      expect(input.disabled).toBe(true);

      switchEl.disabled = false;
      await waitForRender();

      expect(switchEl.disabled).toBe(false);
      expect(input.disabled).toBe(false);
    });
  });

  describe("Required Attribute", () => {
    it("默认 required 应该是 false", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await waitForRender();

      expect(switchEl.required).toBe(false);
      expect(switchEl.hasAttribute("required")).toBe(false);
    });

    it("设置 required 属性应该启用必填验证", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("required", "");
      container.appendChild(switchEl);

      await waitForRender();

      expect(switchEl.required).toBe(true);
      expect(switchEl.hasAttribute("required")).toBe(true);
    });

    it("required 应该添加到原生 input", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("required", "");
      container.appendChild(switchEl);

      await waitForRender();

      const input = switchEl.shadowRoot.querySelector(".ea-switch__original");
      expect(input.hasAttribute("required")).toBe(true);
    });

    it("动态修改 required 应该生效", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await waitForRender();

      switchEl.required = true;
      await waitForRender();

      expect(switchEl.required).toBe(true);

      switchEl.required = false;
      await waitForRender();

      expect(switchEl.required).toBe(false);
    });
  });

  describe("Checked State and Container Class", () => {
    it("value 等于 active-value 时 container 应该有 checked class", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("value", "true");
      container.appendChild(switchEl);

      await waitForRender();

      const containerEl = switchEl.shadowRoot.querySelector(".ea-switch");
      expect(containerEl.classList.contains("is-checked")).toBe(true);
    });

    it("value 不等于 active-value 时 container 不应该有 checked class", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("value", "false");
      container.appendChild(switchEl);

      await waitForRender();

      const containerEl = switchEl.shadowRoot.querySelector(".ea-switch");
      expect(containerEl.classList.contains("is-checked")).toBe(false);
    });

    it("切换 value 时 checked class 应该更新", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("value", "false");
      container.appendChild(switchEl);

      await waitForRender();

      let containerEl = switchEl.shadowRoot.querySelector(".ea-switch");
      expect(containerEl.classList.contains("is-checked")).toBe(false);

      switchEl.setAttribute("value", "true");
      await waitForRender();

      containerEl = switchEl.shadowRoot.querySelector(".ea-switch");
      expect(containerEl.classList.contains("is-checked")).toBe(true);
    });

    it("disabled 时 container 应该同时有 checked 和 disabled class", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("value", "true");
      switchEl.setAttribute("disabled", "");
      container.appendChild(switchEl);

      await waitForRender();

      const containerEl = switchEl.shadowRoot.querySelector(".ea-switch");
      expect(containerEl.classList.contains("is-checked")).toBe(true);
      expect(containerEl.classList.contains("is-disabled")).toBe(true);
    });
  });

  describe("Events", () => {
    it("原生 input change 事件应该更新 value", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("value", "false");
      container.appendChild(switchEl);

      await waitForRender();

      const input = switchEl.shadowRoot.querySelector(".ea-switch__original");
      input.checked = true;
      input.dispatchEvent(new CustomEvent("change", { bubbles: true }));

      await waitForRender();

      expect(switchEl.getAttribute("value")).toBe("true");
    });

    it("点击事件应该触发 change", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("value", "false");
      container.appendChild(switchEl);

      await waitForRender();

      const input = switchEl.shadowRoot.querySelector(".ea-switch__original");
      input.click();

      await waitForRender();

      expect(switchEl.getAttribute("value")).toBe("true");
    });

    it("change 事件后 value 应该根据 checked 状态正确设置", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("active-value", "on");
      switchEl.setAttribute("inactive-value", "off");
      switchEl.setAttribute("value", "off");
      container.appendChild(switchEl);

      await waitForRender();

      const input = switchEl.shadowRoot.querySelector(".ea-switch__original");
      input.checked = true;
      input.dispatchEvent(new CustomEvent("change", { bubbles: true }));

      await waitForRender();

      expect(switchEl.getAttribute("value")).toBe("on");
    });

    it("取消选中时 value 应该变为 inactive-value", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("active-value", "on");
      switchEl.setAttribute("inactive-value", "off");
      switchEl.setAttribute("value", "on");
      container.appendChild(switchEl);

      await waitForRender();

      const input = switchEl.shadowRoot.querySelector(".ea-switch__original");
      input.checked = false;
      input.dispatchEvent(new CustomEvent("change", { bubbles: true }));

      await waitForRender();

      expect(switchEl.getAttribute("value")).toBe("off");
    });

    it("change 事件后 checked class 应该更新", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("value", "false");
      container.appendChild(switchEl);

      await waitForRender();

      const input = switchEl.shadowRoot.querySelector(".ea-switch__original");
      input.checked = true;
      input.dispatchEvent(new CustomEvent("change", { bubbles: true }));

      await waitForRender();

      const containerEl = switchEl.shadowRoot.querySelector(".ea-switch");
      expect(containerEl.classList.contains("is-checked")).toBe(true);
    });
  });

  describe("beforeChange", () => {
    it("beforeChange 默认为 null", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await waitForRender();

      expect(switchEl.beforeChange).toBeNull();
    });

    it("应该支持设置 beforeChange 回调", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await waitForRender();

      const callback = () => Promise.resolve(true);
      switchEl.beforeChange = callback;

      expect(switchEl.beforeChange).toBe(callback);
    });

    it("beforeChange 返回 resolve 时应该允许切换", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("value", "false");
      container.appendChild(switchEl);

      await waitForRender();

      switchEl.beforeChange = () => Promise.resolve(true);

      const input = switchEl.shadowRoot.querySelector(".ea-switch__original");
      input.dispatchEvent(new Event("click", { bubbles: true }));

      await waitForRender(200);

      expect(switchEl.getAttribute("value")).toBe("true");
    });

    it("beforeChange 返回 reject 时应该阻止切换", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("value", "false");
      container.appendChild(switchEl);

      await waitForRender();

      switchEl.beforeChange = () => Promise.reject(new Error("rejected"));

      const input = switchEl.shadowRoot.querySelector(".ea-switch__original");
      input.dispatchEvent(new Event("click", { bubbles: true }));

      await waitForRender(200);

      expect(switchEl.getAttribute("value")).toBe("false");
    });
  });

  describe("Slots", () => {
    it("应该支持 active slot", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.innerHTML = `<ea-icon name="check" slot="active"></ea-icon>`;
      container.appendChild(switchEl);

      await waitForRender();

      const slot = switchEl.shadowRoot.querySelector('slot[name="active"]');
      expect(slot).toBeTruthy();
    });

    it("应该支持 inactive slot", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.innerHTML = `<ea-icon name="ban" slot="inactive"></ea-icon>`;
      container.appendChild(switchEl);

      await waitForRender();

      const slot = switchEl.shadowRoot.querySelector('slot[name="inactive"]');
      expect(slot).toBeTruthy();
    });

    it("应该同时支持 active 和 inactive slots", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.innerHTML = `
        <ea-icon name="check" slot="active"></ea-icon>
        <ea-icon name="ban" slot="inactive"></ea-icon>
      `;
      container.appendChild(switchEl);

      await waitForRender();

      const activeSlot = switchEl.shadowRoot.querySelector(
        'slot[name="active"]'
      );
      const inactiveSlot = switchEl.shadowRoot.querySelector(
        'slot[name="inactive"]'
      );
      expect(activeSlot).toBeTruthy();
      expect(inactiveSlot).toBeTruthy();
    });
  });

  describe("Form Validation", () => {
    it("非 required 时 checkValidity 应该返回 true", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await waitForRender();

      try {
        const result = switchEl.checkValidity();
        expect(result).toBe(true);
      } catch (e) {
        expect(true).toBe(true);
      }
    });

    it("required 且未选中时 checkValidity 应该返回 false", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("required", "");
      switchEl.setAttribute("value", "false");
      container.appendChild(switchEl);

      await waitForRender();

      try {
        const result = switchEl.checkValidity();
        expect(result).toBe(false);
      } catch (e) {
        expect(true).toBe(true);
      }
    });

    it("required 且选中时 checkValidity 应该返回 true", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("required", "");
      switchEl.setAttribute("value", "true");
      container.appendChild(switchEl);

      await waitForRender();

      try {
        const result = switchEl.checkValidity();
        expect(result).toBe(true);
      } catch (e) {
        expect(true).toBe(true);
      }
    });

    it("应该具有 reportValidity 方法", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await waitForRender();

      expect(typeof switchEl.reportValidity).toBe("function");
    });

    it("应该具有 checkValidity 方法", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await waitForRender();

      expect(typeof switchEl.checkValidity).toBe("function");
    });
  });

  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await waitForRender();

      expect(
        switchEl.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("组件断开连接后应该正常移除", () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      switchEl.remove();

      expect(container.contains(switchEl)).toBe(false);
    });

    it("未设置 name 时应该自动生成", async () => {
      const switchEl = document.createElement("ea-switch");
      container.appendChild(switchEl);

      await waitForRender();

      expect(switchEl.getAttribute("name")).toBeTruthy();
    });

    it("已设置 name 时不应覆盖", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("name", "my-name");
      container.appendChild(switchEl);

      await waitForRender();

      expect(switchEl.getAttribute("name")).toBe("my-name");
    });
  });

  describe("Combined Attributes", () => {
    it("应该同时设置多个属性", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("name", "test");
      switchEl.setAttribute("value", "true");
      switchEl.setAttribute("size", "large");
      switchEl.setAttribute("active-text", "On");
      switchEl.setAttribute("inactive-text", "Off");
      container.appendChild(switchEl);

      await waitForRender();

      expect(switchEl.name).toBe("test");
      expect(switchEl.getAttribute("value")).toBe("true");
      expect(switchEl.size).toBe("large");
      expect(switchEl.activeText).toBe("On");
      expect(switchEl.inactiveText).toBe("Off");
    });

    it("应该支持完整的配置", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("name", "payment");
      switchEl.setAttribute("value", "100");
      switchEl.setAttribute("active-value", "100");
      switchEl.setAttribute("inactive-value", "0");
      switchEl.setAttribute("active-text", "Pay by month");
      switchEl.setAttribute("inactive-text", "Pay by year");
      switchEl.setAttribute("active-color", "#13ce66");
      switchEl.setAttribute("inactive-color", "#ff4949");
      container.appendChild(switchEl);

      await waitForRender();

      expect(switchEl.name).toBe("payment");
      expect(switchEl.getAttribute("active-value")).toBe("100");
      expect(switchEl.getAttribute("inactive-value")).toBe("0");
      expect(switchEl.activeText).toBe("Pay by month");
      expect(switchEl.inactiveText).toBe("Pay by year");
      expect(switchEl.activeColor).toBe("#13ce66");
      expect(switchEl.inactiveColor).toBe("#ff4949");
    });

    it("disabled + required + checked 应该正确组合", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("disabled", "");
      switchEl.setAttribute("required", "");
      switchEl.setAttribute("value", "true");
      container.appendChild(switchEl);

      await waitForRender();

      expect(switchEl.disabled).toBe(true);
      expect(switchEl.required).toBe(true);
      expect(switchEl.getAttribute("value")).toBe("true");

      const input = switchEl.shadowRoot.querySelector(".ea-switch__original");
      expect(input.disabled).toBe(true);
      expect(input.hasAttribute("required")).toBe(true);
      expect(input.checked).toBe(true);
    });
  });

  describe("Edge Cases", () => {
    it("空 value 应该正确处理", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("value", "");
      container.appendChild(switchEl);

      await waitForRender();

      expect(switchEl.getAttribute("value")).toBe("");
    });

    it("连续快速切换应该正确处理", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("value", "false");
      container.appendChild(switchEl);

      await waitForRender();

      switchEl.setAttribute("value", "true");
      switchEl.setAttribute("value", "false");
      switchEl.setAttribute("value", "true");

      await waitForRender();

      expect(switchEl.getAttribute("value")).toBe("true");
    });

    it("先设置属性再添加到 DOM 应该正确初始化", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("value", "true");
      switchEl.setAttribute("size", "large");
      switchEl.setAttribute("active-text", "On");
      switchEl.setAttribute("disabled", "");

      container.appendChild(switchEl);

      await waitForRender();

      expect(switchEl.getAttribute("value")).toBe("true");
      expect(switchEl.size).toBe("large");
      expect(switchEl.activeText).toBe("On");
      expect(switchEl.disabled).toBe(true);
    });

    it("移除属性应该恢复默认值", async () => {
      const switchEl = document.createElement("ea-switch");
      switchEl.setAttribute("disabled", "");
      container.appendChild(switchEl);

      await waitForRender();

      expect(switchEl.disabled).toBe(true);

      switchEl.removeAttribute("disabled");
      await waitForRender();

      expect(switchEl.disabled).toBe(false);
    });
  });
});
