import { EaOverlay as z } from "./ea-overlay.js";
import "./ea-input.js";
import { q as h, a, p as b, l as y, C as K } from "../core/decorator.js";
import { c as H } from "../utils/bem.ts.js";
import { h as R } from "../utils/html.ts.js";
import { E as _ } from "../utils/Enum.ts.js";
import { b as V } from "../core/constants.js";
import { s as Y } from "../css/ea-message-box.style.js";
import "./ea-icon.js";
import { c as X } from "../utils/case-convert.ts.js";
class q extends Event {
  constructor(i) {
    super("ea-confirm", { bubbles: !0, composed: !0 }), this.detail = i ?? {};
  }
}
class k extends Event {
  constructor(i) {
    super("ea-cancel", { bubbles: !0, composed: !0 }), this.detail = i ?? {};
  }
}
class F extends Event {
  constructor(i) {
    super("ea-message-close", { bubbles: !0, composed: !0 }), this.detail = i ?? {};
  }
}
var j = Object.defineProperty, G = Object.getOwnPropertyDescriptor, n = (t, i, e, o) => {
  for (var l = o > 1 ? void 0 : o ? G(i, e) : i, p = t.length - 1, u; p >= 0; p--)
    (u = t[p]) && (l = (o ? u(i, e, l) : u(l)) || l);
  return o && l && j(i, e, l), l;
};
const U = "ea-message-box", Z = H(U), r = H("ea-message-box-main"), J = _(["alert", "confirm", "prompt", "personalized"]), Q = _([
  "primary",
  "success",
  "info",
  "warning",
  "error"
]), W = _(["small", "medium", "large"]);
let s = class extends z {
  constructor() {
    super(...arguments), this.boxType = "personalized", this.heading = "", this.message = "", this.variant = "", this.icon = "", this.closeIcon = "xmark", this.showClose = !0, this.showCancelButton = !1, this.showConfirmButton = !0, this.confirmButtonText = "OK", this.cancelButtonText = "Cancel", this.center = !1, this.roundButton = !1, this.buttonSize = "medium", this.showInput = !1, this.inputPlaceholder = "", this.inputType = "text", this.inputValue = "", this.inputPattern = "", this.inputErrorMessage = "", this.movable = !1, this.inputValidator = null, this.dangerouslyUseHTMLString = !1, this.confirmButtonLoading = !1, this.distinguishCancelAndClose = !1;
  }
  /** 同步输入框属性 */
  _syncInputProps() {
    this._input && (this.inputPlaceholder && this._input.setAttribute("placeholder", this.inputPlaceholder), this.inputType && this._input.setAttribute("type", this.inputType), this.inputValue && this._input.setAttribute("value", this.inputValue));
  }
  /** 执行输入验证 */
  async _validateInput() {
    var e, o, l, p, u, d, f, C, g, v, B, E, A, x, w, T, P, S, M, I, L, O;
    if (!this.showInput || !this._input) return !0;
    (o = (e = this._input).setCustomValidity) == null || o.call(e, "");
    const t = this._input.value || this._input.getAttribute("value") || "";
    if (this.inputValidator)
      try {
        const m = await this.inputValidator(t);
        if (m === !0) {
          const $ = ((p = (l = this._input).checkValidity) == null ? void 0 : p.call(l)) ?? !0;
          return $ || (d = (u = this._input).reportValidity) == null || d.call(u), $;
        }
        const N = typeof m == "string" ? m : this.inputErrorMessage || "Validation failed";
        return (C = (f = this._input).setCustomValidity) == null || C.call(f, N), (v = (g = this._input).reportValidity) == null || v.call(g), !1;
      } catch {
        return !1;
      }
    if (this.inputPattern)
      try {
        if (!new RegExp(this.inputPattern).test(t))
          return (E = (B = this._input).setCustomValidity) == null || E.call(
            B,
            this.inputErrorMessage || "Invalid input"
          ), (x = (A = this._input).reportValidity) == null || x.call(A), !1;
      } catch {
        return (T = (w = this._input).setCustomValidity) == null || T.call(
          w,
          this.inputErrorMessage || "Invalid pattern"
        ), (S = (P = this._input).reportValidity) == null || S.call(P), !1;
      }
    const i = ((I = (M = this._input).checkValidity) == null ? void 0 : I.call(M)) ?? !0;
    return i || (O = (L = this._input).reportValidity) == null || O.call(L), i;
  }
  updateContainerClasslist() {
    const t = super.updateContainerClasslist(), i = Z(
      {
        [this.variant]: !!this.variant,
        center: this.center,
        draggable: this.movable
      },
      {
        "close-hidden": !this.showClose,
        "cancel-hidden": !this.showCancelButton,
        "confirm-hidden": !this.showConfirmButton,
        "input-visible": this.showInput,
        [`${this.boxType}-box`]: !!this.boxType
      }
    ), e = `${t} ${i}`.trim();
    return this._container && (this._container.className = e), e;
  }
  html() {
    const t = document.createElement("template");
    t.innerHTML = super.html();
    const i = t.content.querySelector(".ea-overlay__content");
    return i.innerHTML = `
      <div class='${r()}' part='container'>
        <header class='${r.e("header")}' part='header'>
          <div class='${r.e("title-container")}' part='title-wrap'>
            <ea-icon class='${r.e("type-icon")}' part='type-icon'></ea-icon>
            <span class='${r.e("title")}' part='title'></span>
          </div>
          <ea-icon class='${r.e("icon-close")}' name='xmark' part='close-icon'></ea-icon>
        </header>
        <form class='${r.e("form")}' part='content'>
          <div class='${r.e("description")}' part='description'></div>
          <ea-input class='${r.e("input")}' part='input'></ea-input>
          <footer class='${r.e("footer")}' part='footer'>
            <ea-button class='${r.e("cancel-button")}' part='cancel-button'>Cancel</ea-button>
            <ea-button class='${r.e("confirm-button")}' variant='primary' type='submit' part='confirm-button'>OK</ea-button>
          </footer>
        </form>
      </div>
    `, t.innerHTML;
  }
  /** 根据 distinguishCancelAndClose 设置派发关闭类事件 */
  _dispatchCloseEvent() {
    this.distinguishCancelAndClose ? this.dispatchEvent(new F()) : this.dispatchEvent(new k());
  }
  _handleFormSubmit(t) {
    t.preventDefault(), this._validateInput().then((i) => {
      if (i) {
        const e = this.showInput && this._input ? this._input.value || this._input.getAttribute("value") || "" : void 0;
        this.dispatchEvent(new q({ value: e }));
      }
    });
  }
  _handleCancelClick() {
    this.dispatchEvent(new k());
  }
  _handleCloseIconClick() {
    this.showClose && this._dispatchCloseEvent();
  }
  _handleDragStart(t) {
    if (!this.movable || !this._header.contains(t.target) || this._closeIcon.contains(t.target)) return;
    const i = new AbortController(), e = this._overlayContent.getBoundingClientRect(), o = t.clientX - e.left, l = t.clientY - e.top, p = (d) => {
      this._overlayContent.style.left = d.clientX - o + "px", this._overlayContent.style.top = d.clientY - l + "px";
    }, u = () => {
      i.abort();
    };
    window.addEventListener("mousemove", p, {
      signal: i.signal
    }), window.addEventListener("mouseup", u, {
      signal: i.signal
    });
  }
  _handleKeyDown(t) {
    !this.visible || !this.closeOnPressEscape || t.key !== "Escape" || (t.stopImmediatePropagation(), t.preventDefault(), this._dispatchCloseEvent());
  }
  _handleMaskClick(t) {
    !this.closeOnClickModal && t.target !== this._overlayContent || [...this.children].find(
      (e) => e === t.target || e.contains(t.target)
    ) || this._overlayContent === t.target || this._overlayContent.contains(t.target) || this._dispatchCloseEvent();
  }
  $mount() {
    var t;
    (t = super.$mount) == null || t.call(this);
    try {
      this.setAttribute("role", "alertdialog");
    } catch {
      this.role = "alertdialog";
    }
    this.setAttribute("aria-modal", "true"), this.style.setProperty("--ea-overlay-content-width", "100%"), this.style.setProperty("--ea-overlay-content-max-width", "420px"), this.style.setProperty("--ea-overlay-content-height", "auto"), this._syncInputProps(), this.updateContainerClasslist();
  }
  $mounted() {
    this._updateAriaLabelledBy(), this._updateAriaDescribedBy();
  }
  /** 更新 aria-labelledby 指向标题元素 */
  _updateAriaLabelledBy() {
    this._title && this.heading ? (this._title.id || (this._title.id = `ea-message-box-title-${s._idCounter++}`), this.setAttribute("aria-labelledby", this._title.id)) : this.heading ? (this.setAttribute("aria-label", this.heading), this.removeAttribute("aria-labelledby")) : (this.removeAttribute("aria-label"), this.removeAttribute("aria-labelledby"));
  }
  /** 更新 aria-describedby 指向描述内容 */
  _updateAriaDescribedBy() {
    this.message && this._description ? (this._description.id || (this._description.id = `ea-message-box-desc-${s._idCounter++}`), this.setAttribute("aria-describedby", this._description.id)) : this.removeAttribute("aria-describedby");
  }
  $beforeUnmount() {
    var t;
    (t = super.$beforeUnmount) == null || t.call(this);
  }
};
s._idCounter = 0;
n([
  h(r.ce("header"))
], s.prototype, "_header", 2);
n([
  h(r.ce("title"))
], s.prototype, "_title", 2);
n([
  h(r.ce("type-icon"))
], s.prototype, "_typeIcon", 2);
n([
  h(r.ce("icon-close"))
], s.prototype, "_closeIcon", 2);
n([
  h(r.ce("content"))
], s.prototype, "_content", 2);
n([
  h(r.ce("description"))
], s.prototype, "_description", 2);
n([
  h(r.ce("input"))
], s.prototype, "_input", 2);
n([
  h(r.ce("form"))
], s.prototype, "_form", 2);
n([
  h(r.ce("cancel-button"))
], s.prototype, "_cancelButton", 2);
n([
  h(r.ce("confirm-button"))
], s.prototype, "_confirmButton", 2);
n([
  a({
    type: J,
    default: "personalized",
    observer() {
      this.updateContainerClasslist();
    }
  })
], s.prototype, "boxType", 2);
n([
  a({
    type: String,
    default: "",
    observer(t) {
      this._title && (this._title.textContent = t), this._updateAriaLabelledBy();
    }
  })
], s.prototype, "heading", 2);
n([
  a({
    type: String,
    default: "",
    observer(t) {
      this._description && (this.dangerouslyUseHTMLString ? this._description.innerHTML = R(t) : this._description.textContent = t, this._updateAriaDescribedBy());
    }
  })
], s.prototype, "message", 2);
n([
  a({
    type: Q,
    default: "",
    observer(t) {
      t && V[t] && (this.icon = V[t]), this.updateContainerClasslist();
    }
  })
], s.prototype, "variant", 2);
n([
  a({
    type: String,
    default: "",
    observer(t) {
      this._typeIcon && this._typeIcon.setAttribute("name", t);
    }
  })
], s.prototype, "icon", 2);
n([
  a({
    type: String,
    default: "xmark",
    observer(t) {
      this._closeIcon && this._closeIcon.setAttribute("name", t);
    }
  })
], s.prototype, "closeIcon", 2);
n([
  a({
    type: Boolean,
    default: !0,
    observer() {
      this.updateContainerClasslist();
    }
  })
], s.prototype, "showClose", 2);
n([
  a({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], s.prototype, "showCancelButton", 2);
n([
  a({
    type: Boolean,
    default: !0,
    observer() {
      this.updateContainerClasslist();
    }
  })
], s.prototype, "showConfirmButton", 2);
n([
  a({
    type: String,
    default: "OK",
    observer(t) {
      this._confirmButton && (this._confirmButton.textContent = t);
    }
  })
], s.prototype, "confirmButtonText", 2);
n([
  a({
    type: String,
    default: "Cancel",
    observer(t) {
      this._cancelButton && (this._cancelButton.textContent = t);
    }
  })
], s.prototype, "cancelButtonText", 2);
n([
  a({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], s.prototype, "center", 2);
n([
  a({
    type: Boolean,
    default: !1,
    observer(t) {
      this._confirmButton && this._confirmButton.setAttribute("round", String(t)), this._cancelButton && this._cancelButton.setAttribute("round", String(t));
    }
  })
], s.prototype, "roundButton", 2);
n([
  a({
    type: W,
    default: "medium",
    observer(t) {
      this._confirmButton && this._confirmButton.setAttribute("size", t), this._cancelButton && this._cancelButton.setAttribute("size", t);
    }
  })
], s.prototype, "buttonSize", 2);
n([
  a({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist(), this._syncInputProps();
    }
  })
], s.prototype, "showInput", 2);
n([
  a({
    type: String,
    default: "",
    observer(t) {
      this._input && this._input.setAttribute("placeholder", t);
    }
  })
], s.prototype, "inputPlaceholder", 2);
n([
  a({
    type: String,
    default: "text",
    observer(t) {
      this._input && this._input.setAttribute("type", t);
    }
  })
], s.prototype, "inputType", 2);
n([
  a({
    type: String,
    default: "",
    observer(t) {
      this._input && this._input.setAttribute("value", t);
    }
  })
], s.prototype, "inputValue", 2);
n([
  a({
    type: String,
    default: ""
  })
], s.prototype, "inputPattern", 2);
n([
  a({
    type: String,
    default: ""
  })
], s.prototype, "inputErrorMessage", 2);
n([
  a({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], s.prototype, "movable", 2);
n([
  b({
    type: Function,
    default: null
  })
], s.prototype, "inputValidator", 2);
n([
  b({
    type: Boolean,
    default: !1
  })
], s.prototype, "dangerouslyUseHTMLString", 2);
n([
  b({
    type: Boolean,
    default: !1,
    observer(t) {
      this._confirmButton && (this._input && (this._input.disabled = t), this._confirmButton.setAttribute("loading", String(t)));
    }
  })
], s.prototype, "confirmButtonLoading", 2);
n([
  b({
    type: Boolean,
    default: !1
  })
], s.prototype, "distinguishCancelAndClose", 2);
n([
  y("submit", r.ce("form"))
], s.prototype, "_handleFormSubmit", 1);
n([
  y("click", r.ce("cancel-button"))
], s.prototype, "_handleCancelClick", 1);
n([
  y("click", r.ce("icon-close"))
], s.prototype, "_handleCloseIconClick", 1);
n([
  y("mousedown", r.ce("header"))
], s.prototype, "_handleDragStart", 1);
n([
  y("keydown", "document")
], s.prototype, "_handleKeyDown", 1);
n([
  y("click", ".ea-overlay__mask")
], s.prototype, "_handleMaskClick", 1);
s = n([
  K(U, { styles: [Y] })
], s);
const tt = [
  "appendTo",
  "inputPattern",
  "inputValidator",
  "beforeClose",
  "confirmButtonLoading",
  "dangerouslyUseHTMLString",
  "distinguishCancelAndClose"
], D = [
  "closeOnClickModal",
  "closeOnPressEscape",
  "showCancelButton",
  "showClose",
  "showConfirmButton"
];
class et {
  constructor(i) {
    this._defaultOptions = {
      boxType: "personalized",
      distinguishCancelAndClose: !1,
      heading: "",
      dangerouslyUseHTMLString: !1,
      message: "",
      icon: "",
      variant: "primary",
      closeIcon: "xmark",
      showClose: !0,
      showCancelButton: !1,
      showConfirmButton: !0,
      confirmButtonLoading: !1,
      cancelButtonText: "Cancel",
      confirmButtonText: "OK",
      closeOnClickModal: !0,
      closeOnPressEscape: !0,
      showInput: !1,
      inputPlaceholder: "",
      inputType: "text",
      inputValue: "",
      inputPattern: null,
      inputErrorMessage: "",
      inputValidator: null,
      center: !1,
      movable: !1,
      roundButton: !1,
      buttonSize: "medium",
      appendTo: "body",
      beforeClose: null
    };
    const e = Object.assign(
      { boxType: i.boxType },
      this._defaultOptions,
      i
    ), o = this._renderer(e);
    this.instance = o, this._appendToHandler(o, e.appendTo), this._applyDeferredBooleanProps(o, e), this._applyExcludedProps(o, e);
  }
  _appendToHandler(i, e) {
    if (e instanceof HTMLElement)
      e.appendChild(i);
    else {
      const o = document.querySelector(e || "body");
      o ? o.appendChild(i) : document.body.appendChild(i);
    }
  }
  _renderer(i) {
    const e = document.createElement("ea-message-box");
    for (const o in i) {
      if (o === "appendTo" || D.includes(o) || tt.includes(o))
        continue;
      const l = X(o);
      e.setAttribute(l, String(i[o]));
    }
    return e;
  }
  _applyDeferredBooleanProps(i, e) {
    for (const o of D)
      o in e && (i[o] = e[o]);
  }
  _applyExcludedProps(i, e) {
    e.inputPattern instanceof RegExp ? i.inputPattern = e.inputPattern.source : typeof e.inputPattern == "string" && (i.inputPattern = e.inputPattern), e.inputValidator && (i.inputValidator = e.inputValidator), e.beforeClose && (i.beforeClose = e.beforeClose), e.dangerouslyUseHTMLString && (i.dangerouslyUseHTMLString = !0), e.distinguishCancelAndClose && (i.distinguishCancelAndClose = !0), e.confirmButtonLoading && (i.confirmButtonLoading = !0);
  }
}
const c = (t) => {
  const i = new AbortController(), e = new et(t).instance;
  let o = "confirm", l;
  if (t.beforeClose) {
    const p = t.beforeClose;
    e.beforeClose = (u) => {
      p(o, e, u);
    };
  }
  return e.setAttribute("visible", "true"), new Promise((p, u) => {
    e.addEventListener(
      "ea-closed",
      () => {
        e.remove(), i.abort(), o === "confirm" ? p(l ?? "confirm") : u(o === "cancel" ? "cancel" : "close");
      },
      { signal: i.signal }
    ), e.addEventListener(
      "ea-confirm",
      (d) => {
        o = "confirm";
        const f = d.detail;
        f && "value" in f && (l = f.value), e.removeAttribute("visible");
      },
      { signal: i.signal }
    ), e.addEventListener(
      "ea-cancel",
      () => {
        o = "cancel", e.removeAttribute("visible");
      },
      { signal: i.signal }
    ), e.addEventListener(
      "ea-message-close",
      () => {
        o = "close", e.removeAttribute("visible");
      },
      { signal: i.signal }
    );
  });
};
c.alert = (t = "", i = "", e = {}) => c({
  message: t,
  heading: i,
  closeOnClickModal: !1,
  closeOnPressEscape: !1,
  showConfirmButton: !0,
  boxType: "alert",
  ...e
});
c.confirm = (t = "", i = "", e = {}) => c({
  message: t,
  heading: i,
  showConfirmButton: !0,
  showCancelButton: !0,
  closeOnPressEscape: !0,
  boxType: "confirm",
  ...e
});
c.prompt = (t = "", i = "", e = {}) => c({
  message: t,
  heading: i,
  showConfirmButton: !0,
  showCancelButton: !0,
  showInput: !0,
  closeOnPressEscape: !0,
  boxType: "prompt",
  ...e
});
window.$alert = c.alert;
window.$confirm = c.confirm;
window.$prompt = c.prompt;
window.$msgbox = c;
export {
  c as EaMessageBox,
  s as EaMessageBoxElement
};
