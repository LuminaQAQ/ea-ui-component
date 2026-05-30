import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, property, query } from "@decorator";
import { html } from "@utils/html";
import { Enum } from "@utils/Enum";
import { circleItem } from "./components/circleItem";
import { dashboardItem } from "./components/dashboardItem";
import { EaProgressChangeEvent } from "./events/EaProgressChangeEvent";
import "@/components/ea-icon/index";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-progress" as const;
const bem = createBEM(TAG_NAME);

const PROGRESS_VARIANT_TYPES = ["line", "circle", "dashboard"] as const;
type ProgressVariant = (typeof PROGRESS_VARIANT_TYPES)[number];

const PROGRESS_STATUS_TYPES = ["success", "warning", "exception"] as const;
type ProgressStatus = (typeof PROGRESS_STATUS_TYPES)[number] | "";

type ProgressColorItem = { color: string; percentage: number };
type ProgressColor =
  | string
  | ProgressColorItem[]
  | ((percentage: number) => string);

const STATUS_ICON_MAP: Record<string, string> = {
  success: "circle-check",
  warning: "triangle-exclamation",
  exception: "circle-xmark",
};

/**
 * @summary 进度条组件，用于展示操作进度，支持直线、环形和仪表盘三种形态。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-icon
 *
 * @slot default - 默认插槽，用于自定义进度条内容（如环形中心文案或按钮）。
 *
 * @event change - 进度百分比变化时触发，detail: `{ percentage: number }`。
 *
 * @csspart container - 容器元素。
 * @csspart track - 轨道元素。
 * @csspart path - 进度路径元素。
 * @csspart percentage - 百分比文本容器。
 * @csspart status-icon - 状态图标元素。
 *
 * @cssproperty --ea-progress-percentage - 进度百分比值。
 * @cssproperty --ea-progress-stroke-width - 进度条宽度。
 * @cssproperty --ea-progress-default-color - 默认颜色。
 * @cssproperty --ea-progress-success-color - 成功状态颜色。
 * @cssproperty --ea-progress-exception-color - 异常状态颜色。
 * @cssproperty --ea-progress-warning-color - 警告状态颜色。
 * @cssproperty --ea-progress-percentage-color - 百分比文字颜色。
 * @cssproperty --ea-progress-track-color - 轨道颜色。
 * @cssproperty --ea-progress-path-color - 进度路径颜色。
 * @cssproperty --ea-progress-size - 环形/仪表盘尺寸。
 * @cssproperty --ea-progress-animation-duration - 动画持续时间。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaProgress extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @query(bem.ce("track"))
  private _track!: HTMLElement;

  @query(bem.ce("path"))
  private _path!: HTMLElement;

  @query(bem.ce("percentage-wrapper"))
  private _percentageWrapper!: HTMLElement;

  @query(bem.ce("percentage"))
  private _text!: HTMLElement;

  @attribute({
    type: Enum(PROGRESS_VARIANT_TYPES),
    default: "line",
    observer(this: EaProgress) {
      this._render();
      this.updateContainerClasslist();
      this._updatePercentage();
    },
  })
  variant: ProgressVariant = "line";

  @attribute({
    type: Number,
    default: 0,
    observer(this: EaProgress, newVal: number) {
      this._updatePercentage(newVal);
    },
  })
  percentage: number = 0;

  @attribute({
    type: Enum(PROGRESS_STATUS_TYPES),
    default: "",
    observer(this: EaProgress) {
      this.updateContainerClasslist();
      this._updateStatusText();
    },
  })
  status: ProgressStatus = "";

  @attribute({
    type: String,
    default: "8px",
    observer(this: EaProgress, newVal: string) {
      if (!CSS.supports("width", newVal))
        return console.warn(
          `[EaProgress] The width value ${newVal} is not supported.`
        );

      this._container?.style.setProperty("--ea-progress-stroke-width", newVal);
    },
  })
  strokeWidth: string = "8px";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaProgress, newVal: boolean) {
      try {
        if (newVal) {
          this._path?.appendChild(this._text);
        } else {
          this._percentageWrapper?.appendChild(this._text);
        }
      } catch {
        /* empty */
      }

      this.updateContainerClasslist();
    },
  })
  textInside: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaProgress) {
      this.updateContainerClasslist();
    },
  })
  indeterminate: boolean = false;

  @attribute({
    type: Number,
    default: 3,
    observer(this: EaProgress, newVal: number) {
      this._container?.style.setProperty(
        "--ea-progress-animation-duration",
        `${newVal}s`
      );
    },
  })
  duration: number = 3;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaProgress) {
      this.updateContainerClasslist();
    },
  })
  striped: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaProgress) {
      this.updateContainerClasslist();
    },
  })
  stripedFlow: boolean = false;

  @attribute({
    type: String,
    default: "126px",
    observer(this: EaProgress, newVal: string) {
      if (this.variant === "line") return;

      this._container?.style.setProperty("--ea-progress-size", newVal);
    },
  })
  size: string = "126px";

  @attribute({
    type: Boolean,
    default: true,
    observer(this: EaProgress) {
      this.updateContainerClasslist();
    },
  })
  showText: boolean = true;

  @property({
    type: Object,
    default: "",
    observer(this: EaProgress, newVal: any) {
      this._handleColorChange(newVal, newVal);
    },
  })
  color: ProgressColor = "";

  updateContainerClasslist(): string {
    const className = bem(
      {
        [this.status]: !!this.status,
        "text-inside": this.textInside,
        striped: this.striped,
      },
      {
        [this.variant]: true,
        indeterminate: this.indeterminate && this.variant === "line",
        "striped-flow": this.stripedFlow,
        "show-text": this.showText,
      }
    );

    if (this._container) this._container.className = className;

    return className;
  }

  /** 处理颜色变更，支持字符串、数组和函数三种格式 */
  private _handleColorChange(
    color: ProgressColor,
    percentage: number = this.percentage
  ): void {
    if (!color || typeof color === "undefined") return;

    if (Array.isArray(color)) {
      let nearItem = color[0];

      for (let i = 0; i < color.length; i++) {
        const item = color[i];

        if (percentage <= item.percentage) {
          nearItem = item;

          break;
        }
      }

      this._path?.style.setProperty(
        "--ea-progress-path-color",
        nearItem?.color
      );
    } else if (typeof color === "string") {
      this._path?.style.setProperty("--ea-progress-path-color", color);
    } else if (typeof color === "function") {
      this._path?.style.setProperty(
        "--ea-progress-path-color",
        color(percentage)
      );
    }
  }

  /** 更新状态文本或图标 */
  private _updateStatusText(): void {
    if (
      ["success", "exception", "warning"].includes(this.status) &&
      !this.textInside
    ) {
      this._text.innerHTML = html(
        `<ea-icon class="${bem.e("status")}" name="${STATUS_ICON_MAP[this.status]}" part="status-icon"></ea-icon>`
      );
    } else {
      this._text.textContent = this.percentage + "%";
    }
  }

  /** 更新进度百分比相关的样式和事件 */
  private _updatePercentage(newVal: number = this.percentage): void {
    if (newVal < 0) {
      this.percentage = 0;
      return;
    } else if (newVal > 100) {
      this.percentage = 100;
      return;
    }

    const percentageSlot = this.querySelector("[data-percentage]");
    const strategies: Record<string, () => string> = {
      line: () => newVal + "%",
      circle: () => 302 * ((100 - newVal) / 100) + "px",
      dashboard: () => {
        const width = Number(this.strokeWidth.replace("px", ""));
        const r = 49 - width / 2;
        const C = 2 * Math.PI * r;
        const progress = (100 - newVal) / 100;

        this._path.style.strokeDasharray = C * (270 / 360) + "px";
        this._track.style.strokeDasharray = C * (270 / 360) + "px";

        return C * (270 / 360) * progress + "px";
      },
    };

    this._container?.style.setProperty(
      "--ea-progress-percentage",
      strategies[this.variant]()
    );

    this._updateStatusText();

    if (percentageSlot) {
      percentageSlot.textContent = String(this.percentage);
    }

    this._handleColorChange(this.color, newVal);

    this.dispatchEvent(new EaProgressChangeEvent({ percentage: newVal }));
  }

  /** 根据 variant 重新渲染内部结构 */
  private _render(): void {
    if (!this._container) return;

    const itemOptions: Record<string, string> = {
      line: this._lineTemplate(),
      circle: circleItem,
      dashboard: dashboardItem,
    };

    this._container.innerHTML = itemOptions[this.variant];

    this.updateContainerClasslist();
  }

  /** 生成 line 类型的模板 */
  private _lineTemplate(): string {
    return `
      <section class="${bem.e("track")}" part="track">
        <section class="${bem.e("path")}" part="path"></section>
      </section>
      <section class="${bem.e("percentage-wrapper")}" part="percentage">
        <slot class="${bem.e("percentage")}"></slot>
      </section>
    `;
  }

  html(): string {
    const itemOptions: Record<string, string> = {
      line: this._lineTemplate(),
      circle: circleItem,
      dashboard: dashboardItem,
    };

    return `
      <div class="${this.updateContainerClasslist()}" part="container">
        ${itemOptions[this.variant]}
      </div>
    `;
  }

  $mount(): void {
    const colorAttr = this.getAttribute("color");
    if (colorAttr && !this.color) {
      this.color = colorAttr;
    }

    this.updateContainerClasslist();
  }
}

export default EaProgress;
