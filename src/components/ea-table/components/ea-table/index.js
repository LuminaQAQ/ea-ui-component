import EaUtils from "@/utils/Utils";
import Base from "@components/Base.js";
import "@components/ea-empty/index";
import { EaTableCellClickEvent } from "../../events/EaTableCellClickEvent";
import { EaTableCurrentChangeEvent } from "../../events/EaTableCurrentChangeEvent";
import { EaTableRowClickEvent } from "../../events/EaTableRowClickEvent";
import { EaTableSelectAllEvent } from "../../events/EaTableSelectAllEvent";
import { EaTableSelectEvent } from "../../events/EaTableSelectEvent";
import { EaTableSelectionChangeEvent } from "../../events/EaTableSelectionChangeEvent";
import { colgroupRenderer } from "../colgroup";
import { tfootRenderer } from "../tfoot";
import { theadRenderer } from "../thead";
import stylesheet from "./index.scss?inline";
import { EaTableSortChangeEvent } from "../../events/EaTableSortChangeEvent";
import { EaTableCellMouseEnterEvent } from "../../events/EaTableMouseEnterEvent";
import { EaTableCellMouseLeaveEvent } from "../../events/EaTableCellMouseLeaveEvent";
import { EaTableCellDBLClickEvent } from "../../events/EaTableCellDBLClickEvent";
import { EaTableRowDBLClickEvent } from "../../events/EaTableRowDBLClickEvent";
import { EaTableRowContextmenuEvent } from "../../events/EaTableRowContextmenuEvent";
import { EaTableCellContextmenuEvent } from "../../events/EaTableCellContextmenuEvent";
import { EaTableHeaderContextmenuEvent } from "../../events/EaTableHeaderContextmenuEvent";
import { EaTableHeaderClickEvent } from "../../events/EaTableHeaderClickEvent";

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
 * @property {string} header
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
  /** @type {HTMLSlotElement} */
  #defaultSlot;
  /** @type {HTMLElement} */
  #emptySlot;

  /** @type {AbortController} */
  #abortController;

  #AbortControllerStates = {
    /** @type {AbortController | null} */
    selectionChangeAbortController: null,
    /** @type {AbortController | null} */
    selectAbortController: null,
  };

  #states = {
    isDataRendered: false,

    currentRow: {
      target: null,
      value: {},
    },

    /** @type {import("../ea-table-column/index.js").TableColumnCtx[]} */
    columns: [],

    originData: [],
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

      "show-summary",
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
        this.style.setProperty("--ea-table-height", newVal);
        this.updateContainerClasslist();
      },
    },
    "max-height": {
      type: String,
      default: null,
      observer: newVal => {
        this.style.setProperty("--ea-table-max-height", newVal);
        this.updateContainerClasslist();
      },
    },

    "highlight-current-row": {
      type: Boolean,
      default: false,
      observer: () => {},
    },

    "show-summary": {
      type: Boolean,
      default: false,
      observer: () => {},
    },
  });

  propStates = this.properties({
    data: {
      props: true,
      type: Array,
      default: () => this.#states.originData,
      observer: newVal => {
        this.#states.originData = newVal;
        this.setData(newVal);
      },
    },
  });

  funcStates = this.properties({
    selectable: {
      props: true,
      type: Function,
      rawFunction: true,
      default: null,
    },
    indexMethod: {
      props: true,
      type: Function,
      rawFunction: true,
      default: () => index => index,
    },
    summaryMethod: {
      props: true,
      type: Function,
      rawFunction: true,
      default:
        () =>
        /** @param {{columns: ColumnOption, data: any[]}} param */ param => {
          const { columns, data } = param;
          const sums = [];

          columns.forEach((column, index) => {
            if (index === 0) {
              sums[index] = "Sum";
              return;
            }

            const values = data.map(item => Number(item[column.prop]));
            if (!values.every(value => Number.isNaN(value))) {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!Number.isNaN(value)) {
                  return prev + curr;
                } else {
                  return prev;
                }
              }, 0);
            } else {
              sums[index] = "";
            }
          });

          return sums;
        },
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
        data: this.#states.originData.length > 0,
      }
    );

    this.#container.className = className;
    this.#emptySlot.className = this.computedClasslist(
      "ea-table__empty",
      {},
      {
        data: this.#states.originData.length > 0,
      }
    );

    return className;
  }

  constructor() {
    super();

    this.stylesheet = stylesheet;

    this.shadowRoot.innerHTML = this.html(`
      <slot id='defaultSlot' part='default-slot'></slot>
      <table class='ea-table' part='container'>
        <colgroup class='ea-table__colgroup' part='colgroup'></colgroup>
        <thead class='ea-table__thead' part='thead'></thead>
        <tbody class='ea-table__tbody' part='tbody'></tbody>
        <tfoot class='ea-table__tfoot' part='tfoot'></tfoot>
      </table>
      <slot class="ea-table__empty" name="empty">No Data</slot>
    `);

    this.#container = this.shadowRoot.querySelector(".ea-table");
    this.#defaultSlot = this.shadowRoot.querySelector("#defaultSlot");
    this.#thead = this.shadowRoot.querySelector(".ea-table__thead");
    this.#tbody = this.shadowRoot.querySelector(".ea-table__tbody");
    this.#tfoot = this.shadowRoot.querySelector(".ea-table__tfoot");

    this.#emptySlot = this.shadowRoot.querySelector(".ea-table__empty");
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

    const colgroup = colgroupRenderer(columns);
    const thead = theadRenderer(columns);
    const tfoot = tfootRenderer(columns);

    // 更新各部分内容
    const colgroupEl = this.shadowRoot.querySelector(".ea-table__colgroup");
    const theadEl = this.shadowRoot.querySelector(".ea-table__thead");
    const tfootEl = this.shadowRoot.querySelector(".ea-table__tfoot");

    if (colgroupEl) colgroupEl.innerHTML = colgroup;
    if (theadEl) theadEl.innerHTML = thead;
    if (tfootEl) tfootEl.innerHTML = tfoot;
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

      const newOrder = order === "asc" ? "desc" : "asc";
      const orderEls = {
        asc: sortableEl.querySelector('[part="asc-icon"]'),
        desc: sortableEl.querySelector('[part="desc-icon"]'),
      };

      sortableEl.setAttribute("data-order", newOrder);

      sortableEl.querySelectorAll(".ea-table__sort-icon").forEach(icon => {
        icon.classList.toggle("is-active", orderEls[newOrder] === icon);
      });

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

    this.addEventListener("ea-table-column-change", this.#childChangeHandler, {
      signal: this.#abortController.signal,
    });

    this.#container.addEventListener("mousedown", this.#onClickEvent, {
      signal: this.#abortController.signal,
    });
    this.#container.addEventListener("dblclick", this.#onDBLClickEvent, {
      signal: this.#abortController.signal,
    });
    this.#container.addEventListener("contextmenu", this.#onContextmenuEvent, {
      signal: this.#abortController.signal,
    });
    this.#thead.addEventListener("click", this.#onHeaderClickEvent, {
      signal: this.#abortController.signal,
    });
    this.#thead.addEventListener(
      "contextmenu",
      this.#onHeaderContextmenuEvent,
      {
        signal: this.#abortController.signal,
      }
    );
    this.#container.addEventListener("scroll", this.#onScrollEvent, {
      signal: this.#abortController.signal,
    });
    this.#container.addEventListener("mouseover", this.#onCellMouseEnterEvent, {
      signal: this.#abortController.signal,
    });
    this.#container.addEventListener("mouseout", this.#onCellMouseLeaveEvent, {
      signal: this.#abortController.signal,
    });
  }

  /**
   * @param {any[]} dataSource
   */
  setData = async dataSource => {
    await customElements.whenDefined("ea-table");
    await customElements.whenDefined("ea-table-column");

    if (this.#states.columns.length === 0) {
      this.#handleTableStructRender();
      this.#handleSortableColumnsInit();
    }

    /** @type {DocumentFragment} */
    const bodyTemplate = document.createDocumentFragment();
    /** @type {HTMLTableRowElement} */
    const rowTpl = document.createElement("tr");
    rowTpl.part = "tbody-tr";
    rowTpl.className = "ea-table__tr";
    /** @type {ColumnOption[]} */
    const columns = this.#states.columns.filter(
      item => !item.template || item.template instanceof HTMLTemplateElement
    );
    const hasSelectionColumn = columns.some(item => item.type === "selection");
    // 用于渲染列
    const typeTemplate = {
      selection: () =>
        this.html(
          EaUtils.EaElement.h(
            "ea-checkbox",
            "ea-table__selection",
            {
              "data-type": "selection",
            },
            null
          )
        ),
      index: () =>
        this.html(
          EaUtils.EaElement.h(
            "span",
            "ea-table__index",
            {
              "data-type": "index",
            },
            null
          )
        ),
    };

    for (const key in this.#AbortControllerStates) {
      this.#AbortControllerStates[key]?.abort();
      this.#AbortControllerStates[key] = new AbortController();
    }

    this.#states.isDataRendered = false;
    this.#tbody.innerHTML = "";
    this.#states.dataSource = new WeakMap();
    this.#states.originData = dataSource;

    // 处理行模板
    columns.forEach(column => {
      const row = rowTpl;
      const { template } = column;
      const td = document.createElement("td");

      td.part = "tbody-td";
      td.className = "ea-table__td";
      td.classList.toggle(`is-fixed`, column.fixed);
      td.classList.toggle(`fixed-${column.fixed}`, column.fixed);
      td.classList.toggle(
        `ea-table__cell--align-${column.align}`,
        column.align
      );
      if (column.width) {
        td.style.setProperty("--ea-table-cell-width", column.width);
      }

      if (template) {
        td.appendChild(template.content.cloneNode(true));
      } else if (column.type) {
        td.innerHTML = typeTemplate[column.type]?.();
      } else {
        td.setAttribute("data-scope", column.prop);
      }

      row.appendChild(td);
    });

    // 渲染表格实际样式
    dataSource.forEach((item, i) => {
      /** @type {HTMLTableRowElement} */
      const trNode = rowTpl.cloneNode(true);

      trNode.setAttribute("data-index", i);

      // 处理 type="selection" 的列
      if (typeof this.selectable === "function") {
        const selectable = !this.selectable(item);
        const selectionCheckbox = trNode.querySelector(
          `ea-checkbox[data-type="selection"]`
        );
        selectionCheckbox.toggleAttribute("disabled", selectable);
      }

      // 处理 type="index" 的列
      if (
        columns.some(column => column.type === "index") &&
        typeof this.indexMethod === "function"
      ) {
        const indexEl = trNode.querySelector(`.ea-table__index`);
        indexEl.textContent = this.indexMethod(i);
      }

      trNode.querySelectorAll("[data-scope]").forEach(td => {
        const scope = td.getAttribute("data-scope");
        const column = columns.find(column => column.prop === scope);

        if (column) {
          td.textContent = item[column.prop];
        } else if (scope in item) {
          td.textContent = item[scope];
        }
      });

      bodyTemplate.appendChild(trNode);

      this.#states.dataSource.set(trNode, item);
      if (item && typeof item === "object") {
        this.#states.dataIndex.set(item, trNode);
      }
    });

    if (this["show-summary"] && typeof this.summaryMethod === "function") {
      const summaryRow = this.#tfoot.querySelectorAll(
        ".ea-table__td[data-scope]"
      );
      const summaryData = this.summaryMethod({ columns, data: dataSource });

      summaryRow.forEach((row, index) => {
        row.textContent = summaryData[index];
      });
    }

    this.#tbody.appendChild(bodyTemplate);

    if (hasSelectionColumn) {
      this.#container.addEventListener("change", this.#onSelectionChangeEvent, {
        signal: this.#abortController.signal,
      });
    }

    this.#handleFixedColumn();
    this.#onScrollEvent();

    this.updateContainerClasslist();

    this.#states.isDataRendered = true;
    this.emit("ea-table-data-rendered");
  };

  /**
   * 排序
   * @param {string} prop
   * @param {"asc" | "desc"} order
   */
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

    this.dispatchEvent(
      new EaTableSortChangeEvent({
        prop,
        order,
      })
    );
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
  getCurrentRow() {
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
  #onClickEvent = e => {
    /** @type {HTMLTableRowElement} */
    const tr = e.target.closest("tr[part='tbody-tr']");

    this.#AbortControllerStates.selectAbortController?.abort();

    if (!tr) return;

    /**
     * 用于提前阻止事件
     */
    const onControllerShouldAbortEvent = () => {
      this.#AbortControllerStates.selectAbortController?.abort();
    };

    /**
     * 鼠标抬起事件，这里是避免 click 事件时，鼠标移动至其他行，导致元素获取错误的问题
     * @param {MouseEvent} e
     */
    const onMouseUpEvent = e => {
      /** @type {HTMLTableRowElement} */
      const endTr = e.target.closest("tr[part='tbody-tr']");
      /** @type {HTMLTableCellElement} */
      const endTd = e.target.closest("td[part='tbody-td']");

      onControllerShouldAbortEvent();

      if (endTr !== tr) return;

      const value = this.#states.dataSource.get(tr);
      const columnKey = endTd?.getAttribute("data-scope");

      this.#setHighlightCurrentRowStyle(tr, this.#states.currentRow.target);

      this.#states.currentRow.target = tr;
      this.#states.currentRow.value = value;

      this.dispatchEvent(
        new EaTableRowClickEvent({
          target: tr,
          column: columnKey,
          row: value,
        })
      );

      this.dispatchEvent(
        new EaTableCurrentChangeEvent({
          target: tr,
          column: columnKey,
          row: value,
        })
      );

      if (endTd) {
        this.dispatchEvent(
          new EaTableCellClickEvent({
            cell: endTd,
            column: columnKey,
            row: value,
          })
        );
      }
    };

    this.#AbortControllerStates.selectAbortController = new AbortController();

    this.addEventListener("mouseout", onControllerShouldAbortEvent, {
      once: true,
      signal: this.#AbortControllerStates.selectAbortController.signal,
    });
    this.#container.addEventListener("mouseup", onMouseUpEvent, {
      once: true,
      signal: this.#AbortControllerStates.selectAbortController.signal,
    });
  };

  /**
   * 鼠标相关事件的共同处理逻辑
   * @param {MouseEvent} e
   * @param {'body' | 'head'} part
   * @returns {{
   *  cell: HTMLTableCellElement;
   *  row: HTMLTableRowElement;
   *  data: any;
   *  columnKey: string;
   * } | {
   *  cell: HTMLTableCellElement;
   *  columnKey: string;
   * }}
   */
  #onMouseEvent = (e, part) => {
    /** @type {HTMLTableRowElement} */
    const tr = e.target.closest(`tr[part='t${part}-tr']`);

    if (!tr) return { cell: null, row: null, data: null, columnKey: null };

    const cellTag = part === "body" ? "td" : "th";
    /** @type {HTMLTableCellElement} */
    const td = e.target.closest(`${cellTag}[part='t${part}-${cellTag}']`);

    const value = this.#states.dataSource.get(tr);
    const columnKey = td?.getAttribute("data-scope");

    if (part === "body") {
      this.#setHighlightCurrentRowStyle(tr, this.#states.currentRow.target);
      this.#states.currentRow.target = tr;
      this.#states.currentRow.value = value;

      return {
        cell: td,
        row: tr,
        data: value,
        columnKey: columnKey,
      };
    } else {
      return {
        cell: td,
        columnKey: columnKey,
      };
    }
  };

  /**
   * 鼠标双击事件: 行双击, 单元格双击
   * @param {MouseEvent} e
   */
  #onDBLClickEvent = e => {
    const { row, cell, data, columnKey } = this.#onMouseEvent(e, "body");

    if (!row) return;

    this.dispatchEvent(
      new EaTableRowDBLClickEvent({
        target: row,
        column: columnKey,
        row: data,
      })
    );

    this.dispatchEvent(
      new EaTableCellDBLClickEvent({
        cell: cell,
        column: columnKey,
        row: data,
      })
    );
  };

  /**
   * 鼠标右击事件: 行右击, 单元格右击
   * @param {MouseEvent} e
   */
  #onContextmenuEvent = e => {
    const { row, cell, data, columnKey } = this.#onMouseEvent(e, "body");

    if (!row) return;

    this.dispatchEvent(
      new EaTableRowContextmenuEvent({
        target: row,
        column: columnKey,
        row: data,
      })
    );

    this.dispatchEvent(
      new EaTableCellContextmenuEvent({
        cell,
        column: columnKey,
        row: data,
      })
    );
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
   * 鼠标进入单元格事件
   * @param {MouseEvent} e
   */
  #onCellMouseEnterEvent = e => {
    const { row, cell, data, columnKey } = this.#onMouseEvent(e, "body");

    if (!row) return;

    this.dispatchEvent(
      new EaTableCellMouseEnterEvent({
        column: columnKey,
        row: data,
        cell,
      })
    );
  };

  /**
   * 鼠标进入单元格事件
   * @param {MouseEvent} e
   */
  #onCellMouseLeaveEvent = e => {
    const { row, cell, data, columnKey } = this.#onMouseEvent(e, "body");

    if (!row) return;

    this.dispatchEvent(
      new EaTableCellMouseLeaveEvent({
        column: columnKey,
        row: data,
        cell,
      })
    );
  };

  /**
   * 鼠标点击单元格事件
   * @param {MouseEvent} e
   */
  #onHeaderClickEvent = e => {
    const { cell, columnKey } = this.#onMouseEvent(e, "head");

    if (!cell) return;

    this.dispatchEvent(
      new EaTableHeaderClickEvent({
        column: columnKey,
        cell,
      })
    );
  };

  /**
   * 表头鼠标右键事件
   * @param {MouseEvent} e
   */
  #onHeaderContextmenuEvent = e => {
    const { cell, columnKey } = this.#onMouseEvent(e, "head");

    if (!cell) return;

    this.dispatchEvent(
      new EaTableHeaderContextmenuEvent({
        column: columnKey,
        cell,
      })
    );
  };

  /**
   * 监听默认插槽变化
   */
  #slotChangeHandler = () => {
    this.$render();
    if (this.#states.originData.length > 0) {
      this.setData(this.#states.originData);
    }
  };

  /**
   * 监听子元素变化
   * @param {Event} e
   */
  #childChangeHandler = e => {
    e.stopImmediatePropagation();

    this.$render();
    if (this.#states.originData.length > 0) {
      this.setData(this.#states.originData);
    }
  };

  /**
   * 当存在 selection 列时，checkbox 的改变事件
   * @param {Event} e
   */
  #onSelectionChangeEvent = e => {
    if (e.target.getAttribute("data-type") !== "selection") return;

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

    this.#defaultSlot.addEventListener("slotchange", this.#slotChangeHandler, {
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
