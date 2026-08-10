import { E as f } from "../core/EaBase.ts.js";
import { q as h, a, C as m } from "../core/decorator.js";
import { E as y } from "../utils/Enum.ts.js";
import { V as v } from "../core/constants.js";
import { s as b } from "../css/ea-badge.style.js";
import { c as _ } from "../utils/bem.ts.js";
var C = Object.defineProperty, N = Object.getOwnPropertyDescriptor, o = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? N(e, i) : e, l = t.length - 1, p; l >= 0; l--)
    (p = t[l]) && (r = (n ? p(e, i, r) : p(r)) || r);
  return n && r && C(e, i, r), r;
};
const c = "ea-badge", u = _(c), d = "danger";
let s = class extends f {
  constructor() {
    super(...arguments), this.value = "", this.max = 1 / 0, this.variant = d, this.color = "", this.isDot = !1, this.dataHidden = !1, this.offsetX = 0, this.offsetY = 0, this.showZero = !0;
  }
  updateContainerClasslist() {
    const t = this.dataHidden || !this.showZero && Number(this.value) === 0, e = u(
      { [this.variant]: this.variant !== d },
      { dot: this.isDot, hidden: t }
    );
    return this._container && (this._container.className = e), e;
  }
  _computedValue(t) {
    if (!this.showZero && Number(t) === 0) return "";
    const e = Number(t);
    return !isNaN(e) && e > this.max ? `${this.max}+` : t;
  }
  _updateContent(t) {
    var p;
    const e = this._computedValue(t), i = (p = this.shadowRoot) == null ? void 0 : p.querySelector("[data-value]");
    if (i) {
      i.textContent = e;
      return;
    }
    const n = this.querySelector("[slot='content']");
    if (!n) {
      this._content.textContent = e;
      return;
    }
    const r = n.cloneNode(!0), l = r.querySelector("[data-value]");
    l && (l.textContent = e), this._content.innerHTML = r.innerHTML;
  }
  html() {
    return `
      <div class="${u()}" part="container">
        <sup class="${u.e("content")}" part="content" aria-hidden="true"></sup>
        <slot></slot>
      </div>
    `;
  }
  $mount() {
    this.updateContainerClasslist(), this.isDot || this._updateContent(this.value);
  }
};
o([
  h(u.cb())
], s.prototype, "_container", 2);
o([
  h(u.ce("content"))
], s.prototype, "_content", 2);
o([
  a({
    type: String,
    default: "",
    observer(t) {
      this.isDot || this._updateContent(t);
    }
  })
], s.prototype, "value", 2);
o([
  a({
    type: Number,
    default: 1 / 0
  })
], s.prototype, "max", 2);
o([
  a({
    type: y(v),
    default: d,
    observer() {
      this.updateContainerClasslist();
    }
  })
], s.prototype, "variant", 2);
o([
  a({
    type: String,
    default: "",
    observer(t) {
      this.style.setProperty("--ea-badge-color", t);
    }
  })
], s.prototype, "color", 2);
o([
  a({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], s.prototype, "isDot", 2);
o([
  a({
    type: Boolean,
    default: !1,
    observer(t) {
      this._content.ariaHidden = String(t), this._content.hidden = t, this.updateContainerClasslist();
    }
  })
], s.prototype, "dataHidden", 2);
o([
  a({
    type: Number,
    default: 0,
    observer(t) {
      this.style.setProperty("--ea-badge-offset-x", -t + "px");
    }
  })
], s.prototype, "offsetX", 2);
o([
  a({
    type: Number,
    default: 0,
    observer(t) {
      this.style.setProperty("--ea-badge-offset-y", t + "px");
    }
  })
], s.prototype, "offsetY", 2);
o([
  a({
    type: Boolean,
    default: !0,
    observer() {
      this.updateContainerClasslist();
    }
  })
], s.prototype, "showZero", 2);
s = o([
  m(c, { styles: [b] })
], s);
export {
  s as EaBadge
};
