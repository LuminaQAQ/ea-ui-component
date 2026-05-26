import "@/components/ea-input-number/index";
import "@/components/ea-tooltip";
import { Enum } from "@/utils/Enum";
import { EaFormAssociatedBase } from "@core/EaFormAssociatedBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { listen } from "@decorator/listen";
import { property } from "@decorator/property";
import { query } from "@decorator/query";
import { createBEM } from "@utils/bem";
import { html } from "@utils/html";
import { EaSliderChangeEvent } from "./events/EaSliderChangeEvent";
import { EaSliderInputEvent } from "./events/EaSliderInputEvent";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-slider" as const;
const bem = createBEM(TAG_NAME);

export type SliderSize = "large" | "default" | "small";

export type SliderPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaSlider extends EaFormAssociatedBase {
  // ==================== DOM 元素引用 ====================

  @query(bem.ce("form-label"))
  private _label!: HTMLElement;

  @query(bem.cb())
  private _container!: HTMLElement;

  @query(bem.ce("rail"))
  private _rail!: HTMLElement;

  @query(bem.ce("trigger"))
  private _trigger!: HTMLElement;

  @query(bem.ce("thumb"))
  private _thumb!: HTMLElement;

  @query(bem.ce("tooltip"))
  private _tooltip!: HTMLElement;

  @query(bem.ce("marks"))
  private _marks!: HTMLElement;

  @query(bem.ce("input"))
  private _input!: HTMLElement;

  // ==================== 私有属性 ====================
  private _inputAbortController?: AbortController | null;

  private _states = {
    isDragging: false,
    startX: 0,
    startY: 0,
    isInputNumberDefined: false,
  };

  // ==================== 属性定义 ====================

  @attribute({
    type: String,
    default: "",
    observer(this: EaSlider, newVal: string) {
      if (this._label) this._label.textContent = newVal;
    },
  })
  label: string = "";

  @attribute({
    type: Number,
    default: 0,
    observer(this: EaSlider, newVal: number) {
      const clampedValue = Math.max(this.min, Math.min(this.max, newVal));
      this.setValue(clampedValue);
      this._updateSlider();
    },
  })
  value: number = 0;

  @attribute({
    type: Number,
    default: 0,
    observer(this: EaSlider) {
      this._updateSlider();
    },
  })
  min: number = 0;

  @attribute({
    type: Number,
    default: 100,
    observer(this: EaSlider) {
      this._updateSlider();
    },
  })
  max: number = 100;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaSlider) {
      this.updateContainerClasslist();
      this._renderStops();
    },
  })
  showStops: boolean = false;

  @attribute({
    type: Number,
    default: 1,
    observer(this: EaSlider) {
      this._updateSlider();
    },
  })
  step: number = 1;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaSlider) {
      this.updateContainerClasslist();
    },
  })
  disabled: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaSlider) {
      this._updateSlider();
    },
  })
  vertical: boolean = false;

  @attribute({
    type: Boolean,
    default: true,
    observer(this: EaSlider) {
      this._updateSlider();
    },
  })
  showTooltip: boolean = true;

  @attribute({
    type: Enum([
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
    ]),
    default: "top",
    observer(this: EaSlider, newVal: SliderPlacement) {
      if (this._trigger) this._trigger.setAttribute("placement", newVal);
    },
  })
  placement: SliderPlacement = "top";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaSlider, newVal: boolean) {
      void this._handleShowInputChange(newVal);
    },
  })
  showInput: boolean = false;

  @attribute({
    type: Enum(["large", "default", "small"]),
    default: "",
    observer(this: EaSlider, newVal: string) {
      this.updateContainerClasslist();
      if (this.showInput && this._input)
        this._input.setAttribute("size", newVal);
    },
  })
  size: SliderSize | "" = "";

  @attribute({
    type: Boolean,
    default: false,
  })
  required: boolean = false;

  // ==================== Property 属性====================

  @property({
    type: Object,
    default: null,
    observer(this: EaSlider) {
      this._renderMarks();
    },
  })
  marks: Record<string, string> | null = null;

  @property({
    type: Function,
    default: (value: number) => value,
    rawFunction: true,
    observer(this: EaSlider) {
      this._updateSlider();
    },
  })
  formatTooltip: (value: number) => number | string = (value: number) => value;

  // ==================== 方法 ====================

  updateContainerClasslist(): string {
    const className = bem(
      {
        [this.size]: !!this.size,
      },
      {
        disabled: this.disabled,
        vertical: this.vertical,
        "show-tooltip": this.showTooltip,
        "show-stops": this.showStops,
        "show-input": this.showInput,
      }
    );

    if (this._container) this._container.className = className;

    return className;
  }

  constructor() {
    super();
  }

  html(): string {
    return `
      <label class='${bem.e("form-label")}' part='form-label'></label>
      <div class='${bem()}' part='container'>
        <div class='${bem.e("runway")}' part='runway'>
          <div class='${bem.e("rail")}' part='rail'></div>
          <ea-tooltip class='${bem.e("trigger")}' part='trigger' flip="false" trigger="customized" placement="${this.placement}">
            <div class='${bem.e("thumb")}' part='thumb' slot="reference"></div>
            <div class='${bem.e("tooltip")}' part='tooltip'></div>
          </ea-tooltip>
          <div class='${bem.e("marks")}' part='marks'></div>
        </div>
        <ea-input-number class='${bem.e("input")}' part='input'></ea-input-number>
      </div>
    `;
  }

  /**
   * 渲染 stops 和 mark-stop 节点到 rail 中
   */
  private _renderStops(): void {
    if (!this._rail) return;

    const stops: {
      value: number;
      percentage: number;
      type: string;
      className: string;
      part: string;
      label?: string;
    }[] = [];

    const count = (this.max - this.min) / this.step + 1;

    if (this.showStops) {
      for (let index = 0; index < count; index++) {
        const value = this.min + this.step * index;
        const percentage = ((value - this.min) / (this.max - this.min)) * 100;

        stops.push({
          value,
          percentage,
          type: "stop",
          className: bem.e("stop"),
          part: "stop",
        });
      }
    }

    if (this.marks) {
      for (const key in this.marks) {
        const value = parseFloat(key);
        if (isNaN(value) || value < this.min || value > this.max) continue;

        const percentage = ((value - this.min) / (this.max - this.min)) * 100;

        stops.push({
          value,
          percentage,
          type: "mark-stop",
          className: `${bem.e("stop")} ${bem.e("mark-stop")}`,
          part: "stop mark-stop",
          label: this.marks[key],
        });
      }
    }

    stops.sort((a, b) => a.value - b.value);

    const styleProp = this.vertical ? "top" : "left";

    const stopElements = stops.map(
      stop =>
        `<div class="${stop.className}" part="${stop.part}" style="${styleProp}: ${stop.percentage}%;"></div>`
    );

    this._rail.innerHTML = html(stopElements.join(""));
  }

  /**
   * 渲染 mark 标签到 marks 容器中
   */
  private _renderMarkLabels(): void {
    if (!this._marks) return;

    if (!this.marks) {
      this._marks.innerHTML = "";
      return;
    }

    const styleProp = this.vertical ? "top" : "left";

    let marksHtml = "";
    for (const key in this.marks) {
      const value = parseFloat(key);
      if (isNaN(value) || value < this.min || value > this.max) continue;

      const percentage = ((value - this.min) / (this.max - this.min)) * 100;
      const label = this.marks[key];

      marksHtml += `
        <div class='${bem.e("mark")}' style="${styleProp}: ${percentage}%;">
          <div class='${bem.e("mark-label")}'>${label}</div>
        </div>
      `;
    }

    this._marks.innerHTML = html(marksHtml);
  }

  /**
   * 统一渲染 stops 和 marks
   */
  private _renderMarks(): void {
    this._renderStops();
    this._renderMarkLabels();
  }

  /**
   * 根据步长精度修正数值
   * @param value - 需要修正精度的数值
   * @returns 修正精度后的数值
   */
  private _fixPrecision(value: number): number {
    const stepStr = this.step.toString();
    const decimalPlaces = stepStr.includes(".")
      ? stepStr.split(".")[1].length
      : 0;
    return parseFloat(value.toFixed(decimalPlaces));
  }

  /**
   * 根据鼠标位置计算滑块值
   * @param position - 鼠标的 clientX 或 clientY 坐标
   * @returns 计算并修正精度后的滑块值
   */
  private _getValueFromPosition(position: number): number {
    const rect = this._rail.getBoundingClientRect();
    const percentage = this.vertical
      ? (position - rect.top) / rect.height
      : (position - rect.left) / rect.width;
    const clampedPercentage = Math.max(0, Math.min(1, percentage));
    const value = this.min + clampedPercentage * (this.max - this.min);
    const steppedValue = Math.round(value / this.step) * this.step;
    return this._fixPrecision(
      Math.max(this.min, Math.min(this.max, steppedValue))
    );
  }

  /**
   * 更新滑块位置、tooltip 内容、输入框值及容器类名
   */
  private _updateSlider(): void {
    if (!this._trigger) return;

    const value = this.value;
    const percentage = ((value - this.min) / (this.max - this.min)) * 100;

    if (this.vertical) {
      this._trigger.style.top = `${percentage}%`;
      this._trigger.style.left = "50%";
    } else {
      this._trigger.style.left = `${percentage}%`;
      this._trigger.style.top = "50%";
    }

    this._tooltip.textContent = String(this.formatTooltip(value));

    if (this.showInput && this._input) {
      (this._input as any).value = value;
      (this._input as any).min = this.min;
      (this._input as any).max = this.max;
      (this._input as any).step = this.step;
    }

    this.updateContainerClasslist();
  }

  /**
   * 处理 showInput 属性变化，管理输入框事件监听
   * @param newVal - showInput 的新值
   */
  private async _handleShowInputChange(newVal: boolean): Promise<void> {
    if (!this._states.isInputNumberDefined) {
      await customElements.whenDefined("ea-input-number");
      this._states.isInputNumberDefined = true;
    }

    this._inputAbortController?.abort();

    this._updateSlider();

    if (newVal) {
      this._inputAbortController = new AbortController();
      this._input.addEventListener("ea-change", this._onInputChange, {
        signal: this._inputAbortController.signal,
      });
    }
  }

  // ==================== 事件处理 ====================

  /**
   * 在轨道上按下鼠标，开始拖拽并跳转到点击位置
   * @param e - 鼠标事件
   */
  @listen("mousedown", bem.ce("rail"))
  private _onMouseDown(e: MouseEvent): void {
    if (this.disabled) return;

    e.preventDefault();
    e.stopPropagation();

    this._states.isDragging = true;
    this._states.startX = e.clientX;
    this._states.startY = e.clientY;

    this._trigger.toggleAttribute("visible", true);

    const newValue = this._getValueFromPosition(
      this.vertical ? e.clientY : e.clientX
    );
    this.value = newValue;

    this.dispatchEvent(new EaSliderInputEvent({ value: this.value }));
  }

  /**
   * 在滑块上按下鼠标，开始拖拽
   * @param e - 鼠标事件
   */
  @listen("mousedown", bem.ce("thumb"))
  private _onThumbMouseDown(e: MouseEvent): void {
    if (this.disabled) return;

    e.preventDefault();
    e.stopPropagation();

    this._states.isDragging = true;
    this._states.startX = e.clientX;
    this._states.startY = e.clientY;

    this._trigger.toggleAttribute("visible", true);

    const newValue = this._getValueFromPosition(
      this.vertical ? e.clientY : e.clientX
    );
    this.value = newValue;

    this.dispatchEvent(new EaSliderInputEvent({ value: this.value }));
  }

  /**
   * 文档级鼠标移动，拖拽中更新滑块值
   * @param e - 鼠标事件
   */
  @listen("mousemove", "document")
  private _onMouseMove(e: MouseEvent): void {
    if (!this._states.isDragging || this.disabled) return;

    e.preventDefault();
    e.stopPropagation();

    const newValue = this._getValueFromPosition(
      this.vertical ? e.clientY : e.clientX
    );
    this.value = newValue;

    this.dispatchEvent(new EaSliderInputEvent({ value: this.value }));
  }

  /**
   * 文档级鼠标松开，结束拖拽
   */
  @listen("mouseup", "document")
  private _onMouseUp(): void {
    if (!this._states.isDragging) return;

    this._states.isDragging = false;
    this._trigger.toggleAttribute("visible", false);
    this.dispatchEvent(new EaSliderChangeEvent({ value: this.value }));
  }

  /**
   * 鼠标进入滑块，显示 tooltip
   */
  @listen("mouseenter", bem.ce("thumb"))
  private _onThumbMouseEnter(): void {
    if (this.disabled) return;
    this._trigger.toggleAttribute("visible", true);
  }

  /**
   * 鼠标离开滑块，隐藏 tooltip
   */
  @listen("mouseleave", bem.ce("thumb"))
  private _onThumbMouseLeave(): void {
    if (this.disabled || this._states.isDragging) return;
    this._trigger.toggleAttribute("visible", false);
  }

  /**
   * 处理 ea-input-number 的 ea-change 事件
   * @param e - 自定义事件
   */
  private _onInputChange = (e: Event): void => {
    e.preventDefault();
    e.stopImmediatePropagation();

    const newValue = parseFloat((e as CustomEvent).detail.currentValue);
    const clampedValue = Math.max(this.min, Math.min(this.max, newValue));
    if (clampedValue === this.value) return;
    this.value = clampedValue;
    this.dispatchEvent(new EaSliderChangeEvent({ value: this.value }));
  };

  // ==================== 表单验证 ====================

  get validationTarget() {
    return this._input;
  }

  updateValidity(): void {
    const hasValue = this.value !== null && this.value !== undefined;

    if (this.required && !hasValue) {
      this.internals.setValidity({ valueMissing: true }, "请设置一个值", this);
    } else {
      this.internals.setValidity({}, "", this);
    }
  }

  checkValidity(): boolean {
    this.updateValidity();
    return this.internals.validity.valid;
  }

  reportValidity(): boolean {
    this.updateValidity();
    return this.internals.reportValidity();
  }

  // ==================== 生命周期 ====================

  $mount(): void {
    this._updateSlider();
  }

  $beforeUnmount(): void {
    this._inputAbortController?.abort();
  }
}
