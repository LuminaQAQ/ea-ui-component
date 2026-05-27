import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { listen } from "@decorator/listen";
import { Enum } from "@/utils/Enum";

import stylesheet from "./index.scss?inline";
import "@/components/ea-icon/index";

const TAG_NAME = "ea-tab" as const;
const bem = createBEM(TAG_NAME);

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaTab extends EaBase {
  /** @returns {HTMLElement | null} */
  get _hostTabsContext(): HTMLElement | null {
    try {
      return this.closest("ea-tabs");
    } catch {
      return null;
    }
  }

  // ==================== DOM 元素引用 ====================

  @query(".ea-tab")
  private _container!: HTMLElement;

  @query(".ea-tab__close-icon")
  private _closeIcon!: HTMLElement;

  // ==================== 属性定义 ====================

  @attribute({
    type: String,
    default: "",
  })
  panel: string = "";

  @attribute({
    type: Enum(["", "card", "border-card"]),
    default: "",
    observer(this: EaTab) {
      this.updateContainerClasslist();
    },
  })
  type: "" | "card" | "border-card" = "";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaTab) {
      this.updateContainerClasslist();
    },
  })
  disabled: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaTab) {
      this.updateContainerClasslist();
    },
  })
  active: boolean = false;

  @attribute({
    type: String,
    default: "top",
    observer(this: EaTab) {
      this.updateContainerClasslist();
    },
  })
  tabPosition: string = "top";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaTab) {
      this.updateContainerClasslist();
    },
  })
  editable: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaTab) {
      this.updateContainerClasslist();
    },
  })
  closable: boolean = false;

  // ==================== 方法 ====================

  /**
   * 更新容器类名
   */
  updateContainerClasslist(): string {
    let tabEls = this._hostTabsContext?.querySelectorAll("ea-tab");
    tabEls = tabEls?.length > 0 ? [...tabEls] : ([] as Element[]);

    const className = bem(
      {
        [this.type]:
          this.type === this._hostTabsContext?.getAttribute("type") || "",
        [this.tabPosition]: true,
      },
      {
        disabled: this.disabled,
        active: this.active,
        last: tabEls.slice(-1)[0] === this,
        first: tabEls[0] === this,
        closable: this.closable ? this.closable : this.editable,
      }
    );

    if (this._container) {
      this._container.className = className;
    }

    return className;
  }

  /**
   * 渲染模板
   */
  html(): string {
    return `
      <div class='${bem()}' part='container'>
        <slot></slot>
        <ea-icon class="${bem.e("close-icon")}" name="xmark" part="close-icon"></ea-icon>
      </div>
    `;
  }

  // ==================== 事件处理 ====================

  /**
   * 关闭图标点击事件
   */
  @listen("click", ".ea-tab__close-icon")
  private _onCloseIconClick(e: Event): void {
    e.preventDefault();
    (e as MouseEvent).stopImmediatePropagation();

    this.emit("ea-tab-close-icon-click", {
      detail: {
        panel: this.panel,
      },
      bubbles: true,
    });
  }

  // ==================== 生命周期 ====================

  $mount(): void {
    this.updateContainerClasslist();
  }
}
