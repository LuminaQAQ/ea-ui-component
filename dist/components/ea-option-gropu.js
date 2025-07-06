var l = (e) => {
  throw TypeError(e);
};
var n = (e, o, t) => o.has(e) || l("Cannot " + t);
var u = (e, o, t) => (n(e, o, "read from private field"), t ? t.call(e) : o.get(e)), a = (e, o, t) => o.has(e) ? l("Cannot add the same private member more than once") : o instanceof WeakSet ? o.add(e) : o.set(e, t), p = (e, o, t, s) => (n(e, o, "write to private field"), s ? s.call(e, t) : o.set(e, t), t);
import { B as c } from "./Base.js";
import "./index3.js";
const h = `
.ea-option-group_wrap .ea-option-group_title {
  padding-left: 20px;
  font-size: 12px;
  color: #909399;
  line-height: 30px;
}
`;
var r, i;
class d extends c {
  constructor() {
    super();
    a(this, r);
    a(this, i);
    const t = this.attachShadow({ mode: "open" });
    t.innerHTML = `
            <div class='ea-option-group_wrap' part='container'>
                <div class='ea-option-group_title' part='title-wrap'></div>
                <slot></slot>
            </div>
        `, p(this, r, t.querySelector(".ea-option-group_wrap")), p(this, i, t.querySelector(".ea-option-group_title")), this.build(t, h);
  }
  // ------- label 标题  -------
  // #region
  get label() {
    return this.getAttribute("label") || "";
  }
  set label(t) {
    this.setAttribute("label", t), u(this, i).innerHTML = t;
  }
  // #endregion
  // ------- end -------
  connectedCallback() {
    this.label = this.label;
  }
}
r = new WeakMap(), i = new WeakMap();
customElements.get("ea-option-group") || customElements.define("ea-option-group", d);
export {
  d as EaOptionGroup
};
