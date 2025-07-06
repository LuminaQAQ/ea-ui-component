var u = (t) => {
  throw TypeError(t);
};
var i = (t, s, e) => s.has(t) || u("Cannot " + e);
var d = (t, s, e) => (i(t, s, "read from private field"), e ? e.call(t) : s.get(t)), h = (t, s, e) => s.has(t) ? u("Cannot add the same private member more than once") : s instanceof WeakSet ? s.add(t) : s.set(t, e), b = (t, s, e, a) => (i(t, s, "write to private field"), a ? a.call(t, e) : s.set(t, e), e), n = (t, s, e) => (i(t, s, "access private method"), e);
import { B as p } from "./Base.js";
const k = `
.ea-checkbox-group {
  display: flex;
}
.ea-checkbox-group ::slotted(ea-checkbox) {
  margin-right: 1.5rem;
}
`;
var o, c, l;
class x extends p {
  constructor() {
    super();
    h(this, c);
    h(this, o, !1);
    const e = this.attachShadow({ mode: "open" });
    e.innerHTML = `
            <div class="ea-checkbox-group_wrap" part="container">
                <slot></slot>
            </div>
        `, this.build(e, k);
  }
  // ------- name 唯一键值 -------
  // #region
  get name() {
    return this.getAttribute("name") || "ea-checkbox";
  }
  set name(e) {
    this.setAttribute("name", e), this.querySelectorAll("ea-checkbox").forEach((a) => {
      a.setAttribute("name", e), a.name = e;
    });
  }
  // #endregion
  // ------- end -------
  // ------- value 指定选中值 -------
  // #region
  get value() {
    return this.getAttribute("value") || "";
  }
  set value(e) {
    this.setAttribute("value", e);
    try {
      const a = e.split(",").map((r) => r.trimStart());
      a.map((r) => {
        const m = this.querySelector(`ea-checkbox[value="${r}"]`);
        m.checked = "true";
      }), this.dispatchEvent(new CustomEvent("change", { detail: a }));
    } catch {
    }
  }
  // #endregion
  // ------- end -------
  // ------- disabled 禁用 -------
  // #region
  get disabled() {
    return this.getAttrBoolean("disabled");
  }
  set disabled(e) {
    if (!e && !d(this, o)) return;
    this.querySelectorAll("ea-checkbox").forEach((r) => {
      r.disabled = e;
    });
  }
  connectedCallback() {
    this.setAttribute("data-ea-component", !0), setTimeout(() => {
      this.name = this.name, this.value = this.value, this.disabled = this.disabled;
      const e = this.querySelectorAll("ea-checkbox");
      e.forEach((a) => {
        a.addEventListener("change", (r) => {
          n(this, c, l).call(this, e);
        });
      }), n(this, c, l).call(this, e), b(this, o, !0);
    }, 50);
  }
}
o = new WeakMap(), c = new WeakSet(), // #endregion
// ------- end -------
l = function(e) {
  let a = [];
  Array.from(e).filter((r) => r.checked ? a.push(r.value) : !1), this.value = a.join(",");
};
window.customElements.get("ea-checkbox-group") || window.customElements.define("ea-checkbox-group", x);
export {
  x as EaCheckboxGroup
};
