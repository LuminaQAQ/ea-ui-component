import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

import "../components/ea-icon/index";
import "../components/ea-button/index";
import "../components/ea-tour/index";
import { waitForRender } from "./utils/waitForRender";

function createTour(stepsHTML = "", attrs = {}) {
  const tour = document.createElement("ea-tour");
  Object.entries(attrs).forEach(([key, value]) => {
    if (typeof value === "boolean") {
      if (value) tour.setAttribute(key, "");
      else tour.setAttribute(key, "false");
    } else {
      tour.setAttribute(key, String(value));
    }
  });
  if (stepsHTML) tour.innerHTML = stepsHTML;
  return tour;
}

function createTargetElement(id = "tour-target") {
  const el = document.createElement("div");
  el.id = id;
  el.style.width = "100px";
  el.style.height = "100px";
  el.style.position = "fixed";
  el.style.top = "100px";
  el.style.left = "100px";
  el.textContent = "Target";
  document.body.appendChild(el);
  return el;
}

describe("EaTour Component", () => {
  let container;
  let targetEl;

  beforeEach(() => {
    container = document.createElement("div");
    container.id = "test-container";
    document.body.appendChild(container);
    targetEl = createTargetElement("tour-target");
  });

  afterEach(() => {
    container.remove();
    targetEl?.remove();
    document.body.style.overflow = "";
    document.querySelectorAll("ea-tour").forEach(el => el.remove());
  });

  // ==================== 基础渲染 ====================

  describe("Basic Rendering", () => {
    it("应该正确创建 ea-tour 元素", async () => {
      const tour = createTour();
      document.body.appendChild(tour);

      await waitForRender();

      expect(tour).toBeDefined();
      expect(tour.tagName.toLowerCase()).toBe("ea-tour");
    });

    it("应该创建 open 模式的 shadow DOM", async () => {
      const tour = createTour();
      document.body.appendChild(tour);

      await waitForRender();

      expect(tour.shadowRoot).toBeDefined();
      expect(tour.shadowRoot.mode).toBe("open");
    });

    it("应该渲染 .ea-tour 容器", async () => {
      const tour = createTour();
      document.body.appendChild(tour);

      await waitForRender();

      expect(tour.shadowRoot.querySelector(".ea-tour")).toBeTruthy();
    });

    it("应该渲染 SVG 遮罩结构", async () => {
      const tour = createTour();
      document.body.appendChild(tour);

      await waitForRender();

      expect(tour.shadowRoot.querySelector(".ea-tour__svg")).toBeTruthy();
      expect(tour.shadowRoot.querySelector(".ea-tour__mask")).toBeTruthy();
      expect(tour.shadowRoot.querySelector(".ea-tour__hollow")).toBeTruthy();
    });

    it("应该渲染四个方向的分割线", async () => {
      const tour = createTour();
      document.body.appendChild(tour);

      await waitForRender();

      expect(
        tour.shadowRoot.querySelector(".ea-tour__divider.top-mask")
      ).toBeTruthy();
      expect(
        tour.shadowRoot.querySelector(".ea-tour__divider.right-mask")
      ).toBeTruthy();
      expect(
        tour.shadowRoot.querySelector(".ea-tour__divider.bottom-mask")
      ).toBeTruthy();
      expect(
        tour.shadowRoot.querySelector(".ea-tour__divider.left-mask")
      ).toBeTruthy();
    });

    it("应该渲染内容容器和默认插槽", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      expect(tour.shadowRoot.querySelector(".ea-tour__content")).toBeTruthy();
      const slot = tour.shadowRoot.querySelector(".ea-tour__content slot");
      expect(slot).toBeTruthy();
    });

    it("应该支持 CSS Parts", async () => {
      const tour = createTour();
      document.body.appendChild(tour);

      await waitForRender();

      expect(tour.shadowRoot.querySelector('[part="hollow"]')).toBeTruthy();
    });

    it("默认不可见时容器不应有 is-visible 状态类", async () => {
      const tour = createTour();
      document.body.appendChild(tour);

      await waitForRender();

      const tourEl = tour.shadowRoot.querySelector(".ea-tour");
      expect(tourEl.classList.contains("is-visible")).toBe(false);
    });
  });

  // ==================== Visible 属性 ====================

  describe("Visible Attribute", () => {
    it("默认 visible 应该是 false", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      expect(tour.visible).toBe(false);
    });

    it("设置 visible 为 true 应该显示 tour", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      tour.visible = true;
      await waitForRender();

      expect(tour.visible).toBe(true);
      const tourEl = tour.shadowRoot.querySelector(".ea-tour");
      expect(tourEl.classList.contains("is-visible")).toBe(true);
    });

    it("通过 setAttribute 设置 visible", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      tour.setAttribute("visible", "");
      await waitForRender();

      expect(tour.visible).toBe(true);
    });

    it("visible 为 true 且 mask 为 true 时应该隐藏 body 滚动", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      tour.visible = true;
      await waitForRender();

      expect(document.body.style.overflow).toBe("hidden");
    });

    it("visible 从 true 变为 false 且 mask 为 true 时应该恢复 body 滚动", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      tour.visible = true;
      await waitForRender();

      tour.visible = false;
      await waitForRender();

      expect(document.body.style.overflow).toBe("auto");
    });

    it("visible 变为 true 时应该重置 current 为 0", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content 1</div></ea-tour-step>
        <ea-tour-step heading="Step 2"><div>Content 2</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      tour.current = 1;
      await waitForRender();

      tour.visible = true;
      await waitForRender();

      expect(tour.current).toBe(0);
    });
  });

  // ==================== Mask 属性 ====================

  describe("Mask Attribute", () => {
    it("默认 mask 应该是 true", async () => {
      const tour = createTour();
      document.body.appendChild(tour);

      await waitForRender();

      expect(tour.mask).toBe(true);
    });

    it("mask 为 true 时容器应该有 is-mask 状态类", async () => {
      const tour = createTour();
      document.body.appendChild(tour);

      await waitForRender();

      const tourEl = tour.shadowRoot.querySelector(".ea-tour");
      expect(tourEl.classList.contains("is-mask")).toBe(true);
    });

    it("设置 mask 为 false 应该移除 is-mask 状态类", async () => {
      const tour = createTour();
      document.body.appendChild(tour);

      await waitForRender();

      tour.setAttribute("mask", "false");
      await waitForRender();

      expect(tour.mask).toBe(false);
      const tourEl = tour.shadowRoot.querySelector(".ea-tour");
      expect(tourEl.classList.contains("is-mask")).toBe(false);
    });

    it("mask 为 false 且 visible 为 true 时不应该隐藏 body 滚动", async () => {
      const tour = createTour();
      document.body.appendChild(tour);

      await waitForRender();

      tour.setAttribute("mask", "false");
      await waitForRender();

      tour.visible = true;
      await waitForRender();

      expect(document.body.style.overflow).not.toBe("hidden");
    });
  });

  // ==================== Current 属性 ====================

  describe("Current Attribute", () => {
    it("默认 current 应该是 0", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content 1</div></ea-tour-step>
        <ea-tour-step heading="Step 2"><div>Content 2</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      expect(tour.current).toBe(0);
    });

    it("应该支持 current 属性设置", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content 1</div></ea-tour-step>
        <ea-tour-step heading="Step 2"><div>Content 2</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      tour.current = 1;
      await waitForRender();

      expect(tour.current).toBe(1);
    });

    it("current 设置为负数时应该被修正为 0", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content 1</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      tour.current = -1;
      await waitForRender();

      expect(tour.current).toBe(0);
    });

    it("current 超出步骤数时应该隐藏 tour", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content 1</div></ea-tour-step>
      `);
      tour.visible = true;
      document.body.appendChild(tour);

      await waitForRender();

      tour.current = 5;
      await waitForRender();

      expect(tour.visible).toBe(false);
    });

    it("current 变化时应该更新步骤的可见性", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content 1</div></ea-tour-step>
        <ea-tour-step heading="Step 2"><div>Content 2</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const steps = tour.querySelectorAll("ea-tour-step");
      tour.current = 1;
      await waitForRender();

      expect(steps[1].style.getPropertyValue("--ea-tour-step-visible")).toBe(
        "block"
      );
    });
  });

  // ==================== Gap 属性 ====================

  describe("Gap Attribute", () => {
    it("默认 gap 应该是 6", async () => {
      const tour = createTour();
      document.body.appendChild(tour);

      await waitForRender();

      expect(tour.gap).toBe(6);
    });

    it("应该支持 gap 属性设置", async () => {
      const tour = createTour();
      tour.gap = 10;
      document.body.appendChild(tour);

      await waitForRender();

      expect(tour.gap).toBe(10);
    });

    it("通过 setAttribute 设置 gap", async () => {
      const tour = createTour();
      document.body.appendChild(tour);

      await waitForRender();

      tour.setAttribute("gap", "20");
      await waitForRender();

      expect(tour.gap).toBe(20);
    });
  });

  // ==================== Variant 属性 ====================

  describe("Variant Attribute", () => {
    it("默认 variant 应该是 default", async () => {
      const tour = createTour();
      document.body.appendChild(tour);

      await waitForRender();

      expect(tour.variant).toBe("default");
    });

    it("应该支持 variant 属性设置为 primary", async () => {
      const tour = createTour();
      tour.variant = "primary";
      document.body.appendChild(tour);

      await waitForRender();

      expect(tour.variant).toBe("primary");
    });

    it("variant 为 primary 时应该同步到子步骤", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      tour.variant = "primary";
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      expect(step.getAttribute("variant")).toBe("primary");
    });

    it("variant 从 primary 改回 default 时应该移除子步骤的 variant 属性", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      tour.variant = "primary";
      document.body.appendChild(tour);

      await waitForRender();

      tour.variant = "default";
      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      expect(step.hasAttribute("variant")).toBe(false);
    });
  });

  // ==================== Placement 属性 ====================

  describe("Placement Attribute", () => {
    it("默认 placement 应该是 bottom", async () => {
      const tour = createTour();
      document.body.appendChild(tour);

      await waitForRender();

      expect(tour.placement).toBe("bottom");
    });

    it("应该支持 placement 属性设置", async () => {
      const tour = createTour();
      tour.placement = "top";
      document.body.appendChild(tour);

      await waitForRender();

      expect(tour.placement).toBe("top");
    });

    it("placement 应该同步到没有自定义 placement 的子步骤", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      tour.placement = "top-start";
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      expect(step.getAttribute("placement")).toBe("top-start");
    });

    it("placement 不应该覆盖子步骤已有的 placement", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1" placement="left"><div>Content</div></ea-tour-step>
      `);
      tour.placement = "top";
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      expect(step.getAttribute("placement")).toBe("left");
    });
  });

  // ==================== AppendTo 属性 ====================

  describe("AppendTo Attribute", () => {
    it("默认 appendTo 应该是 body", async () => {
      const tour = createTour();
      document.body.appendChild(tour);

      await waitForRender();

      expect(tour.appendTo).toBe("body");
    });

    it("应该支持 appendTo 属性设置", async () => {
      const tour = createTour();
      tour.setAttribute("append-to", "#test-container");
      document.body.appendChild(tour);

      await waitForRender();

      expect(tour.appendTo).toBe("#test-container");
    });
  });

  // ==================== 事件 ====================

  describe("Events", () => {
    it("next 事件应该触发 change 事件", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content 1</div></ea-tour-step>
        <ea-tour-step heading="Step 2"><div>Content 2</div></ea-tour-step>
      `);
      tour.visible = true;
      document.body.appendChild(tour);

      await waitForRender();

      const changeHandler = vi.fn();
      tour.addEventListener("change", changeHandler);

      tour.dispatchEvent(new CustomEvent("next", { bubbles: true }));
      await waitForRender();

      expect(changeHandler).toHaveBeenCalled();
    });

    it("previous 事件应该触发 change 事件", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content 1</div></ea-tour-step>
        <ea-tour-step heading="Step 2"><div>Content 2</div></ea-tour-step>
      `);
      tour.visible = true;
      document.body.appendChild(tour);

      await waitForRender();

      tour.current = 1;
      await waitForRender();

      const changeHandler = vi.fn();
      tour.addEventListener("change", changeHandler);

      tour.dispatchEvent(new CustomEvent("previous", { bubbles: true }));
      await waitForRender();

      expect(changeHandler).toHaveBeenCalled();
    });

    it("ea-close 事件应该隐藏 tour", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      tour.visible = true;
      document.body.appendChild(tour);

      await waitForRender();

      tour.dispatchEvent(new CustomEvent("ea-close", { bubbles: true }));
      await waitForRender();

      expect(tour.visible).toBe(false);
    });

    it("finish 事件应该隐藏 tour", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      tour.visible = true;
      document.body.appendChild(tour);

      await waitForRender();

      tour.dispatchEvent(new CustomEvent("finish", { bubbles: true }));
      await waitForRender();

      expect(tour.visible).toBe(false);
    });
  });

  // ==================== 步骤导航 ====================

  describe("Step Navigation", () => {
    it("next 事件应该增加 current", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content 1</div></ea-tour-step>
        <ea-tour-step heading="Step 2"><div>Content 2</div></ea-tour-step>
      `);
      tour.visible = true;
      document.body.appendChild(tour);

      await waitForRender();

      expect(tour.current).toBe(0);

      tour.dispatchEvent(new CustomEvent("next", { bubbles: true }));
      await waitForRender();

      expect(tour.current).toBe(1);
    });

    it("previous 事件应该减少 current", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content 1</div></ea-tour-step>
        <ea-tour-step heading="Step 2"><div>Content 2</div></ea-tour-step>
      `);
      tour.visible = true;
      document.body.appendChild(tour);

      await waitForRender();

      tour.dispatchEvent(new CustomEvent("next", { bubbles: true }));
      await waitForRender();
      expect(tour.current).toBe(1);

      tour.dispatchEvent(new CustomEvent("previous", { bubbles: true }));
      await waitForRender();
      expect(tour.current).toBe(0);
    });

    it("完成最后一步应该隐藏 tour", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content 1</div></ea-tour-step>
      `);
      tour.visible = true;
      document.body.appendChild(tour);

      await waitForRender();

      tour.dispatchEvent(new CustomEvent("finish", { bubbles: true }));
      await waitForRender();

      expect(tour.visible).toBe(false);
    });

    it("current 超出范围时应该自动隐藏 tour", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content 1</div></ea-tour-step>
      `);
      tour.visible = true;
      document.body.appendChild(tour);

      await waitForRender();

      tour.current = 10;
      await waitForRender();

      expect(tour.visible).toBe(false);
    });
  });

  // ==================== 生命周期 ====================

  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      expect(tour.shadowRoot).toBeTruthy();
      expect(tour.querySelectorAll("ea-tour-step").length).toBe(1);
    });

    it("组件断开连接后应该正常移除", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      tour.remove();
      await waitForRender();

      expect(tour.isConnected).toBe(false);
    });

    it("组件断开连接后应该清理事件监听", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      tour.visible = true;
      document.body.appendChild(tour);

      await waitForRender();

      tour.remove();
      await waitForRender();

      const changeHandler = vi.fn();
      tour.addEventListener("change", changeHandler);

      tour.dispatchEvent(new CustomEvent("next", { bubbles: true }));
      await waitForRender();

      expect(changeHandler).not.toHaveBeenCalled();
    });
  });

  // ==================== BEM 类名 ====================

  describe("BEM Class Names", () => {
    it("容器应该有正确的 BEM 块类名", async () => {
      const tour = createTour();
      document.body.appendChild(tour);

      await waitForRender();

      const tourEl = tour.shadowRoot.querySelector(".ea-tour");
      expect(tourEl).toBeTruthy();
      expect(tourEl.classList.contains("ea-tour")).toBe(true);
    });

    it("visible 为 true 时应该添加 is-visible 状态类", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      tour.visible = true;
      await waitForRender();

      const tourEl = tour.shadowRoot.querySelector(".ea-tour");
      expect(tourEl.classList.contains("is-visible")).toBe(true);
    });

    it("mask 为 true 时应该添加 is-mask 状态类", async () => {
      const tour = createTour();
      document.body.appendChild(tour);

      await waitForRender();

      const tourEl = tour.shadowRoot.querySelector(".ea-tour");
      expect(tourEl.classList.contains("is-mask")).toBe(true);
    });

    it("mask 为 false 时不应该有 is-mask 状态类", async () => {
      const tour = createTour();
      tour.setAttribute("mask", "false");
      document.body.appendChild(tour);

      await waitForRender();

      const tourEl = tour.shadowRoot.querySelector(".ea-tour");
      expect(tourEl.classList.contains("is-mask")).toBe(false);
    });
  });
});

