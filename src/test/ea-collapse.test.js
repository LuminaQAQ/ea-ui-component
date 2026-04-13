import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { waitForRender } from "./utils/waitForRender";

// 导入真实组件
import "../components/ea-collapse/index";

describe("EaCollapse Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  /**
   * 基本渲染测试
   */
  describe("Basic Rendering", () => {
    it("应该正确渲染 ea-collapse 组件", async () => {
      const collapse = document.createElement("ea-collapse");
      container.appendChild(collapse);

      await waitForRender();

      expect(collapse).toBeDefined();
      expect(collapse.shadowRoot).toBeDefined();
    });

    it("应该包含正确的 CSS 类", async () => {
      const collapse = document.createElement("ea-collapse");
      container.appendChild(collapse);

      await waitForRender();

      const containerEl = collapse.shadowRoot.querySelector(".ea-collapse");
      expect(containerEl).toBeTruthy();
    });

    it("应该包含所有 CSS Parts", async () => {
      const collapse = document.createElement("ea-collapse");
      container.appendChild(collapse);

      await waitForRender();

      expect(
        collapse.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });
  });

  /**
   * Accordion 属性测试
   */
  describe("Accordion Property", () => {
    it("默认情况下 accordion 应该为 false", async () => {
      const collapse = document.createElement("ea-collapse");
      container.appendChild(collapse);

      await waitForRender();

      expect(collapse.accordion).toBe(false);
    });

    it("设置 accordion 属性应该为 true", async () => {
      const collapse = document.createElement("ea-collapse");
      collapse.setAttribute("accordion", "");
      container.appendChild(collapse);

      await waitForRender();

      expect(collapse.accordion).toBe(true);
    });
  });

  /**
   * Active 属性测试
   */
  describe("Active Property", () => {
    it("默认情况下 active 应该为空数组", async () => {
      const collapse = document.createElement("ea-collapse");
      container.appendChild(collapse);

      await waitForRender();

      expect(collapse.active).toEqual([]);
    });

    it("手风琴模式下应该能设置 active 为字符串", async () => {
      const collapse = document.createElement("ea-collapse");
      collapse.setAttribute("accordion", "");
      collapse.innerHTML = `
        <ea-collapse-item header="Item 1" name="1">Content 1</ea-collapse-item>
      `;
      container.appendChild(collapse);

      await waitForRender();

      collapse.active = "1";
      expect(collapse.active).toBe("1");
    });

    it("非手风琴模式下应该能设置 active 为数组", async () => {
      const collapse = document.createElement("ea-collapse");
      collapse.innerHTML = `
        <ea-collapse-item header="Item 1" name="1">Content 1</ea-collapse-item>
        <ea-collapse-item header="Item 2" name="2">Content 2</ea-collapse-item>
      `;
      container.appendChild(collapse);

      await waitForRender();

      collapse.active = ["1", "2"];
      expect(collapse.active).toEqual(["1", "2"]);
    });
  });

  /**
   * Expand Icon Position 属性测试
   */
  describe("Expand Icon Position Property", () => {
    it("默认情况下 expandIconPosition 应该为 right", async () => {
      const collapse = document.createElement("ea-collapse");
      container.appendChild(collapse);

      await waitForRender();

      expect(collapse.expandIconPosition).toBe("right");
    });

    it("设置 expand-icon-position 为 left 应该生效", async () => {
      const collapse = document.createElement("ea-collapse");
      collapse.setAttribute("expand-icon-position", "left");
      container.appendChild(collapse);

      await waitForRender();

      expect(collapse.expandIconPosition).toBe("left");
    });

    it("设置 expand-icon-position 应该应用到子项", async () => {
      const collapse = document.createElement("ea-collapse");
      collapse.innerHTML = `
        <ea-collapse-item header="Item 1" name="1">Content 1</ea-collapse-item>
      `;
      container.appendChild(collapse);

      await waitForRender();

      const item = collapse.querySelector("ea-collapse-item");
      expect(item.expandIconPosition).toBe("right");
    });

    it("设置 expand-icon-position 为 left 应该应用到子项", async () => {
      const collapse = document.createElement("ea-collapse");
      collapse.innerHTML = `
        <ea-collapse-item header="Item 1" name="1">Content 1</ea-collapse-item>
      `;
      container.appendChild(collapse);

      await waitForRender();

      // 先添加到 DOM，再设置 expand-icon-position 属性，触发 attributeChangedCallback
      collapse.setAttribute("expand-icon-position", "left");

      await waitForRender();

      const item = collapse.querySelector("ea-collapse-item");
      expect(item.expandIconPosition).toBe("left");
    });
  });

  /**
   * Change 事件测试
   */
  describe("Change Event", () => {
    it("展开/收起应该触发 change 事件", async () => {
      const collapse = document.createElement("ea-collapse");
      collapse.innerHTML = `
        <ea-collapse-item header="Item 1" name="1">Content 1</ea-collapse-item>
      `;
      container.appendChild(collapse);

      await waitForRender();

      const changeHandler = vi.fn();
      collapse.addEventListener("change", changeHandler);

      const item = collapse.querySelector("ea-collapse-item");
      const headerWrap = item.shadowRoot.querySelector(
        ".ea-collapse-item__header-wrap"
      );
      headerWrap.click();

      await waitForRender();

      expect(changeHandler).toHaveBeenCalled();
    });

    it("change 事件应该包含 name、target 和 active", async () => {
      const collapse = document.createElement("ea-collapse");
      collapse.innerHTML = `
        <ea-collapse-item header="Item 1" name="1">Content 1</ea-collapse-item>
      `;
      container.appendChild(collapse);

      await waitForRender();

      let eventDetail = null;
      collapse.addEventListener("change", e => {
        eventDetail = e.detail;
      });

      const item = collapse.querySelector("ea-collapse-item");
      const headerWrap = item.shadowRoot.querySelector(
        ".ea-collapse-item__header-wrap"
      );
      headerWrap.click();

      await waitForRender();

      expect(eventDetail).toMatchObject({
        name: "1",
        target: item,
      });
    });
  });

  /**
   * beforeCollapse 钩子测试
   */
  describe("beforeCollapse Hook", () => {
    it("beforeCollapse 应该阻止展开", async () => {
      const collapse = document.createElement("ea-collapse");
      collapse.innerHTML = `
        <ea-collapse-item header="Item 1" name="1">Content 1</ea-collapse-item>
      `;
      container.appendChild(collapse);

      await waitForRender();

      collapse.beforeCollapse = () => false;

      const changeHandler = vi.fn();
      collapse.addEventListener("change", changeHandler);

      const item = collapse.querySelector("ea-collapse-item");
      const headerWrap = item.shadowRoot.querySelector(
        ".ea-collapse-item__header-wrap"
      );
      headerWrap.click();

      await waitForRender();

      expect(changeHandler).not.toHaveBeenCalled();
    });

    it("beforeCollapse 返回 true 应该允许展开", async () => {
      const collapse = document.createElement("ea-collapse");
      collapse.innerHTML = `
        <ea-collapse-item header="Item 1" name="1">Content 1</ea-collapse-item>
      `;
      container.appendChild(collapse);

      await waitForRender();

      collapse.beforeCollapse = () => true;

      const changeHandler = vi.fn();
      collapse.addEventListener("change", changeHandler);

      const item = collapse.querySelector("ea-collapse-item");
      const headerWrap = item.shadowRoot.querySelector(
        ".ea-collapse-item__header-wrap"
      );
      headerWrap.click();

      await waitForRender();

      expect(changeHandler).toHaveBeenCalled();
    });

    it("beforeCollapse 支持异步函数", async () => {
      const collapse = document.createElement("ea-collapse");
      collapse.innerHTML = `
        <ea-collapse-item header="Item 1" name="1">Content 1</ea-collapse-item>
      `;
      container.appendChild(collapse);

      await waitForRender();

      collapse.beforeCollapse = async () => {
        await new Promise(resolve => setTimeout(resolve, 10));
        return true;
      };

      const changeHandler = vi.fn();
      collapse.addEventListener("change", changeHandler);

      const item = collapse.querySelector("ea-collapse-item");
      const headerWrap = item.shadowRoot.querySelector(
        ".ea-collapse-item__header-wrap"
      );
      headerWrap.click();

      await waitForRender(200);

      expect(changeHandler).toHaveBeenCalled();
    });
  });

  /**
   * 手风琴模式测试
   */
  describe("Accordion Mode", () => {
    it("手风琴模式下只能展开一个面板", async () => {
      const collapse = document.createElement("ea-collapse");
      collapse.setAttribute("accordion", "");
      collapse.innerHTML = `
        <ea-collapse-item header="Item 1" name="1">Content 1</ea-collapse-item>
        <ea-collapse-item header="Item 2" name="2">Content 2</ea-collapse-item>
      `;
      container.appendChild(collapse);

      await waitForRender();

      const items = collapse.querySelectorAll("ea-collapse-item");

      // 展开第一个
      items[0].dispatchEvent(
        new CustomEvent("collapse-item-click", {
          detail: { name: "1", el: items[0] },
          bubbles: true,
          cancelable: true,
        })
      );

      await waitForRender();

      expect(items[0].hasAttribute("active")).toBe(true);
      expect(items[1].hasAttribute("active")).toBe(false);

      // 展开第二个
      items[1].dispatchEvent(
        new CustomEvent("collapse-item-click", {
          detail: { name: "2", el: items[1] },
          bubbles: true,
          cancelable: true,
        })
      );

      await waitForRender();

      expect(items[0].hasAttribute("active")).toBe(false);
      expect(items[1].hasAttribute("active")).toBe(true);
    });
  });

  /**
   * 普通模式测试
   */
  describe("Normal Mode", () => {
    it("普通模式下可以展开多个面板", async () => {
      const collapse = document.createElement("ea-collapse");
      collapse.innerHTML = `
        <ea-collapse-item header="Item 1" name="1">Content 1</ea-collapse-item>
        <ea-collapse-item header="Item 2" name="2">Content 2</ea-collapse-item>
      `;
      container.appendChild(collapse);

      await waitForRender();

      const items = collapse.querySelectorAll("ea-collapse-item");

      // 展开第一个
      items[0].dispatchEvent(
        new CustomEvent("collapse-item-click", {
          detail: { name: "1", el: items[0] },
          bubbles: true,
          cancelable: true,
        })
      );

      await waitForRender();

      expect(items[0].hasAttribute("active")).toBe(true);

      // 展开第二个
      items[1].dispatchEvent(
        new CustomEvent("collapse-item-click", {
          detail: { name: "2", el: items[1] },
          bubbles: true,
          cancelable: true,
        })
      );

      await waitForRender();

      expect(items[0].hasAttribute("active")).toBe(true);
      expect(items[1].hasAttribute("active")).toBe(true);
    });

    it("再次点击应该收起面板", async () => {
      const collapse = document.createElement("ea-collapse");
      collapse.innerHTML = `
        <ea-collapse-item header="Item 1" name="1">Content 1</ea-collapse-item>
      `;
      container.appendChild(collapse);

      await waitForRender();

      const item = collapse.querySelector("ea-collapse-item");

      // 展开
      item.dispatchEvent(
        new CustomEvent("collapse-item-click", {
          detail: { name: "1", el: item },
          bubbles: true,
          cancelable: true,
        })
      );

      await waitForRender();

      expect(item.hasAttribute("active")).toBe(true);

      // 收起
      item.dispatchEvent(
        new CustomEvent("collapse-item-click", {
          detail: { name: "1", el: item },
          bubbles: true,
          cancelable: true,
        })
      );

      await waitForRender();

      expect(item.hasAttribute("active")).toBe(false);
    });
  });

  /**
   * setActiveNames 方法测试
   */
  describe("setActiveNames Method", () => {
    it("应该能通过 setActiveNames 设置激活的面板", async () => {
      const collapse = document.createElement("ea-collapse");
      collapse.innerHTML = `
        <ea-collapse-item header="Item 1" name="1">Content 1</ea-collapse-item>
        <ea-collapse-item header="Item 2" name="2">Content 2</ea-collapse-item>
      `;
      container.appendChild(collapse);

      await waitForRender();

      collapse.setActiveNames(["1"]);

      const items = collapse.querySelectorAll("ea-collapse-item");
      expect(items[0].hasAttribute("active")).toBe(true);
      expect(items[1].hasAttribute("active")).toBe(false);
    });

    it("手风琴模式下 setActiveNames 应该只激活一个", async () => {
      const collapse = document.createElement("ea-collapse");
      collapse.setAttribute("accordion", "");
      collapse.innerHTML = `
        <ea-collapse-item header="Item 1" name="1">Content 1</ea-collapse-item>
        <ea-collapse-item header="Item 2" name="2">Content 2</ea-collapse-item>
      `;
      container.appendChild(collapse);

      await waitForRender();

      collapse.setActiveNames("2");

      const items = collapse.querySelectorAll("ea-collapse-item");
      expect(items[0].hasAttribute("active")).toBe(false);
      expect(items[1].hasAttribute("active")).toBe(true);
    });
  });

  /**
   * 初始化测试
   */
  describe("Initialization", () => {
    it("应该自动为没有 name 的项分配索引", async () => {
      const collapse = document.createElement("ea-collapse");
      collapse.innerHTML = `
        <ea-collapse-item header="Item 1">Content 1</ea-collapse-item>
        <ea-collapse-item header="Item 2">Content 2</ea-collapse-item>
      `;
      container.appendChild(collapse);

      await waitForRender();

      const items = collapse.querySelectorAll("ea-collapse-item");
      expect(items[0].getAttribute("name")).toBe("0");
      expect(items[1].getAttribute("name")).toBe("1");
    });
  });
});

