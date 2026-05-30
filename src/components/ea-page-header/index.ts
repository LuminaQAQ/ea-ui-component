import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query, listen } from "@decorator";
import { html } from "@utils/html";
import { EaPageHeaderBackEvent } from "./events/EaPageHeaderBackEvent";
import stylesheet from "./index.scss?inline";
import "@/components/ea-icon/index";

const TAG_NAME = "ea-page-header" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 页头组件，用于页面的路径导航，支持返回按钮、面包屑、标题内容和额外操作区。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-icon
 *
 * @slot breadcrumb - 面包屑插槽，可放置 ea-breadcrumb 组件。
 * @slot icon - 自定义返回图标，默认显示 angle-left 图标。
 * @slot title - 返回按钮文字，默认显示 "Back"。
 * @slot content - 页头主要内容区。
 * @slot extra - 额外操作区。
 * @slot default - 默认插槽，用于放置额外内容。
 *
 * @event ea-back - 点击返回按钮时触发。
 *
 * @csspart container - 外层容器。
 * @csspart breadcrumb - 面包屑插槽容器。
 * @csspart header-wrapper - 标题与操作区的包装容器。
 * @csspart back - 返回按钮容器。
 * @csspart icon - 返回图标容器。
 * @csspart back-icon - 默认返回图标元素。
 * @csspart title - 返回按钮文字容器。
 * @csspart divider - 分隔符。
 * @csspart content - 主要内容容器。
 * @csspart extra - 额外操作区容器。
 *
 * @cssproperty --ea-page-header-gap - 包装容器内间距。
 * @cssproperty --ea-page-header-back-gap - 返回按钮内间距。
 * @cssproperty --ea-page-header-divider-margin - 分隔符外边距。
 * @cssproperty --ea-page-header-divider-color - 分隔符颜色。
 * @cssproperty --ea-page-header-heading-font-size - 返回文字字号。
 * @cssproperty --ea-page-header-heading-font-weight - 返回文字字重。
 * @cssproperty --ea-page-header-heading-color - 返回文字颜色。
 * @cssproperty --ea-page-header-content-font-size - 内容字号。
 * @cssproperty --ea-page-header-content-font-weight - 内容字重。
 * @cssproperty --ea-page-header-content-color - 内容颜色。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaPageHeader extends EaBase {
  @query(bem.ce("icon"))
  private _iconContainer!: HTMLElement;

  @query(bem.ce("heading"))
  private _headingContainer!: HTMLElement;

  @query(bem.ce("content"))
  private _contentContainer!: HTMLElement;

  @attribute({
    type: String,
    default: "angle-left",
    observer(this: EaPageHeader) {
      this._updateIcon();
    },
  })
  icon: string = "angle-left";

  @attribute({
    type: String,
    default: "",
    observer(this: EaPageHeader) {
      this._updateHeading();
    },
  })
  heading: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaPageHeader) {
      this._updateContent();
    },
  })
  content: string = "";

  /** 更新图标内容，icon 为空字符串时隐藏图标 */
  private _updateIcon(): void {
    if (this.icon) {
      this._iconContainer.classList.remove(bem.s("hidden"));
      this._iconContainer.innerHTML = `<slot name="icon"><ea-icon name="${this.icon}" part="back-icon"></ea-icon></slot>`;
    } else {
      this._iconContainer.classList.add(bem.s("hidden"));
      this._iconContainer.innerHTML = `<slot name="icon"></slot>`;
    }
  }

  /** 更新标题内容，为空时恢复 slot */
  private _updateHeading(): void {
    this._headingContainer.innerHTML =
      html(this.heading) || '<slot name="title">Back</slot>';
  }

  /** 更新内容区域，为空时恢复 slot */
  private _updateContent(): void {
    this._contentContainer.innerHTML =
      html(this.content) || '<slot name="content"></slot>';
  }

  /** 渲染模板 */
  html(): string {
    return `
      <div class='${bem()}' part='container'>
        <section class="${bem.e("breadcrumb")}" part="breadcrumb">
          <slot name="breadcrumb"></slot>
        </section>
        <section class="${bem.e("wrapper")}" part="header-wrapper">
          <div class="${bem.e("back")}" part="back">
            <span class="${bem.e("icon")}" part="icon">
              <slot name="icon">
                <ea-icon name="angle-left" part="back-icon"></ea-icon>
              </slot>
            </span>
            <span class="${bem.e("heading")}" part="title">
              <slot name="title">Back</slot>
            </span>
          </div>
          <span class="${bem.e("divider")}" part="divider">|</span>
          <div class="${bem.e("content")}" part="content">
            <slot name="content"></slot>
          </div>
          <div class="${bem.e("extra")}" part="extra">
            <slot name="extra"></slot>
          </div>
        </section>
        <slot></slot>
      </div>
    `;
  }

  /** 点击返回按钮事件处理 */
  @listen("click", bem.ce("back"))
  private _handleBackClick(_e: Event) {
    this.dispatchEvent(new EaPageHeaderBackEvent());
  }

  $mount(): void {
    this._updateIcon();
  }
}
