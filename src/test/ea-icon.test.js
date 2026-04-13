import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { waitForRender } from "./utils/waitForRender";

// 导入 ea-icon 组件
import "../components/ea-icon/index";

describe("EaIcon Component", () => {
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
    it("应该正确渲染 ea-icon 组件", async () => {
      const icon = document.createElement("ea-icon");
      container.appendChild(icon);

      await waitForRender();

      expect(icon).toBeDefined();
      expect(icon.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const icon = document.createElement("ea-icon");
      container.appendChild(icon);

      await waitForRender();

      expect(icon.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("应该包含 i 元素作为图标容器", async () => {
      const icon = document.createElement("ea-icon");
      container.appendChild(icon);

      await waitForRender();

      const iElement = icon.shadowRoot.querySelector("i.ea-icon");
      expect(iElement).toBeTruthy();
    });
  });

  /**
   * Name 属性测试
   */
  describe("Name Attribute", () => {
    it("默认 name 应该为空字符串", async () => {
      const icon = document.createElement("ea-icon");
      container.appendChild(icon);

      await waitForRender();

      expect(icon.name).toBe("");
    });

    it("应该通过 name 属性设置图标名称", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("name", "coffee");
      container.appendChild(icon);

      await waitForRender();

      expect(icon.name).toBe("coffee");
    });

    it("应该支持不同的图标名称", async () => {
      const iconNames = ["coffee", "check", "github", "user", "star", "heart"];

      for (const name of iconNames) {
        const icon = document.createElement("ea-icon");
        icon.setAttribute("name", name);
        container.appendChild(icon);

        await waitForRender();

        expect(icon.name).toBe(name);
        icon.remove();
      }
    });

    it("应该支持以 fa- 开头的完整类名", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("name", "fa-solid fa-coffee");
      container.appendChild(icon);

      await waitForRender();

      expect(icon.name).toBe("fa-solid fa-coffee");
    });
  });

  /**
   * Family 属性测试
   */
  describe("Family Attribute", () => {
    it("默认 family 应该是 classic", async () => {
      const icon = document.createElement("ea-icon");
      container.appendChild(icon);

      await waitForRender();

      expect(icon.family).toBe("classic");
    });

    it("应该支持 family='brands'", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("family", "brands");
      container.appendChild(icon);

      await waitForRender();

      expect(icon.family).toBe("brands");
    });

    it("应该支持 family='sharp'", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("family", "sharp");
      container.appendChild(icon);

      await waitForRender();

      expect(icon.family).toBe("sharp");
    });

    it("应该支持不同的 family 值", async () => {
      const families = ["classic", "sharp", "brands"];

      for (const family of families) {
        const icon = document.createElement("ea-icon");
        icon.setAttribute("family", family);
        container.appendChild(icon);

        await waitForRender();

        expect(icon.family).toBe(family);
        icon.remove();
      }
    });
  });

  /**
   * Variant 属性测试
   */
  describe("Variant Attribute", () => {
    it("默认 variant 应该是 solid", async () => {
      const icon = document.createElement("ea-icon");
      container.appendChild(icon);

      await waitForRender();

      expect(icon.variant).toBe("solid");
    });

    it("应该支持 variant='regular'", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("variant", "regular");
      container.appendChild(icon);

      await waitForRender();

      expect(icon.variant).toBe("regular");
    });

    it("应该支持 variant='light'", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("variant", "light");
      container.appendChild(icon);

      await waitForRender();

      expect(icon.variant).toBe("light");
    });

    it("应该支持不同的 variant 值", async () => {
      const variants = ["solid", "regular", "light", "thin", "duotone"];

      for (const variant of variants) {
        const icon = document.createElement("ea-icon");
        icon.setAttribute("variant", variant);
        container.appendChild(icon);

        await waitForRender();

        expect(icon.variant).toBe(variant);
        icon.remove();
      }
    });
  });

  /**
   * Color 属性测试
   */
  describe("Color Attribute", () => {
    it("默认 color 应该为空字符串", async () => {
      const icon = document.createElement("ea-icon");
      container.appendChild(icon);

      await waitForRender();

      expect(icon.color).toBe("");
    });

    it("应该通过 color 属性设置颜色", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("color", "#ff4757");
      container.appendChild(icon);

      await waitForRender();

      expect(icon.color).toBe("#ff4757");
    });

    it("应该支持不同的颜色值", async () => {
      const colors = ["#ff4757", "#ffa502", "#2ed573", "#1e90ff", "red", "blue"];

      for (const color of colors) {
        const icon = document.createElement("ea-icon");
        icon.setAttribute("color", color);
        container.appendChild(icon);

        await waitForRender();

        expect(icon.color).toBe(color);
        icon.remove();
      }
    });
  });

  /**
   * Size 属性测试
   */
  describe("Size Attribute", () => {
    it("默认 size 应该为空字符串", async () => {
      const icon = document.createElement("ea-icon");
      container.appendChild(icon);

      await waitForRender();

      expect(icon.size).toBe("");
    });

    it("应该通过 size 属性设置数字大小", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("size", "24");
      container.appendChild(icon);

      await waitForRender();

      expect(icon.size).toBe("24");
    });

    it("应该支持预设的 size 值", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("size", "large");
      container.appendChild(icon);

      await waitForRender();

      expect(icon.size).toBe("large");
    });

    it("应该支持不同的 size 值", async () => {
      const sizes = ["16", "24", "32", "48", "large", "medium", "small"];

      for (const size of sizes) {
        const icon = document.createElement("ea-icon");
        icon.setAttribute("size", size);
        container.appendChild(icon);

        await waitForRender();

        expect(icon.size).toBe(size);
        icon.remove();
      }
    });
  });

  /**
   * Spin 属性测试
   */
  describe("Spin Attribute", () => {
    it("默认 spin 应该是 false", async () => {
      const icon = document.createElement("ea-icon");
      container.appendChild(icon);

      await waitForRender();

      expect(icon.spin).toBe(false);
    });

    it("设置 spin 属性应该启用旋转动画", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("spin", "");
      container.appendChild(icon);

      await waitForRender();

      expect(icon.spin).toBe(true);
    });

    it("设置 spin='true' 应该启用旋转动画", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("spin", "true");
      container.appendChild(icon);

      await waitForRender();

      expect(icon.spin).toBe(true);
    });
  });

  /**
   * 组合属性测试
   */
  describe("Combined Attributes", () => {
    it("应该同时支持多个属性", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("name", "coffee");
      icon.setAttribute("family", "classic");
      icon.setAttribute("variant", "solid");
      icon.setAttribute("color", "#ff4757");
      icon.setAttribute("size", "32");
      container.appendChild(icon);

      await waitForRender();

      expect(icon.name).toBe("coffee");
      expect(icon.family).toBe("classic");
      expect(icon.variant).toBe("solid");
      expect(icon.color).toBe("#ff4757");
      expect(icon.size).toBe("32");
    });

    it("应该支持 brands family 和图标名称", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("name", "github");
      icon.setAttribute("family", "brands");
      container.appendChild(icon);

      await waitForRender();

      expect(icon.name).toBe("github");
      expect(icon.family).toBe("brands");
    });

    it("应该支持 sharp family 和 variant 组合", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("name", "star");
      icon.setAttribute("family", "sharp");
      icon.setAttribute("variant", "solid");
      container.appendChild(icon);

      await waitForRender();

      expect(icon.name).toBe("star");
      expect(icon.family).toBe("sharp");
      expect(icon.variant).toBe("solid");
    });
  });

  /**
   * 插槽测试
   */
  describe("Slots", () => {
    it("应该支持默认插槽", async () => {
      const icon = document.createElement("ea-icon");
      icon.innerHTML = "Custom Content";
      container.appendChild(icon);

      await waitForRender();

      const slot = icon.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("空 name 时应该正确渲染", async () => {
      const icon = document.createElement("ea-icon");
      container.appendChild(icon);

      await waitForRender();

      const iElement = icon.shadowRoot.querySelector("i.ea-icon");
      expect(iElement).toBeTruthy();
    });

    it("特殊字符的 name 应该正确处理", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("name", "<script>alert('xss')</script>");
      container.appendChild(icon);

      await waitForRender();

      expect(icon.name).toBe("<script>alert('xss')</script>");
    });

    it("空字符串属性应该正确处理", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("name", "");
      icon.setAttribute("color", "");
      icon.setAttribute("size", "");
      container.appendChild(icon);

      await waitForRender();

      expect(icon.name).toBe("");
      expect(icon.color).toBe("");
      expect(icon.size).toBe("");
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("name", "coffee");
      container.appendChild(icon);

      await waitForRender();

      const iElement = icon.shadowRoot.querySelector("i.ea-icon");
      expect(iElement).toBeTruthy();
    });

    it("组件断开连接后应该正常移除", async () => {
      const icon = document.createElement("ea-icon");
      container.appendChild(icon);

      await waitForRender();

      icon.remove();

      expect(container.contains(icon)).toBe(false);
    });

    it("动态修改属性应该生效", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("name", "coffee");
      container.appendChild(icon);

      await waitForRender();

      icon.setAttribute("name", "star");
      await waitForRender();
      expect(icon.name).toBe("star");

      icon.setAttribute("color", "#ff4757");
      await waitForRender();
      expect(icon.color).toBe("#ff4757");

      icon.setAttribute("size", "48");
      await waitForRender();
      expect(icon.size).toBe("48");
    });

    it("动态修改 family 应该生效", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("name", "github");
      icon.setAttribute("family", "classic");
      container.appendChild(icon);

      await waitForRender();

      icon.setAttribute("family", "brands");
      await waitForRender();
      expect(icon.family).toBe("brands");
    });

    it("动态修改 variant 应该生效", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("name", "heart");
      icon.setAttribute("variant", "solid");
      container.appendChild(icon);

      await waitForRender();

      icon.setAttribute("variant", "regular");
      await waitForRender();
      expect(icon.variant).toBe("regular");
    });

    it("动态添加 spin 属性应该生效", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("name", "spinner");
      container.appendChild(icon);

      await waitForRender();

      expect(icon.spin).toBe(false);

      icon.setAttribute("spin", "");
      await waitForRender();
      expect(icon.spin).toBe(true);
    });
  });
});
