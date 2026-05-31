import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

if (typeof CSS === "undefined") {
  global.CSS = {
    supports: () => true,
  };
} else if (!CSS.supports) {
  CSS.supports = () => true;
}

import "../components/ea-timeline/index.js";
import { waitForRender } from "./utils/waitForRender.js";

describe("EaTimeline", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("自定义元素注册", () => {
    it("应该正确注册 ea-timeline 自定义元素", () => {
      expect(customElements.get("ea-timeline")).toBeDefined();
    });

    it("创建的元素应该是 ea-timeline 自定义元素实例", () => {
      const timeline = document.createElement("ea-timeline");
      expect(timeline instanceof customElements.get("ea-timeline")).toBe(true);
    });
  });

  describe("Shadow DOM", () => {
    it("应该创建 open 模式的 Shadow DOM", async () => {
      const timeline = document.createElement("ea-timeline");
      container.appendChild(timeline);
      await waitForRender();
      expect(timeline.shadowRoot).toBeDefined();
      expect(timeline.shadowRoot.mode).toBe("open");
    });
  });

  describe("CSS Parts", () => {
    it("应该包含 container CSS Part", async () => {
      const timeline = document.createElement("ea-timeline");
      container.appendChild(timeline);
      await waitForRender();
      const el = timeline.shadowRoot.querySelector('[part="container"]');
      expect(el).toBeTruthy();
    });

    it("container CSS Part 应该在 div 元素上", async () => {
      const timeline = document.createElement("ea-timeline");
      container.appendChild(timeline);
      await waitForRender();
      const el = timeline.shadowRoot.querySelector('[part="container"]');
      expect(el.tagName.toLowerCase()).toBe("div");
    });

    it("不应包含其他额外的 CSS Parts", async () => {
      const timeline = document.createElement("ea-timeline");
      container.appendChild(timeline);
      await waitForRender();
      const parts = timeline.shadowRoot.querySelectorAll("[part]");
      expect(parts.length).toBe(1);
    });
  });

  describe("BEM 类名", () => {
    it("容器应该有 ea-timeline BEM 块类名", async () => {
      const timeline = document.createElement("ea-timeline");
      container.appendChild(timeline);
      await waitForRender();
      const el = timeline.shadowRoot.querySelector('[part="container"]');
      expect(el.classList.contains("ea-timeline")).toBe(true);
    });
  });

  describe("DOM 结构", () => {
    it("container 应该包含一个 slot 元素", async () => {
      const timeline = document.createElement("ea-timeline");
      container.appendChild(timeline);
      await waitForRender();
      const containerEl =
        timeline.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.querySelector("slot")).toBeTruthy();
    });

    it("默认 slot 不应有 name 属性", async () => {
      const timeline = document.createElement("ea-timeline");
      container.appendChild(timeline);
      await waitForRender();
      const slot = timeline.shadowRoot.querySelector("slot");
      expect(slot.hasAttribute("name")).toBe(false);
    });

    it("Shadow DOM 中应该只有一个 slot", async () => {
      const timeline = document.createElement("ea-timeline");
      container.appendChild(timeline);
      await waitForRender();
      expect(timeline.shadowRoot.querySelectorAll("slot").length).toBe(1);
    });
  });

  describe("子元素渲染", () => {
    it("应该正确渲染单个 ea-timeline-item 子元素", async () => {
      const timeline = document.createElement("ea-timeline");
      timeline.innerHTML = `<ea-timeline-item timestamp="2024-7-1">Item 1</ea-timeline-item>`;
      container.appendChild(timeline);
      await waitForRender();
      expect(timeline.querySelectorAll("ea-timeline-item").length).toBe(1);
    });

    it("应该正确渲染多个 ea-timeline-item 子元素", async () => {
      const timeline = document.createElement("ea-timeline");
      timeline.innerHTML = `
        <ea-timeline-item timestamp="2024-7-1">Item 1</ea-timeline-item>
        <ea-timeline-item timestamp="2024-7-2">Item 2</ea-timeline-item>
        <ea-timeline-item timestamp="2024-7-3">Item 3</ea-timeline-item>
      `;
      container.appendChild(timeline);
      await waitForRender();
      expect(timeline.querySelectorAll("ea-timeline-item").length).toBe(3);
    });

    it("空时间线应该正常渲染", async () => {
      const timeline = document.createElement("ea-timeline");
      container.appendChild(timeline);
      await waitForRender();
      expect(
        timeline.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });
  });

  describe("生命周期", () => {
    it("组件连接后应该正确初始化 Shadow DOM", async () => {
      const timeline = document.createElement("ea-timeline");
      container.appendChild(timeline);
      await waitForRender();
      expect(timeline.shadowRoot).toBeDefined();
      expect(
        timeline.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("组件断开连接后应该正常移除", async () => {
      const timeline = document.createElement("ea-timeline");
      container.appendChild(timeline);
      await waitForRender();
      timeline.remove();
      expect(container.contains(timeline)).toBe(false);
    });

    it("组件重新连接后应该正常工作", async () => {
      const timeline = document.createElement("ea-timeline");
      container.appendChild(timeline);
      await waitForRender();
      timeline.remove();
      container.appendChild(timeline);
      await waitForRender();
      expect(timeline.shadowRoot).toBeDefined();
    });

    it("动态添加 timeline-item 应该生效", async () => {
      const timeline = document.createElement("ea-timeline");
      timeline.innerHTML = `<ea-timeline-item>Item 1</ea-timeline-item>`;
      container.appendChild(timeline);
      await waitForRender();

      const newItem = document.createElement("ea-timeline-item");
      newItem.textContent = "Item 2";
      timeline.appendChild(newItem);
      await waitForRender();
      expect(timeline.querySelectorAll("ea-timeline-item").length).toBe(2);
    });

    it("动态移除 timeline-item 应该生效", async () => {
      const timeline = document.createElement("ea-timeline");
      timeline.innerHTML = `
        <ea-timeline-item>Item 1</ea-timeline-item>
        <ea-timeline-item>Item 2</ea-timeline-item>
      `;
      container.appendChild(timeline);
      await waitForRender();

      timeline.querySelectorAll("ea-timeline-item")[1].remove();
      await waitForRender();
      expect(timeline.querySelectorAll("ea-timeline-item").length).toBe(1);
    });
  });

  describe("多实例独立性", () => {
    it("多个时间线应该独立工作", async () => {
      const timeline1 = document.createElement("ea-timeline");
      timeline1.innerHTML = `<ea-timeline-item variant="primary">Item 1</ea-timeline-item>`;
      const timeline2 = document.createElement("ea-timeline");
      timeline2.innerHTML = `<ea-timeline-item variant="success">Item 2</ea-timeline-item>`;

      container.appendChild(timeline1);
      container.appendChild(timeline2);
      await waitForRender();

      expect(timeline1.querySelector("ea-timeline-item").variant).toBe(
        "primary"
      );
      expect(timeline2.querySelector("ea-timeline-item").variant).toBe(
        "success"
      );
    });
  });
});

describe("EaTimelineItem", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("自定义元素注册", () => {
    it("应该正确注册 ea-timeline-item 自定义元素", () => {
      expect(customElements.get("ea-timeline-item")).toBeDefined();
    });

    it("创建的元素应该是 ea-timeline-item 自定义元素实例", () => {
      const item = document.createElement("ea-timeline-item");
      expect(item instanceof customElements.get("ea-timeline-item")).toBe(true);
    });
  });

  describe("Shadow DOM", () => {
    it("应该创建 open 模式的 Shadow DOM", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);
      await waitForRender();
      expect(item.shadowRoot).toBeDefined();
      expect(item.shadowRoot.mode).toBe("open");
    });
  });

  describe("CSS Parts", () => {
    const expectedParts = [
      { name: "container", tag: "div" },
      { name: "left-wrapper", tag: "aside" },
      { name: "dot", tag: "section" },
      { name: "tail", tag: "section" },
      { name: "right-wrapper", tag: "main" },
      { name: "content", tag: "header" },
      { name: "timestamp", tag: "footer" },
    ];

    expectedParts.forEach(({ name, tag }) => {
      it(`应该包含 ${name} CSS Part 且在 ${tag} 元素上`, async () => {
        const item = document.createElement("ea-timeline-item");
        container.appendChild(item);
        await waitForRender();
        const el = item.shadowRoot.querySelector(`[part="${name}"]`);
        expect(el).toBeTruthy();
        expect(el.tagName.toLowerCase()).toBe(tag);
      });
    });

    it("默认状态下不应包含 icon-dot CSS Part", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);
      await waitForRender();
      expect(item.shadowRoot.querySelector('[part="icon-dot"]')).toBeFalsy();
    });

    it("设置 icon 后 dot 内应该包含带 icon-dot CSS Part 的 ea-icon", async () => {
      const item = document.createElement("ea-timeline-item");
      item.icon = "mug-hot";
      container.appendChild(item);
      await waitForRender();
      const dotEl = item.shadowRoot.querySelector('[part="dot"]');
      const iconEl = dotEl.querySelector("ea-icon");
      expect(iconEl).toBeTruthy();
      expect(iconEl.getAttribute("part")).toContain("icon-dot");
    });
  });

  describe("BEM 类名", () => {
    it("容器应该有 ea-timeline-item BEM 块类名", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);
      await waitForRender();
      const el = item.shadowRoot.querySelector('[part="container"]');
      expect(el.classList.contains("ea-timeline-item")).toBe(true);
    });

    const expectedElements = [
      { part: "left-wrapper", className: "ea-timeline-item__wrapper" },
      { part: "dot", className: "ea-timeline-item__dot" },
      { part: "tail", className: "ea-timeline-item__tail" },
      { part: "right-wrapper", className: "ea-timeline-item__wrapper" },
      { part: "right-wrapper", className: "ea-timeline-item__right-wrapper" },
      { part: "content", className: "ea-timeline-item__content" },
      { part: "timestamp", className: "ea-timeline-item__timestamp" },
    ];

    expectedElements.forEach(({ part, className }) => {
      it(`${part} 应该有 ${className} BEM 元素类名`, async () => {
        const item = document.createElement("ea-timeline-item");
        container.appendChild(item);
        await waitForRender();
        const el = item.shadowRoot.querySelector(`[part="${part}"]`);
        expect(el.classList.contains(className)).toBe(true);
      });
    });

    it("设置 icon 后 ea-icon 应该有 ea-timeline-item__icon-dot BEM 元素类名", async () => {
      const item = document.createElement("ea-timeline-item");
      item.icon = "mug-hot";
      container.appendChild(item);
      await waitForRender();
      const iconEl = item.shadowRoot
        .querySelector('[part="dot"]')
        .querySelector("ea-icon");
      expect(iconEl.classList.contains("ea-timeline-item__icon-dot")).toBe(
        true
      );
    });
  });

  describe("DOM 结构", () => {
    it("container 应该包含 left-wrapper 和 right-wrapper", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);
      await waitForRender();
      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.querySelector('[part="left-wrapper"]')).toBeTruthy();
      expect(containerEl.querySelector('[part="right-wrapper"]')).toBeTruthy();
    });

    it("left-wrapper 和 right-wrapper 应该是 container 的直接子元素", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);
      await waitForRender();
      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      const directChildren = Array.from(containerEl.children);
      expect(directChildren).toContain(
        item.shadowRoot.querySelector('[part="left-wrapper"]')
      );
      expect(directChildren).toContain(
        item.shadowRoot.querySelector('[part="right-wrapper"]')
      );
    });

    it("left-wrapper 应该包含 dot slot 和 tail", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);
      await waitForRender();
      const leftWrapper = item.shadowRoot.querySelector(
        '[part="left-wrapper"]'
      );
      expect(leftWrapper.querySelector('slot[name="dot"]')).toBeTruthy();
      expect(leftWrapper.querySelector('[part="dot"]')).toBeTruthy();
      expect(leftWrapper.querySelector('[part="tail"]')).toBeTruthy();
    });

    it("dot 应该在 slot[name='dot'] 内部作为默认内容", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);
      await waitForRender();
      const dotSlot = item.shadowRoot.querySelector('slot[name="dot"]');
      expect(dotSlot.querySelector('[part="dot"]')).toBeTruthy();
    });

    it("right-wrapper 应该包含 content 和 timestamp", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);
      await waitForRender();
      const rightWrapper = item.shadowRoot.querySelector(
        '[part="right-wrapper"]'
      );
      expect(rightWrapper.querySelector('[part="content"]')).toBeTruthy();
      expect(rightWrapper.querySelector('[part="timestamp"]')).toBeTruthy();
    });

    it("content 应该包含默认 slot", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);
      await waitForRender();
      const contentEl = item.shadowRoot.querySelector('[part="content"]');
      expect(contentEl.querySelector("slot:not([name])")).toBeTruthy();
    });

    it("timestamp 应该包含 timestamp slot", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);
      await waitForRender();
      const timestampEl = item.shadowRoot.querySelector('[part="timestamp"]');
      expect(timestampEl.querySelector('slot[name="timestamp"]')).toBeTruthy();
    });
  });

  describe("variant 属性", () => {
    const variants = ["primary", "success", "warning", "danger", "info"];

    it("默认 variant 应该是空字符串", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);
      await waitForRender();
      expect(item.variant).toBe("");
    });

    variants.forEach(v => {
      it(`应该支持 variant='${v}'`, async () => {
        const item = document.createElement("ea-timeline-item");
        item.variant = v;
        container.appendChild(item);
        await waitForRender();
        expect(item.variant).toBe(v);
      });

      it(`variant='${v}' 应该添加 ea-timeline-item--${v} 修饰符类名`, async () => {
        const item = document.createElement("ea-timeline-item");
        item.variant = v;
        container.appendChild(item);
        await waitForRender();
        const containerEl = item.shadowRoot.querySelector('[part="container"]');
        expect(containerEl.classList.contains(`ea-timeline-item--${v}`)).toBe(
          true
        );
      });
    });

    it("variant 应该通过 setAttribute 设置", async () => {
      const item = document.createElement("ea-timeline-item");
      item.setAttribute("variant", "primary");
      container.appendChild(item);
      await waitForRender();
      expect(item.variant).toBe("primary");
    });

    it("variant 为空时不应添加任何 variant 修饰符类名", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);
      await waitForRender();
      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      variants.forEach(v => {
        expect(containerEl.classList.contains(`ea-timeline-item--${v}`)).toBe(
          false
        );
      });
    });

    it("variant 从 primary 变为 danger 时应该正确更新类名", async () => {
      const item = document.createElement("ea-timeline-item");
      item.variant = "primary";
      container.appendChild(item);
      await waitForRender();

      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-timeline-item--primary")).toBe(
        true
      );

      item.variant = "danger";
      await waitForRender();
      expect(containerEl.classList.contains("ea-timeline-item--primary")).toBe(
        false
      );
      expect(containerEl.classList.contains("ea-timeline-item--danger")).toBe(
        true
      );
    });

    it("variant 从有值变为空字符串时应该移除修饰符类名", async () => {
      const item = document.createElement("ea-timeline-item");
      item.variant = "primary";
      container.appendChild(item);
      await waitForRender();

      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-timeline-item--primary")).toBe(
        true
      );

      item.variant = "";
      await waitForRender();
      expect(containerEl.classList.contains("ea-timeline-item--primary")).toBe(
        false
      );
    });

    it("variant 循环切换应该正确更新类名", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);
      await waitForRender();

      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      for (const variant of variants) {
        item.variant = variant;
        await waitForRender();
        variants.forEach(v => {
          expect(containerEl.classList.contains(`ea-timeline-item--${v}`)).toBe(
            v === variant
          );
        });
      }
    });

    it("variant 通过 setAttribute 动态变更应该触发 observer 更新类名", async () => {
      const item = document.createElement("ea-timeline-item");
      item.setAttribute("variant", "success");
      container.appendChild(item);
      await waitForRender();

      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-timeline-item--success")).toBe(
        true
      );

      item.setAttribute("variant", "warning");
      await waitForRender();
      expect(containerEl.classList.contains("ea-timeline-item--success")).toBe(
        false
      );
      expect(containerEl.classList.contains("ea-timeline-item--warning")).toBe(
        true
      );
    });
  });

  describe("timestamp 属性", () => {
    it("默认 timestamp 应该是空字符串", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);
      await waitForRender();
      expect(item.timestamp).toBe("");
    });

    it("应该支持 timestamp 属性", async () => {
      const item = document.createElement("ea-timeline-item");
      item.timestamp = "2024-7-1";
      container.appendChild(item);
      await waitForRender();
      expect(item.timestamp).toBe("2024-7-1");
    });

    it("timestamp 应该通过 setAttribute 设置", async () => {
      const item = document.createElement("ea-timeline-item");
      item.setAttribute("timestamp", "2024-7-1");
      container.appendChild(item);
      await waitForRender();
      expect(item.timestamp).toBe("2024-7-1");
    });

    it("timestamp 变化时应该更新 timestamp slot 容器内容", async () => {
      const item = document.createElement("ea-timeline-item");
      item.timestamp = "2024-7-1";
      container.appendChild(item);
      await waitForRender();

      const timestampSlot = item.shadowRoot.querySelector(
        'slot[name="timestamp"]'
      );
      expect(timestampSlot.textContent).toBe("2024-7-1");

      item.timestamp = "2024-7-2";
      await waitForRender();
      expect(timestampSlot.textContent).toBe("2024-7-2");
    });

    it("timestamp 设置为空字符串应该清空内容", async () => {
      const item = document.createElement("ea-timeline-item");
      item.timestamp = "2024-7-1";
      container.appendChild(item);
      await waitForRender();

      const timestampSlot = item.shadowRoot.querySelector(
        'slot[name="timestamp"]'
      );
      expect(timestampSlot.textContent).toBe("2024-7-1");

      item.timestamp = "";
      await waitForRender();
      expect(timestampSlot.textContent).toBe("");
    });

    it("timestamp 支持中文内容", async () => {
      const item = document.createElement("ea-timeline-item");
      item.timestamp = "2024年7月1日";
      container.appendChild(item);
      await waitForRender();
      expect(
        item.shadowRoot.querySelector('slot[name="timestamp"]').textContent
      ).toBe("2024年7月1日");
    });

    it("timestamp 支持长文本", async () => {
      const longText = "2024-07-01 12:30:45 UTC+8";
      const item = document.createElement("ea-timeline-item");
      item.timestamp = longText;
      container.appendChild(item);
      await waitForRender();
      expect(
        item.shadowRoot.querySelector('slot[name="timestamp"]').textContent
      ).toBe(longText);
    });

    it("timestamp 通过 setAttribute 动态变更应该触发 observer 更新内容", async () => {
      const item = document.createElement("ea-timeline-item");
      item.setAttribute("timestamp", "2024-1-1");
      container.appendChild(item);
      await waitForRender();

      const timestampSlot = item.shadowRoot.querySelector(
        'slot[name="timestamp"]'
      );
      expect(timestampSlot.textContent).toBe("2024-1-1");

      item.setAttribute("timestamp", "2024-12-31");
      await waitForRender();
      expect(timestampSlot.textContent).toBe("2024-12-31");
    });
  });

  describe("hideTimestamp 属性", () => {
    it("默认 hideTimestamp 应该是 false", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);
      await waitForRender();
      expect(item.hideTimestamp).toBe(false);
    });

    it("设置 hideTimestamp 为 true 应该添加 is-hide-timestamp 状态类名", async () => {
      const item = document.createElement("ea-timeline-item");
      item.hideTimestamp = true;
      container.appendChild(item);
      await waitForRender();
      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-hide-timestamp")).toBe(true);
    });

    it("hideTimestamp 为 false 时不应添加 hide-timestamp 状态类名", async () => {
      const item = document.createElement("ea-timeline-item");
      item.hideTimestamp = false;
      container.appendChild(item);
      await waitForRender();
      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-hide-timestamp")).toBe(false);
    });

    it("hideTimestamp 应该通过 setAttribute 设置", async () => {
      const item = document.createElement("ea-timeline-item");
      item.setAttribute("hide-timestamp", "");
      container.appendChild(item);
      await waitForRender();
      expect(item.hideTimestamp).toBe(true);
    });

    it("hideTimestamp 从 true 变为 false 应该移除 is-hide-timestamp 状态类名", async () => {
      const item = document.createElement("ea-timeline-item");
      item.hideTimestamp = true;
      container.appendChild(item);
      await waitForRender();

      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-hide-timestamp")).toBe(true);

      item.hideTimestamp = false;
      await waitForRender();
      expect(containerEl.classList.contains("is-hide-timestamp")).toBe(false);
    });

    it("hideTimestamp 从 false 变为 true 应该添加 is-hide-timestamp 状态类名", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);
      await waitForRender();

      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-hide-timestamp")).toBe(false);

      item.hideTimestamp = true;
      await waitForRender();
      expect(containerEl.classList.contains("is-hide-timestamp")).toBe(true);
    });
  });

  describe("color 属性", () => {
    it("默认 color 应该是空字符串", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);
      await waitForRender();
      expect(item.color).toBe("");
    });

    it("设置 color 应该更新 dot 的 borderColor", async () => {
      const item = document.createElement("ea-timeline-item");
      item.color = "#0bbd87";
      container.appendChild(item);
      await waitForRender();
      const dot = item.shadowRoot.querySelector('[part="dot"]');
      expect(dot.style.borderColor).toBeTruthy();
    });

    it("设置 color 应该设置 CSS 变量 --ea-timeline-item-dot-color", async () => {
      const item = document.createElement("ea-timeline-item");
      item.color = "#0bbd87";
      container.appendChild(item);
      await waitForRender();
      expect(
        item.style.getPropertyValue("--ea-timeline-item-dot-color")
      ).toBeTruthy();
    });

    it("color 应该通过 setAttribute 设置", async () => {
      const item = document.createElement("ea-timeline-item");
      item.setAttribute("color", "#ff0000");
      container.appendChild(item);
      await waitForRender();
      expect(item.color).toBe("#ff0000");
    });

    it("动态修改 color 应该更新 dot 的 borderColor", async () => {
      const item = document.createElement("ea-timeline-item");
      item.color = "#0bbd87";
      container.appendChild(item);
      await waitForRender();

      const dot = item.shadowRoot.querySelector('[part="dot"]');
      const initialBorderColor = dot.style.borderColor;
      expect(initialBorderColor).toBeTruthy();

      item.color = "#ff0000";
      await waitForRender();
      expect(dot.style.borderColor).toBeTruthy();
      expect(dot.style.borderColor).not.toBe(initialBorderColor);
    });

    it("color 设置为空字符串时应该清除 borderColor 和 CSS 变量", async () => {
      const item = document.createElement("ea-timeline-item");
      item.color = "#0bbd87";
      container.appendChild(item);
      await waitForRender();

      const dot = item.shadowRoot.querySelector('[part="dot"]');
      expect(dot.style.borderColor).toBeTruthy();

      item.color = "";
      await waitForRender();
      expect(dot.style.borderColor).toBeFalsy();
      expect(
        item.style.getPropertyValue("--ea-timeline-item-dot-color")
      ).toBeFalsy();
    });
  });

  describe("hollow 属性", () => {
    it("默认 hollow 应该是 false", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);
      await waitForRender();
      expect(item.hollow).toBe(false);
    });

    it("设置 hollow 为 true 应该添加 is-hollow-dot 状态类名", async () => {
      const item = document.createElement("ea-timeline-item");
      item.hollow = true;
      container.appendChild(item);
      await waitForRender();
      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-hollow-dot")).toBe(true);
    });

    it("hollow 为 false 时不应添加 hollow-dot 状态类名", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);
      await waitForRender();
      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-hollow-dot")).toBe(false);
    });

    it("hollow 应该通过 setAttribute 设置", async () => {
      const item = document.createElement("ea-timeline-item");
      item.setAttribute("hollow", "");
      container.appendChild(item);
      await waitForRender();
      expect(item.hollow).toBe(true);
    });

    it("hollow 从 true 变为 false 应该移除 is-hollow-dot 状态类名", async () => {
      const item = document.createElement("ea-timeline-item");
      item.hollow = true;
      container.appendChild(item);
      await waitForRender();

      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-hollow-dot")).toBe(true);

      item.hollow = false;
      await waitForRender();
      expect(containerEl.classList.contains("is-hollow-dot")).toBe(false);
    });

    it("hollow 从 false 变为 true 应该添加 is-hollow-dot 状态类名", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);
      await waitForRender();

      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-hollow-dot")).toBe(false);

      item.hollow = true;
      await waitForRender();
      expect(containerEl.classList.contains("is-hollow-dot")).toBe(true);
    });
  });

  describe("icon 属性", () => {
    it("默认 icon 应该是空字符串", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);
      await waitForRender();
      expect(item.icon).toBe("");
    });

    it("设置 icon 后 dot 内应该包含 ea-icon 元素", async () => {
      const item = document.createElement("ea-timeline-item");
      item.icon = "mug-hot";
      container.appendChild(item);
      await waitForRender();
      const dotEl = item.shadowRoot.querySelector('[part="dot"]');
      const iconEl = dotEl.querySelector("ea-icon");
      expect(iconEl).toBeTruthy();
    });

    it("设置 icon 后 ea-icon 的 name 属性应该正确", async () => {
      const item = document.createElement("ea-timeline-item");
      item.icon = "mug-hot";
      container.appendChild(item);
      await waitForRender();
      const iconEl = item.shadowRoot
        .querySelector('[part="dot"]')
        .querySelector("ea-icon");
      expect(iconEl.getAttribute("name")).toBe("mug-hot");
    });

    it("icon 应该通过 setAttribute 设置", async () => {
      const item = document.createElement("ea-timeline-item");
      item.setAttribute("icon", "star");
      container.appendChild(item);
      await waitForRender();
      expect(item.icon).toBe("star");
    });

    it("动态修改 icon 应该更新 ea-icon 的 name 属性", async () => {
      const item = document.createElement("ea-timeline-item");
      item.icon = "mug-hot";
      container.appendChild(item);
      await waitForRender();

      item.icon = "star";
      await waitForRender();
      const iconEl = item.shadowRoot
        .querySelector('[part="dot"]')
        .querySelector("ea-icon");
      expect(iconEl.getAttribute("name")).toBe("star");
    });

    it("icon 设置为空字符串后应该移除 ea-icon", async () => {
      const item = document.createElement("ea-timeline-item");
      item.icon = "mug-hot";
      container.appendChild(item);
      await waitForRender();

      const dotEl = item.shadowRoot.querySelector('[part="dot"]');
      expect(dotEl.querySelector("ea-icon")).toBeTruthy();

      item.icon = "";
      await waitForRender();
      expect(dotEl.querySelector("ea-icon")).toBeFalsy();
    });

    it("设置 icon 后 ea-icon 应该有 icon-dot CSS Part", async () => {
      const item = document.createElement("ea-timeline-item");
      item.icon = "mug-hot";
      container.appendChild(item);
      await waitForRender();
      const iconEl = item.shadowRoot
        .querySelector('[part="dot"]')
        .querySelector("ea-icon");
      expect(iconEl.getAttribute("part")).toContain("icon-dot");
    });
  });

  describe("size 属性", () => {
    it("默认 size 应该是空字符串", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);
      await waitForRender();
      expect(item.size).toBe("");
    });

    it("应该支持 size='normal'", async () => {
      const item = document.createElement("ea-timeline-item");
      item.size = "normal";
      container.appendChild(item);
      await waitForRender();
      expect(item.size).toBe("normal");
    });

    it("应该支持 size='large'", async () => {
      const item = document.createElement("ea-timeline-item");
      item.size = "large";
      container.appendChild(item);
      await waitForRender();
      expect(item.size).toBe("large");
    });

    it("size='large' 应该添加 ea-timeline-item--large 修饰符类名", async () => {
      const item = document.createElement("ea-timeline-item");
      item.size = "large";
      container.appendChild(item);
      await waitForRender();
      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-timeline-item--large")).toBe(
        true
      );
    });

    it("size='normal' 应该添加 ea-timeline-item--normal 修饰符类名", async () => {
      const item = document.createElement("ea-timeline-item");
      item.size = "normal";
      container.appendChild(item);
      await waitForRender();
      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-timeline-item--normal")).toBe(
        true
      );
    });

    it("size 应该通过 setAttribute 设置", async () => {
      const item = document.createElement("ea-timeline-item");
      item.setAttribute("size", "large");
      container.appendChild(item);
      await waitForRender();
      expect(item.size).toBe("large");
    });

    it("size 从 large 变为空字符串应该移除 large 修饰符类名", async () => {
      const item = document.createElement("ea-timeline-item");
      item.size = "large";
      container.appendChild(item);
      await waitForRender();

      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-timeline-item--large")).toBe(
        true
      );

      item.size = "";
      await waitForRender();
      expect(containerEl.classList.contains("ea-timeline-item--large")).toBe(
        false
      );
    });

    it("size 从 normal 变为 large 应该正确更新类名", async () => {
      const item = document.createElement("ea-timeline-item");
      item.size = "normal";
      container.appendChild(item);
      await waitForRender();

      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-timeline-item--normal")).toBe(
        true
      );

      item.size = "large";
      await waitForRender();
      expect(containerEl.classList.contains("ea-timeline-item--normal")).toBe(
        false
      );
      expect(containerEl.classList.contains("ea-timeline-item--large")).toBe(
        true
      );
    });
  });

  describe("placement 属性", () => {
    it("默认 placement 应该是空字符串", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);
      await waitForRender();
      expect(item.placement).toBe("");
    });

    it("应该支持 placement='top'", async () => {
      const item = document.createElement("ea-timeline-item");
      item.placement = "top";
      container.appendChild(item);
      await waitForRender();
      expect(item.placement).toBe("top");
    });

    it("应该支持 placement='bottom'", async () => {
      const item = document.createElement("ea-timeline-item");
      item.placement = "bottom";
      container.appendChild(item);
      await waitForRender();
      expect(item.placement).toBe("bottom");
    });

    it("placement='top' 应该添加 ea-timeline-item--top 修饰符类名", async () => {
      const item = document.createElement("ea-timeline-item");
      item.placement = "top";
      container.appendChild(item);
      await waitForRender();
      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-timeline-item--top")).toBe(
        true
      );
    });

    it("placement='bottom' 应该添加 ea-timeline-item--bottom 修饰符类名", async () => {
      const item = document.createElement("ea-timeline-item");
      item.placement = "bottom";
      container.appendChild(item);
      await waitForRender();
      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-timeline-item--bottom")).toBe(
        true
      );
    });

    it("placement 应该通过 setAttribute 设置", async () => {
      const item = document.createElement("ea-timeline-item");
      item.setAttribute("placement", "top");
      container.appendChild(item);
      await waitForRender();
      expect(item.placement).toBe("top");
    });

    it("placement 从 top 变为 bottom 应该正确更新类名", async () => {
      const item = document.createElement("ea-timeline-item");
      item.placement = "top";
      container.appendChild(item);
      await waitForRender();

      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-timeline-item--top")).toBe(
        true
      );

      item.placement = "bottom";
      await waitForRender();
      expect(containerEl.classList.contains("ea-timeline-item--top")).toBe(
        false
      );
      expect(containerEl.classList.contains("ea-timeline-item--bottom")).toBe(
        true
      );
    });

    it("placement 从有值变为空字符串应该移除修饰符类名", async () => {
      const item = document.createElement("ea-timeline-item");
      item.placement = "top";
      container.appendChild(item);
      await waitForRender();

      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-timeline-item--top")).toBe(
        true
      );

      item.placement = "";
      await waitForRender();
      expect(containerEl.classList.contains("ea-timeline-item--top")).toBe(
        false
      );
    });
  });

  describe("center 属性", () => {
    it("默认 center 应该是 false", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);
      await waitForRender();
      expect(item.center).toBe(false);
    });

    it("设置 center 为 true 应该添加 ea-timeline-item--center 修饰符类名", async () => {
      const item = document.createElement("ea-timeline-item");
      item.center = true;
      container.appendChild(item);
      await waitForRender();
      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-timeline-item--center")).toBe(
        true
      );
    });

    it("center 为 false 时不应添加 center 修饰符类名", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);
      await waitForRender();
      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-timeline-item--center")).toBe(
        false
      );
    });

    it("center 应该通过 setAttribute 设置", async () => {
      const item = document.createElement("ea-timeline-item");
      item.setAttribute("center", "");
      container.appendChild(item);
      await waitForRender();
      expect(item.center).toBe(true);
    });

    it("center 从 true 变为 false 应该移除 center 修饰符类名", async () => {
      const item = document.createElement("ea-timeline-item");
      item.center = true;
      container.appendChild(item);
      await waitForRender();

      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-timeline-item--center")).toBe(
        true
      );

      item.center = false;
      await waitForRender();
      expect(containerEl.classList.contains("ea-timeline-item--center")).toBe(
        false
      );
    });

    it("center 从 false 变为 true 应该添加 center 修饰符类名", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);
      await waitForRender();

      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-timeline-item--center")).toBe(
        false
      );

      item.center = true;
      await waitForRender();
      expect(containerEl.classList.contains("ea-timeline-item--center")).toBe(
        true
      );
    });
  });

  describe("Slots", () => {
    it("默认 slot 应该在 content 元素内", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);
      await waitForRender();
      const contentEl = item.shadowRoot.querySelector('[part="content"]');
      expect(contentEl.querySelector("slot:not([name])")).toBeTruthy();
    });

    it("dot slot 应该在 left-wrapper 内", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);
      await waitForRender();
      const leftWrapper = item.shadowRoot.querySelector(
        '[part="left-wrapper"]'
      );
      expect(leftWrapper.querySelector('slot[name="dot"]')).toBeTruthy();
    });

    it("timestamp slot 应该在 timestamp 元素内", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);
      await waitForRender();
      const timestampEl = item.shadowRoot.querySelector('[part="timestamp"]');
      expect(timestampEl.querySelector('slot[name="timestamp"]')).toBeTruthy();
    });

    it("默认 slot 应该无 name 属性", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);
      await waitForRender();
      const slot = item.shadowRoot.querySelector("slot:not([name])");
      expect(slot.hasAttribute("name")).toBe(false);
    });
  });

  describe("updateContainerClasslist 方法", () => {
    it("默认状态下容器应该只有 ea-timeline-item 块类名", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);
      await waitForRender();
      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-timeline-item")).toBe(true);
    });

    it("多个修饰属性同时设置应该正确生成组合类名", async () => {
      const item = document.createElement("ea-timeline-item");
      item.variant = "primary";
      item.size = "large";
      item.center = true;
      container.appendChild(item);
      await waitForRender();

      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-timeline-item")).toBe(true);
      expect(containerEl.classList.contains("ea-timeline-item--primary")).toBe(
        true
      );
      expect(containerEl.classList.contains("ea-timeline-item--large")).toBe(
        true
      );
      expect(containerEl.classList.contains("ea-timeline-item--center")).toBe(
        true
      );
    });

    it("hollow 和 variant 同时设置应该正确生成组合类名", async () => {
      const item = document.createElement("ea-timeline-item");
      item.variant = "danger";
      item.hollow = true;
      container.appendChild(item);
      await waitForRender();

      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-timeline-item--danger")).toBe(
        true
      );
      expect(containerEl.classList.contains("is-hollow-dot")).toBe(true);
    });

    it("所有属性同时设置应该正确生成组合类名", async () => {
      const item = document.createElement("ea-timeline-item");
      item.variant = "warning";
      item.size = "large";
      item.placement = "top";
      item.center = true;
      item.hollow = true;
      item.hideTimestamp = true;
      container.appendChild(item);
      await waitForRender();

      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-timeline-item")).toBe(true);
      expect(containerEl.classList.contains("ea-timeline-item--warning")).toBe(
        true
      );
      expect(containerEl.classList.contains("ea-timeline-item--large")).toBe(
        true
      );
      expect(containerEl.classList.contains("ea-timeline-item--top")).toBe(
        true
      );
      expect(containerEl.classList.contains("ea-timeline-item--center")).toBe(
        true
      );
      expect(containerEl.classList.contains("is-hollow-dot")).toBe(true);
      expect(containerEl.classList.contains("is-hide-timestamp")).toBe(true);
    });
  });

  describe("Observer 行为", () => {
    it("variant observer 应该在属性变化时调用 updateContainerClasslist", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);
      await waitForRender();

      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-timeline-item--primary")).toBe(
        false
      );

      item.variant = "primary";
      await waitForRender();
      expect(containerEl.classList.contains("ea-timeline-item--primary")).toBe(
        true
      );
    });

    it("timestamp observer 应该在属性变化时更新 timestamp slot 内容", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);
      await waitForRender();

      const timestampSlot = item.shadowRoot.querySelector(
        'slot[name="timestamp"]'
      );
      expect(timestampSlot.textContent).toBe("");

      item.timestamp = "2024-7-1";
      await waitForRender();
      expect(timestampSlot.textContent).toBe("2024-7-1");
    });

    it("hideTimestamp observer 应该在属性变化时更新状态类名", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);
      await waitForRender();

      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-hide-timestamp")).toBe(false);

      item.hideTimestamp = true;
      await waitForRender();
      expect(containerEl.classList.contains("is-hide-timestamp")).toBe(true);
    });

    it("color observer 应该在属性变化时更新 dot 的 borderColor", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);
      await waitForRender();

      const dot = item.shadowRoot.querySelector('[part="dot"]');
      expect(dot.style.borderColor).toBeFalsy();

      item.color = "#0bbd87";
      await waitForRender();
      expect(dot.style.borderColor).toBeTruthy();
    });

    it("hollow observer 应该在属性变化时更新容器类名", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);
      await waitForRender();

      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("is-hollow-dot")).toBe(false);

      item.hollow = true;
      await waitForRender();
      expect(containerEl.classList.contains("is-hollow-dot")).toBe(true);
    });

    it("icon observer 应该在属性变化时更新 dot 的 innerHTML", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);
      await waitForRender();

      const dot = item.shadowRoot.querySelector('[part="dot"]');
      expect(dot.querySelector("ea-icon")).toBeFalsy();

      item.icon = "mug-hot";
      await waitForRender();
      expect(dot.querySelector("ea-icon")).toBeTruthy();
    });

    it("size observer 应该在属性变化时更新容器类名", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);
      await waitForRender();

      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-timeline-item--large")).toBe(
        false
      );

      item.size = "large";
      await waitForRender();
      expect(containerEl.classList.contains("ea-timeline-item--large")).toBe(
        true
      );
    });

    it("placement observer 应该在属性变化时更新容器类名", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);
      await waitForRender();

      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-timeline-item--top")).toBe(
        false
      );

      item.placement = "top";
      await waitForRender();
      expect(containerEl.classList.contains("ea-timeline-item--top")).toBe(
        true
      );
    });

    it("center observer 应该在属性变化时更新容器类名", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);
      await waitForRender();

      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-timeline-item--center")).toBe(
        false
      );

      item.center = true;
      await waitForRender();
      expect(containerEl.classList.contains("ea-timeline-item--center")).toBe(
        true
      );
    });
  });

  describe("生命周期", () => {
    it("$mount 应该调用 updateContainerClasslist 初始化类名", async () => {
      const item = document.createElement("ea-timeline-item");
      item.variant = "primary";
      container.appendChild(item);
      await waitForRender();

      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-timeline-item--primary")).toBe(
        true
      );
    });

    it("组件断开连接后应该正常移除", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);
      await waitForRender();
      item.remove();
      expect(container.contains(item)).toBe(false);
    });

    it("组件重新连接后应该正常工作", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);
      await waitForRender();
      item.remove();
      container.appendChild(item);
      await waitForRender();
      expect(item.shadowRoot).toBeDefined();
    });
  });

  describe("HTML 属性映射", () => {
    it("variant 属性应该反映为 HTML attribute", async () => {
      const item = document.createElement("ea-timeline-item");
      item.variant = "primary";
      container.appendChild(item);
      await waitForRender();
      expect(item.getAttribute("variant")).toBe("primary");
    });

    it("timestamp 属性应该反映为 HTML attribute", async () => {
      const item = document.createElement("ea-timeline-item");
      item.timestamp = "2024-7-1";
      container.appendChild(item);
      await waitForRender();
      expect(item.getAttribute("timestamp")).toBe("2024-7-1");
    });

    it("hide-timestamp 属性应该反映为 HTML attribute", async () => {
      const item = document.createElement("ea-timeline-item");
      item.hideTimestamp = true;
      container.appendChild(item);
      await waitForRender();
      expect(item.hasAttribute("hide-timestamp")).toBe(true);
    });

    it("color 属性应该反映为 HTML attribute", async () => {
      const item = document.createElement("ea-timeline-item");
      item.color = "#ff0000";
      container.appendChild(item);
      await waitForRender();
      expect(item.getAttribute("color")).toBe("#ff0000");
    });

    it("hollow 属性应该反映为 HTML attribute", async () => {
      const item = document.createElement("ea-timeline-item");
      item.hollow = true;
      container.appendChild(item);
      await waitForRender();
      expect(item.hasAttribute("hollow")).toBe(true);
    });

    it("icon 属性应该反映为 HTML attribute", async () => {
      const item = document.createElement("ea-timeline-item");
      item.icon = "mug-hot";
      container.appendChild(item);
      await waitForRender();
      expect(item.getAttribute("icon")).toBe("mug-hot");
    });

    it("size 属性应该反映为 HTML attribute", async () => {
      const item = document.createElement("ea-timeline-item");
      item.size = "large";
      container.appendChild(item);
      await waitForRender();
      expect(item.getAttribute("size")).toBe("large");
    });

    it("placement 属性应该反映为 HTML attribute", async () => {
      const item = document.createElement("ea-timeline-item");
      item.placement = "top";
      container.appendChild(item);
      await waitForRender();
      expect(item.getAttribute("placement")).toBe("top");
    });

    it("center 属性应该反映为 HTML attribute", async () => {
      const item = document.createElement("ea-timeline-item");
      item.center = true;
      container.appendChild(item);
      await waitForRender();
      expect(item.hasAttribute("center")).toBe(true);
    });
  });

  describe("组合场景", () => {
    it("variant + hollow 应该同时生效", async () => {
      const item = document.createElement("ea-timeline-item");
      item.variant = "primary";
      item.hollow = true;
      container.appendChild(item);
      await waitForRender();

      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-timeline-item--primary")).toBe(
        true
      );
      expect(containerEl.classList.contains("is-hollow-dot")).toBe(true);
    });

    it("variant + color 应该同时生效", async () => {
      const item = document.createElement("ea-timeline-item");
      item.variant = "primary";
      item.color = "#0bbd87";
      container.appendChild(item);
      await waitForRender();

      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      const dot = item.shadowRoot.querySelector('[part="dot"]');
      expect(containerEl.classList.contains("ea-timeline-item--primary")).toBe(
        true
      );
      expect(dot.style.borderColor).toBeTruthy();
    });

    it("variant + icon 应该同时生效", async () => {
      const item = document.createElement("ea-timeline-item");
      item.variant = "success";
      item.icon = "circle-check";
      container.appendChild(item);
      await waitForRender();

      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      const iconEl = item.shadowRoot
        .querySelector('[part="dot"]')
        .querySelector("ea-icon");
      expect(containerEl.classList.contains("ea-timeline-item--success")).toBe(
        true
      );
      expect(iconEl).toBeTruthy();
      expect(iconEl.getAttribute("name")).toBe("circle-check");
    });

    it("size + placement + center 应该同时生效", async () => {
      const item = document.createElement("ea-timeline-item");
      item.size = "large";
      item.placement = "top";
      item.center = true;
      container.appendChild(item);
      await waitForRender();

      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      expect(containerEl.classList.contains("ea-timeline-item--large")).toBe(
        true
      );
      expect(containerEl.classList.contains("ea-timeline-item--top")).toBe(
        true
      );
      expect(containerEl.classList.contains("ea-timeline-item--center")).toBe(
        true
      );
    });

    it("timestamp + hideTimestamp 切换应该正确更新显示状态", async () => {
      const item = document.createElement("ea-timeline-item");
      item.timestamp = "2024-7-1";
      item.hideTimestamp = true;
      container.appendChild(item);
      await waitForRender();

      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      const timestampSlot = item.shadowRoot.querySelector(
        'slot[name="timestamp"]'
      );
      expect(timestampSlot.textContent).toBe("2024-7-1");
      expect(containerEl.classList.contains("is-hide-timestamp")).toBe(true);

      item.hideTimestamp = false;
      await waitForRender();
      expect(timestampSlot.textContent).toBe("2024-7-1");
      expect(containerEl.classList.contains("is-hide-timestamp")).toBe(false);
    });

    it("完整属性组合应该全部生效", async () => {
      const item = document.createElement("ea-timeline-item");
      item.variant = "danger";
      item.timestamp = "2024-7-1";
      item.hideTimestamp = false;
      item.color = "#ff0000";
      item.hollow = true;
      item.icon = "circle-xmark";
      item.size = "large";
      item.placement = "bottom";
      item.center = true;
      container.appendChild(item);
      await waitForRender();

      const containerEl = item.shadowRoot.querySelector('[part="container"]');
      const dot = item.shadowRoot.querySelector('[part="dot"]');
      const timestampSlot = item.shadowRoot.querySelector(
        'slot[name="timestamp"]'
      );

      expect(item.variant).toBe("danger");
      expect(item.timestamp).toBe("2024-7-1");
      expect(item.hideTimestamp).toBe(false);
      expect(item.color).toBe("#ff0000");
      expect(item.hollow).toBe(true);
      expect(item.icon).toBe("circle-xmark");
      expect(item.size).toBe("large");
      expect(item.placement).toBe("bottom");
      expect(item.center).toBe(true);

      expect(containerEl.classList.contains("ea-timeline-item--danger")).toBe(
        true
      );
      expect(containerEl.classList.contains("is-hollow-dot")).toBe(true);
      expect(containerEl.classList.contains("ea-timeline-item--large")).toBe(
        true
      );
      expect(containerEl.classList.contains("ea-timeline-item--bottom")).toBe(
        true
      );
      expect(containerEl.classList.contains("ea-timeline-item--center")).toBe(
        true
      );
      expect(containerEl.classList.contains("is-hide-timestamp")).toBe(false);
      expect(dot.style.borderColor).toBeTruthy();
      expect(dot.querySelector("ea-icon")).toBeTruthy();
      expect(timestampSlot.textContent).toBe("2024-7-1");
    });
  });

  describe("多实例独立性", () => {
    it("不同 variant 的 item 应该独立", async () => {
      const item1 = document.createElement("ea-timeline-item");
      item1.variant = "primary";
      const item2 = document.createElement("ea-timeline-item");
      item2.variant = "danger";

      container.appendChild(item1);
      container.appendChild(item2);
      await waitForRender();

      const container1 = item1.shadowRoot.querySelector('[part="container"]');
      const container2 = item2.shadowRoot.querySelector('[part="container"]');
      expect(container1.classList.contains("ea-timeline-item--primary")).toBe(
        true
      );
      expect(container1.classList.contains("ea-timeline-item--danger")).toBe(
        false
      );
      expect(container2.classList.contains("ea-timeline-item--danger")).toBe(
        true
      );
      expect(container2.classList.contains("ea-timeline-item--primary")).toBe(
        false
      );
    });

    it("不同 timestamp 的 item 应该独立", async () => {
      const item1 = document.createElement("ea-timeline-item");
      item1.timestamp = "2024-1-1";
      const item2 = document.createElement("ea-timeline-item");
      item2.timestamp = "2024-12-31";

      container.appendChild(item1);
      container.appendChild(item2);
      await waitForRender();

      expect(
        item1.shadowRoot.querySelector('slot[name="timestamp"]').textContent
      ).toBe("2024-1-1");
      expect(
        item2.shadowRoot.querySelector('slot[name="timestamp"]').textContent
      ).toBe("2024-12-31");
    });

    it("修改一个 item 的属性不应影响另一个", async () => {
      const item1 = document.createElement("ea-timeline-item");
      item1.variant = "primary";
      const item2 = document.createElement("ea-timeline-item");
      item2.variant = "success";

      container.appendChild(item1);
      container.appendChild(item2);
      await waitForRender();

      item1.variant = "warning";
      await waitForRender();

      const container1 = item1.shadowRoot.querySelector('[part="container"]');
      const container2 = item2.shadowRoot.querySelector('[part="container"]');
      expect(container1.classList.contains("ea-timeline-item--warning")).toBe(
        true
      );
      expect(container2.classList.contains("ea-timeline-item--success")).toBe(
        true
      );
    });
  });

  describe("在 ea-timeline 中的集成", () => {
    it("在 timeline 中渲染多个 item 应该正常工作", async () => {
      const timeline = document.createElement("ea-timeline");
      timeline.innerHTML = `
        <ea-timeline-item variant="primary" timestamp="Step 1">创建项目</ea-timeline-item>
        <ea-timeline-item variant="success" timestamp="Step 2">通过审核</ea-timeline-item>
        <ea-timeline-item variant="danger" timestamp="Step 3">项目上线</ea-timeline-item>
      `;
      container.appendChild(timeline);
      await waitForRender();

      const items = timeline.querySelectorAll("ea-timeline-item");
      expect(items.length).toBe(3);
      expect(items[0].variant).toBe("primary");
      expect(items[1].variant).toBe("success");
      expect(items[2].variant).toBe("danger");
    });

    it("在 timeline 中 item 的属性应该独立设置", async () => {
      const timeline = document.createElement("ea-timeline");
      timeline.innerHTML = `
        <ea-timeline-item variant="primary" size="large">Large Primary</ea-timeline-item>
        <ea-timeline-item variant="success" hollow>Hollow Success</ea-timeline-item>
      `;
      container.appendChild(timeline);
      await waitForRender();

      const items = timeline.querySelectorAll("ea-timeline-item");
      expect(items[0].variant).toBe("primary");
      expect(items[0].size).toBe("large");
      expect(items[0].hollow).toBe(false);
      expect(items[1].variant).toBe("success");
      expect(items[1].hollow).toBe(true);
      expect(items[1].size).toBe("");
    });

    it("动态添加 item 到 timeline 应该正常工作", async () => {
      const timeline = document.createElement("ea-timeline");
      timeline.innerHTML = `<ea-timeline-item>Item 1</ea-timeline-item>`;
      container.appendChild(timeline);
      await waitForRender();

      const newItem = document.createElement("ea-timeline-item");
      newItem.variant = "primary";
      newItem.timestamp = "2024-7-1";
      newItem.textContent = "Item 2";
      timeline.appendChild(newItem);
      await waitForRender();

      expect(timeline.querySelectorAll("ea-timeline-item").length).toBe(2);
      expect(newItem.variant).toBe("primary");
      expect(newItem.timestamp).toBe("2024-7-1");
    });
  });
});
