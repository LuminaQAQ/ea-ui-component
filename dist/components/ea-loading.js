import { E as u } from "../core/EaBase.ts.js";
import { q as c, C as f, a as d } from "../core/decorator.js";
import { h as y } from "../utils/html.ts.js";
import { s as m } from "../css/ea-loading.style.js";
import "./ea-icon.js";
import { c as g } from "../utils/bem.ts.js";
class b {
  constructor(t) {
    this._includeTypes = [
      "lock",
      "text",
      "spinner",
      "background",
      "spinnerSize"
    ], this._defaultOptions = {
      lock: !1,
      text: "",
      spinner: "spinner",
      background: "hsla(0, 0%, 100%, 0.9)",
      spinnerSize: 0,
      target: "body"
    };
    const e = Object.assign({}, this._defaultOptions, t), n = this._includeTypes.reduce(
      (a, p) => (e[p] !== void 0 && (a[p] = e[p]), a),
      {}
    ), i = this._renderer(n, e.target);
    this.instance = i, this._appendToHandler(i, e.target), i.loading = !0;
  }
  _renderer(t, e) {
    const n = document.createElement("ea-loading");
    (e && e !== "body" && typeof e != "string" ? !0 : typeof e == "string" && e !== "body") || (n.fullscreen = !0);
    for (const a in t)
      n[a] = t[a];
    return n;
  }
  _appendToHandler(t, e) {
    if (!e || e === "body") {
      document.body.appendChild(t);
      return;
    }
    if (e instanceof HTMLElement)
      e.style.position = "relative", e.appendChild(t);
    else if (typeof e == "string") {
      const n = document.querySelector(e);
      n ? (n.style.position = "relative", n.appendChild(t)) : document.body.appendChild(t);
    } else
      console.warn(
        `[EaLoading] TypeError: ${e} is not a valid element or selector.`
      ), document.body.appendChild(t);
  }
  close() {
    this.instance.loading = !1;
    const t = this.instance.parentElement;
    this.instance.remove(), t && t !== document.body && (t.querySelector("ea-loading") || t.style.removeProperty("position"));
  }
}
const _ = (s = {}) => new b(s);
var v = Object.defineProperty, x = Object.getOwnPropertyDescriptor, r = (s, t, e, n) => {
  for (var i = n > 1 ? void 0 : n ? x(t, e) : t, a = s.length - 1, p; a >= 0; a--)
    (p = s[a]) && (i = (n ? p(t, e, i) : p(i)) || i);
  return n && i && v(t, e, i), i;
};
const h = "ea-loading", l = g(h);
let o = class extends u {
  constructor() {
    super(...arguments), this.loading = !1, this.spinner = "spinner", this.spinnerSize = 0, this.background = "hsla(0, 0%, 100%, 0.9)", this.text = "", this.fullscreen = !1, this.lock = !1;
  }
  /** 更新加载文本内容和可见性 */
  _updateText() {
    this._textEl && (this._textEl.textContent = this.text, this._textEl.style.display = this.text ? "" : "none");
  }
  /** 处理滚动锁定 */
  _handleLock() {
    this.fullscreen && this.loading && this.lock ? document.body.style.overflow = "hidden" : document.body.style.overflow = "";
  }
  /** 更新容器类名 */
  updateContainerClasslist() {
    const s = l(
      { fullscreen: this.fullscreen && this.loading },
      { loading: this.loading }
    );
    return this._container && (this._container.className = s), s;
  }
  /** 渲染模板 */
  html() {
    return `
      <div class="${this.updateContainerClasslist()}" part="container">
        <div class="${l.e("mask")}" part="mask">
          <slot name="spinner">
            <ea-icon class="${l.e("spinner")}" name="${this.spinner}" spin part="spinner"></ea-icon>
          </slot>
          <div class="${l.e("text")}" part="text">${y(this.text)}</div>
        </div>
        <div class="${l.e("content")}" part="content-wrap">
          <slot></slot>
        </div>
      </div>
    `;
  }
  /** 关闭加载 */
  close() {
    this.loading = !1, this.emit("ea-close");
  }
  $mount() {
    this.updateContainerClasslist(), this._updateText(), this._handleLock(), this.background !== "hsla(0, 0%, 100%, 0.9)" && this.style.setProperty("--ea-loading-background", this.background), this.spinnerSize > 0 && this.style.setProperty(
      "--ea-loading-spinner-size",
      `${this.spinnerSize}px`
    );
  }
  $beforeUnmount() {
    this.lock && (document.body.style.overflow = "");
  }
};
r([
  c(l.cb())
], o.prototype, "_container", 2);
r([
  c(l.ce("spinner"))
], o.prototype, "_spinnerIcon", 2);
r([
  c(l.ce("text"))
], o.prototype, "_textEl", 2);
r([
  d({
    type: Boolean,
    default: !1,
    a11y: {
      ariaAttr: "inert",
      target: ".ea-loading__content",
      map: (s) => s ? "" : null
    },
    observer() {
      this.updateContainerClasslist(), this._handleLock();
    }
  })
], o.prototype, "loading", 2);
r([
  d({
    type: String,
    default: "spinner",
    observer(s) {
      this._spinnerIcon && this._spinnerIcon.setAttribute("name", s);
    }
  })
], o.prototype, "spinner", 2);
r([
  d({
    type: Number,
    default: 0,
    observer(s) {
      s > 0 ? this.style.setProperty("--ea-loading-spinner-size", `${s}px`) : this.style.removeProperty("--ea-loading-spinner-size");
    }
  })
], o.prototype, "spinnerSize", 2);
r([
  d({
    type: String,
    default: "hsla(0, 0%, 100%, 0.9)",
    observer(s) {
      this.style.setProperty("--ea-loading-background", s);
    }
  })
], o.prototype, "background", 2);
r([
  d({
    type: String,
    default: "",
    observer() {
      this._updateText();
    }
  })
], o.prototype, "text", 2);
r([
  d({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist(), this._handleLock();
    }
  })
], o.prototype, "fullscreen", 2);
r([
  d({
    type: Boolean,
    default: !1,
    observer() {
      this._handleLock();
    }
  })
], o.prototype, "lock", 2);
o = r([
  f(h, { styles: [m] })
], o);
window.$loading = _;
export {
  o as EaLoading,
  _ as EaLoadingService
};
