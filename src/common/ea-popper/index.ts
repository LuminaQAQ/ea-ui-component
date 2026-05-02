import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { Enum } from "@/utils/Enum";
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

const isIntersecting = (el: HTMLElement, scale: number = 0): boolean => {
  const rect = el.getBoundingClientRect();

  return (
    rect.top >= scale &&
    rect.left >= scale &&
    rect.bottom <= window.innerHeight - scale &&
    rect.right <= window.innerWidth - scale
  );
};

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

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaPopper extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(".ea-popper")
  protected _container!: HTMLElement;

  @query(".ea-popper__original")
  protected _originalPopper!: HTMLElement;

  @query(".ea-popper__reference")
  protected _referenceElement!: HTMLElement;

  private _visibleAbortController?: AbortController;
  private _originPlacement!: string;

  // ==================== 属性定义 ====================

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

  // ==================== 方法 ====================

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

  private _handleShowTransition(): void {
    this._container.classList.add("is-before-show");
    this.emit("show", { bubbles: true, composed: true });

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
        this.emit("shown", { bubbles: true, composed: true });
        this.updateContainerClasslist();
      },
      { once: true, signal: this._visibleAbortController!.signal }
    );
  }

  private _handleHideTransition(): void {
    this._container.classList.add("is-before-hide");
    this.emit("hide", { bubbles: true, composed: true });

    this._container.addEventListener(
      "transitionend",
      () => {
        this.updateContainerClasslist();
        this.emit("hidden", { bubbles: true, composed: true });
      },
      { once: true, signal: this._visibleAbortController!.signal }
    );
  }

  html(): string {
    return `
      <div class="${this.updateContainerClasslist()}" part="container" tabindex="-1">
        <div class="ea-popper__reference" part="reference" tabindex="-1">
          <div class="ea-popper__original" part="original" tabindex="0">
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

  // ==================== 生命周期 ====================

  $mount(): void {
    this.updateContainerClasslist();
    this._originPlacement = this.placement;
  }

  $beforeUnmount(): void {
    this._visibleAbortController?.abort();
  }
}
