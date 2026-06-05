import EaFormAssociatedBase from "@core/EaFormAssociatedBase";
import { createBEM } from "@core/EaBase";
import { CustomElement, attribute, property, query, listen } from "@decorator";
import { i18nManager } from "@utils/I18nManager";
import { EaTransferLeftCheckChangeEvent } from "./events/EaTransferLeftCheckChangeEvent";
import { EaTransferRightCheckChangeEvent } from "./events/EaTransferRightCheckChangeEvent";
import "./components/panel/index";
import "@components/ea-checkbox/index.js";
import "@components/ea-button/index.js";
import "@components/ea-icon/index.js";
import "@components/ea-input/index.js";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-transfer" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 穿梭框组件，用于在两个面板之间移动数据项，支持搜索过滤、自定义渲染和多选操作。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-transfer-panel
 * @dependency ea-checkbox
 * @dependency ea-button
 * @dependency ea-icon
 * @dependency ea-input
 *
 * @slot left-empty - 左侧面板空状态内容。
 * @slot left-footer - 左侧面板底部内容。
 * @slot right-empty - 右侧面板空状态内容。
 * @slot right-footer - 右侧面板底部内容。
 *
 * @event change - 选中项变化时触发，detail: `{ value: any[] }`。
 * @event ea-left-check-change - 左侧面板选中项变化时触发，detail: `{ value: any[], movedKeys?: any[] }`。
 * @event ea-right-check-change - 右侧面板选中项变化时触发，detail: `{ value: any[], movedKeys?: any[] }`。
 *
 * @csspart container - 组件容器。
 * @csspart panel - 面板容器。
 * @csspart source-panel - 左侧面板。
 * @csspart target-panel - 右侧面板。
 * @csspart buttons - 按钮区域。
 * @csspart button - 移动按钮。
 * @csspart move-to-right-btn - 向右移动按钮。
 * @csspart move-to-left-btn - 向左移动按钮。
 *
 * @cssproperty --ea-transfer-width - 面板宽度。
 * @cssproperty --ea-transfer-height - 面板高度。
 * @cssproperty --ea-transfer-border-color - 边框颜色。
 * @cssproperty --ea-transfer-border-radius - 边框圆角。
 * @cssproperty --ea-transfer-bg-color - 背景颜色。
 * @cssproperty --ea-transition - 过渡动画时长。
 * @cssproperty --ea-transfer-font-size - 字体大小。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaTransfer extends EaFormAssociatedBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @query(`.${bem.e("panel")}.${bem.e("panel")}--source`)
  private _sourcePanel!: any;

  @query(`.${bem.e("panel")}.${bem.e("panel")}--target`)
  private _targetPanel!: any;

  @query(`${bem.ce("button")}${bem.ce("move-to-right-btn")}`)
  private _moveToRightBtn!: HTMLElement;

  @query(`${bem.ce("button")}${bem.ce("move-to-left-btn")}`)
  private _moveToLeftBtn!: HTMLElement;

  @attribute({
    type: Boolean,
    default: false,
    a11y: {
      ariaAttr: "aria-disabled",
      map: v => String(v),
    },
    observer(this: EaTransfer) {
      this.updateContainerClasslist();
      this._handleDisabledUpdate();
    },
  })
  override disabled: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaTransfer, newVal: boolean) {
      this._handleFilterableUpdate(newVal);
    },
  })
  filterable: boolean = false;

  @attribute({
    type: String,
    default: "请输入搜索内容",
    observer(this: EaTransfer, newVal: string) {
      this._updateFilterPlaceholder(newVal);
    },
  })
  filterPlaceholder: string = "请输入搜索内容";

  @property({
    type: Array,
    default: [],
    observer(this: EaTransfer, newVal: any[]) {
      if (!this._states.isPanelDefined) {
        customElements.whenDefined("ea-transfer-panel").then(() => {
          this._states.isPanelDefined = true;
          this._handleDataUpdate(newVal);
        });
        return;
      }
      this._handleDataUpdate(newVal);
    },
  })
  data: any[] = [];

  @property({
    type: Array,
    default: [],
    observer(this: EaTransfer, newVal: any[]) {
      if (!this._states.isPanelDefined) {
        customElements.whenDefined("ea-transfer-panel").then(() => {
          this._states.isPanelDefined = true;
          this._handleValueUpdate(newVal);
          this.setValue(newVal as any);
          this.emit("change", { detail: { value: newVal } });
        });
        return;
      }
      this._handleValueUpdate(newVal);
      this.setValue(newVal as any);
      this.emit("change", { detail: { value: newVal } });
    },
  })
  override value: any[] = [];

  @property({
    type: Object,
    default: { key: "key", label: "label", disabled: "disabled" },
    observer(this: EaTransfer, newVal: Record<string, string>) {
      this._updateFieldMapping(newVal);
    },
  })
  dataProps: Record<string, string> = {
    key: "key",
    label: "label",
    disabled: "disabled",
  };

  @property({
    type: Array,
    default: [],
    observer(this: EaTransfer, newVal: string[]) {
      this._updateTitles(newVal);
    },
  })
  titles: string[] = [];

  @property({
    type: Array,
    default: [],
    observer(this: EaTransfer, newVal: string[]) {
      this._updateButtonTexts(newVal);
    },
  })
  buttonTexts: string[] = [];

  @property({
    type: Function,
    default: null,
    rawFunction: true,
  })
  filterMethod: ((query: string, item: any) => boolean) | null = null;

  @property({
    type: Array,
    default: [],
  })
  leftDefaultChecked: any[] = [];

  @property({
    type: Array,
    default: [],
  })
  rightDefaultChecked: any[] = [];

  private _abortController?: AbortController;

  private _states = {
    isPanelDefined: false,
    sourceSelectedKeys: new Set<any>(),
    targetSelectedKeys: new Set<any>(),
    dataMap: new Map<any, any>(),
  };

  updateContainerClasslist(): string {
    const className = bem({}, { disabled: this.disabled });

    if (this._container) {
      this._container.className = className;
    }

    return className;
  }

  html(): string {
    i18nManager.locale = this.locale;

    return `
      <div class='${bem()}' part='container' role='group' aria-label='Transfer'>
        <ea-transfer-panel
          class='${bem.e("panel")} ${bem.e("panel")}--source'
          part='panel source-panel'
          type="source"
          data-title="${this._getDefaultTitle("source")}"
          filter-placeholder="${this.filterPlaceholder}"
        >
          <slot name="left-empty" slot="empty"></slot>
          <slot name="left-footer" slot="footer"></slot>
        </ea-transfer-panel>

        <div class='${bem.e("buttons")}' part='buttons'>
          <ea-button
            class='${bem.e("button")} ${bem.e("move-to-right-btn")}'
            part='button move-to-right-btn'
            variant="primary"
            size="small"
            disabled
          >
            <ea-icon name="angle-right"></ea-icon>
            <span class="${bem.e("button-text")}"></span>
          </ea-button>
          <ea-button
            class='${bem.e("button")} ${bem.e("move-to-left-btn")}'
            part='button move-to-left-btn'
            variant="primary"
            size="small"
            disabled
          >
            <ea-icon name="angle-left"></ea-icon>
            <span class="${bem.e("button-text")}"></span>
          </ea-button>
        </div>

        <ea-transfer-panel
          class='${bem.e("panel")} ${bem.e("panel")}--target'
          part='panel target-panel'
          type="target"
          data-title="${this._getDefaultTitle("target")}"
          filter-placeholder="${this.filterPlaceholder}"
        >
          <slot name="right-empty" slot="empty"></slot>
          <slot name="right-footer" slot="footer"></slot>
        </ea-transfer-panel>
      </div>
    `;
  }

  $updateLocalization(locale: string): void {
    this.locale = locale;
    i18nManager.locale = locale;

    if (!this.titles || this.titles.length === 0) {
      this._updateTitles([
        this._getDefaultTitle("source"),
        this._getDefaultTitle("target"),
      ]);
    }
  }

  $mount(): void {
    this.updateContainerClasslist();
    this._bindEvents();
  }

  $beforeUnmount(): void {
    this._abortController?.abort();
  }

  /** 处理 disabled 属性更新，同步到子面板 */
  private _handleDisabledUpdate(): void {
    if (this._sourcePanel) {
      this._sourcePanel.toggleAttribute("disabled", this.disabled);
    }

    if (this._targetPanel) {
      this._targetPanel.toggleAttribute("disabled", this.disabled);
    }
  }

  /** 更新字段映射配置到子面板 */
  private _updateFieldMapping(newDataProps: Record<string, string>): void {
    if (this._sourcePanel) {
      this._sourcePanel.dataProps = newDataProps;
    }

    if (this._targetPanel) {
      this._targetPanel.dataProps = newDataProps;
    }
  }

  /** 处理数据源更新，将数据分配到左右面板 */
  private _handleDataUpdate(newData: any[]): void {
    const { key } = this.dataProps;

    if (this._sourcePanel) {
      const sourceData = newData.filter((item: any) => {
        const itemKey = item[key];
        return !this.value.includes(itemKey);
      });
      this._sourcePanel.clearList();
      this._sourcePanel.data = this._createPanelData(
        sourceData,
        this.leftDefaultChecked
      );
      this._sourcePanel.selected = this.leftDefaultChecked;

      this._sourcePanel.originalData = newData;
      this._sourcePanel.dataMap = this._states.dataMap;
      this._sourcePanel.dataProps = this.dataProps;
    }

    if (this._targetPanel) {
      const targetData = newData.filter((item: any) => {
        const itemKey = item[key];
        return this.value.includes(itemKey);
      });
      this._targetPanel.clearList();
      this._targetPanel.data = this._createPanelData(
        targetData,
        this.rightDefaultChecked
      );
      this._targetPanel.selected = this.rightDefaultChecked;

      this._targetPanel.originalData = newData;
      this._targetPanel.dataMap = this._states.dataMap;
      this._targetPanel.dataProps = this.dataProps;
    }
  }

  /** 处理选中值更新，重新分配面板数据 */
  private _handleValueUpdate(newValue: any[]): void {
    const { key } = this.dataProps;

    if (!this.data || this.data.length === 0) {
      return;
    }

    if (this._sourcePanel) {
      const sourceData = this.data.filter((item: any) => {
        const itemKey = item[key];
        return !newValue.includes(itemKey);
      });

      this._sourcePanel.clearList();
      this._sourcePanel.data = this._createPanelData(
        sourceData,
        this.leftDefaultChecked
      );
      this._sourcePanel.selected = this.leftDefaultChecked;

      this._sourcePanel.originalData = this.data;
      this._sourcePanel.dataMap = this._states.dataMap;
      this._sourcePanel.dataProps = this.dataProps;
    }

    if (this._targetPanel) {
      const targetData = this.data
        .filter((item: any) => {
          const itemKey = item[key];
          return newValue.includes(itemKey);
        })
        .sort((a: any, b: any) => {
          const aIndex = newValue.indexOf(a[key]);
          const bIndex = newValue.indexOf(b[key]);
          return aIndex - bIndex;
        });

      this._targetPanel.clearList();
      this._targetPanel.data = this._createPanelData(
        targetData,
        this.rightDefaultChecked
      );
      this._targetPanel.selected = this.rightDefaultChecked;

      this._targetPanel.originalData = this.data;
      this._targetPanel.dataMap = this._states.dataMap;
      this._targetPanel.dataProps = this.dataProps;
    }
  }

  /** 根据数据创建面板列表项元素 */
  private _createPanelData(data: any[], defaultChecked: any[]): HTMLElement[] {
    const { key, label, disabled } = this.dataProps;
    const panelBem = createBEM("ea-transfer-panel");

    const result = Array.from(
      { length: data.length },
      (_: any, index: number) => {
        const li = document.createElement("li");
        const dataItem = data[index];
        const isDisabled = dataItem[disabled];
        const isChecked = defaultChecked.includes(dataItem[key]);

        const stateClasses: string[] = [];
        if (isDisabled) stateClasses.push("is-disabled");
        if (isChecked) stateClasses.push("is-checked");
        li.className = [panelBem.e("item"), ...stateClasses].join(" ");
        li.setAttribute("role", "option");
        li.setAttribute("aria-selected", String(isChecked));

        li.innerHTML = `
        <ea-checkbox
          class="${panelBem.e("item-checkbox")}"
          ${isDisabled ? "disabled" : ""}
          ${isChecked && !isDisabled ? "checked" : ""}
          part="item-checkbox"
        >
          <span class="${panelBem.e("item-label")}" part="item-label">${dataItem[label]}</span>
        </ea-checkbox>
      `;

        this._states.dataMap.set(li, dataItem);

        return li;
      }
    ).sort((a: HTMLElement, b: HTMLElement) => {
      const aKey = this._states.dataMap.get(a)[key];
      const bKey = this._states.dataMap.get(b)[key];
      return aKey - bKey;
    });

    return result;
  }

  /** 更新移动按钮的文本内容 */
  private _updateButtonTexts(buttonTexts: string[]): void {
    if (Array.isArray(buttonTexts) && buttonTexts.length >= 2) {
      const [rightText, leftText] = buttonTexts;

      if (this._moveToRightBtn) {
        const buttonTextEl = this._moveToRightBtn.querySelector(
          `.${bem.e("button-text")}`
        ) as HTMLElement | null;
        if (buttonTextEl) {
          buttonTextEl.textContent = rightText;
          buttonTextEl.style.display = "inline";
        }
      }

      if (this._moveToLeftBtn) {
        const buttonTextEl = this._moveToLeftBtn.querySelector(
          `.${bem.e("button-text")}`
        ) as HTMLElement | null;
        if (buttonTextEl) {
          buttonTextEl.textContent = leftText;
          buttonTextEl.style.display = "inline";
        }
      }
    }
  }

  /** 处理 filterable 属性更新，同步到子面板 */
  private _handleFilterableUpdate(filterable: boolean): void {
    if (!filterable) return;

    if (this._sourcePanel) {
      this._sourcePanel.toggleAttribute("filterable", filterable);
    }

    if (this._targetPanel) {
      this._targetPanel.toggleAttribute("filterable", filterable);
    }
  }

  /** 更新搜索框占位符到子面板 */
  private _updateFilterPlaceholder(placeholder: string): void {
    if (!this.filterable) return;

    if (this._sourcePanel) {
      this._sourcePanel.setAttribute("filter-placeholder", placeholder);
    }

    if (this._targetPanel) {
      this._targetPanel.setAttribute("filter-placeholder", placeholder);
    }
  }

  /** 获取面板默认标题 */
  private _getDefaultTitle(type: "source" | "target"): string {
    return type === "source"
      ? i18nManager.t("transfer.list1")
      : i18nManager.t("transfer.list2");
  }

  /** 更新面板标题 */
  private _updateTitles(titles: string[]): void {
    if (Array.isArray(titles) && titles.length >= 2) {
      const [sourceTitle, targetTitle] = titles;

      if (this._sourcePanel) {
        this._sourcePanel.setAttribute("data-title", sourceTitle);
      }

      if (this._targetPanel) {
        this._targetPanel.setAttribute("data-title", targetTitle);
      }
    }
  }

  /** 更新移动按钮的启用/禁用状态 */
  private _updateButtonStates(): void {
    const { disabled } = this.dataProps;

    if (this._moveToRightBtn) {
      const movableSourceKeys = this._getMovableKeys(
        [...this._states.sourceSelectedKeys],
        disabled
      );
      (this._moveToRightBtn as any).disabled = movableSourceKeys.length === 0;
    }
    if (this._moveToLeftBtn) {
      const movableTargetKeys = this._getMovableKeys(
        [...this._states.targetSelectedKeys],
        disabled
      );
      (this._moveToLeftBtn as any).disabled = movableTargetKeys.length === 0;
    }
  }

  /** 清空指定面板的搜索关键词 */
  clearQuery(which: "left" | "right"): void {
    if (which === "left" && this._sourcePanel) {
      this._sourcePanel.clearQuery();
    } else if (which === "right" && this._targetPanel) {
      this._targetPanel.clearQuery();
    }
  }

  /** 触发面板选中项变化事件 */
  private _triggerCheckChangeEvent(type: string, selectedKey: any): void {
    const selectedKeys = [
      ...(this._states[
        `${type}SelectedKeys` as keyof typeof this._states
      ] as Set<any>),
    ];
    const { key } = this.dataProps;

    const value = selectedKeys
      .map((li: any) => {
        const data = this._states.dataMap.get(li);
        return data ? data[key] : null;
      })
      .filter(Boolean);

    const detail: any = {
      value,
      movedKeys: [this._states.dataMap.get(selectedKey)[key]],
    };

    if (type === "source") {
      const event = new EaTransferLeftCheckChangeEvent(detail);
      this.dispatchEvent(event);
    } else if (type === "target") {
      const event = new EaTransferRightCheckChangeEvent(detail);
      this.dispatchEvent(event);
    }
  }

  /** 触发全选变化事件 */
  private _triggerCheckAllChangeEvent(type: string, selectedKeys: any[]): void {
    const { key } = this.dataProps;

    const movedKeys = selectedKeys
      .map((li: any) => {
        const data = this._states.dataMap.get(li);
        return data ? data[key] : null;
      })
      .filter(Boolean);

    const value = [
      ...(this._states[
        `${type}SelectedKeys` as keyof typeof this._states
      ] as Set<any>),
    ]
      .map((li: any) => {
        const data = this._states.dataMap.get(li);
        return data ? data[key] : null;
      })
      .filter(Boolean);

    if (type === "source") {
      this.dispatchEvent(
        new EaTransferLeftCheckChangeEvent({
          value,
          movedKeys,
        })
      );
    } else if (type === "target") {
      this.dispatchEvent(
        new EaTransferRightCheckChangeEvent({
          value,
          movedKeys,
        })
      );
    }
  }

  /** 处理面板选中项变化 */
  private _handleSelectionChange(
    type: string,
    selectedKey: any,
    isChecked: boolean
  ): void {
    const key = `${type}SelectedKeys` as keyof typeof this._states;
    const selectedKeysSet = this._states[key] as Set<any>;

    if (isChecked) {
      selectedKeysSet.add(selectedKey);
    } else {
      selectedKeysSet.delete(selectedKey);
    }
    this._updateButtonStates();

    this._triggerCheckChangeEvent(type, selectedKey);
  }

  /** 处理全选变化 */
  private _handleSelectAllChange(
    type: string,
    selectedKeys: any[],
    isChecked: boolean
  ): void {
    const key = `${type}SelectedKeys` as keyof typeof this._states;
    const selectedKeysSet = this._states[key] as Set<any>;

    if (isChecked) {
      selectedKeys.forEach((li: any) => selectedKeysSet.add(li));
    } else {
      selectedKeys.forEach((li: any) => selectedKeysSet.delete(li));
    }
    this._updateButtonStates();

    this._triggerCheckAllChangeEvent(type, selectedKeys);
  }

  /** 获取可移动的选中项（排除禁用项） */
  private _getMovableKeys(selectedKeys: any[], disabledField: string): any[] {
    return selectedKeys.filter((li: any) => {
      const data = this._states.dataMap.get(li);
      return !data || !data[disabledField];
    });
  }

  /** 处理移动后清除选中状态 */
  private _handleMovableKeys(
    movableKeys: any[],
    type: "source" | "target"
  ): void {
    const selectedKeysKey = `${type}SelectedKeys` as keyof typeof this._states;
    const selectedKeysSet = this._states[selectedKeysKey] as Set<any>;

    movableKeys.forEach((li: any) => {
      const checkbox = li.querySelector(".ea-transfer-panel__item-checkbox");
      if (checkbox) {
        checkbox.checked = false;

        checkbox.dispatchEvent(
          new CustomEvent("change", {
            bubbles: true,
            composed: true,
            detail: {
              checkbox: false,
            },
          })
        );
      }

      selectedKeysSet.delete(li);
    });
  }

  /** 生成面板数据排序函数 */
  private _handlePanelDataSort(keyField: string): (a: any, b: any) => number {
    return (a: any, b: any) => {
      const aData = this._states.dataMap.get(a);
      const bData = this._states.dataMap.get(b);

      return aData[keyField] - bData[keyField] || 0;
    };
  }

  /** 处理向右移动按钮点击 */
  @listen("click", `.${bem.e("move-to-right-btn")}`)
  private _onMoveToRight(e: Event): void {
    e.stopImmediatePropagation();

    if (this.disabled) return;

    const { key, disabled } = this.dataProps;
    const selectedKeys = [...this._states.sourceSelectedKeys];
    const movableKeys = this._getMovableKeys(selectedKeys, disabled);

    if (movableKeys.length === 0) return;

    this._handleMovableKeys(movableKeys, "source");

    if (this._targetPanel) {
      this._targetPanel.data = [
        ...new Set(
          [...this._targetPanel.data, ...movableKeys].sort(
            this._handlePanelDataSort(key)
          )
        ),
      ];
    }

    if (this._sourcePanel) {
      this._sourcePanel.data = this._sourcePanel.data
        .filter((li: any) => !movableKeys.includes(li))
        .sort(this._handlePanelDataSort(key));
    }

    if (this._targetPanel) {
      const targetDataKeys = this._targetPanel.data.map((li: any) => {
        const data = this._states.dataMap.get(li);
        return data[key];
      });
      this.value = targetDataKeys;
    }

    this._updateButtonStates();
  }

  /** 处理向左移动按钮点击 */
  @listen("click", `.${bem.e("move-to-left-btn")}`)
  private _onMoveToLeft(e: Event): void {
    e.stopImmediatePropagation();

    if (this.disabled) return;

    const { key, disabled } = this.dataProps;
    const selectedKeys = [...this._states.targetSelectedKeys];
    const movableKeys = this._getMovableKeys(selectedKeys, disabled);

    if (movableKeys.length === 0) return;

    this._handleMovableKeys(movableKeys, "target");

    if (this._sourcePanel) {
      this._sourcePanel.data = [
        ...new Set(
          [...this._sourcePanel.data, ...movableKeys].sort(
            this._handlePanelDataSort(key)
          )
        ),
      ];
    }

    if (this._targetPanel) {
      this._targetPanel.data = this._targetPanel.data
        .filter((li: any) => !movableKeys.includes(li))
        .sort(this._handlePanelDataSort(key));
    }

    if (this._targetPanel) {
      const targetDataKeys = this._targetPanel.data.map((li: any) => {
        const data = this._states.dataMap.get(li);
        return data[key];
      });
      this.value = targetDataKeys;
    }

    this._updateButtonStates();
  }

  /** 绑定面板内部通信事件 */
  private _bindEvents(): void {
    this._abortController?.abort();
    this._abortController = new AbortController();

    this._container.addEventListener(
      "ea-transfer-panel-select-change",
      (e: any) => {
        e.stopImmediatePropagation();
        const { type, selectedKey, isChecked } = e.detail;
        this._handleSelectionChange(type, selectedKey, isChecked);
      },
      {
        signal: this._abortController.signal,
      }
    );

    this._container.addEventListener(
      "ea-transfer-panel-select-all",
      (e: any) => {
        e.stopImmediatePropagation();
        const { type, selectedKeys, isChecked } = e.detail;
        this._handleSelectAllChange(type, selectedKeys, isChecked);
      },
      {
        signal: this._abortController.signal,
      }
    );
  }

  get validationTarget(): HTMLElement | null {
    return (
      this._targetPanel?.shadowRoot?.querySelector(
        ".ea-transfer-panel__list"
      ) || null
    );
  }

  updateValidity(): void {
    const val = this.value;
    const isEmpty = !val || (Array.isArray(val) && val.length === 0);

    if (this.required && isEmpty) {
      this.internals.setValidity({ valueMissing: true }, "请至少选择一项");
    } else {
      this.internals.setValidity({}, "");
    }
  }

  checkValidity(): boolean {
    this.updateValidity();
    return this.internals.checkValidity();
  }

  reportValidity(): boolean {
    this.updateValidity();
    return this.internals.reportValidity();
  }
}
