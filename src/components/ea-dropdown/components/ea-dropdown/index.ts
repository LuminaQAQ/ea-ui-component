import { EaPopper } from "@common/ea-popper";
import { CustomElement, attribute, listen, query } from "@decorator";
import { Enum } from "@utils/Enum";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-dropdown" as const;

const TRIGGER_TYPES = ["click", "hover", "contextmenu"] as const;
type TriggerType = (typeof TRIGGER_TYPES)[number];

const SIZE_TYPES = ["small", "default", "large"] as const;
type SizeType = (typeof SIZE_TYPES)[number];

/**
 * @summary 下拉菜单组件，将动作或菜单折叠到下拉菜单中，支持多种触发方式和位置。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-popper
 *
 * @slot default - 下拉菜单内容插槽。
 * @slot reference - 触发下拉菜单的元素插槽。
 *
 * @event ea-command - 点击菜单项时触发，detail: `{ command: string }`。
 * @event ea-show - 开启下拉菜单时触发。
 * @event ea-shown - 开启下拉菜单的动画结束时触发。
 * @event ea-hide - 关闭下拉菜单时触发。
 * @event ea-hidden - 关闭下拉菜单的动画结束时触发。
 *
 * @csspart container - 外层容器。
 * @csspart reference - 触发元素的父容器。
 * @csspart original - 下拉菜单内容容器。
 *
 * @cssproperty --ea-dropdown-z-index - 下拉菜单层级。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaDropdown extends EaPopper {
  @query('slot[name="reference"]')
  private _referenceSlot!: HTMLSlotElement;

  private _triggerAbortController?: AbortController;
  private _hoverHideTimer: ReturnType<typeof setTimeout> | null = null;
  private _contextmenuAbortController?: AbortController;

  @attribute({
    type: Enum(TRIGGER_TYPES),
    default: "hover",
    observer(this: EaDropdown) {
      this._setupTrigger();
    },
  })
  trigger: TriggerType = "hover";

  @attribute({
    type: Boolean,
    default: true,
  })
  hideOnClick: boolean = true;

  @attribute({
    type: Enum(SIZE_TYPES),
    default: "",
  })
  size: SizeType | "" = "";

  /** 清除 hover 隐藏定时器 */
  private _clearHoverHideTimer(): void {
    if (this._hoverHideTimer !== null) {
      clearTimeout(this._hoverHideTimer);
      this._hoverHideTimer = null;
    }
  }

  /** 延迟隐藏下拉菜单 */
  private _scheduleHoverHide(): void {
    this._hoverHideTimer = setTimeout(() => {
      this.hide();
      this._hoverHideTimer = null;
    }, 150);
  }

  /** 设置触发事件监听器 */
  private _setupTrigger(): void {
    this._triggerAbortController?.abort();
    this._triggerAbortController = new AbortController();
    this._triggerEventStrategies[this.trigger]();
  }

  private _triggerEventStrategies: Record<TriggerType, () => void> = {
    hover: () => {
      this.addEventListener(
        "mouseenter",
        () => {
          this._clearHoverHideTimer();
          this.show();
        },
        { signal: this._triggerAbortController!.signal }
      );

      this.addEventListener(
        "mouseleave",
        () => {
          this._scheduleHoverHide();
        },
        { signal: this._triggerAbortController!.signal }
      );
    },

    click: () => {
      this._referenceSlot.addEventListener(
        "click",
        () => {
          this.toggle();
        },
        { signal: this._triggerAbortController!.signal }
      );
    },

    contextmenu: () => {
      this.addEventListener(
        "contextmenu",
        (e: MouseEvent) => {
          e.preventDefault();

          this._contextmenuAbortController?.abort();
          this._contextmenuAbortController = new AbortController();

          this.toggle();

          if (this.visible) {
            window.addEventListener(
              "click",
              (e: MouseEvent) => {
                if (!this.contains(e.target as Node)) {
                  this.hide();
                }
              },
              { signal: this._contextmenuAbortController.signal, once: true }
            );
          }
        },
        { signal: this._triggerAbortController!.signal }
      );
    },
  };

  @listen("ea-dropdown-item-click")
  private _handleDropdownItemClick(e: Event) {
    e.stopPropagation();
    if (this.hideOnClick) this.hide();
  }

  $mount(): void {
    if (!this.getAttribute("placement")) this.placement = "bottom";
    super.$mount();
    this._setupTrigger();
  }

  $beforeUnmount(): void {
    super.$beforeUnmount();
    this._triggerAbortController?.abort();
    this._contextmenuAbortController?.abort();
    this._clearHoverHideTimer();
  }
}
