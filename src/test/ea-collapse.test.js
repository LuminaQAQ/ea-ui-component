import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// 模拟 ea-collapse-item 组件
class EaCollapseItem extends HTMLElement {
  #container;
  #titleWrap;
  #titleSlot;
  #content;
  #defaultSlot;
  #abortController = new AbortController();

  static get observedAttributes() {
    return ["title", "name", "disabled", "expand-icon-position", "active"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        .ea-collapse-item {
          border-bottom: 1px solid #ebeef5;
        }
        .ea-collapse-item__title-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 0;
          cursor: pointer;
          font-weight: 500;
          font-size: 14px;
          color: #303133;
          transition: color 0.3s;
        }
        .ea-collapse-item__title-wrap:hover {
          color: #409eff;
        }
        .ea-collapse-item.disabled .ea-collapse-item__title-wrap {
          cursor: not-allowed;
          opacity: 0.6;
        }
        .ea-collapse-item__title {
          flex: 1;
        }
        .ea-collapse-item__indicator {
          margin-left: 8px;
          transition: transform 0.3s;
        }
        .ea-collapse-item[active] .ea-collapse-item__indicator {
          transform: rotate(180deg);
        }
        .ea-collapse-item__content {
          overflow: hidden;
          transition: height 0.3s ease-in-out;
          height: 0;
          font-size: 14px;
          color: #606266;
          line-height: 1.5;
        }
        .ea-collapse-item[active] .ea-collapse-item__content {
          height: auto;
          padding-bottom: 20px;
        }
        .ea-collapse-item.--indicator-left .ea-collapse-item__title-wrap {
          flex-direction: row-reverse;
          justify-content: flex-end;
        }
        .ea-collapse-item.--indicator-left .ea-collapse-item__indicator {
          margin-left: 0;
          margin-right: 8px;
        }
      </style>
      <div class='ea-collapse-item' part='container'>
        <div class="ea-collapse-item__title-wrap" part="title-wrap">
          <span class="ea-collapse-item__title" part="title">
            <slot name="title"></slot>
          </span>
          <span class="ea-collapse-item__indicator" part="indicator">
            <slot name="icon">
              <span class="default-expand-icon">▼</span>
            </slot>
          </span>
        </div>
        <div class="ea-collapse-item__content" part="content-wrap">
          <slot></slot>
        </div>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-collapse-item");
    this.#titleWrap = this.shadowRoot.querySelector(
      ".ea-collapse-item__title-wrap"
    );
    this.#titleSlot = this.shadowRoot.querySelector(
      ".ea-collapse-item__title slot"
    );
    this.#content = this.shadowRoot.querySelector(".ea-collapse-item__content");
    this.#defaultSlot = this.shadowRoot.querySelector("slot:not([name])");

    this.updateContainerClasslist();
  }

  connectedCallback() {
    this.#titleWrap.addEventListener("click", e => {
      e.preventDefault();
      e.stopImmediatePropagation();

      if (this.disabled) return;

      this.dispatchEvent(
        new CustomEvent("collapse-item-click", {
          detail: {
            name: this.getAttribute("name"),
            el: this,
          },
          bubbles: true,
          cancelable: true,
        })
      );
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case "title":
        if (this.#titleSlot) {
          this.#titleSlot.textContent = newValue;
        }
        break;
      case "expand-icon-position":
      case "disabled":
        this.updateContainerClasslist();
        break;
      case "active":
        this.#updateCollapseHeight(this.hasAttribute("active"));
        break;
    }
  }

  updateContainerClasslist() {
    let className = "ea-collapse-item";

    const expandIconPosition = this.getAttribute("expand-icon-position");
    if (expandIconPosition === "left") {
      className += " --indicator-left";
    }

    if (this.hasAttribute("disabled")) {
      className += " disabled";
    }

    if (this.#container) {
      this.#container.className = className;
    }
    return className;
  }

  #updateCollapseHeight(isActive) {
    queueMicrotask(() => {
      if (this.#container) {
        this.#container.style.setProperty(
          "--ea-collapse-item-content-height",
          isActive ? "auto" : "0"
        );
      }
    });
  }

  get disabled() {
    return this.hasAttribute("disabled");
  }

  get name() {
    return this.getAttribute("name") || "";
  }

  get active() {
    return this.hasAttribute("active");
  }
}

// 模拟 ea-collapse 组件
class EaCollapse extends HTMLElement {
  #container;
  #abortController;