describe("EaTourStep Component", () => {
  let container;
  let targetEl;

  beforeEach(() => {
    container = document.createElement("div");
    container.id = "test-container";
    document.body.appendChild(container);
    targetEl = createTargetElement("step-target");
  });

  afterEach(() => {
    container.remove();
    targetEl?.remove();
    document.querySelectorAll("ea-tour").forEach(el => el.remove());
  });

  // ==================== 基础渲染 ====================

  describe("Basic Rendering", () => {
    it("应该正确创建 ea-tour-step 元素", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      expect(step).toBeDefined();
      expect(step.tagName.toLowerCase()).toBe("ea-tour-step");
    });

    it("应该创建 open 模式的 shadow DOM", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      expect(step.shadowRoot).toBeDefined();
      expect(step.shadowRoot.mode).toBe("open");
    });

    it("应该渲染 .ea-tour-step 容器", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      expect(step.shadowRoot.querySelector(".ea-tour-step")).toBeTruthy();
    });

    it("应该渲染完整的结构：header、content、footer", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      expect(
        step.shadowRoot.querySelector(".ea-tour-step__header")
      ).toBeTruthy();
      expect(
        step.shadowRoot.querySelector(".ea-tour-step__content")
      ).toBeTruthy();
      expect(
        step.shadowRoot.querySelector(".ea-tour-step__footer")
      ).toBeTruthy();
    });

    it("应该渲染指示器组和切换按钮组", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      expect(
        step.shadowRoot.querySelector(".ea-tour-step__indicator-group")
      ).toBeTruthy();
      expect(
        step.shadowRoot.querySelector(".ea-tour-step__switch-group")
      ).toBeTruthy();
    });

    it("应该包含默认插槽", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div class="step-content">Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      const slot = step.shadowRoot.querySelector(".ea-tour-step__content slot");
      expect(slot).toBeTruthy();
    });

    it("应该包含 header 插槽", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      const headerSlot = step.shadowRoot.querySelector("slot[name='header']");
      expect(headerSlot).toBeTruthy();
    });

    it("应该包含 indicator 插槽", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      const indicatorSlot = step.shadowRoot.querySelector(
        "slot[name='indicator']"
      );
      expect(indicatorSlot).toBeTruthy();
    });

    it("应该包含 footer 插槽", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      const footerSlot = step.shadowRoot.querySelector("slot[name='footer']");
      expect(footerSlot).toBeTruthy();
    });
  });

  // ==================== CSS Parts ====================

  describe("CSS Parts", () => {
    it("应该支持 container part", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      expect(step.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("应该支持 header part", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      expect(step.shadowRoot.querySelector('[part="header"]')).toBeTruthy();
    });

    it("应该支持 close-icon part", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      expect(step.shadowRoot.querySelector('[part="close-icon"]')).toBeTruthy();
    });

    it("应该支持 content part", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      expect(step.shadowRoot.querySelector('[part="content"]')).toBeTruthy();
    });

    it("应该支持 footer part", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      expect(step.shadowRoot.querySelector('[part="footer"]')).toBeTruthy();
    });

    it("应该支持 indicator-group part", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      expect(
        step.shadowRoot.querySelector('[part="indicator-group"]')
      ).toBeTruthy();
    });

    it("应该支持 switch-group part", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      expect(
        step.shadowRoot.querySelector('[part="switch-group"]')
      ).toBeTruthy();
    });

    it("应该支持 previous、next、finish part", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      expect(step.shadowRoot.querySelector('[part="previous"]')).toBeTruthy();
      expect(step.shadowRoot.querySelector('[part="next"]')).toBeTruthy();
      expect(step.shadowRoot.querySelector('[part="finish"]')).toBeTruthy();
    });
  });

  // ==================== Heading 属性 ====================

  describe("Heading Attribute", () => {
    it("默认 heading 应该是空字符串", async () => {
      const tour = createTour(`
        <ea-tour-step><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      expect(step.heading).toBe("");
    });

    it("应该支持 heading 属性", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Test Title"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      expect(step.heading).toBe("Test Title");
    });

    it("通过 setAttribute 设置 heading", async () => {
      const tour = createTour(`
        <ea-tour-step><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      step.setAttribute("heading", "New Title");
      await waitForRender();

      expect(step.heading).toBe("New Title");
    });

    it("heading 变化时应该更新标题文本", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Old Title"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      step.setAttribute("heading", "New Title");
      await waitForRender();

      const titleSlot = step.shadowRoot.querySelector(
        ".ea-tour-step__header slot"
      );
      expect(titleSlot.textContent).toBe("New Title");
    });
  });

  // ==================== Target 属性 ====================

  describe("Target Attribute", () => {
    it("默认 target 应该是空字符串", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      expect(step.target).toBe("");
    });

    it("应该支持 target 属性", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1" target="#step-target"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      expect(step.target).toBe("#step-target");
    });

    it("通过 setAttribute 设置 target", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      step.setAttribute("target", "#step-target");
      await waitForRender();

      expect(step.target).toBe("#step-target");
    });
  });

  // ==================== Variant 属性 ====================

  describe("Variant Attribute", () => {
    it("默认 variant 应该是 default", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      expect(step.variant).toBe("default");
    });

    it("应该支持 variant 属性设置为 primary", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1" variant="primary"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      expect(step.variant).toBe("primary");
    });

    it("variant 为 primary 时容器应该有 ea-tour-step--primary 修饰符", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1" variant="primary"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      const container = step.shadowRoot.querySelector(".ea-tour-step");
      expect(container.classList.contains("ea-tour-step--primary")).toBe(true);
    });

    it("variant 为 default 时容器不应该有 ea-tour-step--primary 修饰符", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      const container = step.shadowRoot.querySelector(".ea-tour-step");
      expect(container.classList.contains("ea-tour-step--primary")).toBe(false);
    });

    it("variant 为 primary 时按钮应该设置 variant 为 primary", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1" variant="primary"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      const nextBtn = step.shadowRoot.querySelector('[part="next"]');
      expect(nextBtn.getAttribute("variant")).toBe("primary");
    });

    it("variant 从 primary 改回 default 时按钮应该移除 variant 属性", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1" variant="primary"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      step.setAttribute("variant", "default");
      await waitForRender();

      const nextBtn = step.shadowRoot.querySelector('[part="next"]');
      expect(nextBtn.hasAttribute("variant")).toBe(false);
    });
  });

  // ==================== Placement 属性 ====================

  describe("Placement Attribute", () => {
    it("默认 placement 应该是 bottom", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      expect(step.placement).toBe("bottom");
    });

    it("应该支持 placement 属性设置", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1" placement="top"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      expect(step.placement).toBe("top");
    });

    it("应该支持所有 placement 值", async () => {
      const placements = [
        "top",
        "top-start",
        "top-end",
        "bottom",
        "bottom-start",
        "bottom-end",
        "left",
        "left-start",
        "left-end",
        "right",
        "right-start",
        "right-end",
      ];

      for (const placement of placements) {
        const tour = createTour(`
          <ea-tour-step heading="Step 1" placement="${placement}"><div>Content</div></ea-tour-step>
        `);
        document.body.appendChild(tour);

        await waitForRender();

        const step = tour.querySelector("ea-tour-step");
        expect(step.placement).toBe(placement);

        tour.remove();
      }
    });
  });

  // ==================== 按钮渲染 ====================

  describe("Buttons", () => {
    it("应该渲染 Previous 按钮", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      const prevBtn = step.shadowRoot.querySelector(".ea-tour-step__previous");
      expect(prevBtn).toBeTruthy();
      expect(prevBtn.textContent).toBe("Previous");
    });

    it("应该渲染 Next 按钮", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      const nextBtn = step.shadowRoot.querySelector(".ea-tour-step__next");
      expect(nextBtn).toBeTruthy();
      expect(nextBtn.textContent).toBe("Next");
    });

    it("应该渲染 Finish 按钮", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      const finishBtn = step.shadowRoot.querySelector(".ea-tour-step__finish");
      expect(finishBtn).toBeTruthy();
      expect(finishBtn.textContent).toBe("Finish");
    });

    it("应该渲染关闭图标", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      const closeIcon = step.shadowRoot.querySelector(
        ".ea-tour-step__close-icon"
      );
      expect(closeIcon).toBeTruthy();
    });

    it("关闭图标应该在 header 内", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      const header = step.shadowRoot.querySelector(".ea-tour-step__header");
      const closeIcon = header.querySelector(".ea-tour-step__close-icon");
      expect(closeIcon).toBeTruthy();
    });

    it("按钮应该使用 ea-button 组件", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      const buttons = step.shadowRoot.querySelectorAll("ea-button");
      expect(buttons.length).toBe(3);
    });
  });

  // ==================== 指示器 ====================

  describe("Indicators", () => {
    it("多步骤时应该渲染指示器", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content 1</div></ea-tour-step>
        <ea-tour-step heading="Step 2"><div>Content 2</div></ea-tour-step>
        <ea-tour-step heading="Step 3"><div>Content 3</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const steps = tour.querySelectorAll("ea-tour-step");
      const indicators = steps[0].shadowRoot.querySelectorAll(
        ".ea-tour-step__indicator"
      );
      expect(indicators.length).toBe(3);
    });

    it("当前步骤的指示器应该有 is-active 状态类", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content 1</div></ea-tour-step>
        <ea-tour-step heading="Step 2"><div>Content 2</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const steps = tour.querySelectorAll("ea-tour-step");
      const indicators = steps[0].shadowRoot.querySelectorAll(
        ".ea-tour-step__indicator"
      );
      expect(indicators[0].classList.contains("is-active")).toBe(true);
      expect(indicators[1].classList.contains("is-active")).toBe(false);
    });

    it("动态添加步骤时应该通过 slotchange 更新指示器", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content 1</div></ea-tour-step>
        <ea-tour-step heading="Step 2"><div>Content 2</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      let steps = tour.querySelectorAll("ea-tour-step");
      let indicators = steps[0].shadowRoot.querySelectorAll(
        ".ea-tour-step__indicator"
      );
      expect(indicators.length).toBe(2);

      const newStep = document.createElement("ea-tour-step");
      newStep.setAttribute("heading", "Step 3");
      newStep.innerHTML = "<div>Content 3</div>";
      tour.appendChild(newStep);

      await waitForRender();

      steps = tour.querySelectorAll("ea-tour-step");
      indicators = steps[0].shadowRoot.querySelectorAll(
        ".ea-tour-step__indicator"
      );
      expect(indicators.length).toBe(3);
    });

    it("动态移除步骤时应该通过 slotchange 更新指示器", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content 1</div></ea-tour-step>
        <ea-tour-step heading="Step 2"><div>Content 2</div></ea-tour-step>
        <ea-tour-step heading="Step 3"><div>Content 3</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      let steps = tour.querySelectorAll("ea-tour-step");
      let indicators = steps[0].shadowRoot.querySelectorAll(
        ".ea-tour-step__indicator"
      );
      expect(indicators.length).toBe(3);

      steps[2].remove();

      await waitForRender();

      steps = tour.querySelectorAll("ea-tour-step");
      indicators = steps[0].shadowRoot.querySelectorAll(
        ".ea-tour-step__indicator"
      );
      expect(indicators.length).toBe(2);
    });

    it("动态添加步骤后所有步骤的指示器数量应该一致", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content 1</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const newStep = document.createElement("ea-tour-step");
      newStep.setAttribute("heading", "Step 2");
      newStep.innerHTML = "<div>Content 2</div>";
      tour.appendChild(newStep);

      await waitForRender();

      const steps = tour.querySelectorAll("ea-tour-step");
      const indicators1 = steps[0].shadowRoot.querySelectorAll(
        ".ea-tour-step__indicator"
      );
      const indicators2 = steps[1].shadowRoot.querySelectorAll(
        ".ea-tour-step__indicator"
      );
      expect(indicators1.length).toBe(2);
      expect(indicators2.length).toBe(2);
    });

    it("updateIndicators 方法应该接受步骤数组并更新指示器", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content 1</div></ea-tour-step>
        <ea-tour-step heading="Step 2"><div>Content 2</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const steps = tour.querySelectorAll("ea-tour-step");
      expect(typeof steps[0].updateIndicators).toBe("function");

      steps[0].updateIndicators([...steps]);
      await waitForRender();

      const indicators = steps[0].shadowRoot.querySelectorAll(
        ".ea-tour-step__indicator"
      );
      expect(indicators.length).toBe(2);
    });
  });

  // ==================== 事件 ====================

  describe("Events", () => {
    it("点击 Next 按钮应该触发 next 事件", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      const nextHandler = vi.fn();
      step.addEventListener("next", nextHandler);

      const nextBtn = step.shadowRoot.querySelector('[part="next"]');
      nextBtn.click();
      await waitForRender();

      expect(nextHandler).toHaveBeenCalled();
    });

    it("点击 Previous 按钮应该触发 previous 事件", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      const previousHandler = vi.fn();
      step.addEventListener("previous", previousHandler);

      const previousBtn = step.shadowRoot.querySelector('[part="previous"]');
      previousBtn.click();
      await waitForRender();

      expect(previousHandler).toHaveBeenCalled();
    });

    it("点击 Finish 按钮应该触发 finish 事件", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      const finishHandler = vi.fn();
      step.addEventListener("finish", finishHandler);

      const finishBtn = step.shadowRoot.querySelector('[part="finish"]');
      finishBtn.click();
      await waitForRender();

      expect(finishHandler).toHaveBeenCalled();
    });

    it("点击关闭图标应该触发 ea-close 事件", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      const closeHandler = vi.fn();
      step.addEventListener("ea-close", closeHandler);

      const closeIcon = step.shadowRoot.querySelector(
        ".ea-tour-step__close-icon"
      );
      closeIcon.click();
      await waitForRender();

      expect(closeHandler).toHaveBeenCalled();
    });

    it("ea-close 事件应该包含 current detail", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content 1</div></ea-tour-step>
        <ea-tour-step heading="Step 2"><div>Content 2</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const steps = tour.querySelectorAll("ea-tour-step");
      let closeEventDetail = null;
      steps[1].addEventListener("ea-close", e => {
        closeEventDetail = e.detail;
      });

      const closeIcon = steps[1].shadowRoot.querySelector(
        ".ea-tour-step__close-icon"
      );
      closeIcon.click();
      await waitForRender();

      expect(closeEventDetail).toBeTruthy();
      expect(closeEventDetail.current).toBe(1);
    });

    it("ea-close 事件应该冒泡", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      const closeHandler = vi.fn();
      tour.addEventListener("ea-close", closeHandler);

      const closeIcon = step.shadowRoot.querySelector(
        ".ea-tour-step__close-icon"
      );
      closeIcon.click();
      await waitForRender();

      expect(closeHandler).toHaveBeenCalled();
    });

    it("next 事件会被 EaTour 拦截并处理", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content 1</div></ea-tour-step>
        <ea-tour-step heading="Step 2"><div>Content 2</div></ea-tour-step>
      `);
      tour.visible = true;
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      const nextBtn = step.shadowRoot.querySelector('[part="next"]');
      nextBtn.click();
      await waitForRender();

      expect(tour.current).toBe(1);
    });
  });

  // ==================== BEM 类名 ====================

  describe("BEM Class Names", () => {
    it("容器应该有正确的 BEM 块类名", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      const containerEl = step.shadowRoot.querySelector(".ea-tour-step");
      expect(containerEl.classList.contains("ea-tour-step")).toBe(true);
    });

    it("header 应该有正确的 BEM 元素类名", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      expect(
        step.shadowRoot.querySelector(".ea-tour-step__header")
      ).toBeTruthy();
    });

    it("content 应该有正确的 BEM 元素类名", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      expect(
        step.shadowRoot.querySelector(".ea-tour-step__content")
      ).toBeTruthy();
    });

    it("footer 应该有正确的 BEM 元素类名", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      expect(
        step.shadowRoot.querySelector(".ea-tour-step__footer")
      ).toBeTruthy();
    });

    it("close-icon 应该有正确的 BEM 元素类名", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      expect(
        step.shadowRoot.querySelector(".ea-tour-step__close-icon")
      ).toBeTruthy();
    });

    it("indicator-group 应该有正确的 BEM 元素类名", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      expect(
        step.shadowRoot.querySelector(".ea-tour-step__indicator-group")
      ).toBeTruthy();
    });

    it("switch-group 应该有正确的 BEM 元素类名", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      expect(
        step.shadowRoot.querySelector(".ea-tour-step__switch-group")
      ).toBeTruthy();
    });

    it("按钮应该有正确的 BEM 元素类名", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      expect(
        step.shadowRoot.querySelector(".ea-tour-step__previous")
      ).toBeTruthy();
      expect(step.shadowRoot.querySelector(".ea-tour-step__next")).toBeTruthy();
      expect(
        step.shadowRoot.querySelector(".ea-tour-step__finish")
      ).toBeTruthy();
    });

    it("variant 为 primary 时应该添加 ea-tour-step--primary 修饰符", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1" variant="primary"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      const containerEl = step.shadowRoot.querySelector(".ea-tour-step");
      expect(containerEl.classList.contains("ea-tour-step--primary")).toBe(
        true
      );
    });
  });

  // ==================== 生命周期 ====================

  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      expect(step.shadowRoot).toBeTruthy();
    });

    it("组件断开连接后应该正常移除", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      tour.remove();
      await waitForRender();

      expect(step.isConnected).toBe(false);
    });
  });

  // ==================== 自定义插槽内容 ====================

  describe("Custom Slot Content", () => {
    it("默认插槽应该正确渲染内容", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div class="custom-content">Custom Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      const slot = step.shadowRoot.querySelector(".ea-tour-step__content slot");
      const assigned = slot.assignedElements();
      expect(assigned.length).toBeGreaterThan(0);
    });

    it("header 插槽应该支持自定义内容", async () => {
      const tour = createTour(`
        <ea-tour-step>
          <div slot="header" class="custom-header">Custom Header</div>
          <div>Content</div>
        </ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      const headerSlot = step.shadowRoot.querySelector("slot[name='header']");
      const assigned = headerSlot.assignedElements();
      expect(assigned.length).toBeGreaterThan(0);
      expect(assigned[0].classList.contains("custom-header")).toBe(true);
    });

    it("footer 插槽应该支持自定义按钮", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1">
          <div>Content</div>
          <div slot="footer" class="custom-footer">Custom Footer</div>
        </ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      const footerSlot = step.shadowRoot.querySelector("slot[name='footer']");
      const assigned = footerSlot.assignedElements();
      expect(assigned.length).toBeGreaterThan(0);
      expect(assigned[0].classList.contains("custom-footer")).toBe(true);
    });
  });

  // ==================== 属性动态更新 ====================

  describe("Dynamic Attribute Updates", () => {
    it("动态修改 heading 应该更新标题", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Old"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      step.setAttribute("heading", "New");
      await waitForRender();

      expect(step.heading).toBe("New");
    });

    it("动态修改 variant 应该更新容器类名", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      step.setAttribute("variant", "primary");
      await waitForRender();

      const containerEl = step.shadowRoot.querySelector(".ea-tour-step");
      expect(containerEl.classList.contains("ea-tour-step--primary")).toBe(
        true
      );

      step.setAttribute("variant", "default");
      await waitForRender();

      expect(containerEl.classList.contains("ea-tour-step--primary")).toBe(
        false
      );
    });

    it("动态修改 placement 应该更新属性值", async () => {
      const tour = createTour(`
        <ea-tour-step heading="Step 1"><div>Content</div></ea-tour-step>
      `);
      document.body.appendChild(tour);

      await waitForRender();

      const step = tour.querySelector("ea-tour-step");
      step.setAttribute("placement", "top-start");
      await waitForRender();

      expect(step.placement).toBe("top-start");
    });
  });
});
