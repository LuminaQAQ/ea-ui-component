import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query, listen } from "@decorator";
import { Enum } from "@utils/Enum";
import stylesheet from "./index.scss?inline";
import "@/components/ea-icon/index";

const TAG_NAME = "ea-collapse-item" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 折叠面板子项组件，用于展示可折叠的内容区域，支持自定义标题和图标。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-icon
 *
 * @slot default - 默认插槽，用于面板内容。
 * @slot header - 自定义标题内容。
 * @slot icon - 自定义展开图标。
 *
 * @event ea-collapse-item-click - 点击标题时触发（内部通信），detail: `{ name: string, target: EaCollapseItem }`。
 *
 * @csspart container - 外层容器。
 * @csspart header-wrap - 标题容器。
 * @csspart header - 标题内容。
 * @csspart indicator - 展开图标容器。
 * @csspart icon - 默认展开图标。
 * @csspart content-wrap - 内容容器。
 *
 * @cssproperty --ea-collapse-item-border-top - 顶部边框。
 * @cssproperty --ea-collapse-item-border - 底部边框。
 * @cssproperty --ea-collapse-item-header-height - 标题高度。
 * @cssproperty --ea-collapse-item-header-font-size - 标题字体大小。
 * @cssproperty --ea-collapse-item-header-color - 标题颜色。
 * @cssproperty --ea-collapse-item-header-disabled-color - 禁用状态标题颜色。
 * @cssproperty --ea-collapse-item-header-font-weight - 标题字重。
 * @cssproperty --ea-collapse-item-content-height - 内容高度。
 * @cssproperty --ea-collapse-item-content-font-size - 内容字体大小。
 * @cssproperty --ea-collapse-item-content-color - 内容颜色。
 * @cssproperty --ea-collapse-item-content-padding-bottom - 内容底部内边距。
 * @cssproperty --ea-collapse-item-transition - 过渡动画时长。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaCollapseItem extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @query(bem.ce("header-wrap"))
  private _headerWrap!: HTMLElement;

  @query(`${bem.ce("header")} slot`)
  private _headerSlot!: HTMLSlotElement;

  @query(bem.ce("content"))
  private _content!: HTMLElement;

  @query("slot:not([name])")
  private _defaultSlot!: HTMLSlotElement;

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

  /** 更新容器类名 */
  updateContainerClasslist(): string {
    const className = bem(
      {
        [`indicator-${this.expandIconPosition}`]: this.expandIconPosition !== "right",
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

  /** 更新折叠面板高度 */
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

  html(): string {
    return `
      <div class="${this.updateContainerClasslist()}" part="container">
        <div class="${bem.e("header-wrap")}" part="header-wrap">
          <span class="${bem.e("header")}" part="header">
            <slot name="header"></slot>
          </span>
          <span class="${bem.e("indicator")}" part="indicator">
            <slot name="icon">
              <ea-icon class="${bem.e("expand-icon")}" name="angle-down" part="icon"></ea-icon>
            </slot>
          </span>
        </div>
        <div class="${bem.e("content")}" part="content-wrap">
          <slot></slot>
        </div>
      </div>
    `;
  }

  @listen("click", bem.ce("header-wrap"))
  private _handleClick(e: Event) {
    e.preventDefault();
    e.stopImmediatePropagation();

    if (this.disabled) return;

    this.emit("ea-collapse-item-click", {
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

  $mount(): void {
    this.updateContainerClasslist();
    if (this.active) {
      this._updateCollapseHeight(true);
    }
  }
}
