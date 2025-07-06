var n = (e, a, t) => {
  if (!a.has(e))
    throw TypeError("Cannot " + t);
};
var r = (e, a, t) => (n(e, a, "read from private field"), t ? t.call(e) : a.get(e)), o = (e, a, t) => {
  if (a.has(e))
    throw TypeError("Cannot add the same private member more than once");
  a instanceof WeakSet ? a.add(e) : a.set(e, t);
}, c = (e, a, t, i) => (n(e, a, "write to private field"), i ? i.call(e, t) : a.set(e, t), t);
import { B as p } from "./Base.js";
import "./index3.js";
const d = `
.ea-pane_wrap {
  display: none;
}
.ea-pane_wrap.is-actived {
  display: block;
}
`;
var s;
class l extends p {
  constructor() {
    super();
    o(this, s, void 0);
    const t = this.attachShadow({ mode: "open" });
    t.innerHTML = `
            <div class="ea-pane_wrap" part="container">
                <slot></slot>
            </div>
        `, c(this, s, t.querySelector(".ea-pane_wrap")), this.build(t, d);
  }
  // ------- actived 是否激活 -------
  // #region
  get actived() {
    return this.getAttribute("actived");
  }
  set actived(t) {
    this.setAttribute("actived", t), r(this, s).classList.toggle("is-actived", t);
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
customElements.get("ea-pane") || customElements.define("ea-pane", l);
export {
  l as EaPane
};
