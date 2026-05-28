import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query, listen } from "@decorator";
import { Enum } from "@utils/Enum";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-card" as const;
const bem = createBEM(TAG_NAME);

const SHADOW_TYPES = ["always", "hover", "never"] as const;
type ShadowType = (typeof SHADOW_TYPES)[number];

/**
 * @summary 卡片容器组件，将信息聚合在卡片容器中展示，支持标题、内容、页脚区域和阴影效果。
 * @status stable
 * @since 3.0
 *
 * @slot default - 默认插槽，用于卡片内容。
 * @slot header - 卡片标题区域。
 * @slot footer - 卡片页脚区域。
 *
 * @csspart container - 容器元素。
 * @csspart header - 标题容器元素。
 * @csspart content - 内容容器元素。
 * @csspart footer - 页脚容器元素。
 *
 * @cssproperty --ea-card-border-color - 边框颜色。
 * @cssproperty --ea-card-border-radius - 圆角大小。
 * @cssproperty --ea-card-box-shadow - 阴影效果。
 * @cssproperty --ea-card-background-color - 背景颜色。
 * @cssproperty --ea-card-padding - 内边距。
 * @cssproperty --ea-card-transition - 过渡动画时长。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaCard extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @query(`${bem.ce("header")} slot[name="header"]`)
  private _headerSlot!: HTMLSlotElement;

  @query(`${bem.ce("footer")} slot[name="footer"]`)
  private _footerSlot!: HTMLSlotElement;

  private _states = {
    isHeaderEmpty: true,
    isFooterEmpty: true,
  };

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

  /** 更新容器类名 */
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

  /** 渲染模板 */
  html(): string {
    return `
      <div class="${this.updateContainerClasslist()}" part="container">
        <div class="${bem.e("header")}" part="header">
          <slot name="header"></slot>
        </div>
        <div class="${bem.e("content")}" part="content">
          <slot></slot>
        </div>
        <div class="${bem.e("footer")}" part="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }

  /** 更新 header 插槽空状态 */
  @listen("slotchange", `${bem.ce("header")} slot[name="header"]`)
  private _handleHeaderSlotChange(e: Event) {
    const target = e.target as HTMLSlotElement;
    const isEmpty = target.assignedElements().length === 0;
    this._states.isHeaderEmpty = isEmpty;
    this.updateContainerClasslist();
  }

  /** 更新 footer 插槽空状态 */
  @listen("slotchange", `${bem.ce("footer")} slot[name="footer"]`)
  private _handleFooterSlotChange(e: Event) {
    const target = e.target as HTMLSlotElement;
    const isEmpty = target.assignedElements().length === 0;
    this._states.isFooterEmpty = isEmpty;
    this.updateContainerClasslist();
  }

  $mount(): void {
    this.updateContainerClasslist();
  }
}
