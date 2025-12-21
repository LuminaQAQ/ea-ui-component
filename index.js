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
 * @typedef {Object} ColumnOption
 * @property {number} depth
 * @property {Boolean} sortable
 * @property {number} colspan
 * @property {number} rowspan
 * @property {String | null} prop
 * @property {String | null} label
 * @property {String | null} width
 * @property {Boolean | String | null} fixed
 * @property {Attr[]} props
 * @property {HTMLTemplateElement | ColumnOption} template
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

    currentRow: {
      target: null,
      value: {},
    },

    columns: [],

    dataSource: new WeakMap(),
    dataIndex: new WeakMap(),
  };

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "stripe",
      "border",
      "height",
      "max-height",

      "highlight-current-row",
    ];
  }

  state = this.properties({
    stripe: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.#container.className = this.updateContainerClasslist();
      },
    },
    border: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.#container.className = this.updateContainerClasslist();
      },
    },
    height: {
      type: String,
      default: null,
      observer: newVal => {
        if (newVal) {
          this.#container.style.setProperty("--ea-table-height", newVal);
          this.#container.className = this.updateContainerClasslist();
        }
      },
    },
    "max-height": {
      type: String,
      default: null,
      observer: newVal => {
        if (newVal) {
          this.#container.style.setProperty("--ea-table-max-height", newVal);
          this.#container.className = this.updateContainerClasslist();
        }
      },
    },

    "highlight-current-row": {
      type: Boolean,
      default: false,
      observer: () => {},
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
      <template id="rowTpl">
        <tr class="ea-table__tr" part="tbody-tr">
        </tr>
      </template>
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
      tableColumnNodes.map(column =>
        EaUtils.EaElement.addAsyncEventListener(column, "ea-table-column-ready")
      )
    );

    const { columns, depth } = this.#getColumnTree();

    const colgroup = h(
      "colgroup",
      "ea-table__colgroup",
      {
        part: "colgroup",
      },
      columns.map(column =>
        h("col", "ea-table__col", { width: column.width, part: "col" })
      )
    );

    const thead = theadRenderer(columns, depth);

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
    this.#states.columns = columns;

    /** @type {HTMLElement[]} */
    const sortableEls = [
      ...this.#container.querySelectorAll(".ea-table__th.is-sortable"),
    ];
    if (sortableEls.length) {
      sortableEls.forEach(el => {
        if (!el.dataset.prop) return;

        const icon = {
          asc: el.querySelector('[part="asc-icon"]'),
          desc: el.querySelector('[part="desc-icon"]'),
        };

        el.addEventListener("click", e => {
          const { prop, order } = el.dataset;

          el.querySelectorAll(".ea-table__sort-icon").forEach(icon => {
            icon.classList.remove("is-active");
          });
          el.dataset.order = order === "asc" ? "desc" : "asc";
          icon[el.dataset.order].classList.add("is-active");

          this.sort(prop, el.dataset.order);
        });
      });
    }

    this.emit("ea-table-rendered");
  }

  setData = dataSource => {
    /** @type {DocumentFragment} */
    const bodyTemplate = document.createDocumentFragment();
    /** @type {HTMLTemplateElement} */
    const rowTpl = this.shadowRoot.querySelector("#rowTpl");

    const columns = this.#states.columns.filter(
      item => !item.template || item.template instanceof HTMLTemplateElement
    );

    this.#states.isDataRendered = false;
    this.#tbody.innerHTML = "";
    this.#states.dataSource = new WeakMap();

    // 处理行模板
    columns.forEach(column => {
      const row = rowTpl.content.querySelector(".ea-table__tr");
      const { template } = column;
      const td = document.createElement("td");

      td.part = "tbody-td";
      td.className = "ea-table__td";
      td.classList.toggle(`is-fixed`, column.fixed);
      td.classList.toggle(`fixed-${column.fixed}`, column.fixed);
      if (column.width)
        td.style.setProperty("--ea-table-cell-width", column.width);

      if (template) {
        td.appendChild(template.content.cloneNode(true));
      } else {
        td.dataset.scope = column.prop;
      }

      row.appendChild(td);
    });

    // 渲染表格实际样式
    dataSource.forEach((item, i) => {
      /** @type {HTMLTableRowElement} */
      const trNode = rowTpl.content
        .querySelector(".ea-table__tr")
        .cloneNode(true);

      trNode.querySelectorAll("[data-scope]").forEach(td => {
        const column = columns.find(column => column.prop === td.dataset.scope);
        if (column) {
          td.innerHTML = item[column.prop];
        }
      });

      trNode.dataset.index = i;

      bodyTemplate.appendChild(trNode);

      this.#states.dataSource.set(trNode, item);
      if (item && typeof item === "object") {
        this.#states.dataIndex.set(item, trNode);
      }
    });

    this.#tbody.appendChild(bodyTemplate);

    this.#handleFixedColumn();
    this.#initScrollEvent();
    this.#states.isDataRendered = true;
    this.emit("ea-table-data-rendered");
  };

  sort = (prop, order = "asc") => {
    const template = document.createDocumentFragment();
    const originalPosi = this.#tbody.nextElementSibling;

    template.appendChild(this.#tbody);

    const res = [...template.querySelectorAll("tr")].sort((a, b) => {
      const aData = this.#states.dataSource.get(a);
      const bData = this.#states.dataSource.get(b);
      return order === "asc"
        ? String(aData[prop]).localeCompare(bData[prop])
        : String(bData[prop]).localeCompare(aData[prop]);
    });

    res.forEach(tr => {
      this.#tbody.appendChild(tr);
    });

    this.#container.insertBefore(template, originalPosi);
  };

  /**
   * 设置行样式
   * @param {Function | String} handler
   */
  setRowStylePart = handler => {
    if (!this.#states.isDataRendered)
      return console.warn("[EaTable] Please set data first!", this);

    /** @type {HTMLElement[]} */
    const trs = [...this.#tbody.querySelectorAll("tr")];
    if (typeof handler === "function") {
      trs.forEach((tr, i) => {
        const className = handler({
          row: this.#states.dataSource.get(tr),
          rowIndex: i,
        });

        if (className) tr.part.add(className);
      });
    } else if (typeof handler === "string") {
      if (!handler) return;

      trs.forEach(tr => {
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
   * 设置当前行数据
   * @param {any} row 当前行数据
   */
  setCurrentRow(row) {
    let tr = null;
    let dataValue = null;

    if (row && typeof row === "object") {
      tr = this.#states.dataIndex.get(row) || null;
      dataValue = row;
    }

    if (tr && dataValue) {
      this.#setHighlightCurrentRowStyle(tr, this.#states.currentRow.target);

      this.#states.currentRow.target = tr;
      this.#states.currentRow.value = dataValue;
    } else {
      this.#unsetHighlightCurrentRowStyle(this.#states.currentRow.target);

      this.#states.currentRow.value = null;
      this.#states.currentRow.target = null;
    }
  }

  /**
   * 递归获取所有column, 并转换成树结构
   * @param {HTMLElement} el
   * @param {number} depth
   * @returns {Map}
   */
  #initColumnTree = (el, depth = 0) => {
    if (!el) return;

    const columns = el.querySelectorAll("& > ea-table-column");
    const exclude = ["prop", "label", "width", "fixed"];
    const map = new Map();
    depth++;

    columns.forEach(column => {
      const columnTree = this.#initColumnTree(column, depth);
      map.set(column.getAttribute("prop") || column.getAttribute("label"), {
        depth,
        colspan: column.querySelectorAll("ea-table-column").length || 1,
        prop: column.getAttribute("prop"),
        label: column.getAttribute("label"),
        width: column.getAttribute("width"),
        sortable: column.getAttribute("sortable") !== null,
        fixed:
          column.getAttribute("fixed") ||
          typeof column.getAttribute("fixed") === "string"
            ? column.getAttribute("fixed") || "left"
            : null,
        props: [...column.attributes].filter(
          attr => !exclude.includes(attr.name)
        ),
        template: columnTree.size
          ? Object.fromEntries(columnTree.entries())
          : column?.template,
      });
    });

    return map;
  };

  /**
   * 处理真实树，同时处理配置项
   * @returns {{columns: ColumnOption[], depth: Number}}
   */
  #getColumnTree = () => {
    /**
     * 获取column的树结构
     * @param {Array} column
     */
    const flat = column => {
      if (!column) return column;

      let ary = [];
      Object.values(column).forEach(col => {
        ary.push(col);
        if (col?.template) ary = [...ary, ...flat(col.template)];
      });

      return ary;
    };

    /** @type {ColumnOption[]} */
    let columns = flat(
      Object.fromEntries(this.#initColumnTree(this).entries())
    ).sort((a, b) => a.depth - b.depth);
    const depth = columns.reduce((acc, cur) => {
      return Math.max(acc, cur.depth);
    }, 0);

    columns = columns.map(col => ({
      ...col,
      rowspan: col.template ? 1 : depth - col.depth + 1,
    }));

    return { columns, depth };
  };

  /**
   * 处理固定列的位置和阴影（box-shadow）
   */
  #handleFixedColumn = () => {
    /** @type {HTMLElement[]} */
    const fixedItems = [...this.#container.querySelectorAll(".is-fixed")];
    const leftFixedItems = fixedItems.filter(item =>
      item.classList.contains("fixed-left")
    );
    const rightFixedItems = fixedItems.filter(item =>
      item.classList.contains("fixed-right")
    );

    /**
     * 列方向分组
     * @param {Array} initialArray
     * @returns {Array}
     */
    const directionDivider = initialArray => {
      const ths = initialArray.filter(item => item.part.contains("thead-th"));
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
    const handleColumnStyles = fixedColumnGroup => {
      if (!fixedColumnGroup.length) return;

      const lastGroup = fixedColumnGroup.slice(-1)[0];

      // 如果当前列不是第一列，那么就设置其 inset 位置
      fixedColumnGroup.forEach((group, index) => {
        const previousGroup = fixedColumnGroup[index - 1] || [];
        group.forEach(el => {
          if (lastGroup && previousGroup[0])
            el.style.setProperty(
              "--ea-table-fixed-x",
              `${index * previousGroup[0].offsetWidth}px`
            );
        });
      });

      // 设置最后一列的样式， 确保 box-shadow 只在最后一列显示
      lastGroup.forEach(el => {
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
   * 设置高亮当前行样式
   * @param {HTMLTableRowElement} currentRow
   * @param {HTMLTableRowElement} [oldRow]
   */
  #setHighlightCurrentRowStyle = (
    currentRow,
    oldRow = this.#states.currentRow.target
  ) => {
    if (!this["highlight-current-row"]) return;

    oldRow?.classList?.remove("is-current");
    currentRow?.classList?.add("is-current");
  };

  #unsetHighlightCurrentRowStyle = currentRow => {
    if (!this["highlight-current-row"]) return;

    currentRow?.classList?.remove("is-current");
  };

  /**
   * 点击事件: 行点击, 单元格点击
   * @param {MouseEvent} e
   */
  #initClickEvent = e => {
    /** @type {HTMLTableRowElement} */
    const tr = e.target.closest("tr[part='tbody-tr']");
    /** @type {HTMLTableCellElement} */
    const td = e.target.closest("td[part='tbody-td']");

    if (tr) {
      const value = this.#states.dataSource.get(tr);

      this.#setHighlightCurrentRowStyle(tr, this.#states.currentRow.target);

      this.#states.currentRow.target = tr;
      this.#states.currentRow.value = value;

      this.emit("row-click", {
        detail: {
          target: tr,
          column: td.dataset.scope,
          row: value,
        },
      });

      this.emit("current-change", {
        detail: {
          target: tr,
          column: td.dataset.scope,
          row: value,
        },
      });

      if (td) {
        this.emit("cell-click", {
          detail: {
            target: td,
            column: td.dataset.scope,
            row: value,
          },
        });
      }
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
        fixedItems.forEach(el => {
          el.classList.toggle(
            "not-origin-position",
            !el.classList.contains("fixed-left")
          );
        });
      } else {
        fixedItems.forEach(el => {
          el.classList.add("not-origin-position");
        });
      }
    } else {
      fixedItems.forEach(el => {
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

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.#container.addEventListener("click", this.#initClickEvent, {
      signal: this.#abortController.signal,
    });
    this.#container.addEventListener("scroll", this.#initScrollEvent, {
      signal: this.#abortController.signal,
    });
  }

  $beforeUnmounted() {
    this.#abortController?.abort();

    for (const key in this.#states) {
      this.#states[key] = null;
    }
  }
}

if (!window.customElements.get("ea-table")) {
  window.customElements.define("ea-table", EaTable);
}
