import { E as d } from "../core/EaBase.ts.js";
import { q as _, l as p, C as u, a as n } from "../core/decorator.js";
import { s as y } from "../css/ea-backtop.style.js";
import { c as g } from "../utils/bem.ts.js";
var f = Object.defineProperty, m = Object.getOwnPropertyDescriptor, r = (t, e, i, a) => {
  for (var l = a > 1 ? void 0 : a ? m(e, i) : e, c = t.length - 1, h; c >= 0; c--)
    (h = t[c]) && (l = (a ? h(e, i, l) : h(l)) || l);
  return a && l && f(e, i, l), l;
};
const b = "ea-backtop", s = g(b);
let o = class extends d {
  constructor() {
    super(...arguments), this.target = "window", this.visibilityHeight = 200, this.right = "40px", this.bottom = "40px", this.smooth = !0;
  }
  /**
   * 更新容器类名
   */
  updateContainerClasslist() {
    const t = this._getCurrentScrollTop(), e = s({}, { visible: t > this.visibilityHeight });
    return this._container && (this._container.className = e), e;
  }
  /**
   * 获取当前滚动位置
   * @returns 当前滚动高度
   */
  _getCurrentScrollTop() {
    const t = document.querySelector(this.target);
    return t ? t.scrollTop : window.scrollY;
  }
  /**
   * 滚动事件处理
   */
  _handleScroll() {
    var i;
    const e = this._getCurrentScrollTop() > this.visibilityHeight;
    this._container.setAttribute("tabindex", e ? "0" : "-1"), e ? (this._container.classList.add(s.s("before-enter")), this._container.offsetWidth, this.updateContainerClasslist()) : ((i = this._beforeLeaveAbortController) == null || i.abort(), this._beforeLeaveAbortController = new AbortController(), this._container.classList.add(s.s("before-leave")), this._container.addEventListener(
      "transitionend",
      () => {
        this.updateContainerClasslist();
      },
      { once: !0, signal: this._beforeLeaveAbortController.signal }
    ));
  }
  /**
   * 绑定自定义目标的滚动监听
   */
  _bindTargetScroll() {
    var t;
    if ((t = this._targetScrollAbortController) == null || t.abort(), this._targetScrollAbortController = new AbortController(), this.target !== "window") {
      const e = document.querySelector(this.target);
      e && e.addEventListener("scroll", () => this._handleScroll(), {
        signal: this._targetScrollAbortController.signal
      });
    }
  }
  /**
   * 渲染模板
   */
  html() {
    return `
      <div class="${s()}" part="container" role="button" tabindex="-1" aria-label="Back to top">
        <slot></slot>
      </div>
    `;
  }
  _handleClick() {
    this._scrollToTop();
  }
  _handleKeydown(t) {
    (t.key === "Enter" || t.key === " ") && (t.preventDefault(), this._scrollToTop());
  }
  /** 滚动到顶部 */
  _scrollToTop() {
    (document.querySelector(this.target) || window).scrollTo({
      top: 0,
      behavior: this.smooth ? "smooth" : "auto"
    });
  }
  _onWindowScroll() {
    this.target === "window" && this._handleScroll();
  }
  $mount() {
    this.updateContainerClasslist(), this._bindTargetScroll(), this._handleScroll();
  }
  $beforeUnmount() {
    var t, e;
    (t = this._beforeLeaveAbortController) == null || t.abort(), (e = this._targetScrollAbortController) == null || e.abort();
  }
};
r([
  _(s.cb())
], o.prototype, "_container", 2);
r([
  n({
    type: String,
    default: "window"
  })
], o.prototype, "target", 2);
r([
  n({
    type: Number,
    default: 200
  })
], o.prototype, "visibilityHeight", 2);
r([
  n({
    type: String,
    default: "40px",
    observer(t) {
      this.style.setProperty("--ea-backtop-right", t);
    }
  })
], o.prototype, "right", 2);
r([
  n({
    type: String,
    default: "40px",
    observer(t) {
      this.style.setProperty("--ea-backtop-bottom", t);
    }
  })
], o.prototype, "bottom", 2);
r([
  n({
    type: Boolean,
    default: !0
  })
], o.prototype, "smooth", 2);
r([
  p("click", s.cb())
], o.prototype, "_handleClick", 1);
r([
  p("keydown", s.cb())
], o.prototype, "_handleKeydown", 1);
r([
  p("scroll", "window")
], o.prototype, "_onWindowScroll", 1);
o = r([
  u(b, { styles: [y] })
], o);
export {
  o as EaBacktop
};
