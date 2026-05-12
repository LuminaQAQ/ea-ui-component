import "@/components/ea-input";
import { Enum } from "@/utils/Enum";
import { EaFormAssociatedBase } from "@core/EaFormAssociatedBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { listen } from "@decorator/listen";
import { property } from "@decorator/property";
import { query } from "@decorator/query";
import { createBEM } from "@utils/bem";
import { EaSelectClearEvent } from "../../events/EaSelectClearEvent";
import { EaSelectRemoveTagEvent } from "../../events/EaSelectRemoveTagEvent";
import { EaSelectVisibleChangeEvent } from "../../events/EaSelectVisibleChangeEvent";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-select" as const;
const bem = createBEM(TAG_NAME);

// ==================== 类型定义 ====================

export type SelectSize = "large" | "default" | "small";

// ==================== 组件类 ====================

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaSelect extends EaFormAssociatedBase {
  // ==================== DOM 元素引用 ====================

  @query(".ea-select")
  private _container!: HTMLElement;

  @query(".ea-select__input")
  private _input!: HTMLElement;

  @query(".ea-select__tag-wrap")
  private _tagWrap!: HTMLElement;

  @query(".ea-select__dropdown")
  private _dropdown!: HTMLElement;

  @query(".ea-select__dropdown-icon")
  private _dropdownIcon!: HTMLElement;

  @query(".ea-select__clear-icon")
  private _clearIcon!: HTMLElement;

  private _abortControllerStates = {
    closeAbortController: null as AbortController | null,
    tagRemoveAbortController: null as AbortController | null,
    inputClearAbortController: null as AbortController | null,
    inputFilterAbortController: null as AbortController | null,
  };

  private _states = {
    isFocus: false,
    isTagImport: false,
  };

  // ==================== 属性定义 ====================

  @attribute({
    type: String,
    default: "",
    observer(this: EaSelect, newVal: string) {
      this._updateInputAttribute("label", newVal);
    },
  })
  label: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaSelect, newVal: string) {
      this._updateInputAttribute("name", newVal);
    },
  })
  name: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaSelect, newVal: string) {
      this._updateInputAttribute("placeholder", newVal);
    },
  })
  placeholder: string = "";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaSelect, newVal: boolean) {
      this._updateInputAttribute("disabled", newVal);
      this.updateContainerClasslist();
    },
  })
  disabled: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaSelect, newVal: boolean) {
      this._abortControllerStates.inputClearAbortController?.abort();
      this.updateContainerClasslist();

      if (newVal) {
        this._initClearEvent();
      }
    },
  })
  clearable: boolean = false;

  @attribute({
    type: Enum(["large", "default", "small"]),
    default: "default",
    observer(this: EaSelect, newVal: SelectSize) {
      this._updateInputAttribute("size", newVal);
      this.updateContainerClasslist();
    },
  })
  size: SelectSize = "default";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaSelect, newVal: boolean) {
      this._abortControllerStates.tagRemoveAbortController?.abort();
      this._handleMultipleModeChange(newVal);
    },
  })
  multiple: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaSelect) {
      // 处理标签折叠逻辑
    },
  })
  collapseTags: boolean = false;

  @attribute({
    type: Number,
    default: 1,
    observer(this: EaSelect) {
      // 处理最大折叠标签数量
    },
  })
  maxCollapseTags: number = 1;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaSelect, newVal: boolean) {
      this._abortControllerStates.inputFilterAbortController?.abort();
      this._handleFilterableChange(newVal);
    },
  })
  filterable: boolean = false;

  @property({
    type: Function,
    default: (query: string) => {},
    observer(this: EaSelect) {},
  })
  filterMethod: (query: string) => void = (query: string) => {};

  @property({
    type: Object,
    default: "",
    observer(
      newVal: string | number | boolean | (string | number | boolean)[]
    ) {
      // 将值转换为字符串形式传递给表单关联
      this.setValue(newVal?.toString() || "");
      this._handleValueChange(newVal);
    },
  })
  value: string | number | boolean | (string | number | boolean)[] = "";

  /**
   * 获取验证目标元素
   * @returns {HTMLElement}
   */
  get validationTarget() {
    return this._input;
  }

  constructor() {
    super();

    // 确保 _abortControllerStates 在构造函数中初始化
    this._abortControllerStates = {
      closeAbortController: null,
      tagRemoveAbortController: null,
      inputClearAbortController: null,
      inputFilterAbortController: null,
    };

    this._states = {
      isFocus: false,
      isTagImport: false,
    };
  }

  /**
   * 更新容器类名
   */
  updateContainerClasslist(): string {
    const hasValue = this.multiple
      ? Array.isArray(this.value) && this.value.length > 0
      : this.value !== "" && this.value != null;

    const className = bem(
      {
        [this.size]: this.size !== "default",
      },
      {
        focus: this._states.isFocus,
        disabled: this.disabled,
        clearable: this.clearable && hasValue,
        multiple: this.multiple,
        filterable: this.filterable,
        "has-value": hasValue,
      }
    );

    if (this._container) this._container.className = className;

    return className;
  }

  /**
   * 渲染模板
   */
  html(): string {
    return `
      <div class='ea-select' part='container' tabindex='-1'>
        <ea-input class="ea-select__input" part="input" readonly>
          <section slot="prefix" class="ea-select__tag-wrap" part="tag-wrap"></section>
          <ea-icon slot="suffix" class="ea-select__clear-icon" part="clear-icon" name='xmark'></ea-icon>
          <ea-icon slot="suffix" class="ea-select__dropdown-icon" part="dropdown-icon" name='angle-down'></ea-icon>
        </ea-input>
        <section class="ea-select__dropdown" part="dropdown">
          <slot></slot>
        </section>
      </div>
    `;
  }

  /**
   * 更新输入框属性
   */
  private _updateInputAttribute(attr: string, value: any): void {
    if (this._input) {
      if (value !== undefined && value !== null) {
        if (attr === "value") {
          (this._input as any).value = value.toString();
        } else {
          this._input.setAttribute(attr, value.toString());
        }
      } else {
        if (attr === "value") {
          (this._input as any).value = "";
        } else {
          this._input.removeAttribute(attr);
        }
      }
    }
  }

  /**
   * 处理多选模式变化
   */
  private async _handleMultipleModeChange(isMultiple: boolean): Promise<void> {
    this._abortControllerStates.tagRemoveAbortController?.abort();

    if (isMultiple) {
      this._abortControllerStates.tagRemoveAbortController =
        new AbortController();

      this._tagWrap.addEventListener(
        "ea-remove",
        this._onMultipleTagRemoveEvent,
        {
          signal: this._abortControllerStates.tagRemoveAbortController.signal,
        }
      );

      if (!this._states.isTagImport) {
        await import("@components/ea-tag/index.js");
        await customElements.whenDefined("ea-tag");
        this._states.isTagImport = true;
      }
    }

    this.updateContainerClasslist();
  }

  /**
   * 处理可筛选变化
   */
  private async _handleFilterableChange(isFilterable: boolean): Promise<void> {
    this._abortControllerStates.inputFilterAbortController?.abort();

    if (isFilterable) {
      this._abortControllerStates.inputFilterAbortController =
        new AbortController();

      this._input.toggleAttribute("readonly", !isFilterable);
      this._input.addEventListener("input", this._onFilterEvent, {
        signal: this._abortControllerStates.inputFilterAbortController.signal,
      });
    }

    this.updateContainerClasslist();
  }

  /**
   * 处理值变化
   */
  private _handleValueChange(
    newVal: string | number | boolean | (string | number | boolean)[]
  ): void {
    if (this.multiple) {
      this._handleMultipleValueChange(newVal as (string | number | boolean)[]);
    } else {
      this._handleSingleValueChange(newVal as string | number | boolean);
    }

    this._handleSelectedValueStyle(newVal);
    this.updateContainerClasslist();
  }

  /**
   * 处理多选值变化
   */
  private _handleMultipleValueChange(
    values: (string | number | boolean)[]
  ): void {
    if (this.filterable) {
      this._input.focus();
    } else {
      this._updateInputAttribute("value", values?.length > 0 ? " " : "");
    }

    this._handleSelectValuesRender(values || []);
  }

  /**
   * 处理单选值变化
   */
  private _handleSingleValueChange(value: string | number | boolean): void {
    if (this.filterable) {
      this._updateInputAttribute("value", "");
      this._updateInputAttribute(
        "placeholder",
        value?.toString().length > 0 ? value : this.placeholder
      );
      this._handleFilteredOptionStyle("");
    } else {
      this._updateInputAttribute("value", this._findDisplayValue(value));
    }
  }

  /**
   * 初始化清除事件
   */
  private _initClearEvent(): void {
    const onClearEvent = () => {
      const newVal = this.multiple ? [] : "";
      this.value = newVal;

      this.dispatchEvent(
        new CustomEvent("change", {
          detail: { value: newVal },
          bubbles: true,
          composed: true,
        })
      );

      this.dispatchEvent(new EaSelectClearEvent());
    };

    this._clearIcon.addEventListener("click", onClearEvent, {
      signal: this._abortControllerStates.inputClearAbortController?.signal,
    });
  }

  /**
   * 查找显示值
   */
  private _findDisplayValue(value: string | number | boolean): string {
    const valueStr = String(value);
    const option = [...this.querySelectorAll("ea-option")].find(
      item => String((item as any).value) === valueStr
    );

    return option
      ? ((option as any).label || option.textContent)?.trim() || ""
      : (value ?? "").toString();
  }

  /**
   * 设置已选项样式
   */
  private _handleSelectedValueStyle(
    selectedValue: string | number | boolean | (string | number | boolean)[]
  ): void {
    const options = this.querySelectorAll("ea-option");

    if (
      typeof selectedValue === "string" ||
      typeof selectedValue === "number" ||
      typeof selectedValue === "boolean"
    ) {
      const selectedStr = String(selectedValue);
      options.forEach(option => {
        option.toggleAttribute(
          "selected",
          String((option as any).value) === selectedStr
        );
      });
    } else if (Array.isArray(selectedValue)) {
      const selectedStrs = selectedValue.map(v => String(v));
      options.forEach(option => {
        option.toggleAttribute(
          "selected",
          selectedStrs.includes(String((option as any).value))
        );
      });
    }
  }

  /**
   * 渲染已选项
   */
  private _handleSelectValuesRender(
    selectValue: (string | number | boolean)[]
  ): void {
    let template = "";

    /**
     * 渲染 tag 标签
     * @param isClosable 是否可关闭
     * @param label 显示文本
     * @param value 值（用于 data-value）
     */
    const tagRenderer = (
      isClosable: boolean,
      label: string,
      value?: string | number | boolean
    ) => {
      return `<ea-tag class="ea-select__tag" ${isClosable ? "closable" : ""} disable-transitions type="info" size="${this.size}" ${
        isClosable && value !== undefined ? `data-value="${value}"` : ""
      }>${label}</ea-tag>`;
    };

    /**
     * 渲染所有 tag 的模板
     * @param values 要渲染的值数组
     */
    const templateRenderer = (values: (string | number | boolean)[]) => {
      let tmpl = "";

      values.forEach(v => {
        const option = this.querySelector(`ea-option[value="${v}"]`);
        if (!option) return;

        option.setAttribute("selected", "");

        tmpl += tagRenderer(
          true,
          (option as any).label || option.textContent || "",
          v
        );
      });

      return tmpl;
    };

    // 重置所有选项的选中状态
    this.querySelectorAll("ea-option").forEach(option => {
      option.removeAttribute("selected");
    });

    // 清空标签容器
    this._tagWrap.innerHTML = "";

    if (this.collapseTags && Array.isArray(selectValue)) {
      const max = Number(this.maxCollapseTags) || 1;
      const total = selectValue.length;

      template += templateRenderer(selectValue.slice(0, max));

      if (total > max) {
        const remaining = total - max;
        template += tagRenderer(false, `+${remaining}`);
      }
    } else {
      template += templateRenderer(selectValue);
    }

    this._tagWrap.innerHTML = template;
  }

  /**
   * 处理过滤选项样式
   */
  private _handleFilteredOptionStyle(filterValue: string): void {
    this.querySelectorAll("ea-option").forEach(option => {
      this._filterMethod(option, filterValue);
    });
  }

  /**
   * 过滤选项
   */
  private _filterMethod(option: Element, query: string): void {
    const label = (option as any).label || "";
    const textContent = option.textContent || "";
    const searchText = `${label} ${textContent}`;

    (option as HTMLElement).style.display = searchText.includes(query)
      ? "block"
      : "none";
  }

  /**
   * 下拉框折叠事件
   */
  @listen("click", ".ea-select__input")
  private async _onDropdownVisibleChangeEvent(): Promise<void> {
    if (this.disabled) return;

    this._abortControllerStates.closeAbortController?.abort();

    this._states.isFocus = true;
    this.updateContainerClasslist();
    this.dispatchEvent(new EaSelectVisibleChangeEvent({ visible: true }));

    this._abortControllerStates.closeAbortController = new AbortController();

    await customElements.whenDefined("ea-option");

    this.addEventListener("ea-option-click", this._onOptionClick, {
      signal: this._abortControllerStates.closeAbortController.signal,
    });

    document.addEventListener("click", this._onSelectClose, {
      signal: this._abortControllerStates.closeAbortController.signal,
    });

    this.addEventListener("keydown", this._onDropdownKeydown, {
      signal: this._abortControllerStates.closeAbortController.signal,
    });
  }

  /**
   * 选项点击事件
   */
  private _onOptionClick = (e: Event): void => {
    e.stopImmediatePropagation();

    const target =
      (e as CustomEvent).detail?.target ||
      (e.target as Element).closest("ea-option");
    if (!target || (target as any).disabled) return;

    let newVal;
    if (!this.multiple) {
      newVal = (target as any).value;
      this.value = newVal;
      this.hide();
    } else {
      if (!Array.isArray(this.value)) this.value = [];
      const currentValue = this.value as (string | number | boolean)[];

      if (currentValue.includes((target as any).value)) {
        newVal = currentValue.filter(v => v !== (target as any).value);
      } else {
        newVal = [...currentValue, (target as any).value];
      }
      this.value = newVal;
    }

    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { value: newVal },
        bubbles: true,
        composed: true,
      })
    );
  };

  /**
   * 下拉框关闭事件
   */
  private _onSelectClose = (e: Event): void => {
    if (e.composedPath().includes(this)) return;
    this.hide();
    this._abortControllerStates.closeAbortController?.abort();
  };

  /**
   * 键盘事件
   */
  private _onDropdownKeydown = (e: KeyboardEvent): void => {
    const arrows = new Set(["Escape", "ArrowUp", "ArrowDown"]);
    if (!arrows.has(e.key)) return;

    e.preventDefault();

    if (e.key === "Escape") {
      this.hide();
      this._abortControllerStates.closeAbortController?.abort();
    }
  };

  /**
   * 移除选中标签事件
   */
  private _onMultipleTagRemoveEvent = (e: Event): void => {
    const target = e.target as HTMLElement;
    const value = target.getAttribute("data-value");

    if (!value || !Array.isArray(this.value)) return;

    const newVal = (this.value as (string | number | boolean)[]).filter(
      v => v.toString() !== value
    );
    this.value = newVal;

    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { value: newVal },
        bubbles: true,
        composed: true,
      })
    );

    this.dispatchEvent(
      new EaSelectRemoveTagEvent({ tag: target, tagValue: value })
    );
  };

  /**
   * 过滤事件
   */
  private _onFilterEvent = (e: Event): void => {
    const value =
      (e as CustomEvent).detail?.value ?? (e.target as HTMLInputElement).value;
    if (typeof value === "string") {
      this.filterMethod(value);
      this._handleFilteredOptionStyle(value);
    }
  };

  /**
   * 显示下拉框
   */
  show(): void {
    this._input.dispatchEvent(new CustomEvent("click"));
  }

  /**
   * 隐藏下拉框
   */
  hide(): void {
    this._states.isFocus = false;
    this.updateContainerClasslist();
    this.dispatchEvent(new EaSelectVisibleChangeEvent({ visible: false }));
  }

  async $mount() {
    this.updateContainerClasslist();

    await customElements.whenDefined("ea-input");
    await customElements.whenDefined("ea-option");

    if (!this.name) this.name = Math.random().toString(36).substring(2, 15);
  }

  /**
   * 键盘事件 - Enter 键打开下拉框
   */
  @listen("keydown")
  private _onKeydown(e: KeyboardEvent): void {
    if (e.key === "Enter") {
      this._input.dispatchEvent(new CustomEvent("click"));
    }
  }

  $beforeUnmount() {
    Object.values(this._abortControllerStates).forEach(controller => {
      controller?.abort();
    });
  }

  /**
   * 更新表单验证状态
   */
  updateValidity() {
    super.updateValidity();

    const hasValue = this.multiple
      ? Array.isArray(this.value) && this.value.length > 0
      : this.value !== "" && this.value != null;

    if (this.required && !hasValue) {
      this.internals?.setValidity(
        { valueMissing: true },
        "请选择一个选项",
        this
      );
    } else {
      this.internals?.setValidity({}, "", this);
    }
  }

  /**
   * 检查表单字段的有效性
   */
  checkValidity(): boolean {
    this.updateValidity();
    return this.internals?.validity?.valid ?? true;
  }

  /**
   * 报告表单字段的有效性（显示验证提示）
   */
  reportValidity(): boolean {
    this.updateValidity();
    return this.internals?.reportValidity() ?? true;
  }
}
