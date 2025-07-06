var d = (i) => {
  throw TypeError(i);
};
var c = (i, e, t) => e.has(i) || d("Cannot " + t);
var n = (i, e, t) => (c(i, e, "read from private field"), t ? t.call(i) : e.get(i)), a = (i, e, t) => e.has(i) ? d("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(i) : e.set(i, t), b = (i, e, t, o) => (c(i, e, "write to private field"), o ? o.call(i, t) : e.set(i, t), t), h = (i, e, t) => (c(i, e, "access private method"), t);
import { t as y } from "./timeout.js";
import { B as f } from "./Base.js";
import "./index3.js";
const v = `
.ea-backtop_wrap {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  right: 40px;
  bottom: 40px;
  cursor: pointer;
  background-color: #fff;
  border-radius: 50%;
  color: #409eff;
  font-size: 14px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  opacity: 1;
  z-index: 5;
  transition: opacity 0.3s ease-in-out;
}
`;
var s, r, g, p, m;
class x extends f {
  constructor() {
    super();
    a(this, r);
    a(this, s);
    const t = this.attachShadow({ mode: "open" });
    t.innerHTML = `
            <div class="ea-backtop_wrap" part='container' style='display: none'>
                <slot></slot>
            </div>
        `, b(this, s, t.querySelector(".ea-backtop_wrap")), this.build(t, v);
  }
  // ------- target 触发滚动的对象 -------
  // #region
  get target() {
    return this.getAttribute("target") || "";
  }
  set target(t) {
    this.setAttribute("target", t);
  }
  // #endregion
  // ------- end -------
  // ------- right 滚动按钮距离右边的距离 -------
  // #region
  get right() {
    return this.getAttribute("right") || "40px";
  }
  set right(t) {
    this.setAttribute("right", t), n(this, s).style.right = t;
  }
  // #endregion
  // ------- end -------
  // ------- bottom 滚动按钮距离下边的距离 -------
  // #region
  get bottom() {
    return this.getAttribute("bottom") || "40px";
  }
  set bottom(t) {
    this.setAttribute("bottom", t), n(this, s).style.bottom = t;
  }
  // #endregion
  // ------- end ------- 
  // ------- icon 图标类名 -------
  // #region
  get icon() {
    return this.getAttribute("icon") || "icon-angle-up";
  }
  set icon(t) {
    this.setAttribute("icon", t), n(this, s).innerHTML = `
            <ea-icon icon="${t}" part='icon'></ea-icon>
        `;
  }
  // #endregion
  // ------- end -------
  // ------- visibility-height 滚动按钮显示和隐藏的触发条件 -------
  // #region
  get visibilityHeight() {
    return this.getAttribute("visibility-height") || 200;
  }
  set visibilityHeight(t) {
    this.setAttribute("visibility-height", t);
  }
  connectedCallback() {
    this.target = this.target, this.right = this.right, this.bottom = this.bottom, this.visibilityHeight = this.visibilityHeight, this.icon = this.icon, h(this, r, m).call(this);
  }
}
s = new WeakMap(), r = new WeakSet(), // #endregion
// ------- end -------
g = function(t) {
  let o = null, l = null;
  return t === "null" || t === "" || t === null || t === void 0 || t === "undefined" ? (o = document, l = document.documentElement) : (o = document.querySelector(t), l = document.querySelector(t)), { dom: o, scrollDom: l };
}, p = function(t) {
  t.scrollTop > this.visibilityHeight ? (n(this, s).style.display = "flex", n(this, s).ontransitionend = null, y(() => {
    n(this, s).style.opacity = 1;
  }, 10)) : (n(this, s).style.opacity = 0, n(this, s).ontransitionend = () => {
    n(this, s).style.display = "none";
  });
}, m = function() {
  const { dom: t, scrollDom: o } = h(this, r, g).call(this, this.target);
  h(this, r, p).call(this, o), t.addEventListener("scroll", () => {
    h(this, r, p).call(this, o);
  }), n(this, s).addEventListener("click", function() {
    let l = 10, u = setInterval(() => {
      l += 5, o.scrollTop -= l, o.scrollTop <= 0 && (o.scrollTop = 0, clearInterval(u), u = null, this.dispatchEvent(new CustomEvent("reachedTop", {})));
    }, 12);
    this.dispatchEvent(new CustomEvent("backtop", {}));
  });
};
customElements.get("ea-backtop") || customElements.define("ea-backtop", x);
export {
  x as EaBacktop
};
