import EaFormAssociatedBase from "@/core/EaFormAssociatedBase";
import { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query, listen, property } from "@decorator";
import { Enum } from "@utils/Enum";
import stylesheet from "./index.scss?inline";

import "@components/ea-button/index";
import "@components/ea-image-preview/index";

import type {
  Crossorigin,
  DefaultFileItem,
  EaUploadBeforeRemoveCallback,
  EaUploadBeforeUploadCallback,
  EaUploadChangeCallback,
  EaUploadErrorCallback,
  EaUploadExceedCallback,
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
import { nanoid } from "nanoid";
import {
  EaUploadAjaxError,
  EaUploadAjaxErrorEvent,
} from "./events/EaUploadAjaxError";
import { EaUploadProgressEvent } from "./events/EaUploadProgressEvent";
import { EaUploadRemoveEvent } from "./events/EaUploadRemoveEvent";
import { EaUploadChangeEvent } from "./events/EaUploadChangeEvent";
import { EaUploadSuccessEvent } from "./events/EaUploadSuccessEvent";
import "./components/file-item/index";
import type { EaUploadFileItem } from "./components/file-item/index";
import type { EaImagePreview } from "@components/ea-image-preview/index";

const TAG_NAME = "ea-upload" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 文件上传组件，支持拖拽上传、多文件上传、自定义文件列表类型、上传进度展示、图片预览等功能。
 * @status stable
 * @since 4.0
 *
 * @dependency ea-image-preview
 * @dependency ea-upload-file-item
 *
 * @slot default - 默认插槽，上传按钮区域内容。
 * @slot trigger - 触发按钮插槽，覆盖默认的上传触发器。
 * @slot tip - 提示信息插槽，显示在文件列表上方。
 *
 * @event change - 文件列表变化时触发，detail: `{ uploadFile: FileItem | undefined, uploadFiles: FileItem[] }`。
 * @event remove - 文件被移除时触发，detail: `{ uploadFile: FileItem, uploadFiles: FileItem[] }`。
 * @event ea-ajax-error - 上传请求失败时触发，detail: `{ error: EaUploadAjaxError, uploadFile: FileItem | FileItem[], uploadFiles: FileItem[] }`。
 * @event ea-progress - 上传进度更新时触发，detail: `{ event: ProgressEvent, uploadFile: FileItem | FileItem[], uploadFiles: FileItem[] }`。
 * @event ea-success - 上传成功时触发，detail: `{ response: any, uploadFile: FileItem | FileItem[], uploadFiles: FileItem[] }`。
 *
 * @csspart container - 容器。
 * @csspart content - 上传触发区域容器。
 * @csspart tip - 提示信息区域。
 * @csspart list - 文件列表。
 * @csspart trigger - 上传按钮容器（仅 picture-card 模式）。
 * @csspart file-item - 文件列表项。
 * @csspart preview - 图片预览组件。
 *
 * @cssproperty --ea-upload-border-radius - 组件圆角。
 * @cssproperty --ea-upload-font-size - 组件字体大小。
 * @cssproperty --ea-upload-transition - 组件过渡动画。
 * @cssproperty --ea-upload-text - 组件文字颜色。
 * @cssproperty --ea-upload-bg - 组件背景色。
 * @cssproperty --ea-upload-border-color - 组件边框颜色。
 * @cssproperty --ea-upload-tip-color - 提示文字颜色。
 * @cssproperty --ea-upload-drag-bg - 拖拽区域背景色。
 * @cssproperty --ea-upload-drag-icon-size - 拖拽区域图标大小。
 * @cssproperty --ea-upload-drag-icon-color - 拖拽区域图标颜色。
 * @cssproperty --ea-upload-trigger-width - 上传触发器宽度（仅 picture-card 模式）。
 * @cssproperty --ea-upload-trigger-height - 上传触发器高度（仅 picture-card 模式）。
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

  @query(bem.ce("preview"))
  private _imagePreview!: EaImagePreview;

  private _dragEnterCount: number = 0;

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

  @attribute({
    type: String,
    default: "text",
    observer(this: EaUpload) {
      this.updateContainerClasslist();
      if (this._listElement) this._renderFileList();
    },
  })
  listType: ListType = "text";

  @attribute({ type: Boolean, default: true })
  autoUpload: boolean = true;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaUpload) {
      this.updateContainerClasslist();
    },
  })
  drag: boolean = false;

  @attribute({ type: Number, default: Number.MAX_SAFE_INTEGER })
  limit: number = Number.MAX_SAFE_INTEGER;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaUpload) {
      if (this._originalInput) {
        this._originalInput.webkitdirectory = this.directory;
      }
    },
  })
  directory: boolean = false;

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

  @property({
    type: Function,
    default: (files: File[], uploadFiles: FileItem[]) => {},
  })
  onExceed: EaUploadExceedCallback | null = null;

  /**
   * 清空所有
   */
  private _clearFileList(): void {
    this.abort();
    for (const item of this.fileList) {
      if (item.url?.startsWith("blob:")) URL.revokeObjectURL(item.url);
    }
    this.fileList = [];
  }

  /**
   * 清空所有
   */
  clearFiles(): void {
    this._clearFileList();
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
   * 根据 uid 查找文件数据
   * @param uid - 文件唯一标识
   */
  private _getFileItem(uid: string): FileItem | undefined {
    return this.fileList.find(i => i.uid === uid);
  }

  /**
   * 根据 uid 查找文件列表项元素
   * @param uid - 文件唯一标识
   */
  private _getFileLi(uid: string): HTMLLIElement | null {
    return this._listElement.querySelector(`li[data-uid="${uid}"]`);
  }

  /**
   * 获取文件列表项中的进度条元素
   * @param li - 文件列表项元素
   */
  private _getProgressEl(li: HTMLLIElement): Element | null {
    return li.querySelector("ea-progress");
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
          const target = this._getFileItem(item.uid);
          if (target) {
            target.status = "error";
            target.response = error;
            target.controller = undefined;

            const li = this._getFileLi(item.uid);
            if (li) {
              const progressEl = this._getProgressEl(li);
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
          const target = this._getFileItem(item.uid);
          if (target) {
            target.percent = (evt.loaded / evt.total) * 100;

            const li = this._getFileLi(item.uid);
            if (li) {
              const progressEl = this._getProgressEl(li);
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
          const target = this._getFileItem(item.uid);
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

  /**
   * 渲染文件列表
   */
  private _renderFileList(): void {
    const listElement = this._listElement;

    if (!this.showFileList) {
      listElement.querySelectorAll("li[data-uid]").forEach(li => li.remove());
      return;
    }

    const triggerEl = listElement.querySelector<HTMLLIElement>(
      bem.ce("trigger")
    );
    const anchor = triggerEl || null;

    const existing = new Map<string, HTMLLIElement>();
    listElement.querySelectorAll<HTMLLIElement>("li[data-uid]").forEach(li => {
      existing.set(li.getAttribute("data-uid")!, li);
    });

    for (const item of this.fileList) {
      const li = existing.get(item.uid);
      if (li) {
        existing.delete(item.uid);
        this._updateFileItemElement(li, item);
        continue;
      }

      const newLi = document.createElement("li");
      newLi.className = `${bem.e("file-item")} ${bem.s(item.status)}`;
      newLi.setAttribute("part", "file-item");
      newLi.setAttribute("data-uid", item.uid);

      const fileItem = document.createElement(
        "ea-upload-file-item"
      ) as EaUploadFileItem;
      fileItem.item = item;
      fileItem.listType = this.listType;
      newLi.appendChild(fileItem);

      if (anchor) {
        listElement.insertBefore(newLi, anchor);
      } else {
        listElement.appendChild(newLi);
      }
    }

    existing.forEach(li => li.remove());
  }

  /**
   * 更新单个文件项的 UI 状态
   * @param uid - 文件唯一标识
   */
  private _updateFileItem(uid: string): void {
    const li = this._listElement.querySelector(`li[data-uid="${uid}"]`);
    if (!li) return;

    const item = this.fileList.find(i => i.uid === uid);
    if (!item) {
      li.remove();
      return;
    }

    this._updateFileItemElement(li as HTMLLIElement, item);
  }

  /**
   * 更新文件项 li 元素的状态类和 file-item 子组件
   * @param li - 文件列表项元素
   * @param item - 文件数据
   */
  private _updateFileItemElement(li: HTMLLIElement, item: FileItem): void {
    li.classList.remove(
      bem.s("pending"),
      bem.s("uploading"),
      bem.s("done"),
      bem.s("error"),
      bem.s("removed")
    );
    li.classList.add(bem.s(item.status));

    const fileItemEl = li.querySelector<EaUploadFileItem>(
      "ea-upload-file-item"
    );
    if (fileItemEl) {
      fileItemEl.item = item;
      fileItemEl.listType = this.listType;
      fileItemEl.render();
    }
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

  /**
   * 处理文件项删除事件
   */
  @listen("ea-upload-file-delete", bem.ce("list"))
  private _handleFileDelete(e: Event): void {
    e.stopPropagation();
    const detail = (e as CustomEvent).detail;
    if (detail?.uid) {
      this._removeFile(detail.uid);
    }
  }

  /**
   * 处理文件项预览事件
   */
  @listen("ea-upload-file-preview", bem.ce("list"))
  private _handleFilePreview(e: Event): void {
    e.stopPropagation();
    const detail = (e as CustomEvent).detail;
    if (detail?.uid) {
      const index = this.fileList.findIndex(item => item.uid === detail.uid);
      if (index !== -1) this._showPreview(index);
    }
  }

  /**
   * 打开图片预览, 使用 ea-image-preview 全屏放大展示
   * @param index 文件在 fileList 中的索引
   */
  private async _showPreview(index: number): Promise<void> {
    await customElements.whenDefined("ea-image-preview");

    const urlList = this.fileList
      .filter(item => item.status === "done")
      .map(item => item.thumbUrl || item.url || "")
      .filter(Boolean);

    const target = this.fileList[index];
    const targetUrl = target ? target.thumbUrl || target.url || "" : "";
    const targetIndex = Math.max(0, urlList.indexOf(targetUrl));

    this._imagePreview.initialIndex = targetIndex;
    this._imagePreview.urlList = urlList;
    this._imagePreview.visible = true;
  }

  /**
   * 处理上传区域点击事件
   */
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

  /**
   * 处理拖拽悬浮
   */
  @listen("dragover", bem.ce("content"))
  private _handleDragOver(e: DragEvent): void {
    if (!this.drag || this.disabled) return;
    e.preventDefault();
    e.stopPropagation();
  }

  /**
   * 处理拖拽进入
   */
  @listen("dragenter", bem.ce("content"))
  private _handleDragEnter(e: DragEvent): void {
    if (!this.drag || this.disabled) return;
    e.preventDefault();
    e.stopPropagation();
    this._dragEnterCount++;
    if (this._dragEnterCount === 1) {
      this.updateContainerClasslist();
      this._container.classList.add(bem.s("dragover"));
    }
  }

  /**
   * 处理拖拽离开
   */
  @listen("dragleave", bem.ce("content"))
  private _handleDragLeave(e: DragEvent): void {
    if (!this.drag || this.disabled) return;
    e.preventDefault();
    e.stopPropagation();
    this._dragEnterCount--;
    if (this._dragEnterCount <= 0) {
      this._dragEnterCount = 0;
      this.updateContainerClasslist();
    }
  }

  /**
   * 处理拖拽放置
   */
  @listen("drop", bem.ce("content"))
  private async _handleDrop(e: DragEvent): Promise<void> {
    if (!this.drag || this.disabled) return;
    e.preventDefault();
    e.stopPropagation();
    this._dragEnterCount = 0;
    this.updateContainerClasslist();

    if (this.directory) {
      const items = e.dataTransfer?.items;
      if (!items || items.length === 0) return;
      const files: File[] = [];
      const entries: FileSystemEntry[] = [];
      for (let i = 0; i < items.length; i++) {
        const entry = items[i].webkitGetAsEntry();
        if (entry) entries.push(entry);
      }
      for (const entry of entries) {
        await this._traverseEntry(entry, files);
      }
      if (files.length > 0) await this._addFiles(files);
    } else {
      const dtFiles = e.dataTransfer?.files;
      if (!dtFiles || dtFiles.length === 0) return;
      await this._addFiles(Array.from(dtFiles));
    }
  }

  /**
   * 递归遍历文件系统条目，收集所有文件
   * @param entry 文件系统条目
   * @param files 收集结果
   */
  private _traverseEntry(entry: FileSystemEntry, files: File[]): Promise<void> {
    return new Promise(resolve => {
      if (entry.isFile) {
        (entry as FileSystemFileEntry).file(file => {
          files.push(file);
          resolve();
        });
      } else if (entry.isDirectory) {
        const dirReader = (entry as FileSystemDirectoryEntry).createReader();
        dirReader.readEntries(entries => {
          if (entries.length === 0) {
            resolve();
            return;
          }
          const promises = entries.map(subEntry =>
            this._traverseEntry(subEntry, files)
          );
          Promise.all(promises).then(() => resolve());
        });
      } else {
        resolve();
      }
    });
  }

  /**
   * 处理文件选择 input 变化事件
   */
  @listen("change", "#original")
  private async _handleChange(e: Event): Promise<void> {
    e.preventDefault();
    e.stopImmediatePropagation();

    const input = e.target as HTMLInputElement;
    const files = input.files;
    if (!files || files.length === 0) return;

    await this._addFiles(Array.from(files));
    input.value = "";
  }

  /**
   * 添加文件到 fileList
   * @param files 文件列表
   */
  private async _addFiles(files: File[]): Promise<void> {
    const remain = this.limit - this.fileList.length;
    if (files.length > remain) {
      const result = this.onExceed?.(files, this.fileList);
      const shouldReplace = result instanceof Promise ? await result : result;
      if (shouldReplace !== true) return;
      this._clearFileList();
    }

    const newItems: FileItem[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      newItems.push({
        uid: nanoid(),
        name: file.name,
        status: "pending",
        raw: file,
      });
    }

    this.fileList = [...this.fileList, ...newItems];

    if (this.showFileList) {
      this._renderFileList();
    }

    this._dispatchChangeEvent(newItems[0]);

    if (this.autoUpload) {
      this.submit();
    }
  }

  $mount(): void {
    this.updateContainerClasslist();
    this._mergeDefaultFileList();
    this._renderFileList();
  }

  updateContainerClasslist(): string {
    const className = bem({ [this.listType]: true, drag: this.drag });
    if (this._container) this._container.className = className;
    return className;
  }

  html(): string {
    const isPictureCard = this.listType === "picture-card";

    const triggerContent = `
    <slot id="triggerSlot" name="trigger"></slot>
    <slot id="defaultSlot"></slot>
    <input
      id="original"
      name="original"
      type="file"
      ${this.accept ? `accept="${this.accept}"` : ""}
      ${this.multiple ? "multiple" : ""}
      ${this.disabled ? "disabled" : ""}
      ${this.directory ? "webkitdirectory" : ""}
    />
  `;

    return `
      <div class="${bem()}" part="container">
        ${
          isPictureCard
            ? ""
            : `<label class="${bem.e("content")}" part="content" for="original">${triggerContent}</label>`
        }
        <div class="${bem.e("tip")}" part="tip">
          <slot name="tip"></slot>
        </div>
        <ul class="${bem.e("list")}" part="list">
          ${
            isPictureCard
              ? `<li class="${bem.e("trigger")}" part="trigger"><label class="${bem.e("content")}" part="content" for="original">${triggerContent}</label></li>`
              : ""
          }
        </ul>
        <ea-image-preview class="${bem.e("preview")}" part="preview"></ea-image-preview>
      </div>
    `;
  }
}
