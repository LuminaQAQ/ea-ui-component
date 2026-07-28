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
} from "./type";
import { fileDataBuilder, fileUpload } from "./utils/ajax";

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

  @query("#default")
  private _defaultSlot!: HTMLSlotElement;
  @query("#original")
  private _originalInput!: HTMLInputElement;
  @query(bem.ce("list"))
  private _listElement!: HTMLUListElement;

  private _requestList: XMLHttpRequest[] | null = [];

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
    type: Array,
    default: [],
  })
  fileList: FileList | File[] | null = [];

  @property({
    type: Function,
    default: fileUpload,
  })
  httpRequest: (options: UploadRequestOptions) => XMLHttpRequest = fileUpload;

  @property({
    type: Function,
    default: null,
  })
  onError: (evt: Event) => void | null = evt => {
    console.error(evt);
  };
  @property({
    type: Function,
    default: null,
  })
  onProgress: (evt: ProgressEvent) => void | null = evt => {
    console.log(evt);
  };
  @property({
    type: Function,
    default: null,
  })
  onSuccess: (response: any) => void | null = response => {
    console.log(response);
  };

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
        <label for="original">
          <slot id="default"></slot>
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
    if (!this.fileList) return;
    if (this.fileList.length === 0)
      throw Promise.reject(new Error("fileList is empty"));

    // for (const file of this.fileList) {
    //   const formData = fileDataBuilder(this.method, {
    //     file,
    //   }) as FormData;
    //   const xhr = this.httpRequest({
    //     action: this.action,
    //     method: this.method,
    //     filename: this.name,
    //     file,
    //     headers: this.headers,
    //     onError: this.onError,
    //     onProgress: this.onProgress,
    //     onSuccess: this.onSuccess,
    //     withCredentials: this.withCredentials,
    //   });

    //   xhr.send(formData);
    //   this._requestList?.push(xhr);
    // }

    const formData = fileDataBuilder(
      {
        name: this.name || (this.multiple ? "files" : "file"),
        file: this.fileList,
      },
      {}
    );
    const xhr = this.httpRequest({
      action: this.action,
      method: this.method,
      headers: this.headers,
      onError: this.onError,
      onProgress: this.onProgress,
      onSuccess: this.onSuccess,
      withCredentials: this.withCredentials,
    });

    console.log(Object.fromEntries(formData));

    xhr.send(formData);
    this._requestList?.push(xhr);

    if (this.showFileList) {
      this._listElement.innerHTML = "";
      for (const file of this.fileList) {
        const li = document.createElement("li");
        li.textContent = file.name;
        this._listElement.appendChild(li);
      }
    }
  }

  abort() {
    this._requestList?.forEach(xhr => xhr.abort());
    this._requestList = [];
  }

  @listen("click", "#default")
  private _handleUploadClick(e: Event): void {
    this.handleFileSelect();
  }

  @listen("change", "#original", { capture: true, passive: true })
  private _handleChange(e: Event): void {
    e.preventDefault();
    e.stopImmediatePropagation();

    const files = (e.target as HTMLInputElement).files;

    if (!files) return;
    if (files.length === 0) return;

    // const fs = new FileReader();
    // fs.readAsArrayBuffer(files[0]);

    // fs.onload = e => {
    //   // console.log(e.target?.result);
    //   console.log(e.target);
    // };

    // console.log(files[0]);

    this.dispatchEvent(new CustomEvent("change", { detail: files[0] }));

    if (this.multiple) {
      (this.fileList as File[]).push(...files);
      // this.fileList = files;
    } else {
      this.fileList = [files[0]];
      // this.fileList = files;
    }

    if (this.autoUpload) {
      this.submit();
    } else {
      // if (!this.fileList) this.fileList = [];
      // (this.fileList as File[]).push(files[0]);
    }
  }

  $mount(): void {
    this.updateContainerClasslist();
  }
}
