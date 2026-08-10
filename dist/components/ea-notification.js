import { E as y } from "../core/EaBase.ts.js";
import { q as d, a as h, l as _, C, p as g } from "../core/decorator.js";
import { h as b } from "../utils/html.ts.js";
import { E as f } from "../utils/Enum.ts.js";
import { b as m } from "../core/constants.js";
import { s as v } from "../css/ea-notification.style.js";
import "./ea-icon.js";
import { c as E } from "../utils/bem.ts.js";
import { t as I } from "../utils/timeout.ts.js";
var w = Object.defineProperty, A = Object.getOwnPropertyDescriptor, a = (t, i, e, s) => {
  for (var o = s > 1 ? void 0 : s ? A(i, e) : i, l = t.length - 1, p; l >= 0; l--)
    (p = t[l]) && (o = (s ? p(i, e, o) : p(o)) || o);
  return s && o && w(i, e, o), o;
};
const u = "ea-notification", r = E(u), x = [
  "primary",
  "success",
  "warning",
  "info",
  "error"
], N = [
  "top-right",
  "top-left",
  "bottom-right",
  "bottom-left"
];
let n = class extends y {
  constructor() {
    super(...arguments), this.variant = "info", this.heading = "", this.visible = !1, this.message = "", this.showClose = !1, this.closeIcon = "xmark", this.placement = "top-right", this.zIndex = 0, this.icon = "", this.dangerouslyUseHTMLString = !1;
  }
  updateContainerClasslist() {
    const t = r(
      {
        [this.variant]: !0,
        [this.placement]: !0
      },
      {
        visible: this.visible,
        "show-close": this.showClose
      }
    );
    return this._container && (this._container.className = t), t;
  }
  html() {
    return `
      <div class="${this.updateContainerClasslist()}" part="container" role="alert" aria-live="polite">
        <ea-icon class="${r.e("icon")}" name="${m[this.variant]}" part="icon"></ea-icon>
        <div class="${r.e("content")}" part="content">
          <header class="${r.e("header")}" part="header">
            <h2 class="${r.e("title")}" part="title"> </h2>
            <ea-icon class="${r.e("close-icon")}" name="xmark" part="close-icon" aria-label="close"></ea-icon>
          </header>
          <main class="${r.e("main")}" part="main"><slot></slot> </main>
        </div>
      </div>
    `;
  }
  close() {
    this.visible = !1, this.emit("ea-close");
  }
  /** 初始化通知位置，计算堆叠偏移 */
  _initPosition() {
    var l;
    const t = document.querySelectorAll(
      `ea-notification[placement="${this.placement}"]`
    );
    if (t.length <= 1) return;
    const i = t[t.length - 2], e = i.style.getPropertyValue("--ea-notification-y"), s = (l = i.shadowRoot) == null ? void 0 : l.querySelector(
      `.${r.b()}`
    );
    if (!s) return;
    const o = s.getBoundingClientRect();
    this.style.setProperty(
      "--ea-notification-y",
      `${Number(e.replace("px", "")) + o.height + 8}px`
    );
  }
  /** 隐藏时调整后续通知位置 */
  _handleHide() {
    const t = [
      ...document.querySelectorAll(
        `ea-notification[placement="${this.placement}"]`
      )
    ], i = t.findIndex((o) => o === this), e = t.slice(i + 1), s = this._container.getBoundingClientRect().height;
    e.forEach((o) => {
      const l = Number(
        o.style.getPropertyValue("--ea-notification-y").replace("px", "")
      );
      o.style.setProperty(
        "--ea-notification-y",
        `${l - s - 8}px`
      );
    });
  }
  _handleCloseIconClick() {
    this.showClose && this.close();
  }
  $mount() {
    this.updateContainerClasslist();
  }
  $beforeUnmount() {
    var t;
    (t = this._transitionAbortController) == null || t.abort();
  }
};
a([
  d(r.cb())
], n.prototype, "_container", 2);
a([
  d(r.ce("icon"))
], n.prototype, "_notificationIcon", 2);
a([
  d(r.ce("title"))
], n.prototype, "_title", 2);
a([
  d(r.ce("close-icon"))
], n.prototype, "_closeIcon", 2);
a([
  d(r.ce("main"))
], n.prototype, "_main", 2);
a([
  h({
    type: f(x),
    default: "info",
    observer(t) {
      this._notificationIcon.setAttribute(
        "name",
        this.icon || m[t]
      ), this.updateContainerClasslist();
    }
  })
], n.prototype, "variant", 2);
a([
  h({
    type: String,
    default: "",
    observer(t) {
      this._title.textContent = t;
    }
  })
], n.prototype, "heading", 2);
a([
  h({
    type: Boolean,
    default: !1,
    observer(t) {
      var i;
      (i = this._transitionAbortController) == null || i.abort(), this._transitionAbortController = new AbortController(), t ? (this._initPosition(), this.updateContainerClasslist(), this.emit("ea-show"), this._container.offsetWidth, this._container.classList.add(r.s("is-show")), this._container.addEventListener(
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
], n.prototype, "visible", 2);
a([
  h({
    type: String,
    default: "",
    observer(t) {
      this.dangerouslyUseHTMLString ? this._main.innerHTML = b(t) : this._main.textContent = t;
    }
  })
], n.prototype, "message", 2);
a([
  h({
    type: Boolean,
    default: !1,
    observer(t) {
      this.updateContainerClasslist(), t && this._closeIcon.setAttribute("name", this.closeIcon || "xmark");
    }
  })
], n.prototype, "showClose", 2);
a([
  h({
    type: String,
    default: "xmark",
    observer(t) {
      this.showClose && this._closeIcon.setAttribute("name", t);
    }
  })
], n.prototype, "closeIcon", 2);
a([
  h({
    type: f(N),
    default: "top-right",
    observer() {
      this.updateContainerClasslist();
    }
  })
], n.prototype, "placement", 2);
a([
  h({
    type: Number,
    default: 0,
    observer(t) {
      this._container.style.setProperty("--z-index", String(t));
    }
  })
], n.prototype, "zIndex", 2);
a([
  h({
    type: String,
    default: "",
    observer(t) {
      this._notificationIcon.setAttribute(
        "name",
        t || m[this.variant]
      ), this.updateContainerClasslist();
    }
  })
], n.prototype, "icon", 2);
a([
  g({
    type: Boolean,
    default: !1
  })
], n.prototype, "dangerouslyUseHTMLString", 2);
a([
  _("click", r.ce("close-icon"))
], n.prototype, "_handleCloseIconClick", 1);
n = a([
  C(u, { styles: [v] })
], n);
class T {
  constructor(i) {
    this._includeTypes = [
      "heading",
      "message",
      "placement",
      "variant",
      "showClose",
      "duration",
      "closeIcon",
      "zIndex",
      "icon",
      "dangerouslyUseHTMLString"
    ], this._defaultOptions = {
      heading: "",
      dangerouslyUseHTMLString: !1,
      message: "",
      icon: "",
      variant: "info",
      duration: 3e3,
      placement: "top-right",
      zIndex: 0,
      showClose: !0,
      closeIcon: "xmark",
      appendTo: "body"
    };
    const e = Object.assign({}, this._defaultOptions, i), s = this._includeTypes.reduce(
      (l, p) => (e[p] !== void 0 && (l[p] = e[p]), l),
      {}
    ), o = this._renderer(s);
    this.instance = o, this._appendToHandler(o, e.appendTo), this._durationHandler(o, e.duration), this._hideHandler(o, e.onClose), o.visible = !0;
  }
  _renderer(i) {
    const e = document.createElement(
      "ea-notification"
    );
    for (const s in i)
      e[s] = i[s];
    return e;
  }
  _appendToHandler(i, e) {
    if (!e) {
      document.body.appendChild(i);
      return;
    }
    if (e instanceof HTMLElement)
      e.appendChild(i);
    else if (typeof e == "string") {
      const s = document.querySelector(e);
      s ? s.appendChild(i) : document.body.appendChild(i);
    } else
      console.warn(
        `[EaNotification] TypeError: ${e} is not a valid element or selector.`
      );
  }
  _durationHandler(i, e = 3e3) {
    e <= 0 || I(() => {
      i.visible = !1;
    }, e);
  }
  _hideHandler(i, e) {
    i.addEventListener(
      "ea-hidden",
      (s) => {
        e == null || e(s), i.remove();
      },
      { once: !0 }
    );
  }
  close() {
    this.instance.close();
  }
}
const c = (t) => new T(t);
c.primary = (t) => c({
  ...t,
  variant: "primary"
});
c.success = (t) => c({
  ...t,
  variant: "success"
});
c.warning = (t) => c({
  ...t,
  variant: "warning"
});
c.info = (t) => c({
  ...t,
  variant: "info"
});
c.error = (t) => c({
  ...t,
  variant: "error"
});
window.$notify = c;
export {
  c as EaNotification,
  n as EaNotificationElement
};
