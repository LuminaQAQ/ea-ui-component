import type { FileItem } from "../type";

export interface EaUploadChangeEventDetail {
  uploadFile: FileItem | undefined;
  uploadFiles: FileItem[];
}

export class EaUploadChangeEvent extends Event {
  readonly detail: EaUploadChangeEventDetail;

  constructor(detail: EaUploadChangeEventDetail) {
    super("ea-upload-change", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-upload-change": EaUploadChangeEvent;
  }
}