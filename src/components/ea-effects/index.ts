import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, listen, query } from "@decorator";
import { html } from "@utils/html";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-effects" as const;
const bem = createBEM(TAG_NAME);

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaEffects extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  private _startController: AbortController | null = null;
  private _endController: AbortController | null = null;
  private _isPlaying = false;

  private _reduceMotion = false;
  private _reduceMotionMediaQuery: MediaQueryList | null = null;
  private _reduceMotionController: AbortController | null = null;

  @attribute({
    type: String,
    default: "",
    observer(this: EaEffects, newVal: string, oldVal: string) {
      if (newVal !== oldVal) {
        this.reset();
        this.visible ? this.show() : this.hide();
      }
    },
  })
  effect: string = "";

  @attribute({
    type: Boolean,
    default: true,
    observer(this: EaEffects, newVal: boolean) {
      newVal ? this.show() : this.hide();
    },
  })
  visible: boolean = true;

  @attribute({
    type: String,
    default: "",
    observer(this: EaEffects, newVal: string) {
      this._container?.style.setProperty("--ea-effects-duration", newVal || "");
    },
  })
  duration: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaEffects, newVal: string) {
      this._container?.style.setProperty("--ea-effects-delay", newVal || "");
    },
  })
  delay: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaEffects, newVal: string) {
      this._container?.style.setProperty(
        "--ea-effects-timing-function",
        newVal || ""
      );
    },
  })
  timingFunction: string = "";

  @attribute({
    type: Number,
    default: 1,
    observer(this: EaEffects, newVal: number) {
      this._container?.style.setProperty(
        "--ea-effects-iteration-count",
        String(newVal)
      );
    },
  })
  iteration: number = 1;

  reset(): void {
    this._startController?.abort();
    this._endController?.abort();
    this._startController = null;
    this._endController = null;
    this._isPlaying = false;

    if (this._container) {
      const effect = this.effect;
      this._container.classList.remove(
        bem.m(`${effect}-before-enter`),
        bem.m(`${effect}-enter`),
        bem.m(`${effect}-before-leave`),
        bem.m(`${effect}-leave`)
      );
    }
  }

  show(): void {
    if (this._reduceMotion) {
      this.reset();
      this._container?.style.removeProperty("display");
      this._container?.classList.remove(bem.m(`${this.effect}-leave`));
      return;
    }

    this.reset();

    this._startController = new AbortController();
    this._isPlaying = true;

    this._container.classList.add(bem.m(`${this.effect}-before-enter`));
    void this._container.offsetWidth;

    this._container.classList.remove(bem.m(`${this.effect}-before-enter`));
    this._container.classList.add(bem.m(`${this.effect}-enter`));
    void this._container.offsetWidth;

    this._container.addEventListener(
      "transitionend",
      () => {
        this._isPlaying = false;
        this._startController?.abort();
        this._startController = null;
      },
      { once: true, signal: this._startController.signal }
    );
  }

  hide(): void {
    if (this._reduceMotion) {
      this.reset();
      this._container?.style.setProperty("display", "none");
      return;
    }

    this.reset();

    this._endController = new AbortController();
    this._isPlaying = true;

    this._container.classList.add(bem.m(`${this.effect}-before-leave`));
    void this._container.offsetWidth;

    this._container.addEventListener(
      "transitionend",
      () => {
        this._container.classList.remove(bem.m(`${this.effect}-before-leave`));
        this._container.classList.add(bem.m(`${this.effect}-leave`));
        this._isPlaying = false;
        this._endController?.abort();
        this._endController = null;
      },
      { once: true, signal: this._endController.signal }
    );
  }

  toggle(): void {
    this.visible = !this.visible;
  }

  /** 更新容器类名 */
  updateContainerClasslist(): string {
    const className = bem({
      [this.effect]: !!this.effect,
    });

    if (this._container) {
      this._container.className = className;
    }

    return className;
  }

  html(): string {
    return `
      <div class="${this.updateContainerClasslist()}" part="container">
        <slot></slot>
      </div>
    `;
  }

  private _onReduceMotionChange = (e: MediaQueryListEvent) => {
    this._reduceMotion = e.matches;
    this.visible ? this.show() : this.hide();
  };

  $mount(): void {
    this._reduceMotionController?.abort();

    this._reduceMotionMediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    this._reduceMotion = this._reduceMotionMediaQuery.matches;

    this._reduceMotionController = new AbortController();
    this._reduceMotionMediaQuery.addEventListener(
      "change",
      this._onReduceMotionChange
    );
  }

  $beforeUnmount(): void {
    this._reduceMotionController?.abort();
    this._startController?.abort();
    this._endController?.abort();

    this._reduceMotionController = null;
    this._startController = null;
    this._endController = null;
  }
}
