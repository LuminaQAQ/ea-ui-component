import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query } from "@decorator";
import { Enum } from "@utils/Enum";
import {
  VARIANT_TYPES,
  VARIANT_ICON_MAP,
  type VariantType,
} from "@constants/variant";
import stylesheet from "./index.scss?inline";
import "@/components/ea-icon/index";

const TAG_NAME = "ea-result" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 结果组件，用于展示操作结果或异常状态反馈，支持多种类型和自定义图标。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-icon
 *
 * @slot icon - 自定义图标内容。
 * @slot title - 自定义标题内容。
 * @slot sub-title - 自定义副标题内容。
 * @slot extra - 额外内容区域。
 *
 * @csspart container - 容器元素。
 * @csspart icon-wrap - 图标容器元素。
 * @csspart icon - 图标元素。
 * @csspart title - 标题元素。
 * @csspart sub-title - 副标题元素。
 * @csspart extra - 额外内容元素。
 *
 * @cssproperty --ea-result-icon-size - 图标尺寸。
 * @cssproperty --ea-result-padding - 组件内边距。
 * @cssproperty --ea-result-title-margin-top - 标题上边距。
 * @cssproperty --ea-result-title-font-size - 标题字体大小。
 * @cssproperty --ea-result-title-color - 标题颜色。
 * @cssproperty --ea-result-sub-title-margin-top - 副标题上边距。
 * @cssproperty --ea-result-sub-title-font-size - 副标题字体大小。
 * @cssproperty --ea-result-sub-title-color - 副标题颜色。
 * @cssproperty --ea-result-extra-margin-top - 额外内容上边距。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaResult extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @query(`${bem.ce("icon-wrap")} ea-icon`)
  private _icon!: HTMLElement;

  @query(`${bem.ce("title")} slot[name="title"]`)
  private _titleSlot!: HTMLSlotElement;

  @query(`${bem.ce("sub-title")} slot[name="sub-title"]`)
  private _subTitleSlot!: HTMLSlotElement;

  @attribute({
    type: Enum(VARIANT_TYPES),
    default: "",
    observer(this: EaResult) {
      this.updateContainerClasslist();
      this._updateIcon();
    },
  })
  variant: VariantType | "" = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaResult) {
      this._updateHeading();
    },
  })
  heading: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaResult) {
      this._updateSubTitle();
    },
  })
  subTitle: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaResult) {
      this._updateIcon();
    },
  })
  icon: string = "";

  /** 更新图标，icon 属性优先于 variant 默认图标 */
  private _updateIcon(): void {
    const iconName = this.icon || VARIANT_ICON_MAP[this.variant] || "";
    this._icon.setAttribute("name", iconName);
  }

  /** 更新标题内容，设置 slot 的 fallback */
  private _updateHeading(): void {
    if (!this._titleSlot) return;
    this._titleSlot.textContent = this.heading;
  }

  /** 更新副标题内容，设置 slot 的 fallback */
  private _updateSubTitle(): void {
    if (!this._subTitleSlot) return;
    this._subTitleSlot.textContent = this.subTitle;
  }

  updateContainerClasslist(): string {
    const className = bem({ [this.variant]: !!this.variant });

    if (this._container) this._container.className = className;

    return className;
  }

  html(): string {
    return `
      <div class="${bem()}" part="container" role="status">
        <div class="${bem.e("icon-wrap")}" part="icon-wrap"><slot name="icon"><ea-icon class="${bem.e("icon")}" part="icon"></ea-icon></slot></div>
        <h3 class="${bem.e("title")}" part="title"><slot name="title"></slot></h3>
        <div class="${bem.e("sub-title")}" part="sub-title"><slot name="sub-title"></slot></div>
        <div class="${bem.e("extra")}" part="extra"><slot name="extra"></slot></div>
      </div>
    `;
  }

  $mount(): void {
    this.updateContainerClasslist();
  }
}
