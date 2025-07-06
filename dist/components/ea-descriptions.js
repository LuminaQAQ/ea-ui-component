var A = (e) => {
  throw TypeError(e);
};
var _ = (e, i, t) => i.has(e) || A("Cannot " + t);
var g = (e, i, t) => (_(e, i, "read from private field"), t ? t.call(e) : i.get(e)), m = (e, i, t) => i.has(e) ? A("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(e) : i.set(e, t), f = (e, i, t, r) => (_(e, i, "write to private field"), r ? r.call(e, t) : i.set(e, t), t), w = (e, i, t) => (_(e, i, "access private method"), t);
import { B as x } from "./Base.js";
import "./index3.js";
import "./ea-descriptions-item.js";
const H = (e, i) => `
        <th class="ea-descriptions-item_label ea-descriptions-item_cell ${i ? "is-border" : ""}" colspan="1" part="table-th">
            ${e}${i ? "" : ":"}
        </th>
    `, L = (e, i, t) => `
        <td class="ea-descriptions-item_content ea-descriptions-item_cell ${i ? "is-border" : ""}" colspan="${t}" part="table-td">
            ${e}
        </td>
    `, M = (e, i, t) => `
        <th class="ea-descriptions-item_label ea-descriptions-item_cell is-border" colspan="1" part="table-th">${e}</th>
        <td class="ea-descriptions-item_content ea-descriptions-item_cell is-border" colspan="${t}" part="table-td">${i}</td>
    `, E = (e, i, t) => `
        <td class="ea-descriptions-item" colspan="${t}" part="table-td">
            <span class="ea-descriptions-item_label" part="table-td-label">${e}:</span>
            <span class="ea-descriptions-item_content" part="table-td-content">${i}</span>
        </td>
    `, k = (e, i, t) => {
  var d;
  let r = e.getAttribute("label"), c = e.innerHTML;
  return r || (r = ((d = e.querySelector('[slot="label"]')) == null ? void 0 : d.innerHTML) || ""), t ? M(r, c, i) : E(r, c, i);
}, C = `
.ea-descriptions_wrap {
  font-size: 14px;
}
.ea-descriptions_wrap .ea-descriptions_header {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 20px;
}
.ea-descriptions_wrap .ea-descriptions_body table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}
.ea-descriptions_wrap .ea-descriptions_body table th {
  background-color: #fafafa;
}
.ea-descriptions_wrap .ea-descriptions_body table td {
  vertical-align: baseline;
}
.ea-descriptions_wrap .ea-descriptions-item_label,
.ea-descriptions_wrap .ea-descriptions-item_content {
  font-weight: normal;
  font-size: 14px;
  vertical-align: middle;
}
.ea-descriptions_wrap .ea-descriptions-item_label.is-border,
.ea-descriptions_wrap .ea-descriptions-item_content.is-border {
  border: 1px solid #ebeef5;
}
.ea-descriptions_wrap .ea-descriptions-item_cell {
  text-align: left;
  padding: 12px 10px;
}
`;
var b, h, l, $, v;
class S extends x {
  constructor() {
    super();
    m(this, l);
    m(this, b);
    m(this, h);
    const t = this.attachShadow({ mode: "open" });
    t.innerHTML = `
            <div class="ea-descriptions_wrap" part="container">
                <div class="ea-descriptions_header" part="header-wrap"></div>
                <div class="ea-descriptions_body" part="body-wrap">
                    <table class="ea-descriptions_table" part="table-wrap"></table>
                </div>
            </div>
        `, f(this, b, t.querySelector(".ea-descriptions_table")), f(this, h, t.querySelector(".ea-descriptions_header")), this.build(t, C);
  }
  // ------- title 设置标题 -------
  // #region
  get title() {
    return this.getAttribute("title") || "";
  }
  set title(t) {
    this.setAttribute("title", t), g(this, h).innerHTML = t;
  }
  // #endregion
  // ------- end -------
  // ------- col 一行显示多少个item -------
  // #region
  get col() {
    return this.getAttrNumber("col") || 3;
  }
  set col(t) {
    this.setAttribute("col", t);
  }
  // #endregion
  // ------- end -------
  // ------- border 是否显示边框 -------
  // #region
  get border() {
    return this.getAttrBoolean("border");
  }
  set border(t) {
    this.toggleAttr("border", t);
  }
  // #endregion
  // ------- end -------
  // ------- direction 显示方向 -------
  // #region
  get direction() {
    return this.getAttribute("direction") || "horizontal";
  }
  set direction(t) {
    this.setAttribute("direction", t);
  }
  connectedCallback() {
    this.title = this.title, this.col = this.col, this.border = this.border, this.direction = this.direction;
    const t = this.querySelectorAll("ea-descriptions-item");
    w(this, l, $).call(this, t), w(this, l, v).call(this);
  }
}
b = new WeakMap(), h = new WeakMap(), l = new WeakSet(), // #endregion
// ------- end -------
$ = function(t) {
  var c, d, y;
  const r = Number(t.length);
  for (let s = 0; s < r; s += 3) {
    let T = 0;
    const p = document.createElement("tbody");
    switch (p.part = "table-tbody", this.direction) {
      case "horizontal": {
        const n = document.createElement("tr");
        n.part = "table-tr";
        for (let a = s; a < this.col + s; a++) {
          const o = Number((c = t[a]) == null ? void 0 : c.getAttribute("span")) || 1;
          if (T + o > this.col || !t[a]) break;
          n.innerHTML += k(t[a], o, this.border);
        }
        p.appendChild(n);
        break;
      }
      case "vertical": {
        const n = document.createElement("tr"), a = document.createElement("tr");
        n.part = "table-tr", a.part = "table-tr";
        for (let o = s; o < this.col + s; o++) {
          const u = Number((d = t[o]) == null ? void 0 : d.getAttribute("span")) || 1;
          if (T + u > this.col || !t[o]) break;
          n.innerHTML += H(t[o].getAttribute("label"), this.border), a.innerHTML += L(t[o].innerHTML, this.border, u);
        }
        p.appendChild(n), p.appendChild(a);
        break;
      }
    }
    g(this, b).appendChild(p);
  }
  t.forEach((s) => {
    s.remove();
  }), (y = this.shadowRoot) == null || y.querySelectorAll("[slot]").forEach((s) => {
    s.remove();
  });
}, v = function() {
  var r;
  ((r = this.shadowRoot) == null ? void 0 : r.querySelector("ea-icon")) && (this.shadowRoot.innerHTML += `
                <link rel="stylesheet" href="${new URL("data:text/css;base64,QGltcG9ydCAiLi9jc3MvZm9udGVsbG8uY3NzIjs=", import.meta.url).href}">
            `);
};
customElements.get("ea-descriptions") || customElements.define("ea-descriptions", S);
export {
  S as EaDescriptions
};
