var g = (e) => {
  throw TypeError(e);
};
var u = (e, i, t) => i.has(e) || g("Cannot " + t);
var o = (e, i, t) => (u(e, i, "read from private field"), t ? t.call(e) : i.get(e)), d = (e, i, t) => i.has(e) ? g("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(e) : i.set(e, t), m = (e, i, t, s) => (u(e, i, "write to private field"), s ? s.call(e, t) : i.set(e, t), t), c = (e, i, t) => (u(e, i, "access private method"), t);
import { B as S } from "./Base.js";
import "./ea-skeleton-item.js";
import { h as b } from "./handleDefaultAttrIsTrue.js";
const A = (e, i) => {
  const t = document.createElement("ea-skeleton-item");
  return t.variant = e, t.animated = i, t;
}, y = `
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
var r, l, h, n, k, w, f;
class E extends S {
  constructor() {
    super();
    d(this, n);
    d(this, r);
    d(this, l);
    d(this, h);
    const t = this.attachShadow({ mode: "open" });
    t.innerHTML = `
            <div class="ea-skeleton_wrap" part="container">
                <slot></slot>
                <slot name="template"></slot>
            </div>
        `, m(this, r, t.querySelector(".ea-skeleton_wrap")), m(this, h, t.querySelector("slot")), m(this, l, t.querySelector('slot[name="template"]')), this.build(t, y);
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
    return b(t);
  }
  set loading(t) {
    this.setAttribute("loading", t), o(this, l).style.display = t ? "block" : "none", o(this, h).style.display = t ? "none" : "block";
  }
  connectedCallback() {
    this.animated = this.animated, this.loading = this.loading, this.count = this.count, this.row = this.row, c(this, n, k).call(this, this.row), c(this, n, f).call(this, this.count), c(this, n, w).call(this, this.animated);
  }
}
r = new WeakMap(), l = new WeakMap(), h = new WeakMap(), n = new WeakSet(), // #endregion
// ------- end -------
// 默认骨架屏的初始化
k = function(t) {
  if (t = Number(t) || 4, o(this, h).assignedNodes(), o(this, l).assignedNodes(), !(this.children.length > 0)) {
    o(this, r).innerHTML = "";
    for (let s = 0; s < t; s++) {
      const a = A("p", this.animated);
      o(this, r).appendChild(a);
    }
  }
}, // 渲染带动画的骨架屏
w = function(t) {
  if (!t) return;
  this.querySelectorAll("ea-skeleton-item").forEach((a) => {
    a.animated = !0;
  });
}, // 渲染骨架屏的渲染个数
f = function(t) {
  if (this.children.length === 0 || t < 1) return;
  const s = this.querySelector('[slot="template"]');
  let a = "";
  for (let p = 0; p < t; p++)
    a += s.innerHTML;
  s.innerHTML = a;
};
customElements.get("ea-skeleton") || customElements.define("ea-skeleton", E);
export {
  E as EaSkeleton
};
