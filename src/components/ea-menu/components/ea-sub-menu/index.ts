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

  @property({
    type: Boolean,
    default: false,
    observer(this: EaSubMenu) {
      this.updateContainerClasslist();
    },
  })
  open: boolean = false;

  @attribute({
    type: String,
    default: "",
  })
  index: string = "";

  @attribute({
    type: Boolean,
    default: false,
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
        <header class="${bem.e("title")}" part="title">
          <slot name="title"></slot>
          <ea-icon name="angle-down" class="${bem.e("arrow")}" part="arrow"></ea-icon>
        </header>
        <ul class="${bem.e("content")}" part="content">
          <slot></slot>
        </ul>
      </div>
    `;
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
    this._handleModeChange();
    this.updateContainerClasslist();
  }

  $beforeUnmount(): void {
    this._dropdownAbortController?.abort();
    this._modeAbortController?.abort();
  }
}

export default EaSubMenu;
