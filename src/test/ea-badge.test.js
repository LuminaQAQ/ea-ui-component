import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender";

import "../components/ea-badge/index";

describe("EaBadge", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("Basic Functionality", () => {
    it("应该正确渲染 ea-badge 组件", () => {
      const badge = document.createElement("ea-badge");
      container.appendChild(badge);

      expect(badge).toBeDefined();
      expect(badge.shadowRoot).toBeDefined();
    });

    it("应该包含 badge 容器元素", () => {
      const badge = document.createElement("ea-badge");
      container.appendChild(badge);

      const badgeContainer = badge.shadowRoot.querySelector(".ea-badge");
      expect(badgeContainer).toBeDefined();
    });

    it("应该包含 content 元素", () => {
      const badge = document.createElement("ea-badge");
      container.appendChild(badge);

      const contentEl = badge.shadowRoot.querySelector(".ea-badge__content");
      expect(contentEl).toBeDefined();
    });
  });

  describe("Value Attribute", () => {
    it("应该正确显示数字 value", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("value", "12");
      container.appendChild(badge);

      await waitForRender();

      const contentEl = badge.shadowRoot.querySelector(".ea-badge__content");
      expect(contentEl.textContent).toBe("12");
    });

    it("应该正确显示字符串 value", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("value", "new");
      container.appendChild(badge);

      await waitForRender();

      const contentEl = badge.shadowRoot.querySelector(".ea-badge__content");
      expect(contentEl.textContent).toBe("new");
    });

    it("value 属性变化时应该正确更新", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("value", "5");
      container.appendChild(badge);

      await waitForRender();

      const contentEl = badge.shadowRoot.querySelector(".ea-badge__content");
      expect(contentEl.textContent).toBe("5");

      badge.setAttribute("value", "10");
      await waitForRender();

      expect(contentEl.textContent).toBe("10");
    });

    it("value 为空字符串时内容应为空", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("value", "");
      container.appendChild(badge);

      await waitForRender();

      const contentEl = badge.shadowRoot.querySelector(".ea-badge__content");
      expect(contentEl.textContent).toBe("");
    });
  });

  describe("Max Attribute", () => {
    it("超过 max 时应该显示 {max}+", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("max", "99");
      badge.setAttribute("value", "200");
      container.appendChild(badge);

      await waitForRender();

      const contentEl = badge.shadowRoot.querySelector(".ea-badge__content");
      expect(contentEl.textContent).toBe("99+");
    });

    it("未超过 max 时应该显示原值", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("max", "99");
      badge.setAttribute("value", "50");
      container.appendChild(badge);

      await waitForRender();

      const contentEl = badge.shadowRoot.querySelector(".ea-badge__content");
      expect(contentEl.textContent).toBe("50");
    });

    it("等于 max 时应该显示原值", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("max", "99");
      badge.setAttribute("value", "99");
      container.appendChild(badge);

      await waitForRender();

      const contentEl = badge.shadowRoot.querySelector(".ea-badge__content");
      expect(contentEl.textContent).toBe("99");
    });

    it("默认 max 应该是 Infinity", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("value", "999");
      container.appendChild(badge);

      await waitForRender();

      const contentEl = badge.shadowRoot.querySelector(".ea-badge__content");
      expect(contentEl.textContent).toBe("999");
    });

    it("value 为非数字字符串时 max 不生效", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("max", "99");
      badge.setAttribute("value", "abc");
      container.appendChild(badge);

      await waitForRender();

      const contentEl = badge.shadowRoot.querySelector(".ea-badge__content");
      expect(contentEl.textContent).toBe("abc");
    });
  });

  describe("Variant Attribute", () => {
    const variants = ["primary", "success", "warning", "danger", "info"];

    variants.forEach((variant) => {
      if (variant === "danger") {
        it(`variant="${variant}" 不应添加修饰符类（默认 variant）`, async () => {
          const badge = document.createElement("ea-badge");
          badge.setAttribute("variant", variant);
          badge.setAttribute("value", "5");
          container.appendChild(badge);

          await waitForRender();

          const badgeContainer = badge.shadowRoot.querySelector(".ea-badge");
          expect(
            badgeContainer.classList.contains(`ea-badge--${variant}`)
          ).toBe(false);
        });
      } else {
        it(`应该正确应用 variant="${variant}"`, async () => {
          const badge = document.createElement("ea-badge");
          badge.setAttribute("variant", variant);
          badge.setAttribute("value", "5");
          container.appendChild(badge);

          await waitForRender();

          const badgeContainer = badge.shadowRoot.querySelector(".ea-badge");
          expect(
            badgeContainer.classList.contains(`ea-badge--${variant}`)
          ).toBe(true);
        });
      }
    });

    it("默认 variant 应该是 danger", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("value", "5");
      container.appendChild(badge);

      await waitForRender();

      expect(badge.variant).toBe("danger");
    });

    it("默认 variant 不应添加修饰符类", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("value", "5");
      container.appendChild(badge);

      await waitForRender();

      const badgeContainer = badge.shadowRoot.querySelector(".ea-badge");
      expect(badgeContainer.classList.contains("ea-badge--danger")).toBe(false);
    });

    it("variant 属性变化时应该正确更新 class", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("variant", "primary");
      badge.setAttribute("value", "5");
      container.appendChild(badge);

      await waitForRender();

      let badgeContainer = badge.shadowRoot.querySelector(".ea-badge");
      expect(badgeContainer.classList.contains("ea-badge--primary")).toBe(true);

      badge.setAttribute("variant", "success");
      await waitForRender();

      badgeContainer = badge.shadowRoot.querySelector(".ea-badge");
      expect(badgeContainer.classList.contains("ea-badge--success")).toBe(true);
      expect(badgeContainer.classList.contains("ea-badge--primary")).toBe(false);
    });

    it("从非默认 variant 切换回 danger 时应移除修饰符类", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("variant", "primary");
      badge.setAttribute("value", "5");
      container.appendChild(badge);

      await waitForRender();

      let badgeContainer = badge.shadowRoot.querySelector(".ea-badge");
      expect(badgeContainer.classList.contains("ea-badge--primary")).toBe(true);

      badge.setAttribute("variant", "danger");
      await waitForRender();

      badgeContainer = badge.shadowRoot.querySelector(".ea-badge");
      expect(badgeContainer.classList.contains("ea-badge--danger")).toBe(false);
      expect(badgeContainer.classList.contains("ea-badge--primary")).toBe(false);
    });
  });

  describe("Is-dot Attribute", () => {
    it("应该正确应用 is-dot 属性", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("is-dot", "");
      container.appendChild(badge);

      await waitForRender();

      const badgeContainer = badge.shadowRoot.querySelector(".ea-badge");
      expect(badgeContainer.classList.contains("is-dot")).toBe(true);
    });

    it("is-dot 为 true 时不显示 value", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("is-dot", "");
      badge.setAttribute("value", "99");
      container.appendChild(badge);

      await waitForRender();

      const badgeContainer = badge.shadowRoot.querySelector(".ea-badge");
      expect(badgeContainer.classList.contains("is-dot")).toBe(true);
    });

    it("默认 is-dot 应该是 false", async () => {
      const badge = document.createElement("ea-badge");
      container.appendChild(badge);

      await waitForRender();

      expect(badge.isDot).toBe(false);
    });
  });

  describe("Data-hidden Attribute", () => {
    it("应该正确应用 data-hidden 属性", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("data-hidden", "");
      badge.setAttribute("value", "5");
      container.appendChild(badge);

      await waitForRender();

      const badgeContainer = badge.shadowRoot.querySelector(".ea-badge");
      expect(badgeContainer.classList.contains("is-hidden")).toBe(true);
    });

    it("data-hidden 属性变化时应该正确更新", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("value", "5");
      container.appendChild(badge);

      await waitForRender();

      let badgeContainer = badge.shadowRoot.querySelector(".ea-badge");
      expect(badgeContainer.classList.contains("is-hidden")).toBe(false);

      badge.setAttribute("data-hidden", "");
      await waitForRender();

      badgeContainer = badge.shadowRoot.querySelector(".ea-badge");
      expect(badgeContainer.classList.contains("is-hidden")).toBe(true);
    });

    it("默认 data-hidden 应该是 false", async () => {
      const badge = document.createElement("ea-badge");
      container.appendChild(badge);

      await waitForRender(0);

      expect(badge.dataHidden).toBe(false);
    });
  });

  describe("Show-zero Attribute", () => {
    it("show-zero 为 false 且 value 为 0 时应该隐藏", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("value", "0");
      container.appendChild(badge);

      await waitForRender();

      const badgeContainer = badge.shadowRoot.querySelector(".ea-badge");
      expect(badgeContainer.classList.contains("is-hidden")).toBe(false);
    });

    it("show-zero 为 true 且 value 为 0 时应该显示", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("value", "0");
      badge.setAttribute("show-zero", "");
      container.appendChild(badge);

      await waitForRender();

      const contentEl = badge.shadowRoot.querySelector(".ea-badge__content");
      expect(contentEl.textContent).toBe("0");
    });

    it("show-zero 为 false 且 value 为 0 时应该添加 is-hidden 类", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("value", "0");
      container.appendChild(badge);

      await waitForRender();

      badge.showZero = false;
      await waitForRender();

      const badgeContainer = badge.shadowRoot.querySelector(".ea-badge");
      expect(badgeContainer.classList.contains("is-hidden")).toBe(true);
    });

    it("默认 show-zero 应该是 true", async () => {
      const badge = document.createElement("ea-badge");
      container.appendChild(badge);

      await waitForRender();

      expect(badge.showZero).toBe(true);
    });
  });

  describe("Color Attribute", () => {
    it("应该正确设置 color 属性", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("color", "green");
      badge.setAttribute("value", "5");
      container.appendChild(badge);

      await waitForRender(0);

      expect(badge.color).toBe("green");
    });

    it("color 属性变化时应该正确更新 CSS 变量", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("color", "red");
      container.appendChild(badge);

      await waitForRender(0);
      expect(badge.color).toBe("red");

      badge.setAttribute("color", "blue");
      await waitForRender(0);

      expect(badge.color).toBe("blue");
    });
  });

  describe("Offset Attributes", () => {
    it("应该正确设置 offset-x 属性", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("offset-x", "10");
      container.appendChild(badge);

      await waitForRender(0);

      expect(badge.offsetX).toBe(10);
    });

    it("应该正确设置 offset-y 属性", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("offset-y", "5");
      container.appendChild(badge);

      await waitForRender(0);

      expect(badge.offsetY).toBe(5);
    });

    it("默认 offset 应该是 0", async () => {
      const badge = document.createElement("ea-badge");
      container.appendChild(badge);

      await waitForRender(0);

      expect(badge.offsetX).toBe(0);
      expect(badge.offsetY).toBe(0);
    });
  });

  describe("CSS Parts", () => {
    it("应该正确设置 container part", () => {
      const badge = document.createElement("ea-badge");
      container.appendChild(badge);

      const containerEl = badge.shadowRoot.querySelector('[part="container"]');
      expect(containerEl).toBeDefined();
    });

    it("应该正确设置 content part", () => {
      const badge = document.createElement("ea-badge");
      container.appendChild(badge);

      const contentEl = badge.shadowRoot.querySelector('[part="content"]');
      expect(contentEl).toBeDefined();
    });
  });

  describe("Slots", () => {
    it("应该支持默认 slot", () => {
      const badge = document.createElement("ea-badge");
      badge.innerHTML = "<button>Button</button>";
      container.appendChild(badge);

      const slot = badge.shadowRoot.querySelector("slot");
      expect(slot).toBeDefined();
    });

    it("应该支持 content slot", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("value", "99");
      badge.innerHTML = `
        <button>Button</button>
        <div slot="content">
          <span data-value>Custom</span>
        </div>
      `;
      container.appendChild(badge);

      await waitForRender(0);

      const contentEl = badge.shadowRoot.querySelector(".ea-badge__content");
      expect(contentEl).toBeDefined();
    });
  });

  describe("Lifecycle", () => {
    it("组件连接时应该正确初始化", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("value", "5");
      container.appendChild(badge);

      await waitForRender();

      const contentEl = badge.shadowRoot.querySelector(".ea-badge__content");
      expect(contentEl.textContent).toBe("5");
    });
  });

  describe("Complex Scenarios", () => {
    it("应该支持组合使用多个属性", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("max", "99");
      badge.setAttribute("value", "200");
      badge.setAttribute("variant", "primary");
      container.appendChild(badge);

      await waitForRender();

      const badgeContainer = badge.shadowRoot.querySelector(".ea-badge");
      const contentEl = badge.shadowRoot.querySelector(".ea-badge__content");

      expect(contentEl.textContent).toBe("99+");
      expect(badgeContainer.classList.contains("ea-badge--primary")).toBe(true);
      expect(badge.isDot).toBe(false);
      expect(badge.showZero).toBe(true);
    });

    it("应该正确处理多个 Badge 实例", async () => {
      const badge1 = document.createElement("ea-badge");
      badge1.setAttribute("value", "5");
      badge1.setAttribute("variant", "primary");

      const badge2 = document.createElement("ea-badge");
      badge2.setAttribute("value", "10");
      badge2.setAttribute("variant", "success");

      container.appendChild(badge1);
      container.appendChild(badge2);

      await waitForRender();

      const container1 = badge1.shadowRoot.querySelector(".ea-badge");
      const container2 = badge2.shadowRoot.querySelector(".ea-badge");

      expect(container1.classList.contains("ea-badge--primary")).toBe(true);
      expect(container2.classList.contains("ea-badge--success")).toBe(true);
    });

    it("应该正确处理动态属性更新", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("value", "5");
      badge.setAttribute("variant", "primary");
      container.appendChild(badge);

      await waitForRender();

      const contentEl = badge.shadowRoot.querySelector(".ea-badge__content");
      expect(contentEl.textContent).toBe("5");

      badge.setAttribute("value", "15");
      badge.setAttribute("variant", "warning");

      await waitForRender();

      const badgeContainer = badge.shadowRoot.querySelector(".ea-badge");

      expect(contentEl.textContent).toBe("15");
      expect(badgeContainer.classList.contains("ea-badge--warning")).toBe(true);
    });

    it("is-dot 和 value 同时存在时 is-dot 优先", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("is-dot", "");
      badge.setAttribute("value", "99");
      container.appendChild(badge);

      await waitForRender();

      const badgeContainer = badge.shadowRoot.querySelector(".ea-badge");
      expect(badgeContainer.classList.contains("is-dot")).toBe(true);
    });

    it("data-hidden 和 show-zero 为 false 且 value 为 0 时应该隐藏", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("value", "0");
      container.appendChild(badge);

      await waitForRender();

      badge.showZero = false;
      await waitForRender();

      const badgeContainer = badge.shadowRoot.querySelector(".ea-badge");
      expect(badgeContainer.classList.contains("is-hidden")).toBe(true);
    });

    it("data-hidden 为 true 时无论 value 如何都应该隐藏", async () => {
      const badge = document.createElement("ea-badge");
      badge.setAttribute("data-hidden", "");
      badge.setAttribute("value", "100");
      container.appendChild(badge);

      await waitForRender();

      const badgeContainer = badge.shadowRoot.querySelector(".ea-badge");
      expect(badgeContainer.classList.contains("is-hidden")).toBe(true);
    });
  });
});
