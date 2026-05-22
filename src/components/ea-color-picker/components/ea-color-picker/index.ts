import EaFormAssociatedBase from "@core/EaFormAssociatedBase";
import { attribute } from "@decorator/attribute";
import { property } from "@decorator/property";
import { CustomElement } from "@decorator/custom-element";
import { listen } from "@decorator/listen";
import { query } from "@decorator/query";
import { createBEM } from "@utils/bem";
import { html } from "@utils/html";
import { Enum } from "@/utils/Enum";
import { Color } from "../../utils/Color";
import { EaColorPickerClearEvent } from "../../events/EaColorPickerClearEvent";
import "../ea-color-picker-panel/index";
import "@/common/ea-popper/index";
import "@components/ea-button/index";
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

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaColorPicker extends EaFormAssociatedBase {
  // ==================== DOM 元素引用 ====================

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

  // ==================== 属性定义 ====================

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

  // ==================== 私有状态 ====================

  private _abortControllerStates = {
    close: null as AbortController | null,
  };

  private _states = {
    isOpen: false,
    isPanelDefined: false,
    previousValue: "",
  };

  // ==================== 方法 ====================

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

  // ==================== 事件处理 ====================

  @listen("click", bem.ce("trigger"))
  private _onTriggerClick(e: MouseEvent) {
    if (this.disabled) return;

    this._abortControllerStates.close?.abort();
    this._abortControllerStates.close = new AbortController();

    this._states.previousValue = this.value;

    this._showPopper();

    document.addEventListener("click", this._onDocumentClick.bind(this), {
      signal: this._abortControllerStates.close.signal,
    });
  }

  @listen("show", bem.ce("popper"))
  private _onPopperShow() {
    this._states.isOpen = true;
    this.updateContainerClasslist();
  }

  @listen("hide", bem.ce("popper"))
  private _onPopperHide() {
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
  private _onPanelChange(e: CustomEvent) {
    const { value } = e.detail;
    this.value = value;
    this._updateTriggerColor();
    this._updateStatusIcon();
  }

  @listen("click", bem.ce("clear-btn"))
  private _onClearClick() {
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
  private _onConfirmClick() {
    this._states.previousValue = this.value;
    this._hidePopper();
  }

  private _onDocumentClick(e: MouseEvent) {
    if (!this._states.isOpen) return;
    if (!this.contains(e.target as Node) || e.target !== this) {
      this._hidePopper();
    }
  }

  // ==================== 私有方法 ====================

  private _showPopper() {
    if (this._popper) {
      this._popper.show();
    }
  }

  private _hidePopper() {
    if (this._popper) {
      this._popper.hide();
    }
  }

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

  private _updateStatusIcon(colorValue = this.value) {
    if (!this._statusIcon) return;

    this._statusIcon.setAttribute("name", colorValue ? "angle-down" : "xmark");
  }

  // ==================== 公共方法 ====================

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
      this.internals.setValidity(
        { valueMissing: true },
        "请选择一个颜色",
        this
      );
    } else {
      this.internals.setValidity({}, "", this);
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

  // ==================== 生命周期 ====================

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
