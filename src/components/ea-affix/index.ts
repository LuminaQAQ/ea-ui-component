import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query, listen } from "@decorator";
import { Enum } from "@utils/Enum";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-affix" as const;
const bem = createBEM(TAG_NAME);

/**
 * 固钉基础状态
 */
interface AffixState {
  isAffix: boolean;
  originalHeight: number;
  originalWidth: number;
}

/**
 * 固钉计算后状态
 */
interface AffixComputedState {
  isAffix: boolean;
  x: number | null;
  y: number | null;
}

/**
 * @summary 固钉组件，将页面元素固定在可视范围内，常用于侧边导航或操作按钮。
 * @status stable
 * @since 3.0
 *
 * @slot default - 默认插槽，需要固定的内容。
 *
 * @csspart container - 容器元素。
 *
 * @cssproperty --ea-affix-x - 固钉水平偏移位置。
 * @cssproperty --ea-affix-y - 固钉垂直偏移位置。
 * @cssproperty --ea-affix-width - 固钉宽度，固定时保持原宽。
 * @cssproperty --ea-affix-height - 固钉高度，固定时保持原高。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaAffix extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  private affixState: AffixState = {
    isAffix: false,
    originalHeight: 0,
    originalWidth: 0,
  };
  private _resizeObserver: ResizeObserver | null = null;
  private _targetElement: HTMLElement | null = null;

  @attribute({
    type: Number,
    default: 0,
    observer(this: EaAffix) {
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
    observer(this: EaAffix) {
      this._handleScroll();
    },
  })
  position: string = "top";

  /**
   * 更新容器类名
   * @returns 更新后的类名字符串
   */
  updateContainerClasslist(): string {
    const className = bem(
      {
        [this.position]: !!this.position,
      },
      {
        affix: this.affixState.isAffix,
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

  /**
   * 初始化组件原始宽高，固定时保持占位
   */
  private _initSize(): void {
    const rect = this.getBoundingClientRect();

    this.affixState.originalWidth = rect.width;
    this.affixState.originalHeight = rect.height;

    this.style.setProperty(`--${TAG_NAME}-width`, `${rect.width}px`);
    this.style.setProperty(`--${TAG_NAME}-height`, `${rect.height}px`);
  }

  /**
   * 初始化目标容器
   */
  private _initTarget(): void {
    if (this.target) {
      this._targetElement = document.querySelector(this.target);
    }
  }

  /**
   * 初始化 ResizeObserver，监听组件尺寸变化
   */
  private _initResizeObserver(): void {
    this._resizeObserver?.disconnect();

    this._resizeObserver = new ResizeObserver(() => {
      this._initSize();
      this._handleScroll();
    });
    this._resizeObserver.observe(this);
  }

  /**
   * 计算固钉状态
   * @returns 固钉状态与位置
   */
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
      const targetRect = targetElement.getBoundingClientRect();
      const targetTop = targetRect.top + window.scrollY;
      const targetLeft = targetRect.left + window.scrollX;
      const targetHeight = targetElement.offsetHeight;

      const top = rect.top + window.scrollY;
      const left = rect.left + window.scrollX;

      const originalHeight = this.affixState.originalHeight;

      isAffix = scrollY + this.offset >= top;

      if (scrollY + this.offset >= top + targetHeight - originalHeight) {
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

  /**
   * 应用固钉状态到容器样式
   * @param state 计算后的固钉状态
   */
  private _applyState(state: AffixComputedState): void {
    const { isAffix, x, y } = state;
    this.affixState.isAffix = isAffix;

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
