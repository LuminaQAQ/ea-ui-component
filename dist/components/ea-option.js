var r = (t) => {
  throw TypeError(t);
};
var n = (t, o, e) => o.has(t) || r("Cannot " + e);
var i = (t, o, e) => (n(t, o, "read from private field"), e ? e.call(t) : o.get(t)), l = (t, o, e) => o.has(t) ? r("Cannot add the same private member more than once") : o instanceof WeakSet ? o.add(t) : o.set(t, e), c = (t, o, e, a) => (n(t, o, "write to private field"), a ? a.call(t, e) : o.set(t, e), e);
import { B as d } from "./Base.js";
import "./index3.js";
const h = `
.ea-option_wrap {
  position: relative;
  padding: 0 20px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  color: #606266;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}
.ea-option_wrap.is-checked {
  color: #409eff;
  font-weight: 700;
}
.ea-option_wrap.is-disabled {
  color: #c0c4cc;
  pointer-events: none;
  cursor: not-allowed;
}
.ea-option_wrap:hover {
  background-color: #f5f7fa;
}
`;
var s;
class p extends d {
  constructor() {
    super();
    l(this, s);
    const e = this.attachShadow({ mode: "open" });
    e.innerHTML = `
            <div class='ea-option_wrap' part='container'>
                <slot></slot>
            </div>
        `, c(this, s, e.querySelector(".ea-option_wrap")), this.build(e, h);
  }
  // ------- value 选项值 -------
  // #region
  get value() {
    return this.getAttribute("value") || "";
  }
  set value(e) {
    this.setAttribute("value", e);
  }
  // #endregion
  // ------- end -------
  // ------- checked 选项是否选中 -------
  // #region
  get checked() {
    return this.getAttrBoolean("checked") || !1;
  }
  set checked(e) {
    this.setAttribute("checked", e), i(this, s).classList.toggle("is-checked", e);
  }
  // #endregion
  // ------- end -------
  // ------- disabled 选项是否禁用 -------
  // #region
  get disabled() {
    return this.getAttrBoolean("disabled") || !1;
  }
  set disabled(e) {
    this.setAttribute("disabled", e), i(this, s).classList.toggle("is-disabled", e);
  }
  // #endregion
  // ------- end -------
  connectedCallback() {
    this.value = this.value, this.disabled = this.disabled;
  }
}
s = new WeakMap();
customElements.get("ea-option") || customElements.define("ea-option", p);
export {
  p as EaOption
};
