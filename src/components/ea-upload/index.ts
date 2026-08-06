import EaFormAssociatedBase from "@/core/EaFormAssociatedBase";
import { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query, listen, property } from "@decorator";
import { Enum } from "@utils/Enum";
import stylesheet from "./index.scss?inline";

import "@components/ea-button/index";
import "@components/ea-progress/index";
import "@components/ea-image/index";

import type {
  Crossorigin,
  DefaultFileItem,
  EaUploadBeforeRemoveCallback,
  EaUploadBeforeUploadCallback,
  EaUploadChangeCallback,
  EaUploadErrorCallback,
  EaUploadProgressCallback,
  EaUploadRemoveCallback,
  EaUploadSuccessCallback,
  FileItem,
  ListType,
  Method,
  UploadRequestOptions,
  UploadRequestResult,
} from "./type";
import { createUploadRequest } from "./utils/ajax";
import {
  EaUploadAjaxError,
  EaUploadAjaxErrorEvent,
} from "./events/EaUploadAjaxError";
import html from "@/utils/html";
import { EaUploadProgressEvent } from "./events/EaUploadProgressEvent";
import { EaUploadRemoveEvent } from "./events/EaUploadRemoveEvent";
import { EaUploadChangeEvent } from "./events/EaUploadChangeEvent";
import { EaUploadSuccessEvent } from "./events/EaUploadSuccessEvent";
import { nanoid } from "nanoid";
import EaProgress from "@components/ea-progress/index";

