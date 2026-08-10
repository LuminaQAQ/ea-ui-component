import { EaOverlay as C } from "./ea-overlay.js";
import { q as x, a as u, p as E, l as v, C as A } from "../core/decorator.js";
import { c as L } from "../utils/bem.ts.js";
import { h as b } from "../utils/html.ts.js";
import "./ea-image.js";
import "./ea-icon.js";
import { s as S } from "../css/ea-image-preview.style.js";
class $ extends Event {
  constructor() {
    super("ea-preview-error", { bubbles: !0, composed: !0 });
  }
}
class M extends Event {
  constructor(t) {
    super("ea-switch", { bubbles: !0, composed: !0 }), this.detail = t;
  }
}
class I extends Event {
  constructor(t) {
    super("ea-rotate", { bubbles: !0, composed: !0 }), this.detail = t;
  }
}
var N = Object.defineProperty, P = Object.getOwnPropertyDescriptor, n = (e, t, o, r) => {
  for (var s = r > 1 ? void 0 : r ? P(t, o) : t, c = e.length - 1, h; c >= 0; c--)
    (h = e[c]) && (s = (r ? h(t, o, s) : h(s)) || s);
  return r && s && N(t, o, s), s;
};
const w = "ea-image-preview", a = L(w);
let i = class extends C {
  constructor() {
    super(...arguments), this._states = {
      urlList: [],
      status: "loading",
      dirtyUpdate: !1,
      isUrlListInit: !1,
      position: { x: 0, y: 0 }
    }, this.initialIndex = 0, this.index = 0, this.infinite = !0, this.zoom = 1, this.zoomRate = 1.2, this.scale = 1, this.minScale = 0.2, this.maxScale = 7, this.showProgress = !1, this.urlList = [];
  }
  get status() {
    return this._states.status;
  }
  set status(e) {
    this._states.status = e;
  }
  updateContainerClasslist() {
    const t = `${super.updateContainerClasslist()} ${a(
      { [this._states.status]: !0 },
      { "show-progress": this.showProgress }
    )}`;
    return this._container && (this._container.className = t), t;
  }
  html() {
    const e = document.createElement("template");
    e.innerHTML = super.html();
    const t = e.content.querySelector(".ea-overlay__content"), o = `
      <header class="${a.e("header")}" part="header">
        <ea-icon class="${a.e("icon")} ${a.e("close-icon")}" name="xmark" part="icon close-icon"></ea-icon>
      </header>
      <main class="${a.e("main")}" part="main">
        <ea-icon class="${a.e("icon")} ${a.e("prev-icon")}" data-action="switch-prev" name="angle-left" part="icon prev-icon"></ea-icon>
        <ea-icon class="${a.e("icon")} ${a.e("next-icon")}" data-action="switch-next" name="angle-right" part="icon next-icon"></ea-icon>
      </main>
      <footer class="${a.e("footer")}" part="footer">
        <section class="${a.e("progress")}" part="progress">
          <slot name="progress"></slot>
        </section>
        <section class="${a.e("toolbar")}" part="toolbar">
          <slot name="toolbar">
            <ea-icon class="${a.e("icon")} ${a.e("zoom-out-icon")}" data-action="zoom-out" name="magnifying-glass-minus" part="icon zoom-out-icon"></ea-icon>
            <ea-icon class="${a.e("icon")} ${a.e("zoom-in-icon")}" data-action="zoom-in" name="magnifying-glass-plus" part="icon zoom-in-icon"></ea-icon>
            <ea-icon class="${a.e("icon")} ${a.e("rotate-left-icon")}" data-action="rotate-anticlockwise" name="rotate-left" part="icon rotate-left-icon"></ea-icon>
            <ea-icon class="${a.e("icon")} ${a.e("rotate-right-icon")}" data-action="rotate-clockwise" name="rotate-right" part="icon rotate-right-icon"></ea-icon>
          </slot>
        </section>
      </footer>
    `;
    return t.insertAdjacentHTML("beforebegin", b(o)), e.innerHTML;
  }
  /** 切换图片到上一张或下一张 */
  _handleSwitch(e) {
    e === "prev" ? this.index-- : e === "next" && this.index++;
  }
  /** 缩放图片 */
  _handleZoom(e) {
    e === "in" ? this.scale = Number((this.scale * this.zoomRate).toFixed(3)) : e === "out" && (this.scale = Number((this.scale / this.zoomRate).toFixed(3)));
  }
  /** 旋转图片 */
  _handleRotate(e) {
    var r, s;
    const t = Number(
      ((r = this._overlayContent) == null ? void 0 : r.style.getPropertyValue("--ea-image-preview-rotate").split("deg")[0]) || 0
    );
    let o = 0;
    e === "left" ? o = t - 90 : e === "right" && (o = t + 90), (s = this._overlayContent) == null || s.style.setProperty(
      "--ea-image-preview-rotate",
      o + "deg"
    ), this.dispatchEvent(
      new I({
        oldVal: t,
        rotate: o
      })
    );
  }
  /** 更新进度显示 */
  _handleProgress(e, t) {
    var s;
    const o = this.querySelector("[slot='progress']"), r = (c, h) => {
      c.forEach((l) => l.textContent = String(e)), h.forEach((l) => l.textContent = String(t));
    };
    if (o instanceof HTMLSlotElement)
      o.assignedNodes({ flatten: !0 }).filter(
        (l) => l.nodeType === Node.ELEMENT_NODE
      ).forEach((l) => {
        const m = l.querySelectorAll("[data-active]"), g = l.querySelectorAll("[data-total]");
        r(m, g);
      });
    else if (o) {
      const c = o.querySelectorAll("[data-active]"), h = o.querySelectorAll("[data-total]");
      r(c, h);
    } else {
      const c = this._progress || ((s = this.shadowRoot) == null ? void 0 : s.querySelector(".ea-image-preview__progress"));
      c && (c.textContent = `${e} / ${t}`);
    }
  }
  /** 处理图片拖拽移动 */
  _onImgMoveEvent(e) {
    var l;
    e.preventDefault(), (l = this._imgMoveAbortController) == null || l.abort(), this._imgMoveAbortController = new AbortController();
    const t = e.clientX, o = e.clientY, r = this._states.position.x, s = this._states.position.y;
    document.body.style.cursor = "grabbing", document.body.style.userSelect = "none";
    const c = (m) => {
      var y, f;
      m.preventDefault();
      const g = m.clientX - t, d = m.clientY - o, p = r + g, _ = s + d;
      (y = this._overlayContent) == null || y.style.setProperty(
        "--ea-image-preview-img-move-x",
        `${p}px`
      ), (f = this._overlayContent) == null || f.style.setProperty(
        "--ea-image-preview-img-move-y",
        `${_}px`
      );
    }, h = (m) => {
      var p;
      m.preventDefault();
      const g = m.clientX - t, d = m.clientY - o;
      this._states.position.x = r + g, this._states.position.y = s + d, document.body.style.cursor = "", document.body.style.userSelect = "", (p = this._imgMoveAbortController) == null || p.abort();
    };
    window.addEventListener("mousemove", c, {
      signal: this._imgMoveAbortController.signal
    }), window.addEventListener("mouseup", h, {
      signal: this._imgMoveAbortController.signal
    });
  }
  /** 渲染指定索引的图片 */
  _renderImage(e) {
    var r;
    const t = this.urlList[e];
    if (!this._overlayContent) return;
    const o = this._overlayContent.querySelector(
      ".ea-image-preview__img"
    );
    if (o && o.remove(), t) {
      (r = this._imgAbortController) == null || r.abort(), this._imgAbortController = new AbortController();
      const h = `<ea-image class="ea-image-preview__img" fit="contain">${this.querySelector('[slot="viewer-error"]') ? '<slot name="viewer-error" slot="error"></slot>' : ""}</ea-image>`;
      this._overlayContent.insertAdjacentHTML("afterbegin", b(h));
      const l = this._overlayContent.querySelector(
        ".ea-image-preview__img"
      );
      l.setAttribute("src", t);
      const m = () => {
        var d, p, _;
        this._states.status = "error", (d = this._container) == null || d.classList.remove(
          "ea-image-preview--success",
          "ea-image-preview--loading"
        ), (p = this._container) == null || p.classList.add("ea-image-preview--error"), this.dispatchEvent(new $()), (_ = this._imgAbortController) == null || _.abort();
      }, g = () => {
        var d, p, _;
        this._states.status = "success", (d = this._container) == null || d.classList.remove(
          "ea-image-preview--error",
          "ea-image-preview--loading"
        ), (p = this._container) == null || p.classList.add("ea-image-preview--success"), (_ = this._imgAbortController) == null || _.abort();
      };
      this._handleProgress(e + 1, this.urlList.length), l.addEventListener("error", m, {
        once: !0,
        signal: this._imgAbortController.signal
      }), l.addEventListener("load", g, {
        once: !0,
        signal: this._imgAbortController.signal
      }), this.visible && this._states.isUrlListInit && this.dispatchEvent(
        new M({
          index: e,
          url: t,
          imgTarget: l
        })
      );
    }
  }
  setActiveItem(e) {
    this.index = e;
  }
  reset() {
    var e, t;
    this.index = this.initialIndex, this.scale = 1, this._handleRotate("reset"), this._states.position = {
      x: 0,
      y: 0
    }, (e = this._overlayContent) == null || e.style.setProperty(
      "--ea-image-preview-img-move-x",
      "0px"
    ), (t = this._overlayContent) == null || t.style.setProperty(
      "--ea-image-preview-img-move-y",
      "0px"
    );
  }
  _handleCloseIconClick() {
    this.hide(), this.visible = !1;
  }
  _handleMainClick(e) {
    var r, s;
    const t = e.target.closest("[data-action]");
    if (!t) return;
    const o = t.getAttribute("data-action");
    (s = (r = i._actionMap)[o]) == null || s.call(r, this);
  }
  _handleToolbarClick(e) {
    var r, s;
    const t = e.target.closest("[data-action]");
    if (!t) return;
    const o = t.getAttribute("data-action");
    (s = (r = i._actionMap)[o]) == null || s.call(r, this);
  }
  _handleWheel(e) {
    e.preventDefault(), e.deltaY > 0 ? this._handleZoom("out") : this._handleZoom("in");
  }
  _handleImgMouseDown(e) {
    this._onImgMoveEvent(e);
  }
  _handleClosed(e) {
    e.target === this && this.reset();
  }
  $mount() {
    var e;
    (e = super.$mount) == null || e.call(this);
    try {
      this.setAttribute("role", "dialog");
    } catch {
      this.role = "dialog";
    }
    this.setAttribute("aria-modal", "true"), this.setAttribute("aria-label", "Image Preview"), this.updateContainerClasslist();
  }
  $beforeUnmount() {
    var e, t, o;
    (e = super.$beforeUnmount) == null || e.call(this), (t = this._imgAbortController) == null || t.abort(), (o = this._imgMoveAbortController) == null || o.abort();
  }
};
i._idCounter = 0;
i._actionMap = {
  "switch-prev": (e) => e._handleSwitch("prev"),
  "switch-next": (e) => e._handleSwitch("next"),
  "zoom-out": (e) => e._handleZoom("out"),
  "zoom-in": (e) => e._handleZoom("in"),
  "rotate-anticlockwise": (e) => e._handleRotate("left"),
  "rotate-clockwise": (e) => e._handleRotate("right")
};
n([
  x(".ea-image-preview__progress")
], i.prototype, "_progress", 2);
n([
  u({
    type: Number,
    default: 0,
    observer(e) {
      this.index = e;
    }
  })
], i.prototype, "initialIndex", 2);
n([
  u({
    type: Number,
    default: 0,
    observer(e, t) {
      if (this._states.dirtyUpdate) return this._states.dirtyUpdate = !1;
      if (this.infinite) {
        if (!this.urlList.length) return;
        const o = this.urlList.length - 1;
        if (e > o) return this.index = 0;
        if (e < 0) return this.index = o;
      } else if (e < 0 || e > this.urlList.length - 1)
        return this._states.dirtyUpdate = !0, this.index = t;
      this._renderImage(e);
    }
  })
], i.prototype, "index", 2);
n([
  u({
    type: Boolean,
    default: !0
  })
], i.prototype, "infinite", 2);
n([
  u({
    type: Number,
    default: 1
  })
], i.prototype, "zoom", 2);
n([
  u({
    type: Number,
    default: 1.2
  })
], i.prototype, "zoomRate", 2);
n([
  u({
    type: Number,
    default: 1,
    observer(e, t) {
      var o;
      if (e < this.minScale || e > this.maxScale)
        return this.scale = t;
      (o = this._overlayContent) == null || o.style.setProperty(
        "--ea-image-preview-scale",
        String(e)
      );
    }
  })
], i.prototype, "scale", 2);
n([
  u({
    type: Number,
    default: 0.2
  })
], i.prototype, "minScale", 2);
n([
  u({
    type: Number,
    default: 7
  })
], i.prototype, "maxScale", 2);
n([
  u({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], i.prototype, "showProgress", 2);
n([
  E({
    type: Array,
    default: [],
    observer(e) {
      this._states.isUrlListInit = !1, this._states.urlList = e, this.index = this.initialIndex, this._states.isUrlListInit = !0;
    }
  })
], i.prototype, "urlList", 2);
n([
  v("click", ".ea-image-preview__close-icon")
], i.prototype, "_handleCloseIconClick", 1);
n([
  v("click", ".ea-image-preview__main")
], i.prototype, "_handleMainClick", 1);
n([
  v("click", ".ea-image-preview__toolbar")
], i.prototype, "_handleToolbarClick", 1);
n([
  v("wheel", ".ea-overlay")
], i.prototype, "_handleWheel", 1);
n([
  v("mousedown", ".ea-overlay__content")
], i.prototype, "_handleImgMouseDown", 1);
n([
  v("ea-closed")
], i.prototype, "_handleClosed", 1);
i = n([
  A(w, { styles: [S] })
], i);
export {
  i as EaImagePreview
};
