import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, property, query, listen } from "@decorator";
import { Enum } from "@utils/Enum";
import stylesheet from "./index.scss?inline";
import "@/components/ea-icon/index";

const TAG_NAME = "ea-sub-menu" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 子菜单组件，支持展开/收起和嵌套，用于构建多级导航菜单。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-icon
 *
 * @slot title - 子菜单标题内容。
 * @slot default - 子菜单项内容，放置 ea-menu-item / ea-menu-item-group 等。
 *
 * @event ea-sub-menu-click - 子菜单内菜单项点击时触发，detail: `{ index: string, itemIndex: string, target: HTMLElement }`。
 *
 * @csspart container - 外层容器元素。
 * @csspart title - 标题容器元素。
 * @csspart arrow - 展开/收起箭头图标元素。
 * @csspart content - 子菜单列表容器元素。
 *
 * @cssproperty --ea-sub-menu-spacing - 子菜单水平内边距。
 * @cssproperty --ea-sub-menu-height - 子菜单标题高度。
 * @cssproperty --ea-sub-menu-font-size - 子菜单字体大小。
 * @cssproperty --ea-sub-menu-bg-color - 子菜单背景颜色。
 * @cssproperty --ea-sub-menu-text-color - 子菜单文字颜色。
 * @cssproperty --ea-sub-menu-border-color - 子菜单激活边框颜色。
 * @cssproperty --ea-sub-menu-active-text-color - 子菜单激活文字颜色。
 * @cssproperty --ea-sub-menu-active-bg-color - 子菜单激活背景颜色。
 * @cssproperty --ea-sub-menu-dropdown-box-shadow - 下拉菜单阴影。
 * @cssproperty --ea-sub-menu-transition - 子菜单过渡动画时长。
 * @cssproperty --ea-sub-menu-z-index - 子菜单层级。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaSubMenu extends EaBase {
  private static _instanceCount: number = 0;

  private readonly _uniqueId: number = EaSubMenu._instanceCount++;

  @query(bem.cb())
  private _container!: HTMLElement;

  @query(bem.ce("title"))
  private _titleEl!: HTMLElement;

  @query('slot[name="title"]')
  private _titleSlot!: HTMLSlotElement;

  @query(bem.ce("content"))
  private _contentEl!: HTMLElement;

  @query(bem.ce("arrow"))
  private _arrowEl!: HTMLElement;

  private _dropdownAbortController?: AbortController;
  private _modeAbortController?: AbortController;
  private _focusoutRafId: number | null = null;

  @property({
    type: Boolean,
    default: false,
    a11y: {
      ariaAttr: "aria-expanded",
      target: bem.ce("title"),
    },
    observer(this: EaSubMenu) {
      this.updateContainerClasslist();
    },
  })
  open: boolean = false;

  @property({
    type: Boolean,
    default: false,
    a11y: {
      ariaAttr: "inert",
      target: ".ea-sub-menu__content",
      map: (v: boolean) => (v ? null : ""),
    },
  })
  _contentOpen: boolean = false;

  @attribute({
    type: String,
    default: "",
  })
  index: string = "";

  @attribute({
    type: Boolean,
    default: false,
    a11y: {
      ariaAttr: "aria-disabled",
      map: v => String(v),
    },
    observer(this: EaSubMenu) {
      this.updateContainerClasslist();
    },
  })
  disabled: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaSubMenu) {
      this.updateContainerClasslist();
    },
  })
  active: boolean = false;

  @attribute({
    type: Enum(["horizontal", "vertical"]),
    default: "vertical",
    observer(this: EaSubMenu, newVal: string) {
      this._handleModeChange(newVal);
      this.updateContainerClasslist();
    },
  })
  mode: "horizontal" | "vertical" = "vertical";

  @attribute({
    type: String,
    default: "",
    observer(this: EaSubMenu, newVal: string) {
      if (this._titleSlot) {
        this._titleSlot.textContent = newVal;
      }
    },
  })
  label: string = "";

  updateContainerClasslist(): string {
    const className = bem(
      {
        [this.mode]: !!this.mode,
      },
      {
        disabled: this.disabled,
        active: this.active,
        open: this.open,
      }
    );

    if (this._container) {
      this._container.className = className;
    }

    return className;
  }

  html(): string {
    return `
      <div class="${bem()}" part="container">
        <header class="${bem.e("title")}" part="title" tabindex="-1" role="menuitem">
          <slot name="title"></slot>
          <ea-icon name="angle-down" class="${bem.e("arrow")}" part="arrow"></ea-icon>
        </header>
        <ul class="${bem.e("content")}" part="content" role="menu">
          <slot></slot>
        </ul>
      </div>
    `;
  }

  /** 处理标题元素的键盘事件 */
  @listen("keydown", bem.ce("title"))
  private _handleTitleKeydown(e: KeyboardEvent) {
    if (this.disabled) return;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      if (!this.open) {
        this.open = true;
        if (this.mode === "vertical") {
          this._animateContentOpen();
        }
      } else {
        this.open = false;
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      e.stopPropagation();
      if (!this.open) {
        this.open = true;
        if (this.mode === "vertical") {
          this._animateContentOpen();
        }
      }
      this._focusFirstItem();
      return;
    }

    if (e.key === "ArrowRight" && this.mode === "horizontal") {
      e.preventDefault();
      e.stopPropagation();
      if (!this.open) {
        this.open = true;
      }
      this._focusFirstItem();
      return;
    }

    if (e.key === "Escape" && this.open) {
      e.preventDefault();
      e.stopPropagation();
      this.open = false;
      return;
    }
  }

  /** 垂直模式展开内容区域的高度动画 */
  private _animateContentOpen(): void {
    if (this.mode !== "vertical" || !this._contentEl) return;

    this._contentEl.style.height = `${this._contentEl.scrollHeight}px`;
    this._contentEl.addEventListener(
      "transitionend",
      () => {
        this._contentEl.style.height = "100%";
      },
      { once: true }
    );
  }

  /**
   * 处理子菜单内菜单项的键盘事件
   * 监听在宿主元素上，因为 slotted 元素的事件通过 Light DOM 冒泡
   */
  @listen("keydown")
  private _handleContentKeydown(e: KeyboardEvent) {
    const target = e.target as HTMLElement;
    const menuItem = target.closest?.("ea-menu-item") as HTMLElement | null;
    if (!menuItem) return;

    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      this.open = false;
      this._titleEl.focus();
      return;
    }

    if (e.key === "ArrowLeft" && this.mode === "vertical" && this.open) {
      e.preventDefault();
      e.stopPropagation();
      this.open = false;
      this._titleEl.focus();
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      e.stopPropagation();
      this._focusPrevItem(menuItem);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      e.stopPropagation();
      this._focusNextItem(menuItem);
      return;
    }

    if (e.key === "ArrowLeft" && this.mode === "horizontal") {
      e.preventDefault();
      e.stopPropagation();
      this._focusPrevItem(menuItem);
      return;
    }

    if (e.key === "ArrowRight" && this.mode === "horizontal") {
      e.preventDefault();
      e.stopPropagation();
      this._focusNextItem(menuItem);
      return;
    }

    if (e.key === "Home") {
      e.preventDefault();
      e.stopPropagation();
      const items = this._getSubMenuItems();
      if (items.length > 0) items[0].focus();
      return;
    }

    if (e.key === "End") {
      e.preventDefault();
      e.stopPropagation();
      const items = this._getSubMenuItems();
      if (items.length > 0) items[items.length - 1].focus();
      return;
    }
  }

  /** 聚焦子菜单中的第一个菜单项 */
  private _focusFirstItem(): void {
    const items = this._getSubMenuItems();
    if (items.length === 0) return;
    queueMicrotask(() => items[0].focus());
  }

  /** 聚焦子菜单中的下一个菜单项 */
  private _focusNextItem(currentItem: HTMLElement): void {
    const items = this._getSubMenuItems();
    if (items.length === 0) return;

    const currentIndex = items.indexOf(currentItem);
    const nextIndex = currentIndex + 1;
    if (nextIndex < items.length) items[nextIndex].focus();
  }

  /** 聚焦子菜单中的上一个菜单项 */
  private _focusPrevItem(currentItem: HTMLElement): void {
    const items = this._getSubMenuItems();
    if (items.length === 0) return;

    const currentIndex = items.indexOf(currentItem);
    if (currentIndex > 0) {
      items[currentIndex - 1].focus();
    } else {
      this._titleEl.focus();
    }
  }

  /** 获取子菜单内所有菜单项 */
  private _getSubMenuItems(): HTMLElement[] {
    return [
      ...this.querySelectorAll("ea-menu-item:not([disabled])"),
    ] as HTMLElement[];
  }

  /** 焦点离开子菜单时自动关闭 */
  @listen("focusout")
  private _handleFocusout() {
    if (!this.open) return;
    this._focusoutRafId = requestAnimationFrame(() => {
      this._focusoutRafId = null;
      if (!this.open) return;
      const activeEl = document.activeElement;
      if (activeEl && (this === activeEl || this.contains(activeEl))) return;
      this.open = false;
    });
  }

  /** 焦点进入子菜单时取消待执行的关闭检查，并将焦点委托到 title 元素 */
  @listen("focusin")
  private _handleFocusin(e: FocusEvent) {
    if (this._focusoutRafId !== null) {
      cancelAnimationFrame(this._focusoutRafId);
      this._focusoutRafId = null;
    }
    if (e.target === this && this._titleEl) {
      this._titleEl.focus();
    }
  }

  @listen("click")
  private _handleMenuItemClick(e: MouseEvent) {
    e.stopImmediatePropagation();
    e.preventDefault();

    if (this.disabled) return;

    const target = (e.target as HTMLElement).closest("ea-menu-item");
    const isChild =
      this.closest("ea-sub-menu") === this
        ? this.parentElement?.closest("ea-sub-menu")
        : this.closest("ea-sub-menu");

    if (!target) return;
    if (target.hasAttribute("disabled")) return;

    this.emit("ea-sub-menu-click", {
      detail: {
        index: this.index,
        itemIndex: target.getAttribute("index") || "",
        target,
      },
      bubbles: true,
    });

    this.setAttribute("active", "true");
    if (isChild) isChild.setAttribute("active", "true");

    target.setAttribute("active", "true");
  }

  /** 设置折叠内容的 inert 状态：折叠时阻止焦点进入 */
  private _updateContentInert(): void {
    this._contentOpen = this.open;
  }

  /** 设置 ARIA 关联属性 */
  private _setupAria(): void {
    const id = `ea-sub-menu-${this._uniqueId}`;
    this._titleEl.setAttribute("id", `${id}-title`);
    this._titleEl.setAttribute("aria-controls", `${id}-content`);
    this._titleEl.setAttribute("aria-haspopup", "menu");
    this._titleEl.setAttribute("aria-expanded", String(this.open));
    this._contentEl.setAttribute("id", `${id}-content`);
    this._contentEl.setAttribute("aria-labelledby", `${id}-title`);
  }

  /**
   * 水平模式下的鼠标悬停展开处理
   */
  private _onHoverEvent = () => {
    this._dropdownAbortController?.abort();
    this._dropdownAbortController = new AbortController();

    this.open = true;

    const onLeaveEvent = () => {
      this.open = false;
      this._dropdownAbortController?.abort();
    };

    this.addEventListener("mouseleave", onLeaveEvent, {
      signal: this._dropdownAbortController.signal,
    });
  };

  /**
   * 垂直模式下的点击折叠/展开处理
   */
  private _onVerticalCollapseEvent = () => {
    if (this.disabled) return;

    this.open = !this.open;

    if (!this.open) {
      this._contentEl.style.setProperty("--ea-sub-menu-transition", "none");
      void this._contentEl.offsetHeight;
      this._contentEl.style.height = `${this._contentEl.scrollHeight}px`;
      void this._contentEl.offsetHeight;
      this._contentEl.style.removeProperty("--ea-sub-menu-transition");
    }

    this._contentEl.style.height = `${
      this.open ? this._contentEl.scrollHeight : 0
    }px`;

    this._contentEl.addEventListener(
      "transitionend",
      () => {
        this._contentEl.style.height = this.open ? "100%" : "0";
      },
      { once: true }
    );
  };

  /**
   * 根据 mode 切换交互方式
   * @param mode - 菜单模式
   */
  private _handleModeChange = (mode: string = this.mode) => {
    this._modeAbortController?.abort();
    this._modeAbortController = new AbortController();

    if (mode === "vertical") {
      this._titleEl.addEventListener("click", this._onVerticalCollapseEvent, {
        signal: this._modeAbortController.signal,
      });
    } else {
      this.addEventListener("mouseenter", this._onHoverEvent, {
        signal: this._modeAbortController.signal,
      });
    }
  };

  $mount(): void {
    this.tabIndex = 0;
    this._handleModeChange();
    this.updateContainerClasslist();
    this._updateContentInert();
    this._setupAria();
  }

  $beforeUnmount(): void {
    this._dropdownAbortController?.abort();
    this._modeAbortController?.abort();
  }
}

export default EaSubMenu;
