import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender.js";
import { runAxe, assertNoA11yViolations } from "./utils/a11y.js";

import "../components/ea-color-picker/index.ts";
import { Color } from "../components/ea-color-picker/utils/Color.ts";

describe("EaColorPicker Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("Basic Rendering", () => {
    it("应该正确渲染 ea-color-picker 组件", () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      expect(picker).toBeDefined();
      expect(picker.shadowRoot).toBeDefined();
    });

    it("应该包含所有 CSS Parts", () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      const parts = [
        "form-label",
        "container",
        "popper",
        "trigger",
        "outer",
        "inner",
        "icon-wrapper",
        "status-icon",
        "panel",
        "footer-actions",
        "clear-btn",
        "confirm-btn",
      ];

      parts.forEach(part => {
        expect(
          picker.shadowRoot.querySelector(`[part="${part}"]`)
        ).toBeTruthy();
      });
    });

    it("应该包含 ea-popper 组件", () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      const popper = picker.shadowRoot.querySelector("ea-popper");
      expect(popper).toBeTruthy();
    });

    it("应该包含 ea-color-picker-panel 组件", () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      const panel = picker.shadowRoot.querySelector("ea-color-picker-panel");
      expect(panel).toBeTruthy();
    });

    it("应该包含 clear 和 confirm 按钮", () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      const clearBtn = picker.shadowRoot.querySelector(
        'ea-button[part="clear-btn"]'
      );
      const confirmBtn = picker.shadowRoot.querySelector(
        'ea-button[part="confirm-btn"]'
      );
      expect(clearBtn).toBeTruthy();
      expect(confirmBtn).toBeTruthy();
    });
  });

  describe("Label Attribute", () => {
    it("默认 label 应该是空字符串", () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      expect(picker.label).toBe("");
    });

    it("应该正确设置 label 属性", () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("label", "颜色选择");
      container.appendChild(picker);

      expect(picker.label).toBe("颜色选择");
    });

    it("label 应该正确显示在 form-label 元素中", async () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("label", "主题色");
      container.appendChild(picker);

      await waitForRender();

      const labelEl = picker.shadowRoot.querySelector(
        ".ea-color-picker__form-label"
      );
      expect(labelEl).toBeTruthy();
      expect(labelEl.textContent).toBe("主题色");
    });

    it("动态修改 label 应该更新显示", async () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("label", "旧标签");
      container.appendChild(picker);

      await waitForRender();

      picker.setAttribute("label", "新标签");
      await waitForRender();

      const labelEl = picker.shadowRoot.querySelector(
        ".ea-color-picker__form-label"
      );
      expect(labelEl.textContent).toBe("新标签");
    });
  });

  describe("Value Attribute", () => {
    it("默认 value 应该是空字符串", () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      expect(picker.value).toBe("");
    });

    it("应该正确设置 value 属性", () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("value", "#409eff");
      container.appendChild(picker);

      expect(picker.value).toBe("#409eff");
    });

    it("value 变化时应该触发更新", async () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("value", "#409eff");
      container.appendChild(picker);

      await waitForRender();

      picker.setAttribute("value", "#67c23a");
      expect(picker.value).toBe("#67c23a");
    });

    it("设置 value 后 inner 元素应该有背景色", async () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("value", "#409eff");
      container.appendChild(picker);

      await waitForRender();

      const inner = picker.shadowRoot.querySelector('[part="inner"]');
      expect(inner).toBeTruthy();
      const bg = inner.style.getPropertyValue(
        "--ea-color-picker-inner-background-color"
      );
      expect(bg).toBeTruthy();
    });

    it("value 为空时 inner 背景色应该被设置为 transparent", async () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("value", "#409eff");
      container.appendChild(picker);

      await waitForRender();

      picker.removeAttribute("value");
      await waitForRender();

      const inner = picker.shadowRoot.querySelector('[part="inner"]');
      const bg = inner.style.getPropertyValue(
        "--ea-color-picker-inner-background-color"
      );
      expect(bg).toBe("transparent");
    });

    it("value 变化后状态图标应该更新", async () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      await waitForRender();

      const statusIcon = picker.shadowRoot.querySelector(
        '[part="status-icon"]'
      );
      expect(statusIcon.getAttribute("name")).toBe("xmark");

      picker.setAttribute("value", "#409eff");
      await waitForRender();

      expect(statusIcon.getAttribute("name")).toBe("angle-down");
    });

    it("value 变化时应该同步到 panel", async () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("value", "#409eff");
      container.appendChild(picker);

      await waitForRender();

      const panel = picker.shadowRoot.querySelector("ea-color-picker-panel");
      expect(panel.value).toBeTruthy();
    });
  });

  describe("Disabled Attribute", () => {
    it("默认 disabled 应该是 false", () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      expect(picker.disabled).toBe(false);
    });

    it("应该正确设置 disabled 属性", () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("disabled", "");
      container.appendChild(picker);

      expect(picker.disabled).toBe(true);
    });

    it("disabled 时 container 应该有 is-disabled class", async () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("disabled", "");
      container.appendChild(picker);

      await waitForRender();

      const containerEl = picker.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-disabled")).toBe(true);
    });

    it("动态切换 disabled 应该更新 class", async () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      await waitForRender();

      const containerEl = picker.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-disabled")).toBe(false);

      picker.setAttribute("disabled", "");
      await waitForRender();

      expect(containerEl.classList.contains("is-disabled")).toBe(true);

      picker.removeAttribute("disabled");
      await waitForRender();

      expect(containerEl.classList.contains("is-disabled")).toBe(false);
    });
  });

  describe("Size Attribute", () => {
    const sizes = ["small", "medium", "large"];

    sizes.forEach(size => {
      it(`应该正确应用 size="${size}"`, async () => {
        const picker = document.createElement("ea-color-picker");
        picker.setAttribute("size", size);
        container.appendChild(picker);

        await waitForRender();

        const containerEl =
          picker.shadowRoot.querySelector('[part="container"]');
        expect(containerEl.classList.contains(`ea-color-picker--${size}`)).toBe(
          true
        );
      });
    });

    it("默认 size 应该是空字符串", () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      expect(picker.size).toBe("");
    });

    it("动态修改 size 应该更新 class", async () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("size", "small");
      container.appendChild(picker);

      await waitForRender();

      const containerEl = picker.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-color-picker--small")).toBe(
        true
      );

      picker.setAttribute("size", "large");
      await waitForRender();

      expect(containerEl.classList.contains("ea-color-picker--small")).toBe(
        false
      );
      expect(containerEl.classList.contains("ea-color-picker--large")).toBe(
        true
      );
    });
  });

  describe("Clearable Attribute", () => {
    it("默认 clearable 应该是 false", () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      expect(picker.clearable).toBe(false);
    });

    it("应该正确设置 clearable 属性", () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("clearable", "");
      container.appendChild(picker);

      expect(picker.clearable).toBe(true);
    });

    it("clearable 属性应该同步到 panel", async () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("clearable", "");
      container.appendChild(picker);

      await waitForRender();

      const panel = picker.shadowRoot.querySelector("ea-color-picker-panel");
      expect(panel.getAttribute("clearable")).toBe("true");
    });
  });

  describe("Color Format Attribute", () => {
    const formats = ["hex", "rgb", "hsl", "hsv", "rgba"];

    formats.forEach(format => {
      it(`应该支持 color-format="${format}"`, () => {
        const picker = document.createElement("ea-color-picker");
        picker.setAttribute("color-format", format);
        container.appendChild(picker);

        expect(picker.colorFormat).toBe(format);
      });
    });

    it("默认 color-format 应该是 hex", () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      expect(picker.colorFormat).toBe("hex");
    });

    it("color-format 应该同步到 panel", async () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("color-format", "rgb");
      container.appendChild(picker);

      await waitForRender();

      const panel = picker.shadowRoot.querySelector("ea-color-picker-panel");
      expect(panel.getAttribute("color-format")).toBe("rgb");
    });
  });

  describe("Show Alpha Attribute", () => {
    it("默认 showAlpha 应该是 false", () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      expect(picker.showAlpha).toBe(false);
    });

    it("应该正确设置 show-alpha 属性", () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("show-alpha", "");
      container.appendChild(picker);

      expect(picker.showAlpha).toBe(true);
    });

    it("show-alpha 应该同步到 panel", async () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("show-alpha", "");
      container.appendChild(picker);

      await waitForRender();

      const panel = picker.shadowRoot.querySelector("ea-color-picker-panel");
      expect(panel.getAttribute("show-alpha")).toBe("true");
    });
  });

  describe("Placement Attribute", () => {
    const placements = [
      "top",
      "top-start",
      "top-end",
      "bottom",
      "bottom-start",
      "bottom-end",
      "left",
      "left-start",
      "left-end",
      "right",
      "right-start",
      "right-end",
    ];

    placements.forEach(placement => {
      it(`应该支持 placement="${placement}"`, () => {
        const picker = document.createElement("ea-color-picker");
        picker.setAttribute("placement", placement);
        container.appendChild(picker);

        expect(picker.placement).toBe(placement);
      });
    });

    it("默认 placement 应该是 bottom", () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      expect(picker.placement).toBe("bottom");
    });

    it("placement 应该同步到 popper", async () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("placement", "top-start");
      container.appendChild(picker);

      await waitForRender();

      const popper = picker.shadowRoot.querySelector("ea-popper");
      expect(popper.getAttribute("placement")).toBe("top-start");
    });
  });

  describe("Tabindex Attribute", () => {
    it("默认 tabindex 应该是 0", () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      expect(picker.tabindex).toBe(0);
    });

    it("应该支持自定义 tabindex", () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("tabindex", "3");
      container.appendChild(picker);

      expect(picker.tabindex).toBe(3);
    });
  });

  describe("Required & Form Validation", () => {
    it("默认 required 应该是 false", () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      expect(picker.required).toBe(false);
    });

    it("应该支持 required 属性", () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("required", "");
      container.appendChild(picker);

      expect(picker.required).toBe(true);
    });

    it("应该有 checkValidity 方法", () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      expect(typeof picker.checkValidity).toBe("function");
    });

    it("应该有 reportValidity 方法", () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      expect(typeof picker.reportValidity).toBe("function");
    });

    it("required 且无 value 时 checkValidity 应该返回 false", () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("required", "");
      container.appendChild(picker);

      expect(picker.checkValidity()).toBe(false);
    });

    it("required 且有 value 时 checkValidity 应该返回 true", () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("required", "");
      picker.setAttribute("value", "#409eff");
      container.appendChild(picker);

      expect(picker.checkValidity()).toBe(true);
    });
  });

  describe("Predefine Property", () => {
    it("默认 predefine 应该是空数组", async () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      await waitForRender();

      expect(picker.predefine).toEqual([]);
    });

    it("应该支持设置 predefine 属性", async () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      await waitForRender();

      const predefineList = ["#ff4500", "#ff8c00", "#ffd700"];
      picker.predefine = predefineList;

      await waitForRender();

      expect(picker.predefine).toEqual(predefineList);
    });

    it("predefine 应该同步到 panel", async () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      await waitForRender();

      const predefineList = ["#ff4500", "#ff8c00"];
      picker.predefine = predefineList;

      await waitForRender();

      const panel = picker.shadowRoot.querySelector("ea-color-picker-panel");
      expect(panel.predefine).toEqual(predefineList);
    });
  });

  describe("Events", () => {
    it("面板 change 事件应该更新 picker 的 value", async () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("value", "#409eff");
      container.appendChild(picker);

      await waitForRender();

      const panel = picker.shadowRoot.querySelector("ea-color-picker-panel");
      panel.dispatchEvent(
        new CustomEvent("change", {
          detail: { value: "#67c23a" },
          bubbles: true,
          composed: true,
        })
      );

      expect(picker.value).toBe("#67c23a");
    });

    it("点击 clear 按钮应该触发 ea-clear 事件", async () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("value", "#409eff");
      picker.setAttribute("clearable", "");
      container.appendChild(picker);

      await waitForRender();

      const clearHandler = vi.fn();
      picker.addEventListener("ea-clear", clearHandler);

      const clearBtn = picker.shadowRoot.querySelector('[part="clear-btn"]');
      clearBtn.click();

      await waitForRender();

      expect(clearHandler).toHaveBeenCalledTimes(1);
    });

    it("点击 clear 按钮应该清空 value", async () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("value", "#409eff");
      picker.setAttribute("clearable", "");
      container.appendChild(picker);

      await waitForRender();

      const clearBtn = picker.shadowRoot.querySelector('[part="clear-btn"]');
      clearBtn.click();

      expect(picker.value).toBe("");
    });

    it("点击 clear 按钮应该触发 change 事件且 value 为空", async () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("value", "#409eff");
      picker.setAttribute("clearable", "");
      container.appendChild(picker);

      await waitForRender();

      const changeHandler = vi.fn();
      picker.addEventListener("change", changeHandler);

      const clearBtn = picker.shadowRoot.querySelector('[part="clear-btn"]');
      clearBtn.click();

      await waitForRender();

      expect(changeHandler).toHaveBeenCalled();
    });
  });

  describe("Public Methods", () => {
    it("应该有 show 方法", () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      expect(typeof picker.show).toBe("function");
    });

    it("应该有 hide 方法", () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      expect(typeof picker.hide).toBe("function");
    });

    it("应该有 focus 方法", () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      expect(typeof picker.focus).toBe("function");
    });

    it("应该有 blur 方法", () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      expect(typeof picker.blur).toBe("function");
    });

    it("应该有 checkValidity 方法", () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      expect(typeof picker.checkValidity).toBe("function");
    });

    it("应该有 reportValidity 方法", () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      expect(typeof picker.reportValidity).toBe("function");
    });
  });

  describe("Container Class Updates", () => {
    it("有 value 时 container 应该有 has-value class", async () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("value", "#409eff");
      container.appendChild(picker);

      await waitForRender();

      const containerEl = picker.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-has-value")).toBe(true);
    });

    it("无 value 时 container 不应该有 has-value class", async () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      await waitForRender();

      const containerEl = picker.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-has-value")).toBe(false);
    });
  });

  describe("Panel Attribute Sync ($mounted)", () => {
    it("$mounted 时应该将属性同步到 panel", async () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("value", "#409eff");
      picker.setAttribute("clearable", "");
      container.appendChild(picker);

      await waitForRender();

      const panel = picker.shadowRoot.querySelector("ea-color-picker-panel");
      expect(panel.value).toBeTruthy();
      expect(panel.getAttribute("clearable")).toBe("true");
    });

    it("$mounted 时 color-format 和 show-alpha 应该同步到 panel", async () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("value", "#409eff");
      picker.setAttribute("color-format", "rgb");
      picker.setAttribute("show-alpha", "");
      container.appendChild(picker);

      await waitForRender();

      const panel = picker.shadowRoot.querySelector("ea-color-picker-panel");
      expect(panel.getAttribute("color-format")).toBe("rgb");
      expect(panel.getAttribute("show-alpha")).toBe("true");
    });
  });
});

