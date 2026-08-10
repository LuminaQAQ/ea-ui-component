import { E as g } from "../core/EaBase.ts.js";
import { q as d, a as u, C as E, l as _, p as x } from "../core/decorator.js";
import { E as w } from "../utils/Enum.ts.js";
import { s as D } from "../css/ea-menu.style.js";
import { c as A } from "../utils/bem.ts.js";
import { s as O } from "../css/ea-menu-item.style.js";
import { s as k } from "../css/ea-menu-item-group.style.js";
import { s as N } from "../css/ea-sub-menu.style.js";
import "./ea-icon.js";
var q = Object.defineProperty, T = Object.getOwnPropertyDescriptor, p = (t, e, i, o) => {
  for (var s = o > 1 ? void 0 : o ? T(e, i) : e, n = t.length - 1, l; n >= 0; n--)
    (l = t[n]) && (s = (o ? l(e, i, s) : l(s)) || s);
  return o && s && q(e, i, s), s;
};
const $ = "ea-menu", C = A($);
let c = class extends g {
  constructor() {
    super(...arguments), this.mode = "vertical", this.backgroundColor = "#ffffff", this.textColor = "#303133", this.activeTextColor = "#409eff", this.defaultActive = "", this.active = "", this.collapse = !1, this._updateChildrenMode = (t) => {
      this.querySelectorAll("ea-sub-menu").forEach((e) => {
        e.setAttribute("mode", t);
      });
    }, this._handleSubMenuClick = (t) => {
      const i = t.detail || {};
      if (i.itemIndex && i.target) {
        if (i.target.hasAttribute("disabled")) return;
        this.active = i.itemIndex, this.emit("select", {
          detail: {
            index: i.itemIndex,
            target: i.target
          }
        });
      }
    }, this._activateItem = (t) => {
      if (!t) return;
      const e = [...this.querySelectorAll("ea-menu-item")], i = [...this.querySelectorAll("ea-sub-menu")];
      e.forEach((n) => n.removeAttribute("active")), i.forEach((n) => n.removeAttribute("active"));
      const o = this.querySelector(
        `ea-menu-item[index="${t}"]`
      );
      if (!o) return;
      o.setAttribute("active", "true");
      let s = o.parentElement;
      for (; s && (s.tagName === "EA-SUB-MENU" && s.setAttribute("active", "true"), s !== this); )
        s = s.parentElement;
    }, this._initDefaultActiveItem = () => {
      const t = this.querySelector(
        `ea-menu-item[index="${this.defaultActive}"]`
      );
      t && t.click();
    };
  }
  updateContainerClasslist() {
    const t = C({
      [this.mode]: !0
    });
    return this._container && (this._container.className = t), t;
  }
  html() {
    return `
      <ul class="${C()}" role="menubar" aria-label="Menu" part="container">
        <slot></slot>
      </ul>
    `;
  }
  _handleKeydown(t) {
    var o;
    const e = t.target;
    if (t.key === "Escape") {
      this.querySelectorAll("ea-sub-menu[open]").forEach((s) => {
        s.removeAttribute("open");
      });
      return;
    }
    const i = (o = e.closest) == null ? void 0 : o.call(e, "ea-menu-item");
    if (i) {
      if (t.key === "ArrowUp" && this.mode === "vertical") {
        t.preventDefault(), this._focusPrevItem(i);
        return;
      }
      if (t.key === "ArrowDown" && this.mode === "vertical") {
        t.preventDefault(), this._focusNextItem(i);
        return;
      }
      if (t.key === "ArrowLeft" && this.mode === "horizontal") {
        t.preventDefault(), this._focusPrevItem(i);
        return;
      }
      if (t.key === "ArrowRight" && this.mode === "horizontal") {
        t.preventDefault(), this._focusNextItem(i);
        return;
      }
      if (t.key === "Home") {
        t.preventDefault();
        const s = this._getTopLevelItems();
        s.length > 0 && s[0].focus();
        return;
      }
      if (t.key === "End") {
        t.preventDefault();
        const s = this._getTopLevelItems();
        s.length > 0 && s[s.length - 1].focus();
        return;
      }
    }
  }
  /** 获取顶层菜单项（ea-menu-item 宿主元素 + ea-sub-menu 宿主元素），排除 disabled */
  _getTopLevelItems() {
    const t = [], e = this._container.querySelector("slot");
    if (!e) return t;
    const i = e.assignedElements();
    for (const o of i)
      (o.tagName === "EA-MENU-ITEM" || o.tagName === "EA-SUB-MENU") && (o.hasAttribute("disabled") || t.push(o));
    return t;
  }
  /** 聚焦上一个顶层菜单项 */
  _focusPrevItem(t) {
    const e = this._getTopLevelItems(), i = e.indexOf(t);
    i > 0 && e[i - 1].focus();
  }
  /** 聚焦下一个顶层菜单项 */
  _focusNextItem(t) {
    const e = this._getTopLevelItems(), i = e.indexOf(t);
    i >= 0 && i < e.length - 1 && e[i + 1].focus();
  }
  _handleMenuItemClick(t) {
    const e = t.target.closest(
      "ea-menu-item"
    ), i = t.target.closest("ea-sub-menu");
    if (e) {
      if (e.hasAttribute("disabled")) return;
      this.active = e.getAttribute("index") || "", this.emit("select", {
        detail: {
          index: e.getAttribute("index") || "",
          target: e
        }
      });
    } else if (i) {
      const o = [...this.querySelectorAll("ea-menu-item")], s = [
        ...this.querySelectorAll("ea-sub-menu")
      ], n = (l) => l.removeAttribute("active");
      o.forEach(n), s.forEach(n);
    }
  }
  $mount() {
    var t;
    (t = this._abortController) == null || t.abort(), this._abortController = new AbortController(), this.addEventListener("ea-sub-menu-click", this._handleSubMenuClick, {
      signal: this._abortController.signal
    }), this.updateContainerClasslist(), this.mode === "vertical" && this._container.setAttribute("aria-orientation", "vertical"), this._initDefaultActiveItem();
  }
  $beforeUnmount() {
    var t;
    (t = this._abortController) == null || t.abort();
  }
};
p([
  d(C.cb())
], c.prototype, "_container", 2);
p([
  u({
    type: w(["horizontal", "vertical"]),
    default: "vertical",
    observer(t) {
      this._updateChildrenMode(t), this.updateContainerClasslist();
    }
  })
], c.prototype, "mode", 2);
p([
  u({
    type: String,
    default: "#ffffff",
    observer(t) {
      this._container && this._container.style.setProperty("--ea-menu-bg-color", t);
    }
  })
], c.prototype, "backgroundColor", 2);
p([
  u({
    type: String,
    default: "#303133",
    observer(t) {
      this._container && this._container.style.setProperty("--ea-menu-text-color", t);
    }
  })
], c.prototype, "textColor", 2);
p([
  u({
    type: String,
    default: "#409eff",
    observer(t) {
      this._container && this._container.style.setProperty(
        "--ea-menu-active-text-color",
        t
      );
    }
  })
], c.prototype, "activeTextColor", 2);
p([
  u({
    type: String,
    default: ""
  })
], c.prototype, "defaultActive", 2);
p([
  u({
    type: String,
    default: "",
    observer(t) {
      this._activateItem(t);
    }
  })
], c.prototype, "active", 2);
p([
  u({
    type: Boolean,
    default: !1
  })
], c.prototype, "collapse", 2);
p([
  _("keydown")
], c.prototype, "_handleKeydown", 1);
p([
  _("click")
], c.prototype, "_handleMenuItemClick", 1);
c = p([
  E($, { styles: [D] })
], c);
var L = Object.defineProperty, B = Object.getOwnPropertyDescriptor, b = (t, e, i, o) => {
  for (var s = o > 1 ? void 0 : o ? B(e, i) : e, n = t.length - 1, l; n >= 0; n--)
    (l = t[n]) && (s = (o ? l(e, i, s) : l(s)) || s);
  return o && s && L(e, i, s), s;
};
const P = "ea-menu-item", I = A(P);
let m = class extends g {
  constructor() {
    super(...arguments), this.index = "", this.disabled = !1, this.active = !1;
  }
  updateContainerClasslist() {
    const t = I(
      {},
      {
        disabled: this.disabled,
        active: this.active
      }
    );
    return this._container && (this._container.className = t), t;
  }
  html() {
    return `
      <li class="${I()}" part="container">
        <slot></slot>
      </li>
    `;
  }
  $mount() {
    this.tabIndex = this.disabled ? -1 : 0, this.setAttribute("role", "menuitem"), this.updateContainerClasslist();
  }
  _handleKeydown(t) {
    this.disabled || (t.key === "Enter" || t.key === " ") && (t.preventDefault(), this.click());
  }
};
b([
  d(I.cb())
], m.prototype, "_container", 2);
b([
  u({
    type: String,
    default: ""
  })
], m.prototype, "index", 2);
b([
  u({
    type: Boolean,
    default: !1,
    a11y: {
      ariaAttr: "aria-disabled",
      map: (t) => String(t)
    },
    observer() {
      this.tabIndex = this.disabled ? -1 : 0, this.updateContainerClasslist();
    }
  })
], m.prototype, "disabled", 2);
b([
  u({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], m.prototype, "active", 2);
b([
  _("keydown")
], m.prototype, "_handleKeydown", 1);
m = b([
  E(P, { styles: [O] })
], m);
var F = Object.defineProperty, H = Object.getOwnPropertyDescriptor, y = (t, e, i, o) => {
  for (var s = o > 1 ? void 0 : o ? H(e, i) : e, n = t.length - 1, l; n >= 0; n--)
    (l = t[n]) && (s = (o ? l(e, i, s) : l(s)) || s);
  return o && s && F(e, i, s), s;
};
const S = "ea-menu-item-group", v = A(S);
let f = class extends g {
  constructor() {
    super(...arguments), this._uniqueId = f._instanceCount++, this.groupTitle = "";
  }
  html() {
    return `
      <div class="${v()}" part="container">
        <header class="${v.e("title")}" part="title">
          <slot name="title">${this.groupTitle}</slot>
        </header>
        <div class="${v.e("content")}" part="content" role="group">
          <slot></slot>
        </div>
      </div>
    `;
  }
  /** 设置 ARIA 关联属性 */
  _setupAria() {
    const t = `ea-menu-item-group-${this._uniqueId}`;
    this._titleEl.setAttribute("id", `${t}-title`), this._contentEl.setAttribute("aria-labelledby", `${t}-title`);
  }
  $mount() {
    this._setupAria();
  }
};
f._instanceCount = 0;
y([
  d(v.ce("title"))
], f.prototype, "_titleEl", 2);
y([
  d(v.ce("content"))
], f.prototype, "_contentEl", 2);
y([
  d('slot[name="title"]')
], f.prototype, "_titleSlot", 2);
y([
  u({
    type: String,
    default: "",
    observer(t) {
      this._titleSlot && (this._titleSlot.textContent = t);
    }
  })
], f.prototype, "groupTitle", 2);
f = y([
  E(S, { styles: [k] })
], f);
var R = Object.defineProperty, U = Object.getOwnPropertyDescriptor, a = (t, e, i, o) => {
  for (var s = o > 1 ? void 0 : o ? U(e, i) : e, n = t.length - 1, l; n >= 0; n--)
    (l = t[n]) && (s = (o ? l(e, i, s) : l(s)) || s);
  return o && s && R(e, i, s), s;
};
const M = "ea-sub-menu", h = A(M);
let r = class extends g {
  constructor() {
    super(...arguments), this._uniqueId = r._instanceCount++, this._focusoutRafId = null, this.open = !1, this._contentOpen = !1, this.index = "", this.disabled = !1, this.active = !1, this.mode = "vertical", this.label = "", this._onHoverEvent = () => {
      var e;
      (e = this._dropdownAbortController) == null || e.abort(), this._dropdownAbortController = new AbortController(), this.open = !0;
      const t = () => {
        var i;
        this.open = !1, (i = this._dropdownAbortController) == null || i.abort();
      };
      this.addEventListener("mouseleave", t, {
        signal: this._dropdownAbortController.signal
      });
    }, this._onVerticalCollapseEvent = () => {
      this.disabled || (this.open = !this.open, this.open || (this._contentEl.style.setProperty("--ea-sub-menu-transition", "none"), this._contentEl.offsetHeight, this._contentEl.style.height = `${this._contentEl.scrollHeight}px`, this._contentEl.offsetHeight, this._contentEl.style.removeProperty("--ea-sub-menu-transition")), this._contentEl.style.height = `${this.open ? this._contentEl.scrollHeight : 0}px`, this._contentEl.addEventListener(
        "transitionend",
        () => {
          this._contentEl.style.height = this.open ? "100%" : "0";
        },
        { once: !0 }
      ));
    }, this._handleModeChange = (t = this.mode) => {
      var e;
      (e = this._modeAbortController) == null || e.abort(), this._modeAbortController = new AbortController(), t === "vertical" ? this._titleEl.addEventListener("click", this._onVerticalCollapseEvent, {
        signal: this._modeAbortController.signal
      }) : this.addEventListener("mouseenter", this._onHoverEvent, {
        signal: this._modeAbortController.signal
      });
    };
  }
  updateContainerClasslist() {
    const t = h(
      {
        [this.mode]: !!this.mode
      },
      {
        disabled: this.disabled,
        active: this.active,
        open: this.open
      }
    );
    return this._container && (this._container.className = t), t;
  }
  html() {
    return `
      <div class="${h()}" part="container">
        <header class="${h.e("title")}" part="title" tabindex="-1" role="menuitem">
          <slot name="title"></slot>
          <ea-icon name="angle-down" class="${h.e("arrow")}" part="arrow"></ea-icon>
        </header>
        <ul class="${h.e("content")}" part="content" role="menu">
          <slot></slot>
        </ul>
      </div>
    `;
  }
  _handleTitleKeydown(t) {
    if (!this.disabled) {
      if (t.key === "Enter" || t.key === " ") {
        t.preventDefault(), t.stopPropagation(), this.open ? this.open = !1 : (this.open = !0, this.mode === "vertical" && this._animateContentOpen());
        return;
      }
      if (t.key === "ArrowDown") {
        t.preventDefault(), t.stopPropagation(), this.open || (this.open = !0, this.mode === "vertical" && this._animateContentOpen()), this._focusFirstItem();
        return;
      }
      if (t.key === "ArrowRight" && this.mode === "horizontal") {
        t.preventDefault(), t.stopPropagation(), this.open || (this.open = !0), this._focusFirstItem();
        return;
      }
      if (t.key === "Escape" && this.open) {
        t.preventDefault(), t.stopPropagation(), this.open = !1;
        return;
      }
    }
  }
  /** 垂直模式展开内容区域的高度动画 */
  _animateContentOpen() {
    this.mode !== "vertical" || !this._contentEl || (this._contentEl.style.height = `${this._contentEl.scrollHeight}px`, this._contentEl.addEventListener(
      "transitionend",
      () => {
        this._contentEl.style.height = "100%";
      },
      { once: !0 }
    ));
  }
  _handleContentKeydown(t) {
    var o;
    const e = t.target, i = (o = e.closest) == null ? void 0 : o.call(e, "ea-menu-item");
    if (i) {
      if (t.key === "Escape") {
        t.preventDefault(), t.stopPropagation(), this.open = !1, this._titleEl.focus();
        return;
      }
      if (t.key === "ArrowLeft" && this.mode === "vertical" && this.open) {
        t.preventDefault(), t.stopPropagation(), this.open = !1, this._titleEl.focus();
        return;
      }
      if (t.key === "ArrowUp") {
        t.preventDefault(), t.stopPropagation(), this._focusPrevItem(i);
        return;
      }
      if (t.key === "ArrowDown") {
        t.preventDefault(), t.stopPropagation(), this._focusNextItem(i);
        return;
      }
      if (t.key === "ArrowLeft" && this.mode === "horizontal") {
        t.preventDefault(), t.stopPropagation(), this._focusPrevItem(i);
        return;
      }
      if (t.key === "ArrowRight" && this.mode === "horizontal") {
        t.preventDefault(), t.stopPropagation(), this._focusNextItem(i);
        return;
      }
      if (t.key === "Home") {
        t.preventDefault(), t.stopPropagation();
        const s = this._getSubMenuItems();
        s.length > 0 && s[0].focus();
        return;
      }
      if (t.key === "End") {
        t.preventDefault(), t.stopPropagation();
        const s = this._getSubMenuItems();
        s.length > 0 && s[s.length - 1].focus();
        return;
      }
    }
  }
  /** 聚焦子菜单中的第一个菜单项 */
  _focusFirstItem() {
    const t = this._getSubMenuItems();
    t.length !== 0 && queueMicrotask(() => t[0].focus());
  }
  /** 聚焦子菜单中的下一个菜单项 */
  _focusNextItem(t) {
    const e = this._getSubMenuItems();
    if (e.length === 0) return;
    const o = e.indexOf(t) + 1;
    o < e.length && e[o].focus();
  }
  /** 聚焦子菜单中的上一个菜单项 */
  _focusPrevItem(t) {
    const e = this._getSubMenuItems();
    if (e.length === 0) return;
    const i = e.indexOf(t);
    i > 0 ? e[i - 1].focus() : this._titleEl.focus();
  }
  /** 获取子菜单内所有菜单项 */
  _getSubMenuItems() {
    return [
      ...this.querySelectorAll("ea-menu-item:not([disabled])")
    ];
  }
  _handleFocusout() {
    this.open && (this._focusoutRafId = requestAnimationFrame(() => {
      if (this._focusoutRafId = null, !this.open) return;
      const t = document.activeElement;
      t && (this === t || this.contains(t)) || (this.open = !1);
    }));
  }
  _handleFocusin(t) {
    this._focusoutRafId !== null && (cancelAnimationFrame(this._focusoutRafId), this._focusoutRafId = null), t.target === this && this._titleEl && this._titleEl.focus();
  }
  _handleMenuItemClick(t) {
    var o;
    if (t.stopImmediatePropagation(), t.preventDefault(), this.disabled) return;
    const e = t.target.closest("ea-menu-item"), i = this.closest("ea-sub-menu") === this ? (o = this.parentElement) == null ? void 0 : o.closest("ea-sub-menu") : this.closest("ea-sub-menu");
    e && (e.hasAttribute("disabled") || (this.emit("ea-sub-menu-click", {
      detail: {
        index: this.index,
        itemIndex: e.getAttribute("index") || "",
        target: e
      },
      bubbles: !0
    }), this.setAttribute("active", "true"), i && i.setAttribute("active", "true"), e.setAttribute("active", "true")));
  }
  /** 设置折叠内容的 inert 状态：折叠时阻止焦点进入 */
  _updateContentInert() {
    this._contentOpen = this.open;
  }
  /** 设置 ARIA 关联属性 */
  _setupAria() {
    const t = `ea-sub-menu-${this._uniqueId}`;
    this._titleEl.setAttribute("id", `${t}-title`), this._titleEl.setAttribute("aria-controls", `${t}-content`), this._titleEl.setAttribute("aria-haspopup", "menu"), this._titleEl.setAttribute("aria-expanded", String(this.open)), this._contentEl.setAttribute("id", `${t}-content`), this._contentEl.setAttribute("aria-labelledby", `${t}-title`);
  }
  $mount() {
    this.tabIndex = 0, this._handleModeChange(), this.updateContainerClasslist(), this._updateContentInert(), this._setupAria();
  }
  $beforeUnmount() {
    var t, e;
    (t = this._dropdownAbortController) == null || t.abort(), (e = this._modeAbortController) == null || e.abort();
  }
};
r._instanceCount = 0;
a([
  d(h.cb())
], r.prototype, "_container", 2);
a([
  d(h.ce("title"))
], r.prototype, "_titleEl", 2);
a([
  d('slot[name="title"]')
], r.prototype, "_titleSlot", 2);
a([
  d(h.ce("content"))
], r.prototype, "_contentEl", 2);
a([
  d(h.ce("arrow"))
], r.prototype, "_arrowEl", 2);
a([
  x({
    type: Boolean,
    default: !1,
    a11y: {
      ariaAttr: "aria-expanded",
      target: h.ce("title")
    },
    observer() {
      this.updateContainerClasslist();
    }
  })
], r.prototype, "open", 2);
a([
  x({
    type: Boolean,
    default: !1,
    a11y: {
      ariaAttr: "inert",
      target: ".ea-sub-menu__content",
      map: (t) => t ? null : ""
    }
  })
], r.prototype, "_contentOpen", 2);
a([
  u({
    type: String,
    default: ""
  })
], r.prototype, "index", 2);
a([
  u({
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
], r.prototype, "disabled", 2);
a([
  u({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], r.prototype, "active", 2);
a([
  u({
    type: w(["horizontal", "vertical"]),
    default: "vertical",
    observer(t) {
      this._handleModeChange(t), this.updateContainerClasslist();
    }
  })
], r.prototype, "mode", 2);
a([
  u({
    type: String,
    default: "",
    observer(t) {
      this._titleSlot && (this._titleSlot.textContent = t);
    }
  })
], r.prototype, "label", 2);
a([
  _("keydown", h.ce("title"))
], r.prototype, "_handleTitleKeydown", 1);
a([
  _("keydown")
], r.prototype, "_handleContentKeydown", 1);
a([
  _("focusout")
], r.prototype, "_handleFocusout", 1);
a([
  _("focusin")
], r.prototype, "_handleFocusin", 1);
a([
  _("click")
], r.prototype, "_handleMenuItemClick", 1);
r = a([
  E(M, { styles: [N] })
], r);
const Y = { EaMenu: c, EaMenuItem: m, EaMenuItemGroup: f, EaSubMenu: r };
export {
  c as EaMenu,
  m as EaMenuItem,
  f as EaMenuItemGroup,
  r as EaSubMenu,
  Y as default
};
