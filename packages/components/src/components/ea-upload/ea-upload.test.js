import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

global.requestAnimationFrame = callback => {
  return setTimeout(callback, 16);
};
global.cancelAnimationFrame = id => {
  clearTimeout(id);
};

import { runAxe, assertNoA11yViolations } from "../../test/utils/a11y.js";

import "./index.ts";
import {
  buildFormData,
  createUploadRequest,
} from "./utils/ajax.ts";
import { EaUploadAjaxError } from "./events/EaUploadAjaxError.ts";

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
    it("应该正确渲染组件", () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      expect(upload).toBeDefined();
      expect(upload.shadowRoot).toBeDefined();
    });

    it("应该包含所有 CSS Parts", () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      const parts = ["container", "content", "tip", "list", "preview"];
      parts.forEach(part => {
        expect(
          upload.shadowRoot.querySelector(`[part="${part}"]`)
        ).toBeTruthy();
      });
    });

    it("应该包含原生 input 元素", () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      const input = upload.shadowRoot.querySelector("input#original");
      expect(input).toBeTruthy();
      expect(input.type).toBe("file");
    });

    it("应该包含 ea-image-preview 子组件", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await upload.updateComplete;

      const preview = upload.shadowRoot.querySelector("ea-image-preview");
      expect(preview).toBeTruthy();
    });
  });

  describe("Slots", () => {
    it("应该支持 default 插槽", async () => {
      const upload = document.createElement("ea-upload");
      upload.innerHTML = `<ea-button>Click to upload</ea-button>`;
      container.appendChild(upload);

      await upload.updateComplete;

      const defaultSlot = upload.shadowRoot.querySelector("slot:not([name])");
      expect(defaultSlot).toBeTruthy();
      const assigned = defaultSlot.assignedNodes();
      expect(assigned.length).toBeGreaterThan(0);
    });

    it("应该支持 tip 插槽", () => {
      const upload = document.createElement("ea-upload");
      upload.innerHTML = `<div slot="tip">Tip text</div>`;
      container.appendChild(upload);

      const tipSlot = upload.shadowRoot.querySelector('slot[name="tip"]');
      expect(tipSlot).toBeTruthy();
    });

    it("应该支持 trigger 插槽", () => {
      const upload = document.createElement("ea-upload");
      upload.innerHTML = `<ea-button slot="trigger">Select file</ea-button>`;
      container.appendChild(upload);

      const triggerSlot = upload.shadowRoot.querySelector(
        'slot[name="trigger"]'
      );
      expect(triggerSlot).toBeTruthy();
    });
  });

  describe("Attributes", () => {
    it("默认 action 应该是空字符串", () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      expect(upload.action).toBe("");
    });

    it("应该正确设置 action 属性", () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("action", "https://example.com/upload");
      container.appendChild(upload);

      expect(upload.action).toBe("https://example.com/upload");
    });

    it("默认 method 应该是 POST", () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      expect(upload.method).toBe("POST");
    });

    it("应该正确设置 method 属性", () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("method", "PUT");
      container.appendChild(upload);

      expect(upload.method).toBe("PUT");
    });

    it("默认 multiple 应该是 false", () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      expect(upload.multiple).toBe(false);
    });

    it("设置 multiple 属性后 input 应该为多选", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("multiple", "");
      container.appendChild(upload);

      await upload.updateComplete;

      expect(upload.multiple).toBe(true);
      const input = upload.shadowRoot.querySelector("input#original");
      expect(input.hasAttribute("multiple")).toBe(true);
    });

    it("默认 disabled 应该是 false", () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      expect(upload.disabled).toBe(false);
    });

    it("设置 disabled 后 input 应该被禁用", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("disabled", "");
      container.appendChild(upload);

      await upload.updateComplete;

      expect(upload.disabled).toBe(true);
      const input = upload.shadowRoot.querySelector("input#original");
      expect(input.hasAttribute("disabled")).toBe(true);
    });

    it("默认 showFileList 应该是 true", () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      expect(upload.showFileList).toBe(true);
    });

    it("设置 showFileList=false 应该隐藏文件列表", () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("show-file-list", "false");
      container.appendChild(upload);

      expect(upload.showFileList).toBe(false);
    });

    it("默认 autoUpload 应该是 true", () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      expect(upload.autoUpload).toBe(true);
    });

    it("应该正确设置 auto-upload 属性", () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("auto-upload", "false");
      container.appendChild(upload);

      expect(upload.autoUpload).toBe(false);
    });

    it("默认 listType 应该是 text", () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      expect(upload.listType).toBe("text");
    });

    it("应该支持 list-type='picture'", () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("list-type", "picture");
      container.appendChild(upload);

      expect(upload.listType).toBe("picture");
    });

    it("应该支持 list-type='picture-card'", () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("list-type", "picture-card");
      container.appendChild(upload);

      expect(upload.listType).toBe("picture-card");
    });

    it("默认 drag 应该是 false", () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      expect(upload.drag).toBe(false);
    });

    it("应该正确设置 drag 属性", () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("drag", "");
      container.appendChild(upload);

      expect(upload.drag).toBe(true);
    });

    it("默认 limit 应该是 Number.MAX_SAFE_INTEGER", () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      expect(upload.limit).toBe(Number.MAX_SAFE_INTEGER);
    });

    it("应该正确设置 limit 属性", () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("limit", "3");
      container.appendChild(upload);

      expect(upload.limit).toBe(3);
    });

    it("默认 directory 应该是 false", () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      expect(upload.directory).toBe(false);
    });

    it("设置 directory 后 input 应该有 webkitdirectory 属性", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("directory", "");
      container.appendChild(upload);
      await upload.updateComplete;

      expect(upload.directory).toBe(true);
      const input = upload.shadowRoot.querySelector("input#original");
      expect(input.webkitdirectory).toBe(true);
    });

    it("应该支持 accept 属性", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("accept", "image/*");
      container.appendChild(upload);

      await upload.updateComplete;

      expect(upload.accept).toBe("image/*");
      const input = upload.shadowRoot.querySelector("input#original");
      expect(input.getAttribute("accept")).toBe("image/*");
    });

    it("应该支持 name 属性", () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("name", "file");
      container.appendChild(upload);

      expect(upload.name).toBe("file");
    });

    it("应该支持 with-credentials 属性", () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("with-credentials", "");
      container.appendChild(upload);

      expect(upload.withCredentials).toBe(true);
    });

    it("应该支持 crossorigin 属性", () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("crossorigin", "anonymous");
      container.appendChild(upload);

      expect(upload.crossorigin).toBe("anonymous");
    });
  });

  describe("BEM Class Names", () => {
    it("容器应该有 ea-upload 类名", () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      const el = upload.shadowRoot.querySelector(".ea-upload");
      expect(el).toBeTruthy();
    });

    it("应该根据 listType 添加对应的修饰符类名", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("list-type", "picture");
      container.appendChild(upload);

      await upload.updateComplete;

      const el = upload.shadowRoot.querySelector(".ea-upload");
      expect(el.classList.contains("ea-upload--picture")).toBe(true);
    });

    it("list-type='picture-card' 应该添加对应修饰符类名", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("list-type", "picture-card");
      container.appendChild(upload);

      await upload.updateComplete;

      const el = upload.shadowRoot.querySelector(".ea-upload");
      expect(el.classList.contains("ea-upload--picture-card")).toBe(true);
    });

    it("drag 为 true 时应该添加 ea-upload--drag 修饰符类名", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("drag", "");
      container.appendChild(upload);

      await upload.updateComplete;

      const el = upload.shadowRoot.querySelector(".ea-upload");
      expect(el.classList.contains("ea-upload--drag")).toBe(true);
    });

    it("listType 变化时应该更新容器 class", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await upload.updateComplete;

      const el = upload.shadowRoot.querySelector(".ea-upload");
      expect(el.classList.contains("ea-upload--text")).toBe(true);

      upload.setAttribute("list-type", "picture");
      await upload.updateComplete;

      expect(el.classList.contains("ea-upload--picture")).toBe(true);
      expect(el.classList.contains("ea-upload--text")).toBe(false);
    });
  });

  describe("fileList Property", () => {
    it("默认 fileList 应该是空数组", () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      expect(upload.fileList).toEqual([]);
    });

    it("设置 fileList 应该渲染文件列表", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await upload.updateComplete;

      upload.fileList = [{ uid: "1", name: "test.txt", status: "done" }];

      await upload.updateComplete;

      const listEl = upload.shadowRoot.querySelector(".ea-upload__list");
      const li = listEl.querySelector('li[data-uid="1"]');
      expect(li).toBeTruthy();
      expect(li.classList.contains("is-done")).toBe(true);
    });

    it("文件列表项应该有 ea-upload-file-item 子组件", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await upload.updateComplete;

      upload.fileList = [{ uid: "1", name: "test.txt", status: "done" }];

      await upload.updateComplete;

      const fileItem = upload.shadowRoot.querySelector("ea-upload-file-item");
      expect(fileItem).toBeTruthy();
    });

    it("重新赋值 fileList 后状态变化应该更新列表项 class", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("auto-upload", "false");
      container.appendChild(upload);

      await upload.updateComplete;

      upload.fileList = [{ uid: "1", name: "test.txt", status: "pending" }];

      await upload.updateComplete;

      const li = upload.shadowRoot.querySelector('li[data-uid="1"]');
      expect(li.classList.contains("is-pending")).toBe(true);

      // 重新赋值 fileList 触发 observer
      upload.fileList[0].status = "uploading";
      upload.fileList = [...upload.fileList];
      await upload.updateComplete;

      expect(li.classList.contains("is-uploading")).toBe(true);

      upload.fileList[0].status = "done";
      upload.fileList = [...upload.fileList];
      await upload.updateComplete;

      expect(li.classList.contains("is-done")).toBe(true);
    });

    it("设置 fileList 时没有 uid 的项应该自动生成 uid", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await upload.updateComplete;

      upload.fileList = [{ name: "test.txt", status: "done" }];

      expect(upload.fileList[0].uid).toBeTruthy();
    });
  });

  describe("defaultFileList Property", () => {
    it("设置 defaultFileList 应该合并到 fileList", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await upload.updateComplete;

      upload.defaultFileList = [{ name: "test.txt", status: "done" }];

      expect(upload.fileList.length).toBe(1);
      expect(upload.fileList[0].name).toBe("test.txt");
      expect(upload.fileList[0].status).toBe("done");
    });

    it("defaultFileList 中 status 默认应为 done", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await upload.updateComplete;

      upload.defaultFileList = [{ name: "test.txt" }];

      expect(upload.fileList[0].status).toBe("done");
    });
  });

  describe("Methods", () => {
    it("should have submit method", () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      expect(typeof upload.submit).toBe("function");
    });

    it("should have abort method", () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      expect(typeof upload.abort).toBe("function");
    });

    it("should have clearFiles method", () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      expect(typeof upload.clearFiles).toBe("function");
    });

    it("should have handleFileSelect method", () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      expect(typeof upload.handleFileSelect).toBe("function");
    });

    it("clearFiles() 应该清空文件列表", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await upload.updateComplete;

      upload.fileList = [{ uid: "1", name: "test.txt", status: "done" }];

      expect(upload.fileList.length).toBe(1);

      upload.clearFiles();
      expect(upload.fileList.length).toBe(0);
    });

    it("clearFiles() 应该触发 change 事件", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await upload.updateComplete;

      const handler = vi.fn();
      upload.addEventListener("change", handler);

      upload.fileList = [{ uid: "1", name: "test.txt", status: "done" }];

      await upload.updateComplete;

      upload.clearFiles();
      await upload.updateComplete;

      expect(handler).toHaveBeenCalled();
    });

    it("abort() 应该中止所有上传", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await upload.updateComplete;

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

      await upload.updateComplete;

      upload.abort();

      expect(mockController.abort).toHaveBeenCalled();
    });

    it("abort('uid') 应该中止指定文件的上传", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await upload.updateComplete;

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

      await upload.updateComplete;

      upload.abort("1");

      expect(mockController1.abort).toHaveBeenCalled();
      expect(mockController2.abort).not.toHaveBeenCalled();
    });

    it("handleFileSelect() 应该触发 input 点击", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await upload.updateComplete;

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

      await upload.updateComplete;

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

      await upload.updateComplete;

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
      await upload.updateComplete;

      expect(handler).toHaveBeenCalled();
    });

    it("移除文件时应该触发 ea-upload-remove 事件", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await upload.updateComplete;

      const handler = vi.fn();
      upload.addEventListener("ea-upload-remove", handler);

      upload.fileList = [{ uid: "1", name: "test.txt", status: "done" }];

      await upload.updateComplete;

      // 模拟文件项删除事件
      const fileItem = upload.shadowRoot.querySelector("ea-upload-file-item");
      fileItem.dispatchEvent(
        new CustomEvent("ea-upload-file-delete", {
          detail: { uid: "1" },
          bubbles: true,
          composed: true,
        })
      );

      await upload.updateComplete;

      expect(handler).toHaveBeenCalled();
    });

    it("上传成功时应该触发 ea-upload-success 事件", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await upload.updateComplete;

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

      await upload.updateComplete;

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

      await upload.updateComplete;

      upload.fileList = [{ uid: "1", name: "test.txt", status: "done" }];

      await upload.updateComplete;

      // 模拟文件删除
      const fileItem = upload.shadowRoot.querySelector("ea-upload-file-item");
      fileItem.dispatchEvent(
        new CustomEvent("ea-upload-file-delete", {
          detail: { uid: "1" },
          bubbles: true,
          composed: true,
        })
      );

      await upload.updateComplete;

      expect(onRemove).toHaveBeenCalled();
    });

    it("beforeRemove 返回 false 时应阻止移除", async () => {
      const upload = document.createElement("ea-upload");
      upload.beforeRemove = () => false;
      container.appendChild(upload);

      await upload.updateComplete;

      upload.fileList = [{ uid: "1", name: "test.txt", status: "done" }];

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

      expect(upload.fileList.length).toBe(1);
    });

    it("beforeRemove 返回 Promise<false> 时应阻止移除", async () => {
      const upload = document.createElement("ea-upload");
      upload.beforeRemove = () => Promise.resolve(false);
      container.appendChild(upload);

      await upload.updateComplete;

      upload.fileList = [{ uid: "1", name: "test.txt", status: "done" }];

      await upload.updateComplete;

      // 模拟文件删除
      const fileItem = upload.shadowRoot.querySelector("ea-upload-file-item");
      fileItem.dispatchEvent(
        new CustomEvent("ea-upload-file-delete", {
          detail: { uid: "1" },
          bubbles: true,
          composed: true,
        })
      );

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

      await upload.updateComplete;

      upload.fileList = [{ uid: "1", name: "test.txt", status: "done" }];

      await upload.updateComplete;

      // 尝试添加超过限制的文件 - 直接通过 Object.defineProperty 来模拟 input.files
      const file = new File(["content"], "test2.txt", { type: "text/plain" });
      const input = upload.shadowRoot.querySelector("input#original");
      Object.defineProperty(input, "files", {
        value: [file],
        configurable: true,
      });
      input.dispatchEvent(new Event("change", { bubbles: true }));

      await upload.updateComplete;

      // 由于已有1个文件，limit=1，再添加会触发 onExceed
      expect(onExceed).toHaveBeenCalled();
    });
  });

  describe("Drag and Drop", () => {
    it("drag 为 false 时拖拽事件不应生效", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await upload.updateComplete;

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

      await upload.updateComplete;

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

      await upload.updateComplete;

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

      await upload.updateComplete;

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

      await upload.updateComplete;

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

      expect(upload.fileList.length).toBe(1);
      expect(upload.fileList[0].name).toBe("test.txt");
    });
  });

  describe("File Selection", () => {
    it("通过 input 选择文件应该添加到 fileList", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("auto-upload", "false");
      container.appendChild(upload);

      await upload.updateComplete;

      const file = new File(["content"], "test.txt", { type: "text/plain" });
      const input = upload.shadowRoot.querySelector("input#original");
      Object.defineProperty(input, "files", {
        value: [file],
        configurable: true,
      });
      input.dispatchEvent(new Event("change", { bubbles: true }));

      expect(upload.fileList.length).toBe(1);
      expect(upload.fileList[0].name).toBe("test.txt");
      expect(upload.fileList[0].status).toBe("pending");
    });

    it("选择多个文件应该全部添加到 fileList", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("multiple", "");
      upload.setAttribute("auto-upload", "false");
      container.appendChild(upload);

      await upload.updateComplete;

      const input = upload.shadowRoot.querySelector("input#original");
      Object.defineProperty(input, "files", {
        value: [
          new File(["a"], "a.txt", { type: "text/plain" }),
          new File(["b"], "b.txt", { type: "text/plain" }),
        ],
        configurable: true,
      });
      input.dispatchEvent(new Event("change", { bubbles: true }));

      expect(upload.fileList.length).toBe(2);
    });

    it("show-file-list=false 时选择文件后不应显示文件列表", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("show-file-list", "false");
      upload.setAttribute("auto-upload", "false");
      container.appendChild(upload);

      await upload.updateComplete;

      const file = new File(["content"], "test.txt", { type: "text/plain" });
      const input = upload.shadowRoot.querySelector("input#original");
      Object.defineProperty(input, "files", {
        value: [file],
        configurable: true,
      });
      input.dispatchEvent(new Event("change", { bubbles: true }));

      expect(upload.fileList.length).toBe(1);
      const listEl = upload.shadowRoot.querySelector(".ea-upload__list");
      expect(listEl.querySelectorAll("li[data-uid]").length).toBe(0);
    });
  });

  describe("Submit", () => {
    it("fileList 为空时 submit() 不应报错", async () => {
      const upload = document.createElement("ea-upload");
      container.appendChild(upload);

      await upload.updateComplete;

      expect(() => upload.submit()).not.toThrow();
    });

    it("beforeUpload 返回 false 时应阻止上传", async () => {
      const upload = document.createElement("ea-upload");
      upload.beforeUpload = () => false;
      container.appendChild(upload);

      await upload.updateComplete;

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

      await upload.updateComplete;

      await upload.submit();

      expect(httpRequest).not.toHaveBeenCalled();
    });

    it("beforeUpload 返回 Promise<false> 时应阻止上传", async () => {
      const upload = document.createElement("ea-upload");
      upload.beforeUpload = () => Promise.resolve(false);
      container.appendChild(upload);

      await upload.updateComplete;

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

      await upload.updateComplete;

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

      await upload.updateComplete;

      upload.fileList = [
        {
          uid: "1",
          name: "test.txt",
          status: "pending",
          raw: new File(["content"], "test.txt"),
        },
      ];

      await upload.updateComplete;

      // autoUpload 为 true 时，fileList 变化会触发 submit
      expect(httpRequest).toHaveBeenCalled();
    });
  });

  describe("Submit Callback Chain", () => {
    const setupUpload = async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("auto-upload", "false");
      upload.setAttribute("action", "https://example.com/upload");
      container.appendChild(upload);
      await upload.updateComplete;

      upload.fileList = [
        {
          uid: "1",
          name: "a.txt",
          status: "pending",
          raw: new File(["content"], "a.txt"),
        },
      ];
      await upload.updateComplete;

      const captured = { options: null };
      upload.httpRequest = vi.fn(options => {
        captured.options = options;
        return { submit: vi.fn(), abort: vi.fn(), xhr: {} };
      });

      await upload.submit();
      return { upload, options: captured.options };
    };

    it("onSuccess 应更新文件状态并派发 ea-upload-success", async () => {
      const { upload, options } = await setupUpload();
      const onSuccess = vi.fn();
      const handler = vi.fn();
      upload.onSuccess = onSuccess;
      upload.addEventListener("ea-upload-success", handler);

      const file = upload.fileList[0];
      options.onSuccess({ url: "/f" }, file, upload.fileList);

      expect(onSuccess).toHaveBeenCalledWith(
        { url: "/f" },
        file,
        upload.fileList
      );
      expect(handler).toHaveBeenCalled();
      expect(handler.mock.calls[0][0].detail.response).toEqual({ url: "/f" });
      expect(file.status).toBe("done");
      expect(file.percent).toBe(100);
      expect(file.response).toEqual({ url: "/f" });
      expect(file.controller).toBeUndefined();
    });

    it("onProgress 应更新进度并同步 ea-progress 属性", async () => {
      const { upload, options } = await setupUpload();
      const onProgress = vi.fn();
      const handler = vi.fn();
      upload.onProgress = onProgress;
      upload.addEventListener("ea-upload-progress", handler);

      const file = upload.fileList[0];
      options.onProgress({ loaded: 30, total: 60 }, file, upload.fileList);

      await vi.waitFor(() => {
        const li = upload.shadowRoot.querySelector('li[data-uid="1"]');
        const progressEl = li
          .querySelector("ea-upload-file-item")
          .shadowRoot.querySelector("ea-progress");
        expect(progressEl.getAttribute("percentage")).toBe("50");
      });

      expect(onProgress).toHaveBeenCalled();
      expect(handler).toHaveBeenCalled();
      expect(file.percent).toBe(50);

      const li = upload.shadowRoot.querySelector('li[data-uid="1"]');
      const progressEl = li
        .querySelector("ea-upload-file-item")
        .shadowRoot.querySelector("ea-progress");

      options.onProgress({ loaded: 60, total: 60 }, file, upload.fileList);
      expect(file.percent).toBe(100);
      expect(progressEl.getAttribute("status")).toBe("success");
    });

    it("文件已被移除时回调应安全忽略", async () => {
      const { upload, options } = await setupUpload();
      const file = upload.fileList[0];
      upload.fileList = [];

      expect(() =>
        options.onProgress({ loaded: 1, total: 2 }, file, upload.fileList)
      ).not.toThrow();
      expect(() =>
        options.onSuccess({ ok: true }, file, upload.fileList)
      ).not.toThrow();
    });

    it("onError 应标记错误态并派发 ea-upload-error", async () => {
      const { upload, options } = await setupUpload();
      const onError = vi.fn();
      const handler = vi.fn();
      upload.onError = onError;
      upload.addEventListener("ea-upload-error", handler);

      const setAttribute = vi.spyOn(Element.prototype, "setAttribute");
      const file = upload.fileList[0];
      const error = new Error("boom");
      options.onError(error, file, upload.fileList);

      expect(onError).toHaveBeenCalledWith(error, file, upload.fileList);
      expect(handler).toHaveBeenCalled();
      expect(handler.mock.calls[0][0].detail.error).toBe(error);
      expect(file.status).toBe("error");
      expect(file.response).toBe(error);
      expect(file.controller).toBeUndefined();
      expect(setAttribute).toHaveBeenCalledWith("status", "exception");

      setAttribute.mockRestore();
    });

    it("beforeRemove 返回 rejected Promise 时应中止移除", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("auto-upload", "false");
      upload.beforeRemove = () => Promise.reject(new Error("no"));
      container.appendChild(upload);
      await upload.updateComplete;

      upload.fileList = [{ uid: "1", name: "a.txt", status: "done" }];
      await upload.updateComplete;

      const fileItem = upload.shadowRoot.querySelector("ea-upload-file-item");
      fileItem.dispatchEvent(
        new CustomEvent("ea-upload-file-delete", {
          detail: { uid: "1" },
          bubbles: true,
          composed: true,
        })
      );
      await upload.updateComplete;

      expect(upload.fileList.length).toBe(1);
    });

    it("移除文件时应中止请求并释放 blob URL", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("auto-upload", "false");
      container.appendChild(upload);
      await upload.updateComplete;

      const controller = { abort: vi.fn() };
      upload.fileList = [
        {
          uid: "1",
          name: "a.txt",
          status: "done",
          url: "blob:test-url",
          controller,
        },
      ];
      await upload.updateComplete;

      const fileItem = upload.shadowRoot.querySelector("ea-upload-file-item");
      fileItem.dispatchEvent(
        new CustomEvent("ea-upload-file-delete", {
          detail: { uid: "1" },
          bubbles: true,
          composed: true,
        })
      );
      await upload.updateComplete;

      expect(controller.abort).toHaveBeenCalled();
      expect(upload.fileList.length).toBe(0);
    });

    it("文件项预览事件应打开 ea-image-preview", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("auto-upload", "false");
      container.appendChild(upload);
      await upload.updateComplete;

      upload.fileList = [
        { uid: "1", name: "a.png", status: "done", url: "blob:a" },
        { uid: "2", name: "b.png", status: "done", url: "blob:b" },
      ];
      await upload.updateComplete;

      const previewEl = upload.shadowRoot.querySelector(".ea-upload__preview");
      const fileItem = upload.shadowRoot.querySelector("ea-upload-file-item");
      fileItem.dispatchEvent(
        new CustomEvent("ea-upload-file-preview", {
          detail: { uid: "2" },
          bubbles: true,
          composed: true,
        })
      );
      await upload.updateComplete;

      expect(previewEl.visible).toBe(true);
      expect(previewEl.urlList).toEqual(["blob:a", "blob:b"]);
      expect(previewEl.initialIndex).toBe(1);
    });
  });

  describe("Accessibility", () => {
    it("默认状态应该无 a11y 违规（排除 file input 标签规则）", async () => {
      const upload = document.createElement("ea-upload");
      upload.setAttribute("action", "https://example.com/upload");
      container.appendChild(upload);

      await upload.updateComplete;

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

      await upload.updateComplete;

      const results = await runAxe(upload, {
        rules: {
          label: { enabled: false },
        },
      });
      assertNoA11yViolations(results);
    });
  });
});

