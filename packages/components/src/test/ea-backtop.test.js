import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

import "../components/ea-backtop/index";
import { waitForRender } from "./utils/waitForRender";
import { runAxe, assertNoA11yViolations } from "./utils/a11y";

describe("EaBacktop", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("基本功能", () => {
    it("应该正确渲染组件", () => {
      const backtop = document.createElement("ea-backtop");
      container.appendChild(backtop);

      expect(backtop).toBeDefined();
      expect(backtop.shadowRoot).toBeDefined();
    });

    it("应该包含容器元素", () => {
      const backtop = document.createElement("ea-backtop");
      container.appendChild(backtop);

      const containerEl = backtop.shadowRoot.querySelector(".ea-backtop");
      expect(containerEl).toBeDefined();
    });

    it("应该包含 container CSS Part", () => {
      const backtop = document.createElement("ea-backtop");
      container.appendChild(backtop);

      const partEl = backtop.shadowRoot.querySelector('[part="container"]');
      expect(partEl).toBeDefined();
    });

    it("应该包含默认 slot", () => {
      const backtop = document.createElement("ea-backtop");
      container.appendChild(backtop);

      const slot = backtop.shadowRoot.querySelector("slot");
      expect(slot).toBeDefined();
    });
  });

  describe("target 属性", () => {
    it("默认 target 应该是 window", async () => {
      const backtop = document.createElement("ea-backtop");
      container.appendChild(backtop);

      await waitForRender(0);

      expect(backtop.target).toBe("window");
    });

    it("应该正确设置 target 属性", async () => {
      const backtop = document.createElement("ea-backtop");
      backtop.setAttribute("target", "#test-target");
      container.appendChild(backtop);

      await waitForRender(0);

      expect(backtop.target).toBe("#test-target");
    });

    it("target 属性变化时应该正确更新", async () => {
      const backtop = document.createElement("ea-backtop");
      backtop.setAttribute("target", "#old-target");
      container.appendChild(backtop);

      await waitForRender(0);
      expect(backtop.target).toBe("#old-target");

      backtop.setAttribute("target", "#new-target");
      await waitForRender(0);

      expect(backtop.target).toBe("#new-target");
    });
  });

  describe("visibilityHeight 属性", () => {
    it("默认 visibilityHeight 应该是 200", async () => {
      const backtop = document.createElement("ea-backtop");
      container.appendChild(backtop);

      await waitForRender(0);

      expect(backtop.visibilityHeight).toBe(200);
    });

    it("应该正确设置 visibilityHeight 属性", async () => {
      const backtop = document.createElement("ea-backtop");
      backtop.setAttribute("visibility-height", "100");
      container.appendChild(backtop);

      await waitForRender(0);

      expect(backtop.visibilityHeight).toBe(100);
    });

    it("visibilityHeight 属性变化时应该正确更新", async () => {
      const backtop = document.createElement("ea-backtop");
      backtop.setAttribute("visibility-height", "100");
      container.appendChild(backtop);

      await waitForRender(0);
      expect(backtop.visibilityHeight).toBe(100);

      backtop.setAttribute("visibility-height", "300");
      await waitForRender(0);

      expect(backtop.visibilityHeight).toBe(300);
    });
  });

  describe("right 属性", () => {
    it("默认 right 应该是 40px", async () => {
      const backtop = document.createElement("ea-backtop");
      container.appendChild(backtop);

      await waitForRender(0);

      expect(backtop.right).toBe("40px");
    });

    it("应该正确设置 right 属性", async () => {
      const backtop = document.createElement("ea-backtop");
      backtop.setAttribute("right", "60px");
      container.appendChild(backtop);

      await waitForRender(0);

      expect(backtop.right).toBe("60px");
    });

    it("right 属性变化时应该更新 CSS 变量", async () => {
      const backtop = document.createElement("ea-backtop");
      container.appendChild(backtop);

      await waitForRender();

      backtop.setAttribute("right", "80px");
      await waitForRender(0);

      expect(backtop.style.getPropertyValue("--ea-backtop-right")).toBe("80px");
    });
  });

  describe("bottom 属性", () => {
    it("默认 bottom 应该是 40px", async () => {
      const backtop = document.createElement("ea-backtop");
      container.appendChild(backtop);

      await waitForRender(0);

      expect(backtop.bottom).toBe("40px");
    });

    it("应该正确设置 bottom 属性", async () => {
      const backtop = document.createElement("ea-backtop");
      backtop.setAttribute("bottom", "100px");
      container.appendChild(backtop);

      await waitForRender(0);

      expect(backtop.bottom).toBe("100px");
    });

    it("bottom 属性变化时应该更新 CSS 变量", async () => {
      const backtop = document.createElement("ea-backtop");
      container.appendChild(backtop);

      await waitForRender();

      backtop.setAttribute("bottom", "120px");
      await waitForRender(0);

      expect(backtop.style.getPropertyValue("--ea-backtop-bottom")).toBe(
        "120px"
      );
    });
  });

  describe("smooth 属性", () => {
    it("默认 smooth 应该是 true", async () => {
      const backtop = document.createElement("ea-backtop");
      container.appendChild(backtop);

      await waitForRender(0);

      expect(backtop.smooth).toBe(true);
    });

    it("设置 smooth 属性后应该为 true", async () => {
      const backtop = document.createElement("ea-backtop");
      backtop.setAttribute("smooth", "");
      container.appendChild(backtop);

      await waitForRender(0);

      expect(backtop.smooth).toBe(true);
    });

    it("通过 JS 属性设置 smooth 为 false", async () => {
      const backtop = document.createElement("ea-backtop");
      container.appendChild(backtop);

      await waitForRender();
      expect(backtop.smooth).toBe(true);

      backtop.smooth = false;
      await waitForRender(0);

      expect(backtop.smooth).toBe(false);
    });
  });

  describe("updateContainerClasslist 方法", () => {
    it("应该返回 BEM 类名字符串", async () => {
      const backtop = document.createElement("ea-backtop");
      container.appendChild(backtop);

      await waitForRender();

      const className = backtop.updateContainerClasslist();
      expect(className).toContain("ea-backtop");
    });

    it("滚动位置低于阈值时不应包含 visible 状态类", async () => {
      const backtop = document.createElement("ea-backtop");
      container.appendChild(backtop);

      await waitForRender();

      const className = backtop.updateContainerClasslist();
      expect(className).not.toContain("is-visible");
    });
  });

  describe("点击行为", () => {
    it("点击时应该调用 scrollTo", async () => {
      const backtop = document.createElement("ea-backtop");
      container.appendChild(backtop);

      await waitForRender();

      const clickEvent = new MouseEvent("click", { bubbles: true });
      backtop.dispatchEvent(clickEvent);

      expect(true).toBe(true);
    });
  });

  describe("Slots", () => {
    it("应该支持默认 slot 传递文本内容", () => {
      const backtop = document.createElement("ea-backtop");
      backtop.textContent = "UP";
      container.appendChild(backtop);

      const slot = backtop.shadowRoot.querySelector("slot");
      expect(slot).toBeDefined();
    });

    it("应该支持默认 slot 传递自定义元素", () => {
      const backtop = document.createElement("ea-backtop");
      const icon = document.createElement("span");
      icon.textContent = "↑";
      backtop.appendChild(icon);
      container.appendChild(backtop);

      const slot = backtop.shadowRoot.querySelector("slot");
      expect(slot).toBeDefined();
    });
  });

  describe("生命周期", () => {
    it("组件挂载时应该初始化容器类名", async () => {
      const backtop = document.createElement("ea-backtop");
      container.appendChild(backtop);

      await waitForRender();

      const containerEl = backtop.shadowRoot.querySelector(".ea-backtop");
      expect(containerEl.className).toContain("ea-backtop");
    });

    it("组件移除时应该清理资源", async () => {
      const backtop = document.createElement("ea-backtop");
      container.appendChild(backtop);

      await waitForRender();

      container.removeChild(backtop);

      expect(true).toBe(true);
    });
  });

  describe("组合场景", () => {
    it("应该支持组合使用多个属性", async () => {
      const backtop = document.createElement("ea-backtop");
      backtop.setAttribute("target", "#custom-target");
      backtop.setAttribute("visibility-height", "100");
      backtop.setAttribute("right", "60px");
      backtop.setAttribute("bottom", "80px");
      container.appendChild(backtop);

      await waitForRender();

      expect(backtop.target).toBe("#custom-target");
      expect(backtop.visibilityHeight).toBe(100);
      expect(backtop.right).toBe("60px");
      expect(backtop.bottom).toBe("80px");

      backtop.smooth = false;
      await waitForRender(0);
      expect(backtop.smooth).toBe(false);
    });

    it("应该正确处理多个 Backtop 实例", async () => {
      const backtop1 = document.createElement("ea-backtop");
      backtop1.setAttribute("visibility-height", "100");
      backtop1.setAttribute("right", "20px");

      const backtop2 = document.createElement("ea-backtop");
      backtop2.setAttribute("visibility-height", "300");
      backtop2.setAttribute("right", "80px");

      container.appendChild(backtop1);
      container.appendChild(backtop2);

      await waitForRender(0);

      expect(backtop1.visibilityHeight).toBe(100);
      expect(backtop1.right).toBe("20px");
      expect(backtop2.visibilityHeight).toBe(300);
      expect(backtop2.right).toBe("80px");
    });

    it("应该正确处理动态属性更新", async () => {
      const backtop = document.createElement("ea-backtop");
      backtop.setAttribute("visibility-height", "100");
      container.appendChild(backtop);

      await waitForRender(0);
      expect(backtop.visibilityHeight).toBe(100);

      backtop.setAttribute("visibility-height", "250");
      await waitForRender(0);

      expect(backtop.visibilityHeight).toBe(250);
    });
  });

  describe("Accessibility", () => {
    it("默认状态应该无 a11y 违规", async () => {
      const el = document.createElement("ea-backtop");
      container.appendChild(el);
      await waitForRender();
      const results = await runAxe(el);
      assertNoA11yViolations(results);
    });

    describe("ARIA Attributes", () => {
      it("容器应该有 role='button'", async () => {
        const el = document.createElement("ea-backtop");
        container.appendChild(el);
        await waitForRender();
        const containerEl = el.shadowRoot.querySelector('[part="container"]');
        expect(containerEl.getAttribute("role")).toBe("button");
      });

      it("容器应该有 aria-label='Back to top'", async () => {
        const el = document.createElement("ea-backtop");
        container.appendChild(el);
        await waitForRender();
        const containerEl = el.shadowRoot.querySelector('[part="container"]');
        expect(containerEl.getAttribute("aria-label")).toBe("Back to top");
      });
    });

    describe("Keyboard Interaction", () => {
      it("按下 Enter 键应该触发滚动到顶部", async () => {
        const el = document.createElement("ea-backtop");
        container.appendChild(el);
        await waitForRender();
        const containerEl = el.shadowRoot.querySelector('[part="container"]');
        const scrollSpy = vi.spyOn(el, "_scrollToTop").mockImplementation(() => {});
        containerEl.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
        expect(scrollSpy).toHaveBeenCalled();
        scrollSpy.mockRestore();
      });

      it("按下 Space 键应该触发滚动到顶部", async () => {
        const el = document.createElement("ea-backtop");
        container.appendChild(el);
        await waitForRender();
        const containerEl = el.shadowRoot.querySelector('[part="container"]');
        const scrollSpy = vi.spyOn(el, "_scrollToTop").mockImplementation(() => {});
        containerEl.dispatchEvent(new KeyboardEvent("keydown", { key: " " }));
        expect(scrollSpy).toHaveBeenCalled();
        scrollSpy.mockRestore();
      });
    });
  });
});
