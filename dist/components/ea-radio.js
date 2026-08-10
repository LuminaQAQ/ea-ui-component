import { E as y } from "../core/EaFormAssociatedBase.ts.js";
import { c as m } from "../utils/bem.ts.js";
import { q as b, a as d, l as p, C as g, c as A } from "../core/decorator.js";
import { E as C } from "../utils/Enum.ts.js";
import { s as k } from "../css/ea-radio.style.js";
import { s as V } from "../css/ea-radio-group.style.js";
class f extends Event {
  constructor(t) {
    super("change", {
      bubbles: !0,
      cancelable: !0,
      composed: !0
    }), this.detail = t;
  }
}
class R extends Event {
  constructor(t) {
    super("focus", {
      bubbles: !0,
      composed: !0
    }), this.detail = t;
  }
}
class w extends Event {
  constructor(t) {
    super("blur", {
      bubbles: !0,
      composed: !0
    }), this.detail = t;
  }
}
var $ = Object.defineProperty, I = Object.getOwnPropertyDescriptor, n = (e, t, a, s) => {
  for (var i = s > 1 ? void 0 : s ? I(t, a) : t, u = e.length - 1, c; u >= 0; u--)
    (c = e[u]) && (i = (s ? c(t, a, i) : c(i)) || i);
  return s && i && $(t, a, i), i;
};
const _ = "ea-radio", h = m(_);
let S = 0, r = class extends y {
  constructor() {
    super(...arguments), this._isFocus = !1, this.size = "default", this.value = "", this.label = "", this.checked = !1, this.disabled = !1, this.border = !1, this._dispatchChangeEvent = () => {
      this.dispatchEvent(
        new f({
          value: this.value,
          checked: !!this.checked
        })
      );
    }, this._handleChangeEvent = (e) => {
      e.stopPropagation(), this.checked = this._original.checked, this._dispatchChangeEvent();
    }, this._handleFocusEvent = (e) => {
      this._isFocus = !0, this.updateContainerClasslist(), this.dispatchEvent(
        new R({
          value: this.value,
          checked: !!this.checked
        })
      );
    }, this._handleBlurEvent = (e) => {
      this._isFocus = !1, this.updateContainerClasslist(), this.dispatchEvent(
        new w({
          value: this.value,
          checked: !!this.checked
        })
      );
    }, this._handleKeydownEvent = (e) => {
      this.disabled || (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this.checked = !0, this._dispatchChangeEvent());
    };
  }
  updateContainerClasslist() {
    const e = h(
      { [this.size]: !0 },
      {
        checked: this.checked,
        disabled: this.disabled,
        border: this.border,
        focus: this._isFocus
      }
    );
    return this._container && (this._container.className = e), e;
  }
  html() {
    return `
      <label class="${this.updateContainerClasslist()}" part="container">
        <span class="${h.e("input")}" part="input-wrap">
          <span class="${h.e("inner")}" part="input" tabindex="0"></span>
          <input class="${h.e("original")}" type="radio" part="original"
            name="${this.name || ""}"
            value="${this.value || ""}"
            ${this.checked ? "checked" : ""}
            ${this.disabled ? "disabled" : ""} />
        </span>
        <span class="${h.e("label")}" part="label">
          <slot>${this.label || ""}</slot>
        </span>
      </label>
    `;
  }
  /** 获取焦点 */
  focus() {
    var e;
    (e = this._innerEl) == null || e.focus();
  }
  /** 失去焦点 */
  blur() {
    var e;
    (e = this._innerEl) == null || e.blur();
  }
  formResetCallback() {
    this.checked = !1, this.setValidity({});
  }
  $mount() {
    this.setAttribute("role", "radio"), this.id || (this.id = `${_}-${++S}`), this.updateContainerClasslist();
  }
  $updated() {
    this.updateContainerClasslist();
  }
  get validationTarget() {
    return this._container;
  }
  /** 更新表单验证状态，required 时必须选中 */
  updateValidity() {
    var t, a;
    const e = this._container ?? void 0;
    this.required && !this.checked ? (t = this.internals) == null || t.setValidity(
      { valueMissing: !0 },
      "请选择一个选项",
      e
    ) : (a = this.internals) == null || a.setValidity({}, "", e);
  }
  checkValidity() {
    var e, t;
    return this.updateValidity(), ((t = (e = this.internals) == null ? void 0 : e.validity) == null ? void 0 : t.valid) ?? !0;
  }
  reportValidity() {
    var e;
    return this.updateValidity(), ((e = this.internals) == null ? void 0 : e.reportValidity()) ?? !0;
  }
};
n([
  b(h.cb())
], r.prototype, "_container", 2);
n([
  b(h.ce("original"))
], r.prototype, "_original", 2);
n([
  b(h.ce("inner"))
], r.prototype, "_innerEl", 2);
n([
  b(h.ce("label"))
], r.prototype, "_labelSlot", 2);
n([
  d({
    type: C(["small", "default", "large"]),
    default: "default",
    observer() {
      this.updateContainerClasslist();
    }
  })
], r.prototype, "size", 2);
n([
  d({
    type: String,
    default: "",
    observer(e) {
      this._original && (this._original.value = e);
    }
  })
], r.prototype, "value", 2);
n([
  d({
    type: String,
    default: "",
    observer(e) {
      this._labelSlot && (this._labelSlot.textContent = e);
    }
  })
], r.prototype, "label", 2);
n([
  d({
    type: Boolean,
    default: !1,
    a11y: { ariaAttr: "aria-checked", map: (e) => String(!!e) },
    observer(e) {
      this._original && (this._original.checked = e), e ? this.setValue(this.value) : this.removeValue(), this.updateContainerClasslist();
    }
  })
], r.prototype, "checked", 2);
n([
  d({
    type: Boolean,
    default: !1,
    a11y: { ariaAttr: "aria-disabled", map: (e) => String(e) },
    observer(e) {
      this._original && (this._original.disabled = e), this.updateContainerClasslist();
    }
  })
], r.prototype, "disabled", 2);
n([
  d({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], r.prototype, "border", 2);
n([
  p("change", h.ce("original"))
], r.prototype, "_handleChangeEvent", 2);
n([
  p("focus", h.ce("inner"))
], r.prototype, "_handleFocusEvent", 2);
n([
  p("blur", h.ce("inner"))
], r.prototype, "_handleBlurEvent", 2);
n([
  p("keydown")
], r.prototype, "_handleKeydownEvent", 2);
r = n([
  g(_, { styles: [k] })
], r);
var x = Object.defineProperty, B = Object.getOwnPropertyDescriptor, o = (e, t, a, s) => {
  for (var i = s > 1 ? void 0 : s ? B(t, a) : t, u = e.length - 1, c; u >= 0; u--)
    (c = e[u]) && (i = (s ? c(t, a, i) : c(i)) || i);
  return s && i && x(t, a, i), i;
};
const E = "ea-radio-group", v = m(E);
let l = class extends y {
  constructor() {
    super(...arguments), this.label = "", this.name = "", this.value = "", this.disabled = !1, this.size = "", this.border = !1, this.required = !1, this._updateRadioChildrenName = () => {
      var e;
      (e = this._radioItems) == null || e.forEach((t) => {
        t.setAttribute("name", this.name);
      });
    }, this._updateRadioChildrenValue = () => {
      var e;
      (e = this._radioItems) == null || e.forEach((t) => {
        const a = t.getAttribute("value");
        t.toggleAttribute("checked", this.value === a);
      });
    }, this._updateChildrenSize = () => {
      var e;
      this.size && ((e = this._radioItems) == null || e.forEach((t) => {
        t.getAttribute("size") || t.setAttribute("size", this.size);
      }));
    }, this._handleSlotChange = () => {
      this._updateRadioChildrenName(), this._updateRadioChildrenValue(), this._updateActiveDescendant();
    }, this._handleChange = (e) => {
      if (!(e instanceof f)) return;
      const { value: t } = e.detail;
      this.value = t;
    }, this._handleKeydown = (e) => {
      const t = this._getEnabledRadios();
      if (!t.length) return;
      const a = t.findIndex(
        (i) => i.hasAttribute("checked")
      );
      let s = a;
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault(), s = a < t.length - 1 ? a + 1 : 0;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault(), s = a > 0 ? a - 1 : t.length - 1;
          break;
        case " ":
          if (e.preventDefault(), a < 0 && t[0]) {
            const i = t[0].getAttribute("value") || "";
            this.value = i, this.dispatchEvent(
              new f({ value: i, checked: !0 })
            );
          }
          return;
        default:
          return;
      }
      if (s !== a && t[s]) {
        const i = t[s].getAttribute("value") || "";
        this.value = i, this.dispatchEvent(
          new f({ value: i, checked: !0 })
        );
      }
    };
  }
  updateContainerClasslist() {
    const e = v();
    return this._container && (this._container.className = e), e;
  }
  html() {
    return `
      <div class="${this.updateContainerClasslist()}" part="container">
        <label class="${v.e("form-label")}" part="form-label"></label>
        <slot></slot>
      </div>
    `;
  }
  /** 获取非禁用的 radio 列表 */
  _getEnabledRadios() {
    return Array.from(this._radioItems || []).filter(
      (e) => !e.hasAttribute("disabled")
    );
  }
  /** 更新 aria-activedescendant 指向当前选中或第一个 radio */
  _updateActiveDescendant() {
    const e = this._radioItems;
    if (!e || !e.length) return;
    const a = Array.from(e).find(
      (s) => s.hasAttribute("checked")
    ) || e[0];
    a != null && a.id && this.setAttribute("aria-activedescendant", a.id);
  }
  formResetCallback() {
    var e;
    this.value = "", (e = this._radioItems) == null || e.forEach((t) => {
      t.toggleAttribute("checked", !1);
    }), this.setValidity({});
  }
  $mount() {
    this.setAttribute("role", "radiogroup"), this.tabIndex = 0, this.name || (this.name = Math.random().toString(36).substring(2, 15)), this.updateContainerClasslist(), this._label && this.label && (this._label.textContent = this.label), queueMicrotask(() => {
      this._updateRadioChildrenName(), this._updateRadioChildrenValue(), this._updateActiveDescendant();
    });
  }
  get validationTarget() {
    var t;
    return (this._radioItems ? Array.from(this._radioItems).find((a) => a.hasAttribute("checked")) : null) || ((t = this._radioItems) == null ? void 0 : t[0]) || this._container;
  }
  /** 更新表单验证状态 */
  updateValidity() {
    var a, s;
    const e = this.value !== "" && this.value != null, t = this.validationTarget ?? void 0;
    this.required && !e ? (a = this.internals) == null || a.setValidity(
      { valueMissing: !0 },
      "请选择一个选项",
      t
    ) : (s = this.internals) == null || s.setValidity({}, "", t);
  }
  checkValidity() {
    var e, t;
    return this.updateValidity(), ((t = (e = this.internals) == null ? void 0 : e.validity) == null ? void 0 : t.valid) ?? !0;
  }
  reportValidity() {
    var e;
    return this.updateValidity(), ((e = this.internals) == null ? void 0 : e.reportValidity()) ?? !0;
  }
};
o([
  b(v.cb())
], l.prototype, "_container", 2);
o([
  b(v.ce("form-label"))
], l.prototype, "_label", 2);
o([
  A("ea-radio")
], l.prototype, "_radioItems", 2);
o([
  d({
    type: String,
    default: "",
    a11y: { ariaAttr: "aria-label", map: (e) => e || null },
    observer(e) {
      this._label && (this._label.textContent = e);
    }
  })
], l.prototype, "label", 2);
o([
  d({
    type: String,
    default: "",
    observer() {
      this._updateRadioChildrenName();
    }
  })
], l.prototype, "name", 2);
o([
  d({
    type: String,
    default: "",
    observer() {
      this._updateRadioChildrenValue(), this.setValue(this.value), this._updateActiveDescendant();
    }
  })
], l.prototype, "value", 2);
o([
  d({
    type: Boolean,
    default: !1,
    observer(e) {
      var t;
      (t = this._radioItems) == null || t.forEach((a) => {
        a.toggleAttribute("disabled", e);
      });
    }
  })
], l.prototype, "disabled", 2);
o([
  d({
    type: C(["", "small", "default", "large"]),
    default: "",
    observer() {
      this._updateChildrenSize();
    }
  })
], l.prototype, "size", 2);
o([
  d({
    type: Boolean,
    default: !1,
    observer(e) {
      var t;
      (t = this._radioItems) == null || t.forEach((a) => {
        a.toggleAttribute("border", e);
      });
    }
  })
], l.prototype, "border", 2);
o([
  d({
    type: Boolean,
    default: !1,
    a11y: { ariaAttr: "aria-required" }
  })
], l.prototype, "required", 2);
o([
  p("slotchange", "shadowRoot")
], l.prototype, "_handleSlotChange", 2);
o([
  p("change", void 0, { capture: !0 })
], l.prototype, "_handleChange", 2);
o([
  p("keydown")
], l.prototype, "_handleKeydown", 2);
l = o([
  g(E, { styles: [V] })
], l);
export {
  r as EaRadio,
  l as EaRadioGroup
};
