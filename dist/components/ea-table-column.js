var h = (e) => {
  throw TypeError(e);
};
var a = (e, s, t) => s.has(e) || h("Cannot " + t);
var o = (e, s, t) => (a(e, s, "read from private field"), t ? t.call(e) : s.get(e)), n = (e, s, t) => s.has(e) ? h("Cannot add the same private member more than once") : s instanceof WeakSet ? s.add(e) : s.set(e, t), l = (e, s, t, i) => (a(e, s, "write to private field"), i ? i.call(e, t) : s.set(e, t), t);
import { B as c } from "./Base.js";
import "./index3.js";
import "./ea-checkbox.js";
const p = "";
var r;
class b extends c {
  constructor() {
    super();
    n(this, r);
    const t = this.attachShadow({ mode: "open" });
    t.innerHTML = `
            <th part="container">
                <slot></slot>
                <span></span>
            </th>
        `, this.build(t, p), l(this, r, t.querySelector("span"));
  }
  // ------- prop 表头对应的数据的键值 -------
  // #region
  get prop() {
    return this.getAttribute("prop");
  }
  set prop(t) {
    this.setAttribute("prop", t);
  }
  // #endregion
  // ------- end -------
  // ------- width 列宽 -------
  // #region
  get width() {
    return this.getAttrNumber("width") || 350;
  }
  set width(t) {
    this.setAttribute("width", t);
  }
  // #endregion
  // ------- end -------
  // ------- label 标题 -------
  // #region
  get label() {
    return this.getAttribute("label") || "";
  }
  set label(t) {
    this.setAttribute("label", t), t !== "" && (o(this, r).innerHTML = t);
  }
  // #endregion
  // ------- end -------
  // ------- colspan 跨列 -------
  // #region
  get colspan() {
    return this.getAttrNumber("colspan") || 1;
  }
  set colspan(t) {
    this.setAttribute("colspan", t);
  }
  // #endregion
  // ------- end -------
  // ------- rowspan 跨行 -------
  // #region
  get rowspan() {
    return this.getAttrNumber("rowspan") || 1;
  }
  set rowspan(t) {
    this.setAttribute("rowspan", t);
  }
  // #endregion
  // ------- end -------
  // ------- type 列类型 -------
  // #region
  get type() {
    const t = this.getAttribute("type");
    return ["default", "index", "selection"].includes(t) ? t : "default";
  }
  set type(t) {
    this.setAttribute("type", t), t === "selection" && (o(this, r).innerHTML = `
                <ea-checkbox></ea-checkbox>
            `, o(this, r).querySelector("ea-checkbox").addEventListener("change", (i) => {
      this.dispatchEvent(new CustomEvent("header-selection-change", {
        detail: {
          checked: i.detail.checked
        },
        composed: !0
      }));
    }));
  }
  // #endregion
  // ------- end -------
  // ------- sortable 是否可排序 -------
  // #region
  get sortable() {
    return this.getAttrBoolean("sortable") || !1;
  }
  set sortable(t) {
    this.setAttribute("sortable", t);
  }
  // #endregion
  // ------- end -------
  // ------- order 排序方式 -------
  // #region
  get order() {
    return this.getAttribute("order") || "asc";
  }
  set order(t) {
    this.setAttribute("order", t);
  }
  // #endregion
  // ------- end -------
  connectedCallback() {
    this.prop = this.prop, this.width = this.width, this.label = this.label, this.colspan = this.colspan, this.rowspan = this.rowspan, this.type = this.type, this.sortable = this.sortable, this.order = this.order;
  }
}
r = new WeakMap();
customElements.get("ea-table-column") || customElements.define("ea-table-column", b);
export {
  b as EaTableColumn
};
