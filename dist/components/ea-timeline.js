var p = (t) => {
  throw TypeError(t);
};
var d = (t, i, e) => i.has(t) || p("Cannot " + e);
var r = (t, i, e) => i.has(t) ? p("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(t) : i.set(t, e), l = (t, i, e, a) => (d(t, i, "write to private field"), a ? a.call(t, e) : i.set(t, e), e), w = (t, i, e) => (d(t, i, "access private method"), e);
import { B as A } from "./Base.js";
import "./ea-timeline-item.js";
import { h as T } from "./handleDefaultAttrIsTrue.js";
const b = `

`;
var s, n, o, v;
class f extends A {
  constructor() {
    super();
    r(this, o);
    r(this, s);
    r(this, n);
    const e = this.attachShadow({ mode: "open" });
    e.innerHTML = `
      <div class='ea-timeline_wrap' part='container'>
        <ul class='ea-timeline-item_container' part='list-wrap'>
          <slot></slot>
        </ul>
      </div>
    `, l(this, s, e.querySelector(".ea-timeline_wrap")), l(this, n, e.querySelector(".ea-timeline-item_container")), this.build(e, b);
  }
  // ------- reverse 时间线排序 -------
  // #region
  get reverse() {
    const e = this.getAttribute("reverse");
    return T(e);
  }
  set reverse(e) {
    this.setAttribute("reverse", e), w(this, o, v).call(this, e);
  }
  connectedCallback() {
    this.reverse = this.reverse;
  }
}
s = new WeakMap(), n = new WeakMap(), o = new WeakSet(), // #endregion
// ------- end -------
v = function(e) {
  e = e === "true" || e === !0, Array.from(this.querySelectorAll("ea-timeline-item")).sort((m, c) => {
    const h = new Date(m.time), u = new Date(c.time);
    return e ? u - h : h - u;
  }).forEach((m, c) => {
    this.appendChild(m);
  });
};
customElements.get("ea-timeline") || customElements.define("ea-timeline", f);
export {
  f as EaTimeline
};
