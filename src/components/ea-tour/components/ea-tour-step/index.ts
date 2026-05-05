import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { listen } from "@decorator/listen";
import { Enum } from "@/utils/Enum";
import "@/components/ea-icon/index";
import "@/components/ea-button/index";
import { EaTourCloseEvent } from "../../events/EaTourCloseEvent";
import stylesheet from "./index.scss?inline";
import html from "@/utils/html";

const TAG_NAME = "ea-tour-step" as const;
const bem = createBEM(TAG_NAME);

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaTourStep extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(bem.cb())
  private _container!: HTMLElement;

  @query(".ea-tour-step__header slot")
  private _title!: HTMLElement;

  @query("slot[name='indicator']")
  private _indicatorSlot!: HTMLSlotElement;

  @query(".ea-tour-step__next")
  private _nextBtn!: HTMLElement;

  @query(".ea-tour-step__previous")
  private _previousBtn!: HTMLElement;

  @query(".ea-tour-step__finish")
  private _finishBtn!: HTMLElement;

  @query(".ea-tour-step__close-icon")
  private _closeIcon!: HTMLElement;

  // ==================== 私有属性 ====================

  private _abortController?: AbortController;

  private get _hostContentTour(): HTMLElement | null {
    try {
      return this.closest("ea-tour");
    } catch {
      return null;
    }
  }

  // ==================== 属性定义 ====================

  @attribute({
    type: String,
    default: "",
    observer(this: EaTourStep, newVal: string) {
      this._title.textContent = newVal;
    },
  })
  heading: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaTourStep, newVal: string) {
      if (newVal === "") return;

      customElements.whenDefined("ea-tour-step").then(() => {
        if (!document.querySelector(newVal))
          return console.warn(
            `[EaTour] target ${newVal} not a valid element selector.`,
            this
          );
      });
    },
  })
  target: string = "";

  @attribute({
    type: Enum(["default", "primary"]),
    default: "default",
    observer(this: EaTourStep, newVal: "default" | "primary") {
      this._handleBtnTypeChange(newVal);
      this.updateContainerClasslist();
    },
  })
  variant: "default" | "primary" = "default";

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
    default: "bottom",
  })
  placement: string = "bottom";

  // ==================== 方法 ====================

  updateContainerClasslist(): string {
    const className = bem({
      primary: this.variant === "primary",
    });

    this._container.className = className;

    return className;
  }

  private _renderIndicators(tourItems: HTMLElement[]): string {
    return html(
      Array.from(tourItems, item => {
        const isActive = item === this ? "is-active" : "";
        return `<span class="ea-tour-step__indicator ${isActive}" part="indicator"></span>`;
      }).join("")
    );
  }

  private _handleBtnTypeChange = (type: "default" | "primary") => {
    const btns = [this._previousBtn, this._nextBtn, this._finishBtn];

    btns.forEach(btn => {
      if (type === "primary") {
        btn.setAttribute("variant", "primary");
      } else {
        btn.removeAttribute("variant");
      }
    });
  };

  html(): string {
    return `
      <div class='${bem()}' part='container'>
        <header class='ea-tour-step__header' part='header'>
          <slot name='header'></slot>
          <ea-icon class='ea-tour-step__close-icon' part='close-icon' name="xmark"></ea-icon>
        </header>
        <main class='ea-tour-step__content' part='content'>
          <slot></slot>
        </main>
        <footer class='ea-tour-step__footer' part='footer'>
          <div class='ea-tour-step__indicator-group' part='indicator-group'>
            <slot name='indicator'></slot>
          </div>
          <div class='ea-tour-step__switch-group' part='switch-group'>
            <slot name='footer'>
              <ea-button class="ea-tour-step__btn ea-tour-step__previous" part="previous">Previous</ea-button>
              <ea-button class="ea-tour-step__btn ea-tour-step__next" part="next">Next</ea-button>
              <ea-button class="ea-tour-step__btn ea-tour-step__finish" part="finish">Finish</ea-button>
            </slot>
          </div>
        </footer>
      </div>
    `;
  }

  // ==================== 事件处理 ====================

  @listen("click", ".ea-tour-step__close-icon")
  private _handleCloseIconClick() {
    const index = [...(this._hostContentTour?.children || [])].findIndex(
      item => item === this
    );
    this.dispatchEvent(
      new EaTourCloseEvent({
        current: index,
      })
    );
  }

  @listen("click", ".ea-tour-step__next")
  private _handleNextClick() {
    this.emit("next", { bubbles: true });
  }

  @listen("click", ".ea-tour-step__previous")
  private _handlePreviousClick() {
    this.emit("previous", { bubbles: true });
  }

  @listen("click", ".ea-tour-step__finish")
  private _handleFinishClick() {
    this.emit("finish", { bubbles: true });
  }

  // ==================== 生命周期 ====================

  updateIndicators(allSteps: HTMLElement[]): void {
    if (this._indicatorSlot) {
      this._indicatorSlot.innerHTML = this._renderIndicators(allSteps);
    }
  }

  async $mount() {
    await customElements.whenDefined("ea-tour");

    this._abortController?.abort();
    this._abortController = new AbortController();
  }

  $beforeUnmount(): void {
    this._abortController?.abort();
  }
}

export default EaTourStep;
