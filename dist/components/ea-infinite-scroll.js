import { E as f } from "../core/EaBase.ts.js";
import { q as h, a as u, l as d, C as b } from "../core/decorator.js";
import { E as _ } from "../utils/Enum.ts.js";
import { s as m } from "../css/ea-infinite-scroll.style.js";
import { c as g } from "../utils/bem.ts.js";
class v extends Event {
  constructor(e) {
    super("ea-loadmore", { bubbles: !0, composed: !0 }), this.detail = e;
  }
}
var A = Object.defineProperty, E = Object.getOwnPropertyDescriptor, o = (t, e, s, a) => {
  for (var n = a > 1 ? void 0 : a ? E(e, s) : e, l = t.length - 1, c; l >= 0; l--)
    (c = t[l]) && (n = (a ? c(e, s, n) : c(n)) || n);
  return a && n && A(e, s, n), n;
};
const p = "ea-infinite-scroll", i = g(p);
let r = class extends f {
  constructor() {
    super(...arguments), this._observer = null, this.status = "finished", this.distance = 0, this.label = "";
  }
  updateContainerClasslist() {
    const t = i(
      {},
      {
        [this.status]: this.status !== "finished"
      }
    );
    return this._container && (this._container.className = t), t;
  }
  /** 更新子元素的 feed article a11y 属性 */
  _updateArticleAttributes() {
    if (!this._defaultSlot) return;
    const t = this._defaultSlot.assignedElements(), e = t.length;
    t.forEach((s, a) => {
      s.hasAttribute("role") || s.setAttribute("role", "article"), s.setAttribute("tabindex", "0"), s.setAttribute("aria-posinset", String(a + 1)), s.setAttribute("aria-setsize", String(e));
    });
  }
  html() {
    return `
      <section class="${i()}" part="container">
        <section class="${i.e("content")}" part="content">
          <slot></slot>
        </section>
        <div class="${i.e("placeholder")}" part="placeholder"></div>
        <section class="${i.e("loading")}" part="loading">
          <slot name="loading"></slot>
        </section>
        <section class="${i.e("noMore")}" part="noMore">
          <slot name="noMore"></slot>
        </section>
      </section>
    `;
  }
  /** 检查焦点 article 是否接近末尾，触发加载 */
  _handleArticleFocus(t) {
    if (this.status !== "finished" || !this._defaultSlot) return;
    const e = this._defaultSlot.assignedElements(), s = e.indexOf(t);
    if (s === -1) return;
    const a = Math.max(1, Math.ceil(e.length * 0.1));
    s >= e.length - a && this._triggerLoadmore();
  }
  /** 触发加载更多 */
  _triggerLoadmore() {
    this.status === "finished" && (this.status = "loading", this.updateContainerClasslist(), this.dispatchEvent(
      new v({
        finished: () => {
          var t;
          this.status = "finished", this.updateContainerClasslist(), (t = this._observer) == null || t.observe(this._placeholder);
        },
        noMore: () => {
          var t;
          this.status = "noMore", this.updateContainerClasslist(), (t = this._observer) == null || t.observe(this._placeholder);
        }
      })
    ));
  }
  _handleFocusin(t) {
    const e = t.target;
    e.closest('[role="article"]') && this._handleArticleFocus(e.closest('[role="article"]'));
  }
  _handleSlotchange() {
    this.emit("ea-infinite-scroll-slotchange", {
      bubbles: !0,
      composed: !0
    }), this.emit("slotchange", { bubbles: !0, composed: !0 }), this._updateArticleAttributes();
  }
  /** 重新创建 IntersectionObserver */
  _recreateObserver() {
    var t;
    this._placeholder && ((t = this._observer) == null || t.disconnect(), this._observer = new IntersectionObserver(
      (e) => {
        this.status === "finished" && e.forEach((s) => {
          s.isIntersecting && (this._observer.unobserve(s.target), this._triggerLoadmore());
        });
      },
      {
        rootMargin: this.distance + "px"
      }
    ), this._observer.observe(this._placeholder));
  }
  $mount() {
    this.hasAttribute("role") || this.setAttribute("role", "feed"), this.updateContainerClasslist(), this._recreateObserver(), this._updateArticleAttributes();
  }
  $beforeUnmount() {
    var t;
    (t = this._observer) == null || t.disconnect(), this._observer = null;
  }
};
o([
  h(i.cb())
], r.prototype, "_container", 2);
o([
  h(i.ce("placeholder"))
], r.prototype, "_placeholder", 2);
o([
  h("slot:not([name])")
], r.prototype, "_defaultSlot", 2);
o([
  u({
    type: _(["finished", "loading", "noMore"]),
    default: "finished",
    a11y: {
      ariaAttr: "aria-busy",
      map: (t) => t === "loading" ? "true" : null
    },
    observer() {
      this.updateContainerClasslist();
    }
  })
], r.prototype, "status", 2);
o([
  u({
    type: Number,
    default: 0,
    observer() {
      this._recreateObserver();
    }
  })
], r.prototype, "distance", 2);
o([
  u({
    type: String,
    default: "",
    a11y: {
      ariaAttr: "aria-label",
      map: (t) => t || null
    }
  })
], r.prototype, "label", 2);
o([
  d("focusin")
], r.prototype, "_handleFocusin", 1);
o([
  d("slotchange", i.ce("content"))
], r.prototype, "_handleSlotchange", 1);
r = o([
  b(p, { styles: [m] })
], r);
const x = r;
export {
  r as EaInfiniteScroll,
  x as default
};
