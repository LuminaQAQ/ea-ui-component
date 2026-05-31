import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query, listen } from "@decorator";
import { timeout } from "@utils/timeout";
import { Enum } from "@utils/Enum";
import {
  VARIANT_TYPES,
  VARIANT_DEFAULT,
  type VariantType,
} from "@/constants/variant";
import { EaTagRemoveEvent } from "../../events/EaTagRemoveEvent";
import stylesheet from "./index.scss?inline";
import "@/components/ea-icon/index";

const TAG_NAME = "ea-tag" as const;
const bem = createBEM(TAG_NAME);

const TAG_SIZES = ["large", "default", "small"] as const;
type TagSize = (typeof TAG_SIZES)[number];

const TAG_EFFECTS = ["dark", "light", "plain"] as const;
type TagEffect = (typeof TAG_EFFECTS)[number];

/**
 * @summary 标签组件，用于标记和选择，支持多种类型、尺寸、主题效果和可关闭功能。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-icon
 *
 * @slot default - 默认插槽，用于放置标签文本或自定义内容。
 *
 * @event ea-remove - 标签被移除后触发，detail: `{ text: string | null }`。
 *
 * @csspart container - 容器元素。
 * @csspart close-icon - 关闭图标元素。
 *
 * @cssproperty --ea-tag-border-radius - 组件圆角。
 * @cssproperty --ea-tag-font-size - 组件字体大小。
 * @cssproperty --ea-tag-transition - 过渡动画时长。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaTag extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  private _transitionAbortController?: AbortController;

  private _closeFallbackTimer?: number;

  @attribute({
    type: Enum(VARIANT_TYPES),
    default: VARIANT_DEFAULT,
    observer(this: EaTag) {
      this.updateContainerClasslist();
    },
  })
  variant: VariantType = VARIANT_DEFAULT;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaTag) {
      this.updateContainerClasslist();
    },
  })
  closable: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
  })
  disableTransitions: boolean = false;

  @attribute({
    type: String,
    default: "",
    observer(this: EaTag, newVal: string) {
      this._updateCustomColor(newVal);
    },
  })
  color: string = "";

  @attribute({
    type: Enum(TAG_SIZES),
    default: "default",
    observer(this: EaTag) {
      this.updateContainerClasslist();
    },
  })
  size: TagSize = "default";

  @attribute({
    type: Enum(TAG_EFFECTS),
    default: "light",
    observer(this: EaTag) {
      this.updateContainerClasslist();
    },
  })
  effect: TagEffect = "light";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaTag) {
      this.updateContainerClasslist();
    },
  })
  round: boolean = false;

  /** 更新自定义颜色 */
  private _updateCustomColor(color: string): void {
    if (!this._container) return;

    if (!color) {
      this._container.style.removeProperty("--ea-tag-custom-color");
      return;
    }

    try {
      if (CSS.supports("background", color)) {
        this._container.style.setProperty("--ea-tag-custom-color", color);
      } else {
        this._container.style.removeProperty("--ea-tag-custom-color");
        console.warn(`[EaTag] The color value ${color} is not supported.`);
      }
    } catch {
      this._container.style.setProperty("--ea-tag-custom-color", color);
    }
  }

  /** 更新容器类名 */
  updateContainerClasslist(): string {
    const className = bem(
      {
        [this.variant]: true,
        [`${this.size}-size`]: true,
        [this.effect]: true,
      },
      {
        closable: this.closable,
        round: this.round,
      }
    );

    if (this._container) this._container.className = className;

    return className;
  }

  /** 渲染模板 */
  html(): string {
    return `
      <div class='${this.updateContainerClasslist()}' part='container'>
        <span class="${bem.e("content")}"><slot></slot></span>
        <ea-icon class="${bem.e("close")}" part="close-icon" name="xmark"></ea-icon>
      </div>
    `;
  }

  /** 关闭图标点击处理 */
  @listen("click", bem.ce("close"))
  private _handleCloseClick(): void {
    if (!this.disableTransitions) {
      this._container.classList.add(bem.s("before-close"));

      this._transitionAbortController?.abort();
      this._transitionAbortController = new AbortController();

      const transitionDuration =
        parseFloat(getComputedStyle(this._container).transitionDuration) || 0.3;

      const doRemove = () => {
        clearTimeout(this._closeFallbackTimer);
        this._transitionAbortController?.abort();
        this.dispatchEvent(new EaTagRemoveEvent({ text: this.textContent }));
        this.remove();
      };

      this._container.addEventListener(
        "transitionend",
        (e: TransitionEvent) => {
          if (e.target !== this._container || e.propertyName !== "filter")
            return;
          doRemove();
        },
        { signal: this._transitionAbortController.signal }
      );

      this._closeFallbackTimer = timeout(
        doRemove,
        (transitionDuration + 0.1) * 1000
      );
    } else {
      this.dispatchEvent(new EaTagRemoveEvent({ text: this.textContent }));
      this.remove();
    }
  }

  $mount(): void {
    this.updateContainerClasslist();
    if (this.color) this._updateCustomColor(this.color);
  }

  $beforeUnmount(): void {
    this._transitionAbortController?.abort();
    clearTimeout(this._closeFallbackTimer);
  }
}
