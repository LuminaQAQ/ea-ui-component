import { E as _ } from "../core/EaBase.ts.js";
import { q as u, a as d, C as b, p as f, l as m } from "../core/decorator.js";
import { E as v } from "../utils/Enum.ts.js";
import { s as w } from "../css/ea-collapse.style.js";
import { c as y } from "../utils/bem.ts.js";
import { s as $ } from "../css/ea-collapse-item.style.js";
import "./ea-icon.js";
class E extends Event {
  constructor(t) {
    super("ea-change", { bubbles: !0, composed: !0 }), this.detail = t;
  }
}
var S = Object.defineProperty, x = Object.getOwnPropertyDescriptor, h = (e, t, s, i) => {
  for (var a = i > 1 ? void 0 : i ? x(t, s) : t, n = e.length - 1, c; n >= 0; n--)
    (c = e[n]) && (a = (i ? c(t, s, a) : c(a)) || a);
  return i && a && S(t, s, a), a;
};
const g = "ea-collapse", A = y(g);
let p = class extends _ {
  constructor() {
    super(...arguments), this.accordion = !1, this.active = [], this.expandIconPosition = "right", this.beforeCollapse = null, this._isSettingActiveNames = !1;
  }
  /** 更新手风琴模式下的折叠状态 */
  _updateAccordionCollapse(e = this.active) {
    [
      ...this.querySelectorAll("ea-collapse-item")
    ].forEach(
      (s) => s.toggleAttribute("active", s.getAttribute("name") === e)
    );
  }
  /** 更新普通模式下的折叠状态 */
  _updateNormalCollapse(e = this.active) {
    [
      ...this.querySelectorAll("ea-collapse-item")
    ].forEach(
      (s) => s.toggleAttribute(
        "active",
        e.includes(s.getAttribute("name") || "")
      )
    );
  }
  /** 设置折叠项的展开状态 */
  setActiveNames(e) {
    this._isSettingActiveNames = !0, this.active = e, this._isSettingActiveNames = !1, this.accordion ? this._updateAccordionCollapse(e) : this._updateNormalCollapse(e);
  }
  /** 初始化折叠项的唯一标识及折叠状态 */
  _initCollapseStatus() {
    [
      ...this.querySelectorAll("ea-collapse-item")
    ].forEach((t, s) => {
      t.getAttribute("name") || t.setAttribute("name", String(s));
    });
  }
  html() {
    return `
      <div class="${A()}" part="container">
        <slot></slot>
      </div>
    `;
  }
  async _handleCollapseItemClick(e) {
    e.preventDefault(), e.stopImmediatePropagation(), e.stopPropagation();
    const { name: t, target: s } = e.detail;
    if (typeof this.beforeCollapse == "function")
      try {
        if (!await this.beforeCollapse({ name: t, target: s })) return;
      } catch {
        return;
      }
    if (this.accordion)
      this.active === t ? this.setActiveNames("") : this.setActiveNames(t);
    else
      try {
        const i = this.active;
        i.includes(t) ? this.setActiveNames(i.filter((a) => a !== t)) : this.setActiveNames([...i, t]);
      } catch {
        console.error(
          `${this.tagName}: When 'accordion' is false, 'active' should be an Array type.`,
          this
        );
      }
    this.dispatchEvent(
      new E({
        name: t,
        target: s,
        active: this.active
      })
    );
  }
  /** 获取所有非禁用的折叠面板项 */
  _getEnabledItems() {
    return Array.from(this.querySelectorAll("ea-collapse-item")).filter(
      (e) => !e.hasAttribute("disabled")
    );
  }
  _handleKeydown(e) {
    var c;
    const t = e.target, s = (c = t.closest) == null ? void 0 : c.call(t, "ea-collapse-item");
    if (!s || s.hasAttribute("disabled")) return;
    const i = this._getEnabledItems();
    if (i.length === 0) return;
    const a = i.indexOf(s);
    if (a < 0) return;
    let n = a;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault(), n = a < i.length - 1 ? a + 1 : 0;
        break;
      case "ArrowUp":
        e.preventDefault(), n = a > 0 ? a - 1 : i.length - 1;
        break;
      case "Home":
        e.preventDefault(), n = 0;
        break;
      case "End":
        e.preventDefault(), n = i.length - 1;
        break;
      default:
        return;
    }
    n !== a && i[n].focus();
  }
  $mount() {
    this._initCollapseStatus();
  }
};
h([
  u(A.cb())
], p.prototype, "_container", 2);
h([
  d({
    type: Boolean,
    default: !1
  })
], p.prototype, "accordion", 2);
h([
  f({
    type: Array,
    default: [],
    observer(e) {
      this._isSettingActiveNames || this.setActiveNames(e);
    }
  })
], p.prototype, "active", 2);
h([
  d({
    type: v(["left", "right"]),
    default: "right",
    observer(e) {
      this.querySelectorAll("ea-collapse-item").forEach((t) => {
        t.expandIconPosition = e;
      });
    }
  })
], p.prototype, "expandIconPosition", 2);
h([
  f({
    type: Function,
    default: null
  })
], p.prototype, "beforeCollapse", 2);
h([
  m("ea-collapse-item-click")
], p.prototype, "_handleCollapseItemClick", 1);
h([
  m("keydown")
], p.prototype, "_handleKeydown", 1);
p = h([
  b(g, { styles: [w] })
], p);
var I = Object.defineProperty, P = Object.getOwnPropertyDescriptor, o = (e, t, s, i) => {
  for (var a = i > 1 ? void 0 : i ? P(t, s) : t, n = e.length - 1, c; n >= 0; n--)
    (c = e[n]) && (a = (i ? c(t, s, a) : c(a)) || a);
  return i && a && I(t, s, a), a;
};
const C = "ea-collapse-item", l = y(C);
let r = class extends _ {
  constructor() {
    super(...arguments), this._uniqueId = r._instanceCount++, this.header = "", this.name = "", this.expandIconPosition = "right", this.disabled = !1, this.active = !1, this._contentActive = !1;
  }
  /** 更新容器类名 */
  updateContainerClasslist() {
    const e = l(
      {
        [`indicator-${this.expandIconPosition}`]: this.expandIconPosition !== "right"
      },
      {
        disabled: this.disabled
      }
    );
    return this._container && (this._container.className = e), e;
  }
  /** 更新折叠面板高度 */
  _updateCollapseHeight(e = this.active) {
    queueMicrotask(() => {
      this._container && this._container.style.setProperty(
        "--ea-collapse-item-content-height",
        e ? `${this._content.scrollHeight}px` : "0"
      );
    });
  }
  /** 同步内容区域的激活状态 */
  _updateContentInert(e = this.active) {
    this._contentActive = e;
  }
  html() {
    return `
      <div class="${this.updateContainerClasslist()}" part="container">
        <div class="${l.e("header-wrap")}" part="header-wrap" role="button" tabindex="0">
          <span class="${l.e("header")}" part="header">
            <slot name="header"></slot>
          </span>
          <span class="${l.e("indicator")}" part="indicator" inert>
            <slot name="icon">
              <ea-icon class="${l.e("expand-icon")}" name="angle-down" part="icon"></ea-icon>
            </slot>
          </span>
        </div>
        <div class="${l.e("content")}" part="content-wrap">
          <slot></slot>
        </div>
      </div>
    `;
  }
  _handleClick(e) {
    e.preventDefault(), e.stopImmediatePropagation(), !this.disabled && this.emit("ea-collapse-item-click", {
      detail: {
        name: this.name,
        target: this
      },
      bubbles: !0,
      cancelable: !0
    });
  }
  _handleKeydown(e) {
    this.disabled || (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this.emit("ea-collapse-item-click", {
      detail: {
        name: this.name,
        target: this
      },
      bubbles: !0,
      cancelable: !0
    }));
  }
  _handleSlotChange() {
    this._container && (this._container.style.setProperty(
      "--ea-collapse-item-content-height",
      "auto"
    ), this._updateCollapseHeight());
  }
  /** 设置 ARIA 关联属性 */
  _setupAria() {
    const e = `ea-collapse-item-${this._uniqueId}`;
    this._headerWrap.setAttribute("id", `${e}-header`), this._headerWrap.setAttribute("aria-controls", `${e}-panel`), this._content.setAttribute("id", `${e}-panel`), this._content.setAttribute("role", "region"), this._content.setAttribute("aria-labelledby", `${e}-header`), this.disabled && this._headerWrap.setAttribute("tabindex", "-1");
  }
  $mount() {
    this.updateContainerClasslist(), this._setupAria(), this._updateContentInert(), this.active && this._updateCollapseHeight(!0);
  }
};
r._instanceCount = 0;
o([
  u(l.cb())
], r.prototype, "_container", 2);
o([
  u(l.ce("header-wrap"))
], r.prototype, "_headerWrap", 2);
o([
  u(`${l.ce("header")} slot`)
], r.prototype, "_headerSlot", 2);
o([
  u(l.ce("content"))
], r.prototype, "_content", 2);
o([
  u("slot:not([name])")
], r.prototype, "_defaultSlot", 2);
o([
  d({
    type: String,
    default: "",
    observer(e) {
      this._headerSlot && (this._headerSlot.textContent = e);
    }
  })
], r.prototype, "header", 2);
o([
  d({
    type: String,
    default: ""
  })
], r.prototype, "name", 2);
o([
  d({
    type: v(["left", "right"]),
    default: "right",
    observer() {
      this.updateContainerClasslist();
    }
  })
], r.prototype, "expandIconPosition", 2);
o([
  d({
    type: Boolean,
    default: !1,
    a11y: {
      ariaAttr: "aria-disabled",
      target: ".ea-collapse-item__header-wrap",
      map: (e) => String(e)
    },
    observer() {
      this.updateContainerClasslist(), this._headerWrap && this._headerWrap.setAttribute("tabindex", this.disabled ? "-1" : "0");
    }
  })
], r.prototype, "disabled", 2);
o([
  d({
    type: Boolean,
    default: !1,
    a11y: {
      ariaAttr: "aria-expanded",
      target: ".ea-collapse-item__header-wrap",
      map: (e) => String(e)
    },
    observer(e) {
      this._updateCollapseHeight(e);
    }
  })
], r.prototype, "active", 2);
o([
  f({
    type: Boolean,
    default: !1,
    a11y: {
      ariaAttr: "inert",
      target: ".ea-collapse-item__content",
      map: (e) => e ? null : ""
    }
  })
], r.prototype, "_contentActive", 2);
o([
  m("click", l.ce("header-wrap"))
], r.prototype, "_handleClick", 1);
o([
  m("keydown", l.ce("header-wrap"))
], r.prototype, "_handleKeydown", 1);
o([
  m("slotchange", "slot:not([name])")
], r.prototype, "_handleSlotChange", 1);
r = o([
  b(C, { styles: [$] })
], r);
export {
  p as EaCollapse,
  r as EaCollapseItem
};
