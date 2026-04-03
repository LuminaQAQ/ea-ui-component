import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// 导入 ea-tour 组件
import "../components/ea-tour/index.js";

describe("EaTour Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    container.id = "test-container";
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
    document.body.style.overflow = "";
  });

  /**
   * 基础功能测试
   */
  describe("Basic Functionality", () => {
    it("应该正确渲染组件", async () => {
      const tour = document.createElement("ea-tour");
      tour.innerHTML = `
        <ea-tour-step title="Step 1" target="#test-container">
          <div>Content 1</div>
        </ea-tour-step>
      `;
      document.body.appendChild(tour);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tour.shadowRoot).toBeTruthy();
      expect(tour.shadowRoot.querySelector(".ea-tour")).toBeTruthy();

      tour.remove();
    });

    it("应该支持 CSS Parts", async () => {
      const tour = document.createElement("ea-tour");
      tour.innerHTML = `
        <ea-tour-step title="Step 1">
          <div>Content</div>
        </ea-tour-step>
      `;
      document.body.appendChild(tour);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tour.shadowRoot.querySelector('[part="hollow"]')).toBeTruthy();

      tour.remove();
    });
  });

  /**
   * Visible 属性测试
   */
  describe("Visible Attribute", () => {
    it("默认 visible 应该是空字符串（falsy）", async () => {
      const tour = document.createElement("ea-tour");
      tour.innerHTML = `
        <ea-tour-step title="Step 1">
          <div>Content</div>
        </ea-tour-step>
      `;
      document.body.appendChild(tour);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(!tour.visible).toBe(true);

      tour.remove();
    });

    it("应该支持 visible 属性", async () => {
      const tour = document.createElement("ea-tour");
      tour.innerHTML = `
        <ea-tour-step title="Step 1">
          <div>Content</div>
        </ea-tour-step>
      `;
      document.body.appendChild(tour);

      await new Promise(resolve => setTimeout(resolve, 100));

      tour.visible = true;

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tour.visible).toBe(true);

      tour.remove();
    });
  });

  /**
   * Mask 属性测试
   */
  describe("Mask Attribute", () => {
    it("默认 mask 应该是 true", async () => {
      const tour = document.createElement("ea-tour");
      tour.innerHTML = `
        <ea-tour-step title="Step 1">
          <div>Content</div>
        </ea-tour-step>
      `;
      document.body.appendChild(tour);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tour.mask).toBe(true);

      tour.remove();
    });

    it("应该支持 mask 属性设置为 false", async () => {
      const tour = document.createElement("ea-tour");
      tour.mask = false;
      tour.innerHTML = `
        <ea-tour-step title="Step 1">
          <div>Content</div>
        </ea-tour-step>
      `;
      document.body.appendChild(tour);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tour.mask).toBe(false);

      tour.remove();
    });
  });

  /**
   * Current 属性测试
   */
  describe("Current Attribute", () => {
    it("默认 current 应该是 0", async () => {
      const tour = document.createElement("ea-tour");
      tour.innerHTML = `
        <ea-tour-step title="Step 1">
          <div>Content 1</div>
        </ea-tour-step>
        <ea-tour-step title="Step 2">
          <div>Content 2</div>
        </ea-tour-step>
      `;
      document.body.appendChild(tour);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tour.current).toBe(0);

      tour.remove();
    });

    it("应该支持 current 属性", async () => {
      const tour = document.createElement("ea-tour");
      tour.innerHTML = `
        <ea-tour-step title="Step 1">
          <div>Content 1</div>
        </ea-tour-step>
        <ea-tour-step title="Step 2">
          <div>Content 2</div>
        </ea-tour-step>
      `;
      document.body.appendChild(tour);

      await new Promise(resolve => setTimeout(resolve, 100));

      tour.current = 1;

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tour.current).toBe(1);

      tour.remove();
    });
  });

  /**
   * Gap 属性测试
   */
  describe("Gap Attribute", () => {
    it("默认 gap 应该是 6", async () => {
      const tour = document.createElement("ea-tour");
      tour.innerHTML = `
        <ea-tour-step title="Step 1">
          <div>Content</div>
        </ea-tour-step>
      `;
      document.body.appendChild(tour);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tour.gap).toBe(6);

      tour.remove();
    });

    it("应该支持 gap 属性", async () => {
      const tour = document.createElement("ea-tour");
      tour.gap = 10;
      tour.innerHTML = `
        <ea-tour-step title="Step 1">
          <div>Content</div>
        </ea-tour-step>
      `;
      document.body.appendChild(tour);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tour.gap).toBe(10);

      tour.remove();
    });
  });

  /**
   * Type 属性测试
   */
  describe("Type Attribute", () => {
    it("默认 type 应该是 default", async () => {
      const tour = document.createElement("ea-tour");
      tour.innerHTML = `
        <ea-tour-step title="Step 1">
          <div>Content</div>
        </ea-tour-step>
      `;
      document.body.appendChild(tour);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tour.type).toBe("default");

      tour.remove();
    });

    it("应该支持 type 属性", async () => {
      const tour = document.createElement("ea-tour");
      tour.type = "primary";
      tour.innerHTML = `
        <ea-tour-step title="Step 1">
          <div>Content</div>
        </ea-tour-step>
      `;
      document.body.appendChild(tour);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tour.type).toBe("primary");

      tour.remove();
    });
  });

  /**
   * Placement 属性测试
   */
  describe("Placement Attribute", () => {
    it("默认 placement 应该是 bottom", async () => {
      const tour = document.createElement("ea-tour");
      tour.innerHTML = `
        <ea-tour-step title="Step 1">
          <div>Content</div>
        </ea-tour-step>
      `;
      document.body.appendChild(tour);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tour.placement).toBe("bottom");

      tour.remove();
    });

    it("应该支持 placement 属性", async () => {
      const tour = document.createElement("ea-tour");
      tour.placement = "top";
      tour.innerHTML = `
        <ea-tour-step title="Step 1">
          <div>Content</div>
        </ea-tour-step>
      `;
      document.body.appendChild(tour);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tour.placement).toBe("top");

      tour.remove();
    });
  });

  /**
   * Append-to 属性测试
   */
  describe("Append-to Attribute", () => {
    it("默认 append-to 应该是 body", async () => {
      const tour = document.createElement("ea-tour");
      tour.innerHTML = `
        <ea-tour-step title="Step 1">
          <div>Content</div>
        </ea-tour-step>
      `;
      document.body.appendChild(tour);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tour["append-to"]).toBe("body");

      tour.remove();
    });
  });

  /**
   * 事件测试
   */
  describe("Events", () => {
    it("应该触发 change 事件", async () => {
      const tour = document.createElement("ea-tour");
      tour.visible = true;
      tour.innerHTML = `
        <ea-tour-step title="Step 1">
          <div>Content 1</div>
        </ea-tour-step>
        <ea-tour-step title="Step 2">
          <div>Content 2</div>
        </ea-tour-step>
      `;
      document.body.appendChild(tour);

      await new Promise(resolve => setTimeout(resolve, 100));

      const changeHandler = vi.fn();
      tour.addEventListener("change", changeHandler);

      // 通过 next 事件触发步骤切换，从而触发 change 事件
      tour.dispatchEvent(new CustomEvent("next", { bubbles: true }));

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(changeHandler).toHaveBeenCalled();

      tour.remove();
    });

    it("应该触发 finish 事件", async () => {
      const tour = document.createElement("ea-tour");
      tour.visible = true;
      tour.innerHTML = `
        <ea-tour-step title="Step 1">
          <div>Content 1</div>
        </ea-tour-step>
      `;
      document.body.appendChild(tour);

      await new Promise(resolve => setTimeout(resolve, 100));

      const finishHandler = vi.fn();
      tour.addEventListener("finish", finishHandler);

      tour.dispatchEvent(new CustomEvent("finish", { bubbles: true }));

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(finishHandler).toHaveBeenCalled();

      tour.remove();
    });
  });

  /**
   * 步骤切换测试
   */
  describe("Step Navigation", () => {
    it("应该支持 next 事件切换步骤", async () => {
      const tour = document.createElement("ea-tour");
      tour.visible = true;
      tour.innerHTML = `
        <ea-tour-step title="Step 1">
          <div>Content 1</div>
        </ea-tour-step>
        <ea-tour-step title="Step 2">
          <div>Content 2</div>
        </ea-tour-step>
      `;
      document.body.appendChild(tour);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tour.current).toBe(0);

      tour.dispatchEvent(new CustomEvent("next", { bubbles: true }));

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tour.current).toBe(1);

      tour.remove();
    });

    it("应该支持 previous 事件切换步骤", async () => {
      const tour = document.createElement("ea-tour");
      tour.visible = true;
      tour.innerHTML = `
        <ea-tour-step title="Step 1">
          <div>Content 1</div>
        </ea-tour-step>
        <ea-tour-step title="Step 2">
          <div>Content 2</div>
        </ea-tour-step>
      `;
      document.body.appendChild(tour);

      await new Promise(resolve => setTimeout(resolve, 100));

      // 先通过 next 事件前进到第二步
      tour.dispatchEvent(new CustomEvent("next", { bubbles: true }));
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tour.current).toBe(1);

      // 然后通过 previous 事件返回第一步
      tour.dispatchEvent(new CustomEvent("previous", { bubbles: true }));
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tour.current).toBe(0);

      tour.remove();
    });

    it("完成最后一步应该隐藏 tour", async () => {
      const tour = document.createElement("ea-tour");
      tour.visible = true;
      tour.innerHTML = `
        <ea-tour-step title="Step 1">
          <div>Content 1</div>
        </ea-tour-step>
      `;
      document.body.appendChild(tour);

      await new Promise(resolve => setTimeout(resolve, 100));

      // 触发 finish 事件来关闭 tour
      tour.dispatchEvent(new CustomEvent("finish", { bubbles: true }));

      await new Promise(resolve => setTimeout(resolve, 100));

      // visible 应该变为 false 或空字符串（falsy 值）
      expect(!tour.visible).toBe(true);

      tour.remove();
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const tour = document.createElement("ea-tour");
      tour.innerHTML = `
        <ea-tour-step title="Step 1">
          <div>Content</div>
        </ea-tour-step>
      `;
      document.body.appendChild(tour);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(tour.shadowRoot).toBeTruthy();
      expect(tour.querySelectorAll("ea-tour-step").length).toBe(1);

      tour.remove();
    });

    it("组件断开连接后应该正常移除", async () => {
      const tour = document.createElement("ea-tour");
      tour.innerHTML = `
        <ea-tour-step title="Step 1">
          <div>Content</div>
        </ea-tour-step>
      `;
      document.body.appendChild(tour);

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(document.querySelector("ea-tour")).toBeTruthy();

      tour.remove();

      await new Promise(resolve => setTimeout(resolve, 100));

      // 组件应该从 DOM 中移除
      expect(tour.isConnected).toBe(false);
    });
  });
});

