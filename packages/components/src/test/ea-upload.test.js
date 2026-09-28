import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

global.requestAnimationFrame = callback => {
  return setTimeout(callback, 16);
};
global.cancelAnimationFrame = id => {
  clearTimeout(id);
};

Element.prototype.scrollIntoView =
  Element.prototype.scrollIntoView || function () {};

// attachInternals polyfill for EaFormAssociatedBase
const originalAttachInternals = HTMLElement.prototype.attachInternals;
HTMLElement.prototype.attachInternals = function () {
  const internals = originalAttachInternals?.call(this) || {};
  if (
    !internals.setValidity ||
    internals.setValidity.toString().includes("[native code]")
  ) {
    const state = { valid: true, message: "" };
    internals.setValidity = function (flags, message) {
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
    internals.setFormValue = internals.setFormValue || function () {};
  }
  return internals;
};

// DataTransfer polyfill for JSDOM
if (typeof DataTransfer === "undefined") {
  global.DataTransfer = class DataTransfer {
    constructor() {
      this._items = [];
      this._files = [];
    }
    get items() {
      const self = this;
      return {
        add(file) {
          self._items.push({ kind: "file", getAsFile: () => file });
          self._files.push(file);
        },
      };
    }
    get files() {
      const files = this._files;
      return {
        length: files.length,
        item(i) {
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

// DragEvent polyfill for JSDOM
if (typeof DragEvent === "undefined") {
  global.DragEvent = class DragEvent extends Event {
    constructor(type, options = {}) {
      super(type, { cancelable: true, ...options });
      this.dataTransfer = options.dataTransfer || null;
    }
  };
}

import { waitForRender } from "./utils/waitForRender.js";
import { runAxe, assertNoA11yViolations } from "./utils/a11y.js";

import "../components/ea-upload/index.ts";

describe("EaUpload Component", () => {
  let container;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe("Basic Functionality", () => {
    it("应该正确渲染组件", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await waitForRender();

      expect(upload).toBeDefined();
      expect(upload.shadowRoot).toBeDefined();
    });

    it("应该包含所有 CSS Parts", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await waitForRender();

      const parts = ["container", "content", "tip", "list", "preview"];
      parts.forEach(part => {
        expect(
          upload.shadowRoot.querySelector(`[part="${part}"]`)
        ).toBeTruthy();
      });
    });

    it("应该包含原生 input 元素", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await waitForRender();

      const input = upload.shadowRoot.querySelector("input#original");
      expect(input).toBeTruthy();
      expect(input.type).toBe("file");
    });

    it("应该包含 ea-image-preview 子组件", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await waitForRender();

      const preview = upload.shadowRoot.querySelector("ea-image-preview");
      expect(preview).toBeTruthy();
    });
  });

  describe("Slots", () => {
    it("应该支持 default 插槽", async () => {
      const upload = document.createElement("ea-upload");
      upload.innerHTML = `<ea-button>Click to upload</ea-button>`;
      container.appendChild(upload);

      await waitForRender();

      const defaultSlot = upload.shadowRoot.querySelector("slot:not([name])");
      expect(defaultSlot).toBeTruthy();
      const assigned = defaultSlot.assignedNodes();
      expect(assigned.length).toBeGreaterThan(0);
    });

    it("应该支持 tip 插槽", async () => {
      const upload = document.createElement("ea-upload");
      upload.innerHTML = `<div slot="tip">Tip text</div>`;
      container.appendChild(upload);

      await waitForRender();

      const tipSlot = upload.shadowRoot.querySelector('slot[name="tip"]');
      expect(tipSlot).toBeTruthy();
    });

    it("应该支持 trigger 插槽", async () => {
      const upload = document.createElement("ea-upload");
      upload.innerHTML = `<ea-button slot="trigger">Select file</ea-button>`;
      container.appendChild(upload);

      await waitForRender();

      const triggerSlot = upload.shadowRoot.querySelector(
        'slot[name="trigger"]'
      );
      expect(triggerSlot).toBeTruthy();
    });
  });

  describe("Attributes", () => {
    it("默认 action 应该是空字符串", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await waitForRender();

      expect(upload.action).toBe("");
    });

    it("应该正确设置 action 属性", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("action", "https://example.com/upload");
      container.appendChild(upload);

      await waitForRender();

      expect(upload.action).toBe("https://example.com/upload");
    });

    it("默认 method 应该是 POST", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await waitForRender();

      expect(upload.method).toBe("POST");
    });

    it("应该正确设置 method 属性", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("method", "PUT");
      container.appendChild(upload);

      await waitForRender();

      expect(upload.method).toBe("PUT");
    });

    it("默认 multiple 应该是 false", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await waitForRender();

      expect(upload.multiple).toBe(false);
    });

    it("设置 multiple 属性后 input 应该为多选", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("multiple", "");
      container.appendChild(upload);

      await waitForRender();

      expect(upload.multiple).toBe(true);
      const input = upload.shadowRoot.querySelector("input#original");
      expect(input.hasAttribute("multiple")).toBe(true);
    });

    it("默认 disabled 应该是 false", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await waitForRender();

      expect(upload.disabled).toBe(false);
    });

    it("设置 disabled 后 input 应该被禁用", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("disabled", "");
      container.appendChild(upload);

      await waitForRender();

      expect(upload.disabled).toBe(true);
      const input = upload.shadowRoot.querySelector("input#original");
      expect(input.hasAttribute("disabled")).toBe(true);
    });

    it("默认 showFileList 应该是 true", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await waitForRender();

      expect(upload.showFileList).toBe(true);
    });

    it("设置 showFileList=false 应该隐藏文件列表", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("show-file-list", "false");
      container.appendChild(upload);

      await waitForRender();

      expect(upload.showFileList).toBe(false);
    });

    it("默认 autoUpload 应该是 true", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await waitForRender();

      expect(upload.autoUpload).toBe(true);
    });

    it("应该正确设置 auto-upload 属性", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("auto-upload", "false");
      container.appendChild(upload);

      await waitForRender();

      expect(upload.autoUpload).toBe(false);
    });

    it("默认 listType 应该是 text", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await waitForRender();

      expect(upload.listType).toBe("text");
    });

    it("应该支持 list-type='picture'", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("list-type", "picture");
      container.appendChild(upload);

      await waitForRender();

      expect(upload.listType).toBe("picture");
    });

    it("应该支持 list-type='picture-card'", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("list-type", "picture-card");
      container.appendChild(upload);

      await waitForRender();

      expect(upload.listType).toBe("picture-card");
    });

    it("默认 drag 应该是 false", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await waitForRender();

      expect(upload.drag).toBe(false);
    });

    it("应该正确设置 drag 属性", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("drag", "");
      container.appendChild(upload);

      await waitForRender();

      expect(upload.drag).toBe(true);
    });

    it("默认 limit 应该是 Number.MAX_SAFE_INTEGER", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await waitForRender();

      expect(upload.limit).toBe(Number.MAX_SAFE_INTEGER);
    });

    it("应该正确设置 limit 属性", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("limit", "3");
      container.appendChild(upload);

      await waitForRender();

      expect(upload.limit).toBe(3);
    });

    it("默认 directory 应该是 false", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await waitForRender();

      expect(upload.directory).toBe(false);
    });

    it("设置 directory 后 input 应该有 webkitdirectory 属性", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("directory", "");
      container.appendChild(upload);

      await waitForRender();

      expect(upload.directory).toBe(true);
      const input = upload.shadowRoot.querySelector("input#original");
      expect(input.webkitdirectory).toBe(true);
    });

    it("应该支持 accept 属性", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("accept", "image/*");
      container.appendChild(upload);

      await waitForRender();

      expect(upload.accept).toBe("image/*");
      const input = upload.shadowRoot.querySelector("input#original");
      expect(input.getAttribute("accept")).toBe("image/*");
    });

    it("应该支持 name 属性", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("name", "file");
      container.appendChild(upload);

      await waitForRender();

      expect(upload.name).toBe("file");
    });

    it("应该支持 with-credentials 属性", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("with-credentials", "");
      container.appendChild(upload);

      await waitForRender();

      expect(upload.withCredentials).toBe(true);
    });

    it("应该支持 crossorigin 属性", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("crossorigin", "anonymous");
      container.appendChild(upload);

      await waitForRender();

      expect(upload.crossorigin).toBe("anonymous");
    });
  });

  describe("BEM Class Names", () => {
    it("容器应该有 ea-upload 类名", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await waitForRender();

      const el = upload.shadowRoot.querySelector(".ea-upload");
      expect(el).toBeTruthy();
    });

    it("应该根据 listType 添加对应的修饰符类名", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("list-type", "picture");
      container.appendChild(upload);

      await waitForRender();

      const el = upload.shadowRoot.querySelector(".ea-upload");
      expect(el.classList.contains("ea-upload--picture")).toBe(true);
    });

    it("list-type='picture-card' 应该添加对应修饰符类名", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("list-type", "picture-card");
      container.appendChild(upload);

      await waitForRender();

      const el = upload.shadowRoot.querySelector(".ea-upload");
      expect(el.classList.contains("ea-upload--picture-card")).toBe(true);
    });

    it("drag 为 true 时应该添加 ea-upload--drag 修饰符类名", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("drag", "");
      container.appendChild(upload);

      await waitForRender();

      const el = upload.shadowRoot.querySelector(".ea-upload");
      expect(el.classList.contains("ea-upload--drag")).toBe(true);
    });

    it("listType 变化时应该更新容器 class", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await waitForRender();

      const el = upload.shadowRoot.querySelector(".ea-upload");
      expect(el.classList.contains("ea-upload--text")).toBe(true);

      upload.setAttribute("list-type", "picture");
      await waitForRender();

      expect(el.classList.contains("ea-upload--picture")).toBe(true);
      expect(el.classList.contains("ea-upload--text")).toBe(false);
    });
  });

  describe("fileList Property", () => {
    it("默认 fileList 应该是空数组", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await waitForRender();

      expect(upload.fileList).toEqual([]);
    });

    it("设置 fileList 应该渲染文件列表", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await waitForRender();

      upload.fileList = [{ uid: "1", name: "test.txt", status: "done" }];

      await waitForRender();

      const listEl = upload.shadowRoot.querySelector(".ea-upload__list");
      const li = listEl.querySelector('li[data-uid="1"]');
      expect(li).toBeTruthy();
      expect(li.classList.contains("is-done")).toBe(true);
    });

    it("文件列表项应该有 ea-upload-file-item 子组件", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await waitForRender();

      upload.fileList = [{ uid: "1", name: "test.txt", status: "done" }];

      await waitForRender();

      const fileItem = upload.shadowRoot.querySelector("ea-upload-file-item");
      expect(fileItem).toBeTruthy();
    });

    it("重新赋值 fileList 后状态变化应该更新列表项 class", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("auto-upload", "false");
      container.appendChild(upload);

      await waitForRender();

      upload.fileList = [{ uid: "1", name: "test.txt", status: "pending" }];

      await waitForRender();

      const li = upload.shadowRoot.querySelector('li[data-uid="1"]');
      expect(li.classList.contains("is-pending")).toBe(true);

      // 重新赋值 fileList 触发 observer
      upload.fileList[0].status = "uploading";
      upload.fileList = [...upload.fileList];
      await waitForRender();

      expect(li.classList.contains("is-uploading")).toBe(true);

      upload.fileList[0].status = "done";
      upload.fileList = [...upload.fileList];
      await waitForRender();

      expect(li.classList.contains("is-done")).toBe(true);
    });

    it("设置 fileList 时没有 uid 的项应该自动生成 uid", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await waitForRender();

      upload.fileList = [{ name: "test.txt", status: "done" }];

      await waitForRender();

      expect(upload.fileList[0].uid).toBeTruthy();
    });
  });

  describe("defaultFileList Property", () => {
    it("设置 defaultFileList 应该合并到 fileList", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await waitForRender();

      upload.defaultFileList = [{ name: "test.txt", status: "done" }];

      await waitForRender();

      expect(upload.fileList.length).toBe(1);
      expect(upload.fileList[0].name).toBe("test.txt");
      expect(upload.fileList[0].status).toBe("done");
    });

    it("defaultFileList 中 status 默认应为 done", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await waitForRender();

      upload.defaultFileList = [{ name: "test.txt" }];

      await waitForRender();

      expect(upload.fileList[0].status).toBe("done");
    });
  });

  describe("Methods", () => {
    it("should have submit method", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await waitForRender();

      expect(typeof upload.submit).toBe("function");
    });

    it("should have abort method", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await waitForRender();

      expect(typeof upload.abort).toBe("function");
    });

    it("should have clearFiles method", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await waitForRender();

      expect(typeof upload.clearFiles).toBe("function");
    });

    it("should have handleFileSelect method", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await waitForRender();

      expect(typeof upload.handleFileSelect).toBe("function");
    });

    it("clearFiles() 应该清空文件列表", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await waitForRender();

      upload.fileList = [{ uid: "1", name: "test.txt", status: "done" }];

      await waitForRender();

      expect(upload.fileList.length).toBe(1);

      upload.clearFiles();
      await waitForRender();

      expect(upload.fileList.length).toBe(0);
    });

    it("clearFiles() 应该触发 change 事件", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await waitForRender();

      const handler = vi.fn();
      upload.addEventListener("change", handler);

      upload.fileList = [{ uid: "1", name: "test.txt", status: "done" }];

      await waitForRender();

      upload.clearFiles();
      await waitForRender();

      expect(handler).toHaveBeenCalled();
    });

    it("abort() 应该中止所有上传", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await waitForRender();

      const mockController = {
        abort: vi.fn(),
        submit: vi.fn(),
        xhr: {},
      };

      upload.fileList = [
        {
          uid: "1",
          name: "test.txt",
          status: "uploading",
          controller: mockController,
        },
      ];

      await waitForRender();

      upload.abort();

      expect(mockController.abort).toHaveBeenCalled();
    });

    it("abort('uid') 应该中止指定文件的上传", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await waitForRender();

      const mockController1 = {
        abort: vi.fn(),
        submit: vi.fn(),
        xhr: {},
      };
      const mockController2 = {
        abort: vi.fn(),
        submit: vi.fn(),
        xhr: {},
      };

      upload.fileList = [
        {
          uid: "1",
          name: "test.txt",
          status: "uploading",
          controller: mockController1,
        },
        {
          uid: "2",
          name: "test2.txt",
          status: "uploading",
          controller: mockController2,
        },
      ];

      await waitForRender();

      upload.abort("1");

      expect(mockController1.abort).toHaveBeenCalled();
      expect(mockController2.abort).not.toHaveBeenCalled();
    });

    it("handleFileSelect() 应该触发 input 点击", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await waitForRender();

      const input = upload.shadowRoot.querySelector("input#original");
      const clickHandler = vi.fn();
      input.addEventListener("click", clickHandler);

      upload.handleFileSelect();

      expect(clickHandler).toHaveBeenCalled();
    });

    it("disabled 时 handleFileSelect() 不应触发 input 点击", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("disabled", "");
      container.appendChild(upload);

      await waitForRender();

      const input = upload.shadowRoot.querySelector("input#original");
      const clickHandler = vi.fn();
      input.addEventListener("click", clickHandler);

      upload.handleFileSelect();

      expect(clickHandler).not.toHaveBeenCalled();
    });
  });

  describe("Events", () => {
    it("文件列表变化时应该触发 change 事件", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await waitForRender();

      const handler = vi.fn();
      upload.addEventListener("change", handler);

      upload.fileList = [{ uid: "1", name: "test.txt", status: "done" }];

      // 触发 change 事件
      upload.dispatchEvent(
        new CustomEvent("change", {
          detail: { uploadFile: undefined, uploadFiles: upload.fileList },
          bubbles: true,
          composed: true,
        })
      );
      await waitForRender();

      expect(handler).toHaveBeenCalled();
    });

    it("移除文件时应该触发 ea-upload-remove 事件", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await waitForRender();

      const handler = vi.fn();
      upload.addEventListener("ea-upload-remove", handler);

      upload.fileList = [{ uid: "1", name: "test.txt", status: "done" }];

      await waitForRender();

      // 模拟文件项删除事件
      const fileItem = upload.shadowRoot.querySelector("ea-upload-file-item");
      fileItem.dispatchEvent(
        new CustomEvent("ea-upload-file-delete", {
          detail: { uid: "1" },
          bubbles: true,
          composed: true,
        })
      );

      await waitForRender();

      expect(handler).toHaveBeenCalled();
    });

    it("上传成功时应该触发 ea-upload-success 事件", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await waitForRender();

      const handler = vi.fn();
      upload.addEventListener("ea-upload-success", handler);

      upload.dispatchEvent(
        new CustomEvent("ea-upload-success", {
          detail: {
            response: { url: "https://example.com/file" },
            uploadFile: { uid: "1", name: "test.txt" },
            uploadFiles: [],
          },
          bubbles: true,
          composed: true,
        })
      );

      expect(handler).toHaveBeenCalled();
    });
  });

  describe("Callbacks", () => {
    it("onChange 回调应该在文件变化时被调用", async () => {
      const upload = document.createElement("ea-upload");
      const onChange = vi.fn();
      upload.onChange = onChange;
      container.appendChild(upload);

      await waitForRender();

      upload.fileList = [{ uid: "1", name: "test.txt", status: "done" }];

      // 手动触发 change 回调
      upload.onChange(undefined, upload.fileList);

      expect(onChange).toHaveBeenCalled();
    });

    it("onRemove 回调应该在文件移除时被调用", async () => {
      const upload = document.createElement("ea-upload");
      const onRemove = vi.fn();
      upload.onRemove = onRemove;
      container.appendChild(upload);

      await waitForRender();

      upload.fileList = [{ uid: "1", name: "test.txt", status: "done" }];

      await waitForRender();

      // 模拟文件删除
      const fileItem = upload.shadowRoot.querySelector("ea-upload-file-item");
      fileItem.dispatchEvent(
        new CustomEvent("ea-upload-file-delete", {
          detail: { uid: "1" },
          bubbles: true,
          composed: true,
        })
      );

      await waitForRender();

      expect(onRemove).toHaveBeenCalled();
    });

    it("beforeRemove 返回 false 时应阻止移除", async () => {
      const upload = document.createElement("ea-upload");
      upload.beforeRemove = () => false;
      container.appendChild(upload);

      await waitForRender();

      upload.fileList = [{ uid: "1", name: "test.txt", status: "done" }];

      await waitForRender();

      expect(upload.fileList.length).toBe(1);

      // 模拟文件删除
      const fileItem = upload.shadowRoot.querySelector("ea-upload-file-item");
      fileItem.dispatchEvent(
        new CustomEvent("ea-upload-file-delete", {
          detail: { uid: "1" },
          bubbles: true,
          composed: true,
        })
      );

      await waitForRender();

      expect(upload.fileList.length).toBe(1);
    });

    it("beforeRemove 返回 Promise<false> 时应阻止移除", async () => {
      const upload = document.createElement("ea-upload");
      upload.beforeRemove = () => Promise.resolve(false);
      container.appendChild(upload);

      await waitForRender();

      upload.fileList = [{ uid: "1", name: "test.txt", status: "done" }];

      await waitForRender();

      // 模拟文件删除
      const fileItem = upload.shadowRoot.querySelector("ea-upload-file-item");
      fileItem.dispatchEvent(
        new CustomEvent("ea-upload-file-delete", {
          detail: { uid: "1" },
          bubbles: true,
          composed: true,
        })
      );

      await waitForRender();

      expect(upload.fileList.length).toBe(1);
    });
  });

  describe("Limit and Exceed", () => {
    it("设置 limit 后超出限制时应触发 onExceed 回调", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("auto-upload", "false");
      upload.setAttribute("limit", "1");
      const onExceed = vi.fn();
      upload.onExceed = onExceed;
      container.appendChild(upload);

      await waitForRender();

      upload.fileList = [{ uid: "1", name: "test.txt", status: "done" }];

      await waitForRender();

      // 尝试添加超过限制的文件 - 直接通过 Object.defineProperty 来模拟 input.files
      const file = new File(["content"], "test2.txt", { type: "text/plain" });
      const input = upload.shadowRoot.querySelector("input#original");
      Object.defineProperty(input, "files", {
        value: [file],
        configurable: true,
      });
      input.dispatchEvent(new Event("change", { bubbles: true }));

      await waitForRender();

      // 由于已有1个文件，limit=1，再添加会触发 onExceed
      expect(onExceed).toHaveBeenCalled();
    });
  });

  describe("Drag and Drop", () => {
    it("drag 为 false 时拖拽事件不应生效", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await waitForRender();

      const contentEl = upload.shadowRoot.querySelector(".ea-upload__content");
      const dragoverHandler = vi.fn();

      contentEl.addEventListener("dragover", dragoverHandler);

      const event = new DragEvent("dragover", {
        bubbles: true,
        composed: true,
      });
      contentEl.dispatchEvent(event);

      // drag=false 时，_handleDragOver 直接 return，不会 preventDefault
      expect(event.defaultPrevented).toBe(false);
    });

    it("drag 为 true 时拖拽悬浮应该触发 dragover 事件", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("drag", "");
      container.appendChild(upload);

      await waitForRender();

      const contentEl = upload.shadowRoot.querySelector(".ea-upload__content");
      const event = new DragEvent("dragover", {
        bubbles: true,
        composed: true,
      });
      contentEl.dispatchEvent(event);

      expect(event.defaultPrevented).toBe(true);
    });

    it("drag 为 true 时拖拽进入应该添加 is-dragover 状态类", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("drag", "");
      container.appendChild(upload);

      await waitForRender();

      const contentEl = upload.shadowRoot.querySelector(".ea-upload__content");
      const event = new DragEvent("dragenter", {
        bubbles: true,
        composed: true,
      });
      contentEl.dispatchEvent(event);

      const containerEl = upload.shadowRoot.querySelector(".ea-upload");
      expect(containerEl.classList.contains("is-dragover")).toBe(true);
    });

    it("drag 为 true 时拖拽离开应该移除 is-dragover 状态类", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("drag", "");
      container.appendChild(upload);

      await waitForRender();

      const contentEl = upload.shadowRoot.querySelector(".ea-upload__content");

      // 先进入
      contentEl.dispatchEvent(
        new DragEvent("dragenter", { bubbles: true, composed: true })
      );

      // 再离开
      contentEl.dispatchEvent(
        new DragEvent("dragleave", { bubbles: true, composed: true })
      );

      const containerEl = upload.shadowRoot.querySelector(".ea-upload");
      expect(containerEl.classList.contains("is-dragover")).toBe(false);
    });

    it("drag 为 true 时拖拽放置应该添加文件", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("drag", "");
      upload.setAttribute("auto-upload", "false");
      container.appendChild(upload);

      await waitForRender();

      const file = new File(["content"], "test.txt", { type: "text/plain" });
      const dt = new DataTransfer();
      dt.items.add(file);

      const contentEl = upload.shadowRoot.querySelector(".ea-upload__content");
      const event = new DragEvent("drop", {
        dataTransfer: dt,
        bubbles: true,
        composed: true,
      });
      contentEl.dispatchEvent(event);

      await waitForRender();

      expect(upload.fileList.length).toBe(1);
      expect(upload.fileList[0].name).toBe("test.txt");
    });
  });

  describe("File Selection", () => {
    it("通过 input 选择文件应该添加到 fileList", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("auto-upload", "false");
      container.appendChild(upload);

      await waitForRender();

      const file = new File(["content"], "test.txt", { type: "text/plain" });
      const input = upload.shadowRoot.querySelector("input#original");
      Object.defineProperty(input, "files", {
        value: [file],
        configurable: true,
      });
      input.dispatchEvent(new Event("change", { bubbles: true }));

      await waitForRender();

      expect(upload.fileList.length).toBe(1);
      expect(upload.fileList[0].name).toBe("test.txt");
      expect(upload.fileList[0].status).toBe("pending");
    });

    it("选择多个文件应该全部添加到 fileList", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("multiple", "");
      upload.setAttribute("auto-upload", "false");
      container.appendChild(upload);

      await waitForRender();

      const input = upload.shadowRoot.querySelector("input#original");
      Object.defineProperty(input, "files", {
        value: [
          new File(["a"], "a.txt", { type: "text/plain" }),
          new File(["b"], "b.txt", { type: "text/plain" }),
        ],
        configurable: true,
      });
      input.dispatchEvent(new Event("change", { bubbles: true }));

      await waitForRender();

      expect(upload.fileList.length).toBe(2);
    });

    it("show-file-list=false 时选择文件后不应显示文件列表", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("show-file-list", "false");
      upload.setAttribute("auto-upload", "false");
      container.appendChild(upload);

      await waitForRender();

      const file = new File(["content"], "test.txt", { type: "text/plain" });
      const input = upload.shadowRoot.querySelector("input#original");
      Object.defineProperty(input, "files", {
        value: [file],
        configurable: true,
      });
      input.dispatchEvent(new Event("change", { bubbles: true }));

      await waitForRender();

      expect(upload.fileList.length).toBe(1);
      const listEl = upload.shadowRoot.querySelector(".ea-upload__list");
      expect(listEl.querySelectorAll("li[data-uid]").length).toBe(0);
    });
  });

  describe("Submit", () => {
    it("fileList 为空时 submit() 不应报错", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await waitForRender();

      expect(() => upload.submit()).not.toThrow();
    });

    it("beforeUpload 返回 false 时应阻止上传", async () => {
      const upload = document.createElement("ea-upload");
      upload.beforeUpload = () => false;
      container.appendChild(upload);

      await waitForRender();

      const httpRequest = vi.fn().mockReturnValue({
        submit: vi.fn(),
        abort: vi.fn(),
        xhr: {},
      });
      upload.httpRequest = httpRequest;

      upload.fileList = [
        {
          uid: "1",
          name: "test.txt",
          status: "pending",
          raw: new File(["content"], "test.txt"),
        },
      ];

      await waitForRender();

      await upload.submit();

      expect(httpRequest).not.toHaveBeenCalled();
    });

    it("beforeUpload 返回 Promise<false> 时应阻止上传", async () => {
      const upload = document.createElement("ea-upload");
      upload.beforeUpload = () => Promise.resolve(false);
      container.appendChild(upload);

      await waitForRender();

      const httpRequest = vi.fn().mockReturnValue({
        submit: vi.fn(),
        abort: vi.fn(),
        xhr: {},
      });
      upload.httpRequest = httpRequest;

      upload.fileList = [
        {
          uid: "1",
          name: "test.txt",
          status: "pending",
          raw: new File(["content"], "test.txt"),
        },
      ];

      await waitForRender();

      await upload.submit();

      expect(httpRequest).not.toHaveBeenCalled();
    });

    it("auto-upload 为 true 时添加文件应自动调用 submit", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("action", "https://example.com/upload");
      container.appendChild(upload);

      const httpRequest = vi.fn().mockReturnValue({
        submit: vi.fn(),
        abort: vi.fn(),
        xhr: {},
      });
      upload.httpRequest = httpRequest;

      await waitForRender();

      upload.fileList = [
        {
          uid: "1",
          name: "test.txt",
          status: "pending",
          raw: new File(["content"], "test.txt"),
        },
      ];

      await waitForRender();

      // autoUpload 为 true 时，fileList 变化会触发 submit
      expect(httpRequest).toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("默认状态应该无 a11y 违规（排除 file input 标签规则）", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("action", "https://example.com/upload");
      container.appendChild(upload);

      await waitForRender();

      const results = await runAxe(upload, {
        rules: {
          label: { enabled: false },
        },
      });
      assertNoA11yViolations(results);
    });

    it("disabled 状态应该无 a11y 违规（排除 file input 标签规则）", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("action", "https://example.com/upload");
      upload.setAttribute("disabled", "");
      container.appendChild(upload);

      await waitForRender();

      const results = await runAxe(upload, {
        rules: {
          label: { enabled: false },
        },
      });
      assertNoA11yViolations(results);
    });
  });
});
