import { E as k } from "../core/EaBase.ts.js";
import { q as C, C as $, c as H, a as _, p as v, l as g } from "../core/decorator.js";
import { h as S } from "../utils/html.ts.js";
import "./ea-empty.js";
import { s as N } from "../css/ea-table.style.js";
import { c as M } from "../utils/bem.ts.js";
import { E as D } from "../utils/Enum.ts.js";
import { s as O } from "../css/ea-table-column.style.js";
class j extends Event {
  constructor(e) {
    super("ea-cell-click", { bubbles: !0, composed: !0 }), this.detail = e;
  }
}
class F extends Event {
  constructor(e) {
    super("ea-cell-contextmenu", { bubbles: !0, composed: !0 }), this.detail = e;
  }
}
class I extends Event {
  constructor(e) {
    super("ea-cell-dblclick", { bubbles: !0, composed: !0 }), this.detail = e;
  }
}
class B extends Event {
  constructor(e) {
    super("ea-cell-mouse-leave", { bubbles: !0, composed: !0 }), this.detail = e;
  }
}
class K extends Event {
  constructor(e) {
    super("ea-current-change", { bubbles: !0, composed: !0 }), this.detail = e;
  }
}
class U extends Event {
  constructor(e) {
    super("ea-header-click", { bubbles: !0, composed: !0 }), this.detail = e;
  }
}
class W extends Event {
  constructor(e) {
    super("ea-header-contextmenu", { bubbles: !0, composed: !0 }), this.detail = e;
  }
}
class G extends Event {
  constructor(e) {
    super("ea-cell-mouse-enter", { bubbles: !0, composed: !0 }), this.detail = e;
  }
}
class z extends Event {
  constructor(e) {
    super("ea-row-click", { bubbles: !0, composed: !0 }), this.detail = e;
  }
}
class V extends Event {
  constructor(e) {
    super("ea-row-contextmenu", { bubbles: !0, composed: !0 }), this.detail = e;
  }
}
class J extends Event {
  constructor(e) {
    super("ea-row-dblclick", { bubbles: !0, composed: !0 }), this.detail = e;
  }
}
class Q extends Event {
  constructor(e) {
    super("ea-select-all", { bubbles: !0, composed: !0 }), this.detail = e;
  }
}
class X extends Event {
  constructor(e) {
    super("ea-select", { bubbles: !0, composed: !0 }), this.detail = e;
  }
}
class Y extends Event {
  constructor(e) {
    super("ea-selection-change", { bubbles: !0, composed: !0 }), this.detail = e;
  }
}
class Z extends Event {
  constructor(e) {
    super("ea-sort-change", { bubbles: !0, composed: !0 }), this.detail = e;
  }
}
class tt extends Event {
  constructor(e) {
    super("ea-template-cell-click", { bubbles: !0, composed: !0 }), this.detail = e;
  }
}
const A = (t, e) => t && (typeof e == "string" || typeof e == "number" || typeof e == "boolean") ? `${t}="${e}"` : Array.isArray(e) ? `${t}="${e.join(" ")}"` : typeof e == "object" && e ? Object.entries(e).map(([a, s]) => A(a, s)).join(" ") : typeof e == "function" ? `${t}="${e()}"` : "", et = (t) => typeof t == "string" || typeof t == "number" || typeof t == "boolean" ? String(t) : Array.isArray(t) ? t.join("") : "", f = (t, e, a, s) => {
  const o = ["input"];
  return `<${t} ${A("class", e)} ${a ? Object.entries(a).map(([n, i]) => A(n, i)).join(" ") : ""}${o.includes(t) ? "/>" : `${`>
    ${et(s)}
  </${t}>`}`}`;
}, st = (t) => f(
  "colgroup",
  "ea-table__colgroup",
  {
    part: "colgroup"
  },
  t.map(
    (e) => f(
      "col",
      "ea-table__col",
      {
        width: e.width,
        part: "col"
      },
      null
    )
  )
), at = (t) => f(
  "tfoot",
  "ea-table__tfoot",
  {
    part: "tfoot"
  },
  f(
    "tr",
    "ea-table__tr",
    {
      part: "tfoot-tr"
    },
    t.map(
      (e, a) => f(
        "td",
        `ea-table__td ${e.fixed && e.fixed !== "false" ? ` is-fixed fixed-${e.fixed}` : ""}`,
        {
          part: "tfoot-td",
          "data-scope": e.prop,
          role: "cell",
          "aria-colindex": String(a + 1)
        },
        null
      )
    )
  )
), ot = (t) => f("button", "ea-table__sort-wrapper", { type: "button" }, [
  f("span", null, {}, t),
  f(
    "span",
    "ea-table__sort",
    { "aria-hidden": "true" },
    [
      f("ea-icon", "ea-table__sort-icon", {
        part: "asc-icon",
        name: "angle-up",
        size: "small"
      }, null),
      f("ea-icon", "ea-table__sort-icon", {
        part: "desc-icon",
        name: "angle-down",
        size: "small"
      }, null)
    ]
  )
]), rt = () => f(
  "ea-checkbox",
  "ea-table__checkbox",
  {
    "data-type": "selection",
    part: "checkbox"
  },
  null
), nt = () => "", lt = (t) => {
  const e = (l) => l === "selection" ? rt() : l === "index" ? nt() : null, a = (l, r) => l ? ot(r) : null;
  let s = null;
  const o = t.label || t.prop || "", n = e(t.type), i = a(t.sortable, o);
  return n ? s = n : i ? s = i : t.header ? s = t.header : s = o, f(
    "th",
    `ea-table__th${t.fixed && t.fixed !== "false" ? ` is-fixed fixed-${t.fixed}` : ""}${t.sortable ? " is-sortable" : ""}${t.width ? " is-width" : ""}`.trim(),
    {
      part: "thead-th",
      scope: "col",
      colspan: t.colspan,
      rowspan: t.rowspan,
      style: [t.width ? `--ea-table-cell-width: ${t.width}` : ""],
      "data-scope": t.prop || "",
      "data-prop": t.prop || "",
      "data-order": "asc",
      "aria-sort": t.sortable ? "none" : void 0,
      "aria-label": t.type === "selection" ? "Select all" : t.type === "index" ? "Index" : void 0
    },
    s
  );
}, it = (t) => t.map(
  (e) => f(
    "tr",
    "ea-table__tr is-thead",
    {
      part: "thead-tr"
    },
    e.map(lt)
  )
), ct = (t) => {
  const e = t.reduce((a, s) => (a[s.depth] || (a[s.depth] = []), a[s.depth].push(s), a), []);
  return f(
    "thead",
    "ea-table__thead",
    {
      part: "thead"
    },
    it(e)
  );
};
var ht = Object.defineProperty, dt = Object.getOwnPropertyDescriptor, d = (t, e, a, s) => {
  for (var o = s > 1 ? void 0 : s ? dt(e, a) : e, n = t.length - 1, i; n >= 0; n--)
    (i = t[n]) && (o = (s ? i(e, a, o) : i(o)) || o);
  return s && o && ht(e, a, o), o;
};
const P = "ea-table", x = M(P);
let c = class extends k {
  constructor() {
    super(...arguments), this.stripe = !1, this.border = !1, this.height = "", this.maxHeight = "", this.highlightCurrentRow = !1, this.showSummary = !1, this.data = [], this.selectable = null, this.indexMethod = null, this.summaryMethod = null, this._selectAbortController = null, this._mountPromise = new Promise((t) => {
      this._mountResolve = t;
    }), this._isSettingData = !1, this._states = {
      isDataRendered: !1,
      currentRow: {
        target: null,
        value: {}
      },
      columns: [],
      originData: [],
      dataSource: /* @__PURE__ */ new WeakMap(),
      dataIndex: /* @__PURE__ */ new WeakMap(),
      rowStyleHandler: null
    }, this.setData = async (t) => {
      var i, l;
      if (this._isSettingData) return;
      this._isSettingData = !0, await customElements.whenDefined("ea-table"), await customElements.whenDefined("ea-table-column"), await this._mountPromise, this._states.columns.length === 0 && this._handleTableStructRender(), this.__prop_data = t;
      const e = document.createDocumentFragment(), a = document.createElement("tr");
      (i = a.part) == null || i.add("tbody-tr"), a.className = "ea-table__tr";
      const s = this._states.columns.filter(
        (r) => !r.template || r.template instanceof HTMLTemplateElement
      ), o = this._thead.querySelectorAll("tr").length, n = {
        selection: () => S(
          '<ea-checkbox class="ea-table__selection" data-type="selection"></ea-checkbox>'
        ),
        index: () => S('<span class="ea-table__index" data-type="index"></span>')
      };
      if ((l = this._selectAbortController) == null || l.abort(), this._selectAbortController = new AbortController(), this._states.isDataRendered = !1, this._tbody.innerHTML = "", this._states.dataSource = /* @__PURE__ */ new WeakMap(), this._states.originData = t, s.forEach((r, p) => {
        var w, T;
        const h = a, { template: b } = r, u = document.createElement("td");
        (w = u.part) == null || w.add("tbody-td"), u.className = "ea-table__td", u.setAttribute("role", "cell"), u.setAttribute("aria-colindex", String(p + 1));
        const E = r.fixed && r.fixed !== "false";
        if (u.classList.toggle("is-fixed", !!E), u.classList.toggle(`fixed-${r.fixed}`, !!E), u.classList.toggle(
          `ea-table__cell--align-${r.align}`,
          !!r.align
        ), r.width && u.style.setProperty("--ea-table-cell-width", r.width), b) {
          const R = b.content.cloneNode(!0);
          R.querySelectorAll("*").forEach((q) => {
            q.setAttribute("data-template-cell", "");
          }), u.appendChild(R);
        } else r.type ? u.innerHTML = ((T = n[r.type]) == null ? void 0 : T.call(n)) || "" : u.setAttribute("data-scope", r.prop || "");
        h.appendChild(u);
      }), t.forEach((r, p) => {
        const h = a.cloneNode(!0);
        if (h.setAttribute("data-index", String(p)), h.setAttribute("aria-rowindex", String(p + o + 1)), typeof this.selectable == "function") {
          const b = !this.selectable(r), u = h.querySelector(
            'ea-checkbox[data-type="selection"]'
          );
          u && u.toggleAttribute("disabled", b);
        }
        if (s.some((b) => b.type === "index") && typeof this.indexMethod == "function") {
          const b = h.querySelector(".ea-table__index");
          b && (b.textContent = String(this.indexMethod(p)));
        }
        h.querySelectorAll("[data-scope]").forEach((b) => {
          const u = b.getAttribute("data-scope"), E = s.find((w) => w.prop === u);
          E ? b.textContent = String(
            r[E.prop] ?? ""
          ) : u && u in r && (b.textContent = String(
            r[u] ?? ""
          ));
        }), e.appendChild(h), this._states.dataSource.set(h, r), r && typeof r == "object" && this._states.dataIndex.set(r, h);
      }), this.showSummary) {
        const r = this._tfoot.querySelectorAll(
          ".ea-table__td[data-scope]"
        ), h = (typeof this.summaryMethod == "function" ? this.summaryMethod : this._defaultSummaryMethod)({ columns: s, data: t });
        r.forEach((b, u) => {
          b.textContent = String(h[u] ?? "");
        });
      }
      this._tbody.appendChild(e), this._handleFixedColumn(), this._handleScroll(), this._container.setAttribute("aria-rowcount", String(t.length + o)), this._container.setAttribute("aria-colcount", String(s.length)), this.updateContainerClasslist(), this._states.isDataRendered = !0, this._applyRowStylePart(), this.emit("ea-table-data-rendered"), this._isSettingData = !1;
    }, this.sort = (t, e = "asc") => {
      const a = this._tbody, s = document.createDocumentFragment(), o = a.nextElementSibling;
      s.appendChild(a), [...s.querySelectorAll("tr")].sort((i, l) => {
        const r = this._states.dataSource.get(i), p = this._states.dataSource.get(l);
        return e === "asc" ? String(r[t]).localeCompare(String(p[t])) : String(p[t]).localeCompare(String(r[t]));
      }).forEach((i) => {
        a.appendChild(i);
      }), this._container.insertBefore(s, o), this.dispatchEvent(
        new Z({
          prop: t,
          order: e
        })
      );
    }, this.setRowStylePart = (t) => {
      this._states.rowStyleHandler = t, this._states.isDataRendered && this._applyRowStylePart();
    }, this.toggleRowSelection = (t, e, a = !0) => {
      if (!this._states.columns.some(
        (l) => l.type === "selection"
      )) return;
      const o = this._states.dataIndex.get(t);
      if (!o) return;
      const n = `ea-checkbox[data-type="selection"]${a ? "" : ":not([disabled])"}`, i = o.querySelector(n);
      i && (e !== void 0 ? i.toggleAttribute("checked", e) : i.toggleAttribute("checked", !i.hasAttribute("checked")), this._handleSelectionUpdate(), this._dispatchSelectionChangeEvent());
    }, this.clearSelection = () => {
      [
        ...this._container.querySelectorAll('ea-checkbox[data-type="selection"]')
      ].forEach((e) => {
        e.removeAttribute("checked"), e.removeAttribute("indeterminate");
      }), this._dispatchSelectionChangeEvent();
    };
  }
  _defaultSummaryMethod(t) {
    const { columns: e, data: a } = t, s = [];
    return e.forEach((o, n) => {
      if (n === 0) {
        s[n] = "Sum";
        return;
      }
      const i = a.map(
        (l) => Number(l[o.prop])
      );
      i.every((l) => Number.isNaN(l)) ? s[n] = "" : s[n] = i.reduce((l, r) => {
        const p = Number(r);
        return Number.isNaN(p) ? l : l + r;
      }, 0);
    }), s;
  }
  html() {
    return `
      <slot id='defaultSlot' part='default-slot'></slot>
      <table class='ea-table' part='container' role='table' aria-label='Data Table' aria-rowcount='0' aria-colcount='0'>
        <colgroup class='ea-table__colgroup' part='colgroup'></colgroup>
        <thead class='ea-table__thead' part='thead'></thead>
        <tbody class='ea-table__tbody' part='tbody'></tbody>
        <tfoot class='ea-table__tfoot' part='tfoot'></tfoot>
      </table>
      <slot class="ea-table__empty" name="empty">No Data</slot>
    `;
  }
  updateContainerClasslist() {
    const t = x(
      {},
      {
        stripe: this.stripe,
        border: this.border,
        "sticky-header": CSS.supports("height", this.height) || CSS.supports("height", this.maxHeight),
        data: this._states.originData.length > 0
      }
    );
    return this._container.className = t, this._emptySlot.className = x.e("empty") + (this._states.originData.length > 0 ? " is-data" : ""), t;
  }
  /** 渲染表格结构（colgroup、thead、tfoot） */
  _handleTableStructRender() {
    const t = [...this._columnNodes].map(
      (o) => o.getColumnTree
    );
    this._states.columns = t;
    const e = st(t), a = ct(t), s = at(t);
    this._colgroup.innerHTML = e, this._thead.innerHTML = a, this._tfoot.innerHTML = s;
  }
  $mount() {
    this._mountResolve();
  }
  async $mounted() {
    await customElements.whenDefined("ea-table-column"), this._handleTableStructRender();
  }
  /** 为行元素添加自定义样式 part */
  _applyRowStylePart() {
    const t = this._states.rowStyleHandler;
    if (!t || !this._tbody) return;
    const e = [
      ...this._tbody.querySelectorAll("tr")
    ];
    if (typeof t == "function")
      e.forEach((a, s) => {
        var n;
        const o = t({
          row: this._states.dataSource.get(a),
          rowIndex: s
        });
        o && ((n = a.part) == null || n.add(o));
      });
    else if (typeof t == "string") {
      if (!t) return;
      e.forEach((a) => {
        var s;
        (s = a.part) == null || s.add(t);
      });
    }
  }
  getCurrentRow() {
    return this._states.currentRow;
  }
  setCurrentRow(t) {
    let e = null, a = null;
    t && typeof t == "object" && (e = this._states.dataIndex.get(t) || null, a = t), e && a ? (this._setHighlightCurrentRowStyle(e, this._states.currentRow.target), this._states.currentRow.target = e, this._states.currentRow.value = a) : (this._unsetHighlightCurrentRowStyle(this._states.currentRow.target), this._states.currentRow.value = null, this._states.currentRow.target = null);
  }
  /** 获取当前所有选中行的数据 */
  _getCurrentSelectionRows() {
    return [
      ...this._tbody.querySelectorAll(
        'ea-checkbox[data-type="selection"][checked]'
      )
    ].map(
      (t) => this._states.dataSource.get(
        t.closest('.ea-table__tr[part="tbody-tr"]')
      )
    );
  }
  /** 更新表头全选复选框的状态（选中、半选、未选）并同步行 aria-selected */
  _handleSelectionUpdate() {
    const t = this._thead.querySelector(
      'ea-checkbox[data-type="selection"]'
    );
    if (!t) return;
    const a = [
      ...this._tbody.querySelectorAll(
        'ea-checkbox[data-type="selection"]:not([disabled])'
      )
    ].every(
      (o) => o.hasAttribute("checked")
    ), s = [
      ...this._tbody.querySelectorAll('ea-checkbox[data-type="selection"]')
    ].some((o) => o.hasAttribute("checked"));
    a ? (t.toggleAttribute("checked", !0), t.removeAttribute("indeterminate")) : s ? (t.removeAttribute("checked"), t.toggleAttribute("indeterminate", !0)) : (t.removeAttribute("checked"), t.removeAttribute("indeterminate")), this._tbody.querySelectorAll("tr[part='tbody-tr']").forEach((o) => {
      const n = o.querySelector(
        'ea-checkbox[data-type="selection"]'
      );
      n && o.setAttribute(
        "aria-selected",
        String(n.hasAttribute("checked"))
      );
    });
  }
  /** 处理固定列的样式计算和偏移量设置 */
  _handleFixedColumn() {
    const t = [
      ...this._container.querySelectorAll(".is-fixed")
    ], e = t.filter(
      (l) => l.classList.contains("fixed-left")
    ), a = t.filter(
      (l) => l.classList.contains("fixed-right")
    ), s = (l) => {
      const r = l.filter((h) => {
        var b;
        return (b = h.part) == null ? void 0 : b.contains("thead-th");
      });
      if (r.length <= 1) return [l];
      const p = [];
      for (let h = 0; h < l.length; h += r.length)
        p.push(l.slice(h, h + r.length));
      return p.reduce(
        (h, b) => (b.forEach((u, E) => {
          h[E] = [...h[E] || [], u];
        }), h),
        Array(r.length).fill([])
      );
    }, o = (l) => {
      if (!l.length) return;
      const r = l.slice(-1)[0];
      l.forEach((p, h) => {
        const b = l[h - 1] || [];
        p.forEach((u) => {
          r && b[0] && u.style.setProperty(
            "--ea-table-fixed-x",
            `${h * b[0].offsetWidth}px`
          );
        });
      }), r.forEach((p) => {
        p.classList.add("is-last");
      });
    }, [n, i] = [
      s(e),
      s(a).reverse()
    ];
    o(n), o(i);
  }
  /**
   * 设置高亮当前行样式
   * @param currentRow - 当前行元素
   * @param oldRow - 之前高亮的行元素
   */
  _setHighlightCurrentRowStyle(t, e = this._states.currentRow.target) {
    var a, s;
    this.highlightCurrentRow && ((a = e == null ? void 0 : e.classList) == null || a.remove("is-current"), (s = t == null ? void 0 : t.classList) == null || s.add("is-current"));
  }
  /**
   * 移除高亮当前行样式
   * @param currentRow - 需要移除高亮的行元素
   */
  _unsetHighlightCurrentRowStyle(t) {
    var e;
    !this.highlightCurrentRow || !t || (e = t == null ? void 0 : t.classList) == null || e.remove("is-current");
  }
  /** 派发选中项变化事件 */
  _dispatchSelectionChangeEvent() {
    const t = this._getCurrentSelectionRows();
    this.dispatchEvent(
      new Y({
        newSelection: t
      })
    );
  }
  _handleRowMouseDown(t) {
    var o;
    const e = t.target.closest(
      "tr[part='tbody-tr']"
    );
    if ((o = this._selectAbortController) == null || o.abort(), !e) return;
    const a = () => {
      var n;
      (n = this._selectAbortController) == null || n.abort();
    }, s = (n) => {
      const i = n, l = i.target.closest(
        "tr[part='tbody-tr']"
      ), r = i.target.closest(
        "td[part='tbody-td']"
      );
      if (a(), l !== e) return;
      const p = this._states.dataSource.get(e), h = r == null ? void 0 : r.getAttribute("data-scope");
      if (this._setHighlightCurrentRowStyle(e, this._states.currentRow.target), this._states.currentRow.target = e, this._states.currentRow.value = p, this.dispatchEvent(
        new z({
          target: e,
          column: h || "",
          row: p
        })
      ), this.dispatchEvent(
        new K({
          target: e,
          column: h || "",
          row: p
        })
      ), r) {
        this.dispatchEvent(
          new j({
            cell: r,
            column: h || "",
            row: p
          })
        );
        const b = i.target.closest(
          "[data-template-cell]"
        );
        if (b) {
          const u = Number(e.getAttribute("data-index"));
          this.dispatchEvent(
            new tt({
              target: b,
              rowData: p,
              rowIndex: u,
              originalEvent: i
            })
          );
        }
      }
    };
    this._selectAbortController = new AbortController(), this.addEventListener("mouseout", a, {
      once: !0,
      signal: this._selectAbortController.signal
    }), this._container.addEventListener("mouseup", s, {
      once: !0,
      signal: this._selectAbortController.signal
    });
  }
  /**
   * 从鼠标事件中提取行、单元格、数据和列键信息
   * @param e - 鼠标事件
   * @param part - 表格区域类型
   * @returns 包含 cell、row、data、columnKey 的对象
   */
  _getMouseEventData(t, e) {
    const a = t.target.closest(
      `tr[part='t${e}-tr']`
    );
    if (!a) return { cell: null, row: null, data: null, columnKey: null };
    const s = e === "body" ? "td" : "th", o = t.target.closest(
      `${s}[part='t${e}-${s}']`
    ), n = this._states.dataSource.get(a), i = (o == null ? void 0 : o.getAttribute("data-scope")) || null;
    return {
      cell: o || null,
      row: a,
      data: n,
      columnKey: i
    };
  }
  _handleRowDblClick(t) {
    const { row: e, cell: a, data: s, columnKey: o } = this._getMouseEventData(t, "body");
    e && (this.dispatchEvent(
      new J({
        target: e,
        column: o || "",
        row: s
      })
    ), this.dispatchEvent(
      new I({
        cell: a,
        column: o || "",
        row: s
      })
    ));
  }
  _handleRowContextmenu(t) {
    const { row: e, cell: a, data: s, columnKey: o } = this._getMouseEventData(t, "body");
    e && (this.dispatchEvent(
      new V({
        target: e,
        column: o || "",
        row: s
      })
    ), this.dispatchEvent(
      new F({
        cell: a,
        column: o || "",
        row: s
      })
    ));
  }
  _handleScroll() {
    const t = [
      ...this._container.querySelectorAll(".is-fixed")
    ], { scrollLeft: e } = this._container, a = Math.floor(this._container.scrollWidth - this._container.offsetWidth) - 1;
    e < a ? e ? t.forEach((s) => {
      s.classList.add("not-origin-position");
    }) : t.forEach((s) => {
      s.classList.toggle(
        "not-origin-position",
        !s.classList.contains("fixed-left")
      );
    }) : t.forEach((s) => {
      s.classList.toggle(
        "not-origin-position",
        !s.classList.contains("fixed-right")
      );
    });
  }
  _handleCellMouseEnter(t) {
    const { row: e, cell: a, data: s, columnKey: o } = this._getMouseEventData(t, "body");
    e && this.dispatchEvent(
      new G({
        column: o || "",
        row: s,
        cell: a
      })
    );
  }
  _handleCellMouseLeave(t) {
    const { row: e, cell: a, data: s, columnKey: o } = this._getMouseEventData(t, "body");
    e && this.dispatchEvent(
      new B({
        column: o || "",
        row: s,
        cell: a
      })
    );
  }
  _handleHeaderClick(t) {
    const e = t.target.closest(
      ".is-sortable"
    );
    if (e) {
      const { prop: o, order: n } = e.dataset;
      if (o) {
        const i = n === "asc" ? "desc" : "asc", l = {
          asc: e.querySelector('[part="asc-icon"]'),
          desc: e.querySelector('[part="desc-icon"]')
        };
        e.setAttribute("data-order", i), e.setAttribute("aria-sort", i === "asc" ? "ascending" : "descending"), e.querySelectorAll(".ea-table__sort-icon").forEach((r) => {
          r.classList.toggle("is-active", l[i] === r);
        }), this._thead.querySelectorAll(".is-sortable").forEach((r) => {
          r !== e && r.setAttribute("aria-sort", "none");
        }), this.sort(o, i);
      }
    }
    const { cell: a, columnKey: s } = this._getMouseEventData(t, "head");
    a && this.dispatchEvent(
      new U({
        column: s || "",
        cell: a
      })
    );
  }
  _handleHeaderContextmenu(t) {
    const { cell: e, columnKey: a } = this._getMouseEventData(t, "head");
    e && this.dispatchEvent(
      new W({
        column: a || "",
        cell: e
      })
    );
  }
  _handleSlotChange() {
    this._handleTableStructRender(), this._states.originData.length > 0 && this.setData(this._states.originData);
  }
  _handleColumnChange(t) {
    t.stopImmediatePropagation(), this._handleTableStructRender(), this._states.originData.length > 0 && this.setData(this._states.originData);
  }
  _handleSelectionChange(t) {
    const e = t.target;
    if (e.getAttribute("data-type") !== "selection") return;
    t.stopImmediatePropagation();
    const a = t, { checked: s } = a.detail || {};
    if (e.closest(".ea-table__thead")) {
      const n = [
        ...this._tbody.querySelectorAll('ea-checkbox[data-type="selection"]')
      ];
      e.toggleAttribute("checked", e.hasAttribute("checked")), n.forEach((l) => {
        l.hasAttribute("disabled") || l.toggleAttribute("checked", s);
      }), this._handleSelectionUpdate();
      const i = this._getCurrentSelectionRows();
      this.dispatchEvent(new Q({ selection: i }));
    } else {
      const n = this._getCurrentSelectionRows(), i = this._states.dataSource.get(
        e.closest('.ea-table__tr[part="tbody-tr"]')
      );
      this._handleSelectionUpdate(), this.dispatchEvent(
        new X({ selection: n, row: i })
      );
    }
    this._dispatchSelectionChangeEvent();
  }
  $beforeUnmount() {
    var t;
    (t = this._selectAbortController) == null || t.abort();
  }
};
d([
  C(x.cb())
], c.prototype, "_container", 2);
d([
  C(x.ce("thead"))
], c.prototype, "_thead", 2);
d([
  C(x.ce("tbody"))
], c.prototype, "_tbody", 2);
d([
  C(x.ce("tfoot"))
], c.prototype, "_tfoot", 2);
d([
  C(x.ce("empty"))
], c.prototype, "_emptySlot", 2);
d([
  C(x.ce("colgroup"))
], c.prototype, "_colgroup", 2);
d([
  H("ea-table-column")
], c.prototype, "_columnNodes", 2);
d([
  _({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], c.prototype, "stripe", 2);
d([
  _({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], c.prototype, "border", 2);
d([
  _({
    type: String,
    default: "",
    observer(t) {
      this.style.setProperty("--ea-table-height", t), this.updateContainerClasslist();
    }
  })
], c.prototype, "height", 2);
d([
  _({
    type: String,
    default: "",
    observer(t) {
      this.style.setProperty("--ea-table-max-height", t), this.updateContainerClasslist();
    }
  })
], c.prototype, "maxHeight", 2);
d([
  _({
    type: Boolean,
    default: !1
  })
], c.prototype, "highlightCurrentRow", 2);
d([
  _({
    type: Boolean,
    default: !1
  })
], c.prototype, "showSummary", 2);
d([
  v({
    type: Array,
    default: [],
    observer(t) {
      this._states.originData = t, this.setData(t);
    }
  })
], c.prototype, "data", 2);
d([
  v({
    type: Function,
    default: null
  })
], c.prototype, "selectable", 2);
d([
  v({
    type: Function,
    default: () => (t) => t
  })
], c.prototype, "indexMethod", 2);
d([
  v({
    type: Function,
    default: null
  })
], c.prototype, "summaryMethod", 2);
d([
  g("mousedown", ".ea-table")
], c.prototype, "_handleRowMouseDown", 1);
d([
  g("dblclick", ".ea-table")
], c.prototype, "_handleRowDblClick", 1);
d([
  g("contextmenu", ".ea-table")
], c.prototype, "_handleRowContextmenu", 1);
d([
  g("scroll", ".ea-table")
], c.prototype, "_handleScroll", 1);
d([
  g("mouseover", ".ea-table")
], c.prototype, "_handleCellMouseEnter", 1);
d([
  g("mouseout", ".ea-table")
], c.prototype, "_handleCellMouseLeave", 1);
d([
  g("click", ".ea-table__thead")
], c.prototype, "_handleHeaderClick", 1);
d([
  g("contextmenu", ".ea-table__thead")
], c.prototype, "_handleHeaderContextmenu", 1);
d([
  g("slotchange", "#defaultSlot")
], c.prototype, "_handleSlotChange", 1);
d([
  g("ea-table-column-change")
], c.prototype, "_handleColumnChange", 1);
d([
  g("change", ".ea-table")
], c.prototype, "_handleSelectionChange", 1);
c = d([
  $(P, { styles: [N] })
], c);
var ut = Object.defineProperty, pt = Object.getOwnPropertyDescriptor, y = (t, e, a, s) => {
  for (var o = s > 1 ? void 0 : s ? pt(e, a) : e, n = t.length - 1, i; n >= 0; n--)
    (i = t[n]) && (o = (s ? i(e, a, o) : i(o)) || o);
  return s && o && ut(e, a, o), o;
};
const L = "ea-table-column", bt = M(L);
let m = class extends k {
  constructor() {
    super(...arguments), this._contentObserver = null, this.type = "", this.align = "left", this.label = "", this.prop = "", this.colspan = void 0, this.width = "", this.sortable = !1, this.fixed = "false", this.option = {};
  }
  get getColumnTree() {
    const t = this.closest("ea-table"), e = [
      ...this.querySelectorAll(":scope > ea-table-column")
    ], a = this.shadowRoot.querySelector(
      'slot[name="header"]'
    ), s = this.shadowRoot.querySelector(
      "#defaultSlot"
    ), o = ["prop", "label", "width", "fixed", "sortable"];
    let n = null;
    if (e.length)
      n = e.map((l) => l.getColumnTree);
    else {
      const l = Array.from((s == null ? void 0 : s.assignedElements()) || []).map((r) => {
        var p;
        return (p = r.outerHTML) == null ? void 0 : p.trim();
      }).join("");
      if (l) {
        const r = document.createElement("template");
        r.innerHTML = S(l), n = r;
      } else
        n = null;
    }
    const i = this.colspan ?? (this.querySelectorAll("ea-table-column").length || 1);
    return {
      label: this.label,
      prop: this.prop,
      type: this.type,
      colspan: i,
      rowspan: n ? 1 : this._getMaxDepth(t) - this._getThisDepth(this, t) + 1,
      align: this.align,
      width: this.width,
      sortable: this.sortable,
      fixed: this.fixed === "" ? "left" : this.fixed,
      depth: this._getThisDepth(this, t),
      props: [...this.attributes].filter((l) => !o.includes(l.name)),
      header: (a == null ? void 0 : a.assignedElements().map((l) => {
        var r;
        return (r = l.outerHTML) == null ? void 0 : r.trim();
      }).join("")) || null,
      template: n
    };
  }
  html() {
    return `
      <div class='ea-table-column' part='container'>
        <header class='ea-table-column__label' part='label'>${this.label}[$${this.prop}]</header>
        <span class='ea-table-column__content' part='content'>
          <slot name="header"></slot>
          <slot id="defaultSlot" part="default-slot"></slot>
        </span>
      </div>
    `;
  }
  /** 获取元素相对于根节点的深度 */
  _getThisDepth(t, e) {
    let a = 0, s = t;
    for (; s !== e && s; )
      s = s.parentElement, a++;
    return a;
  }
  /** 获取表格列的最大深度 */
  _getMaxDepth(t) {
    let e = 0;
    return t == null || t.querySelectorAll("ea-table-column").forEach((a) => {
      e = Math.max(
        e,
        this._getThisDepth(a, t)
      );
    }), e;
  }
  /** 通知父组件列配置变更 */
  _notifyParent() {
    this.emit("ea-table-column-change", {
      bubbles: !0,
      composed: !0
    });
  }
  /** 设置内容变更观察器 */
  _setupContentObserver() {
    this._contentObserver = new MutationObserver(() => {
      this._notifyParent();
    }), this._contentObserver.observe(this, {
      childList: !0,
      subtree: !0,
      characterData: !0
    });
  }
  $mount() {
    this.shadowRoot.innerHTML = this.html();
  }
  $mounted() {
    this._setupContentObserver();
  }
  $beforeUnmount() {
    this._contentObserver && (this._contentObserver.disconnect(), this._contentObserver = null);
  }
};
y([
  C(bt.ce("label"))
], m.prototype, "_label", 2);
y([
  _({
    type: D(["selection", "index"]),
    default: "",
    observer(t) {
      t === "selection" && !customElements.get("ea-checkbox") && import("./ea-checkbox.js"), this._notifyParent();
    }
  })
], m.prototype, "type", 2);
y([
  _({
    type: D(["left", "center", "right"]),
    default: "left",
    observer() {
      this._notifyParent();
    }
  })
], m.prototype, "align", 2);
y([
  _({
    type: String,
    default: "",
    observer() {
      this._label && (this._label.textContent = `${this.label}[$${this.prop}]`), this._notifyParent();
    }
  })
], m.prototype, "label", 2);
y([
  _({
    type: String,
    default: "",
    observer() {
      this._label && (this._label.textContent = `${this.label}[$${this.prop}]`), this._notifyParent();
    }
  })
], m.prototype, "prop", 2);
y([
  _({
    type: Number,
    default: void 0,
    observer() {
      this._notifyParent();
    }
  })
], m.prototype, "colspan", 2);
y([
  _({
    type: String,
    default: "",
    observer() {
      this._notifyParent();
    }
  })
], m.prototype, "width", 2);
y([
  _({
    type: Boolean,
    default: !1,
    observer() {
      this._notifyParent();
    }
  })
], m.prototype, "sortable", 2);
y([
  _({
    type: D(["left", "right", "false", ""]),
    default: "false",
    observer() {
      this._notifyParent();
    }
  })
], m.prototype, "fixed", 2);
y([
  v({
    type: Object,
    default: {},
    observer() {
      this._notifyParent();
    }
  })
], m.prototype, "option", 2);
m = y([
  $(L, { styles: [O] })
], m);
const wt = { EaTable: c, EaTableColumn: m };
export {
  c as EaTable,
  m as EaTableColumn,
  wt as default
};
