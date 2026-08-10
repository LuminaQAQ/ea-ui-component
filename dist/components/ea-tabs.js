import { E as A } from "../core/EaBase.ts.js";
import { q as _, a as c, l as d, C } from "../core/decorator.js";
import { E as y } from "../utils/Enum.ts.js";
import { s as B } from "../css/ea-tab.style.js";
import "./ea-icon.js";
import { c as x } from "../utils/bem.ts.js";
import { R } from "../utils/roving-tabindex.ts.js";
import { s as O } from "../css/ea-tabs.style.js";
import { s as N } from "../css/ea-tab-panel.style.js";
var z = Object.defineProperty, I = Object.getOwnPropertyDescriptor, b = (t, e, s, a) => {
  for (var i = a > 1 ? void 0 : a ? I(e, s) : e, o = t.length - 1, r; o >= 0; o--)
    (r = t[o]) && (i = (a ? r(e, s, i) : r(i)) || i);
  return a && i && z(e, s, i), i;
};
const S = "ea-tab", T = x(S);
let h = class extends A {
  constructor() {
    super(...arguments), this._uniqueId = h._instanceCount++, this.panel = "", this.type = "", this.disabled = !1, this.active = !1, this.tabPosition = "top", this.editable = !1, this.closable = !1;
  }
  get _hostTabsContext() {
    try {
      return this.closest("ea-tabs");
    } catch {
      return null;
    }
  }
  updateContainerClasslist() {
    var s;
    const t = this._hostTabsContext ? [...this._hostTabsContext.querySelectorAll("ea-tab")] : [], e = T(
      {
        [this.type]: this.type === ((s = this._hostTabsContext) == null ? void 0 : s.getAttribute("type")) || "",
        [this.tabPosition]: !0
      },
      {
        disabled: this.disabled,
        active: this.active,
        last: t.slice(-1)[0] === this,
        first: t[0] === this,
        closable: this.closable ? this.closable : this.editable
      }
    );
    return this._container && (this._container.className = e), e;
  }
  /** 设置 ARIA 属性，遵循 W3C tabs 模式。 */
  _setupAria() {
    this._container.setAttribute("role", "tab"), this.panel && this._container.setAttribute("aria-controls", `ea-tab-panel-${this.panel}`), this._container.id = `ea-tab-${this._uniqueId}`, this.id = `ea-tab-${this._uniqueId}`;
  }
  html() {
    return `
      <div class='${T()}' part='container'>
        <slot></slot>
        <ea-icon class="${T.e("close-icon")}" name="xmark" part="close-icon"></ea-icon>
      </div>
    `;
  }
  _handleCloseIconClick(t) {
    t.preventDefault(), t.stopImmediatePropagation(), this.emit("ea-tab-close-icon-click", {
      detail: {
        panel: this.panel
      },
      bubbles: !0
    });
  }
  $mount() {
    this.updateContainerClasslist(), this._setupAria();
  }
};
h._instanceCount = 0;
b([
  _(".ea-tab")
], h.prototype, "_container", 2);
b([
  c({
    type: String,
    default: ""
  })
], h.prototype, "panel", 2);
b([
  c({
    type: y(["", "card", "border-card"]),
    default: "",
    observer() {
      this.updateContainerClasslist();
    }
  })
], h.prototype, "type", 2);
b([
  c({
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
], h.prototype, "disabled", 2);
b([
  c({
    type: Boolean,
    default: !1,
    a11y: {
      ariaAttr: "aria-selected",
      target: ".ea-tab",
      map: (t) => String(t)
    },
    observer() {
      this.updateContainerClasslist();
    }
  })
], h.prototype, "active", 2);
b([
  c({
    type: String,
    default: "top",
    observer() {
      this.updateContainerClasslist();
    }
  })
], h.prototype, "tabPosition", 2);
b([
  c({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], h.prototype, "editable", 2);
b([
  c({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], h.prototype, "closable", 2);
b([
  d("click", ".ea-tab__close-icon")
], h.prototype, "_handleCloseIconClick", 1);
h = b([
  C(S, { styles: [B] })
], h);
class D extends Event {
  constructor(e) {
    super("ea-tab-click", {
      bubbles: !0,
      composed: !0
    }), this.detail = e;
  }
}
class $ extends Event {
  constructor(e) {
    super("ea-tab-remove", {
      bubbles: !0,
      composed: !0
    }), this.detail = e;
  }
}
class H extends Event {
  constructor(e) {
    super("ea-tabs-change", {
      bubbles: !0,
      composed: !0
    }), this.detail = e;
  }
}
var W = Object.defineProperty, j = Object.getOwnPropertyDescriptor, l = (t, e, s, a) => {
  for (var i = a > 1 ? void 0 : a ? j(e, s) : e, o = t.length - 1, r; o >= 0; o--)
    (r = t[o]) && (i = (a ? r(e, s, i) : r(i)) || i);
  return a && i && W(e, s, i), i;
};
const w = "ea-tabs", p = x(w);
let n = class extends A {
  constructor() {
    super(...arguments), this.type = "", this.active = "", this.tabPosition = "top", this.editable = !1, this._updateIndicatorPosition = (t, e = this._line, s = this.tabPosition) => {
      if (!e) return;
      const a = s === "top" || s === "bottom", i = t.getBoundingClientRect(), o = e.getBoundingClientRect();
      this.style.setProperty(
        "--ea-tabs-indicator-size",
        `${a ? t.offsetWidth : t.offsetHeight}px`
      ), this.style.setProperty(
        "--ea-tabs-indicator-x",
        `${a ? i.x - o.x : i.y - o.y}px`
      );
    }, this._updateNavPosition = (t) => {
      if (!this._nav) return;
      const e = t.getBoundingClientRect(), s = this.tabPosition === "left" || this.tabPosition === "right";
      let a, i;
      if (s) {
        const o = this._nav.scrollTop, r = o + this._nav.clientHeight, u = t.offsetTop, f = u + e.height;
        a = u >= o && f <= r, i = u - this._nav.clientHeight / 2 + e.height / 2;
      } else {
        const o = this._nav.scrollLeft, r = o + this._nav.clientWidth, u = t.offsetLeft, f = u + e.width;
        a = u >= o && f <= r, i = u - this._nav.clientWidth / 2 + e.width / 2;
      }
      a || (s ? this._nav.scrollTo({
        top: Math.max(0, i),
        behavior: "smooth"
      }) : this._nav.scrollTo({
        left: Math.max(0, i),
        behavior: "smooth"
      }));
    }, this._updateTabsActive = (t = this.active) => {
      const e = [...this.querySelectorAll("ea-tab-panel")];
      [...this.querySelectorAll("ea-tab")].forEach((a) => {
        const i = a.getAttribute("panel") === t;
        a.toggleAttribute("active", i), i && this.type === "" && this._updateIndicatorPosition(a), i && this._updateNavPosition(a);
      }), e.forEach((a) => {
        a.toggleAttribute(
          "active",
          t === a.getAttribute("name")
        );
      });
    }, this._updateTabEditable = (t = this.editable) => {
      this.querySelectorAll("ea-tab").forEach((e) => {
        e.toggleAttribute("editable", t);
      });
    }, this._updateTabNavigationPosition = (t = this.tabPosition) => {
      !this._prevBtn || !this._nextBtn || (t === "left" || t === "right" ? (this._prevBtn.setAttribute("name", "arrow-left"), this._nextBtn.setAttribute("name", "arrow-right")) : (t === "top" || t === "bottom") && (this._prevBtn.setAttribute("name", "arrow-up"), this._nextBtn.setAttribute("name", "arrow-down")));
    };
  }
  updateContainerClasslist() {
    if (!this._nav || !this._container) return "";
    const t = this._nav.scrollWidth > this._nav.clientWidth || this._nav.scrollHeight > this._nav.clientHeight, e = p(
      { [this.type]: !!this.type, [this.tabPosition]: !0 },
      { overflow: t }
    );
    return this._container.className = e, e;
  }
  html() {
    return `
      <div class='${p()}' part='container'>
        <nav class='${p.e("nav")}' part='nav'>
            <ea-icon name="angle-left" class="${p.e("prev")} ${p.e("scroll")}" part='prev'></ea-icon>
            <slot name='nav'></slot>
            <ea-icon name="angle-right" class="${p.e("next")} ${p.e("scroll")}" part='next'></ea-icon>
        </nav>
        <div class="${p.e("line")}" part="line" tabindex="-1">
            <span class="${p.e("indicator")}" part="indicator"></span>
        </div>
        <div class='${p.e("content")}' part='content'>
          <slot></slot>
        </div>
      </div>
    `;
  }
  _onSlotChange() {
    this._slotChangeTimer && clearTimeout(this._slotChangeTimer), this._slotChangeTimer = window.setTimeout(() => {
      this._slotChangeTimer = void 0, requestAnimationFrame(() => {
        this._handleSlotChange();
      });
    }, 16);
  }
  /**
   * 处理 slot 变化逻辑
   */
  _handleSlotChange() {
    const t = [...this.querySelectorAll("ea-tab")], e = [...this.querySelectorAll("ea-tab-panel")];
    t.forEach((s) => {
      s.setAttribute("slot", "nav"), this.type && s.setAttribute("type", this.type), s.setAttribute("tab-position", this.tabPosition);
    }), e.forEach((s) => {
      this.type && s.setAttribute("type", this.type), s.setAttribute("tab-position", this.tabPosition);
    }), this._updateTabsActive(this.active), this._updateTabEditable(this.editable), this.updateContainerClasslist();
  }
  _handleTabClick(t) {
    const e = t.target.closest("ea-tab");
    if (!e || e != null && e.hasAttribute("disabled")) return;
    const s = e.getAttribute("panel") || "";
    this.active = s, this.dispatchEvent(
      new D({
        name: s,
        panel: this.querySelector(`ea-tab-panel[name="${s}"]`)
      })
    );
  }
  _handlePrev() {
    this._nav.scrollTo({
      left: this._nav.scrollLeft - this._nav.offsetWidth,
      top: this._nav.scrollTop - this._nav.offsetHeight,
      behavior: "smooth"
    });
  }
  _handleNext() {
    this._nav.scrollTo({
      left: this._nav.scrollLeft + this._nav.offsetWidth,
      top: this._nav.scrollTop + this._nav.offsetHeight,
      behavior: "smooth"
    });
  }
  _handleTabRemove(t) {
    t.preventDefault(), t.stopImmediatePropagation();
    const e = t, s = e.detail.panel, a = [...this.querySelectorAll("ea-tab")], i = e.target, o = a.indexOf(i), r = this.querySelector(
      `ea-tab-panel[name="${s}"]`
    ), u = s === this.active;
    if (r.remove(), i.remove(), u) {
      const f = [...this.querySelectorAll("ea-tab")], g = f[o - 1] || f[0], E = (g == null ? void 0 : g.getAttribute("panel")) || "";
      this.setAttribute("active", E), this.dispatchEvent(new $({ name: E }));
    } else
      this.dispatchEvent(new $({ name: this.active }));
  }
  $mount() {
    if (this.setAttribute("role", "tablist"), !this.active) {
      const t = this.getAttribute("active");
      if (t)
        this.active = t;
      else {
        const e = this.querySelector("ea-tab");
        e && (this.active = e.getAttribute("panel") || "");
      }
    }
    this.updateContainerClasslist(), this._nav && (this._resizeObserver = new ResizeObserver(() => {
      this._resizeTimer && clearTimeout(this._resizeTimer), this._resizeTimer = window.setTimeout(() => {
        this._resizeTimer = void 0, this.updateContainerClasslist();
      }, 16);
    }), this._resizeObserver.observe(this._nav)), this._initRovingTabindex();
  }
  /** 初始化键盘导航 */
  _initRovingTabindex() {
    const t = this.tabPosition === "left" || this.tabPosition === "right", e = [...this.querySelectorAll("ea-tab")];
    this._rovingTabindex = new R({
      orientation: t ? "vertical" : "horizontal",
      loop: !0,
      onActivate: (s) => {
        const a = e[s];
        if (a && !a.hasAttribute("disabled")) {
          const i = a.getAttribute("panel") || "";
          this.active = i;
        }
      }
    }), this._rovingTabindex.setItems(e), this._syncRovingTabindex(this.active);
  }
  /** 同步 RovingTabindex 的当前索引与 active 属性 */
  _syncRovingTabindex(t) {
    if (!this._rovingTabindex || !t) return;
    const s = [...this.querySelectorAll("ea-tab")].findIndex((a) => a.getAttribute("panel") === t);
    s >= 0 && this._rovingTabindex.setCurrentIndex(s);
  }
  _handleNavKeydown(t) {
    var e;
    (e = this._rovingTabindex) == null || e.handleKeydown(t);
  }
  $beforeUnmount() {
    var t, e;
    this._slotChangeTimer && (clearTimeout(this._slotChangeTimer), this._slotChangeTimer = void 0), this._resizeTimer && (clearTimeout(this._resizeTimer), this._resizeTimer = void 0), (t = this._resizeObserver) == null || t.disconnect(), this._resizeObserver = void 0, (e = this._rovingTabindex) == null || e.destroy(), this._rovingTabindex = void 0;
  }
};
l([
  _(".ea-tabs")
], n.prototype, "_container", 2);
l([
  _(".ea-tabs__prev")
], n.prototype, "_prevBtn", 2);
l([
  _(".ea-tabs__next")
], n.prototype, "_nextBtn", 2);
l([
  _(".ea-tabs__nav")
], n.prototype, "_nav", 2);
l([
  _(".ea-tabs__line")
], n.prototype, "_line", 2);
l([
  c({
    type: y(["", "card", "border-card"]),
    default: "",
    observer() {
      this.updateContainerClasslist(), this.querySelectorAll("ea-tab").forEach((t) => {
        t.setAttribute("type", this.type);
      }), this.querySelectorAll("ea-tab-panel").forEach((t) => {
        t.setAttribute("type", this.type);
      });
    }
  })
], n.prototype, "type", 2);
l([
  c({
    type: String,
    default: "",
    observer(t) {
      this._updateTabsActive(t), this._syncRovingTabindex(t), this.dispatchEvent(new H({ name: t }));
    }
  })
], n.prototype, "active", 2);
l([
  c({
    type: y(["top", "bottom", "left", "right"]),
    default: "top",
    a11y: {
      ariaAttr: "aria-orientation",
      map: (t) => t === "left" || t === "right" ? "vertical" : "horizontal"
    },
    observer(t) {
      this.updateContainerClasslist(), this._updateTabNavigationPosition(t), this._updateTabsActive(this.active), this.querySelectorAll("ea-tab").forEach((e) => {
        e.setAttribute("tab-position", t);
      }), this.querySelectorAll("ea-tab-panel").forEach((e) => {
        e.setAttribute("tab-position", t);
      });
    }
  })
], n.prototype, "tabPosition", 2);
l([
  c({
    type: Boolean,
    default: !1,
    observer(t) {
      this._updateTabEditable(t);
    }
  })
], n.prototype, "editable", 2);
l([
  d("slotchange", 'slot[name="nav"]'),
  d("slotchange", ".ea-tabs__content > slot")
], n.prototype, "_onSlotChange", 1);
l([
  d("click", ".ea-tabs__nav")
], n.prototype, "_handleTabClick", 1);
l([
  d("click", ".ea-tabs__prev")
], n.prototype, "_handlePrev", 1);
l([
  d("click", ".ea-tabs__next")
], n.prototype, "_handleNext", 1);
l([
  d("ea-tab-close-icon-click")
], n.prototype, "_handleTabRemove", 1);
l([
  d("keydown", ".ea-tabs__nav")
], n.prototype, "_handleNavKeydown", 1);
n = l([
  C(w, { styles: [O] })
], n);
var L = Object.defineProperty, M = Object.getOwnPropertyDescriptor, m = (t, e, s, a) => {
  for (var i = a > 1 ? void 0 : a ? M(e, s) : e, o = t.length - 1, r; o >= 0; o--)
    (r = t[o]) && (i = (a ? r(e, s, i) : r(i)) || i);
  return a && i && L(e, s, i), i;
};
const q = "ea-tab-panel", P = x(q);
let v = class extends A {
  constructor() {
    super(...arguments), this.name = "", this.type = "", this.active = !1;
  }
  get _hostTabsContext() {
    try {
      return this.closest("ea-tabs");
    } catch {
      return null;
    }
  }
  updateContainerClasslist() {
    const t = P({ [this.type]: !!this.type });
    return this._container && (this._container.className = t), t;
  }
  html() {
    return `
      <div class='${P()}' part='container'>
        <slot></slot>
      </div>
    `;
  }
  /** 设置 ARIA 属性，遵循 W3C tabs 模式 */
  _setupAria() {
    var e;
    this._container.setAttribute("role", "tabpanel"), this._container.id = `ea-tab-panel-${this.name}`, this._container.setAttribute("tabindex", "0");
    const t = (e = this.closest("ea-tabs")) == null ? void 0 : e.querySelector(`ea-tab[panel="${this.name}"]`);
    t != null && t.id && this._container.setAttribute("aria-labelledby", t.id);
  }
  $mount() {
    this.updateContainerClasslist(), this._setupAria();
  }
};
m([
  _(".ea-tab-panel")
], v.prototype, "_container", 2);
m([
  c({
    type: String,
    default: ""
  })
], v.prototype, "name", 2);
m([
  c({
    type: y(["", "card", "border-card"]),
    default: "",
    observer() {
      this.updateContainerClasslist();
    }
  })
], v.prototype, "type", 2);
m([
  c({
    type: Boolean,
    default: !1,
    a11y: {
      ariaAttr: "inert",
      map: (t) => t ? null : ""
    }
  })
], v.prototype, "active", 2);
v = m([
  C(q, { styles: [N] })
], v);
const Z = { EaTab: h, EaTabs: n, EaTabPanel: v };
export {
  h as EaTab,
  v as EaTabPanel,
  n as EaTabs,
  Z as default
};
