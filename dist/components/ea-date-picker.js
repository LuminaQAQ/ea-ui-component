import { E as C } from "../core/EaFormAssociatedBase.ts.js";
import { c as x } from "../utils/bem.ts.js";
import { q as c, a as p, l as h, C as $ } from "../core/decorator.js";
import { h as E } from "../utils/html.ts.js";
import { E as w } from "../utils/Enum.ts.js";
import { s as P } from "../css/ea-date-picker.style.js";
import { c as B, g as A, d as _ } from "./ea-calendar2.js";
import "./ea-input.js";
import "./ea-button.js";
import { i as v } from "../utils/I18nManager.ts.js";
var M = { exports: {} };
(function(t, e) {
  (function(r, i) {
    t.exports = i();
  })(B, function() {
    return function(r, i) {
      var l = i.prototype, u = l.format;
      l.format = function(d) {
        var o = this, m = this.$locale();
        if (!this.isValid()) return u.bind(this)(d);
        var b = this.$utils(), g = (d || "YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g, function(y) {
          switch (y) {
            case "Q":
              return Math.ceil((o.$M + 1) / 3);
            case "Do":
              return m.ordinal(o.$D);
            case "gggg":
              return o.weekYear();
            case "GGGG":
              return o.isoWeekYear();
            case "wo":
              return m.ordinal(o.week(), "W");
            case "w":
            case "ww":
              return b.s(o.week(), y === "w" ? 1 : 2, "0");
            case "W":
            case "WW":
              return b.s(o.isoWeek(), y === "W" ? 1 : 2, "0");
            case "k":
            case "kk":
              return b.s(String(o.$H === 0 ? 24 : o.$H), y === "k" ? 1 : 2, "0");
            case "X":
              return Math.floor(o.$d.getTime() / 1e3);
            case "x":
              return o.$d.getTime();
            case "z":
              return "[" + o.offsetName() + "]";
            case "zzz":
              return "[" + o.offsetName("long") + "]";
            default:
              return y;
          }
        });
        return u.bind(this)(g);
      };
    };
  });
})(M);
var S = M.exports;
const I = /* @__PURE__ */ A(S);
class f extends Event {
  constructor(e) {
    super("ea-panel-change", {
      bubbles: !0,
      composed: !0
    }), this.detail = e;
  }
}
class k extends Event {
  constructor(e) {
    super("ea-visible-change", {
      bubbles: !0,
      composed: !0
    }), this.detail = e;
  }
}
class D extends Event {
  constructor(e) {
    super("ea-change", {
      bubbles: !0,
      composed: !0
    }), this.detail = e;
  }
}
var F = Object.defineProperty, L = Object.getOwnPropertyDescriptor, s = (t, e, r, i) => {
  for (var l = i > 1 ? void 0 : i ? L(e, r) : e, u = t.length - 1, d; u >= 0; u--)
    (d = t[u]) && (l = (i ? d(e, r, l) : d(l)) || l);
  return i && l && F(e, r, l), l;
};
_.extend(I);
const Y = "ea-date-picker", n = x(Y);
let a = class extends C {
  constructor() {
    super(...arguments), this._uniqueId = a._instanceCount++, this._states = {
      currentDate: _(),
      viewMode: "day",
      selectedYear: null,
      selectedMonth: null
    }, this.label = "", this.width = "auto", this.value = "", this.placeholder = "", this.disabled = !1, this.align = "left", this.displayFormat = "YYYY-MM-DD", this.valueFormat = "YYYY-MM-DD", this.variant = "date", this.size = "default", this.required = !1, this._updateDropdownInert = () => {
      var e;
      const t = (e = this._container) == null ? void 0 : e.classList.contains("is-open");
      this._dropdownWrap.inert = this.disabled || !t;
    }, this._updateHeaderDisplay = () => {
      const t = this._states.currentDate.year(), e = this._states.currentDate.month() + 1;
      if (this._states.viewMode === "year") {
        const r = Math.floor(t / 10) * 10, i = r + 9;
        this._yearBtn.textContent = `${r} ~ ${i}`, this._monthBtn.textContent = "";
      } else this._states.viewMode === "month" ? (this._yearBtn.textContent = String(t), this._monthBtn.textContent = "") : (this._yearBtn.textContent = String(t), this._monthBtn.textContent = e < 10 ? `0${e}` : String(e));
    }, this._switchToYearMode = () => {
      this._states.viewMode = "year", this._updateHeaderDisplay(), this._renderYearPanel(), this.updateContainerClasslist(), this._updateHeaderButtons("year"), this.dispatchEvent(
        new f({
          date: this._states.currentDate.toDate(),
          mode: "year",
          view: "year-panel"
        })
      );
    }, this._switchToMonthMode = () => {
      this._states.viewMode = "month", this._updateHeaderDisplay(), this._renderMonthPanel(), this.updateContainerClasslist(), this._updateHeaderButtons("month"), this.dispatchEvent(
        new f({
          date: this._states.currentDate.toDate(),
          mode: "month",
          view: "month-panel"
        })
      );
    }, this._switchToDayMode = () => {
      this._states.viewMode = "day", this._updateHeaderDisplay(), this.updateContainerClasslist(), this._updateHeaderButtons("day");
      const t = this._states.currentDate.format("YYYY-MM-DD");
      this._calendarElement.setAttribute("value", t), this.dispatchEvent(
        new f({
          date: this._states.currentDate.toDate(),
          mode: "month",
          view: "day-panel"
        })
      );
    }, this._updateHeaderButtons = (t) => {
      t === "year" ? (this._prevYearBtn.ariaLabel = "Previous decade", this._nextYearBtn.ariaLabel = "Next decade") : t === "month" ? (this._prevYearBtn.ariaLabel = "Previous year", this._nextYearBtn.ariaLabel = "Next year") : (this._prevYearBtn.ariaLabel = "Previous year", this._nextYearBtn.ariaLabel = "Next year", this._prevMonthBtn.ariaLabel = "Previous month", this._nextMonthBtn.ariaLabel = "Next month");
    }, this._renderYearPanel = () => {
      const t = this._states.currentDate.year(), e = Math.floor(t / 10) * 10, r = this._yearPanel;
      let i = Array.from({ length: 10 }, (l, u) => {
        const d = e + u, o = d === this._states.selectedYear;
        return `<button class='${n.e("year-item")} ${o ? n.s("selected") : ""}' data-year='${d}' part='year-item' role='option' aria-selected='${o}'>${d}</button>`;
      }).join("");
      r.innerHTML = E(i);
    }, this._renderMonthPanel = () => {
      this._monthPanel.querySelectorAll(
        `.${n.e("month-item")}`
      ).forEach((e) => {
        const i = parseInt(e.dataset.month, 10) === this._states.selectedMonth && this._states.currentDate.year() === this._states.selectedYear;
        e.classList.toggle(n.s("selected"), i), e.setAttribute("aria-selected", String(i));
      });
    }, this._onPrevYearClick = () => {
      this._states.viewMode === "year" ? this._states.currentDate = this._states.currentDate.subtract(10, "year") : this._states.currentDate = this._states.currentDate.subtract(1, "year"), this._updateView();
    }, this._onNextYearClick = () => {
      this._states.viewMode === "year" ? this._states.currentDate = this._states.currentDate.add(10, "year") : this._states.currentDate = this._states.currentDate.add(1, "year"), this._updateView();
    }, this._onPrevMonthClick = () => {
      this._states.currentDate = this._states.currentDate.subtract(1, "month"), this._updateView();
    }, this._onNextMonthClick = () => {
      this._states.currentDate = this._states.currentDate.add(1, "month"), this._updateView();
    }, this._onYearClick = (t) => {
      const r = t.target.closest("[data-year]");
      if (!r) return;
      const i = parseInt(r.dataset.year);
      this._states.selectedYear = i, this._states.currentDate = this._states.currentDate.year(i), this.variant === "year" ? this._handleYearSelect(i) : this._switchToMonthMode();
    }, this._handleYearSelect = (t) => {
      const e = this._states.currentDate, r = e.format(this._getDisplayFormat()), i = e.format(this.valueFormat);
      this._inputElement.value = r, this.setAttribute("value", i), this.dispatchEvent(
        new D({
          fullDate: i,
          year: t,
          month: null,
          date: null,
          week: null
        })
      ), this._closeDropdown();
    }, this._onMonthClick = (t) => {
      const r = t.target.closest("[data-month]");
      if (!r) return;
      const i = parseInt(r.dataset.month);
      this._states.selectedMonth = i, this._states.currentDate = this._states.currentDate.month(i - 1), this.variant === "month" ? this._handleMonthSelect(i) : this._switchToDayMode();
    }, this._handleMonthSelect = (t) => {
      const e = this._states.currentDate, r = e.format(this._getDisplayFormat()), i = e.format(this.valueFormat);
      this._inputElement.value = r, this.setAttribute("value", i), this.dispatchEvent(
        new D({
          fullDate: i,
          year: this._states.selectedYear,
          month: t,
          date: null,
          week: null
        })
      ), this._closeDropdown();
    }, this._updateView = () => {
      this._updateHeaderDisplay(), this._states.viewMode === "year" ? this._renderYearPanel() : this._states.viewMode === "month" && this._renderMonthPanel();
      const t = this._states.currentDate.format("YYYY-MM-DD");
      this._calendarElement.setAttribute("value", t);
    }, this._openDropdown = () => {
      if (this.disabled) return;
      const t = this._container.classList.contains("is-open");
      this._container.classList.add("is-open"), this._updateDropdownInert(), this._updateAriaExpanded(), t || this.dispatchEvent(new k({ visible: !0 })), this.variant === "year" ? this._switchToYearMode() : this.variant === "month" ? this._switchToMonthMode() : this._switchToDayMode();
    }, this._closeDropdown = (t = !0) => {
      const e = this._container.classList.contains("is-open");
      this._container.classList.remove("is-open"), this._updateDropdownInert(), this._updateAriaExpanded(), e && this.dispatchEvent(
        new k({ visible: !1 })
      ), t && e && this._inputElement.focus();
    }, this._toggleDropdown = () => {
      this.disabled || (this._container.classList.contains("is-open") ? this._closeDropdown() : this._openDropdown());
    };
  }
  updateContainerClasslist() {
    var r, i;
    const t = ((r = this._states) == null ? void 0 : r.viewMode) || "day", e = n(
      {
        [this.size]: this.size && this.size !== "default"
      },
      {
        disabled: this.disabled,
        [`align-${this.align}`]: this.align && this.align !== "left",
        open: (i = this._container) == null ? void 0 : i.classList.contains("is-open"),
        [`view-${t}`]: !0
      }
    );
    return this._container.className = e, e;
  }
  /** @returns 根据当前 variant 返回显示格式 */
  _getDisplayFormat() {
    if (this.hasAttribute("display-format") && this.displayFormat !== "")
      return this.displayFormat;
    switch (this.variant) {
      case "year":
        return "YYYY";
      case "month":
        return "YYYY-MM";
      default:
        return "YYYY-MM-DD";
    }
  }
  /** 设置 ARIA 属性，遵循 W3C combobox datepicker 模式 */
  _setupAria() {
    const t = `ea-date-picker-${this._uniqueId}-dialog`, e = `ea-date-picker-${this._uniqueId}-label`;
    this._inputElement.setAttribute("role", "combobox"), this._inputElement.setAttribute("aria-expanded", "false"), this._inputElement.setAttribute("aria-haspopup", "dialog"), this._inputElement.setAttribute("aria-autocomplete", "none"), this._inputElement.setAttribute("aria-controls", t), this._dropdownWrap.id = t, this._dropdownWrap.setAttribute("role", "dialog"), this._dropdownWrap.setAttribute("aria-modal", "true"), this._dropdownWrap.setAttribute("aria-labelledby", e);
  }
  /** 更新 aria-expanded 属性 */
  _updateAriaExpanded() {
    const t = this._container.classList.contains("is-open");
    this._inputElement.setAttribute("aria-expanded", String(t));
  }
  html() {
    v.locale = this.locale, _.locale(this.locale.toLowerCase());
    const t = v.t("calendar.monthsShort"), e = `ea-date-picker-${this._uniqueId}-label`;
    return `
      <div class='${n()}' part='container'>
        <div class='${n.e("input-wrap")}' part='input-wrap'>
          <ea-input class="${n.e("input")}" part='input' prefix-icon="calendar-xmark" readonly></ea-input>
        </div>
        <div class='${n.e("dropdown-wrap")}' part='dropdown-wrap'>
          <div class='${n.e("calendar-wrapper")}'>
            <div class='${n.e("calendar-header")}' part='calendar-header'>
              <div class='${n.e("header-left")}' part='header-left'>
                <ea-button class='${n.e("header-btn")} ${n.e("btn-prev-year")}' part='header-btn' aria-label="Previous year" text>«</ea-button>
                <ea-button class='${n.e("header-btn")} ${n.e("btn-prev-month")}' part='header-btn' aria-label="Previous month" text>‹</ea-button>
              </div>
              <div class='${n.e("header-center")}' part='header-center' id='${e}' aria-live='polite' aria-atomic='true'>
                <ea-button class='${n.e("header-year")}' part='header-year' aria-label="Year" text></ea-button>
                <ea-button class='${n.e("header-month")}' part='header-month' aria-label="Month" text></ea-button>
              </div>
              <div class='${n.e("header-right")}' part='header-right'>
                <ea-button class='${n.e("header-btn")} ${n.e("btn-next-month")}' part='header-btn' aria-label="Next month" text>›</ea-button>
                <ea-button class='${n.e("header-btn")} ${n.e("btn-next-year")}' part='header-btn' aria-label="Next year" text>»</ea-button>
              </div>
            </div>
            <div class='${n.e("calendar-body")}' part='calendar-body'>
              <ea-calendar class="${n.e("calendar")}" size="small" part='calendar'></ea-calendar>
            </div>
            <div class='${n.e("year-panel")}' part='year-panel' role='listbox' aria-label='Select year'></div>
            <div class='${n.e("month-panel")}' part='month-panel' role='listbox' aria-label='Select month'>${t.map(
      (r, i) => `<button class='${n.e("month-item")}' part='month-item' data-month='${i + 1}' role='option' aria-selected='false'>${r}</button>`
    ).join("")}</div>
          </div>
        </div>
      </div>
    `;
  }
  $updateLocalization(t) {
    v.locale = t, _.locale(t.toLowerCase());
    const e = v.t("calendar.monthsShort");
    this._monthPanel.querySelectorAll(
      `.${n.e("month-item")}`
    ).forEach((i, l) => {
      e[l] && (i.textContent = e[l]);
    });
  }
  _onCalendarSelect(t) {
    const e = t.detail, { year: r, month: i, date: l, day: u } = e, d = _(`${r}-${i}-${l}`);
    this._states.selectedYear = r, this._states.selectedMonth = i, this._states.currentDate = d;
    const o = d.format(this._getDisplayFormat()), m = d.format(this.valueFormat);
    this._inputElement.value = o, this.setAttribute("value", m), this.dispatchEvent(
      new D({
        fullDate: m,
        year: r,
        month: i,
        date: l,
        week: u
      })
    ), this._closeDropdown();
  }
  _onInputClick() {
    this._container.classList.contains("is-open") ? this._closeDropdown() : this._openDropdown();
  }
  _onInputFocus() {
    this.emit("focus");
  }
  _onInputBlur() {
    this.emit("blur");
  }
  _handleKeydown(t) {
    if (t.composedPath().includes(this._inputElement)) {
      if (t.ctrlKey || t.shiftKey) return;
      t.key === "ArrowDown" && (t.preventDefault(), t.stopPropagation(), this._openDropdown());
    }
    t.key === "Escape" && this._container.classList.contains("is-open") && (t.preventDefault(), t.stopPropagation(), this._closeDropdown());
  }
  _onFocusOut() {
    requestAnimationFrame(() => {
      this.contains(document.activeElement) || this._closeDropdown(!1);
    });
  }
  _onWindowClick(t) {
    const e = t.composedPath();
    e.includes(this) || e.includes(this.shadowRoot) || this._closeDropdown(!1);
  }
  _handlePrevYearClick() {
    this._onPrevYearClick();
  }
  _handleNextYearClick() {
    this._onNextYearClick();
  }
  _handlePrevMonthClick() {
    this._onPrevMonthClick();
  }
  _handleNextMonthClick() {
    this._onNextMonthClick();
  }
  _handleYearBtnClick() {
    this._switchToYearMode();
  }
  _handleMonthBtnClick() {
    this._switchToMonthMode();
  }
  _handleYearPanelClick(t) {
    this._onYearClick(t);
  }
  _handleMonthPanelClick(t) {
    this._onMonthClick(t);
  }
  focus() {
    this._inputElement.focus();
  }
  blur() {
    this._inputElement.blur();
  }
  handleOpen() {
    this._openDropdown();
  }
  handleClose() {
    this._closeDropdown();
  }
  get validationTarget() {
    return this._inputElement;
  }
  updateValidity() {
    const t = this.value !== "" && this.value != null;
    this.required && !t ? this.internals.setValidity({ valueMissing: !0 }, "请选择日期", this) : this.internals.setValidity({}, "", this);
  }
  checkValidity() {
    return this.updateValidity(), this.internals.validity.valid;
  }
  reportValidity() {
    return this.updateValidity(), this.internals.reportValidity();
  }
  $mount() {
    this._setupAria(), this._updateDropdownInert(), this.updateContainerClasslist(), this._updateHeaderDisplay();
  }
  $beforeUnmount() {
    var t;
    (t = this._abortController) == null || t.abort(), this._abortController = null;
  }
};
a._instanceCount = 0;
s([
  c(".ea-date-picker")
], a.prototype, "_container", 2);
s([
  c(".ea-date-picker__input")
], a.prototype, "_inputElement", 2);
s([
  c(".ea-date-picker__dropdown-wrap")
], a.prototype, "_dropdownWrap", 2);
s([
  c(".ea-date-picker__calendar")
], a.prototype, "_calendarElement", 2);
s([
  c(".ea-date-picker__calendar-header")
], a.prototype, "_calendarHeader", 2);
s([
  c(".ea-date-picker__calendar-body")
], a.prototype, "_calendarBody", 2);
s([
  c(".ea-date-picker__header-year")
], a.prototype, "_yearBtn", 2);
s([
  c(".ea-date-picker__header-month")
], a.prototype, "_monthBtn", 2);
s([
  c(".ea-date-picker__btn-prev-year")
], a.prototype, "_prevYearBtn", 2);
s([
  c(".ea-date-picker__btn-prev-month")
], a.prototype, "_prevMonthBtn", 2);
s([
  c(".ea-date-picker__btn-next-month")
], a.prototype, "_nextMonthBtn", 2);
s([
  c(".ea-date-picker__btn-next-year")
], a.prototype, "_nextYearBtn", 2);
s([
  c(".ea-date-picker__year-panel")
], a.prototype, "_yearPanel", 2);
s([
  c(".ea-date-picker__month-panel")
], a.prototype, "_monthPanel", 2);
s([
  p({
    type: String,
    default: "",
    observer(t) {
      this._inputElement.label = t;
    }
  })
], a.prototype, "label", 2);
s([
  p({
    type: String,
    default: "auto",
    observer(t) {
      this._container.style.setProperty("--ea-date-picker-width", t);
    }
  })
], a.prototype, "width", 2);
s([
  p({
    type: String,
    default: "",
    observer(t) {
      let e = t;
      if (isNaN(new Date(t).getTime()) && t !== "") {
        const r = new Date(Date.now());
        e = `${r.getFullYear()}-${r.getMonth() + 1}-${r.getDate()}`;
      }
      e ? (this._states.currentDate = _(e), this._states.selectedYear = this._states.currentDate.year(), this._states.selectedMonth = this._states.currentDate.month() + 1, this._inputElement.value = this._states.currentDate.format(
        this._getDisplayFormat()
      )) : this._inputElement.value = e, this.setValue(t);
    }
  })
], a.prototype, "value", 2);
s([
  p({
    type: String,
    default: "",
    observer(t) {
      this._inputElement.setAttribute("placeholder", t);
    }
  })
], a.prototype, "placeholder", 2);
s([
  p({
    type: Boolean,
    default: !1,
    a11y: {
      ariaAttr: "aria-disabled",
      map: (t) => String(t)
    },
    observer(t) {
      this._inputElement.toggleAttribute("disabled", t), t && this._closeDropdown(), this._updateDropdownInert(), this.updateContainerClasslist();
    }
  })
], a.prototype, "disabled", 2);
s([
  p({
    type: w(["left", "center", "right"]),
    default: "left",
    observer() {
      this.updateContainerClasslist();
    }
  })
], a.prototype, "align", 2);
s([
  p({
    type: String,
    default: "YYYY-MM-DD"
  })
], a.prototype, "displayFormat", 2);
s([
  p({
    type: String,
    default: "YYYY-MM-DD"
  })
], a.prototype, "valueFormat", 2);
s([
  p({
    type: w(["date", "month", "year"]),
    default: "date",
    observer(t) {
      t === "year" ? this._switchToYearMode() : t === "month" ? this._switchToMonthMode() : this._switchToDayMode();
    }
  })
], a.prototype, "variant", 2);
s([
  p({
    type: w(["large", "default", "small"]),
    default: "default",
    observer(t) {
      this._inputElement.setAttribute("size", t), this._yearBtn.setAttribute("size", t), this._monthBtn.setAttribute("size", t), this._prevYearBtn.setAttribute("size", t), this._prevMonthBtn.setAttribute("size", t), this._nextMonthBtn.setAttribute("size", t), this._nextYearBtn.setAttribute("size", t), this.updateContainerClasslist();
    }
  })
], a.prototype, "size", 2);
s([
  p({
    type: Boolean,
    default: !1,
    observer(t) {
      this._inputElement.toggleAttribute("required", t);
    }
  })
], a.prototype, "required", 2);
s([
  h("ea-select", ".ea-date-picker__calendar")
], a.prototype, "_onCalendarSelect", 1);
s([
  h("click", ".ea-date-picker__input")
], a.prototype, "_onInputClick", 1);
s([
  h("focus", ".ea-date-picker__input")
], a.prototype, "_onInputFocus", 1);
s([
  h("blur", ".ea-date-picker__input")
], a.prototype, "_onInputBlur", 1);
s([
  h("keydown")
], a.prototype, "_handleKeydown", 1);
s([
  h("focusout")
], a.prototype, "_onFocusOut", 1);
s([
  h("click", "window")
], a.prototype, "_onWindowClick", 1);
s([
  h("click", ".ea-date-picker__btn-prev-year")
], a.prototype, "_handlePrevYearClick", 1);
s([
  h("click", ".ea-date-picker__btn-next-year")
], a.prototype, "_handleNextYearClick", 1);
s([
  h("click", ".ea-date-picker__btn-prev-month")
], a.prototype, "_handlePrevMonthClick", 1);
s([
  h("click", ".ea-date-picker__btn-next-month")
], a.prototype, "_handleNextMonthClick", 1);
s([
  h("click", ".ea-date-picker__header-year")
], a.prototype, "_handleYearBtnClick", 1);
s([
  h("click", ".ea-date-picker__header-month")
], a.prototype, "_handleMonthBtnClick", 1);
s([
  h("click", ".ea-date-picker__year-panel")
], a.prototype, "_handleYearPanelClick", 1);
s([
  h("click", ".ea-date-picker__month-panel")
], a.prototype, "_handleMonthPanelClick", 1);
a = s([
  $(Y, { styles: [P] })
], a);
export {
  a as EaDatePicker
};
