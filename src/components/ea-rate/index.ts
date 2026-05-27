import { EaFormAssociatedBase } from "@core/EaFormAssociatedBase";
import { attribute } from "@decorator/attribute";
import { property } from "@decorator/property";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { listen } from "@decorator/listen";
import { createBEM } from "@utils/bem";
import { html } from "@utils/html";
import { Enum } from "@/utils/Enum";
import { EA_COMPONENT_SIZES } from "@/utils/Variables";
import stylesheet from "./index.scss?inline";
import "@/components/ea-icon/index";

const TAG_NAME = "ea-rate" as const;
const bem = createBEM(TAG_NAME);

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
    default: 5,
    observer(this: EaRate) {
      this._renderRateEl(this.getSymbol, this.value);
      this._setRateStatus(this.value - 1);
    },
  })
  max: number = 5;

  @attribute({
    type: Enum(EA_COMPONENT_SIZES),
    default: "",
    observer(this: EaRate) {
      this.updateContainerClasslist();
    },
  })
  size: string = "";

  @attribute({
    type: Boolean,
    default: false,
  })
  readonly: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaRate) {
      this.updateContainerClasslist();
    },
  })
  disabled: boolean = false;

  @property({
    type: Function,
    default: (value?: number, isSelected?: number) =>
      `<ea-icon name="star" part="icon"></ea-icon>`,
    observer(this: EaRate, cb: Function) {
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
      <div class="${bem()}" part="container"></div>
    `;
  }

  private _renderRateEl(
    renderer: (value: number, isSelected: number) => string,
    activeValue: number = this.value,
    length: number = this.max
  ): void {
    if (!renderer || !this._container) return;

    const tpl = Array.from({ length })
      .map(
        (_, index) => `
          <span class="${bem.e("symbol")}" part="symbol-wrap">
            ${html(renderer(index, activeValue))}
          </span>`
      )
      .join("");

    this._container.innerHTML = tpl;
  }

  private _setRateStatus(index: number = this.value - 1): void {
    if (!this._container) return;

    const children = [...this._container.children];

    children.forEach((el, i) => {
      el.classList.toggle("is-selected", i <= index);
    });
  }

  private _unsetRateStatus(): void {
    if (!this._container) return;

    const children = [...this._container.children];

    children.forEach((el, i) => {
      el.classList.toggle("is-selected", i <= this.value - 1);
    });
  }

  private _emitHoverEvent(
    value: number | null,
    target: HTMLElement | null = null
  ): void {
    this.emit("hover", {
      detail: {
        value,
        target,
      },
    });
  }

  @listen("mouseover", ".ea-rate")
  private _onMouseover(): void {
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
  }

  @listen("click", ".ea-rate__symbol")
  private _onClick(e: Event): void {
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

    this.emit("change", { detail: { value: displayValue } });
  }

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
    this._renderRateEl(this.getSymbol, this.value);
    this.updateContainerClasslist();
    this._setRateStatus(this.value - 1);
  }

  $beforeUnmount(): void {
    this._hoverAbortController?.abort();
    this._hoverAbortController = undefined;
  }
}

export default EaRate;
