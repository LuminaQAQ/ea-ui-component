import "@components/ea-empty/index";
import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { property } from "@decorator/property";
import { query } from "@decorator/query";
import { html } from "@utils/html";
import { EaTableCellClickEvent } from "../../events/EaTableCellClickEvent";
import { EaTableCellContextmenuEvent } from "../../events/EaTableCellContextmenuEvent";
import { EaTableCellDBLClickEvent } from "../../events/EaTableCellDBLClickEvent";
import { EaTableCellMouseLeaveEvent } from "../../events/EaTableCellMouseLeaveEvent";
import { EaTableCurrentChangeEvent } from "../../events/EaTableCurrentChangeEvent";
import { EaTableHeaderClickEvent } from "../../events/EaTableHeaderClickEvent";
import { EaTableHeaderContextmenuEvent } from "../../events/EaTableHeaderContextmenuEvent";
import { EaTableCellMouseEnterEvent } from "../../events/EaTableMouseEnterEvent";
import { EaTableRowClickEvent } from "../../events/EaTableRowClickEvent";
import { EaTableRowContextmenuEvent } from "../../events/EaTableRowContextmenuEvent";
import { EaTableRowDBLClickEvent } from "../../events/EaTableRowDBLClickEvent";
import { EaTableSelectAllEvent } from "../../events/EaTableSelectAllEvent";
import { EaTableSelectEvent } from "../../events/EaTableSelectEvent";
import { EaTableSelectionChangeEvent } from "../../events/EaTableSelectionChangeEvent";
import { EaTableSortChangeEvent } from "../../events/EaTableSortChangeEvent";
import { EaTableTemplateCellClickEvent } from "../../events/EaTableTemplateCellClickEvent";
import type { ColumnOption } from "../../types";
import { colgroupRenderer } from "../colgroup/index";
import type { EaTableColumn } from "../ea-table-column/index";
import { tfootRenderer } from "../tfoot/index";
import { theadRenderer } from "../thead/index";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-table" as const;
const bem = createBEM(TAG_NAME);

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaTable extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(bem.cb())
  private _container!: HTMLElement;

  @query(bem.ce("thead"))
  private _thead!: HTMLElement;

  @query(bem.ce("tbody"))
  private _tbody!: HTMLElement;

  @query(bem.ce("tfoot"))
  private _tfoot!: HTMLElement;

  @query("#defaultSlot")
  private _defaultSlot!: HTMLSlotElement;

  @query(bem.ce("empty"))
  private _emptySlot!: HTMLElement;

  // ==================== 属性定义 ====================

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaTable) {
      this.updateContainerClasslist();
    },
  })
  stripe: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaTable) {
      this.updateContainerClasslist();
    },
  })
  border: boolean = false;

  @attribute({
    type: String,
    default: "",
    observer(this: EaTable, newVal: string) {
      this.style.setProperty("--ea-table-height", newVal);
      this.updateContainerClasslist();
    },
  })
  height: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaTable, newVal: string) {
      this.style.setProperty("--ea-table-max-height", newVal);
      this.updateContainerClasslist();
    },
  })
  maxHeight: string = "";

  @attribute({
    type: Boolean,
    default: false,
  })
  highlightCurrentRow: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
  })
  showSummary: boolean = false;

  @property({
    type: Array,
    default: [],
    observer(this: EaTable, newVal: unknown[]) {
      this._states.originData = newVal;
      this.setData(newVal);
    },
  })
  data: unknown[] = [];

  @property({
    type: Function,
    default: null,
  })
  selectable: ((row: unknown) => boolean) | null = null;

  @property({
    type: Function,
    default: () => (index: number) => index,
  })
  indexMethod: ((index: number) => number) | null = null;

  @property({
    type: Function,
    default: null,
  })
  summaryMethod:
    | ((param: {
        columns: ColumnOption[];
        data: unknown[];
      }) => (string | number)[])
    | null = null;

  // ==================== 私有属性 ====================

  private _abortController = new AbortController();

  private _AbortControllerStates: Record<string, AbortController | null> = {
    selectionChangeAbortController: null,
    selectAbortController: null,
  };

  private _sortAbortController: AbortController | null = null;

  private _defaultSummaryMethod = (param: {
    columns: ColumnOption[];
    data: unknown[];
  }): (string | number)[] => {
    const { columns, data } = param;
    const sums: (string | number)[] = [];

    columns.forEach((column, index) => {
      if (index === 0) {
        sums[index] = "Sum";
        return;
      }

      const values = data.map(item =>
        Number((item as Record<string, unknown>)[column.prop!])
      );
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
  };

  private _mountResolve!: () => void;
  private _mountPromise = new Promise<void>(resolve => {
    this._mountResolve = resolve;
  });

  private _isSettingData = false;

  private _states = {
    isDataRendered: false,

    currentRow: {
      target: null as HTMLTableRowElement | null,
      value: {} as unknown,
    },

    columns: [] as ColumnOption[],

    originData: [] as unknown[],
    dataSource: new WeakMap<HTMLElement, unknown>(),
    dataIndex: new WeakMap<object, HTMLElement>(),

    rowStyleHandler: null as
      | ((param: { row: unknown; rowIndex: number }) => string)
      | string
      | null,
  };

  // ==================== 模板 ====================

  html(): string {
    return `
      <slot id='defaultSlot' part='default-slot'></slot>
      <table class='ea-table' part='container'>
        <colgroup class='ea-table__colgroup' part='colgroup'></colgroup>
        <thead class='ea-table__thead' part='thead'></thead>
        <tbody class='ea-table__tbody' part='tbody'></tbody>
        <tfoot class='ea-table__tfoot' part='tfoot'></tfoot>
      </table>
      <slot class="ea-table__empty" name="empty">No Data</slot>
    `;
  }

  // ==================== 方法 ====================

  updateContainerClasslist(): string {
    const className = bem(
      {},
      {
        stripe: this.stripe,
        border: this.border,
        "sticky-header":
          CSS.supports("height", this.height) ||
          CSS.supports("height", this.maxHeight),
        data: this._states.originData.length > 0,
      }
    );

    this._container.className = className;
    this._emptySlot.className =
      bem.e("empty") + (this._states.originData.length > 0 ? " is-data" : "");

    return className;
  }

  private _handleTableStructRender = (): void => {
    const columns: ColumnOption[] = [
      ...this.querySelectorAll("ea-table-column"),
    ].map(
      column =>
        (column as unknown as EaTableColumn)
          .getColumnTree as unknown as ColumnOption
    );

    this._states.columns = columns;

    const colgroup = colgroupRenderer(columns);
    const thead = theadRenderer(columns);
    const tfoot = tfootRenderer(columns);

    const colgroupEl = this.shadowRoot!.querySelector(bem.ce("colgroup"));
    const theadEl = this.shadowRoot!.querySelector(bem.ce("thead"));
    const tfootEl = this.shadowRoot!.querySelector(bem.ce("tfoot"));

    if (colgroupEl) colgroupEl.innerHTML = colgroup;
    if (theadEl) theadEl.innerHTML = thead;
    if (tfootEl) tfootEl.innerHTML = tfoot;
  };

  private _handleSortableColumnsInit = (): void => {
    const sortableEls = [
      ...this._container.querySelectorAll(".ea-table__th.is-sortable"),
    ] as HTMLElement[];

    if (!sortableEls.length) return;

    this._sortAbortController?.abort();
    this._sortAbortController = new AbortController();

    const onSortItemClickEvent = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const sortableEl = (mouseEvent.target as HTMLElement).closest(
        ".is-sortable"
      ) as HTMLElement;
      if (!sortableEl) return;

      const { prop, order } = sortableEl.dataset;
      if (!prop) return;

      const newOrder = order === "asc" ? "desc" : "asc";
      const orderEls: Record<string, Element | null> = {
        asc: sortableEl.querySelector('[part="asc-icon"]'),
        desc: sortableEl.querySelector('[part="desc-icon"]'),
      };

      sortableEl.setAttribute("data-order", newOrder);

      sortableEl.querySelectorAll(".ea-table__sort-icon").forEach(icon => {
        icon.classList.toggle("is-active", orderEls[newOrder] === icon);
      });

      this.sort(prop, newOrder as "asc" | "desc");
    };

    this._thead.addEventListener("click", onSortItemClickEvent, {
      signal: this._sortAbortController!.signal,
    });
  };

  $mount(): void {
    this.shadowRoot!.innerHTML = this.html();
    this._mountResolve();
  }

  async $mounted(): Promise<void> {
    await customElements.whenDefined("ea-table-column");

    this._abortController?.abort();
    this._abortController = new AbortController();

    this._handleTableStructRender();
    this._handleSortableColumnsInit();

    this.addEventListener(
      "ea-table-column-change",
      this._childChangeHandler as EventListener,
      {
        signal: this._abortController.signal,
      }
    );

    this._container.addEventListener("mousedown", this._onClickEvent, {
      signal: this._abortController.signal,
    });
    this._container.addEventListener("dblclick", this._onDBLClickEvent, {
      signal: this._abortController.signal,
    });
    this._container.addEventListener("contextmenu", this._onContextmenuEvent, {
      signal: this._abortController.signal,
    });
    this._thead.addEventListener("click", this._onHeaderClickEvent, {
      signal: this._abortController.signal,
    });
    this._thead.addEventListener(
      "contextmenu",
      this._onHeaderContextmenuEvent,
      {
        signal: this._abortController.signal,
      }
    );
    this._container.addEventListener("scroll", this._onScrollEvent, {
      signal: this._abortController.signal,
    });
    this._container.addEventListener("mouseover", this._onCellMouseEnterEvent, {
      signal: this._abortController.signal,
    });
    this._container.addEventListener("mouseout", this._onCellMouseLeaveEvent, {
      signal: this._abortController.signal,
    });

    this._defaultSlot.addEventListener("slotchange", this._slotChangeHandler, {
      signal: this._abortController.signal,
    });
  }

  setData = async (dataSource: unknown[]): Promise<void> => {
    if (this._isSettingData) return;
    this._isSettingData = true;

    await customElements.whenDefined("ea-table");
    await customElements.whenDefined("ea-table-column");
    await this._mountPromise;

    if (this._states.columns.length === 0) {
      this._handleTableStructRender();
      this._handleSortableColumnsInit();
    }

    (this as Record<string, unknown>)["__prop_data"] = dataSource;

    const bodyTemplate = document.createDocumentFragment();
    const rowTpl = document.createElement("tr");
    rowTpl.part?.add("tbody-tr");
    rowTpl.className = "ea-table__tr";
    const columns = this._states.columns.filter(
      item => !item.template || item.template instanceof HTMLTemplateElement
    );
    const hasSelectionColumn = columns.some(item => item.type === "selection");

    const typeTemplate: Record<string, () => string> = {
      selection: () =>
        html(
          `<ea-checkbox class="ea-table__selection" data-type="selection"></ea-checkbox>`
        ),
      index: () =>
        html(`<span class="ea-table__index" data-type="index"></span>`),
    };

    for (const key in this._AbortControllerStates) {
      this._AbortControllerStates[key]?.abort();
      this._AbortControllerStates[key] = new AbortController();
    }

    this._states.isDataRendered = false;
    this._tbody.innerHTML = "";
    this._states.dataSource = new WeakMap();
    this._states.originData = dataSource;

    columns.forEach(column => {
      const row = rowTpl;
      const { template } = column;
      const td = document.createElement("td");

      td.part?.add("tbody-td");
      td.className = "ea-table__td";
      const isFixed = column.fixed && column.fixed !== "false";
      td.classList.toggle(`is-fixed`, !!isFixed);
      td.classList.toggle(`fixed-${column.fixed}`, !!isFixed);
      td.classList.toggle(
        `ea-table__cell--align-${column.align}`,
        !!column.align
      );
      if (column.width) {
        td.style.setProperty("--ea-table-cell-width", column.width);
      }

      if (template) {
        const templateContent = (
          template as HTMLTemplateElement
        ).content.cloneNode(true) as DocumentFragment;
        const childElements = templateContent.querySelectorAll("*");
        childElements.forEach(el => {
          el.setAttribute("data-template-cell", "");
        });
        td.appendChild(templateContent);
      } else if (column.type) {
        td.innerHTML = typeTemplate[column.type]?.() || "";
      } else {
        td.setAttribute("data-scope", column.prop || "");
      }

      row.appendChild(td);
    });

    dataSource.forEach((item, i) => {
      const trNode = rowTpl.cloneNode(true) as HTMLTableRowElement;

      trNode.setAttribute("data-index", String(i));

      if (typeof this.selectable === "function") {
        const selectable = !this.selectable(item);
        const selectionCheckbox = trNode.querySelector(
          `ea-checkbox[data-type="selection"]`
        );
        if (selectionCheckbox) {
          selectionCheckbox.toggleAttribute("disabled", selectable);
        }
      }

      if (
        columns.some(column => column.type === "index") &&
        typeof this.indexMethod === "function"
      ) {
        const indexEl = trNode.querySelector(`.ea-table__index`);
        if (indexEl) {
          indexEl.textContent = String(this.indexMethod(i));
        }
      }

      trNode.querySelectorAll("[data-scope]").forEach(td => {
        const scope = td.getAttribute("data-scope");
        const column = columns.find(column => column.prop === scope);

        if (column) {
          td.textContent = String(
            (item as Record<string, unknown>)[column.prop!] ?? ""
          );
        } else if (scope && scope in (item as object)) {
          td.textContent = String(
            (item as Record<string, unknown>)[scope] ?? ""
          );
        }
      });

      bodyTemplate.appendChild(trNode);

      this._states.dataSource.set(trNode, item);
      if (item && typeof item === "object") {
        this._states.dataIndex.set(item as object, trNode);
      }
    });

    if (this.showSummary) {
      const summaryRow = this._tfoot.querySelectorAll(
        ".ea-table__td[data-scope]"
      );
      const summaryFn =
        typeof this.summaryMethod === "function"
          ? this.summaryMethod
          : this._defaultSummaryMethod;
      const summaryData = summaryFn({ columns, data: dataSource });

      summaryRow.forEach((row, index) => {
        row.textContent = String(summaryData[index] ?? "");
      });
    }

    this._tbody.appendChild(bodyTemplate);

    if (hasSelectionColumn) {
      this._container.addEventListener("change", this._onSelectionChangeEvent, {
        signal: this._abortController.signal,
      });
    }

    this._handleFixedColumn();
    this._onScrollEvent();

    this.updateContainerClasslist();

    this._states.isDataRendered = true;
    this._applyRowStylePart();
    this.emit("ea-table-data-rendered");
    this._isSettingData = false;
  };

  sort = (prop: string, order: "asc" | "desc" = "asc"): void => {
    const tbody = this._tbody;
    const template = document.createDocumentFragment();
    const originalPosi = tbody.nextElementSibling;

    template.appendChild(tbody);

    const res = [...template.querySelectorAll("tr")].sort((a, b) => {
      const aData = this._states.dataSource.get(a) as Record<string, unknown>;
      const bData = this._states.dataSource.get(b) as Record<string, unknown>;
      return order === "asc"
        ? String(aData[prop]).localeCompare(String(bData[prop]))
        : String(bData[prop]).localeCompare(String(aData[prop]));
    });

    res.forEach(tr => {
      tbody.appendChild(tr);
    });

    this._container.insertBefore(template, originalPosi);

    this.dispatchEvent(
      new EaTableSortChangeEvent({
        prop,
        order,
      })
    );
  };

  private _applyRowStylePart = (): void => {
    const handler = this._states.rowStyleHandler;
    if (!handler || !this._tbody) return;

    const trs = [
      ...this._tbody.querySelectorAll("tr"),
    ] as HTMLTableRowElement[];

    if (typeof handler === "function") {
      trs.forEach((tr, i) => {
        const className = handler({
          row: this._states.dataSource.get(tr),
          rowIndex: i,
        });

        if (className) tr.part?.add(className);
      });
    } else if (typeof handler === "string") {
      if (!handler) return;

      trs.forEach(tr => {
        tr.part?.add(handler);
      });
    }
  };

  setRowStylePart = (
    handler: ((param: { row: unknown; rowIndex: number }) => string) | string
  ): void => {
    this._states.rowStyleHandler = handler;

    if (this._states.isDataRendered) {
      this._applyRowStylePart();
    }
  };

  getCurrentRow(): { target: HTMLTableRowElement | null; value: unknown } {
    return this._states.currentRow;
  }

  setCurrentRow(row?: unknown): void {
    let tr: HTMLTableRowElement | null = null;
    let dataValue: unknown = null;

    if (row && typeof row === "object") {
      tr =
        (this._states.dataIndex.get(row as object) as HTMLTableRowElement) ||
        null;
      dataValue = row;
    }

    if (tr && dataValue) {
      this._setHighlightCurrentRowStyle(tr, this._states.currentRow.target);

      this._states.currentRow.target = tr;
      this._states.currentRow.value = dataValue;
    } else {
      this._unsetHighlightCurrentRowStyle(this._states.currentRow.target);

      this._states.currentRow.value = null;
      this._states.currentRow.target = null;
    }
  }

  toggleRowSelection = (
    row: unknown,
    selected?: boolean,
    ignoreSelectable = true
  ): void => {
    const hasSelection = this._states.columns.some(
      column => column.type === "selection"
    );
    if (!hasSelection) return;

    const tr = this._states.dataIndex.get(row as object);
    if (!tr) return;

    const selector = `ea-checkbox[data-type="selection"]${!ignoreSelectable ? ":not([disabled])" : ""}`;
    const checkbox = tr.querySelector(selector) as HTMLElement;
    if (!checkbox) return;

    if (selected !== undefined) {
      checkbox.toggleAttribute("checked", selected);
    } else {
      checkbox.toggleAttribute("checked", !checkbox.hasAttribute("checked"));
    }

    this._handleSelectionUpdate();
    this._dispatchSlectionChangeEvent();
  };

  clearSelection = (): void => {
    const selectionCheckboxEls = [
      ...this._container.querySelectorAll(`ea-checkbox[data-type="selection"]`),
    ] as HTMLElement[];

    selectionCheckboxEls.forEach(el => {
      el.removeAttribute("checked");
      el.removeAttribute("indeterminate");
    });

    this._dispatchSlectionChangeEvent();
  };

  // ==================== 私有方法 ====================

  private _getCurrentSelectionRows = (): unknown[] => {
    return [
      ...this._tbody.querySelectorAll(
        `ea-checkbox[data-type="selection"][checked]`
      ),
    ].map(el =>
      this._states.dataSource.get(
        el.closest(`.ea-table__tr[part="tbody-tr"]`) as HTMLElement
      )
    );
  };

  private _handleSelectionUpdate = (): void => {
    const theadCheckboxEl = this._thead.querySelector(
      `ea-checkbox[data-type="selection"]`
    ) as HTMLElement;

    if (!theadCheckboxEl) return;

    const isAllChecked = [
      ...this._tbody.querySelectorAll(
        `ea-checkbox[data-type="selection"]:not([disabled])`
      ),
    ].every(checkbox => checkbox.hasAttribute("checked"));

    const isSomeChecked = [
      ...this._tbody.querySelectorAll(`ea-checkbox[data-type="selection"]`),
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

  private _handleFixedColumn = (): void => {
    const fixedItems = [
      ...this._container.querySelectorAll(".is-fixed"),
    ] as HTMLElement[];
    const leftFixedItems = fixedItems.filter(item =>
      item.classList.contains("fixed-left")
    );
    const rightFixedItems = fixedItems.filter(item =>
      item.classList.contains("fixed-right")
    );

    const directionDivider = (initialArray: HTMLElement[]): HTMLElement[][] => {
      const ths = initialArray.filter(item => item.part?.contains("thead-th"));
      if (ths.length <= 1) return [initialArray];

      const ary: HTMLElement[][] = [];

      for (let i = 0; i < initialArray.length; i += ths.length) {
        ary.push(initialArray.slice(i, i + ths.length));
      }

      return ary.reduce<HTMLElement[][]>(
        (acc, item) => {
          item.forEach((el, index) => {
            acc[index] = [...(acc[index] || []), el];
          });

          return acc;
        },
        Array(ths.length).fill([]) as HTMLElement[][]
      );
    };

    const handleColumnStyles = (fixedColumnGroup: HTMLElement[][]): void => {
      if (!fixedColumnGroup.length) return;

      const lastGroup = fixedColumnGroup.slice(-1)[0];

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

  private _setHighlightCurrentRowStyle = (
    currentRow: HTMLTableRowElement,
    oldRow: HTMLTableRowElement | null = this._states.currentRow.target
  ): void => {
    if (!this.highlightCurrentRow) return;

    oldRow?.classList?.remove("is-current");
    currentRow?.classList?.add("is-current");
  };

  private _unsetHighlightCurrentRowStyle = (
    currentRow: HTMLTableRowElement | null
  ): void => {
    if (!this.highlightCurrentRow || !currentRow) return;

    currentRow?.classList?.remove("is-current");
  };

  private _dispatchSlectionChangeEvent = (): void => {
    const newSelection = this._getCurrentSelectionRows();

    this.dispatchEvent(
      new EaTableSelectionChangeEvent({
        newSelection,
      })
    );
  };

  // ==================== 事件处理 ====================

  private _onClickEvent = (e: MouseEvent): void => {
    const tr = (e.target as HTMLElement).closest(
      "tr[part='tbody-tr']"
    ) as HTMLTableRowElement;

    this._AbortControllerStates.selectAbortController?.abort();

    if (!tr) return;

    const onControllerShouldAbortEvent = (): void => {
      this._AbortControllerStates.selectAbortController?.abort();
    };

    const onMouseUpEvent = (e: Event): void => {
      const mouseEvent = e as MouseEvent;
      const endTr = (mouseEvent.target as HTMLElement).closest(
        "tr[part='tbody-tr']"
      ) as HTMLTableRowElement;
      const endTd = (mouseEvent.target as HTMLElement).closest(
        "td[part='tbody-td']"
      ) as HTMLTableCellElement;

      onControllerShouldAbortEvent();

      if (endTr !== tr) return;

      const value = this._states.dataSource.get(tr);
      const columnKey = endTd?.getAttribute("data-scope");

      this._setHighlightCurrentRowStyle(tr, this._states.currentRow.target);

      this._states.currentRow.target = tr;
      this._states.currentRow.value = value;

      this.dispatchEvent(
        new EaTableRowClickEvent({
          target: tr,
          column: columnKey || "",
          row: value,
        })
      );

      this.dispatchEvent(
        new EaTableCurrentChangeEvent({
          target: tr,
          column: columnKey || "",
          row: value,
        })
      );

      if (endTd) {
        this.dispatchEvent(
          new EaTableCellClickEvent({
            cell: endTd,
            column: columnKey || "",
            row: value,
          })
        );

        const templateTarget = (mouseEvent.target as HTMLElement).closest(
          "[data-template-cell]"
        ) as HTMLElement;
        if (templateTarget) {
          const rowIndex = Number(tr.getAttribute("data-index"));
          this.dispatchEvent(
            new EaTableTemplateCellClickEvent({
              target: templateTarget,
              rowData: value,
              rowIndex: rowIndex,
              originalEvent: mouseEvent,
            })
          );
        }
      }
    };

    this._AbortControllerStates.selectAbortController = new AbortController();

    this.addEventListener("mouseout", onControllerShouldAbortEvent, {
      once: true,
      signal: this._AbortControllerStates.selectAbortController.signal,
    });
    this._container.addEventListener("mouseup", onMouseUpEvent, {
      once: true,
      signal: this._AbortControllerStates.selectAbortController.signal,
    });
  };

  private _onMouseEvent = (
    e: MouseEvent,
    part: "body" | "head"
  ): {
    cell: HTMLTableCellElement | null;
    row: HTMLTableRowElement | null;
    data: unknown;
    columnKey: string | null;
  } => {
    const tr = (e.target as HTMLElement).closest(
      `tr[part='t${part}-tr']`
    ) as HTMLTableRowElement;

    if (!tr) return { cell: null, row: null, data: null, columnKey: null };

    const cellTag = part === "body" ? "td" : "th";
    const td = (e.target as HTMLElement).closest(
      `${cellTag}[part='t${part}-${cellTag}']`
    ) as HTMLTableCellElement;

    const value = this._states.dataSource.get(tr);
    const columnKey = td?.getAttribute("data-scope") || null;

    return {
      cell: td || null,
      row: tr,
      data: value,
      columnKey,
    };
  };

  private _onDBLClickEvent = (e: MouseEvent): void => {
    const { row, cell, data, columnKey } = this._onMouseEvent(e, "body");

    if (!row) return;

    this.dispatchEvent(
      new EaTableRowDBLClickEvent({
        target: row as unknown as HTMLTableCellElement,
        column: columnKey || "",
        row: data,
      })
    );

    this.dispatchEvent(
      new EaTableCellDBLClickEvent({
        cell: cell!,
        column: columnKey || "",
        row: data,
      })
    );
  };

  private _onContextmenuEvent = (e: MouseEvent): void => {
    const { row, cell, data, columnKey } = this._onMouseEvent(e, "body");

    if (!row) return;

    this.dispatchEvent(
      new EaTableRowContextmenuEvent({
        target: row as unknown as HTMLTableCellElement,
        column: columnKey || "",
        row: data,
      })
    );

    this.dispatchEvent(
      new EaTableCellContextmenuEvent({
        cell: cell!,
        column: columnKey || "",
        row: data,
      })
    );
  };

  private _onScrollEvent = (): void => {
    const fixedItems = [
      ...this._container.querySelectorAll(".is-fixed"),
    ] as HTMLElement[];
    const { scrollLeft } = this._container;
    const endPosition =
      Math.floor(this._container.scrollWidth - this._container.offsetWidth) - 1;

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

  private _onCellMouseEnterEvent = (e: MouseEvent): void => {
    const { row, cell, data, columnKey } = this._onMouseEvent(e, "body");

    if (!row) return;

    this.dispatchEvent(
      new EaTableCellMouseEnterEvent({
        column: columnKey || "",
        row: data,
        cell: cell!,
      })
    );
  };

  private _onCellMouseLeaveEvent = (e: MouseEvent): void => {
    const { row, cell, data, columnKey } = this._onMouseEvent(e, "body");

    if (!row) return;

    this.dispatchEvent(
      new EaTableCellMouseLeaveEvent({
        column: columnKey || "",
        row: data,
        cell: cell!,
      })
    );
  };

  private _onHeaderClickEvent = (e: MouseEvent): void => {
    const { cell, columnKey } = this._onMouseEvent(e, "head");

    if (!cell) return;

    this.dispatchEvent(
      new EaTableHeaderClickEvent({
        column: columnKey || "",
        cell,
      })
    );
  };

  private _onHeaderContextmenuEvent = (e: MouseEvent): void => {
    const { cell, columnKey } = this._onMouseEvent(e, "head");

    if (!cell) return;

    this.dispatchEvent(
      new EaTableHeaderContextmenuEvent({
        column: columnKey || "",
        cell,
      })
    );
  };

  private _slotChangeHandler = (): void => {
    this._handleTableStructRender();
    this._handleSortableColumnsInit();
    if (this._states.originData.length > 0) {
      this.setData(this._states.originData);
    }
  };

  private _childChangeHandler = (e: Event): void => {
    e.stopImmediatePropagation();

    this._handleTableStructRender();
    this._handleSortableColumnsInit();
    if (this._states.originData.length > 0) {
      this.setData(this._states.originData);
    }
  };

  private _onSelectionChangeEvent = (e: Event): void => {
    const target = e.target as HTMLElement;
    if (target.getAttribute("data-type") !== "selection") return;

    e.stopImmediatePropagation();

    const customEvent = e as CustomEvent;
    const { checked } = customEvent.detail || {};

    const isTheadCheckbox = target.closest(".ea-table__thead");

    if (isTheadCheckbox) {
      const selectionCheckboxEls = [
        ...this._tbody.querySelectorAll(`ea-checkbox[data-type="selection"]`),
      ] as HTMLElement[];

      target.toggleAttribute("checked", target.hasAttribute("checked"));

      selectionCheckboxEls.forEach(checkbox => {
        if (!checkbox.hasAttribute("disabled")) {
          checkbox.toggleAttribute("checked", checked);
        }
      });

      this._handleSelectionUpdate();

      const selection = this._getCurrentSelectionRows();
      this.dispatchEvent(new EaTableSelectAllEvent({ selection }));
    } else {
      const selection = this._getCurrentSelectionRows();
      const currentRow = this._states.dataSource.get(
        target.closest(`.ea-table__tr[part="tbody-tr"]`) as HTMLElement
      );

      this._handleSelectionUpdate();
      this.dispatchEvent(
        new EaTableSelectEvent({ selection, row: currentRow })
      );
    }

    this._dispatchSlectionChangeEvent();
  };

  $beforeUnmount(): void {
    this._abortController?.abort();
    this._sortAbortController?.abort();

    for (const key in this._AbortControllerStates) {
      this._AbortControllerStates[key]?.abort();
      this._AbortControllerStates[key] = null;
    }
  }
}
