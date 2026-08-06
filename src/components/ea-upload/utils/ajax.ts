import { EaUploadAjaxError } from "../events/EaUploadAjaxError";
import type {
  EaUploadErrorCallback,
  EaUploadProgressCallback,
  EaUploadProgressEvent,
  EaUploadSuccessCallback,
  FileField,
  Method,
  UploadRequest,
  UploadRequestOptions,
  UploadRequestResult,
} from "../type";

/**
 * 表单数据构建器函数类型
 * @param field - 文件字段信息
 * @param data - 附加数据
 * @returns 构建完成的 FormData 对象
 */
interface FormDataBuilder {
  (field: FileField, data?: Record<string, any>): FormData;
}

/**
 * 创建 XHR 错误处理回调
 * @param xhr - XMLHttpRequest 实例
 * @param options - 上传请求配置
 * @param callback - 外部错误回调
 * @returns 一个错误事件处理器
 */
const createErrorHandler = (
  xhr: XMLHttpRequest,
  options: UploadRequestOptions,
  callback?: EaUploadErrorCallback
) => {
  let msg: string;
  if (xhr.response) {
    msg = `${xhr.response.error || xhr.response}`;
  } else if (xhr.responseText) {
    msg = `${xhr.responseText}`;
  } else {
    msg = `fail to ${options.method} ${options.action} ${xhr.status}`;
  }

  return (evt: Event) => {
    if (!callback) return;

    const { fileField } = options;
    callback(
      new EaUploadAjaxError(msg, xhr.status, options.method, options.action),
      fileField.file,
      fileField.files
    );
  };
};

const createSuccessHandler = (
  xhr: XMLHttpRequest,
  options: UploadRequestOptions,
  callback?: EaUploadSuccessCallback
) => {
  return (evt: Event) => {
    if (xhr.status < 200 || xhr.status >= 300) {
      return createErrorHandler(xhr, options, options.onError)(evt);
    }

    let text = xhr.responseText || xhr.response;
    if (text) {
      try {
        text = JSON.parse(text);
      } catch {}
    }

    if (!callback) return;

    const { fileField } = options;
    callback(text, fileField.file, fileField.files);
  };
};

const createProgressHandler = (
  xhr: XMLHttpRequest,
  options: UploadRequestOptions,
  callback?: EaUploadProgressCallback
) => {
  return (evt: ProgressEvent<XMLHttpRequestEventTarget>) => {
    if (!callback) return;

    const progressEvt = evt as EaUploadProgressEvent;
    progressEvt.percent = (progressEvt.loaded / progressEvt.total) * 100;
    const { fileField } = options;
    callback(progressEvt, fileField.file, fileField.files);
  };
};

/**
 * 构建文件上传所需的 FormData
 * @param field - 文件字段信息（字段名和文件）
 * @param data - 额外附加数据（可选）
 * @returns 填充好的 FormData 实例
 */
export const buildFormData: FormDataBuilder = (
  field: FileField,
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

  const { name, file } = field;
  const appendFile = (f: FileItem): void => {
    const blob = f.raw ?? (f instanceof Blob ? f : undefined);
    if (!blob) return;
    formData.append(name, blob, f.name);
  };
  if (Array.isArray(file)) {
    for (const f of file) {
      appendFile(f);
    }
  } else {
    appendFile(file);
  }

  return formData;
};

/**
 * 创建并配置一个带 abort 控制的上传请求
 *
 * @param options - 上传配置（包含 method, action, headers, withCredentials, 各类回调）
 * @returns 一个包含原始 xhr 及 submit/abort 控制方法的对象
 *
 * @example
 * const request = createUploadRequest({
 *   action: '/upload',
 *   onSuccess: (e) => console.log('成功', e),
 *   onError: (e, err) => console.error('失败', err),
 * });
 * request.submit();
 * // 稍后取消
 * request.abort();
 */
export const createUploadRequest = (
  options: UploadRequestOptions
): UploadRequestResult => {
  const abortController = new AbortController();
  const xhr = new XMLHttpRequest();

  const {
    method = "POST",
    action = "",
    fileField,
    data: additionalData,
    headers = {},
    withCredentials = false,
  } = options;
  const { onSuccess, onError, onProgress } = options;
  const data = buildFormData(fileField, additionalData);

  xhr.addEventListener("load", createSuccessHandler(xhr, options, onSuccess), {
    signal: abortController.signal,
  });
  xhr.addEventListener("error", createErrorHandler(xhr, options, onError), {
    signal: abortController.signal,
  });
  if (xhr.upload) {
    xhr.upload.addEventListener(
      "progress",
      createProgressHandler(xhr, options, onProgress),
      {
        signal: abortController.signal,
      }
    );
  }

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

  return {
    xhr: xhr,
    submit: () => {
      xhr.send(data);
    },
    abort: () => {
      xhr.abort();
      abortController.abort();
    },
  };
};
