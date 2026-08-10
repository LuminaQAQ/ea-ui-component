import { E as y } from "../core/EaBase.ts.js";
import { q as _, l as c, C as T, a as u } from "../core/decorator.js";
import { s as z } from "../css/ea-scrollbar.style.js";
import { c as L } from "../utils/bem.ts.js";
var C = Object.defineProperty, k = Object.getOwnPropertyDescriptor, o = (t, i, l, r) => {
  for (var a = r > 1 ? void 0 : r ? k(i, l) : i, h = t.length - 1, n; h >= 0; h--)
    (n = t[h]) && (a = (r ? n(i, l, a) : n(a)) || a);
  return r && a && C(i, l, a), a;
};
const f = "ea-scrollbar", s = L(f);
let e = class extends y {
  constructor() {
    super(...arguments), this.height = "", this.native = !1, this.noresize = !1, this.always = !1, this._handleThumbDrag = (t) => {
      var d, w;
      if (!this._dragState || !this._view) return;
      const {
        isHorizontal: i,
        startClientX: l,
        startClientY: r,
        startScrollLeft: a,
        startScrollTop: h,
        thumbWidth: n,
        thumbHeight: p
      } = this._dragState;
      if (i) {
        const v = t.clientX - l, m = ((d = this._horizontalTrack) == null ? void 0 : d.getBoundingClientRect().width) || 0, g = v / (m - n), b = a + g * (this._view.scrollWidth - this._view.clientWidth);
        this._view.scrollTo({
          left: Math.max(
            0,
            Math.min(b, this._view.scrollWidth - this._view.clientWidth)
          ),
          behavior: "instant"
        });
      } else {
        const v = t.clientY - r, m = ((w = this._verticalTrack) == null ? void 0 : w.getBoundingClientRect().height) || 0, g = v / (m - p), b = h + g * (this._view.scrollHeight - this._view.clientHeight);
        this._view.scrollTo({
          top: Math.max(
            0,
            Math.min(b, this._view.scrollHeight - this._view.clientHeight)
          ),
          behavior: "instant"
        });
      }
    };
  }
  updateContainerClasslist() {
    const t = s(
      { native: this.native, noresize: this.noresize, always: this.always },
      {}
    );
    return this._container && (this._container.className = t), t;
  }
  /** 处理滚动事件，更新滑块位置并派发滚动事件 */
  _handleScroll() {
    if (!this._view || !this._verticalThumb || !this._horizontalThumb) return;
    this._verticalThumb.style.setProperty(
      "--ea-scrollbar-top",
      `${this._view.scrollTop / this._view.scrollHeight * 100}%`
    ), this._horizontalThumb.style.setProperty(
      "--ea-scrollbar-left",
      `${this._view.scrollLeft / this._view.scrollWidth * 100}%`
    ), this.emit("ea-scroll", {
      detail: {
        scrollTop: this._view.scrollTop,
        scrollLeft: this._view.scrollLeft
      }
    });
    const t = {
      top: this._view.scrollTop / this._view.scrollHeight <= 0,
      bottom: this._view.scrollTop / this._view.scrollHeight >= 1,
      left: this._view.scrollLeft / this._view.scrollWidth <= 0,
      right: this._view.scrollLeft / this._view.scrollWidth >= 1
    };
    Object.keys(t).forEach((i) => {
      t[i] && this.emit("ea-end-reached", {
        detail: {
          direction: i,
          scrollTop: this._view.scrollTop,
          scrollLeft: this._view.scrollLeft
        }
      });
    });
  }
  /** 处理尺寸变化，更新滑块大小和轨道可见性 */
  _handleResize() {
    queueMicrotask(() => {
      var r, a;
      if (!this._view || !this._verticalThumb || !this._horizontalThumb) return;
      const t = this._view.getBoundingClientRect(), i = t.height / this._view.scrollHeight, l = t.width / this._view.scrollWidth;
      this._verticalThumb.style.setProperty(
        "--ea-scrollbar-thumb-vertical-height",
        `${i * 100}%`
      ), this._horizontalThumb.style.setProperty(
        "--ea-scrollbar-thumb-horizontal-width",
        `${l * 100}%`
      ), (r = this._verticalTrack) == null || r.classList.toggle(
        "is-hidden",
        i >= 0.999
      ), (a = this._horizontalTrack) == null || a.classList.toggle(
        "is-hidden",
        l >= 0.999
      );
    });
  }
  _handleMouseDown(t) {
    var r, a, h, n, p;
    if (t.preventDefault(), t.stopPropagation(), !this._view) return;
    const i = t.target === this._horizontalThumb;
    this._dragState = {
      isHorizontal: i,
      startClientX: t.clientX,
      startClientY: t.clientY,
      startScrollLeft: this._view.scrollLeft,
      startScrollTop: this._view.scrollTop,
      thumbWidth: ((r = this._horizontalThumb) == null ? void 0 : r.getBoundingClientRect().width) || 0,
      thumbHeight: ((a = this._verticalThumb) == null ? void 0 : a.getBoundingClientRect().height) || 0
    }, (h = this._container) == null || h.classList.add("is-dragging"), i ? (n = this._horizontalThumb) == null || n.classList.add("is-active") : (p = this._verticalThumb) == null || p.classList.add("is-active");
    const l = new AbortController();
    window.addEventListener("mousemove", this._handleThumbDrag, {
      signal: l.signal
    }), window.addEventListener(
      "mouseup",
      () => {
        var d, w, v;
        l.abort(), this._dragState = void 0, (d = this._container) == null || d.classList.remove("is-dragging"), (w = this._horizontalThumb) == null || w.classList.remove("is-active"), (v = this._verticalThumb) == null || v.classList.remove("is-active");
      },
      { signal: l.signal, once: !0 }
    );
  }
  _handleKeyDown(t) {
    this._view && (t.key === "ArrowUp" || t.key === "ArrowDown" ? this._view.scrollTo({
      top: this._view.scrollTop + this._view.scrollHeight / 8 * (t.key === "ArrowUp" ? -1 : 1),
      behavior: "smooth"
    }) : (t.key === "ArrowLeft" || t.key === "ArrowRight") && this._view.scrollTo({
      left: this._view.scrollLeft + this._view.scrollWidth / 8 * (t.key === "ArrowLeft" ? -1 : 1),
      behavior: "smooth"
    }));
  }
  _handleViewScroll() {
    this._handleScroll();
  }
  _handleSlotChange() {
    this._handleResize();
  }
  _handleWindowResize() {
    this.noresize || this._handleResize();
  }
  _handleWindowLoad() {
    this._handleResize();
  }
  scrollTo(t, i) {
    var l, r;
    typeof t == "number" ? (l = this._view) == null || l.scrollTo(t, i ?? 0) : (r = this._view) == null || r.scrollTo(t);
  }
  html() {
    return `
      <div class="${s()}" part="container">
        <div class="${s.e("track-horizontal")}" part="track-horizontal">
          <div class="${s.e("thumb-horizontal")}" part="thumb-horizontal"></div>
        </div>
        <div class="${s.e("track-vertical")}" part="track-vertical">
          <div class="${s.e("thumb-vertical")}" part="thumb-vertical"></div>
        </div>
        <div class="${s.e("view")}" part="view">
          <slot></slot>
        </div>
      </div>
    `;
  }
  $mount() {
    this.updateContainerClasslist(), this._handleResize(), this._container && (this._container.style.height = this.height || "100%");
  }
};
o([
  _(s.cb())
], e.prototype, "_container", 2);
o([
  _(s.ce("track-horizontal"))
], e.prototype, "_horizontalTrack", 2);
o([
  _(s.ce("track-vertical"))
], e.prototype, "_verticalTrack", 2);
o([
  _(s.ce("thumb-horizontal"))
], e.prototype, "_horizontalThumb", 2);
o([
  _(s.ce("thumb-vertical"))
], e.prototype, "_verticalThumb", 2);
o([
  _(s.ce("view"))
], e.prototype, "_view", 2);
o([
  u({
    type: String,
    default: "",
    observer(t) {
      this._container && (this._container.style.height = t || "100%");
    }
  })
], e.prototype, "height", 2);
o([
  u({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], e.prototype, "native", 2);
o([
  u({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], e.prototype, "noresize", 2);
o([
  u({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], e.prototype, "always", 2);
o([
  c("mousedown", s.ce("thumb-horizontal")),
  c("mousedown", s.ce("thumb-vertical"))
], e.prototype, "_handleMouseDown", 1);
o([
  c("keydown")
], e.prototype, "_handleKeyDown", 1);
o([
  c("scroll", s.ce("view"))
], e.prototype, "_handleViewScroll", 1);
o([
  c("slotchange", s.ce("view"))
], e.prototype, "_handleSlotChange", 1);
o([
  c("resize", "window")
], e.prototype, "_handleWindowResize", 1);
o([
  c("load", "window")
], e.prototype, "_handleWindowLoad", 1);
e = o([
  T(f, { styles: [z] })
], e);
export {
  e as EaScrollbar
};
