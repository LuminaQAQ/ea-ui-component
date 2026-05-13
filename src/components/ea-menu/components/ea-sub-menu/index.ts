import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { listen } from "@decorator/listen";
import { property } from "@decorator/property";
import { query } from "@decorator/query";
import { Enum } from "@/utils/Enum";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-sub-menu" as const;
const bem = createBEM(TAG_NAME);

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

  private _abortController?: AbortController;
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
  private _onMenuItemClick(e: MouseEvent) {
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
    this._abortController?.abort();
    this._abortController = new AbortController();

    this._handleModeChange();
    this.updateContainerClasslist();
  }

  $beforeUnmount(): void {
    this._abortController?.abort();
    this._dropdownAbortController?.abort();
    this._modeAbortController?.abort();
  }
}

export default EaSubMenu;
