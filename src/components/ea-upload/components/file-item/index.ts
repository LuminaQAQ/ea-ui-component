import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, property, query, listen } from "@decorator";
import { html } from "@utils/html";
import stylesheet from "./index.scss?inline";
import type { FileItem, ListType } from "../../type";
import EaProgress from "@/components/ea-progress";

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

  @property({ type: Object, default: null })
  item: FileItem | null = null;

  @attribute({ type: String, default: "text" })
  listType: ListType = "text";

  /**
   * 更新容器类名
   */
  updateContainerClasslist(): string {
    const className = bem(
      { [this.listType]: true },
      this.item?.status ? { [this.item.status]: true } : {}
    );
    this._container.className = className;
    return className;
  }

  $mount(): void {
    this._handleThumbUrl();
    this.updateContainerClasslist();
    this._bindThumbEvents();
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
    if (!this.item || !this._container) return;
    this._handleThumbUrl();
    this._container.innerHTML = html(this._getBodyTemplate());
    this.updateContainerClasslist();
    this._bindThumbEvents();
  }

  /**
   * 绑定缩略图加载事件, 图片加载完成后显示原生 img, 否则保持占位图标
   */
  private _bindThumbEvents(): void {
    if (!this._container) return;
    this._container
      .querySelectorAll<HTMLImageElement>(`.${bem.e("thumb-img")}`)
      .forEach(img => {
        const thumb = img.closest<HTMLElement>(`.${bem.e("thumb")}`);
        if (!thumb) return;

        const src = this.item?.thumbUrl || this.item?.url || "";
        if (!img.hasAttribute("src") && src) {
          img.src = src;
        }
        if (!img.hasAttribute("src")) return;

        img.onload = () => thumb.classList.add(bem.s("loaded"));
        img.onerror = () => thumb.classList.remove(bem.s("loaded"));

        if (img.complete) {
          if (img.naturalWidth > 0) {
            thumb.classList.add(bem.s("loaded"));
          } else {
            thumb.classList.remove(bem.s("loaded"));
          }
        }
      });
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

  @listen("change", bem())
  private _handleProgressElChange(e: Event): void {
    if (
      e.target instanceof EaProgress ||
      (e.target as HTMLElement).tagName === "EA-PROGRESS"
    ) {
      e.stopImmediatePropagation();
      e.preventDefault();
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
    return `
    <div class="${bem()}">
      ${this.item ? this._getBodyTemplate() : ""}
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

    const progress = (size = "64px"): string =>
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
      picture: () => {
        const isUploading = item.status === "uploading";
        const isError = item.status === "error";

        return `
          <div class="${bem.e("file-main")}">
            <div class="${bem.e("file-info")}" part="file-info">
              ${thumb("70px", "70px", "40px")}
              <span class="${bem.e("filename")}" part="file-name">${item.name}</span>
              ${isError ? response : ""}
            </div>
            ${isUploading ? "" : `<ea-icon name="xmark" class="${bem.e("delete")}" data-action="remove" part="file-delete"></ea-icon>`}
          </div>
        `;
      },
      "picture-card": () => {
        const isUploading = item.status === "uploading";
        const isError = item.status === "error";

        const toolbar = isUploading
          ? ""
          : `
          <div class="${bem.e("toolbar")}" part="file-toolbar">
            <div class="${bem.e("tool-actions")}">
              ${
                isError
                  ? ""
                  : `<ea-icon name="magnifying-glass" class="${bem.e("tool")}" data-action="preview" part="file-preview"></ea-icon>`
              }
              <ea-icon name="trash" class="${bem.e("tool")}" data-action="remove" part="file-delete"></ea-icon>
            </div>
            <div class="${bem.e("tool-info")}">
              <span class="${bem.e("filename")}" part="file-name">${item.name}</span>
              ${response}
            </div>
          </div>
        `;

        return `
          <div class="${bem.e("card")}" part="card">
            <div class="${bem.e("card-thumb")}" part="card-thumb">
              ${thumb("100%", "100%", "64px")}
              ${toolbar}
            </div>
          </div>
        `;
      },
    };

    return templates[this.listType || "text"]();
  }
}
