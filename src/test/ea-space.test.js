import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender.js";
import { runAxe, assertNoA11yViolations } from "./utils/a11y.js";

if (!window.CSS) {
  window.CSS = {};
}
if (!window.CSS.supports) {
  window.CSS.supports = vi.fn((prop, value) => {
    const validAlignItems = [
      "center",
      "flex-start",
      "flex-end",
      "baseline",
      "stretch",
      "",
    ];
    const validProps = ["gap", "width"];

    if (prop === "align-items") {
      return validAlignItems.includes(value);
    }

    if (validProps.includes(prop)) return true;
    if (prop.includes(":")) {
      const [p, v] = prop.split(":").map(s => s.trim());
      if (p === "align-items") {
        return validAlignItems.includes(v);
      }
      return true;
    }
    return false;
  });
}

import "../components/ea-space/index.ts";

describe("EaSpace", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    container.style.width = "600px";
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("基本功能", () => {
    it("应该正确渲染组件", async () => {
      const space = document.createElement("ea-space");
      space.innerHTML = `
        <div>Item 1</div>
        <div>Item 2</div>
      `;
      container.appendChild(space);

      await waitForRender();

      expect(space.shadowRoot).toBeTruthy();
      expect(space.shadowRoot.querySelector(".ea-space")).toBeTruthy();
    });

    it("应该支持 CSS Parts", async () => {
      const space = document.createElement("ea-space");
      container.appendChild(space);

      await waitForRender();

      expect(space.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("应该渲染默认插槽内容", async () => {
      const space = document.createElement("ea-space");
      space.innerHTML = `
        <div class="item-1">Item 1</div>
        <div class="item-2">Item 2</div>
      `;
      container.appendChild(space);

      await waitForRender();

      const slot = space.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
      expect(space.querySelector(".item-1")).toBeTruthy();
      expect(space.querySelector(".item-2")).toBeTruthy();
    });
  });

  describe("Direction 属性", () => {
    it("默认 direction 应该是 horizontal", async () => {
      const space = document.createElement("ea-space");
      container.appendChild(space);

      await waitForRender();

      expect(space.direction).toBe("horizontal");
    });

    it("应该支持 direction 属性设置为 vertical", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("direction", "vertical");
      container.appendChild(space);

      await waitForRender();

      expect(space.direction).toBe("vertical");
    });

    it("direction=vertical 应该生成 ea-space--vertical 修饰符类名", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("direction", "vertical");
      container.appendChild(space);

      await waitForRender();

      const containerEl = space.shadowRoot.querySelector(".ea-space");
      expect(containerEl.classList.contains("ea-space--vertical")).toBe(true);
    });

    it("direction=horizontal 不应该生成 vertical 修饰符类名", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("direction", "horizontal");
      container.appendChild(space);

      await waitForRender();

      const containerEl = space.shadowRoot.querySelector(".ea-space");
      expect(containerEl.classList.contains("ea-space--vertical")).toBe(false);
    });

    it("无效 direction 值应该被 Enum 拦截", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("direction", "diagonal");
      container.appendChild(space);

      await waitForRender();

      expect(space.direction).toBe("horizontal");
    });
  });

  describe("Size 属性", () => {
    it("默认 size 应该是 default", async () => {
      const space = document.createElement("ea-space");
      container.appendChild(space);

      await waitForRender();

      expect(space.size).toBe("default");
    });

    it("应该支持 size 属性设置为 small", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("size", "small");
      container.appendChild(space);

      await waitForRender();

      expect(space.size).toBe("small");
    });

    it("应该支持 size 属性设置为 large", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("size", "large");
      container.appendChild(space);

      await waitForRender();

      expect(space.size).toBe("large");
    });

    it("size=small 应该生成 ea-space--small 修饰符类名", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("size", "small");
      container.appendChild(space);

      await waitForRender();

      const containerEl = space.shadowRoot.querySelector(".ea-space");
      expect(containerEl.classList.contains("ea-space--small")).toBe(true);
    });

    it("size=large 应该生成 ea-space--large 修饰符类名", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("size", "large");
      container.appendChild(space);

      await waitForRender();

      const containerEl = space.shadowRoot.querySelector(".ea-space");
      expect(containerEl.classList.contains("ea-space--large")).toBe(true);
    });

    it("size=default 应该生成 ea-space--default 修饰符类名", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("size", "default");
      container.appendChild(space);

      await waitForRender();

      const containerEl = space.shadowRoot.querySelector(".ea-space");
      expect(containerEl.classList.contains("ea-space--default")).toBe(true);
    });

    it("自定义 size 值不应该生成尺寸修饰符类名", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("size", "30px");
      container.appendChild(space);

      await waitForRender();

      const containerEl = space.shadowRoot.querySelector(".ea-space");
      expect(containerEl.classList.contains("ea-space--small")).toBe(false);
      expect(containerEl.classList.contains("ea-space--default")).toBe(false);
      expect(containerEl.classList.contains("ea-space--large")).toBe(false);
    });

    it("应该支持自定义 size 值（像素）", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("size", "30px");
      container.appendChild(space);

      await waitForRender();

      expect(space.size).toBe("30px");
    });

    it("应该支持自定义 size 值（rem）", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("size", "2rem");
      container.appendChild(space);

      await waitForRender();

      expect(space.size).toBe("2rem");
    });

    it("自定义 size 值应该设置 CSS 变量", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("size", "30px");
      container.appendChild(space);

      await waitForRender();

      expect(space.style.getPropertyValue("--ea-space-gap")).toBe("30px");
    });
  });

  describe("Wrap 属性", () => {
    it("默认 wrap 应该是 false", async () => {
      const space = document.createElement("ea-space");
      container.appendChild(space);

      await waitForRender();

      expect(space.wrap).toBe(false);
    });

    it("应该支持 wrap 属性设置为 true", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("wrap", "");
      container.appendChild(space);

      await waitForRender();

      expect(space.wrap).toBe(true);
    });

    it("wrap=true 应该生成 is-wrap 状态类名", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("wrap", "");
      container.appendChild(space);

      await waitForRender();

      const containerEl = space.shadowRoot.querySelector(".ea-space");
      expect(containerEl.classList.contains("is-wrap")).toBe(true);
    });

    it("wrap=false 不应该生成 is-wrap 状态类名", async () => {
      const space = document.createElement("ea-space");
      container.appendChild(space);

      await waitForRender();

      const containerEl = space.shadowRoot.querySelector(".ea-space");
      expect(containerEl.classList.contains("is-wrap")).toBe(false);
    });
  });

  describe("Alignment 属性", () => {
    it("默认 alignment 应该是空字符串", async () => {
      const space = document.createElement("ea-space");
      container.appendChild(space);

      await waitForRender();

      expect(space.alignment).toBe("");
    });

    it("应该支持 alignment 属性设置为 center", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("alignment", "center");
      container.appendChild(space);

      await waitForRender();

      expect(space.alignment).toBe("center");
    });

    it("应该支持 alignment 属性设置为 flex-start", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("alignment", "flex-start");
      container.appendChild(space);

      await waitForRender();

      expect(space.alignment).toBe("flex-start");
    });

    it("应该支持 alignment 属性设置为 flex-end", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("alignment", "flex-end");
      container.appendChild(space);

      await waitForRender();

      expect(space.alignment).toBe("flex-end");
    });

    it("应该支持 alignment 属性设置为 baseline", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("alignment", "baseline");
      container.appendChild(space);

      await waitForRender();

      expect(space.alignment).toBe("baseline");
    });

    it("应该支持 alignment 属性设置为 stretch", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("alignment", "stretch");
      container.appendChild(space);

      await waitForRender();

      expect(space.alignment).toBe("stretch");
    });

    it("无效 alignment 值会被 Enum 拦截，返回默认值", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("alignment", "invalid-value");
      container.appendChild(space);

      await waitForRender();

      expect(space.alignment).toBe("");
    });

    it("alignment 设置后应该更新 CSS 变量", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("alignment", "flex-start");
      container.appendChild(space);

      await waitForRender();

      expect(space.style.getPropertyValue("--ea-space-alignment")).toBe("flex-start");
    });

    it("alignment 为空时使用 CSS 默认值 center", async () => {
      const space = document.createElement("ea-space");
      container.appendChild(space);

      await waitForRender();

      expect(space.alignment).toBe("");
    });
  });

  describe("Spacer 属性", () => {
    it("默认 spacer 应该是空字符串", async () => {
      const space = document.createElement("ea-space");
      container.appendChild(space);

      await waitForRender();

      expect(space.spacer).toBe("");
    });

    it("应该支持 spacer 属性设置分隔符", async () => {
      const space = document.createElement("ea-space");
      space.innerHTML = `
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      `;
      space.setAttribute("spacer", "|");
      container.appendChild(space);

      await waitForRender();

      expect(space.spacer).toBe("|");
    });

    it("spacer 应该在子元素之间创建分隔符", async () => {
      const space = document.createElement("ea-space");
      container.appendChild(space);

      await waitForRender();

      space.innerHTML = `
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      `;

      space.setAttribute("spacer", "|");

      await waitForRender();

      const spacers = space.querySelectorAll('[part="spacer"]');
      expect(spacers.length).toBe(2);
      expect(spacers[0].innerText).toBe("|");
      expect(spacers[1].innerText).toBe("|");
    });

    it("清空 spacer 应该移除所有分隔符", async () => {
      const space = document.createElement("ea-space");
      container.appendChild(space);

      await waitForRender();

      space.innerHTML = `
        <div>Item 1</div>
        <div>Item 2</div>
      `;
      space.setAttribute("spacer", "|");

      await waitForRender();

      expect(space.querySelectorAll('[part="spacer"]').length).toBe(1);

      space.setAttribute("spacer", "");

      await waitForRender();

      expect(space.querySelectorAll('[part="spacer"]').length).toBe(0);
    });

    it("只有一个子元素时不应该创建分隔符", async () => {
      const space = document.createElement("ea-space");
      container.appendChild(space);

      await waitForRender();

      space.innerHTML = `<div>Item 1</div>`;
      space.setAttribute("spacer", "|");

      await waitForRender();

      const spacers = space.querySelectorAll('[part="spacer"]');
      expect(spacers.length).toBe(0);
    });
  });

  describe("Fill 属性", () => {
    it("默认 fill 应该是 false", async () => {
      const space = document.createElement("ea-space");
      container.appendChild(space);

      await waitForRender();

      expect(space.fill).toBe(false);
    });

    it("应该支持 fill 属性设置为 true", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("fill", "");
      container.appendChild(space);

      await waitForRender();

      expect(space.fill).toBe(true);
    });

    it("fill=true 应该生成 ea-space--fill 修饰符类名", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("fill", "");
      container.appendChild(space);

      await waitForRender();

      const containerEl = space.shadowRoot.querySelector(".ea-space");
      expect(containerEl.classList.contains("ea-space--fill")).toBe(true);
    });

    it("fill=false 不应该生成 ea-space--fill 修饰符类名", async () => {
      const space = document.createElement("ea-space");
      container.appendChild(space);

      await waitForRender();

      const containerEl = space.shadowRoot.querySelector(".ea-space");
      expect(containerEl.classList.contains("ea-space--fill")).toBe(false);
    });
  });

  describe("Fill-ratio 属性", () => {
    it("默认 fillRatio 应该是 100", async () => {
      const space = document.createElement("ea-space");
      container.appendChild(space);

      await waitForRender();

      expect(space.fillRatio).toBe(100);
    });

    it("应该支持 fillRatio 属性设置自定义比例", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("fill-ratio", "49");
      container.appendChild(space);

      await waitForRender();

      expect(space.fillRatio).toBe(49);
    });

    it("设置 fillRatio 应该自动启用 fill", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("fill-ratio", "50");
      container.appendChild(space);

      await waitForRender();

      expect(space.fill).toBe(true);
    });

    it("fillRatio 应该设置 CSS 变量", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("fill-ratio", "50");
      container.appendChild(space);

      await waitForRender();

      expect(space.style.getPropertyValue("--ea-space-fill-ratio")).toBe("50%");
    });
  });

  describe("CSS 类名生成", () => {
    it("默认应该包含基础类名和 default 修饰符", async () => {
      const space = document.createElement("ea-space");
      container.appendChild(space);

      await waitForRender();

      const containerEl = space.shadowRoot.querySelector(".ea-space");
      expect(containerEl.classList.contains("ea-space")).toBe(true);
      expect(containerEl.classList.contains("ea-space--default")).toBe(true);
      expect(containerEl.classList.contains("ea-space--vertical")).toBe(false);
      expect(containerEl.classList.contains("ea-space--fill")).toBe(false);
      expect(containerEl.classList.contains("is-wrap")).toBe(false);
    });

    it("组合属性应该生成正确的类名", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("direction", "vertical");
      space.setAttribute("size", "large");
      space.setAttribute("wrap", "");
      space.setAttribute("fill", "");
      container.appendChild(space);

      await waitForRender();

      const containerEl = space.shadowRoot.querySelector(".ea-space");
      expect(containerEl.classList.contains("ea-space")).toBe(true);
      expect(containerEl.classList.contains("ea-space--large")).toBe(true);
      expect(containerEl.classList.contains("ea-space--vertical")).toBe(true);
      expect(containerEl.classList.contains("ea-space--fill")).toBe(true);
      expect(containerEl.classList.contains("is-wrap")).toBe(true);
      expect(containerEl.classList.contains("ea-space--small")).toBe(false);
      expect(containerEl.classList.contains("ea-space--default")).toBe(false);
    });
  });

  describe("边界条件", () => {
    it("应该处理空内容", async () => {
      const space = document.createElement("ea-space");
      container.appendChild(space);

      await waitForRender();

      expect(space.shadowRoot.querySelector(".ea-space")).toBeTruthy();
    });

    it("应该处理只有一个子元素的情况", async () => {
      const space = document.createElement("ea-space");
      space.innerHTML = `<div>Only Item</div>`;
      container.appendChild(space);

      await waitForRender();

      expect(space.querySelector("div").textContent).toBe("Only Item");
    });

    it("应该处理多个子元素", async () => {
      const space = document.createElement("ea-space");
      space.innerHTML = `
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
        <div>Item 4</div>
        <div>Item 5</div>
      `;
      container.appendChild(space);

      await waitForRender();

      expect(space.querySelectorAll("div").length).toBe(5);
    });

    it("应该处理动态添加子元素", async () => {
      const space = document.createElement("ea-space");
      space.innerHTML = `<div>Item 1</div>`;
      container.appendChild(space);

      await waitForRender();

      const newItem = document.createElement("div");
      newItem.textContent = "Item 2";
      space.appendChild(newItem);

      expect(space.querySelectorAll("div").length).toBe(2);
    });
  });

  describe("生命周期", () => {
    it("组件连接后应该正确初始化", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("direction", "vertical");
      space.setAttribute("size", "large");
      space.setAttribute("wrap", "");
      container.appendChild(space);

      await waitForRender();

      expect(space.shadowRoot).toBeTruthy();
      expect(space.direction).toBe("vertical");
      expect(space.size).toBe("large");
      expect(space.wrap).toBe(true);
    });

    it("组件断开连接后应该正常移除", async () => {
      const space = document.createElement("ea-space");
      space.innerHTML = `<div>Item</div>`;
      container.appendChild(space);

      await waitForRender();

      space.remove();

      expect(space.isConnected).toBe(false);
    });

    it("应该支持属性动态更新", async () => {
      const space = document.createElement("ea-space");
      space.setAttribute("size", "small");
      container.appendChild(space);

      await waitForRender();

      expect(space.size).toBe("small");

      space.setAttribute("size", "large");

      await waitForRender();

      expect(space.size).toBe("large");
    });
  });

  describe("Accessibility", () => {
    describe("ARIA Attributes", () => {
      it("作为布局组件不需要特定 ARIA 属性", async () => {
        const el = document.createElement("ea-space");
        container.appendChild(el);
        await waitForRender();
        expect(el.getAttribute("role")).toBeNull();
      });
    });

    it("默认状态应该无 a11y 违规", async () => {
      const el = document.createElement("ea-space");
      container.appendChild(el);
      await waitForRender();
      const results = await runAxe(el);
      assertNoA11yViolations(results);
    });
  });
});
