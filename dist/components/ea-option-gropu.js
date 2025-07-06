var l = (e, o, t) => {
  if (!o.has(e))
    throw TypeError("Cannot " + t);
};
var n = (e, o, t) => (l(e, o, "read from private field"), t ? t.call(e) : o.get(e)), a = (e, o, t) => {
  if (o.has(e))
    throw TypeError("Cannot add the same private member more than once");
  o instanceof WeakSet ? o.add(e) : o.set(e, t);
}, p = (e, o, t, s) => (l(e, o, "write to private field"), s ? s.call(e, t) : o.set(e, t), t);
import { B as u } from "./Base.js";
import "./index3.js";
const c = `
.ea-option-group_wrap .ea-option-group_title {
  padding-left: 20px;
  font-size: 12px;
  color: #909399;
  line-height: 30px;
}
`;
var r, i;
class h extends u {
  constructor() {
    super();
    a(this, r, void 0);
    a(this, i, void 0);
    const t = this.attachShadow({ mode: "open" });
    t.innerHTML = `
            <div class='ea-option-group_wrap' part='container'>
                <div class='ea-option-group_title' part='title-wrap'></div>
                <slot></slot>
            </div>
        `, p(this, r, t.querySelector(".ea-option-group_wrap")), p(this, i, t.querySelector(".ea-option-group_title")), this.build(t, c);
  }
  // ------- label 标题  -------
  // #region
  get label() {
    return this.getAttribute("label") || "";
  }
  set label(t) {
    this.setAttribute("label", t), n(this, i).innerHTML = t;
  }
  // #endregion
  // ------- end -------
  connectedCallback() {
    this.label = this.label;
  }
}
r = new WeakMap(), i = new WeakMap();
customElements.get("ea-option-group") || customElements.define("ea-option-group", h);
export {
  h as EaOptionGroup
};
