var $ = (d) => {
  throw TypeError(d);
};
var B = (d, b, e) => b.has(d) || $("Cannot " + e);
var o = (d, b, e) => (B(d, b, "read from private field"), e ? e.call(d) : b.get(d)), h = (d, b, e) => b.has(d) ? $("Cannot add the same private member more than once") : b instanceof WeakSet ? b.add(d) : b.set(d, e), _ = (d, b, e, t) => (B(d, b, "write to private field"), t ? t.call(d, e) : b.set(d, e), e), u = (d, b, e) => (B(d, b, "access private method"), e);
import { B as U } from "./Base.js";
import "./index3.js";
import { c as f } from "./createElement.js";
import "./ea-table-column.js";
import "./ea-checkbox.js";
import { t as D } from "./timeout.js";
const X = `
.ea-table_wrap,
.ea-table_fixed-column {
  position: relative;
  background-color: #fff;
  overflow: hidden;
}
.ea-table_wrap .ea-table_header-wrap .ea-table_header,
.ea-table_wrap .ea-table_body-wrap .ea-table_main,
.ea-table_wrap .ea-table_main,
.ea-table_fixed-column .ea-table_header-wrap .ea-table_header,
.ea-table_fixed-column .ea-table_body-wrap .ea-table_main,
.ea-table_fixed-column .ea-table_main {
  position: relative;
  box-sizing: border-box;
  padding: 12px 0;
  width: 100%;
  min-width: 0;
  text-overflow: ellipsis;
  vertical-align: middle;
  text-align: left;
  border-collapse: collapse;
  table-layout: fixed;
}
.ea-table_wrap .ea-table_header-wrap .ea-table_header .ea-table__cell,
.ea-table_wrap .ea-table_body-wrap .ea-table_main .ea-table__cell,
.ea-table_wrap .ea-table_main .ea-table__cell,
.ea-table_fixed-column .ea-table_header-wrap .ea-table_header .ea-table__cell,
.ea-table_fixed-column .ea-table_body-wrap .ea-table_main .ea-table__cell,
.ea-table_fixed-column .ea-table_main .ea-table__cell {
  border-top: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
  box-sizing: border-box;
  padding: 8px;
  color: #606266;
}
.ea-table_wrap .ea-table_header-wrap .ea-table_header .ea-table__cell.th-cell,
.ea-table_wrap .ea-table_body-wrap .ea-table_main .ea-table__cell.th-cell,
.ea-table_wrap .ea-table_main .ea-table__cell.th-cell,
.ea-table_fixed-column .ea-table_header-wrap .ea-table_header .ea-table__cell.th-cell,
.ea-table_fixed-column .ea-table_body-wrap .ea-table_main .ea-table__cell.th-cell,
.ea-table_fixed-column .ea-table_main .ea-table__cell.th-cell {
  color: #909399;
}
.ea-table_wrap .ea-table_header-wrap .ea-table_header .ea-table__cell.is-gutter,
.ea-table_wrap .ea-table_body-wrap .ea-table_main .ea-table__cell.is-gutter,
.ea-table_wrap .ea-table_main .ea-table__cell.is-gutter,
.ea-table_fixed-column .ea-table_header-wrap .ea-table_header .ea-table__cell.is-gutter,
.ea-table_fixed-column .ea-table_body-wrap .ea-table_main .ea-table__cell.is-gutter,
.ea-table_fixed-column .ea-table_main .ea-table__cell.is-gutter {
  width: 15px;
  padding: 0;
}
.ea-table_wrap .ea-table_header-wrap .ea-table_header.border .ea-table__cell,
.ea-table_wrap .ea-table_body-wrap .ea-table_main.border .ea-table__cell,
.ea-table_wrap .ea-table_main.border .ea-table__cell,
.ea-table_fixed-column .ea-table_header-wrap .ea-table_header.border .ea-table__cell,
.ea-table_fixed-column .ea-table_body-wrap .ea-table_main.border .ea-table__cell,
.ea-table_fixed-column .ea-table_main.border .ea-table__cell {
  border: 1px solid #ebeef5;
  padding: 8px;
  color: #606266;
}
.ea-table_wrap .ea-table_header-wrap .ea-table_header.border .ea-table__cell.is-gutter,
.ea-table_wrap .ea-table_body-wrap .ea-table_main.border .ea-table__cell.is-gutter,
.ea-table_wrap .ea-table_main.border .ea-table__cell.is-gutter,
.ea-table_fixed-column .ea-table_header-wrap .ea-table_header.border .ea-table__cell.is-gutter,
.ea-table_fixed-column .ea-table_body-wrap .ea-table_main.border .ea-table__cell.is-gutter,
.ea-table_fixed-column .ea-table_main.border .ea-table__cell.is-gutter {
  width: 15px;
  padding: 0;
  min-width: none;
}
.ea-table_wrap .ea-table_header-wrap .ea-table_header.stripe .ea-table__row:nth-child(2n),
.ea-table_wrap .ea-table_body-wrap .ea-table_main.stripe .ea-table__row:nth-child(2n),
.ea-table_wrap .ea-table_main.stripe .ea-table__row:nth-child(2n),
.ea-table_fixed-column .ea-table_header-wrap .ea-table_header.stripe .ea-table__row:nth-child(2n),
.ea-table_fixed-column .ea-table_body-wrap .ea-table_main.stripe .ea-table__row:nth-child(2n),
.ea-table_fixed-column .ea-table_main.stripe .ea-table__row:nth-child(2n) {
  background-color: #fafafa;
}
.ea-table_wrap .ea-table_main,
.ea-table_fixed-column .ea-table_main {
  position: absolute;
  left: 0;
  top: 0;
}
.ea-table_wrap .ea-table_body-wrap,
.ea-table_fixed-column .ea-table_body-wrap {
  overflow-y: auto;
}
.ea-table_wrap .ea-table_body-wrap .ea-table_main .ea-table__row:hover,
.ea-table_fixed-column .ea-table_body-wrap .ea-table_main .ea-table__row:hover {
  background-color: #f5f7fa;
}
.ea-table_wrap .ea-table_body-wrap .ea-table_main .ea-table__row.is-current-row,
.ea-table_fixed-column .ea-table_body-wrap .ea-table_main .ea-table__row.is-current-row {
  background-color: #ecf5ff;
}
`;
var y, m, S, g, p, E, x, T, k, C, v, H, s, M, j, z, O, I, N, J, W, F;
class K extends U {
  constructor() {
    super();
    h(this, s);
    h(this, y);
    h(this, m);
    h(this, S);
    h(this, g);
    h(this, p);
    h(this, E);
    h(this, x);
    h(this, T);
    h(this, k);
    h(this, C);
    h(this, v);
    h(this, H);
    const e = this.attachShadow({ mode: "open" });
    e.innerHTML = `
            <div class="ea-table_wrap" part="container">
                <div class="ea-table_header-wrap" part="header-wrap">
                    <table class="ea-table_header" part="header-table">
                        <colgroup></colgroup>
                        <thead></thead>
                    </table>
                </div>
                <div class="ea-table_body-wrap" part="body-wrap">
                    <table class="ea-table_main" part="body-table">
                        <colgroup></colgroup>
                        <tbody></tbody>
                        <slot name="empty" style="display: none;"></slot>
                    </table>
                </div>
            </div>
            <slot></slot>
            <slot name="header"></slot>
            <slot name="body"></slot>
        `, this.build(e, X), _(this, y, this.shadowRoot.querySelector(".ea-table_wrap")), _(this, m, this.shadowRoot.querySelector(".ea-table_header")), _(this, S, o(this, m).querySelector(".ea-table_header colgroup")), _(this, g, o(this, m).querySelector(".ea-table_header thead")), _(this, p, this.shadowRoot.querySelector(".ea-table_main")), _(this, E, o(this, p).querySelector(".ea-table_body-wrap colgroup")), _(this, x, o(this, p).querySelector(".ea-table_body-wrap tbody")), _(this, T, this.querySelectorAll("ea-table-column"));
  }
  // ------- border 边框 -------
  // #region
  get border() {
    return this.getAttrBoolean("border");
  }
  set border(e) {
    this.setAttribute("border", e), o(this, y).classList.toggle("border", e), o(this, m).classList.toggle("border", e), o(this, p).classList.toggle("border", e);
  }
  // #endregion
  // ------- end -------
  // ------- stripe 斑马线条纹 -------
  // #region
  get stripe() {
    return this.getAttrBoolean("stripe");
  }
  set stripe(e) {
    this.setAttribute("stripe", e), o(this, y).classList.toggle("stripe", e);
  }
  // #endregion
  // ------- end -------
  // ------- height 表格高度 -------
  // #region
  get height() {
    return this.getAttrNumber("height");
  }
  set height(e) {
    if (this.setAttribute("height", e), e) {
      const t = this.shadowRoot.querySelector(".ea-table_body-wrap");
      t.style.height = `${e}px`;
    } else o(this, y).style.height = "";
  }
  // #endregion
  // ------- end -------
  // ------- highlight-current-row 当前行高亮 -------
  // #region
  get highlightCurrentRow() {
    return this.getAttrBoolean("highlight-current-row") || !1;
  }
  set highlightCurrentRow(e) {
    this.setAttribute("highlight-current-row", e);
  }
  // #endregion
  // ------- end -------
  // ------- currentRow 当前行 -------
  // #region
  get currentRow() {
    return this.getAttrNumber("current-row") || 0;
  }
  set currentRow(e) {
    this.setAttribute("current-row", e);
  }
  // #endregion
  // ------- end -------
  // ------- data 数据 -------
  // #region
  get data() {
    return o(this, C) || [];
  }
  set data(e) {
    const t = JSON.stringify(e);
    let l = JSON.parse(t);
    _(this, C, l), this.renderTableBody(l);
  }
  // #endregion
  // ------- end -------
  // ------- currentRowDetail 当前行详情 -------
  // #region
  get currentRowDetail() {
    const e = this.currentRow, t = this.data[e], l = o(this, p).querySelectorAll(".ea-table__row")[e] || null;
    return { index: e, data: t, target: l };
  }
  renderTableBody(e) {
    if (o(this, x).innerHTML = "", !o(this, v)) {
      e = u(this, s, N).call(this, e, "index"), e = u(this, s, N).call(this, e, "selection");
      const l = Array.from(o(this, m).querySelectorAll("ea-table-column")).map((i, a) => i.type === "default" ? i.prop : i.type);
      e = e.map((i) => {
        const a = {};
        return l.forEach((r) => {
          r !== null && r !== "null" && typeof r < "u" && r !== "undefined" && (a[r] = i[r]);
        }), a;
      }), _(this, v, !0);
    }
    e.forEach((l, i) => {
      const a = f("tr", "ea-table__row");
      a.part = "row", Object.entries(l).forEach(([r, n]) => {
        const c = f("td", "ea-table__cell td_cell");
        c.part = "td-cell", c.innerHTML = n, r === "selection" && c.querySelector("ea-checkbox").addEventListener("change", (A) => {
          const w = this.shadowRoot.querySelectorAll("ea-checkbox"), L = Array.from(w).filter((R, q) => (R.index = q, R.checked)), G = L.map((R) => {
            const q = e[R.index];
            return delete q.selection, q;
          });
          this.dispatchEvent(new CustomEvent("body-selection-change", {
            composed: !0,
            bubbles: !0,
            detail: {
              checked: A.detail.checked,
              currentRow: a,
              currentRowData: l,
              checkedElements: L,
              checkedElementsData: G
            }
          }));
        }), a.appendChild(c);
      }), u(this, s, I).call(this, a, l), o(this, x).appendChild(a);
    }), _(this, C, e);
    const t = this.shadowRoot.querySelector('slot[name="empty"]');
    e.length > 0 ? t.style.display = "none" : t.style.display = "block", u(this, s, J).call(this);
  }
  connectedCallback() {
    this.style.position = "relative", this.border = this.border, this.stripe = this.stripe, this.height = this.height, this.highlightCurrentRow = this.highlightCurrentRow, u(this, s, O).call(this), u(this, s, j).call(this), u(this, s, W).call(this), u(this, s, F).call(this), D(() => {
      this.dispatchEvent(new CustomEvent("table-ready"));
    }, 20);
  }
}
y = new WeakMap(), m = new WeakMap(), S = new WeakMap(), g = new WeakMap(), p = new WeakMap(), E = new WeakMap(), x = new WeakMap(), T = new WeakMap(), k = new WeakMap(), C = new WeakMap(), v = new WeakMap(), H = new WeakMap(), s = new WeakSet(), // #endregion
// ------- end -------
M = function(e, t, l, i, a, r = !1) {
  const n = this.parentNode.clientWidth, c = Array.from(i.children).reduce((A, w) => A + Number(w.getAttribute("width")), 0);
  n > 0 && c <= n ? (l.style.width = `${n - a}px`, e.style.width = `${n}px`, t.style.width = `${n - a}px`, r && (e.style.width = `${n}px`)) : (l.style.width = `${n}px`, e.style.width = `${n}px`, t.style.width = `${n}px`);
}, j = function() {
  const e = this.shadowRoot.querySelector(".ea-table_header-wrap"), t = this.shadowRoot.querySelector(".ea-table_body-wrap");
  let l = null;
  const i = () => {
    u(this, s, M).call(this, o(this, y), o(this, p), o(this, m), o(this, S), l);
  };
  window.addEventListener("resize", () => {
    i();
  }), setTimeout(() => {
    l = o(this, y).getBoundingClientRect().width - o(this, p).getBoundingClientRect().width, i();
  }, 0), t.addEventListener("scroll", (a) => {
    e.style.transform = `translateX(-${t.scrollLeft}px)`;
  });
}, z = function(e, t) {
  if (t.sortable && t.type !== "selection") {
    const l = f("ea-icon");
    l.icon = "icon-angle-down", l.style.float = "right", e.appendChild(l), e.addEventListener("click", () => {
      l.color = "#5cb6ff", t.order === "asc" ? (t.order = "desc", l.icon = "icon-angle-up") : (t.order = "asc", l.icon = "icon-angle-down");
      let a = this.data.sort((r, n) => {
        const c = t.prop !== "null" ? t.prop : t.type;
        return t.order === "asc" ? String(r[c]).localeCompare(n[c]) : String(n[c]).localeCompare(r[c]);
      });
      this.renderTableBody(a), this.dispatchEvent(new CustomEvent("sort-change", {
        detail: {
          prop: t.prop,
          order: t.order
        },
        composed: !0,
        bubbles: !0
      }));
    });
  }
}, O = function() {
  this.querySelectorAll("ea-table-column"), o(this, S).innerHTML = "", o(this, E).innerHTML = "", o(this, g).innerHTML = "";
  const e = (t, l = 1) => {
    const i = f("tr");
    i.part = "row", i.setAttribute("index", l), Array.from(t).forEach((a) => {
      if (a.nodeName !== "EA-TABLE-COLUMN") return;
      const r = f("th", "ea-table__cell th-cell");
      if (r.part = "th-cell", r.setAttribute("colspan", a.colspan || 1), r.setAttribute("rowspan", a.rowspan || 1), r.appendChild(a), i.appendChild(r), a.type === "selection" && _(this, k, a.querySelector("ea-checkbox")), a.children.length > 0)
        e(a.children, ++l);
      else {
        const n = f("col");
        n.setAttribute("width", a.getAttribute("width") || 100);
        const c = f("col");
        c.setAttribute("width", a.getAttribute("width") || 100), o(this, S).appendChild(n), o(this, E).appendChild(c), o(this, g).appendChild(i), u(this, s, z).call(this, r, a);
      }
    });
  };
  e(this.children);
}, I = function(e, t) {
  e.addEventListener("click", () => {
    const l = o(this, x).querySelectorAll(".ea-table__row");
    let i = !1;
    l.forEach((a, r) => {
      a.type, a.type === "selection" && (i = !0), a.index = r, this.highlightCurrentRow && a.classList.remove("is-current-row");
    }), this.highlightCurrentRow && e.classList.add("is-current-row"), i && delete t.selection, this.currentRow = e.index, this.dispatchEvent(new CustomEvent("current-change", {
      composed: !0,
      bubbles: !0,
      detail: {
        index: e.index,
        row: e,
        data: t
      }
    }));
  });
}, N = function(e, t) {
  const l = o(this, m).querySelectorAll("ea-table-column");
  let i = 0, a = !1;
  return l.forEach((r, n) => {
    r.type === t && (i = n, a = !0);
  }), a ? e.map((r, n) => {
    const c = {}, A = Object.keys(r);
    return A.splice(i, 0, t), A.forEach((w, L) => {
      w === "index" ? c[w] = n + 1 : w === "selection" ? c[w] = "<ea-checkbox></ea-checkbox>" : c[w] = r[w];
    }), c;
  }) : e;
}, J = function() {
  const e = o(this, x).querySelectorAll("tr"), t = this.shadowRoot.querySelector('slot[name="body"]');
  D(() => {
    t.assignedNodes().length ? (e.forEach((l) => {
      const i = f("td", "ea-table__cell");
      i.part = "td-cell", Array.from(t.assignedNodes()).forEach((a) => {
        const r = a.cloneNode(!0);
        i.appendChild(r), r.addEventListener("click", () => {
          a.dispatchEvent(new CustomEvent("click", {
            bubbles: !0,
            composed: !0,
            detail: {
              row: l
            }
          }));
        });
      }), l.appendChild(i);
    }), t.style.display = "none") : t.remove();
  }, 0);
}, W = function() {
  const e = this.shadowRoot.querySelectorAll("ea-table-column");
  Array.from(e).some((t) => t.type === "selection") && (this.addEventListener("header-selection-change", (t) => {
    o(this, p).querySelectorAll("ea-checkbox").forEach((i) => {
      i.checked = t.detail.checked;
    });
  }), this.addEventListener("body-selection-change", (t) => {
    const l = o(this, g).querySelector("ea-table-column").shadowRoot.querySelector("ea-checkbox"), i = o(this, p).querySelectorAll("ea-checkbox");
    let a = Array.from(i).map((r) => r.checked);
    a.every((r) => r === !0) ? l.checked = !0 : a.every((r) => r === !1) ? l.checked = !1 : l.indeterminate = !0;
  }));
}, F = function() {
  const e = this.shadowRoot.querySelector('slot[name="header"]');
  if (e.assignedNodes().length > 0) {
    const t = o(this, g).querySelector("tr"), l = f("th", "ea-table__cell th-cell");
    l.part = "th-cell";
    let i = 1;
    Array.from(o(this, g).querySelectorAll("th")).forEach((a) => {
      a.rowSpan > i && (i = a.rowSpan);
    }), l.rowSpan = i, l.appendChild(e), t.appendChild(l);
  } else
    e.remove();
};
customElements.get("ea-table") || customElements.define("ea-table", K);
export {
  K as EaTable
};
