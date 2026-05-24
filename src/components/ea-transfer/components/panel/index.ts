import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { property } from "@decorator/property";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { Enum } from "@/utils/Enum";
import { i18nManager } from "@/utils/I18nManager.js";
import "@components/ea-checkbox/index.js";
import "@components/ea-input/index.js";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-transfer-panel" as const;
const bem = createBEM(TAG_NAME);

export type PanelType = "source" | "target";

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaTransferPanel extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(bem.cb())
  private _container!: HTMLElement;

  @query(bem.ce("header"))
  private _header!: HTMLElement;

  @query(bem.ce("checkbox"))
  private _checkbox!: any;

  @query(bem.ce("title"))
  private _title!: HTMLElement;

  @query(bem.ce("count"))
  private _count!: HTMLElement;

  @query(bem.ce("list"))
  private _list!: HTMLElement;

  @query(bem.ce("filter-wrapper"))
  private _filterWrapper!: HTMLElement;

  @query(bem.ce("filter"))
  private _filterInput!: any;

  @query("slot[name='footer']")
  private _footerSlot!: HTMLSlotElement;

  private _abortController?: AbortController;

  private _filterAbortController?: AbortController;

  private _states = {
    isEaInputDefined: false,
    selectedKeys: new Set<HTMLElement>(),
    filterText: "",
  };

  // ==================== 属性定义 ====================

  @attribute({
    type: String,
    default: "",
    observer(this: EaTransferPanel, newVal: string) {
      if (this._title) {
        this._title.textContent = newVal || "";
      }
    },
  })
  dataTitle: string = "";

  @attribute({
    type: Enum(["source", "target"] as const),
    default: "source",
  })
  type: PanelType = "source";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaTransferPanel, newVal: boolean) {
      if (!this._states.isEaInputDefined) {
        customElements.whenDefined("ea-input").then(() => {
          this._states.isEaInputDefined = true;
          this._handleFilterableUpdateInternal(newVal);
        });
        return;
      }
      this._handleFilterableUpdateInternal(newVal);
    },
  })
  filterable: boolean = false;

  @attribute({
    type: String,
    default: "",
    observer(this: EaTransferPanel, newVal: string) {
      if (!this.filterable) return;
      this._updateFilterPlaceholder(newVal);
    },
  })
  filterPlaceholder: string = "";

  @property({
    type: Array,
    default: [],
    observer(this: EaTransferPanel, newVal: HTMLElement[]) {
      this._handleDataUpdate(newVal);
    },
  })
  data: HTMLElement[] = [];

  @property({
    type: Function,
    default: null,
    rawFunction: true,
  })
  filterMethod: ((query: string, item: any) => boolean) | null = null;

  @property({
    type: Object,
    default: { key: "key", label: "label", disabled: "disabled" },
  })
  dataProps: Record<string, string> = {
    key: "key",
    label: "label",
    disabled: "disabled",
  };

  @property({
    type: Object,
    default: new Map(),
  })
  dataMap: Map<any, any> = new Map();

  // ==================== 方法 ====================

  updateContainerClasslist(): string {
    const slot = this._footerSlot?.assignedElements?.()?.[0] as any;
    const hasFooter = slot?.assignedElements?.()?.length > 0;

    const className = bem(
      {},
      {
        filterable: this.filterable,
        "has-footer": hasFooter,
      }
    );

    if (this._container) {
      this._container.className = className;
    }

    return className;
  }

  html(): string {
    i18nManager.locale = this.locale;

    return `
      <div class='${bem()}' part='container'>
        <div class='${bem.e("header")}' part='header'>
          <ea-checkbox class='${bem.e("checkbox")}' part='checkbox'>
            <span class='${bem.e("title")}' part='title'></span>
          </ea-checkbox>
          <span class='${bem.e("count")}' part='count'></span>
        </div>
        <div class='${bem.e("body")}' part='body'>
          <div class='${bem.e("filter-wrapper")}' part='filter-wrapper'>
            <ea-input 
              class='${bem.e("filter")}'
              placeholder="${i18nManager.t("transfer.filterPlaceholder")}"
              part='filter'
              prefix-icon="magnifying-glass"
              clearable
            ></ea-input>
          </div>
          <div class='${bem.e("empty")}' part='empty'>
            <slot name="empty"></slot>
          </div>
          <ul class='${bem.e("list")}' part='list'></ul>
          <div class='${bem.e("footer")}' part='footer'>
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `;
  }

  $updateLocalization(locale: string): void {
    this.locale = locale;
    i18nManager.locale = locale;
    this._updateFilterPlaceholder();
  }

  $mount(): void {
    this.updateContainerClasslist();
    this._bindEvents();
  }

  $beforeUnmount(): void {
    this._abortController?.abort();
    this._filterAbortController?.abort();
  }

  clearList(): void {
    if (this._list) {
      this._list.innerHTML = "";
    }
  }

  clearQuery(): void {
    if (this._filterInput) {
      this._filterInput.value = "";
      this._handleFilterChange("");
    }
  }

  private _handleItemChange(e: Event): void {
    e.stopImmediatePropagation();

    const li = (e.target as HTMLElement).closest(
      `.${bem.e("item")}`
    ) as HTMLElement;
    if (!li) return;

    const isChecked = Boolean((e.target as any).checked);

    if (isChecked) {
      this._states.selectedKeys.add(li);
    } else {
      this._states.selectedKeys.delete(li);
    }

    this._updateSelectAllState();

    this.emit("ea-transfer-panel-select-change", {
      detail: {
        type: this.type,
        selectedKey: li,
        isChecked,
      },
      bubbles: true,
      composed: true,
    });

    this._updateCount();
  }

  private _handleSelectAllChange(e: Event): void {
    e.stopImmediatePropagation();

    const isChecked = Boolean((e.target as any).checked);
    const isFiltering =
      this._states.filterText && this._states.filterText.trim() !== "";

    const listItems = this._getSelectableItems(isFiltering);

    (e.target as any).indeterminate = false;

    listItems.forEach(li => {
      const checkbox = li.querySelector(
        `.${bem.e("item-checkbox")}:not([disabled])`
      ) as any;
      if (!checkbox) return;

      checkbox.checked = isChecked;

      if (isChecked) {
        this._states.selectedKeys.add(li);
      } else {
        this._states.selectedKeys.delete(li);
      }
    });

    this.emit("ea-transfer-panel-select-all", {
      detail: {
        type: this.type,
        selectedKeys: listItems,
        isChecked,
        isFiltering,
      },
      bubbles: true,
      composed: true,
    });

    this._updateCount();
  }

  private _getSelectableItems(isFiltering: boolean): HTMLElement[] {
    if (isFiltering) {
      return [
        ...this._list.querySelectorAll(
          `.${bem.e("item")}:not(.is-disabled):not(.is-filtered-out)`
        ),
      ] as HTMLElement[];
    } else {
      return [
        ...this._list.querySelectorAll(`.${bem.e("item")}:not(.is-disabled)`),
      ] as HTMLElement[];
    }
  }

  private _bindEvents(): void {
    this._abortController?.abort();
    this._abortController = new AbortController();

    this._list.addEventListener("change", e => this._handleItemChange(e), {
      signal: this._abortController.signal,
    });

    this._checkbox.addEventListener(
      "change",
      e => this._handleSelectAllChange(e),
      {
        signal: this._abortController.signal,
      }
    );
  }

  private _updateCount(): void {
    if (!this._count) return;

    const totalItems = this._list.querySelectorAll(`.${bem.e("item")}`).length;
    const checkedItems = this._states.selectedKeys.size;

    this._count.textContent = `${checkedItems}/${totalItems}`;
  }

  private _handleDataUpdate(newData: HTMLElement[]): void {
    this.clearList();

    newData.forEach(item => {
      this._list.appendChild(item);
    });

    this._filterData();

    if (newData.length === 0) {
      this._checkbox.disabled = true;
      this._checkbox.checked = false;
      this._checkbox.indeterminate = false;
    } else {
      this._checkbox.disabled = false;
    }
  }

  private _handleFilterableUpdateInternal(filterable: boolean): void {
    if (this._filterWrapper) {
      if (filterable) {
        this._updateFilterPlaceholder(this.filterPlaceholder);
        this._bindFilterEvents();
      } else {
        this._filterAbortController?.abort();
        this._handleFilterChange("");
      }

      this.updateContainerClasslist();
    }
  }

  private _bindFilterEvents(): void {
    this._filterAbortController?.abort();
    this._filterAbortController = new AbortController();

    if (!this._filterInput) return;

    this._filterInput.addEventListener(
      "input",
      (e: Event) => {
        e.stopImmediatePropagation();
        const value = (e.target as any).value.trim();
        this._handleFilterChange(value);
      },
      {
        signal: this._filterAbortController.signal,
      }
    );

    this._filterInput.addEventListener(
      "ea-clear",
      (e: Event) => {
        e.stopImmediatePropagation();
        this._handleFilterChange("");
      },
      {
        signal: this._filterAbortController.signal,
      }
    );
  }

  private _handleFilterChange(filterText: string): void {
    this._states.filterText = filterText;
    this._filterData();
    this._updateSelectAllState();
  }

  private _calculateSelectAllState(): {
    isAllChecked: boolean;
    isSomeChecked: boolean;
  } {
    const isFiltering =
      this._states.filterText && this._states.filterText.trim() !== "";

    let isAllChecked: boolean;
    let isSomeChecked: boolean;

    if (isFiltering) {
      const visibleItems = this._list.querySelectorAll(
        `.${bem.e("item")}:not(.is-disabled):not(.is-filtered-out)`
      ).length;
      const visibleSelectedItems = [...this._states.selectedKeys].filter(
        li => !li.classList.contains("is-filtered-out")
      ).length;
      isAllChecked = visibleSelectedItems >= visibleItems;
      isSomeChecked = visibleSelectedItems > 0;
    } else {
      const totalItems = this._list.querySelectorAll(
        `.${bem.e("item")}:not(.is-disabled)`
      ).length;
      isAllChecked = this._states.selectedKeys.size >= totalItems;
      isSomeChecked = this._states.selectedKeys.size > 0;
    }

    return { isAllChecked, isSomeChecked };
  }

  private _updateSelectAllState(): void {
    if (!this._checkbox) return;

    const { isAllChecked, isSomeChecked } = this._calculateSelectAllState();

    if (isAllChecked) {
      this._checkbox.checked = true;
      this._checkbox.indeterminate = false;
    } else if (isSomeChecked) {
      this._checkbox.checked = false;
      this._checkbox.indeterminate = true;
    } else {
      this._checkbox.checked = false;
      this._checkbox.indeterminate = false;
    }
  }

  private _filterData(): void {
    const { label } = this.dataProps;
    const filterText = this._states.filterText || "";
    const filterTextLower = filterText.toLowerCase();

    const allItems = [
      ...this._list.querySelectorAll(`.${bem.e("item")}`),
    ] as HTMLElement[];

    if (!filterText) {
      allItems.forEach(item => {
        item.classList.remove("is-filtered-out");
      });
      this._updateCount();
      return;
    }

    if (this.filterMethod && typeof this.filterMethod === "function") {
      allItems.forEach(item => {
        const data = this.dataMap?.get(item) || {};
        const shouldShow = this.filterMethod(filterText, data);
        item.classList.toggle("is-filtered-out", !shouldShow);
      });
    } else {
      allItems.forEach(item => {
        const data = this.dataMap?.get(item) || {};
        const itemLabel = data[label] || "";
        const shouldShow = itemLabel.toLowerCase().includes(filterTextLower);
        item.classList.toggle("is-filtered-out", !shouldShow);
      });
    }

    this._updateCount();
  }

  private _updateFilterPlaceholder(newPlaceholder?: string): void {
    if (this._filterInput) {
      if (!this.hasAttribute("filter-placeholder")) {
        this._filterInput.placeholder =
          newPlaceholder || i18nManager.t("transfer.filterPlaceholder");
      }
    }
  }
}
