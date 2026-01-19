import Base from "@components/Base.js";

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
    return [...super.observedAttributes, "type"];
  }

  state = this.properties({
    type: {
      type: ["selection", "index"],
      default: "",
      /** @param {"selection" | "index"} newVal */
      observer: newVal => {
        if (newVal === "selection" && !customElements.get("ea-checkbox")) {
          import("@components/ea-checkbox/index.js");
        }
      },
    },
    align: {
      type: ["left", "center", "right"],
      default: "left",
    },
    label: {
      type: String,
      default: "",
    },
    prop: {
      type: String,
      default: "",
    },
    colspan: {
      type: Number,
      default: () => this.querySelectorAll("ea-table-column").length || 1,
    },
    width: {
      type: String,
      default: "",
    },
    sortable: {
      type: Boolean,
      default: false,
    },
    fixed: {
      type: String,
      default: () => {
        return this.hasAttribute("fixed")
          ? this.getAttribute("fixed") || "left"
          : null;
      },
    },
  });

  propState = this.properties({
    option: {
      props: true,
      type: Object,
      default: {},
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
        } else if (this.innerHTML) {
          const tpl = document.createElement("template");
          const html = this.html(
            Array.from(defaultSlot.assignedNodes(), item =>
              item.outerHTML?.trim()
            )
              .filter(item => item)
              .join("")
          );
          tpl.innerHTML = html;
          template = tpl;
        } else {
          template = null;
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

          header: headerSlot.assignedNodes()[0]?.outerHTML?.trim() || null,
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

    this.shadowRoot.innerHTML = `
      <slot name="header"></slot>
      <slot id="defaultSlot"></slot>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

if (!window.customElements.get("ea-table-column")) {
  window.customElements.define("ea-table-column", EaTableColumn);
}
