import { E as m } from "../core/EaFormAssociatedBase.ts.js";
import { c as v } from "../utils/bem.ts.js";
import { q as p, a as l, l as b, C as y, c as x, p as E } from "../core/decorator.js";
import { E as g } from "../utils/Enum.ts.js";
import { s as V } from "../css/ea-checkbox.style.js";
import { s as A } from "../css/ea-checkbox-group.style.js";
class S extends Event {
  constructor(t) {
    super("blur", {
      bubbles: !0,
      composed: !0
    }), this.detail = t;
  }
}
class C extends Event {
  constructor(t) {
    super("change", {
      bubbles: !0,
      cancelable: !0,
      composed: !0
    }), this.detail = t;
  }
}
class $ extends Event {
  constructor(t) {
    super("focus", {
      bubbles: !0,
      composed: !0
    }), this.detail = t;
  }
}
var D = Object.defineProperty, I = Object.getOwnPropertyDescriptor, a = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? I(t, i) : t, u = e.length - 1, c; u >= 0; u--)
    (c = e[u]) && (r = (o ? c(t, i, r) : c(r)) || r);
  return o && r && D(t, i, r), r;
};
const k = "ea-checkbox", d = v(k);
let s = class extends m {
  constructor() {
    super(...arguments), this.size = "default", this.value = "", this.label = "", this.checked = !1, this.disabled = !1, this.indeterminate = !1, this.border = !1, this.limitDisabled = !1, this.required = !1, this._updateCheckboxValue = () => {
      const e = this.value || this.hasAttribute("checked");
      this.checked ? this.setValue(e) : this.setValue(null);
    }, this._dispatchChangeEvent = () => {
      this.dispatchEvent(
        new C({
          value: this.value,
          checked: !!this.checked
        })
      );
    }, this._handleChangeEvent = (e) => {
      e.stopPropagation(), this.checked = this._original.checked, this._dispatchChangeEvent();
    }, this._handleKeydownEvent = (e) => {
      this.disabled || this.limitDisabled || e.key === " " && (e.preventDefault(), this._original.checked = !this.checked, this.checked = this._original.checked, this._dispatchChangeEvent());
    }, this._handleFocusEvent = (e) => {
      e instanceof FocusEvent && this.dispatchEvent(
        new $({
          value: this.value,
          checked: this.checked
        })
      );
    }, this._handleBlurEvent = (e) => {
      e instanceof FocusEvent && this.dispatchEvent(
        new S({
          value: this.value,
          checked: this.checked
        })
      );
    };
  }
  updateContainerClasslist() {
    const e = d(
      { [this.size]: !0 },
      {
        checked: this.checked,
        disabled: this.disabled,
        indeterminate: this.indeterminate,
        "limit-disabled": this.limitDisabled,
        border: this.border
      }
    );
    return this._container && (this._container.className = e), e;
  }
  html() {
    const e = this.getAttribute("id") || Math.random().toString(36).substring(2, 15);
    return `
      <label class="${this.updateContainerClasslist()}" part="container" for="${e}">
        <input
          id="${e}"
          type="checkbox"
          class="${d.e("original")}"
          part="original"
          value="${this.value}"
          ${this.checked ? "checked" : ""}
          ${this.disabled ? "disabled" : ""}
          ${this.required ? "required" : ""}
        />
        <span class="${d.e("inner")}" part="input"></span>
        <span class="${d.e("label")}" part="label">
          <slot>${this.label || ""}</slot>
        </span>
      </label>
    `;
  }
  /** 根据 checked 和 indeterminate 更新 aria-checked 属性 */
  _updateAriaChecked() {
    const e = this.indeterminate ? "mixed" : String(!!this.checked);
    this.setAttribute("aria-checked", e);
  }
  /** 根据 disabled 和 limitDisabled 更新 aria-disabled 属性和 tabIndex */
  _updateAriaDisabled() {
    const e = this.disabled || this.limitDisabled;
    this.setAttribute("aria-disabled", String(e)), this.tabIndex = e ? -1 : 0;
  }
  /** 切换选中状态 */
  toggle() {
    this.checked = !this.checked, this._dispatchChangeEvent();
  }
  formResetCallback() {
    this.checked = !1, this.setValidity({});
  }
  $mount() {
    this.setAttribute("role", "checkbox"), this.tabIndex = 0, this._updateAriaChecked(), this._updateAriaDisabled(), this.updateContainerClasslist();
  }
  $updated() {
    this.updateContainerClasslist();
  }
  get validationTarget() {
    return this._container;
  }
  /** 更新表单验证状态，required 时必须选中 */
  updateValidity() {
    var t, i;
    const e = this._container ?? void 0;
    this.required && !this.checked ? (t = this.internals) == null || t.setValidity({ valueMissing: !0 }, "请勾选此项", e) : (i = this.internals) == null || i.setValidity({}, "", e);
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
a([
  p(d.cb())
], s.prototype, "_container", 2);
a([
  p(d.ce("original"))
], s.prototype, "_original", 2);
a([
  p(d.ce("inner"))
], s.prototype, "_innerEl", 2);
a([
  p(d.ce("label"))
], s.prototype, "_labelSlot", 2);
a([
  l({
    type: g(["small", "default", "large"]),
    default: "default",
    observer() {
      this.updateContainerClasslist();
    }
  })
], s.prototype, "size", 2);
a([
  l({
    type: String,
    default: "",
    observer(e) {
      this._original && (this._original.value = e), this._updateCheckboxValue();
    }
  })
], s.prototype, "value", 2);
a([
  l({
    type: String,
    default: "",
    observer(e) {
      this._labelSlot && (this._labelSlot.textContent = e);
    }
  })
], s.prototype, "label", 2);
a([
  l({
    type: Boolean,
    default: !1,
    observer(e) {
      this._original && (this._original.checked = e), this._updateCheckboxValue(), this.updateContainerClasslist(), this._updateAriaChecked();
    }
  })
], s.prototype, "checked", 2);
a([
  l({
    type: Boolean,
    default: !1,
    observer(e) {
      this._original && (this._original.disabled = e), this.updateContainerClasslist(), this._updateAriaDisabled();
    }
  })
], s.prototype, "disabled", 2);
a([
  l({
    type: Boolean,
    default: !1,
    observer(e) {
      this._original && (this._original.indeterminate = e), this.updateContainerClasslist(), this._updateAriaChecked();
    }
  })
], s.prototype, "indeterminate", 2);
a([
  l({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], s.prototype, "border", 2);
a([
  l({
    type: Boolean,
    default: !1,
    observer(e) {
      this._original && (this._original.disabled = e), this.updateContainerClasslist(), this._updateAriaDisabled();
    }
  })
], s.prototype, "limitDisabled", 2);
a([
  l({
    type: Boolean,
    default: !1,
    a11y: { ariaAttr: "aria-required", map: (e) => String(e) },
    observer(e) {
      this._original && this._original.toggleAttribute("required", e);
    }
  })
], s.prototype, "required", 2);
a([
  b("change", d.ce("original"))
], s.prototype, "_handleChangeEvent", 2);
a([
  b("keydown")
], s.prototype, "_handleKeydownEvent", 2);
a([
  b("focus")
], s.prototype, "_handleFocusEvent", 2);
a([
  b("blur")
], s.prototype, "_handleBlurEvent", 2);
s = a([
  y(k, { styles: [V] })
], s);
var B = Object.defineProperty, q = Object.getOwnPropertyDescriptor, n = (e, t, i, o) => {
  for (var r = o > 1 ? void 0 : o ? q(t, i) : t, u = e.length - 1, c; u >= 0; u--)
    (c = e[u]) && (r = (o ? c(t, i, r) : c(r)) || r);
  return o && r && B(t, i, r), r;
};
const f = "ea-checkbox-group", _ = v(f);
let h = class extends m {
  constructor() {
    super(...arguments), this.label = "", this.name = "", this.value = [], this.disabled = !1, this.min = 0, this.max = 1 / 0, this.size = "", this.required = !1, this._updateCheckboxChildrenName = () => {
      var e;
      (e = this._checkboxItems) == null || e.forEach((t) => {
        t.setAttribute("name", this.name);
      });
    }, this._updateCheckboxChildrenValue = () => {
      var e;
      (e = this._checkboxItems) == null || e.forEach((t) => {
        const i = this.value.includes(t.getAttribute("value"));
        t.toggleAttribute("checked", i);
      });
    }, this._updateGroupValue = (e, t) => {
      e ? this.value.some((o) => o === t) || this.value.push(t) : this.value = this.value.filter((i) => i !== t);
    }, this._updateMinValueStatus = () => {
      var e;
      (e = this._checkboxItems) == null || e.forEach((t) => {
        const i = t.hasAttribute("checked");
        t.toggleAttribute("limit-disabled", i);
      });
    }, this._updateMaxValueStatus = () => {
      var e;
      (e = this._checkboxItems) == null || e.forEach((t) => {
        const i = t.hasAttribute("checked");
        t.toggleAttribute("limit-disabled", !i);
      });
    }, this._restoreLimitValueStatus = () => {
      var e;
      (e = this._checkboxItems) == null || e.forEach((t) => {
        t.toggleAttribute("limit-disabled", !1);
      });
    }, this._updateLimitStatus = () => {
      this.value.length <= this.min ? this._updateMinValueStatus() : this.value.length >= this.max ? this._updateMaxValueStatus() : this._restoreLimitValueStatus();
    }, this._updateChildrenSize = () => {
      var e;
      (e = this._checkboxItems) == null || e.forEach((t) => {
        t.setAttribute("size", this.size);
      });
    }, this._handleSlotChange = () => {
      this._updateCheckboxChildrenName(), this._updateCheckboxChildrenValue(), this._updateLimitStatus();
    }, this._handleChange = (e) => {
      if (!(e instanceof C)) return;
      const { checked: t, value: i } = e.detail;
      this._updateGroupValue(t, i), this._updateLimitStatus();
    };
  }
  updateContainerClasslist() {
    const e = _();
    return this._container && (this._container.className = e), e;
  }
  html() {
    const e = `${f}-label-${Math.random().toString(36).substring(2, 15)}`;
    return `
      <label id="${e}" class="${_.e("form-label")}" part="form-label"></label>
      <div class="${this.updateContainerClasslist()}" part="container" role="group" aria-labelledby="${e}">
        <slot></slot>
      </div>
    `;
  }
  formResetCallback() {
    var e;
    this.value = [], (e = this._checkboxItems) == null || e.forEach((t) => {
      t.toggleAttribute("checked", !1);
    }), this.setValidity({});
  }
  $mount() {
    this.name || (this.name = Math.random().toString(36).substring(2, 15)), this.updateContainerClasslist(), this._label && this.label && (this._label.textContent = this.label), queueMicrotask(() => {
      this._updateCheckboxChildrenName(), this._updateCheckboxChildrenValue(), this._updateLimitStatus();
    });
  }
  get validationTarget() {
    var t;
    return ((t = this._checkboxItems) == null ? void 0 : t[0]) || this._container;
  }
  /** 更新表单验证状态 */
  updateValidity() {
    var i, o;
    const e = Array.isArray(this.value) && this.value.length > 0, t = this.validationTarget ?? void 0;
    this.required && !e ? (i = this.internals) == null || i.setValidity(
      { valueMissing: !0 },
      "请至少选择一个选项",
      t
    ) : (o = this.internals) == null || o.setValidity({}, "", t);
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
  p(_.cb())
], h.prototype, "_container", 2);
n([
  p(_.ce("form-label"))
], h.prototype, "_label", 2);
n([
  x("ea-checkbox")
], h.prototype, "_checkboxItems", 2);
n([
  l({
    type: String,
    default: "",
    observer(e) {
      this._label && (this._label.textContent = e);
    }
  })
], h.prototype, "label", 2);
n([
  l({
    type: String,
    default: "",
    observer() {
      this._updateCheckboxChildrenName();
    }
  })
], h.prototype, "name", 2);
n([
  E({
    type: Array,
    default: [],
    observer() {
      this._updateCheckboxChildrenValue(), this._updateLimitStatus();
    }
  })
], h.prototype, "value", 2);
n([
  l({
    type: Boolean,
    default: !1,
    observer(e) {
      var t;
      (t = this._checkboxItems) == null || t.forEach((i) => {
        i.toggleAttribute("disabled", e);
      });
    }
  })
], h.prototype, "disabled", 2);
n([
  l({
    type: Number,
    default: 0,
    observer() {
      this._updateLimitStatus();
    }
  })
], h.prototype, "min", 2);
n([
  l({
    type: Number,
    default: 1 / 0,
    observer() {
      this._updateLimitStatus();
    }
  })
], h.prototype, "max", 2);
n([
  l({
    type: g(["", "small", "default", "large"]),
    default: "",
    observer() {
      this._updateChildrenSize();
    }
  })
], h.prototype, "size", 2);
n([
  l({
    type: Boolean,
    default: !1
  })
], h.prototype, "required", 2);
n([
  b("slotchange", "shadowRoot")
], h.prototype, "_handleSlotChange", 2);
n([
  b("change", void 0, { capture: !0 })
], h.prototype, "_handleChange", 2);
h = n([
  y(f, { styles: [A] })
], h);
export {
  s as EaCheckbox,
  h as EaCheckboxGroup
};
