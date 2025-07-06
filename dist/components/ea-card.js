var t = (e) => {
  throw TypeError(e);
};
var d = (e, s, a) => s.has(e) || t("Cannot " + a);
var c = (e, s, a) => (d(e, s, "read from private field"), a ? a.call(e) : s.get(e)), i = (e, s, a) => s.has(e) ? t("Cannot add the same private member more than once") : s instanceof WeakSet ? s.add(e) : s.set(e, a), h = (e, s, a, o) => (d(e, s, "write to private field"), o ? o.call(e, a) : s.set(e, a), a);
import { B as n } from "./Base.js";
const w = `
.ea-card_wrap {
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  transition: box-shadow 0.3s;
}
.ea-card_wrap.is-always-shadow, .ea-card_wrap.is-hover-shadow:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.ea-card_wrap.is-never-shadow {
  box-shadow: none;
}
.ea-card_wrap .ea-card_content {
  padding: 20px;
}
`;
var r;
class p extends n {
  constructor() {
    super();
    i(this, r);
    const a = this.attachShadow({ mode: "open" });
    a.innerHTML = `
      <div class="ea-card_wrap" part="container">
        <div class="ea-card_header" part="header-wrap">
          <slot name="header"></slot>
        </div>
        <div class="ea-card_content" part="content-wrap">
          <slot></slot>
        </div>
      </div>
    `, h(this, r, a.querySelector(".ea-card_wrap")), this.build(a, w);
  }
  // ------- shadow 阴影属性 -------
  // #region
  get shadow() {
    return this.getAttribute("shadow") || "always";
  }
  set shadow(a) {
    this.setAttribute("shadow", a), c(this, r).classList.add(`is-${a}-shadow`);
  }
  // #endregion
  // ------- end -------
  connectedCallback() {
    this.shadow = this.shadow;
  }
}
r = new WeakMap();
customElements.get("ea-card") || customElements.define("ea-card", p);
