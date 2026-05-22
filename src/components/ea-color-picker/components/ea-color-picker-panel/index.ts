import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { property } from "@decorator/property";
import { CustomElement } from "@decorator/custom-element";
import { listen } from "@decorator/listen";
import { query } from "@decorator/query";
import { html } from "@utils/html";
import { Enum } from "@/utils/Enum";
import { Color, type ColorFormat as ColorUtilFormat } from "../../utils/Color";
import EaUtils from "@/utils/Utils";
import { EaColorPickerActiveChangeEvent } from "../../events/EaColorPickerActiveChangeEvent";
import { EaColorPickerPanelInvalidColorEvent } from "../../events/EaColorPickerPanelInvalidColorEvent";
import "@components/ea-input/index";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-color-picker-panel" as const;
const bem = createBEM(TAG_NAME);

const COLOR_FORMATS = ["hsl", "hsv", "hex", "rgb", "rgba"] as const;
type ColorFormat = (typeof COLOR_FORMATS)[number];

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaColorPickerPanel extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(bem.cb())
  private _container!: HTMLDivElement;

  @query(bem.ce("svpanel"))
  private _saturation!: HTMLDivElement;

  @query(bem.ce("svpanel-cursor"))
  private _saturationThumb!: HTMLDivElement;

  @query(bem.ce("hue-slider"))
  private _hue!: HTMLDivElement;

  @query(bem.ce("hue-slider-thumb"))
  private _hueThumb!: HTMLDivElement;

  @query(bem.ce("alpha-slider"))
  private _alpha!: HTMLDivElement;

  @query(bem.ce("alpha-slider-thumb"))
  private _alphaThumb!: HTMLDivElement;

  @query(bem.ce("predefine"))
  private _predefineList!: HTMLDivElement;

  @query(bem.ce("color-input"))
  private _colorInput!: HTMLElement;

  @query(bem.ce("text-display"))
  private _textDisplay!: HTMLDivElement;

  // ==================== 属性定义 ====================

  @attribute({
    type: String,
    default: "",
    observer(this: EaColorPickerPanel, newVal: string) {
      this._states.lastValidValue = newVal;
      if (newVal) {
        this._states.color.setValue(newVal);
      }
      this._updateCursorPosition();
      this._updateSvpanelStatus();
      this._updateColorInputValue();
    },
  })
  value: string = "";

  @attribute({
    type: Enum(COLOR_FORMATS),
    default: "hex",
    observer(this: EaColorPickerPanel, newVal: string) {
      if (this.value) {
        this.value = this._states.color.toString(this._getEffectiveFormat());
      }
    },
  })
  colorFormat: ColorFormat = "hex";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaColorPickerPanel) {
      this.updateContainerClasslist();
      if (this.value) {
        this.value = this._states.color.toString(this._getEffectiveFormat());
      }
      this._updateCursorPosition();
    },
  })
  showAlpha: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaColorPickerPanel) {
      this.updateContainerClasslist();
    },
  })
  disabled: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaColorPickerPanel) {
      this.updateContainerClasslist();
    },
  })
  border: boolean = false;

  @attribute({
    type: Boolean,
    default: true,
    observer(this: EaColorPickerPanel) {
      this._updateTextDisplayMode();
    },
  })
  clearable: boolean = true;

  @property({
    type: Array,
    default: [],
    observer(this: EaColorPickerPanel, newVal: string[]) {
      this._renderPredefineColors(newVal);
    },
  })
  predefine: string[] = [];

  // ==================== 私有状态 ====================

  private _abortControllerStates = {
    saturationMove: null as AbortController | null,
    hueMove: null as AbortController | null,
    alphaMove: null as AbortController | null,
  };

  private _states = {
    isFirstValueUpdate: false,
    hue: 0,
    saturation: 1,
    value: 1,
    alpha: 1,
    color: new Color(),
    lastValidValue: "",
  };

  // ==================== 方法 ====================

  updateContainerClasslist(): string {
    const className = bem(
      {},
      {
        disabled: this.disabled,
        border: this.border,
        "show-alpha": this.showAlpha,
        clearable: this.clearable,
      }
    );

    if (this._container) {
      this._container.className = className;
    }

    return className;
  }

  html(): string {
    return html(`
      <div class="${bem.b()}" part="container">
        <div class="${bem.e("wrapper")}" part="wrapper">
          <div class="${bem.e("svpanel")}" part="svpanel">
            <div class="${bem.e("cursor")} ${bem.e("svpanel-cursor")}" part="svpanel-cursor"></div>
          </div>
          <div class="${bem.e("hue-slider")} ${bem.m("vertical")}" part="hue-slider">
            <div class="${bem.e("thumb")} ${bem.e("hue-slider-thumb")}" part="hue-slider-thumb"></div>
          </div>
        </div>
        <div class="${bem.e("alpha-slider")}" part="alpha-slider">
          <div class="${bem.e("thumb")} ${bem.e("alpha-slider-thumb")}" part="alpha-slider-thumb"></div>
        </div>
        <div class="${bem.e("predefine")}" part="predefine">
          <div class="${bem.e("colors")}" part="predefine-colors"></div>
        </div>
        <div class="${bem.e("footer")}" part="footer">
          <div class="${bem.e("text-display")}" part="text-display"></div>
          <ea-input class="${bem.e("color-input")}" part="color-input" type="text" size="small"></ea-input>
          <section class="${bem.e("append")}" part="append">
            <slot name="footer"></slot>
          </section>
        </div>
      </div>
    `);
  }

  // ==================== 事件处理 ====================

  @listen("mousedown", bem.ce("svpanel"))
  private _onSaturationMouseDown(e: MouseEvent) {
    this._abortControllerStates.saturationMove?.abort();
    this._abortControllerStates.hueMove?.abort();
    if (this.disabled) return;

    e.preventDefault();

    this._abortControllerStates.saturationMove = new AbortController();

    const handleValueUpdate = (e: MouseEvent) => {
      const rect = this._saturation.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));

      const saturation = x / rect.width;
      const value = 1 - y / rect.height;

      this._states.saturation = saturation;
      this._states.value = value;

      this._states.color.setValue({
        h: this._states.hue,
        s: saturation,
        v: value,
        a: this._states.alpha,
      });

      this.value = this._states.color.toString(this._getEffectiveFormat());
      this._emitChangeEvent();

      this._saturationThumb.style.left = saturation * rect.width + "px";
      this._saturationThumb.style.top = (1 - value) * rect.height + "px";
    };

    handleValueUpdate(e);
    window.addEventListener("mousemove", handleValueUpdate, {
      signal: this._abortControllerStates.saturationMove.signal,
    });

    window.addEventListener(
      "mouseup",
      () => {
        this._abortControllerStates.saturationMove?.abort();
      },
      {
        signal: this._abortControllerStates.saturationMove.signal,
      }
    );
  }

  @listen("mousedown", bem.ce("hue-slider"))
  private _onHueMouseDown(e: MouseEvent) {
    this._abortControllerStates.hueMove?.abort();
    this._abortControllerStates.saturationMove?.abort();
    if (this.disabled) return;

    e.preventDefault();

    this._abortControllerStates.hueMove = new AbortController();

    const handleHueUpdate = (e: MouseEvent) => {
      const rect = this._hue.getBoundingClientRect();
      const y = Math.max(0.01, Math.min(e.clientY - rect.top, rect.height));

      const hue = (1 - y / rect.height) * 360;

      this._states.hue = hue;

      this._states.color.setValue({
        h: hue,
        s: this._states.saturation,
        v: this._states.value,
        a: this._states.alpha,
      });

      this.value = this._states.color.toString(this._getEffectiveFormat());
      this._emitChangeEvent();

      this._hueThumb.style.top = (1 - hue / 360) * rect.height + "px";

      this._updateSvpanelStatus();
    };

    handleHueUpdate(e);
    window.addEventListener("mousemove", handleHueUpdate, {
      signal: this._abortControllerStates.hueMove.signal,
    });

    window.addEventListener(
      "mouseup",
      () => {
        this._abortControllerStates.hueMove?.abort();
      },
      {
        signal: this._abortControllerStates.hueMove.signal,
      }
    );
  }

  @listen("mousedown", bem.ce("alpha-slider"))
  private _onAlphaMouseDown(e: MouseEvent) {
    this._abortControllerStates.alphaMove?.abort();
    this._abortControllerStates.saturationMove?.abort();
    this._abortControllerStates.hueMove?.abort();
    if (this.disabled) return;

    e.preventDefault();

    this._abortControllerStates.alphaMove = new AbortController();

    const handleAlphaUpdate = (e: MouseEvent) => {
      const rect = this._alpha.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));

      const alpha = Number((x / rect.width).toFixed(2));

      if (Math.abs(this._states.alpha - alpha) > 0.001) {
        this._states.alpha = alpha;

        this._states.color.setValue({
          h: this._states.hue,
          s: this._states.saturation,
          v: this._states.value,
          a: alpha,
        });

        this.value = this._states.color.toString(this._getEffectiveFormat());
        this._emitChangeEvent();

        this._alphaThumb.style.left = alpha * rect.width + "px";
      }
    };

    handleAlphaUpdate(e);
    window.addEventListener("mousemove", handleAlphaUpdate, {
      signal: this._abortControllerStates.alphaMove.signal,
    });

    window.addEventListener(
      "mouseup",
      () => {
        this._abortControllerStates.alphaMove?.abort();
      },
      {
        signal: this._abortControllerStates.alphaMove.signal,
      }
    );
  }

  @listen("change", bem.ce("color-input"))
  private _onColorInputChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    try {
      const color = new Color(value);
      this.value = color.toString(this._getEffectiveFormat());
      this._emitChangeEvent();
    } catch (_error) {
      (this._colorInput as HTMLInputElement).value = this.value;
    }
  }

  @listen("blur", bem.ce("color-input"))
  private _onColorInputBlur() {
    if (!this._colorInput) return;

    const inputValue = this._colorInput.getAttribute("value") || "";

    if (!inputValue) {
      this.value = "";
      this._states.lastValidValue = "";
      return;
    }

    const isValid = this._validateColor(inputValue);

    if (isValid) {
      this._states.lastValidValue = inputValue;
      this._updateColorFromValue(inputValue);
    } else {
      this._colorInput.setAttribute("value", this._states.lastValidValue || "");

      this.dispatchEvent(
        new EaColorPickerPanelInvalidColorEvent({ value: inputValue })
      );
    }
  }

  @listen("click", bem.ce("predefine"))
  private _onPredefineListClick(e: MouseEvent) {
    if (this.disabled) return;

    const colorElement = (e.target as HTMLElement).closest(
      bem.ce("predefine-color")
    );
    if (!colorElement) return;

    const colorValue = colorElement.getAttribute("data-color");
    if (colorValue) {
      this._updateColorFromValue(colorValue);
    }
  }

  // ==================== 私有方法 ====================

  private _getEffectiveFormat(): ColorUtilFormat {
    const format = this.colorFormat;
    if (!this.showAlpha) return format;

    const alphaMap: Record<string, ColorUtilFormat> = {
      hex: "rgba",
      rgb: "rgba",
      hsl: "hsla",
    };

    return alphaMap[format] || format;
  }

  private _parseHsvFromColor() {
    const match = (this._states.color as any).hsvStrToHsvObject(
      (this._states.color as any).toHsv(true)
    );

    if (match) {
      this._states.hue = parseInt(match.h);
      this._states.saturation = match.s;
      this._states.value = match.v;
      this._states.alpha = match.a ? parseFloat(match.a) : 1;
    }
  }

  private _getSliderSize(
    element: HTMLElement,
    cssVar: string,
    fallback: number,
    dimension: "width" | "height"
  ): number {
    const rect = element.getBoundingClientRect();
    const cssSize =
      EaUtils.CSS.px2num(this.style.getPropertyValue(cssVar)) || fallback;
    return Math.max(0, Math.min(rect[dimension], cssSize), cssSize);
  }

  private _updateCursorPosition() {
    if (!this._states.isFirstValueUpdate && this.value) {
      this._states.color.setValue(this.value);
      this._parseHsvFromColor();
      this._states.isFirstValueUpdate = true;
    }

    if (this._saturationThumb && this._saturation) {
      const saturation = this._states.saturation;
      const value = this._states.value;

      const width = this._getSliderSize(
        this._saturation,
        "--ea-color-picker-panel-svpanel-width",
        280,
        "width"
      );
      const height = this._getSliderSize(
        this._saturation,
        "--ea-color-picker-panel-svpanel-height",
        180,
        "height"
      );
      const x = saturation * width;
      const y = (1 - value) * height;

      this._saturationThumb.style.left = x + "px";
      this._saturationThumb.style.top = y + "px";
    }

    if (this._hueThumb && this._hue) {
      const hue = this._states.hue;

      const height = this._getSliderSize(
        this._hue,
        "--ea-color-picker-panel-hue-slider-height",
        180,
        "height"
      );
      const y = (1 - hue / 360) * height;

      this._hueThumb.style.top = y + "px";
    }

    if (this._alphaThumb && this._alpha) {
      const alpha = this._states.alpha;

      const width = this._getSliderSize(
        this._alpha,
        "--ea-color-picker-panel-alpha-slider-width",
        280,
        "width"
      );
      const x = alpha * width;

      this._alphaThumb.style.left = x + "px";
    }
  }

  private _updateSvpanelStatus = () => {
    const color = new Color({
      h: this._states.hue,
      s: 1,
      v: 1,
      a: 1,
    });

    this.style.setProperty(
      "--ea-color-picker-panel-background-color",
      color.toString(this._getEffectiveFormat())
    );
  };

  private _emitChangeEvent() {
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: {
          value: this.value,
          color: this._states.color,
        },
        bubbles: true,
        composed: true,
      })
    );

    this.dispatchEvent(
      new EaColorPickerActiveChangeEvent({ value: this.value })
    );
  }

  private _renderPredefineColors(list: string[]) {
    if (!this._predefineList) return;

    if (!list || list.length === 0) {
      this._predefineList.innerHTML = "";
      return;
    }

    this._predefineList.innerHTML = html(
      list
        .map(
          color => `
          <div class="${bem.e("predefine-color")}"
            part="predefine-color"
            style="background-color: ${color}"
            data-color="${color}"
          ></div>
        `
        )
        .join("")
    );
  }

  private _updateColorFromValue(colorValue: string) {
    this._updateColorInputValue();

    this.value = colorValue;

    this._states.color.setValue(colorValue);
    this._parseHsvFromColor();

    this._updateCursorPosition();
    this._updateSvpanelStatus();

    this._emitChangeEvent();
  }

  private _updateTextDisplayMode() {
    if (!this._colorInput || !this._textDisplay) return;

    this._updateColorInputValue();

    this.updateContainerClasslist();
  }

  private _updateColorInputValue() {
    if (this.clearable && this._colorInput) {
      this._colorInput.setAttribute("value", this.value);
    } else if (!this.clearable && this._textDisplay) {
      this._textDisplay.textContent = this.value;
    }
  }

  private _validateColor(colorValue: string): boolean {
    return Color.isValidColor(colorValue);
  }

  // ==================== 公共方法 ====================

  resetCursorPosition() {
    this._states.hue = 0;
    this._states.saturation = 1;
    this._states.value = 1;
    this._states.alpha = 1;
    this._states.isFirstValueUpdate = false;

    if (this._saturationThumb) {
      this._saturationThumb.style.left = "";
      this._saturationThumb.style.top = "";
    }

    if (this._hueThumb) {
      this._hueThumb.style.top = "";
    }

    if (this._alphaThumb) {
      this._alphaThumb.style.left = "";
    }

    this._updateSvpanelStatus();
  }

  // ==================== 生命周期 ====================

  $mount(): void {
    this.updateContainerClasslist();
    this._updateTextDisplayMode();
  }

  $mounted(): void {
    if (this.value) {
      this._states.color.setValue(this.value);
      const formatted = this._states.color.toString(this._getEffectiveFormat());
      if (formatted !== this.value) {
        this.value = formatted;
        return;
      }
    }
    this._updateCursorPosition();
  }
}
