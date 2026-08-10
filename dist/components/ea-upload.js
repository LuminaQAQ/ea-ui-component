import { a as R } from "../core/EaFormAssociatedBase.ts.js";
import { E as D } from "../core/EaBase.ts.js";
import { q as y, l as g, C as w, p as f, a as u } from "../core/decorator.js";
import { E as C } from "../utils/Enum.ts.js";
import { s as O, a as I } from "../css/ea-upload.style.js";
import "./ea-button.js";
import "./ea-image-preview.js";
import { h as q } from "../utils/html.ts.js";
import B from "./ea-progress.js";
import { c as P } from "../utils/bem.ts.js";
class j extends Error {
  constructor(t, i, r, s) {
    super(t), this.name = "EaUploadAjaxError", this.status = i, this.method = r, this.url = s;
  }
}
class N extends Event {
  constructor(t) {
    super("ea-upload-error", { bubbles: !0, composed: !0 }), this.detail = t;
  }
}
const U = (e, t, i) => {
  let r;
  return e.response ? r = `${e.response.error || e.response}` : e.responseText ? r = `${e.responseText}` : r = `fail to ${t.method} ${t.action} ${e.status}`, (s) => {
    if (!i) return;
    const { fileField: o } = t;
    i(
      new j(r, e.status, t.method, t.action),
      o.file,
      o.files
    );
  };
}, M = (e, t, i) => (r) => {
  if (e.status < 200 || e.status >= 300)
    return U(e, t, t.onError)(r);
  let s = e.responseText || e.response;
  if (s)
    try {
      s = JSON.parse(s);
    } catch {
    }
  if (!i) return;
  const { fileField: o } = t;
  i(s, o.file, o.files);
}, H = (e, t, i) => (r) => {
  if (!i) return;
  const s = r;
  s.percent = s.loaded / s.total * 100;
  const { fileField: o } = t;
  i(s, o.file, o.files);
}, G = (e, t) => {
  const i = new FormData();
  for (const [a, d] of Object.entries(t || {}))
    if (Array.isArray(d))
      for (const h of d)
        i.append(a, h);
    else
      i.append(a, d);
  const { name: r, file: s } = e, o = (a) => {
    const d = a.raw ?? (a instanceof Blob ? a : void 0);
    d && i.append(r, d, a.name);
  };
  if (Array.isArray(s))
    for (const a of s)
      o(a);
  else
    o(s);
  return i;
}, T = (e) => {
  const t = new AbortController(), i = new XMLHttpRequest(), {
    method: r = "POST",
    action: s = "",
    fileField: o,
    data: a,
    headers: d = {},
    withCredentials: h = !1
  } = e, { onSuccess: m, onError: _, onProgress: E } = e, A = G(o, a);
  if (i.addEventListener("load", M(i, e, m), {
    signal: t.signal
  }), i.addEventListener("error", U(i, e, _), {
    signal: t.signal
  }), i.upload && i.upload.addEventListener(
    "progress",
    H(i, e, E),
    {
      signal: t.signal
    }
  ), i.open(r, s, !0), i.withCredentials = h, d instanceof Headers)
    d.forEach(($, F) => {
      i.setRequestHeader(F, $);
    });
  else
    for (const [$, F] of Object.entries(d))
      i.setRequestHeader($, String(F));
  return {
    xhr: i,
    submit: () => {
      i.send(A);
    },
    abort: () => {
      i.abort(), t.abort();
    }
  };
};
let k = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", L = (e = 21) => {
  let t = "", i = crypto.getRandomValues(new Uint8Array(e |= 0));
  for (; e--; )
    t += k[i[e] & 63];
  return t;
};
class W extends Event {
  constructor(t) {
    super("ea-upload-progress", { bubbles: !0, composed: !0 }), this.detail = t;
  }
}
class X extends Event {
  constructor(t) {
    super("ea-upload-remove", { bubbles: !0, composed: !0 }), this.detail = t;
  }
}
class J extends Event {
  constructor(t) {
    super("change", { bubbles: !0, composed: !0 }), this.detail = t;
  }
}
class V extends Event {
  constructor(t) {
    super("ea-upload-success", { bubbles: !0, composed: !0 }), this.detail = t;
  }
}
var K = Object.defineProperty, Q = Object.getOwnPropertyDescriptor, b = (e, t, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Q(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (s = (r ? a(t, i, s) : a(s)) || s);
  return r && s && K(t, i, s), s;
};
const S = "ea-upload-file-item", c = P(S);
let v = class extends D {
  constructor() {
    super(...arguments), this.item = null, this.listType = "text";
  }
  /**
   * 更新容器类名
   */
  updateContainerClasslist() {
    var t;
    const e = c(
      { [this.listType]: !0 },
      (t = this.item) != null && t.status ? { [this.item.status]: !0 } : {}
    );
    return this._container.className = e, e;
  }
  $mount() {
    this._handleThumbUrl(), this.updateContainerClasslist(), this._bindThumbEvents();
  }
  $beforeUnmount() {
    var e;
    (e = this.item) != null && e.url && this.item.url.startsWith("blob:") && URL.revokeObjectURL(this.item.url);
  }
  /**
   * 重新渲染文件项
   */
  render() {
    !this.item || !this._container || (this._handleThumbUrl(), this._container.innerHTML = q(this._getBodyTemplate()), this.updateContainerClasslist(), this._bindThumbEvents());
  }
  /**
   * 绑定缩略图加载事件, 图片加载完成后显示原生 img, 否则保持占位图标
   */
  _bindThumbEvents() {
    this._container && this._container.querySelectorAll(`.${c.e("thumb-img")}`).forEach((e) => {
      var r, s;
      const t = e.closest(`.${c.e("thumb")}`);
      if (!t) return;
      const i = ((r = this.item) == null ? void 0 : r.thumbUrl) || ((s = this.item) == null ? void 0 : s.url) || "";
      !e.hasAttribute("src") && i && (e.src = i), e.hasAttribute("src") && (e.onload = () => t.classList.add(c.s("loaded")), e.onerror = () => t.classList.remove(c.s("loaded")), e.complete && (e.naturalWidth > 0 ? t.classList.add(c.s("loaded")) : t.classList.remove(c.s("loaded"))));
    });
  }
  /**
   * 处理缩略图 URL
   */
  _handleThumbUrl() {
    const e = this.item;
    if (!e) return;
    const t = e.raw ?? (e instanceof Blob ? e : void 0);
    e.status === "done" && !e.thumbUrl && !e.url && t && (e.url = URL.createObjectURL(t));
  }
  _handleClick(e) {
    const t = e.composedPath();
    if (t.find(
      (s) => s instanceof Element && s.getAttribute("data-action") === "remove"
    )) {
      e.stopPropagation(), this._emitDelete();
      return;
    }
    t.find(
      (s) => s instanceof Element && s.getAttribute("data-action") === "preview"
    ) && (e.stopPropagation(), this._emitPreview());
  }
  _handleProgressElChange(e) {
    (e.target instanceof B || e.target.tagName === "EA-PROGRESS") && (e.stopImmediatePropagation(), e.preventDefault());
  }
  /**
   * 删除
   */
  _emitDelete() {
    var e;
    (e = this.item) != null && e.uid && this.dispatchEvent(
      new CustomEvent("ea-upload-file-delete", {
        detail: { uid: this.item.uid },
        bubbles: !0,
        composed: !0
      })
    );
  }
  /**
   * 预览
   */
  _emitPreview() {
    var e;
    (e = this.item) != null && e.uid && this.dispatchEvent(
      new CustomEvent("ea-upload-file-preview", {
        detail: { uid: this.item.uid },
        bubbles: !0,
        composed: !0
      })
    );
  }
  /** @override */
  html() {
    return `
    <div class="${c()}">
      ${this.item ? this._getBodyTemplate() : ""}
    </div>`;
  }
  /**
   * 生成文件项内容模板
   */
  _getBodyTemplate() {
    const e = this.item, t = this.listType === "picture" || this.listType === "picture-card", i = e.status === "error" && typeof e.response == "string" ? `<span class="${c.e("response")}" part="file-response">${e.response}</span>` : "", r = (a = "64px") => t ? `<ea-progress class="${c.e("progress")}" part="file-progress" variant="circle" size="${a}" show-text="false" percentage="${e.percent || 0}"></ea-progress>` : `<ea-progress class="${c.e("progress")}" part="file-progress" variant="line" show-text="false" stroke-width="3px" percentage="${e.percent || 0}"></ea-progress>`, s = (a = "40px", d = "40px", h = "30px") => {
      if (e.status === "error")
        return `<ea-icon name="image" class="${c.e("thumb")} ${c.e("thumb-error")}" style="width:${a};height:${d}"></ea-icon>`;
      const m = e.thumbUrl || e.url || "", _ = e.status === "done" ? m : "", E = e.crossOrigin ? ` crossorigin="${e.crossOrigin}"` : "";
      return `
        <div class="${c.e("thumb")}" part="file-thumb" style="width:${a};height:${d}">
          <img class="${c.e("thumb-img")}" src="${_}" alt="${e.name}"${E} />
          <ea-icon name="image" class="${c.e("thumb-placeholder")}"></ea-icon>
          ${r(h)}
        </div>
      `;
    };
    return {
      text: () => {
        const a = e.status === "uploading", d = a ? "spinner" : "paperclip", h = a ? " spin" : "";
        return `
          <ea-icon name="${d}" class="${c.e("icon")}" part="file-icon"${h}></ea-icon>
          <div class="${c.e("file-info")}" part="file-info">
            <div class="${c.e("file-info-main")}" part="file-info-main">
              <span class="${c.e("filename")}" part="file-name">${e.name}</span>
              <div class="${c.e("file-info-actions")}" part="file-info-actions">
                ${i}
                <ea-icon name="xmark" class="${c.e("icon")} ${c.e("delete")}" data-action="remove" part="file-delete"></ea-icon>
              </div>
            </div>
            ${r()}
          </div>
        `;
      },
      picture: () => {
        const a = e.status === "uploading", d = e.status === "error";
        return `
          <div class="${c.e("file-main")}">
            <div class="${c.e("file-info")}" part="file-info">
              ${s("70px", "70px", "40px")}
              <span class="${c.e("filename")}" part="file-name">${e.name}</span>
              ${d ? i : ""}
            </div>
            ${a ? "" : `<ea-icon name="xmark" class="${c.e("delete")}" data-action="remove" part="file-delete"></ea-icon>`}
          </div>
        `;
      },
      "picture-card": () => {
        const a = e.status === "uploading", d = e.status === "error", h = a ? "" : `
          <div class="${c.e("toolbar")}" part="file-toolbar">
            <div class="${c.e("tool-actions")}">
              ${d ? "" : `<ea-icon name="magnifying-glass" class="${c.e("tool")}" data-action="preview" part="file-preview"></ea-icon>`}
              <ea-icon name="trash" class="${c.e("tool")}" data-action="remove" part="file-delete"></ea-icon>
            </div>
            <div class="${c.e("tool-info")}">
              <span class="${c.e("filename")}" part="file-name">${e.name}</span>
              ${i}
            </div>
          </div>
        `;
        return `
          <div class="${c.e("card")}" part="card">
            <div class="${c.e("card-thumb")}" part="card-thumb">
              ${s("100%", "100%", "64px")}
              ${h}
            </div>
          </div>
        `;
      }
    }[this.listType || "text"]();
  }
};
b([
  y(`.${c()}`)
], v.prototype, "_container", 2);
b([
  f({ type: Object, default: null })
], v.prototype, "item", 2);
b([
  u({ type: String, default: "text" })
], v.prototype, "listType", 2);
b([
  g("click")
], v.prototype, "_handleClick", 1);
b([
  g("change", c())
], v.prototype, "_handleProgressElChange", 1);
v = b([
  w(S, { styles: [O] })
], v);
var Y = Object.defineProperty, Z = Object.getOwnPropertyDescriptor, l = (e, t, i, r) => {
  for (var s = r > 1 ? void 0 : r ? Z(t, i) : t, o = e.length - 1, a; o >= 0; o--)
    (a = e[o]) && (s = (r ? a(t, i, s) : a(s)) || s);
  return r && s && Y(t, i, s), s;
};
const x = "ea-upload", p = P(x);
let n = class extends R {
  constructor() {
    super(...arguments), this._dragEnterCount = 0, this.disabled = !1, this.action = "", this.headers = {}, this.method = "POST", this.multiple = !1, this.name = "", this.withCredentials = !1, this.showFileList = !0, this.accept = "", this.crossorigin = "", this.listType = "text", this.autoUpload = !0, this.drag = !1, this.limit = Number.MAX_SAFE_INTEGER, this.directory = !1, this.data = {}, this.fileList = [], this.defaultFileList = [], this.httpRequest = T, this.onError = null, this.onProgress = null, this.onSuccess = null, this.beforeRemove = null, this.onRemove = null, this.onChange = null, this.beforeUpload = null, this.onExceed = null;
  }
  /**
   * 清空所有
   */
  _clearFileList() {
    var e;
    this.abort();
    for (const t of this.fileList)
      (e = t.url) != null && e.startsWith("blob:") && URL.revokeObjectURL(t.url);
    this.fileList = [];
  }
  /**
   * 清空所有
   */
  clearFiles() {
    this._clearFileList(), this._originalInput.value = "", this._renderFileList(), this._dispatchChangeEvent();
  }
  /**
   * 触发文件选择对话框
   */
  handleFileSelect() {
    this.disabled || this._originalInput.click();
  }
  /**
   * 根据 uid 查找文件数据
   * @param uid - 文件唯一标识
   */
  _getFileItem(e) {
    return this.fileList.find((t) => t.uid === e);
  }
  /**
   * 根据 uid 查找文件列表项元素
   * @param uid - 文件唯一标识
   */
  _getFileLi(e) {
    return this._listElement.querySelector(`li[data-uid="${e}"]`);
  }
  /**
   * 获取文件列表项中的进度条元素
   * @param li - 文件列表项元素
   */
  _getProgressEl(e) {
    return e.querySelector("ea-progress");
  }
  /**
   * 提交上传
   */
  async submit() {
    if (this.fileList.length === 0) {
      console.warn("No files to upload.");
      return;
    }
    this._listElement.children.length === 0 && this._renderFileList();
    for (const e of this.fileList) {
      if (e.status !== "pending") continue;
      if (this.beforeUpload) {
        const r = this.beforeUpload(e, this.fileList);
        if ((r instanceof Promise ? await r : r) === !1) continue;
      }
      e.status = "uploading", this._updateFileItem(e.uid);
      const t = {
        name: this.name || "file",
        uid: e.uid,
        file: e,
        files: this.fileList
      }, i = this.httpRequest({
        action: this.action,
        method: this.method,
        headers: this.headers,
        withCredentials: this.withCredentials,
        fileField: t,
        data: this.data,
        onError: (r, s, o) => {
          var d;
          (d = this.onError) == null || d.call(this, r, s, o), this.dispatchEvent(
            new N({ error: r, uploadFile: s, uploadFiles: o })
          );
          const a = this._getFileItem(e.uid);
          if (a) {
            a.status = "error", a.response = r, a.controller = void 0;
            const h = this._getFileLi(e.uid);
            if (h) {
              const m = this._getProgressEl(h);
              m && m.setAttribute("status", "exception");
            }
            this._updateFileItem(e.uid);
          }
        },
        onProgress: (r, s, o) => {
          var d;
          (d = this.onProgress) == null || d.call(this, r, s, o), this.dispatchEvent(
            new W({
              event: r,
              uploadFile: s,
              uploadFiles: o
            })
          );
          const a = this._getFileItem(e.uid);
          if (a) {
            a.percent = r.loaded / r.total * 100;
            const h = this._getFileLi(e.uid);
            if (h) {
              const m = this._getProgressEl(h);
              m && (m.setAttribute("percentage", String(a.percent)), a.percent >= 100 && m.setAttribute("status", "success"));
            }
          }
        },
        onSuccess: (r, s, o) => {
          var d;
          (d = this.onSuccess) == null || d.call(this, r, s, o), this.dispatchEvent(
            new V({
              response: r,
              uploadFile: s,
              uploadFiles: o
            })
          );
          const a = this._getFileItem(e.uid);
          a && (a.status = "done", a.percent = 100, a.response = r, a.controller = void 0, this._updateFileItem(e.uid));
        }
      });
      e.controller = i, i.submit();
    }
  }
  /**
   * 中止上传
   * @param uid 可选，若提供则只中止该文件
   */
  abort(e) {
    if (e) {
      const t = this.fileList.find((i) => i.uid === e);
      t != null && t.controller && (t.controller.abort(), t.controller = void 0, t.status = "pending", this._updateFileItem(e));
    } else {
      for (const t of this.fileList)
        t.controller && (t.controller.abort(), t.controller = void 0, t.status = "pending");
      this._renderFileList();
    }
  }
  /**
   * 移除单个文件
   */
  async _removeFile(e) {
    var s, o;
    const t = this.fileList.findIndex((a) => a.uid === e);
    if (t === -1) return;
    const i = this.fileList[t];
    if (this.beforeRemove) {
      const a = this.beforeRemove(i, this.fileList);
      try {
        if ((a instanceof Promise ? await a : a) === !1) return;
      } catch {
        return;
      }
    }
    i.controller && i.controller.abort(), i.status = "removed", (s = i.url) != null && s.startsWith("blob:") && URL.revokeObjectURL(i.url), this.fileList.splice(t, 1);
    const r = this._listElement.querySelector(`li[data-uid="${e}"]`);
    r && r.remove(), (o = this.onRemove) == null || o.call(this, i, this.fileList), this.dispatchEvent(
      new X({ uploadFile: i, uploadFiles: this.fileList })
    ), this._dispatchChangeEvent(i);
  }
  /**
   * 合并 defaultFileList 到 fileList
   */
  _mergeDefaultFileList() {
    if (this.defaultFileList.length === 0 || this.fileList.length > 0) return;
    const e = this.defaultFileList.map((t) => ({
      uid: t.uid || L(),
      name: t.name,
      status: t.status || "done",
      percent: t.percent,
      url: t.url,
      thumbUrl: t.thumbUrl,
      response: t.response,
      crossOrigin: t.crossOrigin,
      raw: t.raw
    }));
    this.fileList = e;
  }
  /**
   * 渲染文件列表
   */
  _renderFileList() {
    const e = this._listElement;
    if (!this.showFileList) {
      e.querySelectorAll("li[data-uid]").forEach((s) => s.remove());
      return;
    }
    const i = e.querySelector(
      p.ce("trigger")
    ) || null, r = /* @__PURE__ */ new Map();
    e.querySelectorAll("li[data-uid]").forEach((s) => {
      r.set(s.getAttribute("data-uid"), s);
    });
    for (const s of this.fileList) {
      const o = r.get(s.uid);
      if (o) {
        r.delete(s.uid), this._updateFileItemElement(o, s);
        continue;
      }
      const a = document.createElement("li");
      a.className = `${p.e("file-item")} ${p.s(s.status)}`, a.setAttribute("part", "file-item"), a.setAttribute("data-uid", s.uid);
      const d = document.createElement(
        "ea-upload-file-item"
      );
      d.item = s, d.listType = this.listType, a.appendChild(d), i ? e.insertBefore(a, i) : e.appendChild(a);
    }
    r.forEach((s) => s.remove());
  }
  /**
   * 更新单个文件项的 UI 状态
   * @param uid - 文件唯一标识
   */
  _updateFileItem(e) {
    const t = this._listElement.querySelector(`li[data-uid="${e}"]`);
    if (!t) return;
    const i = this.fileList.find((r) => r.uid === e);
    if (!i) {
      t.remove();
      return;
    }
    this._updateFileItemElement(t, i);
  }
  /**
   * 更新文件项 li 元素的状态类和 file-item 子组件
   * @param li - 文件列表项元素
   * @param item - 文件数据
   */
  _updateFileItemElement(e, t) {
    e.classList.remove(
      p.s("pending"),
      p.s("uploading"),
      p.s("done"),
      p.s("error"),
      p.s("removed")
    ), e.classList.add(p.s(t.status));
    const i = e.querySelector(
      "ea-upload-file-item"
    );
    i && (i.item = t, i.listType = this.listType, i.render());
  }
  /**
   * 派发 change 事件
   * @param uploadFile 发生变化的文件
   */
  _dispatchChangeEvent(e) {
    var t;
    (t = this.onChange) == null || t.call(this, e, this.fileList), this.dispatchEvent(
      new J({ uploadFile: e, uploadFiles: this.fileList })
    );
  }
  _handleFileDelete(e) {
    e.stopPropagation();
    const t = e.detail;
    t != null && t.uid && this._removeFile(t.uid);
  }
  _handleFilePreview(e) {
    e.stopPropagation();
    const t = e.detail;
    if (t != null && t.uid) {
      const i = this.fileList.findIndex((r) => r.uid === t.uid);
      i !== -1 && this._showPreview(i);
    }
  }
  /**
   * 打开图片预览, 使用 ea-image-preview 全屏放大展示
   * @param index 文件在 fileList 中的索引
   */
  async _showPreview(e) {
    await customElements.whenDefined("ea-image-preview");
    const t = this.fileList.filter((o) => o.status === "done").map((o) => o.thumbUrl || o.url || "").filter(Boolean), i = this.fileList[e], r = i && (i.thumbUrl || i.url) || "", s = Math.max(0, t.indexOf(r));
    this._imagePreview.initialIndex = s, this._imagePreview.urlList = t, this._imagePreview.visible = !0;
  }
  _handleUploadClick(e) {
    const t = this._triggerSlot.assignedElements();
    t.length > 0 ? t.includes(e.target) && this.handleFileSelect() : this.handleFileSelect();
  }
  _handleDragOver(e) {
    !this.drag || this.disabled || (e.preventDefault(), e.stopPropagation());
  }
  _handleDragEnter(e) {
    !this.drag || this.disabled || (e.preventDefault(), e.stopPropagation(), this._dragEnterCount++, this._dragEnterCount === 1 && (this.updateContainerClasslist(), this._container.classList.add(p.s("dragover"))));
  }
  _handleDragLeave(e) {
    !this.drag || this.disabled || (e.preventDefault(), e.stopPropagation(), this._dragEnterCount--, this._dragEnterCount <= 0 && (this._dragEnterCount = 0, this.updateContainerClasslist()));
  }
  async _handleDrop(e) {
    var t, i;
    if (!(!this.drag || this.disabled))
      if (e.preventDefault(), e.stopPropagation(), this._dragEnterCount = 0, this.updateContainerClasslist(), this.directory) {
        const r = (t = e.dataTransfer) == null ? void 0 : t.items;
        if (!r || r.length === 0) return;
        const s = [], o = [];
        for (let a = 0; a < r.length; a++) {
          const d = r[a].webkitGetAsEntry();
          d && o.push(d);
        }
        for (const a of o)
          await this._traverseEntry(a, s);
        s.length > 0 && await this._addFiles(s);
      } else {
        const r = (i = e.dataTransfer) == null ? void 0 : i.files;
        if (!r || r.length === 0) return;
        await this._addFiles(Array.from(r));
      }
  }
  /**
   * 递归遍历文件系统条目，收集所有文件
   * @param entry 文件系统条目
   * @param files 收集结果
   */
  _traverseEntry(e, t) {
    return new Promise((i) => {
      e.isFile ? e.file((r) => {
        t.push(r), i();
      }) : e.isDirectory ? e.createReader().readEntries((s) => {
        if (s.length === 0) {
          i();
          return;
        }
        const o = s.map(
          (a) => this._traverseEntry(a, t)
        );
        Promise.all(o).then(() => i());
      }) : i();
    });
  }
  async _handleChange(e) {
    e.preventDefault(), e.stopImmediatePropagation();
    const t = e.target, i = t.files;
    !i || i.length === 0 || (await this._addFiles(Array.from(i)), t.value = "");
  }
  /**
   * 添加文件到 fileList
   * @param files 文件列表
   */
  async _addFiles(e) {
    var r;
    const t = this.limit - this.fileList.length;
    if (e.length > t) {
      const s = (r = this.onExceed) == null ? void 0 : r.call(this, e, this.fileList);
      if ((s instanceof Promise ? await s : s) !== !0) return;
      this._clearFileList();
    }
    const i = [];
    for (let s = 0; s < e.length; s++) {
      const o = e[s];
      i.push({
        uid: L(),
        name: o.name,
        status: "pending",
        raw: o
      });
    }
    this.fileList = [...this.fileList, ...i], this.showFileList && this._renderFileList(), this._dispatchChangeEvent(i[0]), this.autoUpload && this.submit();
  }
  $mount() {
    this.updateContainerClasslist(), this._mergeDefaultFileList(), this._renderFileList();
  }
  updateContainerClasslist() {
    const e = p({ [this.listType]: !0, drag: this.drag });
    return this._container && (this._container.className = e), e;
  }
  html() {
    const e = this.listType === "picture-card", t = `
    <slot id="triggerSlot" name="trigger"></slot>
    <slot id="defaultSlot"></slot>
    <input
      id="original"
      name="original"
      type="file"
      ${this.accept ? `accept="${this.accept}"` : ""}
      ${this.multiple ? "multiple" : ""}
      ${this.disabled ? "disabled" : ""}
      ${this.directory ? "webkitdirectory" : ""}
    />
  `;
    return `
      <div class="${p()}" part="container">
        ${e ? "" : `<label class="${p.e("content")}" part="content" for="original">${t}</label>`}
        <div class="${p.e("tip")}" part="tip">
          <slot name="tip"></slot>
        </div>
        <ul class="${p.e("list")}" part="list">
          ${e ? `<li class="${p.e("trigger")}" part="trigger"><label class="${p.e("content")}" part="content" for="original">${t}</label></li>` : ""}
        </ul>
        <ea-image-preview class="${p.e("preview")}" part="preview"></ea-image-preview>
      </div>
    `;
  }
};
l([
  y(p.cb())
], n.prototype, "_container", 2);
l([
  y("#triggerSlot")
], n.prototype, "_triggerSlot", 2);
l([
  y("#original")
], n.prototype, "_originalInput", 2);
l([
  y(p.ce("list"))
], n.prototype, "_listElement", 2);
l([
  y(p.ce("preview"))
], n.prototype, "_imagePreview", 2);
l([
  u({ type: Boolean, default: !1 })
], n.prototype, "disabled", 2);
l([
  u({ type: String, default: "" })
], n.prototype, "action", 2);
l([
  u({ type: Object, default: {} })
], n.prototype, "headers", 2);
l([
  u({ type: C(["GET", "POST", "PUT", "DELETE"]), default: "POST" })
], n.prototype, "method", 2);
l([
  u({ type: Boolean, default: !1 })
], n.prototype, "multiple", 2);
l([
  u({ type: String, default: "" })
], n.prototype, "name", 2);
l([
  u({ type: Boolean, default: !1 })
], n.prototype, "withCredentials", 2);
l([
  u({ type: Boolean, default: !0 })
], n.prototype, "showFileList", 2);
l([
  u({ type: String, default: "" })
], n.prototype, "accept", 2);
l([
  u({ type: C(["", "anonymous", "use-credentials"]), default: "" })
], n.prototype, "crossorigin", 2);
l([
  u({
    type: String,
    default: "text",
    observer() {
      this.updateContainerClasslist(), this._listElement && this._renderFileList();
    }
  })
], n.prototype, "listType", 2);
l([
  u({ type: Boolean, default: !0 })
], n.prototype, "autoUpload", 2);
l([
  u({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], n.prototype, "drag", 2);
l([
  u({ type: Number, default: Number.MAX_SAFE_INTEGER })
], n.prototype, "limit", 2);
l([
  u({
    type: Boolean,
    default: !1,
    observer() {
      this._originalInput && (this._originalInput.webkitdirectory = this.directory);
    }
  })
], n.prototype, "directory", 2);
l([
  f({ type: Object, default: {} })
], n.prototype, "data", 2);
l([
  f({
    type: Array,
    default: [],
    observer: function(e) {
      for (const t of e)
        t.uid || (t.uid = L()), t.status || (t.status = "pending");
      this._renderFileList(), this.autoUpload && e.length > 0 && this.submit();
    }
  })
], n.prototype, "fileList", 2);
l([
  f({
    type: Array,
    default: [],
    observer: function(e) {
      this._mergeDefaultFileList();
    }
  })
], n.prototype, "defaultFileList", 2);
l([
  f({ type: Function, default: T })
], n.prototype, "httpRequest", 2);
l([
  f({
    type: Function,
    default: (e, t, i) => {
      console.error(e);
    }
  })
], n.prototype, "onError", 2);
l([
  f({
    type: Function,
    default: (e, t, i) => {
    }
  })
], n.prototype, "onProgress", 2);
l([
  f({
    type: Function,
    default: (e, t, i) => {
    }
  })
], n.prototype, "onSuccess", 2);
l([
  f({ type: Function, default: null })
], n.prototype, "beforeRemove", 2);
l([
  f({
    type: Function,
    default: (e, t) => {
    }
  })
], n.prototype, "onRemove", 2);
l([
  f({
    type: Function,
    default: (e, t) => {
    }
  })
], n.prototype, "onChange", 2);
l([
  f({
    type: Function,
    default: (e, t) => !0
  })
], n.prototype, "beforeUpload", 2);
l([
  f({
    type: Function,
    default: (e, t) => {
    }
  })
], n.prototype, "onExceed", 2);
l([
  g("ea-upload-file-delete", p.ce("list"))
], n.prototype, "_handleFileDelete", 1);
l([
  g("ea-upload-file-preview", p.ce("list"))
], n.prototype, "_handleFilePreview", 1);
l([
  g("click", p.ce("content"))
], n.prototype, "_handleUploadClick", 1);
l([
  g("dragover", p.ce("content"))
], n.prototype, "_handleDragOver", 1);
l([
  g("dragenter", p.ce("content"))
], n.prototype, "_handleDragEnter", 1);
l([
  g("dragleave", p.ce("content"))
], n.prototype, "_handleDragLeave", 1);
l([
  g("drop", p.ce("content"))
], n.prototype, "_handleDrop", 1);
l([
  g("change", "#original")
], n.prototype, "_handleChange", 1);
n = l([
  w(x, { styles: [I] })
], n);
export {
  n as EaUpload
};
