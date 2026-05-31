import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query } from "@decorator";
import { Enum } from "@utils/Enum";
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

/**
 * @summary 步骤条子组件，表示单个步骤，支持状态、图标、描述等功能。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-icon
 *
 * @slot icon - 自定义图标内容。
 * @slot heading - 自定义标题内容。
 * @slot description - 自定义描述内容。
 * @slot simple-arrow - 简洁模式下的箭头内容。
 * @slot default - 默认插槽。
 *
 * @csspart container - 外层容器。
 * @csspart head - 头部容器（包含图标与连接线）。
 * @csspart icon-wrapper - 图标包裹容器。
 * @csspart icon - 图标元素。
 * @csspart tail - 步骤之间的连接线。
 * @csspart main - 主体容器。
 * @csspart heading - 标题容器。
 * @csspart description - 描述容器。
 * @csspart simple-arrow - 简洁模式下的箭头容器。
 *
 * @cssproperty --ea-step-icon-border-radius - 图标圆角。
 * @cssproperty --ea-step-icon-wrapper-size - 图标容器尺寸。
 * @cssproperty --ea-step-icon-size - 图标字体大小。
 * @cssproperty --ea-step-arrow-icon-size - 箭头图标大小。
 * @cssproperty --ea-step-tail-size - 连接线粗细。
 * @cssproperty --ea-step-process-color - 进行中状态颜色。
 * @cssproperty --ea-step-wait-color - 等待状态颜色。
 * @cssproperty --ea-step-finish-color - 已完成状态颜色。
 * @cssproperty --ea-step-success-color - 成功状态颜色。
 * @cssproperty --ea-step-error-color - 错误状态颜色。
 * @cssproperty --ea-step-tail-color - 连接线颜色。
 * @cssproperty --ea-step-icon-bg-color - 图标背景颜色。
 * @cssproperty --ea-step-icon-font-weight - 图标字体粗细。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaStep extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @query(bem.ce("icon"))
  private _stepIcon!: HTMLElement;

  @query('slot[name="heading"]')
  private _headingSlot!: HTMLElement;

  @query('slot[name="description"]')
  private _descriptionSlot!: HTMLElement;

  private get _hostContextSteps(): HTMLElement | null {
    try {
      return this.closest("ea-steps");
    } catch {
      return null;
    }
  }

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

  /** 更新容器类名 */
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

  /** 根据 status 更新图标显示 */
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

  $mount(): void {
    this.updateContainerClasslist();
  }
}

export default EaStep;