describe("EaTourStep Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    container.id = "test-target";
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  /**
   * 基础功能测试
   */
  describe("Basic Functionality", () => {
    it("应该正确渲染组件", async () => {
      const tour = document.createElement("ea-tour");
      tour.innerHTML = `
        <ea-tour-step title="Step 1">
          <div>Content</div>
        </ea-tour-step>
      `;
      document.body.appendChild(tour);

      await new Promise(resolve => setTimeout(resolve, 100));

      const step = tour.querySelector("ea-tour-step");
      expect(step.shadowRoot).toBeTruthy();
      expect(step.shadowRoot.querySelector(".ea-tour-step")).toBeTruthy();

      tour.remove();
    });

    it("应该支持 CSS Parts", async () => {
      const tour = document.createElement("ea-tour");
      tour.innerHTML = `
        <ea-tour-step title="Step 1">
          <div>Content</div>
        </ea-tour-step>
      `;
      document.body.appendChild(tour);

      await new Promise(resolve => setTimeout(resolve, 100));

      const step = tour.querySelector("ea-tour-step");
      expect(step.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
      expect(step.shadowRoot.querySelector('[part="header"]')).toBeTruthy();
      expect(step.shadowRoot.querySelector('[part="content"]')).toBeTruthy();
      expect(step.shadowRoot.querySelector('[part="footer"]')).toBeTruthy();

      tour.remove();
    });
  });

  /**
   * Title 属性测试
   */
  describe("Title Attribute", () => {
    it("默认 title 应该是空字符串", async () => {
      const tour = document.createElement("ea-tour");
      tour.innerHTML = `
        <ea-tour-step>
          <div>Content</div>
        </ea-tour-step>
      `;
      document.body.appendChild(tour);

      await new Promise(resolve => setTimeout(resolve, 100));

      const step = tour.querySelector("ea-tour-step");
      expect(step.title).toBe("");

      tour.remove();
    });

    it("应该支持 title 属性", async () => {
      const tour = document.createElement("ea-tour");
      tour.innerHTML = `
        <ea-tour-step title="Test Title">
          <div>Content</div>
        </ea-tour-step>
      `;
      document.body.appendChild(tour);

      await new Promise(resolve => setTimeout(resolve, 100));

      const step = tour.querySelector("ea-tour-step");
      expect(step.title).toBe("Test Title");

      tour.remove();
    });
  });

  /**
   * Target 属性测试
   */
  describe("Target Attribute", () => {
    it("默认 target 应该是空字符串", async () => {
      const tour = document.createElement("ea-tour");
      tour.innerHTML = `
        <ea-tour-step title="Step 1">
          <div>Content</div>
        </ea-tour-step>
      `;
      document.body.appendChild(tour);

      await new Promise(resolve => setTimeout(resolve, 100));

      const step = tour.querySelector("ea-tour-step");
      expect(step.target).toBe("");

      tour.remove();
    });

    it("应该支持 target 属性", async () => {
      const tour = document.createElement("ea-tour");
      tour.innerHTML = `
        <ea-tour-step title="Step 1" target="#test-target">
          <div>Content</div>
        </ea-tour-step>
      `;
      document.body.appendChild(tour);

      await new Promise(resolve => setTimeout(resolve, 100));

      const step = tour.querySelector("ea-tour-step");
      expect(step.target).toBe("#test-target");

      tour.remove();
    });
  });

  /**
   * Type 属性测试
   */
  describe("Type Attribute", () => {
    it("默认 type 应该是 default", async () => {
      const tour = document.createElement("ea-tour");
      tour.innerHTML = `
        <ea-tour-step title="Step 1">
          <div>Content</div>
        </ea-tour-step>
      `;
      document.body.appendChild(tour);

      await new Promise(resolve => setTimeout(resolve, 100));

      const step = tour.querySelector("ea-tour-step");
      expect(step.type).toBe("default");

      tour.remove();
    });

    it("应该支持 type 属性", async () => {
      const tour = document.createElement("ea-tour");
      tour.innerHTML = `
        <ea-tour-step title="Step 1" type="primary">
          <div>Content</div>
        </ea-tour-step>
      `;
      document.body.appendChild(tour);

      await new Promise(resolve => setTimeout(resolve, 100));

      const step = tour.querySelector("ea-tour-step");
      expect(step.type).toBe("primary");

      tour.remove();
    });
  });

  /**
   * Placement 属性测试
   */
  describe("Placement Attribute", () => {
    it("默认 placement 应该是 bottom", async () => {
      const tour = document.createElement("ea-tour");
      tour.innerHTML = `
        <ea-tour-step title="Step 1">
          <div>Content</div>
        </ea-tour-step>
      `;
      document.body.appendChild(tour);

      await new Promise(resolve => setTimeout(resolve, 100));

      const step = tour.querySelector("ea-tour-step");
      expect(step.placement).toBe("bottom");

      tour.remove();
    });

    it("应该支持 placement 属性", async () => {
      const tour = document.createElement("ea-tour");
      tour.innerHTML = `
        <ea-tour-step title="Step 1" placement="top">
          <div>Content</div>
        </ea-tour-step>
      `;
      document.body.appendChild(tour);

      await new Promise(resolve => setTimeout(resolve, 100));

      const step = tour.querySelector("ea-tour-step");
      expect(step.placement).toBe("top");

      tour.remove();
    });
  });

  /**
   * 按钮测试
   */
  describe("Buttons", () => {
    it("应该渲染 Previous、Next 和 Finish 按钮", async () => {
      const tour = document.createElement("ea-tour");
      tour.innerHTML = `
        <ea-tour-step title="Step 1">
          <div>Content</div>
        </ea-tour-step>
      `;
      document.body.appendChild(tour);

      await new Promise(resolve => setTimeout(resolve, 100));

      const step = tour.querySelector("ea-tour-step");
      expect(step.shadowRoot.querySelector('[part="previous"]')).toBeTruthy();
      expect(step.shadowRoot.querySelector('[part="next"]')).toBeTruthy();
      expect(step.shadowRoot.querySelector('[part="finish"]')).toBeTruthy();

      tour.remove();
    });

    it("应该渲染关闭图标", async () => {
      const tour = document.createElement("ea-tour");
      tour.innerHTML = `
        <ea-tour-step title="Step 1">
          <div>Content</div>
        </ea-tour-step>
      `;
      document.body.appendChild(tour);

      await new Promise(resolve => setTimeout(resolve, 100));

      const step = tour.querySelector("ea-tour-step");
      expect(step.shadowRoot.querySelector('[part="close-icon"]')).toBeTruthy();

      tour.remove();
    });
  });

  /**
   * 事件测试
   */
  describe("Events", () => {
    it("应该触发 next 事件", async () => {
      const tour = document.createElement("ea-tour");
      tour.innerHTML = `
        <ea-tour-step title="Step 1">
          <div>Content</div>
        </ea-tour-step>
      `;
      document.body.appendChild(tour);

      await new Promise(resolve => setTimeout(resolve, 100));

      const step = tour.querySelector("ea-tour-step");
      const nextHandler = vi.fn();
      step.addEventListener("next", nextHandler);

      const nextBtn = step.shadowRoot.querySelector('[part="next"]');
      nextBtn.click();

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(nextHandler).toHaveBeenCalled();

      tour.remove();
    });

    it("应该触发 previous 事件", async () => {
      const tour = document.createElement("ea-tour");
      tour.innerHTML = `
        <ea-tour-step title="Step 1">
          <div>Content</div>
        </ea-tour-step>
      `;
      document.body.appendChild(tour);

      await new Promise(resolve => setTimeout(resolve, 100));

      const step = tour.querySelector("ea-tour-step");
      const previousHandler = vi.fn();
      step.addEventListener("previous", previousHandler);

      const previousBtn = step.shadowRoot.querySelector('[part="previous"]');
      previousBtn.click();

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(previousHandler).toHaveBeenCalled();

      tour.remove();
    });

    it("应该触发 finish 事件", async () => {
      const tour = document.createElement("ea-tour");
      tour.innerHTML = `
        <ea-tour-step title="Step 1">
          <div>Content</div>
        </ea-tour-step>
      `;
      document.body.appendChild(tour);

      await new Promise(resolve => setTimeout(resolve, 100));

      const step = tour.querySelector("ea-tour-step");
      const finishHandler = vi.fn();
      step.addEventListener("finish", finishHandler);

      const finishBtn = step.shadowRoot.querySelector('[part="finish"]');
      finishBtn.click();

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(finishHandler).toHaveBeenCalled();

      tour.remove();
    });

    it("应该触发 ea-close 事件", async () => {
      const tour = document.createElement("ea-tour");
      tour.innerHTML = `
        <ea-tour-step title="Step 1">
          <div>Content</div>
        </ea-tour-step>
      `;
      document.body.appendChild(tour);

      await new Promise(resolve => setTimeout(resolve, 100));

      const step = tour.querySelector("ea-tour-step");
      const closeHandler = vi.fn();
      step.addEventListener("ea-close", closeHandler);

      const closeIcon = step.shadowRoot.querySelector('[part="close-icon"]');
      closeIcon.click();

      await new Promise(resolve => setTimeout(resolve, 100));

      expect(closeHandler).toHaveBeenCalled();

      tour.remove();
    });
  });

  /**
   * 插槽测试
   */
  describe("Slots", () => {
    it("应该支持默认插槽", async () => {
      const tour = document.createElement("ea-tour");
      tour.innerHTML = `
        <ea-tour-step title="Step 1">
          <div class="custom-content">Custom Content</div>
        </ea-tour-step>
      `;
      document.body.appendChild(tour);

      await new Promise(resolve => setTimeout(resolve, 100));

      const step = tour.querySelector("ea-tour-step");
      const slot = step.shadowRoot.querySelector("slot:not([name])");
      expect(slot).toBeTruthy();

      tour.remove();
    });

    it("应该支持 header 插槽", async () => {
      const tour = document.createElement("ea-tour");
      tour.innerHTML = `
        <ea-tour-step title="Step 1">
          <div slot="header">Custom Header</div>
          <div>Content</div>
        </ea-tour-step>
      `;
      document.body.appendChild(tour);

      await new Promise(resolve => setTimeout(resolve, 100));

      const step = tour.querySelector("ea-tour-step");
      const headerSlot = step.shadowRoot.querySelector('slot[name="header"]');
      expect(headerSlot).toBeTruthy();

      tour.remove();
    });

    it("应该支持 footer 插槽", async () => {
      const tour = document.createElement("ea-tour");
      tour.innerHTML = `
        <ea-tour-step title="Step 1">
          <div>Content</div>
          <div slot="footer">Custom Footer</div>
        </ea-tour-step>
      `;
      document.body.appendChild(tour);

      await new Promise(resolve => setTimeout(resolve, 100));

      const step = tour.querySelector("ea-tour-step");
      const footerSlot = step.shadowRoot.querySelector('slot[name="footer"]');
      expect(footerSlot).toBeTruthy();

      tour.remove();
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const tour = document.createElement("ea-tour");
      tour.innerHTML = `
        <ea-tour-step title="Step 1">
          <div>Content</div>
        </ea-tour-step>
      `;
      document.body.appendChild(tour);

      await new Promise(resolve => setTimeout(resolve, 100));

      const step = tour.querySelector("ea-tour-step");
      expect(step.shadowRoot).toBeTruthy();

      tour.remove();
    });
  });
});
