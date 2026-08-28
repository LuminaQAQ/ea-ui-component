import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query, listen } from "@decorator";
import { Enum } from "@utils/Enum";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-affix" as const;
const bem = createBEM(TAG_NAME);

interface AffixState {
  isAffix: boolean;
  originalHeight: number;
  originalWidth: number;
}

interface AffixComputedState {
  isAffix: boolean;
  x: number | null;
  y: number | null;
}

/**
 * @summary
 * @status stable
 * @since 3.0
 *
 * @slot default - default slot.
 *
 * @csspart container - container element.
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaAffix extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  private afffixState: AffixState = {
    isAffix: false,
    originalHeight: 0,
    originalWidth: 0,
  };
  private _resizeObserver: ResizeObserver | null = null;
  private _targetElement: HTMLElement | null = null;

  @attribute({
    type: Number,
    default: 0,
    observer(this: EaAffix, newVal: number) {
      this._handleScroll();
    },
  })
  offset: number = 0;

  @attribute({
    type: String,
    default: "",
    observer(this: EaAffix, newVal: string) {
      this._targetElement = document.querySelector(
        newVal
      ) as HTMLElement | null;
      this._handleScroll();
    },
  })
  target: string = "";

  @attribute({
    type: Enum(["top", "bottom"]),
    default: "top",
    observer(this: EaAffix, newVal: string) {
      this._handleScroll();
    },
  })
  position: string = "top";

  updateContainerClasslist(): string {
    const className = bem(
      {
        [this.position]: !!this.position,
      },
      {
        affix: this.afffixState.isAffix,
      }
    );

    if (this._container) this._container.className = className;

    return className;
  }

  html(): string {
    return `
      <div class="${bem()}" part="container">
        <slot></slot>
      </div>
    `;
  }

  private _initSize(): void {
    const rect = this.getBoundingClientRect();

    this.afffixState.originalWidth = rect.width;
    this.afffixState.originalHeight = rect.height;

    this.style.setProperty(`--${TAG_NAME}-width`, `${rect.width}px`);
    this.style.setProperty(`--${TAG_NAME}-height`, `${rect.height}px`);
  }

  private _initTarget(): void {
    if (this.target) {
      this._targetElement = document.querySelector(this.target);
    }
  }

  private _initResizeObserver(): void {
    this._resizeObserver?.disconnect();

    this._resizeObserver = new ResizeObserver(() => {
      this._initSize();
      this._handleScroll();
    });
    this._resizeObserver.observe(this);
  }

  private _computeState(): AffixComputedState {
    const rect = this.getBoundingClientRect();
    const winHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const { offset, position } = this;

    let isAffix: boolean = false;
    let x: number | null = null;
    let y: number | null = null;

    if (!this._targetElement) {
      if (position === "top") {
        isAffix = rect.top <= offset;
      } else {
        isAffix = winHeight - rect.bottom <= offset;
      }

      x = isAffix ? rect.left : null;
      y = isAffix ? offset : null;
    } else {
      const targetElement = this._targetElement!;
      const targetTop = targetElement.offsetTop;
      const targetLeft = targetElement.offsetLeft;
      const targetHeight = targetElement.offsetHeight;

      const left = rect.left;
      const offsetTop = this.offsetTop;

      const originalHeight = this.afffixState.originalHeight;

      isAffix = scrollY + this.offset >= offsetTop;

      if (scrollY + this.offset >= offsetTop + targetHeight - originalHeight) {
        x = targetLeft;
        y = targetTop + targetHeight - originalHeight - scrollY;
      } else {
        x = left;
        y = this.offset;
      }
    }

    return {
      isAffix,
      x,
      y,
    };
  }

  private _applyState(state: AffixComputedState): void {
    const { isAffix, x, y } = state;
    this.afffixState.isAffix = isAffix;

    if (isAffix && x !== null && y !== null) {
      this._container.style.setProperty(`--${TAG_NAME}-x`, `${x}px`);
      this._container.style.setProperty(`--${TAG_NAME}-y`, `${y}px`);
    } else {
      this._container.style.removeProperty(`--${TAG_NAME}-x`);
      this._container.style.removeProperty(`--${TAG_NAME}-y`);
    }

    this.updateContainerClasslist();
  }

  @listen("scroll", "window")
  private _handleScroll(): void {
    const state = this._computeState();
    this._applyState(state);
  }

  @listen("resize", "window")
  private _handleResize(): void {
    this._handleScroll();
  }

  $mount(): void {
    this._initSize();
    this._initTarget();
    this._initResizeObserver();

    this._handleScroll();

    this.updateContainerClasslist();
  }

  $beforeUnmount(): void {
    this._resizeObserver?.disconnect();
  }
}
