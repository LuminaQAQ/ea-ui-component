var H = (a) => {
  throw TypeError(a);
};
var E = (a, t, e) => t.has(a) || H("Cannot " + e);
var s = (a, t, e) => (E(a, t, "read from private field"), e ? e.call(a) : t.get(a)), i = (a, t, e) => t.has(a) ? H("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(a) : t.set(a, e), c = (a, t, e, r) => (E(a, t, "write to private field"), r ? r.call(a, e) : t.set(a, e), e), y = (a, t, e) => (E(a, t, "access private method"), e);
import { B as G } from "./Base.js";
import { c as h } from "./createElement.js";
import "./ea-button-group.js";
import "./ea-button.js";
const J = (a = ["一", "二", "三", "四", "五", "六", "日"]) => {
  const t = h("tr");
  t.part = "table-head-row";
  const e = a.map((r) => {
    const d = h("th");
    return d.part = "table-head-item", d.innerText = r, d;
  });
  return t.append(...e), t;
};
function N() {
  const a = /* @__PURE__ */ new Date();
  return `${a.getFullYear()}-${a.getMonth() + 1}`;
}
function K(a) {
  const t = new Date(a);
  return `${t.getFullYear()}-${t.getMonth() + 1}`;
}
function I(a, t) {
  if (!a.includes(t)) return a;
  const e = a.findIndex((r, d) => {
    if (r === t) return d;
  });
  return e === 0 || e === -1 ? a : a.slice(e).concat(a.slice(0, e));
}
const O = `
.ea-calendar_wrap {
  padding: 12px 20px 35px;
}
.ea-calendar_wrap .ea-calendar-header_wrap {
  border-bottom: 1px solid #ebeef5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.5rem;
}
.ea-calendar_wrap .ea-calendar-header_wrap .ea-calendar-header_changer .ea-calendar-header_sg-changer {
  border: 1px solid #ebeef5;
  border-left: 0px none transparent;
}
.ea-calendar_wrap .ea-calendar-header_wrap .ea-calendar-header_changer .ea-calendar-header_sg-changer:first-child {
  border-left: 1px solid #ebeef5;
}
.ea-calendar_wrap .ea-calendar_calendar-wrap .ea-calendar_table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
}
.ea-calendar_wrap .ea-calendar_calendar-wrap .ea-calendar_table th {
  font-weight: 400;
  color: #606266;
  padding: 12px 0;
}
.ea-calendar_wrap .ea-calendar_calendar-wrap .ea-calendar_table td {
  border-right: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
}
.ea-calendar_wrap .ea-calendar_calendar-wrap .ea-calendar_table td.is-selected {
  color: #1989fa;
  background-color: #f2f8fe;
}
.ea-calendar_wrap .ea-calendar_calendar-wrap .ea-calendar_table td.is-today {
  color: #1989fa;
}
.ea-calendar_wrap .ea-calendar_calendar-wrap .ea-calendar_table td.is-disabled {
  pointer-events: none;
  color: #c0c4cc;
}
.ea-calendar_wrap .ea-calendar_calendar-wrap .ea-calendar_table td span {
  display: block;
  box-sizing: border-box;
  height: 85px;
  padding: 8px;
}
.ea-calendar_wrap .ea-calendar_calendar-wrap .ea-calendar_table td span .calendar-description {
  margin-top: auto;
}
.ea-calendar_wrap .ea-calendar_calendar-wrap .ea-calendar_table tr:first-child td {
  border-top: 1px solid #ebeef5;
}
.ea-calendar_wrap .ea-calendar_calendar-wrap .ea-calendar_table tr td:first-child {
  border-left: 1px solid #ebeef5;
  border-top: 1px solid #ebeef5;
}
.ea-calendar_wrap.mini {
  font-size: 10px;
  text-align: center;
}
.ea-calendar_wrap.mini .ea-calendar-header_wrap {
  justify-content: space-around;
}
.ea-calendar_wrap.mini .ea-calendar-header_wrap .ea-calendar-header_changer {
  display: none;
}
.ea-calendar_wrap.mini .ea-calendar_calendar-wrap .ea-calendar_table td span {
  height: 20px;
  padding: 4px;
}
`;
var x, p, m, v, g, M, w, L, _, o, j, q, A;
class P extends G {
  constructor() {
    super();
    i(this, o);
    i(this, x);
    i(this, p);
    i(this, m);
    i(this, v);
    i(this, g);
    i(this, M);
    i(this, w);
    i(this, L);
    i(this, _);
    const e = this.attachShadow({ mode: "open" });
    e.innerHTML = `
            <div class='ea-calendar_wrap' part='container'>
                <div class='ea-calendar-header_wrap' part='header-wrap'>
                    <span class='ea-calendar-header_content' part='header-content'></span>
                    <ea-button-group class='ea-calendar-header_changer' part='header-changer'>
                        <ea-button class='ea-calendar-header_sg-changer ea-calendar-header_changer-lastMonth' part='header-changer-lastMonth' size="small">上个月</ea-button>
                        <ea-button class='ea-calendar-header_sg-changer ea-calendar-header_changer-today' part='header-changer-today' size="small">今天</ea-button>
                        <ea-button class='ea-calendar-header_sg-changer ea-calendar-header_changer-nextMonth' part='header-changer-nextMonth' size="small">下个月</ea-button>
                    </ea-button-group>
                </div>
                <div class='ea-calendar_calendar-wrap' part='calendar-wrap'>
                    <table class='ea-calendar_table' part='table'>
                        <thead class='ea-calendar_table-head' part='table-head'></thead>
                        <tbody class='ea-calendar_table-body' part='table-body'></tbody>
                    </table>
                </div>
            </div>
        `, c(this, x, this.shadowRoot.querySelector(".ea-calendar_wrap")), c(this, m, e.querySelector(".ea-calendar-header_content")), c(this, p, e.querySelector(".ea-calendar-header_wrap")), c(this, v, e.querySelector(".ea-calendar-header_changer")), c(this, g, e.querySelector(".ea-calendar-header_changer-lastMonth")), c(this, M, e.querySelector(".ea-calendar-header_changer-today")), c(this, w, e.querySelector(".ea-calendar-header_changer-nextMonth")), c(this, L, e.querySelector(".ea-calendar_table-head")), c(this, _, e.querySelector(".ea-calendar_table-body")), this.build(e, O);
  }
  // ------- week-start 用户传入的每周起始日 -------
  // #region
  get weekStart() {
    return this.getAttribute("week-start") || "一";
  }
  set weekStart(e) {
    this.setAttribute("week-start", e), s(this, L).innerHTML = J(I(this.week, e)).innerHTML;
  }
  // #endregion
  // ------- end -------
  // ------- date 用户传入日期 -------
  // #region
  get date() {
    return this.getAttribute("date") || N();
  }
  set date(e) {
    this.setAttribute("date", e), s(this, m).innerHTML = e = isNaN(new Date(e)) ? N() : K(e), y(this, o, A).call(this, s(this, _), e, this.weekStart);
  }
  // #endregion
  // ------- end -------
  // ------- size 用户传入尺寸 -------
  // #region
  get size() {
    const e = this.getAttribute("size");
    return ["mini"].includes(e) ? e : "medium";
  }
  set size(e) {
    if (this.setAttribute("size", e), s(this, x).classList.add(e), e === "mini") {
      const r = h("span", "prev-btn");
      r.innerText = "<";
      const d = h("span", "next-btn");
      d.innerText = ">", c(this, g, r), c(this, w, d), s(this, p).insertBefore(r, s(this, p).firstChild), s(this, p).appendChild(d);
    }
  }
  // #endregion
  // ------- end -------
  get week() {
    return ["日", "一", "二", "三", "四", "五", "六"];
  }
  connectedCallback() {
    this.weekStart = this.weekStart, this.date = this.date, this.size = this.size, s(this, g).addEventListener("click", () => {
      y(this, o, q).call(this, "last");
    }), s(this, M).addEventListener("click", () => {
      this.date = `${(/* @__PURE__ */ new Date()).getFullYear()}-${(/* @__PURE__ */ new Date()).getMonth() + 1}-${(/* @__PURE__ */ new Date()).getDate()}`;
    }), s(this, w).addEventListener("click", () => {
      y(this, o, q).call(this, "next");
    });
  }
}
x = new WeakMap(), p = new WeakMap(), m = new WeakMap(), v = new WeakMap(), g = new WeakMap(), M = new WeakMap(), w = new WeakMap(), L = new WeakMap(), _ = new WeakMap(), o = new WeakSet(), /**
 * 处理日历项的选择事件。
 * 当日历项被点击时，此函数被调用。它的目的是切换所点击项的选中状态，并取消其他项的选中状态。
 * @param {HTMLElement} node - 日历项元素节点。这个节点代表日历中的一个日期单元格。
 */
j = function(e) {
  e.addEventListener("click", (r) => {
    s(this, _).querySelectorAll("td").forEach((b) => {
      b.classList.remove("is-selected");
    }), e.classList.contains("is-selected") ? e.classList.remove("is-selected") : e.classList.add("is-selected");
    const d = new Date(this.date);
    this.dispatchEvent(new CustomEvent("select", {
      detail: {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        date: Number(e.innerText),
        day: this.week[Number(e.innerText) % 7]
      }
    }));
  });
}, q = function(e) {
  const r = new Date(this.date);
  r.setMonth(r.getMonth() + (e === "next" ? 1 : -1)), this.date = `${r.getFullYear()}-${r.getMonth() + 1}-${r.getDate()}`;
}, /**
 * 根据给定的日期更新页面上的日历视图。
 * @param {HTMLElement} content - 用于展示日历的HTML元素。
 * @param {string|number|Date} date - 需要展示的月份的日期对象。
 */
A = function(e, r, d = "一") {
  r = isNaN(new Date(r)) ? /* @__PURE__ */ new Date() : new Date(r), e.innerHTML = "";
  const b = new Date(r), u = b.getMonth() + 1, n = new Date(r);
  n.setDate(1);
  const f = new Date(r);
  f.setMonth(u), f.setDate(0);
  const $ = new Date(r);
  $.setMonth(u), $.setDate(1);
  const z = I(this.week, d);
  for (let F = 0; F < 6; F++) {
    const S = h("tr");
    S.part = "table-body-row";
    for (let T = 0; T < 7; T++) {
      const { length: Y } = S.children, l = h("td");
      l.part = "table-body-cell";
      const D = h("span");
      D.part = "table-body-cell-content";
      const k = n.getDay(), C = /* @__PURE__ */ new Date();
      if (z[Y] === this.week[k] && u === n.getMonth() + 1)
        D.innerText = n.getDate(), n.setDate(n.getDate() + 1), y(this, o, j).call(this, l);
      else if (u == n.getMonth())
        D.innerText = n.getDate(), n.setDate(n.getDate() + 1), l.classList.add("is-disabled"), l.part = "table-body-cell-disabled";
      else {
        const B = T - k + 2, W = z.findIndex((R, U) => {
          if (R === "一") return U;
        });
        f.setMonth(u - 1), f.setDate(B > 0 ? k + Y - W : B), D.innerText = f.getDate(), l.part = "table-body-cell-disabled", l.classList.add("is-disabled");
      }
      new Date(this.date), n.getFullYear() === C.getFullYear() && n.getMonth() === C.getMonth() && n.getDate() === C.getDate() + 1 && (l.part = "table-body-cell-today", l.classList.add("is-today")), n.getFullYear() === b.getFullYear() && n.getMonth() === b.getMonth() && n.getDate() === b.getDate() + 1 && (l.part = "table-body-cell-selected", l.classList.add("is-selected")), l.appendChild(D), S.appendChild(l);
    }
    e.appendChild(S);
  }
};
customElements.get("ea-calendar") || customElements.define("ea-calendar", P);
export {
  P as EaCalendar
};
