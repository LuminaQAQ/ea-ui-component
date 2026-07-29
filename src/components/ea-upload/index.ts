import EaFormAssociatedBase from "@/core/EaFormAssociatedBase";
import { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query, listen, property } from "@decorator";
import { Enum } from "@utils/Enum";
import stylesheet from "./index.scss?inline";

import "@components/ea-button/index";

import type {
  Crossorigin,
  ListType,
  Method,
  UploadRequestOptions,
  UploadRequestResult,
} from "./type";
import { buildFormData, createUploadRequest } from "./utils/ajax";
import { EaUploadAjaxError } from "./events/EaUploadAjaxError";

const TAG_NAME = "ea-upload" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary
 * @status stable
 * @since 3.0
 *
 * @slot default - default slot.
 *
 * @csspart container - container element.
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaUpload extends EaFormAssociatedBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @query("#defaultSlot")
  private _defaultSlot!: HTMLSlotElement;
  @query("#triggerSlot")
  private _triggerSlot!: HTMLSlotElement;
  @query("#original")
  private _originalInput!: HTMLInputElement;
  @query(bem.ce("list"))
  private _listElement!: HTMLUListElement;

  private _requestList: UploadRequestResult[] = [];

  @attribute({
    type: Boolean,
    default: false,
  })
  disabled: boolean = false;

  @attribute({
    type: String,
    default: "",
  })
  action: string = "";

  @attribute({
    type: Object,
    default: {},
  })
  headers: Headers | Record<string, string> = {};

  @attribute({
    type: Enum(["GET", "POST", "PUT", "DELETE"]),
    default: "POST",
  })
  method: Method = "POST";

  @attribute({
    type: Boolean,
    default: false,
  })
  multiple: boolean = false;

  @attribute({
    type: String,
    default: "",
  })
  name: string = "";

  @attribute({
    type: Boolean,
    default: false,
  })
  withCredentials: boolean = false;

  @attribute({
    type: Boolean,
    default: true,
  })
  showFileList: boolean = true;

  @attribute({
    type: String,
    default: "",
  })
  accept: string = "";

  @attribute({
    type: Enum(["", "anonymous", "use-credentials"]),
    default: "",
  })
  crossorigin: Crossorigin = "";

  @attribute({
    type: String,
    default: "text",
  })
  listType: ListType = "text";

  @attribute({
    type: Boolean,
    default: true,
  })
  autoUpload: boolean = true;

  @attribute({
    type: Number,
    default: Number.MAX_SAFE_INTEGER,
  })
  limit: number | null = null;

  // TODO: 默认未非标准属性
  // @attribute({
  //   type: Boolean,
  //   default: false,
  // })
  // directory: boolean = false;

  @property({
    type: Object,
    default: {},
  })
  data: Record<string, any> = {};

  @property({
    type: Array,
    default: [],
  })
  fileList: File[] = [];

  @property({
    type: Function,
    default: createUploadRequest,
  })
  httpRequest: (options: UploadRequestOptions) => UploadRequestResult =
    createUploadRequest;

  @property({
    type: Function,
    default: (evt: Event, error: EaUploadAjaxError) => {
      console.error(error);
    },
  })
  onError: (error: Error) => void | null = error => {
    console.error(error);
  };
  @property({
    type: Function,
    default: (evt: ProgressEvent) => {},
  })
  onProgress: (evt: ProgressEvent) => void | null = evt => {};
  @property({
    type: Function,
    default: (response: any) => {},
  })
  onSuccess: (response: any) => void | null = response => {};

  @property({
    type: Function,
    default: null,
  })
  beforeRemove: ((uploadFile: File, uploadFiles: FileList) => void) | null =
    null;

  updateContainerClasslist(): string {
    const className = bem({
      // ['--' + this.type]: this.type,
    });

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

  handleFileSelect() {
    this._originalInput.click();
  }

  submit(): void {
    if (!this.fileList || this.fileList.length === 0) {
      console.warn("No files to upload.");
      return;
    }

    const fileField = {
      name: this.name || (this.multiple ? "files" : "file"),
      file: this.fileList,
    };

    const controller = this.httpRequest({
      action: this.action,
      method: this.method,
      headers: this.headers,
      withCredentials: this.withCredentials,

      fileField,
      data: this.data,

      onError: (evt, error) => {
        // const xhr = controller.xhr;

        this.onError(error,);

        // const xhr = controller.xhr;
        // this.dispatchEvent(
        //   new CustomEvent("upload-error", {
        //     detail: {
        //       status: xhr.status,
        //       response: xhr.response,
        //       error: error,
        //       file: fileField.file,
        //     },
        //     bubbles: true,
        //     composed: true,
        //   })
        // );
      },
      onProgress: this.onProgress,
      onSuccess: this.onSuccess,
    });

    this._requestList?.push(controller);

    controller.submit();

    if (this.showFileList) {
      this._listElement.innerHTML = "";
      for (const file of this.fileList) {
        const li = document.createElement("li");
        li.textContent = file.name;
        this._listElement.appendChild(li);
      }
      // this._renderFileList();
    }
  }

  abort(): void {
    this._requestList?.forEach(xhr => xhr.abort());
    this._requestList = [];
  }

  clearFiles(): void {
    this.fileList = [];
    if (this.showFileList) {
      this._listElement.innerHTML = "";
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

    this.dispatchEvent(new CustomEvent("change", { detail: files[0] }));

    if (this.multiple) {
      this.fileList = [...(this.fileList as File[]), ...files];
    } else {
      this.fileList = [files[0]];
    }

    input.value = "";

    if (this.autoUpload) {
      this.submit();
    } else {
      // if (this.showFileList) {
      //   this._renderFileList();
      // }
    }
  }

  $mount(): void {
    this.updateContainerClasslist();
  }
}
