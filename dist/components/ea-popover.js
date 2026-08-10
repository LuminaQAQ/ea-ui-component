import { EaPopper as b } from "./ea-popper.js";
import { c as m } from "../utils/bem.ts.js";
import { q as p, a as u, l as f, C as v } from "../core/decorator.js";
import { E } from "../utils/Enum.ts.js";
import { s as C } from "../css/ea-popover.style.js";
var A = Object.defineProperty, y = Object.getOwnPropertyDescriptor, a = (t, e, i, n) => {
  for (var r = n > 1 ? void 0 : n ? y(e, i) : e, s = t.length - 1, l; s >= 0; s--)
    (l = t[s]) && (r = (n ? l(e, i, r) : l(r)) || r);
  return n && r && A(e, i, r), r;
};
const _ = "ea-popover", h = m(_), x = [
  "click",
  "focus",
  "hover",
  "contextmenu",
  "customized"
];
let o = class extends b {
  constructor() {
    super(...arguments), this._keyboardActivated = !1, this.trigger = "hover", this.heading = "", this.content = "", this._triggerEventStrategies = {
      hover: () => {
        this.addEventListener(
          "mouseover",
          () => {
            this.show(), this.addEventListener(
              "mouseout",
              () => {
                this.hide();
              },
              { once: !0, signal: this._triggerAbortController.signal }
            );
          },
          { signal: this._triggerAbortController.signal }
        );
      },
      click: () => {
        this.addEventListener(
          "click",
          (t) => {
            t.detail !== 0 && this.toggle();
          },
          { signal: this._triggerAbortController.signal }
        );
      },
      focus: () => {
        this.addEventListener(
          "focusin",
          () => {
            this.visible || this.show();
          },
          { signal: this._triggerAbortController.signal }
        ), this.addEventListener(
          "focusout",
          () => {
            requestAnimationFrame(() => {
              this.visible && !this.contains(document.activeElement) && this.hide();
            });
          },
          { signal: this._triggerAbortController.signal }
        );
      },
      contextmenu: () => {
        this.addEventListener(
          "contextmenu",
          (t) => {
            var e;
            t.preventDefault(), (e = this._contextmenuAbortController) == null || e.abort(), this._contextmenuAbortController = new AbortController(), this.show(), window.addEventListener(
              "click",
              (i) => {
                var r;
                this.contains(i.target) || (this.hide(), (r = this._contextmenuAbortController) == null || r.abort());
              },
              { signal: this._contextmenuAbortController.signal }
            );
          },
          { signal: this._triggerAbortController.signal }
        );
      },
      customized: () => {
      }
    };
  }
  updateContainerClasslist() {
    const e = `${super.updateContainerClasslist()} ${h(
      {},
      {
        "has-heading": !!this.heading,
        "has-content": !!this.content
      }
    )}`;
    return this._container && (this._container.className = e), e;
  }
  /** 设置 ARIA 关联属性，使非交互式触发元素可聚焦 */
  _setupAria() {
    super._setupAria(), this._originalPopper.setAttribute("role", "dialog");
    const t = this._getReferenceTrigger();
    t && (t.setAttribute("aria-haspopup", "dialog"), this._isNativelyFocusable(t) || (t.setAttribute("tabindex", "0"), t.setAttribute("role", "button")));
    const e = this._originalPopper.getAttribute("id") || "";
    if (this.heading && this._titleElement) {
      const i = `${e}-title`;
      this._titleElement.setAttribute("id", i), this._originalPopper.setAttribute("aria-labelledby", i);
    }
    if (this.content && this._contentElement) {
      const i = `${e}-desc`;
      this._contentElement.setAttribute("id", i), this._originalPopper.setAttribute("aria-describedby", i);
    }
  }
  /** 检查元素是否原生可聚焦 */
  _isNativelyFocusable(t) {
    return !!(["A", "BUTTON", "INPUT", "SELECT", "TEXTAREA"].includes(t.tagName) || t.tabIndex >= 0);
  }
  /** 初始化触发事件监听 */
  _initTriggerEvent() {
    var e;
    if ((e = this._triggerAbortController) == null || e.abort(), this._triggerAbortController = new AbortController(), this.trigger === "customized") return;
    const t = this._triggerEventStrategies[this.trigger];
    t ? t() : (console.warn(`[EaPopover] trigger event ${this.trigger} is not exist`), this._triggerEventStrategies.hover());
  }
  /** 获取内容区内的可聚焦元素（排除触发元素），包括自定义元素内部的可聚焦元素 */
  _getContentFocusableElements() {
    const t = this._getReferenceTrigger(), e = [];
    return ((n) => {
      const r = n.querySelectorAll("*");
      for (const s of r)
        if (!(s === t || t != null && t.contains(s)) && !s.hasAttribute("disabled")) {
          if (s.tabIndex >= 0 || s.matches(o.FOCUSABLE_SELECTOR)) {
            e.push(s);
            continue;
          }
          s.shadowRoot && s.shadowRoot.querySelector(
            o.FOCUSABLE_SELECTOR
          ) && e.push(s);
        }
    })(this), e;
  }
  _handleKeydown(t) {
    const e = t.target, i = this._getReferenceTrigger(), n = !!(i && (e === i || i.contains(e))), r = this.contains(e) && !n;
    if (n) {
      if (t.key === "Enter" || t.key === " ") {
        if (this.trigger === "focus") return;
        if (this.trigger === "customized") {
          this._keyboardActivated = !0;
          return;
        }
        t.preventDefault(), t.stopPropagation(), this._keyboardActivated = !0, this.visible ? this.hide() : this.show();
        return;
      }
      return;
    }
    if (r && this.visible) {
      if (t.key === "Escape") {
        t.preventDefault(), t.stopPropagation(), this.hide(), i == null || i.focus();
        return;
      }
      if (t.key === "Tab") {
        const s = this._getContentFocusableElements();
        if (s.length === 0) return;
        const l = s[0], g = s[s.length - 1], c = s.find(
          (d) => d === e || d.contains(e)
        );
        t.shiftKey ? (!c || c === l) && (t.preventDefault(), this._focusElement(g)) : (!c || c === g) && (t.preventDefault(), this._focusElement(l));
        return;
      }
    }
  }
  /** 将焦点移入弹出内容区，优先聚焦第一个可交互元素 */
  _focusContent() {
    const t = this._getContentFocusableElements();
    t.length > 0 ? this._focusElement(t[0]) : (this._originalPopper.tabIndex = 0, this._originalPopper.focus());
  }
  /** 聚焦元素，如果是自定义元素则聚焦其 Shadow DOM 内第一个可聚焦元素 */
  _focusElement(t) {
    if (t.shadowRoot) {
      const e = t.shadowRoot.querySelector(
        o.FOCUSABLE_SELECTOR
      );
      if (e) {
        e.focus();
        return;
      }
    }
    t.focus();
  }
  _handleFocusout() {
    this.visible && (this.trigger === "focus" || this.trigger === "customized" || requestAnimationFrame(() => {
      if (!this.visible) return;
      const t = document.activeElement;
      t && this.contains(t) || this.hide();
    }));
  }
  html() {
    return `
      <div class="${this.updateContainerClasslist()}" part="container" tabindex="-1">
        <div class="ea-popper__reference" part="reference" tabindex="-1">
          <slot name="reference"></slot>
          <div class="ea-popper__original" part="original" tabindex="-1" inert>
            <div class="${h.e("title")}" part="title"></div>
            <slot></slot>
            <div class="${h.e("content")}" part="content"></div>
          </div>
        </div>
      </div>
    `;
  }
  $mount() {
    var t;
    super.$mount(), this._initTriggerEvent(), this.heading && this._titleElement && (this._titleElement.textContent = this.heading), this.content && this._contentElement && (this._contentElement.textContent = this.content), this._originalPopper && (this._originalPopper.inert = !0), (t = this._popoverAbortController) == null || t.abort(), this._popoverAbortController = new AbortController(), this.addEventListener(
      "ea-show",
      () => {
        this._originalPopper && (this._originalPopper.inert = !1), this._keyboardActivated && (this._keyboardActivated = !1, requestAnimationFrame(() => this._focusContent()));
      },
      { signal: this._popoverAbortController.signal }
    ), this.addEventListener(
      "ea-hide",
      () => {
        this._originalPopper && (this._originalPopper.inert = !0);
        const e = this._getReferenceTrigger();
        e && e.setAttribute("aria-expanded", "false"), this._keyboardActivated = !1;
      },
      { signal: this._popoverAbortController.signal }
    );
  }
  $beforeUnmount() {
    var t, e, i;
    super.$beforeUnmount(), (t = this._triggerAbortController) == null || t.abort(), (e = this._contextmenuAbortController) == null || e.abort(), (i = this._popoverAbortController) == null || i.abort();
  }
};
o.FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
a([
  p(h.ce("title"))
], o.prototype, "_titleElement", 2);
a([
  p(h.ce("content"))
], o.prototype, "_contentElement", 2);
a([
  u({
    type: E(x),
    default: "hover",
    observer() {
      this._initTriggerEvent();
    }
  })
], o.prototype, "trigger", 2);
a([
  u({
    type: String,
    default: "",
    observer(t) {
      this._titleElement && (this._titleElement.textContent = t), this.updateContainerClasslist();
    }
  })
], o.prototype, "heading", 2);
a([
  u({
    type: String,
    default: "",
    observer(t) {
      this._contentElement && (this._contentElement.textContent = t), this.updateContainerClasslist();
    }
  })
], o.prototype, "content", 2);
a([
  f("keydown")
], o.prototype, "_handleKeydown", 1);
a([
  f("focusout")
], o.prototype, "_handleFocusout", 1);
o = a([
  v(_, { styles: [C] })
], o);
export {
  o as EaPopover
};
