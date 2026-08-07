import type { FileItem } from "../type";

export interface EaUploadAjaxErrorDetail {
  error: EaUploadAjaxError;
  uploadFile: FileItem | FileItem[];
  uploadFiles: FileItem[];
}

export class EaUploadAjaxError extends Error {
  readonly name = "EaUploadAjaxError";

  status: number;
  method: string;
  url: string;

  constructor(message: string, status: number, method: string, url: string) {
    super(message);

    this.status = status;
    this.method = method;
    this.url = url;
  }
}

export class EaUploadAjaxErrorEvent extends Event {
  readonly detail: EaUploadAjaxErrorDetail;
  constructor(detail: EaUploadAjaxErrorDetail) {
    super("ea-upload-error", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-upload-error": EaUploadAjaxErrorEvent;
  }
}
