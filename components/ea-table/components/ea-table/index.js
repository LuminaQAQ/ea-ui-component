import Base from "@components/Base.js";
import EaUtils from "@/utils/Utils";

import stylesheet from "./index.scss?inline";

import { colgroupRenderer } from "../colgroup";
import { h } from "../../utils/h";
import { theadRenderer } from "../thead";

/**
 * @typedef {Element & {template: HTMLTemplateElement}} EaTableColumnElement
 */

/**
 * @typedef {Object} CulumnOption
 * @property {String | null} prop
 * @property {String | null} label
 * @property {String | null} width
 * @property {Boolean | String | null} fixed
 * @property {Attr[]} props
 * @property {HTMLTemplateElement} template
 */

export class EaTable extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #thead;
  /** @type {HTMLElement} */
  #tbody;
  /** @type {HTMLElement} */
  #tfoot;

  #states = {
    isDataRendered: false,

    currentRow: {},
    columns: [],
    dataSource: [],
  };

  static get observedAttributes() {
    return [...super.observedAttributes, "stripe", "border", "height"];
  }

  state = this.properties({
    stripe: {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        this.#container.className = this.updateContainerClasslist();
      },
    },
    border: {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        this.#container.className = this.updateContainerClasslist();
      },
    },
    height: {
      type: String,
      default: 0,
      observer: (newVal) => {
        if (newVal) {
          this.#container.style.setProperty("--ea-table-height", newVal);
          this.#container.className = this.updateContainerClasslist();
        }
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    return this.computedClasslist(
      "ea-table",
      {
        // ['--' + this.type]: this.type,
      },
      {
        stripe: this.stripe,
        border: this.border,
        "sticky-header": CSS.supports("height", this.height),
      }
    );
  }

  constructor() {
    super();

    this.stylesheet = stylesheet;

    this.shadowRoot.innerHTML = `
      <table class='ea-table' part='container'>
        <slot></slot>
      </table>
        `;

    this.#container = this.shadowRoot.querySelector(".ea-table");
  }

  async $render() {
    const tableColumnNodes = /** @type {EaTableColumnElement[]} */ ([
      ...this.querySelectorAll("ea-table-column[prop]"),
    ]);

    await Promise.all(
      tableColumnNodes.map((column) =>
        EaUtils.EaElement.addAsyncEventListener(column, "ea-table-column-ready")
      )
    );

    const exclude = ["prop", "label", "width", "fixed"];
    /** @type {CulumnOption[]} */
    const columnObject = tableColumnNodes.map((column) => ({
      prop: column.getAttribute("prop"),
      label: column.getAttribute("label"),
      width: column.getAttribute("width"),
      fixed:
        column.getAttribute("fixed") ||
        typeof column.getAttribute("fixed") === "string"
          ? column.getAttribute("fixed") || "left"
          : null,
      props: [...column.attributes].filter(
        (attr) => !exclude.includes(attr.name)
      ),
      template: column.template,
    }));
    console.log(columnObject);

    const colgroup = h(
      "colgroup",
      "ea-table__colgroup",
      {
        part: "colgroup",
      },
      columnObject.map((column) =>
        h("col", "ea-table__col", { width: column.width, part: "col" })
      )
    );

    const thead = h(
      "thead",
      "ea-table__thead",
      {
        part: "thead",
      },
      h(
        "tr",
        "ea-table__tr is-thead",
        {
          part: "thead-tr",
        },
        columnObject.map((column) =>
          h(
            "th",
            `ea-table__th ${
              column.fixed ? `is-fixed fixed-${column.fixed}` : ""
            } `,
            {
              part: "thead-th",
              style: [
                column.width ? `--ea-table-cell-width: ${column.width}` : "",
              ],
            },
            column.label || column.prop || ""
          )
        )
      )
    );

    const tfoot = h(
      "tfoot",
      "ea-table__tfoot",
      {
        part: "tfoot",
      },
      h("tr", "ea-table__tr is-tfoot", {})
    );

    const tbody = h("tbody", "ea-table__tbody", {
      part: "tbody",
    });

    this.#container.innerHTML = `
        ${colgroup}
        ${thead}
        ${tbody}
        ${tfoot}
    `;

    this.#thead = this.shadowRoot.querySelector(".ea-table__thead");
    this.#tbody = this.shadowRoot.querySelector(".ea-table__tbody");
    this.#tfoot = this.shadowRoot.querySelector(".ea-table__tfoot");
    this.#states.columns = columnObject;
  }

  setData = (dataSource) => {
    this.#states.isDataRendered = false;
    this.#states.dataSource = dataSource;
    this.#tbody.innerHTML = "";

    const tbodyTemplate = document.createElement("template");
    tbodyTemplate.innerHTML = dataSource
      .map((item, i) => {
        return h(
          "tr",
          "ea-table__tr",
          {
            part: "tbody-tr",
            "data-index": i,
          },
          this.#states.columns.map((column) => {
            let children = "";

            /** @type {HTMLElement} */
            const template = column.template;

            const scopes = template?.content?.querySelectorAll(`[data-scope]`);
            if (scopes?.length) {
              scopes.forEach((scope) => {
                const scopeKey = scope.getAttribute("data-scope");

                if (scope && scopeKey && template) {
                  scope.innerHTML = item[scopeKey];
                  children = template.innerHTML;
                } else if (template) {
                  children = template.innerHTML;
                } else {
                  children = item[column.prop];
                }
              });
            } else if (template) {
              children = template.innerHTML;
            } else {
              children = item[column.prop];
            }

            return h(
              "td",
              `ea-table__td  ${
                column.fixed ? `is-fixed fixed-${column.fixed}` : ""
              }`,
              {
                part: "tbody-td",
                style: [
                  column.width ? `--ea-table-cell-width: ${column.width}` : "",
                ],
              },
              children
            );
          })
        );
      })
      .join("");

    this.#tbody.appendChild(tbodyTemplate.content.cloneNode(true));
    this.#states.isDataRendered = true;
    this.dispatchEvent("data-rendered");
  };

  /**
   * 设置行样式
   * @param {Function | String} handler
   */
  setRowStylePart = (handler) => {
    if (!this.#states.isDataRendered)
      return console.warn("[EaTable] Please set data first!", this);

    /** @type {HTMLElement[]} */
    const trs = [...this.#tbody.querySelectorAll("tr")];
    if (typeof handler === "function") {
      trs.forEach((tr, i) => {
        const className = handler({
          row: this.#states.dataSource[tr.dataset.index],
          rowIndex: i,
        });

        if (className) tr.part.add(className);
      });
    } else if (typeof handler === "string") {
      if (!handler) return;

      trs.forEach((tr, i) => {
        tr.part.add(handler);
      });
    }
  };

  async getCurrentRow() {
    await EaUtils.EaElement.addAsyncEventListener(this, "row-click");

    return this.#states.currentRow;
  }

  async connectedCallback() {
    super.connectedCallback();

    await this.$render();

    this.#container.addEventListener("click", (e) => {
      const tr = e.target.closest("tr");
      const td = e.target.closest("td");
      if (tr) {
        this.#states.currentRow = this.#states.dataSource[tr.dataset.index];
        this.dispatchEvent("row-click", {
          detail: this.#states.dataSource[tr.dataset.index],
        });
      }
      if (td) {
        this.dispatchEvent("cell-click");
      }
    });
  }
}

if (!window.customElements.get("ea-table")) {
  window.customElements.define("ea-table", EaTable);
}
