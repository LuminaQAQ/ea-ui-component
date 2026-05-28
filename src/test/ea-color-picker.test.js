import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender.js";

import "../components/ea-color-picker/index.ts";

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
    it("应该正确渲染 ea-color-picker 组件", async () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      await waitForRender();

      expect(picker).toBeDefined();
      expect(picker.shadowRoot).toBeDefined();
    });

    it("应该包含所有 CSS Parts", async () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      await waitForRender();

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

    it("应该包含 ea-popper 组件", async () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      await waitForRender();

      const popper = picker.shadowRoot.querySelector("ea-popper");
      expect(popper).toBeTruthy();
    });

    it("应该包含 ea-color-picker-panel 组件", async () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      await waitForRender();

      const panel = picker.shadowRoot.querySelector("ea-color-picker-panel");
      expect(panel).toBeTruthy();
    });

    it("应该包含 clear 和 confirm 按钮", async () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      await waitForRender();

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
    it("默认 label 应该是空字符串", async () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      await waitForRender();

      expect(picker.label).toBe("");
    });

    it("应该正确设置 label 属性", async () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("label", "颜色选择");
      container.appendChild(picker);

      await waitForRender();

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
    it("默认 value 应该是空字符串", async () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      await waitForRender();

      expect(picker.value).toBe("");
    });

    it("应该正确设置 value 属性", async () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("value", "#409eff");
      container.appendChild(picker);

      await waitForRender();

      expect(picker.value).toBe("#409eff");
    });

    it("value 变化时应该触发更新", async () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("value", "#409eff");
      container.appendChild(picker);

      await waitForRender();

      picker.setAttribute("value", "#67c23a");
      await waitForRender();

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
    it("默认 disabled 应该是 false", async () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      await waitForRender();

      expect(picker.disabled).toBe(false);
    });

    it("应该正确设置 disabled 属性", async () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("disabled", "");
      container.appendChild(picker);

      await waitForRender();

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

    it("默认 size 应该是空字符串", async () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      await waitForRender();

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
    it("默认 clearable 应该是 false", async () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      await waitForRender();

      expect(picker.clearable).toBe(false);
    });

    it("应该正确设置 clearable 属性", async () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("clearable", "");
      container.appendChild(picker);

      await waitForRender();

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
      it(`应该支持 color-format="${format}"`, async () => {
        const picker = document.createElement("ea-color-picker");
        picker.setAttribute("color-format", format);
        container.appendChild(picker);

        await waitForRender();

        expect(picker.colorFormat).toBe(format);
      });
    });

    it("默认 color-format 应该是 hex", async () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      await waitForRender();

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
    it("默认 showAlpha 应该是 false", async () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      await waitForRender();

      expect(picker.showAlpha).toBe(false);
    });

    it("应该正确设置 show-alpha 属性", async () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("show-alpha", "");
      container.appendChild(picker);

      await waitForRender();

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
      it(`应该支持 placement="${placement}"`, async () => {
        const picker = document.createElement("ea-color-picker");
        picker.setAttribute("placement", placement);
        container.appendChild(picker);

        await waitForRender();

        expect(picker.placement).toBe(placement);
      });
    });

    it("默认 placement 应该是 bottom", async () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      await waitForRender();

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
    it("默认 tabindex 应该是 0", async () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      await waitForRender();

      expect(picker.tabindex).toBe(0);
    });

    it("应该支持自定义 tabindex", async () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("tabindex", "3");
      container.appendChild(picker);

      await waitForRender();

      expect(picker.tabindex).toBe(3);
    });
  });

  describe("Required & Form Validation", () => {
    it("默认 required 应该是 false", async () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      await waitForRender();

      expect(picker.required).toBe(false);
    });

    it("应该支持 required 属性", async () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("required", "");
      container.appendChild(picker);

      await waitForRender();

      expect(picker.required).toBe(true);
    });

    it("应该有 checkValidity 方法", async () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      await waitForRender();

      expect(typeof picker.checkValidity).toBe("function");
    });

    it("应该有 reportValidity 方法", async () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      await waitForRender();

      expect(typeof picker.reportValidity).toBe("function");
    });

    it("required 且无 value 时 checkValidity 应该返回 false", async () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("required", "");
      container.appendChild(picker);

      await waitForRender();

      expect(picker.checkValidity()).toBe(false);
    });

    it("required 且有 value 时 checkValidity 应该返回 true", async () => {
      const picker = document.createElement("ea-color-picker");
      picker.setAttribute("required", "");
      picker.setAttribute("value", "#409eff");
      container.appendChild(picker);

      await waitForRender();

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

      await waitForRender();

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

      await waitForRender();

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
    it("应该有 show 方法", async () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      await waitForRender();

      expect(typeof picker.show).toBe("function");
    });

    it("应该有 hide 方法", async () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      await waitForRender();

      expect(typeof picker.hide).toBe("function");
    });

    it("应该有 focus 方法", async () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      await waitForRender();

      expect(typeof picker.focus).toBe("function");
    });

    it("应该有 blur 方法", async () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      await waitForRender();

      expect(typeof picker.blur).toBe("function");
    });

    it("应该有 checkValidity 方法", async () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      await waitForRender();

      expect(typeof picker.checkValidity).toBe("function");
    });

    it("应该有 reportValidity 方法", async () => {
      const picker = document.createElement("ea-color-picker");
      container.appendChild(picker);

      await waitForRender();

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
    it("应该正确渲染 ea-color-picker-panel 组件", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      container.appendChild(panel);

      await waitForRender();

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

    it("应该包含 svpanel、hue-slider 和 alpha-slider", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      container.appendChild(panel);

      await waitForRender();

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

    it("应该包含 ea-input 颜色输入框", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      container.appendChild(panel);

      await waitForRender();

      const colorInput = panel.shadowRoot.querySelector("ea-input");
      expect(colorInput).toBeTruthy();
    });
  });

  describe("Value Attribute", () => {
    it("默认 value 应该是空字符串", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      container.appendChild(panel);

      await waitForRender();

      expect(panel.value).toBe("");
    });

    it("应该正确设置 hex 格式的 value", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      panel.setAttribute("value", "#409eff");
      container.appendChild(panel);

      await waitForRender();

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

    it("应该支持 rgba 格式的值", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      panel.setAttribute("value", "rgba(64, 158, 255, 0.5)");
      panel.setAttribute("show-alpha", "");
      container.appendChild(panel);

      await waitForRender();

      expect(panel.value).toBe("rgba(64, 158, 255, 0.5)");
    });

    it("应该支持 hsl 格式的值", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      panel.setAttribute("value", "hsl(217, 100%, 62.7%)");
      container.appendChild(panel);

      await waitForRender();

      expect(panel.value).toBeTruthy();
    });

    it("value 变化时应该触发更新", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      panel.setAttribute("value", "#409eff");
      container.appendChild(panel);

      await waitForRender();

      panel.setAttribute("value", "#67c23a");
      await waitForRender();

      expect(panel.value).toBe("#67c23a");
    });
  });

  describe("Color Format Attribute", () => {
    const formats = ["hex", "rgb", "hsl", "hsv", "rgba"];

    formats.forEach(format => {
      it(`应该支持 color-format="${format}"`, async () => {
        const panel = document.createElement("ea-color-picker-panel");
        panel.setAttribute("color-format", format);
        container.appendChild(panel);

        await waitForRender();

        expect(panel.colorFormat).toBe(format);
      });
    });

    it("默认 color-format 应该是 hex", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      container.appendChild(panel);

      await waitForRender();

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
    it("默认 showAlpha 应该是 false", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      container.appendChild(panel);

      await waitForRender();

      expect(panel.showAlpha).toBe(false);
    });

    it("应该正确设置 show-alpha 属性", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      panel.setAttribute("show-alpha", "");
      container.appendChild(panel);

      await waitForRender();

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

    it("showAlpha=false 时 value 应该保持原格式不带 alpha", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      panel.setAttribute("value", "#409eff");
      container.appendChild(panel);

      await waitForRender();

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

    it("传入 rgba 值时透明度应该正确解析", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      panel.setAttribute("value", "rgba(64, 158, 255, 0.5)");
      panel.setAttribute("show-alpha", "");
      container.appendChild(panel);

      await waitForRender();

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
    it("默认 disabled 应该是 false", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      container.appendChild(panel);

      await waitForRender();

      expect(panel.disabled).toBe(false);
    });

    it("应该正确设置 disabled 属性", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      panel.setAttribute("disabled", "");
      container.appendChild(panel);

      await waitForRender();

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
    it("默认 border 应该是 false", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      container.appendChild(panel);

      await waitForRender();

      expect(panel.border).toBe(false);
    });

    it("应该正确设置 border 属性", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      panel.setAttribute("border", "");
      container.appendChild(panel);

      await waitForRender();

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
    it("默认 clearable 应该是 true", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      container.appendChild(panel);

      await waitForRender();

      expect(panel.clearable).toBe(true);
    });

    it("设置 clearable=false 应该正确生效", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      container.appendChild(panel);

      await waitForRender();

      panel.clearable = false;

      await waitForRender();

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

      await waitForRender();

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
    it("应该有 resetCursorPosition 方法", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      container.appendChild(panel);

      await waitForRender();

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
    it("clearable=true 时应该显示 ea-input", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      container.appendChild(panel);

      await waitForRender();

      const colorInput = panel.shadowRoot.querySelector("ea-input");
      expect(colorInput).toBeTruthy();
    });

    it("clearable=false 时应该显示 text-display 元素", async () => {
      const panel = document.createElement("ea-color-picker-panel");
      panel.setAttribute("clearable", "false");
      container.appendChild(panel);

      await waitForRender();

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
});
