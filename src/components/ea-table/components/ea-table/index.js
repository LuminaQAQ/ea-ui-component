import Base from "@components/Base.js";
import EaUtils from "@/utils/Utils";

import stylesheet from "./index.scss?inline";

import { theadRenderer } from "../thead";
import { EaTableSelectionChangeEvent } from "../../events/EaTableSelectionChangeEvent";
import { EaTableSelectEvent } from "../../events/EaTableSelectEvent";
import { EaTableSelectAllEvent } from "../../events/EaTableSelectAllEvent";

/**
 * @typedef {Element & {template: HTMLTemplateElement}} EaTableColumnElement
 */

/**
 * @typedef {Object} ColumnOption
 * @property {number} depth
 * @property {'selection'} type
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

  #AbortControllerStates = {
    /** @type {AbortController | null} */
    selectionChangeAbortController: null,
  };

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
      observer: () => {
        this.updateContainerClasslist();
      },
    },
    border: {
      type: Boolean,
      default: false,
      observer: () => {
        this.updateContainerClasslist();
      },
    },
    height: {
      type: String,
      default: null,
      observer: newVal => {
        if (newVal) {
          this.#container.style.setProperty("--ea-table-height", newVal);
          this.updateContainerClasslist();
        }
      },
    },
    "max-height": {
      type: String,
      default: null,
      observer: newVal => {
        if (newVal) {
          this.#container.style.setProperty("--ea-table-max-height", newVal);
          this.updateContainerClasslist();
        }
      },
    },

    "highlight-current-row": {
      type: Boolean,
      default: false,
      observer: () => {},
    },
  });

  funcStates = this.properties({
    selectable: {
      props: true,
      type: Function,
      rawFunction: true,
      default: null,
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist(
      "ea-table",
      {},
      {
        stripe: this.stripe,
        border: this.border,
        "sticky-header":
          CSS.supports("height", this.height) ||
          CSS.supports("height", this.maxHeight),
      }
    );

    this.#container.className = className;

    return className;
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

  /**
   * 渲染表格的基本结构
   */
  #handleTableStructRender = () => {
    /** @type {ColumnOption[]} */
    const columns = [...this.querySelectorAll("ea-table-column")].map(
      column => column.getColumnTree
    );

    this.#states.columns = columns;

    const colgroup = EaUtils.EaElement.h(
      "colgroup",
      "ea-table__colgroup",
      {
        part: "colgroup",
      },
      columns.map(column =>
        EaUtils.EaElement.h("col", "ea-table__col", {
          width: column.width,
          part: "col",
        })
      )
    );

    const thead = theadRenderer(columns);

    const tfoot = EaUtils.EaElement.h("tfoot", "ea-table__tfoot", {
      part: "tfoot",
    });

    const tbody = EaUtils.EaElement.h("tbody", "ea-table__tbody", {
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
  };

  /**
   * 初始化带有筛选的列
   */
  #handleSortableColumnsInit = () => {
    /** @type {HTMLElement[]} */
    const sortableEls = [
      ...this.#container.querySelectorAll(".ea-table__th.is-sortable"),
    ];

    if (!sortableEls.length) return;

    /**
     * 可筛选的列的筛选事件
     * @param {MouseEvent} e
     */
    const onSortItemClickEvent = e => {
      const sortableEl = e.target.closest(".is-sortable");
      if (!sortableEl) return;

      const { prop, order } = sortableEl.dataset;
      if (!prop) return;

      const icon = {
        asc: sortableEl.querySelector('[part="asc-icon"]'),
        desc: sortableEl.querySelector('[part="desc-icon"]'),
      };

      const newOrder = order === "asc" ? "desc" : "asc";

      sortableEl.querySelectorAll(".ea-table__sort-icon").forEach(icon => {
        icon.classList.remove("is-active");
      });
      icon[newOrder].classList.add("is-active");

      sortableEl.dataset.order = newOrder;

      this.sort(prop, newOrder);
    };

    this.#thead.addEventListener("click", onSortItemClickEvent, {
      signal: this.#abortController.signal,
    });
  };

  async $render() {
    await customElements.whenDefined("ea-table-column");

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.#handleTableStructRender();
    this.#handleSortableColumnsInit();

    this.#container.addEventListener("click", this.#initClickEvent, {
      signal: this.#abortController.signal,
    });
    this.#container.addEventListener("scroll", this.#onScrollEvent, {
      signal: this.#abortController.signal,
    });
  }

  setData = async dataSource => {
    /** @type {DocumentFragment} */
    const bodyTemplate = document.createDocumentFragment();
    /** @type {HTMLTemplateElement} */
    const rowTpl = this.shadowRoot.querySelector("#rowTpl");
    /** @type {ColumnOption[]} */
    const columns = this.#states.columns.filter(
      item => !item.template || item.template instanceof HTMLTemplateElement
    );
    const hasSelectionColumn = columns.some(item => item.type === "selection");

    for (const key in this.#AbortControllerStates) {
      this.#AbortControllerStates[key]?.abort();
      this.#AbortControllerStates[key] = new AbortController();
    }

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
      } else if (column.type) {
        if (column.type === "selection") {
          const checkboxEl = document.createElement("ea-checkbox");
          if (column.type) checkboxEl.dataset.type = column.type;

          td.appendChild(checkboxEl);
        }
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

      if (typeof this.selectable === "function") {
        const selectable = !this.selectable(item);
        const selectionCheckbox = trNode.querySelector(
          `ea-checkbox[data-type="selection"]`
        );
        selectionCheckbox.toggleAttribute("disabled", selectable);
      }

      this.#states.dataSource.set(trNode, item);
      if (item && typeof item === "object") {
        this.#states.dataIndex.set(item, trNode);
      }
    });

    this.#tbody.appendChild(bodyTemplate);

    if (hasSelectionColumn) {
      this.#container.addEventListener("change", this.#onSelectionChangeEvent, {
        signal: this.#abortController.signal,
      });
    }

    this.#handleFixedColumn();
    this.#onScrollEvent();
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
   * 设置当前行是否被选中
   * @param {any} row
   * @param {Boolean} selected
   * @param {boolean} [ignoreSelectable]
   */
  toggleRowSelection = (row, selected, ignoreSelectable = true) => {
    const hasSelection = this.#states.columns.some(
      column => column.type === "selection"
    );
    if (!hasSelection) return;

    const tr = this.#states.dataIndex.get(row);
    if (!tr) return;

    const selector = `ea-checkbox[data-type="selection"]${!ignoreSelectable ? ":not([disabled])" : ""}`;
    /** @type {import("@components/ea-checkbox/index.js").EaCheckbox} */
    const checkbox = tr.querySelector(selector);
    if (!checkbox) return;

    if (selected) {
      checkbox.toggleAttribute("checked", selected);
    } else {
      checkbox.toggleAttribute("checked", !checkbox.checked);
    }

    this.#handleSelectionUpdate();
    this.#dispatchSlectionChangeEvent();
  };

  /**
   * 清空选择
   */
  clearSelection = () => {
    /** @type {HTMLElement[]} */
    const selectionCheckboxEls = [
      ...this.#container.querySelectorAll(`ea-checkbox[data-type="selection"]`),
    ];

    selectionCheckboxEls.forEach(el => {
      el.removeAttribute("checked");
      el.removeAttribute("indeterminate");
    });

    this.#dispatchSlectionChangeEvent();
  };

  /**
   * 获取当前选中的行
   * @returns {any[]}
   */
  #getCurrentSelectionRows = () => {
    return [
      ...this.#tbody.querySelectorAll(
        `ea-checkbox[data-type="selection"][checked]`
      ),
    ].map(el =>
      this.#states.dataSource.get(el.closest(`.ea-table__tr[part="tbody-tr"]`))
    );
  };

  /**
   * 更新选中状态
   */
  #handleSelectionUpdate = () => {
    /** @type {import("@components/ea-checkbox/index.js").EaCheckbox} */
    const theadCheckboxEl = this.#thead.querySelector(
      `ea-checkbox[data-type="selection"]`
    );

    const isAllChecked = [
      ...this.#tbody.querySelectorAll(
        `ea-checkbox[data-type="selection"]:not([disabled])`
      ),
    ].every(checkbox => checkbox.hasAttribute("checked"));

    const isSomeChecked = [
      ...this.#tbody.querySelectorAll(`ea-checkbox[data-type="selection"]`),
    ].some(checkbox => checkbox.hasAttribute("checked"));

    if (isAllChecked) {
      theadCheckboxEl.toggleAttribute("checked", true);
      theadCheckboxEl.removeAttribute("indeterminate");
    } else if (isSomeChecked) {
      theadCheckboxEl.removeAttribute("checked");
      theadCheckboxEl.toggleAttribute("indeterminate", true);
    } else {
      theadCheckboxEl.removeAttribute("checked");
      theadCheckboxEl.removeAttribute("indeterminate");
    }
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

  /**
   * 取消高亮当前行样式
   * @param {HTMLTableRowElement} currentRow
   */
  #unsetHighlightCurrentRowStyle = currentRow => {
    if (!this["highlight-current-row"] || !currentRow) return;

    currentRow?.classList?.remove("is-current");
  };

  /**
   * 派发选择改变事件
   */
  #dispatchSlectionChangeEvent = () => {
    const newSelection = this.#getCurrentSelectionRows();

    this.dispatchEvent(
      new EaTableSelectionChangeEvent({
        newSelection,
      })
    );
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
  #onScrollEvent = () => {
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

  /**
   * 当存在 selection 列时，checkbox 的改变事件
   * @param {Event} e
   */
  #onSelectionChangeEvent = e => {
    if (e.target.dataset.type !== "selection") return;

    e.stopImmediatePropagation();

    /** @type {{checked: boolean}} */
    const { checked } = e.detail;

    const isTheadCheckbox = e.target.closest(".ea-table__thead");

    if (isTheadCheckbox) {
      /** @type {HTMLElement[]} */
      const selectionCheckboxEls = [
        ...this.#tbody.querySelectorAll(`ea-checkbox[data-type="selection"]`),
      ];

      e.target.toggleAttribute("checked", e.target.hasAttribute("checked"));

      selectionCheckboxEls.forEach(checkbox => {
        if (!checkbox.hasAttribute("disabled")) {
          checkbox.toggleAttribute("checked", checked);
        }
      });

      const selection = this.#getCurrentSelectionRows();
      this.dispatchEvent(new EaTableSelectAllEvent({ selection }));
    } else {
      const selection = this.#getCurrentSelectionRows();
      const currentRow = this.#states.dataSource.get(
        e.target.closest(`.ea-table__tr[part="tbody-tr"]`)
      );

      this.#handleSelectionUpdate();
      this.dispatchEvent(
        new EaTableSelectEvent({ selection, row: currentRow })
      );
    }

    this.#dispatchSlectionChangeEvent();
  };

  connectedCallback() {
    super.connectedCallback();

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.$render();
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
