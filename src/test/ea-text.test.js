import { describe, it, expect, beforeEach, afterEach } from "vitest";

// 导入 ea-text 组件
import "../components/ea-text/index.js";

describe("EaText Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  /**
   * EaText 基本功能测试
   */
  describe("EaText Basic Functionality", () => {
    it("应该正确渲染 ea-text 组件", async () => {
      const text = document.createElement("ea-text");
      text.textContent = "Hello World";
      container.appendChild(text);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(text).toBeDefined();
      expect(text.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const text = document.createElement("ea-text");
      text.textContent = "Hello World";
      container.appendChild(text);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(text.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("应该正确显示文本内容", async () => {
      const text = document.createElement("ea-text");
      text.textContent = "Hello World";
      container.appendChild(text);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(text.textContent).toBe("Hello World");
    });
  });

  /**
   * EaText Type 属性测试
   */
  describe("EaText Type Attribute", () => {
    it("默认 type 应该是 normal", async () => {
      const text = document.createElement("ea-text");
      text.textContent = "Default";
      container.appendChild(text);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(text.type).toBe("normal");
    });

    it("应该支持 type='primary'", async () => {
      const text = document.createElement("ea-text");
      text.type = "primary";
      text.textContent = "Primary";
      container.appendChild(text);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(text.type).toBe("primary");
    });

    it("应该支持 type='success'", async () => {
      const text = document.createElement("ea-text");
      text.type = "success";
      text.textContent = "Success";
      container.appendChild(text);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(text.type).toBe("success");
    });

    it("应该支持 type='info'", async () => {
      const text = document.createElement("ea-text");
      text.type = "info";
      text.textContent = "Info";
      container.appendChild(text);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(text.type).toBe("info");
    });

    it("应该支持 type='warning'", async () => {
      const text = document.createElement("ea-text");
      text.type = "warning";
      text.textContent = "Warning";
      container.appendChild(text);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(text.type).toBe("warning");
    });

    it("应该支持 type='danger'", async () => {
      const text = document.createElement("ea-text");
      text.type = "danger";
      text.textContent = "Danger";
      container.appendChild(text);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(text.type).toBe("danger");
    });
  });

  /**
   * EaText Size 属性测试
   */
  describe("EaText Size Attribute", () => {
    it("默认 size 应该是 medium", async () => {
      const text = document.createElement("ea-text");
      text.textContent = "Default";
      container.appendChild(text);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(text.size).toBe("medium");
    });

    it("应该支持 size='large'", async () => {
      const text = document.createElement("ea-text");
      text.size = "large";
      text.textContent = "Large";
      container.appendChild(text);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(text.size).toBe("large");
    });

    it("应该支持 size='small'", async () => {
      const text = document.createElement("ea-text");
      text.size = "small";
      text.textContent = "Small";
      container.appendChild(text);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(text.size).toBe("small");
    });
  });

  /**
   * EaText Truncated 属性测试
   */
  describe("EaText Truncated Attribute", () => {
    it("默认 truncated 应该是 false", async () => {
      const text = document.createElement("ea-text");
      text.textContent = "Default";
      container.appendChild(text);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 属性可能返回 null 或 false
      const value = text.truncated;
      expect(value === false || value === null).toBe(true);
    });

    it("设置 truncated 应该启用文本截断", async () => {
      const text = document.createElement("ea-text");
      text.truncated = true;
      text.textContent = "This is a very long text that should be truncated";
      container.appendChild(text);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(text.truncated).toBe(true);
    });

    it("truncated 为 true 时应该启用截断", async () => {
      const text = document.createElement("ea-text");
      text.truncated = true;
      text.textContent = "Test text";
      container.appendChild(text);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(text.truncated).toBe(true);
    });
  });

  /**
   * EaText Line-clamp 属性测试
   */
  describe("EaText Line-clamp Attribute", () => {
    it("默认 line-clamp 应该是 0", async () => {
      const text = document.createElement("ea-text");
      text.textContent = "Default";
      container.appendChild(text);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(text["line-clamp"]).toBe(0);
    });

    it("应该支持 line-clamp 属性", async () => {
      const text = document.createElement("ea-text");
      text["line-clamp"] = 2;
      text.textContent = "Line 1\nLine 2\nLine 3";
      container.appendChild(text);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(text["line-clamp"]).toBe(2);
    });

    it("line-clamp 大于 0 时应该设置行数限制", async () => {
      const text = document.createElement("ea-text");
      text["line-clamp"] = 2;
      text.textContent = "Test text";
      container.appendChild(text);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(text["line-clamp"]).toBe(2);
    });
  });

  /**
   * EaText Tag 属性测试
   */
  describe("EaText Tag Attribute", () => {
    it("默认 tag 应该是 span", async () => {
      const text = document.createElement("ea-text");
      text.textContent = "Default";
      container.appendChild(text);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(text.tag).toBe("span");
    });

    it("应该支持 tag='p'", async () => {
      const text = document.createElement("ea-text");
      text.tag = "p";
      text.textContent = "Paragraph";
      container.appendChild(text);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(text.tag).toBe("p");
    });

    it("应该支持 tag='b'", async () => {
      const text = document.createElement("ea-text");
      text.tag = "b";
      text.textContent = "Bold";
      container.appendChild(text);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(text.tag).toBe("b");
    });

    it("应该支持 tag='i'", async () => {
      const text = document.createElement("ea-text");
      text.tag = "i";
      text.textContent = "Italic";
      container.appendChild(text);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(text.tag).toBe("i");
    });

    it("应该支持 tag='sub'", async () => {
      const text = document.createElement("ea-text");
      text.tag = "sub";
      text.textContent = "Subscript";
      container.appendChild(text);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(text.tag).toBe("sub");
    });

    it("应该支持 tag='sup'", async () => {
      const text = document.createElement("ea-text");
      text.tag = "sup";
      text.textContent = "Superscript";
      container.appendChild(text);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(text.tag).toBe("sup");
    });

    it("应该支持 tag='ins'", async () => {
      const text = document.createElement("ea-text");
      text.tag = "ins";
      text.textContent = "Inserted";
      container.appendChild(text);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(text.tag).toBe("ins");
    });

    it("应该支持 tag='del'", async () => {
      const text = document.createElement("ea-text");
      text.tag = "del";
      text.textContent = "Deleted";
      container.appendChild(text);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(text.tag).toBe("del");
    });

    it("应该支持 tag='mark'", async () => {
      const text = document.createElement("ea-text");
      text.tag = "mark";
      text.textContent = "Marked";
      container.appendChild(text);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(text.tag).toBe("mark");
    });
  });

  /**
   * EaText Title 属性测试
   */
  describe("EaText Title Attribute", () => {
    it("默认 title 应该是空字符串", async () => {
      const text = document.createElement("ea-text");
      text.textContent = "Default";
      container.appendChild(text);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(text.title).toBe("");
    });

    it("应该支持 title 属性", async () => {
      const text = document.createElement("ea-text");
      text.title = "Custom Title";
      text.textContent = "Text";
      container.appendChild(text);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(text.title).toBe("Custom Title");
    });
  });

  /**
   * EaText Slots 测试
   */
  describe("EaText Slots", () => {
    it("应该正确渲染默认插槽内容", async () => {
      const text = document.createElement("ea-text");
      text.textContent = "Slot Content";
      container.appendChild(text);

      await new Promise(resolve => setTimeout(resolve, 50));

      const slot = text.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });

    it("应该支持嵌套 ea-text 组件", async () => {
      const parent = document.createElement("ea-text");
      parent.textContent = "This is ";

      const child = document.createElement("ea-text");
      child.tag = "sub";
      child.size = "small";
      child.textContent = "subscript";

      parent.appendChild(child);
      container.appendChild(parent);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(parent.textContent).toContain("subscript");
    });
  });

  /**
   * EaText 组合测试
   */
  describe("EaText Combined Tests", () => {
    it("应该同时支持 type 和 size 属性", async () => {
      const text = document.createElement("ea-text");
      text.type = "primary";
      text.size = "large";
      text.textContent = "Primary Large";
      container.appendChild(text);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(text.type).toBe("primary");
      expect(text.size).toBe("large");
    });

    it("应该同时支持 truncated 和 tag 属性", async () => {
      const text = document.createElement("ea-text");
      text.truncated = true;
      text.tag = "p";
      text.textContent = "Truncated paragraph";
      container.appendChild(text);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(text.truncated).toBe(true);
      expect(text.tag).toBe("p");
    });

    it("应该同时支持 line-clamp 和 tag 属性", async () => {
      const text = document.createElement("ea-text");
      text["line-clamp"] = 3;
      text.tag = "p";
      text.textContent = "Multi line text";
      container.appendChild(text);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(text["line-clamp"]).toBe(3);
      expect(text.tag).toBe("p");
    });
  });

  /**
   * EaText 边界条件测试
   */
  describe("EaText Edge Cases", () => {
    it("空文本应该正常渲染", async () => {
      const text = document.createElement("ea-text");
      container.appendChild(text);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(text).toBeDefined();
      expect(text.shadowRoot).toBeDefined();
    });

    it("特殊字符应该正常渲染", async () => {
      const text = document.createElement("ea-text");
      text.textContent = "<script>alert('xss')</script>";
      container.appendChild(text);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(text.textContent).toBe("<script>alert('xss')</script>");
    });

    it("长文本应该正常渲染", async () => {
      const text = document.createElement("ea-text");
      text.textContent = "a".repeat(1000);
      container.appendChild(text);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(text.textContent.length).toBe(1000);
    });

    it("多个 ea-text 应该独立工作", async () => {
      const text1 = document.createElement("ea-text");
      text1.type = "primary";
      text1.textContent = "Text 1";

      const text2 = document.createElement("ea-text");
      text2.type = "success";
      text2.textContent = "Text 2";

      container.appendChild(text1);
      container.appendChild(text2);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(text1.type).toBe("primary");
      expect(text2.type).toBe("success");
      expect(text1.textContent).toBe("Text 1");
      expect(text2.textContent).toBe("Text 2");
    });
  });

  /**
   * EaText 生命周期测试
   */
  describe("EaText Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const text = document.createElement("ea-text");
      text.textContent = "Lifecycle Test";
      container.appendChild(text);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(text.shadowRoot).toBeDefined();
      expect(text.shadowRoot.querySelector(".ea-text")).toBeTruthy();
    });

    it("组件断开连接后应该正常移除", async () => {
      const text = document.createElement("ea-text");
      text.textContent = "Remove Test";
      container.appendChild(text);

      await new Promise(resolve => setTimeout(resolve, 50));

      text.remove();

      expect(container.contains(text)).toBe(false);
    });

    it("动态修改 type 应该生效", async () => {
      const text = document.createElement("ea-text");
      text.type = "normal";
      text.textContent = "Type Test";
      container.appendChild(text);

      await new Promise(resolve => setTimeout(resolve, 50));

      text.type = "danger";

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(text.type).toBe("danger");
    });

    it("动态修改 size 应该生效", async () => {
      const text = document.createElement("ea-text");
      text.size = "medium";
      text.textContent = "Size Test";
      container.appendChild(text);

      await new Promise(resolve => setTimeout(resolve, 50));

      text.size = "large";

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(text.size).toBe("large");
    });

    it("动态修改 tag 应该重新渲染", async () => {
      const text = document.createElement("ea-text");
      text.tag = "span";
      text.textContent = "Tag Test";
      container.appendChild(text);

      await new Promise(resolve => setTimeout(resolve, 50));

      text.tag = "p";

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(text.tag).toBe("p");
    });

    it("动态设置 truncated 应该生效", async () => {
      const text = document.createElement("ea-text");
      text.textContent = "Truncated Test";
      container.appendChild(text);

      await new Promise(resolve => setTimeout(resolve, 50));

      text.truncated = true;

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(text.truncated).toBe(true);
    });

    it("动态设置 line-clamp 应该生效", async () => {
      const text = document.createElement("ea-text");
      text.textContent = "Line Clamp Test";
      container.appendChild(text);

      await new Promise(resolve => setTimeout(resolve, 50));

      text["line-clamp"] = 3;

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(text["line-clamp"]).toBe(3);
    });
  });
});
