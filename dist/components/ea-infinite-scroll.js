var u = (e, i, t) => {
  if (!i.has(e))
    throw TypeError("Cannot " + t);
};
var d = (e, i, t) => (u(e, i, "read from private field"), t ? t.call(e) : i.get(e)), o = (e, i, t) => {
  if (i.has(e))
    throw TypeError("Cannot add the same private member more than once");
  i instanceof WeakSet ? i.add(e) : i.set(e, t);
}, m = (e, i, t, s) => (u(e, i, "write to private field"), s ? s.call(e, t) : i.set(e, t), t);
var h = (e, i, t) => (u(e, i, "access private method"), t);
import { B as f } from "./Base.js";
import "./index3.js";
import "./ea-infinite-scroll-item.js";
var n, l, r, p, c, g;
class v extends f {
  constructor() {
    super();
    // #endregion
    // ------- end -------
    o(this, r);
    o(this, c);
    o(this, n, void 0);
    o(this, l, void 0);
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
        `, m(this, n, t.querySelector('slot[name="loading"]')), m(this, l, t.querySelector('slot[name="noMore"]'));
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
    this.setAttribute("disabled", t), t && (d(this, l).style.display = "block");
  }
  connectedCallback() {
    this.delay = this.delay, h(this, c, g).call(this);
  }
}
n = new WeakMap(), l = new WeakMap(), r = new WeakSet(), p = function() {
  const t = this.querySelectorAll("ea-infinite-item");
  return t[t.length - 1];
}, c = new WeakSet(), g = function() {
  if (this.disabled)
    return;
  let t = h(this, r, p).call(this), s = null;
  const a = new IntersectionObserver((b) => {
    const { isIntersecting: y } = b[0];
    if (this.disabled) {
      a.disconnect();
      return;
    }
    !y || s || (this.loading && (d(this, n).style.display = "block"), a.unobserve(t), s = setTimeout(() => {
      this.dispatchEvent(new CustomEvent("bottomReached")), clearTimeout(s), s = null, t = h(this, r, p).call(this), a.observe(t), d(this, n).style.display = "none";
    }, this.delay || 200));
  }, { root: this.parentNode, rootMargin: "10px", threshold: 0.1 });
  a.observe(t);
};
customElements.get("ea-infinite") || customElements.define("ea-infinite", v);
export {
  v as EaInfiniteScroll
};
