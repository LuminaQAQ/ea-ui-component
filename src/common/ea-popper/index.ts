import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query } from "@decorator";
import { Enum } from "@utils/Enum";
import { EaPopperShowEvent } from "./events/EaPopperShowEvent";
import { EaPopperShownEvent } from "./events/EaPopperShownEvent";
import { EaPopperHideEvent } from "./events/EaPopperHideEvent";
import { EaPopperHiddenEvent } from "./events/EaPopperHiddenEvent";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-popper" as const;
const bem = createBEM(TAG_NAME);

const PLACEMENT_TYPES = [
  "top",
  "top-start",
  "top-end",
  "bottom",
  "bottom-start",
  "bottom-end",
  "left",
  "left-start",
  "left-end",
  "right",
  "right-start",
  "right-end",
] as const;

export type PlacementType = (typeof PLACEMENT_TYPES)[number];

/** 检测元素是否在视口内 */
const isIntersecting = (el: HTMLElement, scale: number = 0): boolean => {
  const rect = el.getBoundingClientRect();

  return (
    rect.top >= scale &&
    rect.left >= scale &&
    rect.bottom <= window.innerHeight - scale &&
    rect.right <= window.innerWidth - scale
  );
};

/** 根据 overflow 翻转 placement */
const flipPlacement = (el: HTMLElement, placement: string): string => {
  const antiPlacement: Record<string, string> = {
    left: "right",
    right: "left",
    top: "bottom",
    bottom: "top",
  };

  const rect = el.getBoundingClientRect();
  const strategies: Record<string, boolean> = {
    top: rect.top < 0 && placement.includes("top"),
    bottom: rect.bottom > window.innerHeight && placement.includes("bottom"),
    left: rect.left < 0 && placement.includes("left"),
    right: rect.right > window.innerWidth && placement.includes("right"),
  };

  if (isIntersecting(el)) return placement;

  for (const strategy in strategies) {
    if (strategies[strategy])
      return placement.replace(strategy, antiPlacement[strategy]);
  }

  return placement;
};

