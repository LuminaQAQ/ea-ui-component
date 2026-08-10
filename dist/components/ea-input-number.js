import { a as f } from "../core/EaFormAssociatedBase.ts.js";
import { c as y } from "../utils/bem.ts.js";
import { q as c, a as n, l as o, C as v, p as d } from "../core/decorator.js";
import { E as b } from "../utils/Enum.ts.js";
import { s as E } from "../css/ea-input-number.style.js";
import "./ea-icon.js";
class N extends Event {
  constructor(t) {
    super("ea-change", { bubbles: !0, cancelable: !0, composed: !0 }), this.detail = t;
  }
}
class x extends Event {
  constructor() {
    super("focus", { bubbles: !0, composed: !0 });
  }
}
class g extends Event {
  constructor() {
    super("blur", { bubbles: !0, composed: !0 });
  }
}
var I = Object.defineProperty, A = Object.getOwnPropertyDescriptor, s = (e, t, r, u) => {
  for (var l = u > 1 ? void 0 : u ? A(t, r) : t, p = e.length - 1, h; p >= 0; p--)
    (h = e[p]) && (l = (u ? h(t, r, l) : h(l)) || l);
  return u && l && I(t, r, l), l;
};
const _ = "ea-input-number", a = y(_);
let i = class extends f {
  constructor() {
    super(...arguments), this._repeatTimer = null, this._repeatDelay = 400, this._repeatInterval = 100, this._inputId = `ea-input-number-input-${Math.random().toString(36).slice(2, 9)}`, this.defaultValue = 0, this._isFocus = !1, this._isMin = !1, this._isMax = !1, this.label = "", this.value = 0, this.min = Number.MIN_SAFE_INTEGER, this.max = Number.MAX_SAFE_INTEGER, this.required = !1, this.step = 1, this.stepStrictly = !1, this.precision = 0, this.size = "default", this.readonly = !1, this.disabled = !1, this.controls = !0, this.valueOnClear = null, this.align = "center", this.name = "", this.placeholder = "", this.inputmode = "";
  }
  // ==================== 抽象属性实现 ====================
  get validationTarget() {
    return this._inputEl;
  }
  // ==================== 方法 ====================
  /**
   * 更新容器 CSS 类名
   * @returns 生成的类名字符串
   */
  updateContainerClasslist() {
    const e = this.size !== "default", t = a(
      {
        ["size-" + this.size]: e,
        [this.align]: !0
      },
      {
        focus: this._isFocus,
        min: this._isMin,
        max: this._isMax,
        disabled: this.disabled,
        "no-controls": !this.controls
      }
    );
    return this._container && (this._container.className = t), t;
  }
  /** 更新增减按钮的禁用状态和 ARIA 属性 */
  _updateButtonDisabledState() {
    if (!this._decreaseBtn || !this._increaseBtn) return;
    const e = this._isMin || this.disabled, t = this._isMax || this.disabled;
    this._decreaseBtn.setAttribute("aria-disabled", String(e)), this._decreaseBtn.setAttribute("title", "减少数值"), this._decreaseBtn.setAttribute("aria-controls", this._inputId), this._increaseBtn.setAttribute("aria-disabled", String(t)), this._increaseBtn.setAttribute("title", "增加数值"), this._increaseBtn.setAttribute("aria-controls", this._inputId);
  }
  html() {
    return `
      <label class='${a()}' part='container'>
        <span class='${a.e("form-label")}' part='label'></span>
        <section class='${a.e("region")}' part='region'>
          <ea-icon class='${a.e("decrease")}' part='decrease' name='minus' tabindex='-1' aria-hidden='true'></ea-icon>
          <span class='${a.e("prefix")}' part='prefix'>
            <slot name="prefix"></slot>
          </span>
          <input class='${a.e("inner")}' part='input' type='text' role='spinbutton' />
          <span class='${a.e("suffix")}' part='suffix'>
            <slot name="suffix"></slot>
          </span>
          <ea-icon class='${a.e("increase")}' part='increase' name='plus' tabindex='-1' aria-hidden='true'></ea-icon>
        </section>
      </label>
    `;
  }
  /**
   * 聚焦输入框
   * @param options - 焦点选项
   */
  focus(e) {
    var t;
    (t = this._inputEl) == null || t.focus(e);
  }
  /** 失焦输入框 */
  blur() {
    var e;
    (e = this._inputEl) == null || e.blur();
  }
  /**
   * 校验并修正数值，确保在 min/max 范围内并按 precision 格式化
   * @param value - 待校验的数值
   * @param options - 校验选项
   * @returns 修正后的数值字符串
   */
  _sanitizeNumber(e = this.value, {
    precision: t,
    min: r,
    max: u,
    defaultValue: l
  }) {
    return e = Number(e), isNaN(e) || !Number.isFinite(e) ? (l == null ? void 0 : l.toFixed(t)) || "0" : (e < r ? e = r : e > u && (e = u), e.toFixed(t));
  }
  /** 增加值 */
  _increase() {
    this.disabled || !this.controls || (this.value = Number(
      this._sanitizeNumber(this.value + this.step, {
        precision: this.precision,
        min: this.min,
        max: this.max,
        defaultValue: this.defaultValue
      })
    ));
  }
  /** 减少值 */
  _decrease() {
    this.disabled || !this.controls || (this.value = Number(
      this._sanitizeNumber(this.value - this.step, {
        precision: this.precision,
        min: this.min,
        max: this.max,
        defaultValue: this.defaultValue
      })
    ));
  }
  /**
   * 校验输入值并修正
   * @param e - blur 事件对象
   */
  _ensureInputValueIsCorrect(e) {
    const t = e.target;
    let r = this._sanitizeNumber(Number(t.value), {
      precision: this.precision,
      min: this.min,
      max: this.max,
      defaultValue: this.defaultValue
    });
    this.stepStrictly && Number(r) % this.step !== 0 && (r = this._sanitizeNumber(
      Number(r) + Number(r) % this.step,
      {
        precision: this.precision,
        min: this.min,
        max: this.max,
        defaultValue: this.defaultValue
      }
    )), this.value = Number(r), r !== t.value && (t.value = r), this._inputEl.removeAttribute("aria-invalid"), this._isFocus = !1;
  }
  _handleDecreasePointerDown(e) {
    this.disabled || !this.controls || (e.preventDefault(), this._startRepeat(() => this._decrease()));
  }
  _handleIncreasePointerDown(e) {
    this.disabled || !this.controls || (e.preventDefault(), this._startRepeat(() => this._increase()));
  }
  _handlePointerUp() {
    this._stopRepeat();
  }
  /**
   * 启动长按重复执行
   * @param action - 要重复执行的函数
   */
  _startRepeat(e) {
    this._stopRepeat(), e(), this._repeatTimer = setTimeout(() => {
      this._repeatTimer = setInterval(e, this._repeatInterval);
    }, this._repeatDelay);
  }
  /** 停止长按重复执行 */
  _stopRepeat() {
    this._repeatTimer !== null && (clearTimeout(this._repeatTimer), clearInterval(this._repeatTimer), this._repeatTimer = null);
  }
  _handleInputFocus(e) {
    e.stopPropagation(), this._isFocus = !0, this.updateContainerClasslist(), this.dispatchEvent(new x());
  }
  _handleKeyDown(e) {
    if (!(e.ctrlKey || e.metaKey || e.altKey)) {
      if (e.key === "Enter") {
        this._ensureInputValueIsCorrect(e);
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        const t = Number(this._inputEl.value) || this.value;
        this.value = Number(
          this._sanitizeNumber(t + this.step, {
            precision: this.precision,
            min: this.min,
            max: this.max,
            defaultValue: this.defaultValue
          })
        );
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const t = Number(this._inputEl.value) || this.value;
        this.value = Number(
          this._sanitizeNumber(t - this.step, {
            precision: this.precision,
            min: this.min,
            max: this.max,
            defaultValue: this.defaultValue
          })
        );
        return;
      }
      if (e.key === "Home") {
        e.preventDefault(), this.value = this.min;
        return;
      }
      if (e.key === "End") {
        e.preventDefault(), this.value = this.max;
        return;
      }
    }
  }
  _handleInput(e) {
    const t = e.target, r = t.value, u = t.selectionStart ?? r.length, l = r.replace(/[^\d.\-eE]/g, "");
    if (l !== r)
      if (l === "")
        t.value = Number(this.value).toFixed(this.precision), t.setSelectionRange(t.value.length, t.value.length);
      else {
        t.value = l;
        const m = Math.min(u - 1, l.length);
        t.setSelectionRange(m, m);
      }
    const p = t.value;
    if (p === "" || p === "-" || p === "." || /^-?\d*\.?\d*e?E?$/.test(p)) {
      this._inputEl.removeAttribute("aria-invalid");
      return;
    }
    const h = Number(p);
    !isNaN(h) && (h < this.min || h > this.max) ? this._inputEl.setAttribute("aria-invalid", "true") : this._inputEl.removeAttribute("aria-invalid");
  }
  _handleInputBlur(e) {
    this._ensureInputValueIsCorrect(e), e.stopPropagation(), this.dispatchEvent(new g());
  }
  // ==================== 生命周期 ====================
  formResetCallback() {
    this.value = this.defaultValue, this.internals.setValidity({});
  }
  $mount() {
    this._inputEl.id = this._inputId, this._inputEl.setAttribute("aria-label", this.label || "数值输入");
    const e = this.hasAttribute("value") ? this.value : 0;
    this.value = Number(Number(e).toFixed(this.precision)), this.updateContainerClasslist(), this._updateButtonDisabledState();
  }
  $beforeUnmount() {
    this._stopRepeat();
  }
};
s([
  c(a.cb())
], i.prototype, "_container", 2);
s([
  c(a.ce("form-label"))
], i.prototype, "_label", 2);
s([
  c(a.ce("inner"))
], i.prototype, "_inputEl", 2);
s([
  c(a.ce("decrease"))
], i.prototype, "_decreaseBtn", 2);
s([
  c(a.ce("increase"))
], i.prototype, "_increaseBtn", 2);
s([
  d({ type: Number, default: 0 })
], i.prototype, "defaultValue", 2);
s([
  d({ type: Boolean, default: !1 })
], i.prototype, "_isFocus", 2);
s([
  d({ type: Boolean, default: !1 })
], i.prototype, "_isMin", 2);
s([
  d({ type: Boolean, default: !1 })
], i.prototype, "_isMax", 2);
s([
  n({
    type: String,
    default: "",
    observer(e) {
      this._label.textContent = e, this._inputEl && this._inputEl.setAttribute("aria-label", e || "数值输入");
    }
  })
], i.prototype, "label", 2);
s([
  n({
    type: Number,
    default: 0,
    a11y: {
      ariaAttr: "aria-valuenow",
      target: a.ce("inner")
    },
    observer(e, t) {
      const r = Number(e).toFixed(this.precision), u = Number(t).toFixed(this.precision);
      this._inputEl.value = r, this.setValue(r), this._isMax = Number(r) >= this.max, this._isMin = Number(r) <= this.min, this._updateButtonDisabledState(), this.dispatchEvent(
        new N({
          currentValue: Number(r),
          oldValue: Number(u)
        })
      ), this.updateContainerClasslist();
    }
  })
], i.prototype, "value", 2);
s([
  n({
    type: Number,
    default: Number.MIN_SAFE_INTEGER,
    a11y: {
      ariaAttr: "aria-valuemin",
      target: a.ce("inner")
    },
    observer(e) {
      this._inputEl && (this._inputEl.min = String(e)), this._updateButtonDisabledState();
    }
  })
], i.prototype, "min", 2);
s([
  n({
    type: Number,
    default: Number.MAX_SAFE_INTEGER,
    a11y: {
      ariaAttr: "aria-valuemax",
      target: a.ce("inner")
    },
    observer(e) {
      this._inputEl && (this._inputEl.max = String(e)), this._updateButtonDisabledState();
    }
  })
], i.prototype, "max", 2);
s([
  n({
    type: Boolean,
    default: !1,
    observer(e) {
      this._inputEl && (this._inputEl.required = e);
    }
  })
], i.prototype, "required", 2);
s([
  n({
    type: Number,
    default: 1
  })
], i.prototype, "step", 2);
s([
  n({
    type: Boolean,
    default: !1
  })
], i.prototype, "stepStrictly", 2);
s([
  n({
    type: Number,
    default: 0
  })
], i.prototype, "precision", 2);
s([
  n({
    type: b(["large", "default", "small"]),
    default: "default",
    observer() {
      this.updateContainerClasslist();
    }
  })
], i.prototype, "size", 2);
s([
  n({
    type: Boolean,
    default: !1,
    observer(e) {
      this._inputEl && (this._inputEl.readOnly = e);
    }
  })
], i.prototype, "readonly", 2);
s([
  n({
    type: Boolean,
    default: !1,
    a11y: {
      ariaAttr: "aria-disabled",
      map: (e) => String(e)
    },
    observer() {
      this.updateContainerClasslist(), this._updateButtonDisabledState();
    }
  })
], i.prototype, "disabled", 2);
s([
  n({
    type: Boolean,
    default: !0,
    a11y: {
      ariaAttr: "inert",
      target: ".ea-input-number__decrease, .ea-input-number__increase",
      map: (e) => e ? null : ""
    },
    observer() {
      this.updateContainerClasslist();
    }
  })
], i.prototype, "controls", 2);
s([
  n({
    type: Number,
    default: void 0
  })
], i.prototype, "valueOnClear", 2);
s([
  n({
    type: b(["left", "center", "right"]),
    default: "center",
    observer() {
      this.updateContainerClasslist();
    }
  })
], i.prototype, "align", 2);
s([
  n({
    type: String,
    default: "",
    observer(e) {
      this._inputEl && this._inputEl.setAttribute("name", e);
    }
  })
], i.prototype, "name", 2);
s([
  n({
    type: String,
    default: "",
    observer(e) {
      this._inputEl && this._inputEl.setAttribute("placeholder", e);
    }
  })
], i.prototype, "placeholder", 2);
s([
  n({
    type: String,
    default: "",
    observer(e) {
      this._inputEl && this._inputEl.setAttribute("inputmode", e);
    }
  })
], i.prototype, "inputmode", 2);
s([
  o("pointerdown", a.ce("decrease"))
], i.prototype, "_handleDecreasePointerDown", 1);
s([
  o("pointerdown", a.ce("increase"))
], i.prototype, "_handleIncreasePointerDown", 1);
s([
  o("pointerup", a.ce("decrease")),
  o("pointerup", a.ce("increase")),
  o("pointerleave", a.ce("decrease")),
  o("pointerleave", a.ce("increase"))
], i.prototype, "_handlePointerUp", 1);
s([
  o("focus", a.ce("inner"))
], i.prototype, "_handleInputFocus", 1);
s([
  o("keydown", a.ce("inner"))
], i.prototype, "_handleKeyDown", 1);
s([
  o("input", a.ce("inner"))
], i.prototype, "_handleInput", 1);
s([
  o("blur", a.ce("inner"))
], i.prototype, "_handleInputBlur", 1);
i = s([
  v(_, { styles: [E] })
], i);
export {
  i as EaInputNumber
};
