var O = (d, b, e) => {
  if (!b.has(d))
    throw TypeError("Cannot " + e);
};
var o = (d, b, e) => (O(d, b, "read from private field"), e ? e.call(d) : b.get(d)), n = (d, b, e) => {
  if (b.has(d))
    throw TypeError("Cannot add the same private member more than once");
  b instanceof WeakSet ? b.add(d) : b.set(d, e);
}, h = (d, b, e, t) => (O(d, b, "write to private field"), t ? t.call(d, e) : b.set(d, e), e);
var p = (d, b, e) => (O(d, b, "access private method"), e);
import { B as Z } from "./Base.js";
import "./index3.js";
import { c as m } from "./createElement.js";
import "./ea-table-column.js";
import "./ea-checkbox.js";
import { t as W } from "./timeout.js";
const ee = `
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
var f, w, x, y, _, A, g, T, k, E, C, J, L, F, B, G, N, U, H, X, $, K, v, I, D, P, M, Q, j, V;
class te extends Z {
  constructor() {
    super();
    // #endregion
    // ------- end -------
    n(this, L);
    n(this, B);
    n(this, N);
    n(this, H);
    n(this, $);
    n(this, v);
    n(this, D);
    n(this, M);
    n(this, j);
    n(this, f, void 0);
    n(this, w, void 0);
    n(this, x, void 0);
    n(this, y, void 0);
    n(this, _, void 0);
    n(this, A, void 0);
    n(this, g, void 0);
    n(this, T, void 0);
    n(this, k, void 0);
    n(this, E, void 0);
    n(this, C, void 0);
    n(this, J, void 0);
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
        `, this.build(e, ee), h(this, f, this.shadowRoot.querySelector(".ea-table_wrap")), h(this, w, this.shadowRoot.querySelector(".ea-table_header")), h(this, x, o(this, w).querySelector(".ea-table_header colgroup")), h(this, y, o(this, w).querySelector(".ea-table_header thead")), h(this, _, this.shadowRoot.querySelector(".ea-table_main")), h(this, A, o(this, _).querySelector(".ea-table_body-wrap colgroup")), h(this, g, o(this, _).querySelector(".ea-table_body-wrap tbody")), h(this, T, this.querySelectorAll("ea-table-column"));
  }
  // ------- border 边框 -------
  // #region
  get border() {
    return this.getAttrBoolean("border");
  }
  set border(e) {
    this.setAttribute("border", e), o(this, f).classList.toggle("border", e), o(this, w).classList.toggle("border", e), o(this, _).classList.toggle("border", e);
  }
  // #endregion
  // ------- end -------
  // ------- stripe 斑马线条纹 -------
  // #region
  get stripe() {
    return this.getAttrBoolean("stripe");
  }
  set stripe(e) {
    this.setAttribute("stripe", e), o(this, f).classList.toggle("stripe", e);
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
    } else
      o(this, f).style.height = "";
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
    return o(this, E) || [];
  }
  set data(e) {
    const t = JSON.stringify(e);
    let l = JSON.parse(t);
    h(this, E, l), this.renderTableBody(l);
  }
  // #endregion
  // ------- end -------
  // ------- currentRowDetail 当前行详情 -------
  // #region
  get currentRowDetail() {
    const e = this.currentRow, t = this.data[e], l = o(this, _).querySelectorAll(".ea-table__row")[e] || null;
    return { index: e, data: t, target: l };
  }
  renderTableBody(e) {
    if (o(this, g).innerHTML = "", !o(this, C)) {
      e = p(this, v, I).call(this, e, "index"), e = p(this, v, I).call(this, e, "selection");
      const l = Array.from(o(this, w).querySelectorAll("ea-table-column")).map((i, a) => i.type === "default" ? i.prop : i.type);
      e = e.map((i) => {
        const a = {};
        return l.forEach((r) => {
          r !== null && r !== "null" && typeof r < "u" && r !== "undefined" && (a[r] = i[r]);
        }), a;
      }), h(this, C, !0);
    }
    e.forEach((l, i) => {
      const a = m("tr", "ea-table__row");
      a.part = "row", Object.entries(l).forEach(([r, s]) => {
        const c = m("td", "ea-table__cell td_cell");
        c.part = "td-cell", c.innerHTML = s, r === "selection" && c.querySelector("ea-checkbox").addEventListener("change", (S) => {
          const u = this.shadowRoot.querySelectorAll("ea-checkbox"), z = Array.from(u).filter((R, q) => (R.index = q, R.checked)), Y = z.map((R) => {
            const q = e[R.index];
            return delete q.selection, q;
          });
          this.dispatchEvent(new CustomEvent("body-selection-change", {
            composed: !0,
            bubbles: !0,
            detail: {
              checked: S.detail.checked,
              currentRow: a,
              currentRowData: l,
              checkedElements: z,
              checkedElementsData: Y
            }
          }));
        }), a.appendChild(c);
      }), p(this, $, K).call(this, a, l), o(this, g).appendChild(a);
    }), h(this, E, e);
    const t = this.shadowRoot.querySelector('slot[name="empty"]');
    e.length > 0 ? t.style.display = "none" : t.style.display = "block", p(this, D, P).call(this);
  }
  connectedCallback() {
    this.style.position = "relative", this.border = this.border, this.stripe = this.stripe, this.height = this.height, this.highlightCurrentRow = this.highlightCurrentRow, p(this, H, X).call(this), p(this, B, G).call(this), p(this, M, Q).call(this), p(this, j, V).call(this), W(() => {
      this.dispatchEvent(new CustomEvent("table-ready"));
    }, 20);
  }
}
f = new WeakMap(), w = new WeakMap(), x = new WeakMap(), y = new WeakMap(), _ = new WeakMap(), A = new WeakMap(), g = new WeakMap(), T = new WeakMap(), k = new WeakMap(), E = new WeakMap(), C = new WeakMap(), J = new WeakMap(), L = new WeakSet(), F = function(e, t, l, i, a, r = !1) {
  const s = this.parentNode.clientWidth, c = Array.from(i.children).reduce((S, u) => S + Number(u.getAttribute("width")), 0);
  s > 0 && c <= s ? (l.style.width = `${s - a}px`, e.style.width = `${s}px`, t.style.width = `${s - a}px`, r && (e.style.width = `${s}px`)) : (l.style.width = `${s}px`, e.style.width = `${s}px`, t.style.width = `${s}px`);
}, B = new WeakSet(), G = function() {
  const e = this.shadowRoot.querySelector(".ea-table_header-wrap"), t = this.shadowRoot.querySelector(".ea-table_body-wrap");
  let l = null;
  const i = () => {
    p(this, L, F).call(this, o(this, f), o(this, _), o(this, w), o(this, x), l);
  };
  window.addEventListener("resize", () => {
    i();
  }), setTimeout(() => {
    l = o(this, f).getBoundingClientRect().width - o(this, _).getBoundingClientRect().width, i();
  }, 0), t.addEventListener("scroll", (a) => {
    e.style.transform = `translateX(-${t.scrollLeft}px)`;
  });
}, N = new WeakSet(), U = function(e, t) {
  if (t.sortable && t.type !== "selection") {
    const l = m("ea-icon");
    l.icon = "icon-angle-down", l.style.float = "right", e.appendChild(l), e.addEventListener("click", () => {
      l.color = "#5cb6ff", t.order === "asc" ? (t.order = "desc", l.icon = "icon-angle-up") : (t.order = "asc", l.icon = "icon-angle-down");
      let a = this.data.sort((r, s) => {
        const c = t.prop !== "null" ? t.prop : t.type;
        return t.order === "asc" ? String(r[c]).localeCompare(s[c]) : String(s[c]).localeCompare(r[c]);
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
}, H = new WeakSet(), X = function() {
  this.querySelectorAll("ea-table-column"), o(this, x).innerHTML = "", o(this, A).innerHTML = "", o(this, y).innerHTML = "";
  const e = (t, l = 1) => {
    const i = m("tr");
    i.part = "row", i.setAttribute("index", l), Array.from(t).forEach((a) => {
      if (a.nodeName !== "EA-TABLE-COLUMN")
        return;
      const r = m("th", "ea-table__cell th-cell");
      if (r.part = "th-cell", r.setAttribute("colspan", a.colspan || 1), r.setAttribute("rowspan", a.rowspan || 1), r.appendChild(a), i.appendChild(r), a.type === "selection" && h(this, k, a.querySelector("ea-checkbox")), a.children.length > 0)
        e(a.children, ++l);
      else {
        const s = m("col");
        s.setAttribute("width", a.getAttribute("width") || 100);
        const c = m("col");
        c.setAttribute("width", a.getAttribute("width") || 100), o(this, x).appendChild(s), o(this, A).appendChild(c), o(this, y).appendChild(i), p(this, N, U).call(this, r, a);
      }
    });
  };
  e(this.children);
}, $ = new WeakSet(), K = function(e, t) {
  e.addEventListener("click", () => {
    const l = o(this, g).querySelectorAll(".ea-table__row");
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
}, v = new WeakSet(), I = function(e, t) {
  const l = o(this, w).querySelectorAll("ea-table-column");
  let i = 0, a = !1;
  return l.forEach((r, s) => {
    r.type === t && (i = s, a = !0);
  }), a ? e.map((r, s) => {
    const c = {}, S = Object.keys(r);
    return S.splice(i, 0, t), S.forEach((u, z) => {
      u === "index" ? c[u] = s + 1 : u === "selection" ? c[u] = "<ea-checkbox></ea-checkbox>" : c[u] = r[u];
    }), c;
  }) : e;
}, D = new WeakSet(), P = function() {
  const e = o(this, g).querySelectorAll("tr"), t = this.shadowRoot.querySelector('slot[name="body"]');
  W(() => {
    t.assignedNodes().length ? (e.forEach((l) => {
      const i = m("td", "ea-table__cell");
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
}, M = new WeakSet(), Q = function() {
  const e = this.shadowRoot.querySelectorAll("ea-table-column");
  Array.from(e).some((t) => t.type === "selection") && (this.addEventListener("header-selection-change", (t) => {
    o(this, _).querySelectorAll("ea-checkbox").forEach((i) => {
      i.checked = t.detail.checked;
    });
  }), this.addEventListener("body-selection-change", (t) => {
    const l = o(this, y).querySelector("ea-table-column").shadowRoot.querySelector("ea-checkbox"), i = o(this, _).querySelectorAll("ea-checkbox");
    let a = Array.from(i).map((r) => r.checked);
    a.every((r) => r === !0) ? l.checked = !0 : a.every((r) => r === !1) ? l.checked = !1 : l.indeterminate = !0;
  }));
}, j = new WeakSet(), V = function() {
  const e = this.shadowRoot.querySelector('slot[name="header"]');
  if (e.assignedNodes().length > 0) {
    const t = o(this, y).querySelector("tr"), l = m("th", "ea-table__cell th-cell");
    l.part = "th-cell";
    let i = 1;
    Array.from(o(this, y).querySelectorAll("th")).forEach((a) => {
      a.rowSpan > i && (i = a.rowSpan);
    }), l.rowSpan = i, l.appendChild(e), t.appendChild(l);
  } else
    e.remove();
};
customElements.get("ea-table") || customElements.define("ea-table", te);
export {
  te as EaTable
};
