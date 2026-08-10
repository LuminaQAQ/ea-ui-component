import { E as x } from "../core/EaBase.ts.js";
import { q as m, a as d, C as A, p as E, l as b } from "../core/decorator.js";
import { h as _ } from "../utils/html.ts.js";
import { E as $ } from "../utils/Enum.ts.js";
import { i as v } from "../utils/I18nManager.ts.js";
import { c as P } from "../utils/bem.ts.js";
import { s as j } from "../css/ea-pagination.style.js";
import "./ea-icon.js";
const f = P("ea-pagination"), I = (t, e, i) => {
  const a = t === e;
  return `<span class="${a ? `${f.e("page")} ${f.s("active")}` : f.e("page")}" part="page" role="button" tabindex="${a ? "0" : "-1"}" data-page="${t}" aria-label="Page ${t}"${a ? ' aria-current="page"' : ""}>${i || t}</span>`;
}, y = P("ea-pagination"), M = (t, e) => `<span class="${y.e("page")} ${y.e("more")}" part="more" role="button" aria-label="${e === "next" ? "Next 5 pages" : "Previous 5 pages"}" tabindex="-1" data-action="${e}">${t}</span>`;
class R extends Event {
  constructor(e) {
    super("ea-current-change", {
      bubbles: !0,
      cancelable: !0,
      composed: !0
    }), this.detail = e;
  }
}
class C extends Event {
  constructor(e) {
    super("ea-prev-click", {
      bubbles: !0,
      cancelable: !0,
      composed: !0
    }), this.detail = e;
  }
}
class z extends Event {
  constructor(e) {
    super("ea-next-click", {
      bubbles: !0,
      cancelable: !0,
      composed: !0
    }), this.detail = e;
  }
}
class N extends Event {
  constructor(e) {
    super("ea-size-change", {
      bubbles: !0,
      cancelable: !0,
      composed: !0
    }), this.detail = e;
  }
}
var k = Object.defineProperty, L = Object.getOwnPropertyDescriptor, o = (t, e, i, a) => {
  for (var s = a > 1 ? void 0 : a ? L(e, i) : e, l = t.length - 1, c; l >= 0; l--)
    (c = t[l]) && (s = (a ? c(e, i, s) : c(s)) || s);
  return a && s && k(e, i, s), s;
};
const S = "ea-pagination", r = P(S), T = {
  prev: `<ea-icon class="${r.e("icon")} ${r.e("icon")}--prev" name="angle-left" part="icon prev-icon" tabindex="0" aria-label="Previous page"></ea-icon>`,
  pager: `<section class="${r.e("pager")}" part="pager"></section>`,
  next: `<ea-icon class="${r.e("icon")} ${r.e("icon")}--next" name="angle-right" part="icon next-icon" tabindex="0" aria-label="Next page"></ea-icon>`,
  total: `<span class="${r.e("total")}" part="total"></span>`,
  jumper: `<span class="${r.e("wrapper")}" part="jumper-wrap">Go to <ea-input-number class="${r.e("jumper")}" part="jumper" controls="false" min="1"></ea-input-number> </span>`,
  sizes: `<ea-select class="${r.e("sizes")}" part="sizes"></ea-select>`,
  "->": `<span class="${r.e("separator")}" part="separator"></span>`
};
let n = class extends x {
  constructor() {
    super(...arguments), this._isFirstRender = !0, this._isEaInputImported = !1, this._isEaSelectImported = !1, this._jumperAbortController = null, this._sizesAbortController = null, this.defaultPageSize = 10, this.pageSize = 10, this.pagerCount = 7, this.total = 0, this.currentPage = 1, this.background = !1, this.size = "", this.hideOnSinglePage = !1, this.disabled = !1, this.pageSizes = [10, 20, 30, 40, 50, 100], this.layout = [
      "prev",
      "pager",
      "next",
      "jumper",
      "->",
      "total"
    ];
  }
  updateContainerClasslist() {
    const t = r(
      {
        background: this.background,
        size: this.size || !1
      },
      {
        hide: this.hideOnSinglePage && Math.ceil(this.total / this.pageSize) <= 1,
        disabled: this.disabled
      }
    );
    return !this._isFirstRender && this._container && (this._container.className = t), t;
  }
  /** 生成分页布局 HTML */
  _getLayoutHTML() {
    return this.layout.filter(
      (e) => ["prev", "pager", "next", "jumper", "total", "sizes", "->"].includes(
        e
      )
    ).map((e) => T[e] || "").join("");
  }
  html() {
    return `
      <nav class="${r()}" part="container" aria-label="Pagination">
        ${this._getLayoutHTML()}
      </nav>
    `;
  }
  /** 更新分页器样式和激活状态 */
  _updatePaginationStyle(t = this.currentPage) {
    var a;
    if (!this._pagination || !((a = this.layout) != null && a.includes("pager"))) return;
    this._pagination.innerHTML = _(this._getPagerTemplate(t));
    const e = this._pagination.querySelectorAll(r.ce("page")), i = this._pagination.querySelector(
      `${r.ce("page")}[data-page="${t}"]`
    );
    e.forEach((s) => {
      const l = s === i;
      s.classList.toggle(r.s("active"), l), l ? (s.setAttribute("aria-current", "page"), s.setAttribute("tabindex", "0")) : (s.removeAttribute("aria-current"), s.setAttribute("tabindex", "-1"));
    });
  }
  /** 计算分页器显示的页码范围 */
  _getPagerRange(t) {
    const e = Math.ceil(this.total / this.pageSize), i = Math.floor(this.pagerCount / 2), s = ((l, c) => {
      const g = [];
      for (let h = l; h <= c; h++)
        g.push(h);
      return g;
    })(
      Math.max(
        2,
        t + i > e ? t - i + 1 - Math.abs(e - t - i) : t - i + 1
      ),
      Math.min(
        e - 1,
        t - i < 2 ? t + i - 1 + Math.abs(t - i - 1) : t + i - 1
      )
    );
    return s[0] > 2 || i === 0 ? s.unshift(1, "...") : s.unshift(1), i === 0 && t > 1 && t < e && s.push(t), s[s.length - 1] < e - 1 || i === 0 && t === e - 1 ? s.push("...", e) : e > 1 && s.push(e), s;
  }
  /** 生成分页器 HTML 模板 */
  _getPagerTemplate(t = 1) {
    let e = "";
    const i = this._getPagerRange(t);
    return i.forEach((a, s) => {
      typeof a == "number" ? e += I(a, this.currentPage, a) : e += M(
        "...",
        i[s - 1] === i[0] ? "prev" : "next"
      );
    }), e;
  }
  /** 更新上一页/下一页按钮的禁用状态 */
  _updatePrevNextState() {
    if (this._prevIcon && this.layout.includes("prev")) {
      const t = this.currentPage <= 1 || this.total <= 0;
      this._prevIcon.classList.toggle(r.s("disabled"), t), this._prevIcon.setAttribute("aria-disabled", String(t)), this._prevIcon.setAttribute("tabindex", t ? "-1" : "0");
    }
    if (this._nextIcon && this.layout.includes("next")) {
      const t = this.currentPage >= Math.ceil(this.total / this.pageSize);
      this._nextIcon.classList.toggle(r.s("disabled"), t), this._nextIcon.setAttribute("aria-disabled", String(t)), this._nextIcon.setAttribute("tabindex", t ? "-1" : "0");
    }
  }
  /** 渲染分页器内容 */
  _handlePagerRender() {
    if (this._pagination) {
      if (!this.layout.includes("pager")) {
        this._pagination.innerHTML = "";
        return;
      }
      this._pagination.innerHTML = _(this._getPagerTemplate(this.currentPage));
    }
  }
  /** 渲染总数文本 */
  _handleTotalRender() {
    !this.layout.includes("total") || !this._total || (this._total.textContent = v.t("pagination.total", {
      total: this.total
    }));
  }
  /** 渲染跳转输入框并绑定事件 */
  async _handleJumperRender() {
    var a;
    if (!this.layout.includes("jumper") || !this._jumper) return;
    (a = this._jumperAbortController) == null || a.abort(), this._jumperAbortController = new AbortController();
    const t = Math.ceil(this.total / this.pageSize);
    this._jumper.value = this.currentPage, this._jumper.min = 1, this._jumper.max = t || 1, this.disabled && (this._jumper.disabled = !0);
    const e = (s) => {
      const l = s.detail;
      l && typeof l.currentValue == "number" && l.currentValue !== this.currentPage && (this.currentPage = l.currentValue);
    }, i = (s) => {
      s.key === "Enter" && this._jumper.blur();
    };
    this._jumper.addEventListener("ea-change", e, {
      signal: this._jumperAbortController.signal
    }), this._jumper.addEventListener("keydown", i, {
      signal: this._jumperAbortController.signal
    });
  }
  /** 渲染每页条数选择器并绑定事件 */
  async _handleSizesRender() {
    var i, a;
    if (!this.layout.includes("sizes") || !this._sizes) return;
    (i = this._sizesAbortController) == null || i.abort(), this._sizesAbortController = new AbortController();
    const t = (s) => `<ea-option value="${s}" ${s === this.pageSize ? "selected" : ""}>${v.t("pagination.itemsPerPage", { size: s })}</ea-option>`, e = (s) => {
      var l;
      (l = s.stopImmediatePropagation) == null || l.call(s), !this._isFirstRender && (this.pageSize = s.target.value, this.currentPage = Math.min(
        this.currentPage,
        Math.ceil(this.total / this.pageSize)
      ));
    };
    (a = this.pageSizes) != null && a.includes(this.pageSize) || (this.pageSize = this.pageSizes[0]), this._sizes.innerHTML = _(this.pageSizes.map(t).join("")), this._sizes.value = this.pageSize, this.disabled && (this._sizes.disabled = !0), this._sizes.addEventListener("change", e, {
      signal: this._sizesAbortController.signal
    });
  }
  /** 重新渲染分页组件内容 */
  async _handlePaginationItemChange(t = !1) {
    var e, i, a, s;
    (e = this._jumperAbortController) == null || e.abort(), this._jumperAbortController = null, (i = this._sizesAbortController) == null || i.abort(), this._sizesAbortController = null, (a = this.layout) != null && a.includes("jumper") && !this._isEaInputImported && (await import("./ea-input-number.js"), await customElements.whenDefined("ea-input-number"), this._isEaInputImported = !0), (s = this.layout) != null && s.includes("sizes") && !this._isEaSelectImported && (await import("./ea-select.js"), await customElements.whenDefined("ea-select"), this._isEaSelectImported = !0), this._container && !t && (this._container.innerHTML = _(this._getLayoutHTML())), this._handleSizesRender(), this._handlePagerRender(), this._handleTotalRender(), this._handleJumperRender(), this._updatePrevNextState();
  }
  _handlePagerClick(t) {
    var g;
    const e = t.composedPath(), i = e.find(
      (h) => {
        var u;
        return h instanceof Element && ((u = h.closest) == null ? void 0 : u.call(h, `${r.ce("page")}:not(${r.ce("more")})`));
      }
    ), a = e.find(
      (h) => {
        var u;
        return h instanceof Element && ((u = h.closest) == null ? void 0 : u.call(h, r.ce("more")));
      }
    ), s = i == null ? void 0 : i.closest(
      `${r.ce("page")}:not(${r.ce("more")})`
    ), l = a == null ? void 0 : a.closest(r.ce("more")), c = Number((g = s == null ? void 0 : s.dataset) == null ? void 0 : g.page);
    if (s && this.currentPage !== c)
      this.currentPage = c;
    else if (l) {
      const h = l.dataset.action, u = Math.ceil(this.total / this.pageSize);
      let p = this.currentPage + (h === "next" ? 5 : -5);
      p < 1 ? p = 1 : p > u && (p = u), this.currentPage = p;
    }
  }
  _handlePrevClick(t) {
    t.composedPath().find(
      (a) => {
        var s;
        return a instanceof Element && ((s = a.closest) == null ? void 0 : s.call(a, `${r.ce("icon")}--prev`));
      }
    ) && (this.currentPage <= 1 || this.total <= 0 || this.disabled || (this.currentPage--, this.dispatchEvent(
      new C({ value: this.currentPage })
    )));
  }
  _handleNextClick(t) {
    t.composedPath().find(
      (a) => {
        var s;
        return a instanceof Element && ((s = a.closest) == null ? void 0 : s.call(a, `${r.ce("icon")}--next`));
      }
    ) && (this.currentPage >= Math.ceil(this.total / this.pageSize) || this.disabled || (this.currentPage++, this.dispatchEvent(
      new z({ value: this.currentPage })
    )));
  }
  _handleKeydown(t) {
    var c, g, h, u;
    const e = t.target, i = (c = e.closest) == null ? void 0 : c.call(e, r.ce("page")), a = (g = e.closest) == null ? void 0 : g.call(e, `${r.ce("icon")}--prev`), s = (h = e.closest) == null ? void 0 : h.call(e, `${r.ce("icon")}--next`);
    if (!i && !a && !s) return;
    const l = Math.ceil(this.total / this.pageSize);
    switch (t.key) {
      case "ArrowLeft":
      case "ArrowUp":
        t.preventDefault(), this._moveFocusToPage(this.currentPage - 1);
        break;
      case "ArrowRight":
      case "ArrowDown":
        t.preventDefault(), this._moveFocusToPage(this.currentPage + 1);
        break;
      case "Home":
        t.preventDefault(), this._moveFocusToPage(1);
        break;
      case "End":
        t.preventDefault(), this._moveFocusToPage(l);
        break;
      case "Enter":
      case " ":
        if (t.preventDefault(), a)
          this._handlePrevAction();
        else if (s)
          this._handleNextAction();
        else if (i && !e.closest(r.ce("more"))) {
          const p = Number((u = e.dataset) == null ? void 0 : u.page);
          p && p !== this.currentPage && (this.currentPage = p);
        }
        break;
    }
  }
  /** 将焦点移动到指定页码 */
  _moveFocusToPage(t) {
    var i;
    const e = Math.ceil(this.total / this.pageSize);
    if (!(t < 1 || t > e)) {
      if (t === this.currentPage) {
        const a = (i = this._pagination) == null ? void 0 : i.querySelector(
          `${r.ce("page")}[data-page="${t}"]`
        );
        a == null || a.focus();
        return;
      }
      this.currentPage = t, requestAnimationFrame(() => {
        var s;
        const a = (s = this._pagination) == null ? void 0 : s.querySelector(
          `${r.ce("page")}[data-page="${t}"]`
        );
        a == null || a.focus();
      });
    }
  }
  /** 执行上一页操作 */
  _handlePrevAction() {
    this.currentPage <= 1 || this.total <= 0 || this.disabled || (this.currentPage--, this.dispatchEvent(
      new C({ value: this.currentPage })
    ));
  }
  /** 执行下一页操作 */
  _handleNextAction() {
    this.currentPage >= Math.ceil(this.total / this.pageSize) || this.disabled || (this.currentPage++, this.dispatchEvent(
      new z({ value: this.currentPage })
    ));
  }
  async $mount() {
    await this._handlePaginationItemChange(), this._isFirstRender = !1, this.updateContainerClasslist();
  }
  $beforeUnmount() {
    var t, e;
    (t = this._jumperAbortController) == null || t.abort(), this._jumperAbortController = null, (e = this._sizesAbortController) == null || e.abort(), this._sizesAbortController = null;
  }
};
o([
  m(r.cb())
], n.prototype, "_container", 2);
o([
  m(r.ce("pager"))
], n.prototype, "_pagination", 2);
o([
  m(`${r.ce("icon")}--prev`)
], n.prototype, "_prevIcon", 2);
o([
  m(`${r.ce("icon")}--next`)
], n.prototype, "_nextIcon", 2);
o([
  m(r.ce("jumper"))
], n.prototype, "_jumper", 2);
o([
  m(r.ce("total"))
], n.prototype, "_total", 2);
o([
  m(r.ce("sizes"))
], n.prototype, "_sizes", 2);
o([
  d({
    type: Number,
    default: 10,
    observer() {
      this._isFirstRender || this._handlePaginationItemChange();
    }
  })
], n.prototype, "defaultPageSize", 2);
o([
  d({
    type: Number,
    default: function() {
      return this.defaultPageSize;
    },
    observer(t) {
      this._isFirstRender || (this._handlePaginationItemChange(!0), this.dispatchEvent(new N({ pageSize: t })));
    }
  })
], n.prototype, "pageSize", 2);
o([
  d({
    type: Number,
    default: 7
  })
], n.prototype, "pagerCount", 2);
o([
  d({
    type: Number,
    default: 0,
    observer() {
      this._pagination && this.layout.includes("pager") && this._handlePaginationItemChange(), this.hideOnSinglePage && this.updateContainerClasslist();
    }
  })
], n.prototype, "total", 2);
o([
  d({
    type: Number,
    default: 1,
    observer(t) {
      var e;
      if (!this._isFirstRender) {
        if (this._updatePaginationStyle(t), this._updatePrevNextState(), this._jumper && ((e = this.layout) != null && e.includes("jumper"))) {
          this._jumper.value !== t && (this._jumper.value = t);
          const i = Math.ceil(this.total / this.pageSize);
          this._jumper.max = i || 1;
        }
        this.dispatchEvent(new R({ value: t })), this.updateContainerClasslist();
      }
    }
  })
], n.prototype, "currentPage", 2);
o([
  d({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], n.prototype, "background", 2);
o([
  d({
    type: $(["large", "default", "small"]),
    default: "",
    observer(t) {
      this._sizes && t && this._sizes.setAttribute("size", t), this._jumper && t && this._jumper.setAttribute("size", t), this.updateContainerClasslist();
    }
  })
], n.prototype, "size", 2);
o([
  d({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], n.prototype, "hideOnSinglePage", 2);
o([
  d({
    type: Boolean,
    default: !1,
    a11y: {
      ariaAttr: "aria-disabled",
      map: (t) => String(t)
    },
    observer(t) {
      this.updateContainerClasslist(), this.layout.includes("jumper") && this._jumper && (this._jumper.disabled = t), this.layout.includes("sizes") && this._sizes && (this._sizes.disabled = t);
    }
  })
], n.prototype, "disabled", 2);
o([
  E({
    type: Array,
    default: [10, 20, 30, 40, 50, 100],
    observer() {
      this._isFirstRender || this._handlePaginationItemChange();
    }
  })
], n.prototype, "pageSizes", 2);
o([
  E({
    type: Array,
    default: ["prev", "pager", "next", "jumper", "->", "total"],
    observer() {
      this._isFirstRender || this._handlePaginationItemChange();
    }
  })
], n.prototype, "layout", 2);
o([
  b("click", "shadowRoot")
], n.prototype, "_handlePagerClick", 1);
o([
  b("click", "shadowRoot")
], n.prototype, "_handlePrevClick", 1);
o([
  b("click", "shadowRoot")
], n.prototype, "_handleNextClick", 1);
o([
  b("keydown", "shadowRoot")
], n.prototype, "_handleKeydown", 1);
n = o([
  A(S, { styles: [j] })
], n);
const K = n;
export {
  n as EaPagination,
  K as default
};
