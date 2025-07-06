var c = (s, i, t) => {
  if (!i.has(s))
    throw TypeError("Cannot " + t);
};
var p = (s, i, t) => (c(s, i, "read from private field"), t ? t.call(s) : i.get(s)), h = (s, i, t) => {
  if (i.has(s))
    throw TypeError("Cannot add the same private member more than once");
  i instanceof WeakSet ? i.add(s) : i.set(s, t);
}, o = (s, i, t, e) => (c(s, i, "write to private field"), e ? e.call(s, t) : i.set(s, t), t);
import { B as n } from "./Base.js";
import "./index3.js";
import "./ea-step.js";
const f = `
.ea-steps_wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}
.ea-steps_wrap ::slotted(ea-step) {
  flex-basis: 50%;
}
.ea-steps_wrap.is-simple {
  justify-content: unset;
}
.ea-steps_wrap ::slotted(ea-step:last-child) {
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
}
.ea-steps_wrap ::slotted(ea-step[simple]) {
  flex: 1;
}
`;
var l, a;
class u extends n {
  constructor() {
    super();
    h(this, l, void 0);
    h(this, a, void 0);
    const t = this.attachShadow({ mode: "open" });
    t.innerHTML = `
            <div class="ea-steps_wrap" part="container">
                <slot></slot>
            </div>
        `, o(this, l, t.querySelector(".ea-steps_wrap")), this.build(t, f);
  }
  // ------- active 当前的步骤 -------
  // #region
  get active() {
    return this.getAttrNumber("active") || 0;
  }
  set active(t) {
    this.setAttribute("active", t), p(this, a).forEach((e, r) => {
      r < t ? e.status = "finish" : r > t ? e.status = "wait" : e.status = "process";
    });
  }
  // #endregion
  // ------- end -------
  // ------- space 步骤之间的间距 -------
  // #region
  get space() {
    return this.getAttribute("space") || "50%";
  }
  set space(t) {
    this.setAttribute("space", t), p(this, a).forEach((e, r) => {
      r < p(this, a).length - 1 && (e.space = t);
    });
  }
  // #endregion
  // ------- end -------
  // ------- simple 简洁模式 -------
  // #region
  get simple() {
    return this.getAttrBoolean("simple") || !1;
  }
  set simple(t) {
    this.toggleAttr("simple", t), p(this, a).forEach((e, r) => {
      e.simple = t, p(this, l).classList.toggle("is-simple", t), r < p(this, a).length - 1 && (e.space = t ? "auto" : this.space);
    });
  }
  // #endregion
  // ------- end -------
  connectedCallback() {
    const t = this.querySelectorAll("ea-step");
    o(this, a, t), p(this, a).forEach((e, r) => {
      e.setAttribute("index", r), e.index = r;
    }), p(this, a)[p(this, a).length - 1].isLast = !0, this.simple = this.simple, this.active = this.active;
  }
}
l = new WeakMap(), a = new WeakMap();
customElements.get("ea-steps") || customElements.define("ea-steps", u);
export {
  u as EaSteps
};
