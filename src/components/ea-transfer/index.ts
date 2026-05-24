import { EaFormAssociatedBase } from "@core/EaFormAssociatedBase";
import { attribute } from "@decorator/attribute";
import { property } from "@decorator/property";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { listen } from "@decorator/listen";
import { createBEM } from "@utils/bem";
import { i18nManager } from "@utils/I18nManager.js";
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

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaTransfer extends EaFormAssociatedBase {
  // ==================== DOM 元素引用 ====================

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

  // ==================== 属性定义 ====================

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaTransfer) {
      this.updateContainerClasslist();
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
          this.setValue(newVal);
          this.emit("change", { detail: { value: newVal } });
        });
        return;
      }
      this._handleValueUpdate(newVal);
      this.setValue(newVal);
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
    observer(this: EaTransfer) {
      // filterMethod is used by panel components, no action needed here
    },
  })
  filterMethod: ((query: string, item: any) => boolean) | null = null;

  @property({
    type: Array,
    default: [],
    observer() {},
  })
  leftDefaultChecked: any[] = [];

  @property({
    type: Array,
    default: [],
    observer() {},
  })
  rightDefaultChecked: any[] = [];

  // ==================== 私有状态 ====================

  private _abortController?: AbortController;

  private _states = {
    isPanelDefined: false,
    sourceSelectedKeys: new Set<any>(),
    targetSelectedKeys: new Set<any>(),
    dataMap: new Map<any, any>(),
  };

  // ==================== 方法 ====================

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
      <div class='${bem()}' part='container'>
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

  private _updateFieldMapping(newDataProps: Record<string, string>): void {
    if (this._sourcePanel) {
      this._sourcePanel.dataProps = newDataProps;
    }

    if (this._targetPanel) {
      this._targetPanel.dataProps = newDataProps;
    }
  }

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

  private _updateButtonTexts(buttonTexts: string[]): void {
    if (Array.isArray(buttonTexts) && buttonTexts.length >= 2) {
      const [rightText, leftText] = buttonTexts;

      if (this._moveToRightBtn) {
        const buttonTextEl = this._moveToRightBtn.querySelector(
          ".ea-transfer__button-text"
        );
        if (buttonTextEl) {
          buttonTextEl.textContent = rightText;
          buttonTextEl.style.display = "inline";
        }
      }

      if (this._moveToLeftBtn) {
        const buttonTextEl = this._moveToLeftBtn.querySelector(
          ".ea-transfer__button-text"
        );
        if (buttonTextEl) {
          buttonTextEl.textContent = leftText;
          buttonTextEl.style.display = "inline";
        }
      }
    }
  }

  private _handleFilterableUpdate(filterable: boolean): void {
    if (!filterable) return;

    if (this._sourcePanel) {
      this._sourcePanel.toggleAttribute("filterable", filterable);
    }

    if (this._targetPanel) {
      this._targetPanel.toggleAttribute("filterable", filterable);
    }
  }

  private _updateFilterPlaceholder(placeholder: string): void {
    if (!this.filterable) return;

    if (this._sourcePanel) {
      this._sourcePanel.setAttribute("filter-placeholder", placeholder);
    }

    if (this._targetPanel) {
      this._targetPanel.setAttribute("filter-placeholder", placeholder);
    }
  }

  private _getDefaultTitle(type: "source" | "target"): string {
    return type === "source"
      ? i18nManager.t("transfer.list1")
      : i18nManager.t("transfer.list2");
  }

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

  private _updateButtonStates(): void {
    if (this._moveToRightBtn) {
      (this._moveToRightBtn as any).disabled =
        this._states.sourceSelectedKeys.size === 0;
    }
    if (this._moveToLeftBtn) {
      (this._moveToLeftBtn as any).disabled =
        this._states.targetSelectedKeys.size === 0;
    }
  }

  clearQuery(which: "left" | "right"): void {
    if (which === "left" && this._sourcePanel) {
      this._sourcePanel.clearQuery();
    } else if (which === "right" && this._targetPanel) {
      this._targetPanel.clearQuery();
    }
  }

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

  private _getMovableKeys(selectedKeys: any[], disabledField: string): any[] {
    return selectedKeys.filter((li: any) => {
      const data = this._states.dataMap.get(li);
      return !data || !data[disabledField];
    });
  }

  private _handleMovableKeys(movableKeys: any[]): void {
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

      this._states.sourceSelectedKeys.delete(li);
    });
  }

  private _handlePanelDataSort(keyField: string): (a: any, b: any) => number {
    return (a: any, b: any) => {
      const aData = this._states.dataMap.get(a);
      const bData = this._states.dataMap.get(b);

      return aData[keyField] - bData[keyField] || 0;
    };
  }

  // ==================== 事件处理 ====================

  @listen("click", `.${bem.e("move-to-right-btn")}`)
  private _onMoveToRight(e: Event): void {
    e.stopImmediatePropagation();

    const { key, disabled } = this.dataProps;
    const selectedKeys = [...this._states.sourceSelectedKeys];
    const movableKeys = this._getMovableKeys(selectedKeys, disabled);

    this._handleMovableKeys(movableKeys);

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

  @listen("click", `.${bem.e("move-to-left-btn")}`)
  private _onMoveToLeft(e: Event): void {
    e.stopImmediatePropagation();

    const { key, disabled } = this.dataProps;
    const selectedKeys = [...this._states.targetSelectedKeys];
    const movableKeys = this._getMovableKeys(selectedKeys, disabled);

    this._handleMovableKeys(movableKeys);

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

  // ==================== 表单验证 ====================

  get validationTarget(): HTMLElement | null {
    return this._targetPanel?.shadowRoot?.querySelector('.ea-transfer-panel__list') || null;
  }

  updateValidity(): void {
    const val = this.value;
    const isEmpty = !val || (Array.isArray(val) && val.length === 0);

    if (this.required && isEmpty) {
      this.internals.setValidity(
        { valueMissing: true },
        "请至少选择一项"
      );
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

if (!customElements.get("ea-transfer")) {
  customElements.define("ea-transfer", EaTransfer);
}
