import { E as C } from "../core/EaBase.ts.js";
import { q as p, a, l as y, C as T, p as v } from "../core/decorator.js";
import { h as n } from "../utils/html.ts.js";
import { t as h } from "../utils/timeout.ts.js";
import { E as _ } from "../utils/Enum.ts.js";
import { V as A, a as f, b as m } from "../core/constants.js";
import { s as g } from "../css/ea-alert.style.js";
import "./ea-icon.js";
import { c as E } from "../utils/bem.ts.js";
class $ extends Event {
  constructor(r) {
    super("ea-close", { bubbles: !0, composed: !0 }), this.detail = r;
  }
}
class w extends Event {
  constructor(r) {
    super("ea-open", { bubbles: !0, composed: !0 }), this.detail = r ?? {};
  }
}
var H = Object.defineProperty, I = Object.getOwnPropertyDescriptor, s = (t, r, c, l) => {
  for (var o = l > 1 ? void 0 : l ? I(r, c) : r, d = t.length - 1, u; d >= 0; d--)
    (u = t[d]) && (o = (l ? u(r, c, o) : u(o)) || o);
  return l && o && H(r, c, o), o;
};
const b = "ea-alert", i = E(b), x = ["light", "dark"];
let e = class extends C {
  constructor() {
    super(...arguments), this._hasDescription = !1, this._isHidden = !1, this.heading = "", this.description = "", this.variant = f, this.effect = "light", this.closeText = "", this.closable = !0, this.showIcon = !1, this.center = !1, this.showAfter = 0, this.autoClose = 0, this.hideAfter = 0;
  }
  /** 更新标题内容，为空时恢复 slot */
  _updateHeading() {
    this._alertHeading.innerHTML = n(this.heading) || '<slot name="heading"></slot>';
  }
  /** 更新描述内容，为空时恢复 slot */
  _updateDescription() {
    this._hasDescription = !!this.description, this._alertDescription.innerHTML = n(this.description) || "<slot></slot>", this.updateContainerClasslist();
  }
  /** 更新图标内容 */
  _updateIcon() {
    this._alertIcon.innerHTML = this.showIcon ? n(
      `<ea-icon class="${i.e("icon")}" name="${m[this.variant]}" part="icon"></ea-icon>`
    ) : "";
  }
  /** 更新关闭按钮内容，closable 为 false 时清空，closeText 为空时恢复图标 */
  _updateCloseBtn() {
    if (!this.closable) {
      this._alertCloseBtn.innerHTML = "";
      return;
    }
    this._alertCloseBtn.innerHTML = this.closeText ? n(this.closeText) : n(
      `<ea-icon class="${i.e("close-icon")}" name="xmark" part="close-icon"></ea-icon>`
    );
  }
  /** 更新容器类名 */
  updateContainerClasslist() {
    const t = i(
      { [this.variant]: !0, [this.effect]: !0 },
      {
        center: this.center,
        hide: this._isHidden,
        "has-description": this._hasDescription
      }
    );
    return this._container && (this._container.className = t), t;
  }
  /** 渲染模板 */
  html() {
    const t = this.showIcon ? `<ea-icon class="${i.e("icon")}" name="${m[this.variant]}" part="icon"></ea-icon>` : "", r = this.closable ? this.closeText ? n(this.closeText) : `<ea-icon class="${i.e("close-icon")}" name="xmark" part="close-icon"></ea-icon>` : "";
    return `
      <div class="${this.updateContainerClasslist()}" part='container'>
        <span class="${i.e("icon-wrap")}" part='icon-wrap'>
          <slot name='icon'>${t}</slot>
        </span>
        <div class="${i.e("content")}" part='content-wrap'>
          <span class="${i.e("heading")}" part='heading'>
            <slot name="heading">${n(this.heading)}</slot>
          </span>
          <p class="${i.e("description")}" part='description'>
            <slot>${n(this.description)}</slot>
          </p>
        </div>
        <button type="button" class="${i.e("close-btn")}" part="close-btn" aria-label="Close">${r}</button>
      </div>
    `;
  }
  _handleClose() {
    if (!this.closable && this.autoClose <= 0) return;
    const t = () => {
      var l;
      this._container.classList.add(i.s("before-close")), (l = this._transitionAbortController) == null || l.abort(), this._transitionAbortController = new AbortController();
      const r = parseFloat(getComputedStyle(this._container).transitionDuration) || 0.3, c = () => {
        var o;
        clearTimeout(this._closeFallbackTimer), (o = this._transitionAbortController) == null || o.abort(), this.dispatchEvent(new $({ visible: !1 })), this.remove();
      };
      this._container.addEventListener(
        "transitionend",
        (o) => {
          o.target !== this._container || o.propertyName !== "filter" || c();
        },
        { signal: this._transitionAbortController.signal }
      ), this._closeFallbackTimer = h(
        c,
        (r + 0.1) * 1e3
      );
    };
    clearTimeout(this._hideAfterTimer), this.hideAfter > 0 ? this._hideAfterTimer = h(t, this.hideAfter) : t();
  }
  $mount() {
    this.setAttribute("role", "alert"), this.updateContainerClasslist();
  }
  $beforeUnmount() {
    var t;
    (t = this._transitionAbortController) == null || t.abort(), clearTimeout(this._closeFallbackTimer), clearTimeout(this._showAfterTimer), clearTimeout(this._autoCloseTimer), clearTimeout(this._hideAfterTimer);
  }
};
s([
  p(i.cb())
], e.prototype, "_container", 2);
s([
  p(`${i.ce("icon-wrap")} slot[name="icon"]`)
], e.prototype, "_alertIcon", 2);
s([
  p(`${i.ce("heading")} slot[name="heading"]`)
], e.prototype, "_alertHeading", 2);
s([
  p(`${i.ce("description")} slot`)
], e.prototype, "_alertDescription", 2);
s([
  p(i.ce("close-btn"))
], e.prototype, "_alertCloseBtn", 2);
s([
  v({
    type: Boolean,
    default: !1,
    a11y: {
      ariaAttr: "inert",
      target: ".ea-alert",
      map: (t) => t ? "" : null
    }
  })
], e.prototype, "_isHidden", 2);
s([
  a({
    type: String,
    default: "",
    observer() {
      this._updateHeading();
    }
  })
], e.prototype, "heading", 2);
s([
  a({
    type: String,
    default: "",
    observer() {
      this._updateDescription();
    }
  })
], e.prototype, "description", 2);
s([
  a({
    type: _(A),
    default: f,
    observer() {
      this.updateContainerClasslist(), this._updateIcon();
    }
  })
], e.prototype, "variant", 2);
s([
  a({
    type: _(x),
    default: "light",
    observer() {
      this.updateContainerClasslist();
    }
  })
], e.prototype, "effect", 2);
s([
  a({
    type: String,
    default: "",
    observer() {
      this._updateCloseBtn();
    }
  })
], e.prototype, "closeText", 2);
s([
  a({
    type: Boolean,
    default: !0,
    a11y: {
      ariaAttr: "inert",
      target: ".ea-alert__close-btn",
      map: (t) => t ? null : ""
    },
    observer() {
      this._updateCloseBtn();
    }
  })
], e.prototype, "closable", 2);
s([
  a({
    type: Boolean,
    default: !1,
    observer() {
      this._updateIcon();
    }
  })
], e.prototype, "showIcon", 2);
s([
  a({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], e.prototype, "center", 2);
s([
  a({
    type: Number,
    default: 0,
    observer(t) {
      clearTimeout(this._showAfterTimer), t = Math.abs(t), this._isHidden = t > 0, this.updateContainerClasslist(), this._showAfterTimer = h(() => {
        this._isHidden = !1, this.dispatchEvent(new w()), this.updateContainerClasslist();
      }, t);
    }
  })
], e.prototype, "showAfter", 2);
s([
  a({
    type: Number,
    default: 0,
    observer(t) {
      clearTimeout(this._autoCloseTimer), t && (this._autoCloseTimer = h(() => this._handleClose(), t));
    }
  })
], e.prototype, "autoClose", 2);
s([
  a({
    type: Number,
    default: 0
  })
], e.prototype, "hideAfter", 2);
s([
  y("click", i.ce("close-btn"))
], e.prototype, "_handleClose", 1);
e = s([
  T(b, { styles: [g] })
], e);
export {
  e as EaAlert
};
