import { E as f } from "../core/EaBase.ts.js";
import { q as d, l as c, C as y, a as n, p as b } from "../core/decorator.js";
import { s as _ } from "../css/ea-overlay.style.js";
import { c as v } from "../utils/bem.ts.js";
class C extends Event {
  constructor() {
    super("ea-open", { bubbles: !0, composed: !0 });
  }
}
class m extends Event {
  constructor() {
    super("ea-opened", { bubbles: !0, composed: !0 });
  }
}
class E extends Event {
  constructor() {
    super("ea-close", { bubbles: !0, composed: !0 });
  }
}
class g extends Event {
  constructor() {
    super("ea-closed", { bubbles: !0, composed: !0 });
  }
}
var B = Object.defineProperty, w = Object.getOwnPropertyDescriptor, s = (e, o, r, i) => {
  for (var l = i > 1 ? void 0 : i ? w(o, r) : o, h = e.length - 1, p; h >= 0; h--)
    (p = e[h]) && (l = (i ? p(o, r, l) : p(l)) || l);
  return i && l && B(o, r, l), l;
};
const u = "ea-overlay", a = v(u);
let t = class extends f {
  constructor() {
    super(...arguments), this._closingByBeforeClose = !1, this._inBeforeClose = !1, this._waitingBeforeClose = !1, this._appendHandled = !1, this._previousFocusElement = null, this._isRedirectingFocus = !1, this.visible = !1, this.modal = !0, this.closeOnClickModal = !0, this.closeOnPressEscape = !0, this.appendToBody = !1, this.appendTo = "body", this.zIndex = "", this.backgroundColor = "", this.contentWidth = "", this.contentMaxWidth = "", this.contentHeight = "", this.beforeClose = null;
  }
  updateContainerClasslist() {
    const e = a({ open: this.visible }, { modal: this.modal });
    return this._container && (this._container.className = e), e;
  }
  /** 处理组件追加到指定容器 */
  _handleAppendTo() {
    if (!this._appendHandled)
      if (typeof this.appendTo == "string" && this.appendTo && this.appendTo !== "body")
        try {
          const e = document.querySelector(this.appendTo);
          e && this.parentElement !== e && (this._appendHandled = !0, e.appendChild(this));
        } catch {
          this.parentElement !== document.body && (this._appendHandled = !0, document.body.appendChild(this));
        }
      else this.appendToBody && this.parentElement !== document.body && (this._appendHandled = !0, document.body.appendChild(this));
  }
  /** 处理打开过渡动画 */
  _handleOpenTransition() {
    this.updateContainerClasslist(), this.dispatchEvent(new C()), this._previousFocusElement = document.activeElement, requestAnimationFrame(() => {
      this._container.classList.add(a.s("show")), requestAnimationFrame(() => {
        const e = this.$getFocusableElements("all")[0];
        e ? e.focus() : this.focus();
      }), this._container.addEventListener(
        "transitionend",
        () => {
          this.dispatchEvent(new m());
        },
        { signal: this._transitionAbortController.signal, once: !0 }
      );
    });
  }
  /** 处理关闭请求，支持 beforeClose 拦截 */
  _handleCloseRequest() {
    if (this.beforeClose && typeof this.beforeClose == "function") {
      this._inBeforeClose = !0, this._waitingBeforeClose = !0;
      let e = !1;
      this.beforeClose((o) => {
        var i;
        if (e) return;
        if (e = !0, this._waitingBeforeClose = !1, o) {
          this.visible || (this.visible = !0);
          return;
        }
        const r = this.visible;
        this.visible = !1, r ? this._closingByBeforeClose = !0 : ((i = this._transitionAbortController) == null || i.abort(), this._transitionAbortController = new AbortController(), this._handleCloseTransition());
      }), e || (this.visible = !0), this._inBeforeClose = !1;
    } else
      this._handleCloseTransition();
  }
  /** 处理关闭过渡动画 */
  _handleCloseTransition() {
    this._container.classList.remove(a.s("show")), this._container.classList.add(a.s("before-close")), this.dispatchEvent(new E()), this._previousFocusElement && (this._previousFocusElement.focus(), this._previousFocusElement = null), this._container.addEventListener(
      "transitionend",
      () => {
        this.updateContainerClasslist(), this.dispatchEvent(new g());
      },
      { signal: this._transitionAbortController.signal, once: !0 }
    );
  }
  _handleFocusin(e) {
    if (!this.visible || this._isRedirectingFocus || e.composedPath().includes(this)) return;
    this._isRedirectingFocus = !0;
    const o = this.$getFocusableElements("all");
    o.length > 0 ? o[0].focus() : this.focus(), this._isRedirectingFocus = !1;
  }
  /** Tab 键边界循环 */
  _trapFocus(e) {
    const o = this.$getFocusableElements("all");
    if (o.length === 0) return;
    const r = o[0], i = o[o.length - 1], l = document.activeElement;
    e.shiftKey && l === r ? (e.preventDefault(), i == null || i.focus()) : !e.shiftKey && l === i && (e.preventDefault(), r == null || r.focus());
  }
  /** 显示遮罩层 */
  show() {
    this.visible = !0;
  }
  /** 隐藏遮罩层 */
  hide() {
    this.visible = !1;
  }
  html() {
    return `
      <div class="${this.updateContainerClasslist()}" part="container">
        <div class="${a.e("mask")}" part="mask"></div>
        <div class="${a.e("content")}" part="content">
          <slot></slot>
        </div>
      </div>
    `;
  }
  _handleMaskClick(e) {
    this.closeOnClickModal && this.hide();
  }
  _handleKeyDown(e) {
    if (this.visible) {
      if (e.key === "Tab") {
        this._trapFocus(e);
        return;
      }
      !this.closeOnPressEscape || e.key !== "Escape" || (e.stopImmediatePropagation(), e.preventDefault(), this.hide());
    }
  }
  $mount() {
    this.tabIndex = -1, this._handleAppendTo(), this.updateContainerClasslist();
  }
  $beforeUnmount() {
    var e;
    (e = this._transitionAbortController) == null || e.abort();
  }
};
s([
  d(a.cb())
], t.prototype, "_container", 2);
s([
  d(a.ce("mask"))
], t.prototype, "_overlayMask", 2);
s([
  d(a.ce("content"))
], t.prototype, "_overlayContent", 2);
s([
  n({
    type: Boolean,
    default: !1,
    observer(e) {
      var o;
      if (!this._inBeforeClose && !this._waitingBeforeClose) {
        if ((o = this._transitionAbortController) == null || o.abort(), this._transitionAbortController = new AbortController(), this._closingByBeforeClose) {
          this._closingByBeforeClose = !1, this._handleCloseTransition();
          return;
        }
        e ? this._handleOpenTransition() : this._handleCloseRequest();
      }
    }
  })
], t.prototype, "visible", 2);
s([
  n({
    type: Boolean,
    default: !0,
    observer() {
      this.updateContainerClasslist();
    }
  })
], t.prototype, "modal", 2);
s([
  n({
    type: Boolean,
    default: !0
  })
], t.prototype, "closeOnClickModal", 2);
s([
  n({
    type: Boolean,
    default: !0
  })
], t.prototype, "closeOnPressEscape", 2);
s([
  n({
    type: Boolean,
    default: !1,
    observer() {
      this._appendHandled = !1, this._handleAppendTo();
    }
  })
], t.prototype, "appendToBody", 2);
s([
  n({
    type: String,
    default: "body",
    observer() {
      this._appendHandled = !1, this._handleAppendTo();
    }
  })
], t.prototype, "appendTo", 2);
s([
  n({
    type: String,
    default: "",
    observer(e) {
      this.style.setProperty("--ea-overlay-z-index", e);
    }
  })
], t.prototype, "zIndex", 2);
s([
  n({
    type: String,
    default: "",
    observer(e) {
      this.style.setProperty("--ea-overlay-background-color", e);
    }
  })
], t.prototype, "backgroundColor", 2);
s([
  n({
    type: String,
    default: "",
    observer(e) {
      this.style.setProperty("--ea-overlay-content-width", e);
    }
  })
], t.prototype, "contentWidth", 2);
s([
  n({
    type: String,
    default: "",
    observer(e) {
      this.style.setProperty("--ea-overlay-content-max-width", e);
    }
  })
], t.prototype, "contentMaxWidth", 2);
s([
  n({
    type: String,
    default: "",
    observer(e) {
      this.style.setProperty("--ea-overlay-content-height", e);
    }
  })
], t.prototype, "contentHeight", 2);
s([
  b({
    type: Function,
    default: null,
    observer(e) {
      e === null && (this._waitingBeforeClose = !1);
    }
  })
], t.prototype, "beforeClose", 2);
s([
  c("focusin", "document")
], t.prototype, "_handleFocusin", 1);
s([
  c("click", a.ce("mask"))
], t.prototype, "_handleMaskClick", 1);
s([
  c("keydown", "document")
], t.prototype, "_handleKeyDown", 1);
t = s([
  y(u, { styles: [_] })
], t);
export {
  t as EaOverlay
};
