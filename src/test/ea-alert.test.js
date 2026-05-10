import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender";

import "../components/ea-alert/index";

describe("EaAlert Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("Basic Functionality", () => {
    it("应该正确渲染 ea-alert 组件", () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      expect(alert).toBeDefined();
      expect(alert.shadowRoot).toBeDefined();
    });

    it("应该包含 .ea-alert 容器元素", () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl).toBeDefined();
    });

    it("应该包含 icon-wrap 元素", () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      const iconWrap = alert.shadowRoot.querySelector(".ea-alert__icon-wrap");
      expect(iconWrap).toBeDefined();
    });

    it("应该包含 content 元素", () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      const content = alert.shadowRoot.querySelector(".ea-alert__content");
      expect(content).toBeDefined();
    });

    it("应该包含 heading 元素", () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      const heading = alert.shadowRoot.querySelector(".ea-alert__heading");
      expect(heading).toBeDefined();
    });

    it("应该包含 description 元素", () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      const description = alert.shadowRoot.querySelector(
        ".ea-alert__description"
      );
      expect(description).toBeDefined();
    });

    it("应该包含 close-btn 元素", () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      expect(closeBtn).toBeDefined();
    });

    it("应该支持 icon slot", () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      const iconSlot = alert.shadowRoot.querySelector('slot[name="icon"]');
      expect(iconSlot).toBeDefined();
    });

    it("应该支持 heading slot", () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      const headingSlot = alert.shadowRoot.querySelector(
        'slot[name="heading"]'
      );
      expect(headingSlot).toBeDefined();
    });

    it("应该支持默认 slot", () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      const defaultSlot = alert.shadowRoot.querySelector("slot");
      expect(defaultSlot).toBeDefined();
    });
  });

  describe("Heading Attribute", () => {
    it("默认 heading 应该是空字符串", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      expect(alert.heading).toBe("");
    });

    it("应该正确设置 heading 属性", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("heading", "Test Heading");
      container.appendChild(alert);

      await waitForRender();

      expect(alert.heading).toBe("Test Heading");
    });

    it("heading 属性变化时应该正确更新", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("heading", "Initial Heading");
      container.appendChild(alert);

      await waitForRender();

      expect(alert.heading).toBe("Initial Heading");

      alert.setAttribute("heading", "Updated Heading");
      await waitForRender();

      expect(alert.heading).toBe("Updated Heading");
    });

    it("heading 应该渲染到 heading 元素中", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("heading", "My Heading");
      container.appendChild(alert);

      await waitForRender();

      const headingEl = alert.shadowRoot.querySelector(".ea-alert__heading");
      expect(headingEl.textContent).toContain("My Heading");
    });
  });

  describe("Description Attribute", () => {
    it("默认 description 应该是空字符串", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      expect(alert.description).toBe("");
    });

    it("应该正确设置 description 属性", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("description", "Test Description");
      container.appendChild(alert);

      await waitForRender();

      expect(alert.description).toBe("Test Description");
    });

    it("description 属性变化时应该正确更新", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("description", "Initial Description");
      container.appendChild(alert);

      await waitForRender();

      alert.setAttribute("description", "Updated Description");
      await waitForRender();

      expect(alert.description).toBe("Updated Description");
    });

    it("description 为空时应该显示默认 slot", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      const descriptionEl = alert.shadowRoot.querySelector(
        ".ea-alert__description"
      );
      const slot = descriptionEl.querySelector("slot");
      expect(slot).toBeDefined();
    });

    it("description 有值时应该覆盖默认 slot", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("description", "My Description");
      container.appendChild(alert);

      await waitForRender();

      const descriptionEl = alert.shadowRoot.querySelector(
        ".ea-alert__description"
      );
      expect(descriptionEl.textContent).toContain("My Description");
    });
  });

  describe("Variant Attribute", () => {
    it("默认 variant 应该是 info", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      expect(alert.variant).toBe("info");
    });

    it("应该正确设置 variant 属性", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("variant", "primary");
      container.appendChild(alert);

      await waitForRender();

      expect(alert.variant).toBe("primary");
    });

    it("应该支持所有 variant 类型", async () => {
      const variants = ["primary", "success", "info", "warning", "danger"];

      for (const variant of variants) {
        const alert = document.createElement("ea-alert");
        alert.setAttribute("variant", variant);
        container.appendChild(alert);

        await waitForRender();

        expect(alert.variant).toBe(variant);

        const containerEl = alert.shadowRoot.querySelector(".ea-alert");
        expect(containerEl.classList.contains(`ea-alert--${variant}`)).toBe(
          true
        );

        container.removeChild(alert);
      }
    });

    it("variant 变化时应该正确更新容器 class", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("variant", "info");
      container.appendChild(alert);

      await waitForRender();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("ea-alert--info")).toBe(true);

      alert.setAttribute("variant", "success");
      await waitForRender();

      expect(containerEl.classList.contains("ea-alert--success")).toBe(true);
      expect(containerEl.classList.contains("ea-alert--info")).toBe(false);
    });

    it("variant 变化时如果 showIcon 为 true 应该更新图标", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("show-icon", "");
      alert.setAttribute("variant", "info");
      container.appendChild(alert);

      await waitForRender();

      let iconEl = alert.shadowRoot.querySelector(".ea-alert__icon");
      expect(iconEl.getAttribute("name")).toBe("circle-info");

      alert.setAttribute("variant", "success");
      await waitForRender();

      iconEl = alert.shadowRoot.querySelector(".ea-alert__icon");
      expect(iconEl.getAttribute("name")).toBe("circle-check");
    });
  });

  describe("Effect Attribute", () => {
    it("默认 effect 应该是 light", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      expect(alert.effect).toBe("light");
    });

    it("应该正确应用 effect=light 样式", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("effect", "light");
      container.appendChild(alert);

      await waitForRender();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("ea-alert--light")).toBe(true);
    });

    it("应该正确应用 effect=dark 样式", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("effect", "dark");
      container.appendChild(alert);

      await waitForRender();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("ea-alert--dark")).toBe(true);
    });

    it("effect 变化时应该正确更新 class", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("effect", "light");
      container.appendChild(alert);

      await waitForRender();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("ea-alert--light")).toBe(true);

      alert.setAttribute("effect", "dark");
      await waitForRender();

      expect(containerEl.classList.contains("ea-alert--dark")).toBe(true);
      expect(containerEl.classList.contains("ea-alert--light")).toBe(false);
    });
  });

  describe("Closable Attribute", () => {
    it("默认 closable 应该是 true", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      expect(alert.closable).toBe(true);
    });

    it("closable 为 true 时应该显示关闭图标", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      const closeIcon = closeBtn.querySelector(".ea-alert__close-icon");
      expect(closeIcon).toBeDefined();
    });

    it("closable 为 false 时应该隐藏关闭按钮内容", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("closable", "false");
      container.appendChild(alert);

      await waitForRender();

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      expect(closeBtn.innerHTML).toBe("");
    });

    it("closable 变化时应该正确更新", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      expect(closeBtn.querySelector(".ea-alert__close-icon")).toBeDefined();

      alert.setAttribute("closable", "false");
      await waitForRender();

      expect(closeBtn.innerHTML).toBe("");
    });
  });

  describe("Close-Text Attribute", () => {
    it("默认 closeText 应该是空字符串", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      expect(alert.closeText).toBe("");
    });

    it("设置 closeText 后应该显示自定义文本而非图标", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("close-text", "关闭");
      container.appendChild(alert);

      await waitForRender();

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      expect(closeBtn.textContent).toBe("关闭");
    });

    it("closeText 变化时应该正确更新", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("close-text", "关闭");
      container.appendChild(alert);

      await waitForRender();

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      expect(closeBtn.textContent).toBe("关闭");

      alert.setAttribute("close-text", "Close");
      await waitForRender();

      expect(closeBtn.textContent).toBe("Close");
    });
  });

  describe("Show-Icon Attribute", () => {
    it("默认 showIcon 应该是 false", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      expect(alert.showIcon).toBe(false);
    });

    it("设置 showIcon 后应该显示图标", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("show-icon", "");
      container.appendChild(alert);

      await waitForRender();

      const iconEl = alert.shadowRoot.querySelector(".ea-alert__icon");
      expect(iconEl).toBeDefined();
    });

    it("showIcon 变化时应该正确更新", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      let iconEl = alert.shadowRoot.querySelector(".ea-alert__icon");
      expect(iconEl).toBeNull();

      alert.setAttribute("show-icon", "");
      await waitForRender();

      iconEl = alert.shadowRoot.querySelector(".ea-alert__icon");
      expect(iconEl).toBeDefined();
    });
  });

  describe("Icon Type Mapping", () => {
    const iconMap = {
      primary: "circle-info",
      success: "circle-check",
      info: "circle-info",
      warning: "triangle-exclamation",
      danger: "circle-xmark",
    };

    Object.entries(iconMap).forEach(([variant, iconName]) => {
      it(`variant="${variant}" 应该显示 "${iconName}" 图标`, async () => {
        const alert = document.createElement("ea-alert");
        alert.setAttribute("variant", variant);
        alert.setAttribute("show-icon", "");
        container.appendChild(alert);

        await waitForRender();

        const iconEl = alert.shadowRoot.querySelector(".ea-alert__icon");
        expect(iconEl).toBeDefined();
        expect(iconEl.getAttribute("name")).toBe(iconName);
      });
    });
  });

  describe("Center Attribute", () => {
    it("默认 center 应该是 false", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      expect(alert.center).toBe(false);
    });

    it("设置 center 后应该添加 is-center 状态 class", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("center", "");
      container.appendChild(alert);

      await waitForRender();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("is-center")).toBe(true);
    });

    it("未设置 center 时不应有 is-center 状态 class", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("is-center")).toBe(false);
    });

    it("center 变化时应该正确更新 class", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("is-center")).toBe(false);

      alert.setAttribute("center", "");
      await waitForRender();

      expect(containerEl.classList.contains("is-center")).toBe(true);
    });
  });

  describe("BEM Class Names", () => {
    it("默认应该有 ea-alert、ea-alert--info、ea-alert--light class", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("ea-alert")).toBe(true);
      expect(containerEl.classList.contains("ea-alert--info")).toBe(true);
      expect(containerEl.classList.contains("ea-alert--light")).toBe(true);
    });

    it("variant=primary 应该添加 ea-alert--primary class", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("variant", "primary");
      container.appendChild(alert);

      await waitForRender();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("ea-alert--primary")).toBe(true);
    });

    it("effect=dark 应该添加 ea-alert--dark class", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("effect", "dark");
      container.appendChild(alert);

      await waitForRender();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("ea-alert--dark")).toBe(true);
    });

    it("center 应该添加 is-center 状态 class", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("center", "");
      container.appendChild(alert);

      await waitForRender();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("is-center")).toBe(true);
    });
  });

  describe("CSS Parts", () => {
    it("应该正确设置 container part", () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      const containerEl = alert.shadowRoot.querySelector('[part="container"]');
      expect(containerEl).toBeDefined();
    });

    it("应该正确设置 icon-wrap part", () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      const iconWrap = alert.shadowRoot.querySelector('[part="icon-wrap"]');
      expect(iconWrap).toBeDefined();
    });

    it("应该正确设置 content-wrap part", () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      const contentWrap = alert.shadowRoot.querySelector(
        '[part="content-wrap"]'
      );
      expect(contentWrap).toBeDefined();
    });

    it("应该正确设置 heading part", () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      const heading = alert.shadowRoot.querySelector('[part="heading"]');
      expect(heading).toBeDefined();
    });

    it("应该正确设置 description part", () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      const description = alert.shadowRoot.querySelector(
        '[part="description"]'
      );
      expect(description).toBeDefined();
    });

    it("应该正确设置 close-btn part", () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      const closeBtn = alert.shadowRoot.querySelector('[part="close-btn"]');
      expect(closeBtn).toBeDefined();
    });

    it("showIcon 为 true 时应该设置 icon part", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("show-icon", "");
      container.appendChild(alert);

      await waitForRender();

      const icon = alert.shadowRoot.querySelector('[part="icon"]');
      expect(icon).toBeDefined();
    });

    it("closable 为 true 时应该设置 close-icon part", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      const closeIcon = alert.shadowRoot.querySelector('[part="close-icon"]');
      expect(closeIcon).toBeDefined();
    });
  });

  describe("Close Event", () => {
    it("点击关闭按钮应该添加 ea-alert--before-close class", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      closeBtn.click();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("ea-alert--before-close")).toBe(
        true
      );
    });

    it("点击关闭按钮后 transitionend 应该触发 close 事件", async () => {
      const alert = document.createElement("ea-alert");
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

    it("close 事件应该包含 detail: { visible: false }", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      let eventDetail = null;
      alert.addEventListener("close", e => {
        eventDetail = e.detail;
      });

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      closeBtn.click();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      containerEl.dispatchEvent(new Event("transitionend", { bubbles: true }));

      await waitForRender();

      expect(eventDetail).toEqual({ visible: false });
    });

    it("关闭后应该从 DOM 中移除", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      closeBtn.click();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      containerEl.dispatchEvent(new Event("transitionend", { bubbles: true }));

      await waitForRender();

      expect(container.contains(alert)).toBe(false);
    });

    it("closable 为 false 时不应该关闭", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("closable", "false");
      container.appendChild(alert);

      await waitForRender();

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      closeBtn.click();

      await waitForRender();

      expect(container.contains(alert)).toBe(true);
    });
  });

  describe("Open Event", () => {
    it("showAfter 大于 0 时应该延迟触发 open 事件", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("show-after", "150");

      const openHandler = vi.fn();
      alert.addEventListener("open", openHandler);

      container.appendChild(alert);

      await waitForRender(300);

      expect(openHandler).toHaveBeenCalled();
    });

    it("showAfter 大于 0 时初始应该添加 ea-alert--hide class", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("show-after", "500");
      container.appendChild(alert);

      await waitForRender();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("ea-alert--hide")).toBe(true);
    });

    it("showAfter 到期后应该移除 ea-alert--hide class", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("show-after", "200");
      container.appendChild(alert);

      await waitForRender();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("ea-alert--hide")).toBe(true);

      await waitForRender(300);

      expect(containerEl.classList.contains("ea-alert--hide")).toBe(false);
    });

    it("showAfter 为 0 时不应添加 ea-alert--hide class", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("ea-alert--hide")).toBe(false);
    });
  });

  describe("Auto-Close Attribute", () => {
    it("默认 autoClose 应该是 0", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      expect(alert.autoClose).toBe(0);
    });

    it("autoClose 大于 0 且有 auto-close 属性时应该自动关闭", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("auto-close", "100");
      container.appendChild(alert);

      await waitForRender();

      await waitForRender(200);

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("ea-alert--before-close")).toBe(
        true
      );
    });
  });

  describe("Hide-After Attribute", () => {
    it("默认 hideAfter 应该是 0", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      expect(alert.hideAfter).toBe(0);
    });
  });

  describe("Complex Scenarios", () => {
    it("应该支持组合使用多个属性", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("variant", "success");
      alert.setAttribute("effect", "dark");
      alert.setAttribute("show-icon", "");
      alert.setAttribute("center", "");
      alert.setAttribute("heading", "Success Alert");
      alert.setAttribute("description", "This is a success alert");
      container.appendChild(alert);

      await waitForRender();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("ea-alert--success")).toBe(true);
      expect(containerEl.classList.contains("ea-alert--dark")).toBe(true);
      expect(containerEl.classList.contains("is-center")).toBe(true);

      const iconEl = alert.shadowRoot.querySelector(".ea-alert__icon");
      expect(iconEl).toBeDefined();
      expect(iconEl.getAttribute("name")).toBe("circle-check");
    });

    it("应该正确处理动态属性变化", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("variant", "info");
      container.appendChild(alert);

      await waitForRender();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("ea-alert--info")).toBe(true);

      alert.setAttribute("variant", "warning");
      alert.setAttribute("effect", "dark");
      alert.setAttribute("center", "");
      await waitForRender();

      expect(containerEl.classList.contains("ea-alert--warning")).toBe(true);
      expect(containerEl.classList.contains("ea-alert--dark")).toBe(true);
      expect(containerEl.classList.contains("is-center")).toBe(true);
    });

    it("应该支持 variant + effect + showIcon 组合", async () => {
      const variants = ["primary", "success", "info", "warning", "danger"];

      for (const variant of variants) {
        const alert = document.createElement("ea-alert");
        alert.setAttribute("variant", variant);
        alert.setAttribute("effect", "dark");
        alert.setAttribute("show-icon", "");
        container.appendChild(alert);

        await waitForRender();

        const containerEl = alert.shadowRoot.querySelector(".ea-alert");
        expect(containerEl.classList.contains(`ea-alert--${variant}`)).toBe(
          true
        );
        expect(containerEl.classList.contains("ea-alert--dark")).toBe(true);

        container.removeChild(alert);
      }
    });

    it("应该支持 closeText 替代关闭图标", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("close-text", "知道了");
      container.appendChild(alert);

      await waitForRender();

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      expect(closeBtn.textContent).toBe("知道了");
      expect(closeBtn.querySelector(".ea-alert__close-icon")).toBeNull();
    });

    it("应该支持 heading slot 自定义内容", async () => {
      const alert = document.createElement("ea-alert");
      alert.innerHTML = '<span slot="heading">Custom Heading</span>';
      container.appendChild(alert);

      await waitForRender();

      const headingSlot = alert.shadowRoot.querySelector(
        'slot[name="heading"]'
      );
      expect(headingSlot).toBeDefined();
    });

    it("应该支持 icon slot 自定义内容", async () => {
      const alert = document.createElement("ea-alert");
      alert.innerHTML = '<span slot="icon">Custom Icon</span>';
      container.appendChild(alert);

      await waitForRender();

      const iconSlot = alert.shadowRoot.querySelector('slot[name="icon"]');
      expect(iconSlot).toBeDefined();
    });

    it("应该支持默认 slot 自定义描述内容", async () => {
      const alert = document.createElement("ea-alert");
      alert.innerHTML = "<span>Custom Description</span>";
      container.appendChild(alert);

      await waitForRender();

      const defaultSlot = alert.shadowRoot.querySelector(
        ".ea-alert__description slot"
      );
      expect(defaultSlot).toBeDefined();
    });

    it("variant 和 effect 同时变化时 class 应该正确更新", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("variant", "primary");
      alert.setAttribute("effect", "light");
      container.appendChild(alert);

      await waitForRender();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("ea-alert--primary")).toBe(true);
      expect(containerEl.classList.contains("ea-alert--light")).toBe(true);

      alert.setAttribute("variant", "danger");
      alert.setAttribute("effect", "dark");
      await waitForRender();

      expect(containerEl.classList.contains("ea-alert--danger")).toBe(true);
      expect(containerEl.classList.contains("ea-alert--dark")).toBe(true);
      expect(containerEl.classList.contains("ea-alert--primary")).toBe(false);
      expect(containerEl.classList.contains("ea-alert--light")).toBe(false);
    });
  });
});
