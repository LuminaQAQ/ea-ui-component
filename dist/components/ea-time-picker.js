import { E as S } from "../core/EaFormAssociatedBase.ts.js";
import { c as w } from "../utils/bem.ts.js";
import { q as m, a as _, l as p, C as A } from "../core/decorator.js";
import { E as g } from "../utils/Enum.ts.js";
import { t as f } from "../utils/timeout.ts.js";
import { s as T } from "../css/ea-time-picker.style.js";
import "./ea-icon.js";
import "./ea-input.js";
class b extends Event {
  constructor(e) {
    super("ea-visible-change", {
      bubbles: !0,
      cancelable: !0,
      composed: !0
    }), this.detail = e;
  }
}
class C extends Event {
  constructor(e) {
    super("change", {
      bubbles: !0,
      composed: !0
    }), this.detail = e;
  }
}
class W extends Event {
  constructor() {
    super("focus", {
      bubbles: !0,
      composed: !0
    });
  }
}
class E extends Event {
  constructor() {
    super("blur", {
      bubbles: !0,
      composed: !0
    });
  }
}
var I = Object.defineProperty, V = Object.getOwnPropertyDescriptor, r = (t, e, i, s) => {
  for (var n = s > 1 ? void 0 : s ? V(e, i) : e, l = t.length - 1, h; l >= 0; l--)
    (h = t[l]) && (n = (s ? h(e, i, n) : h(n)) || n);
  return s && n && I(e, i, n), n;
};
const y = "ea-time-picker", o = w(y);
let a = class extends S {
  constructor() {
    super(...arguments), this._uniqueId = a._instanceCount++, this._states = {
      hour: 0,
      minute: 0,
      second: 0,
      isAutoScrolling: !1,
      scrollTimeout: null,
      isFirstOpen: !0
    }, this.label = "", this.placeholder = "Select time", this.value = "", this.width = "", this.disabled = !1, this.align = "left", this.size = "default", this.limitRangeStart = "00:00:00", this.limitRangeEnd = "23:59:59", this.required = !1, this._generateTimeItems = (t, e) => {
      const i = [];
      for (let s = t; s <= e; s++) {
        const n = this._formatNumber(s);
        i.push(
          `<li class="${o.e("dropdown-item")}" data-value="${s}" part="dropdown-item" role="option" tabindex="-1" aria-selected="false">${n}</li>`
        );
      }
      return i.join("");
    }, this._parseValue = (t) => {
      const [e = 0, i = 0, s = 0] = t.split(":").map(Number);
      this._states.hour = e, this._states.minute = i, this._states.second = s;
    }, this._formatNumber = (t) => t < 10 ? `0${t}` : String(t), this._updateInputValue = () => {
      this._input && (this._input.value = this._timeValue);
    }, this._setupAria = () => {
      this._input.setAttribute("role", "combobox"), this._input.setAttribute("aria-expanded", "false"), this._input.setAttribute("aria-haspopup", "listbox"), this.label && this._input.setAttribute("aria-label", this.label);
      const t = this._container.querySelector(
        `.${o.e("dropdown")}`
      );
      if (t) {
        const e = `ea-time-picker-${this._uniqueId}-listbox`;
        t.id = e, t.setAttribute("role", "listbox"), t.setAttribute("aria-label", this.label || "Select time"), this._input.setAttribute("aria-controls", e);
      }
      this._hourWrap && this._hourWrap.setAttribute("aria-label", "Hours"), this._minuteWrap && this._minuteWrap.setAttribute("aria-label", "Minutes"), this._secondWrap && this._secondWrap.setAttribute("aria-label", "Seconds");
    }, this._updateAriaExpanded = () => {
      const t = this._container.classList.contains("is-open");
      this._input.setAttribute("aria-expanded", String(t));
    }, this._updateDropdownInert = () => {
      const t = this._container.querySelector(
        `.${o.e("dropdown")}`
      );
      t && (t.inert = this.disabled);
    }, this._updateSelectionState = () => {
      this._updateWrapSelection(this._hourWrap, this._states.hour), this._updateWrapSelection(this._minuteWrap, this._states.minute), this._updateWrapSelection(this._secondWrap, this._states.second);
    }, this._updateWrapSelection = (t, e) => {
      if (!t) return;
      t.querySelectorAll("li").forEach((s) => {
        const l = parseInt(s.dataset.value, 10) === e;
        s.classList.toggle("is-active", l), s.setAttribute("aria-selected", String(l));
      });
    }, this._getClosestAvailableValue = (t, e) => {
      if (!t) return null;
      const i = t.querySelectorAll("li:not(.is-disabled)");
      if (!i.length) return null;
      let s = null, n = 1 / 0;
      return i.forEach((l) => {
        const h = parseInt(l.dataset.value, 10), d = Math.abs(h - e);
        d < n && (n = d, s = h);
      }), s;
    }, this._hasLimitedRange = () => this.hasAttribute("limit-range-start") || this.hasAttribute("limit-range-end"), this._applyLimitRange = () => {
      const [t = 0, e = 0, i = 0] = this.limitRangeStart.split(":").map(Number), [s = 23, n = 59, l = 59] = this.limitRangeEnd.split(":").map(Number);
      this._applyRangeToWrap(this._hourWrap, t, s), this._applyRangeToWrap(this._minuteWrap, e, n), this._applyRangeToWrap(this._secondWrap, i, l);
    }, this._applyRangeToWrap = (t, e, i) => {
      if (!t) return;
      t.querySelectorAll("li").forEach((n) => {
        const l = parseInt(n.dataset.value, 10), h = l < e || l > i;
        n.classList.toggle("is-disabled", h);
      });
    }, this._openDropdown = () => {
      if (this.disabled) return;
      const t = this._container.classList.contains("is-open");
      if (this._container.classList.add("is-open"), this.updateContainerClasslist(), this._updateAriaExpanded(), t || this.dispatchEvent(new b({ visible: !0 })), this._states.isFirstOpen) {
        const e = this.value && this.value.trim() !== "", i = this._hasLimitedRange();
        if (!e && i) {
          const s = /* @__PURE__ */ new Date(), n = s.getHours(), l = s.getMinutes(), h = s.getSeconds(), d = this._getClosestAvailableValue(
            this._hourWrap,
            n
          ), c = this._getClosestAvailableValue(
            this._minuteWrap,
            l
          ), u = this._getClosestAvailableValue(
            this._secondWrap,
            h
          );
          d !== null && (this._states.hour = d, this._scrollToValue(this._hourWrap, d, !1)), c !== null && (this._states.minute = c, this._scrollToValue(this._minuteWrap, c, !1)), u !== null && (this._states.second = u, this._scrollToValue(this._secondWrap, u, !1)), this._updateSelectionState();
        } else
          this._scrollToValue(this._hourWrap, this._states.hour, !1), this._scrollToValue(this._minuteWrap, this._states.minute, !1), this._scrollToValue(this._secondWrap, this._states.second, !1);
        this._states.isFirstOpen = !1;
      }
    }, this._closeDropdown = () => {
      const t = this._container.classList.contains("is-open");
      this._container.classList.remove("is-open"), this.updateContainerClasslist(), this._updateAriaExpanded(), t && this.dispatchEvent(
        new b({ visible: !1 })
      );
    }, this._scrollToValue = (t, e, i = !0) => {
      if (!t) return;
      const s = t.querySelector(
        `li[data-value="${e}"]`
      );
      if (s && !s.classList.contains("is-disabled")) {
        const n = s.getBoundingClientRect().height * e - 1;
        t.scrollTo({ top: n, behavior: i ? "smooth" : "auto" });
      }
    }, this._handleScrollStop = (t, e) => {
      this._states.scrollTimeout && clearTimeout(this._states.scrollTimeout), this._states.scrollTimeout = setTimeout(() => {
        if (this._states.isAutoScrolling) return;
        const i = t.querySelectorAll("li"), s = t.querySelectorAll("li:not(.is-disabled)");
        if (!s.length) return;
        const n = s[0].getBoundingClientRect().height, { scrollTop: l } = t, h = Math.round(l / n), d = Math.max(0, Math.min(i.length - 1, h));
        let c = i[d];
        if (c && c.classList.contains("is-disabled")) {
          for (let u = d; u < i.length; u++)
            if (!i[u].classList.contains("is-disabled")) {
              c = i[u];
              break;
            }
          if (c.classList.contains("is-disabled")) {
            for (let u = d; u >= 0; u--)
              if (!i[u].classList.contains("is-disabled")) {
                c = i[u];
                break;
              }
          }
        }
        if (c && !c.classList.contains("is-disabled")) {
          const u = parseInt(c.dataset.value, 10);
          this._setTimeValue(e, u);
          const v = n * u;
          this._states.isAutoScrolling = !0, t.scrollTo({ top: v, behavior: "smooth" }), f(() => {
            this._states.isAutoScrolling = !1;
          }, 300);
        }
      }, 150);
    }, this._handleItemClick = (t, e, i) => {
      const s = t.target.closest("li");
      if (!s || s.classList.contains("is-disabled")) return;
      const n = parseInt(s.dataset.value, 10);
      this._setTimeValue(e, n);
      const h = s.getBoundingClientRect().height * n;
      this._states.isAutoScrolling = !0, this._states.scrollTimeout && clearTimeout(this._states.scrollTimeout), i.scrollTo({ top: h, behavior: "smooth" }), f(() => {
        this._states.isAutoScrolling = !1;
      }, 1e3);
    }, this._setTimeValue = (t, e) => {
      switch (t) {
        case "hour":
          this._states.hour = e;
          break;
        case "minute":
          this._states.minute = e;
          break;
        case "second":
          this._states.second = e;
          break;
      }
      const i = this._timeValue;
      this.setAttribute("value", i), this._updateInputValue(), this._updateSelectionState(), this.dispatchEvent(new C({ value: i }));
    }, this.focus = () => {
      this._input.focus();
    }, this.blur = () => {
      this._input.blur();
    }, this.handleOpen = () => {
      this._openDropdown();
    }, this.handleClose = () => {
      this._closeDropdown();
    };
  }
  updateContainerClasslist() {
    var e;
    const t = o(
      {
        [this.size]: this.size && this.size !== "default"
      },
      {
        disabled: this.disabled,
        open: (e = this._container) == null ? void 0 : e.classList.contains("is-open"),
        [`align-${this.align}`]: this.align && this.align !== "left"
      }
    );
    return this._container && (this._container.className = t), t;
  }
  html() {
    return `
      <div class='${o()}' part='container'>
        <ea-input
          class="${o.e("input")}"
          part='input'
          autocomplete="off"
          readonly
          prefix-icon="clock"
        ></ea-input>
        <div class="${o.e("dropdown")}" part='dropdown'>
          <div class="${o.e("dropdown-inner-wrap")}" part='dropdown-inner-wrap'>
            <ul class="${o.e("dropdown-inner")} ${o.e("dropdown-inner")}--hour" part='dropdown-time'>
              ${this._generateTimeItems(0, 23)}
            </ul>
            <ul class="${o.e("dropdown-inner")} ${o.e("dropdown-inner")}--minute" part='dropdown-time'>
              ${this._generateTimeItems(0, 59)}
            </ul>
            <ul class="${o.e("dropdown-inner")} ${o.e("dropdown-inner")}--second" part='dropdown-time'>
              ${this._generateTimeItems(0, 59)}
            </ul>
          </div>
        </div>
      </div>
    `;
  }
  /** @returns 格式化的时间值字符串 HH:mm:ss */
  get _timeValue() {
    return `${this._formatNumber(this._states.hour)}:${this._formatNumber(this._states.minute)}:${this._formatNumber(this._states.second)}`;
  }
  _handleInputClick() {
    this._openDropdown();
  }
  _handleInputFocus(t) {
    t.stopPropagation(), this.dispatchEvent(new W()), this._openDropdown();
  }
  _handleInputBlur(t) {
    t.stopPropagation(), this.dispatchEvent(new E());
  }
  _handleFocusOut() {
    requestAnimationFrame(() => {
      this.contains(document.activeElement) || this._closeDropdown();
    });
  }
  _handleKeydown(t) {
    t.key === "Escape" && (t.preventDefault(), this._closeDropdown());
  }
  _handleWindowClick(t) {
    const e = t.composedPath();
    e.includes(this) || e.includes(this.shadowRoot) || this._closeDropdown();
  }
  _handleHourClick(t) {
    this._handleItemClick(t, "hour", this._hourWrap);
  }
  _handleMinuteClick(t) {
    this._handleItemClick(t, "minute", this._minuteWrap);
  }
  _handleSecondClick(t) {
    this._handleItemClick(t, "second", this._secondWrap);
  }
  _handleHourScroll() {
    this._handleScrollStop(this._hourWrap, "hour");
  }
  _handleMinuteScroll() {
    this._handleScrollStop(this._minuteWrap, "minute");
  }
  _handleSecondScroll() {
    this._handleScrollStop(this._secondWrap, "second");
  }
  get validationTarget() {
    return this._input;
  }
  updateValidity() {
    const t = this.value !== "" && this.value != null;
    this.required && !t ? this.internals.setValidity({ valueMissing: !0 }, "请选择时间", this) : this.internals.setValidity({}, "", this);
  }
  checkValidity() {
    return this.updateValidity(), this.internals.validity.valid;
  }
  reportValidity() {
    return this.updateValidity(), this.internals.reportValidity();
  }
  $mount() {
    this.updateContainerClasslist(), this._applyLimitRange(), this._setupAria(), this._updateDropdownInert(), this.hasAttribute("value") && this._parseValue(this.value);
  }
  $beforeUnmount() {
    this._states.scrollTimeout && clearTimeout(this._states.scrollTimeout);
  }
};
a._instanceCount = 0;
r([
  m(o.cb())
], a.prototype, "_container", 2);
r([
  m(o.ce("input"))
], a.prototype, "_input", 2);
r([
  m(`${o.ce("dropdown-inner")}--hour`)
], a.prototype, "_hourWrap", 2);
r([
  m(`${o.ce("dropdown-inner")}--minute`)
], a.prototype, "_minuteWrap", 2);
r([
  m(`${o.ce("dropdown-inner")}--second`)
], a.prototype, "_secondWrap", 2);
r([
  _({
    type: String,
    default: "",
    observer(t) {
      this._input && (this._input.label = t);
    }
  })
], a.prototype, "label", 2);
r([
  _({
    type: String,
    default: "Select time",
    observer(t) {
      this._input && (this._input.placeholder = t);
    }
  })
], a.prototype, "placeholder", 2);
r([
  _({
    type: String,
    default: "",
    observer(t) {
      this.setValue(t), t && (this._parseValue(t), this._updateInputValue(), this._updateSelectionState());
    }
  })
], a.prototype, "value", 2);
r([
  _({
    type: String,
    default: "",
    observer(t) {
      this._container && this._container.style.setProperty("--ea-time-picker-width", t);
    }
  })
], a.prototype, "width", 2);
r([
  _({
    type: Boolean,
    default: !1,
    a11y: {
      ariaAttr: "aria-disabled",
      map: (t) => String(t)
    },
    observer(t) {
      this._input && this._input.toggleAttribute("disabled", t), t && this._closeDropdown(), this._updateDropdownInert(), this.updateContainerClasslist();
    }
  })
], a.prototype, "disabled", 2);
r([
  _({
    type: g(["left", "center", "right"]),
    default: "left",
    observer() {
      this.updateContainerClasslist();
    }
  })
], a.prototype, "align", 2);
r([
  _({
    type: g(["large", "default", "small"]),
    default: "default",
    observer(t) {
      this._input && this._input.setAttribute("size", t);
    }
  })
], a.prototype, "size", 2);
r([
  _({
    type: String,
    default: "00:00:00",
    observer() {
      this._applyLimitRange();
    }
  })
], a.prototype, "limitRangeStart", 2);
r([
  _({
    type: String,
    default: "23:59:59",
    observer() {
      this._applyLimitRange();
    }
  })
], a.prototype, "limitRangeEnd", 2);
r([
  _({
    type: Boolean,
    default: !1,
    observer(t) {
      this._input && this._input.toggleAttribute("required", t);
    }
  })
], a.prototype, "required", 2);
r([
  p("click", o.ce("input"))
], a.prototype, "_handleInputClick", 1);
r([
  p("focus", o.ce("input"))
], a.prototype, "_handleInputFocus", 1);
r([
  p("blur", o.ce("input"))
], a.prototype, "_handleInputBlur", 1);
r([
  p("focusout")
], a.prototype, "_handleFocusOut", 1);
r([
  p("keydown")
], a.prototype, "_handleKeydown", 1);
r([
  p("click", "window")
], a.prototype, "_handleWindowClick", 1);
r([
  p("click", `${o.ce("dropdown-inner")}--hour`)
], a.prototype, "_handleHourClick", 1);
r([
  p("click", `${o.ce("dropdown-inner")}--minute`)
], a.prototype, "_handleMinuteClick", 1);
r([
  p("click", `${o.ce("dropdown-inner")}--second`)
], a.prototype, "_handleSecondClick", 1);
r([
  p("scroll", `${o.ce("dropdown-inner")}--hour`)
], a.prototype, "_handleHourScroll", 1);
r([
  p("scroll", `${o.ce("dropdown-inner")}--minute`)
], a.prototype, "_handleMinuteScroll", 1);
r([
  p("scroll", `${o.ce("dropdown-inner")}--second`)
], a.prototype, "_handleSecondScroll", 1);
a = r([
  A(y, { styles: [T] })
], a);
const P = a;
export {
  a as EaTimePicker,
  P as default
};