const TAG_NAME = "ea-upload" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 文件上传组件
 * @status stable
 * @since 4.0
 *
 * @slot default - 默认插槽
 * @slot trigger - 触发按钮插槽
 * @slot tip - 提示信息插槽
 *
 * @csspart container - 容器
 * @csspart list - 文件列表
 * @csspart file-item - 文件项
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaUpload extends EaFormAssociatedBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @query("#triggerSlot")
  private _triggerSlot!: HTMLSlotElement;
  @query("#original")
  private _originalInput!: HTMLInputElement;
  @query(bem.ce("list"))
  private _listElement!: HTMLUListElement;

  @attribute({ type: Boolean, default: false })
  disabled: boolean = false;

  @attribute({ type: String, default: "" })
  action: string = "";

  @attribute({ type: Object, default: {} })
  headers: Headers | Record<string, string> = {};

  @attribute({ type: Enum(["GET", "POST", "PUT", "DELETE"]), default: "POST" })
  method: Method = "POST";

  @attribute({ type: Boolean, default: false })
  multiple: boolean = false;

  @attribute({ type: String, default: "" })
  name: string = "";

  @attribute({ type: Boolean, default: false })
  withCredentials: boolean = false;

  @attribute({ type: Boolean, default: true })
  showFileList: boolean = true;

  @attribute({ type: String, default: "" })
  accept: string = "";

  @attribute({ type: Enum(["", "anonymous", "use-credentials"]), default: "" })
  crossorigin: Crossorigin = "";

  @attribute({ type: String, default: "text" })
  listType: ListType = "text";

  @attribute({ type: Boolean, default: true })
  autoUpload: boolean = true;

  @attribute({ type: Number, default: Number.MAX_SAFE_INTEGER })
  limit: number | null = null;

  @property({ type: Object, default: {} })
  data: Record<string, any> = {};

  @property({
    type: Array,
    default: [],
    observer: function (this: EaUpload, newVal: FileItem[]) {
      for (const item of newVal) {
        if (!item.uid) {
          item.uid = nanoid();
        }
        if (!item.status) {
          item.status = "pending";
        }
      }
      this._renderFileList();

      if (this.autoUpload && newVal.length > 0) {
        this.submit();
      }
    },
  })
  fileList: FileItem[] = [];

  @property({
    type: Array,
    default: [],
    observer: function (this: EaUpload, newVal: DefaultFileItem[]) {
      this._mergeDefaultFileList();
    },
  })
  defaultFileList: DefaultFileItem[] = [];

  @property({ type: Function, default: createUploadRequest })
  httpRequest: (options: UploadRequestOptions) => UploadRequestResult =
    createUploadRequest;

  @property({
    type: Function,
    default: (
      error: EaUploadAjaxError,
      file: FileItem | FileItem[],
      files?: FileItem[]
    ) => {
      console.error(error);
    },
  })
  onError: EaUploadErrorCallback | null = null;

  @property({
    type: Function,
    default: (
      evt: ProgressEvent,
      file: FileItem | FileItem[],
      files: FileItem[]
    ) => {},
  })
  onProgress: EaUploadProgressCallback | null = null;

  @property({
    type: Function,
    default: (
      response: any,
      file: FileItem | FileItem[],
      files: FileItem[]
    ) => {},
  })
  onSuccess: EaUploadSuccessCallback | null = null;

  @property({ type: Function, default: null })
  beforeRemove: EaUploadBeforeRemoveCallback | null = null;

  @property({
    type: Function,
    default: (uploadFile: FileItem, uploadFiles: FileItem[]) => {},
  })
  onRemove: EaUploadRemoveCallback | null = null;

  @property({
    type: Function,
    default: (uploadFile: FileItem | undefined, uploadFiles: FileItem[]) => {},
  })
  onChange: EaUploadChangeCallback | null = null;

  @property({
    type: Function,
    default: (uploadFile: FileItem, uploadFiles: FileItem[]) => true,
  })
  beforeUpload: EaUploadBeforeUploadCallback | null = null;

  /**
   * 清空所有
   */
  clearFiles(): void {
    this.abort();
    for (const item of this.fileList) {
      if (item.url?.startsWith("blob:")) URL.revokeObjectURL(item.url);
    }
    this.fileList = [];
    this._originalInput.value = "";
    this._renderFileList();
    this._dispatchChangeEvent();
  }

  /**
   * 触发文件选择对话框
   */
  handleFileSelect() {
    if (!this.disabled) {
      this._originalInput.click();
    }
  }

  /**
   * 提交上传
   */
  async submit(): Promise<void> {
    if (this.fileList.length === 0) {
      console.warn("No files to upload.");
      return;
    }

    if (this._listElement.children.length === 0) {
      this._renderFileList();
    }

    for (const item of this.fileList) {
      if (item.status !== "pending") continue;

      if (this.beforeUpload) {
        const result = this.beforeUpload(item, this.fileList);
        const shouldUpload = result instanceof Promise ? await result : result;
        if (shouldUpload === false) continue;
      }

      item.status = "uploading";
      this._updateFileItem(item.uid);

      const fileField = {
        name: this.name || "file",
        uid: item.uid,
        file: item,
        files: this.fileList,
      };

      const controller = this.httpRequest({
        action: this.action,
        method: this.method,
        headers: this.headers,
        withCredentials: this.withCredentials,
        fileField,
        data: this.data,

        onError: (error, uploadFile, uploadFiles) => {
          this.onError?.(error, uploadFile, uploadFiles);
          this.dispatchEvent(
            new EaUploadAjaxErrorEvent({ error, uploadFile, uploadFiles })
          );
          const target = this.fileList.find(i => i.uid === item.uid);
          if (target) {
            target.status = "error";
            target.response = error;
            target.controller = undefined;

            const li = this._listElement.querySelector(
              `li[data-uid="${item.uid}"]`
            );
            if (li) {
              const progressEl = li.querySelector("ea-progress");
              if (progressEl) {
                progressEl.setAttribute("status", "exception");
              }
            }

            this._updateFileItem(item.uid);
          }
        },

        onProgress: (evt, file, files) => {
          this.onProgress?.(evt, file, files);
          this.dispatchEvent(
            new EaUploadProgressEvent({
              event: evt,
              uploadFile: file,
              uploadFiles: files,
            })
          );
          const target = this.fileList.find(i => i.uid === item.uid);
          if (target) {
            target.percent = (evt.loaded / evt.total) * 100;

            const li = this._listElement.querySelector(
              `li[data-uid="${item.uid}"]`
            );
            if (li) {
              const progressEl = li.querySelector("ea-progress");
              if (progressEl) {
                progressEl.setAttribute("percentage", String(target.percent));
                if (target.percent >= 100) {
                  progressEl.setAttribute("status", "success");
                }
              }
            }
          }
        },

        onSuccess: (response, file, files) => {
          this.onSuccess?.(response, file, files);
          this.dispatchEvent(
            new EaUploadSuccessEvent({
              response,
              uploadFile: file,
              uploadFiles: files,
            })
          );
          const target = this.fileList.find(i => i.uid === item.uid);
          if (target) {
            target.status = "done";
            target.percent = 100;
            target.response = response;
            target.controller = undefined;
            this._updateFileItem(item.uid);
          }
        },
      });

      item.controller = controller;
      controller.submit();
    }
  }

  /**
   * 中止上传
   * @param uid 可选，若提供则只中止该文件
   */
  abort(uid?: string): void {
    if (uid) {
      const item = this.fileList.find(i => i.uid === uid);
      if (item?.controller) {
        item.controller.abort();
        item.controller = undefined;
        item.status = "pending";
        this._updateFileItem(uid);
      }
    } else {
      for (const item of this.fileList) {
        if (item.controller) {
          item.controller.abort();
          item.controller = undefined;
          item.status = "pending";
        }
      }
      this._renderFileList();
    }
  }

  /**
   * 移除单个文件
   */
  private async _removeFile(uid: string): Promise<void> {
    const index = this.fileList.findIndex(item => item.uid === uid);
    if (index === -1) return;

    const item = this.fileList[index];

    if (this.beforeRemove) {
      const result = this.beforeRemove(item, this.fileList);

      try {
        let shouldRemove = result instanceof Promise ? await result : result;
        if (shouldRemove === false) return;
      } catch (error) {
        return;
      }
    }

    if (item.controller) {
      item.controller.abort();
    }
    item.status = "removed";
    if (item.url?.startsWith("blob:")) URL.revokeObjectURL(item.url);
    this.fileList.splice(index, 1);

    const li = this._listElement.querySelector(`li[data-uid="${uid}"]`);
    if (li) li.remove();

    this.onRemove?.(item, this.fileList);
    this.dispatchEvent(
      new EaUploadRemoveEvent({ uploadFile: item, uploadFiles: this.fileList })
    );

    this._dispatchChangeEvent(item);
  }

  /**
   * 合并 defaultFileList 到 fileList
   */
  private _mergeDefaultFileList(): void {
    if (this.defaultFileList.length === 0 || this.fileList.length > 0) return;

    const merged: FileItem[] = this.defaultFileList.map(item => ({
      uid: item.uid || nanoid(),
      name: item.name,
      status: item.status || "done",
      percent: item.percent,
      url: item.url,
      thumbUrl: item.thumbUrl,
      response: item.response,
      crossOrigin: item.crossOrigin,
      raw: item.raw,
    }));

    this.fileList = merged;
  }

  private _renderFileList(): void {
    if (!this.showFileList) {
      this._listElement.innerHTML = "";
      return;
    }
    this._listElement.innerHTML = "";

    for (const item of this.fileList) {
      const isExists = this._listElement.querySelector(
        `li[data-uid="${item.uid}"]`
      );
      if (isExists) continue;

      const liTemplate = document.createElement("template");
      liTemplate.innerHTML = html(`
        <li class="${bem.e("file-item")} ${bem.m(this.listType)} ${bem.s(item.status)}" part="file-item" data-uid="${item.uid}">
          ${this._getTemplate(item)}
        </li>
      `);
      this._listElement.appendChild(
        liTemplate.content.firstElementChild as HTMLElement
      );
    }
  }

  private _updateFileItem(uid: string): void {
    const li = this._listElement.querySelector(`li[data-uid="${uid}"]`);
    if (!li) return;

    const item = this.fileList.find(i => i.uid === uid);
    if (!item) {
      li.remove();
      return;
    }

    li.classList.remove(
      bem.s("pending"),
      bem.s("uploading"),
      bem.s("done"),
      bem.s("error"),
      bem.s("removed")
    );
    li.classList.add(bem.s(item.status));

    li.innerHTML = html(this._getTemplate(item));
  }

  /**
   * 生成单个文件项的模板, 根据 listType 渲染不同结构
   * @param item 文件项
   */
  private _getTemplate(item: FileItem): string {
    const progress = `<ea-progress class="${bem.e("progress")}" part="file-progress" variant="line" show-text="false" stroke-width="3px" percentage="${item.percent || 0}"></ea-progress>`;

    const response =
      item.status === "error" && typeof item.response === "string"
        ? `<span class="${bem.e("response")}" part="file-response">${item.response}</span>`
        : "";

    const thumb = (width = "40px", height = "40px"): string => {
      if (item.status === "error") {
        return `<ea-icon name="image" class="${bem.e("thumb")} ${bem.e("thumb-error")}"></ea-icon>`;
      }

      const raw: Blob | undefined =
        item.raw ?? (item instanceof Blob ? item : undefined);

      if (item.status === "done" && !item.thumbUrl && !item.url && raw) {
        item.url = URL.createObjectURL(raw);
      }

      const src = item.thumbUrl || item.url || "";
      const crossOriginAttr = item.crossOrigin
        ? ` crossorigin="${item.crossOrigin}"`
        : "";

      return `
        <ea-image
          class="${bem.e("thumb")}"
          src="${item.status === "done" ? src : ""}"
          fit="cover"
          width="${width}"
          height="${height}"${crossOriginAttr}
        >
          <ea-icon name="image" slot="placeholder" class="${bem.e("thumb-placeholder")}"></ea-icon>
        </ea-image>
      `;
    };

    const templates = {
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
                <ea-icon name="xmark" class="${bem.e("icon")} ${bem.e("delete")}" part="file-delete"></ea-icon>
              </div>
            </div>
            ${progress}
          </div>
        `;
      },
      picture: () => {
        return `
          <div class="${bem.e("file-main")}">
            <div class="${bem.e("file-info")}">
              ${thumb()}
              <span class="${bem.e("filename")}">${item.name}</span>
              ${response}
            </div>
            <ea-icon name="xmark" class="${bem.e("icon")} ${bem.e("delete")}"></ea-icon>
          </div>
          ${progress}
        `;
      },
      "picture-card": () => {
        return `
          <div class="${bem.e("card")}">
            <div class="${bem.e("card-thumb")}">
              ${thumb("100%", "100px")}
            </div>
            <div class="${bem.e("card-footer")}">
              <span class="${bem.e("filename")}">${item.name}</span>
              ${response}
            </div>
          </div>
          ${progress}
        `;
      },
    };

    return templates[this.listType || "text"]();
  }

  /**
   * 派发 change 事件
   * @param uploadFile 发生变化的文件
   */
  private _dispatchChangeEvent(uploadFile?: FileItem): void {
    this.onChange?.(uploadFile, this.fileList);
    this.dispatchEvent(
      new EaUploadChangeEvent({ uploadFile, uploadFiles: this.fileList })
    );
  }

  @listen("click", bem.ce("list"))
  private _handleListClick(e: Event): void {
    const target = e.target as HTMLElement;
    const deleteIcon = target.closest('ea-icon[name="xmark"]');
    if (!deleteIcon) return;

    const li = deleteIcon.closest("li[data-uid]");
    if (!li) return;

    const uid = li.getAttribute("data-uid");
    if (uid) {
      e.stopPropagation();
      this._removeFile(uid);
    }
  }

  @listen("click", bem.ce("content"))
  private _handleUploadClick(e: Event): void {
    const triggerElements = this._triggerSlot.assignedElements();
    const hasTrigger = triggerElements.length > 0;
    if (hasTrigger) {
      if (triggerElements.includes(e.target as HTMLElement)) {
        this.handleFileSelect();
      }
    } else {
      this.handleFileSelect();
    }
  }

  @listen("change", "#original")
  private _handleChange(e: Event): void {
    e.preventDefault();
    e.stopImmediatePropagation();

    const input = e.target as HTMLInputElement;
    const files = input.files;
    if (!files || files.length === 0) return;

    const newItems: FileItem[] = [];
    for (let i = 0; i < files.length; i++) {
      let file = files[i];

      newItems.push(
        Object.assign(file as unknown as FileItem, {
          uid: nanoid(),
          status: "pending",
          raw: file,
        })
      );
    }

    this.fileList = [...this.fileList, ...newItems];

    if (this.showFileList) {
      this._renderFileList();
    }

    input.value = "";
    this._dispatchChangeEvent(newItems[0]);

    if (this.autoUpload) {
      this.submit();
    }
  }

  @listen("change", bem.ce("list"))
  private _handleProgressElChange(e: Event): void {
    if (
      e.target instanceof EaProgress ||
      (e.target as HTMLElement).tagName === "EA-PROGRESS"
    ) {
      e.stopImmediatePropagation();
      e.preventDefault();
    }
  }

  $mount(): void {
    this.updateContainerClasslist();
    this._mergeDefaultFileList();
    this._renderFileList();
  }

  updateContainerClasslist(): string {
    const className = bem({});
    if (this._container) this._container.className = className;
    return className;
  }

  html(): string {
    return `
      <div class="${bem()}" part="container">
        <label class="${bem.e("content")}" for="original">
          <slot id="triggerSlot" name="trigger"></slot>
          <slot id="defaultSlot"></slot>
          <input
            id="original"
            name="original"
            type="file"
            ${this.accept ? `accept="${this.accept}"` : ""}
            ${this.multiple ? "multiple" : ""}
            ${this.disabled ? "disabled" : ""}
          />
        </label>
        <div class="${bem.e("tip")}" part="tip">
          <slot name="tip"></slot>
        </div>
        <ul class="${bem.e("list")}" part="list"></ul>
      </div>
    `;
  }
}