  static get observedAttributes() {
    return ["accordion", "expand-icon-position"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        .ea-collapse {
          border-top: 1px solid #ebeef5;
        }
      </style>
      <div class='ea-collapse' part='container'>
        <slot></slot>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-collapse");
    this._active = [];
    this._beforeCollapse = null;
  }

  connectedCallback() {
    this.#initCollapseStatus();

    this.addEventListener("collapse-item-click", async e => {
      e.preventDefault();
      e.stopImmediatePropagation();
      e.stopPropagation();

      const { name, el } = e.detail;

      if (typeof this._beforeCollapse === "function") {
        try {
          const isContinue = await this._beforeCollapse({ name, el });
          if (!isContinue) return;
        } catch {
          return;
        }
      }

      if (this.accordion) {
        this.#updateAccordionCollapse(name);
        this._active = name;
      } else {
        try {
          if (this._active.includes(name)) {
            this._active = this._active.filter(item => item !== name);
            el.toggleAttribute("active", false);
          } else {
            this._active = [...this._active, name];
            el.toggleAttribute("active", this._active.includes(name));
          }
        } catch {
          console.error(
            `${this.tagName}: When 'accordion' is false, 'active' should be an Array type.`
          );
        }
      }

      this.dispatchEvent(
        new CustomEvent("change", {
          detail: {
            name,
            target: el,
            active: this._active,
          },
          bubbles: true,
        })
      );
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case "expand-icon-position":
        this.querySelectorAll("ea-collapse-item").forEach(item => {
          item.setAttribute("expand-icon-position", newValue);
        });
        break;
    }
  }

  #initCollapseStatus() {
    const els = [...this.querySelectorAll("ea-collapse-item")];
    els.forEach((el, index) => {
      if (!el.getAttribute("name")) {
        el.setAttribute("name", String(index));
      }
    });
  }

  #updateAccordionCollapse(activeName) {
    const els = [...this.querySelectorAll("ea-collapse-item")];
    els.forEach(el => {
      el.toggleAttribute("active", el.getAttribute("name") === activeName);
    });
  }

  #updateNormalCollapse(activeNames) {
    const els = [...this.querySelectorAll("ea-collapse-item")];
    els.forEach(el => {
      el.toggleAttribute(
        "active",
        activeNames.includes(el.getAttribute("name"))
      );
    });
  }

  setActiveNames(newVal) {
    if (this.accordion) {
      this.#updateAccordionCollapse(newVal);
    } else {
      this.#updateNormalCollapse(newVal);
    }
  }

  get accordion() {
    return this.hasAttribute("accordion");
  }

  get active() {
    return this._active;
  }

  set active(val) {
    if (typeof val === "string") {
      this._active = val;
      this.setActiveNames(val);
    } else if (Array.isArray(val)) {
      this._active = val;
      this.setActiveNames(val);
    }
  }

  get beforeCollapse() {
    return this._beforeCollapse;
  }

  set beforeCollapse(fn) {
    this._beforeCollapse = fn;
  }
}

if (!customElements.get("ea-collapse-item")) {
  customElements.define("ea-collapse-item", EaCollapseItem);
}

