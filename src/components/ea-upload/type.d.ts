export type Crossorigin = "" | "anonymous" | "use-credentials";
export type ListType = "text" | "picture" | "picture-card";
export type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD";

export type UploadRequest = (
  options: UploadRequestOptions
) => UploadRequestResult;

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
  fileField: { name: string; file: File | File[] };
  data?: Record<string, any>;

  onError?: (evt: Event, error: Error) => void;
  onProgress?: (evt: ProgressEvent) => void;
  onSuccess?: (response: any) => void;
}

/**
 * 文件字段描述
 * @property name - 表单字段名（对应后端接收的 key）
 * @property file - 单个文件或文件数组
 */
export interface FileField {
  name: string;
  file: File | File[];
}
