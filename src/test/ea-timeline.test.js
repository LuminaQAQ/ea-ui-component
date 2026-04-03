import { describe, it, expect, beforeEach, afterEach } from "vitest";

// Mock CSS.supports for JSDOM environment
if (typeof CSS === "undefined") {
  global.CSS = {
    supports: () => true,
  };
} else if (!CSS.supports) {
  CSS.supports = () => true;
}

// 导入 ea-timeline 组件及其子组件
import "../components/ea-timeline/index.js";

describe("EaTimeline and EaTimelineItem Components", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  /**
   * EaTimeline 基本功能测试
   */
  describe("EaTimeline Basic Functionality", () => {
    it("应该正确渲染 ea-timeline 组件", async () => {
      const timeline = document.createElement("ea-timeline");
      container.appendChild(timeline);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(timeline).toBeDefined();
      expect(timeline.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const timeline = document.createElement("ea-timeline");
      container.appendChild(timeline);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(timeline.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("应该正确渲染子元素", async () => {
      const timeline = document.createElement("ea-timeline");
      timeline.innerHTML = `
        <ea-timeline-item timestamp="2024-7-1">Item 1</ea-timeline-item>
        <ea-timeline-item timestamp="2024-7-2">Item 2</ea-timeline-item>
      `;
      container.appendChild(timeline);

      await new Promise(resolve => setTimeout(resolve, 50));

      const items = timeline.querySelectorAll("ea-timeline-item");
      expect(items.length).toBe(2);
    });
  });

  /**
   * EaTimelineItem 基本功能测试
   */
  describe("EaTimelineItem Basic Functionality", () => {
    it("应该正确渲染 ea-timeline-item 组件", async () => {
      const item = document.createElement("ea-timeline-item");
      item.textContent = "Timeline Item";
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item).toBeDefined();
      expect(item.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
    });

    it("应该包含 left-wrapper CSS Part", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.shadowRoot.querySelector('[part="left-wrapper"]')).toBeTruthy();
    });

    it("应该包含 dot CSS Part", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.shadowRoot.querySelector('[part="dot"]')).toBeTruthy();
    });

    it("应该包含 tail CSS Part", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.shadowRoot.querySelector('[part="tail"]')).toBeTruthy();
    });

    it("应该包含 right-wrapper CSS Part", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.shadowRoot.querySelector('[part="right-wrapper"]')).toBeTruthy();
    });

    it("应该包含 content CSS Part", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.shadowRoot.querySelector('[part="content"]')).toBeTruthy();
    });

    it("应该包含 timestamp CSS Part", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.shadowRoot.querySelector('[part="timestamp"]')).toBeTruthy();
    });
  });

  /**
   * EaTimelineItem Type 属性测试
   */
  describe("EaTimelineItem Type Attribute", () => {
    it("默认 type 应该是空字符串", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.type).toBe("");
    });

    it("应该支持 type='primary'", async () => {
      const item = document.createElement("ea-timeline-item");
      item.type = "primary";
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.type).toBe("primary");
    });

    it("应该支持 type='success'", async () => {
      const item = document.createElement("ea-timeline-item");
      item.type = "success";
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.type).toBe("success");
    });

    it("应该支持 type='warning'", async () => {
      const item = document.createElement("ea-timeline-item");
      item.type = "warning";
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.type).toBe("warning");
    });

    it("应该支持 type='danger'", async () => {
      const item = document.createElement("ea-timeline-item");
      item.type = "danger";
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.type).toBe("danger");
    });

    it("应该支持 type='info'", async () => {
      const item = document.createElement("ea-timeline-item");
      item.type = "info";
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.type).toBe("info");
    });
  });

  /**
   * EaTimelineItem Timestamp 属性测试
   */
  describe("EaTimelineItem Timestamp Attribute", () => {
    it("默认 timestamp 应该是空字符串", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.timestamp).toBe("");
    });

    it("应该支持 timestamp 属性", async () => {
      const item = document.createElement("ea-timeline-item");
      item.timestamp = "2024-7-1";
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.timestamp).toBe("2024-7-1");
    });
  });

  /**
   * EaTimelineItem Hide-timestamp 属性测试
   */
  describe("EaTimelineItem Hide-timestamp Attribute", () => {
    it("默认 hide-timestamp 应该是 false", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      const value = item["hide-timestamp"];
      expect(value === false || value === null).toBe(true);
    });

    it("设置 hide-timestamp 应该隐藏时间戳", async () => {
      const item = document.createElement("ea-timeline-item");
      item["hide-timestamp"] = true;
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item["hide-timestamp"]).toBe(true);
    });
  });

  /**
   * EaTimelineItem Placement 属性测试
   */
  describe("EaTimelineItem Placement Attribute", () => {
    it("默认 placement 应该是空字符串", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.placement).toBe("");
    });

    it("应该支持 placement='top'", async () => {
      const item = document.createElement("ea-timeline-item");
      item.placement = "top";
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.placement).toBe("top");
    });

    it("应该支持 placement='bottom'", async () => {
      const item = document.createElement("ea-timeline-item");
      item.placement = "bottom";
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.placement).toBe("bottom");
    });
  });

  /**
   * EaTimelineItem Size 属性测试
   */
  describe("EaTimelineItem Size Attribute", () => {
    it("默认 size 应该是空字符串", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.size).toBe("");
    });

    it("应该支持 size='normal'", async () => {
      const item = document.createElement("ea-timeline-item");
      item.size = "normal";
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.size).toBe("normal");
    });

    it("应该支持 size='large'", async () => {
      const item = document.createElement("ea-timeline-item");
      item.size = "large";
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.size).toBe("large");
    });
  });

  /**
   * EaTimelineItem Color 属性测试
   */
  describe("EaTimelineItem Color Attribute", () => {
    it("默认 color 应该是空字符串", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.color).toBe("");
    });

    it("应该支持 color 属性", async () => {
      const item = document.createElement("ea-timeline-item");
      item.color = "#0bbd87";
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.color).toBe("#0bbd87");
    });
  });

  /**
   * EaTimelineItem Hollow 属性测试
   */
  describe("EaTimelineItem Hollow Attribute", () => {
    it("默认 hollow 应该是 false", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      const value = item.hollow;
      expect(value === false || value === null).toBe(true);
    });

    it("设置 hollow 应该启用空心节点", async () => {
      const item = document.createElement("ea-timeline-item");
      item.hollow = true;
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.hollow).toBe(true);
    });
  });

  /**
   * EaTimelineItem Icon 属性测试
   */
  describe("EaTimelineItem Icon Attribute", () => {
    it("默认 icon 应该是空字符串", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.icon).toBe("");
    });

    it("应该支持 icon 属性", async () => {
      const item = document.createElement("ea-timeline-item");
      item.icon = "mug-hot";
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.icon).toBe("mug-hot");
    });
  });

  /**
   * EaTimelineItem Center 属性测试
   */
  describe("EaTimelineItem Center Attribute", () => {
    it("默认 center 应该是 false", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      const value = item.center;
      expect(value === false || value === null).toBe(true);
    });

    it("设置 center 应该启用垂直居中", async () => {
      const item = document.createElement("ea-timeline-item");
      item.center = true;
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.center).toBe(true);
    });
  });

  /**
   * EaTimelineItem Slots 测试
   */
  describe("EaTimelineItem Slots", () => {
    it("应该正确渲染默认插槽内容", async () => {
      const item = document.createElement("ea-timeline-item");
      item.textContent = "Slot Content";
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      const slot = item.shadowRoot.querySelector("slot:not([name])");
      expect(slot).toBeTruthy();
    });

    it("应该支持 timestamp 插槽", async () => {
      const item = document.createElement("ea-timeline-item");
      item.innerHTML = `
        Content
        <div slot="timestamp">Custom Timestamp</div>
      `;
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      const slot = item.shadowRoot.querySelector('slot[name="timestamp"]');
      expect(slot).toBeTruthy();
    });

    it("应该支持 dot 插槽", async () => {
      const item = document.createElement("ea-timeline-item");
      item.innerHTML = `
        Content
        <div slot="dot">Custom Dot</div>
      `;
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      const slot = item.shadowRoot.querySelector('slot[name="dot"]');
      expect(slot).toBeTruthy();
    });
  });

  /**
   * EaTimeline 组合测试
   */
  describe("EaTimeline Combined Tests", () => {
    it("应该正确渲染完整的时间线", async () => {
      const timeline = document.createElement("ea-timeline");
      timeline.innerHTML = `
        <ea-timeline-item timestamp="2024-7-1" type="primary">Step 1</ea-timeline-item>
        <ea-timeline-item timestamp="2024-7-2" type="success">Step 2</ea-timeline-item>
        <ea-timeline-item timestamp="2024-7-3" type="warning">Step 3</ea-timeline-item>
      `;
      container.appendChild(timeline);

      await new Promise(resolve => setTimeout(resolve, 50));

      const items = timeline.querySelectorAll("ea-timeline-item");
      expect(items.length).toBe(3);
      expect(items[0].type).toBe("primary");
      expect(items[1].type).toBe("success");
      expect(items[2].type).toBe("warning");
    });

    it("应该支持不同类型和尺寸的组合", async () => {
      const timeline = document.createElement("ea-timeline");
      timeline.innerHTML = `
        <ea-timeline-item type="primary" size="large">Large Primary</ea-timeline-item>
        <ea-timeline-item type="danger" size="normal">Normal Danger</ea-timeline-item>
      `;
      container.appendChild(timeline);

      await new Promise(resolve => setTimeout(resolve, 50));

      const items = timeline.querySelectorAll("ea-timeline-item");
      expect(items[0].type).toBe("primary");
      expect(items[0].size).toBe("large");
      expect(items[1].type).toBe("danger");
      expect(items[1].size).toBe("normal");
    });

    it("应该支持自定义颜色和空心节点", async () => {
      const timeline = document.createElement("ea-timeline");
      timeline.innerHTML = `
        <ea-timeline-item color="#0bbd87" hollow>Custom Color Hollow</ea-timeline-item>
      `;
      container.appendChild(timeline);

      await new Promise(resolve => setTimeout(resolve, 50));

      const item = timeline.querySelector("ea-timeline-item");
      expect(item.color).toBe("#0bbd87");
      expect(item.hollow).toBe(true);
    });

    it("应该支持图标和 placement 组合", async () => {
      const timeline = document.createElement("ea-timeline");
      timeline.innerHTML = `
        <ea-timeline-item icon="mug-hot" placement="top">Icon Top</ea-timeline-item>
      `;
      container.appendChild(timeline);

      await new Promise(resolve => setTimeout(resolve, 50));

      const item = timeline.querySelector("ea-timeline-item");
      expect(item.icon).toBe("mug-hot");
      expect(item.placement).toBe("top");
    });
  });

  /**
   * EaTimeline 边界条件测试
   */
  describe("EaTimeline Edge Cases", () => {
    it("空时间线应该正常渲染", async () => {
      const timeline = document.createElement("ea-timeline");
      container.appendChild(timeline);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(timeline).toBeDefined();
      expect(timeline.shadowRoot).toBeDefined();
    });

    it("单个时间线项应该正常渲染", async () => {
      const timeline = document.createElement("ea-timeline");
      timeline.innerHTML = `
        <ea-timeline-item timestamp="2024-7-1">Single Item</ea-timeline-item>
      `;
      container.appendChild(timeline);

      await new Promise(resolve => setTimeout(resolve, 50));

      const items = timeline.querySelectorAll("ea-timeline-item");
      expect(items.length).toBe(1);
    });

    it("多个时间线应该独立工作", async () => {
      const timeline1 = document.createElement("ea-timeline");
      timeline1.innerHTML = `
        <ea-timeline-item type="primary">Item 1</ea-timeline-item>
      `;

      const timeline2 = document.createElement("ea-timeline");
      timeline2.innerHTML = `
        <ea-timeline-item type="success">Item 2</ea-timeline-item>
      `;

      container.appendChild(timeline1);
      container.appendChild(timeline2);

      await new Promise(resolve => setTimeout(resolve, 50));

      const item1 = timeline1.querySelector("ea-timeline-item");
      const item2 = timeline2.querySelector("ea-timeline-item");
      expect(item1.type).toBe("primary");
      expect(item2.type).toBe("success");
    });
  });

  /**
   * EaTimeline 生命周期测试
   */
  describe("EaTimeline Lifecycle", () => {
    it("timeline 组件连接后应该正确初始化", async () => {
      const timeline = document.createElement("ea-timeline");
      timeline.innerHTML = `
        <ea-timeline-item>Item 1</ea-timeline-item>
      `;
      container.appendChild(timeline);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(timeline.shadowRoot).toBeDefined();
    });

    it("timeline-item 组件连接后应该正确初始化", async () => {
      const item = document.createElement("ea-timeline-item");
      item.timestamp = "2024-7-1";
      item.textContent = "Test Item";
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.shadowRoot).toBeDefined();
      expect(item.timestamp).toBe("2024-7-1");
    });

    it("timeline 组件断开连接后应该正常移除", async () => {
      const timeline = document.createElement("ea-timeline");
      container.appendChild(timeline);

      await new Promise(resolve => setTimeout(resolve, 50));

      timeline.remove();

      expect(container.contains(timeline)).toBe(false);
    });

    it("timeline-item 组件断开连接后应该正常移除", async () => {
      const item = document.createElement("ea-timeline-item");
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      item.remove();

      expect(container.contains(item)).toBe(false);
    });

    it("动态修改 timeline-item type 应该生效", async () => {
      const item = document.createElement("ea-timeline-item");
      item.type = "primary";
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      item.type = "danger";

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.type).toBe("danger");
    });

    it("动态修改 timeline-item timestamp 应该生效", async () => {
      const item = document.createElement("ea-timeline-item");
      item.timestamp = "2024-7-1";
      container.appendChild(item);

      await new Promise(resolve => setTimeout(resolve, 50));

      item.timestamp = "2024-7-2";

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item.timestamp).toBe("2024-7-2");
    });

    it("动态添加 timeline-item 应该生效", async () => {
      const timeline = document.createElement("ea-timeline");
      timeline.innerHTML = `
        <ea-timeline-item>Item 1</ea-timeline-item>
      `;
      container.appendChild(timeline);

      await new Promise(resolve => setTimeout(resolve, 50));

      const newItem = document.createElement("ea-timeline-item");
      newItem.textContent = "Item 2";
      timeline.appendChild(newItem);

      await new Promise(resolve => setTimeout(resolve, 50));

      const items = timeline.querySelectorAll("ea-timeline-item");
      expect(items.length).toBe(2);
    });
  });
});
