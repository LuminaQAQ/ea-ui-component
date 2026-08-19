import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query } from "@decorator";
import { html } from "@utils/html";
import stylesheet from "./index.scss?inline";
import effectsMeta from "./constants/effects";

const TAG_NAME = "ea-effects" as const;
const bem = createBEM(TAG_NAME);

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaEffects extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @query(bem.ce("content"))
  private _content!: HTMLElement;

  private _startController: AbortController | null = null;
  private _endController: AbortController | null = null;
  private _isPlaying = false;

  private _reduceMotion = false;

  @attribute({
    type: String,
    default: "",
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

  @attribute({ type: String, default: "" })
  duration: string = "";

  @attribute({ type: String, default: "" })
  delay: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaEffects, newVal: string) {
      this._container.style.setProperty(
        "--ea-effects-timing-function",
        newVal || ""
      );
    },
  })
  timingFunction: string = "";

  @attribute({ type: Number, default: 1 })
  iteration: number = 1;

  @attribute({ type: String, default: "normal" })
  direction: string = "normal";

  @attribute({ type: String, default: "none" })
  fill: string = "none";

  @attribute({ type: Boolean, default: false })
  repeat: boolean = false;

  @attribute({ type: Boolean, default: false })
  once: boolean = false;

  reset(): void {
    this._startController?.abort();
    this._endController?.abort();
    this._startController = null;
    this._endController = null;
    this._isPlaying = false;

    this._container.classList.remove(
      bem.m(`${this.effect}-before-leave`),
      bem.m(`${this.effect}-leave`),
      bem.m(`${this.effect}-after-leave`),
      bem.m(`${this.effect}-enter`)
    );
  }

  show(): void {
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
    this.visible = this.visible === true ? false : true;
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

  $mount(): void {}

  $beforeUnmount(): void {
    this._startController?.abort();
    this._endController?.abort();
    this._startController = null;
    this._endController = null;
  }
}
