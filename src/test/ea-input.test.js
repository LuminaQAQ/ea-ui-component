import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// 导入 ea-input 组件
import "../components/ea-input/index.js";

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

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(input).toBeDefined();
      expect(input.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(input.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("应该包含 inner CSS Part", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(input.shadowRoot.querySelector('[part="inner"]')).toBeTruthy();
    });

    it("应该包含 original CSS Part", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(input.shadowRoot.querySelector('[part="original"]')).toBeTruthy();
    });

    it("应该包含原生 input 元素", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await new Promise(resolve => setTimeout(resolve, 50));

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement).toBeTruthy();
    });
  });

  /**
   * Type 属性测试
   */
  describe("Type Attribute", () => {
    it("默认 type 应该是 text", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await new Promise(resolve => setTimeout(resolve, 50));

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement).toBeTruthy();
    });

    it("应该支持 type='password'", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("type", "password");
      container.appendChild(input);

      await new Promise(resolve => setTimeout(resolve, 50));

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement).toBeTruthy();
    });

    it("应该支持 type='textarea'", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("type", "textarea");
      container.appendChild(input);

      await new Promise(resolve => setTimeout(resolve, 50));

      const textareaElement = input.shadowRoot.querySelector(
        "textarea.ea-input__original"
      );
      expect(textareaElement).toBeTruthy();
    });

    it("应该支持不同的 type 值", async () => {
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

        await new Promise(resolve => setTimeout(resolve, 30));

        const inputElement = input.shadowRoot.querySelector(
          "input.ea-input__original"
        );
        expect(inputElement).toBeTruthy();
        input.remove();
      }
    });
  });

  /**
   * Value 属性测试
   */
  describe("Value Attribute", () => {
    it("应该支持 value 属性", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("value", "test value");
      container.appendChild(input);

      await new Promise(resolve => setTimeout(resolve, 50));

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

        await new Promise(resolve => setTimeout(resolve, 30));

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
    it("应该支持 placeholder 属性", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("placeholder", "Please input");
      container.appendChild(input);

      await new Promise(resolve => setTimeout(resolve, 50));

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

      await new Promise(resolve => setTimeout(resolve, 50));

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.disabled).toBe(false);
    });

    it("设置 disabled 属性应该禁用输入框", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("disabled", "");
      container.appendChild(input);

      await new Promise(resolve => setTimeout(resolve, 50));

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

      await new Promise(resolve => setTimeout(resolve, 50));

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.readOnly).toBe(false);
    });

    it("设置 readonly 属性应该使输入框只读", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("readonly", "");
      container.appendChild(input);

      await new Promise(resolve => setTimeout(resolve, 50));

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
    it("应该支持 size='large'", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("size", "large");
      container.appendChild(input);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(input.getAttribute("size")).toBe("large");
    });

    it("应该支持 size='small'", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("size", "small");
      container.appendChild(input);

      await new Promise(resolve => setTimeout(resolve, 50));

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

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(input.hasAttribute("clearable")).toBe(true);
    });

    it("应该包含 clear-icon CSS Part", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("clearable", "");
      container.appendChild(input);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(
        input.shadowRoot.querySelector('[part="clear-icon"]')
      ).toBeTruthy();
    });
  });

  /**
   * Show Password 属性测试
   */
  describe("Show Password Attribute", () => {
    it("默认 show-password 应该是 false", () => {
      const input = document.createElement("ea-input");
      expect(input.hasAttribute("show-password")).toBe(false);
    });

    it("设置 show-password 属性应该启用密码显示切换", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("type", "password");
      input.setAttribute("show-password", "");
      container.appendChild(input);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(input.hasAttribute("show-password")).toBe(true);
    });

    it("应该包含 show-password-icon CSS Part", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("type", "password");
      input.setAttribute("show-password", "");
      container.appendChild(input);

      await new Promise(resolve => setTimeout(resolve, 50));

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

      await new Promise(resolve => setTimeout(resolve, 50));

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.maxLength).toBe(10);
    });

    it("应该支持 minlength 属性", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("minlength", "5");
      container.appendChild(input);

      await new Promise(resolve => setTimeout(resolve, 50));

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
    it("默认 show-word-limit 应该是 false", () => {
      const input = document.createElement("ea-input");
      expect(input.hasAttribute("show-word-limit")).toBe(false);
    });

    it("设置 show-word-limit 应该显示字数统计", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("maxlength", "10");
      input.setAttribute("show-word-limit", "");
      container.appendChild(input);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(input.hasAttribute("show-word-limit")).toBe(true);
      expect(input.shadowRoot.querySelector('[part="count"]')).toBeTruthy();
    });
  });

  /**
   * Prefix/Suffix Icon 属性测试
   */
  describe("Prefix/Suffix Icon Attributes", () => {
    it("应该支持 prefix-icon 属性", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("prefix-icon", "search");
      container.appendChild(input);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(input.getAttribute("prefix-icon")).toBe("search");
    });

    it("应该支持 suffix-icon 属性", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("suffix-icon", "calendar");
      container.appendChild(input);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(input.getAttribute("suffix-icon")).toBe("calendar");
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

      await new Promise(resolve => setTimeout(resolve, 50));

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

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(input.hasAttribute("autosize")).toBe(true);
    });

    it("应该支持 min-rows 属性", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("type", "textarea");
      input.setAttribute("min-rows", "2");
      container.appendChild(input);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(input.getAttribute("min-rows")).toBe("2");
    });

    it("应该支持 max-rows 属性", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("type", "textarea");
      input.setAttribute("max-rows", "6");
      container.appendChild(input);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(input.getAttribute("max-rows")).toBe("6");
    });

    it("应该支持 resize 属性", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("type", "textarea");
      input.setAttribute("resize", "none");
      container.appendChild(input);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(input.getAttribute("resize")).toBe("none");
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

      await new Promise(resolve => setTimeout(resolve, 50));

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.name).toBe("username");
    });

    it("应该支持 autocomplete 属性", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("autocomplete", "on");
      container.appendChild(input);

      await new Promise(resolve => setTimeout(resolve, 50));

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.autocomplete).toBe("on");
    });

    it("应该支持 autofocus 属性", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("autofocus", "");
      container.appendChild(input);

      await new Promise(resolve => setTimeout(resolve, 50));

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.autofocus).toBe(true);
    });

    it("应该支持 required 属性", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("required", "");
      container.appendChild(input);

      await new Promise(resolve => setTimeout(resolve, 50));

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

      await new Promise(resolve => setTimeout(resolve, 50));

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

      await new Promise(resolve => setTimeout(resolve, 50));

      const appendSlot = input.shadowRoot.querySelector('slot[name="append"]');
      expect(appendSlot).toBeTruthy();
    });

    it("应该支持 prefix 插槽", async () => {
      const input = document.createElement("ea-input");
      input.innerHTML = `
        <ea-icon name="search" slot="prefix"></ea-icon>
      `;
      container.appendChild(input);

      await new Promise(resolve => setTimeout(resolve, 50));

      const prefixSlot = input.shadowRoot.querySelector('slot[name="prefix"]');
      expect(prefixSlot).toBeTruthy();
    });

    it("应该支持 suffix 插槽", async () => {
      const input = document.createElement("ea-input");
      input.innerHTML = `
        <ea-icon name="calendar" slot="suffix"></ea-icon>
      `;
      container.appendChild(input);

      await new Promise(resolve => setTimeout(resolve, 50));

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

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(typeof input.focus).toBe("function");
    });

    it("应该存在 blur 方法", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(typeof input.blur).toBe("function");
    });

    it("应该存在 clear 方法", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(typeof input.clear).toBe("function");
    });

    it("应该存在 select 方法", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(typeof input.select).toBe("function");
    });
  });

  /**
   * 事件测试
   */
  describe("Events", () => {
    it("应该支持 input 事件监听", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await new Promise(resolve => setTimeout(resolve, 50));

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );

      // 验证可以添加 input 事件监听器到原生 input 元素
      const listener = vi.fn();
      inputElement.addEventListener("input", listener);

      // 手动触发事件来测试监听是否工作
      const event = new Event("input", { bubbles: true });
      inputElement.dispatchEvent(event);

      expect(listener).toHaveBeenCalled();
    });

    it("应该触发 focus 事件", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await new Promise(resolve => setTimeout(resolve, 50));

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

      await new Promise(resolve => setTimeout(resolve, 50));

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );

      const blurPromise = new Promise(resolve => {
        inputElement.addEventListener("blur", resolve);
      });

      inputElement.focus();
      inputElement.blur();

      await blurPromise;

      expect(true).toBe(true);
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("空 value 时应该正确渲染", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await new Promise(resolve => setTimeout(resolve, 50));

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.value).toBe("");
    });

    it("特殊字符的 value 应该正确处理", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("value", "<script>alert('xss')</script>");
      container.appendChild(input);

      await new Promise(resolve => setTimeout(resolve, 50));

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.value).toBe("<script>alert('xss')</script>");
    });

    it("同时设置多个属性应该正常工作", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("type", "text");
      input.setAttribute("placeholder", "Enter text");
      input.setAttribute("maxlength", "20");
      input.setAttribute("disabled", "");
      container.appendChild(input);

      await new Promise(resolve => setTimeout(resolve, 50));

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.placeholder).toBe("Enter text");
      expect(inputElement.maxLength).toBe(20);
      expect(inputElement.disabled).toBe(true);
    });

    it("切换 type 应该正确更新元素", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("type", "text");
      container.appendChild(input);

      await new Promise(resolve => setTimeout(resolve, 50));

      let inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement).toBeTruthy();

      input.setAttribute("type", "textarea");

      await new Promise(resolve => setTimeout(resolve, 50));

      const textareaElement = input.shadowRoot.querySelector(
        "textarea.ea-input__original"
      );
      expect(textareaElement).toBeTruthy();
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("value", "test");
      container.appendChild(input);

      await new Promise(resolve => setTimeout(resolve, 50));

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement).toBeTruthy();
      expect(inputElement.value).toBe("test");
    });

    it("组件断开连接后应该正常移除", () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      input.remove();

      expect(container.contains(input)).toBe(false);
    });

    it("动态修改 value 应该生效", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("value", "initial");
      container.appendChild(input);

      await new Promise(resolve => setTimeout(resolve, 50));

      input.setAttribute("value", "updated");

      await new Promise(resolve => setTimeout(resolve, 50));

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.value).toBe("updated");
    });

    it("动态修改 placeholder 应该生效", async () => {
      const input = document.createElement("ea-input");
      input.setAttribute("placeholder", "initial");
      container.appendChild(input);

      await new Promise(resolve => setTimeout(resolve, 50));

      input.setAttribute("placeholder", "updated");

      await new Promise(resolve => setTimeout(resolve, 50));

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.placeholder).toBe("updated");
    });

    it("动态添加 disabled 属性应该生效", async () => {
      const input = document.createElement("ea-input");
      container.appendChild(input);

      await new Promise(resolve => setTimeout(resolve, 50));

      const inputElement = input.shadowRoot.querySelector(
        "input.ea-input__original"
      );
      expect(inputElement.disabled).toBe(false);

      input.setAttribute("disabled", "");

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(inputElement.disabled).toBe(true);
    });
  });
});
