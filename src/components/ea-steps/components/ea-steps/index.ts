import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { listen } from "@decorator/listen";
import { Enum } from "@/utils/Enum";
import type { EaStep } from "../ea-step";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-steps" as const;
const bem = createBEM(TAG_NAME);

export type StepsProcessStatus =
  | "wait"
  | "process"
  | "finish"
  | "error"
  | "success";
export type StepsFinishStatus =
  | "wait"
  | "process"
  | "finish"
  | "error"
  | "success";
export type StepsDirection = "vertical" | "horizontal";

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaSteps extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(bem.cb())
  private _container!: HTMLElement;

  @query("slot")
  private _defaultSlot!: HTMLSlotElement;

  // ==================== 私有属性 ====================

  private _abortController?: AbortController;

  // ==================== 属性定义 ====================

  @attribute({
    type: String,
    default: "50%",
    observer(this: EaSteps, newVal: string) {
      this.style.setProperty("--ea-step-tail-spacing", newVal);
    },
  })
  space: string = "50%";

  @attribute({
    type: Number,
    default: 0,
    observer(this: EaSteps, newVal: number) {
      this._updateStepStatus(newVal);
    },
  })
  active: number = 0;

  @attribute({
    type: Enum(["wait", "process", "finish", "error", "success"]),
    default: "process",
  })
  processStatus: StepsProcessStatus = "process";

  @attribute({
    type: Enum(["wait", "process", "finish", "error", "success"]),
    default: "finish",
  })
  finishStatus: StepsFinishStatus = "finish";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaSteps, newVal: boolean) {
      const steps = [...this.querySelectorAll("ea-step")] as EaStep[];
      steps.forEach(step => {
        step.toggleAttribute("align-center", newVal);
      });
      this.updateContainerClasslist();
    },
  })
  alignCenter: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaSteps, newVal: boolean) {
      const steps = [...this.querySelectorAll("ea-step")] as EaStep[];
      steps.forEach(step => {
        step.toggleAttribute("simple", newVal);
      });

      this._updateSimpleStatus(newVal);
      this.updateContainerClasslist();
    },
  })
  simple: boolean = false;

  @attribute({
    type: Enum(["vertical", "horizontal"]),
    default: "horizontal",
    observer(this: EaSteps, newVal: StepsDirection) {
      const steps = [...this.querySelectorAll("ea-step")] as EaStep[];
      steps.forEach(step => {
        step.setAttribute("direction", newVal);
      });
    },
  })
  direction: StepsDirection = "horizontal";

  // ==================== 方法 ====================

  updateContainerClasslist(): string {
    const className = bem(
      {},
      {
        simple: this.simple,
        "align-center": this.alignCenter,
      }
    );

    if (this._container) this._container.className = className;

    return className;
  }

  private _updateStepStatus(active: number = this.active): void {
    const stepItems = [...this.querySelectorAll("ea-step")] as EaStep[];

    stepItems.forEach(item => {
      if (item.index < active) {
        item.setAttribute("status", this.finishStatus);
      } else if (item.index > active) {
        item.setAttribute("status", "wait");
      } else {
        item.setAttribute("status", this.processStatus);
      }
    });
  }

  private _updateSimpleStatus(isSimple: boolean = this.simple): void {
    const steps = [...this.querySelectorAll("ea-step")] as EaStep[];

    if (isSimple) {
      steps.forEach(item => {
        try {
          item.querySelector('[slot="simple-arrow"]')?.remove();
        } catch {
          /* empty */
        }

        try {
          const arrow = document.createElement("ea-icon");
          arrow.setAttribute("slot", "simple-arrow");
          arrow.setAttribute("name", "angle-right");
          arrow.part = "simple-arrow";
          item.appendChild(arrow);
        } catch {
          /* empty */
        }
      });
    } else {
      steps.forEach(item => {
        try {
          item.querySelector('[slot="simple-arrow"]')?.remove();
        } catch {
          /* empty */
        }
      });
    }
  }

  private _handleSlotChange = (): void => {
    const steps = [...this.querySelectorAll("ea-step")] as EaStep[];

    steps.forEach((step, index) => {
      step.index = index;
      step.toggleAttribute("first", index === 0);
      step.toggleAttribute("last", index === steps.length - 1);

      step.toggleAttribute("simple", this.simple);
      step.toggleAttribute("align-center", this.alignCenter);
      step.setAttribute("direction", this.direction);
    });

    this._updateStepStatus(this.active);
    this._updateSimpleStatus();
  };

  html(): string {
    return `
      <div class='${bem()}' part='container'>
        <slot></slot>
      </div>
    `;
  }

  // ==================== 事件处理 ====================

  @listen("slotchange", "slot")
  private _onSlotChange(): void {
    this._handleSlotChange();
  }

  // ==================== 生命周期 ====================

  $mount(): void {
    this.updateContainerClasslist();
  }

  $beforeUnmount(): void {
    this._abortController?.abort();
  }
}

export default EaSteps;
