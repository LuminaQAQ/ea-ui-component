import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { waitForRender } from "./utils/waitForRender";
import { runAxe, assertNoA11yViolations } from "./utils/a11y";

import "../components/ea-icon/index";

describe("EaIcon", () => {
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

    it("应该支持默认插槽", async () => {
      const icon = document.createElement("ea-icon");
      icon.innerHTML = "Custom Content";
      container.appendChild(icon);

      await waitForRender();

      const slot = icon.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });
  });

  describe("name 属性", () => {
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

    it("name 属性应该生成正确的 Font Awesome 类名", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("name", "coffee");
      container.appendChild(icon);

      await waitForRender();

      const iElement = icon.shadowRoot.querySelector("i.ea-icon");
      expect(iElement.classList.contains("fa-solid")).toBe(true);
      expect(iElement.classList.contains("fa-coffee")).toBe(true);
    });

    it("应该支持以 fa- 开头的完整类名", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("name", "fa-solid fa-coffee");
      container.appendChild(icon);

      await waitForRender();

      expect(icon.name).toBe("fa-solid fa-coffee");
      const iElement = icon.shadowRoot.querySelector("i.ea-icon");
      expect(iElement.classList.contains("fa-solid")).toBe(true);
      expect(iElement.classList.contains("fa-coffee")).toBe(true);
    });

    it("空 name 时应该只有基础类名", async () => {
      const icon = document.createElement("ea-icon");
      container.appendChild(icon);

      await waitForRender();

      const iElement = icon.shadowRoot.querySelector("i.ea-icon");
      expect(iElement.className).toBe("ea-icon");
    });
  });

  describe("family 属性", () => {
    it("默认 family 应该是 classic", async () => {
      const icon = document.createElement("ea-icon");
      container.appendChild(icon);

      await waitForRender();

      expect(icon.family).toBe("classic");
    });

    it("family='brands' 应该生成 fa-brands 类名", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("name", "github");
      icon.setAttribute("family", "brands");
      container.appendChild(icon);

      await waitForRender();

      expect(icon.family).toBe("brands");
      const iElement = icon.shadowRoot.querySelector("i.ea-icon");
      expect(iElement.classList.contains("fa-brands")).toBe(true);
      expect(iElement.classList.contains("fa-github")).toBe(true);
    });

    it("family='sharp' 应该生成 fa-sharp 类名", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("name", "star");
      icon.setAttribute("family", "sharp");
      container.appendChild(icon);

      await waitForRender();

      expect(icon.family).toBe("sharp");
      const iElement = icon.shadowRoot.querySelector("i.ea-icon");
      expect(iElement.classList.contains("fa-sharp")).toBe(true);
    });

    it("family='classic' 应该不生成 fa-classic 类名", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("name", "coffee");
      icon.setAttribute("family", "classic");
      container.appendChild(icon);

      await waitForRender();

      const iElement = icon.shadowRoot.querySelector("i.ea-icon");
      expect(iElement.classList.contains("fa-classic")).toBe(false);
      expect(iElement.classList.contains("fa-solid")).toBe(true);
    });
  });

  describe("variant 属性", () => {
    it("默认 variant 应该是 solid", async () => {
      const icon = document.createElement("ea-icon");
      container.appendChild(icon);

      await waitForRender();

      expect(icon.variant).toBe("solid");
    });

    it("variant='regular' 应该生成 fa-regular 类名", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("name", "heart");
      icon.setAttribute("variant", "regular");
      container.appendChild(icon);

      await waitForRender();

      expect(icon.variant).toBe("regular");
      const iElement = icon.shadowRoot.querySelector("i.ea-icon");
      expect(iElement.classList.contains("fa-regular")).toBe(true);
    });

    it("variant='light' 应该生成 fa-light 类名", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("name", "star");
      icon.setAttribute("variant", "light");
      container.appendChild(icon);

      await waitForRender();

      const iElement = icon.shadowRoot.querySelector("i.ea-icon");
      expect(iElement.classList.contains("fa-light")).toBe(true);
    });

    it("variant='thin' 应该生成 fa-thin 类名", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("name", "star");
      icon.setAttribute("variant", "thin");
      container.appendChild(icon);

      await waitForRender();

      const iElement = icon.shadowRoot.querySelector("i.ea-icon");
      expect(iElement.classList.contains("fa-thin")).toBe(true);
    });

    it("variant='duotone' 应该生成 fa-duotone 类名", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("name", "star");
      icon.setAttribute("variant", "duotone");
      container.appendChild(icon);

      await waitForRender();

      const iElement = icon.shadowRoot.querySelector("i.ea-icon");
      expect(iElement.classList.contains("fa-duotone")).toBe(true);
    });
  });

  describe("color 属性", () => {
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

    it("color 属性应该设置 --ea-icon-color CSS 变量", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("color", "#ff4757");
      container.appendChild(icon);

      await waitForRender();

      expect(icon.style.getPropertyValue("--ea-icon-color")).toBe("#ff4757");
    });

    it("应该支持不同的颜色格式", async () => {
      const colors = ["#ff4757", "#ffa502", "red", "rgb(0, 128, 255)"];

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

  describe("size 属性", () => {
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
      expect(icon.style.getPropertyValue("--ea-icon-size")).toBe("24px");
    });

    it("size='large' 应该映射为 14px", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("size", "large");
      container.appendChild(icon);

      await waitForRender();

      expect(icon.style.getPropertyValue("--ea-icon-size")).toBe("14px");
    });

    it("size='medium' 应该映射为 12px", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("size", "medium");
      container.appendChild(icon);

      await waitForRender();

      expect(icon.style.getPropertyValue("--ea-icon-size")).toBe("12px");
    });

    it("size='small' 应该映射为 10px", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("size", "small");
      container.appendChild(icon);

      await waitForRender();

      expect(icon.style.getPropertyValue("--ea-icon-size")).toBe("10px");
    });
  });

  describe("spin 属性", () => {
    it("默认 spin 应该是 false", async () => {
      const icon = document.createElement("ea-icon");
      container.appendChild(icon);

      await waitForRender();

      expect(icon.spin).toBe(false);
    });

    it("设置 spin 属性应该启用旋转动画", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("name", "spinner");
      icon.setAttribute("spin", "");
      container.appendChild(icon);

      await waitForRender();

      expect(icon.spin).toBe(true);
      const iElement = icon.shadowRoot.querySelector("i.ea-icon");
      expect(iElement.classList.contains("fa-spin")).toBe(true);
    });

    it("未设置 spin 时不应包含 fa-spin 类名", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("name", "coffee");
      container.appendChild(icon);

      await waitForRender();

      const iElement = icon.shadowRoot.querySelector("i.ea-icon");
      expect(iElement.classList.contains("fa-spin")).toBe(false);
    });
  });

  describe("组合属性", () => {
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

    it("brands family 应该正确生成类名", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("name", "github");
      icon.setAttribute("family", "brands");
      container.appendChild(icon);

      await waitForRender();

      const iElement = icon.shadowRoot.querySelector("i.ea-icon");
      expect(iElement.classList.contains("fa-brands")).toBe(true);
      expect(iElement.classList.contains("fa-github")).toBe(true);
    });

    it("sharp family 和 variant 组合应该正确生成类名", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("name", "star");
      icon.setAttribute("family", "sharp");
      icon.setAttribute("variant", "solid");
      container.appendChild(icon);

      await waitForRender();

      const iElement = icon.shadowRoot.querySelector("i.ea-icon");
      expect(iElement.classList.contains("fa-sharp")).toBe(true);
      expect(iElement.classList.contains("fa-solid")).toBe(true);
      expect(iElement.classList.contains("fa-star")).toBe(true);
    });

    it("spin 与其他属性组合应该正确", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("name", "spinner");
      icon.setAttribute("variant", "regular");
      icon.setAttribute("spin", "");
      container.appendChild(icon);

      await waitForRender();

      const iElement = icon.shadowRoot.querySelector("i.ea-icon");
      expect(iElement.classList.contains("fa-regular")).toBe(true);
      expect(iElement.classList.contains("fa-spinner")).toBe(true);
      expect(iElement.classList.contains("fa-spin")).toBe(true);
    });
  });

  describe("动态属性更新", () => {
    it("动态修改 name 应该更新类名", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("name", "coffee");
      container.appendChild(icon);

      await waitForRender();

      icon.setAttribute("name", "star");
      await waitForRender();

      expect(icon.name).toBe("star");
      const iElement = icon.shadowRoot.querySelector("i.ea-icon");
      expect(iElement.classList.contains("fa-star")).toBe(true);
      expect(iElement.classList.contains("fa-coffee")).toBe(false);
    });

    it("动态修改 family 应该更新类名", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("name", "github");
      icon.setAttribute("family", "classic");
      container.appendChild(icon);

      await waitForRender();

      icon.setAttribute("family", "brands");
      await waitForRender();

      expect(icon.family).toBe("brands");
      const iElement = icon.shadowRoot.querySelector("i.ea-icon");
      expect(iElement.classList.contains("fa-brands")).toBe(true);
    });

    it("动态修改 variant 应该更新类名", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("name", "heart");
      icon.setAttribute("variant", "solid");
      container.appendChild(icon);

      await waitForRender();

      icon.setAttribute("variant", "regular");
      await waitForRender();

      expect(icon.variant).toBe("regular");
      const iElement = icon.shadowRoot.querySelector("i.ea-icon");
      expect(iElement.classList.contains("fa-regular")).toBe(true);
      expect(iElement.classList.contains("fa-solid")).toBe(false);
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
      const iElement = icon.shadowRoot.querySelector("i.ea-icon");
      expect(iElement.classList.contains("fa-spin")).toBe(true);
    });

    it("动态修改 color 应该更新 CSS 变量", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("color", "#ff4757");
      container.appendChild(icon);

      await waitForRender();

      icon.setAttribute("color", "#2ed573");
      await waitForRender();

      expect(icon.color).toBe("#2ed573");
      expect(icon.style.getPropertyValue("--ea-icon-color")).toBe("#2ed573");
    });

    it("动态修改 size 应该更新 CSS 变量", async () => {
      const icon = document.createElement("ea-icon");
      icon.setAttribute("size", "24");
      container.appendChild(icon);

      await waitForRender();

      icon.setAttribute("size", "48");
      await waitForRender();

      expect(icon.size).toBe("48");
      expect(icon.style.getPropertyValue("--ea-icon-size")).toBe("48px");
    });
  });

  describe("边界条件", () => {
    it("空 name 时应该正确渲染", async () => {
      const icon = document.createElement("ea-icon");
      container.appendChild(icon);

      await waitForRender();

      const iElement = icon.shadowRoot.querySelector("i.ea-icon");
      expect(iElement).toBeTruthy();
      expect(iElement.className).toBe("ea-icon");
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

    it("组件断开连接后应该正常移除", async () => {
      const icon = document.createElement("ea-icon");
      container.appendChild(icon);

      await waitForRender();

      icon.remove();

      expect(container.contains(icon)).toBe(false);
    });
  });

  describe("Accessibility", () => {
    it("默认状态应该无 a11y 违规", async () => {
      const el = document.createElement("ea-icon");
      container.appendChild(el);
      await waitForRender();
      const results = await runAxe(el);
      assertNoA11yViolations(results);
    });

    describe("ARIA Attributes", () => {
      it("无 aria-label 时内部 i 元素应该有 aria-hidden=true", async () => {
        const el = document.createElement("ea-icon");
        el.setAttribute("name", "star");
        container.appendChild(el);
        await waitForRender();
        const iElement = el.shadowRoot.querySelector("i.ea-icon");
        expect(iElement.getAttribute("aria-hidden")).toBe("true");
      });

      it("有 aria-label 时内部 i 元素不应该有 aria-hidden=true", async () => {
        const el = document.createElement("ea-icon");
        el.setAttribute("name", "star");
        el.setAttribute("aria-label", "Star icon");
        container.appendChild(el);
        await waitForRender();
        const iElement = el.shadowRoot.querySelector("i.ea-icon");
        expect(iElement.getAttribute("aria-hidden")).toBe("false");
      });
    });
  });
});
