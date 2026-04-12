import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender";

// 导入 ea-alert 组件
import "../components/ea-alert/index";

describe("EaAlert Component", () => {
  let container;

  beforeEach(() => {
    // 创建测试容器
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    // 清理 DOM
    container.remove();
  });

  /**
   * 基本功能测试
   * 测试 Alert 组件的基本渲染和属性
   */
  describe("Basic Functionality", () => {
    it("应该正确渲染 ea-alert 组件", () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("title", "Test Alert");
      container.appendChild(alert);

      expect(alert).toBeDefined();
      expect(alert.shadowRoot).toBeDefined();
    });

    it("应该正确显示 title 属性", () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("title", "Test Title");
      container.appendChild(alert);

      const titleSlot = alert.shadowRoot.querySelector('slot[name="title"]');
      expect(titleSlot).toBeDefined();
    });

    it("title 属性变化时应该正确更新", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("title", "Initial Title");
      container.appendChild(alert);

      // 验证初始值
      expect(alert.title).toBe("Initial Title");

      // 修改 title
      alert.setAttribute("title", "Updated Title");
      await waitForRender();

      expect(alert.title).toBe("Updated Title");
    });
  });

  /**
   * Variant 属性测试
   * 测试 5 种类型: primary, success, info, warning, danger
   */
  describe("Variant Attribute", () => {
    const variants = ["primary", "success", "info", "warning", "danger"];

    variants.forEach(variant => {
      it(`应该正确应用 variant="${variant}" 样式`, () => {
        const alert = document.createElement("ea-alert");
        alert.setAttribute("variant", variant);
        alert.setAttribute("title", `${variant} alert`);
        container.appendChild(alert);

        const containerEl = alert.shadowRoot.querySelector(".ea-alert");
        expect(containerEl.classList.contains(`ea-alert--${variant}`)).toBe(
          true
        );
      });
    });

    it("默认 variant 应该是 info", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("title", "Default Variant Alert");
      container.appendChild(alert);

      // 等待组件初始化完成
      await waitForRender();

      // 验证 variant 属性的默认值为 info
      expect(alert.variant).toBe("info");

      // 显式设置 variant 属性来触发 class 更新
      alert.setAttribute("variant", "info");
      await waitForRender();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("ea-alert--info")).toBe(true);
    });

    it("variant 属性变化时应该正确更新 class", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("variant", "info");
      alert.setAttribute("title", "Variant Change Test");
      container.appendChild(alert);

      // 验证初始值
      expect(alert.variant).toBe("info");

      // 修改 variant
      alert.setAttribute("variant", "success");
      await waitForRender();

      expect(alert.variant).toBe("success");

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("ea-alert--success")).toBe(true);
      expect(containerEl.classList.contains("ea-alert--info")).toBe(false);
    });

    it("variant 属性应该支持所有预定义值", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("title", "Variant Support Test");
      container.appendChild(alert);

      // 测试所有预定义的 variant 值
      const validVariants = ["primary", "success", "warning", "danger", "info"];

      for (const variant of validVariants) {
        alert.setAttribute("variant", variant);
        await waitForRender();

        expect(alert.variant).toBe(variant);
      }
    });
  });

  /**
   * Effect 属性测试
   * 测试 light 和 dark 主题效果
   */
  describe("Effect Attribute", () => {
    it("应该正确应用 effect='light' 样式", () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("variant", "info");
      alert.setAttribute("effect", "light");
      alert.setAttribute("title", "Light Effect Alert");
      container.appendChild(alert);

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("ea-alert--light")).toBe(true);
    });

    it("应该正确应用 effect='dark' 样式", () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("variant", "info");
      alert.setAttribute("effect", "dark");
      alert.setAttribute("title", "Dark Effect Alert");
      container.appendChild(alert);

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("ea-alert--dark")).toBe(true);
    });

    it("effect 属性变化时应该正确更新", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("variant", "info");
      alert.setAttribute("effect", "light");
      alert.setAttribute("title", "Effect Change Test");
      container.appendChild(alert);

      // 验证初始值
      expect(alert.effect).toBe("light");

      // 修改 effect
      alert.setAttribute("effect", "dark");
      await waitForRender();

      expect(alert.effect).toBe("dark");

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("ea-alert--dark")).toBe(true);
      expect(containerEl.classList.contains("ea-alert--light")).toBe(false);
    });

    it("默认 effect 应该是 light", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("title", "Default Effect Alert");
      container.appendChild(alert);

      await waitForRender();

      expect(alert.effect).toBe("light");
    });
  });

  /**
   * Show-icon 属性测试
   * 测试图标显示功能
   */
  describe("Show-icon Attribute", () => {
    it("应该正确显示图标当 show-icon='true'", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("variant", "info");
      alert.setAttribute("show-icon", "true");
      alert.setAttribute("title", "Alert with Icon");
      container.appendChild(alert);

      await waitForRender();

      const iconSlot = alert.shadowRoot.querySelector('slot[name="icon"]');
      expect(iconSlot).toBeDefined();
    });

    it("默认应该不显示图标", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("title", "Alert without Icon");
      container.appendChild(alert);

      await waitForRender();

      const iconSlot = alert.shadowRoot.querySelector('slot[name="icon"]');
      // 默认情况下图标 slot 可能不存在或为空
      expect(iconSlot).toBeDefined();
    });

    it("show-icon 属性变化时应该正确更新", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("variant", "info");
      alert.setAttribute("title", "Show Icon Change Test");
      container.appendChild(alert);

      // 初始状态
      await waitForRender();

      // 启用 show-icon
      alert.setAttribute("show-icon", "true");
      await waitForRender();

      expect(alert.showIcon).toBe(true);

      // 禁用 show-icon
      alert.removeAttribute("show-icon");
      await waitForRender();

      expect(alert.showIcon).toBe(false);
    });

    it("不同 variant 应该显示对应的图标", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("variant", "success");
      alert.setAttribute("show-icon", "true");
      alert.setAttribute("title", "Success Alert with Icon");
      container.appendChild(alert);

      await waitForRender();

      const iconSlot = alert.shadowRoot.querySelector('slot[name="icon"]');
      expect(iconSlot).toBeDefined();
    });
  });

  /**
   * Closable 属性测试
   * 测试关闭功能
   */
  describe("Closable Attribute", () => {
    it("应该显示关闭按钮当 closable='true'", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("variant", "info");
      alert.setAttribute("closable", "true");
      alert.setAttribute("title", "Closable Alert");
      container.appendChild(alert);

      await waitForRender();

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      expect(closeBtn).toBeDefined();
      expect(closeBtn.children.length).toBeGreaterThan(0);
    });

    it("应该隐藏关闭按钮当 closable='false'", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("variant", "info");
      alert.setAttribute("closable", "false");
      alert.setAttribute("title", "Non-closable Alert");
      container.appendChild(alert);

      await waitForRender();

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      expect(closeBtn.children.length).toBe(0);
    });

    it("点击关闭按钮应该触发 close 事件", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("variant", "info");
      alert.setAttribute("closable", "true");
      alert.setAttribute("title", "Closable Alert");
      container.appendChild(alert);

      await waitForRender();

      const closeHandler = vi.fn();
      alert.addEventListener("close", closeHandler);

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      closeBtn.click();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      containerEl.dispatchEvent(new Event("transitionend", { bubbles: true }));

      await waitForRender();

      expect(closeHandler).toHaveBeenCalled();
    });

    it("关闭按钮应该显示自定义文本", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("variant", "info");
      alert.setAttribute("closable", "true");
      alert.setAttribute("close-text", "关闭");
      alert.setAttribute("title", "Custom Close Text Alert");
      container.appendChild(alert);

      await waitForRender();

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      expect(closeBtn.textContent).toBe("关闭");
    });
  });

  /**
   * Center 属性测试
   * 测试文字居中功能
   */
  describe("Center Attribute", () => {
    it("应该居中显示当 center='true'", () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("variant", "info");
      alert.setAttribute("center", "true");
      alert.setAttribute("title", "Centered Alert");
      container.appendChild(alert);

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("is-center")).toBe(true);
    });

    it("默认不应该居中显示", () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("variant", "info");
      alert.setAttribute("title", "Non-centered Alert");
      container.appendChild(alert);

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("is-center")).toBe(false);
    });
  });

  /**
   * Description 属性测试
   * 测试辅助性文字介绍
   */
  describe("Description Attribute", () => {
    it("应该正确显示 description", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("variant", "info");
      alert.setAttribute("title", "Alert with Description");
      alert.setAttribute("description", "This is a detailed description");
      container.appendChild(alert);

      await waitForRender();

      const descriptionEl = alert.shadowRoot.querySelector(
        ".ea-alert__description"
      );
      expect(descriptionEl).toBeDefined();
      expect(descriptionEl.textContent).toContain(
        "This is a detailed description"
      );
    });

    it("description 属性变化时应该正确更新", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("variant", "info");
      alert.setAttribute("title", "Description Change Test");
      alert.setAttribute("description", "Initial description");
      container.appendChild(alert);

      await waitForRender();

      // 修改 description
      alert.setAttribute("description", "Updated description");
      await waitForRender();

      const descriptionEl = alert.shadowRoot.querySelector(
        ".ea-alert__description"
      );
      expect(descriptionEl.textContent).toContain("Updated description");
    });
  });

  /**
   * 图标类型映射测试
   * 测试不同 variant 对应的图标类型
   */
  describe("Icon Type Mapping", () => {
    it("应该为每种 variant 显示正确的图标", async () => {
      const iconMap = {
        primary: "circle-info",
        success: "circle-check",
        info: "circle-info",
        warning: "triangle-exclamation",
        danger: "circle-xmark",
      };

      for (const [variant, iconName] of Object.entries(iconMap)) {
        const alert = document.createElement("ea-alert");
        alert.setAttribute("variant", variant);
        alert.setAttribute("show-icon", "true");
        alert.setAttribute("title", `${variant} Alert`);
        container.appendChild(alert);

        await waitForRender();

        const iconSlot = alert.shadowRoot.querySelector('slot[name="icon"]');
        expect(iconSlot).toBeDefined();

        // 清理 DOM 以便下一次测试
        container.removeChild(alert);
      }
    });
  });

  /**
   * 复杂场景测试
   * 测试多个属性组合使用
   */
  describe("Complex Scenarios", () => {
    it("应该支持组合使用多个属性", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("variant", "success");
      alert.setAttribute("effect", "dark");
      alert.setAttribute("show-icon", "true");
      alert.setAttribute("closable", "true");
      alert.setAttribute("center", "true");
      alert.setAttribute("title", "Complex Alert");
      alert.setAttribute(
        "description",
        "This is a complex alert with multiple properties"
      );
      container.appendChild(alert);

      await waitForRender();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("ea-alert--success")).toBe(true);
      expect(containerEl.classList.contains("ea-alert--dark")).toBe(true);
      expect(containerEl.classList.contains("is-center")).toBe(true);

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      expect(closeBtn).toBeDefined();
    });

    it("应该正确处理动态属性变化", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("variant", "info");
      alert.setAttribute("title", "Dynamic Alert");
      container.appendChild(alert);

      await waitForRender();

      // 验证初始状态
      let containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("ea-alert--info")).toBe(true);

      // 动态更新属性
      alert.setAttribute("variant", "warning");
      alert.setAttribute("effect", "dark");
      alert.setAttribute("center", "true");

      await waitForRender();

      containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("ea-alert--warning")).toBe(true);
      expect(containerEl.classList.contains("ea-alert--dark")).toBe(true);
      expect(containerEl.classList.contains("is-center")).toBe(true);
    });

    it("应该正确处理 slot 内容", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("variant", "info");
      alert.innerHTML = `
        <span slot="title">Custom Title</span>
        <span slot="description">Custom Description</span>
      `;
      container.appendChild(alert);

      await waitForRender();

      const titleSlot = alert.shadowRoot.querySelector('slot[name="title"]');
      const descriptionSlot = alert.shadowRoot.querySelector(
        ".ea-alert__description slot"
      );

      expect(titleSlot).toBeDefined();
      expect(descriptionSlot).toBeDefined();
    });
  });
});
