var o = (t, i, e) => {
  if (!i.has(t))
    throw TypeError("Cannot " + e);
};
var r = (t, i, e) => (o(t, i, "read from private field"), e ? e.call(t) : i.get(t)), l = (t, i, e) => {
  if (i.has(t))
    throw TypeError("Cannot add the same private member more than once");
  i instanceof WeakSet ? i.add(t) : i.set(t, e);
}, c = (t, i, e, s) => (o(t, i, "write to private field"), s ? s.call(t, e) : i.set(t, e), e);
import { B as a } from "./Base.js";
import "./index3.js";
const h = ".ea-link{text-decoration:none;color:#606266;cursor:pointer}.ea-link:hover{color:#797b80}.ea-link.underline:hover{text-decoration:underline}.ea-link.primary{color:#409eff}.ea-link.primary:hover{color:#73b8ff}.ea-link.success{color:#67c23a}.ea-link.success:hover{color:#85cf60}.ea-link.info{color:#909399}.ea-link.info:hover{color:#abadb1}.ea-link.warning{color:#e6a23c}.ea-link.warning:hover{color:#ecb869}.ea-link.danger{color:#f56c6c}.ea-link.danger:hover{color:#f89c9c}.ea-link.disabled{color:#c0c4cc;pointer-events:none}.ea-link.disabled:hover{color:#dcdee3}";
var n;
class d extends a {
  constructor() {
    super();
    l(this, n, void 0);
    const e = this.shadowRoot;
    this.stylesheet = h, e.innerHTML = `
      <a class="ea-link" part="container">
        <slot></slot>
      </a>
    `, c(this, n, e.querySelector(".ea-link"));
  }
  get LINK_TYPE() {
    return ["primary", "success", "info", "warning", "danger"];
  }
  // ------- href链接 -------
  // #region
  get href() {
    return this.getAttribute("href");
  }
  set href(e) {
    e && (this.setAttribute("href", e), r(this, n).href = e);
  }
  // #endregion
  // ------- end -------
  // ------- type类型 -------
  // #region
  get type() {
    const e = this.getAttribute("type");
    return this.LINK_TYPE.includes(e) ? e : null;
  }
  set type(e) {
    e && this.LINK_TYPE.includes(e) && r(this, n).classList.add(e);
  }
  // #endregion
  // ------- end -------
  // ------- disabled禁用状态 -------
  // #region
  get disabled() {
    return this.getAttrBoolean("disabled");
  }
  set disabled(e) {
    this.setAttribute("disabled", e), r(this, n).classList.toggle("disabled", e), this.style.cursor = e ? "not-allowed" : "pointer";
  }
  // #endregion
  // ------- end -------
  // ------- underline下划线 -------
  // #region
  get underline() {
    return this.getAttrBoolean("underline");
  }
  set underline(e) {
    this.setAttribute("underline", e), r(this, n).classList.toggle("underline", e);
  }
  // #endregion
  // ------- end -------
  // ------- icon图标 -------
  // #region
  get icon() {
    return this.getAttribute("icon");
  }
  set icon(e) {
    if (!e)
      return;
    const s = document.createElement("ea-icon");
    s.icon = e, r(this, n).insertBefore(s, r(this, n).firstChild);
  }
  // #endregion
  // ------- end -------
  $mounted() {
    this.style.display = "inline-block", this.href = this.href, this.type = this.type, this.disabled = this.disabled, this.underline = this.underline, this.icon = this.icon;
  }
}
n = new WeakMap();
window.customElements.get("ea-link") || window.customElements.define("ea-link", d);
export {
  d as EaLink
};