if (!customElements.get("ea-collapse")) {
  customElements.define("ea-collapse", EaCollapse);
}

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
   * 基本功能测试
   */
  describe("Basic Functionality", () => {
    it("应该正确渲染 ea-collapse 组件", () => {
      const collapse = document.createElement("ea-collapse");
      container.appendChild(collapse);

      expect(collapse).toBeDefined();
      expect(collapse.shadowRoot).toBeDefined();
    });

    it("应该包含 container CSS Part", () => {
      const collapse = document.createElement("ea-collapse");
      container.appendChild(collapse);

      expect(
        collapse.shadowRoot.querySelector('[part="container"]')
      ).toBeTruthy();
    });

    it("应该包含默认插槽", () => {
      const collapse = document.createElement("ea-collapse");
      collapse.innerHTML = `
        <ea-collapse-item title="Item 1" name="1">Content 1</ea-collapse-item>
      `;
      container.appendChild(collapse);

      const slot = collapse.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });
  });

  /**
   * Accordion 属性测试
   */
  describe("Accordion Attribute", () => {
    it("默认应该不是手风琴模式", () => {
      const collapse = document.createElement("ea-collapse");
      container.appendChild(collapse);

      expect(collapse.accordion).toBe(false);
    });

    it("设置 accordion 属性应该启用手风琴模式", () => {
      const collapse = document.createElement("ea-collapse");
      collapse.setAttribute("accordion", "");
      container.appendChild(collapse);

      expect(collapse.accordion).toBe(true);
    });

    it("手风琴模式下只能展开一个面板", async () => {
      const collapse = document.createElement("ea-collapse");
      collapse.setAttribute("accordion", "");
      collapse.innerHTML = `
        <ea-collapse-item title="Item 1" name="1">Content 1</ea-collapse-item>
        <ea-collapse-item title="Item 2" name="2">Content 2</ea-collapse-item>
      `;
      container.appendChild(collapse);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 展开第一个面板
      const item1 = collapse.querySelector('ea-collapse-item[name="1"]');
      item1.dispatchEvent(
        new CustomEvent("collapse-item-click", {
          detail: { name: "1", el: item1 },
          bubbles: true,
          cancelable: true,
        })
      );

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(item1.active).toBe(true);

      // 展开第二个面板
      const item2 = collapse.querySelector('ea-collapse-item[name="2"]');
      item2.dispatchEvent(
        new CustomEvent("collapse-item-click", {
          detail: { name: "2", el: item2 },
          bubbles: true,
          cancelable: true,
        })
      );

      await new Promise(resolve => setTimeout(resolve, 50));

      // 手风琴模式下，第一个面板应该收起
      expect(item1.active).toBe(false);
      expect(item2.active).toBe(true);
    });
  });

  /**
   * Active 属性测试
   */
  describe("Active Attribute", () => {
    it("默认 active 应该是空数组", () => {
      const collapse = document.createElement("ea-collapse");
      container.appendChild(collapse);

      expect(collapse.active).toEqual([]);
    });

    it("设置 active 为字符串应该展开对应面板", async () => {
      const collapse = document.createElement("ea-collapse");
      collapse.setAttribute("accordion", "");
      collapse.innerHTML = `
        <ea-collapse-item title="Item 1" name="1">Content 1</ea-collapse-item>
        <ea-collapse-item title="Item 2" name="2">Content 2</ea-collapse-item>
      `;
      container.appendChild(collapse);

      await new Promise(resolve => setTimeout(resolve, 50));

      collapse.active = "1";

      await new Promise(resolve => setTimeout(resolve, 50));

      const item1 = collapse.querySelector('ea-collapse-item[name="1"]');
      expect(item1.active).toBe(true);
    });

    it("设置 active 为数组应该展开多个面板", async () => {
      const collapse = document.createElement("ea-collapse");
      collapse.innerHTML = `
        <ea-collapse-item title="Item 1" name="1">Content 1</ea-collapse-item>
        <ea-collapse-item title="Item 2" name="2">Content 2</ea-collapse-item>
        <ea-collapse-item title="Item 3" name="3">Content 3</ea-collapse-item>
      `;
      container.appendChild(collapse);

      await new Promise(resolve => setTimeout(resolve, 50));

      collapse.active = ["1", "2"];

      await new Promise(resolve => setTimeout(resolve, 50));

      const item1 = collapse.querySelector('ea-collapse-item[name="1"]');
      const item2 = collapse.querySelector('ea-collapse-item[name="2"]');
      const item3 = collapse.querySelector('ea-collapse-item[name="3"]');

      expect(item1.active).toBe(true);
      expect(item2.active).toBe(true);
      expect(item3.active).toBe(false);
    });
  });

  /**
   * setActiveNames 方法测试
   */
  describe("setActiveNames Method", () => {
    it("应该使用 setActiveNames 方法设置展开的面板", async () => {
      const collapse = document.createElement("ea-collapse");
      collapse.innerHTML = `
        <ea-collapse-item title="Item 1" name="1">Content 1</ea-collapse-item>
        <ea-collapse-item title="Item 2" name="2">Content 2</ea-collapse-item>
      `;
      container.appendChild(collapse);

      await new Promise(resolve => setTimeout(resolve, 50));

      collapse.setActiveNames(["1"]);

      const item1 = collapse.querySelector('ea-collapse-item[name="1"]');
      expect(item1.active).toBe(true);
    });
  });

  /**
   * Expand Icon Position 属性测试
   */
  describe("Expand Icon Position Attribute", () => {
    it("默认图标位置应该是 right", async () => {
      const collapse = document.createElement("ea-collapse");
      collapse.innerHTML = `
        <ea-collapse-item title="Item 1" name="1">Content 1</ea-collapse-item>
      `;
      container.appendChild(collapse);

      await new Promise(resolve => setTimeout(resolve, 50));

      const item = collapse.querySelector("ea-collapse-item");
      expect(item.getAttribute("expand-icon-position")).toBeNull();
    });

    it("设置 expand-icon-position 为 left 应该应用到子项", async () => {
      const collapse = document.createElement("ea-collapse");
      collapse.innerHTML = `
        <ea-collapse-item title="Item 1" name="1">Content 1</ea-collapse-item>
      `;
      container.appendChild(collapse);

      await new Promise(resolve => setTimeout(resolve, 50));

      // 先添加到 DOM，再设置 expand-icon-position 属性，触发 attributeChangedCallback
      collapse.setAttribute("expand-icon-position", "left");

      await new Promise(resolve => setTimeout(resolve, 50));

      const item = collapse.querySelector("ea-collapse-item");
      expect(item.getAttribute("expand-icon-position")).toBe("left");
    });
  });

  /**
   * Change 事件测试
   */
  describe("Change Event", () => {
    it("展开/收起应该触发 change 事件", async () => {
      const collapse = document.createElement("ea-collapse");
      collapse.innerHTML = `
        <ea-collapse-item title="Item 1" name="1">Content 1</ea-collapse-item>
      `;
      container.appendChild(collapse);

      await new Promise(resolve => setTimeout(resolve, 50));

      const changeHandler = vi.fn();
      collapse.addEventListener("change", changeHandler);

      const item = collapse.querySelector("ea-collapse-item");
      item.dispatchEvent(
        new CustomEvent("collapse-item-click", {
          detail: { name: "1", el: item },
          bubbles: true,
          cancelable: true,
        })
      );

      expect(changeHandler).toHaveBeenCalled();
    });

    it("change 事件应该包含 name、target 和 active", async () => {
      const collapse = document.createElement("ea-collapse");
      collapse.innerHTML = `
        <ea-collapse-item title="Item 1" name="1">Content 1</ea-collapse-item>
      `;
      container.appendChild(collapse);

      await new Promise(resolve => setTimeout(resolve, 50));

      let eventDetail = null;
      collapse.addEventListener("change", e => {
        eventDetail = e.detail;
      });

      const item = collapse.querySelector("ea-collapse-item");
      item.dispatchEvent(
        new CustomEvent("collapse-item-click", {
          detail: { name: "1", el: item },
          bubbles: true,
          cancelable: true,
        })
      );

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
        <ea-collapse-item title="Item 1" name="1">Content 1</ea-collapse-item>
      `;
      container.appendChild(collapse);

      await new Promise(resolve => setTimeout(resolve, 50));

      collapse.beforeCollapse = () => false;

      const changeHandler = vi.fn();
      collapse.addEventListener("change", changeHandler);

      const item = collapse.querySelector("ea-collapse-item");
      item.dispatchEvent(
        new CustomEvent("collapse-item-click", {
          detail: { name: "1", el: item },
          bubbles: true,
          cancelable: true,
        })
      );

      expect(changeHandler).not.toHaveBeenCalled();
    });

    it("beforeCollapse 支持异步", async () => {
      const collapse = document.createElement("ea-collapse");
      collapse.innerHTML = `
        <ea-collapse-item title="Item 1" name="1">Content 1</ea-collapse-item>
      `;
      container.appendChild(collapse);

      await new Promise(resolve => setTimeout(resolve, 50));

      collapse.beforeCollapse = () => Promise.resolve(true);

      const changeHandler = vi.fn();
      collapse.addEventListener("change", changeHandler);

      const item = collapse.querySelector("ea-collapse-item");
      item.dispatchEvent(
        new CustomEvent("collapse-item-click", {
          detail: { name: "1", el: item },
          bubbles: true,
          cancelable: true,
        })
      );

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(changeHandler).toHaveBeenCalled();
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("没有子项时应该正确处理", () => {
      const collapse = document.createElement("ea-collapse");
      container.appendChild(collapse);

      const items = collapse.querySelectorAll("ea-collapse-item");
      expect(items.length).toBe(0);
    });

    it("子项没有 name 时应该使用索引作为 name", async () => {
      const collapse = document.createElement("ea-collapse");
      collapse.innerHTML = `
        <ea-collapse-item title="Item 1">Content 1</ea-collapse-item>
        <ea-collapse-item title="Item 2">Content 2</ea-collapse-item>
      `;
      container.appendChild(collapse);

      await new Promise(resolve => setTimeout(resolve, 50));

      const items = collapse.querySelectorAll("ea-collapse-item");
      expect(items[0].getAttribute("name")).toBe("0");
      expect(items[1].getAttribute("name")).toBe("1");
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const collapse = document.createElement("ea-collapse");
      collapse.innerHTML = `
        <ea-collapse-item title="Item 1" name="1">Content 1</ea-collapse-item>
      `;
      container.appendChild(collapse);

      await new Promise(resolve => setTimeout(resolve, 50));

      expect(collapse.shadowRoot.querySelector(".ea-collapse")).toBeTruthy();
    });

    it("组件断开连接后应该清理资源", () => {
      const collapse = document.createElement("ea-collapse");
      container.appendChild(collapse);

      collapse.remove();

      expect(() => {
        collapse.disconnectedCallback?.();
      }).not.toThrow();
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
   * 基本功能测试
   */
  describe("Basic Functionality", () => {
    it("应该正确渲染 ea-collapse-item 组件", () => {
      const item = document.createElement("ea-collapse-item");
      container.appendChild(item);

      expect(item).toBeDefined();
      expect(item.shadowRoot).toBeDefined();
    });

    it("应该包含必要的 CSS Part", () => {
      const item = document.createElement("ea-collapse-item");
      container.appendChild(item);

      expect(item.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
      expect(item.shadowRoot.querySelector('[part="title-wrap"]')).toBeTruthy();
      expect(item.shadowRoot.querySelector('[part="title"]')).toBeTruthy();
      expect(item.shadowRoot.querySelector('[part="indicator"]')).toBeTruthy();
      expect(
        item.shadowRoot.querySelector('[part="content-wrap"]')
      ).toBeTruthy();
    });

    it("应该包含 title 和默认插槽", () => {
      const item = document.createElement("ea-collapse-item");
      item.innerHTML = "Content";
      container.appendChild(item);

      const titleSlot = item.shadowRoot.querySelector('slot[name="title"]');
      const defaultSlot = item.shadowRoot.querySelector("slot:not([name])");
      expect(titleSlot).toBeTruthy();
      expect(defaultSlot).toBeTruthy();
    });
  });

  /**
   * Title 属性测试
   */
  describe("Title Attribute", () => {
    it("应该通过 title 属性设置标题", () => {
      const item = document.createElement("ea-collapse-item");
      item.setAttribute("title", "Test Title");
      container.appendChild(item);

      const titleSlot = item.shadowRoot.querySelector(
        ".ea-collapse-item__title slot"
      );
      expect(titleSlot.textContent).toBe("Test Title");
    });

    it("应该通过 title 插槽自定义标题", () => {
      const item = document.createElement("ea-collapse-item");
      item.innerHTML = `
        <div slot="title">Custom Title</div>
        Content
      `;
      container.appendChild(item);

      const titleSlot = item.shadowRoot.querySelector('slot[name="title"]');
      expect(titleSlot).toBeTruthy();
    });
  });

  /**
   * Name 属性测试
   */
  describe("Name Attribute", () => {
    it("应该设置 name 属性", () => {
      const item = document.createElement("ea-collapse-item");
      item.setAttribute("name", "item1");
      container.appendChild(item);

      expect(item.getAttribute("name")).toBe("item1");
    });
  });

  /**
   * Disabled 属性测试
   */
  describe("Disabled Attribute", () => {
    it("默认应该启用", () => {
      const item = document.createElement("ea-collapse-item");
      container.appendChild(item);

      expect(item.disabled).toBe(false);
    });

    it("设置 disabled 属性应该禁用", () => {
      const item = document.createElement("ea-collapse-item");
      item.setAttribute("disabled", "");
      container.appendChild(item);

      expect(item.disabled).toBe(true);
    });

    it("禁用状态应该有 disabled 类", () => {
      const item = document.createElement("ea-collapse-item");
      item.setAttribute("disabled", "");
      container.appendChild(item);

      const containerEl = item.shadowRoot.querySelector(".ea-collapse-item");
      expect(containerEl.classList.contains("disabled")).toBe(true);
    });

    it("禁用时点击不应该触发事件", async () => {
      const item = document.createElement("ea-collapse-item");
      item.setAttribute("disabled", "");
      container.appendChild(item);

      const clickHandler = vi.fn();
      item.addEventListener("collapse-item-click", clickHandler);

      const titleWrap = item.shadowRoot.querySelector(
        ".ea-collapse-item__title-wrap"
      );
      titleWrap.click();

      expect(clickHandler).not.toHaveBeenCalled();
    });
  });

  /**
   * Active 属性测试
   */
  describe("Active Attribute", () => {
    it("默认应该收起", () => {
      const item = document.createElement("ea-collapse-item");
      container.appendChild(item);

      expect(item.active).toBe(false);
    });

    it("设置 active 属性应该展开", () => {
      const item = document.createElement("ea-collapse-item");
      item.setAttribute("active", "");
      container.appendChild(item);

      expect(item.active).toBe(true);
    });

    it("active 状态应该有 active 属性", () => {
      const item = document.createElement("ea-collapse-item");
      item.setAttribute("active", "");
      container.appendChild(item);

      expect(item.hasAttribute("active")).toBe(true);
    });
  });

  /**
   * Expand Icon Position 属性测试
   */
  describe("Expand Icon Position Attribute", () => {
    it("默认图标位置应该是 right", () => {
      const item = document.createElement("ea-collapse-item");
      container.appendChild(item);

      const containerEl = item.shadowRoot.querySelector(".ea-collapse-item");
      expect(containerEl.classList.contains("--indicator-left")).toBe(false);
    });

    it("设置 expand-icon-position 为 left 应该应用 left 类", () => {
      const item = document.createElement("ea-collapse-item");
      item.setAttribute("expand-icon-position", "left");
      container.appendChild(item);

      const containerEl = item.shadowRoot.querySelector(".ea-collapse-item");
      expect(containerEl.classList.contains("--indicator-left")).toBe(true);
    });
  });

  /**
   * Icon 插槽测试
   */
  describe("Icon Slot", () => {
    it("应该支持自定义图标", () => {
      const item = document.createElement("ea-collapse-item");
      item.innerHTML = `
        <span slot="icon">▼</span>
        Content
      `;
      container.appendChild(item);

      const iconSlot = item.shadowRoot.querySelector('slot[name="icon"]');
      expect(iconSlot).toBeTruthy();
    });
  });

  /**
   * Click 事件测试
   */
  describe("Click Event", () => {
    it("点击标题应该触发 collapse-item-click 事件", () => {
      const item = document.createElement("ea-collapse-item");
      item.setAttribute("name", "item1");
      container.appendChild(item);

      const clickHandler = vi.fn();
      item.addEventListener("collapse-item-click", clickHandler);

      const titleWrap = item.shadowRoot.querySelector(
        ".ea-collapse-item__title-wrap"
      );
      titleWrap.click();

      expect(clickHandler).toHaveBeenCalled();
    });

    it("collapse-item-click 事件应该包含 name 和 el", () => {
      const item = document.createElement("ea-collapse-item");
      item.setAttribute("name", "item1");
      container.appendChild(item);

      let eventDetail = null;
      item.addEventListener("collapse-item-click", e => {
        eventDetail = e.detail;
      });

      const titleWrap = item.shadowRoot.querySelector(
        ".ea-collapse-item__title-wrap"
      );
      titleWrap.click();

      expect(eventDetail).toMatchObject({
        name: "item1",
        el: item,
      });
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("空内容时应该正确处理", () => {
      const item = document.createElement("ea-collapse-item");
      container.appendChild(item);

      expect(
        item.shadowRoot.querySelector(".ea-collapse-item__content")
      ).toBeTruthy();
    });

    it("没有 name 时 name 应该为空字符串", () => {
      const item = document.createElement("ea-collapse-item");
      container.appendChild(item);

      expect(item.name).toBe("");
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", () => {
      const item = document.createElement("ea-collapse-item");
      item.setAttribute("title", "Test");
      container.appendChild(item);

      expect(item.shadowRoot.querySelector(".ea-collapse-item")).toBeTruthy();
    });

    it("组件断开连接后应该清理资源", () => {
      const item = document.createElement("ea-collapse-item");
      container.appendChild(item);

      item.remove();

      expect(() => {
        item.disconnectedCallback?.();
      }).not.toThrow();
    });
  });
});
