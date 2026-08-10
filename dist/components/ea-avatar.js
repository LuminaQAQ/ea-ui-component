import { E as u } from "../core/EaBase.ts.js";
import { q as v, C as d, a as c } from "../core/decorator.js";
import { h as l } from "../utils/html.ts.js";
import { s as g } from "../css/ea-avatar.style.js";
import "./ea-icon.js";
import { c as _ } from "../utils/bem.ts.js";
const f = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <clipPath id="a">
                <path d="M0 30h90v45H0z" />
            </clipPath>
        </defs>
        <path fill="#c0c4cc" d="M0 0h100v100H0z" />
        <circle cx="50" cy="35" r="15" fill="#fff" />
        <circle cx="50" cy="82.5" r="30" fill="#fff" clip-path="url(#a)" />
    </svg>
`, y = `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path fill="#c0c4cc" d="M0 0h100v100H0z" />
        <path fill="#fff" d="M20 25h60v50H20z" />
        <circle r="7" cx="35" cy="40" fill="#c0c4cc" />
        <path d="M35 55L25 70h-5 30z" fill="#c0c4cc" />
        <path d="M55 45L40 70h5 30z" fill="#c0c4cc" />
    </svg>
`;
var C = Object.defineProperty, b = Object.getOwnPropertyDescriptor, i = (t, e, r, s) => {
  for (var n = s > 1 ? void 0 : s ? b(e, r) : e, h = t.length - 1, p; h >= 0; h--)
    (p = t[h]) && (n = (s ? p(e, r, n) : p(n)) || n);
  return s && n && C(e, r, n), n;
};
const m = "ea-avatar", o = _(m);
let a = class extends u {
  constructor() {
    super(...arguments), this.icon = "", this.shape = "circle", this.size = "default", this.src = "", this.srcSet = "", this.alt = "", this.fit = "cover";
  }
  // ==================== 方法 ====================
  /**
   * 更新容器类名
   */
  updateContainerClasslist() {
    const t = o({ [this.shape]: !0 });
    return this._container && (this._container.className = t), t;
  }
  /**
   * 渲染回退内容（icon 或默认 slot）
   */
  _renderFallback() {
    this.icon ? this._container.innerHTML = l(
      `<ea-icon class="${o.e("icon")}" name="${this.icon}" part="icon-avatar"></ea-icon>`
    ) : this._container.innerHTML = l(`<slot>${f}</slot>`);
  }
  /**
   * 加载并渲染图片
   * 先通过隐藏 Image 预加载，成功后再插入 DOM，避免破图闪烁
   * @param src 图片源地址
   */
  _loadImage(t) {
    var r;
    (r = this._srcController) == null || r.abort(), this._srcController = new AbortController();
    const e = new Image();
    e.src = t, e.addEventListener(
      "load",
      () => {
        var s;
        this._renderImage(t), (s = this._srcController) == null || s.abort();
      },
      { signal: this._srcController.signal }
    ), e.addEventListener(
      "error",
      () => {
        var s;
        this._container.innerHTML = l(`<slot>${y}</slot>`), this.emit("error"), (s = this._srcController) == null || s.abort();
      },
      { signal: this._srcController.signal }
    );
  }
  /**
   * 渲染图片元素到 DOM
   * @param src 图片源地址
   */
  _renderImage(t) {
    const e = document.createElement("img");
    e.className = o.e("img"), e.src = t, e.alt = this.alt, e.srcset = this.srcSet, e.setAttribute("part", "img-avatar"), this._container.innerHTML = "", this._container.appendChild(e);
  }
  /**
   * 获取内容 HTML
   */
  _getContentHtml() {
    return this.src ? "" : this.icon ? `<ea-icon class="${o.e("icon")}" name="${this.icon}" part="icon-avatar"></ea-icon>` : `<slot>${f}</slot>`;
  }
  /**
   * 渲染模板
   */
  html() {
    const t = this.updateContainerClasslist(), e = this._getContentHtml();
    return `
      <div class="${t}" part="container">
        ${e}
      </div>
    `;
  }
  // ==================== 生命周期 ====================
  $mount() {
    this.updateContainerClasslist(), this.src && this._loadImage(this.src);
  }
  $beforeUnmount() {
    var t;
    (t = this._srcController) == null || t.abort();
  }
};
i([
  v(o.cb())
], a.prototype, "_container", 2);
i([
  c({
    type: String,
    default: "",
    observer(t) {
      this.src || (t ? this._container.innerHTML = l(
        `<ea-icon class="${o.e("icon")}" name="${t}" part="icon-avatar"></ea-icon>`
      ) : this._container.innerHTML = l(`<slot>${f}</slot>`));
    }
  })
], a.prototype, "icon", 2);
i([
  c({
    type: ["circle", "square"],
    default: "circle",
    observer() {
      this.updateContainerClasslist();
    }
  })
], a.prototype, "shape", 2);
i([
  c({
    type: String,
    default: "default",
    observer(t) {
      const r = ["default", "small", "large"].includes(
        t
      ), s = CSS.supports("width", t);
      if (!r && !s) {
        console.warn(
          "[ea-avatar] Please set size to one of [default, small, large] or a valid CSS width value"
        ), this.style.setProperty(
          "--ea-avatar-size",
          "var(--ea-avatar-size-default)"
        );
        return;
      }
      this.style.setProperty(
        "--ea-avatar-size",
        r ? `var(--ea-avatar-size-${t})` : t
      );
    }
  })
], a.prototype, "size", 2);
i([
  c({
    type: String,
    default: "",
    observer(t) {
      var e;
      t ? this._loadImage(t) : ((e = this._srcController) == null || e.abort(), this._renderFallback());
    }
  })
], a.prototype, "src", 2);
i([
  c({
    type: String,
    default: "",
    observer(t) {
      var r;
      const e = (r = this._container) == null ? void 0 : r.querySelector(
        o.ce("img")
      );
      e && (e.srcset = t);
    }
  })
], a.prototype, "srcSet", 2);
i([
  c({
    type: String,
    default: "",
    observer(t) {
      var r;
      const e = (r = this._container) == null ? void 0 : r.querySelector(
        o.ce("img")
      );
      e && (e.alt = t);
    }
  })
], a.prototype, "alt", 2);
i([
  c({
    type: ["fill", "contain", "cover", "none", "scale-down"],
    default: "cover",
    observer(t) {
      this.style.setProperty("--ea-avatar-fit", t);
    }
  })
], a.prototype, "fit", 2);
a = i([
  d(m, { styles: [g] })
], a);
export {
  a as EaAvatar
};
