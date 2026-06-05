import { EaPopper } from "@common/ea-popper/index";
import { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query, listen } from "@decorator";
import { Enum } from "@utils/Enum";
import { EaPopconfirmConfirmEvent } from "./events/EaPopconfirmConfirmEvent";
import { EaPopconfirmCancelEvent } from "./events/EaPopconfirmCancelEvent";
import "@/components/ea-icon/index";
import "@/components/ea-button/index";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-popconfirm" as const;
const bem = createBEM(TAG_NAME);
const popperBem = createBEM("ea-popper");

const BUTTON_TYPE_OPTIONS = [
  "normal",
  "primary",
  "success",
  "warning",
  "danger",
] as const;

type ButtonType = (typeof BUTTON_TYPE_OPTIONS)[number];

/** 可聚焦元素的 CSS 选择器 */
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * @summary 气泡确认框组件，点击元素弹出确认气泡，支持自定义图标、按钮和位置。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-icon
 * @dependency ea-button
 *
 * @slot reference - 触发 Popconfirm 显示的 HTML 元素插槽。
 * @slot actions - 页脚内容插槽，可自定义操作按钮。
 *
 * @event ea-confirm - 点击确认按钮时触发。
 * @event ea-cancel - 点击取消按钮时触发。
 *
 * @csspart container - Popconfirm 外层容器。
 * @csspart reference - 触发 Popconfirm 显示的 HTML 元素的父容器。
 * @csspart original - Popconfirm 弹出内容容器。
 * @csspart title - Popconfirm 标题容器。
 * @csspart icon - Popconfirm 的图标。
 * @csspart title-content - Popconfirm 内容容器。
 * @csspart footer - Popconfirm 底部容器。
 * @csspart cancel-button - Popconfirm 取消按钮。
 * @csspart confirm-button - Popconfirm 确认按钮。
 *
 * @cssproperty --ea-popconfirm-title-icon-color - 标题图标颜色。
 * @cssproperty --ea-popconfirm-title-color - 标题文字颜色。
 * @cssproperty --ea-popconfirm-title-font-size - 标题文字大小。
 * @cssproperty --ea-popconfirm-box-shadow - 容器阴影。
 * @cssproperty --ea-popconfirm-border-radius - 容器圆角。
 * @cssproperty --ea-popconfirm-z-index - 容器层级。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaPopconfirm extends EaPopper {
  @query(`.${bem.e("title")} ea-icon`)
  private _titleIcon!: HTMLElement;

  @query(`.${bem.e("title-content")}`)
  private _titleContent!: HTMLElement;

  @query(`.${bem.e("cancel")}`)
  private _cancelButton!: HTMLElement;

  @query(`.${bem.e("confirm")}`)
  private _confirmButton!: HTMLElement;

  private _globalCloseAbortController?: AbortController;
  private _popoverAbortController?: AbortController;
  private _keyboardActivated = false;

  @attribute({
    type: String,
    default: "",
    observer(this: EaPopconfirm, newVal: string) {
      if (this._titleContent) {
        this._titleContent.innerText = newVal;
      }
    },
  })
  heading: string = "";

  @attribute({
    type: String,
    default: "circle-question",
    observer(this: EaPopconfirm, newVal: string) {
      if (this._titleIcon) {
        this._titleIcon.setAttribute("name", newVal);
      }
    },
  })
  icon: string = "circle-question";

  @attribute({
    type: String,
    default: "rgb(255, 153, 0)",
    observer(this: EaPopconfirm, newVal: string) {
      if (!CSS.supports("color", newVal))
        return console.warn(
          `[EaPopconfirm] The color value ${newVal} is not supported.`
        );

      this.style.setProperty("--ea-popconfirm-title-icon-color", newVal);
    },
  })
  iconColor: string = "rgb(255, 153, 0)";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaPopconfirm) {
      this.updateContainerClasslist();
    },
  })
  hideIcon: boolean = false;

  @attribute({
    type: String,
    default: "确定",
    observer(this: EaPopconfirm, newVal: string) {
      if (this._confirmButton) {
        this._confirmButton.textContent = newVal;
      }
    },
  })
  confirmButtonText: string = "确定";

  @attribute({
    type: String,
    default: "取消",
    observer(this: EaPopconfirm, newVal: string) {
      if (this._cancelButton) {
        this._cancelButton.textContent = newVal;
      }
    },
  })
  cancelButtonText: string = "取消";

  @attribute({
    type: Enum(BUTTON_TYPE_OPTIONS),
    default: "primary",
    observer(this: EaPopconfirm, newVal: string) {
      if (this._confirmButton) {
        this._confirmButton.setAttribute("variant", newVal);
      }
    },
  })
  confirmButtonType: ButtonType = "primary";

  @attribute({
    type: Enum(BUTTON_TYPE_OPTIONS),
    default: "normal",
    observer(this: EaPopconfirm, newVal: string) {
      if (this._cancelButton) {
        this._cancelButton.setAttribute("variant", newVal);
      }
    },
  })
  cancelButtonType: ButtonType = "normal";

  updateContainerClasslist(): string {
    const className = super.updateContainerClasslist();

    if (this._container) {
      this._container.classList.toggle("is-icon-hidden", this.hideIcon);
    }

    return this._container?.className || className;
  }

  /** 设置 ARIA 关联属性，使非交互式触发元素可聚焦 */
  protected _setupAria(): void {
    super._setupAria();
    this._originalPopper.setAttribute("role", "alertdialog");
    const trigger = this._getReferenceTrigger();
    if (trigger) {
      trigger.setAttribute("aria-haspopup", "alertdialog");
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

  html(): string {
    return `
      <div class="${this.updateContainerClasslist()}" part="container" tabindex="-1">
        <div class="${popperBem.e("reference")}" part="reference" tabindex="-1">
          <slot name="reference"></slot>
          <div class="${popperBem.e("original")}" part="original" tabindex="-1" inert>
            <section class="${bem.e("title")}" part="title">
              <ea-icon name="${this.icon}" part="icon"></ea-icon>
              <span class="${bem.e("title-content")}" part="title-content">${this.heading}</span>
            </section>
            <footer class="${bem.e("footer")}" part="footer">
              <slot name="actions">
                <ea-button variant="${this.cancelButtonType}" class="${bem.e("cancel")}" size="small" part="cancel-button" text>${this.cancelButtonText}</ea-button>
                <ea-button variant="${this.confirmButtonType}" class="${bem.e("confirm")}" part="confirm-button" size="small">${this.confirmButtonText}</ea-button>
              </slot>
            </footer>
          </div>
        </div>
      </div>
    `;
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
        e.preventDefault();
        e.stopPropagation();
        this._keyboardActivated = true;
        if (!this.visible) {
          this.open();
        } else {
          this.close();
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
        this.close();
        trigger?.focus();
        return;
      }
      if (e.key === "Tab") {
        const focusable = this._getContentFocusableElements();
        if (focusable.length === 0) return;
        const firstEl = focusable[0];
        const lastEl = focusable[focusable.length - 1];

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

  /** 获取内容区内的可聚焦元素（排除触发元素），包括自定义元素内部的可聚焦元素 */
  private _getContentFocusableElements(): HTMLElement[] {
    const trigger = this._getReferenceTrigger();
    const result: HTMLElement[] = [];

    const collect = (root: Element) => {
      const children = root.querySelectorAll<HTMLElement>("*");
      for (const el of children) {
        if (el === trigger || trigger?.contains(el)) continue;
        if (el.hasAttribute("disabled")) continue;

        if (el.tabIndex >= 0 || el.matches(FOCUSABLE_SELECTOR)) {
          result.push(el);
          continue;
        }

        if (el.shadowRoot) {
          const shadowFocusable = el.shadowRoot.querySelector<HTMLElement>(
            FOCUSABLE_SELECTOR
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
        FOCUSABLE_SELECTOR
      );
      if (inner) {
        inner.focus();
        return;
      }
    }
    el.focus();
  }

  /** 焦点离开弹出框时自动关闭 */
  @listen("focusout")
  private _handleFocusout() {
    if (!this.visible) return;
    requestAnimationFrame(() => {
      if (!this.visible) return;
      const activeEl = document.activeElement;
      if (activeEl && this.contains(activeEl)) return;
      this.close();
    });
  }

  /** 取消按钮点击处理 */
  @listen("click", `.${bem.e("cancel")}`)
  private _handleCancelClick(): void {
    this.dispatchEvent(new EaPopconfirmCancelEvent());
    this.hide();
  }

  /** 确认按钮点击处理 */
  @listen("click", `.${bem.e("confirm")}`)
  private _handleConfirmClick(): void {
    this.dispatchEvent(new EaPopconfirmConfirmEvent());
    this.hide();
  }

  /** 参考元素点击处理 */
  @listen("click", 'slot[name="reference"]')
  private _handleReferenceClick(e: MouseEvent) {
    if (e.detail === 0) return;
    this.open();
  }

  /** 显示 Popconfirm 并注册全局关闭监听 */
  open(): void {
    const onClose = (e: MouseEvent) => {
      const isThis = this.contains(e.target as Node);

      if (!isThis) {
        this._globalCloseAbortController?.abort();
        this.hide();
      }
    };

    this.show();

    this._globalCloseAbortController?.abort();
    this._globalCloseAbortController = new AbortController();

    window.addEventListener("click", onClose, {
      signal: this._globalCloseAbortController.signal,
    });
  }

  /** 隐藏 Popconfirm 并清理全局关闭监听 */
  close(): void {
    this.hide();
    this._globalCloseAbortController?.abort();
  }

  $mount(): void {
    super.$mount();

    // 关闭时 inert 阻止聚焦
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
    this._globalCloseAbortController?.abort();
    this._popoverAbortController?.abort();
  }
}
