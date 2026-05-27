import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query } from "@decorator";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-breadcrumb-item" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 面包屑项组件，用于面包屑导航中的每一级路径项。
 * @status stable
 * @since 3.0
 *
 * @slot default - 默认插槽，用于放置面包屑项的内容。
 * @slot separator - 自定义分隔符内容。
 *
 * @csspart container - 项容器元素。
 * @csspart content - 内容元素。
 * @csspart separator - 分隔符元素。
 *
 * @cssproperty --ea-breadcrumb-item-separator-color - 分隔符颜色。
 * @cssproperty --ea-breadcrumb-item-separator-size - 分隔符字体大小。
 * @cssproperty --ea-breadcrumb-item-separator-spacing - 分隔符间距。
 * @cssproperty --ea-breadcrumb-item-link-color - 链接颜色。
 * @cssproperty --ea-breadcrumb-item-link-hover-color - 链接悬停颜色。
 * @cssproperty --ea-breadcrumb-item-link-font-weight - 链接字体粗细。
 * @cssproperty --ea-breadcrumb-item-transition - 过渡动画时长。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaBreadcrumbItem extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @query(bem.ce("content"))
  private _content!: HTMLElement;

  @attribute({
    type: String,
    default: "",
    observer(this: EaBreadcrumbItem, newVal: string) {
      this._renderContent();
      if (this._content && newVal) {
        (this._content as HTMLAnchorElement).href = newVal;
      }
    },
  })
  href: string = "";

  updateContainerClasslist(): string {
    const className = bem();

    if (this._container) {
      this._container.className = className;
    }

    return className;
  }

  /**
   * 根据 href 属性重新渲染内容元素，切换 a/span 标签
   */
  private _renderContent(): void {
    if (!this._container) return;

    const isLink = !!this.href;
    const tag = isLink ? "a" : "span";
    const linkClass = isLink ? bem.s("link") : "";

    const contentEl = this._container.querySelector(bem.ce("content"));
    if (contentEl) {
      const newContent = document.createElement(tag);
      newContent.className = [bem.e("content"), linkClass]
        .filter(Boolean)
        .join(" ");
      newContent.setAttribute("part", "content");
      if (isLink) {
        (newContent as HTMLAnchorElement).href = this.href;
      }
      newContent.innerHTML = "<slot></slot>";

      contentEl.replaceWith(newContent);
    }
  }

  html(): string {
    const isLink = !!this.href;
    const tag = isLink ? "a" : "span";
    const linkClass = isLink ? bem.s("link") : "";

    return `
      <div class="${bem()}" part="container">
        <${tag} class="${bem.e("content")} ${linkClass}" part="content" ${isLink ? `href="${this.href}"` : ""}>
          <slot></slot>
        </${tag}>
        <span class="${bem.e("separator")}" part="separator">
          <slot name="separator"></slot>
        </span>
      </div>
    `;
  }

  $mount(): void {
    this.updateContainerClasslist();
  }
}

export default EaBreadcrumbItem;
