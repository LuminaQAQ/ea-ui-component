import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

/**
 * @typedef TableColumnCtx 表格列对象
 * @property {string} label
 * @property {string} prop
 * @property {string} type
 * @property {number} colspan
 * @property {number} rowspan
 * @property {string} align
 * @property {string} width
 * @property {boolean} sortable
 * @property {string} fixed
 * @property {number} depth
 * @property {Attr[]} props
 * @property {string} header
 * @property {TableColumnCtx | HTMLTemplateElement | string} template
 */

export class EaTableColumn extends Base {
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "type",
      "align",
      "label",
      "prop",
      "colspan",
      "width",
      "sortable",
      "fixed",
    ];
  }

  /** @type {HTMLSpanElement | null} */
  #label;

  /** @type {MutationObserver | null} */
  #contentObserver = null;

  state = this.properties({
    type: {
      type: ["selection", "index"],
      default: "",
      /** @param {"selection" | "index"} newVal */
      observer: newVal => {
        if (newVal === "selection" && !customElements.get("ea-checkbox")) {
          import("@components/ea-checkbox/index.js");
        }
        this.#notifyParent();
      },
    },
    align: {
      type: ["left", "center", "right"],
      default: "left",
      observer: () => {
        this.#notifyParent();
      },
    },
    label: {
      type: String,
      default: "",
      observer: () => {
        if (this.#label)
          this.#label.textContent = `${this.label}[$${this.prop}]`;
        this.#notifyParent();
      },
    },
    prop: {
      type: String,
      default: "",
      observer: () => {
        if (this.#label)
          this.#label.textContent = `${this.label}[$${this.prop}]`;
        this.#notifyParent();
      },
    },
    colspan: {
      type: Number,
      default: () => this.querySelectorAll("ea-table-column").length || 1,
      observer: () => {
        this.#notifyParent();
      },
    },
    width: {
      type: String,
      default: "",
      observer: () => {
        this.#notifyParent();
      },
    },
    sortable: {
      type: Boolean,
      default: false,
      observer: () => {
        this.#notifyParent();
      },
    },
    fixed: {
      type: ["left", "right", "false"],
      default: () => {
        if (!this.hasAttribute("fixed")) return null;
        const value = this.getAttribute("fixed");
        if (value === "false" || value === "null" || value === "")
          return "left";
        return value || "left";
      },
      observer: () => {
        this.#notifyParent();
      },
    },
  });

  propState = this.properties({
    option: {
      props: true,
      type: Object,
      default: {},
      observer: () => {
        this.#notifyParent();
      },
    },
  });

  funcStates = this.properties({
    getColumnTree: {
      props: true,
      type: Object,
      /**
       * @returns {TableColumnCtx}
       */
      default: () => {
        const table = this.closest("ea-table");
        const columns = [...this.querySelectorAll("& > ea-table-column")];
        /** @type {HTMLSlotElement} */
        const headerSlot = this.shadowRoot.querySelector(`slot[name="header"]`);
        /** @type {HTMLSlotElement} */
        const defaultSlot = this.shadowRoot.querySelector(`#defaultSlot`);

        const exclude = ["prop", "label", "width", "fixed", "sortable"];
        let template = null;

        if (columns.length) {
          template = columns.map(columns => columns.getColumnTree);
        } else {
          const assignedNodes = Array.from(defaultSlot.assignedElements() || [])
            .map(item => item.outerHTML?.trim())
            .join("");

          if (assignedNodes) {
            const tpl = document.createElement("template");
            tpl.innerHTML = this.html(assignedNodes);
            template = tpl;
          } else {
            template = null;
          }
        }

        return {
          label: this.label,
          prop: this.prop,
          type: this.type,

          colspan: this.colspan,
          rowspan: template
            ? 1
            : this.#getMaxDepth(table) - this.#getThisDepth(this, table) + 1,
          align: this.align,
          width: this.width,
          sortable: this.sortable,
          fixed: this.fixed,

          depth: this.#getThisDepth(this, table),

          props: [...this.attributes].filter(
            attr => !exclude.includes(attr.name)
          ),

          header:
            headerSlot
              .assignedElements()
              .map(item => item.outerHTML?.trim())
              .join("") || null,
          template,
        };
      },
    },
  });

  /**
   * 获取当前组件的深度
   * @param {EaTableColumn} el
   * @param {import("../ea-table/index.js").EaTable} root
   * @returns {number}
   */
  #getThisDepth = (el, root) => {
    let depth = 0;

    while (el !== root) {
      el = el.parentElement;
      depth++;
    }

    return depth;
  };

  /**
   * 获取最大深度
   * @param {import("../ea-table/index.js").EaTable} root
   * @returns {number}
   */
  #getMaxDepth = root => {
    let depth = 0;

    root.querySelectorAll("ea-table-column").forEach(el => {
      depth = Math.max(depth, this.#getThisDepth(el, root));
    });

    return depth;
  };

  constructor() {
    super();

    this.stylesheet = stylesheet;

    this.$render();
  }

  $render() {
    this.shadowRoot.innerHTML = `
      <div class='ea-table-column' part='container'>
        <header class='ea-table-column__label' part='label'>${this.label}[$${this.prop}]</header>
        <span class='ea-table-column__content' part='content'>
          <slot name="header"></slot>
          <slot id="defaultSlot" part="default-slot"></slot>
        </span>
      </div>
    `;

    this.#label = this.shadowRoot.querySelector(".ea-table-column__label");
  }

  /**
   * 通知父组件更新
   */
  #notifyParent() {
    this.emit("ea-table-column-change", {
      bubbles: true,
      composed: true,
    });
  }

  /**
   * 监听默认插槽变化
   */
  #setupContentObserver() {
    this.#contentObserver = new MutationObserver(() => {
      this.#notifyParent();
    });

    this.#contentObserver.observe(this, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }

  connectedCallback() {
    super.connectedCallback();

    this.#setupContentObserver();
  }

  $beforeUnmounted() {
    if (this.#contentObserver) {
      this.#contentObserver.disconnect();
      this.#contentObserver = null;
    }
  }
}

if (!window.customElements.get("ea-table-column")) {
  window.customElements.define("ea-table-column", EaTableColumn);
}
