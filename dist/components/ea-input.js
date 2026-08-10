import { a as x } from "../core/EaFormAssociatedBase.ts.js";
import { c as v } from "../utils/bem.ts.js";
import { q as l, a as r, l as _, C as w, p as m } from "../core/decorator.js";
import { h as c } from "../utils/html.ts.js";
import { E as d } from "../utils/Enum.ts.js";
import { s as C } from "../css/ea-input.style.js";
import "./ea-icon.js";
class E extends Event {
  constructor(e) {
    super("ea-clear", { bubbles: !0, cancelable: !0, composed: !0 }), this.detail = e;
  }
}
class I extends Event {
  constructor(e) {
    super("input", { bubbles: !0, composed: !0 }), this.detail = e;
  }
}
class A extends Event {
  constructor(e = {}) {
    super("focus", { bubbles: !0, composed: !0 }), this.detail = e;
  }
}
class L extends Event {
  constructor(e = {}) {
    super("blur", { bubbles: !0, composed: !0 }), this.detail = e;
  }
}
class $ extends Event {
  constructor(e) {
    super("change", { bubbles: !0, composed: !0 }), this.detail = e;
  }
}
var T = Object.defineProperty, S = Object.getOwnPropertyDescriptor, s = (t, e, o, n) => {
  for (var h = n > 1 ? void 0 : n ? S(e, o) : e, p = t.length - 1, u; p >= 0; p--)
    (u = t[p]) && (h = (n ? u(e, o, h) : u(h)) || h);
  return n && h && T(e, o, h), h;
};
const y = "ea-input", a = v(y), P = [
  "textarea",
  "text",
  "button",
  "checkbox",
  "color",
  "date",
  "datetime-local",
  "email",
  "file",
  "hidden",
  "image",
  "month",
  "number",
  "password",
  "radio",
  "range",
  "reset",
  "search",
  "submit",
  "tel",
  "time",
  "url",
  "week"
];
let i = class extends x {
  constructor() {
    super(...arguments), this._isFocus = !1, this._originTextareaHeight = 0, this._originalAbortController = null, this.label = "", this.type = "text", this.size = "default", this.value = "", this.required = !1, this.placeholder = "", this.maxlength = null, this.minlength = null, this.clearable = !1, this.clearIcon = "xmark", this.disabled = !1, this.showPassword = !1, this.prefixIcon = "", this.suffixIcon = "", this.showWordLimit = !1, this.rows = 2, this.autosize = !1, this.minRows = null, this.maxRows = null, this.autocomplete = "off", this.name = "", this.readonly = !1, this.max = null, this.min = null, this.step = 1, this.pattern = null, this.resize = "vertical", this.autofocus = !1, this.tabindex = "", this.inputmode = "";
  }
  get validationTarget() {
    return this._original;
  }
  updateContainerClasslist() {
    var f;
    const t = this.type === "textarea", e = this.type === "text", o = !t && this.querySelector("[slot=prepend]"), n = !t && this.querySelector("[slot=append]"), h = this.showPassword && this.value && !t && (this.type === "password" || this.type === "text"), p = this.showWordLimit && (t || e), u = this.clearable && ((f = this.value) == null ? void 0 : f.length) && !t, b = !t && this.size !== "default", g = a(
      {
        textarea: t,
        "show-password": h,
        "show-word-limit": p,
        "has-prepend": o,
        "has-append": n,
        ["size-" + this.size]: b
      },
      {
        focus: this._isFocus,
        disabled: this.disabled,
        clearable: u
      }
    );
    return this._container && (this._container.className = g), g;
  }
  _renderOriginal(t) {
    const e = this.getAttribute("id") || Math.random().toString(36).substring(2, 7), o = t === "textarea" ? `<textarea id="${e}" class="${a.e("original")}" part="original"></textarea>` : `<input id="${e}" class="${a.e("original")}" type="${t}" part="original" />`;
    if (this._originalWrapper.innerHTML = c(o), this._original.value = this.value, this._original.disabled = this.disabled, this._original.readOnly = this.readonly, this._original.placeholder = this.placeholder, this._original.required = this.required, this._original.autocomplete = this.autocomplete, this._original.autofocus = this.autofocus, this._original.name = this.name, this.maxlength && this.maxlength > 0 && (this._original.maxLength = this.maxlength), this.minlength && this.minlength > 0 && (this._original.minLength = this.minlength), t !== "textarea") {
      const n = this._original;
      n.max = this.max, n.min = this.min, n.step = this.step, this.pattern && (n.pattern = this.pattern);
    }
    this.tabindex && (this._original.tabIndex = this.tabindex ? parseInt(this.tabindex) : 0);
  }
  html() {
    const t = this.getAttribute("id") || Math.random().toString(36).substring(2, 7), e = this.type === "textarea" ? `<textarea id="${t}" class="${a.e("original")}" part="original"></textarea>` : `<input id="${t}" class="${a.e("original")}" type="${this.type || "text"}" part="original" />`;
    return `
      <label class="${a()}" part="container">
        <span class="${a.e("form-label")}" part="label"></span>
        <section class="${a.e("region")}" part="region">
          <div class="${a.e("prepend")}" part="prepend">
            <slot name="prepend"></slot>
          </div>
          <div class="${a.e("inner")}" part="inner">
            <span class="${a.e("prefix")}" part="prefix">
              <slot name="prefix"></slot>
            </span>
            <span class="${a.e("original-wrapper")}" part="original-wrapper">
              ${e}
            </span>
            <span class="${a.e("suffix")}" part="suffix">
              <ea-icon class="${a.e("clear-icon")}" name="xmark" part="clear-icon"></ea-icon>
              <ea-icon class="${a.e("show-password-icon")}" name="eye-slash" part="show-password-icon"></ea-icon>
              <span class="${a.e("suffix-icon")}" part="suffix-icon">
                <slot name="suffix"></slot>
              </span>
              <span class="${a.e("word-count")}" part="count"></span>
            </span>
          </div>
          <div class="${a.e("append")}" part="append">
            <slot name="append"></slot>
          </div>
        </section>
      </label>
    `;
  }
  focus(t) {
    this._isFocus = !0, this._original.focus(t);
  }
  blur() {
    this._isFocus = !1, this._original.blur();
  }
  clear() {
    this.value = "", this._original.value = "", this.showWordLimit && this.maxlength && this._updateWordCount();
  }
  select() {
    this._original.select();
  }
  setRangeText(t, e, o, n = "preserve") {
    this._original instanceof HTMLInputElement ? this._original.setRangeText(t, e, o, n) : this._original instanceof HTMLTextAreaElement && this._original.setRangeText(t, e, o, n), this.value = this._original.value;
  }
  setSelectionRange(t, e, o) {
    this._original.setSelectionRange(
      t,
      e,
      o
    );
  }
  showPicker() {
    this._original instanceof HTMLInputElement && "showPicker" in this._original && this._original.showPicker();
  }
  stepDown(t) {
    if (this._original instanceof HTMLInputElement)
      try {
        this._original.stepDown(t), this.value = this._original.value;
      } catch {
      }
  }
  stepUp(t) {
    if (this._original instanceof HTMLInputElement)
      try {
        this._original.stepUp(t), this.value = this._original.value;
      } catch {
      }
  }
  _handleClearIconClick() {
    if (!this.clearable) return;
    const t = this.value;
    this.clear(), this.showWordLimit && (this.type === "textarea" || this.type === "text") && this._updateWordCount(), this.focus(), this.dispatchEvent(new E({ oldValue: t }));
  }
  _handleShowPasswordIconClick() {
    this.showPassword && (this.type === "password" ? this.type = "text" : this.type === "text" && (this.type = "password"), this.focus());
  }
  _handleInput(t) {
    const { value: e } = t.target;
    this.value = e, this.dispatchEvent(new I({ value: e }));
  }
  _handleFocus() {
    this._isFocus = !0, this.updateContainerClasslist(), this.dispatchEvent(new A());
  }
  _handleBlur() {
    this._isFocus = !1, this.updateContainerClasslist(), this.dispatchEvent(new L());
  }
  _handleAutosize(t) {
    if (!this.autosize || this.type !== "textarea") return;
    const e = this._originTextareaHeight / this.rows;
    this.minRows > 0 && this._original.scrollHeight < this.minRows * e || this.maxRows > 0 && this._original.scrollHeight > this.maxRows * e || (this._original.style.height = `${this._originTextareaHeight}px`, this._original.scrollHeight, this._original.style.height = `${t.target.scrollHeight + 2}px`);
  }
  _handleChange(t) {
    const { value: e } = t.target;
    this.value = e, this.dispatchEvent(new $({ value: e }));
  }
  /** 更新字数统计 */
  _updateWordCount() {
    !this.showWordLimit || !this.maxlength || (this._wordCount.textContent = `${this._original.value.length} / ${this.maxlength}`);
  }
  $mount() {
    this.updateContainerClasslist(), this._bindOriginalEvents();
  }
  _bindOriginalEvents() {
    this._originalAbortController && this._originalAbortController.abort(), this._originalAbortController = new AbortController();
    const { signal: t } = this._originalAbortController;
    this._originalWrapper.addEventListener(
      "input",
      (e) => {
        e.target.classList.contains(a.e("original")) && (e.stopPropagation(), this._handleInput(e), this._handleAutosize(e));
      },
      { signal: t }
    ), this._originalWrapper.addEventListener(
      "focusin",
      (e) => {
        e.target.classList.contains(a.e("original")) && (e.stopPropagation(), this._handleFocus());
      },
      { signal: t }
    ), this._originalWrapper.addEventListener(
      "focusout",
      (e) => {
        e.target.classList.contains(a.e("original")) && (e.stopPropagation(), this._handleBlur());
      },
      { signal: t }
    ), this._originalWrapper.addEventListener(
      "change",
      (e) => {
        e.target.classList.contains(a.e("original")) && (e.stopPropagation(), this._handleChange(e));
      },
      { signal: t }
    );
  }
  $beforeUnmount() {
    this._originalAbortController && (this._originalAbortController.abort(), this._originalAbortController = null);
  }
  updateValidity() {
    var e, o, n, h;
    super.updateValidity();
    const t = this.value || "";
    this.minlength > 0 && t.length > 0 && t.length < this.minlength && ((e = this.internals) == null || e.setValidity(
      { tooShort: !0 },
      `请至少输入 ${this.minlength} 个字符`,
      this._original
    ), (o = this.internals) == null || o.reportValidity()), this.maxlength > 0 && t.length > this.maxlength && ((n = this.internals) == null || n.setValidity(
      { tooLong: !0 },
      `请最多输入 ${this.maxlength} 个字符`,
      this._original
    ), (h = this.internals) == null || h.reportValidity()), this._syncAriaInvalid();
  }
  _syncAriaInvalid() {
    var e, o;
    ((o = (e = this.internals) == null ? void 0 : e.validity) == null ? void 0 : o.valid) ?? !0 ? this._original.removeAttribute("aria-invalid") : this._original.setAttribute("aria-invalid", "true");
  }
  checkValidity() {
    var t, e;
    return this.updateValidity(), ((e = (t = this.internals) == null ? void 0 : t.validity) == null ? void 0 : e.valid) ?? !0;
  }
  reportValidity() {
    var t;
    return this.updateValidity(), ((t = this.internals) == null ? void 0 : t.reportValidity()) ?? !0;
  }
};
s([
  l(a.cb())
], i.prototype, "_container", 2);
s([
  l(a.ce("prepend"))
], i.prototype, "_prepend", 2);
s([
  l(a.ce("inner"))
], i.prototype, "_inner", 2);
s([
  l('slot[name="prefix"]')
], i.prototype, "_prefixSlot", 2);
s([
  l(a.ce("original-wrapper"))
], i.prototype, "_originalWrapper", 2);
s([
  l(a.ce("original"))
], i.prototype, "_original", 2);
s([
  l(a.ce("suffix"))
], i.prototype, "_suffix", 2);
s([
  l(a.ce("suffix-icon"))
], i.prototype, "_suffixIcon", 2);
s([
  l(a.ce("clear-icon"))
], i.prototype, "_clearIcon", 2);
s([
  l(a.ce("show-password-icon"))
], i.prototype, "_showPasswordIcon", 2);
s([
  l(a.ce("word-count"))
], i.prototype, "_wordCount", 2);
s([
  l(a.ce("append"))
], i.prototype, "_append", 2);
s([
  l(a.ce("form-label"))
], i.prototype, "_label", 2);
s([
  m({ type: Boolean, default: !1 })
], i.prototype, "_isFocus", 2);
s([
  m({ type: Number, default: 0 })
], i.prototype, "_originTextareaHeight", 2);
s([
  r({
    type: String,
    default: "",
    observer(t) {
      this._label.textContent = t;
    }
  })
], i.prototype, "label", 2);
s([
  r({
    type: d(P),
    default: "text",
    observer(t, e) {
      const o = e === "textarea", n = t === "textarea";
      o !== n ? this._renderOriginal(t) : !n && this._original instanceof HTMLInputElement && (this._original.type = t), this.showPassword && !n && (t === "text" ? this._showPasswordIcon.setAttribute("name", "eye") : t === "password" && this._showPasswordIcon.setAttribute("name", "eye-slash")), this.updateContainerClasslist();
    }
  })
], i.prototype, "type", 2);
s([
  r({
    type: d(["large", "default", "small"]),
    default: "default",
    observer() {
      this.updateContainerClasslist();
    }
  })
], i.prototype, "size", 2);
s([
  r({
    type: String,
    default: "",
    observer(t) {
      t = typeof t == "string" && t === "" ? null : t, this._original.value = t || "", this.setValue(t), this.resetCustomValidity(), (this.clearable || this.showPassword) && this.updateContainerClasslist(), this.showWordLimit && this.maxlength && this._updateWordCount();
    }
  })
], i.prototype, "value", 2);
s([
  r({
    type: Boolean,
    default: !1,
    a11y: {
      ariaAttr: "aria-required",
      target: a.ce("original"),
      map: (t) => String(t)
    },
    observer(t) {
      this._original.required = t;
    }
  })
], i.prototype, "required", 2);
s([
  r({
    type: String,
    default: "",
    observer(t) {
      this._original.placeholder = t;
    }
  })
], i.prototype, "placeholder", 2);
s([
  r({
    type: Number,
    default: void 0,
    observer(t) {
      this.hasAttribute("maxlength") && (this._original.maxLength = t);
    }
  })
], i.prototype, "maxlength", 2);
s([
  r({
    type: Number,
    default: void 0,
    observer(t) {
      t > 0 && (this._original.minLength = t);
    }
  })
], i.prototype, "minlength", 2);
s([
  r({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], i.prototype, "clearable", 2);
s([
  r({
    type: String,
    default: "xmark",
    observer(t) {
      this.clearable && this._clearIcon.setAttribute("name", t);
    }
  })
], i.prototype, "clearIcon", 2);
s([
  r({
    type: Boolean,
    default: !1,
    a11y: {
      ariaAttr: "aria-disabled",
      target: ".ea-input__original",
      map: (t) => String(t)
    },
    observer(t) {
      this._original.disabled = t, this.updateContainerClasslist();
    }
  })
], i.prototype, "disabled", 2);
s([
  r({
    type: Boolean,
    default: !1,
    observer(t) {
      this.type !== "textarea" && (t && (this.type === "text" ? this._showPasswordIcon.setAttribute("name", "eye") : this.type === "password" && this._showPasswordIcon.setAttribute("name", "eye-slash")), this.updateContainerClasslist());
    }
  })
], i.prototype, "showPassword", 2);
s([
  r({
    type: String,
    default: "",
    observer(t) {
      t && (this._prefixSlot.innerHTML = c(
        `<ea-icon class="${a.e("prefix-icon")}" part="prefix-icon" name="${t}"></ea-icon>`
      ));
    }
  })
], i.prototype, "prefixIcon", 2);
s([
  r({
    type: String,
    default: "",
    observer(t) {
      t && (this._suffixIcon.innerHTML = c(
        `<ea-icon class="${a.e("suffix-icon-item")}" part="suffix-icon" name="${t}"></ea-icon>`
      ));
    }
  })
], i.prototype, "suffixIcon", 2);
s([
  r({
    type: Boolean,
    default: !1,
    observer(t) {
      this.type !== "textarea" && this.type !== "text" || (t && this.hasAttribute("maxlength") && this._updateWordCount(), this.updateContainerClasslist());
    }
  })
], i.prototype, "showWordLimit", 2);
s([
  r({
    type: Number,
    default: 2,
    observer(t) {
      this.type === "textarea" && this._original instanceof HTMLTextAreaElement && (this._original.rows = t);
    }
  })
], i.prototype, "rows", 2);
s([
  r({
    type: Boolean,
    default: !1,
    observer(t) {
      this.type === "textarea" && (this._original.clientHeight, this._originTextareaHeight = this._original.scrollHeight);
    }
  })
], i.prototype, "autosize", 2);
s([
  r({
    type: Number,
    default: 0
  })
], i.prototype, "minRows", 2);
s([
  r({
    type: Number,
    default: 0
  })
], i.prototype, "maxRows", 2);
s([
  r({
    type: String,
    default: "off",
    observer(t) {
      this._original.autocomplete = t;
    }
  })
], i.prototype, "autocomplete", 2);
s([
  r({
    type: String,
    default: "",
    observer(t) {
      this._original.name = t;
    }
  })
], i.prototype, "name", 2);
s([
  r({
    type: Boolean,
    default: !1,
    observer(t) {
      this._original.readOnly = t;
    }
  })
], i.prototype, "readonly", 2);
s([
  r({
    type: Number,
    default: Number.MAX_SAFE_INTEGER,
    observer(t) {
      this._original instanceof HTMLInputElement && (this._original.max = t);
    }
  })
], i.prototype, "max", 2);
s([
  r({
    type: Number,
    default: Number.MIN_SAFE_INTEGER,
    observer(t) {
      this._original instanceof HTMLInputElement && (this._original.min = t);
    }
  })
], i.prototype, "min", 2);
s([
  r({
    type: Number,
    default: 1,
    observer(t) {
      this._original instanceof HTMLInputElement && (this._original.step = t);
    }
  })
], i.prototype, "step", 2);
s([
  r({
    type: String,
    default: "",
    observer(t) {
      this._original instanceof HTMLInputElement && (t ? this._original.pattern = t : this._original.removeAttribute("pattern"));
    }
  })
], i.prototype, "pattern", 2);
s([
  r({
    type: d(["none", "both", "horizontal", "vertical"]),
    default: "vertical"
  })
], i.prototype, "resize", 2);
s([
  r({
    type: Boolean,
    default: !1,
    observer(t) {
      this._original.autofocus = t;
    }
  })
], i.prototype, "autofocus", 2);
s([
  r({
    type: String,
    default: "",
    a11y: {
      ariaAttr: "aria-label",
      target: ".ea-input__original",
      map: (t) => t || null
    }
  })
], i.prototype, "ariaLabel", 2);
s([
  r({
    type: String,
    default: "",
    observer(t) {
      this._original.tabIndex = t ? parseInt(t) : 0;
    }
  })
], i.prototype, "tabindex", 2);
s([
  r({
    type: String,
    default: "",
    observer(t) {
      this._original.inputMode = t;
    }
  })
], i.prototype, "inputmode", 2);
s([
  _("click", a.ce("clear-icon"))
], i.prototype, "_handleClearIconClick", 1);
s([
  _("click", a.ce("show-password-icon"))
], i.prototype, "_handleShowPasswordIconClick", 1);
i = s([
  w(y, { styles: [C] })
], i);
export {
  i as EaInput
};
