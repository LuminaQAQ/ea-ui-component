// jsdom 环境缺失 API 的集中 polyfill
// 仅在对应 API 缺失时补齐，测试文件内已有覆盖仍会优先生效

if (typeof window !== "undefined") {
  if (!window.ResizeObserver) {
    class ResizeObserverStub {
      observe() {
        /* noop */
      }
      unobserve() {
        /* noop */
      }
      disconnect() {
        /* noop */
      }
    }
    (window as any).ResizeObserver = ResizeObserverStub;
    (globalThis as any).ResizeObserver = ResizeObserverStub;
  }

  if (!window.matchMedia) {
    (window as any).matchMedia = (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener() {
        /* noop */
      },
      removeListener() {
        /* noop */
      },
      addEventListener() {
        /* noop */
      },
      removeEventListener() {
        /* noop */
      },
      dispatchEvent() {
        return false;
      },
    });
  }
}

if (typeof Element !== "undefined" && !Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = function () {
    /* noop */
  };
}

if (typeof URL !== "undefined") {
  if (!URL.createObjectURL) {
    let blobSeq = 0;
    (URL as any).createObjectURL = () => `blob:jsdom-${++blobSeq}`;
  }

  if (!URL.revokeObjectURL) {
    (URL as any).revokeObjectURL = () => {
      /* noop */
    };
  }
}

if (typeof DataTransfer === "undefined") {
  (globalThis as any).DataTransfer = class DataTransfer {
    private _items: any[] = [];
    private _files: any[] = [];

    get items() {
      const self = this;
      return {
        add(file: any) {
          self._items.push({ kind: "file", getAsFile: () => file });
          self._files.push(file);
        },
      };
    }

    get files() {
      const files = this._files;
      return {
        length: files.length,
        item(i: number) {
          return files[i] || null;
        },
        [Symbol.iterator]() {
          let i = 0;
          const len = files.length;
          return {
            next() {
              return i < len
                ? { value: files[i++], done: false }
                : { value: undefined, done: true };
            },
          };
        },
      };
    }
  };
}

if (typeof DragEvent === "undefined") {
  (globalThis as any).DragEvent = class DragEvent extends Event {
    dataTransfer: any;
    constructor(type: string, options: any = {}) {
      super(type, { cancelable: true, ...options });
      this.dataTransfer = options.dataTransfer || null;
    }
  };
}

if (typeof HTMLElement !== "undefined") {
  const originalAttachInternals = (HTMLElement.prototype as any)
    .attachInternals;
  (HTMLElement.prototype as any).attachInternals = function () {
    const internals: any = originalAttachInternals?.call(this) || {};
    if (
      !internals.setValidity ||
      internals.setValidity.toString().includes("[native code]")
    ) {
      const state = { valid: true, message: "" };
      internals.setValidity = function (flags: any, message: string) {
        if (
          flags &&
          Object.keys(flags).length > 0 &&
          Object.values(flags).some(v => v)
        ) {
          state.valid = false;
          state.message = message || "";
        } else {
          state.valid = true;
          state.message = "";
        }
      };
      Object.defineProperty(internals, "validity", {
        get: function () {
          return { valid: state.valid, valueMissing: !state.valid };
        },
        configurable: true,
      });
      Object.defineProperty(internals, "validationMessage", {
        get: function () {
          return state.message;
        },
        configurable: true,
      });
      internals.willValidate = true;
      internals.checkValidity = function () {
        return state.valid;
      };
      internals.reportValidity = function () {
        return state.valid;
      };
      Object.defineProperty(internals, "form", { value: null, writable: true });
      internals.setFormValue =
        internals.setFormValue ||
        function () {
          /* noop */
        };
    }
    return internals;
  };
}
