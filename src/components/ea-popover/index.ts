import { EaPopper } from "@common/ea-popper/index";
import { createBEM } from "@utils/bem";
import { CustomElement, attribute, listen, query } from "@decorator";
import { Enum } from "@utils/Enum";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-popover" as const;
const bem = createBEM(TAG_NAME);

const TRIGGER_TYPES = [
  "click",
  "focus",
  "hover",
  "contextmenu",
  "customized",
] as const;

type TriggerType = (typeof TRIGGER_TYPES)[number];

/**
 * @summary 弹出框组件，基于 EaPopper 扩展，支持标题、内容和多种触发方式。
 * @status stable
 * @since 3.0
 *
 * @slot default - Popover 内容插槽。
 * @slot reference - 触发 Popover 显示的 HTML 元素插槽。
 *
 * @event ea-show - 开启 Popover 时触发。
 * @event ea-shown - 开启 Popover 的动画结束时触发。
 * @event ea-hide - 关闭 Popover 时触发。
 * @event ea-hidden - 关闭 Popover 的动画结束时触发。
 *
 * @csspart container - Popover 外层容器。
 * @csspart reference - 触发 Popover 显示的 HTML 元素的父容器。
 * @csspart original - Popover 内容容器。
 * @csspart title - Popover 标题容器。
 * @csspart content - Popover 内容容器。
 *
 * @cssproperty --ea-popover-title-color - 标题颜色。
 * @cssproperty --ea-popover-title-font-size - 标题字体大小。
 * @cssproperty --ea-popover-content-color - 内容颜色。
 * @cssproperty --ea-popover-content-font-size - 内容字体大小。
 * @cssproperty --ea-popover-box-shadow - 阴影。
 * @cssproperty --ea-popover-border-radius - 圆角。
 * @cssproperty --ea-popover-z-index - 层级。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaPopover extends EaPopper {
  @query(bem.ce("title"))
  private _titleElement!: HTMLElement;

  @query(bem.ce("content"))
  private _contentElement!: HTMLElement;

  private _triggerAbortController?: AbortController;
  private _contextmenuAbortController?: AbortController;
  private _popoverAbortController?: AbortController;
  private _keyboardActivated = false;

  @attribute({
    type: Enum(TRIGGER_TYPES),
    default: "hover",
    observer(this: EaPopover) {
      this._initTriggerEvent();
    },
  })
  trigger: TriggerType = "hover";

  @attribute({
    type: String,
    default: "",
    observer(this: EaPopover, newVal: string) {
      if (this._titleElement) {
        this._titleElement.textContent = newVal;
      }
      this.updateContainerClasslist();
    },
  })
  heading: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaPopover, newVal: string) {
      if (this._contentElement) {
        this._contentElement.textContent = newVal;
      }
      this.updateContainerClasslist();
    },
  })
  content: string = "";

  updateContainerClasslist(): string {
    const originClasslist = super.updateContainerClasslist();
    const className = `${originClasslist} ${bem(
      {},
      {
        "has-heading": !!this.heading,
        "has-content": !!this.content,
      }
    )}`;

    if (this._container) {
      this._container.className = className;
    }

    return className;
  }

  /** 设置 ARIA 关联属性，使非交互式触发元素可聚焦 */
  protected _setupAria(): void {
    super._setupAria();
    this._originalPopper.setAttribute("role", "dialog");
    const trigger = this._getReferenceTrigger();
    if (trigger) {
      trigger.setAttribute("aria-haspopup", "dialog");
      if (!this._isNativelyFocusable(trigger)) {
        trigger.setAttribute("tabindex", "0");
        trigger.setAttribute("role", "button");
      }
    }
    if (this.heading && this._titleElement) {
      const contentId = this._originalPopper.getAttribute("id") || "";
      const titleId = `${contentId}-title`;
      this._titleElement.setAttribute("id", titleId);
      this._originalPopper.setAttribute("aria-labelledby", titleId);
    }
  }

  /** 检查元素是否原生可聚焦 */
  private _isNativelyFocusable(el: HTMLElement): boolean {
    const focusableTags = ["A", "BUTTON", "INPUT", "SELECT", "TEXTAREA"];
    if (focusableTags.includes(el.tagName)) return true;
    if (el.tabIndex >= 0) return true;
    return false;
  }

  /** 初始化触发事件监听 */
  private _initTriggerEvent(): void {
    this._triggerAbortController?.abort();
    this._triggerAbortController = new AbortController();

    if (this.trigger === "customized") return;

    const strategy = this._triggerEventStrategies[this.trigger];
    if (strategy) {
      strategy();
    } else {
      console.warn(`[EaPopover] trigger event ${this.trigger} is not exist`);
      this._triggerEventStrategies["hover"]();
    }
  }

  /** 触发事件策略映射 */
  private _triggerEventStrategies: Record<TriggerType, () => void> = {
    hover: () => {
      this.addEventListener(
        "mouseover",
        () => {
          this.show();

          this.addEventListener(
            "mouseout",
            () => {
              this.hide();
            },
            { once: true, signal: this._triggerAbortController!.signal }
          );
        },
        { signal: this._triggerAbortController!.signal }
      );
    },
    click: () => {
      this.addEventListener(
        "click",
        (e: MouseEvent) => {
          if (e.detail === 0) return;
          this.toggle();
        },
        { signal: this._triggerAbortController!.signal }
      );
    },
    focus: () => {
      this.addEventListener(
        "focusin",
        () => {
          if (!this.visible) {
            this.show();
          }
        },
        { signal: this._triggerAbortController!.signal }
      );
      this.addEventListener(
        "focusout",
        () => {
          requestAnimationFrame(() => {
            if (this.visible && !this.contains(document.activeElement)) {
              this.hide();
            }
          });
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

          this.show();

          window.addEventListener(
            "click",
            (e: MouseEvent) => {
              const isThis = this.contains(e.target as Node);
              if (!isThis) {
                this.hide();
                this._contextmenuAbortController?.abort();
              }
            },
            { signal: this._contextmenuAbortController.signal }
          );
        },
        { signal: this._triggerAbortController!.signal }
      );
    },
    customized: () => {},
  };

  /** 可聚焦元素的 CSS 选择器（用于 Light DOM 查询） */
  private static readonly FOCUSABLE_SELECTOR =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  /** 获取内容区内的可聚焦元素（排除触发元素），包括自定义元素内部的可聚焦元素 */
  private _getContentFocusableElements(): HTMLElement[] {
    const trigger = this._getReferenceTrigger();
    const result: HTMLElement[] = [];

    const collect = (root: Element) => {
      const children = root.querySelectorAll<HTMLElement>("*");
      for (const el of children) {
        if (el === trigger || trigger?.contains(el)) continue;
        if (el.hasAttribute("disabled")) continue;

        // 自身是可聚焦元素
        if (el.tabIndex >= 0 || el.matches(EaPopover.FOCUSABLE_SELECTOR)) {
          result.push(el);
          continue;
        }

        // 自定义元素：检查 Shadow DOM 内是否有可聚焦元素
        if (el.shadowRoot) {
          const shadowFocusable = el.shadowRoot.querySelector<HTMLElement>(
            EaPopover.FOCUSABLE_SELECTOR
          );
          if (shadowFocusable) {
            result.push(el);
          }
        }
      }
    };

    collect(this);
    return result;
  }

  /** 处理键盘事件 */
  @listen("keydown")
  private _handleKeydown(e: KeyboardEvent) {
    const target = e.target as HTMLElement;
    const trigger = this._getReferenceTrigger();
    const isTrigger = !!(
      trigger &&
      (target === trigger || trigger.contains(target))
    );
    const isContent = this.contains(target) && !isTrigger;

    // 触发元素上的键盘事件
    if (isTrigger) {
      if (e.key === "Enter" || e.key === " ") {
        // focus 模式由 focus/blur 控制，不需要键盘激活
        if (this.trigger === "focus") return;
        // customized 模式由外部控制开关，只标记键盘激活
        if (this.trigger === "customized") {
          this._keyboardActivated = true;
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        this._keyboardActivated = true;
        if (!this.visible) {
          this.show();
        } else {
          this.hide();
        }
        return;
      }
      return;
    }

    // 内容区内的键盘事件
    if (isContent && this.visible) {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        this.hide();
        trigger?.focus();
        return;
      }
      if (e.key === "Tab") {
        const focusable = this._getContentFocusableElements();
        if (focusable.length === 0) return;
        const firstEl = focusable[0];
        const lastEl = focusable[focusable.length - 1];

        // 找到 target 对应的 focusable 宿主元素
        const targetHost = focusable.find(
          el => el === target || el.contains(target)
        );

        if (e.shiftKey) {
          if (!targetHost || targetHost === firstEl) {
            e.preventDefault();
            this._focusElement(lastEl);
          }
        } else {
          if (!targetHost || targetHost === lastEl) {
            e.preventDefault();
            this._focusElement(firstEl);
          }
        }
        return;
      }
    }
  }

  /** 将焦点移入弹出内容区，优先聚焦第一个可交互元素 */
  private _focusContent(): void {
    const focusable = this._getContentFocusableElements();
    if (focusable.length > 0) {
      this._focusElement(focusable[0]);
    } else {
      this._originalPopper.tabIndex = 0;
      this._originalPopper.focus();
    }
  }

  /** 聚焦元素，如果是自定义元素则聚焦其 Shadow DOM 内第一个可聚焦元素 */
  private _focusElement(el: HTMLElement): void {
    if (el.shadowRoot) {
      const inner = el.shadowRoot.querySelector<HTMLElement>(
        EaPopover.FOCUSABLE_SELECTOR
      );
      if (inner) {
        inner.focus();
        return;
      }
    }
    el.focus();
  }

  /** 焦点离开弹出框时自动关闭（仅 click/hover/contextmenu 模式） */
  @listen("focusout")
  private _handleFocusout() {
    if (!this.visible) return;
    if (this.trigger === "focus" || this.trigger === "customized") return;
    requestAnimationFrame(() => {
      if (!this.visible) return;
      const activeEl = document.activeElement;
      if (activeEl && this.contains(activeEl)) return;
      this.hide();
    });
  }

  html(): string {
    return `
      <div class="${this.updateContainerClasslist()}" part="container" tabindex="-1">
        <div class="ea-popper__reference" part="reference" tabindex="-1">
          <slot name="reference"></slot>
          <div class="ea-popper__original" part="original" tabindex="-1" inert>
            <div class="${bem.e("title")}" part="title"></div>
            <slot></slot>
            <div class="${bem.e("content")}" part="content"></div>
          </div>
        </div>
      </div>
    `;
  }

  $mount(): void {
    super.$mount();
    this._initTriggerEvent();

    if (this.heading && this._titleElement) {
      this._titleElement.textContent = this.heading;
    }
    if (this.content && this._contentElement) {
      this._contentElement.textContent = this.content;
    }

    // 管理 _originalPopper：关闭时 inert 阻止聚焦，打开时移除 inert
    if (this._originalPopper) {
      this._originalPopper.inert = true;
    }

    this._popoverAbortController?.abort();
    this._popoverAbortController = new AbortController();

    this.addEventListener(
      "ea-show",
      () => {
        if (this._originalPopper) {
          this._originalPopper.inert = false;
        }
        // 键盘激活时自动将焦点移入内容区
        if (this._keyboardActivated) {
          this._keyboardActivated = false;
          requestAnimationFrame(() => this._focusContent());
        }
      },
      { signal: this._popoverAbortController.signal }
    );

    this.addEventListener(
      "ea-hide",
      () => {
        if (this._originalPopper) {
          this._originalPopper.inert = true;
        }
        const trigger = this._getReferenceTrigger();
        if (trigger) trigger.setAttribute("aria-expanded", "false");
        this._keyboardActivated = false;
      },
      { signal: this._popoverAbortController.signal }
    );
  }

  $beforeUnmount(): void {
    super.$beforeUnmount();
    this._triggerAbortController?.abort();
    this._contextmenuAbortController?.abort();
    this._popoverAbortController?.abort();
  }
}
