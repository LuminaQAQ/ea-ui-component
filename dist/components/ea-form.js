var c = (t) => {
  throw TypeError(t);
};
var f = (t, a, e) => a.has(t) || c("Cannot " + e);
var i = (t, a, e) => (f(t, a, "read from private field"), e ? e.call(t) : a.get(t)), u = (t, a, e) => a.has(t) ? c("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(t) : a.set(t, e), h = (t, a, e, s) => (f(t, a, "write to private field"), s ? s.call(t, e) : a.set(t, e), e);
import { B as v } from "./Base.js";
import "./index3.js";
import { V as d } from "./index2.js";
import { t as I } from "./timeout.js";
import "./ea-button.js";
var n;
class p extends v {
  constructor() {
    super();
    u(this, n);
    const e = this.attachShadow({ mode: "open" });
    e.innerHTML = `
            <form class='ea-form_wrap' part='container'>
                <slot></slot>
            </form>
        `;
  }
  // ------- data 获取form表单的值 -------
  // #region
  get data() {
    const e = {};
    return this.querySelectorAll("[data-ea-component]").forEach((l) => {
      e[l.name] = l.value;
    }), e;
  }
  // #endregion
  // ------- end -------
  // ------- rules 校验规则 -------
  // #region
  get rules() {
    return i(this, n) || {};
  }
  set rules(e) {
    h(this, n, e);
    const s = this.querySelectorAll("ea-form-item");
    this.querySelectorAll("[data-ea-component]").forEach((r, o) => {
      var m;
      s[o].rule = e[r.name], s[o].validateEvent(), s[o].isRequired = !!((m = e[r.name]) != null && m.required);
    });
  }
  // #endregion
  // ------- end -------
  validate() {
    const e = this.querySelectorAll("ea-form-item"), s = this.querySelectorAll("[data-ea-component]");
    let l = [];
    return s.forEach((r, o) => {
      if (i(this, n)[r.name]) {
        for (const m in e[o].rule)
          if (d[m])
            if (d[m](r.value, e[o].rule[m]))
              e[o].isInvalid = !1, r.isInvalid = !1;
            else {
              e[o].isInvalid = !0, r.isInvalid = !0, l.push(r.name);
              break;
            }
      }
    }), new Promise((r, o) => {
      l.length > 0 ? o(l) : r(!0);
    });
  }
  reset() {
    const e = this.querySelectorAll("ea-form-item");
    this.querySelectorAll("[data-ea-component]").forEach((l, r) => {
      l.value = "", l.isInvalid = !1, e[r].isInvalid = !1;
    });
  }
  connectedCallback() {
    I(() => {
      const e = this.querySelectorAll("ea-form-item"), s = Array.from(e).map((r) => r.label.length), l = Math.max(...s);
      e.forEach((r) => {
        const o = r.shadowRoot.querySelector(".ea-form-item_label-wrap");
        o && (o.style.width = `${l * 20}px`);
      }), this.dispatchEvent(new CustomEvent("ready", { bubbles: !0 }));
    }, 50);
  }
}
n = new WeakMap();
customElements.get("ea-form") || customElements.define("ea-form", p);
export {
  p as EaForm
};
