var n = (e) => {
  throw TypeError(e);
};
var r = (e, a, t) => a.has(e) || n("Cannot " + t);
var o = (e, a, t) => (r(e, a, "read from private field"), t ? t.call(e) : a.get(e)), c = (e, a, t) => a.has(e) ? n("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(e) : a.set(e, t), p = (e, a, t, i) => (r(e, a, "write to private field"), i ? i.call(e, t) : a.set(e, t), t);
import { B as d } from "./Base.js";
import "./index3.js";
const l = `
.ea-pane_wrap {
  display: none;
}
.ea-pane_wrap.is-actived {
  display: block;
}
`;
var s;
class h extends d {
  constructor() {
    super();
    c(this, s);
    const t = this.attachShadow({ mode: "open" });
    t.innerHTML = `
            <div class="ea-pane_wrap" part="container">
                <slot></slot>
            </div>
        `, p(this, s, t.querySelector(".ea-pane_wrap")), this.build(t, l);
  }
  // ------- actived 是否激活 -------
  // #region
  get actived() {
    return this.getAttribute("actived");
  }
  set actived(t) {
    this.setAttribute("actived", t), o(this, s).classList.toggle("is-actived", t);
  }
  // #endregion
  // ------- end -------
  // ------- name 标签唯一标识 -------
  // #region
  get name() {
    return this.getAttribute("name");
  }
  set name(t) {
    this.setAttribute("name", t);
  }
  // #endregion
  // ------- end -------
}
s = new WeakMap();
customElements.get("ea-pane") || customElements.define("ea-pane", h);
export {
  h as EaPane
};
