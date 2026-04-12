import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { listen } from "@decorator/listen";
import stylesheet from "./index.scss?inline";
import { Enum } from "@/utils/Enum";

const TAG_NAME = "ea-card" as const;
const bem = createBEM(TAG_NAME);

const SHADOW_TYPES = ["always", "hover", "never"] as const;
type ShadowType = (typeof SHADOW_TYPES)[number];

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaCard extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(".ea-card")
  private _container!: HTMLElement;

  @query(".ea-card__header")
  private _headerContainer!: HTMLElement;

  @query(".ea-card__footer")
  private _footerContainer!: HTMLElement;

  @query('.ea-card__header slot[name="header"]')
  private _headerSlot!: HTMLSlotElement;

  @query('.ea-card__footer slot[name="footer"]')
  private _footerSlot!: HTMLSlotElement;

  // ==================== 状态管理 ====================

  private _states = {
    isHeaderEmpty: true,
    isFooterEmpty: true,
  };

  // ==================== 属性定义 ====================

  @attribute({
    type: Enum(SHADOW_TYPES),
    default: "always",
    observer(this: EaCard) {
      this.updateContainerClasslist();
    },
  })
  shadow: ShadowType = "always";

  @attribute({
    type: String,
    default: "",
    observer(this: EaCard, newVal: string) {
      this._headerSlot.innerText = newVal;
      this._states.isHeaderEmpty = !newVal;
      this.updateContainerClasslist();
    },
  })
  header: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaCard, newVal: string) {
      this._footerSlot.innerText = newVal;
      this._states.isFooterEmpty = !newVal;
      this.updateContainerClasslist();
    },
  })
  footer: string = "";

  // ==================== 方法 ====================

  /**
   * 更新容器类名
   */
  updateContainerClasslist(): string {
    const className = bem(
      {},
      {
        [this.shadow + "-shadow"]: this.shadow && this.shadow !== "never",
        "header-empty": this._states.isHeaderEmpty,
        "footer-empty": this._states.isFooterEmpty,
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
      <div class="${this.updateContainerClasslist()}" part="container">
        <div class="ea-card__header" part="header">
          <slot name="header"></slot>
        </div>
        <div class="ea-card__content" part="content">
          <slot></slot>
        </div>
        <div class="ea-card__footer" part="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }

  // ==================== 事件处理 ====================

  /**
   * 更新插槽空状态
   */
  @listen("slotchange", '.ea-card__header slot[name="header"]')
  private _handleHeaderSlotChange(e: Event) {
    const target = e.target as HTMLSlotElement;
    const isEmpty = target.assignedElements().length === 0;
    this._states.isHeaderEmpty = isEmpty;
    this.updateContainerClasslist();
  }

  /**
   * 更新插槽空状态
   */
  @listen("slotchange", '.ea-card__footer slot[name="footer"]')
  private _handleFooterSlotChange(e: Event) {
    const target = e.target as HTMLSlotElement;
    const isEmpty = target.assignedElements().length === 0;
    this._states.isFooterEmpty = isEmpty;
    this.updateContainerClasslist();
  }

  // ==================== 生命周期 ====================

  $mount(): void {
    this.updateContainerClasslist();
  }
}
