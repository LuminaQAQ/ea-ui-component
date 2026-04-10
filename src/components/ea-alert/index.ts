import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { listen } from "@decorator/listen";
import { timeout } from "@utils/timeout";
import { html } from "@utils/html";
import stylesheet from "./index.scss?inline";

const faIconType: Record<string, string> = {
  primary: "circle-info",
  success: "circle-check",
  info: "circle-info",
  warning: "triangle-exclamation",
  error: "circle-xmark",
};

const TAG_NAME = "ea-alert" as const;
const bem = createBEM(TAG_NAME);

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaAlert extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(".ea-alert")
  private _container!: HTMLElement;

  @query('.ea-alert__icon-wrap slot[name="icon"]')
  private _alertIcon!: HTMLElement;

  @query('.ea-alert__heading slot[name="heading"]')
  private _alertHeading!: HTMLElement;

  @query(".ea-alert__description slot")
  private _alertDescription!: HTMLElement;

  @query(".ea-alert__close-btn")
  private _alertCloseBtn!: HTMLElement;

  private _transitionAbortController?: AbortController;

  // ==================== 属性定义 ====================

  @attribute({
    type: String,
    default: "",
    observer(this: EaAlert, newVal: string) {
      this._alertHeading.innerHTML = html(newVal);
    },
  })
  heading: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaAlert, newVal: string) {
      this._alertDescription.innerHTML = html(newVal) || "<slot></slot>";
    },
  })
  description: string = "";

  @attribute({
    type: String,
    default: "info",
    observer(this: EaAlert, newVal: string) {
      this.updateContainerClasslist();
      if (this["show-icon"]) {
        this._alertIcon.innerHTML = html(
          `<ea-icon class="ea-alert__icon" name="${faIconType[newVal]}" part="icon"></ea-icon>`
        );
      }
    },
  })
  type: string = "info";

  @attribute({
    type: String,
    default: "light",
    observer(this: EaAlert) {
      this.updateContainerClasslist();
    },
  })
  effect: string = "light";

  @attribute({
    type: String,
    default: "",
    observer(this: EaAlert, newVal: string) {
      this._alertCloseBtn.textContent = newVal;
    },
  })
  "close-text": string = "";

  @attribute({
    type: Boolean,
    default: true,
    observer(this: EaAlert, newVal: boolean) {
      this._alertCloseBtn.innerHTML = newVal
        ? html(this["close-text"]) ||
          `<ea-icon class="ea-alert__close-icon" name="xmark" part="close-icon"></ea-icon>`
        : "";
    },
  })
  closable: boolean = true;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaAlert) {
      this._alertIcon.innerHTML = html(
        `<ea-icon class="ea-alert__icon" name="${faIconType[this.type]}" part="icon"></ea-icon>`
      );
    },
  })
  "show-icon": boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaAlert) {
      this.updateContainerClasslist();
    },
  })
  center: boolean = false;

  @attribute({
    type: Number,
    default: 0,
    observer(this: EaAlert, newVal: number) {
      newVal = Math.abs(newVal);
      this._container.classList.toggle("ea-alert--hide", newVal > 0);

      timeout(() => {
        this.emit("open");
        this._container.classList.remove("ea-alert--hide");
      }, newVal);
    },
  })
  "show-after": number = 0;

  @attribute({
    type: Number,
    default: 0,
    observer(this: EaAlert, newVal: number) {
      if (newVal && this.hasAttribute("auto-close")) {
        console.log(this);

        timeout(() => this._handleClose(), newVal);
      }
    },
  })
  "auto-close": number = 0;

  // ==================== 方法 ====================

  /**
   * 更新容器类名
   */
  updateContainerClasslist(): string {
    const className = bem(
      { [this.type]: true, [this.effect]: true },
      { center: this.center }
    );
    this._container.className = className;
    return className;
  }

  /**
   * 渲染模板
   */
  html(): string {
    const closeContent = this.closable
      ? this["close-text"] ||
        `<ea-icon class="ea-alert__close-icon" name="xmark" part="close-icon"></ea-icon>`
      : "";

    return `
      <div class='ea-alert' part='container'>
        <span class="ea-alert__icon-wrap" part='icon-wrap'>
          <slot name='icon'></slot>
        </span>
        <div class="ea-alert__content" part='content-wrap'>
          <span class="ea-alert__heading" part='heading'>
            <slot name="heading"></slot>
          </span>
          <p class="ea-alert__description" part='description'>
            <slot></slot>
          </p>
          <span class="ea-alert__close-btn" part="close-btn">${closeContent}</span>
        </div>
      </div>
    `;
  }

  /**
   * 关闭事件处理
   */
  @listen("click", ".ea-alert__close-btn")
  private _handleClose() {
    if (!this.closable && this["auto-close"] <= 0) return;

    this._container.classList.add("ea-alert--before-close");

    this._transitionAbortController?.abort();
    this._transitionAbortController = new AbortController();

    const onTransitionEnd = () => {
      this.emit("close", { detail: { visible: false } });
      this._transitionAbortController?.abort();
      this.remove();
    };

    this._container.addEventListener("transitionend", onTransitionEnd, {
      signal: this._transitionAbortController.signal,
      once: true,
    });
  }

  // ==================== 生命周期 ====================

  $mount(): void {
    this.updateContainerClasslist();
  }

  $beforeUnmount(): void {
    this._transitionAbortController?.abort();
  }
}
