import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-breadcrumb-item" as const;
const bem = createBEM(TAG_NAME);

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaBreadcrumbItem extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(".ea-breadcrumb-item")
  private _container!: HTMLElement;

  @query(".ea-breadcrumb-item__content")
  private _content!: HTMLElement;

  // ==================== 属性定义 ====================

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

  // ==================== 方法 ====================

  /**
   * 更新容器类名
   */
  updateContainerClasslist(): string {
    const className = bem();

    if (this._container) {
      this._container.className = className;
    }

    return className;
  }

  /**
   * 渲染内容元素
   */
  private _renderContent(): void {
    if (!this._container) return;

    const isLink = !!this.href;
    const tag = isLink ? "a" : "span";
    const linkClass = isLink ? bem.s("link") : "";

    // 重新渲染内容区域
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

  /**
   * 渲染模板
   */
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

  // ==================== 生命周期 ====================

  $mount(): void {
    this.updateContainerClasslist();
  }
}

export default EaBreadcrumbItem;
