import type { FileItem } from "../type";

export interface EaUploadChangeEventDetail {
  uploadFile: FileItem | undefined;
  uploadFiles: FileItem[];
}

export class EaUploadChangeEvent extends Event {
  readonly detail: EaUploadChangeEventDetail;

  constructor(detail: EaUploadChangeEventDetail) {
    super("change", { bubbles: true, composed: true });
    this.detail = detail;
  }
}
