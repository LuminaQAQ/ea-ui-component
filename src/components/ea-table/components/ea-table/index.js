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

  /** @type {AbortController} */
  #abortController;

  #states = {
    isDataRendered: false,

    currentRow: {},
    columns: [],
    dataSource: [],
  };

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "stripe",
      "border",
      "height",
      "max-height",
    ];
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
      default: null,
      observer: (newVal) => {
        if (newVal) {
          this.#container.style.setProperty("--ea-table-height", newVal);
          this.#container.className = this.updateContainerClasslist();
        }
      },
    },
    "max-height": {
      type: String,
      default: null,
      observer: (newVal) => {
        if (newVal) {
          this.#container.style.setProperty("--ea-table-max-height", newVal);
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
        "sticky-header":
          CSS.supports("height", this.height) ||
          CSS.supports("height", this.maxHeight),
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
      ...this.querySelectorAll("ea-table-column"),
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

    let thead = h(
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

    if (this.id === "groupingHeadTable") {
      /**
       * 递归获取所有子元素
       * @param {HTMLElement} el
       * @param {number} depth
       * @returns
       */
      const tree = (el, depth = 0) => {
        if (!el) return;

        const columns = el.querySelectorAll("& > ea-table-column");
        const map = new Map();
        depth++;

        columns.forEach((column) => {
          const columnTree = tree(column, depth);
          map.set(column.getAttribute("prop") || column.getAttribute("label"), {
            depth,
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
            template: columnTree.size
              ? Object.fromEntries(columnTree.entries())
              : column?.template,
          });
        });

        return map;
      };

      /**
       * 获取 通过h函数创建的column的树结构
       * @param {Object} columns
       */
      const treeRenderer = (columns) => {
        let template = "";

        /**
         * 获取column的树结构
         * @param {Array} column
         */
        const flat = (column) => {
          if (!column) return column;

          let ary = [];
          Object.values(column).forEach((col) => {
            ary.push(col);
            if (col?.template) ary = [...ary, ...flat(col.template)];
          });

          return ary;
        };

        const flattenColumns = flat(columns).sort((a, b) => a.depth - b.depth);
        const depth = flattenColumns.reduce((acc, cur) => {
          return Math.max(acc, cur.depth);
        }, 0);

        for (let i = flattenColumns[0].depth; i <= depth; i++) {
          const currentDepthColumns = flattenColumns.filter(
            (column) => column.depth === i
          );

          template += h(
            "tr",
            "ea-table__tr is-thead",
            {
              part: "thead-tr",
            },
            currentDepthColumns.map((column) =>
              h(
                "th",
                `ea-table__th ${
                  column.fixed ? `is-fixed fixed-${column.fixed}` : ""
                } `,
                {
                  part: "thead-th",
                  style: [
                    column.width
                      ? `--ea-table-cell-width: ${column.width}`
                      : "",
                  ],
                },
                column.label || column.prop || ""
              )
            )
          );
        }

        return template;
      };
      thead = treeRenderer(Object.fromEntries(tree(this).entries()));
      console.log(treeRenderer(Object.fromEntries(tree(this).entries())));
    }

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

    this.dispatchEvent("ea-table-rendered");
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
    this.#handleFixedColumn();
    this.#initScrollEvent();
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

  /**
   * 获取当前行数据
   * @returns {Promise<Object>}
   */
  async getCurrentRow() {
    await EaUtils.EaElement.addAsyncEventListener(this, "row-click");

    return this.#states.currentRow;
  }

  /**
   * 处理固定列的位置和阴影（box-shadow）
   */
  #handleFixedColumn = () => {
    /** @type {HTMLElement[]} */
    const fixedItems = [...this.#container.querySelectorAll(".is-fixed")];
    const leftFixedItems = fixedItems.filter((item) =>
      item.classList.contains("fixed-left")
    );
    const rightFixedItems = fixedItems.filter((item) =>
      item.classList.contains("fixed-right")
    );

    /**
     * 列方向分组
     * @param {Array} initialArray
     * @returns {Array}
     */
    const directionDivider = (initialArray) => {
      const ths = initialArray.filter((item) => item.part.contains("thead-th"));
      if (ths.length <= 1) return [initialArray];

      const ary = [];

      /**
       * 按照带有fixed的th来分组
       * eg: [[th1, th2 ...], [td1, td2 ...] ...]
       */
      for (let i = 0; i < initialArray.length; i += ths.length) {
        ary.push(initialArray.slice(i, i + ths.length));
      }

      /**
       * 创建二维数组
       * eg: [[th1, th1-td1, th1-td2 ...], [th2, th2-td1, th2-td2 ...] ...]
       */
      return ary.reduce((acc, item) => {
        item.forEach((el, index) => {
          acc[index] = [...acc[index], el];
        });

        return acc;
      }, Array(ths.length).fill([]));
    };

    /**
     * 处理固定列的样式：位置、box-shadow
     * @param {Array} fixedColumnGroup
     */
    const handleColumnStyles = (fixedColumnGroup) => {
      if (!fixedColumnGroup.length) return;

      const lastGroup = fixedColumnGroup.slice(-1)[0];

      // 如果当前列不是第一列，那么就设置其 inset 位置
      fixedColumnGroup.forEach((group, index) => {
        const previousGroup = fixedColumnGroup[index - 1] || [];
        group.forEach((el) => {
          if (lastGroup && previousGroup[0])
            el.style.setProperty(
              "--ea-table-fixed-x",
              `${index * previousGroup[0].offsetWidth}px`
            );
        });
      });

      // 设置最后一列的样式， 确保 box-shadow 只在最后一列显示
      lastGroup.forEach((el) => {
        el.classList.add("is-last");
      });
    };

    const [leftFixedColumnGroup, rightFixedColumnGroup] = [
      directionDivider(leftFixedItems),
      directionDivider(rightFixedItems).reverse(),
    ];

    handleColumnStyles(leftFixedColumnGroup);
    handleColumnStyles(rightFixedColumnGroup);
  };

  /**
   * 点击事件: 行点击, 单元格点击
   * @param {MouseEvent} e
   */
  #initClickEvent = (e) => {
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
  };

  /**
   * 滚动事件: 固定列样式
   */
  #initScrollEvent = () => {
    /** @type {HTMLElement[]} */
    const fixedItems = [...this.#container.querySelectorAll(".is-fixed")];
    const { scrollLeft } = this.#container;
    const endPosition =
      Math.floor(this.#container.scrollWidth - this.#container.offsetWidth) - 1;
    if (scrollLeft < endPosition) {
      if (!scrollLeft) {
        fixedItems.forEach((el) => {
          el.classList.toggle(
            "not-origin-position",
            !el.classList.contains("fixed-left")
          );
        });
      } else {
        fixedItems.forEach((el) => {
          el.classList.add("not-origin-position");
        });
      }
    } else {
      fixedItems.forEach((el) => {
        el.classList.toggle(
          "not-origin-position",
          !el.classList.contains("fixed-right")
        );
      });
    }
  };

  async connectedCallback() {
    super.connectedCallback();

    await this.$render();
    this.#abortController = new AbortController();

    this.#container.addEventListener("click", this.#initClickEvent);
    this.#container.addEventListener("scroll", this.#initScrollEvent);
  }

  $beforeUnmounted() {
    this.#abortController.abort();
  }
}

if (!window.customElements.get("ea-table")) {
  window.customElements.define("ea-table", EaTable);
}
