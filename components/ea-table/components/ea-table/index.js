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
    currentRow: {},
    columns: [],
  };

  static get observedAttributes() {
    return [...super.observedAttributes, "stripe"];
  }

  state = this.properties({
    stripe: {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        this.#container.className = this.updateContainerClasslist();
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
        column.getAttribute("fixed") || column.getAttribute("fixed") === ""
          ? true
          : null,
      props: [...column.attributes].filter(
        (attr) => !exclude.includes(attr.name)
      ),
      template: column.template,
    }));

    const colgroup = h(
      "colgroup",
      "ea-table__colgroup",
      {},
      columnObject.map((column) =>
        h("col", "ea-table__col", { width: column.width })
      )
    );

    const thead = h(
      "thead",
      "ea-table__thead",
      {},
      h(
        "tr",
        "ea-table__tr is-thead",
        {},
        columnObject.map((column) =>
          h(
            "th",
            "ea-table__th",
            {
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
      {},
      h("tr", "ea-table__tr is-tfoot", {})
    );

    const tbody = h("tbody", "ea-table__tbody", {});

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
    this.#tbody.innerHTML = "";

    const tbodyTemplate = document.createElement("template");
    tbodyTemplate.innerHTML = dataSource
      .map((item, i) => {
        return h(
          "tr",
          "ea-table__tr",
          {},
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
            } else {
              children = item[column.prop];
            }

            return h(
              "td",
              "ea-table__td",
              {
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

    /**@type {HTMLTableRowElement[]} */
    const trs = [...tbodyTemplate.content.querySelectorAll("tr")];
    trs.forEach((tr, i) => {
      tr.dataSource = dataSource[i];
    });

    this.#tbody.appendChild(tbodyTemplate.content.cloneNode(true));
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
        this.#states.currentRow = tr.dataSource;
        this.dispatchEvent("row-click", { detail: tr.dataSource });
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
