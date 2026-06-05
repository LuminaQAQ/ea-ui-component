import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query, listen } from "@decorator";
import { Enum } from "@utils/Enum";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-menu" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 导航菜单组件，为网站提供导航功能，支持水平和垂直两种模式。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-sub-menu
 * @dependency ea-menu-item
 * @dependency ea-menu-item-group
 *
 * @slot default - 菜单内容的默认插槽，放置 ea-menu-item / ea-sub-menu / ea-menu-item-group。
 *
 * @event select - 菜单项被选中时触发，detail: `{ index: string, target: HTMLElement }`。
 *
 * @csspart container - 外层容器元素。
 *
 * @cssproperty --ea-menu-bg-color - 菜单背景颜色。
 * @cssproperty --ea-menu-hover-bg-color - 菜单项悬停背景颜色。
 * @cssproperty --ea-menu-active-bg-color - 菜单项激活背景颜色。
 * @cssproperty --ea-menu-border-color - 菜单边框颜色。
 * @cssproperty --ea-menu-text-color - 菜单文字颜色。
 * @cssproperty --ea-menu-active-text-color - 菜单项激活文字颜色。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaMenu extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  private _abortController?: AbortController;

  @attribute({
    type: Enum(["horizontal", "vertical"]),
    default: "vertical",
    observer(this: EaMenu, newVal: string) {
      this._updateChildrenMode(newVal);
      this.updateContainerClasslist();
    },
  })
  mode: "horizontal" | "vertical" = "vertical";

  @attribute({
    type: String,
    default: "#ffffff",
    observer(this: EaMenu, newVal: string) {
      if (this._container) {
        this._container.style.setProperty("--ea-menu-bg-color", newVal);
      }
    },
  })
  backgroundColor: string = "#ffffff";

  @attribute({
    type: String,
    default: "#303133",
    observer(this: EaMenu, newVal: string) {
      if (this._container) {
        this._container.style.setProperty("--ea-menu-text-color", newVal);
      }
    },
  })
  textColor: string = "#303133";

  @attribute({
    type: String,
    default: "#409eff",
    observer(this: EaMenu, newVal: string) {
      if (this._container) {
        this._container.style.setProperty(
          "--ea-menu-active-text-color",
          newVal
        );
      }
    },
  })
  activeTextColor: string = "#409eff";

  @attribute({
    type: String,
    default: "",
  })
  defaultActive: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaMenu, newVal: string) {
      this._activateItem(newVal);
    },
  })
  active: string = "";

  @attribute({
    type: Boolean,
    default: false,
  })
  collapse: boolean = false;

  updateContainerClasslist(): string {
    const className = bem({
      [this.mode]: true,
    });

    if (this._container) {
      this._container.className = className;
    }

    return className;
  }

  html(): string {
    return `
      <ul class="${bem()}" role="menubar" aria-label="Menu" part="container">
        <slot></slot>
      </ul>
    `;
  }

  /**
   * 同步 mode 到所有 ea-sub-menu 子组件
   * @param mode - 菜单模式
   */
  private _updateChildrenMode = (mode: string) => {
    this.querySelectorAll("ea-sub-menu").forEach(subMenu => {
      subMenu.setAttribute("mode", mode);
    });
  };

  /** 处理键盘导航（Disclosure 模式 + 可选方向键增强） */
  @listen("keydown")
  private _handleKeydown(e: KeyboardEvent) {
    const target = e.target as HTMLElement;

    if (e.key === "Escape") {
      this.querySelectorAll("ea-sub-menu[open]").forEach(subMenu => {
        subMenu.removeAttribute("open");
      });
      return;
    }

    const menuItem = target.closest?.("ea-menu-item") as HTMLElement | null;
    if (!menuItem) return;

    if (e.key === "ArrowUp" && this.mode === "vertical") {
      e.preventDefault();
      this._focusPrevItem(menuItem);
      return;
    }
    if (e.key === "ArrowDown" && this.mode === "vertical") {
      e.preventDefault();
      this._focusNextItem(menuItem);
      return;
    }
    if (e.key === "ArrowLeft" && this.mode === "horizontal") {
      e.preventDefault();
      this._focusPrevItem(menuItem);
      return;
    }
    if (e.key === "ArrowRight" && this.mode === "horizontal") {
      e.preventDefault();
      this._focusNextItem(menuItem);
      return;
    }
    if (e.key === "Home") {
      e.preventDefault();
      const items = this._getTopLevelItems();
      if (items.length > 0) items[0].focus();
      return;
    }
    if (e.key === "End") {
      e.preventDefault();
      const items = this._getTopLevelItems();
      if (items.length > 0) items[items.length - 1].focus();
      return;
    }
  }

  /** 获取顶层菜单项（ea-menu-item 宿主元素 + ea-sub-menu 宿主元素），排除 disabled */
  private _getTopLevelItems(): HTMLElement[] {
    const items: HTMLElement[] = [];
    const slot = this._container.querySelector("slot");
    if (!slot) return items;

    const children = (slot as HTMLSlotElement).assignedElements();
    for (const child of children) {
      if (child.tagName === "EA-MENU-ITEM") {
        if (!(child as HTMLElement).hasAttribute("disabled")) {
          items.push(child as HTMLElement);
        }
      } else if (child.tagName === "EA-SUB-MENU") {
        if (!(child as HTMLElement).hasAttribute("disabled")) {
          items.push(child as HTMLElement);
        }
      }
    }
    return items;
  }

  /** 聚焦上一个顶层菜单项 */
  private _focusPrevItem(currentItem: HTMLElement): void {
    const items = this._getTopLevelItems();
    const currentIndex = items.indexOf(currentItem);
    if (currentIndex > 0) {
      items[currentIndex - 1].focus();
    }
  }

  /** 聚焦下一个顶层菜单项 */
  private _focusNextItem(currentItem: HTMLElement): void {
    const items = this._getTopLevelItems();
    const currentIndex = items.indexOf(currentItem);
    if (currentIndex >= 0 && currentIndex < items.length - 1) {
      items[currentIndex + 1].focus();
    }
  }

  @listen("click")
  private _handleMenuItemClick(e: MouseEvent) {
    const target = (e.target as HTMLElement).closest(
      "ea-menu-item"
    ) as HTMLElement | null;
    const subMenu = (e.target as HTMLElement).closest("ea-sub-menu");

    if (target) {
      if (target.hasAttribute("disabled")) return;

      this.active = target.getAttribute("index") || "";

      this.emit("select", {
        detail: {
          index: target.getAttribute("index") || "",
          target,
        },
      });
    } else if (subMenu) {
      const items = [...this.querySelectorAll("ea-menu-item")] as HTMLElement[];
      const subMenus = [
        ...this.querySelectorAll("ea-sub-menu"),
      ] as HTMLElement[];
      const cb = (item: HTMLElement) => item.removeAttribute("active");
      items.forEach(cb);
      subMenus.forEach(cb);
    }
  }

  /**
   * 处理子菜单内菜单项点击事件
   */
  private _handleSubMenuClick = (e: Event) => {
    const customEvent = e as CustomEvent;
    const detail = customEvent.detail || {};

    if (detail.itemIndex && detail.target) {
      if ((detail.target as HTMLElement).hasAttribute("disabled")) return;

      this.active = detail.itemIndex;

      this.emit("select", {
        detail: {
          index: detail.itemIndex,
          target: detail.target,
        },
      });
    }
  };

  /**
   * 根据 index 激活对应菜单项及其祖先子菜单
   * @param index - 菜单项索引
   */
  private _activateItem = (index: string) => {
    if (!index) return;

    const items = [...this.querySelectorAll("ea-menu-item")] as HTMLElement[];
    const subMenus = [...this.querySelectorAll("ea-sub-menu")] as HTMLElement[];

    items.forEach(item => item.removeAttribute("active"));
    subMenus.forEach(sub => sub.removeAttribute("active"));

    const target = this.querySelector(
      `ea-menu-item[index="${index}"]`
    ) as HTMLElement | null;
    if (!target) return;

    target.setAttribute("active", "true");

    let parent = target.parentElement;
    while (parent) {
      if (parent.tagName === "EA-SUB-MENU") {
        parent.setAttribute("active", "true");
      }
      if (parent === this) break;
      parent = parent.parentElement;
    }
  };

  /**
   * 初始化默认激活项
   */
  private _initDefaultActiveItem = () => {
    const defaultActiveItem = this.querySelector(
      `ea-menu-item[index="${this.defaultActive}"]`
    ) as HTMLElement | null;

    if (defaultActiveItem) {
      defaultActiveItem.click();
    }
  };

  $mount(): void {
    this._abortController?.abort();
    this._abortController = new AbortController();

    this.addEventListener("ea-sub-menu-click", this._handleSubMenuClick, {
      signal: this._abortController.signal,
    });

    this.updateContainerClasslist();

    if (this.mode === "vertical") {
      this._container.setAttribute("aria-orientation", "vertical");
    }

    this._initDefaultActiveItem();
  }

  $beforeUnmount(): void {
    this._abortController?.abort();
  }
}

export default EaMenu;
