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
    internals.setFormValue = internals.setFormValue || function () {};
  }
  return internals;
};

import { waitForRender } from "./utils/waitForRender.js";

import "../components/ea-input/index.ts";

describe("EaInput", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("基本功能", () => {
    it("应该正确渲染组件", async () => {
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
        "label",
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

  describe("Label 属性", () => {
    it("默认 label 应该是空字符串", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      expect(input.label).toBe("");
    });

    it("应该支持 label 属性", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("label", "用户名");
      container.appendChild(input);

      await waitForRender();

      expect(input.label).toBe("用户名");
      const labelElement = input.shadowRoot.querySelector(
        ".ea-input__form-label"
      );
      expect(labelElement.textContent).toBe("用户名");
    });

    it("label 为空时标签元素应该隐藏", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      const labelElement = input.shadowRoot.querySelector(
        ".ea-input__form-label"
      );
      expect(labelElement.textContent).toBe("");
    });

    it("动态修改 label 应该更新标签文本", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      input.setAttribute("label", "密码");
      await waitForRender();

      const labelElement = input.shadowRoot.querySelector(
        ".ea-input__form-label"
      );
      expect(labelElement.textContent).toBe("密码");
    });
  });

  describe("Type 属性", () => {
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

    it("应该支持常见输入类型", async () => {
      const types = [
        "text",
        "password",
        "email",
        "number",
        "search",
        "tel",
        "url",
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
        expect(originalElement.type).toBe(type);

        input.remove();
      }
    });

    it("从 text 切换到 textarea 应该渲染 textarea 元素", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      expect(input.shadowRoot.querySelector("input.ea-input__original")).toBeTruthy();

      input.setAttribute("type", "textarea");
      await waitForRender();

      expect(input.shadowRoot.querySelector("textarea.ea-input__original")).toBeTruthy();
    });

    it("从 textarea 切换到 text 应该渲染 input 元素", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("type", "textarea");
      container.appendChild(input);

      await waitForRender();

      expect(input.shadowRoot.querySelector("textarea.ea-input__original")).toBeTruthy();

      input.setAttribute("type", "text");
      await waitForRender();

      expect(input.shadowRoot.querySelector("input.ea-input__original")).toBeTruthy();
    });

    it("从 text 切换到 textarea 后输入事件应该正常工作", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      input.setAttribute("type", "textarea");
      await waitForRender();

      const handler = vi.fn();
      input.addEventListener("input", handler);

      const textarea = input.shadowRoot.querySelector(
        "textarea.ea-input__original"
      );
      textarea.value = "hello textarea";
      textarea.dispatchEvent(new Event("input", { bubbles: true }));
      await waitForRender();

      expect(handler).toHaveBeenCalled();
      expect(input.value).toBe("hello textarea");
    });

    it("从 textarea 切换到 text 后输入事件应该正常工作", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("type", "textarea");
      container.appendChild(input);

      await waitForRender();

      input.setAttribute("type", "text");
      await waitForRender();

      const handler = vi.fn();
      input.addEventListener("input", handler);

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      inputElement.value = "hello input";
      inputElement.dispatchEvent(new Event("input", { bubbles: true }));
      await waitForRender();

      expect(handler).toHaveBeenCalled();
      expect(input.value).toBe("hello input");
    });
  });

  describe("Value 属性", () => {
    it("默认 value 应该是空字符串", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      expect(input.value).toBe("");
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

      expect(input.value).toBe("test value");
      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.value).toBe("test value");
    });

    it("value 变化时应该更新内部 input", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      input.setAttribute("value", "new value");
      await waitForRender();

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.value).toBe("new value");
    });

    it("通过 JS 属性设置 value 应该更新内部 input", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      input.value = "js value";
      await waitForRender();

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.value).toBe("js value");
    });
  });

  describe("Placeholder 属性", () => {
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

  describe("Disabled 属性", () => {
    it("默认 disabled 应该是 false", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      expect(input.disabled).toBe(false);
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

      expect(input.disabled).toBe(true);
      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.disabled).toBe(true);
    });
  });

  describe("Readonly 属性", () => {
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

  describe("Size 属性", () => {
    it("默认 size 应该是 default", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      expect(input.size).toBe("default");
    });

    it("应该支持 size='large'", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("size", "large");
      container.appendChild(input);

      await waitForRender();

      expect(input.size).toBe("large");
    });

    it("应该支持 size='small'", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("size", "small");
      container.appendChild(input);

      await waitForRender();

      expect(input.size).toBe("small");
    });
  });

  describe("Clearable 属性", () => {
    it("默认 clearable 应该是 false", () => {
      const input = document.createElement("ea-input");
      expect(input.clearable).toBe(false);
    });

    it("设置 clearable 属性应该启用清空功能", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("clearable", "");
      container.appendChild(input);

      await waitForRender();

      expect(input.clearable).toBe(true);
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
      input.setAttribute("clear-icon", "trash");
      container.appendChild(input);

      await waitForRender();

      expect(input.clearIcon).toBe("trash");
    });

    it("点击 clear-icon 应该清空输入框值", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("clearable", "");
      input.setAttribute("value", "test value");
      container.appendChild(input);

      await waitForRender();

      const clearIcon = input.shadowRoot.querySelector(".ea-input__clear-icon");
      clearIcon.click();
      await waitForRender();

      expect(input.value).toBe("");
      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.value).toBe("");
    });

    it("点击 clear-icon 应该触发 ea-clear 事件", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("clearable", "");
      input.setAttribute("value", "test value");
      container.appendChild(input);

      await waitForRender();

      const handler = vi.fn();
      input.addEventListener("ea-clear", handler);

      const clearIcon = input.shadowRoot.querySelector(".ea-input__clear-icon");
      clearIcon.click();
      await waitForRender();

      expect(handler).toHaveBeenCalled();
      expect(handler.mock.calls[0][0].detail.oldValue).toBe("test value");
    });
  });

  describe("Show Password 属性", () => {
    it("默认 showPassword 应该是 false", () => {
      const input = document.createElement("ea-input");
      expect(input.showPassword).toBe(false);
    });

    it("设置 showPassword 属性应该启用密码显示切换", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("type", "password");
      input.setAttribute("show-password", "");
      container.appendChild(input);

      await waitForRender();

      expect(input.showPassword).toBe(true);
    });

    it("应该包含 show-password-icon CSS Part", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("type", "password");
      input.setAttribute("show-password", "");
      container.appendChild(input);

      await waitForRender();

      expect(
        input.shadowRoot.querySelector('[part="show-password-icon"]')
      ).toBeTruthy();
    });

    it("点击 show-password-icon 应该从 password 切换到 text", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("type", "password");
      input.setAttribute("show-password", "");
      input.setAttribute("value", "secret");
      container.appendChild(input);

      await waitForRender();

      const icon = input.shadowRoot.querySelector(
        ".ea-input__show-password-icon"
      );
      icon.click();
      await waitForRender();

      expect(input.type).toBe("text");
    });

    it("点击 show-password-icon 应该从 text 切换到 password", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("type", "password");
      input.setAttribute("show-password", "");
      input.setAttribute("value", "secret");
      container.appendChild(input);

      await waitForRender();

      const icon = input.shadowRoot.querySelector(
        ".ea-input__show-password-icon"
      );
      icon.click();
      await waitForRender();

      expect(input.type).toBe("text");

      icon.click();
      await waitForRender();

      expect(input.type).toBe("password");
    });

    it("密码切换后输入框的值应该保留", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("type", "password");
      input.setAttribute("show-password", "");
      input.setAttribute("value", "my-secret");
      container.appendChild(input);

      await waitForRender();

      const icon = input.shadowRoot.querySelector(
        ".ea-input__show-password-icon"
      );

      icon.click();
      await waitForRender();

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.value).toBe("my-secret");
      expect(input.value).toBe("my-secret");

      icon.click();
      await waitForRender();

      const inputElement2 = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement2.value).toBe("my-secret");
      expect(input.value).toBe("my-secret");
    });

    it("密码切换后继续输入应该正常触发 input 事件", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("type", "password");
      input.setAttribute("show-password", "");
      input.setAttribute("value", "secret");
      container.appendChild(input);

      await waitForRender();

      const icon = input.shadowRoot.querySelector(
        ".ea-input__show-password-icon"
      );
      icon.click();
      await waitForRender();

      const handler = vi.fn();
      input.addEventListener("input", handler);

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      inputElement.value = "new-secret";
      inputElement.dispatchEvent(new Event("input", { bubbles: true }));
      await waitForRender();

      expect(handler).toHaveBeenCalled();
      expect(input.value).toBe("new-secret");
    });
  });

  describe("Maxlength/Minlength 属性", () => {
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

  describe("Show Word Limit 属性", () => {
    it("默认 showWordLimit 应该是 false", () => {
      const input = document.createElement("ea-input");
      expect(input.showWordLimit).toBe(false);
    });

    it("设置 showWordLimit 应该显示字数统计", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("maxlength", "10");
      input.setAttribute("show-word-limit", "");
      container.appendChild(input);

      await waitForRender();

      expect(input.showWordLimit).toBe(true);
      expect(input.shadowRoot.querySelector('[part="count"]')).toBeTruthy();
    });

    it("字数统计应该显示正确的内容格式", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("maxlength", "10");
      input.setAttribute("show-word-limit", "");
      input.setAttribute("value", "hello");
      container.appendChild(input);

      await waitForRender();

      const wordCount = input.shadowRoot.querySelector(".ea-input__word-count");
      expect(wordCount.textContent).toBe("5 / 10");
    });

    it("textarea 类型应该支持字数统计", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("type", "textarea");
      input.setAttribute("maxlength", "100");
      input.setAttribute("show-word-limit", "");
      container.appendChild(input);

      await waitForRender();

      const wordCount = input.shadowRoot.querySelector(".ea-input__word-count");
      expect(wordCount).toBeTruthy();
      expect(wordCount.textContent).toBe("0 / 100");
    });

    it("输入内容后字数统计应该正确更新", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("maxlength", "10");
      input.setAttribute("show-word-limit", "");
      container.appendChild(input);

      await waitForRender();

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      inputElement.value = "hello";
      inputElement.dispatchEvent(new Event("input", { bubbles: true }));
      await waitForRender();

      const wordCount = input.shadowRoot.querySelector(".ea-input__word-count");
      expect(wordCount.textContent).toBe("5 / 10");
    });

    it("清空输入后字数统计应该重置为 0", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("maxlength", "10");
      input.setAttribute("show-word-limit", "");
      input.setAttribute("value", "hello");
      container.appendChild(input);

      await waitForRender();

      input.value = "";
      await waitForRender();

      const wordCount = input.shadowRoot.querySelector(".ea-input__word-count");
      expect(wordCount.textContent).toBe("0 / 10");
    });
  });

  describe("Prefix/Suffix Icon 属性", () => {
    it("默认 prefixIcon 应该是空字符串", () => {
      const input = document.createElement("ea-input");
      expect(input.prefixIcon).toBe("");
    });

    it("应该支持 prefixIcon 属性", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("prefix-icon", "search");
      container.appendChild(input);

      await waitForRender();

      expect(input.prefixIcon).toBe("search");
    });

    it("默认 suffixIcon 应该是空字符串", () => {
      const input = document.createElement("ea-input");
      expect(input.suffixIcon).toBe("");
    });

    it("应该支持 suffixIcon 属性", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("suffix-icon", "calendar");
      container.appendChild(input);

      await waitForRender();

      expect(input.suffixIcon).toBe("calendar");
    });
  });

  describe("Textarea 属性", () => {
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
      expect(textareaElement.rows).toBe(4);
    });

    it("应该支持 autosize 属性", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("type", "textarea");
      input.setAttribute("autosize", "");
      container.appendChild(input);

      await waitForRender();

      expect(input.autosize).toBe(true);
    });

    it("应该支持 minRows 属性", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("type", "textarea");
      input.setAttribute("min-rows", "2");
      container.appendChild(input);

      await waitForRender();

      expect(input.minRows).toBe(2);
    });

    it("应该支持 maxRows 属性", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("type", "textarea");
      input.setAttribute("max-rows", "6");
      container.appendChild(input);

      await waitForRender();

      expect(input.maxRows).toBe(6);
    });

    it("应该支持 resize 属性", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("type", "textarea");
      input.setAttribute("resize", "none");
      container.appendChild(input);

      await waitForRender();

      expect(input.resize).toBe("none");
    });
  });

  describe("原生属性", () => {
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

    it("应该支持 aria-label 属性", async () => {
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

  describe("插槽", () => {
    it("应该支持 prepend 插槽", async () => {
      const input = document.createElement("ea-input");
      input.innerHTML = `<div slot="prepend">Http://</div>`;
      container.appendChild(input);

      await waitForRender();

      const prependSlot = input.shadowRoot.querySelector(
        'slot[name="prepend"]'
      );
      expect(prependSlot).toBeTruthy();
    });

    it("应该支持 append 插槽", async () => {
      const input = document.createElement("ea-input");
      input.innerHTML = `<div slot="append">.com</div>`;
      container.appendChild(input);

      await waitForRender();

      const appendSlot = input.shadowRoot.querySelector('slot[name="append"]');
      expect(appendSlot).toBeTruthy();
    });

    it("应该支持 prefix 插槽", async () => {
      const input = document.createElement("ea-input");
      input.innerHTML = `<ea-icon name="search" slot="prefix"></ea-icon>`;
      container.appendChild(input);

      await waitForRender();

      const prefixSlot = input.shadowRoot.querySelector('slot[name="prefix"]');
      expect(prefixSlot).toBeTruthy();
    });

    it("应该支持 suffix 插槽", async () => {
      const input = document.createElement("ea-input");
      input.innerHTML = `<ea-icon name="calendar" slot="suffix"></ea-icon>`;
      container.appendChild(input);

      await waitForRender();

      const suffixSlot = input.shadowRoot.querySelector('slot[name="suffix"]');
      expect(suffixSlot).toBeTruthy();
    });
  });

  describe("方法", () => {
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

      expect(input.value).toBe("");
      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.value).toBe("");
    });
  });

  describe("事件", () => {
    it("应该触发 input 事件", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );

      const handler = vi.fn();
      input.addEventListener("input", handler);

      inputElement.value = "new value";
      inputElement.dispatchEvent(new Event("input", { bubbles: true }));

      await waitForRender();

      expect(handler).toHaveBeenCalled();
      expect(handler.mock.calls[0][0].detail.value).toBe("new value");
    });

    it("应该触发 ea-clear 事件", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("clearable", "");
      input.setAttribute("value", "test value");
      container.appendChild(input);

      await waitForRender();

      const handler = vi.fn();
      input.addEventListener("ea-clear", handler);

      const clearIcon = input.shadowRoot.querySelector(".ea-input__clear-icon");
      clearIcon.click();

      await waitForRender();

      expect(handler).toHaveBeenCalled();
      expect(handler.mock.calls[0][0].detail.oldValue).toBe("test value");
    });
  });

  describe("表单验证", () => {
    it("应该支持表单验证方法", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      expect(typeof input.checkValidity).toBe("function");
      expect(typeof input.reportValidity).toBe("function");
    });

    it("checkValidity 应该返回 true 当输入有效时", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      expect(input.checkValidity()).toBe(true);
    });

    it("应该正确设置 required 属性", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("required", "");
      container.appendChild(input);

      await waitForRender();

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.required).toBe(true);
      expect(input.required).toBe(true);
    });

    it("应该支持 setCustomValidity 方法", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      expect(typeof input.setCustomValidity).toBe("function");
    });

    it("设置 disabled 后不应该影响验证方法存在", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("disabled", "");
      container.appendChild(input);

      await waitForRender();

      expect(typeof input.checkValidity).toBe("function");
      expect(typeof input.reportValidity).toBe("function");
    });
  });

  describe("焦点状态", () => {
    it("聚焦时应该添加 is-focus 状态类名", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      inputElement.dispatchEvent(new Event("focusin", { bubbles: true }));
      await waitForRender();

      const el = input.shadowRoot.querySelector(".ea-input");
      expect(el.classList.contains("is-focus")).toBe(true);
    });

    it("失焦时应该移除 is-focus 状态类名", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      inputElement.dispatchEvent(new Event("focusin", { bubbles: true }));
      await waitForRender();

      inputElement.dispatchEvent(new Event("focusout", { bubbles: true }));
      await waitForRender();

      const el = input.shadowRoot.querySelector(".ea-input");
      expect(el.classList.contains("is-focus")).toBe(false);
    });
  });

  describe("BEM 类名", () => {
    it("容器应该有 ea-input 类名", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      const el = input.shadowRoot.querySelector(".ea-input");
      expect(el).toBeTruthy();
    });

    it("设置 size 应该添加对应修饰符类名", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("size", "large");
      container.appendChild(input);

      await waitForRender();

      const el = input.shadowRoot.querySelector(".ea-input");
      expect(el.classList.contains("ea-input--size-large")).toBe(true);
    });

    it("设置 disabled 应该添加 is-disabled 状态类名", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("disabled", "");
      container.appendChild(input);

      await waitForRender();

      const el = input.shadowRoot.querySelector(".ea-input");
      expect(el.classList.contains("is-disabled")).toBe(true);
    });

    it("设置 type='textarea' 应该添加 ea-input--textarea 修饰符类名", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("type", "textarea");
      container.appendChild(input);

      await waitForRender();

      const el = input.shadowRoot.querySelector(".ea-input");
      expect(el.classList.contains("ea-input--textarea")).toBe(true);
    });

    it("clearable 且有值时应该添加 is-clearable 状态类名", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("clearable", "");
      input.setAttribute("value", "test");
      container.appendChild(input);

      await waitForRender();

      const el = input.shadowRoot.querySelector(".ea-input");
      expect(el.classList.contains("is-clearable")).toBe(true);
    });

    it("clearable 无值时不应该添加 is-clearable 状态类名", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("clearable", "");
      container.appendChild(input);

      await waitForRender();

      const el = input.shadowRoot.querySelector(".ea-input");
      expect(el.classList.contains("is-clearable")).toBe(false);
    });

    it("showPassword 且 type 为 password 时应该添加 ea-input--show-password 修饰符类名", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("type", "password");
      input.setAttribute("show-password", "");
      input.setAttribute("value", "secret");
      container.appendChild(input);

      await waitForRender();

      const el = input.shadowRoot.querySelector(".ea-input");
      expect(el.classList.contains("ea-input--show-password")).toBe(true);
    });

    it("showWordLimit 且有 maxlength 时应该添加 ea-input--show-word-limit 修饰符类名", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("maxlength", "10");
      input.setAttribute("show-word-limit", "");
      container.appendChild(input);

      await waitForRender();

      const el = input.shadowRoot.querySelector(".ea-input");
      expect(el.classList.contains("ea-input--show-word-limit")).toBe(true);
    });
  });

  describe("公共方法", () => {
    it("focus() 应该设置焦点状态", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      input.focus();
      await waitForRender();

      const el = input.shadowRoot.querySelector(".ea-input");
      expect(el.classList.contains("is-focus")).toBe(true);
    });

    it("focus() 应该支持 FocusOptions 参数", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      expect(() => input.focus({ preventScroll: true })).not.toThrow();
    });

    it("blur() 应该移除焦点状态", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      input.focus();
      await waitForRender();

      input.blur();
      await waitForRender();

      const el = input.shadowRoot.querySelector(".ea-input");
      expect(el.classList.contains("is-focus")).toBe(false);
    });

    it("select() 应该选中输入框中的文字", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("value", "hello world");
      container.appendChild(input);

      await waitForRender();

      input.focus();
      input.select();

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.selectionStart).toBe(0);
      expect(inputElement.selectionEnd).toBe(11);
    });

    it("setRangeText() 应该替换指定范围的文本", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("value", "hello world");
      container.appendChild(input);

      await waitForRender();

      input.setRangeText("beautiful", 6, 11, "end");

      expect(input.value).toBe("hello beautiful");
    });

    it("setSelectionRange() 应该设置选区范围", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("value", "hello world");
      container.appendChild(input);

      await waitForRender();

      input.focus();
      input.setSelectionRange(0, 5);

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.selectionStart).toBe(0);
      expect(inputElement.selectionEnd).toBe(5);
    });

    it("stepUp() 应该增加 number 类型输入框的值", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("type", "number");
      input.setAttribute("value", "5");
      container.appendChild(input);

      await waitForRender();

      input.stepUp();

      expect(input.value).toBe("6");
    });

    it("stepDown() 应该减少 number 类型输入框的值", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("type", "number");
      input.setAttribute("value", "5");
      container.appendChild(input);

      await waitForRender();

      input.stepDown();

      expect(input.value).toBe("4");
    });

    it("stepUp() 在非 number 类型上不应该有效果", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("type", "text");
      input.setAttribute("value", "5");
      container.appendChild(input);

      await waitForRender();

      input.stepUp();

      expect(input.value).toBe("5");
    });

    it("stepDown() 在非 number 类型上不应该有效果", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("type", "text");
      input.setAttribute("value", "5");
      container.appendChild(input);

      await waitForRender();

      input.stepDown();

      expect(input.value).toBe("5");
    });

    it("showPicker() 方法应该存在", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      expect(typeof input.showPicker).toBe("function");
    });

    it("clear() 应该清空输入框的值", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("value", "test value");
      container.appendChild(input);

      await waitForRender();

      input.clear();
      await waitForRender();

      expect(input.value).toBe("");
      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.value).toBe("");
    });
  });

  describe("事件", () => {
    it("获得焦点时应该触发 focus 事件", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      const handler = vi.fn();
      input.addEventListener("focus", handler);

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      inputElement.dispatchEvent(new Event("focusin", { bubbles: true }));
      await waitForRender();

      expect(handler).toHaveBeenCalled();
    });

    it("失去焦点时应该触发 blur 事件", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      const handler = vi.fn();
      input.addEventListener("blur", handler);

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      inputElement.dispatchEvent(new Event("focusin", { bubbles: true }));
      await waitForRender();

      inputElement.dispatchEvent(new Event("focusout", { bubbles: true }));
      await waitForRender();

      expect(handler).toHaveBeenCalled();
    });

    it("值提交变化时应该触发 change 事件", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      const handler = vi.fn();
      input.addEventListener("change", handler);

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      inputElement.value = "new value";
      inputElement.dispatchEvent(new Event("change", { bubbles: true }));
      await waitForRender();

      expect(handler).toHaveBeenCalled();
      expect(handler.mock.calls[0][0].detail.value).toBe("new value");
    });

    it("输入时应该触发 input 事件", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await waitForRender();

      const handler = vi.fn();
      input.addEventListener("input", handler);

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      inputElement.value = "typing";
      inputElement.dispatchEvent(new Event("input", { bubbles: true }));
      await waitForRender();

      expect(handler).toHaveBeenCalled();
      expect(handler.mock.calls[0][0].detail.value).toBe("typing");
    });

    it("清空时应该触发 ea-clear 事件", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("clearable", "");
      input.setAttribute("value", "test value");
      container.appendChild(input);

      await waitForRender();

      const handler = vi.fn();
      input.addEventListener("ea-clear", handler);

      const clearIcon = input.shadowRoot.querySelector(".ea-input__clear-icon");
      clearIcon.click();
      await waitForRender();

      expect(handler).toHaveBeenCalled();
      expect(handler.mock.calls[0][0].detail.oldValue).toBe("test value");
    });
  });
});
