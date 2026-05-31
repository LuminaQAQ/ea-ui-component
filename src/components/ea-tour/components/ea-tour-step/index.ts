import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query, listen } from "@decorator";
import { html } from "@utils/html";
import { Enum } from "@utils/Enum";
import "@/components/ea-icon/index";
import "@/components/ea-button/index";
import { EaTourCloseEvent } from "../../events/EaTourCloseEvent";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-tour-step" as const;
const bem = createBEM(TAG_NAME);

const PLACEMENT_TYPES = [
  "top", "top-start", "top-end",
  "bottom", "bottom-start", "bottom-end",
  "left", "left-start", "left-end",
  "right", "right-start", "right-end",
] as const;

type PlacementType = (typeof PLACEMENT_TYPES)[number];

/**
 * @summary 引导步骤组件，用于定义引导的每个步骤内容、标题和位置，支持自定义插槽。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-icon
 * @dependency ea-button
 *
 * @slot default - 步骤描述内容。
 * @slot header - 自定义头部内容。
 * @slot indicator - 自定义指示器内容。
 * @slot footer - 自定义底部按钮区域。
 *
 * @event ea-close - 关闭当前步骤时触发，detail: `{ current: number }`。
 *
 * @csspart container - 步骤根容器元素。
 * @csspart header - 头部区域元素。
 * @csspart close-icon - 关闭图标元素。
 * @csspart content - 内容区域元素。
 * @csspart footer - 底部区域元素。
 * @csspart indicator-group - 指示器容器元素。
 * @csspart indicator - 单个指示器元素。
 * @csspart switch-group - 按钮容器元素。
 * @csspart previous - 上一步按钮元素。
 * @csspart next - 下一步按钮元素。
 * @csspart finish - 完成按钮元素。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaTourStep extends EaBase {
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

  private _abortController?: AbortController;

  private get _hostContentTour(): HTMLElement | null {
    try {
      return this.closest("ea-tour");
    } catch {
      return null;
    }
  }

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
    type: Enum(PLACEMENT_TYPES),
    default: "bottom",
  })
  placement: PlacementType = "bottom";

  /** 更新容器类名 */
  updateContainerClasslist(): string {
    const className = bem({
      primary: this.variant === "primary",
    });

    this._container.className = className;

    return className;
  }

  /**
   * 渲染指示器 HTML
   * @param tourItems - 所有步骤元素数组
   * @returns 指示器 HTML 字符串
   */
  private _renderIndicators(tourItems: HTMLElement[]): string {
    return html(
      Array.from(tourItems, item => {
        const isActive = item === this ? "is-active" : "";
        return `<span class="ea-tour-step__indicator ${isActive}" part="indicator"></span>`;
      }).join("")
    );
  }

  /**
   * 更新按钮类型
   * @param type - 按钮样式类型
   */
  private _handleBtnTypeChange(type: "default" | "primary"): void {
    const btns = [this._previousBtn, this._nextBtn, this._finishBtn];

    btns.forEach(btn => {
      if (type === "primary") {
        btn.setAttribute("variant", "primary");
      } else {
        btn.removeAttribute("variant");
      }
    });
  }

  /** 渲染模板 */
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

  /** 处理关闭图标点击事件 */
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

  /** 处理下一步按钮点击事件 */
  @listen("click", ".ea-tour-step__next")
  private _handleNextClick() {
    this.emit("ea-tour-step-next", { bubbles: true });
  }

  /** 处理上一步按钮点击事件 */
  @listen("click", ".ea-tour-step__previous")
  private _handlePreviousClick() {
    this.emit("ea-tour-step-previous", { bubbles: true });
  }

  /** 处理完成按钮点击事件 */
  @listen("click", ".ea-tour-step__finish")
  private _handleFinishClick() {
    this.emit("ea-tour-step-finish", { bubbles: true });
  }

  /**
   * 更新步骤指示器
   * @param allSteps - 所有步骤元素数组
   */
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
