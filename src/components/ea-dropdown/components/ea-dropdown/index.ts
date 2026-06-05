import { EaPopper } from "@common/ea-popper";
import { CustomElement, attribute, listen } from "@decorator";
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

  /** 设置 ARIA 关联属性，添加 aria-haspopup，使非交互式触发元素可聚焦 */
  protected _setupAria(): void {
    super._setupAria();
    const trigger = this._getReferenceTrigger();
    if (trigger) {
      trigger.setAttribute("aria-haspopup", "menu");
      if (!this._isNativelyFocusable(trigger)) {
        trigger.setAttribute("tabindex", "0");
        trigger.setAttribute("role", "button");
      }
    }
  }

  /** 检查元素是否原生可聚焦 */
  private _isNativelyFocusable(el: HTMLElement): boolean {
    const focusableTags = ["A", "BUTTON", "INPUT", "SELECT", "TEXTAREA"];
    if (focusableTags.includes(el.tagName)) return true;
    if (el.tabIndex >= 0) return true;
    return false;
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
        (e: MouseEvent) => {
          if (e.detail === 0) return;
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

  /** 获取所有非禁用的下拉菜单项 */
  private _getDropdownItems(): HTMLElement[] {
    return [
      ...this.querySelectorAll("ea-dropdown-item:not([disabled])"),
    ] as HTMLElement[];
  }

  /** 处理键盘导航（Disclosure 模式 + 可选方向键增强） */
  @listen("keydown")
  private _handleKeydown(e: KeyboardEvent) {
    const target = e.target as HTMLElement;
    const trigger = this._getReferenceTrigger();
    const items = this._getDropdownItems();
    const isOnTrigger = trigger && (target === trigger || trigger.contains(target));
    const currentItem = target.closest?.("ea-dropdown-item") as HTMLElement | null;

    if (e.key === "Escape" && this.visible) {
      e.preventDefault();
      this.hide();
      trigger?.focus();
      return;
    }

    if (isOnTrigger) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.toggle();
        return;
      }
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        if (!this.visible) this.show();
        if (items.length > 0) {
          requestAnimationFrame(() => items[0].focus());
        }
        return;
      }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        if (!this.visible) this.show();
        if (items.length > 0) {
          requestAnimationFrame(() => items[items.length - 1].focus());
        }
        return;
      }
      return;
    }

    if (currentItem && this.visible) {
      const currentIndex = items.indexOf(currentItem);

      if (e.key === "Tab") {
        this.hide();
        return;
      }
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        const nextIndex = currentIndex + 1;
        if (nextIndex < items.length) items[nextIndex].focus();
        return;
      }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        if (currentIndex > 0) {
          items[currentIndex - 1].focus();
        } else {
          trigger?.focus();
        }
        return;
      }
      if (e.key === "Home") {
        e.preventDefault();
        if (items.length > 0) items[0].focus();
        return;
      }
      if (e.key === "End") {
        e.preventDefault();
        if (items.length > 0) items[items.length - 1].focus();
        return;
      }
    }
  }

  /** 焦点离开下拉菜单时自动关闭 */
  @listen("focusout")
  private _handleFocusout() {
    if (!this.visible) return;
    requestAnimationFrame(() => {
      if (!this.visible) return;
      const activeEl = document.activeElement;
      if (activeEl && this.contains(activeEl)) return;
      this.hide();
    });
  }

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
