import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { listen } from "@decorator/listen";
import { Enum } from "@/utils/Enum";
import stylesheet from "./index.scss?inline";
import "@/components/ea-icon/index";

const TAG_NAME = "ea-collapse-item" as const;
const bem = createBEM(TAG_NAME);

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaCollapseItem extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(".ea-collapse-item")
  private _container!: HTMLElement;

  @query(".ea-collapse-item__header-wrap")
  private _headerWrap!: HTMLElement;

  @query(".ea-collapse-item__header slot")
  private _headerSlot!: HTMLSlotElement;

  @query(".ea-collapse-item__content")
  private _content!: HTMLElement;

  @query("slot:not([name])")
  private _defaultSlot!: HTMLSlotElement;

  // ==================== 属性定义 ====================

  @attribute({
    type: String,
    default: "",
    observer(this: EaCollapseItem, newVal: string) {
      if (this._headerSlot) {
        this._headerSlot.textContent = newVal;
      }
    },
  })
  header: string = "";

  @attribute({
    type: String,
    default: "",
  })
  name: string = "";

  @attribute({
    type: Enum(["left", "right"] as const),
    default: "right",
    observer(this: EaCollapseItem) {
      this.updateContainerClasslist();
    },
  })
  expandIconPosition: "left" | "right" = "right";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaCollapseItem) {
      this.updateContainerClasslist();
    },
  })
  disabled: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaCollapseItem, newVal: boolean) {
      this._updateCollapseHeight(newVal);
    },
  })
  active: boolean = false;

  // ==================== 方法 ====================

  /**
   * 更新容器类名
   */
  updateContainerClasslist(): string {
    const className = bem(
      {
        [`indicator-${this.expandIconPosition}`]: this.expandIconPosition,
      },
      {
        disabled: this.disabled,
      }
    );

    if (this._container) {
      this._container.className = className;
    }

    return className;
  }

  /**
   * 更新折叠面板高度
   */
  private _updateCollapseHeight(isActive: boolean = this.active): void {
    queueMicrotask(() => {
      if (this._container) {
        this._container.style.setProperty(
          "--ea-collapse-item-content-height",
          isActive ? `${this._content.scrollHeight}px` : "0"
        );
      }
    });
  }

  /**
   * 渲染模板
   */
  html(): string {
    return `
      <div class="${this.updateContainerClasslist()}" part="container">
        <div class="${bem.e("header-wrap")}" part="header-wrap">
          <span class="${bem.e("header")}" part="header">
            <slot name="header"></slot>
          </span>
          <span class="${bem.e("indicator")}" part="indicator">
            <slot name="icon">
              <ea-icon class="default-expand-icon" name="angle-down" part="icon"></ea-icon>
            </slot>
          </span>
        </div>
        <div class="${bem.e("content")}" part="content-wrap">
          <slot></slot>
        </div>
      </div>
    `;
  }

  // ==================== 事件处理 ====================

  @listen("click", ".ea-collapse-item__header-wrap")
  private _handleClick(e: Event) {
    e.preventDefault();
    e.stopImmediatePropagation();

    if (this.disabled) return;

    this.emit("collapse-item-click", {
      detail: {
        name: this.name,
        target: this,
      },
      bubbles: true,
      cancelable: true,
    });
  }

  @listen("slotchange", "slot:not([name])")
  private _handleSlotChange() {
    if (this._container) {
      this._container.style.setProperty(
        "--ea-collapse-item-content-height",
        "auto"
      );
      this._updateCollapseHeight();
    }
  }

  // ==================== 生命周期 ====================

  $mount(): void {
    this.updateContainerClasslist();
    if (this.active) {
      this._updateCollapseHeight(true);
    }
  }
}
