import "./ea-input.js";
import "./ea-icon.js";
import { E as D } from "../core/EaFormAssociatedBase.ts.js";
import { q as c, a as p, p as y, l as g, C as A } from "../core/decorator.js";
import { E as $ } from "../utils/Enum.ts.js";
import { c as S } from "../utils/bem.ts.js";
import { s as F } from "../css/ea-select.style.js";
import { E as w } from "../core/EaBase.ts.js";
import { s as T } from "../css/ea-option.style.js";
import { s as M } from "../css/ea-option-group.style.js";
class m extends Event {
  constructor(e) {
    super("change", { bubbles: !0, composed: !0 }), this.detail = e;
  }
}
class V extends Event {
  constructor(e = {}) {
    super("ea-clear", { bubbles: !0, composed: !0 }), this.detail = e;
  }
}
class N extends Event {
  constructor(e) {
    super("ea-remove-tag", { bubbles: !0, composed: !0 }), this.detail = e;
  }
}
class O extends Event {
  constructor(e) {
    super("ea-visible-change", { bubbles: !0, composed: !0 }), this.detail = e;
  }
}
var P = Object.defineProperty, k = Object.getOwnPropertyDescriptor, n = (t, e, i, a) => {
  for (var s = a > 1 ? void 0 : a ? k(e, i) : e, o = t.length - 1, r; o >= 0; o--)
    (r = t[o]) && (s = (a ? r(e, i, s) : r(s)) || s);
  return a && s && P(e, i, s), s;
};
const I = "ea-select", h = S(I);
let l = class extends D {
  constructor() {
    super(), this._abortControllerStates = {
      closeAbortController: null,
      tagRemoveAbortController: null,
      inputClearAbortController: null,
      inputFilterAbortController: null
    }, this._states = {
      isFocus: !1,
      isTagImport: !1
    }, this._activeOptionIndex = -1, this._searchString = "", this._searchTimeout = null, this._dropdownId = "", this._isComposing = !1, this._inlineCompletionLength = 0, this.label = "", this.name = "", this.placeholder = "", this.disabled = !1, this.clearable = !1, this.size = "default", this.multiple = !1, this.collapseTags = !1, this.maxCollapseTags = 1, this.filterable = !1, this.required = !1, this.filterMethod = (t) => {
    }, this.value = "", this._onOptionClick = (t) => {
      var o;
      t.stopImmediatePropagation();
      const e = ((o = t.detail) == null ? void 0 : o.target) || t.target.closest("ea-option");
      if (!e || e.disabled) return;
      const a = this._getNavigableOptions().indexOf(e);
      a >= 0 && this._setActiveOption(a);
      let s;
      if (!this.multiple)
        s = e.value, this.value = s, this.hide();
      else {
        Array.isArray(this.value) || (this.value = []);
        const r = this.value;
        r.includes(e.value) ? s = r.filter((b) => b !== e.value) : s = [...r, e.value], this.value = s;
      }
      this.dispatchEvent(new m({ value: s }));
    }, this._onSelectClose = (t) => {
      t.composedPath().includes(this) || this.hide();
    }, this._onMultipleTagRemoveEvent = (t) => {
      const e = t.target, i = e.getAttribute("data-value");
      if (!i || !Array.isArray(this.value)) return;
      const a = this.value.filter(
        (s) => s.toString() !== i
      );
      this.value = a, this.dispatchEvent(new m({ value: a })), this.dispatchEvent(
        new N({ tag: e, tagValue: i })
      );
    }, this._onFilterEvent = (t) => {
      var i;
      if (this._isComposing) return;
      const e = ((i = t.detail) == null ? void 0 : i.value) ?? t.target.value;
      if (typeof e == "string" && (this.filterMethod(e), this._handleFilteredOptionStyle(e), !this._states.isFocus && e && this._openDropdown(), !this.multiple)) {
        const a = this._getNavigableOptions();
        if (a.length > 0 && e) {
          this._setActiveOption(0);
          const s = a[0], o = (s.label || s.textContent || "").trim();
          o.toLowerCase().startsWith(e.toLowerCase()) && o.length > e.length && this._setInlineCompletion(e, o);
        } else
          this._clearActiveOption(), this.removeAttribute("aria-activedescendant");
      }
    }, this._abortControllerStates = {
      closeAbortController: null,
      tagRemoveAbortController: null,
      inputClearAbortController: null,
      inputFilterAbortController: null
    }, this._states = {
      isFocus: !1,
      isTagImport: !1
    };
  }
  get validationTarget() {
    return this._input;
  }
  updateContainerClasslist() {
    const t = this.multiple ? Array.isArray(this.value) && this.value.length > 0 : this.value !== "" && this.value != null, e = h(
      {
        [this.size]: this.size !== "default"
      },
      {
        focus: this._states.isFocus,
        disabled: this.disabled,
        clearable: this.clearable && t,
        multiple: this.multiple,
        filterable: this.filterable,
        "has-value": t
      }
    );
    return this._container && (this._container.className = e), e;
  }
  html() {
    return `
      <div class='${h()}' part='container' tabindex='-1'>
        <ea-input class="${h.e("input")}" part="input" readonly>
          <section slot="prefix" class="${h.e("tag-wrap")}" part="tag-wrap"></section>
          <ea-icon slot="suffix" class="${h.e("clear-icon")}" part="clear-icon" name='xmark'></ea-icon>
          <ea-icon slot="suffix" class="${h.e("dropdown-icon")}" part="dropdown-icon" name='angle-down'></ea-icon>
        </ea-input>
        <section class="${h.e("dropdown")}" part="dropdown" role="listbox">
          <slot></slot>
        </section>
      </div>
    `;
  }
  _updateInputAttribute(t, e) {
    this._input && (typeof e == "boolean" ? this._input.toggleAttribute(t, e) : e != null ? t === "value" ? this._input.value = e.toString() : this._input.setAttribute(t, e.toString()) : t === "value" ? this._input.value = "" : this._input.removeAttribute(t));
  }
  async _handleMultipleModeChange(t) {
    var e;
    (e = this._abortControllerStates.tagRemoveAbortController) == null || e.abort(), t && (this._abortControllerStates.tagRemoveAbortController = new AbortController(), this._tagWrap.addEventListener(
      "ea-remove",
      this._onMultipleTagRemoveEvent,
      {
        signal: this._abortControllerStates.tagRemoveAbortController.signal
      }
    ), this._states.isTagImport || (await import("./ea-tag.js"), await customElements.whenDefined("ea-tag"), this._states.isTagImport = !0)), this.updateContainerClasslist();
  }
  async _handleFilterableChange(t) {
    var e;
    (e = this._abortControllerStates.inputFilterAbortController) == null || e.abort(), t ? (this._abortControllerStates.inputFilterAbortController = new AbortController(), this._input.toggleAttribute("readonly", !t), this._input.addEventListener("input", this._onFilterEvent, {
      signal: this._abortControllerStates.inputFilterAbortController.signal
    })) : this._clearInlineCompletion(), this.updateContainerClasslist();
  }
  _handleCollapseTagsChange() {
    this.multiple && Array.isArray(this.value) && this._handleSelectValuesRender(
      this.value
    );
  }
  _handleValueChange(t) {
    this.multiple ? this._handleMultipleValueChange(t) : this._handleSingleValueChange(t), this._handleSelectedValueStyle(t), this.updateContainerClasslist();
  }
  _handleMultipleValueChange(t) {
    this.filterable ? this._input.focus() : this._updateInputAttribute("value", (t == null ? void 0 : t.length) > 0 ? " " : ""), this._handleSelectValuesRender(t || []);
  }
  _handleSingleValueChange(t) {
    this.filterable ? (this._updateInputAttribute("value", ""), this._updateInputAttribute(
      "placeholder",
      (t == null ? void 0 : t.toString().length) > 0 ? t : this.placeholder
    ), this._handleFilteredOptionStyle("")) : this._updateInputAttribute("value", this._findDisplayValue(t));
  }
  _initClearEvent() {
    var e;
    const t = () => {
      const i = this.multiple ? [] : "";
      this.value = i, this.dispatchEvent(new m({ value: i })), this.dispatchEvent(new V());
    };
    this._clearIcon.addEventListener("click", t, {
      signal: (e = this._abortControllerStates.inputClearAbortController) == null ? void 0 : e.signal
    });
  }
  _findDisplayValue(t) {
    var a;
    const e = String(t), i = [...this.querySelectorAll("ea-option")].find(
      (s) => String(s.value) === e
    );
    return i ? ((a = i.label || i.textContent) == null ? void 0 : a.trim()) || "" : (t ?? "").toString();
  }
  _handleSelectedValueStyle(t) {
    const e = this.querySelectorAll("ea-option");
    if (typeof t == "string" || typeof t == "number" || typeof t == "boolean") {
      const i = String(t);
      e.forEach((a) => {
        a.toggleAttribute(
          "selected",
          String(a.value) === i
        );
      });
    } else if (Array.isArray(t)) {
      const i = t.map((a) => String(a));
      e.forEach((a) => {
        a.toggleAttribute(
          "selected",
          i.includes(String(a.value))
        );
      });
    }
  }
  _handleSelectValuesRender(t) {
    let e = "";
    const i = (s, o, r) => `<ea-tag class="${h.e("tag")}" ${s ? "closable" : ""} disable-transitions type="info" size="${this.size}" ${s && r !== void 0 ? `data-value="${r}"` : ""}>${o}</ea-tag>`, a = (s) => {
      let o = "";
      return s.forEach((r) => {
        const b = this.querySelector(`ea-option[value="${r}"]`);
        b && (b.setAttribute("selected", ""), o += i(
          !0,
          b.label || b.textContent || "",
          r
        ));
      }), o;
    };
    if (this.querySelectorAll("ea-option").forEach((s) => {
      s.removeAttribute("selected");
    }), this._tagWrap.innerHTML = "", this.collapseTags && Array.isArray(t)) {
      const s = Number(this.maxCollapseTags) || 1, o = t.length;
      if (e += a(t.slice(0, s)), o > s) {
        const r = o - s;
        e += i(!1, `+${r}`);
      }
    } else
      e += a(t);
    this._tagWrap.innerHTML = e;
  }
  _handleFilteredOptionStyle(t) {
    this.querySelectorAll("ea-option").forEach((e) => {
      this._filterMethod(e, t);
    });
  }
  _filterMethod(t, e) {
    const i = t.label || "", a = t.textContent || "", s = `${i} ${a}`;
    t.style.display = s.includes(e) ? "block" : "none";
  }
  /** 获取可导航的选项列表（可见且未禁用） */
  _getNavigableOptions() {
    return [...this.querySelectorAll("ea-option")].filter((t) => t.style.display !== "none" && !t.disabled);
  }
  /** 设置活跃选项 */
  _setActiveOption(t) {
    const e = this._getNavigableOptions();
    if (e.length === 0 || t < 0 || t >= e.length) return;
    this._clearActiveOption(), this._activeOptionIndex = t;
    const i = e[t];
    i.active = !0, this.setAttribute("aria-activedescendant", i.id), i.scrollIntoView({ block: "nearest" });
  }
  /** 清除所有活跃选项状态 */
  _clearActiveOption() {
    this.querySelectorAll("ea-option").forEach((t) => {
      t.active = !1;
    }), this._activeOptionIndex = -1;
  }
  /** 初始化活跃选项（打开下拉框时调用） */
  _initActiveOption() {
    const t = this._getNavigableOptions();
    if (t.length === 0) return;
    let e = -1;
    !this.multiple && this.value !== "" && this.value != null && (e = t.findIndex(
      (i) => String(i.value) === String(this.value)
    )), this._setActiveOption(e >= 0 ? e : 0);
  }
  /** 移动到下一个选项 */
  _moveToNextOption() {
    const t = this._getNavigableOptions();
    if (t.length === 0) return;
    const e = Math.min(this._activeOptionIndex + 1, t.length - 1);
    this._setActiveOption(e);
  }
  /** 移动到上一个选项 */
  _moveToPreviousOption() {
    if (this._getNavigableOptions().length === 0) return;
    const e = Math.max(this._activeOptionIndex - 1, 0);
    this._setActiveOption(e);
  }
  /** 选择当前活跃选项 */
  _selectActiveOption() {
    const t = this._getNavigableOptions();
    if (this._activeOptionIndex < 0 || this._activeOptionIndex >= t.length)
      return;
    const e = t[this._activeOptionIndex];
    if (e.disabled) return;
    this._clearInlineCompletion();
    let i;
    if (!this.multiple)
      i = e.value, this.value = i, this.hide();
    else {
      Array.isArray(this.value) || (this.value = []);
      const a = this.value;
      a.includes(e.value) ? i = a.filter((s) => s !== e.value) : i = [...a, e.value], this.value = i;
    }
    this.dispatchEvent(new m({ value: i }));
  }
  /** 通过字符搜索选项 */
  _searchOption(t) {
    this._searchTimeout !== null && clearTimeout(this._searchTimeout), this._searchString += t.toLowerCase(), this._searchTimeout = setTimeout(() => {
      this._searchString = "";
    }, 500);
    const e = this._getNavigableOptions(), i = this._searchString, a = e.findIndex((s) => (s.label || s.textContent || "").toLowerCase().startsWith(i));
    a >= 0 && this._setActiveOption(a);
  }
  /** 打开下拉框 */
  _openDropdown() {
    var t;
    this.disabled || this._states.isFocus || ((t = this._abortControllerStates.closeAbortController) == null || t.abort(), this._abortControllerStates.closeAbortController = new AbortController(), this._states.isFocus = !0, this.setAttribute("aria-expanded", "true"), this._dropdown.inert = !1, this.updateContainerClasslist(), this.dispatchEvent(new O({ visible: !0 })), this.addEventListener("ea-option-click", this._onOptionClick, {
      signal: this._abortControllerStates.closeAbortController.signal
    }), document.addEventListener("click", this._onSelectClose, {
      signal: this._abortControllerStates.closeAbortController.signal
    }), this._initActiveOption());
  }
  _handleInputClick() {
    this.disabled || (this.filterable ? this._states.isFocus || this._openDropdown() : this._states.isFocus ? this.hide() : this._openDropdown());
  }
  _handleKeydown(t) {
    if (this.disabled) return;
    const e = this._states.isFocus;
    switch (t.key) {
      case "ArrowDown": {
        t.preventDefault(), t.altKey ? e || this._openDropdown() : e ? this._moveToNextOption() : this._openDropdown();
        break;
      }
      case "ArrowUp": {
        t.preventDefault(), t.altKey && e ? this.hide() : e ? this._moveToPreviousOption() : (this._openDropdown(), this._setActiveOption(0));
        break;
      }
      case "ArrowLeft":
      case "ArrowRight": {
        this.filterable && this._clearInlineCompletion();
        break;
      }
      case "Enter": {
        t.preventDefault(), e ? this._selectActiveOption() : this._openDropdown();
        break;
      }
      case " ": {
        this.filterable || (t.preventDefault(), e ? this._selectActiveOption() : this._openDropdown());
        break;
      }
      case "Escape": {
        e ? (t.preventDefault(), this.hide()) : this.filterable && (this._clearInlineCompletion(), this._updateInputAttribute("value", ""), this._handleFilteredOptionStyle(""), this._clearActiveOption());
        break;
      }
      case "Home": {
        this.filterable ? this._clearInlineCompletion() : (t.preventDefault(), e || this._openDropdown(), this._setActiveOption(0));
        break;
      }
      case "End": {
        if (this.filterable)
          this._clearInlineCompletion();
        else {
          t.preventDefault(), e || this._openDropdown();
          const i = this._getNavigableOptions();
          this._setActiveOption(i.length - 1);
        }
        break;
      }
      case "PageUp": {
        if (e) {
          t.preventDefault();
          const i = Math.max(this._activeOptionIndex - 10, 0);
          this._setActiveOption(i);
        }
        break;
      }
      case "PageDown": {
        if (e) {
          t.preventDefault();
          const i = this._getNavigableOptions(), a = Math.min(
            this._activeOptionIndex + 10,
            i.length - 1
          );
          this._setActiveOption(a);
        }
        break;
      }
      case "Tab": {
        e && this._selectActiveOption();
        break;
      }
      default: {
        t.key.length === 1 && !t.ctrlKey && !t.metaKey && !t.altKey && (this.filterable ? (this._clearInlineCompletion(), e || this._openDropdown()) : (t.preventDefault(), e || this._openDropdown(), this._searchOption(t.key)));
        break;
      }
    }
  }
  _handleFocusin(t) {
    this.filterable ? t.target === this && this._input && this._input.focus() : t.target !== this && this.focus();
  }
  _handleFocusout() {
    this._states.isFocus && requestAnimationFrame(() => {
      if (!this._states.isFocus) return;
      const t = document.activeElement;
      t !== this && !this.contains(t) && this.hide();
    });
  }
  /** 设置内联自动补全：将输入框值设为完整匹配文本，并选中未输入部分 */
  _setInlineCompletion(t, e) {
    this._isComposing = !0, this._updateInputAttribute("value", e), this._isComposing = !1, this._inlineCompletionLength = t.length, requestAnimationFrame(() => {
      this._input.setSelectionRange(
        t.length,
        e.length
      );
    });
  }
  /** 清除内联自动补全：恢复为用户实际输入的文本 */
  _clearInlineCompletion() {
    if (this._inlineCompletionLength <= 0) return;
    const e = (this._input.value || "").substring(0, this._inlineCompletionLength);
    this._isComposing = !0, this._updateInputAttribute("value", e), this._isComposing = !1, this._inlineCompletionLength = 0;
  }
  show() {
    this._openDropdown();
  }
  hide() {
    var t;
    this._states.isFocus && (this._states.isFocus = !1, this.setAttribute("aria-expanded", "false"), this.removeAttribute("aria-activedescendant"), this._dropdown.inert = !0, this._clearActiveOption(), this._clearInlineCompletion(), this.updateContainerClasslist(), this.dispatchEvent(new O({ visible: !1 })), (t = this._abortControllerStates.closeAbortController) == null || t.abort());
  }
  async $mount() {
    this.setAttribute("role", "combobox"), this.tabIndex = 0, this.setAttribute("aria-haspopup", "listbox"), this.setAttribute("aria-expanded", "false"), this._dropdownId = `ea-select-listbox-${l._idCounter++}`, this._dropdown.id = this._dropdownId, this._dropdown.inert = !0, this.setAttribute("aria-controls", this._dropdownId), this.updateContainerClasslist(), await customElements.whenDefined("ea-input"), await customElements.whenDefined("ea-option"), this.name || (this.name = Math.random().toString(36).substring(2, 15));
  }
  $beforeUnmount() {
    Object.values(this._abortControllerStates).forEach((t) => {
      t == null || t.abort();
    });
  }
  updateValidity() {
    if (!this.internals || typeof this.internals.setValidity != "function")
      return;
    const t = this.multiple ? Array.isArray(this.value) && this.value.length > 0 : this.value !== "" && this.value != null;
    this.required && !t ? this.internals.setValidity(
      { valueMissing: !0 },
      "请选择一个选项",
      this
    ) : this.internals.setValidity({}, "", this);
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
l._idCounter = 0;
n([
  c(h.cb())
], l.prototype, "_container", 2);
n([
  c(h.ce("input"))
], l.prototype, "_input", 2);
n([
  c(h.ce("tag-wrap"))
], l.prototype, "_tagWrap", 2);
n([
  c(h.ce("dropdown"))
], l.prototype, "_dropdown", 2);
n([
  c(h.ce("dropdown-icon"))
], l.prototype, "_dropdownIcon", 2);
n([
  c(h.ce("clear-icon"))
], l.prototype, "_clearIcon", 2);
n([
  p({
    type: String,
    default: "",
    a11y: { ariaAttr: "aria-label", map: (t) => t || null },
    observer(t) {
      this._updateInputAttribute("label", t);
    }
  })
], l.prototype, "label", 2);
n([
  p({
    type: String,
    default: "",
    observer(t) {
      this._updateInputAttribute("name", t);
    }
  })
], l.prototype, "name", 2);
n([
  p({
    type: String,
    default: "",
    observer(t) {
      this._updateInputAttribute("placeholder", t);
    }
  })
], l.prototype, "placeholder", 2);
n([
  p({
    type: Boolean,
    default: !1,
    a11y: { ariaAttr: "aria-disabled", map: (t) => String(t) },
    observer(t) {
      this._updateInputAttribute("disabled", t), this.updateContainerClasslist(), t ? this.tabIndex = -1 : this.tabIndex = 0;
    }
  })
], l.prototype, "disabled", 2);
n([
  p({
    type: Boolean,
    default: !1,
    observer(t) {
      var e;
      (e = this._abortControllerStates.inputClearAbortController) == null || e.abort(), this.updateContainerClasslist(), t && this._initClearEvent();
    }
  })
], l.prototype, "clearable", 2);
n([
  p({
    type: $(["large", "default", "small"]),
    default: "default",
    observer(t) {
      this._updateInputAttribute("size", t), this.updateContainerClasslist();
    }
  })
], l.prototype, "size", 2);
n([
  p({
    type: Boolean,
    default: !1,
    a11y: {
      ariaAttr: "aria-multiselectable",
      target: h.ce("dropdown"),
      map: (t) => String(t)
    },
    observer(t) {
      var e;
      (e = this._abortControllerStates.tagRemoveAbortController) == null || e.abort(), this._handleMultipleModeChange(t);
    }
  })
], l.prototype, "multiple", 2);
n([
  p({
    type: Boolean,
    default: !1,
    observer() {
      this._handleCollapseTagsChange();
    }
  })
], l.prototype, "collapseTags", 2);
n([
  p({
    type: Number,
    default: 1,
    observer() {
      this._handleCollapseTagsChange();
    }
  })
], l.prototype, "maxCollapseTags", 2);
n([
  p({
    type: Boolean,
    default: !1,
    a11y: {
      ariaAttr: "aria-autocomplete",
      map: (t) => t ? "both" : null
    },
    observer(t) {
      var e;
      (e = this._abortControllerStates.inputFilterAbortController) == null || e.abort(), this._handleFilterableChange(t);
    }
  })
], l.prototype, "filterable", 2);
n([
  p({
    type: Boolean,
    default: !1,
    a11y: { ariaAttr: "aria-required", map: (t) => String(t) }
  })
], l.prototype, "required", 2);
n([
  y({
    type: Function,
    default: (t) => {
    },
    observer() {
    }
  })
], l.prototype, "filterMethod", 2);
n([
  y({
    type: Object,
    default: "",
    observer(t) {
      this.setValue(t ? t.toString() : null), this._handleValueChange(t);
    }
  })
], l.prototype, "value", 2);
n([
  g("click", h.ce("input"))
], l.prototype, "_handleInputClick", 1);
n([
  g("keydown")
], l.prototype, "_handleKeydown", 1);
n([
  g("focusin")
], l.prototype, "_handleFocusin", 1);
n([
  g("focusout")
], l.prototype, "_handleFocusout", 1);
l = n([
  A(I, { styles: [F] })
], l);
var q = Object.defineProperty, L = Object.getOwnPropertyDescriptor, d = (t, e, i, a) => {
  for (var s = a > 1 ? void 0 : a ? L(e, i) : e, o = t.length - 1, r; o >= 0; o--)
    (r = t[o]) && (s = (a ? r(e, i, s) : r(s)) || s);
  return a && s && q(e, i, s), s;
};
const E = "ea-option", C = S(E);
let u = class extends w {
  constructor() {
    super(...arguments), this.value = null, this.label = null, this.selected = !1, this.disabled = !1, this.active = !1;
  }
  updateContainerClasslist() {
    const t = C(
      {},
      {
        selected: this.selected,
        disabled: this.disabled,
        active: this.active
      }
    );
    return this._container && (this._container.className = t), t;
  }
  html() {
    return `
      <div class='${C()}' part='container'>
        <slot></slot>
      </div>
    `;
  }
  _handleClick(t) {
    t.preventDefault(), t.stopImmediatePropagation(), !this.disabled && this.emit("ea-option-click", {
      detail: { value: this.value, target: this }
    });
  }
  $mounted() {
    this.setAttribute("role", "option"), this.id = `ea-option-${u._idCounter++}`, this.updateContainerClasslist();
  }
};
u._idCounter = 0;
d([
  c(C.cb())
], u.prototype, "_container", 2);
d([
  p({
    type: String,
    default: null
  })
], u.prototype, "value", 2);
d([
  p({
    type: String,
    default: null
  })
], u.prototype, "label", 2);
d([
  p({
    type: Boolean,
    default: !1,
    a11y: { ariaAttr: "aria-selected", map: (t) => String(t) },
    observer() {
      this.updateContainerClasslist();
    }
  })
], u.prototype, "selected", 2);
d([
  p({
    type: Boolean,
    default: !1,
    a11y: { ariaAttr: "aria-disabled", map: (t) => String(t) },
    observer() {
      this.updateContainerClasslist();
    }
  })
], u.prototype, "disabled", 2);
d([
  y({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], u.prototype, "active", 2);
d([
  g("click")
], u.prototype, "_handleClick", 1);
u = d([
  A(E, { styles: [T] })
], u);
var R = Object.defineProperty, B = Object.getOwnPropertyDescriptor, v = (t, e, i, a) => {
  for (var s = a > 1 ? void 0 : a ? B(e, i) : e, o = t.length - 1, r; o >= 0; o--)
    (r = t[o]) && (s = (a ? r(e, i, s) : r(s)) || s);
  return a && s && R(e, i, s), s;
};
const x = "ea-option-group", _ = S(x);
let f = class extends w {
  constructor() {
    super(...arguments), this.label = "";
  }
  html() {
    return `
      <div class='${_()}' part='container'>
        <header class='${_.e("header")}' part='header'>
          <slot name='header'></slot>
        </header>
        <section class='${_.e("content")}' part='content' role='group'>
          <slot></slot>
        </section>
      </div>
    `;
  }
  $mounted() {
  }
};
v([
  c(_.cb())
], f.prototype, "_container", 2);
v([
  c(_.ce("header"))
], f.prototype, "_header", 2);
v([
  c('slot[name="header"]')
], f.prototype, "_headerSlot", 2);
v([
  c(_.ce("content"))
], f.prototype, "_content", 2);
v([
  p({
    type: String,
    default: "",
    a11y: {
      ariaAttr: "aria-label",
      target: _.ce("content"),
      map: (t) => t || null
    },
    observer(t) {
      this._headerSlot && (this._headerSlot.textContent = t);
    }
  })
], f.prototype, "label", 2);
f = v([
  A(x, { styles: [M] })
], f);
export {
  u as EaOption,
  f as EaOptionGroup,
  l as EaSelect
};
