var c = (r, a, e) => {
  if (!a.has(r))
    throw TypeError("Cannot " + e);
};
var i = (r, a, e) => (c(r, a, "read from private field"), e ? e.call(r) : a.get(r)), f = (r, a, e) => {
  if (a.has(r))
    throw TypeError("Cannot add the same private member more than once");
  a instanceof WeakSet ? a.add(r) : a.set(r, e);
}, u = (r, a, e, s) => (c(r, a, "write to private field"), s ? s.call(r, e) : a.set(r, e), e);
import { B as d } from "./Base.js";
import "./index3.js";
import { V as h } from "./index2.js";
import { t as v } from "./timeout.js";
import "./ea-button.js";
var n;
class I extends d {
  constructor() {
    super();
    f(this, n, void 0);
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
    u(this, n, e);
    const s = this.querySelectorAll("ea-form-item");
    this.querySelectorAll("[data-ea-component]").forEach((t, o) => {
      var m;
      s[o].rule = e[t.name], s[o].validateEvent(), s[o].isRequired = !!((m = e[t.name]) != null && m.required);
    });
  }
  // #endregion
  // ------- end -------
  validate() {
    const e = this.querySelectorAll("ea-form-item"), s = this.querySelectorAll("[data-ea-component]");
    let l = [];
    return s.forEach((t, o) => {
      if (i(this, n)[t.name]) {
        for (const m in e[o].rule)
          if (h[m])
            if (h[m](t.value, e[o].rule[m]))
              e[o].isInvalid = !1, t.isInvalid = !1;
            else {
              e[o].isInvalid = !0, t.isInvalid = !0, l.push(t.name);
              break;
            }
      }
    }), new Promise((t, o) => {
      l.length > 0 ? o(l) : t(!0);
    });
  }
  reset() {
    const e = this.querySelectorAll("ea-form-item");
    this.querySelectorAll("[data-ea-component]").forEach((l, t) => {
      l.value = "", l.isInvalid = !1, e[t].isInvalid = !1;
    });
  }
  connectedCallback() {
    v(() => {
      const e = this.querySelectorAll("ea-form-item"), s = Array.from(e).map((t) => t.label.length), l = Math.max(...s);
      e.forEach((t) => {
        const o = t.shadowRoot.querySelector(".ea-form-item_label-wrap");
        o && (o.style.width = `${l * 20}px`);
      }), this.dispatchEvent(new CustomEvent("ready", { bubbles: !0 }));
    }, 50);
  }
}
n = new WeakMap();
customElements.get("ea-form") || customElements.define("ea-form", I);
export {
  I as EaForm
};
