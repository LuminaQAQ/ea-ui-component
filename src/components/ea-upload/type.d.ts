import { EaUploadAjaxError } from "./events/EaUploadAjaxError";

export type Crossorigin = "" | "anonymous" | "use-credentials";
export type ListType = "text" | "picture" | "picture-card";
export type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD";
export type UploadStatus =
  | "pending"
  | "uploading"
  | "done"
  | "error"
  | "removed";

export type UploadRequest = (
  options: UploadRequestOptions
) => UploadRequestResult;

export type EaUploadErrorCallback = (
  error: EaUploadAjaxError,
  uploadFile: FileItem | FileItem[],
  uploadFiles: FileItem[]
) => void;

export type EaUploadSuccessCallback = (
  response: any,
  file: FileItem | FileItem[],
  files: FileItem[]
) => void;

export type EaUploadProgressCallback = (
  evt: ProgressEvent,
  file: FileItem | FileItem[],
  files: FileItem[]
) => void;

export type EaUploadRemoveCallback = (
  uploadFile: FileItem,
  uploadFiles: FileItem[]
) => void;

export type EaUploadChangeCallback = (
  uploadFile: FileItem | undefined,
  uploadFiles: FileItem[]
) => void;

export type EaUploadBeforeUploadCallback = (
  uploadFile: FileItem,
  uploadFiles: FileItem[]
) => boolean | Promise<boolean> | undefined;

export type EaUploadBeforeRemoveCallback = (
  uploadFile: FileItem,
  uploadFiles: FileItem[]
) => boolean | Promise<boolean> | undefined;

export interface FileItem {
  uid: string;
  name: string;
  status: UploadStatus;
  /** 上传进度（0-100） */
  percent?: number;
  /** 下载地址 */
  url?: string;
  /** 缩略图地址 */
  thumbUrl?: string;
  /** 服务端响应（错误时可为自定义错误信息） */
  response?: any;
  /** CORS 属性设置 */
  crossOrigin?: Crossorigin;
  /** 原始 File 对象，上传时作为表单文件字段 */
  raw?: File;
  controller?: UploadRequestResult;
}

/**
 * 默认文件列表项
 * 用于 defaultFileList 属性，展示已存在的文件（无需原生 File 对象）
 */
export interface DefaultFileItem {
  uid?: string;
  name: string;
  status?: UploadStatus;
  percent?: number;
  url?: string;
  thumbUrl?: string;
  response?: any;
  crossOrigin?: Crossorigin;
  raw?: File;
}

export interface EaUploadProgressEvent extends ProgressEvent {
  percent: number;
}

interface UploadRequestResult {
  xhr: XMLHttpRequest;
  abort: () => void;
  submit: () => void;
}

export interface UploadRequestOptions {
  action: string;
  method: Method;
  headers: Headers | Record<string, string | number | null | undefined>;
  withCredentials: boolean;
  fileField: { name: string; file: FileItem; files: FileItem[] };
  data?: Record<string, any>;

  onError?: EaUploadErrorCallback;
  onProgress?: EaUploadProgressCallback;
  onSuccess?: EaUploadSuccessCallback;
}

/**
 * 文件字段描述
 * @property name - 表单字段名（对应后端接收的 key）
 * @property file - 单个文件或文件数组
 */
export interface FileField {
  name: string;
  file: FileItem | FileItem[];
}
