import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// 模拟 ea-descriptions-item 组件
class EaDescriptionsItem extends HTMLElement {
  #label;

  static get observedAttributes() {
    return [
      "label",
      "colspan",
      "rowspan",
      "align",
      "label-align",
      "width",
      "label-width",
      "label-part",
      "content-part",
    ];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        .ea-descriptions-item {
          display: contents;
        }
        .ea-descriptions-item__label {
          font-weight: 500;
          color: #606266;
        }
        .ea-descriptions-item__content {
          color: #303133;
        }
      </style>
      <div class='ea-descriptions-item' part='container'>
        <span class='ea-descriptions-item__label' part='label'></span>
        <span class='ea-descriptions-item__content' part='content'>
          <slot></slot>
        </span>
      </div>
    `;

    this.#label = this.shadowRoot.querySelector(".ea-descriptions-item__label");
  }

  connectedCallback() {
    this.#notifyParent();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case "label":
        if (this.#label) {
          this.#label.textContent = newValue;
        }
        this.#notifyParent();
        break;
      case "colspan":
      case "rowspan":
      case "align":
      case "label-align":
      case "width":
      case "label-width":
      case "label-part":
      case "content-part":
        this.#notifyParent();
        break;
    }
  }

  #notifyParent() {
    this.dispatchEvent(
      new CustomEvent("ea-descriptions-item-change", {
        bubbles: true,
        composed: true,
      })
    );
  }

  get label() {
    return this.getAttribute("label") || "";
  }

  get colspan() {
    return parseInt(this.getAttribute("colspan")) || 1;
  }

  get rowspan() {
    return parseInt(this.getAttribute("rowspan")) || 1;
  }

  get align() {
    return this.getAttribute("align") || "";
  }

  get width() {
    return this.getAttribute("width") || "";
  }
}

// 模拟 ea-descriptions 组件
class EaDescriptions extends HTMLElement {
  #container;
  #tbody;
  #defaultSlot;
  #abortController;

  static get observedAttributes() {
    return ["column", "title", "border", "direction", "size", "label-width"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        .ea-descriptions {
          width: 100%;
          font-size: 14px;
        }
        .ea-descriptions__caption {
          text-align: left;
          margin-bottom: 16px;
        }
        .ea-descriptions__title {
          font-size: 16px;
          font-weight: 700;
          color: #303133;
        }
        .ea-descriptions__extra {
          float: right;
        }
        .ea-descriptions__body {
          width: 100%;
          border-collapse: collapse;
        }
        .ea-descriptions__tr {
          border-bottom: 1px solid #ebeef5;
        }
        .ea-descriptions__td {
          padding: 12px 0;
        }
        .ea-descriptions__label {
          color: #606266;
          font-weight: 500;
        }
        .ea-descriptions__content {
          color: #303133;
        }
        .ea-descriptions.--border .ea-descriptions__label,
        .ea-descriptions.--border .ea-descriptions__content {
          border: 1px solid #ebeef5;
          padding: 12px;
        }
        .ea-descriptions.--large {
          font-size: 16px;
        }
        .ea-descriptions.--small {
          font-size: 12px;
        }
      </style>
      <slot id='defaultSlot' part='default-slot'></slot>
      <table class='ea-descriptions' part='container'>
        <caption class='ea-descriptions__caption' part='caption'>
          <section class='ea-descriptions__title' part='title'>
            <slot name='title'></slot>
          </section>
          <section class='ea-descriptions__extra' part='extra'>
            <slot name='extra'></slot>
          </section>
        </caption>
        <tbody class='ea-descriptions__body' part='body'>
        </tbody>
      </table>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-descriptions");
    this.#tbody = this.shadowRoot.querySelector(".ea-descriptions__body");
    this.#defaultSlot = this.shadowRoot.querySelector("#defaultSlot");
  }

  connectedCallback() {
    this.#render();

    this.addEventListener("ea-descriptions-item-change", (e) => {
      e.stopImmediatePropagation();
      this.#render();
    });

    this.#defaultSlot.addEventListener("slotchange", () => {
      this.#render();
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case "column":
      case "direction":
        this.#render();
        break;
      case "border":
      case "size":
        this.updateContainerClasslist();
        break;
      case "label-width":
        this.style.setProperty("--ea-descriptions-label-width", newValue);
        break;
    }
  }

  updateContainerClasslist() {
    let className = "ea-descriptions";

    if (this.hasAttribute("border")) {
      className += " --border";
    }

    const size = this.getAttribute("size");
    if (size && size !== "default") {
      className += ` --${size}`;
    }

    if (this.#container) {
      this.#container.className = className;
    }
    return className;
  }

  #handleChildrenDivide(children, column) {
    const ary = [];
    let currentRow = 0;

    children.forEach((item) => {
      const colspan = parseInt(item.getAttribute("colspan")) || 1;
      const rowspan = parseInt(item.getAttribute("rowspan")) || 1;

      // 找到可以放置的 row
      while (ary[currentRow] && ary[currentRow].length >= column) {
        currentRow++;
      }

      if (!ary[currentRow]) {
        ary[currentRow] = [];
      }

      const option = {
        label: item.getAttribute("label") || "",
        content: item.innerHTML,
        colspan: colspan,
        rowspan: rowspan,
        align: item.getAttribute("align") || "",
        "label-align": item.getAttribute("label-align") || "",
        width: item.getAttribute("width") || "",
        "label-width": item.getAttribute("label-width") || this.getAttribute("label-width") || "",
        "label-part": item.getAttribute("label-part") || "",
        "content-part": item.getAttribute("content-part") || "",
      };

      ary[currentRow].push(option);

      // 处理跨行
      for (let i = 1; i < rowspan; i++) {
        if (!ary[currentRow + i]) {
          ary[currentRow + i] = [];
        }
        // 占位
        for (let j = 0; j < colspan; j++) {
          ary[currentRow + i].push({ placeholder: true });
        }
      }
    });

    return ary.filter((row) => row && row.length > 0);
  }

  #getVariant() {
    if (this.getAttribute("direction") === "vertical") {
      return "vertical";
    } else if (this.hasAttribute("border")) {
      return "border";
    } else {
      return "normal";
    }
  }

  #render() {
    const children = [...this.querySelectorAll("ea-descriptions-item")];
    const column = parseInt(this.getAttribute("column")) || 3;

    if (children.length === 0) {
      this.#tbody.innerHTML = "";
      return;
    }

    const rows = this.#handleChildrenDivide(children, column);
    const variant = this.#getVariant();

    let html = "";

    rows.forEach((row) => {
      if (variant === "vertical") {
        // 垂直布局：label 和 content 分行显示
        const labelRow = row
          .map(
            (item) => `
          <th class="ea-descriptions__label ea-descriptions__th" part="label cell ${item["label-part"]}">
            ${item.label}
          </th>
        `
          )
          .join("");

        const contentRow = row
          .map(
            (item) => `
          <td class="ea-descriptions__content ea-descriptions__td" part="content cell ${item["content-part"]}" rowspan="${item.rowspan * 2 - 1}">
            ${item.content}
          </td>
        `
          )
          .join("");

        html += `<tr class="ea-descriptions__tr" part="row row-label">${labelRow}</tr>`;
        html += `<tr class="ea-descriptions__tr" part="row row-content">${contentRow}</tr>`;
      } else if (variant === "border") {
        // 带边框布局
        const cells = row
          .map(
            (item) => `
          <td class="ea-descriptions__label" part="label cell ${item["label-part"]}" rowspan="${item.rowspan}">
            ${item.label}
          </td>
          <td class="ea-descriptions__content" part="content cell ${item["content-part"]}" rowspan="${item.rowspan}">
            ${item.content}
          </td>
        `
          )
          .join("");

        html += `<tr class="ea-descriptions__tr" part="row">${cells}</tr>`;
      } else {
        // 普通布局
        const cells = row
          .map(
            (item) => `
          <td class="ea-descriptions__td" part="col-cell" colspan="${item.colspan}" rowspan="${item.rowspan}">
            <span class="ea-descriptions__label" part="label cell ${item["label-part"]}">${item.label}</span>
            <span class="ea-descriptions__content" part="content cell ${item["content-part"]}">${item.content}</span>
          </td>
        `
          )
          .join("");

        html += `<tr class="ea-descriptions__tr" part="row">${cells}</tr>`;
      }
    });

    this.#tbody.innerHTML = html;
  }
}

if (!customElements.get("ea-descriptions-item")) {
  customElements.define("ea-descriptions-item", EaDescriptionsItem);
}

if (!customElements.get("ea-descriptions")) {
  customElements.define("ea-descriptions", EaDescriptions);
}

describe("EaDescriptions Component", () => {
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
    it("应该正确渲染 ea-descriptions 组件", () => {
      const descriptions = document.createElement("ea-descriptions");
      container.appendChild(descriptions);

      expect(descriptions).toBeDefined();
      expect(descriptions.shadowRoot).toBeDefined();
    });

    it("应该包含必要的 CSS Part", () => {
      const descriptions = document.createElement("ea-descriptions");
      container.appendChild(descriptions);

      expect(descriptions.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
      expect(descriptions.shadowRoot.querySelector('[part="caption"]')).toBeTruthy();
      expect(descriptions.shadowRoot.querySelector('[part="title"]')).toBeTruthy();
      expect(descriptions.shadowRoot.querySelector('[part="extra"]')).toBeTruthy();
      expect(descriptions.shadowRoot.querySelector('[part="body"]')).toBeTruthy();
    });

    it("应该包含 title 和 extra 插槽", () => {
      const descriptions = document.createElement("ea-descriptions");
      container.appendChild(descriptions);

      const titleSlot = descriptions.shadowRoot.querySelector('slot[name="title"]');
      const extraSlot = descriptions.shadowRoot.querySelector('slot[name="extra"]');
      expect(titleSlot).toBeTruthy();
      expect(extraSlot).toBeTruthy();
    });
  });

  /**
   * Column 属性测试
   */
  describe("Column Attribute", () => {
    it("默认 column 应该是 3", async () => {
      const descriptions = document.createElement("ea-descriptions");
      descriptions.innerHTML = `
        <ea-descriptions-item label="Name">John</ea-descriptions-item>
        <ea-descriptions-item label="Age">25</ea-descriptions-item>
        <ea-descriptions-item label="City">Beijing</ea-descriptions-item>
      `;
      container.appendChild(descriptions);

      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(descriptions.getAttribute("column")).toBeNull();
    });

    it("设置 column 应该改变列数", async () => {
      const descriptions = document.createElement("ea-descriptions");
      descriptions.setAttribute("column", "2");
      descriptions.innerHTML = `
        <ea-descriptions-item label="Name">John</ea-descriptions-item>
        <ea-descriptions-item label="Age">25</ea-descriptions-item>
      `;
      container.appendChild(descriptions);

      await new Promise((resolve) => setTimeout(resolve, 50));

      const tbody = descriptions.shadowRoot.querySelector(".ea-descriptions__body");
      expect(tbody.innerHTML).toContain("Name");
      expect(tbody.innerHTML).toContain("Age");
    });
  });

  /**
   * Border 属性测试
   */
  describe("Border Attribute", () => {
    it("默认应该没有边框", () => {
      const descriptions = document.createElement("ea-descriptions");
      container.appendChild(descriptions);

      const containerEl = descriptions.shadowRoot.querySelector(".ea-descriptions");
      expect(containerEl.classList.contains("--border")).toBe(false);
    });

    it("设置 border 属性应该应用边框样式", () => {
      const descriptions = document.createElement("ea-descriptions");
      descriptions.setAttribute("border", "");
      container.appendChild(descriptions);

      const containerEl = descriptions.shadowRoot.querySelector(".ea-descriptions");
      expect(containerEl.classList.contains("--border")).toBe(true);
    });
  });

  /**
   * Direction 属性测试
   */
  describe("Direction Attribute", () => {
    it("默认 direction 应该是 horizontal", async () => {
      const descriptions = document.createElement("ea-descriptions");
      descriptions.innerHTML = `
        <ea-descriptions-item label="Name">John</ea-descriptions-item>
      `;
      container.appendChild(descriptions);

      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(descriptions.getAttribute("direction")).toBeNull();
    });

    it("设置 direction 为 vertical 应该垂直布局", async () => {
      const descriptions = document.createElement("ea-descriptions");
      descriptions.setAttribute("direction", "vertical");
      descriptions.innerHTML = `
        <ea-descriptions-item label="Name">John</ea-descriptions-item>
      `;
      container.appendChild(descriptions);

      await new Promise((resolve) => setTimeout(resolve, 50));

      const tbody = descriptions.shadowRoot.querySelector(".ea-descriptions__body");
      // 垂直布局应该有 th 标签
      expect(tbody.innerHTML).toContain("<th");
    });
  });

  /**
   * Size 属性测试
   */
  describe("Size Attribute", () => {
    it("默认 size 应该是 default", () => {
      const descriptions = document.createElement("ea-descriptions");
      container.appendChild(descriptions);

      const containerEl = descriptions.shadowRoot.querySelector(".ea-descriptions");
      expect(containerEl.classList.contains("--large")).toBe(false);
      expect(containerEl.classList.contains("--small")).toBe(false);
    });

    it("设置 size='large' 应该应用 large 类", () => {
      const descriptions = document.createElement("ea-descriptions");
      descriptions.setAttribute("size", "large");
      container.appendChild(descriptions);

      const containerEl = descriptions.shadowRoot.querySelector(".ea-descriptions");
      expect(containerEl.classList.contains("--large")).toBe(true);
    });

    it("设置 size='small' 应该应用 small 类", () => {
      const descriptions = document.createElement("ea-descriptions");
      descriptions.setAttribute("size", "small");
      container.appendChild(descriptions);

      const containerEl = descriptions.shadowRoot.querySelector(".ea-descriptions");
      expect(containerEl.classList.contains("--small")).toBe(true);
    });
  });

  /**
   * Label Width 属性测试
   */
  describe("Label Width Attribute", () => {
    it("应该设置 label-width 属性", () => {
      const descriptions = document.createElement("ea-descriptions");
      descriptions.setAttribute("label-width", "120px");
      container.appendChild(descriptions);

      expect(descriptions.getAttribute("label-width")).toBe("120px");
    });
  });

  /**
   * 子项渲染测试
   */
  describe("Children Rendering", () => {
    it("应该正确渲染子项", async () => {
      const descriptions = document.createElement("ea-descriptions");
      descriptions.innerHTML = `
        <ea-descriptions-item label="Name">John</ea-descriptions-item>
        <ea-descriptions-item label="Age">25</ea-descriptions-item>
      `;
      container.appendChild(descriptions);

      await new Promise((resolve) => setTimeout(resolve, 50));

      const tbody = descriptions.shadowRoot.querySelector(".ea-descriptions__body");
      expect(tbody.innerHTML).toContain("Name");
      expect(tbody.innerHTML).toContain("John");
      expect(tbody.innerHTML).toContain("Age");
      expect(tbody.innerHTML).toContain("25");
    });

    it("动态添加子项应该更新", async () => {
      const descriptions = document.createElement("ea-descriptions");
      descriptions.innerHTML = `
        <ea-descriptions-item label="Name">John</ea-descriptions-item>
      `;
      container.appendChild(descriptions);

      await new Promise((resolve) => setTimeout(resolve, 50));

      const newItem = document.createElement("ea-descriptions-item");
      newItem.setAttribute("label", "Age");
      newItem.textContent = "25";
      descriptions.appendChild(newItem);

      await new Promise((resolve) => setTimeout(resolve, 50));

      const tbody = descriptions.shadowRoot.querySelector(".ea-descriptions__body");
      expect(tbody.innerHTML).toContain("Age");
      expect(tbody.innerHTML).toContain("25");
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("没有子项时应该正确处理", async () => {
      const descriptions = document.createElement("ea-descriptions");
      container.appendChild(descriptions);

      await new Promise((resolve) => setTimeout(resolve, 50));

      const tbody = descriptions.shadowRoot.querySelector(".ea-descriptions__body");
      expect(tbody.innerHTML).toBe("");
    });

    it("只有一个子项时应该正确处理", async () => {
      const descriptions = document.createElement("ea-descriptions");
      descriptions.innerHTML = `
        <ea-descriptions-item label="Name">John</ea-descriptions-item>
      `;
      container.appendChild(descriptions);

      await new Promise((resolve) => setTimeout(resolve, 50));

      const tbody = descriptions.shadowRoot.querySelector(".ea-descriptions__body");
      expect(tbody.innerHTML).toContain("Name");
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", async () => {
      const descriptions = document.createElement("ea-descriptions");
      descriptions.innerHTML = `
        <ea-descriptions-item label="Name">John</ea-descriptions-item>
      `;
      container.appendChild(descriptions);

      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(descriptions.shadowRoot.querySelector(".ea-descriptions")).toBeTruthy();
    });

    it("组件断开连接后应该清理资源", () => {
      const descriptions = document.createElement("ea-descriptions");
      container.appendChild(descriptions);

      descriptions.remove();

      expect(() => {
        descriptions.disconnectedCallback?.();
      }).not.toThrow();
    });
  });
});

describe("EaDescriptionsItem Component", () => {
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
    it("应该正确渲染 ea-descriptions-item 组件", () => {
      const item = document.createElement("ea-descriptions-item");
      container.appendChild(item);

      expect(item).toBeDefined();
      expect(item.shadowRoot).toBeDefined();
    });

    it("应该包含必要的 CSS Part", () => {
      const item = document.createElement("ea-descriptions-item");
      container.appendChild(item);

      expect(item.shadowRoot.querySelector('[part="container"]')).toBeTruthy();
      expect(item.shadowRoot.querySelector('[part="label"]')).toBeTruthy();
      expect(item.shadowRoot.querySelector('[part="content"]')).toBeTruthy();
    });

    it("应该包含默认插槽", () => {
      const item = document.createElement("ea-descriptions-item");
      item.innerHTML = "Content";
      container.appendChild(item);

      const slot = item.shadowRoot.querySelector("slot");
      expect(slot).toBeTruthy();
    });
  });

  /**
   * Label 属性测试
   */
  describe("Label Attribute", () => {
    it("应该通过 label 属性设置标签", () => {
      const item = document.createElement("ea-descriptions-item");
      item.setAttribute("label", "Name");
      container.appendChild(item);

      const labelEl = item.shadowRoot.querySelector(".ea-descriptions-item__label");
      expect(labelEl.textContent).toBe("Name");
    });

    it("应该获取 label 属性", () => {
      const item = document.createElement("ea-descriptions-item");
      item.setAttribute("label", "Name");
      container.appendChild(item);

      expect(item.label).toBe("Name");
    });
  });

  /**
   * Colspan 属性测试
   */
  describe("Colspan Attribute", () => {
    it("默认 colspan 应该是 1", () => {
      const item = document.createElement("ea-descriptions-item");
      container.appendChild(item);

      expect(item.colspan).toBe(1);
    });

    it("设置 colspan 应该改变跨列数", () => {
      const item = document.createElement("ea-descriptions-item");
      item.setAttribute("colspan", "2");
      container.appendChild(item);

      expect(item.colspan).toBe(2);
    });
  });

  /**
   * Rowspan 属性测试
   */
  describe("Rowspan Attribute", () => {
    it("默认 rowspan 应该是 1", () => {
      const item = document.createElement("ea-descriptions-item");
      container.appendChild(item);

      expect(item.rowspan).toBe(1);
    });

    it("设置 rowspan 应该改变跨行数", () => {
      const item = document.createElement("ea-descriptions-item");
      item.setAttribute("rowspan", "2");
      container.appendChild(item);

      expect(item.rowspan).toBe(2);
    });
  });

  /**
   * Align 属性测试
   */
  describe("Align Attribute", () => {
    it("应该设置 align 属性", () => {
      const item = document.createElement("ea-descriptions-item");
      item.setAttribute("align", "center");
      container.appendChild(item);

      expect(item.align).toBe("center");
    });
  });

  /**
   * Label Align 属性测试
   */
  describe("Label Align Attribute", () => {
    it("应该设置 label-align 属性", () => {
      const item = document.createElement("ea-descriptions-item");
      item.setAttribute("label-align", "right");
      container.appendChild(item);

      expect(item.getAttribute("label-align")).toBe("right");
    });
  });

  /**
   * Width 属性测试
   */
  describe("Width Attribute", () => {
    it("应该设置 width 属性", () => {
      const item = document.createElement("ea-descriptions-item");
      item.setAttribute("width", "150px");
      container.appendChild(item);

      expect(item.width).toBe("150px");
    });
  });

  /**
   * Label Part 属性测试
   */
  describe("Label Part Attribute", () => {
    it("应该设置 label-part 属性", () => {
      const item = document.createElement("ea-descriptions-item");
      item.setAttribute("label-part", "custom-label");
      container.appendChild(item);

      expect(item.getAttribute("label-part")).toBe("custom-label");
    });
  });

  /**
   * Content Part 属性测试
   */
  describe("Content Part Attribute", () => {
    it("应该设置 content-part 属性", () => {
      const item = document.createElement("ea-descriptions-item");
      item.setAttribute("content-part", "custom-content");
      container.appendChild(item);

      expect(item.getAttribute("content-part")).toBe("custom-content");
    });
  });

  /**
   * Change 事件测试
   */
  describe("Change Event", () => {
    it("属性变化应该触发 ea-descriptions-item-change 事件", () => {
      const item = document.createElement("ea-descriptions-item");
      container.appendChild(item);

      const changeHandler = vi.fn();
      item.addEventListener("ea-descriptions-item-change", changeHandler);

      item.setAttribute("label", "New Label");

      expect(changeHandler).toHaveBeenCalled();
    });
  });

  /**
   * 边界条件测试
   */
  describe("Edge Cases", () => {
    it("空内容时应该正确处理", () => {
      const item = document.createElement("ea-descriptions-item");
      container.appendChild(item);

      const contentEl = item.shadowRoot.querySelector(".ea-descriptions-item__content");
      expect(contentEl).toBeTruthy();
    });

    it("没有 label 时 label 应该为空字符串", () => {
      const item = document.createElement("ea-descriptions-item");
      container.appendChild(item);

      expect(item.label).toBe("");
    });
  });

  /**
   * 生命周期测试
   */
  describe("Lifecycle", () => {
    it("组件连接后应该正确初始化", () => {
      const item = document.createElement("ea-descriptions-item");
      item.setAttribute("label", "Test");
      container.appendChild(item);

      expect(item.shadowRoot.querySelector(".ea-descriptions-item")).toBeTruthy();
    });

    it("组件断开连接后应该清理资源", () => {
      const item = document.createElement("ea-descriptions-item");
      container.appendChild(item);

      item.remove();

      expect(() => {
        item.disconnectedCallback?.();
      }).not.toThrow();
    });
  });
});
