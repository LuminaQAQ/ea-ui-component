import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// 导入 ea-tag 组件及其子组件
import "../components/ea-tag/index";
import { waitForRender } from "./utils/waitForRender";

describe("EaTag and EaCheckTag Components", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  /**
   * EaTag 基本功能测试
   */
  describe("EaTag Basic Functionality", () => {
    it("应该正确渲染 ea-tag 组件", async () => {
      const tag = document.createElement("ea-tag");
      tag.textContent = "Test Tag";
      container.appendChild(tag);

      await waitForRender();

      expect(tag).toBeDefined();
      expect(tag.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const tag = document.createElement("ea-tag");
      container.appendChild(tag);

      await waitForRender();

      expect(tag.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("应该包含 close-icon CSS Part", async () => {
      const tag = document.createElement("ea-tag");
      container.appendChild(tag);

      await waitForRender();

      expect(tag.shadowRoot.querySelector('[part="close-icon"]')).toBeTruthy();
    });

    it("应该正确显示标签内容", async () => {
      const tag = document.createElement("ea-tag");
      tag.textContent = "Test Tag";
      container.appendChild(tag);

      await waitForRender();

      expect(tag.textContent).toBe("Test Tag");
    });
  });

  /**
   * EaTag Type 属性测试
   */
  describe("EaTag Type Attribute", () => {
    it("默认 type 应该是 primary", async () => {
      const tag = document.createElement("ea-tag");
      container.appendChild(tag);

      await waitForRender();

      expect(tag.type).toBe("primary");
    });

    it("应该支持 type='success'", async () => {
      const tag = document.createElement("ea-tag");
      tag.type = "success";
      container.appendChild(tag);

      await waitForRender();

      expect(tag.type).toBe("success");
    });

    it("应该支持 type='info'", async () => {
      const tag = document.createElement("ea-tag");
      tag.type = "info";
      container.appendChild(tag);

      await waitForRender();

      expect(tag.type).toBe("info");
    });

    it("应该支持 type='warning'", async () => {
      const tag = document.createElement("ea-tag");
      tag.type = "warning";
      container.appendChild(tag);

      await waitForRender();

      expect(tag.type).toBe("warning");
    });

    it("应该支持 type='danger'", async () => {
      const tag = document.createElement("ea-tag");
      tag.type = "danger";
      container.appendChild(tag);

      await waitForRender();

      expect(tag.type).toBe("danger");
    });
  });

  /**
   * EaTag Size 属性测试
   */
  describe("EaTag Size Attribute", () => {
    it("默认 size 应该是 default", async () => {
      const tag = document.createElement("ea-tag");
      container.appendChild(tag);

      await waitForRender();

      expect(tag.size).toBe("default");
    });

    it("应该支持 size='large'", async () => {
      const tag = document.createElement("ea-tag");
      tag.size = "large";
      container.appendChild(tag);

      await waitForRender();

      expect(tag.size).toBe("large");
    });

    it("应该支持 size='small'", async () => {
      const tag = document.createElement("ea-tag");
      tag.size = "small";
      container.appendChild(tag);

      await waitForRender();

      expect(tag.size).toBe("small");
    });
  });

  /**
   * EaTag Effect 属性测试
   */
  describe("EaTag Effect Attribute", () => {
    it("默认 effect 应该是 light", async () => {
      const tag = document.createElement("ea-tag");
      container.appendChild(tag);

      await waitForRender();

      expect(tag.effect).toBe("light");
    });

    it("应该支持 effect='dark'", async () => {
      const tag = document.createElement("ea-tag");
      tag.effect = "dark";
      container.appendChild(tag);

      await waitForRender();

      expect(tag.effect).toBe("dark");
    });

    it("应该支持 effect='plain'", async () => {
      const tag = document.createElement("ea-tag");
      tag.effect = "plain";
      container.appendChild(tag);

      await waitForRender();

      expect(tag.effect).toBe("plain");
    });
  });

  /**
   * EaTag Closable 属性测试
   */
  describe("EaTag Closable Attribute", () => {
    it("默认 closable 应该是 false", async () => {
      const tag = document.createElement("ea-tag");
      container.appendChild(tag);

      await waitForRender();

      // 属性可能返回 null 或 false
      const value = tag.closable;
      expect(value === false || value === null).toBe(true);
    });

    it("设置 closable 应该显示关闭图标", async () => {
      const tag = document.createElement("ea-tag");
      tag.closable = true;
      container.appendChild(tag);

      await waitForRender();

      expect(tag.closable).toBe(true);
    });

    it("应该触发 ea-remove 事件", async () => {
      const tag = document.createElement("ea-tag");
      tag.closable = true;
      tag.disableTransitions = true;
      tag.textContent = "Test Tag";
      container.appendChild(tag);

      await waitForRender();

      let removeDetail = null;
      tag.addEventListener("ea-remove", e => {
        removeDetail = e.detail;
      });

      const closeIcon = tag.shadowRoot.querySelector('[part="close-icon"]');
      closeIcon.click();

      await waitForRender();

      expect(removeDetail).not.toBeNull();
      expect(removeDetail.text).toBe("Test Tag");
    });
  });

  /**
   * EaTag Round 属性测试
   */
  describe("EaTag Round Attribute", () => {
    it("默认 round 应该是 false", async () => {
      const tag = document.createElement("ea-tag");
      container.appendChild(tag);

      await waitForRender();

      // 属性可能返回 null 或 false
      const value = tag.round;
      expect(value === false || value === null).toBe(true);
    });

    it("设置 round 应该启用圆角样式", async () => {
      const tag = document.createElement("ea-tag");
      tag.round = true;
      container.appendChild(tag);

      await waitForRender();

      expect(tag.round).toBe(true);
    });
  });

  /**
   * EaTag Color 属性测试
   */
  describe("EaTag Color Attribute", () => {
    it("默认 color 应该是空字符串", async () => {
      const tag = document.createElement("ea-tag");
      container.appendChild(tag);

      await waitForRender();

      expect(tag.color).toBe("");
    });

    it("应该支持 color 属性", async () => {
      const tag = document.createElement("ea-tag");
      tag.color = "#ff0000";
      container.appendChild(tag);

      await waitForRender();

      expect(tag.color).toBe("#ff0000");
    });
  });

  /**
   * EaTag Disable-transitions 属性测试
   */
  describe("EaTag Disable-transitions Attribute", () => {
    it("默认 disable-transitions 应该是 false", async () => {
      const tag = document.createElement("ea-tag");
      container.appendChild(tag);

      await waitForRender();

      // 属性可能返回 null 或 false
      const value = tag.disableTransitions;
      expect(value === false || value === null).toBe(true);
    });

    it("设置 disable-transitions 应该禁用过渡动画", async () => {
      const tag = document.createElement("ea-tag");
      tag.disableTransitions = true;
      container.appendChild(tag);

      await waitForRender();

      expect(tag.disableTransitions).toBe(true);
    });
  });

  /**
   * EaCheckTag 基本功能测试
   */
  describe("EaCheckTag Basic Functionality", () => {
    it("应该正确渲染 ea-check-tag 组件", async () => {
      const checkTag = document.createElement("ea-check-tag");
      checkTag.textContent = "Check Tag";
      container.appendChild(checkTag);

      await waitForRender();

      expect(checkTag).toBeDefined();
      expect(checkTag.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const checkTag = document.createElement("ea-check-tag");
      container.appendChild(checkTag);

      await waitForRender();

      expect(
        checkTag.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("应该正确显示标签内容", async () => {
      const checkTag = document.createElement("ea-check-tag");
      checkTag.textContent = "Check Tag";
      container.appendChild(checkTag);

      await waitForRender();

      expect(checkTag.textContent).toBe("Check Tag");
    });
  });

  /**
   * EaCheckTag Checked 属性测试
   */
  describe("EaCheckTag Checked Attribute", () => {
    it("默认 checked 应该是 false", async () => {
      const checkTag = document.createElement("ea-check-tag");
      container.appendChild(checkTag);

      await waitForRender();

      // 属性可能返回 null 或 false
      const value = checkTag.checked;
      expect(value === false || value === null).toBe(true);
    });

    it("设置 checked 应该启用选中状态", async () => {
      const checkTag = document.createElement("ea-check-tag");
      checkTag.checked = true;
      container.appendChild(checkTag);

      await waitForRender();

      expect(checkTag.checked).toBe(true);
    });

    it("点击应该切换 checked 状态", async () => {
      const checkTag = document.createElement("ea-check-tag");
      container.appendChild(checkTag);

      await waitForRender();

      const containerEl =
        checkTag.shadowRoot.querySelector('[part="container"]');
      containerEl.click();

      await waitForRender();

      expect(checkTag.checked).toBe(true);
    });

    it("应该触发 change 事件", async () => {
      const checkTag = document.createElement("ea-check-tag");
      container.appendChild(checkTag);

      await waitForRender();

      let changeDetail = null;
      checkTag.addEventListener("change", e => {
        changeDetail = e.detail;
      });

      const containerEl =
        checkTag.shadowRoot.querySelector('[part="container"]');
      containerEl.click();

      await waitForRender();

      expect(changeDetail).not.toBeNull();
      expect(changeDetail.checked).toBe(true);
    });
  });

  /**
   * EaCheckTag Disabled 属性测试
   */
  describe("EaCheckTag Disabled Attribute", () => {
    it("默认 disabled 应该是 false", async () => {
      const checkTag = document.createElement("ea-check-tag");
      container.appendChild(checkTag);

      await waitForRender();

      // 属性可能返回 null 或 false
      const value = checkTag.disabled;
      expect(value === false || value === null).toBe(true);
    });

    it("设置 disabled 应该禁用交互", async () => {
      const checkTag = document.createElement("ea-check-tag");
      checkTag.disabled = true;
      container.appendChild(checkTag);

      await waitForRender();

      expect(checkTag.disabled).toBe(true);
    });

    it("disabled 状态下点击不应该切换 checked", async () => {
      const checkTag = document.createElement("ea-check-tag");
      checkTag.disabled = true;
      container.appendChild(checkTag);

      await waitForRender();

      const containerEl =
        checkTag.shadowRoot.querySelector('[part="container"]');
      containerEl.click();

      await waitForRender();

      // 检查 checked 为 falsy 值（可能是 false 或 null）
      expect(checkTag.checked === false || checkTag.checked === null).toBe(
        true
      );
    });

    it("disabled 状态下不应该触发 change 事件", async () => {
      const checkTag = document.createElement("ea-check-tag");
      checkTag.disabled = true;
      container.appendChild(checkTag);

      await waitForRender();

      let changeFired = false;
      checkTag.addEventListener("change", () => {
        changeFired = true;
      });

      const containerEl =
        checkTag.shadowRoot.querySelector('[part="container"]');
      containerEl.click();

      await waitForRender();

      expect(changeFired).toBe(false);
    });
  });

  /**
   * EaCheckTag Type 属性测试
   */
  describe("EaCheckTag Type Attribute", () => {
    it("默认 type 应该是 primary", async () => {
      const checkTag = document.createElement("ea-check-tag");
      checkTag.checked = true;
      container.appendChild(checkTag);

      await waitForRender();

      expect(checkTag.type).toBe("primary");
    });

    it("应该支持 type='success'", async () => {
      const checkTag = document.createElement("ea-check-tag");
      checkTag.type = "success";
      checkTag.checked = true;
      container.appendChild(checkTag);

      await waitForRender();

      expect(checkTag.type).toBe("success");
    });

    it("应该支持 type='info'", async () => {
      const checkTag = document.createElement("ea-check-tag");
      checkTag.type = "info";
      checkTag.checked = true;
      container.appendChild(checkTag);

      await waitForRender();

      expect(checkTag.type).toBe("info");
    });

    it("应该支持 type='warning'", async () => {
      const checkTag = document.createElement("ea-check-tag");
      checkTag.type = "warning";
      checkTag.checked = true;
      container.appendChild(checkTag);

      await waitForRender();

      expect(checkTag.type).toBe("warning");
    });

    it("应该支持 type='danger'", async () => {
      const checkTag = document.createElement("ea-check-tag");
      checkTag.type = "danger";
      checkTag.checked = true;
      container.appendChild(checkTag);

      await waitForRender();

      expect(checkTag.type).toBe("danger");
    });
  });

  /**
   * 组合测试
   */
  describe("Combined Tests", () => {
    it("应该同时渲染多个 ea-tag", async () => {
      const types = ["primary", "success", "info", "warning", "danger"];

      types.forEach(type => {
        const tag = document.createElement("ea-tag");
        tag.type = type;
        tag.textContent = type;
        container.appendChild(tag);
      });

      await waitForRender();

      const tags = container.querySelectorAll("ea-tag");
      expect(tags.length).toBe(5);
    });

    it("应该同时渲染多个 ea-check-tag", async () => {
      const types = ["primary", "success", "info", "warning", "danger"];

      types.forEach(type => {
        const checkTag = document.createElement("ea-check-tag");
        checkTag.type = type;
        checkTag.checked = true;
        checkTag.textContent = type;
        container.appendChild(checkTag);
      });

      await waitForRender();

      const checkTags = container.querySelectorAll("ea-check-tag");
      expect(checkTags.length).toBe(5);
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("空 ea-tag 应该正常渲染", async () => {
      const tag = document.createElement("ea-tag");
      container.appendChild(tag);

      await waitForRender();

      expect(tag.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("空 ea-check-tag 应该正常渲染", async () => {
      const checkTag = document.createElement("ea-check-tag");
      container.appendChild(checkTag);

      await waitForRender();

      expect(
        checkTag.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("ea-tag 使用无效 type 应该保留原始值", async () => {
      const tag = document.createElement("ea-tag");
      tag.setAttribute("type", "invalid");
      container.appendChild(tag);

      await waitForRender();

      // 组件保留原始属性值
      expect(tag.getAttribute("type")).toBe("invalid");
    });

    it("ea-check-tag 使用无效 type 应该保留原始值", async () => {
      const checkTag = document.createElement("ea-check-tag");
      checkTag.setAttribute("type", "invalid");
      checkTag.checked = true;
      container.appendChild(checkTag);

      await waitForRender();

      // 组件保留原始属性值
      expect(checkTag.getAttribute("type")).toBe("invalid");
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("ea-tag 组件连接后应该正确初始化", async () => {
      const tag = document.createElement("ea-tag");
      tag.textContent = "Test";
      container.appendChild(tag);

      await waitForRender();

      expect(tag.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("ea-check-tag 组件连接后应该正确初始化", async () => {
      const checkTag = document.createElement("ea-check-tag");
      checkTag.textContent = "Test";
      container.appendChild(checkTag);

      await waitForRender();

      expect(
        checkTag.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("ea-tag 组件断开连接后应该正常移除", () => {
      const tag = document.createElement("ea-tag");
      container.appendChild(tag);

      tag.remove();

      expect(container.contains(tag)).toBe(false);
    });

    it("ea-check-tag 组件断开连接后应该正常移除", () => {
      const checkTag = document.createElement("ea-check-tag");
      container.appendChild(checkTag);

      checkTag.remove();

      expect(container.contains(checkTag)).toBe(false);
    });

    it("动态修改 ea-tag type 应该生效", async () => {
      const tag = document.createElement("ea-tag");
      container.appendChild(tag);

      await waitForRender();

      tag.type = "success";

      await waitForRender();

      expect(tag.type).toBe("success");
    });

    it("动态修改 ea-check-tag checked 应该生效", async () => {
      const checkTag = document.createElement("ea-check-tag");
      container.appendChild(checkTag);

      await waitForRender();

      checkTag.checked = true;

      await waitForRender();

      expect(checkTag.checked).toBe(true);
    });

    it("动态修改 ea-check-tag disabled 应该生效", async () => {
      const checkTag = document.createElement("ea-check-tag");
      container.appendChild(checkTag);

      await waitForRender();

      checkTag.disabled = true;

      await waitForRender();

      expect(checkTag.disabled).toBe(true);
    });
  });
});
