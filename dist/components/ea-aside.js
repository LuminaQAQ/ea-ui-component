var o = (e) => {
  throw TypeError(e);
};
var d = (e, s, t) => s.has(e) || o("Cannot " + t);
var r = (e, s, t) => (d(e, s, "read from private field"), t ? t.call(e) : s.get(e)), h = (e, s, t) => s.has(e) ? o("Cannot add the same private member more than once") : s instanceof WeakSet ? s.add(e) : s.set(e, t), l = (e, s, t, a) => (d(e, s, "write to private field"), a ? a.call(e, t) : s.set(e, t), t);
import { B as n } from "./Base.js";
import "./index3.js";
const c = `
.ea-aside_wrap {
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
}
.ea-aside_wrap ::slotted(ea-main) {
  overflow: auto;
}
`;
var i;
class w extends n {
  constructor() {
    super();
    h(this, i);
    const t = this.attachShadow({ mode: "open" });
    t.innerHTML = `
            <aside class="ea-aside_wrap" part="container">
                <slot></slot>
            </aside>
        `, l(this, i, t.querySelector(".ea-aside_wrap")), this.build(t, c);
  }
  // ------- width 侧边栏宽度 -------
  // #region
  get width() {
    return this.getAttrNumber("width") || 200;
  }
  set width(t) {
    this.setAttribute("width", t), r(this, i).style.width = `${t}px`;
  }
  // #endregion
  // ------- end -------
  connectedCallback() {
    this.width = this.width;
  }
}
i = new WeakMap();
customElements.get("ea-aside") || customElements.define("ea-aside", w);
export {
  w as EaAside
};
