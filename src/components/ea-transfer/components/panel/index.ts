import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, property, query, listen } from "@decorator";
import { Enum } from "@utils/Enum";
import { i18nManager } from "@utils/I18nManager";
import "@components/ea-checkbox/index.js";
import "@components/ea-input/index.js";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-transfer-panel" as const;
const bem = createBEM(TAG_NAME);

export type PanelType = "source" | "target";

/**
 * @summary 穿梭框面板子组件，用于展示单侧数据列表，支持全选、搜索过滤和自定义空状态。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-checkbox
 * @dependency ea-input
 *
 * @slot empty - 空状态内容。
 * @slot footer - 面板底部内容。
 *
 * @csspart container - 面板容器。
 * @csspart header - 面板头部。
 * @csspart checkbox - 全选复选框。
 * @csspart title - 标题。
 * @csspart count - 计数显示。
 * @csspart body - 面板主体。
 * @csspart filter-wrapper - 搜索框容器。
 * @csspart filter - 搜索框。
 * @csspart empty - 空状态区域。
 * @csspart list - 列表容器。
 * @csspart footer - 面板底部。
 * @csspart item-checkbox - 列表项复选框。
 * @csspart item-label - 列表项标签。
 *
 * @cssproperty --ea-transfer-panel-width - 面板宽度。
 * @cssproperty --ea-transfer-panel-height - 面板高度。
 * @cssproperty --ea-transfer-panel-border-color - 边框颜色。
 * @cssproperty --ea-transfer-panel-background-color - 背景颜色。
 * @cssproperty --ea-transfer-panel-header-height - 头部高度。
 * @cssproperty --ea-transfer-panel-header-background - 头部背景颜色。
 * @cssproperty --ea-transfer-panel-item-height - 列表项高度。
 * @cssproperty --ea-transfer-panel-item-hover-background - 列表项悬停背景颜色。
 * @cssproperty --ea-transfer-panel-item-selected-background - 列表项选中背景颜色。
 * @cssproperty --ea-transfer-panel-item-selected-color - 列表项选中文字颜色。
 * @cssproperty --ea-transfer-panel-item-disabled-color - 列表项禁用文字颜色。
 * @cssproperty --ea-transfer-panel-filter-height - 搜索框高度。
 * @cssproperty --ea-transfer-panel-footer-height - 底部高度。
 * @cssproperty --ea-transfer-panel-footer-background - 底部背景颜色。
 * @cssproperty --ea-transfer-panel-footer-border-color - 底部边框颜色。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaTransferPanel extends EaBase {
  private static _idCounter = 0;

  private readonly _uniqueId: number = EaTransferPanel._idCounter++;

  @query(bem.cb())
  private _container!: HTMLElement;

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

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaTransferPanel) {
      this.updateContainerClasslist();
      this._handleDisabledUpdate();
    },
  })
  disabled: boolean = false;

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

  updateContainerClasslist(): string {
    const slot = this._footerSlot?.assignedElements?.()?.[0] as any;
    const hasFooter = slot?.assignedElements?.()?.length > 0;

    const className = bem(
      {},
      {
        filterable: this.filterable,
        "has-footer": hasFooter,
        disabled: this.disabled,
      }
    );

    if (this._container) {
      this._container.className = className;
    }

    return className;
  }

  html(): string {
    i18nManager.locale = this.locale;

    const titleId = `ea-transfer-panel-title-${this._uniqueId}`;

    return `
      <div class='${bem()}' part='container'>
        <div class='${bem.e("header")}' part='header'>
          <ea-checkbox class='${bem.e("checkbox")}' part='checkbox'>
            <span class='${bem.e("title")}' part='title' id='${titleId}'></span>
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
          <ul class='${bem.e("list")}' part='list' role='listbox' tabindex='0' aria-labelledby='${titleId}' aria-multiselectable='true' aria-activedescendant=''></ul>
          <div class='${bem.e("empty")}' part='empty'>
            <slot name="empty"></slot>
          </div>
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

  /** 清空列表项 */
  clearList(): void {
    if (this._list) {
      this._list.innerHTML = "";
    }
  }

  /** 清空搜索关键词并重置过滤 */
  clearQuery(): void {
    if (this._filterInput) {
      this._filterInput.value = "";
      this._handleFilterChange("");
    }
  }

  /** 处理列表项选中变化 */
  private _handleItemChange(e: Event): void {
    e.stopImmediatePropagation();

    if (this.disabled) return;

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

    li.setAttribute("aria-selected", String(isChecked));

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

  /** 处理键盘导航，使用 aria-activedescendant 管理焦点 */
  @listen("keydown", bem.ce("list"))
  private _handleListKeydown(e: KeyboardEvent): void {
    if (this.disabled) return;

    const items = this._getVisibleItems();
    if (items.length === 0) return;

    const currentId = this._list.getAttribute("aria-activedescendant") || "";
    const currentIndex = items.findIndex(item => item.id === currentId);

    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();
        const nextIndex =
          currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        this._setActiveDescendant(items[nextIndex]);
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        const prevIndex =
          currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        this._setActiveDescendant(items[prevIndex]);
        break;
      }
      case "Home": {
        e.preventDefault();
        this._setActiveDescendant(items[0]);
        break;
      }
      case "End": {
        e.preventDefault();
        this._setActiveDescendant(items[items.length - 1]);
        break;
      }
      case " ": {
        e.preventDefault();
        if (currentIndex >= 0) {
          this._toggleItemSelection(items[currentIndex]);
        }
        break;
      }
    }
  }

  /** listbox 获得焦点时，自动聚焦到第一个选项或已选中选项 */
  @listen("focus", bem.ce("list"))
  private _handleListFocus(): void {
    const currentId = this._list.getAttribute("aria-activedescendant");
    if (currentId) return;

    const items = this._getVisibleItems();
    if (items.length === 0) return;

    const firstSelected = items.find(
      item => item.getAttribute("aria-selected") === "true"
    );
    this._setActiveDescendant(firstSelected || items[0]);
  }

  /** listbox 失去焦点时，清除 activedescendant 视觉样式 */
  @listen("blur", bem.ce("list"))
  private _handleListBlur(): void {
    const currentId = this._list.getAttribute("aria-activedescendant");
    if (currentId) {
      const item = this._list.querySelector(`#${currentId}`) as HTMLElement;
      if (item) item.classList.remove("is-active");
    }
  }

  /** 设置 aria-activedescendant 指向的当前活动选项 */
  private _setActiveDescendant(item: HTMLElement): void {
    const prevId = this._list.getAttribute("aria-activedescendant");
    if (prevId) {
      const prevItem = this._list.querySelector(`#${prevId}`) as HTMLElement;
      if (prevItem) prevItem.classList.remove("is-active");
    }

    this._list.setAttribute("aria-activedescendant", item.id);
    item.classList.add("is-active");

    item.scrollIntoView({ block: "nearest" });
  }

  /** 切换列表项的选中状态 */
  private _toggleItemSelection(item: HTMLElement): void {
    const checkbox = item.querySelector(
      `.${bem.e("item-checkbox")}:not([disabled])`
    ) as any;
    if (!checkbox) return;

    checkbox.checked = !checkbox.checked;

    checkbox.dispatchEvent(
      new CustomEvent("change", { bubbles: true, composed: true })
    );
  }

  /** 获取当前可见且可交互的列表项 */
  private _getVisibleItems(): HTMLElement[] {
    return [
      ...this._list.querySelectorAll(
        `.${bem.e("item")}:not(.is-disabled):not(.is-filtered-out)`
      ),
    ] as HTMLElement[];
  }

  /** 处理全选复选框变化 */
  private _handleSelectAllChange(e: Event): void {
    e.stopImmediatePropagation();

    if (this.disabled) return;

    const isChecked = Boolean((e.target as any).checked);
    const isFiltering = !!(
      this._states.filterText && this._states.filterText.trim() !== ""
    );

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

      li.setAttribute("aria-selected", String(isChecked));
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

  /** 获取当前可选择的列表项 */
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

  /** 绑定列表和全选复选框事件 */
  private _bindEvents(): void {
    this._abortController?.abort();
    this._abortController = new AbortController();

    this._list.addEventListener("change", e => this._handleItemChange(e), {
      signal: this._abortController.signal,
    });

    this._checkbox.addEventListener(
      "change",
      (e: Event) => this._handleSelectAllChange(e),
      {
        signal: this._abortController.signal,
      }
    );
  }

  /** 更新选中计数显示 */
  private _updateCount(): void {
    if (!this._count) return;

    const totalItems = this._list.querySelectorAll(`.${bem.e("item")}`).length;
    const checkedItems = this._states.selectedKeys.size;

    this._count.textContent = `${checkedItems}/${totalItems}`;
  }

  /** 处理数据更新，重新渲染列表 */
  private _handleDataUpdate(newData: HTMLElement[]): void {
    this.clearList();

    const newDataSet = new Set(newData);
    for (const key of this._states.selectedKeys) {
      if (!newDataSet.has(key)) {
        this._states.selectedKeys.delete(key);
      }
    }

    newData.forEach(item => {
      this._list.appendChild(item);
    });

    this._removeCheckboxFromTabSequence();

    this._filterData();

    if (newData.length === 0) {
      this._checkbox.disabled = true;
      this._checkbox.checked = false;
      this._checkbox.indeterminate = false;
    } else {
      this._checkbox.disabled = false;
    }

    this._updateCount();
    this._updateSelectAllState();
  }

  /** 将列表项内 checkbox 从 Tab 序列中移除，由 listbox 统一管理焦点 */
  private _removeCheckboxFromTabSequence(): void {
    requestAnimationFrame(() => {
      const checkboxes = this._list.querySelectorAll(
        `.${bem.e("item-checkbox")}`
      );
      checkboxes.forEach((checkbox: Element) => {
        (checkbox as HTMLElement).tabIndex = -1;
      });
    });
  }

  /** 处理 filterable 属性内部更新 */
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

  /** 处理 disabled 属性更新 */
  private _handleDisabledUpdate(): void {
    if (this._checkbox) {
      this._checkbox.disabled = this.disabled;
    }

    if (this._filterInput) {
      this._filterInput.disabled = this.disabled;
    }
  }

  /** 绑定搜索框输入和清除事件 */
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

  /** 处理搜索关键词变化 */
  private _handleFilterChange(filterText: string): void {
    this._states.filterText = filterText;
    this._filterData();
    this._updateSelectAllState();
  }

  /** 计算全选复选框状态 */
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
      isAllChecked = visibleItems > 0 && visibleSelectedItems >= visibleItems;
      isSomeChecked = visibleSelectedItems > 0;
    } else {
      const totalItems = this._list.querySelectorAll(
        `.${bem.e("item")}:not(.is-disabled)`
      ).length;
      isAllChecked =
        totalItems > 0 && this._states.selectedKeys.size >= totalItems;
      isSomeChecked = this._states.selectedKeys.size > 0;
    }

    return { isAllChecked, isSomeChecked };
  }

  /** 更新全选复选框的选中/半选状态 */
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

  /** 根据搜索关键词过滤列表项 */
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
        const shouldShow = this.filterMethod!(filterText, data);
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

  /** 更新搜索框占位符文本 */
  private _updateFilterPlaceholder(newPlaceholder?: string): void {
    if (this._filterInput) {
      if (!this.hasAttribute("filter-placeholder")) {
        this._filterInput.placeholder =
          newPlaceholder || i18nManager.t("transfer.filterPlaceholder");
      }
    }
  }
}
