import { E as c } from "../core/EaBase.ts.js";
import { q as C, a as o, C as _ } from "../core/decorator.js";
import { E as h } from "../utils/Enum.ts.js";
import { V as f } from "../core/constants.js";
import { s as u } from "../css/ea-text.style.js";
import { c as y } from "../utils/bem.ts.js";
var T = Object.defineProperty, E = Object.getOwnPropertyDescriptor, r = (t, s, n, a) => {
  for (var i = a > 1 ? void 0 : a ? E(s, n) : s, l = t.length - 1, p; l >= 0; l--)
    (p = t[l]) && (i = (a ? p(s, n, i) : p(i)) || i);
  return a && i && T(s, n, i), i;
};
const m = "ea-text", d = y(m), b = [...f, "normal"], v = ["large", "medium", "small"], S = [
  "span",
  "p",
  "b",
  "i",
  "sub",
  "sup",
  "ins",
  "del",
  "mark"
];
let e = class extends c {
  constructor() {
    super(...arguments), this.variant = "normal", this.size = "medium", this.truncated = !1, this.lineClamp = 0, this.tag = "span";
  }
  updateContainerClasslist() {
    const t = d({
      [this.variant]: !0,
      [this.size]: !0,
      truncated: this.truncated,
      "line-clamp": this.lineClamp > 0
    });
    return this._container && (this._container.className = t), t;
  }
  /**
   * 重新渲染组件模板
   */
  _reRender() {
    var n;
    if (!this.shadowRoot) return;
    const t = ((n = this.shadowRoot.adoptedStyleSheets) == null ? void 0 : n.length) > 0;
    if (this.shadowRoot.innerHTML = "", !t) {
      const a = document.createElement("style");
      a.textContent = u, this.shadowRoot.appendChild(a);
    }
    const s = document.createElement("template");
    s.innerHTML = this.html(), this.shadowRoot.appendChild(s.content), this.lineClamp > 0 && this.style.setProperty("--ea-text-line-clamp", String(this.lineClamp)), this.updateContainerClasslist(), this._updateTitle();
  }
  /**
   * 当 truncated 或 line-clamp 启用时，自动将文本内容设置为容器 title
   */
  _updateTitle() {
    if (!this._container) return;
    const t = this.getAttribute("title");
    if (t) {
      this._container.title = t;
      return;
    }
    this.truncated || this.lineClamp > 0 ? this._container.title = this.textContent || "" : this._container.title = "";
  }
  html() {
    return `
      <${this.tag} class="${this.updateContainerClasslist()}" part="container">
        <slot></slot>
      </${this.tag}>
    `;
  }
  $mount() {
    this.updateContainerClasslist(), this._updateTitle();
  }
};
r([
  C(d.cb())
], e.prototype, "_container", 2);
r([
  o({
    type: h(b),
    default: "normal",
    observer() {
      this.updateContainerClasslist();
    }
  })
], e.prototype, "variant", 2);
r([
  o({
    type: h(v),
    default: "medium",
    observer() {
      this.updateContainerClasslist();
    }
  })
], e.prototype, "size", 2);
r([
  o({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist(), this._updateTitle();
    }
  })
], e.prototype, "truncated", 2);
r([
  o({
    type: Number,
    default: 0,
    observer(t) {
      this.style.setProperty("--ea-text-line-clamp", String(t)), this.updateContainerClasslist(), this._updateTitle();
    }
  })
], e.prototype, "lineClamp", 2);
r([
  o({
    type: h(S),
    default: "span",
    observer() {
      this._reRender();
    }
  })
], e.prototype, "tag", 2);
e = r([
  _(m, { styles: [u] })
], e);
const N = e;
export {
  e as EaText,
  N as default
};
