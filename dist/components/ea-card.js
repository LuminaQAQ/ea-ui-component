import { E as y } from "../core/EaBase.ts.js";
import { q as p, a as d, l as m, C as f } from "../core/decorator.js";
import { E as _ } from "../utils/Enum.ts.js";
import { s as u } from "../css/ea-card.style.js";
import { c as C } from "../utils/bem.ts.js";
var E = Object.defineProperty, v = Object.getOwnPropertyDescriptor, a = (t, i, o, n) => {
  for (var r = n > 1 ? void 0 : n ? v(i, o) : i, l = t.length - 1, h; l >= 0; l--)
    (h = t[l]) && (r = (n ? h(i, o, r) : h(r)) || r);
  return n && r && E(i, o, r), r;
};
const c = "ea-card", s = C(c), g = ["always", "hover", "never"];
let e = class extends y {
  constructor() {
    super(...arguments), this._states = {
      isHeaderEmpty: !0,
      isFooterEmpty: !0
    }, this.shadow = "always", this.header = "", this.footer = "";
  }
  /** 更新容器类名 */
  updateContainerClasslist() {
    const t = s(
      {},
      {
        [this.shadow + "-shadow"]: this.shadow && this.shadow !== "never",
        "header-empty": this._states.isHeaderEmpty,
        "footer-empty": this._states.isFooterEmpty
      }
    );
    return this._container && (this._container.className = t), t;
  }
  /** 渲染模板 */
  html() {
    return `
      <div class="${this.updateContainerClasslist()}" part="container">
        <div class="${s.e("header")}" part="header">
          <slot name="header"></slot>
        </div>
        <div class="${s.e("content")}" part="content">
          <slot></slot>
        </div>
        <div class="${s.e("footer")}" part="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
  _handleHeaderSlotChange(t) {
    const o = t.target.assignedElements().length === 0 && !this.header;
    this._states.isHeaderEmpty = o, this.updateContainerClasslist();
  }
  _handleFooterSlotChange(t) {
    const o = t.target.assignedElements().length === 0 && !this.footer;
    this._states.isFooterEmpty = o, this.updateContainerClasslist();
  }
  $mount() {
    this.updateContainerClasslist();
  }
};
a([
  p(s.cb())
], e.prototype, "_container", 2);
a([
  p(`${s.ce("header")} slot[name="header"]`)
], e.prototype, "_headerSlot", 2);
a([
  p(`${s.ce("footer")} slot[name="footer"]`)
], e.prototype, "_footerSlot", 2);
a([
  d({
    type: _(g),
    default: "always",
    observer() {
      this.updateContainerClasslist();
    }
  })
], e.prototype, "shadow", 2);
a([
  d({
    type: String,
    default: "",
    observer(t) {
      this._headerSlot.innerText = t, this._states.isHeaderEmpty = !t, this.updateContainerClasslist();
    }
  })
], e.prototype, "header", 2);
a([
  d({
    type: String,
    default: "",
    observer(t) {
      this._footerSlot.innerText = t, this._states.isFooterEmpty = !t, this.updateContainerClasslist();
    }
  })
], e.prototype, "footer", 2);
a([
  m("slotchange", `${s.ce("header")} slot[name="header"]`)
], e.prototype, "_handleHeaderSlotChange", 1);
a([
  m("slotchange", `${s.ce("footer")} slot[name="footer"]`)
], e.prototype, "_handleFooterSlotChange", 1);
e = a([
  f(c, { styles: [u] })
], e);
export {
  e as EaCard
};
