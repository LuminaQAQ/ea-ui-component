import { EaFormAssociatedBase } from "@core/EaFormAssociatedBase";
import { createBEM } from "@utils/bem";

import { CustomElement, attribute, query, listen } from "@decorator";

import { Enum } from "@utils/Enum";
import { timeout } from "@utils/timeout";

import { EaTimePickerVisibleChangeEvent } from "./events/EaTimePickerVisibleChangeEvent";
import { EaTimePickerChangeEvent } from "./events/EaTimePickerChangeEvent";
import { EaTimePickerFocusEvent } from "./events/EaTimePickerFocusEvent";
import { EaTimePickerBlurEvent } from "./events/EaTimePickerBlurEvent";

import stylesheet from "./index.scss?inline";

import "@/components/ea-icon/index.js";
import "@/components/ea-input/index.js";

const TAG_NAME = "ea-time-picker" as const;
const bem = createBEM(TAG_NAME);

export type TimePickerSize = "large" | "default" | "small";
export type TimePickerAlign = "left" | "center" | "right";

/**
 * @summary 时间选择器组件，用于选择或输入时间，支持限制时间范围和多种对齐方式。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-icon
 * @dependency ea-input
 *
 * @event change - 值改变时触发，detail: `{ value }`。
 * @event focus - 输入框获得焦点时触发。
 * @event blur - 输入框失去焦点时触发。
 * @event ea-visible-change - 下拉面板显隐变化时触发，detail: `{ visible }`。
 *
 * @csspart container - 组件根容器。
 * @csspart input - 输入框元素。
 * @csspart dropdown - 下拉面板。
 * @csspart dropdown-inner-wrap - 下拉面板内部容器。
 * @csspart dropdown-time - 时间列表。
 * @csspart dropdown-item - 时间项。
 *
 * @cssproperty --ea-time-picker-width - 组件宽度。
 * @cssproperty --ea-time-picker-dropdown-bg-color - 下拉面板背景颜色。
 * @cssproperty --ea-time-picker-dropdown-shadow - 下拉面板阴影。
 * @cssproperty --ea-time-picker-dropdown-border-color - 下拉面板边框颜色。
 * @cssproperty --ea-time-picker-item-height - 时间项高度。
 * @cssproperty --ea-time-picker-item-font-size - 时间项字体大小。
 * @cssproperty --ea-time-picker-item-color - 时间项文字颜色。
 * @cssproperty --ea-time-picker-item-active-color - 选中项文字颜色。
 * @cssproperty --ea-time-picker-item-disabled-color - 禁用项文字颜色。
 * @cssproperty --ea-time-picker-item-hover-bg-color - 悬停项背景颜色。
 * @cssproperty --ea-time-picker-transition - 过渡动画。
 * @cssproperty --ea-time-picker-dropdown-max-height - 下拉面板最大高度。
 * @cssproperty --ea-time-picker-dropdown-padding - 下拉面板内边距。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaTimePicker extends EaFormAssociatedBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @query(bem.ce("input"))
  private _input!: HTMLElement;

  @query(`${bem.ce("dropdown-inner")}--hour`)
  private _hourWrap!: HTMLElement;

  @query(`${bem.ce("dropdown-inner")}--minute`)
  private _minuteWrap!: HTMLElement;

  @query(`${bem.ce("dropdown-inner")}--second`)
  private _secondWrap!: HTMLElement;

  private _states = {
    hour: 0,
    minute: 0,
    second: 0,
    isAutoScrolling: false,
    scrollTimeout: null as ReturnType<typeof setTimeout> | null,
    isFirstOpen: true,
  };

  @attribute({
    type: String,
    default: "",
    observer(this: EaTimePicker, newVal: string) {
      if (this._input) {
        (this._input as any).label = newVal;
      }
    },
  })
  label: string = "";

  @attribute({
    type: String,
    default: "Select time",
    observer(this: EaTimePicker, newVal: string) {
      if (this._input) {
        (this._input as any).placeholder = newVal;
      }
    },
  })
  placeholder: string = "Select time";

  @attribute({
    type: String,
    default: "",
    observer(this: EaTimePicker, newVal: string) {
      this.setValue(newVal);
      if (newVal) {
        this._parseValue(newVal);
        this._updateInputValue();
        this._updateSelectionState();
      }
    },
  })
  value: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaTimePicker, newVal: string) {
      if (this._container) {
        this._container.style.setProperty("--ea-time-picker-width", newVal);
      }
    },
  })
  width: string = "";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaTimePicker, newVal: boolean) {
      if (this._input) {
        this._input.toggleAttribute("disabled", newVal);
      }
      this.updateContainerClasslist();
    },
  })
  disabled: boolean = false;

  @attribute({
    type: Enum(["left", "center", "right"]),
    default: "left",
    observer(this: EaTimePicker) {
      this.updateContainerClasslist();
    },
  })
  align: TimePickerAlign = "left";

  @attribute({
    type: Enum(["large", "default", "small"]),
    default: "default",
    observer(this: EaTimePicker, newVal: string) {
      if (this._input) {
        this._input.setAttribute("size", newVal);
      }
    },
  })
  size: TimePickerSize = "default";

  @attribute({
    type: String,
    default: "00:00:00",
    observer(this: EaTimePicker) {
      this._applyLimitRange();
    },
  })
  limitRangeStart: string = "00:00:00";

  @attribute({
    type: String,
    default: "23:59:59",
    observer(this: EaTimePicker) {
      this._applyLimitRange();
    },
  })
  limitRangeEnd: string = "23:59:59";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaTimePicker, newVal: boolean) {
      if (this._input) {
        this._input.toggleAttribute("required", newVal);
      }
    },
  })
  required: boolean = false;

  updateContainerClasslist(): string {
    const className = bem(
      {
        [this.size]: this.size && this.size !== "default",
      },
      {
        disabled: this.disabled,
        open: this._container?.classList.contains("is-open"),
        [`align-${this.align}`]: this.align && this.align !== "left",
      }
    );

    if (this._container) {
      this._container.className = className;
    }

    return className;
  }

  html(): string {
    return `
      <div class='${bem()}' part='container'>
        <ea-input
          class="${bem.e("input")}"
          part='input'
          autocomplete="off"
          readonly
          prefix-icon="clock"
        ></ea-input>
        <div class="${bem.e("dropdown")}" part='dropdown'>
          <div class="${bem.e("dropdown-inner-wrap")}" part='dropdown-inner-wrap'>
            <ul class="${bem.e("dropdown-inner")} ${bem.e("dropdown-inner")}--hour" part='dropdown-time'>
              ${this._generateTimeItems(0, 23)}
            </ul>
            <ul class="${bem.e("dropdown-inner")} ${bem.e("dropdown-inner")}--minute" part='dropdown-time'>
              ${this._generateTimeItems(0, 59)}
            </ul>
            <ul class="${bem.e("dropdown-inner")} ${bem.e("dropdown-inner")}--second" part='dropdown-time'>
              ${this._generateTimeItems(0, 59)}
            </ul>
          </div>
        </div>
      </div>
    `;
  }

  /** @param end - 结束值（包含） @returns 时间项 HTML 字符串 */
  private _generateTimeItems = (start: number, end: number): string => {
    const items: string[] = [];

    for (let i = start; i <= end; i++) {
      const formattedValue = this._formatNumber(i);
      items.push(
        `<li class="${bem.e("dropdown-item")}" data-value="${i}" part="dropdown-item">${formattedValue}</li>`
      );
    }

    return items.join("");
  };

  /** @param value - 时间字符串，格式 HH:mm:ss */
  private _parseValue = (value: string): void => {
    const [hour = 0, minute = 0, second = 0] = value.split(":").map(Number);
    this._states.hour = hour;
    this._states.minute = minute;
    this._states.second = second;
  };

  /** @returns 格式化的时间值字符串 HH:mm:ss */
  private get _timeValue(): string {
    return `${this._formatNumber(this._states.hour)}:${this._formatNumber(this._states.minute)}:${this._formatNumber(this._states.second)}`;
  }

  /** @param num - 待格式化的数字 @returns 两位数字符串 */
  private _formatNumber = (num: number): string => {
    return num < 10 ? `0${num}` : String(num);
  };

  /** 同步内部 ea-input 的显示值 */
  private _updateInputValue = (): void => {
    if (this._input) {
      (this._input as any).value = this._timeValue;
    }
  };

  /** 更新所有时间列表的选中状态 */
  private _updateSelectionState = (): void => {
    this._updateWrapSelection(this._hourWrap, this._states.hour);
    this._updateWrapSelection(this._minuteWrap, this._states.minute);
    this._updateWrapSelection(this._secondWrap, this._states.second);
  };

  /**
   * @param wrap - 时间列表容器
   * @param value - 当前选中值
   */
  private _updateWrapSelection = (wrap: HTMLElement, value: number): void => {
    if (!wrap) return;
    const items = wrap.querySelectorAll("li");
    items.forEach(item => {
      const itemValue = parseInt((item as HTMLElement).dataset.value!, 10);
      item.classList.toggle("is-active", itemValue === value);
    });
  };

  /**
   * @param wrap - 时间列表容器
   * @param targetValue - 目标值
   * @returns 最接近的可用值，无可用项时返回 null
   */
  private _getClosestAvailableValue = (
    wrap: HTMLElement,
    targetValue: number
  ): number | null => {
    if (!wrap) return null;
    const enabledItems = wrap.querySelectorAll("li:not(.is-disabled)");
    if (!enabledItems.length) return null;

    let closestValue: number | null = null;
    let minDiff = Infinity;

    enabledItems.forEach(item => {
      const value = parseInt((item as HTMLElement).dataset.value!, 10);
      const diff = Math.abs(value - targetValue);
      if (diff < minDiff) {
        minDiff = diff;
        closestValue = value;
      }
    });

    return closestValue;
  };

  /** @returns 是否设置了时间范围限制 */
  private _hasLimitedRange = (): boolean => {
    return (
      this.hasAttribute("limit-range-start") ||
      this.hasAttribute("limit-range-end")
    );
  };

  /** 根据 limitRangeStart 和 limitRangeEnd 禁用超出范围的时间项 */
  private _applyLimitRange = (): void => {
    const [startHour = 0, startMinute = 0, startSecond = 0] =
      this.limitRangeStart.split(":").map(Number);
    const [endHour = 23, endMinute = 59, endSecond = 59] = this.limitRangeEnd
      .split(":")
      .map(Number);

    this._applyRangeToWrap(this._hourWrap, startHour, endHour);
    this._applyRangeToWrap(this._minuteWrap, startMinute, endMinute);
    this._applyRangeToWrap(this._secondWrap, startSecond, endSecond);
  };

  /**
   * @param wrap - 时间列表容器
   * @param start - 起始值（包含）
   * @param end - 结束值（包含）
   */
  private _applyRangeToWrap = (
    wrap: HTMLElement,
    start: number,
    end: number
  ): void => {
    if (!wrap) return;
    const items = wrap.querySelectorAll("li");
    items.forEach(item => {
      const value = parseInt((item as HTMLElement).dataset.value!, 10);
      const isDisabled = value < start || value > end;
      item.classList.toggle("is-disabled", isDisabled);
    });
  };

  /** 打开下拉面板 */
  private _openDropdown = (): void => {
    if (this.disabled) return;
    const wasOpen = this._container.classList.contains("is-open");
    this._container.classList.add("is-open");
    this.updateContainerClasslist();

    if (!wasOpen) {
      this.dispatchEvent(new EaTimePickerVisibleChangeEvent({ visible: true }));
    }

    if (this._states.isFirstOpen) {
      const hasValue = this.value && this.value.trim() !== "";
      const hasLimitedRange = this._hasLimitedRange();

      if (!hasValue && hasLimitedRange) {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentSecond = now.getSeconds();

        const closestHour = this._getClosestAvailableValue(
          this._hourWrap,
          currentHour
        );
        const closestMinute = this._getClosestAvailableValue(
          this._minuteWrap,
          currentMinute
        );
        const closestSecond = this._getClosestAvailableValue(
          this._secondWrap,
          currentSecond
        );

        if (closestHour !== null) {
          this._states.hour = closestHour;
          this._scrollToValue(this._hourWrap, closestHour, false);
        }
        if (closestMinute !== null) {
          this._states.minute = closestMinute;
          this._scrollToValue(this._minuteWrap, closestMinute, false);
        }
        if (closestSecond !== null) {
          this._states.second = closestSecond;
          this._scrollToValue(this._secondWrap, closestSecond, false);
        }

        this._updateSelectionState();
      } else {
        this._scrollToValue(this._hourWrap, this._states.hour, false);
        this._scrollToValue(this._minuteWrap, this._states.minute, false);
        this._scrollToValue(this._secondWrap, this._states.second, false);
      }

      this._states.isFirstOpen = false;
    }
  };

  /** 关闭下拉面板 */
  private _closeDropdown = (): void => {
    const wasOpen = this._container.classList.contains("is-open");
    this._container.classList.remove("is-open");
    this.updateContainerClasslist();

    if (wasOpen) {
      this.dispatchEvent(
        new EaTimePickerVisibleChangeEvent({ visible: false })
      );
    }
  };

  /**
   * @param wrap - 时间列表容器
   * @param value - 滚动目标值
   * @param smooth - 是否使用平滑滚动
   */
  private _scrollToValue = (
    wrap: HTMLElement,
    value: number,
    smooth = true
  ): void => {
    if (!wrap) return;
    const targetItem = wrap.querySelector(
      `li[data-value="${value}"]`
    ) as HTMLElement | null;

    if (targetItem && !targetItem.classList.contains("is-disabled")) {
      const top = targetItem.getBoundingClientRect().height * value - 1;
      wrap.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
    }
  };

  /**
   * @param wrap - 时间列表容器
   * @param type - 时间类型（hour/minute/second）
   */
  private _handleScrollStop = (wrap: HTMLElement, type: string): void => {
    if (this._states.scrollTimeout) {
      clearTimeout(this._states.scrollTimeout);
    }

    this._states.scrollTimeout = setTimeout(() => {
      if (this._states.isAutoScrolling) return;

      const allItems = wrap.querySelectorAll("li");
      const enabledItems = wrap.querySelectorAll("li:not(.is-disabled)");
      if (!enabledItems.length) return;

      const itemHeight = (
        enabledItems[0] as HTMLElement
      ).getBoundingClientRect().height;
      const { scrollTop } = wrap;

      const index = Math.round(scrollTop / itemHeight);
      const clampedIndex = Math.max(0, Math.min(allItems.length - 1, index));
      let targetItem = allItems[clampedIndex] as HTMLElement;

      if (targetItem && targetItem.classList.contains("is-disabled")) {
        for (let i = clampedIndex; i < allItems.length; i++) {
          if (!(allItems[i] as HTMLElement).classList.contains("is-disabled")) {
            targetItem = allItems[i] as HTMLElement;
            break;
          }
        }
        if (targetItem.classList.contains("is-disabled")) {
          for (let i = clampedIndex; i >= 0; i--) {
            if (
              !(allItems[i] as HTMLElement).classList.contains("is-disabled")
            ) {
              targetItem = allItems[i] as HTMLElement;
              break;
            }
          }
        }
      }

      if (targetItem && !targetItem.classList.contains("is-disabled")) {
        const value = parseInt(targetItem.dataset.value!, 10);
        this._setTimeValue(type, value);

        const top = itemHeight * value;
        this._states.isAutoScrolling = true;
        wrap.scrollTo({ top, behavior: "smooth" });

        timeout(() => {
          this._states.isAutoScrolling = false;
        }, 300);
      }
    }, 150);
  };

  /**
   * @param e - 点击事件
   * @param type - 时间类型（hour/minute/second）
   * @param wrap - 时间列表容器
   */
  private _handleItemClick = (
    e: Event,
    type: string,
    wrap: HTMLElement
  ): void => {
    const item = (e.target as HTMLElement).closest("li");
    if (!item || item.classList.contains("is-disabled")) return;

    const value = parseInt((item as HTMLElement).dataset.value!, 10);
    this._setTimeValue(type, value);

    const itemHeight = item.getBoundingClientRect().height;
    const top = itemHeight * value;

    this._states.isAutoScrolling = true;
    if (this._states.scrollTimeout) {
      clearTimeout(this._states.scrollTimeout);
    }
    wrap.scrollTo({ top, behavior: "smooth" });

    timeout(() => {
      this._states.isAutoScrolling = false;
    }, 1000);
  };

  /**
   * @param type - 时间类型（hour/minute/second）
   * @param value - 新的时间值
   */
  private _setTimeValue = (type: string, value: number): void => {
    switch (type) {
      case "hour":
        this._states.hour = value;
        break;
      case "minute":
        this._states.minute = value;
        break;
      case "second":
        this._states.second = value;
        break;
    }

    const newValue = this._timeValue;
    this.setAttribute("value", newValue);
    this._updateInputValue();
    this._updateSelectionState();

    this.dispatchEvent(new EaTimePickerChangeEvent({ value: newValue }));
  };

  @listen("click", bem.ce("input"))
  private _handleInputClick(): void {
    this._openDropdown();
  }

  @listen("focus", bem.ce("input"))
  private _handleInputFocus(e: Event): void {
    e.stopPropagation();
    this.dispatchEvent(new EaTimePickerFocusEvent());
    this._openDropdown();
  }

  @listen("blur", bem.ce("input"))
  private _handleInputBlur(e: Event): void {
    e.stopPropagation();
    this.dispatchEvent(new EaTimePickerBlurEvent());
  }

  @listen("click", "window")
  private _handleWindowClick(e: MouseEvent): void {
    const path = e.composedPath();
    const isInsideTimePicker =
      path.includes(this) || path.includes(this.shadowRoot!);
    if (!isInsideTimePicker) {
      this._closeDropdown();
    }
  }

  @listen("click", `${bem.ce("dropdown-inner")}--hour`)
  private _handleHourClick(e: Event): void {
    this._handleItemClick(e, "hour", this._hourWrap);
  }

  @listen("click", `${bem.ce("dropdown-inner")}--minute`)
  private _handleMinuteClick(e: Event): void {
    this._handleItemClick(e, "minute", this._minuteWrap);
  }

  @listen("click", `${bem.ce("dropdown-inner")}--second`)
  private _handleSecondClick(e: Event): void {
    this._handleItemClick(e, "second", this._secondWrap);
  }

  @listen("scroll", `${bem.ce("dropdown-inner")}--hour`)
  private _handleHourScroll(): void {
    this._handleScrollStop(this._hourWrap, "hour");
  }

  @listen("scroll", `${bem.ce("dropdown-inner")}--minute`)
  private _handleMinuteScroll(): void {
    this._handleScrollStop(this._minuteWrap, "minute");
  }

  @listen("scroll", `${bem.ce("dropdown-inner")}--second`)
  private _handleSecondScroll(): void {
    this._handleScrollStop(this._secondWrap, "second");
  }

  focus = (): void => {
    (this._input as any).focus();
  };

  blur = (): void => {
    (this._input as any).blur();
  };

  handleOpen = (): void => {
    this._openDropdown();
  };

  handleClose = (): void => {
    this._closeDropdown();
  };

  get validationTarget(): HTMLElement {
    return this._input;
  }

  updateValidity(): void {
    const hasValue = this.value !== "" && this.value != null;

    if (this.required && !hasValue) {
      this.internals.setValidity({ valueMissing: true }, "请选择时间", this);
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

  $mount(): void {
    this.updateContainerClasslist();
    this._applyLimitRange();

    if (this.hasAttribute("value")) {
      this._parseValue(this.value);
    }
  }

  $beforeUnmount(): void {
    if (this._states.scrollTimeout) {
      clearTimeout(this._states.scrollTimeout);
    }
  }
}

export default EaTimePicker;
