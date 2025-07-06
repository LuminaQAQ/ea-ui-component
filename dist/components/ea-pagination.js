var x = (e) => {
  throw TypeError(e);
};
var b = (e, n, t) => n.has(e) || x("Cannot " + t);
var r = (e, n, t) => (b(e, n, "read from private field"), t ? t.call(e) : n.get(e)), l = (e, n, t) => n.has(e) ? x("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(e) : n.set(e, t), m = (e, n, t, s) => (b(e, n, "write to private field"), s ? s.call(e, t) : n.set(e, t), t), i = (e, n, t) => (b(e, n, "access private method"), t);
import { B as E } from "./Base.js";
const z = `
.ea-pagination_wrap {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
}
.ea-pagination_wrap .ea-pagination_item_wrap {
  display: flex;
  align-items: center;
}
.ea-pagination_wrap .ea-pagination_item_wrap .ea-pagination_item,
.ea-pagination_wrap .ea-pagination_item_wrap .ea-pagination_more {
  cursor: pointer;
  box-sizing: border-box;
  margin: 0 5px;
  padding: 0 4px;
  min-width: 30px;
  height: 28px;
  line-height: 28px;
  font-size: 13px;
  text-align: center;
}
.ea-pagination_wrap .ea-pagination_item_wrap .ea-pagination_item.ea-pagination_item--active {
  color: #409eff;
}
.ea-pagination_wrap .ea-pagination_item_wrap .ea-pagination_more {
  cursor: pointer;
  user-select: none;
}
.ea-pagination_wrap .ea-pagination_item_wrap .ea-pagination_more.ea-pagination_more--active {
  color: #409eff;
}
.ea-pagination_wrap .ea-pagination_arrow {
  user-select: none;
  cursor: pointer;
  padding: 0 10px;
  line-height: 28px;
}
.ea-pagination_wrap .ea-pagination_arrow.disabled {
  cursor: default;
  pointer-events: none;
  color: #c0c4cc;
}
.ea-pagination_wrap .ea-pagination_arrow:first-child {
  margin-right: 0.25rem;
}
.ea-pagination_wrap .ea-pagination_arrow:last-child {
  margin-left: 0.25rem;
}
.ea-pagination_wrap .ea-pagination_item.background,
.ea-pagination_wrap .ea-pagination_more.background,
.ea-pagination_wrap .ea-pagination_arrow.background {
  background-color: #f4f4f5;
  border-radius: 3px;
}
.ea-pagination_wrap .ea-pagination_item.background:hover,
.ea-pagination_wrap .ea-pagination_more.background:hover,
.ea-pagination_wrap .ea-pagination_arrow.background:hover {
  color: #409eff;
}
.ea-pagination_wrap .ea-pagination_item.background.active,
.ea-pagination_wrap .ea-pagination_more.background.active,
.ea-pagination_wrap .ea-pagination_arrow.background.active {
  background-color: #409eff;
  color: #f4f4f5;
}
.ea-pagination_wrap .ea-pagination_show_total {
  margin-right: 0.5rem;
  font-size: 13px;
}
`, y = (e, n) => {
  const t = document.createElement("span");
  return t.className = "ea-pagination_more", t.innerHTML = "···", t.part = "more-item", n && t.classList.add("background"), t.addEventListener("mouseenter", function(s) {
    t.classList.add("ea-pagination_more--active"), t.innerHTML = e === "prev" ? "&lt;&lt;" : "&gt;&gt;";
  }), t.addEventListener("mouseleave", function(s) {
    t.classList.remove("ea-pagination_more--active"), t.innerHTML = "···";
  }), t;
}, v = (e, n) => {
  const t = document.createElement("span");
  return t.part = "page-item", t.className = "ea-pagination_item", t.innerText = e, t.setAttribute("data-page", e), n && t.classList.add("background"), t;
}, I = () => {
  const e = document.createElement("span");
  return e.className = "ea-pagination_show_total", e.part = "total-wrap", e;
};
var d, o, c, h, a, _, L, C, f, P, k, w, A;
class M extends E {
  constructor() {
    super();
    l(this, a);
    l(this, d);
    // 页码元素的容器
    l(this, o);
    // 箭头
    l(this, c);
    l(this, h);
    const t = this.attachShadow({ mode: "open" });
    t.innerHTML = `
            <div class="ea-pagination_wrap" part="container">
                <span class="ea-pagination_arrow prev ${this.background ? "background" : ""}" part="arrow">&lt;</span>
                <div class="ea-pagination_item_wrap" part="item-wrap"></div>
                <span class="ea-pagination_arrow next ${this.background ? "background" : ""}" part="arrow">&gt;</span>
            </div>
        `, m(this, d, t.querySelector(".ea-pagination_wrap")), m(this, c, t.querySelector(".prev")), m(this, o, t.querySelector(".ea-pagination_item_wrap")), m(this, h, t.querySelector(".next")), this.build(t, z);
  }
  // ------- layout 布局(前一页, 页码, 后一页) -------
  // #region
  get layout() {
    return this.getAttribute("layout").split(",").map((s) => s.trim()) || ["prev", "pager", "next"];
  }
  set layout(t) {
    this.setAttribute("layout", t);
  }
  // #endregion
  // ------- end -------
  // ------- sizes 分页中每页多少记录 -------
  // #region
  get sizes() {
    return this.getAttrNumber("sizes") || 10;
  }
  set sizes(t) {
    this.setAttribute("sizes", t);
  }
  // #endregion
  // ------- end -------
  // ------- current-page 当前页码 -------
  // #region
  get currentPage() {
    return this.getAttrNumber("current-page") || 1;
  }
  set currentPage(t) {
    this.setAttribute("current-page", t);
  }
  // #endregion
  // ------- end -------
  // ------- page-count 总显示的页码数量 -------
  // #region
  get pageCount() {
    return this.getAttrNumber("page-count") || 6;
  }
  set pageCount(t) {
    this.setAttribute("page-count", t);
  }
  // #endregion
  // ------- end -------
  // ------- total 总记录数 -------
  // #region
  get total() {
    return this.getAttrNumber("total");
  }
  set total(t) {
    this.setAttribute("total", t);
  }
  // #endregion
  // ------- end -------
  // ------- paginationCount 分页总数 -------
  // #region
  get paginationCount() {
    return Math.ceil(this.total / this.sizes);
  }
  // #endregion
  // ------- end -------
  // ------- background 背景颜色 -------
  // #region
  get background() {
    return this.getAttrBoolean("background");
  }
  set background(t) {
    t && this.setAttribute("background", t);
  }
  connectedCallback() {
    this.sizes = this.sizes, this.currentPage = this.currentPage, this.total = this.total, i(this, a, L).call(this), i(this, a, k).call(this), i(this, a, A).call(this);
  }
}
d = new WeakMap(), o = new WeakMap(), c = new WeakMap(), h = new WeakMap(), a = new WeakSet(), // #endregion
// ------- end -------
_ = function(t, s) {
  this.dispatchEvent(new CustomEvent(t, s));
}, // 初始化箭头元素
L = function() {
  i(this, a, C).call(this), this.layout.includes("prev") ? r(this, c).addEventListener("click", () => {
    this.currentPage <= 1 || (this.currentPage--, i(this, a, w).call(this), i(this, a, _).call(this, "change", { detail: { currentPage: this.currentPage } }));
  }) : r(this, c).style.display = "none", this.layout.includes("next") ? r(this, h).addEventListener("click", () => {
    this.currentPage >= this.paginationCount || (this.currentPage++, i(this, a, w).call(this), i(this, a, _).call(this, "change", { detail: { currentPage: this.currentPage } }));
  }) : r(this, h).style.display = "none";
}, // 处理箭头状态
C = function() {
  !this.layout.includes("prev") && !this.layout.includes("next") || (this.currentPage === 1 && this.layout.includes("prev") ? r(this, c).classList.add("disabled") : this.currentPage >= this.paginationCount && this.layout.includes("next") ? r(this, h).classList.add("disabled") : (r(this, c).classList.remove("disabled"), r(this, h).classList.remove("disabled")));
}, // 处理分页点击事件
f = function(t, s) {
  t.addEventListener("click", (u) => {
    this.currentPage = s, i(this, a, w).call(this), i(this, a, _).call(this, "change", {
      detail: {
        currentPage: this.currentPage
      }
    });
  });
}, // 处理更多按钮点击事件
P = function(t, s) {
  t.addEventListener("click", (u) => {
    this.currentPage += s === "prev" ? -5 : 5, this.currentPage < 1 ? this.currentPage = 1 : this.currentPage > this.paginationCount && (this.currentPage = this.paginationCount), i(this, a, w).call(this), i(this, a, _).call(this, "change", {
      detail: {
        currentPage: this.currentPage
      }
    });
  });
}, // 处理分页的页码
k = function() {
  if (!this.layout.includes("pager")) return;
  r(this, o).innerHTML = "";
  const t = Math.floor(this.pageCount / 2);
  let s = this.currentPage - t, u = this.currentPage + t;
  s <= 1 ? (s = 1, u = this.pageCount < this.paginationCount ? this.pageCount : this.paginationCount) : u >= this.paginationCount ? (s = this.paginationCount - this.pageCount + 1, u = this.paginationCount) : u--;
  for (let g = s; g <= u; g++) {
    const p = v(g, this.background);
    r(this, o).appendChild(p), g === this.currentPage && (p.classList.add("ea-pagination_item--active"), this.background && p.classList.add("active")), i(this, a, f).call(this, p, g);
  }
  if (this.total > this.pageCount && this.currentPage >= this.pageCount && this.paginationCount !== this.pageCount) {
    const g = y("prev", this.background);
    i(this, a, P).call(this, g, "prev");
    const p = v(1, this.background);
    i(this, a, f).call(this, p, 1), r(this, o).insertBefore(g, r(this, o).firstChild), r(this, o).insertBefore(p, r(this, o).firstChild);
  }
  if (this.total > this.pageCount && this.currentPage < this.paginationCount - t && this.paginationCount !== this.pageCount) {
    const g = y("next", this.background);
    i(this, a, P).call(this, g, "next");
    const p = v(this.paginationCount, this.background);
    i(this, a, f).call(this, p, this.paginationCount), r(this, o).appendChild(g), r(this, o).appendChild(p);
  }
}, // 处理分页变化
w = function() {
  i(this, a, C).call(this), i(this, a, k).call(this);
}, // 处理显示总数
A = function() {
  if (!this.layout.includes("total")) return;
  const t = I();
  t.innerHTML = `共 ${this.total} 条`, r(this, d).insertBefore(t, r(this, d).firstChild);
};
customElements.get("ea-pagination") || customElements.define("ea-pagination", M);
export {
  M as EaPagination
};
