var g = (e, i, t) => {
  if (!i.has(e))
    throw TypeError("Cannot " + t);
};
var n = (e, i, t) => (g(e, i, "read from private field"), t ? t.call(e) : i.get(e)), o = (e, i, t) => {
  if (i.has(e))
    throw TypeError("Cannot add the same private member more than once");
  i instanceof WeakSet ? i.add(e) : i.set(e, t);
}, d = (e, i, t, s) => (g(e, i, "write to private field"), s ? s.call(e, t) : i.set(e, t), t);
var m = (e, i, t) => (g(e, i, "access private method"), t);
import { B as b } from "./Base.js";
import "./ea-skeleton-item.js";
import { h as A } from "./handleDefaultAttrIsTrue.js";
const y = (e, i) => {
  const t = document.createElement("ea-skeleton-item");
  return t.variant = e, t.animated = i, t;
}, E = `
.ea-skeleton_wrap {
  width: 100%;
  position: relative;
  border-radius: 4px;
}
.ea-skeleton_wrap ea-skeleton-item[variant=p]:first-child {
  --p-width: 33%;
  --margin-top: 0;
}
.ea-skeleton_wrap ea-skeleton-item[variant=p]:last-child {
  --p-width: 61%;
}
`;
var r, l, h, c, w, u, f, p, S;
class q extends b {
  constructor() {
    super();
    // #endregion
    // ------- end -------
    // 默认骨架屏的初始化
    o(this, c);
    // 渲染带动画的骨架屏
    o(this, u);
    // 渲染骨架屏的渲染个数
    o(this, p);
    o(this, r, void 0);
    o(this, l, void 0);
    o(this, h, void 0);
    const t = this.attachShadow({ mode: "open" });
    t.innerHTML = `
            <div class="ea-skeleton_wrap" part="container">
                <slot></slot>
                <slot name="template"></slot>
            </div>
        `, d(this, r, t.querySelector(".ea-skeleton_wrap")), d(this, h, t.querySelector("slot")), d(this, l, t.querySelector('slot[name="template"]')), this.build(t, E);
  }
  // ------- row 骨架屏的渲染行数 -------
  // #region
  get row() {
    return this.getAttrNumber("row") || 4;
  }
  set row(t) {
    this.setAttribute("row", t);
  }
  // #endregion
  // ------- end -------
  // ------- animated 骨架屏的动画效果 -------
  // #region
  get animated() {
    return this.getAttrBoolean("animated");
  }
  set animated(t) {
    t && this.setAttribute("animated", t);
  }
  // #endregion
  // ------- end -------
  // ------- count 元素重复数 -------
  // #region
  get count() {
    return this.getAttrNumber("count") || 1;
  }
  set count(t) {
    this.setAttribute("count", t);
  }
  // #endregion
  // ------- end -------
  // ------- loading 是否显示骨架屏 -------
  // #region
  get loading() {
    const t = this.getAttribute("loading");
    return A(t);
  }
  set loading(t) {
    this.setAttribute("loading", t), n(this, l).style.display = t ? "block" : "none", n(this, h).style.display = t ? "none" : "block";
  }
  connectedCallback() {
    this.animated = this.animated, this.loading = this.loading, this.count = this.count, this.row = this.row, m(this, c, w).call(this, this.row), m(this, p, S).call(this, this.count), m(this, u, f).call(this, this.animated);
  }
}
r = new WeakMap(), l = new WeakMap(), h = new WeakMap(), c = new WeakSet(), w = function(t) {
  if (t = Number(t) || 4, n(this, h).assignedNodes(), n(this, l).assignedNodes(), !(this.children.length > 0)) {
    n(this, r).innerHTML = "";
    for (let s = 0; s < t; s++) {
      const a = y("p", this.animated);
      n(this, r).appendChild(a);
    }
  }
}, u = new WeakSet(), f = function(t) {
  if (!t)
    return;
  this.querySelectorAll("ea-skeleton-item").forEach((a) => {
    a.animated = !0;
  });
}, p = new WeakSet(), S = function(t) {
  if (this.children.length === 0 || t < 1)
    return;
  const s = this.querySelector('[slot="template"]');
  let a = "";
  for (let k = 0; k < t; k++)
    a += s.innerHTML;
  s.innerHTML = a;
};
customElements.get("ea-skeleton") || customElements.define("ea-skeleton", q);
export {
  q as EaSkeleton
};
