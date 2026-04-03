import { describe, it, expect, beforeEach, afterEach } from "vitest";

// 导入 ea-icon 组件
import "../components/ea-icon/index.js";

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
    it("应该正确渲染 ea-icon 组件", () => {
      const icon = document.createElement("ea-icon");
      container.appendChild(icon);

      expect(icon).toBeDefined();
      expect(icon.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", () => {
      const icon = document.createElement("ea-icon");
      container.appendChild(icon);

      expect(icon.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("应该包含 i 元素作为图标容器", () => {
      const icon = document.createElement("ea-icon");
      container.appendChild(icon);

      const iElement = icon.shadowRoot.querySelector("i.ea-icon");
      expect(iElement).toBeTruthy();
    });
  });

  /**
   * Name 属性测试
   */
  describe("Name Attribute", () => {
    it("默认 name 应该为空字符串", () => {
      const icon = document.createElement("ea-icon");
      container.appendChild(icon);

      expect(icon.name).toBe("");
    });

    it("应该通过 name 属性设置图标名称", () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("name", "coffee");
      container.appendChild(icon);

      expect(icon.name).toBe("coffee");
    });

    it("应该支持不同的图标名称", () => {
      const iconNames = ["coffee", "check", "github", "user", "star", "heart"];

      iconNames.forEach((name) => {
        const icon = document.createElement("ea-icon");
        icon.setAttribute("name", name);
        expect(icon.name).toBe(name);
      });
    });

    it("应该支持以 fa- 开头的完整类名", () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("name", "fa-solid fa-coffee");
      container.appendChild(icon);

      expect(icon.name).toBe("fa-solid fa-coffee");
    });
  });

  /**
   * Family 属性测试
   */
  describe("Family Attribute", () => {
    it("默认 family 应该是 classic", () => {
      const icon = document.createElement("ea-icon");
      container.appendChild(icon);

      expect(icon.family).toBe("classic");
    });

    it("应该支持 family='brands'", () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("family", "brands");
      container.appendChild(icon);

      expect(icon.family).toBe("brands");
    });

    it("应该支持 family='sharp'", () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("family", "sharp");
      container.appendChild(icon);

      expect(icon.family).toBe("sharp");
    });

    it("应该支持不同的 family 值", () => {
      const families = ["classic", "sharp", "brands"];

      families.forEach((family) => {
        const icon = document.createElement("ea-icon");
        icon.setAttribute("family", family);
        expect(icon.family).toBe(family);
      });
    });
  });

  /**
   * Variant 属性测试
   */
  describe("Variant Attribute", () => {
    it("默认 variant 应该是 solid", () => {
      const icon = document.createElement("ea-icon");
      container.appendChild(icon);

      expect(icon.variant).toBe("solid");
    });

    it("应该支持 variant='regular'", () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("variant", "regular");
      container.appendChild(icon);

      expect(icon.variant).toBe("regular");
    });

    it("应该支持 variant='light'", () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("variant", "light");
      container.appendChild(icon);

      expect(icon.variant).toBe("light");
    });

    it("应该支持不同的 variant 值", () => {
      const variants = ["solid", "regular", "light", "thin", "duotone"];

      variants.forEach((variant) => {
        const icon = document.createElement("ea-icon");
        icon.setAttribute("variant", variant);
        expect(icon.variant).toBe(variant);
      });
    });
  });

  /**
   * Color 属性测试
   */
  describe("Color Attribute", () => {
    it("默认 color 应该为空字符串", () => {
      const icon = document.createElement("ea-icon");
      container.appendChild(icon);

      expect(icon.color).toBe("");
    });

    it("应该通过 color 属性设置颜色", () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("color", "#ff4757");
      container.appendChild(icon);

      expect(icon.color).toBe("#ff4757");
    });

    it("应该支持不同的颜色值", () => {
      const colors = ["#ff4757", "#ffa502", "#2ed573", "#1e90ff", "red", "blue"];

      colors.forEach((color) => {
        const icon = document.createElement("ea-icon");
        icon.setAttribute("color", color);
        expect(icon.color).toBe(color);
      });
    });
  });

  /**
   * Size 属性测试
   */
  describe("Size Attribute", () => {
    it("默认 size 应该为空字符串", () => {
      const icon = document.createElement("ea-icon");
      container.appendChild(icon);

      expect(icon.size).toBe("");
    });

    it("应该通过 size 属性设置数字大小", () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("size", "24");
      container.appendChild(icon);

      expect(icon.size).toBe("24");
    });

    it("应该支持预设的 size 值", () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("size", "large");
      container.appendChild(icon);

      expect(icon.size).toBe("large");
    });

    it("应该支持不同的 size 值", () => {
      const sizes = ["16", "24", "32", "48", "large", "medium", "small"];

      sizes.forEach((size) => {
        const icon = document.createElement("ea-icon");
        icon.setAttribute("size", size);
        expect(icon.size).toBe(size);
      });
    });
  });

  /**
   * Spin 属性测试
   */
  describe("Spin Attribute", () => {
    it("默认 spin 应该是 false", () => {
      const icon = document.createElement("ea-icon");
      container.appendChild(icon);

      expect(icon.spin).toBe(false);
    });

    it("设置 spin 属性应该启用旋转动画", () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("spin", "");
      container.appendChild(icon);

      expect(icon.spin).toBe(true);
    });

    it("设置 spin='true' 应该启用旋转动画", () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("spin", "true");
      container.appendChild(icon);

      expect(icon.spin).toBe(true);
    });
  });

  /**
   * 组合属性测试
   */
  describe("Combined Attributes", () => {
    it("应该同时支持多个属性", () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("name", "coffee");
      icon.setAttribute("family", "classic");
      icon.setAttribute("variant", "solid");
      icon.setAttribute("color", "#ff4757");
      icon.setAttribute("size", "32");
      container.appendChild(icon);

      expect(icon.name).toBe("coffee");
      expect(icon.family).toBe("classic");
      expect(icon.variant).toBe("solid");
      expect(icon.color).toBe("#ff4757");
      expect(icon.size).toBe("32");
    });

    it("应该支持 brands family 和图标名称", () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("name", "github");
      icon.setAttribute("family", "brands");
      container.appendChild(icon);

      expect(icon.name).toBe("github");
      expect(icon.family).toBe("brands");
    });

    it("应该支持 sharp family 和 variant 组合", () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("name", "star");
      icon.setAttribute("family", "sharp");
      icon.setAttribute("variant", "solid");
      container.appendChild(icon);

      expect(icon.name).toBe("star");
      expect(icon.family).toBe("sharp");
      expect(icon.variant).toBe("solid");
    });
  });

  /**
   * 插槽测试
   */
  describe("Slots", () => {
    it("应该支持默认插槽", () => {
      const icon = document.createElement("ea-icon");
      icon.innerHTML = "Custom Content";
      container.appendChild(icon);

      const slot = icon.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("空 name 时应该正确渲染", () => {
      const icon = document.createElement("ea-icon");
      container.appendChild(icon);

      const iElement = icon.shadowRoot.querySelector("i.ea-icon");
      expect(iElement).toBeTruthy();
    });

    it("特殊字符的 name 应该正确处理", () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("name", "<script>alert('xss')</script>");
      container.appendChild(icon);

      expect(icon.name).toBe("<script>alert('xss')</script>");
    });

    it("空字符串属性应该正确处理", () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("name", "");
      icon.setAttribute("color", "");
      icon.setAttribute("size", "");
      container.appendChild(icon);

      expect(icon.name).toBe("");
      expect(icon.color).toBe("");
      expect(icon.size).toBe("");
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("name", "coffee");
      container.appendChild(icon);

      const iElement = icon.shadowRoot.querySelector("i.ea-icon");
      expect(iElement).toBeTruthy();
    });

    it("组件断开连接后应该正常移除", () => {
      const icon = document.createElement("ea-icon");
      container.appendChild(icon);

      icon.remove();

      expect(container.contains(icon)).toBe(false);
    });

    it("动态修改属性应该生效", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("name", "coffee");
      container.appendChild(icon);

      await new Promise((resolve) => setTimeout(resolve, 50));

      icon.setAttribute("name", "star");
      expect(icon.name).toBe("star");

      icon.setAttribute("color", "#ff4757");
      expect(icon.color).toBe("#ff4757");

      icon.setAttribute("size", "48");
      expect(icon.size).toBe("48");
    });

    it("动态修改 family 应该生效", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("name", "github");
      icon.setAttribute("family", "classic");
      container.appendChild(icon);

      await new Promise((resolve) => setTimeout(resolve, 50));

      icon.setAttribute("family", "brands");
      expect(icon.family).toBe("brands");
    });

    it("动态修改 variant 应该生效", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("name", "heart");
      icon.setAttribute("variant", "solid");
      container.appendChild(icon);

      await new Promise((resolve) => setTimeout(resolve, 50));

      icon.setAttribute("variant", "regular");
      expect(icon.variant).toBe("regular");
    });

    it("动态添加 spin 属性应该生效", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("name", "spinner");
      container.appendChild(icon);

      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(icon.spin).toBe(false);

      icon.setAttribute("spin", "");
      expect(icon.spin).toBe(true);
    });
  });
});
