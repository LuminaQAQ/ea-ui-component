import "@/components/ea-input";
import "@/components/ea-icon/index";
import { EaFormAssociatedBase } from "@core/EaFormAssociatedBase";
import { CustomElement, attribute, property, query, listen } from "@decorator";
import { Enum } from "@utils/Enum";
import { createBEM } from "@utils/bem";
import { EaSelectChangeEvent } from "../../events/EaSelectChangeEvent";
import { EaSelectClearEvent } from "../../events/EaSelectClearEvent";
import { EaSelectRemoveTagEvent } from "../../events/EaSelectRemoveTagEvent";
import { EaSelectVisibleChangeEvent } from "../../events/EaSelectVisibleChangeEvent";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-select" as const;
const bem = createBEM(TAG_NAME);

export type SelectSize = "large" | "default" | "small";

/**
 * @summary 下拉选择器组件，支持单选、多选、可搜索、可清空、分组选项等功能。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-input
 * @dependency ea-icon
 * @dependency ea-tag
 *
 * @slot default - 默认插槽，用于放置 ea-option 或 ea-option-group。
 *
 * @event change - 选中值发生变化时触发，detail: `{ value }`。
 * @event ea-visible-change - 下拉框出现/隐藏时触发，detail: `{ visible }`。
 * @event ea-clear - 可清空模式下用户点击清空按钮时触发。
 * @event ea-remove-tag - 多选模式下移除标签时触发，detail: `{ tag, tagValue }`。
 *
 * @csspart container - 选择器容器。
 * @csspart input - 输入框。
 * @csspart tag-wrap - 标签包装容器。
 * @csspart dropdown - 下拉框。
 * @csspart dropdown-icon - 下拉图标。
 * @csspart clear-icon - 清除图标。
 *
 * @cssproperty --ea-select-height-small - 小尺寸高度。
 * @cssproperty --ea-select-height-default - 默认尺寸高度。
 * @cssproperty --ea-select-height-large - 大尺寸高度。
 * @cssproperty --ea-select-dropdown-bg-color - 下拉框背景颜色。
 * @cssproperty --ea-select-color - 文本颜色。
 * @cssproperty --ea-select-placeholder-color - 占位符颜色。
 * @cssproperty --ea-select-transition - 过渡时长。
 * @cssproperty --ea-select-border-color - 边框颜色。
 * @cssproperty --ea-select-border-invalid-color - 无效状态边框颜色。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaSelect extends EaFormAssociatedBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @query(bem.ce("input"))
  private _input!: HTMLElement;

  @query(bem.ce("tag-wrap"))
  private _tagWrap!: HTMLElement;

  @query(bem.ce("dropdown"))
  private _dropdown!: HTMLElement;

  @query(bem.ce("dropdown-icon"))
  private _dropdownIcon!: HTMLElement;

  @query(bem.ce("clear-icon"))
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
      this._handleCollapseTagsChange();
    },
  })
  collapseTags: boolean = false;

  @attribute({
    type: Number,
    default: 1,
    observer(this: EaSelect) {
      this._handleCollapseTagsChange();
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

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaSelect) {
      this.updateValidity();
    },
  })
  required: boolean = false;

  @property({
    type: Function,
    default: (_query: string) => {},
    observer(this: EaSelect) {},
  })
  filterMethod: (query: string) => void = (_query: string) => {};

  @property({
    type: Object,
    default: "",
    observer(
      this: EaSelect,
      newVal: string | number | boolean | (string | number | boolean)[]
    ) {
      this.setValue(newVal ? newVal.toString() : null);
      this._handleValueChange(newVal);
    },
  })
  value: string | number | boolean | (string | number | boolean)[] = "";

  get validationTarget() {
    return this._input;
  }

  constructor() {
    super();

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

  html(): string {
    return `
      <div class='${bem()}' part='container' tabindex='-1'>
        <ea-input class="${bem.e("input")}" part="input" readonly>
          <section slot="prefix" class="${bem.e("tag-wrap")}" part="tag-wrap"></section>
          <ea-icon slot="suffix" class="${bem.e("clear-icon")}" part="clear-icon" name='xmark'></ea-icon>
          <ea-icon slot="suffix" class="${bem.e("dropdown-icon")}" part="dropdown-icon" name='angle-down'></ea-icon>
        </ea-input>
        <section class="${bem.e("dropdown")}" part="dropdown">
          <slot></slot>
        </section>
      </div>
    `;
  }

  private _updateInputAttribute(attr: string, value: any): void {
    if (this._input) {
      if (typeof value === "boolean") {
        this._input.toggleAttribute(attr, value);
      } else if (value !== undefined && value !== null) {
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

  private _handleCollapseTagsChange(): void {
    if (this.multiple && Array.isArray(this.value)) {
      this._handleSelectValuesRender(this.value as (string | number | boolean)[]);
    }
  }

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

  private _initClearEvent(): void {
    const onClearEvent = () => {
      const newVal = this.multiple ? [] : "";
      this.value = newVal;

      this.dispatchEvent(new EaSelectChangeEvent({ value: newVal }));
      this.dispatchEvent(new EaSelectClearEvent());
    };

    this._clearIcon.addEventListener("click", onClearEvent, {
      signal: this._abortControllerStates.inputClearAbortController?.signal,
    });
  }

  private _findDisplayValue(value: string | number | boolean): string {
    const valueStr = String(value);
    const option = [...this.querySelectorAll("ea-option")].find(
      item => String((item as any).value) === valueStr
    );

    return option
      ? ((option as any).label || option.textContent)?.trim() || ""
      : (value ?? "").toString();
  }

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

  private _handleSelectValuesRender(
    selectValue: (string | number | boolean)[]
  ): void {
    let template = "";

    const tagRenderer = (
      isClosable: boolean,
      label: string,
      value?: string | number | boolean
    ) => {
      return `<ea-tag class="${bem.e("tag")}" ${isClosable ? "closable" : ""} disable-transitions type="info" size="${this.size}" ${
        isClosable && value !== undefined ? `data-value="${value}"` : ""
      }>${label}</ea-tag>`;
    };

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

    this.querySelectorAll("ea-option").forEach(option => {
      option.removeAttribute("selected");
    });

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

  private _handleFilteredOptionStyle(filterValue: string): void {
    this.querySelectorAll("ea-option").forEach(option => {
      this._filterMethod(option, filterValue);
    });
  }

  private _filterMethod(option: Element, query: string): void {
    const label = (option as any).label || "";
    const textContent = option.textContent || "";
    const searchText = `${label} ${textContent}`;

    (option as HTMLElement).style.display = searchText.includes(query)
      ? "block"
      : "none";
  }

  @listen("click", bem.ce("input"))
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

    this.dispatchEvent(new EaSelectChangeEvent({ value: newVal }));
  };

  private _onSelectClose = (e: Event): void => {
    if (e.composedPath().includes(this)) return;
    this.hide();
    this._abortControllerStates.closeAbortController?.abort();
  };

  private _onDropdownKeydown = (e: KeyboardEvent): void => {
    const arrows = new Set(["Escape", "ArrowUp", "ArrowDown"]);
    if (!arrows.has(e.key)) return;

    e.preventDefault();

    if (e.key === "Escape") {
      this.hide();
      this._abortControllerStates.closeAbortController?.abort();
    }
  };

  private _onMultipleTagRemoveEvent = (e: Event): void => {
    const target = e.target as HTMLElement;
    const value = target.getAttribute("data-value");

    if (!value || !Array.isArray(this.value)) return;

    const newVal = (this.value as (string | number | boolean)[]).filter(
      v => v.toString() !== value
    );
    this.value = newVal;

    this.dispatchEvent(new EaSelectChangeEvent({ value: newVal }));
    this.dispatchEvent(
      new EaSelectRemoveTagEvent({ tag: target, tagValue: value })
    );
  };

  private _onFilterEvent = (e: Event): void => {
    const value =
      (e as CustomEvent).detail?.value ?? (e.target as HTMLInputElement).value;
    if (typeof value === "string") {
      this.filterMethod(value);
      this._handleFilteredOptionStyle(value);
    }
  };

  show(): void {
    this._input.dispatchEvent(new CustomEvent("click"));
  }

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

  checkValidity(): boolean {
    this.updateValidity();
    return this.internals?.validity?.valid ?? true;
  }

  reportValidity(): boolean {
    this.updateValidity();
    return this.internals?.reportValidity() ?? true;
  }
}
