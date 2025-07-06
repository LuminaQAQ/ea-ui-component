var u = (t) => {
  throw TypeError(t);
};
var c = (t, i, e) => i.has(t) || u("Cannot " + e);
var n = (t, i, e) => i.has(t) ? u("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(t) : i.set(t, e);
var r = (t, i, e) => (c(t, i, "access private method"), e);
import { t as d } from "./timeout.js";
import { B as m } from "./Base.js";
const v = `
.ea-radio-group_wrap {
  display: flex;
}
`;
var s, l, h;
class p extends m {
  constructor() {
    super();
    n(this, s);
    const e = this.attachShadow({ mode: "open" });
    e.innerHTML = `
            <div class="ea-radio-group_wrap" part="container">
                <slot></slot>
            </div>
        `, this.build(e, v);
  }
  // ------- name 唯一键值 -------
  // #region
  get name() {
    return this.getAttribute("name");
  }
  set name(e) {
    this.setAttribute("name", e), this.querySelectorAll("ea-radio").forEach((a) => {
      a.setAttribute("name", e);
    });
  }
  // #endregion
  // ------- end -------
  // ------- value 值 -------
  // #region
  get value() {
    return this.getAttribute("value") || "";
  }
  set value(e) {
    e && this.setAttribute("value", e);
  }
  connectedCallback() {
    this.setAttribute("data-ea-component", !0), this.name = this.name, this.value = this.value, d(() => {
      const e = this.querySelectorAll("ea-radio");
      r(this, s, l).call(this, e), r(this, s, h).call(this, e);
    }, 20);
  }
}
s = new WeakSet(), // #endregion
// ------- end -------
l = function(e) {
  e.forEach((a) => {
    a.checked && (this.value = a.value), a.addEventListener("change", (o) => {
      this.value = a.value, this.dispatchEvent(new CustomEvent("change", {
        bubbles: !0,
        composed: !0,
        detail: {
          target: a,
          value: this.value
        }
      }));
    });
  });
}, h = function(e) {
  const a = Array.from(e).find((o) => o.value === this.value);
  a && (a.checked = !0);
};
window.customElements.get("ea-radio-group") || window.customElements.define("ea-radio-group", p);
export {
  p as EaRadioGroup
};