/**
 * @summary 气泡定位组件，提供相对某个元素进行智能定位的浮层能力，支持多种方向、箭头、偏移和翻转。
 * @status stable
 * @since 3.0
 *
 * @slot default - Popper 内容插槽。
 * @slot reference - 触发 Popper 显示的 HTML 元素插槽。
 *
 * @event ea-show - 开启 Popper 时触发。
 * @event ea-shown - 开启 Popper 的动画结束时触发。
 * @event ea-hide - 关闭 Popper 时触发。
 * @event ea-hidden - 关闭 Popper 的动画结束时触发。
 *
 * @csspart container - Popper 外层容器。
 * @csspart reference - 触发 Popper 显示的 HTML 元素的父容器。
 * @csspart original - Popper 内容容器。
 *
 * @cssproperty --ea-popper-width - Popper 宽度。
 * @cssproperty --ea-popper-border-color - Popper 边框颜色。
 * @cssproperty --ea-popper-background-color - Popper 背景颜色。
 * @cssproperty --ea-popper-box-shadow - Popper 阴影。
 * @cssproperty --ea-popper-arrow-size - 箭头大小。
 * @cssproperty --ea-popper-spacing - Popper 内边距。
 * @cssproperty --ea-popper-transform-x - X 轴偏移量。
 * @cssproperty --ea-popper-transform-y - Y 轴偏移量。
 * @cssproperty --ea-popper-transition - 过渡动画时长。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaPopper extends EaBase {
  private static _instanceCount: number = 0;

  private readonly _uniqueId: number = EaPopper._instanceCount++;

  @query(bem.cb())
  protected _container!: HTMLElement;

  @query(bem.ce("original"))
  protected _originalPopper!: HTMLElement;

  @query(bem.ce("reference"))
  protected _referenceElement!: HTMLElement;

  @query('slot[name="reference"]')
  protected _referenceSlot!: HTMLSlotElement;

  private _visibleAbortController?: AbortController;
  private _originPlacement!: string;

  @attribute({
    type: Number,
    default: 150,
    observer(this: EaPopper, newVal: number) {
      this.style.setProperty("--ea-popper-width", `${newVal}px`);
    },
  })
  width: number = 150;

  @attribute({
    type: Enum(PLACEMENT_TYPES),
    default: "top",
    observer(this: EaPopper) {
      if (this._container) {
        this.updateContainerClasslist();
      }
    },
  })
  placement: PlacementType = "top";

  @attribute({
    type: Boolean,
    default: true,
    observer(this: EaPopper) {
      if (this._container) {
        this.updateContainerClasslist();
      }
    },
  })
  showArrow: boolean = true;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaPopper, newVal: boolean) {
      this._visibleAbortController?.abort();
      this._visibleAbortController = new AbortController();

      if (newVal) {
        this._handleShowTransition();
      } else {
        this._handleHideTransition();
      }

      this._updateAriaExpanded();
    },
  })
  visible: boolean = false;

  @attribute({
    type: String,
    default: "0 0",
    observer(this: EaPopper, newVal: string) {
      try {
        let [x, y] = newVal.split(" ").map(_ => Number(_.trim()));

        if (x && typeof y === "undefined") {
          y = x;
        } else if ((x && y) || `${x} ${y}` === `0 0`) {
          // valid case
        } else {
          throw new RangeError(
            `[ea-popper] Invalid offset value: ${newVal}, expected format: "x(Number) y(Number)"`
          );
        }

        this.style.setProperty("--ea-popper-transform-x", `${x}px`);
        this.style.setProperty("--ea-popper-transform-y", `${y}px`);
      } catch (error) {
        console.error(error);
      }
    },
  })
  offset: string = "0 0";

  @attribute({
    type: Boolean,
    default: true,
  })
  flip: boolean = true;

  updateContainerClasslist(): string {
    const className = bem(
      {
        [this.placement]: true,
      },
      {
        show: this.visible,
        "show-arrow": this.showArrow,
      }
    );

    if (this._container) {
      this._container.className = className;
    }

    return className;
  }

  /** 处理显示过渡动画 */
  private _handleShowTransition(): void {
    this._container.classList.add("is-before-show");
    this.dispatchEvent(new EaPopperShowEvent());

    if (this.flip) {
      const popperRect = this._originalPopper.getBoundingClientRect();
      const isOverflow = isIntersecting(
        this,
        Math.max(popperRect.width, popperRect.height)
      );

      if (this._originPlacement === this.placement) {
        this.placement = flipPlacement(
          this._originalPopper,
          this.placement
        ) as PlacementType;
      } else if (isOverflow) {
        this.placement = this._originPlacement as PlacementType;
      }
    }

    void this._container.offsetWidth;

    this._container.classList.add("is-show");

    this._container.addEventListener(
      "transitionend",
      () => {
        this.dispatchEvent(new EaPopperShownEvent());
        this.updateContainerClasslist();
      },
      { once: true, signal: this._visibleAbortController!.signal }
    );
  }

  /** 处理隐藏过渡动画 */
  private _handleHideTransition(): void {
    this._container.classList.add("is-before-hide");
    this.dispatchEvent(new EaPopperHideEvent());

    this._container.addEventListener(
      "transitionend",
      () => {
        this.updateContainerClasslist();
        this.dispatchEvent(new EaPopperHiddenEvent());
      },
      { once: true, signal: this._visibleAbortController!.signal }
    );
  }

  html(): string {
    return `
      <div class="${this.updateContainerClasslist()}" part="container" tabindex="-1">
        <div class="${bem.e("reference")}" part="reference" tabindex="-1">
          <div class="${bem.e("original")}" part="original" tabindex="-1">
            <slot></slot>
          </div>
          <slot name="reference"></slot>
        </div>
      </div>
    `;
  }

  show(): void {
    this.visible = true;
  }

  hide(): void {
    this.visible = false;
  }

  toggle(): void {
    this.visible = !this.visible;
  }

  /** 获取 reference 插槽中的第一个已分配元素 */
  protected _getReferenceTrigger(): HTMLElement | null {
    if (!this._referenceSlot) return null;
    const assigned = this._referenceSlot.assignedElements();
    return (assigned[0] as HTMLElement) || null;
  }

  /** 设置 ARIA 关联属性：为 original 添加 id，为触发器添加 aria-controls */
  protected _setupAria(): void {
    const id = `ea-popper-${this._uniqueId}`;
    this._originalPopper.setAttribute("id", `${id}-content`);

    const trigger = this._getReferenceTrigger();
    if (trigger) {
      trigger.setAttribute("aria-controls", `${id}-content`);
      trigger.setAttribute("aria-expanded", String(this.visible));
    }
  }

  /** 更新触发器的 aria-expanded 状态 */
  protected _updateAriaExpanded(): void {
    const trigger = this._getReferenceTrigger();
    if (trigger) {
      trigger.setAttribute("aria-expanded", String(this.visible));
    }
  }

  $mount(): void {
    this.updateContainerClasslist();
    this._originPlacement = this.placement;
    this._setupAria();
  }

  $beforeUnmount(): void {
    this._visibleAbortController?.abort();
  }
}
