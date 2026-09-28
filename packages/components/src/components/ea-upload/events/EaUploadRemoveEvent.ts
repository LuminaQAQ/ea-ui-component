import type { FileItem } from "../type";

export interface EaUploadRemoveEventDetail {
  uploadFile: FileItem;
  uploadFiles: FileItem[];
}

export class EaUploadRemoveEvent extends Event {
  readonly detail: EaUploadRemoveEventDetail;

  constructor(detail: EaUploadRemoveEventDetail) {
    super("ea-upload-remove", { bubbles: true, composed: true });
    this.detail = detail;
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    "ea-upload-remove": EaUploadRemoveEvent;
  }
}