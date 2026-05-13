import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { listen } from "@decorator/listen";
import { query } from "@decorator/query";
import { Enum } from "@/utils/Enum";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-menu" as const;
const bem = createBEM(TAG_NAME);

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
      <ul class="${bem()}" role="menubar" part="container">
        <slot></slot>
      </ul>
    `;
  }

  private _updateChildrenMode = (mode: string) => {
    this.querySelectorAll("ea-sub-menu").forEach(subMenu => {
      subMenu.setAttribute("mode", mode);
    });
  };

  @listen("click")
  private _onMenuItemClick(e: MouseEvent) {
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

  private _onSubMenuClick = (e: Event) => {
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

    this.addEventListener("ea-sub-menu-click", this._onSubMenuClick, {
      signal: this._abortController.signal,
    });

    this.updateContainerClasslist();
    this._initDefaultActiveItem();
  }

  $beforeUnmount(): void {
    this._abortController?.abort();
  }
}

export default EaMenu;