describe("EaColorPickerPanel Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("Basic Rendering", () => {
    it("应该正确渲染 ea-color-picker-panel 组件", () => {
      const panel = document.createElement("ea-color-picker-panel");
      container.appendChild(panel);

      expect(panel).toBeDefined();
      expect(panel.shadowRoot).toBeDefined();
    });

    it("应该包含所有 CSS Parts", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      container.appendChild(panel);

      await waitForRender();

      const parts = [
        "container",
        "wrapper",
        "svpanel",
        "svpanel-cursor",
        "hue-slider",
        "hue-slider-thumb",
        "alpha-slider",
        "alpha-slider-thumb",
        "predefine",
        "predefine-colors",
        "footer",
        "text-display",
        "color-input",
        "append",
      ];

      parts.forEach(part => {
        expect(panel.shadowRoot.querySelector(`[part="${part}"]`)).toBeTruthy();
      });
    });

    it("应该包含 svpanel、hue-slider 和 alpha-slider", () => {
      const panel = document.createElement("ea-color-picker-panel");
      container.appendChild(panel);

      const svpanel = panel.shadowRoot.querySelector(
        ".ea-color-picker-panel__svpanel"
      );
      const hueSlider = panel.shadowRoot.querySelector(
        ".ea-color-picker-panel__hue-slider"
      );
      const alphaSlider = panel.shadowRoot.querySelector(
        ".ea-color-picker-panel__alpha-slider"
      );

      expect(svpanel).toBeTruthy();
      expect(hueSlider).toBeTruthy();
      expect(alphaSlider).toBeTruthy();
    });

    it("应该包含 ea-input 颜色输入框", () => {
      const panel = document.createElement("ea-color-picker-panel");
      container.appendChild(panel);

      const colorInput = panel.shadowRoot.querySelector("ea-input");
      expect(colorInput).toBeTruthy();
    });
  });

  describe("Value Attribute", () => {
    it("默认 value 应该是空字符串", () => {
      const panel = document.createElement("ea-color-picker-panel");
      container.appendChild(panel);

      expect(panel.value).toBe("");
    });

    it("应该正确设置 hex 格式的 value", () => {
      const panel = document.createElement("ea-color-picker-panel");
      panel.setAttribute("value", "#409eff");
      container.appendChild(panel);

      expect(panel.value).toBe("#409eff");
    });

    it("应该支持 rgb 格式的值", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      panel.setAttribute("color-format", "rgb");
      panel.setAttribute("value", "#409eff");
      container.appendChild(panel);

      await waitForRender();

      expect(panel.value).toMatch(/^rgb\(/);
    });

    it("应该支持 rgba 格式的值", () => {
      const panel = document.createElement("ea-color-picker-panel");
      panel.setAttribute("value", "rgba(64, 158, 255, 0.5)");
      panel.setAttribute("show-alpha", "");
      container.appendChild(panel);

      expect(panel.value).toBe("rgba(64, 158, 255, 0.5)");
    });

    it("应该支持 hsl 格式的值", () => {
      const panel = document.createElement("ea-color-picker-panel");
      panel.setAttribute("value", "hsl(217, 100%, 62.7%)");
      container.appendChild(panel);

      expect(panel.value).toBeTruthy();
    });

    it("value 变化时应该触发更新", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      panel.setAttribute("value", "#409eff");
      container.appendChild(panel);

      await waitForRender();

      panel.setAttribute("value", "#67c23a");
      expect(panel.value).toBe("#67c23a");
    });
  });

  describe("Color Format Attribute", () => {
    const formats = ["hex", "rgb", "hsl", "hsv", "rgba"];

    formats.forEach(format => {
      it(`应该支持 color-format="${format}"`, () => {
        const panel = document.createElement("ea-color-picker-panel");
        panel.setAttribute("color-format", format);
        container.appendChild(panel);

        expect(panel.colorFormat).toBe(format);
      });
    });

    it("默认 color-format 应该是 hex", () => {
      const panel = document.createElement("ea-color-picker-panel");
      container.appendChild(panel);

      expect(panel.colorFormat).toBe("hex");
    });

    it("color-format 为 rgb 时 value 应该输出 rgb 格式", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      panel.setAttribute("color-format", "rgb");
      panel.setAttribute("value", "#409eff");
      container.appendChild(panel);

      await waitForRender();

      expect(panel.value).toMatch(/^rgb\(/);
    });

    it("color-format 为 hsl 时 value 应该输出 hsl 格式", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      panel.setAttribute("color-format", "hsl");
      panel.setAttribute("value", "#409eff");
      container.appendChild(panel);

      await waitForRender();

      expect(panel.value).toMatch(/^hsl\(/);
    });

    it("动态修改 color-format 应该重新格式化 value", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      panel.setAttribute("value", "#409eff");
      container.appendChild(panel);

      await waitForRender();

      expect(panel.value).toBe("#409eff");

      panel.setAttribute("color-format", "rgb");
      await waitForRender();

      expect(panel.value).toMatch(/^rgb\(/);
    });
  });

  describe("Show Alpha & Effective Format", () => {
    it("默认 showAlpha 应该是 false", () => {
      const panel = document.createElement("ea-color-picker-panel");
      container.appendChild(panel);

      expect(panel.showAlpha).toBe(false);
    });

    it("应该正确设置 show-alpha 属性", () => {
      const panel = document.createElement("ea-color-picker-panel");
      panel.setAttribute("show-alpha", "");
      container.appendChild(panel);

      expect(panel.showAlpha).toBe(true);
    });

    it("showAlpha=true 且 colorFormat=hex 时 value 应该输出 rgb 格式", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      panel.setAttribute("show-alpha", "");
      panel.setAttribute("value", "#409eff");
      container.appendChild(panel);

      await waitForRender();

      expect(panel.value).toMatch(/^rgb/);
    });

    it("showAlpha=true 且 colorFormat=rgb 时 value 应该输出 rgb 格式", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      panel.setAttribute("show-alpha", "");
      panel.setAttribute("color-format", "rgb");
      panel.setAttribute("value", "#409eff");
      container.appendChild(panel);

      await waitForRender();

      expect(panel.value).toMatch(/^rgb/);
    });

    it("showAlpha=true 且 colorFormat=hsl 时 value 应该输出 hsl 格式", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      panel.setAttribute("show-alpha", "");
      panel.setAttribute("color-format", "hsl");
      panel.setAttribute("value", "#409eff");
      container.appendChild(panel);

      await waitForRender();

      expect(panel.value).toMatch(/^hsl/);
    });

    it("showAlpha=false 时 value 应该保持原格式不带 alpha", () => {
      const panel = document.createElement("ea-color-picker-panel");
      panel.setAttribute("value", "#409eff");
      container.appendChild(panel);

      expect(panel.value).toBe("#409eff");
      expect(panel.value).not.toMatch(/^rgba/);
    });

    it("动态开启 showAlpha 应该重新格式化 value", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      panel.setAttribute("value", "#409eff");
      container.appendChild(panel);

      await waitForRender();

      expect(panel.value).toBe("#409eff");

      panel.setAttribute("show-alpha", "");
      await waitForRender();
      expect(panel.value).toMatch(/^rgb/);
    });

    it("传入 rgba 值时透明度应该正确解析", () => {
      const panel = document.createElement("ea-color-picker-panel");
      panel.setAttribute("value", "rgba(64, 158, 255, 0.5)");
      panel.setAttribute("show-alpha", "");
      container.appendChild(panel);

      expect(panel.value).toBe("rgba(64, 158, 255, 0.5)");
    });

    it("showAlpha=true 时 container 应该有 show-alpha class", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      panel.setAttribute("show-alpha", "");
      container.appendChild(panel);

      await waitForRender();

      const containerEl = panel.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-show-alpha")).toBe(true);
    });
  });

  describe("Disabled Attribute", () => {
    it("默认 disabled 应该是 false", () => {
      const panel = document.createElement("ea-color-picker-panel");
      container.appendChild(panel);

      expect(panel.disabled).toBe(false);
    });

    it("应该正确设置 disabled 属性", () => {
      const panel = document.createElement("ea-color-picker-panel");
      panel.setAttribute("disabled", "");
      container.appendChild(panel);

      expect(panel.disabled).toBe(true);
    });

    it("disabled 时 container 应该有 disabled class", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      panel.setAttribute("disabled", "");
      container.appendChild(panel);

      await waitForRender();

      const containerEl = panel.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-disabled")).toBe(true);
    });
  });

  describe("Border Attribute", () => {
    it("默认 border 应该是 false", () => {
      const panel = document.createElement("ea-color-picker-panel");
      container.appendChild(panel);

      expect(panel.border).toBe(false);
    });

    it("应该正确设置 border 属性", () => {
      const panel = document.createElement("ea-color-picker-panel");
      panel.setAttribute("border", "");
      container.appendChild(panel);

      expect(panel.border).toBe(true);
    });

    it("border 时 container 应该有 is-border class", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      panel.setAttribute("border", "");
      container.appendChild(panel);

      await waitForRender();

      const containerEl = panel.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-border")).toBe(true);
    });
  });

  describe("Clearable Attribute", () => {
    it("默认 clearable 应该是 true", () => {
      const panel = document.createElement("ea-color-picker-panel");
      container.appendChild(panel);

      expect(panel.clearable).toBe(true);
    });

    it("设置 clearable=false 应该正确生效", () => {
      const panel = document.createElement("ea-color-picker-panel");
      container.appendChild(panel);

      panel.clearable = false;

      expect(panel.clearable).toBe(false);
    });

    it("clearable=true 时 container 应该有 is-clearable class", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      container.appendChild(panel);

      await waitForRender();

      const containerEl = panel.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-clearable")).toBe(true);
    });

    it("clearable=false 时 container 不应该有 is-clearable class", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      container.appendChild(panel);

      panel.clearable = false;

      await waitForRender();

      const containerEl = panel.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-clearable")).toBe(false);
    });
  });

  describe("Predefine Property", () => {
    it("默认 predefine 应该是空数组", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      container.appendChild(panel);

      await waitForRender();

      expect(panel.predefine).toEqual([]);
    });

    it("应该支持设置 predefine 属性", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      container.appendChild(panel);

      await waitForRender();

      const predefineList = ["#ff4500", "#ff8c00", "#ffd700"];
      panel.predefine = predefineList;

      await waitForRender();

      expect(panel.predefine).toEqual(predefineList);
    });

    it("设置 predefine 后应该渲染预定义颜色元素", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      container.appendChild(panel);

      await waitForRender();

      const predefineList = ["#ff4500", "#ff8c00", "#ffd700"];
      panel.predefine = predefineList;

      await waitForRender();

      const colors = panel.shadowRoot.querySelectorAll(
        ".ea-color-picker-panel__predefine-color"
      );
      expect(colors.length).toBe(3);
    });

    it("预定义颜色元素应该有正确的 data-color 属性", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      container.appendChild(panel);

      await waitForRender();

      const predefineList = ["#ff4500", "#ff8c00"];
      panel.predefine = predefineList;

      await waitForRender();

      const colors = panel.shadowRoot.querySelectorAll(
        ".ea-color-picker-panel__predefine-color"
      );
      expect(colors[0].getAttribute("data-color")).toBe("#ff4500");
      expect(colors[1].getAttribute("data-color")).toBe("#ff8c00");
    });

    it("设置空数组 predefine 不应该渲染颜色元素", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      container.appendChild(panel);

      await waitForRender();

      panel.predefine = ["#ff4500"];

      await waitForRender();

      const colorsBefore = panel.shadowRoot.querySelectorAll(
        ".ea-color-picker-panel__predefine-color"
      );
      expect(colorsBefore.length).toBe(1);

      panel.predefine = [];

      await waitForRender();

      const colors = panel.shadowRoot.querySelectorAll(
        ".ea-color-picker-panel__predefine-color"
      );
      expect(colors.length).toBe(0);
    });
  });

  describe("Events", () => {
    it("应该支持 ea-active-change 事件监听", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      container.appendChild(panel);

      await waitForRender();

      const handler = vi.fn();
      panel.addEventListener("ea-active-change", handler);

      expect(handler).not.toHaveBeenCalled();
    });

    it("应该支持 ea-invalid-color 事件监听", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      container.appendChild(panel);

      await waitForRender();

      const handler = vi.fn();
      panel.addEventListener("ea-invalid-color", handler);

      expect(handler).not.toHaveBeenCalled();
    });

    it("应该支持 change 事件监听", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      container.appendChild(panel);

      await waitForRender();

      const handler = vi.fn();
      panel.addEventListener("change", handler);

      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe("resetCursorPosition Method", () => {
    it("应该有 resetCursorPosition 方法", () => {
      const panel = document.createElement("ea-color-picker-panel");
      container.appendChild(panel);

      expect(typeof panel.resetCursorPosition).toBe("function");
    });

    it("resetCursorPosition 后应该重置 thumb 位置", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      panel.setAttribute("value", "#409eff");
      container.appendChild(panel);

      await waitForRender();

      const svCursor = panel.shadowRoot.querySelector(
        '[part="svpanel-cursor"]'
      );
      expect(svCursor.style.left).toBeTruthy();

      panel.resetCursorPosition();

      expect(svCursor.style.left).toBe("");
      expect(svCursor.style.top).toBe("");
    });
  });

  describe("Color Input Interaction", () => {
    it("clearable=true 时应该显示 ea-input", () => {
      const panel = document.createElement("ea-color-picker-panel");
      container.appendChild(panel);

      const colorInput = panel.shadowRoot.querySelector("ea-input");
      expect(colorInput).toBeTruthy();
    });

    it("clearable=false 时应该显示 text-display 元素", () => {
      const panel = document.createElement("ea-color-picker-panel");
      panel.setAttribute("clearable", "false");
      container.appendChild(panel);

      const textDisplay = panel.shadowRoot.querySelector(
        ".ea-color-picker-panel__text-display"
      );
      expect(textDisplay).toBeTruthy();
    });

    it("设置 value 后 color-input 应该同步更新", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      panel.setAttribute("value", "#409eff");
      container.appendChild(panel);

      await waitForRender();

      const colorInput = panel.shadowRoot.querySelector("ea-input");
      expect(colorInput.getAttribute("value")).toBe("#409eff");
    });
  });

  describe("Svpanel Background Update", () => {
    it("设置 value 后应该更新 svpanel 背景色 CSS 变量", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      panel.setAttribute("value", "#409eff");
      container.appendChild(panel);

      await waitForRender();

      const bgColor = panel.style.getPropertyValue(
        "--ea-color-picker-panel-background-color"
      );
      expect(bgColor).toBeTruthy();
    });
  });

  describe("Accessibility", () => {
    it("默认状态应该无 a11y 违规", async () => {
      const el = document.createElement("ea-color-picker");
      el.setAttribute("label", "Color");
      container.appendChild(el);
      await waitForRender();
      const results = await runAxe(el, {
        rules: {
          "aria-command-name": { enabled: false },
          label: { enabled: false },
        },
      });
      assertNoA11yViolations(results);
    });

    it("disabled 状态应该无 a11y 违规", async () => {
      const el = document.createElement("ea-color-picker");
      el.setAttribute("label", "Color");
      el.setAttribute("disabled", "");
      container.appendChild(el);
      await waitForRender();
      const results = await runAxe(el, {
        rules: {
          "aria-command-name": { enabled: false },
          label: { enabled: false },
        },
      });
      assertNoA11yViolations(results);
    });

    describe("ARIA Attributes", () => {
      it("trigger 应该有 role='button'", async () => {
        const el = document.createElement("ea-color-picker");
        container.appendChild(el);
        await waitForRender();
        const trigger = el.shadowRoot.querySelector('[part="trigger"]');
        expect(trigger.getAttribute("role")).toBe("button");
      });

      it("trigger 应该有 aria-haspopup='dialog'", async () => {
        const el = document.createElement("ea-color-picker");
        container.appendChild(el);
        await waitForRender();
        const trigger = el.shadowRoot.querySelector('[part="trigger"]');
        expect(trigger.getAttribute("aria-haspopup")).toBe("dialog");
      });

      it("trigger 应该有 aria-expanded 属性", async () => {
        const el = document.createElement("ea-color-picker");
        container.appendChild(el);
        await waitForRender();
        const trigger = el.shadowRoot.querySelector('[part="trigger"]');
        expect(trigger.hasAttribute("aria-expanded")).toBe(true);
      });

      it("svpanel 应该有 role='slider'", async () => {
        const panel = document.createElement("ea-color-picker-panel");
        container.appendChild(panel);
        await waitForRender();
        const svpanel = panel.shadowRoot.querySelector('[part="svpanel"]');
        expect(svpanel.getAttribute("role")).toBe("slider");
      });

      it("svpanel 应该有 aria-label='Saturation and brightness'", async () => {
        const panel = document.createElement("ea-color-picker-panel");
        container.appendChild(panel);
        await waitForRender();
        const svpanel = panel.shadowRoot.querySelector('[part="svpanel"]');
        expect(svpanel.getAttribute("aria-label")).toBe(
          "Saturation and brightness"
        );
      });

      it("svpanel 应该有 aria-valuemin='0' 和 aria-valuemax='100'", async () => {
        const panel = document.createElement("ea-color-picker-panel");
        container.appendChild(panel);
        await waitForRender();
        const svpanel = panel.shadowRoot.querySelector('[part="svpanel"]');
        expect(svpanel.getAttribute("aria-valuemin")).toBe("0");
        expect(svpanel.getAttribute("aria-valuemax")).toBe("100");
      });

      it("hue slider 应该有 role='slider'", async () => {
        const panel = document.createElement("ea-color-picker-panel");
        container.appendChild(panel);
        await waitForRender();
        const hueSlider = panel.shadowRoot.querySelector('[part="hue-slider"]');
        expect(hueSlider.getAttribute("role")).toBe("slider");
      });

      it("hue slider 应该有 aria-label='Hue'", async () => {
        const panel = document.createElement("ea-color-picker-panel");
        container.appendChild(panel);
        await waitForRender();
        const hueSlider = panel.shadowRoot.querySelector('[part="hue-slider"]');
        expect(hueSlider.getAttribute("aria-label")).toBe("Hue");
      });

      it("hue slider 应该有 aria-valuemin='0' 和 aria-valuemax='360'", async () => {
        const panel = document.createElement("ea-color-picker-panel");
        container.appendChild(panel);
        await waitForRender();
        const hueSlider = panel.shadowRoot.querySelector('[part="hue-slider"]');
        expect(hueSlider.getAttribute("aria-valuemin")).toBe("0");
        expect(hueSlider.getAttribute("aria-valuemax")).toBe("360");
      });

      it("alpha slider 应该有 role='slider'", async () => {
        const panel = document.createElement("ea-color-picker-panel");
        container.appendChild(panel);
        await waitForRender();
        const alphaSlider = panel.shadowRoot.querySelector(
          '[part="alpha-slider"]'
        );
        expect(alphaSlider.getAttribute("role")).toBe("slider");
      });

      it("alpha slider 应该有 aria-label='Opacity'", async () => {
        const panel = document.createElement("ea-color-picker-panel");
        container.appendChild(panel);
        await waitForRender();
        const alphaSlider = panel.shadowRoot.querySelector(
          '[part="alpha-slider"]'
        );
        expect(alphaSlider.getAttribute("aria-label")).toBe("Opacity");
      });

      it("alpha slider 应该有 aria-valuemin='0' 和 aria-valuemax='100'", async () => {
        const panel = document.createElement("ea-color-picker-panel");
        container.appendChild(panel);
        await waitForRender();
        const alphaSlider = panel.shadowRoot.querySelector(
          '[part="alpha-slider"]'
        );
        expect(alphaSlider.getAttribute("aria-valuemin")).toBe("0");
        expect(alphaSlider.getAttribute("aria-valuemax")).toBe("100");
      });
    });
  });
});

