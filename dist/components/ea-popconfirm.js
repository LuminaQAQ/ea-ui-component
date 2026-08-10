import { EaPopper as A } from "./ea-popper.js";
import "../core/EaBase.ts.js";
import { q as f, a as c, l as u, C as E } from "../core/decorator.js";
import { E as g } from "../utils/Enum.ts.js";
import "./ea-icon.js";
import "./ea-button.js";
import { s as T } from "../css/ea-popconfirm.style.js";
import { c as C } from "../utils/bem.ts.js";
class B extends Event {
  constructor(e) {
    super("ea-confirm", { bubbles: !0, composed: !0 }), this.detail = e ?? {};
  }
}
class P extends Event {
  constructor(e) {
    super("ea-cancel", { bubbles: !0, composed: !0 }), this.detail = e ?? {};
  }
}
var $ = Object.defineProperty, x = Object.getOwnPropertyDescriptor, n = (t, e, r, l) => {
  for (var s = l > 1 ? void 0 : l ? x(e, r) : e, o = t.length - 1, p; o >= 0; o--)
    (p = t[o]) && (s = (l ? p(e, r, s) : p(s)) || s);
  return l && s && $(e, r, s), s;
};
const y = "ea-popconfirm", a = C(y), m = C("ea-popper"), v = [
  "normal",
  "primary",
  "success",
  "warning",
  "danger"
], d = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
let i = class extends A {
  constructor() {
    super(...arguments), this._keyboardActivated = !1, this.heading = "", this.icon = "circle-question", this.iconColor = "rgb(255, 153, 0)", this.hideIcon = !1, this.confirmButtonText = "确定", this.cancelButtonText = "取消", this.confirmButtonType = "primary", this.cancelButtonType = "normal";
  }
  updateContainerClasslist() {
    var e;
    const t = super.updateContainerClasslist();
    return this._container && this._container.classList.toggle("is-icon-hidden", this.hideIcon), ((e = this._container) == null ? void 0 : e.className) || t;
  }
  /** 设置 ARIA 关联属性，使非交互式触发元素可聚焦 */
  _setupAria() {
    super._setupAria(), this._originalPopper.setAttribute("role", "alertdialog");
    const t = this._getReferenceTrigger();
    if (t && (t.setAttribute("aria-haspopup", "alertdialog"), this._isNativelyFocusable(t) || (t.setAttribute("tabindex", "0"), t.setAttribute("role", "button"))), this._titleContent) {
      const r = `${this._originalPopper.getAttribute("id") || ""}-title`;
      this._titleContent.setAttribute("id", r), this._originalPopper.setAttribute("aria-labelledby", r);
    }
  }
  /** 检查元素是否原生可聚焦 */
  _isNativelyFocusable(t) {
    return !!(["A", "BUTTON", "INPUT", "SELECT", "TEXTAREA"].includes(t.tagName) || t.tabIndex >= 0);
  }
  html() {
    return `
      <div class="${this.updateContainerClasslist()}" part="container" tabindex="-1">
        <div class="${m.e("reference")}" part="reference" tabindex="-1">
          <slot name="reference"></slot>
          <div class="${m.e("original")}" part="original" tabindex="-1" inert>
            <section class="${a.e("title")}" part="title">
              <ea-icon name="${this.icon}" part="icon"></ea-icon>
              <span class="${a.e("title-content")}" part="title-content">${this.heading}</span>
            </section>
            <footer class="${a.e("footer")}" part="footer">
              <slot name="actions">
                <ea-button variant="${this.cancelButtonType}" class="${a.e("cancel")}" size="small" part="cancel-button" text>${this.cancelButtonText}</ea-button>
                <ea-button variant="${this.confirmButtonType}" class="${a.e("confirm")}" part="confirm-button" size="small">${this.confirmButtonText}</ea-button>
              </slot>
            </footer>
          </div>
        </div>
      </div>
    `;
  }
  _handleKeydown(t) {
    const e = t.target, r = this._getReferenceTrigger(), l = !!(r && (e === r || r.contains(e))), s = this.contains(e) && !l;
    if (l) {
      if (t.key === "Enter" || t.key === " ") {
        t.preventDefault(), t.stopPropagation(), this._keyboardActivated = !0, this.visible ? this.close() : this.open();
        return;
      }
      return;
    }
    if (s && this.visible) {
      if (t.key === "Escape") {
        t.preventDefault(), t.stopPropagation(), this.close(), r == null || r.focus();
        return;
      }
      if (t.key === "Tab") {
        const o = this._getContentFocusableElements();
        if (o.length === 0) return;
        const p = o[0], b = o[o.length - 1], h = o.find(
          (_) => _ === e || _.contains(e)
        );
        t.shiftKey ? (!h || h === p) && (t.preventDefault(), this._focusElement(b)) : (!h || h === b) && (t.preventDefault(), this._focusElement(p));
        return;
      }
    }
  }
  /** 获取内容区内的可聚焦元素（排除触发元素），包括自定义元素内部的可聚焦元素 */
  _getContentFocusableElements() {
    const t = this._getReferenceTrigger(), e = [];
    return ((l) => {
      const s = l.querySelectorAll("*");
      for (const o of s)
        if (!(o === t || t != null && t.contains(o)) && !o.hasAttribute("disabled")) {
          if (o.tabIndex >= 0 || o.matches(d)) {
            e.push(o);
            continue;
          }
          o.shadowRoot && o.shadowRoot.querySelector(
            d
          ) && e.push(o);
        }
    })(this), e;
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
        d
      );
      if (e) {
        e.focus();
        return;
      }
    }
    t.focus();
  }
  _handleFocusout() {
    this.visible && requestAnimationFrame(() => {
      if (!this.visible) return;
      const t = document.activeElement;
      t && this.contains(t) || this.close();
    });
  }
  _handleCancelClick() {
    this.dispatchEvent(new P()), this.hide();
  }
  _handleConfirmClick() {
    this.dispatchEvent(new B()), this.hide();
  }
  _handleReferenceClick(t) {
    t.detail !== 0 && this.open();
  }
  /** 显示 Popconfirm 并注册全局关闭监听 */
  open() {
    var e;
    const t = (r) => {
      var s;
      this.contains(r.target) || ((s = this._globalCloseAbortController) == null || s.abort(), this.hide());
    };
    this.show(), (e = this._globalCloseAbortController) == null || e.abort(), this._globalCloseAbortController = new AbortController(), window.addEventListener("click", t, {
      signal: this._globalCloseAbortController.signal
    });
  }
  /** 隐藏 Popconfirm 并清理全局关闭监听 */
  close() {
    var t;
    this.hide(), (t = this._globalCloseAbortController) == null || t.abort();
  }
  $mount() {
    var t;
    super.$mount(), this._originalPopper && (this._originalPopper.inert = !0), (t = this._popoverAbortController) == null || t.abort(), this._popoverAbortController = new AbortController(), this.addEventListener(
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
    var t, e;
    super.$beforeUnmount(), (t = this._globalCloseAbortController) == null || t.abort(), (e = this._popoverAbortController) == null || e.abort();
  }
};
n([
  f(`.${a.e("title")} ea-icon`)
], i.prototype, "_titleIcon", 2);
n([
  f(`.${a.e("title-content")}`)
], i.prototype, "_titleContent", 2);
n([
  f(`.${a.e("cancel")}`)
], i.prototype, "_cancelButton", 2);
n([
  f(`.${a.e("confirm")}`)
], i.prototype, "_confirmButton", 2);
n([
  c({
    type: String,
    default: "",
    observer(t) {
      this._titleContent && (this._titleContent.innerText = t);
    }
  })
], i.prototype, "heading", 2);
n([
  c({
    type: String,
    default: "circle-question",
    observer(t) {
      this._titleIcon && this._titleIcon.setAttribute("name", t);
    }
  })
], i.prototype, "icon", 2);
n([
  c({
    type: String,
    default: "rgb(255, 153, 0)",
    observer(t) {
      if (!CSS.supports("color", t))
        return console.warn(
          `[EaPopconfirm] The color value ${t} is not supported.`
        );
      this.style.setProperty("--ea-popconfirm-title-icon-color", t);
    }
  })
], i.prototype, "iconColor", 2);
n([
  c({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], i.prototype, "hideIcon", 2);
n([
  c({
    type: String,
    default: "确定",
    observer(t) {
      this._confirmButton && (this._confirmButton.textContent = t);
    }
  })
], i.prototype, "confirmButtonText", 2);
n([
  c({
    type: String,
    default: "取消",
    observer(t) {
      this._cancelButton && (this._cancelButton.textContent = t);
    }
  })
], i.prototype, "cancelButtonText", 2);
n([
  c({
    type: g(v),
    default: "primary",
    observer(t) {
      this._confirmButton && this._confirmButton.setAttribute("variant", t);
    }
  })
], i.prototype, "confirmButtonType", 2);
n([
  c({
    type: g(v),
    default: "normal",
    observer(t) {
      this._cancelButton && this._cancelButton.setAttribute("variant", t);
    }
  })
], i.prototype, "cancelButtonType", 2);
n([
  u("keydown")
], i.prototype, "_handleKeydown", 1);
n([
  u("focusout")
], i.prototype, "_handleFocusout", 1);
n([
  u("click", `.${a.e("cancel")}`)
], i.prototype, "_handleCancelClick", 1);
n([
  u("click", `.${a.e("confirm")}`)
], i.prototype, "_handleConfirmClick", 1);
n([
  u("click", 'slot[name="reference"]')
], i.prototype, "_handleReferenceClick", 1);
i = n([
  E(y, { styles: [T] })
], i);
export {
  i as EaPopconfirm
};
