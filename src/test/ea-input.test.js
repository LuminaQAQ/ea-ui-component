import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender.js";

// 导入 ea-input 组件
import "../components/ea-input/index.ts";

describe("EaInput Component", () => {
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
    it("应该正确渲染 ea-input 组件", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      expect(input).toBeDefined();
      expect(input.shadowRoot).toBeDefined();
    });

    it("应该包含所有 CSS Parts", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      const parts = [
        "container",
        "region",
        "prepend",
        "inner",
        "prefix",
        "original-wrapper",
        "original",
        "suffix",
        "clear-icon",
        "show-password-icon",
        "suffix-icon",
        "count",
        "append",
        "label",
      ];

      parts.forEach(part => {
        expect(input.shadowRoot.querySelector(`[part="${part}"]`)).toBeTruthy();
      });
    });

    it("应该包含原生 input 元素", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement).toBeTruthy();
    });
  });

  /**
   * Label 属性测试
   */
  describe("Label Attribute", () => {
    it("默认 label 应该是空字符串", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      expect(input.getAttribute("label")).toBe(null);
    });

    it("应该支持 label 属性", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("label", "用户名");
      container.appendChild(input);

      await waitForRender();

      expect(input.getAttribute("label")).toBe("用户名");
    });

    it("label 应该正确显示在标签上", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("label", "邮箱地址");
      container.appendChild(input);

      await waitForRender();

      const labelElement = input.shadowRoot.querySelector(
        ".ea-input__form-label"
      );
      expect(labelElement).toBeTruthy();
      expect(labelElement.textContent).toBe("邮箱地址");
    });
  });

  /**
   * Type 属性测试
   */
  describe("Type Attribute", () => {
    it("默认 type 应该是 text", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.type).toBe("text");
    });

    it("应该支持 type='password'", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("type", "password");
      container.appendChild(input);

      await waitForRender();

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.type).toBe("password");
    });

    it("应该支持 type='textarea'", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("type", "textarea");
      container.appendChild(input);

      await waitForRender();

      const textareaElement = input.shadowRoot.querySelector(
        "textarea.ea-input__original"
      );
      expect(textareaElement).toBeTruthy();
    });

    it("应该支持所有输入类型", async () => {
      const types = [
        "text",
        "password",
        "email",
        "number",
        "search",
        "tel",
        "url",
        "button",
        "checkbox",
        "color",
        "date",
        "datetime-local",
        "file",
        "hidden",
        "image",
        "month",
        "radio",
        "range",
        "reset",
        "submit",
        "time",
        "week",
      ];

      for (const type of types) {
        const input = document.createElement("ea-input");
        input.setAttribute("type", type);
        container.appendChild(input);

        await waitForRender();

        const originalElement = input.shadowRoot.querySelector(
          ".ea-input__original"
        );
        expect(originalElement).toBeTruthy();

        if (type !== "textarea") {
          expect(originalElement.type).toBe(type);
        }

        input.remove();
      }
    });
  });

  /**
   * Value 属性测试
   */
  describe("Value Attribute", () => {
    it("默认 value 应该是空字符串", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.value).toBe("");
    });

    it("应该支持 value 属性", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("value", "test value");
      container.appendChild(input);

      await waitForRender();

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.value).toBe("test value");
    });

    it("应该支持不同的 value 值", async () => {
      const values = ["hello", "world", "123", "test@example.com"];

      for (const value of values) {
        const input = document.createElement("ea-input");
        input.setAttribute("value", value);
        container.appendChild(input);

        await waitForRender();

        const inputElement = input.shadowRoot.querySelector(
          "input.ea-input__original"
        );
        expect(inputElement.value).toBe(value);
        input.remove();
      }
    });
  });

  /**
   * Placeholder 属性测试
   */
  describe("Placeholder Attribute", () => {
    it("默认 placeholder 应该是空字符串", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.placeholder).toBe("");
    });

    it("应该支持 placeholder 属性", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("placeholder", "Please input");
      container.appendChild(input);

      await waitForRender();

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.placeholder).toBe("Please input");
    });
  });

  /**
   * Disabled 属性测试
   */
  describe("Disabled Attribute", () => {
    it("默认 disabled 应该是 false", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.disabled).toBe(false);
    });

    it("设置 disabled 属性应该禁用输入框", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("disabled", "");
      container.appendChild(input);

      await waitForRender();

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.disabled).toBe(true);
    });
  });

  /**
   * Readonly 属性测试
   */
  describe("Readonly Attribute", () => {
    it("默认 readonly 应该是 false", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.readOnly).toBe(false);
    });

    it("设置 readonly 属性应该使输入框只读", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("readonly", "");
      container.appendChild(input);

      await waitForRender();

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.readOnly).toBe(true);
    });
  });

  /**
   * Size 属性测试
   */
  describe("Size Attribute", () => {
    it("默认 size 应该是 default", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      expect(input.getAttribute("size")).toBe(null);
    });

    it("应该支持 size='large'", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("size", "large");
      container.appendChild(input);

      await waitForRender();

      expect(input.getAttribute("size")).toBe("large");
    });

    it("应该支持 size='small'", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("size", "small");
      container.appendChild(input);

      await waitForRender();

      expect(input.getAttribute("size")).toBe("small");
    });

    it("应该支持不同的 size 值", async () => {
      const sizes = ["large", "default", "small"];

      for (const size of sizes) {
        const input = document.createElement("ea-input");
        input.setAttribute("size", size);
        expect(input.getAttribute("size")).toBe(size);
      }
    });
  });

  /**
   * Clearable 属性测试
   */
  describe("Clearable Attribute", () => {
    it("默认 clearable 应该是 false", () => {
      const input = document.createElement("ea-input");
      expect(input.hasAttribute("clearable")).toBe(false);
    });

    it("设置 clearable 属性应该启用清空功能", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("clearable", "");
      container.appendChild(input);

      await waitForRender();

      expect(input.hasAttribute("clearable")).toBe(true);
    });

    it("应该包含 clear-icon CSS Part", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("clearable", "");
      container.appendChild(input);

      await waitForRender();

      expect(
        input.shadowRoot.querySelector('[part="clear-icon"]')
      ).toBeTruthy();
    });

    it("应该支持自定义 clearIcon", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("clearable", "");
      input.setAttribute("clearIcon", "trash");
      container.appendChild(input);

      await waitForRender();

      expect(input.getAttribute("clearIcon")).toBe("trash");
    });
  });

  /**
   * Show Password 属性测试
   */
  describe("Show Password Attribute", () => {
    it("默认 showPassword 应该是 false", () => {
      const input = document.createElement("ea-input");
      expect(input.hasAttribute("showPassword")).toBe(false);
    });

    it("设置 showPassword 属性应该启用密码显示切换", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("type", "password");
      input.setAttribute("showPassword", "");
      container.appendChild(input);

      await waitForRender();

      expect(input.hasAttribute("showPassword")).toBe(true);
    });

    it("应该包含 show-password-icon CSS Part", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("type", "password");
      input.setAttribute("showPassword", "");
      container.appendChild(input);

      await waitForRender();

      expect(
        input.shadowRoot.querySelector('[part="show-password-icon"]')
      ).toBeTruthy();
    });
  });

  /**
   * Maxlength/Minlength 属性测试
   */
  describe("Maxlength/Minlength Attributes", () => {
    it("应该支持 maxlength 属性", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("maxlength", "10");
      container.appendChild(input);

      await waitForRender();

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.maxLength).toBe(10);
    });

    it("应该支持 minlength 属性", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("minlength", "5");
      container.appendChild(input);

      await waitForRender();

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.minLength).toBe(5);
    });
  });

  /**
   * Show Word Limit 属性测试
   */
  describe("Show Word Limit Attribute", () => {
    it("默认 showWordLimit 应该是 false", () => {
      const input = document.createElement("ea-input");
      expect(input.hasAttribute("showWordLimit")).toBe(false);
    });

    it("设置 showWordLimit 应该显示字数统计", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("maxlength", "10");
      input.setAttribute("showWordLimit", "");
      container.appendChild(input);

      await waitForRender();

      expect(input.hasAttribute("showWordLimit")).toBe(true);
      expect(input.shadowRoot.querySelector('[part="count"]')).toBeTruthy();
    });
  });

  /**
   * Prefix/Suffix Icon 属性测试
   */
  describe("Prefix/Suffix Icon Attributes", () => {
    it("默认 prefixIcon 应该是空字符串", () => {
      const input = document.createElement("ea-input");
      expect(input.getAttribute("prefixIcon")).toBe(null);
    });

    it("应该支持 prefixIcon 属性", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("prefixIcon", "search");
      container.appendChild(input);

      await waitForRender();

      expect(input.getAttribute("prefixIcon")).toBe("search");
    });

    it("默认 suffixIcon 应该是空字符串", () => {
      const input = document.createElement("ea-input");
      expect(input.getAttribute("suffixIcon")).toBe(null);
    });

    it("应该支持 suffixIcon 属性", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("suffixIcon", "calendar");
      container.appendChild(input);

      await waitForRender();

      expect(input.getAttribute("suffixIcon")).toBe("calendar");
    });
  });

  /**
   * Textarea 相关属性测试
   */
  describe("Textarea Attributes", () => {
    it("应该支持 rows 属性", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("type", "textarea");
      input.setAttribute("rows", "4");
      container.appendChild(input);

      await waitForRender();

      const textareaElement = input.shadowRoot.querySelector(
        "textarea.ea-input__original"
      );
      expect(textareaElement).toBeTruthy();
    });

    it("应该支持 autosize 属性", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("type", "textarea");
      input.setAttribute("autosize", "");
      container.appendChild(input);

      await waitForRender();

      expect(input.hasAttribute("autosize")).toBe(true);
    });

    it("应该支持 minRows 属性", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("type", "textarea");
      input.setAttribute("minRows", "2");
      container.appendChild(input);

      await waitForRender();

      expect(input.getAttribute("minRows")).toBe("2");
    });

    it("应该支持 maxRows 属性", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("type", "textarea");
      input.setAttribute("maxRows", "6");
      container.appendChild(input);

      await waitForRender();

      expect(input.getAttribute("maxRows")).toBe("6");
    });

    it("应该支持 resize 属性", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("type", "textarea");
      input.setAttribute("resize", "none");
      container.appendChild(input);

      await waitForRender();

      expect(input.getAttribute("resize")).toBe("none");
    });
  });

  /**
   * 新增属性测试
   */
  describe("New Attributes", () => {
    it("应该支持 min 属性", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("type", "number");
      input.setAttribute("min", "0");
      container.appendChild(input);

      await waitForRender();

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.min).toBe("0");
    });

    it("应该支持 max 属性", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("type", "number");
      input.setAttribute("max", "100");
      container.appendChild(input);

      await waitForRender();

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.max).toBe("100");
    });

    it("应该支持 step 属性", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("type", "number");
      input.setAttribute("step", "0.5");
      container.appendChild(input);

      await waitForRender();

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.step).toBe("0.5");
    });

    it("应该支持 pattern 属性", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("pattern", "[A-Za-z]{3}");
      container.appendChild(input);

      await waitForRender();

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.pattern).toBe("[A-Za-z]{3}");
    });

    it("应该支持 form 属性", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("form", "myForm");
      container.appendChild(input);

      await waitForRender();

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.getAttribute("form")).toBe("myForm");
    });

    it("应该支持 ariaLabel 属性", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("aria-label", "用户名输入框");
      container.appendChild(input);

      await waitForRender();

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.getAttribute("aria-label")).toBe("用户名输入框");
    });

    it("应该支持 tabindex 属性", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("tabindex", "1");
      container.appendChild(input);

      await waitForRender();

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.tabIndex).toBe(1);
    });

    it("应该支持 inputmode 属性", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("inputmode", "numeric");
      container.appendChild(input);

      await waitForRender();

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.inputMode).toBe("numeric");
    });
  });

  /**
   * 其他原生属性测试
   */
  describe("Other Native Attributes", () => {
    it("应该支持 name 属性", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("name", "username");
      container.appendChild(input);

      await waitForRender();

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.name).toBe("username");
    });

    it("应该支持 autocomplete 属性", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("autocomplete", "on");
      container.appendChild(input);

      await waitForRender();

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.autocomplete).toBe("on");
    });

    it("应该支持 autofocus 属性", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("autofocus", "");
      container.appendChild(input);

      await waitForRender();

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.autofocus).toBe(true);
    });

    it("应该支持 required 属性", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("required", "");
      container.appendChild(input);

      await waitForRender();

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.required).toBe(true);
    });
  });

  /**
   * 插槽测试
   */
  describe("Slots", () => {
    it("应该支持 prepend 插槽", async () => {
      const input = document.createElement("ea-input");
      input.innerHTML = `
        <div slot="prepend">Http://</div>
      `;
      container.appendChild(input);

      await waitForRender();

      const prependSlot = input.shadowRoot.querySelector(
        'slot[name="prepend"]'
      );
      expect(prependSlot).toBeTruthy();
    });

    it("应该支持 append 插槽", async () => {
      const input = document.createElement("ea-input");
      input.innerHTML = `
        <div slot="append">.com</div>
      `;
      container.appendChild(input);

      await waitForRender();

      const appendSlot = input.shadowRoot.querySelector('slot[name="append"]');
      expect(appendSlot).toBeTruthy();
    });

    it("应该支持 prefix 插槽", async () => {
      const input = document.createElement("ea-input");
      input.innerHTML = `
        <ea-icon name="search" slot="prefix"></ea-icon>
      `;
      container.appendChild(input);

      await waitForRender();

      const prefixSlot = input.shadowRoot.querySelector('slot[name="prefix"]');
      expect(prefixSlot).toBeTruthy();
    });

    it("应该支持 suffix 插槽", async () => {
      const input = document.createElement("ea-input");
      input.innerHTML = `
        <ea-icon name="calendar" slot="suffix"></ea-icon>
      `;
      container.appendChild(input);

      await waitForRender();

      const suffixSlot = input.shadowRoot.querySelector('slot[name="suffix"]');
      expect(suffixSlot).toBeTruthy();
    });
  });

  /**
   * 方法测试
   */
  describe("Methods", () => {
    it("应该存在 focus 方法", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      expect(typeof input.focus).toBe("function");
    });

    it("应该存在 blur 方法", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      expect(typeof input.blur).toBe("function");
    });

    it("应该存在 clear 方法", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      expect(typeof input.clear).toBe("function");
    });

    it("应该存在 select 方法", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      expect(typeof input.select).toBe("function");
    });

    it("clear 方法应该清空输入框内容", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("value", "test value");
      container.appendChild(input);

      await waitForRender();

      input.clear();

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.value).toBe("");
    });

    it("focus 方法应该聚焦输入框", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );

      const focusSpy = vi.spyOn(inputElement, "focus");
      input.focus();

      expect(focusSpy).toHaveBeenCalled();
    });

    it("blur 方法应该失焦输入框", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );

      const blurSpy = vi.spyOn(inputElement, "blur");
      input.blur();

      expect(blurSpy).toHaveBeenCalled();
    });
  });

  /**
   * 事件测试
   */
  describe("Events", () => {
    it("应该支持 input 事件监听", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );

      const listener = vi.fn();
      inputElement.addEventListener("input", listener);

      const event = new Event("input", { bubbles: true });
      inputElement.dispatchEvent(event);

      expect(listener).toHaveBeenCalled();
    });

    it("应该触发 focus 事件", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );

      const focusPromise = new Promise(resolve => {
        inputElement.addEventListener("focus", resolve);
      });

      inputElement.focus();

      await focusPromise;

      expect(true).toBe(true);
    });

    it("应该触发 blur 事件", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );

      const blurPromise = new Promise(resolve => {
        inputElement.addEventListener("blur", resolve);
      });

      inputElement.focus(); // 先聚焦
      inputElement.blur(); // 再失焦

      await blurPromise;

      expect(true).toBe(true);
    });

    it("应该支持 change 事件", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );

      const listener = vi.fn();
      inputElement.addEventListener("change", listener);

      const event = new Event("change", { bubbles: true });
      inputElement.dispatchEvent(event);

      expect(listener).toHaveBeenCalled();
    });
  });

  /**
   * 表单验证测试
   */
  describe("Form Validation", () => {
    it("应该支持表单验证", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("required", "");
      container.appendChild(input);

      await waitForRender();

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.validity.valid).toBe(false);
    });

    it("应该支持自定义验证消息", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("required", "");
      container.appendChild(input);

      await waitForRender();

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );

      inputElement.setCustomValidity("自定义错误消息");
      expect(inputElement.validity.customError).toBe(true);
    });
  });
});
