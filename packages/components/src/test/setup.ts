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

  // CSS.supports：jsdom 未实现，通过样式赋值回读模拟真实校验语义
  if (typeof (window as any).CSS === "undefined") {
    (window as any).CSS = {};
  }
  if (typeof (globalThis as any).CSS === "undefined") {
    (globalThis as any).CSS = (window as any).CSS;
  }
  if (typeof (globalThis as any).CSS.supports !== "function") {
    const probe = document.createElement("div").style;
    const supports = (property: string, value?: string): boolean => {
      let prop = property;
      let val = value;
      if (val === undefined) {
        const sep = property.indexOf(":");
        if (sep === -1) return false;
        prop = property.slice(0, sep).trim();
        val = property.slice(sep + 1).trim();
      }
      probe.cssText = "";
      probe.setProperty(prop, val);
      return probe.getPropertyValue(prop) !== "";
    };
    (window as any).CSS.supports = supports;
    (globalThis as any).CSS.supports = supports;
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

// Element.prototype.scrollTo：jsdom 未实现，写入选项到 scrollTop/scrollLeft
if (typeof Element !== "undefined" && !Element.prototype.scrollTo) {
  (Element.prototype as any).scrollTo = function (
    this: Element,
    optionsOrX?: ScrollToOptions | number,
    y?: number
  ) {
    let top: number | undefined;
    let left: number | undefined;
    if (typeof optionsOrX === "object" && optionsOrX !== null) {
      top = optionsOrX.top;
      left = optionsOrX.left;
    } else {
      top = typeof optionsOrX === "number" ? optionsOrX : undefined;
      left = typeof y === "number" ? y : undefined;
    }
    if (top !== undefined) this.scrollTop = top;
    if (left !== undefined) this.scrollLeft = left;
  };
}

// canvas 2d 上下文：测试环境未安装 canvas 包，与 jsdom 缺省行为一致返回 null，
// 仅绕开 jsdom 的 notImplemented 告警分支
if (typeof HTMLCanvasElement !== "undefined") {
  HTMLCanvasElement.prototype.getContext = function getContext() {
    return null;
  } as typeof HTMLCanvasElement.prototype.getContext;
}

// getComputedStyle 伪元素：jsdom 未实现伪元素样式，其原生行为是返回元素
// 计算样式并告警；这里保持返回值语义、仅走非伪元素路径
if (typeof window !== "undefined") {
  const nativeGetComputedStyle = window.getComputedStyle.bind(window);
  window.getComputedStyle = ((elt: Element, _pseudoElt?: string | null) =>
    nativeGetComputedStyle(elt)) as typeof window.getComputedStyle;
}

// Element.prototype.part：jsdom 未实现，基于 part attribute 的 token list
if (
  typeof Element !== "undefined" &&
  !Element.prototype.hasOwnProperty("part")
) {
  interface PartTokenList {
    contains(token: string): boolean;
    add(...tokens: string[]): void;
    remove(...tokens: string[]): void;
    toggle(token: string, force?: boolean): boolean;
  }

  Object.defineProperty(Element.prototype, "part", {
    get(this: Element) {
      const self = this as Element & { __partTokenList?: PartTokenList };
      if (!self.__partTokenList) {
        self.__partTokenList = {
          contains: token =>
            (self.getAttribute("part") || "").split(/\s+/).includes(token),
          add: (...tokens: string[]) => {
            const current = (self.getAttribute("part") || "")
              .split(/\s+/)
              .filter(Boolean);
            tokens.forEach(t => {
              if (!current.includes(t)) current.push(t);
            });
            self.setAttribute("part", current.join(" "));
          },
          remove: (...tokens: string[]) => {
            const current = (self.getAttribute("part") || "")
              .split(/\s+/)
              .filter(Boolean);
            tokens.forEach(t => {
              const idx = current.indexOf(t);
              if (idx !== -1) current.splice(idx, 1);
            });
            self.setAttribute("part", current.join(" "));
          },
          toggle(token: string, force?: boolean) {
            if (force !== undefined) {
              if (force) {
                this.add(token);
              } else {
                this.remove(token);
              }
              return force;
            }
            if (this.contains(token)) {
              this.remove(token);
              return false;
            }
            this.add(token);
            return true;
          },
        };
      }
      return self.__partTokenList;
    },
  });
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
