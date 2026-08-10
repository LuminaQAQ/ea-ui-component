import { E as C } from "../core/EaBase.ts.js";
import { q as m, a as p, l as _, C as v, p as b } from "../core/decorator.js";
import { h as E } from "../utils/html.ts.js";
import { E as g } from "../utils/Enum.ts.js";
import { V as w, a as f, b as u } from "../core/constants.js";
import { s as A } from "../css/ea-message.style.js";
import "./ea-icon.js";
import { c as M } from "../utils/bem.ts.js";
import { t as P } from "../utils/timeout.ts.js";
class T extends Event {
  constructor(t) {
    super("ea-close", { bubbles: !0, composed: !0 }), this.detail = t;
  }
}
var L = Object.defineProperty, H = Object.getOwnPropertyDescriptor, o = (e, t, s, i) => {
  for (var n = i > 1 ? void 0 : i ? H(t, s) : t, l = e.length - 1, c; l >= 0; l--)
    (c = e[l]) && (n = (i ? c(t, s, n) : c(n)) || n);
  return i && n && L(t, s, n), n;
};
const y = "ea-message", r = M(y), I = [
  "top",
  "top-left",
  "top-right",
  "bottom",
  "bottom-left",
  "bottom-right",
  "middle"
];
let a = class extends C {
  constructor() {
    super(...arguments), this.variant = f, this.visible = !1, this.message = "", this.showClose = !1, this.placement = "top", this.icon = "", this.offset = 0, this.dangerouslyUseHTMLString = !1;
  }
  /** 更新容器类名 */
  updateContainerClasslist() {
    const e = r(
      {
        [this.variant]: !0,
        [this.placement]: !0
      },
      {
        visible: this.visible,
        "show-close": this.showClose
      }
    );
    return this._container && (this._container.className = e), e;
  }
  /** 渲染模板 */
  html() {
    return `
      <div class="${this.updateContainerClasslist()}" part="container">
        <ea-icon class="${r.e("icon")}" name="${u[this.variant]}" part="icon"></ea-icon>
        <div class="${r.e("content")}" part="content-wrap"></div>
        <ea-icon class="${r.e("close-icon")}" name="xmark" part="close-icon"></ea-icon>
      </div>
    `;
  }
  /** 关闭消息（公共方法） */
  close() {
    this.visible = !1, this.dispatchEvent(new T({ visible: !1 }));
  }
  /** 初始化消息位置 */
  _initPosition() {
    var l;
    const e = document.querySelectorAll(
      `ea-message[placement="${this.placement}"]`
    );
    if (e.length <= 1) return;
    const t = e[e.length - 2], s = t.style.getPropertyValue("--ea-message-y"), i = (l = t.shadowRoot) == null ? void 0 : l.querySelector(
      r.cb()
    );
    if (!i) return;
    const n = i.getBoundingClientRect();
    this.style.setProperty(
      "--ea-message-y",
      `${Number(s.replace("px", "")) + n.height + 8}px`
    );
  }
  /** 隐藏消息时调整后续消息位置 */
  _handleHide() {
    const e = [
      ...document.querySelectorAll(
        `ea-message[placement="${this.placement}"]`
      )
    ], t = e.findIndex((n) => n === this), s = e.slice(t + 1), i = this._container.getBoundingClientRect().height;
    s.forEach((n) => {
      const l = Number(
        n.style.getPropertyValue("--ea-message-y").replace("px", "")
      );
      n.style.setProperty("--ea-message-y", `${l - i - 8}px`);
    });
  }
  _handleCloseIconClick() {
    this.showClose && this.close();
  }
  $mount() {
    this.setAttribute("role", "alert"), this.setAttribute("aria-live", "assertive"), this.setAttribute("aria-atomic", "true"), this.updateContainerClasslist();
  }
  $beforeUnmount() {
    var e;
    (e = this._transitionAbortController) == null || e.abort();
  }
};
o([
  m(r.cb())
], a.prototype, "_container", 2);
o([
  m(r.ce("icon"))
], a.prototype, "_messageIcon", 2);
o([
  m(r.ce("content"))
], a.prototype, "_messageContent", 2);
o([
  m(r.ce("close-icon"))
], a.prototype, "_messageCloseIcon", 2);
o([
  p({
    type: g(w),
    default: f,
    observer(e) {
      this._messageIcon.setAttribute(
        "name",
        this.icon || u[e]
      ), this.updateContainerClasslist();
    }
  })
], a.prototype, "variant", 2);
o([
  p({
    type: Boolean,
    default: !1,
    observer(e) {
      var t;
      (t = this._transitionAbortController) == null || t.abort(), this._transitionAbortController = new AbortController(), e ? (this._initPosition(), this.updateContainerClasslist(), this.emit("ea-show"), this._container.offsetWidth, this._container.classList.add(r.s("show")), this._container.addEventListener(
        "transitionend",
        () => {
          this.emit("ea-shown");
        },
        { once: !0, signal: this._transitionAbortController.signal }
      )) : (this._handleHide(), this._container.classList.add(r.s("before-hide")), this.emit("ea-hide"), this._container.addEventListener(
        "transitionend",
        () => {
          this.updateContainerClasslist(), this.emit("ea-hidden");
        },
        { once: !0, signal: this._transitionAbortController.signal }
      ));
    }
  })
], a.prototype, "visible", 2);
o([
  p({
    type: String,
    default: "",
    observer(e) {
      this.dangerouslyUseHTMLString ? this._messageContent.innerHTML = E(e) : this._messageContent.textContent = e;
    }
  })
], a.prototype, "message", 2);
o([
  p({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], a.prototype, "showClose", 2);
o([
  p({
    type: g(I),
    default: "top",
    observer() {
      this.updateContainerClasslist();
    }
  })
], a.prototype, "placement", 2);
o([
  p({
    type: String,
    default: "",
    observer(e) {
      this._messageIcon.setAttribute(
        "name",
        e || u[this.variant]
      ), this.updateContainerClasslist();
    }
  })
], a.prototype, "icon", 2);
o([
  p({
    type: Number,
    default: 0,
    observer(e) {
      this.style.setProperty("--ea-message-y", `${e}px`);
    }
  })
], a.prototype, "offset", 2);
o([
  b({
    type: Boolean,
    default: !1
  })
], a.prototype, "dangerouslyUseHTMLString", 2);
o([
  _("click", r.ce("close-icon"))
], a.prototype, "_handleCloseIconClick", 1);
a = o([
  v(y, { styles: [A] })
], a);
class h {
  constructor(t) {
    this._includeTypes = [
      "dangerouslyUseHTMLString",
      "message",
      "placement",
      "variant",
      "showClose",
      "duration",
      "offset",
      "icon"
    ];
    const s = typeof t == "string" ? { message: t } : { ...t }, i = this._includeTypes.reduce(
      (l, c) => (s[c] !== void 0 && (l[c] = s[c]), l),
      {}
    );
    i.placement = i.placement || "top";
    const n = this._renderer(i);
    this._appendToHandler(n, s.appendTo), this._durationHandler(n, s.duration), this._hideHandler(n, s.onClose), n.visible = !0;
  }
  _renderer(t) {
    const s = document.createElement("ea-message");
    for (const i in t)
      s[i] = t[i];
    return s;
  }
  _durationHandler(t, s = 3e3) {
    s <= 0 || P(() => {
      t.visible = !1;
    }, s);
  }
  _appendToHandler(t, s) {
    if (s instanceof HTMLElement)
      s.appendChild(t);
    else {
      const i = s ? document.querySelector(s) : null;
      i ? i.appendChild(t) : document.body.appendChild(t);
    }
  }
  _hideHandler(t, s) {
    t.addEventListener(
      "ea-hidden",
      (i) => {
        s == null || s(i), t.remove();
      },
      { once: !0 }
    );
  }
}
const d = (e) => {
  new h(e);
};
d.primary = (e) => new h({
  message: e,
  variant: "primary"
});
d.success = (e) => new h({
  message: e,
  variant: "success"
});
d.warning = (e) => new h({
  message: e,
  variant: "warning"
});
d.info = (e) => new h({
  message: e,
  variant: "info"
});
d.danger = (e) => new h({
  message: e,
  variant: "danger"
});
d.error = (e) => new h({
  message: e,
  variant: "danger"
});
window.$message = d;
export {
  d as EaMessage,
  a as EaMessageElement
};
