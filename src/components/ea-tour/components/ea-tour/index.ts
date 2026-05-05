import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { listen } from "@decorator/listen";
import { Enum } from "@/utils/Enum";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-tour" as const;
const bem = createBEM(TAG_NAME);

const isIntersecting = (el: HTMLElement, scale = 0) => {
  const rect = el.getBoundingClientRect();

  return (
    rect.top > 0 &&
    rect.left > 0 &&
    rect.bottom <= window.innerHeight - scale &&
    rect.right <= window.innerWidth - scale
  );
};

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaTour extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(bem.cb())
  private _container!: HTMLElement;

  @query(".ea-tour__hollow")
  private _hollow!: SVGRectElement;

  @query(".ea-tour__divider.top-mask")
  private _topMask!: SVGRectElement;

  @query(".ea-tour__divider.right-mask")
  private _rightMask!: SVGRectElement;

  @query(".ea-tour__divider.bottom-mask")
  private _bottomMask!: SVGRectElement;

  @query(".ea-tour__divider.left-mask")
  private _leftMask!: SVGRectElement;

  // ==================== 私有属性 ====================

  private _abortController?: AbortController;

  private _currentChangeAbortController: AbortController | null = null;

  private _states = {
    isChildrenLoaded: false,
    isCenter: false,
  };

  // ==================== 属性定义 ====================

  @attribute({
    type: String,
    default: "body",
  })
  appendTo: string = "body";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaTour, newVal: boolean) {
      if (!this._states.isChildrenLoaded) {
        customElements.whenDefined("ea-tour-step").then(() => {
          this._states.isChildrenLoaded = true;
        });
      }

      this._currentChangeAbortController?.abort();
      this.current = 0;

      if (newVal) {
        this._currentChangeAbortController = new AbortController();

        const onHollowShouldChangeEvent = () => {
          this._updateHollowPosition(this.current);
        };

        if (this.mask) document.body.style.overflow = "hidden";

        this._updateHollowPosition(this.current);

        window.addEventListener("resize", onHollowShouldChangeEvent, {
          signal: this._currentChangeAbortController!.signal,
        });
        window.addEventListener("scroll", onHollowShouldChangeEvent, {
          signal: this._currentChangeAbortController!.signal,
        });
      } else {
        if (this.mask) document.body.style.overflow = "auto";
      }

      this.updateContainerClasslist();
    },
  })
  visible: boolean = false;

  @attribute({
    type: Number,
    default: 6,
  })
  gap: number = 6;

  @attribute({
    type: Number,
    default: 0,
    observer(this: EaTour, newVal: number) {
      if (!this._states.isChildrenLoaded) {
        customElements.whenDefined("ea-tour-step").then(() => {
          this._states.isChildrenLoaded = true;
        });
      }

      const children = [
        ...this.querySelectorAll("ea-tour-step"),
      ] as HTMLElement[];

      if (children.length === 0) return;
      if (newVal < 0) {
        this.current = 0;
        return;
      } else if (newVal >= children.length) {
        this.visible = false;
        return;
      }

      children.forEach((child, index) => {
        child.style.setProperty(
          "--ea-tour-step-visible",
          index === newVal ? "block" : "none"
        );
      });

      this._updateHollowPosition(newVal);
    },
  })
  current: number = 0;

  @attribute({
    type: Boolean,
    default: true,
    observer(this: EaTour) {
      this.updateContainerClasslist();
    },
  })
  mask: boolean = true;

  @attribute({
    type: Enum(["default", "primary"]),
    default: "default",
    observer(this: EaTour, newVal: "default" | "primary") {
      this.querySelectorAll("ea-tour-step").forEach(item => {
        if (newVal === "primary") item.setAttribute("variant", newVal);
        else item.removeAttribute("variant");
      });
    },
  })
  variant: "default" | "primary" = "default";

  @attribute({
    type: Enum([
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
    ]),
    default: "bottom",
    observer(this: EaTour, newVal: string) {
      this.querySelectorAll("ea-tour-step").forEach(item => {
        if (!item.getAttribute("placement")) {
          item.setAttribute("placement", newVal);
        }
      });
    },
  })
  placement: string = "bottom";

  // ==================== 方法 ====================

  updateContainerClasslist(): string {
    const className = bem(
      {},
      {
        visible: this.visible,
        mask: this.mask,
        center: this._states.isCenter,
      }
    );

    this._container.className = className;

    return className;
  }

  html(): string {
    return `
      <div class='${bem()}'>
        <svg class='ea-tour__svg'>
          <defs>
            <mask id="reverseMask">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              <rect class="ea-tour__hollow" part="hollow" x="50" y="50" width="100px" height="100px" fill="black" />
            </mask>
          </defs>
          <rect class='ea-tour__mask' x="0" y="0" width="100%" height="100%" mask="url(#reverseMask)"></rect>
          <rect class="ea-tour__divider top-mask" x="0" y="0" width="100%" height="50px"></rect>
          <rect class="ea-tour__divider right-mask" x="150px" y="0" width="100%" height="100%"></rect>
          <rect class="ea-tour__divider bottom-mask" x="0" y="150px" width="100%" height="100%"></rect>
          <rect class="ea-tour__divider left-mask" x="0" y="0" width="50px" height="100%"></rect>
        </svg>
      </div>
      <div class="ea-tour__content">
        <slot></slot>
      </div>
    `;
  }

  private _handleAppendTo = async (selector: string) => {
    await customElements.whenDefined("ea-tour");

    const target = document.querySelector(selector);
    if (!target)
      console.warn(`[EaTour] append-to ${selector} not found.`, this);

    if (target) {
      target.appendChild(this);
    } else {
      document.body.appendChild(this);
    }
  };

  private _handleCenterPosition = () => {
    const children = [
      ...this.querySelectorAll("ea-tour-step"),
    ] as HTMLElement[];

    this._states.isCenter = true;
    children[this.current].setAttribute("center", "true");

    this._hollow.style.width = `0px`;
    this._hollow.style.height = `0px`;
    this._hollow.setAttribute("x", "0px");
    this._hollow.setAttribute("y", "0px");

    this._topMask.setAttribute("height", "100%");
    this._rightMask.setAttribute("x", "0");
    this._bottomMask.setAttribute("y", "0");
    this._leftMask.setAttribute("width", "100%");

    this.updateContainerClasslist();
  };

  private _updateStepPosition = (target: HTMLElement, step: HTMLElement) => {
    const { width, height, x, y, top, bottom, left } =
      target.getBoundingClientRect();

    const gap = this.gap * 2;

    const childWidth = step.clientWidth || step.offsetWidth || 520;
    const childHeight = step.clientHeight || step.offsetHeight || 0;

    const innerW = window.innerWidth;
    const innerH = window.innerHeight;

    const placementStrategies: Record<string, { top: number; left: number }> = {
      top: {
        top: top - childHeight - gap,
        left: left - childWidth / 2 + gap,
      },
      "top-start": {
        top: top - childHeight - gap,
        left: left - gap,
      },
      "top-end": {
        top: top - childHeight - gap,
        left: left - childWidth + width + gap,
      },
      right: {
        top: top - gap - childHeight / 2 + height / 2,
        left: left + width + gap,
      },
      "right-start": {
        top: top - gap,
        left: left + width + gap,
      },
      "right-end": {
        top: top - childHeight / 2 - gap,
        left: left + width + gap,
      },
      bottom: {
        top: bottom + gap,
        left: left - childWidth / 2 + gap,
      },
      "bottom-start": {
        top: bottom + gap,
        left: left - gap,
      },
      "bottom-end": {
        top: bottom + gap,
        left: left - childWidth + width + gap,
      },
      left: {
        top: top - gap - childHeight / 2 + height / 2,
        left: left - childWidth - gap * 2,
      },
      "left-start": {
        top: top - gap,
        left: left - childWidth - gap * 2,
      },
      "left-end": {
        top: top - childHeight / 2 - gap,
        left: left - childWidth - gap * 2,
      },
    };

    const placement =
      (step as any).placement ||
      step.getAttribute?.("placement") ||
      this.placement;
    const strategy = placementStrategies[placement];

    if (!strategy) {
      console.warn(`[EaTourStep] placement ${placement} is not supported.`);
      return;
    }

    let realTop = Number(strategy.top);
    let realLeft = Number(strategy.left);

    if (realTop < 0) {
      realTop = Math.max(realTop, y + gap + height);
    } else if (realTop + childHeight > innerH) {
      realTop = Math.min(realTop, y - childHeight - gap);
    }

    if (realLeft < 0) {
      realLeft = Math.max(realLeft, x + width + gap);
    } else if (realLeft + childWidth > innerW) {
      realLeft = Math.min(realLeft, x - childWidth - gap);
    }

    step.style.left = `${realLeft}px`;
    step.style.top = `${realTop}px`;
  };

  private _updateHollowPosition = (current: number = this.current) => {
    const children = [
      ...this.querySelectorAll("ea-tour-step"),
    ] as HTMLElement[];
    const halfGap = this.gap / 2;

    const targetSelector = children[current].getAttribute("target");
    const target = document.querySelector(
      targetSelector!
    ) as HTMLElement | null;

    children[current].removeAttribute("center");
    this._states.isCenter = false;

    if (!targetSelector) {
      return this._handleCenterPosition();
    } else if (!target) {
      return console.warn(
        `[EaTour] target ${targetSelector} not found`,
        children[current]
      );
    }

    if (!isIntersecting(target)) {
      window.scrollTo({
        top: target.getBoundingClientRect().top,
      });
    }

    const { width, height, x, y, right, bottom } =
      target.getBoundingClientRect();

    this._hollow.style.width = `${width + this.gap}px`;
    this._hollow.style.height = `${height + this.gap}px`;
    this._hollow.setAttribute("x", `${x - halfGap}px`);
    this._hollow.setAttribute("y", `${y - halfGap}px`);

    this._topMask.setAttribute("height", `${y - halfGap}px`);
    this._rightMask.setAttribute("x", `${right + halfGap}px`);
    this._bottomMask.setAttribute("y", `${bottom + halfGap}px`);
    this._leftMask.setAttribute("width", `${x - halfGap}px`);

    this._updateStepPosition(target, children[current]);
  };

  // ==================== 事件处理 ====================

  @listen("slotchange", ".ea-tour__content slot")
  private async _handleSlotChange() {
    await customElements.whenDefined("ea-tour-step");
    this._updateStepIndicators();
  }

  private _updateStepIndicators() {
    const steps = [...this.querySelectorAll("ea-tour-step")] as any[];
    steps.forEach(step => {
      if (typeof step.updateIndicators === "function") {
        step.updateIndicators(steps);
      }
    });
  }

  // ==================== 生命周期 ====================

  constructor() {
    super();
    this._handleAppendTo(this.appendTo);
  }

  $mount(): void {
    this.updateContainerClasslist();

    const dispatchChangeEvent = () => {
      this.emit("change", {
        detail: { current: this.current },
        bubbles: true,
        composed: true,
      });
    };

    this._abortController?.abort();
    this._abortController = new AbortController();

    this.addEventListener(
      "ea-close",
      () => {
        this.visible = false;
      },
      { signal: this._abortController.signal }
    );

    this.addEventListener(
      "next",
      e => {
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();

        this.current++;

        dispatchChangeEvent();
      },
      { signal: this._abortController.signal }
    );
    this.addEventListener(
      "previous",
      e => {
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();

        this.current--;

        dispatchChangeEvent();
      },
      { signal: this._abortController.signal }
    );
    this.addEventListener(
      "finish",
      () => {
        this.visible = false;
      },
      { signal: this._abortController.signal }
    );
  }

  $beforeUnmount(): void {
    this._abortController?.abort();
    this._currentChangeAbortController?.abort();
    this._currentChangeAbortController = null;
  }
}

export default EaTour;
