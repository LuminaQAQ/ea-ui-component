var r = (t, o, e) => {
  if (!o.has(t))
    throw TypeError("Cannot " + e);
};
var i = (t, o, e) => (r(t, o, "read from private field"), e ? e.call(t) : o.get(t)), n = (t, o, e) => {
  if (o.has(t))
    throw TypeError("Cannot add the same private member more than once");
  o instanceof WeakSet ? o.add(t) : o.set(t, e);
}, l = (t, o, e, a) => (r(t, o, "write to private field"), a ? a.call(t, e) : o.set(t, e), e);
import { B as c } from "./Base.js";
import "./index3.js";
const d = `
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
class h extends c {
  constructor() {
    super();
    n(this, s, void 0);
    const e = this.attachShadow({ mode: "open" });
    e.innerHTML = `
            <div class='ea-option_wrap' part='container'>
                <slot></slot>
            </div>
        `, l(this, s, e.querySelector(".ea-option_wrap")), this.build(e, d);
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
customElements.get("ea-option") || customElements.define("ea-option", h);
export {
  h as EaOption
};
