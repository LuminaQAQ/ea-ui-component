export type Crossorigin = "" | "anonymous" | "use-credentials";
export type ListType = "text" | "picture" | "picture-card";
export type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD";

export interface UploadRequestOptions {
  action: string;
  method: Method;
  // data: Record<string, string | Blob | [string | Blob, string] | string[]>;
  // filename: string;
  // file: File;
  headers: Headers | Record<string, string | number | null | undefined>;
  onError: (evt: Event) => void;
  onProgress: (evt: ProgressEvent) => void;
  onSuccess: (response: any) => void;
  withCredentials: boolean;
}