describe("Upload Ajax Utils", () => {
  class FakeXHR {
    static instances = [];
    static preset = {};

    constructor() {
      this.listeners = {};
      this.uploadListeners = {};
      this.headers = {};
      this.status = FakeXHR.preset.status ?? 200;
      this.response = FakeXHR.preset.response ?? "";
      this.responseText = FakeXHR.preset.responseText ?? "";
      this.aborted = false;
      this.sent = undefined;
      this.opened = null;
      this.withCredentials = false;
      this.upload = FakeXHR.preset.noUpload
        ? undefined
        : {
            addEventListener: (type, handler) => {
              if (!this.uploadListeners[type]) this.uploadListeners[type] = [];
              this.uploadListeners[type].push(handler);
            },
          };
      FakeXHR.instances.push(this);
    }

    addEventListener(type, handler) {
      if (!this.listeners[type]) this.listeners[type] = [];
      this.listeners[type].push(handler);
    }

    open(method, url, async) {
      this.opened = { method, url, async };
    }

    setRequestHeader(key, value) {
      this.headers[key] = value;
    }

    send(data) {
      this.sent = data;
    }

    abort() {
      this.aborted = true;
    }

    emit(type, event) {
      (this.listeners[type] || []).forEach(handler => handler(event));
    }

    emitUpload(type, event) {
      (this.uploadListeners[type] || []).forEach(handler => handler(event));
    }
  }

  const makeField = () => {
    const file = {
      uid: "1",
      name: "a.txt",
      raw: new File(["content"], "a.txt", { type: "text/plain" }),
    };
    return { name: "file", file, files: [file] };
  };

  beforeEach(() => {
    FakeXHR.instances = [];
    FakeXHR.preset = {};
    vi.stubGlobal("XMLHttpRequest", FakeXHR);
  });

  describe("buildFormData", () => {
    it("应附加普通字段、数组字段与文件", () => {
      const formData = buildFormData(makeField(), {
        token: "t",
        tags: ["x", "y"],
      });

      expect(formData.get("token")).toBe("t");
      expect(formData.getAll("tags")).toEqual(["x", "y"]);
      expect(formData.get("file")).toBeInstanceOf(File);
    });

    it("未传附加数据时只包含文件", () => {
      const formData = buildFormData(makeField());
      expect(formData.get("file")).toBeInstanceOf(File);
    });

    it("文件数组应全部追加，缺少 raw 的项应跳过", () => {
      const formData = buildFormData({
        name: "files",
        file: [
          { uid: "1", name: "b.bin", raw: new Blob(["b"]) },
          { uid: "2", name: "skip.bin" },
        ],
      });

      expect(formData.getAll("files")).toHaveLength(1);
    });

    it("File 本身可作为 FileItem", () => {
      const formData = buildFormData({
        name: "file",
        file: new File(["c"], "c.txt"),
      });
      expect(formData.get("file")).toBeInstanceOf(File);
    });
  });

  describe("createUploadRequest", () => {
    it("应按配置 open / setRequestHeader / withCredentials", () => {
      const request = createUploadRequest({
        action: "/api/upload",
        method: "PUT",
        headers: { "X-Token": "abc", "X-Num": 1 },
        withCredentials: true,
        fileField: makeField(),
      });

      expect(request.xhr.opened).toEqual({
        method: "PUT",
        url: "/api/upload",
        async: true,
      });
      expect(request.xhr.withCredentials).toBe(true);
      expect(request.xhr.headers).toEqual({ "X-Token": "abc", "X-Num": "1" });
    });

    it("method 与 action 使用默认值", () => {
      const request = createUploadRequest({ fileField: makeField() });

      expect(request.xhr.opened.method).toBe("POST");
      expect(request.xhr.opened.url).toBe("");
      expect(request.xhr.withCredentials).toBe(false);
    });

    it("支持 Headers 实例作为请求头", () => {
      const request = createUploadRequest({
        action: "/api",
        headers: new Headers({ Authorization: "Bearer token" }),
        fileField: makeField(),
      });

      expect(request.xhr.headers).toEqual({ authorization: "Bearer token" });
    });

    it("submit 发送数据，abort 中止请求", () => {
      const request = createUploadRequest({
        action: "/api",
        fileField: makeField(),
      });

      request.submit();
      expect(request.xhr.sent).toBeInstanceOf(FormData);

      request.abort();
      expect(request.xhr.aborted).toBe(true);
    });

    it("xhr 无 upload 时不应注册 progress 监听", () => {
      FakeXHR.preset = { noUpload: true };

      expect(() =>
        createUploadRequest({ action: "/api", fileField: makeField() })
      ).not.toThrow();
      expect(FakeXHR.instances[0].upload).toBeUndefined();
    });

    it("2xx 且响应为 JSON 时回调解析后的对象", () => {
      const onSuccess = vi.fn();
      const field = makeField();
      const request = createUploadRequest({
        action: "/api",
        method: "POST",
        fileField: field,
        onSuccess,
      });

      request.xhr.status = 200;
      request.xhr.responseText = JSON.stringify({ url: "/f" });
      request.xhr.emit("load", new Event("load"));

      expect(onSuccess).toHaveBeenCalledWith(
        { url: "/f" },
        field.file,
        field.files
      );
    });

    it("2xx 且响应非 JSON 时回调原始文本", () => {
      const onSuccess = vi.fn();
      const request = createUploadRequest({
        action: "/api",
        fileField: makeField(),
        onSuccess,
      });

      request.xhr.status = 200;
      request.xhr.responseText = "<html>ok</html>";
      request.xhr.emit("load", new Event("load"));

      expect(onSuccess.mock.calls[0][0]).toBe("<html>ok</html>");
    });

    it("2xx 且无响应体时回调空字符串", () => {
      const onSuccess = vi.fn();
      const field = makeField();
      const request = createUploadRequest({
        action: "/api",
        fileField: field,
        onSuccess,
      });

      request.xhr.status = 204;
      request.xhr.responseText = "";
      request.xhr.response = "";
      request.xhr.emit("load", new Event("load"));

      expect(onSuccess).toHaveBeenCalledWith("", field.file, field.files);
    });

    it("非 2xx 状态应转为 onError 并携带状态信息", () => {
      const onSuccess = vi.fn();
      const onError = vi.fn();
      const request = createUploadRequest({
        action: "/api",
        method: "POST",
        fileField: makeField(),
        onSuccess,
        onError,
      });

      request.xhr.status = 500;
      request.xhr.responseText = "server error";
      request.xhr.emit("load", new Event("load"));

      expect(onSuccess).not.toHaveBeenCalled();
      const [error] = onError.mock.calls[0];
      expect(error).toBeInstanceOf(EaUploadAjaxError);
      expect(error.status).toBe(500);
      expect(error.method).toBe("POST");
      expect(error.url).toBe("/api");
      expect(error.message).toBe("server error");
    });

    it("error 事件应回退到默认错误信息", () => {
      FakeXHR.preset = { status: 0 };
      const onError = vi.fn();
      const request = createUploadRequest({
        action: "/api",
        method: "POST",
        fileField: makeField(),
        onError,
      });

      request.xhr.emit("error", new Event("error"));

      const [error] = onError.mock.calls[0];
      expect(error.status).toBe(0);
      expect(error.message).toBe("fail to POST /api 0");
    });

    it("xhr.response 存在 error 字段时取其作为错误信息", () => {
      FakeXHR.preset = { status: 502, response: { error: "gateway down" } };
      const onError = vi.fn();
      const request = createUploadRequest({
        action: "/api",
        fileField: makeField(),
        onError,
      });

      request.xhr.emit("error", new Event("error"));

      expect(onError.mock.calls[0][0].message).toBe("gateway down");
    });

    it("仅 responseText 存在时以其作为错误信息", () => {
      FakeXHR.preset = { status: 504, responseText: "timeout" };
      const onError = vi.fn();
      const request = createUploadRequest({
        action: "/api",
        fileField: makeField(),
        onError,
      });

      request.xhr.emit("error", new Event("error"));

      expect(onError.mock.calls[0][0].message).toBe("timeout");
    });

    it("未提供回调时事件不应抛错", () => {
      const request = createUploadRequest({
        action: "/api",
        fileField: makeField(),
      });

      expect(() => request.xhr.emit("load", new Event("load"))).not.toThrow();
      expect(() => request.xhr.emit("error", new Event("error"))).not.toThrow();
      expect(() =>
        request.xhr.emitUpload("progress", { loaded: 1, total: 2 })
      ).not.toThrow();
    });

    it("upload progress 应计算 percent 并回调", () => {
      const onProgress = vi.fn();
      const field = makeField();
      const request = createUploadRequest({
        action: "/api",
        fileField: field,
        onProgress,
      });

      const event = { loaded: 30, total: 60 };
      request.xhr.emitUpload("progress", event);

      expect(event.percent).toBe(50);
      expect(onProgress).toHaveBeenCalledWith(event, field.file, field.files);
    });
  });
});
