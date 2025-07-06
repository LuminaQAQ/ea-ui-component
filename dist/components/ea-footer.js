var i = (e) => {
  throw TypeError(e);
};
var a = (e, o, t) => o.has(e) || i("Cannot " + t);
var r = (e, o, t) => (a(e, o, "read from private field"), t ? t.call(e) : o.get(e)), n = (e, o, t) => o.has(e) ? i("Cannot add the same private member more than once") : o instanceof WeakSet ? o.add(e) : o.set(e, t), c = (e, o, t, h) => (a(e, o, "write to private field"), h ? h.call(e, t) : o.set(e, t), t);
import { B as p } from "./Base.js";
import "./index3.js";
const g = `
.ea-footer_wrap {
  box-sizing: border-box;
  padding: 0 20px;

  height: 60px;

  color: #333;

  overflow: hidden;
}
`;
var s;
class l extends p {
  constructor() {
    super();
    n(this, s);
    const t = this.attachShadow({ mode: "open" });
    t.innerHTML = `
            <footer class="ea-footer_wrap" part="container">
                <slot></slot>
            </footer>
        `, c(this, s, t.querySelector(".ea-footer_wrap")), this.build(t, g);
  }
  // ------- height 底栏高度 -------
  // #region
  get height() {
    return this.getAttrNumber("height") || 60;
  }
  set height(t) {
    this.setAttribute("height", t), r(this, s).style.height = `${t}px`, r(this, s).style.lineHeight = `${t}px`;
  }
  // #endregion
  // ------- end -------
  connectedCallback() {
    this.height = this.height;
  }
}
s = new WeakMap();
customElements.get("ea-footer") || customElements.define("ea-footer", l);
export {
  l as EaFooter
};
