import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query } from "@decorator";
import { Enum } from "@/utils/Enum";
import { VARIANT_TYPES, type VariantType } from "@/constants/variant";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-badge" as const;
const bem = createBEM(TAG_NAME);
const BADGE_VARIANT_DEFAULT = "danger";

/**
 * @summary 徽标组件，出现在按钮、图标旁的数字或状态标记，支持多种类型、最大值和小圆点模式。
 * @status stable
 * @since 3.0
 *
 * @slot default - 默认插槽，徽标定位的参考元素（如按钮、图标等）。
 * @slot content - 自定义徽标内容，内部使用 `data-value` 标记值显示位置。
 *
 * @csspart container - 外层容器元素。
 * @csspart content - 徽标显示值的容器元素。
 *
 * @cssproperty --ea-badge-color - 徽标背景颜色。
 * @cssproperty --ea-badge-text-color - 徽标文字颜色。
 * @cssproperty --ea-badge-font-size - 徽标文字大小。
 * @cssproperty --ea-badge-size - 徽标高度。
 * @cssproperty --ea-badge-dot-size - 小圆点尺寸。
 * @cssproperty --ea-badge-spacing - 徽标内边距。
 * @cssproperty --ea-badge-border-radius - 徽标圆角。
 * @cssproperty --ea-badge-offset-x - X 轴偏移量。
 * @cssproperty --ea-badge-offset-y - Y 轴偏移量。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaBadge extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @query(bem.ce("content"))
  private _content!: HTMLElement;

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
  })
  max: number = Infinity;

  @attribute({
    type: Enum(VARIANT_TYPES),
    default: BADGE_VARIANT_DEFAULT,
    observer(this: EaBadge) {
      this.updateContainerClasslist();
    },
  })
  variant: VariantType = BADGE_VARIANT_DEFAULT;

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

  updateContainerClasslist(): string {
    const isHidden =
      this.dataHidden || (!this.showZero && Number(this.value) === 0);

    const className = bem(
      { [this.variant]: this.variant !== BADGE_VARIANT_DEFAULT },
      { dot: this.isDot, hidden: isHidden }
    );

    if (this._container) this._container.className = className;

    return className;
  }

  private _computedValue(value: string): string {
    if (!this.showZero && Number(value) === 0) return "";

    const numValue = Number(value);
    if (!isNaN(numValue) && numValue > this.max) return `${this.max}+`;

    return value;
  }

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

  html(): string {
    return `
      <div class="${bem()}" part="container">
        <sup class="${bem.e("content")}" part="content" aria-hidden="true"></sup>
        <slot></slot>
      </div>
    `;
  }

  $mount(): void {
    this.updateContainerClasslist();
    if (!this.isDot) {
      this._updateContent(this.value);
    }
  }
}
