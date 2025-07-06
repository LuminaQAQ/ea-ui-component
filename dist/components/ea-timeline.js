var p = (t, i, e) => {
  if (!i.has(t))
    throw TypeError("Cannot " + e);
};
var r = (t, i, e) => {
  if (i.has(t))
    throw TypeError("Cannot add the same private member more than once");
  i instanceof WeakSet ? i.add(t) : i.set(t, e);
}, l = (t, i, e, a) => (p(t, i, "write to private field"), a ? a.call(t, e) : i.set(t, e), e);
var d = (t, i, e) => (p(t, i, "access private method"), e);
import { B as v } from "./Base.js";
import "./ea-timeline-item.js";
import { h as A } from "./handleDefaultAttrIsTrue.js";
const T = `

`;
var s, n, o, w;
class b extends v {
  constructor() {
    super();
    // #endregion
    // ------- end -------
    r(this, o);
    r(this, s, void 0);
    r(this, n, void 0);
    const e = this.attachShadow({ mode: "open" });
    e.innerHTML = `
      <div class='ea-timeline_wrap' part='container'>
        <ul class='ea-timeline-item_container' part='list-wrap'>
          <slot></slot>
        </ul>
      </div>
    `, l(this, s, e.querySelector(".ea-timeline_wrap")), l(this, n, e.querySelector(".ea-timeline-item_container")), this.build(e, T);
  }
  // ------- reverse 时间线排序 -------
  // #region
  get reverse() {
    const e = this.getAttribute("reverse");
    return A(e);
  }
  set reverse(e) {
    this.setAttribute("reverse", e), d(this, o, w).call(this, e);
  }
  connectedCallback() {
    this.reverse = this.reverse;
  }
}
s = new WeakMap(), n = new WeakMap(), o = new WeakSet(), w = function(e) {
  e = e === "true" || e === !0, Array.from(this.querySelectorAll("ea-timeline-item")).sort((m, c) => {
    const h = new Date(m.time), u = new Date(c.time);
    return e ? u - h : h - u;
  }).forEach((m, c) => {
    this.appendChild(m);
  });
};
customElements.get("ea-timeline") || customElements.define("ea-timeline", b);
export {
  b as EaTimeline
};
