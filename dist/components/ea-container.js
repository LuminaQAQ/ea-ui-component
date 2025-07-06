var l = (t) => {
  throw TypeError(t);
};
var s = (t, a, e) => a.has(t) || l("Cannot " + e);
var d = (t, a, e) => (s(t, a, "read from private field"), e ? e.call(t) : a.get(t)), c = (t, a, e) => a.has(t) ? l("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(t) : a.set(t, e), h = (t, a, e, o) => (s(t, a, "write to private field"), o ? o.call(t, e) : a.set(t, e), e), f = (t, a, e) => (s(t, a, "access private method"), e);
import { B as u } from "./Base.js";
import "./index3.js";
const p = `
.ea-container_wrap {
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
.ea-container_wrap.is-vertical {
  flex-direction: column;
}
.ea-container_wrap ::slotted(ea-main) {
  flex: 1;
  overflow: auto;
}
`;
var r, n, m;
class w extends u {
  constructor() {
    super();
    c(this, n);
    c(this, r);
    const e = this.attachShadow({ mode: "open" });
    e.innerHTML = `
            <div class="ea-container_wrap" part="container">
                <slot></slot>
            </div>
        `, h(this, r, e.querySelector(".ea-container_wrap")), this.build(e, p);
  }
  get CONTAINER_TYPE() {
    return ["ea-header", "ea-main", "ea-footer", "ea-container", "ea-aside"];
  }
  // ------- direction 排列方向 -------
  // #region
  get direction() {
    return ["horizontal", "vertical"].includes(this.getAttribute("direction")) || "horizontal";
  }
  set direction(e) {
    this.setAttribute("direction", e), d(this, r).classList.toggle("is-vertical", e === "horizontal");
  }
  connectedCallback() {
    const e = Array.from(this.children);
    f(this, n, m).call(this, e);
  }
}
r = new WeakMap(), n = new WeakSet(), // #endregion
// ------- end -------
m = function(e) {
  const o = e.map((i) => i.tagName.toLowerCase());
  e.forEach((i) => {
    this.CONTAINER_TYPE.includes(i.tagName.toLowerCase()) || i.remove(), i.tagName.toLowerCase() === "ea-container" && (i.style.flex = "1");
  }), o.includes("ea-header") || o.includes("ea-footer") ? this.direction = "horizontal" : this.direction = this.direction;
};
customElements.get("ea-container") || customElements.define("ea-container", w);
export {
  w as EaContainer
};
