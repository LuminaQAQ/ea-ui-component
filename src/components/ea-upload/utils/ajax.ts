import type { Method, UploadRequestOptions } from "../type";

interface FileOptions {
  name: string;
  file: File;
}

interface FileDataBuilder {
  (options: FileOptions, data?: Record<string, any>): FormData;
}

export const fileDataBuilder: FileDataBuilder = (
  options: FileOptions,
  data?: Record<string, any>
) => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(data || {})) {
    if (Array.isArray(value)) {
      for (const item of value) {
        formData.append(key, item);
      }
    } else {
      formData.append(key, value);
    }
  }

  if (Array.isArray(options.file)) {
    for (const file of options.file) {
      formData.append(options.name, file, file.name);
    }
  } else {
    formData.append(options.name, options.file, options.file.name);
  }

  return formData;
};

export const fileUpload = (options: UploadRequestOptions): XMLHttpRequest => {
  const abortController = new AbortController();
  const xhr = new XMLHttpRequest();

  const {
    method = "POST",
    action = "",
    headers = {},
    withCredentials = false,
  } = options;
  const { onSuccess, onError, onProgress } = options;

  xhr.addEventListener("load", onSuccess, { signal: abortController.signal });
  xhr.addEventListener("error", onError, { signal: abortController.signal });
  xhr.addEventListener("progress", onProgress, {
    signal: abortController.signal,
  });

  xhr.open(method, action, true);

  xhr.withCredentials = withCredentials;

  if (headers instanceof Headers) {
    headers.forEach((value, key) => {
      xhr.setRequestHeader(key, value);
    });
  } else {
    for (const [key, value] of Object.entries(headers)) {
      xhr.setRequestHeader(key, String(value));
    }
  }

  return xhr;
};
