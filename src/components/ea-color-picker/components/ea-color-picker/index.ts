import EaFormAssociatedBase from "@core/EaFormAssociatedBase";
import { createBEM } from "@utils/bem";
import { CustomElement, attribute, property, query, listen } from "@decorator";
import { html } from "@utils/html";
import { Enum } from "@utils/Enum";
import { Color } from "../../utils/Color";
import { EaColorPickerClearEvent } from "../../events/EaColorPickerClearEvent";
import "../ea-color-picker-panel/index";
import "@/common/ea-popper/index";
import "@components/ea-button/index";
import "@components/ea-icon/index";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-color-picker" as const;
const bem = createBEM(TAG_NAME);

const COLOR_FORMATS = ["hsl", "hsv", "hex", "rgb", "rgba"] as const;
type ColorFormat = (typeof COLOR_FORMATS)[number];

const PLACEMENTS = [
  "top",
  "top-start",
  "top-end",
  "bottom",
  "bottom-start",
  "bottom-end",
  "left",
  "left-start",
  "left-end",
  "right",
  "right-start",
  "right-end",
] as const;
type Placement = (typeof PLACEMENTS)[number];

/**
 * @summary 颜色选择器组件，支持多种颜色格式、透明度选择和预定义颜色。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-icon
 * @dependency ea-button
 * @dependency ea-popper
 * @dependency ea-color-picker-panel
 *
 * @slot default - 默认插槽（未使用）。
 *
 * @event change - 颜色值改变时触发，detail: `{ value: string }`。
 * @event ea-clear - 清空颜色值时触发。
 * @event ea-active-change - 颜色激活值改变时触发，detail: `{ value: string }`。
 *
 * @csspart form-label - 表单标签元素。
 * @csspart container - 根容器元素。
 * @csspart popper - 弹出层元素。
 * @csspart trigger - 触发器元素。
 * @csspart outer - 外层容器元素。
 * @csspart inner - 内层容器元素。
 * @csspart icon-wrapper - 图标包裹层元素。
 * @csspart status-icon - 状态图标元素。
 * @csspart panel - 颜色选择器面板元素。
 * @csspart footer-actions - 底部操作按钮区域元素。
 * @csspart clear-btn - 清除按钮元素。
 * @csspart confirm-btn - 确认按钮元素。
 *
 * @cssproperty --ea-color-picker-size - 触发器尺寸。
 * @cssproperty --ea-color-picker-border-radius - 触发器圆角。
 * @cssproperty --ea-color-picker-border-color - 触发器边框颜色。
 * @cssproperty --ea-color-picker-border-color-focus - 聚焦时边框颜色。
 * @cssproperty --ea-color-picker-background-color - 触发器背景颜色。
 * @cssproperty --ea-color-picker-background-color-disabled - 禁用时背景颜色。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaColorPicker extends EaFormAssociatedBase {
  @query(bem.ce("form-label"))
  private _label!: HTMLLabelElement;

  @query(bem.cb())
  private _container!: HTMLDivElement;

  @query(bem.ce("popper"))
  private _popper!: HTMLElement & { show: () => void; hide: () => void };

  @query(bem.ce("trigger"))
  private _trigger!: HTMLDivElement;

  @query(bem.ce("outer"))
  private _outer!: HTMLDivElement;

  @query(bem.ce("inner"))
  private _inner!: HTMLDivElement;

  @query(bem.ce("icon") + bem.ce("status"))
  private _statusIcon!: HTMLElement;

  @query(bem.ce("panel"))
  private _panel!: HTMLElement & {
    resetCursorPosition?: () => void;
    predefine: string[];
    setAttribute: (name: string, value: string) => void;
  };

  @query(bem.ce("clear-btn"))
  private _clearBtn!: HTMLElement;

  @query(bem.ce("confirm-btn"))
  private _confirmBtn!: HTMLElement;

  @attribute({
    type: String,
    default: "",
    observer(this: EaColorPicker, newVal: string) {
      this._label.textContent = newVal;
    },
  })
  label: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaColorPicker) {
      this.setValue(this.value || null);
      this._updateTriggerColor();
      this._updateStatusIcon();
      if (this._panel) this._panel.setAttribute("value", this.value);
    },
  })
  override value: string = "";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaColorPicker) {
      this.updateContainerClasslist();
    },
  })
  override disabled: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaColorPicker) {
      this.updateContainerClasslist();
      if (this._panel)
        this._panel.setAttribute("clearable", String(this.clearable));
    },
  })
  clearable: boolean = false;

  @attribute({
    type: ["small", "medium", "large"] as const,
    default: "",
    observer(this: EaColorPicker) {
      this.updateContainerClasslist();
    },
  })
  size: string = "";

  @attribute({
    type: Enum(COLOR_FORMATS),
    default: "hex",
    observer(this: EaColorPicker, newVal: string) {
      if (this._panel) this._panel.setAttribute("color-format", newVal);
    },
  })
  colorFormat: ColorFormat = "hex";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaColorPicker, newVal: boolean) {
      if (this._panel) this._panel.setAttribute("show-alpha", String(newVal));
    },
  })
  showAlpha: boolean = false;

  @attribute({
    type: Number,
    default: 0,
  })
  tabindex: number = 0;

  @attribute({
    type: Boolean,
    default: false,
  })
  override required: boolean = false;

  @attribute({
    type: Enum(PLACEMENTS),
    default: "bottom",
    observer(this: EaColorPicker, newVal: string) {
      this._popper.setAttribute("placement", newVal);
    },
  })
  placement: Placement = "bottom";

  @property({
    type: Array,
    default: [],
    observer(this: EaColorPicker, newVal: string[]) {
      if (!this._states.isPanelDefined) {
        customElements.whenDefined("ea-color-picker-panel").then(() => {
          this._states.isPanelDefined = true;
          this._panel.predefine = newVal;
        });
      } else {
        this._panel.predefine = newVal;
      }
    },
  })
  predefine: string[] = [];

  private _abortControllerStates = {
    close: null as AbortController | null,
  };

  private _states = {
    isOpen: false,
    isPanelDefined: false,
    previousValue: "",
  };

  updateContainerClasslist(): string {
    const className = bem(
      {
        [this.size]: !!this.size,
      },
      {
        "has-value": !!this.value,
        disabled: this.disabled,
      }
    );

    if (this._container) {
      this._container.className = className;
    }

    return className;
  }

  html(): string {
    return html(`
      <label class="${bem.e("form-label")}" part="form-label"></label>
      <div class="${bem()}" part="container" tabindex="${this.tabindex}">
        <ea-popper
          class="${bem.e("popper")}"
          part="popper"
          show-arrow="false"
        >
          <div class="${bem.e("trigger")}" part="trigger" slot="reference">
            <div class="${bem.e("outer")}" part="outer">
              <div class="${bem.e("inner")}" part="inner"></div>
            </div>
            <div class="${bem.e("icon-wrapper")}" part="icon-wrapper">
              <ea-icon class="${bem.e("icon")} ${bem.e("status")}" part="status-icon" name="xmark"></ea-icon>
            </div>
          </div>
          <ea-color-picker-panel class="${bem.e("panel")}" part="panel">
            <div slot="footer" class="${bem.e("footer-actions")}" part="footer-actions">
              <ea-button class="${bem.e("clear-btn")}" part="clear-btn" plain text>clear</ea-button>
              <ea-button class="${bem.e("confirm-btn")}" part="confirm-btn" plain>ok</ea-button>
            </div>
          </ea-color-picker-panel>
        </ea-popper>
      </div>
    `);
  }

  @listen("click", bem.ce("trigger"))
  private _handleTriggerClick(e: MouseEvent) {
    if (this.disabled) return;

    this._abortControllerStates.close?.abort();
    this._abortControllerStates.close = new AbortController();

    this._states.previousValue = this.value;

    this._showPopper();

    document.addEventListener("click", this._handleDocumentClick.bind(this), {
      signal: this._abortControllerStates.close.signal,
    });
  }

  @listen("show", bem.ce("popper"))
  private _handlePopperShow() {
    this._states.isOpen = true;
    this.updateContainerClasslist();
  }

  @listen("hide", bem.ce("popper"))
  private _handlePopperHide() {
    this._states.isOpen = false;
    this.updateContainerClasslist();

    if (
      this._states.previousValue !== undefined &&
      this._states.previousValue !== this.value
    ) {
      this.value = this._states.previousValue;
      this._updateTriggerColor();
      this._updateStatusIcon();
    }
  }

  @listen("change", bem.ce("panel"))
  private _handlePanelChange(e: CustomEvent) {
    const { value } = e.detail;
    this.value = value;
    this._updateTriggerColor();
    this._updateStatusIcon();
  }

  @listen("click", bem.ce("clear-btn"))
  private _handleClearClick() {
    this.value = "";

    this._panel.style.setProperty(
      "--ea-color-picker-panel-background-color",
      "#ff0000"
    );

    this._panel.resetCursorPosition?.();
    this._updateTriggerColor();
    this._updateStatusIcon();

    this.emit("change", { detail: { value: "" } });
    this.dispatchEvent(new EaColorPickerClearEvent());

    this._states.previousValue = "";
    this._hidePopper();
  }

  @listen("click", bem.ce("confirm-btn"))
  private _handleConfirmClick() {
    this._states.previousValue = this.value;
    this._hidePopper();
  }

  /** 处理文档点击事件，点击外部时关闭弹出层 */
  private _handleDocumentClick(e: MouseEvent) {
    if (!this._states.isOpen) return;
    if (!this.contains(e.target as Node) || e.target !== this) {
      this._hidePopper();
    }
  }

  /** 显示弹出层 */
  private _showPopper() {
    if (this._popper) {
      this._popper.show();
    }
  }

  /** 隐藏弹出层 */
  private _hidePopper() {
    if (this._popper) {
      this._popper.hide();
    }
  }

  /** 更新触发器内层背景颜色 */
  private _updateTriggerColor() {
    if (!this._inner) return;

    if (!this.value) {
      this._inner.style.setProperty(
        "--ea-color-picker-inner-background-color",
        "transparent"
      );
      return;
    }

    try {
      const color = new Color(this.value);
      this._inner.style.setProperty(
        "--ea-color-picker-inner-background-color",
        color.toRgb(true)
      );
    } catch (_error) {
      this._inner.style.setProperty(
        "--ea-color-picker-inner-background-color",
        "transparent"
      );
    }
  }

  /** 更新状态图标 */
  private _updateStatusIcon(colorValue = this.value) {
    if (!this._statusIcon) return;

    this._statusIcon.setAttribute("name", colorValue ? "angle-down" : "xmark");
  }

  show() {
    this._showPopper();
  }

  hide() {
    this._hidePopper();
  }

  focus() {
    if (this._container) {
      this._container.focus();
    }
  }

  blur() {
    if (this._container) {
      this._container.blur();
    }
  }

  get validationTarget(): HTMLElement {
    return this;
  }

  updateValidity() {
    if (this.required && !this.value) {
      this.setValidity({ valueMissing: true }, "请选择一个颜色");
    } else {
      this.setValidity({});
    }
  }

  checkValidity(): boolean {
    this.updateValidity();
    if (this.internals && typeof this.internals.checkValidity === "function") {
      return this.internals.checkValidity();
    }
    return !this.required || !!this.value;
  }

  reportValidity(): boolean {
    this.updateValidity();
    if (this.internals && typeof this.internals.reportValidity === "function") {
      return this.internals.reportValidity();
    }
    return !this.required || !!this.value;
  }

  $mount(): void {
    this.updateContainerClasslist();
  }

  $mounted(): void {
    if (!this._panel) return;

    this._panel.setAttribute("color-format", this.colorFormat);
    this._panel.setAttribute("clearable", String(this.clearable));
    this._panel.setAttribute("value", this.value);
    this._panel.setAttribute("show-alpha", String(this.showAlpha));
    this._panel.predefine = this.predefine;
  }
}
