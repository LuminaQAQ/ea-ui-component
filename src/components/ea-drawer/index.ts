import { EaOverlay } from "@/common/ea-overlay";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { listen } from "@decorator/listen";
import { property } from "@decorator/property";
import { createBEM } from "@utils/bem";
import { Enum } from "@/utils/Enum";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-drawer" as const;
const bem = createBEM(TAG_NAME);

const DIRECTION_TYPES = ["rtl", "ltr", "ttb", "btt"] as const;
type DirectionType = (typeof DIRECTION_TYPES)[number];

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaDrawer extends EaOverlay {
  // ==================== DOM 元素引用 ====================

  @query(".ea-overlay")
  private _container!: HTMLElement;

  @query(".ea-drawer-main__header")
  private _header!: HTMLElement;

  @query(".ea-drawer-main__heading")
  private _heading!: HTMLElement;

  // ==================== 属性定义 ====================

  @attribute({
    type: Enum(DIRECTION_TYPES),
    default: "rtl",
    observer(this: EaDrawer) {
      this.updateContainerClasslist();
    },
  })
  direction: DirectionType = "rtl";

  @attribute({
    type: Boolean,
    default: true,
    observer(this: EaDrawer) {
      this.updateContainerClasslist();
    },
  })
  withHeader: boolean = true;

  @attribute({
    type: String,
    default: "",
    observer(this: EaDrawer, newVal: string) {
      if (this._heading) this._heading.textContent = newVal;
    },
  })
  heading: string = "";

  @attribute({
    type: Boolean,
    default: true,
    observer(this: EaDrawer) {
      this.updateContainerClasslist();
    },
  })
  showClose: boolean = true;

  @attribute({
    type: String,
    default: "30%",
    observer(this: EaDrawer, newVal: string) {
      this.style.setProperty("--ea-drawer-size", newVal);
    },
  })
  size: string = "30%";

  @property({
    type: Function,
    default: null,
  })
  beforeClose: ((done: () => void) => void) | null = null;

  // ==================== 方法 ====================

  html(): string {
    const tpl = document.createElement("template");
    tpl.innerHTML = super.html();

    const contentContainer = tpl.content.querySelector(".ea-overlay__content")!;

    contentContainer.innerHTML = `
      <div class='ea-drawer-main' part='container'>
        <header class='ea-drawer-main__header' part='header'>
          <slot name="title">
            <span class='ea-drawer-main__heading' part='heading'></span>
            <ea-icon class='ea-drawer-main__close-icon' name='xmark' part='close-icon'></ea-icon>
          </slot>
        </header>
        <main class='ea-drawer-main__content' part='content'>
          <slot></slot>
        </main>
        <footer class='ea-drawer-main__footer' part='footer'>
          <slot name='footer'></slot>
        </footer>
      </div>
    `;

    return tpl.innerHTML;
  }

  updateContainerClasslist(): string {
    const className = bem(
      { [this.direction]: true },
      {
        "close-hidden": !this.showClose,
        "header-hidden": !this.withHeader,
      }
    );

    const parentClassName = super.updateContainerClasslist();

    const fullClassName = `${parentClassName} ${className}`.trim();

    if (this._container) this._container.className = fullClassName;

    return fullClassName;
  }

  // ==================== 事件处理 ====================

  @listen("click", ".ea-drawer-main__close-icon")
  private _handleCloseIconClick(): void {
    if (!this.showClose) return;
    this.hide();
  }

  @listen("closed")
  private _handleClosed(e: CustomEvent): void {
    if (e.target !== this) return;
    this.hide();
  }

  // ==================== 生命周期 ====================

  $mount(): void {
    super.$mount?.();

    try {
      this.setAttribute("role", "dialog");
    } catch {
      this.role = "dialog";
    }

    this.updateContainerClasslist();
  }

  $beforeUnmount(): void {
    super.$beforeUnmount?.();
  }
}