describe("EaCollapseItem Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  /**
   * 基本渲染测试
   */
  describe("Basic Rendering", () => {
    it("应该正确渲染 ea-collapse-item 组件", async () => {
      const item = document.createElement("ea-collapse-item");
      item.setAttribute("header", "Test Header");
      item.setAttribute("name", "1");
      container.appendChild(item);

      await waitForRender();

      expect(item).toBeDefined();
      expect(item.shadowRoot).toBeDefined();
    });

    it("应该包含正确的 CSS 类", async () => {
      const item = document.createElement("ea-collapse-item");
      container.appendChild(item);

      await waitForRender();

      const containerEl = item.shadowRoot.querySelector(".ea-collapse-item");
      expect(containerEl).toBeTruthy();
    });

    it("应该包含所有 CSS Parts", async () => {
      const item = document.createElement("ea-collapse-item");
      container.appendChild(item);

      await waitForRender();

      expect(item.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
      expect(
        item.shadowRoot.querySelector('[part="header-wrap"]')
      ).toBeTruthy();
      expect(item.shadowRoot.querySelector('[part="header"]')).toBeTruthy();
      expect(item.shadowRoot.querySelector('[part="indicator"]')).toBeTruthy();
      expect(
        item.shadowRoot.querySelector('[part="content-wrap"]')
      ).toBeTruthy();
    });
  });

  /**
   * 插槽测试
   */
  describe("Slots", () => {
    it("应该支持默认插槽", async () => {
      const item = document.createElement("ea-collapse-item");
      item.innerHTML = "Content";
      container.appendChild(item);

      await waitForRender();

      const slot = item.shadowRoot.querySelector("slot:not([name])");
      expect(slot).toBeTruthy();
    });

    it("应该支持 header 插槽", async () => {
      const item = document.createElement("ea-collapse-item");
      item.innerHTML = `
        <div slot="header">Custom Header</div>
        Content
      `;
      container.appendChild(item);

      await waitForRender();

      const headerSlot = item.shadowRoot.querySelector('slot[name="header"]');
      expect(headerSlot).toBeTruthy();
    });

    it("应该支持 icon 插槽", async () => {
      const item = document.createElement("ea-collapse-item");
      item.innerHTML = '<ea-icon slot="icon" name="custom"></ea-icon>';
      container.appendChild(item);

      await waitForRender();

      const iconSlot = item.shadowRoot.querySelector('slot[name="icon"]');
      expect(iconSlot).toBeTruthy();
    });
  });

  /**
   * Header 属性测试
   */
  describe("Header Attribute", () => {
    it("应该通过 header 属性设置标题", async () => {
      const item = document.createElement("ea-collapse-item");
      item.setAttribute("header", "Test Header");
      container.appendChild(item);

      await waitForRender();

      expect(item.header).toBe("Test Header");
    });

    it("应该通过 header 插槽自定义标题", async () => {
      const item = document.createElement("ea-collapse-item");
      item.innerHTML = `
        <div slot="header">Custom Header</div>
        Content
      `;
      container.appendChild(item);

      await waitForRender();

      const headerSlot = item.shadowRoot.querySelector('slot[name="header"]');
      expect(headerSlot).toBeTruthy();
    });
  });

  /**
   * Name 属性测试
   */
  describe("Name Attribute", () => {
    it("应该设置 name 属性", async () => {
      const item = document.createElement("ea-collapse-item");
      item.setAttribute("name", "item1");
      container.appendChild(item);

      await waitForRender();

      expect(item.getAttribute("name")).toBe("item1");
    });
  });

  /**
   * Expand Icon Position 属性测试
   */
  describe("Expand Icon Position Property", () => {
    it("默认情况下 expandIconPosition 应该为 right", async () => {
      const item = document.createElement("ea-collapse-item");
      container.appendChild(item);

      await waitForRender();

      expect(item.expandIconPosition).toBe("right");
    });

    it("设置 expand-icon-position 为 left 应该生效", async () => {
      const item = document.createElement("ea-collapse-item");
      item.setAttribute("expand-icon-position", "left");
      container.appendChild(item);

      await waitForRender();

      expect(item.expandIconPosition).toBe("left");
    });
  });

  /**
   * Disabled 属性测试
   */
  describe("Disabled Property", () => {
    it("默认情况下 disabled 应该为 false", async () => {
      const item = document.createElement("ea-collapse-item");
      container.appendChild(item);

      await waitForRender();

      expect(item.disabled).toBe(false);
    });

    it("设置 disabled 属性应该禁用点击", async () => {
      const item = document.createElement("ea-collapse-item");
      item.setAttribute("disabled", "");
      container.appendChild(item);

      await waitForRender();

      expect(item.disabled).toBe(true);

      const clickHandler = vi.fn();
      item.addEventListener("collapse-item-click", clickHandler);

      const headerWrap = item.shadowRoot.querySelector(
        ".ea-collapse-item__header-wrap"
      );
      headerWrap.click();

      expect(clickHandler).not.toHaveBeenCalled();
    });
  });

  /**
   * Active 属性测试
   */
  describe("Active Property", () => {
    it("默认情况下 active 应该为 false", async () => {
      const item = document.createElement("ea-collapse-item");
      container.appendChild(item);

      await waitForRender();

      expect(item.active).toBe(false);
    });

    it("设置 active 属性应该展开面板", async () => {
      const item = document.createElement("ea-collapse-item");
      item.setAttribute("active", "");
      container.appendChild(item);

      await waitForRender();

      expect(item.active).toBe(true);
      expect(item.hasAttribute("active")).toBe(true);
    });
  });

  /**
   * 点击事件测试
   */
  describe("Click Event", () => {
    it("点击 header 应该触发 collapse-item-click 事件", async () => {
      const item = document.createElement("ea-collapse-item");
      item.setAttribute("name", "1");
      container.appendChild(item);

      await waitForRender();

      const clickHandler = vi.fn();
      item.addEventListener("collapse-item-click", clickHandler);

      const headerWrap = item.shadowRoot.querySelector(
        ".ea-collapse-item__header-wrap"
      );
      headerWrap.click();

      expect(clickHandler).toHaveBeenCalled();
    });

    it("collapse-item-click 事件应该包含 name 和 el", async () => {
      const item = document.createElement("ea-collapse-item");
      item.setAttribute("name", "test-name");
      container.appendChild(item);

      await waitForRender();

      let eventDetail = null;
      item.addEventListener("collapse-item-click", e => {
        eventDetail = e.detail;
      });

      const headerWrap = item.shadowRoot.querySelector(
        ".ea-collapse-item__header-wrap"
      );
      headerWrap.click();

      expect(eventDetail).toMatchObject({
        name: "test-name",
        target: item,
      });
    });
  });
});
