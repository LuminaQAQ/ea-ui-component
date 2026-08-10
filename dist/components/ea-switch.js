import { E as b } from "../core/EaFormAssociatedBase.ts.js";
import { c as g } from "../utils/bem.ts.js";
import { q as h, a as l, l as d, C as _, p as v } from "../core/decorator.js";
import { E as y } from "../utils/Enum.ts.js";
import { s as C } from "../css/ea-switch.style.js";
class p extends Event {
  constructor(s) {
    super("change", {
      bubbles: !0,
      cancelable: !0,
      composed: !0
    }), this.detail = s;
  }
}
var V = Object.defineProperty, m = Object.getOwnPropertyDescriptor, i = (e, s, a, n) => {
  for (var o = n > 1 ? void 0 : n ? m(s, a) : s, u = e.length - 1, c; u >= 0; u--)
    (c = e[u]) && (o = (n ? c(s, a, o) : c(o)) || o);
  return n && o && V(s, a, o), o;
};
const f = "ea-switch", r = g(f);
let t = class extends b {
  constructor() {
    super(...arguments), this._parsedActiveValue = !0, this._parsedInactiveValue = !1, this.label = "", this.name = "", this.value = !1, this.activeValue = !0, this.inactiveValue = !1, this.size = "default", this.inactiveText = "", this.inactiveColor = "", this.activeText = "", this.activeColor = "", this.disabled = !1, this.required = !1, this.beforeChange = null;
  }
  /** 解析属性值为实际类型 */
  _parseValue(e) {
    return e === "true" || e === !0 ? !0 : e === "false" || e === !1 ? !1 : typeof e == "number" ? e : typeof e == "string" && e !== "" && !isNaN(Number(e)) ? Number(e) : typeof e == "string" ? e : !1;
  }
  /** 处理 value 属性变化，同步原生 input 状态和表单值 */
  _handleValueChange(e) {
    const a = this._parseValue(e) == this._parsedActiveValue ? this._parsedActiveValue : this._parsedInactiveValue;
    this._originalInput && (this._originalInput.value = String(a), this._originalInput.checked = a === this._parsedActiveValue), this.setValue(String(a)), this.updateContainerClasslist(), this._syncAriaChecked();
  }
  updateContainerClasslist() {
    const e = r(
      { [this.size]: !0 },
      {
        checked: this._parseValue(this.value) === this._parsedActiveValue,
        disabled: this.disabled
      }
    );
    return this._container && (this._container.className = e), e;
  }
  html() {
    const e = this.getAttribute("name") || Math.random().toString(36).substring(2, 15), s = this._parseValue(this.value) === this._parsedActiveValue;
    return `
      <label class="${this.updateContainerClasslist()}" part="wrapper" for="${e}">
        <span class="${r.e("form-label")}" part="label form-label">${this.label}</span>
        <span class="${r.e("content")}" part="container">
          <input id="${e}" type="checkbox" class="${r.e("original")}" part="original"
            name="${e}"
            ${s ? "checked" : ""}
            ${this.disabled ? "disabled" : ""}
            ${this.required ? "required" : ""} />
          <span class="${r.e("label-left")}" part="label-left" aria-hidden="true">
            <slot name="inactive"></slot>
          </span>
          <span class="${r.e("inner")}" part="switch"></span>
          <span class="${r.e("label-right")}" part="label-right" aria-hidden="true">
            <slot name="active"></slot>
          </span>
        </span>
      </label>
    `;
  }
  _handleChangeEvent(e) {
    e.stopPropagation();
    const a = e.target.checked ? this._parsedActiveValue : this._parsedInactiveValue;
    this.value = String(a), this.dispatchEvent(new p({ value: a }));
  }
  _handleClickEvent(e) {
    !this.beforeChange || typeof this.beforeChange != "function" || (e.preventDefault(), e.stopImmediatePropagation(), this.beforeChange().then(() => {
      this._originalInput.checked = !this._originalInput.checked;
      const a = this._originalInput.checked ? this._parsedActiveValue : this._parsedInactiveValue;
      this.value = String(a), this.dispatchEvent(new p({ value: a }));
    }).catch(() => {
    }));
  }
  _handleKeydown(e) {
    if (this.disabled || e.key !== " " && e.key !== "Enter") return;
    e.preventDefault();
    const a = this._parseValue(this.value) === this._parsedActiveValue ? this._parsedInactiveValue : this._parsedActiveValue;
    this.beforeChange && typeof this.beforeChange == "function" ? this.beforeChange().then(() => {
      this.value = String(a), this.dispatchEvent(new p({ value: a }));
    }).catch(() => {
    }) : (this.value = String(a), this.dispatchEvent(new p({ value: a })));
  }
  formResetCallback() {
    this.value = !1, this.setValidity({});
  }
  $mount() {
    this.setAttribute("role", "switch"), this.tabIndex = 0, this.name || this.setAttribute("name", Math.random().toString(36).substring(2, 15)), this._handleValueChange(this.value), this._syncAriaChecked();
  }
  /** 同步 aria-checked 状态 */
  _syncAriaChecked() {
    const e = this._parseValue(this.value) === this._parsedActiveValue;
    this.setAttribute("aria-checked", String(e));
  }
  $updated() {
    this.updateContainerClasslist();
  }
  get validationTarget() {
    return this._container;
  }
  /** 更新表单验证状态，required 时必须选中 */
  updateValidity() {
    var a, n;
    const e = this._container ?? void 0, s = this._parseValue(this.value) === this._parsedActiveValue;
    this.required && !s ? (a = this.internals) == null || a.setValidity(
      { valueMissing: !0 },
      "请开启此选项",
      e
    ) : (n = this.internals) == null || n.setValidity({}, "", e);
  }
  checkValidity() {
    var e, s;
    return this.updateValidity(), ((s = (e = this.internals) == null ? void 0 : e.validity) == null ? void 0 : s.valid) ?? !0;
  }
  reportValidity() {
    var e;
    return this.updateValidity(), ((e = this.internals) == null ? void 0 : e.reportValidity()) ?? !0;
  }
};
i([
  h(r.cb())
], t.prototype, "_container", 2);
i([
  h(r.ce("original"))
], t.prototype, "_originalInput", 2);
i([
  h(r.ce("label-left"))
], t.prototype, "_labelLeftSlot", 2);
i([
  h(r.ce("label-right"))
], t.prototype, "_labelRightSlot", 2);
i([
  h(r.ce("form-label"))
], t.prototype, "_label", 2);
i([
  l({
    type: String,
    default: "",
    observer(e) {
      this._label && (this._label.textContent = e);
    }
  })
], t.prototype, "label", 2);
i([
  l({
    type: String,
    default: "",
    observer(e) {
      this._container && this._container.setAttribute("for", e), this._originalInput && (this._originalInput.setAttribute("name", e), this._originalInput.setAttribute("id", e));
    }
  })
], t.prototype, "name", 2);
i([
  l({
    type: {
      Number: (e) => {
        const s = Number(e);
        return !isNaN(s) && e !== "";
      },
      Boolean: (e) => e === "true" || e === !0 || e === "false" || e === !1 || e === "",
      String: (e) => typeof e == "string"
    },
    default: !1,
    observer(e) {
      this._handleValueChange(e);
    }
  })
], t.prototype, "value", 2);
i([
  l({
    type: String,
    default: "true",
    observer(e) {
      this._parsedActiveValue = this._parseValue(e), this._handleValueChange(this.value);
    }
  })
], t.prototype, "activeValue", 2);
i([
  l({
    type: String,
    default: "false",
    observer(e) {
      this._parsedInactiveValue = this._parseValue(e), this._handleValueChange(this.value);
    }
  })
], t.prototype, "inactiveValue", 2);
i([
  l({
    type: y(["large", "default", "small"]),
    default: "default",
    observer() {
      this.updateContainerClasslist();
    }
  })
], t.prototype, "size", 2);
i([
  l({
    type: String,
    default: "",
    observer(e) {
      this._labelLeftSlot && (this._labelLeftSlot.textContent = e);
    }
  })
], t.prototype, "inactiveText", 2);
i([
  l({
    type: String,
    default: "",
    observer(e) {
      this.style.setProperty("--ea-switch-inactive-bg-color", e);
    }
  })
], t.prototype, "inactiveColor", 2);
i([
  l({
    type: String,
    default: "",
    observer(e) {
      this._labelRightSlot && (this._labelRightSlot.textContent = e);
    }
  })
], t.prototype, "activeText", 2);
i([
  l({
    type: String,
    default: "",
    observer(e) {
      this.style.setProperty("--ea-switch-active-bg-color", e);
    }
  })
], t.prototype, "activeColor", 2);
i([
  l({
    type: Boolean,
    default: !1,
    a11y: { ariaAttr: "aria-disabled", map: (e) => String(e) },
    observer(e) {
      this._originalInput && this._originalInput.toggleAttribute("disabled", e), this.updateContainerClasslist();
    }
  })
], t.prototype, "disabled", 2);
i([
  l({
    type: Boolean,
    default: !1,
    observer(e) {
      this._originalInput && this._originalInput.toggleAttribute("required", e);
    }
  })
], t.prototype, "required", 2);
i([
  v({
    type: Function,
    default: null
  })
], t.prototype, "beforeChange", 2);
i([
  d("change", r.ce("original"))
], t.prototype, "_handleChangeEvent", 1);
i([
  d("click", r.ce("original"))
], t.prototype, "_handleClickEvent", 1);
i([
  d("keydown")
], t.prototype, "_handleKeydown", 1);
t = i([
  _(f, { styles: [C] })
], t);
export {
  t as EaSwitch
};
