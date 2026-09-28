import type { FileItem } from "../type";

export interface EaUploadProgressEventDetail {
  event: ProgressEvent;
  uploadFile: FileItem | FileItem[];
  uploadFiles: FileItem[];
}

export class EaUploadProgressEvent extends Event {
  readonly detail: EaUploadProgressEventDetail;

  constructor(detail: EaUploadProgressEventDetail) {
    super("ea-upload-progress", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-upload-progress": EaUploadProgressEvent;
  }
}
