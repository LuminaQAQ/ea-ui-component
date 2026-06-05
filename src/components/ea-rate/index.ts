import { EaFormAssociatedBase } from "@core/EaFormAssociatedBase";
import { createBEM } from "@utils/bem";

import { CustomElement, attribute, property, query, listen } from "@decorator";

import { html } from "@utils/html";
import { Enum } from "@utils/Enum";
import { i18nManager } from "@utils/I18nManager";

import { EaRateChangeEvent } from "./events/EaRateChangeEvent";
import { EaRateHoverEvent } from "./events/EaRateHoverEvent";
import stylesheet from "./index.scss?inline";
import "@/components/ea-icon/index";

const TAG_NAME = "ea-rate" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 评分组件，支持自定义图标、悬停提示和可配置最大值。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-icon
 *
 * @event change - 评分值变化时触发，detail: `{ value: number }`。
 * @event ea-hover - 鼠标移动到某项时触发，detail: `{ value: number | null, target: HTMLElement | null }`。
 *
 * @csspart container - 评分项容器元素。
 * @csspart label - 辅助文字元素。
 * @csspart symbol-wrap - 单个评分项的包裹元素。
 * @csspart icon - 每个图标的内部元素。
 *
 * @cssproperty --ea-rate-spacing - 评分项间距。
 * @cssproperty --ea-rate-large-size - 大号尺寸。
 * @cssproperty --ea-rate-default-size - 默认尺寸。
 * @cssproperty --ea-rate-small-size - 小号尺寸。
 * @cssproperty --ea-rate-active-color - 选中状态颜色。
 * @cssproperty --ea-rate-inactive-color - 未选中状态颜色。
 * @cssproperty --ea-rate-disabled-active-color - 禁用态选中颜色。
 * @cssproperty --ea-rate-disabled-inactive-color - 禁用态未选中颜色。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaRate extends EaFormAssociatedBase {
  @query(".ea-rate")
  private _container!: HTMLElement;

  @query(".ea-rate__label")
  private _label!: HTMLElement;

  private _hoverAbortController?: AbortController;

  private _lastHoveredIndex: number = -1;

  @attribute({
    type: String,
    default: "",
    a11y: {
      ariaAttr: "aria-label",
      map: v => v || null,
    },
    observer(this: EaRate, newVal: string) {
      if (this._label) this._label.textContent = newVal;
    },
  })
  label: string = "";

  @attribute({
    type: Number,
    default: 0,
    observer(this: EaRate, newVal: number) {
      this.setValue(newVal ? newVal.toString() : null);
      this._setRateStatus(newVal - 1);
    },
  })
  value: number = 0;

  @attribute({
    type: Number,
    default: 0,
  })
  min: number = 0;

  @attribute({
    type: Number,
    default: 5,
    observer(this: EaRate) {
      this._renderRateEl(this.getSymbol, this.value);
      this._setRateStatus(this.value - 1);
    },
  })
  max: number = 5;

  @attribute({
    type: Enum(["large", "default", "small"]),
    default: "",
    observer(this: EaRate) {
      this.updateContainerClasslist();
    },
  })
  size: string = "";

  @attribute({
    type: Boolean,
    default: false,
    a11y: { ariaAttr: "aria-readonly" },
  })
  readonly: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    a11y: {
      ariaAttr: "aria-disabled",
      map: v => String(v),
    },
    observer(this: EaRate) {
      this.updateContainerClasslist();
    },
  })
  disabled: boolean = false;

  @property({
    type: Function,
    default: (_value?: number, _isSelected?: number) =>
      `<ea-icon name="star" part="icon"></ea-icon>`,
    observer(this: EaRate, cb: (value: number, isSelected: number) => string) {
      if (!cb || typeof cb !== "function") return;
      this._renderRateEl(cb, this.value);
      this._setRateStatus(this.value - 1);
    },
  })
  getSymbol: (value?: number, isSelected?: number) => string = () =>
    `<ea-icon name="star" part="icon"></ea-icon>`;

  updateContainerClasslist(): string {
    const className = bem(
      {
        [this.size]: !!this.size,
      },
      {
        disabled: this.disabled,
      }
    );

    if (this._container) this._container.className = className;

    return className;
  }

  html(): string {
    return `
      <label class="${bem.e("label")}" part="label"></label>
      <div class="${bem()}" part="container" role="presentation"></div>
    `;
  }

  /** @param renderer - 图标渲染函数 @param activeValue - 当前选中值 @param length - 评分项数量 */
  private _renderRateEl(
    renderer: (value: number, isSelected: number) => string,
    activeValue: number = this.value,
    length: number = this.max
  ): void {
    if (!renderer || !this._container) return;

    this._container.innerHTML = "";

    i18nManager.locale = this.locale;

    for (let index = 0; index < length; index++) {
      const starValue = index + 1;
      const isChecked = starValue === activeValue;

      const span = document.createElement("span");
      span.className = bem.e("symbol");
      span.setAttribute("part", "symbol-wrap");
      span.setAttribute("role", "radio");
      span.setAttribute("aria-checked", String(isChecked));
      span.setAttribute(
        "aria-label",
        i18nManager.t("rate.star", { n: starValue })
      );
      span.tabIndex = isChecked ? 0 : -1;

      span.innerHTML = html(renderer(index, activeValue));

      this._container.appendChild(span);
    }
  }

  /** @param index - 选中截止下标（0-based） */
  private _setRateStatus(index: number = this.value - 1): void {
    if (!this._container) return;

    const children = [...this._container.children] as HTMLElement[];

    children.forEach((el, i) => {
      const isSelected = i <= index;
      const isChecked = i === index;
      el.classList.toggle("is-selected", isSelected);
      el.setAttribute("aria-checked", String(isChecked));
      el.tabIndex = isChecked || (index < 0 && i === 0) ? 0 : -1;
    });
  }

  /** @returns 恢复为 value 对应的选中状态 */
  private _unsetRateStatus(): void {
    if (!this._container) return;

    const children = [...this._container.children] as HTMLElement[];

    children.forEach((el, i) => {
      el.classList.toggle("is-selected", i <= this.value - 1);
    });
  }

  /** @param value - 悬停项下标或 null @param target - 悬停目标元素或 null */
  private _emitHoverEvent(
    value: number | null,
    target: HTMLElement | null = null
  ): void {
    this.dispatchEvent(new EaRateHoverEvent({ value, target }));
  }

  @listen("mouseover", ".ea-rate")
  private _handleMouseover = (): void => {
    if (this.readonly || this.disabled) return;

    this._hoverAbortController?.abort();
    this._hoverAbortController = new AbortController();

    const onMousemove = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const target = (mouseEvent.target as HTMLElement)?.closest(
        ".ea-rate__symbol"
      ) as HTMLElement;
      if (!target) return;

      const children = [...this._container.children];
      const index = children.indexOf(target);

      if (index === this._lastHoveredIndex) return;

      this._lastHoveredIndex = index;
      this._setRateStatus(index);
      this._emitHoverEvent(index, target);
    };

    const onMouseout = () => {
      this._lastHoveredIndex = -1;
      this._unsetRateStatus();

      const value = this.hasAttribute("value") ? this.value - 1 : null;
      const target = this.hasAttribute("value")
        ? (this._container.children[this.value - 1] as HTMLElement)
        : null;

      this._emitHoverEvent(value, target);
    };

    this._container.addEventListener("mousemove", onMousemove, {
      signal: this._hoverAbortController.signal,
    });
    this._container.addEventListener("mouseout", onMouseout, {
      signal: this._hoverAbortController.signal,
    });
  };

  @listen("click", ".ea-rate__symbol")
  private _handleClick = (e: Event): void => {
    if (this.readonly || this.disabled) return;

    const target = (e.target as HTMLElement).closest(
      ".ea-rate__symbol"
    ) as HTMLElement;
    if (!target) return;

    const children = [...this._container.children];
    const index = children.indexOf(target);
    const displayValue = index + 1;

    if (this.value === displayValue) {
      this.value = 0;
    } else {
      this.value = displayValue;
    }

    this.dispatchEvent(new EaRateChangeEvent({ value: displayValue }));
  };

  /** 处理键盘导航（roving tabindex） */
  @listen("keydown", ".ea-rate__symbol")
  private _handleKeydown = (e: KeyboardEvent): void => {
    if (this.readonly || this.disabled) return;

    const target = e.target as HTMLElement;
    const children = [...this._container.children] as HTMLElement[];
    const currentIndex = children.indexOf(target);

    let newIndex = currentIndex;

    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        newIndex = currentIndex < children.length - 1 ? currentIndex + 1 : 0;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        newIndex = currentIndex > 0 ? currentIndex - 1 : children.length - 1;
        break;
      case "Home":
        e.preventDefault();
        newIndex = 0;
        break;
      case "End":
        e.preventDefault();
        newIndex = children.length - 1;
        break;
      case " ":
        e.preventDefault();
        const displayValue = currentIndex + 1;
        if (this.value !== displayValue) {
          this.value = displayValue;
          this.dispatchEvent(new EaRateChangeEvent({ value: displayValue }));
        }
        return;
      default:
        return;
    }

    if (newIndex !== currentIndex) {
      this.value = newIndex + 1;
      children[newIndex].focus();
      this.dispatchEvent(new EaRateChangeEvent({ value: newIndex + 1 }));
    }
  };

  get validationTarget(): HTMLElement {
    return this;
  }

  updateValidity(): void {
    if (this.required && !this.value) {
      this.internals.setValidity(
        { valueMissing: true },
        "请选择一个评分",
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

  $mount(): void {
    this.setAttribute("role", "radiogroup");
    this._renderRateEl(this.getSymbol, this.value);
    this.updateContainerClasslist();
    this._setRateStatus(this.value - 1);
  }

  $updateLocalization(locale: string): void {
    i18nManager.locale = locale;
    this._renderRateEl(this.getSymbol, this.value);
    this._setRateStatus(this.value - 1);
  }

  $beforeUnmount(): void {
    this._hoverAbortController?.abort();
    this._hoverAbortController = undefined;
  }
}

export default EaRate;
