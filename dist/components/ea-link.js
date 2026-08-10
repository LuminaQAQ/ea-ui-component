import { E as u } from "../core/EaBase.ts.js";
import { q as c, a as s, l as _, C as b } from "../core/decorator.js";
import { E as p } from "../utils/Enum.ts.js";
import { V as y } from "../core/constants.js";
import { s as m } from "../css/ea-link.style.js";
import "./ea-icon.js";
import { c as v } from "../utils/bem.ts.js";
var A = Object.defineProperty, g = Object.getOwnPropertyDescriptor, i = (t, n, o, a) => {
  for (var r = a > 1 ? void 0 : a ? g(n, o) : n, h = t.length - 1, d; h >= 0; h--)
    (d = t[h]) && (r = (a ? d(n, o, r) : d(r)) || r);
  return a && r && A(n, o, r), r;
};
const f = "ea-link", l = v(f), C = ["always", "hover", "never"];
let e = class extends u {
  constructor() {
    super(...arguments), this.variant = "normal", this.disabled = !1, this.underline = "", this.href = "", this.target = "", this.rel = "", this.download = "", this.icon = "";
  }
  /** 更新容器类名 */
  updateContainerClasslist() {
    const t = l(
      {
        [this.variant]: !0,
        [`underline-${this.underline}`]: !!this.underline
      },
      { disabled: this.disabled, icon: !!this.icon }
    );
    return this._container && (this._container.className = t), t;
  }
  /** 同步原生链接属性到容器 */
  _syncLinkAttributes() {
    this._container && (this.href && (this._container.href = this.href), this.target && (this._container.target = this.target), this.rel && (this._container.rel = this.rel), this.hasAttribute("download") && (this._container.download = this.download));
  }
  /** disabled 时或无 href 时更新 tabindex */
  _updateTabindex() {
    this._container && (this.disabled ? this._container.setAttribute("tabindex", "-1") : this.href ? this._container.removeAttribute("tabindex") : this._container.setAttribute("tabindex", "0"));
  }
  /** 无 href 时添加 role="link" 保持链接语义 */
  _updateLinkRole() {
    this._container && (this.href ? this._container.removeAttribute("role") : this._container.setAttribute("role", "link"));
  }
  /** 渲染模板 */
  html() {
    const t = this.href ? `href="${this.href}"` : "", n = this.target ? `target="${this.target}"` : "", o = this.rel ? `rel="${this.rel}"` : "", a = this.hasAttribute("download") ? `download="${this.download}"` : "", r = this.href ? "" : 'role="link"', h = this.disabled ? 'tabindex="-1"' : this.href ? "" : 'tabindex="0"';
    return `
      <a class="${this.updateContainerClasslist()}" part="container" ${t} ${n} ${o} ${a} ${r} ${h}>
        <ea-icon class="${l.e("icon")}" part="icon"></ea-icon>
        <slot></slot>
      </a>
    `;
  }
  $mount() {
    this.updateContainerClasslist(), this._syncLinkAttributes(), this._updateTabindex(), this._updateLinkRole();
  }
  _handleKeydown(t) {
    this.disabled || t.key === "Enter" && !this.href && this._container.click();
  }
};
i([
  c(l.cb())
], e.prototype, "_container", 2);
i([
  c(l.ce("icon"))
], e.prototype, "_icon", 2);
i([
  s({
    type: p([...y, "normal"]),
    default: "normal",
    observer() {
      this.updateContainerClasslist();
    }
  })
], e.prototype, "variant", 2);
i([
  s({
    type: Boolean,
    default: !1,
    a11y: {
      ariaAttr: "aria-disabled",
      map: (t) => String(t)
    },
    observer() {
      this.updateContainerClasslist(), this._updateTabindex();
    }
  })
], e.prototype, "disabled", 2);
i([
  s({
    type: p(C),
    default: "",
    observer() {
      this.updateContainerClasslist();
    }
  })
], e.prototype, "underline", 2);
i([
  s({
    type: String,
    default: "",
    observer(t) {
      this._container && (this._container.href = t), this._updateLinkRole(), this._updateTabindex();
    }
  })
], e.prototype, "href", 2);
i([
  s({
    type: String,
    default: "",
    observer(t) {
      this._container && (this._container.target = t);
    }
  })
], e.prototype, "target", 2);
i([
  s({
    type: String,
    default: "",
    observer(t) {
      this._container && (this._container.rel = t);
    }
  })
], e.prototype, "rel", 2);
i([
  s({
    type: String,
    default: "",
    observer(t) {
      this._container && (this._container.download = t);
    }
  })
], e.prototype, "download", 2);
i([
  s({
    type: String,
    default: "",
    observer(t) {
      this._icon && this._icon.setAttribute("name", t), this.updateContainerClasslist();
    }
  })
], e.prototype, "icon", 2);
i([
  _("keydown", l.cb())
], e.prototype, "_handleKeydown", 1);
e = i([
  b(f, { styles: [m] })
], e);
const T = e;
export {
  e as EaLink,
  T as default
};
