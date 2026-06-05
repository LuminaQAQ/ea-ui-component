import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query, listen } from "@decorator";
import { Enum } from "@utils/Enum";
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

/**
 * @summary 步骤条组件，引导用户按照流程完成任务的分步导航条。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-step
 *
 * @slot default - 默认插槽，用于放置 ea-step 子组件。
 *
 * @csspart container - 外层容器。
 *
 * @cssproperty --ea-step-tail-spacing - 每个 step 的间距。
 * @cssproperty --ea-steps-simple-padding - 简洁模式内边距。
 * @cssproperty --ea-steps-simple-bg-color - 简洁模式背景颜色。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaSteps extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

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

  /** 更新容器类名 */
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

  /** 根据 active 更新子 step 的 status */
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

  /** 更新简洁模式下的箭头图标 */
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

  /** 处理 slot 变化，同步子 step 状态 */
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
      <div class='${bem()}' part='container' role='list'>
        <slot></slot>
      </div>
    `;
  }

  @listen("slotchange", "slot")
  private _onSlotChange(): void {
    this._handleSlotChange();
  }

  $mount(): void {
    this.updateContainerClasslist();
  }
}

export default EaSteps;
