var c = (t) => {
  throw TypeError(t);
};
var f = (t, r, e) => r.has(t) || c("Cannot " + e);
var i = (t, r, e) => (f(t, r, "read from private field"), e ? e.call(t) : r.get(t)), n = (t, r, e) => r.has(t) ? c("Cannot add the same private member more than once") : r instanceof WeakSet ? r.add(t) : r.set(t, e), m = (t, r, e, a) => (f(t, r, "write to private field"), a ? a.call(t, e) : r.set(t, e), e);
import { B as h } from "./Base.js";
import "./index3.js";
import { w } from "./timeout.js";
const u = {
  required(t) {
    return typeof t == "string" ? t !== "" : Array.isArray(t) ? t.length > 0 : !1;
  },
  min(t, r) {
    return t.length >= r;
  },
  max(t, r) {
    return t.length <= r;
  },
  reg(t, r) {
    return r.test(t);
  }
}, g = `
.ea-form-item_wrap {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 22px;
}
.ea-form-item_wrap .ea-form-item_label-wrap {
  text-align: right;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  box-sizing: border-box;
}
.ea-form-item_wrap .ea-form-item_content-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
}
.ea-form-item_wrap .ea-form-item_content-wrap .ea-form-item_invalid-wrap {
  position: absolute;
  bottom: 0;
  left: 0;
  transform-origin: top center;
  transform: translateY(100%) scaleY(0);
  font-size: 12px;
  color: #f56c6c;
  white-space: nowrap;
}
.ea-form-item_wrap.is-required-star .ea-form-item_label-wrap::before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
.ea-form-item_wrap.is-required .ea-form-item_content-wrap .ea-form-item_invalid-wrap {
  transform: translateY(100%) scaleY(1);
}
.ea-form-item_wrap.is-required .ea-form-item_label-wrap {
  color: #f56c6c;
}
.ea-form-item_wrap.is-required ::slotted(ea-input),
.ea-form-item_wrap.is-required ::slotted(ea-select),
.ea-form-item_wrap.is-required ::slotted(ea-textarea),
.ea-form-item_wrap.is-required ::slotted(ea-time-picker),
.ea-form-item_wrap.is-required ::slotted(ea-date-picker) {
  border-color: #f56c6c;
}
.ea-form-item_wrap ::slotted(ea-input),
.ea-form-item_wrap ::slotted(ea-select),
.ea-form-item_wrap ::slotted(ea-textarea),
.ea-form-item_wrap ::slotted(ea-time-picker),
.ea-form-item_wrap ::slotted(ea-date-picker) {
  border: 1px solid transparent;
  border-radius: 3px;
}
.ea-form-item_wrap.with-transition .ea-form-item_content-wrap .ea-form-item_invalid-wrap {
  transition: transform 0.3s;
}
.ea-form-item_wrap.with-transition .ea-form-item_label-wrap {
  transition: color 0.3s;
}
`;
var o, s, l, d;
class b extends h {
  constructor() {
    super();
    n(this, o);
    n(this, s);
    n(this, l);
    n(this, d);
    const e = this.attachShadow({ mode: "open" });
    e.innerHTML = `
            <div class='ea-form-item_wrap' part='container'>
                <label class="ea-form-item_label-wrap" part='label-wrap'>
                    <slot name='label'></slot>
                </label>
                <div class="ea-form-item_content-wrap" part='content-wrap'> 
                    <slot></slot>
                    <span class="ea-form-item_invalid-wrap" part='invalid-wrap'>
                        <slot name='invalid-text'></slot>
                    </span>
                </div>
            </div>
        `, m(this, s, e.querySelector(".ea-form-item_wrap")), m(this, l, e.querySelector(".ea-form-item_label-wrap")), m(this, d, e.querySelector(".ea-form-item_invalid-wrap")), this.build(e, g);
  }
  // ------- label 标签 -------
  // #region
  get label() {
    return this.getAttribute("label");
  }
  set label(e) {
    this.setAttribute("label", e);
    const a = i(this, l).querySelector("slot");
    try {
      a.assignedNodes().length === 0 && (i(this, l).innerHTML = e);
    } catch {
    }
  }
  // #endregion
  // ------- end -------
  // ------- trigger 触发器 -------
  // #region
  get trigger() {
    const e = this.getAttribute("trigger");
    return ["blur", "change"].includes(e) ? e : "blur";
  }
  set trigger(e) {
    this.setAttribute("trigger", e);
  }
  // #endregion
  // ------- end -------
  // ------- is-invalid 是否校验失败 -------
  // #region
  get isInvalid() {
    return this.getAttribute("is-invalid") === "true";
  }
  set isInvalid(e) {
    this.setAttribute("is-invalid", e), i(this, s).classList.toggle("is-required", e);
  }
  // #endregion
  // ------- end -------
  // ------- rule 校验规则 -------
  // #region
  get rule() {
    return i(this, o);
  }
  set rule(e) {
    m(this, o, e);
    for (const a in e)
      this[a] = e[a];
  }
  // #endregion
  // ------- end -------
  // ------- isRequired 是否必填 -------
  // #region
  get isRequired() {
    return this.getAttrBoolean("is-required");
  }
  set isRequired(e) {
    this.setAttribute("is-required", e), i(this, s).classList.toggle("is-required-star", e);
  }
  // #endregion
  // ------- end -------
  validateEvent() {
    const e = this.querySelector("[data-ea-component]");
    try {
      e.addEventListener(this.trigger, (a) => {
        for (const p in i(this, o))
          if (u[p])
            if (u[p](e.value, i(this, o)[p]))
              e.isInvalid = !1, i(this, s).classList.remove("is-required");
            else {
              e.isInvalid = !0, i(this, s).classList.add("is-required");
              break;
            }
      });
    } catch {
    }
  }
  connectedCallback() {
    this.label = this.label, this.trigger = this.trigger, w(i(this, s), 50);
  }
}
o = new WeakMap(), s = new WeakMap(), l = new WeakMap(), d = new WeakMap();
customElements.get("ea-form-item") || customElements.define("ea-form-item", b);
export {
  b as E,
  u as V
};
