import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import stylesheet from "./index.scss?inline";
import { Enum } from "@/utils/Enum";
import { VARIANT_TYPES, type VariantType } from "@/constants/variant";

const TAG_NAME = "ea-badge" as const;
const bem = createBEM(TAG_NAME);

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaBadge extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(".ea-badge")
  private _container!: HTMLElement;

  @query(".ea-badge__content")
  private _content!: HTMLElement;

  // ==================== 属性定义 ====================

  @attribute({
    type: String,
    default: "",
    observer(this: EaBadge, newVal: string) {
      if (this.isDot) return;
      this._updateContent(newVal);
    },
  })
  value: string = "";

  @attribute({
    type: Number,
    default: Infinity,
    observer() {},
  })
  max: number = Infinity;

  @attribute({
    type: Enum(VARIANT_TYPES),
    default: "danger",
    observer(this: EaBadge) {
      this.updateContainerClasslist();
    },
  })
  variant: VariantType = "danger";

  @attribute({
    type: String,
    default: "",
    observer(this: EaBadge, newVal: string) {
      this.style.setProperty("--ea-badge-color", newVal);
    },
  })
  color: string = "";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaBadge) {
      this.updateContainerClasslist();
    },
  })
  isDot: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaBadge, newVal: boolean) {
      this._content.ariaHidden = String(newVal);
      this._content.hidden = newVal;
      this.updateContainerClasslist();
    },
  })
  dataHidden: boolean = false;

  @attribute({
    type: Number,
    default: 0,
    observer(this: EaBadge, newVal: number) {
      this.style.setProperty("--ea-badge-offset-x", -newVal + "px");
    },
  })
  offsetX: number = 0;

  @attribute({
    type: Number,
    default: 0,
    observer(this: EaBadge, newVal: number) {
      this.style.setProperty("--ea-badge-offset-y", newVal + "px");
    },
  })
  offsetY: number = 0;

  @attribute({
    type: Boolean,
    default: true,
    observer(this: EaBadge) {
      this.updateContainerClasslist();
    },
  })
  showZero: boolean = true;

  // ==================== 方法 ====================

  /**
   * 更新容器类名
   */
  updateContainerClasslist(): string {
    const isHidden =
      this.dataHidden || (!this.showZero && Number(this.value) === 0);

    const className = bem(
      {
        [this.variant]: true,
      },
      {
        dot: this.isDot,
        hidden: isHidden,
      }
    );

    const container = this.shadowRoot?.querySelector(bem.cb()) as HTMLElement;
    if (container) {
      container.className = className;
    }

    return className;
  }

  /**
   * 计算显示值
   */
  private _computedValue(value: string): string {
    if (!this.showZero && Number(value) === 0) {
      return "";
    }

    const numValue = Number(value);
    if (!isNaN(numValue) && numValue > this.max) {
      return `${this.max}+`;
    }

    return value;
  }

  /**
   * 更新内容显示
   */
  private _updateContent(value: string): void {
    const computedValue = this._computedValue(value);

    const contentTextEl = this.shadowRoot?.querySelector("[data-value]");
    if (contentTextEl) {
      contentTextEl.textContent = computedValue;
      return;
    }

    const contentSlot = this.querySelector("[slot='content']");
    if (!contentSlot) {
      this._content.textContent = computedValue;
      return;
    }

    const cloned = contentSlot.cloneNode(true) as HTMLElement;
    const valueEl = cloned.querySelector("[data-value]");
    if (valueEl) {
      valueEl.textContent = computedValue;
    }

    this._content.innerHTML = cloned.innerHTML;
  }

  /**
   * 渲染模板
   */
  html(): string {
    return `
      <div class="${bem()}" part="container">
        <sup class="${bem.e("content")}" part="content"></sup>
        <slot></slot>
      </div>
    `;
  }

  // ==================== 生命周期 ====================

  $mount(): void {
    this.updateContainerClasslist();
    if (!this.isDot) {
      this._updateContent(this.value);
    }
  }
}
