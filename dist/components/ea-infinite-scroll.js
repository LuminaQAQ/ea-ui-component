var p = (e) => {
  throw TypeError(e);
};
var c = (e, i, t) => i.has(e) || p("Cannot " + t);
var a = (e, i, t) => (c(e, i, "read from private field"), t ? t.call(e) : i.get(e)), d = (e, i, t) => i.has(e) ? p("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(e) : i.set(e, t), u = (e, i, t, s) => (c(e, i, "write to private field"), s ? s.call(e, t) : i.set(e, t), t), h = (e, i, t) => (c(e, i, "access private method"), t);
import { B as f } from "./Base.js";
import "./index3.js";
import "./ea-infinite-scroll-item.js";
var o, l, n, m, g;
class v extends f {
  constructor() {
    super();
    d(this, n);
    d(this, o);
    d(this, l);
    const t = this.attachShadow({ mode: "open" });
    t.innerHTML = `
            <div class='ea-infinite_wrap' part='container'>
                <slot></slot>
            </div>
            <div class='ea-infinite_loading-wrap' part='loading-wrap'>
                <slot name='loading' style="display: none;"></slot>
            </div>
            <div class='ea-infinite_noMore-wrap' part='noMore-wrap'>
                <slot name='noMore' style="display: none;"></slot>
            </div>
        `, u(this, o, t.querySelector('slot[name="loading"]')), u(this, l, t.querySelector('slot[name="noMore"]'));
  }
  // ------- delay 节流时延, 单位为ms -------
  // #region
  get delay() {
    return this.getAttrNumber("delay") || 200;
  }
  set delay(t) {
    this.setAttribute("delay", t);
  }
  // #endregion
  // ------- end -------
  // ------- loading 是否在加载时显示加载状态 -------
  // #region
  get loading() {
    return this.getAttrBoolean("loading");
  }
  set loading(t) {
    t !== void 0 && this.setAttribute("loading", t);
  }
  // #endregion
  // ------- end -------
  // ------- disabled 是否禁用 -------
  // #region
  get disabled() {
    return this.getAttrBoolean("disabled") || !1;
  }
  set disabled(t) {
    this.setAttribute("disabled", t), t && (a(this, l).style.display = "block");
  }
  connectedCallback() {
    this.delay = this.delay, h(this, n, g).call(this);
  }
}
o = new WeakMap(), l = new WeakMap(), n = new WeakSet(), // #endregion
// ------- end -------
m = function() {
  const t = this.querySelectorAll("ea-infinite-item");
  return t[t.length - 1];
}, g = function() {
  if (this.disabled) return;
  let t = h(this, n, m).call(this), s = null;
  const r = new IntersectionObserver((b) => {
    const { isIntersecting: y } = b[0];
    if (this.disabled) {
      r.disconnect();
      return;
    }
    !y || s || (this.loading && (a(this, o).style.display = "block"), r.unobserve(t), s = setTimeout(() => {
      this.dispatchEvent(new CustomEvent("bottomReached")), clearTimeout(s), s = null, t = h(this, n, m).call(this), r.observe(t), a(this, o).style.display = "none";
    }, this.delay || 200));
  }, { root: this.parentNode, rootMargin: "10px", threshold: 0.1 });
  r.observe(t);
};
customElements.get("ea-infinite") || customElements.define("ea-infinite", v);
export {
  v as EaInfiniteScroll
};