describe("Color Utils", () => {
  const HSV_RGB_CASES = [
    [0, { r: 255, g: 0, b: 0 }],
    [60, { r: 255, g: 255, b: 0 }],
    [120, { r: 0, g: 255, b: 0 }],
    [180, { r: 0, g: 255, b: 255 }],
    [240, { r: 0, g: 0, b: 255 }],
    [300, { r: 255, g: 0, b: 255 }],
  ];

  const HSL_RGB_CASES = [
    ["hsl(0, 100%, 50%)", { r: 255, g: 0, b: 0 }],
    ["hsl(60, 100%, 50%)", { r: 255, g: 255, b: 0 }],
    ["hsl(120, 100%, 50%)", { r: 0, g: 255, b: 0 }],
    ["hsl(240, 100%, 50%)", { r: 0, g: 0, b: 255 }],
    ["hsl(300, 100%, 50%)", { r: 255, g: 0, b: 255 }],
    ["hsl(0, 0%, 50%)", { r: 128, g: 128, b: 128 }],
  ];

  describe("兜底值", () => {
    it("无参数返回默认黑色", () => {
      expect(new Color().getValue()).toEqual({ r: 0, g: 0, b: 0, a: 1 });
    });

    it("空字符串返回默认黑色", () => {
      expect(new Color("").getValue()).toEqual({ r: 0, g: 0, b: 0, a: 1 });
    });

    it("无法识别的字符串返回默认黑色", () => {
      expect(new Color("not-a-color").getValue()).toEqual({
        r: 0,
        g: 0,
        b: 0,
        a: 1,
      });
    });

    it("非字符串非对象输入返回默认黑色", () => {
      expect(new Color(5).getValue()).toEqual({ r: 0, g: 0, b: 0, a: 1 });
    });

    it("空对象返回默认黑色", () => {
      expect(new Color({}).getValue()).toEqual({ r: 0, g: 0, b: 0, a: 1 });
    });
  });

  describe("十六进制解析", () => {
    it("三位十六进制展开为六位", () => {
      expect(new Color("#abc").getValue()).toEqual({
        r: 170,
        g: 187,
        b: 204,
        a: 1,
      });
    });

    it("六位十六进制", () => {
      expect(new Color("#aabbcc").getValue()).toEqual({
        r: 170,
        g: 187,
        b: 204,
        a: 1,
      });
    });

    it("八位十六进制包含透明度", () => {
      const value = new Color("#aabbcc80").getValue();
      expect(value.r).toBe(170);
      expect(value.g).toBe(187);
      expect(value.b).toBe(204);
      expect(value.a).toBeCloseTo(128 / 255, 6);
    });

    it("长度非法的十六进制回落到默认黑色", () => {
      expect(new Color("#12").getValue()).toEqual({ r: 0, g: 0, b: 0, a: 1 });
    });

    it("大小写与首尾空白应被忽略", () => {
      expect(new Color("  #ABC  ").getValue()).toEqual({
        r: 170,
        g: 187,
        b: 204,
        a: 1,
      });
    });

    it("静态解析十六进制", () => {
      expect(Color.parseStringStrict("#abc")).toEqual({
        r: 170,
        g: 187,
        b: 204,
        a: 1,
      });
      const hexa = Color.parseStringStrict("#aabbcc80");
      expect(hexa.r).toBe(170);
      expect(hexa.a).toBeCloseTo(128 / 255, 6);
      expect(Color.parseStringStrict("#12")).toBeNull();
    });
  });

  describe("rgb 解析", () => {
    it("rgb 字符串", () => {
      expect(new Color("rgb(255, 0, 0)").getValue()).toEqual({
        r: 255,
        g: 0,
        b: 0,
        a: 1,
      });
    });

    it("rgba 字符串", () => {
      expect(new Color("rgba(255, 0, 0, 0.5)").getValue()).toEqual({
        r: 255,
        g: 0,
        b: 0,
        a: 0.5,
      });
    });

    it("通道越界回落到默认黑色", () => {
      expect(new Color("rgb(256, 0, 0)").getValue()).toEqual({
        r: 0,
        g: 0,
        b: 0,
        a: 1,
      });
    });

    it("透明度越界回落到默认黑色", () => {
      expect(new Color("rgba(1, 2, 3, 2)").getValue()).toEqual({
        r: 0,
        g: 0,
        b: 0,
        a: 1,
      });
    });

    it("格式不匹配回落到默认黑色", () => {
      expect(new Color("rgb(1, 2)").getValue()).toEqual({
        r: 0,
        g: 0,
        b: 0,
        a: 1,
      });
    });

    it("静态解析 rgb 并校验边界", () => {
      expect(Color.parseStringStrict("rgb(1, 2, 3)")).toEqual({
        r: 1,
        g: 2,
        b: 3,
        a: 1,
      });
      expect(Color.parseStringStrict("rgba(1, 2, 3, 0.25)")).toEqual({
        r: 1,
        g: 2,
        b: 3,
        a: 0.25,
      });
      expect(Color.parseStringStrict("rgb(300, 0, 0)")).toBeNull();
      expect(Color.parseStringStrict("rgba(1, 2, 3, 4)")).toBeNull();
      expect(Color.parseStringStrict("rgb(1, 2)")).toBeNull();
    });
  });

  describe("hsl 解析", () => {
    it.each(HSL_RGB_CASES)("实例解析 %s", (input, expected) => {
      expect(new Color(input).getValue()).toEqual({ ...expected, a: 1 });
    });

    it.each(HSL_RGB_CASES)("静态解析 %s", (input, expected) => {
      expect(Color.parseStringStrict(input)).toEqual({ ...expected, a: 1 });
    });

    it("hsla 保留透明度", () => {
      expect(new Color("hsla(120, 100%, 50%, 0.5)").getValue()).toEqual({
        r: 0,
        g: 255,
        b: 0,
        a: 0.5,
      });
    });

    it("色相越界回落到默认黑色", () => {
      expect(new Color("hsl(400, 50%, 50%)").getValue()).toEqual({
        r: 0,
        g: 0,
        b: 0,
        a: 1,
      });
    });

    it("静态解析越界与格式不匹配返回 null", () => {
      expect(Color.parseStringStrict("hsl(999, 0%, 0%)")).toBeNull();
      expect(Color.parseStringStrict("hsl(1, 2)")).toBeNull();
    });
  });

  describe("hsv 解析", () => {
    const hsvText = h => `hsv(${h}, 100%, 100%)`;

    it.each(HSV_RGB_CASES)("实例解析色相 %i 度", (h, expected) => {
      expect(new Color(hsvText(h)).getValue()).toEqual({ ...expected, a: 1 });
    });

    it.each(HSV_RGB_CASES)("静态解析色相 %i 度", (h, expected) => {
      expect(Color.parseStringStrict(hsvText(h))).toEqual({
        ...expected,
        a: 1,
      });
    });

    it("带透明度的 hsv", () => {
      expect(new Color("hsv(240, 100%, 100%, 0.5)").getValue()).toEqual({
        r: 0,
        g: 0,
        b: 255,
        a: 0.5,
      });
    });

    it("饱和度或亮度越界回落到默认黑色", () => {
      expect(new Color("hsv(0, 200%, 100%)").getValue()).toEqual({
        r: 0,
        g: 0,
        b: 0,
        a: 1,
      });
      expect(new Color("hsv(0, 100%, 200%)").getValue()).toEqual({
        r: 0,
        g: 0,
        b: 0,
        a: 1,
      });
    });

    it("静态解析越界与格式不匹配返回 null", () => {
      expect(Color.parseStringStrict("hsv(0, 100%, 200%)")).toBeNull();
      expect(Color.parseStringStrict("hsv(0, 200%, 100%)")).toBeNull();
      expect(Color.parseStringStrict("hsv(1, 2)")).toBeNull();
    });

    it("hsvStrToHsvObject 解析合法输入", () => {
      const target = new Color();
      expect(target.hsvStrToHsvObject("hsv(120, 50%, 100%, 0.5)")).toEqual({
        h: 120,
        s: 0.5,
        v: 1,
        a: 0.5,
      });
      expect(target.hsvStrToHsvObject("hsv(120, 50%, 100%)")).toEqual({
        h: 120,
        s: 0.5,
        v: 1,
        a: 1,
      });
    });

    it("hsvStrToHsvObject 非法输入返回 null", () => {
      expect(new Color().hsvStrToHsvObject("nope")).toBeNull();
    });
  });

  describe("对象输入", () => {
    it("rgb 对象做范围裁剪", () => {
      expect(new Color({ r: 300, g: -5, b: 10, a: 2 }).getValue()).toEqual({
        r: 255,
        g: 0,
        b: 10,
        a: 1,
      });
    });

    it("hsl 对象", () => {
      expect(new Color({ h: 120, s: 1, l: 0.5 }).getValue()).toEqual({
        r: 0,
        g: 255,
        b: 0,
        a: 1,
      });
    });

    it("hsv 对象", () => {
      expect(new Color({ h: 240, s: 1, v: 1 }).getValue()).toEqual({
        r: 0,
        g: 0,
        b: 255,
        a: 1,
      });
    });
  });

  describe("静态解析兜底", () => {
    it("空值与非字符串返回 null", () => {
      expect(Color.parseStringStrict("")).toBeNull();
      expect(Color.parseStringStrict(123)).toBeNull();
    });

    it("未知格式返回 null", () => {
      expect(Color.parseStringStrict("xyz(1,2,3)")).toBeNull();
    });

    it("isValidColor 判断合法性", () => {
      expect(Color.isValidColor("#fff")).toBe(true);
      expect(Color.isValidColor("rgb(1, 2, 3)")).toBe(true);
      expect(Color.isValidColor("")).toBe(false);
      expect(Color.isValidColor("nope")).toBe(false);
      expect(Color.isValidColor(42)).toBe(false);
    });
  });

  describe("格式化输出", () => {
    it("toHex 与透明度", () => {
      expect(new Color("rgb(255, 0, 0)").toHex()).toBe("#ff0000");
      expect(new Color("rgba(255, 0, 0, 0.5)").toHex(true)).toBe("#ff000080");
      expect(new Color("#ff0000").toHex(true)).toBe("#ff0000");
    });

    it("toRgb 与透明度", () => {
      expect(new Color("#ff0000").toRgb()).toBe("rgb(255, 0, 0)");
      expect(new Color("rgba(255, 0, 0, 0.5)").toRgb(true)).toBe(
        "rgba(255, 0, 0, 0.5)"
      );
      expect(new Color("#ff0000").toRgb(true)).toBe("rgb(255, 0, 0)");
    });

    it("toHsl 覆盖各主色分支", () => {
      expect(new Color("#ff0000").toHsl()).toBe("hsl(0, 100%, 50%)");
      expect(new Color("#00ff00").toHsl()).toBe("hsl(120, 100%, 50%)");
      expect(new Color("#0000ff").toHsl()).toBe("hsl(240, 100%, 50%)");
      expect(new Color("#808080").toHsl()).toBe("hsl(0, 0%, 50%)");
      expect(new Color("rgba(255, 0, 0, 0.5)").toHsl(true)).toBe(
        "hsla(0, 100%, 50%, 0.5)"
      );
    });

    it("toHsv 覆盖各主色分支", () => {
      expect(new Color("#ff0000").toHsv()).toBe("hsv(0, 100%, 100%)");
      expect(new Color("#00ff00").toHsv()).toBe("hsv(120, 100%, 100%)");
      expect(new Color("#0000ff").toHsv()).toBe("hsv(240, 100%, 100%)");
      expect(new Color("#808080").toHsv()).toBe("hsv(0, 0%, 50%)");
      expect(new Color("rgba(255, 0, 0, 0.5)").toHsv(true)).toBe(
        "hsv(0, 100%, 100%, 0.5)"
      );
    });

    it("toString 覆盖全部格式", () => {
      const color = new Color("rgba(255, 0, 0, 0.5)");
      expect(color.toString()).toBe("#ff0000");
      expect(color.toString("hex")).toBe("#ff0000");
      expect(color.toString("hexa")).toBe("#ff000080");
      expect(color.toString("rgb")).toBe("rgb(255, 0, 0)");
      expect(color.toString("rgba")).toBe("rgba(255, 0, 0, 0.5)");
      expect(color.toString("hsl")).toBe("hsl(0, 100%, 50%)");
      expect(color.toString("hsla")).toBe("hsla(0, 100%, 50%, 0.5)");
      expect(color.toString("hsv")).toBe("hsv(0, 100%, 100%)");
    });

    it("toString 大小写不敏感且未知格式回落 hex", () => {
      expect(new Color("#ff0000").toString("HEX")).toBe("#ff0000");
      expect(new Color("#ff0000").toString("cmyk")).toBe("#ff0000");
    });
  });

  describe("取值与亮度", () => {
    it("setValue 更新颜色", () => {
      const color = new Color("#000000");
      color.setValue("#0000ff");
      expect(color.getValue()).toEqual({ r: 0, g: 0, b: 255, a: 1 });
    });

    it("setValue 传非法值回落为默认黑色", () => {
      const color = new Color("#ff0000");
      color.setValue("bad");
      expect(color.getValue()).toEqual({ r: 0, g: 0, b: 0, a: 1 });
    });

    it("getValue 返回副本", () => {
      const color = new Color("#ff0000");
      const value = color.getValue();
      value.r = 0;
      expect(color.getValue().r).toBe(255);
    });

    it("白色亮度与明暗判断", () => {
      const color = new Color("#ffffff");
      expect(color.getBrightness()).toBeCloseTo(1, 5);
      expect(color.isLight()).toBe(true);
      expect(color.isDark()).toBe(false);
    });

    it("黑色亮度与明暗判断", () => {
      const color = new Color("#000000");
      expect(color.getBrightness()).toBe(0);
      expect(color.isLight()).toBe(false);
      expect(color.isDark()).toBe(true);
    });

    it("灰阶以 0.5 为明暗分界", () => {
      expect(new Color("#7f7f7f").isDark()).toBe(true);
      expect(new Color("#808080").isLight()).toBe(true);
    });
  });
});
