import type { FileItem } from "../type";

export interface EaUploadSuccessEventDetail {
  response: any;
  uploadFile: FileItem | FileItem[];
  uploadFiles: FileItem[];
}

export class EaUploadSuccessEvent extends Event {
  readonly detail: EaUploadSuccessEventDetail;

  constructor(detail: EaUploadSuccessEventDetail) {
    super('ea-upload-success', { bubbles: true, composed: true });
    this.detail = detail;
  }
}

declare global {
  interface GlobalEventHandlersEventMap  {
    'ea-upload-success': EaUploadSuccessEvent;
  }
}