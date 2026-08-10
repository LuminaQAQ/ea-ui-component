import { E as y } from "../core/EaFormAssociatedBase.ts.js";
import { c as f } from "../utils/bem.ts.js";
import { a as h, C as g, q as _, p as E, l as v } from "../core/decorator.js";
import { h as A } from "../utils/html.ts.js";
import { E as C } from "../utils/Enum.ts.js";
import { i as c } from "../utils/I18nManager.ts.js";
import { s as x } from "../css/ea-rate.style.js";
import "./ea-icon.js";
class p extends Event {
  constructor(a) {
    super("change", { bubbles: !0, composed: !0 }), this.detail = a;
  }
}
class S extends Event {
  constructor(a) {
    super("ea-hover", { bubbles: !0, composed: !0 }), this.detail = a;
  }
}
var R = Object.defineProperty, w = Object.getOwnPropertyDescriptor, l = (t, a, r, s) => {
  for (var e = s > 1 ? void 0 : s ? w(a, r) : a, i = t.length - 1, o; i >= 0; i--)
    (o = t[i]) && (e = (s ? o(a, r, e) : o(e)) || e);
  return s && e && R(a, r, e), e;
};
const m = "ea-rate", d = f(m);
let n = class extends y {
  constructor() {
    super(...arguments), this._lastHoveredIndex = -1, this.label = "", this.value = 0, this.min = 0, this.max = 5, this.size = "", this.readonly = !1, this.disabled = !1, this.getSymbol = () => '<ea-icon name="star" part="icon"></ea-icon>', this._handleMouseover = () => {
      var r;
      if (this.readonly || this.disabled) return;
      (r = this._hoverAbortController) == null || r.abort(), this._hoverAbortController = new AbortController();
      const t = (s) => {
        var b;
        const i = (b = s.target) == null ? void 0 : b.closest(
          ".ea-rate__symbol"
        );
        if (!i) return;
        const u = [...this._container.children].indexOf(i);
        u !== this._lastHoveredIndex && (this._lastHoveredIndex = u, this._setRateStatus(u), this._emitHoverEvent(u, i));
      }, a = () => {
        this._lastHoveredIndex = -1, this._unsetRateStatus();
        const s = this.hasAttribute("value") ? this.value - 1 : null, e = this.hasAttribute("value") ? this._container.children[this.value - 1] : null;
        this._emitHoverEvent(s, e);
      };
      this._container.addEventListener("mousemove", t, {
        signal: this._hoverAbortController.signal
      }), this._container.addEventListener("mouseout", a, {
        signal: this._hoverAbortController.signal
      });
    }, this._handleClick = (t) => {
      if (this.readonly || this.disabled) return;
      const a = t.target.closest(
        ".ea-rate__symbol"
      );
      if (!a) return;
      const e = [...this._container.children].indexOf(a) + 1;
      this.value === e ? this.value = 0 : this.value = e, this.dispatchEvent(new p({ value: e }));
    }, this._handleKeydown = (t) => {
      if (this.readonly || this.disabled) return;
      const a = t.target, r = [...this._container.children], s = r.indexOf(a);
      let e = s;
      switch (t.key) {
        case "ArrowRight":
        case "ArrowDown":
          t.preventDefault(), e = s < r.length - 1 ? s + 1 : 0;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          t.preventDefault(), e = s > 0 ? s - 1 : r.length - 1;
          break;
        case "Home":
          t.preventDefault(), e = 0;
          break;
        case "End":
          t.preventDefault(), e = r.length - 1;
          break;
        case " ":
          t.preventDefault();
          const i = s + 1;
          this.value !== i && (this.value = i, this.dispatchEvent(new p({ value: i })));
          return;
        default:
          return;
      }
      e !== s && (this.value = e + 1, r[e].focus(), this.dispatchEvent(new p({ value: e + 1 })));
    };
  }
  updateContainerClasslist() {
    const t = d(
      {
        [this.size]: !!this.size
      },
      {
        disabled: this.disabled
      }
    );
    return this._container && (this._container.className = t), t;
  }
  html() {
    return `
      <label class="${d.e("label")}" part="label"></label>
      <div class="${d()}" part="container" role="presentation"></div>
    `;
  }
  /** @param renderer - 图标渲染函数 @param activeValue - 当前选中值 @param length - 评分项数量 */
  _renderRateEl(t, a = this.value, r = this.max) {
    if (!(!t || !this._container)) {
      this._container.innerHTML = "", c.locale = this.locale;
      for (let s = 0; s < r; s++) {
        const e = s + 1, i = e === a, o = document.createElement("span");
        o.className = d.e("symbol"), o.setAttribute("part", "symbol-wrap"), o.setAttribute("role", "radio"), o.setAttribute("aria-checked", String(i)), o.setAttribute(
          "aria-label",
          c.t("rate.star", { n: e })
        ), o.tabIndex = i ? 0 : -1, o.innerHTML = A(t(s, a)), this._container.appendChild(o);
      }
    }
  }
  /** @param index - 选中截止下标（0-based） */
  _setRateStatus(t = this.value - 1) {
    if (!this._container) return;
    [...this._container.children].forEach((r, s) => {
      const e = s <= t, i = s === t;
      r.classList.toggle("is-selected", e), r.setAttribute("aria-checked", String(i)), r.tabIndex = i || t < 0 && s === 0 ? 0 : -1;
    });
  }
  /** @returns 恢复为 value 对应的选中状态 */
  _unsetRateStatus() {
    if (!this._container) return;
    [...this._container.children].forEach((a, r) => {
      a.classList.toggle("is-selected", r <= this.value - 1);
    });
  }
  /** @param value - 悬停项下标或 null @param target - 悬停目标元素或 null */
  _emitHoverEvent(t, a = null) {
    this.dispatchEvent(new S({ value: t, target: a }));
  }
  get validationTarget() {
    return this;
  }
  updateValidity() {
    this.required && !this.value ? this.internals.setValidity(
      { valueMissing: !0 },
      "请选择一个评分",
      this
    ) : this.internals.setValidity({}, "", this);
  }
  checkValidity() {
    return this.updateValidity(), this.internals.checkValidity();
  }
  reportValidity() {
    return this.updateValidity(), this.internals.reportValidity();
  }
  $mount() {
    this.setAttribute("role", "radiogroup"), this._renderRateEl(this.getSymbol, this.value), this.updateContainerClasslist(), this._setRateStatus(this.value - 1);
  }
  $updateLocalization(t) {
    c.locale = t, this._renderRateEl(this.getSymbol, this.value), this._setRateStatus(this.value - 1);
  }
  $beforeUnmount() {
    var t;
    (t = this._hoverAbortController) == null || t.abort(), this._hoverAbortController = void 0;
  }
};
l([
  _(".ea-rate")
], n.prototype, "_container", 2);
l([
  _(".ea-rate__label")
], n.prototype, "_label", 2);
l([
  h({
    type: String,
    default: "",
    a11y: {
      ariaAttr: "aria-label",
      map: (t) => t || null
    },
    observer(t) {
      this._label && (this._label.textContent = t);
    }
  })
], n.prototype, "label", 2);
l([
  h({
    type: Number,
    default: 0,
    observer(t) {
      this.setValue(t ? t.toString() : null), this._setRateStatus(t - 1);
    }
  })
], n.prototype, "value", 2);
l([
  h({
    type: Number,
    default: 0
  })
], n.prototype, "min", 2);
l([
  h({
    type: Number,
    default: 5,
    observer() {
      this._renderRateEl(this.getSymbol, this.value), this._setRateStatus(this.value - 1);
    }
  })
], n.prototype, "max", 2);
l([
  h({
    type: C(["large", "default", "small"]),
    default: "",
    observer() {
      this.updateContainerClasslist();
    }
  })
], n.prototype, "size", 2);
l([
  h({
    type: Boolean,
    default: !1,
    a11y: { ariaAttr: "aria-readonly" }
  })
], n.prototype, "readonly", 2);
l([
  h({
    type: Boolean,
    default: !1,
    a11y: {
      ariaAttr: "aria-disabled",
      map: (t) => String(t)
    },
    observer() {
      this.updateContainerClasslist();
    }
  })
], n.prototype, "disabled", 2);
l([
  E({
    type: Function,
    default: (t, a) => '<ea-icon name="star" part="icon"></ea-icon>',
    observer(t) {
      !t || typeof t != "function" || (this._renderRateEl(t, this.value), this._setRateStatus(this.value - 1));
    }
  })
], n.prototype, "getSymbol", 2);
l([
  v("mouseover", ".ea-rate")
], n.prototype, "_handleMouseover", 2);
l([
  v("click", ".ea-rate__symbol")
], n.prototype, "_handleClick", 2);
l([
  v("keydown", ".ea-rate__symbol")
], n.prototype, "_handleKeydown", 2);
n = l([
  g(m, { styles: [x] })
], n);
const O = n;
export {
  n as EaRate,
  O as default
};
