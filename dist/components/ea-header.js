var a = (t) => {
  throw TypeError(t);
};
var o = (t, h, e) => h.has(t) || a("Cannot " + e);
var r = (t, h, e) => (o(t, h, "read from private field"), e ? e.call(t) : h.get(t)), d = (t, h, e) => h.has(t) ? a("Cannot add the same private member more than once") : h instanceof WeakSet ? h.add(t) : h.set(t, e), n = (t, h, e, i) => (o(t, h, "write to private field"), i ? i.call(t, e) : h.set(t, e), e);
import { B as c } from "./Base.js";
import "./index3.js";
const p = `
.ea-header_wrap {
  box-sizing: border-box;
  padding: 0 20px;

  height: 60px;

  color: #333;

  overflow: hidden;
}
`;
var s;
class g extends c {
  constructor() {
    super();
    d(this, s);
    const e = this.attachShadow({ mode: "open" });
    e.innerHTML = `
            <header class="ea-header_wrap" part="container">
                <slot></slot>
            </header>
        `, n(this, s, e.querySelector(".ea-header_wrap")), this.build(e, p);
  }
  // ------- height 顶栏高度 -------
  // #region
  get height() {
    return this.getAttrNumber("height") || 60;
  }
  set height(e) {
    this.setAttribute("height", e), r(this, s).style.height = `${e}px`, r(this, s).style.lineHeight = `${e}px`;
  }
  // #endregion
  // ------- end -------
  connectedCallback() {
    this.height = this.height;
  }
}
s = new WeakMap();
customElements.get("ea-header") || customElements.define("ea-header", g);
export {
  g as EaHeader
};
