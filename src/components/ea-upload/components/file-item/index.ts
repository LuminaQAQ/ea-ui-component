import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, property, query, listen } from "@decorator";
import { html } from "@utils/html";
import stylesheet from "./index.scss?inline";
import type { FileItem, ListType } from "../../type";

const TAG_NAME = "ea-upload-file-item" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 上传文件列表项组件，支持 text / picture / picture-card 三种列表类型
 * @status stable
 * @since 4.0
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaUploadFileItem extends EaBase {
  @query(`.${bem()}`)
  private _container!: HTMLElement;

  @query(".ea-upload-file-item__body")
  private _body!: HTMLElement;

  @property({ type: Object, default: null })
  item: FileItem | null = null;

  @attribute({ type: String, default: "text" })
  listType: ListType = "text";

  /**
   * 更新容器类名
   */
  updateContainerClasslist(): string {
    const className = bem({ [this.listType]: true });
    this._container.className = className;
    return className;
  }

  $mount(): void {
    this._handleThumbUrl();
    this.updateContainerClasslist();
  }

  $beforeUnmount(): void {
    if (this.item?.url && this.item.url.startsWith("blob:")) {
      URL.revokeObjectURL(this.item.url);
    }
  }

  /**
   * 重新渲染文件项
   */
  render(): void {
    if (!this.item || !this._body) return;
    this._handleThumbUrl();
    this._body.innerHTML = html(this._getBodyTemplate());
    this.updateContainerClasslist();
  }

  /**
   * 处理缩略图 URL
   */
  private _handleThumbUrl(): void {
    const item = this.item;
    if (!item) return;
    const raw: Blob | undefined =
      item.raw ?? (item instanceof Blob ? item : undefined);
    if (item.status === "done" && !item.thumbUrl && !item.url && raw) {
      item.url = URL.createObjectURL(raw);
    }
  }

  @listen("click")
  private _handleClick(e: Event): void {
    const path = e.composedPath();
    const removeEl = path.find(
      (el): el is Element =>
        el instanceof Element && el.getAttribute("data-action") === "remove"
    );
    if (removeEl) {
      e.stopPropagation();
      this._emitDelete();
      return;
    }
    const previewEl = path.find(
      (el): el is Element =>
        el instanceof Element && el.getAttribute("data-action") === "preview"
    );
    if (previewEl) {
      e.stopPropagation();
      this._emitPreview();
    }
  }

  private _emitDelete(): void {
    if (!this.item?.uid) return;
    this.dispatchEvent(
      new CustomEvent("ea-upload-file-delete", {
        detail: { uid: this.item.uid },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _emitPreview(): void {
    if (!this.item?.uid) return;
    this.dispatchEvent(
      new CustomEvent("ea-upload-file-preview", {
        detail: { uid: this.item.uid },
        bubbles: true,
        composed: true,
      })
    );
  }

  /** @override */
  html(): string {
    return `<div class="${bem()}">
      <div class="ea-upload-file-item__body">${
        this.item ? this._getBodyTemplate() : ""
      }</div>
    </div>`;
  }

  private _getBodyTemplate(): string {
    const item = this.item!;
    const isPicture =
      this.listType === "picture" || this.listType === "picture-card";

    const response =
      item.status === "error" && typeof item.response === "string"
        ? `<span class="${bem.e("response")}" part="file-response">${item.response}</span>`
        : "";

    const progress = (size = "48px"): string =>
      isPicture
        ? `<ea-progress class="${bem.e("progress")}" part="file-progress" variant="circle" size="${size}" show-text="false" percentage="${item.percent || 0}"></ea-progress>`
        : `<ea-progress class="${bem.e("progress")}" part="file-progress" variant="line" show-text="false" stroke-width="3px" percentage="${item.percent || 0}"></ea-progress>`;

    const thumb = (
      width = "40px",
      height = "40px",
      circleSize = "30px"
    ): string => {
      if (item.status === "error") {
        return `<ea-icon name="image" class="${bem.e("thumb")} ${bem.e("thumb-error")}" style="width:${width};height:${height}"></ea-icon>`;
      }

      const src = item.thumbUrl || item.url || "";
      const imgSrc = item.status === "done" ? src : "";
      const crossOriginAttr = item.crossOrigin
        ? ` crossorigin="${item.crossOrigin}"`
        : "";

      return `
        <div class="${bem.e("thumb")}" part="file-thumb" style="width:${width};height:${height}">
          <img class="${bem.e("thumb-img")}" src="${imgSrc}" alt="${item.name}"${crossOriginAttr} />
          <ea-icon name="image" class="${bem.e("thumb-placeholder")}"></ea-icon>
          ${progress(circleSize)}
        </div>
      `;
    };

    const toolbar = `
      <div class="${bem.e("toolbar")}" part="file-toolbar">
        <ea-icon name="magnifying-glass" class="${bem.e("tool")}" data-action="preview" part="file-preview"></ea-icon>
        <ea-icon name="xmark" class="${bem.e("tool")}" data-action="remove" part="file-delete"></ea-icon>
      </div>
    `;

    const templates: Record<string, () => string> = {
      text: () => {
        const isUploading = item.status === "uploading";
        const iconName = isUploading ? "spinner" : "paperclip";
        const spinAttr = isUploading ? " spin" : "";

        return `
          <ea-icon name="${iconName}" class="${bem.e("icon")}" part="file-icon"${spinAttr}></ea-icon>
          <div class="${bem.e("file-info")}" part="file-info">
            <div class="${bem.e("file-info-main")}" part="file-info-main">
              <span class="${bem.e("filename")}" part="file-name">${item.name}</span>
              <div class="${bem.e("file-info-actions")}" part="file-info-actions">
                ${response}
                <ea-icon name="xmark" class="${bem.e("icon")} ${bem.e("delete")}" data-action="remove" part="file-delete"></ea-icon>
              </div>
            </div>
            ${progress()}
          </div>
        `;
      },
      picture: () => `
        <div class="${bem.e("file-main")}">
          <div class="${bem.e("file-info")}">
            ${thumb("40px", "40px")}
            <span class="${bem.e("filename")}" part="file-name">${item.name}</span>
            ${response}
          </div>
          <ea-icon name="xmark" class="${bem.e("icon")} ${bem.e("delete")}" data-action="remove" part="file-delete"></ea-icon>
        </div>
      `,
      "picture-card": () => `
        <div class="${bem.e("card")}" part="card">
          <div class="${bem.e("card-thumb")}" part="card-thumb">
            ${thumb("100%", "100px", "48px")}
            ${toolbar}
          </div>
          <div class="${bem.e("card-footer")}" part="card-footer">
            <span class="${bem.e("filename")}" part="file-name">${item.name}</span>
            ${response}
          </div>
        </div>
      `,
    };

    return templates[this.listType || "text"]();
  }
}
