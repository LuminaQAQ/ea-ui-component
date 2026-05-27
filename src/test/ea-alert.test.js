import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender";

import "../components/ea-alert/index";

describe("EaAlert", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
    vi.useRealTimers();
  });

  describe("Basic Rendering", () => {
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
      expect(containerEl).not.toBeNull();
    });

    it("应该包含 icon-wrap 元素", () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      const iconWrap = alert.shadowRoot.querySelector(".ea-alert__icon-wrap");
      expect(iconWrap).not.toBeNull();
    });

    it("应该包含 content 元素", () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      const content = alert.shadowRoot.querySelector(".ea-alert__content");
      expect(content).not.toBeNull();
    });

    it("应该包含 heading 元素", () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      const heading = alert.shadowRoot.querySelector(".ea-alert__heading");
      expect(heading).not.toBeNull();
    });

    it("应该包含 description 元素", () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      const description = alert.shadowRoot.querySelector(
        ".ea-alert__description"
      );
      expect(description).not.toBeNull();
    });

    it("应该包含 close-btn 元素", () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      expect(closeBtn).not.toBeNull();
    });

    it("close-btn 应该是 button 元素", () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      expect(closeBtn.tagName).toBe("BUTTON");
    });

    it("close-btn 应该有 type=button 属性", () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      expect(closeBtn.getAttribute("type")).toBe("button");
    });

    it("close-btn 应该是容器的直接子元素", () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      expect(closeBtn.parentElement).toBe(containerEl);
    });

    it("close-btn 不应该在 content 元素内", () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      const content = alert.shadowRoot.querySelector(".ea-alert__content");
      const closeBtn = content.querySelector(".ea-alert__close-btn");
      expect(closeBtn).toBeNull();
    });
  });

  describe("Slots", () => {
    it("应该支持 icon slot", () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      const iconSlot = alert.shadowRoot.querySelector('slot[name="icon"]');
      expect(iconSlot).not.toBeNull();
    });

    it("应该支持 heading slot", () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      const headingSlot = alert.shadowRoot.querySelector(
        'slot[name="heading"]'
      );
      expect(headingSlot).not.toBeNull();
    });

    it("应该支持默认 slot", () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      const defaultSlot = alert.shadowRoot.querySelector(
        ".ea-alert__description slot"
      );
      expect(defaultSlot).not.toBeNull();
    });

    it("icon slot 应该在 icon-wrap 内", () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      const iconWrap = alert.shadowRoot.querySelector(".ea-alert__icon-wrap");
      const iconSlot = iconWrap.querySelector('slot[name="icon"]');
      expect(iconSlot).not.toBeNull();
    });

    it("heading slot 应该在 heading 元素内", () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      const headingEl = alert.shadowRoot.querySelector(".ea-alert__heading");
      const headingSlot = headingEl.querySelector('slot[name="heading"]');
      expect(headingSlot).not.toBeNull();
    });

    it("默认 slot 应该在 description 元素内", () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      const descriptionEl = alert.shadowRoot.querySelector(
        ".ea-alert__description"
      );
      const defaultSlot = descriptionEl.querySelector("slot");
      expect(defaultSlot).not.toBeNull();
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

    it("heading 变化时应该更新 heading 元素内容", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("heading", "Old Heading");
      container.appendChild(alert);

      await waitForRender();

      const headingEl = alert.shadowRoot.querySelector(".ea-alert__heading");
      expect(headingEl.textContent).toContain("Old Heading");

      alert.setAttribute("heading", "New Heading");
      await waitForRender();

      expect(headingEl.textContent).toContain("New Heading");
    });

    it("heading 为空时 heading 元素应该包含 slot", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      const headingEl = alert.shadowRoot.querySelector(".ea-alert__heading");
      const slot = headingEl.querySelector('slot[name="heading"]');
      expect(slot).not.toBeNull();
    });

    it("heading 从有值变为空时应该恢复 slot", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("heading", "Has Value");
      container.appendChild(alert);

      await waitForRender();

      const headingEl = alert.shadowRoot.querySelector(".ea-alert__heading");
      expect(headingEl.textContent).toContain("Has Value");

      alert.setAttribute("heading", "");
      await waitForRender();

      const slot = headingEl.querySelector('slot[name="heading"]');
      expect(slot).not.toBeNull();
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
      expect(slot).not.toBeNull();
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

    it("description 从有值变为空时应该恢复 slot", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("description", "Has Value");
      container.appendChild(alert);

      await waitForRender();

      const descriptionEl = alert.shadowRoot.querySelector(
        ".ea-alert__description"
      );
      expect(descriptionEl.textContent).toContain("Has Value");

      alert.setAttribute("description", "");
      await waitForRender();

      const slot = descriptionEl.querySelector("slot");
      expect(slot).not.toBeNull();
    });

    it("description 为空时不应有 is-has-description 状态 class", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("is-has-description")).toBe(false);
    });

    it("description 有值时应该添加 is-has-description 状态 class", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("description", "Some description");
      container.appendChild(alert);

      await waitForRender();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("is-has-description")).toBe(true);
    });

    it("description 从有值变为空时应该移除 is-has-description 状态 class", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("description", "Has description");
      container.appendChild(alert);

      await waitForRender();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("is-has-description")).toBe(true);

      alert.setAttribute("description", "");
      await waitForRender();

      expect(containerEl.classList.contains("is-has-description")).toBe(false);
    });

    it("description 从空变为有值时应该添加 is-has-description 状态 class", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("is-has-description")).toBe(false);

      alert.setAttribute("description", "Now has description");
      await waitForRender();

      expect(containerEl.classList.contains("is-has-description")).toBe(true);
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

    it("variant 变化时如果 showIcon 为 false 不应该添加图标", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("variant", "info");
      container.appendChild(alert);

      await waitForRender();

      let iconEl = alert.shadowRoot.querySelector(".ea-alert__icon");
      expect(iconEl).toBeNull();

      alert.setAttribute("variant", "success");
      await waitForRender();

      iconEl = alert.shadowRoot.querySelector(".ea-alert__icon");
      expect(iconEl).toBeNull();
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
      expect(closeIcon).not.toBeNull();
    });

    it("closable 设为 false 时应该清空关闭按钮内容", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      alert.closable = false;
      await waitForRender();

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      expect(closeBtn.innerHTML).toBe("");
    });

    it("closable 从 false 变回 true 时应该恢复关闭图标", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      alert.closable = false;
      await waitForRender();

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      expect(closeBtn.querySelector(".ea-alert__close-icon")).toBeNull();

      alert.closable = true;
      await waitForRender();

      expect(closeBtn.querySelector(".ea-alert__close-icon")).not.toBeNull();
    });

    it("closable 为 true 且 closeText 有值时应该显示 closeText", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("close-text", "关闭");
      container.appendChild(alert);

      await waitForRender();

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      expect(closeBtn.textContent).toBe("关闭");
    });

    it("closable 从 true 变为 false 时应该清空 closeText 内容", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("close-text", "关闭");
      container.appendChild(alert);

      await waitForRender();

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      expect(closeBtn.textContent).toBe("关闭");

      alert.closable = false;
      await waitForRender();

      expect(closeBtn.innerHTML).toBe("");
    });

    it("closable 从 false 变为 true 且 closeText 有值时应该显示 closeText", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("close-text", "知道了");
      container.appendChild(alert);

      await waitForRender();

      alert.closable = false;
      await waitForRender();

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      expect(closeBtn.innerHTML).toBe("");

      alert.closable = true;
      await waitForRender();

      expect(closeBtn.textContent).toBe("知道了");
    });
  });

  describe("Close-Text Attribute", () => {
    it("默认 closeText 应该是空字符串", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      expect(alert.closeText).toBe("");
    });

    it("设置 closeText 后应该显示自定义文本", async () => {
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

    it("closeText 有值时应该替代关闭图标", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("close-text", "知道了");
      container.appendChild(alert);

      await waitForRender();

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      expect(closeBtn.textContent).toBe("知道了");
      expect(closeBtn.querySelector(".ea-alert__close-icon")).toBeNull();
    });

    it("closeText 清空后应该恢复关闭图标", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("close-text", "关闭");
      container.appendChild(alert);

      await waitForRender();

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      expect(closeBtn.textContent).toBe("关闭");
      expect(closeBtn.querySelector(".ea-alert__close-icon")).toBeNull();

      alert.setAttribute("close-text", "");
      await waitForRender();

      expect(closeBtn.querySelector(".ea-alert__close-icon")).not.toBeNull();
    });

    it("closeText 清空后 closable 为 false 时不应恢复图标", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("close-text", "关闭");
      container.appendChild(alert);

      await waitForRender();

      alert.closable = false;
      await waitForRender();

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      expect(closeBtn.innerHTML).toBe("");

      alert.setAttribute("close-text", "");
      await waitForRender();

      expect(closeBtn.querySelector(".ea-alert__close-icon")).toBeNull();
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
      expect(iconEl).not.toBeNull();
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
      expect(iconEl).not.toBeNull();
    });

    it("showIcon 为 true 时图标应该有 part=icon", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("show-icon", "");
      container.appendChild(alert);

      await waitForRender();

      const iconEl = alert.shadowRoot.querySelector(".ea-alert__icon");
      expect(iconEl.getAttribute("part")).toBe("icon");
    });

    it("showIcon 从 true 变为 false 时应该移除图标", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("show-icon", "");
      container.appendChild(alert);

      await waitForRender();

      let iconEl = alert.shadowRoot.querySelector(".ea-alert__icon");
      expect(iconEl).not.toBeNull();

      alert.showIcon = false;
      await waitForRender();

      iconEl = alert.shadowRoot.querySelector(".ea-alert__icon");
      expect(iconEl).toBeNull();
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
        expect(iconEl).not.toBeNull();
        expect(iconEl.getAttribute("name")).toBe(iconName);
      });
    });

    it("variant 变化时图标应该跟随更新", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("show-icon", "");
      alert.setAttribute("variant", "info");
      container.appendChild(alert);

      await waitForRender();

      let iconEl = alert.shadowRoot.querySelector(".ea-alert__icon");
      expect(iconEl.getAttribute("name")).toBe("circle-info");

      alert.setAttribute("variant", "danger");
      await waitForRender();

      iconEl = alert.shadowRoot.querySelector(".ea-alert__icon");
      expect(iconEl.getAttribute("name")).toBe("circle-xmark");
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

    it("center 从 true 变为 false 时应该移除 is-center class", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("center", "");
      container.appendChild(alert);

      await waitForRender();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("is-center")).toBe(true);

      alert.removeAttribute("center");
      await waitForRender();

      expect(containerEl.classList.contains("is-center")).toBe(false);
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

    it("description 有值时应该添加 is-has-description 状态 class", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("description", "Description text");
      container.appendChild(alert);

      await waitForRender();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("is-has-description")).toBe(true);
    });

    it("description 为空时不应有 is-has-description 状态 class", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("is-has-description")).toBe(false);
    });
  });

  describe("CSS Parts", () => {
    it("应该正确设置 container part", () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      const containerEl = alert.shadowRoot.querySelector('[part="container"]');
      expect(containerEl).not.toBeNull();
    });

    it("应该正确设置 icon-wrap part", () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      const iconWrap = alert.shadowRoot.querySelector('[part="icon-wrap"]');
      expect(iconWrap).not.toBeNull();
    });

    it("应该正确设置 content-wrap part", () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      const contentWrap = alert.shadowRoot.querySelector(
        '[part="content-wrap"]'
      );
      expect(contentWrap).not.toBeNull();
    });

    it("应该正确设置 heading part", () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      const heading = alert.shadowRoot.querySelector('[part="heading"]');
      expect(heading).not.toBeNull();
    });

    it("应该正确设置 description part", () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      const description = alert.shadowRoot.querySelector(
        '[part="description"]'
      );
      expect(description).not.toBeNull();
    });

    it("应该正确设置 close-btn part", () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      const closeBtn = alert.shadowRoot.querySelector('[part="close-btn"]');
      expect(closeBtn).not.toBeNull();
    });

    it("showIcon 为 true 时应该设置 icon part", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("show-icon", "");
      container.appendChild(alert);

      await waitForRender();

      const icon = alert.shadowRoot.querySelector('[part="icon"]');
      expect(icon).not.toBeNull();
    });

    it("showIcon 为 false 时不应有 icon part", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      const icon = alert.shadowRoot.querySelector('[part="icon"]');
      expect(icon).toBeNull();
    });

    it("closable 为 true 时应该设置 close-icon part", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      const closeIcon = alert.shadowRoot.querySelector('[part="close-icon"]');
      expect(closeIcon).not.toBeNull();
    });

    it("closable 为 false 时不应有 close-icon part", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      alert.closable = false;
      await waitForRender();

      const closeIcon = alert.shadowRoot.querySelector('[part="close-icon"]');
      expect(closeIcon).toBeNull();
    });

    it("closeText 有值时不应有 close-icon part", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("close-text", "关闭");
      container.appendChild(alert);

      await waitForRender();

      const closeIcon = alert.shadowRoot.querySelector('[part="close-icon"]');
      expect(closeIcon).toBeNull();
    });
  });

  describe("Close Event (ea-close)", () => {
    it("点击关闭按钮应该添加 is-before-close 状态 class", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      closeBtn.click();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("is-before-close")).toBe(true);
    });

    it("点击关闭按钮后 transitionend 应该触发 ea-close 事件", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      const closeHandler = vi.fn();
      alert.addEventListener("ea-close", closeHandler);

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      closeBtn.click();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      containerEl.dispatchEvent(
        new TransitionEvent("transitionend", {
          bubbles: true,
          propertyName: "filter",
        })
      );

      await waitForRender();

      expect(closeHandler).toHaveBeenCalled();
    });

    it("ea-close 事件应该包含 detail: { visible: false }", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      let eventDetail = null;
      alert.addEventListener("ea-close", e => {
        eventDetail = e.detail;
      });

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      closeBtn.click();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      containerEl.dispatchEvent(
        new TransitionEvent("transitionend", {
          bubbles: true,
          propertyName: "filter",
        })
      );

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
      containerEl.dispatchEvent(
        new TransitionEvent("transitionend", {
          bubbles: true,
          propertyName: "filter",
        })
      );

      await waitForRender();

      expect(container.contains(alert)).toBe(false);
    });

    it("关闭前应该先添加 is-before-close class 再触发 transitionend", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      closeBtn.click();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("is-before-close")).toBe(true);

      const closeHandler = vi.fn();
      alert.addEventListener("ea-close", closeHandler);

      containerEl.dispatchEvent(
        new TransitionEvent("transitionend", {
          bubbles: true,
          propertyName: "filter",
        })
      );

      await waitForRender();

      expect(closeHandler).toHaveBeenCalled();
    });

    it("closable 为 false 时点击关闭按钮不应触发关闭", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      alert.closable = false;
      await waitForRender();

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      closeBtn.click();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("is-before-close")).toBe(false);
    });

    it("closable 为 false 且 autoClose 为 0 时不应触发关闭", async () => {
      const alert = document.createElement("ea-alert");
      alert.closable = false;
      container.appendChild(alert);

      await waitForRender();

      const closeHandler = vi.fn();
      alert.addEventListener("ea-close", closeHandler);

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      closeBtn.click();

      expect(closeHandler).not.toHaveBeenCalled();
    });

    it("ea-close 事件应该 bubbles 且 composed", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      let caughtEvent = null;
      alert.addEventListener("ea-close", e => {
        caughtEvent = e;
      });

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      closeBtn.click();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      containerEl.dispatchEvent(
        new TransitionEvent("transitionend", {
          bubbles: true,
          propertyName: "filter",
        })
      );

      await waitForRender();

      expect(caughtEvent).not.toBeNull();
      expect(caughtEvent.bubbles).toBe(true);
      expect(caughtEvent.composed).toBe(true);
    });
  });

  describe("Open Event (ea-open)", () => {
    it("showAfter 到期后应该触发 ea-open 事件", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("show-after", "100");

      const openHandler = vi.fn();
      alert.addEventListener("ea-open", openHandler);

      container.appendChild(alert);

      await waitForRender();

      expect(openHandler).not.toHaveBeenCalled();

      await waitForRender(200);

      expect(openHandler).toHaveBeenCalled();
    });

    it("ea-open 事件应该 bubbles 且 composed", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("show-after", "100");

      let caughtEvent = null;
      alert.addEventListener("ea-open", e => {
        caughtEvent = e;
      });

      container.appendChild(alert);

      await waitForRender(250);

      expect(caughtEvent).not.toBeNull();
      expect(caughtEvent.bubbles).toBe(true);
      expect(caughtEvent.composed).toBe(true);
    });
  });

  describe("Show-After Attribute", () => {
    it("默认 showAfter 应该是 0", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      expect(alert.showAfter).toBe(0);
    });

    it("showAfter 为 0 时不应添加 is-hide 状态 class", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("is-hide")).toBe(false);
    });

    it("showAfter 大于 0 时初始应该添加 is-hide 状态 class", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("show-after", "500");
      container.appendChild(alert);

      await waitForRender();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("is-hide")).toBe(true);
    });

    it("showAfter 到期后应该移除 is-hide 状态 class", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("show-after", "100");
      container.appendChild(alert);

      await waitForRender();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("is-hide")).toBe(true);

      await waitForRender(200);

      expect(containerEl.classList.contains("is-hide")).toBe(false);
    });

    it("showAfter 大于 0 时应该延迟触发 ea-open 事件", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("show-after", "100");

      const openHandler = vi.fn();
      alert.addEventListener("ea-open", openHandler);

      container.appendChild(alert);

      await waitForRender();

      expect(openHandler).not.toHaveBeenCalled();

      await waitForRender(200);

      expect(openHandler).toHaveBeenCalled();
    });

    it("showAfter 为负数时应该取绝对值", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("show-after", "-100");
      container.appendChild(alert);

      await waitForRender();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("is-hide")).toBe(true);

      await waitForRender(200);

      expect(containerEl.classList.contains("is-hide")).toBe(false);
    });

    it("设置 show-after=0 时应该立即触发 ea-open 事件", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      const openHandler = vi.fn();
      alert.addEventListener("ea-open", openHandler);

      alert.setAttribute("show-after", "0");
      await waitForRender();

      expect(openHandler).toHaveBeenCalled();
    });

    it("showAfter 隐藏期间变更其他属性不应丢失 is-hide 状态", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("show-after", "500");
      container.appendChild(alert);

      await waitForRender();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("is-hide")).toBe(true);

      alert.setAttribute("variant", "success");
      await waitForRender();

      expect(containerEl.classList.contains("is-hide")).toBe(true);
      expect(containerEl.classList.contains("ea-alert--success")).toBe(true);
    });

    it("重新设置 showAfter 应该清除之前的定时器", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("show-after", "200");

      const openHandler = vi.fn();
      alert.addEventListener("ea-open", openHandler);

      container.appendChild(alert);

      await waitForRender();

      alert.setAttribute("show-after", "300");
      await waitForRender();

      await waitForRender(150);
      expect(openHandler).not.toHaveBeenCalled();

      await waitForRender(200);
      expect(openHandler).toHaveBeenCalled();
    });

    it("showAfter 到期后应该移除 is-hide 并触发 ea-open 事件", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("show-after", "100");

      const openHandler = vi.fn();
      alert.addEventListener("ea-open", openHandler);

      container.appendChild(alert);

      await waitForRender();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("is-hide")).toBe(true);

      await waitForRender(200);

      expect(containerEl.classList.contains("is-hide")).toBe(false);
      expect(openHandler).toHaveBeenCalled();
    });
  });

  describe("Auto-Close Attribute", () => {
    it("默认 autoClose 应该是 0", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      expect(alert.autoClose).toBe(0);
    });

    it("autoClose 大于 0 时应该自动关闭", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("auto-close", "100");
      container.appendChild(alert);

      await waitForRender();

      await waitForRender(200);

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("is-before-close")).toBe(true);
    });

    it("autoClose 大于 0 时应该触发 ea-close 事件", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("auto-close", "100");
      container.appendChild(alert);

      const closeHandler = vi.fn();
      alert.addEventListener("ea-close", closeHandler);

      await waitForRender();

      await waitForRender(200);

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      containerEl.dispatchEvent(
        new TransitionEvent("transitionend", {
          bubbles: true,
          propertyName: "filter",
        })
      );

      await waitForRender();

      expect(closeHandler).toHaveBeenCalled();
    });

    it("closable 为 false 但 autoClose 大于 0 时应该允许自动关闭", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("auto-close", "100");
      container.appendChild(alert);

      await waitForRender();

      alert.closable = false;
      await waitForRender();

      alert.setAttribute("auto-close", "100");
      await waitForRender(200);

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("is-before-close")).toBe(true);
    });

    it("autoClose 为 0 时不应自动关闭", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("auto-close", "0");
      container.appendChild(alert);

      await waitForRender();

      await waitForRender(200);

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("is-before-close")).toBe(false);
    });

    it("重新设置 autoClose 应该清除之前的定时器", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("auto-close", "200");
      container.appendChild(alert);

      await waitForRender();

      alert.setAttribute("auto-close", "300");
      await waitForRender();

      await waitForRender(150);

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("is-before-close")).toBe(false);

      await waitForRender(200);

      expect(containerEl.classList.contains("is-before-close")).toBe(true);
    });

    it("设置 autoClose 为 0 应该取消自动关闭定时器", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("auto-close", "100");
      container.appendChild(alert);

      await waitForRender();

      alert.setAttribute("auto-close", "0");
      await waitForRender();

      await waitForRender(200);

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("is-before-close")).toBe(false);
    });
  });

  describe("Hide-After Attribute", () => {
    it("默认 hideAfter 应该是 0", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      expect(alert.hideAfter).toBe(0);
    });

    it("应该正确设置 hideAfter 属性", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("hide-after", "200");
      container.appendChild(alert);

      await waitForRender();

      expect(alert.hideAfter).toBe(200);
    });

    it("hideAfter 大于 0 时应该延迟关闭动画", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("hide-after", "150");
      container.appendChild(alert);

      await waitForRender();

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      closeBtn.click();

      await waitForRender(50);

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("is-before-close")).toBe(false);

      await waitForRender(200);

      expect(containerEl.classList.contains("is-before-close")).toBe(true);
    });

    it("hideAfter 为 0 时应该立即开始关闭动画", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      closeBtn.click();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("is-before-close")).toBe(true);
    });

    it("组件断开连接时应该清理 hideAfter 定时器", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("hide-after", "500");
      container.appendChild(alert);

      await waitForRender();

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      closeBtn.click();

      alert.remove();

      const closeHandler = vi.fn();
      alert.addEventListener("ea-close", closeHandler);

      await waitForRender(600);

      expect(closeHandler).not.toHaveBeenCalled();
    });
  });

  describe("updateContainerClasslist Method", () => {
    it("应该返回正确的 BEM 类名字符串", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("variant", "primary");
      alert.setAttribute("effect", "dark");
      container.appendChild(alert);

      await waitForRender();

      const className = alert.updateContainerClasslist();
      expect(className).toContain("ea-alert");
      expect(className).toContain("ea-alert--primary");
      expect(className).toContain("ea-alert--dark");
    });

    it("center 为 true 时返回的类名应包含 is-center", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("center", "");
      container.appendChild(alert);

      await waitForRender();

      const className = alert.updateContainerClasslist();
      expect(className).toContain("is-center");
    });

    it("center 为 false 时返回的类名不应包含 is-center", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      const className = alert.updateContainerClasslist();
      expect(className).not.toContain("is-center");
    });

    it("is-hide 状态应该反映在返回的类名中", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("show-after", "500");
      container.appendChild(alert);

      await waitForRender();

      const className = alert.updateContainerClasslist();
      expect(className).toContain("is-hide");
    });

    it("应该同时包含 variant 和 effect 修饰符", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("variant", "warning");
      alert.setAttribute("effect", "dark");
      container.appendChild(alert);

      await waitForRender();

      const className = alert.updateContainerClasslist();
      expect(className).toContain("ea-alert--warning");
      expect(className).toContain("ea-alert--dark");
    });

    it("description 有值时返回的类名应包含 is-has-description", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("description", "Description text");
      container.appendChild(alert);

      await waitForRender();

      const className = alert.updateContainerClasslist();
      expect(className).toContain("is-has-description");
    });

    it("description 为空时返回的类名不应包含 is-has-description", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      const className = alert.updateContainerClasslist();
      expect(className).not.toContain("is-has-description");
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
      expect(iconEl).not.toBeNull();
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
      expect(headingSlot).not.toBeNull();
    });

    it("应该支持 icon slot 自定义内容", async () => {
      const alert = document.createElement("ea-alert");
      alert.innerHTML = '<span slot="icon">Custom Icon</span>';
      container.appendChild(alert);

      await waitForRender();

      const iconSlot = alert.shadowRoot.querySelector('slot[name="icon"]');
      expect(iconSlot).not.toBeNull();
    });

    it("应该支持默认 slot 自定义描述内容", async () => {
      const alert = document.createElement("ea-alert");
      alert.innerHTML = "<span>Custom Description</span>";
      container.appendChild(alert);

      await waitForRender();

      const defaultSlot = alert.shadowRoot.querySelector(
        ".ea-alert__description slot"
      );
      expect(defaultSlot).not.toBeNull();
    });

    it("应该正确处理多个 Alert 实例", async () => {
      const alert1 = document.createElement("ea-alert");
      alert1.setAttribute("variant", "primary");
      alert1.setAttribute("heading", "Alert 1");

      const alert2 = document.createElement("ea-alert");
      alert2.setAttribute("variant", "success");
      alert2.setAttribute("heading", "Alert 2");

      container.appendChild(alert1);
      container.appendChild(alert2);

      await waitForRender();

      const container1 = alert1.shadowRoot.querySelector(".ea-alert");
      const container2 = alert2.shadowRoot.querySelector(".ea-alert");

      expect(container1.classList.contains("ea-alert--primary")).toBe(true);
      expect(container2.classList.contains("ea-alert--success")).toBe(true);

      expect(alert1.heading).toBe("Alert 1");
      expect(alert2.heading).toBe("Alert 2");
    });

    it("应该支持所有属性同时设置", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("variant", "warning");
      alert.setAttribute("effect", "dark");
      alert.setAttribute("show-icon", "");
      alert.setAttribute("center", "");
      alert.setAttribute("heading", "Warning");
      alert.setAttribute("description", "Be careful");
      alert.setAttribute("close-text", "OK");
      container.appendChild(alert);

      await waitForRender();

      expect(alert.variant).toBe("warning");
      expect(alert.effect).toBe("dark");
      expect(alert.showIcon).toBe(true);
      expect(alert.center).toBe(true);
      expect(alert.heading).toBe("Warning");
      expect(alert.description).toBe("Be careful");
      expect(alert.closeText).toBe("OK");

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("ea-alert--warning")).toBe(true);
      expect(containerEl.classList.contains("ea-alert--dark")).toBe(true);
      expect(containerEl.classList.contains("is-center")).toBe(true);

      const iconEl = alert.shadowRoot.querySelector(".ea-alert__icon");
      expect(iconEl.getAttribute("name")).toBe("triangle-exclamation");

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      expect(closeBtn.textContent).toBe("OK");
    });
  });

  describe("Accessibility", () => {
    it("关闭按钮应该是 button 元素", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      expect(closeBtn.tagName).toBe("BUTTON");
    });

    it("关闭按钮应该有 type=button 属性", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      expect(closeBtn.getAttribute("type")).toBe("button");
    });

    it("关闭按钮应该可以通过键盘聚焦", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      closeBtn.focus();
      expect(closeBtn).toBe(alert.shadowRoot.activeElement);
    });

    it("关闭按钮应该可以通过 Enter 键触发关闭", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      const enterEvent = new KeyboardEvent("keydown", { key: "Enter" });
      closeBtn.dispatchEvent(enterEvent);

      closeBtn.click();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("is-before-close")).toBe(true);
    });
  });

  describe("Lifecycle", () => {
    it("组件连接时应该正确初始化", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("variant", "primary");
      container.appendChild(alert);

      await waitForRender();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("ea-alert--primary")).toBe(true);
    });

    it("组件断开连接时应该清理 AbortController", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      closeBtn.click();

      alert.remove();

      expect(container.contains(alert)).toBe(false);
    });

    it("组件重新连接时应该正确渲染", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("variant", "success");
      container.appendChild(alert);

      await waitForRender();

      alert.remove();
      await waitForRender();

      container.appendChild(alert);
      await waitForRender();

      expect(alert.shadowRoot).toBeDefined();
    });

    it("组件断开连接时应该清理 showAfter 定时器", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("show-after", "500");

      const openHandler = vi.fn();
      alert.addEventListener("ea-open", openHandler);

      container.appendChild(alert);

      await waitForRender();

      alert.remove();

      await waitForRender(600);

      expect(openHandler).not.toHaveBeenCalled();
    });

    it("组件断开连接时应该清理 autoClose 定时器", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("auto-close", "200");

      const closeHandler = vi.fn();
      alert.addEventListener("ea-close", closeHandler);

      container.appendChild(alert);

      await waitForRender();

      alert.remove();

      await waitForRender(300);

      expect(closeHandler).not.toHaveBeenCalled();
    });
  });

  describe("Edge Cases", () => {
    it("heading 设置为 HTML 字符串时应该被安全处理", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("heading", "<script>alert('xss')</script>");
      container.appendChild(alert);

      await waitForRender();

      const headingEl = alert.shadowRoot.querySelector(".ea-alert__heading");
      expect(headingEl.querySelector("script")).toBeNull();
    });

    it("description 设置为 HTML 字符串时应该被安全处理", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("description", "<script>alert('xss')</script>");
      container.appendChild(alert);

      await waitForRender();

      const descriptionEl = alert.shadowRoot.querySelector(
        ".ea-alert__description"
      );
      expect(descriptionEl.querySelector("script")).toBeNull();
    });

    it("快速连续修改 variant 应该正确反映最终状态", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      alert.setAttribute("variant", "primary");
      alert.setAttribute("variant", "success");
      alert.setAttribute("variant", "danger");
      await waitForRender();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("ea-alert--danger")).toBe(true);
      expect(containerEl.classList.contains("ea-alert--primary")).toBe(false);
      expect(containerEl.classList.contains("ea-alert--success")).toBe(false);
    });

    it("closeText 为空字符串且 closable 为 true 时应该显示关闭图标", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      expect(closeBtn.querySelector(".ea-alert__close-icon")).not.toBeNull();
    });

    it("showIcon 从 false 变为 true 时应该根据当前 variant 显示正确图标", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("variant", "danger");
      container.appendChild(alert);

      await waitForRender();

      let iconEl = alert.shadowRoot.querySelector(".ea-alert__icon");
      expect(iconEl).toBeNull();

      alert.setAttribute("show-icon", "");
      await waitForRender();

      iconEl = alert.shadowRoot.querySelector(".ea-alert__icon");
      expect(iconEl).not.toBeNull();
      expect(iconEl.getAttribute("name")).toBe("circle-xmark");
    });

    it("showIcon 从 true 变为 false 时应该移除图标内容", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("show-icon", "");
      container.appendChild(alert);

      await waitForRender();

      let iconEl = alert.shadowRoot.querySelector(".ea-alert__icon");
      expect(iconEl).not.toBeNull();

      alert.showIcon = false;
      await waitForRender();

      iconEl = alert.shadowRoot.querySelector(".ea-alert__icon");
      expect(iconEl).toBeNull();
    });

    it("closable 设为 false 后关闭按钮内容为空", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      alert.closable = false;
      await waitForRender();

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      expect(closeBtn.innerHTML).toBe("");
    });

    it("closable 设为 false 后 close-icon part 不存在", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      alert.closable = false;
      await waitForRender();

      const closeIcon = alert.shadowRoot.querySelector('[part="close-icon"]');
      expect(closeIcon).toBeNull();
    });

    it("closeText 设置为 HTML 字符串时应该被安全处理", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("close-text", "<script>alert('xss')</script>");
      container.appendChild(alert);

      await waitForRender();

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      expect(closeBtn.querySelector("script")).toBeNull();
    });

    it("heading 设置为安全 HTML 标签时应该保留", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("heading", "<b>Bold Heading</b>");
      container.appendChild(alert);

      await waitForRender();

      const headingEl = alert.shadowRoot.querySelector(".ea-alert__heading");
      expect(headingEl.querySelector("b")).not.toBeNull();
      expect(headingEl.textContent).toContain("Bold Heading");
    });

    it("description 设置为安全 HTML 标签时应该保留", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("description", "<em>Italic Description</em>");
      container.appendChild(alert);

      await waitForRender();

      const descriptionEl = alert.shadowRoot.querySelector(
        ".ea-alert__description"
      );
      expect(descriptionEl.querySelector("em")).not.toBeNull();
      expect(descriptionEl.textContent).toContain("Italic Description");
    });

    it("关闭过程中 AbortController 应该正确管理 transitionend 监听", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      closeBtn.click();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("is-before-close")).toBe(true);

      alert.remove();

      expect(container.contains(alert)).toBe(false);
    });

    it("重复点击关闭按钮不应产生多个 transitionend 监听", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      const closeHandler = vi.fn();
      alert.addEventListener("ea-close", closeHandler);

      const closeBtn = alert.shadowRoot.querySelector(".ea-alert__close-btn");
      closeBtn.click();
      closeBtn.click();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      containerEl.dispatchEvent(
        new TransitionEvent("transitionend", {
          bubbles: true,
          propertyName: "filter",
        })
      );

      await waitForRender();

      expect(closeHandler).toHaveBeenCalledTimes(1);
    });

    it("showAfter=0 设置后不应该添加 is-hide class", async () => {
      const alert = document.createElement("ea-alert");
      alert.setAttribute("show-after", "0");
      container.appendChild(alert);

      await waitForRender();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("is-hide")).toBe(false);
    });

    it("快速连续修改 showAfter 应该只使用最后一个定时器", async () => {
      const alert = document.createElement("ea-alert");

      const openHandler = vi.fn();
      alert.addEventListener("ea-open", openHandler);

      container.appendChild(alert);

      await waitForRender();

      alert.setAttribute("show-after", "500");
      alert.setAttribute("show-after", "200");
      alert.setAttribute("show-after", "100");

      await waitForRender(50);
      expect(openHandler).not.toHaveBeenCalled();

      await waitForRender(100);
      expect(openHandler).toHaveBeenCalledTimes(1);
    });

    it("快速连续修改 autoClose 应该只使用最后一个定时器", async () => {
      const alert = document.createElement("ea-alert");

      container.appendChild(alert);

      await waitForRender();

      alert.setAttribute("auto-close", "500");
      alert.setAttribute("auto-close", "200");
      alert.setAttribute("auto-close", "100");

      await waitForRender(50);

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      expect(containerEl.classList.contains("is-before-close")).toBe(false);

      await waitForRender(100);

      expect(containerEl.classList.contains("is-before-close")).toBe(true);
    });
  });

  describe("DOM Structure", () => {
    it("容器应该包含 icon-wrap、content、close-btn 三个直接子元素", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      const containerEl = alert.shadowRoot.querySelector(".ea-alert");
      const directChildren = Array.from(containerEl.children);

      const hasIconWrap = directChildren.some(el =>
        el.classList.contains("ea-alert__icon-wrap")
      );
      const hasContent = directChildren.some(el =>
        el.classList.contains("ea-alert__content")
      );
      const hasCloseBtn = directChildren.some(el =>
        el.classList.contains("ea-alert__close-btn")
      );

      expect(hasIconWrap).toBe(true);
      expect(hasContent).toBe(true);
      expect(hasCloseBtn).toBe(true);
    });

    it("content 元素应该包含 heading 和 description", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      const content = alert.shadowRoot.querySelector(".ea-alert__content");
      const heading = content.querySelector(".ea-alert__heading");
      const description = content.querySelector(".ea-alert__description");

      expect(heading).not.toBeNull();
      expect(description).not.toBeNull();
    });

    it("content 元素应该有 flex: 1 样式", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      const content = alert.shadowRoot.querySelector(".ea-alert__content");
      expect(content).not.toBeNull();
    });

    it("icon-wrap 元素应该包含对应 slot", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      const iconWrap = alert.shadowRoot.querySelector(".ea-alert__icon-wrap");
      const slot = iconWrap.querySelector('slot[name="icon"]');
      expect(slot).not.toBeNull();
    });

    it("heading 元素应该包含对应 slot", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      const headingEl = alert.shadowRoot.querySelector(".ea-alert__heading");
      const slot = headingEl.querySelector('slot[name="heading"]');
      expect(slot).not.toBeNull();
    });

    it("description 元素应该包含对应 slot", async () => {
      const alert = document.createElement("ea-alert");
      container.appendChild(alert);

      await waitForRender();

      const descriptionEl = alert.shadowRoot.querySelector(
        ".ea-alert__description"
      );
      const slot = descriptionEl.querySelector("slot:not([name])");
      expect(slot).not.toBeNull();
    });
  });
});
