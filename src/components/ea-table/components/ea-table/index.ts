import EaBase, { createBEM } from "@core/EaBase";
import {
  CustomElement,
  attribute,
  property,
  query,
  listen,
  children,
} from "@decorator";
import { html } from "@utils/html";
import "@components/ea-empty/index";
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

/**
 * @summary 表格组件，用于展示结构化数据，支持排序、选择、固定列、斑马纹、合计行等功能。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-empty
 * @dependency ea-checkbox
 *
 * @slot default - 表格列定义插槽，用于放置 ea-table-column 子组件。
 * @slot empty - 无数据时的空状态内容。
 *
 * @event ea-row-click - 行点击时触发，detail: `{ target, column, row }`。
 * @event ea-row-dblclick - 行双击时触发，detail: `{ target, column, row }`。
 * @event ea-row-contextmenu - 行右键点击时触发，detail: `{ target, column, row }`。
 * @event ea-cell-click - 单元格点击时触发，detail: `{ cell, column, row }`。
 * @event ea-cell-dblclick - 单元格双击时触发，detail: `{ cell, column, row }`。
 * @event ea-cell-contextmenu - 单元格右键点击时触发，detail: `{ cell, column, row }`。
 * @event ea-cell-mouse-enter - 单元格鼠标移入时触发，detail: `{ cell, column, row }`。
 * @event ea-cell-mouse-leave - 单元格鼠标移出时触发，detail: `{ cell, column, row }`。
 * @event ea-header-click - 表头单元格点击时触发，detail: `{ cell, column }`。
 * @event ea-header-contextmenu - 表头单元格右键点击时触发，detail: `{ cell, column }`。
 * @event ea-sort-change - 排序变化时触发，detail: `{ prop, order }`。
 * @event ea-current-change - 当前行变化时触发，detail: `{ target, column, row }`。
 * @event ea-selection-change - 选中项变化时触发，detail: `{ newSelection }`。
 * @event ea-select - 单行选中时触发，detail: `{ selection, row }`。
 * @event ea-select-all - 全选时触发，detail: `{ selection }`。
 * @event ea-template-cell-click - 模板单元格点击时触发，detail: `{ target, rowData, rowIndex, originalEvent }`。
 * @event ea-table-data-rendered - 数据渲染完成时触发（内部通信）。
 * @event ea-table-column-change - 列配置变化时触发（内部通信）。
 *
 * @csspart container - 表格容器元素。
 * @csspart colgroup - 列分组元素。
 * @csspart thead - 表头元素。
 * @csspart tbody - 表体元素。
 * @csspart tfoot - 表尾元素。
 * @csspart default-slot - 默认插槽元素。
 * @csspart thead-th - 表头单元格元素。
 * @csspart thead-tr - 表头行元素。
 * @csspart tfoot-tr - 表尾行元素。
 * @csspart tfoot-td - 表尾单元格元素。
 * @csspart tbody-tr - 表体行元素。
 * @csspart tbody-td - 表体单元格元素。
 *
 * @cssproperty --ea-table-cell-spacing - 单元格内边距。
 * @cssproperty --ea-table-cell-width - 单元格最小宽度。
 * @cssproperty --ea-table-height - 表格高度。
 * @cssproperty --ea-table-max-height - 表格最大高度。
 * @cssproperty --ea-table-sort-indicator-color - 排序指示器颜色。
 * @cssproperty --ea-table-sort-indicator-active-color - 排序指示器激活颜色。
 * @cssproperty --ea-table-sort-icon-size - 排序图标大小。
 * @cssproperty --ea-table-header-color - 表头文字颜色。
 * @cssproperty --ea-table-header-font-size - 表头字体大小。
 * @cssproperty --ea-table-body-color - 表体文字颜色。
 * @cssproperty --ea-table-body-font-size - 表体字体大小。
 * @cssproperty --ea-table-bg-color - 表格背景颜色。
 * @cssproperty --ea-table-stripe-bg-color - 斑马纹背景颜色。
 * @cssproperty --ea-table-hover-bg-color - 悬停背景颜色。
 * @cssproperty --ea-table-selected-bg-color - 选中行背景颜色。
 * @cssproperty --ea-table-border-color - 边框颜色。
 * @cssproperty --ea-table-fixed-x - 固定列偏移量。
 * @cssproperty --ea-table-fixed-left-cell-box-shadow - 左侧固定列阴影。
 * @cssproperty --ea-table-fixed-right-cell-box-shadow - 右侧固定列阴影。
 * @cssproperty --ea-table-transition - 过渡动画时长。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaTable extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @query(bem.ce("thead"))
  private _thead!: HTMLElement;

  @query(bem.ce("tbody"))
  private _tbody!: HTMLElement;

  @query(bem.ce("tfoot"))
  private _tfoot!: HTMLElement;

  @query(bem.ce("empty"))
  private _emptySlot!: HTMLElement;

  @query(bem.ce("colgroup"))
  private _colgroup!: HTMLElement;

  @children("ea-table-column")
  private _columnNodes!: NodeListOf<HTMLElement>;

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

  private _selectAbortController: AbortController | null = null;

  private _defaultSummaryMethod(param: {
    columns: ColumnOption[];
    data: unknown[];
  }): (string | number)[] {
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
  }

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

  /** 渲染表格结构（colgroup、thead、tfoot） */
  private _handleTableStructRender(): void {
    const columns: ColumnOption[] = [...this._columnNodes!].map(
      column =>
        (column as unknown as EaTableColumn)
          .getColumnTree as unknown as ColumnOption
    );

    this._states.columns = columns;

    const colgroup = colgroupRenderer(columns);
    const thead = theadRenderer(columns);
    const tfoot = tfootRenderer(columns);

    this._colgroup.innerHTML = colgroup;
    this._thead.innerHTML = thead;
    this._tfoot.innerHTML = tfoot;
  }

  $mount(): void {
    this._mountResolve();
  }

  async $mounted(): Promise<void> {
    await customElements.whenDefined("ea-table-column");
    this._handleTableStructRender();
  }

  /**
   * 设置表格数据并渲染行
   * @param dataSource - 数据源数组
   */
  setData = async (dataSource: unknown[]): Promise<void> => {
    if (this._isSettingData) return;
    this._isSettingData = true;

    await customElements.whenDefined("ea-table");
    await customElements.whenDefined("ea-table-column");
    await this._mountPromise;

    if (this._states.columns.length === 0) {
      this._handleTableStructRender();
    }

    (this as Record<string, unknown>)["__prop_data"] = dataSource;

    const bodyTemplate = document.createDocumentFragment();
    const rowTpl = document.createElement("tr");
    rowTpl.part?.add("tbody-tr");
    rowTpl.className = "ea-table__tr";
    const columns = this._states.columns.filter(
      item => !item.template || item.template instanceof HTMLTemplateElement
    );

    const typeTemplate: Record<string, () => string> = {
      selection: () =>
        html(
          `<ea-checkbox class="ea-table__selection" data-type="selection"></ea-checkbox>`
        ),
      index: () =>
        html(`<span class="ea-table__index" data-type="index"></span>`),
    };

    this._selectAbortController?.abort();
    this._selectAbortController = new AbortController();

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

    this._handleFixedColumn();
    this._handleScroll();

    this.updateContainerClasslist();

    this._states.isDataRendered = true;
    this._applyRowStylePart();
    this.emit("ea-table-data-rendered");
    this._isSettingData = false;
  };

  /**
   * 对表格数据进行排序
   * @param prop - 排序列的属性名
   * @param order - 排序方向
   */
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

  /** 为行元素添加自定义样式 part */
  private _applyRowStylePart(): void {
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
  }

  /**
   * 设置行样式 part 处理器
   * @param handler - 样式处理器，支持函数或字符串
   */
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

  /**
   * 切换行选中状态
   * @param row - 行数据对象
   * @param selected - 是否选中，不传则切换
   * @param ignoreSelectable - 是否忽略可选性检查
   */
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
    this._dispatchSelectionChangeEvent();
  };

  /** 清空所有行的选中状态 */
  clearSelection = (): void => {
    const selectionCheckboxEls = [
      ...this._container.querySelectorAll(`ea-checkbox[data-type="selection"]`),
    ] as HTMLElement[];

    selectionCheckboxEls.forEach(el => {
      el.removeAttribute("checked");
      el.removeAttribute("indeterminate");
    });

    this._dispatchSelectionChangeEvent();
  };

  /** 获取当前所有选中行的数据 */
  private _getCurrentSelectionRows(): unknown[] {
    return [
      ...this._tbody.querySelectorAll(
        `ea-checkbox[data-type="selection"][checked]`
      ),
    ].map(el =>
      this._states.dataSource.get(
        el.closest(`.ea-table__tr[part="tbody-tr"]`) as HTMLElement
      )
    );
  }

  /** 更新表头全选复选框的状态（选中、半选、未选） */
  private _handleSelectionUpdate(): void {
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
  }

  /** 处理固定列的样式计算和偏移量设置 */
  private _handleFixedColumn(): void {
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
  }

  /**
   * 设置高亮当前行样式
   * @param currentRow - 当前行元素
   * @param oldRow - 之前高亮的行元素
   */
  private _setHighlightCurrentRowStyle(
    currentRow: HTMLTableRowElement,
    oldRow: HTMLTableRowElement | null = this._states.currentRow.target
  ): void {
    if (!this.highlightCurrentRow) return;

    oldRow?.classList?.remove("is-current");
    currentRow?.classList?.add("is-current");
  }

  /**
   * 移除高亮当前行样式
   * @param currentRow - 需要移除高亮的行元素
   */
  private _unsetHighlightCurrentRowStyle(
    currentRow: HTMLTableRowElement | null
  ): void {
    if (!this.highlightCurrentRow || !currentRow) return;

    currentRow?.classList?.remove("is-current");
  }

  /** 派发选中项变化事件 */
  private _dispatchSelectionChangeEvent(): void {
    const newSelection = this._getCurrentSelectionRows();

    this.dispatchEvent(
      new EaTableSelectionChangeEvent({
        newSelection,
      })
    );
  }

  /** 处理表格点击事件，触发行点击和单元格点击 */
  @listen("mousedown", ".ea-table")
  private _handleRowMouseDown(e: MouseEvent): void {
    const tr = (e.target as HTMLElement).closest(
      "tr[part='tbody-tr']"
    ) as HTMLTableRowElement;

    this._selectAbortController?.abort();

    if (!tr) return;

    const onControllerShouldAbortEvent = (): void => {
      this._selectAbortController?.abort();
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

    this._selectAbortController = new AbortController();

    this.addEventListener("mouseout", onControllerShouldAbortEvent, {
      once: true,
      signal: this._selectAbortController.signal,
    });
    this._container.addEventListener("mouseup", onMouseUpEvent, {
      once: true,
      signal: this._selectAbortController.signal,
    });
  }

  /**
   * 从鼠标事件中提取行、单元格、数据和列键信息
   * @param e - 鼠标事件
   * @param part - 表格区域类型
   * @returns 包含 cell、row、data、columnKey 的对象
   */
  private _getMouseEventData(
    e: MouseEvent,
    part: "body" | "head"
  ): {
    cell: HTMLTableCellElement | null;
    row: HTMLTableRowElement | null;
    data: unknown;
    columnKey: string | null;
  } {
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
  }

  /** 处理表格双击事件，触发行和单元格双击 */
  @listen("dblclick", ".ea-table")
  private _handleRowDblClick(e: MouseEvent): void {
    const { row, cell, data, columnKey } = this._getMouseEventData(e, "body");

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
  }

  /** 处理表格右键点击事件，触发行和单元格右键菜单 */
  @listen("contextmenu", ".ea-table")
  private _handleRowContextmenu(e: MouseEvent): void {
    const { row, cell, data, columnKey } = this._getMouseEventData(e, "body");

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
  }

  /** 处理表格滚动事件，更新固定列的视觉状态 */
  @listen("scroll", ".ea-table")
  private _handleScroll(): void {
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
  }

  /** 处理单元格鼠标移入事件 */
  @listen("mouseover", ".ea-table")
  private _handleCellMouseEnter(e: MouseEvent): void {
    const { row, cell, data, columnKey } = this._getMouseEventData(e, "body");

    if (!row) return;

    this.dispatchEvent(
      new EaTableCellMouseEnterEvent({
        column: columnKey || "",
        row: data,
        cell: cell!,
      })
    );
  }

  /** 处理单元格鼠标移出事件 */
  @listen("mouseout", ".ea-table")
  private _handleCellMouseLeave(e: MouseEvent): void {
    const { row, cell, data, columnKey } = this._getMouseEventData(e, "body");

    if (!row) return;

    this.dispatchEvent(
      new EaTableCellMouseLeaveEvent({
        column: columnKey || "",
        row: data,
        cell: cell!,
      })
    );
  }

  /** 处理表头点击事件 */
  @listen("click", ".ea-table__thead")
  private _handleHeaderClick(e: MouseEvent): void {
    const sortableEl = (e.target as HTMLElement).closest(
      ".is-sortable"
    ) as HTMLElement;
    if (sortableEl) {
      const { prop, order } = sortableEl.dataset;
      if (prop) {
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
      }
    }

    const { cell, columnKey } = this._getMouseEventData(e, "head");
    if (!cell) return;

    this.dispatchEvent(
      new EaTableHeaderClickEvent({
        column: columnKey || "",
        cell,
      })
    );
  }

  /** 处理表头右键点击事件 */
  @listen("contextmenu", ".ea-table__thead")
  private _handleHeaderContextmenu(e: MouseEvent): void {
    const { cell, columnKey } = this._getMouseEventData(e, "head");

    if (!cell) return;

    this.dispatchEvent(
      new EaTableHeaderContextmenuEvent({
        column: columnKey || "",
        cell,
      })
    );
  }

  /** 处理默认插槽变化，重新渲染表格结构 */
  @listen("slotchange", "#defaultSlot")
  private _handleSlotChange(): void {
    this._handleTableStructRender();
    if (this._states.originData.length > 0) {
      this.setData(this._states.originData);
    }
  }

  /**
   * 处理子组件列配置变化事件
   * @param e - 列变化事件
   */
  @listen("ea-table-column-change")
  private _handleColumnChange(e: Event): void {
    e.stopImmediatePropagation();
    this._handleTableStructRender();
    if (this._states.originData.length > 0) {
      this.setData(this._states.originData);
    }
  }

  /** 处理选择复选框的 change 事件，更新全选/半选状态并派发事件 */
  @listen("change", ".ea-table")
  private _handleSelectionChange(e: Event): void {
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

    this._dispatchSelectionChangeEvent();
  }

  $beforeUnmount(): void {
    this._selectAbortController?.abort();
  }
}
