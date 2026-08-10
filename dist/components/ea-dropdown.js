import { EaPopper as E } from "./ea-popper.js";
import { a as h, C as f, l as c, q as C } from "../core/decorator.js";
import { E as _ } from "../utils/Enum.ts.js";
import { s as T } from "../css/ea-dropdown.style.js";
import { E as b } from "../core/EaBase.ts.js";
import { s as D } from "../css/ea-dropdown-item.style.js";
import { c as y } from "../utils/bem.ts.js";
import { s as k } from "../css/ea-dropdown-menu.style.js";
var $ = Object.defineProperty, x = Object.getOwnPropertyDescriptor, u = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? x(t, s) : t, o = e.length - 1, n; o >= 0; o--)
    (n = e[o]) && (i = (r ? n(t, s, i) : n(i)) || i);
  return r && i && $(t, s, i), i;
};
const H = "ea-dropdown", O = ["click", "hover", "contextmenu"], P = ["small", "default", "large"];
let a = class extends E {
  constructor() {
    super(...arguments), this._hoverHideTimer = null, this.trigger = "hover", this.hideOnClick = !0, this.size = "", this._triggerEventStrategies = {
      hover: () => {
        this.addEventListener(
          "mouseenter",
          () => {
            this._clearHoverHideTimer(), this.show();
          },
          { signal: this._triggerAbortController.signal }
        ), this.addEventListener(
          "mouseleave",
          () => {
            this._scheduleHoverHide();
          },
          { signal: this._triggerAbortController.signal }
        );
      },
      click: () => {
        this._referenceSlot.addEventListener(
          "click",
          (e) => {
            e.detail !== 0 && this.toggle();
          },
          { signal: this._triggerAbortController.signal }
        );
      },
      contextmenu: () => {
        this.addEventListener(
          "contextmenu",
          (e) => {
            var t;
            e.preventDefault(), (t = this._contextmenuAbortController) == null || t.abort(), this._contextmenuAbortController = new AbortController(), this.toggle(), this.visible && window.addEventListener(
              "click",
              (s) => {
                this.contains(s.target) || this.hide();
              },
              { signal: this._contextmenuAbortController.signal, once: !0 }
            );
          },
          { signal: this._triggerAbortController.signal }
        );
      }
    };
  }
  /** 清除 hover 隐藏定时器 */
  _clearHoverHideTimer() {
    this._hoverHideTimer !== null && (clearTimeout(this._hoverHideTimer), this._hoverHideTimer = null);
  }
  /** 设置 ARIA 关联属性，添加 aria-haspopup，使非交互式触发元素可聚焦 */
  _setupAria() {
    super._setupAria();
    const e = this._getReferenceTrigger();
    e && (e.setAttribute("aria-haspopup", "menu"), this._isNativelyFocusable(e) || (e.setAttribute("tabindex", "0"), e.setAttribute("role", "button")));
  }
  /** 检查元素是否原生可聚焦 */
  _isNativelyFocusable(e) {
    return !!(["A", "BUTTON", "INPUT", "SELECT", "TEXTAREA"].includes(e.tagName) || e.tabIndex >= 0);
  }
  /** 延迟隐藏下拉菜单 */
  _scheduleHoverHide() {
    this._hoverHideTimer = setTimeout(() => {
      this.hide(), this._hoverHideTimer = null;
    }, 150);
  }
  /** 设置触发事件监听器 */
  _setupTrigger() {
    var e;
    (e = this._triggerAbortController) == null || e.abort(), this._triggerAbortController = new AbortController(), this._triggerEventStrategies[this.trigger]();
  }
  /** 获取所有非禁用的下拉菜单项 */
  _getDropdownItems() {
    return [
      ...this.querySelectorAll("ea-dropdown-item:not([disabled])")
    ];
  }
  _handleKeydown(e) {
    var n;
    const t = e.target, s = this._getReferenceTrigger(), r = this._getDropdownItems(), i = s && (t === s || s.contains(t)), o = (n = t.closest) == null ? void 0 : n.call(t, "ea-dropdown-item");
    if (e.key === "Escape" && this.visible) {
      e.preventDefault(), this.hide(), s == null || s.focus();
      return;
    }
    if (i) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault(), this.toggle();
        return;
      }
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault(), this.visible || this.show(), r.length > 0 && requestAnimationFrame(() => r[0].focus());
        return;
      }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault(), this.visible || this.show(), r.length > 0 && requestAnimationFrame(() => r[r.length - 1].focus());
        return;
      }
      return;
    }
    if (o && this.visible) {
      const m = r.indexOf(o);
      if (e.key === "Tab") {
        this.hide();
        return;
      }
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        const v = m + 1;
        v < r.length && r[v].focus();
        return;
      }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault(), m > 0 ? r[m - 1].focus() : s == null || s.focus();
        return;
      }
      if (e.key === "Home") {
        e.preventDefault(), r.length > 0 && r[0].focus();
        return;
      }
      if (e.key === "End") {
        e.preventDefault(), r.length > 0 && r[r.length - 1].focus();
        return;
      }
    }
  }
  _handleFocusout() {
    this.visible && requestAnimationFrame(() => {
      if (!this.visible) return;
      const e = document.activeElement;
      e && this.contains(e) || this.hide();
    });
  }
  _handleDropdownItemClick(e) {
    e.stopPropagation(), this.hideOnClick && this.hide();
  }
  $mount() {
    this.getAttribute("placement") || (this.placement = "bottom"), super.$mount(), this._setupTrigger();
  }
  $beforeUnmount() {
    var e, t;
    super.$beforeUnmount(), (e = this._triggerAbortController) == null || e.abort(), (t = this._contextmenuAbortController) == null || t.abort(), this._clearHoverHideTimer();
  }
};
u([
  h({
    type: _(O),
    default: "hover",
    observer() {
      this._setupTrigger();
    }
  })
], a.prototype, "trigger", 2);
u([
  h({
    type: Boolean,
    default: !0
  })
], a.prototype, "hideOnClick", 2);
u([
  h({
    type: _(P),
    default: ""
  })
], a.prototype, "size", 2);
u([
  c("keydown")
], a.prototype, "_handleKeydown", 1);
u([
  c("focusout")
], a.prototype, "_handleFocusout", 1);
u([
  c("ea-dropdown-item-click")
], a.prototype, "_handleDropdownItemClick", 1);
a = u([
  f(H, { styles: [T] })
], a);
class I extends Event {
  constructor(t) {
    super("ea-command", { bubbles: !0, composed: !0 }), this.detail = t;
  }
}
var N = Object.defineProperty, S = Object.getOwnPropertyDescriptor, d = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? S(t, s) : t, o = e.length - 1, n; o >= 0; o--)
    (n = e[o]) && (i = (r ? n(t, s, i) : n(i)) || i);
  return r && i && N(t, s, i), i;
};
const w = "ea-dropdown-item", p = y(w);
let l = class extends b {
  constructor() {
    super(...arguments), this.divided = !1, this.disabled = !1, this.command = "";
  }
  updateContainerClasslist() {
    const e = p(
      { disabled: this.disabled },
      { divided: this.divided }
    );
    return this._container && (this._container.className = e), e;
  }
  html() {
    return `
      <div class="${this.updateContainerClasslist()}" part="container">
        <div class="${p.e("divider")}" part="divider"></div>
        <div class="${p.e("content")}" part="content">
          <slot></slot>
        </div>
      </div>
    `;
  }
  _handleClick(e) {
    if (this.disabled) {
      e.stopImmediatePropagation(), e.preventDefault();
      return;
    }
    this.emit("ea-dropdown-item-click"), this.command && this.dispatchEvent(new I({ command: this.command }));
  }
  _handleKeydown(e) {
    this.disabled || (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this.click());
  }
  $mount() {
    this.tabIndex = 0, this.setAttribute("role", "menuitem"), this.updateContainerClasslist();
  }
};
d([
  C(p.cb())
], l.prototype, "_container", 2);
d([
  h({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], l.prototype, "divided", 2);
d([
  h({
    type: Boolean,
    default: !1,
    a11y: {
      ariaAttr: "aria-disabled",
      map: (e) => String(e)
    },
    observer() {
      this.updateContainerClasslist();
    }
  })
], l.prototype, "disabled", 2);
d([
  h({
    type: String,
    default: ""
  })
], l.prototype, "command", 2);
d([
  c("click")
], l.prototype, "_handleClick", 1);
d([
  c("keydown")
], l.prototype, "_handleKeydown", 1);
l = d([
  f(w, { styles: [D] })
], l);
var L = Object.getOwnPropertyDescriptor, F = (e, t, s, r) => {
  for (var i = r > 1 ? void 0 : r ? L(t, s) : t, o = e.length - 1, n; o >= 0; o--)
    (n = e[o]) && (i = n(i) || i);
  return i;
};
const A = "ea-dropdown-menu", R = y(A);
let g = class extends b {
  html() {
    return `
      <div class="${R()}" part="container">
        <slot></slot>
      </div>
    `;
  }
  $mount() {
    this.setAttribute("role", "menu"), this.setAttribute("aria-label", "Menu");
  }
};
g = F([
  f(A, { styles: [k] })
], g);
export {
  a as EaDropdown,
  I as EaDropdownCommandEvent,
  l as EaDropdownItem,
  g as EaDropdownMenu
};
