import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { Enum } from "@/utils/Enum";
import stylesheet from "./index.scss?inline";
import "@/components/ea-icon/index";

const TAG_NAME = "ea-step" as const;
const bem = createBEM(TAG_NAME);

export type StepStatus =
  | ""
  | "wait"
  | "process"
  | "finish"
  | "error"
  | "success";
export type StepDirection = "vertical" | "horizontal";

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaStep extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(bem.cb())
  private _container!: HTMLElement;

  @query(bem.ce("icon"))
  private _stepIcon!: HTMLElement;

  @query('slot[name="heading"]')
  private _headingSlot!: HTMLElement;

  @query('slot[name="description"]')
  private _descriptionSlot!: HTMLElement;

  // ==================== 私有属性 ====================

  private _abortController?: AbortController;

  private get _hostContextSteps(): HTMLElement | null {
    try {
      return this.closest("ea-steps");
    } catch {
      return null;
    }
  }

  // ==================== 属性定义 ====================

  @attribute({
    type: String,
    default: "",
    observer(this: EaStep, newVal: string) {
      this._headingSlot.textContent = newVal;
    },
  })
  heading: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaStep, newVal: string) {
      this._descriptionSlot.textContent = newVal;
    },
  })
  description: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaStep, newVal: string) {
      this._stepIcon.setAttribute("name", newVal);
    },
  })
  icon: string = "";

  @attribute({
    type: Enum(["", "wait", "process", "finish", "error", "success"]),
    default: "",
    observer(this: EaStep, newVal: StepStatus) {
      this.updateContainerClasslist();
      if (this.icon) return;
      this._updateStatus(newVal);
    },
  })
  status: StepStatus = "";

  @attribute({
    type: Number,
    default: 0,
  })
  index: number = 0;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaStep) {
      this.updateContainerClasslist();
    },
  })
  simple: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaStep) {
      this.updateContainerClasslist();
    },
  })
  alignCenter: boolean = false;

  @attribute({
    type: String,
    default: "horizontal",
    observer(this: EaStep) {
      this.updateContainerClasslist();
    },
  })
  direction: StepDirection = "horizontal";

  // ==================== 方法 ====================

  updateContainerClasslist(): string {
    const stepList = this._hostContextSteps?.querySelectorAll("ea-step");
    const isLast = stepList ? stepList.length - 1 === this.index : false;

    const className = bem(
      {
        [this.direction]: !!this.direction,
      },
      {
        [this.status]: !!this.status,
        "align-center": this.alignCenter,
        icon: !!this.icon,
        simple: this.simple,
        last: isLast,
        first: this.index === 0,
      }
    );

    if (this._container) this._container.className = className;

    return className;
  }

  private _updateStatus(status: StepStatus = this.status): void {
    if (status === this._hostContextSteps?.getAttribute("finish-status")) {
      this._stepIcon.setAttribute("name", "check");
      this._stepIcon.textContent = "";
    } else {
      this._stepIcon.setAttribute("name", "");
      this._stepIcon.textContent = String(this.index + 1);
    }
  }

  html(): string {
    return `
      <div class='${bem()}' part='container'>
        <section class="${bem.e("head")}" part="head">
          <div class="${bem.e("icon-wrapper")}" part="icon-wrapper">
            <slot name="icon">
              <ea-icon class="${bem.e("icon")}" part="icon"></ea-icon>
            </slot>
          </div>
          <div class="${bem.e("tail")}" part="tail"></div>
        </section>
        <section class="${bem.e("main")}" part="main">
          <div class="${bem.e("heading")}" part="heading">
            <slot name="heading"></slot>
          </div>
          <div class="${bem.e("description")}" part="description">
            <slot name="description"></slot>
          </div>
        </section>
        <span class="${bem.e("simple-arrow")}" part="simple-arrow">
          <slot name="simple-arrow"></slot>
        </span>
      </div>
    `;
  }

  // ==================== 生命周期 ====================

  $mount(): void {
    this.updateContainerClasslist();
  }

  $beforeUnmount(): void {
    this._abortController?.abort();
  }
}

export default EaStep;
