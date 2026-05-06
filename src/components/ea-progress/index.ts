import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { property } from "@decorator/property";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { Enum } from "@/utils/Enum";
import { html as sanitizeHtml } from "@utils/html";
import { circleItem } from "./components/circleItem";
import { dashboardItem } from "./components/dashboardItem";
import "@/components/ea-icon/index";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-progress" as const;
const bem = createBEM(TAG_NAME);

export type ProgressType = "line" | "circle" | "dashboard";
export type ProgressStatus = "success" | "warning" | "exception" | "";
export type ProgressColorItem = { color: string; percentage: number };
export type ProgressColor =
  | string
  | ProgressColorItem[]
  | ((percentage: number) => string);

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaProgress extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(".ea-progress")
  private _container!: HTMLElement;

  @query(".ea-progress__track")
  private _track!: HTMLElement;

  @query(".ea-progress__path")
  private _path!: HTMLElement;

  @query(".ea-progress__percentage-wrapper")
  private _percentageWrapper!: HTMLElement;

  @query(".ea-progress__percentage")
  private _text!: HTMLElement;

  // ==================== 属性定义 ====================

  @attribute({
    type: Enum(["line", "circle", "dashboard"]),
    default: "line",
    observer(this: EaProgress) {
      this._render();
      this.updateContainerClasslist();
      this._updatePercentage();
    },
  })
  type: ProgressType = "line";

  @attribute({
    type: Number,
    default: 0,
    observer(this: EaProgress, newVal: number) {
      this._updatePercentage(newVal);
    },
  })
  percentage: number = 0;

  @attribute({
    type: Enum(["success", "warning", "exception"]),
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
      if (this.type === "line") return;

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

  // ==================== @property 属性（JS-only） ====================

  @property({
    type: Object,
    default: "",
    observer(this: EaProgress, newVal: any) {
      this._handleColorChange(newVal, newVal);
    },
  })
  color: ProgressColor = "";

  // ==================== 方法 ====================

  updateContainerClasslist(): string {
    const className = bem(
      {
        [this.status]: !!this.status,
        "text-inside": this.textInside,
        striped: this.striped,
      },
      {
        [this.type]: true,
        indeterminate: this.indeterminate && this.type === "line",
        "striped-flow": this.stripedFlow,
        "show-text": this.showText,
      }
    );

    if (this._container) this._container.className = className;

    return className;
  }

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

  private _updateStatusText(): void {
    const statusIcon: Record<string, string> = {
      success: "circle-check",
      warning: "triangle-exclamation",
      exception: "circle-xmark",
    };

    if (
      ["success", "exception", "warning"].includes(this.status) &&
      !this.textInside
    ) {
      this._text.innerHTML = sanitizeHtml(
        `<ea-icon class="ea-progress__status" name="${statusIcon[this.status]}" part="status-icon"></ea-icon>`
      );
    } else {
      this._text.textContent = this.percentage + "%";
    }
  }

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
      strategies[this.type]()
    );

    this._updateStatusText();

    if (percentageSlot) {
      percentageSlot.textContent = String(this.percentage);
    }

    this._handleColorChange(this.color, newVal);

    this.emit("change", {
      detail: {
        percentage: newVal,
      },
    });
  }

  private _render(): void {
    if (!this._container) return;

    const itemOptions: Record<string, string> = {
      line: `
        <section class="ea-progress__track" part="track">
          <section class="ea-progress__path" part="path"></section>
        </section>
        <section class="ea-progress__percentage-wrapper" part="percentage">
          <slot class="ea-progress__percentage"></slot>
        </section>
      `,
      circle: circleItem,
      dashboard: dashboardItem,
    };

    this._container.innerHTML = itemOptions[this.type];

    this.updateContainerClasslist();
  }

  html(): string {
    const itemOptions: Record<string, string> = {
      line: `
        <section class="ea-progress__track" part="track">
          <section class="ea-progress__path" part="path"></section>
        </section>
        <section class="ea-progress__percentage-wrapper" part="percentage">
          <slot class="ea-progress__percentage"></slot>
        </section>
      `,
      circle: circleItem,
      dashboard: dashboardItem,
    };

    return `
      <div class="${bem()}" part="container">
        ${itemOptions[this.type]}
      </div>
    `;
  }

  // ==================== 生命周期 ====================

  $mount(): void {
    const colorAttr = this.getAttribute("color");
    if (colorAttr && !this.color) {
      this.color = colorAttr;
    }

    this.updateContainerClasslist();
  }
}

export default EaProgress;
