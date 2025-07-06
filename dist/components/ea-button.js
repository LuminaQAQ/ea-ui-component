var v = Object.defineProperty;
var p = (e, a, t) => a in e ? v(e, a, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[a] = t;
var s = (e, a, t) => (p(e, typeof a != "symbol" ? a + "" : a, t), t), d = (e, a, t) => {
  if (!a.has(e))
    throw TypeError("Cannot " + t);
};
var u = (e, a, t) => (d(e, a, "read from private field"), t ? t.call(e) : a.get(e)), c = (e, a, t) => {
  if (a.has(e))
    throw TypeError("Cannot add the same private member more than once");
  a instanceof WeakSet ? a.add(e) : a.set(e, t);
}, b = (e, a, t, n) => (d(e, a, "write to private field"), n ? n.call(e, t) : a.set(e, t), t);
import { B as f } from "./Base.js";
const h = `
<button class="ea-button" part="container">
    <slot></slot>
</button>
`, m = `
<a class="ea-button" part="container">
    <slot></slot>
</a>
`, y = '@charset "UTF-8";:host{--cursor-type: pointer;--ea-button-normal-text: var(--grey-900);--ea-button-normal-background: var(--color-white);--ea-button-normal-border: var(--grey-300);--ea-button-normal-text-disabled: var(--grey-400);--ea-button-normal-background-disabled: var(--grey-100);--ea-button-primary-100: #d9ecff;--ea-button-primary-300: #a0cfff;--ea-button-primary-500: var(--color-blue);--ea-button-primary-600: #66b1ff;--ea-button-primary-700: #3a8ee6;--ea-button-primary-text: #ffffff;--ea-button-primary-disabled: var(--ea-button-primary-300);--ea-button-primary-text-disabled: #ffffff;--ea-button-success-100: #e1f3d8;--ea-button-success-300: #b3e19d;--ea-button-success-500: var(--color-green);--ea-button-success-600: #85ce61;--ea-button-success-700: #5daf34;--ea-button-success-text: #ffffff;--ea-button-success-disabled: var(--ea-button-success-300);--ea-button-success-text-disabled: #ffffff;--ea-button-info-100: #e9e9eb;--ea-button-info-300: #d3d4d6;--ea-button-info-500: var(--color-info);--ea-button-info-600: #a6a9b3;--ea-button-info-700: #82848a;--ea-button-info-text: #ffffff;--ea-button-warning-100: #fdf6ec;--ea-button-warning-300: #f3d19e;--ea-button-warning-500: var(--color-yellow);--ea-button-warning-600: #ebb563;--ea-button-warning-700: #cf9236;--ea-button-warning-text: #ffffff;--ea-button-warning-disabled: var(--ea-button-warning-300);--ea-button-warning-text-disabled: #ffffff;--ea-button-danger-100: #fef0f0;--ea-button-danger-300: #fab6b6;--ea-button-danger-500: var(--color-red);--ea-button-danger-600: #f78989;--ea-button-danger-700: #dd6161;--ea-button-danger-text: #ffffff;--ea-button-danger-disabled: var(--ea-button-danger-300);--ea-button-danger-text-disabled: #ffffff}:host([disabled]),:host([loading=true]){--cursor-type: not-allowed}:host{cursor:var(--cursor-type)}.ea-button{box-sizing:border-box;padding:var(--spacing-md);border:1px solid;background-color:var(--ea-button-normal-background);border-radius:var(--border-radius);cursor:var(--cursor-type);font-size:var(--font-size-md);text-decoration:none;transition:background-color var(--transition-fast),color var(--transition-fast);will-change:width;color:var(--ea-button-normal-text);background-color:var(--ea-button-normal-500);border-color:var(--ea-button-normal-border)}.ea-button.ea-button--text{color:var(--ea-button-normal-text);border:none;background-color:unset}.ea-button.ea-button--text:hover{background-color:unset;color:var(--ea-button-primary-600)}.ea-button.ea-button--text:active{border-color:var(--ea-button-primary-700);color:var(--ea-button-primary-700)}.ea-button.ea-button--text.ea-button--disabled{background-color:unset;color:var(--ea-button-info-300)}.ea-button.ea-button--disabled{--cursor-type: not-allowed;color:var(--ea-button-normal-text-disabled);border-color:var(--ea-button-normal-border);background-color:var(--ea-button-normal-background-disabled);pointer-events:none}.ea-button.ea-button--plain{background-color:var(--ea-button-normal-100);color:var(--ea-button-normal-text)}.ea-button.ea-button--plain:hover{color:var(--ea-button-primary-500);background-color:var(--ea-button-normal-600)}.ea-button.ea-button--plain:active{color:var(--ea-button-primary-700)}.ea-button.ea-button--plain.ea-button--disabled{color:var(--ea-button-info-300)}.ea-button.ea-button--round{border-radius:var(--border-radius-round);padding:var(--spacing-md) var(--spacing-lg)}.ea-button.ea-button--circle{border-radius:var(--border-radius-circle);padding:var(--spacing-md)}.ea-button.ea-button--link{background:none;border:none;padding:0}.ea-button.ea-button--small{font-size:var(--font-size-sm);padding:var(--spacing-sm)}.ea-button.ea-button--large{font-size:var(--font-size-lg);padding:var(--spacing-lg)}.ea-button:hover{color:var(--ea-button-primary-600);border-color:var(--ea-button-primary-100);background-color:var(--ea-button-primary-100)}.ea-button:active{color:var(--ea-button-primary-700);border-color:var(--ea-button-primary-700)}.ea-button--primary{color:var(--ea-button-primary-text);background-color:var(--ea-button-primary-500);border-color:var(--ea-button-primary-500)}.ea-button--primary.ea-button--text{color:var(--ea-button-primary-500);border:none;background-color:unset}.ea-button--primary.ea-button--text:hover{background-color:unset;color:var(--ea-button-primary-600)}.ea-button--primary.ea-button--text:active{color:var(--ea-button-primary-700)}.ea-button--primary.ea-button--text.ea-button--disabled{background-color:unset;color:var(--ea-button-primary-300)}.ea-button--primary.ea-button--disabled{--cursor-type: not-allowed;color:var(--ea-button-primary-text-disabled);border-color:var(--ea-button-primary-disabled);background-color:var(--ea-button-primary-disabled);pointer-events:none}.ea-button--primary.ea-button--plain{background-color:var(--ea-button-primary-100);color:var(--ea-button-primary-500);border-color:var(--ea-button-primary-300)}.ea-button--primary.ea-button--plain:hover{color:var(--color-white);background-color:var(--ea-button-primary-600)}.ea-button--primary.ea-button--plain:active{background-color:var(--ea-button-primary-700)}.ea-button--primary.ea-button--plain.ea-button--disabled{color:var(--ea-button-primary-300)}.ea-button--primary.ea-button--round{border-radius:var(--border-radius-round);padding:var(--spacing-md) var(--spacing-lg)}.ea-button--primary.ea-button--circle{border-radius:var(--border-radius-circle);padding:var(--spacing-md)}.ea-button--primary.ea-button--link{background:none;border:none;padding:0}.ea-button--primary.ea-button--small{font-size:var(--font-size-sm);padding:var(--spacing-sm)}.ea-button--primary.ea-button--large{font-size:var(--font-size-lg);padding:var(--spacing-lg)}.ea-button--primary:hover{color:var(--color-white);border-color:var(--ea-button-primary-600);background-color:var(--ea-button-primary-600)}.ea-button--primary:active{background-color:var(--ea-button-primary-700)}.ea-button--success{color:var(--ea-button-success-text);background-color:var(--ea-button-success-500);border-color:var(--ea-button-success-500)}.ea-button--success.ea-button--text{color:var(--ea-button-success-500);border:none;background-color:unset}.ea-button--success.ea-button--text:hover{background-color:unset;color:var(--ea-button-success-600)}.ea-button--success.ea-button--text:active{color:var(--ea-button-success-700)}.ea-button--success.ea-button--text.ea-button--disabled{background-color:unset;color:var(--ea-button-success-300)}.ea-button--success.ea-button--disabled{--cursor-type: not-allowed;color:var(--ea-button-success-text-disabled);border-color:var(--ea-button-success-disabled);background-color:var(--ea-button-success-disabled);pointer-events:none}.ea-button--success.ea-button--plain{background-color:var(--ea-button-success-100);color:var(--ea-button-success-500);border-color:var(--ea-button-success-300)}.ea-button--success.ea-button--plain:hover{color:var(--color-white);background-color:var(--ea-button-success-600)}.ea-button--success.ea-button--plain:active{background-color:var(--ea-button-success-700)}.ea-button--success.ea-button--plain.ea-button--disabled{color:var(--ea-button-success-300)}.ea-button--success.ea-button--round{border-radius:var(--border-radius-round);padding:var(--spacing-md) var(--spacing-lg)}.ea-button--success.ea-button--circle{border-radius:var(--border-radius-circle);padding:var(--spacing-md)}.ea-button--success.ea-button--link{background:none;border:none;padding:0}.ea-button--success.ea-button--small{font-size:var(--font-size-sm);padding:var(--spacing-sm)}.ea-button--success.ea-button--large{font-size:var(--font-size-lg);padding:var(--spacing-lg)}.ea-button--success:hover{color:var(--color-white);border-color:var(--ea-button-success-600);background-color:var(--ea-button-success-600)}.ea-button--success:active{background-color:var(--ea-button-success-700)}.ea-button--danger{color:var(--ea-button-danger-text);background-color:var(--ea-button-danger-500);border-color:var(--ea-button-danger-500)}.ea-button--danger.ea-button--text{color:var(--ea-button-danger-500);border:none;background-color:unset}.ea-button--danger.ea-button--text:hover{background-color:unset;color:var(--ea-button-danger-600)}.ea-button--danger.ea-button--text:active{color:var(--ea-button-danger-700)}.ea-button--danger.ea-button--text.ea-button--disabled{background-color:unset;color:var(--ea-button-danger-300)}.ea-button--danger.ea-button--disabled{--cursor-type: not-allowed;color:var(--ea-button-danger-text-disabled);border-color:var(--ea-button-danger-disabled);background-color:var(--ea-button-danger-disabled);pointer-events:none}.ea-button--danger.ea-button--plain{background-color:var(--ea-button-danger-100);color:var(--ea-button-danger-500);border-color:var(--ea-button-danger-300)}.ea-button--danger.ea-button--plain:hover{color:var(--color-white);background-color:var(--ea-button-danger-600)}.ea-button--danger.ea-button--plain:active{background-color:var(--ea-button-danger-700)}.ea-button--danger.ea-button--plain.ea-button--disabled{color:var(--ea-button-danger-300)}.ea-button--danger.ea-button--round{border-radius:var(--border-radius-round);padding:var(--spacing-md) var(--spacing-lg)}.ea-button--danger.ea-button--circle{border-radius:var(--border-radius-circle);padding:var(--spacing-md)}.ea-button--danger.ea-button--link{background:none;border:none;padding:0}.ea-button--danger.ea-button--small{font-size:var(--font-size-sm);padding:var(--spacing-sm)}.ea-button--danger.ea-button--large{font-size:var(--font-size-lg);padding:var(--spacing-lg)}.ea-button--danger:hover{color:var(--color-white);border-color:var(--ea-button-danger-600);background-color:var(--ea-button-danger-600)}.ea-button--danger:active{background-color:var(--ea-button-danger-700)}.ea-button--warning{color:var(--ea-button-warning-text);background-color:var(--ea-button-warning-500);border-color:var(--ea-button-warning-500)}.ea-button--warning.ea-button--text{color:var(--ea-button-warning-500);border:none;background-color:unset}.ea-button--warning.ea-button--text:hover{background-color:unset;color:var(--ea-button-warning-600)}.ea-button--warning.ea-button--text:active{color:var(--ea-button-warning-700)}.ea-button--warning.ea-button--text.ea-button--disabled{background-color:unset;color:var(--ea-button-warning-300)}.ea-button--warning.ea-button--disabled{--cursor-type: not-allowed;color:var(--ea-button-warning-text-disabled);border-color:var(--ea-button-warning-disabled);background-color:var(--ea-button-warning-disabled);pointer-events:none}.ea-button--warning.ea-button--plain{background-color:var(--ea-button-warning-100);color:var(--ea-button-warning-500);border-color:var(--ea-button-warning-300)}.ea-button--warning.ea-button--plain:hover{color:var(--color-white);background-color:var(--ea-button-warning-600)}.ea-button--warning.ea-button--plain:active{background-color:var(--ea-button-warning-700)}.ea-button--warning.ea-button--plain.ea-button--disabled{color:var(--ea-button-warning-300)}.ea-button--warning.ea-button--round{border-radius:var(--border-radius-round);padding:var(--spacing-md) var(--spacing-lg)}.ea-button--warning.ea-button--circle{border-radius:var(--border-radius-circle);padding:var(--spacing-md)}.ea-button--warning.ea-button--link{background:none;border:none;padding:0}.ea-button--warning.ea-button--small{font-size:var(--font-size-sm);padding:var(--spacing-sm)}.ea-button--warning.ea-button--large{font-size:var(--font-size-lg);padding:var(--spacing-lg)}.ea-button--warning:hover{color:var(--color-white);border-color:var(--ea-button-warning-600);background-color:var(--ea-button-warning-600)}.ea-button--warning:active{background-color:var(--ea-button-warning-700)}';
var i, o;
class l extends f {
  constructor() {
    super();
    c(this, i, "button");
    /** @type {HTMLButtonElement | HTMLLinkElement} */
    c(this, o, void 0);
    s(this, "computedClasslist", () => u(this, o).className = [
      "ea-button",
      this.type && `ea-button--${this.type}` || "",
      (this.disabled || this.loading) && "ea-button--disabled" || "",
      (this.text || this.link) && "ea-button--text" || "",
      this.plain && "ea-button--plain" || "",
      this.round && "ea-button--round" || "",
      this.circle && "ea-button--circle" || "",
      this.size && `ea-button--${this.size}` || ""
    ].join(" "));
    /**
     * @typedef {Object} state
     * @property {boolean} disabled
     * @property {string} type
     * @property {string} text
     * @property {boolean} plain
     * @property {boolean} round
     * @property {boolean} circle
     * @property {boolean} link
     * @property {string} href
     * @property {string} size
     * @property {boolean} loading
     */
    /** @type {state} */
    s(this, "state", this.properties({
      disabled: {
        type: Boolean,
        default: !1,
        observer: (t) => {
          this.computedClasslist();
        }
      },
      type: {
        type: ["normal", "primary", "success", "warning", "danger"],
        default: "normal",
        observer: (t) => {
          this.computedClasslist();
        }
      },
      text: {
        type: Boolean,
        default: !1,
        observer: (t) => {
          this.computedClasslist();
        }
      },
      plain: {
        type: Boolean,
        default: !1,
        observer: (t) => {
          this.computedClasslist();
        }
      },
      round: {
        type: Boolean,
        default: !1,
        observer: (t) => {
          this.computedClasslist();
        }
      },
      circle: {
        type: Boolean,
        default: !1,
        observer: (t) => {
          this.computedClasslist();
        }
      },
      link: {
        type: Boolean,
        default: !1,
        observer: (t) => {
          this.computedClasslist();
        }
      },
      href: {
        type: String,
        default: "",
        observer: (t) => {
          this.computedClasslist(), u(this, o).setAttribute("href", t);
        }
      },
      size: {
        type: ["small", "medium", "large"],
        default: "medium",
        observer: (t) => {
          this.computedClasslist();
        }
      },
      loading: {
        type: Boolean,
        default: !1,
        observer: (t) => {
          var n;
          if (t) {
            const r = document.createElement("ea-icon");
            r.id = "ea-loading-icon", r.icon = "icon-spin6 animate-spin", r.size = this.state.size, u(this, o).insertBefore(r, u(this, o).firstChild);
          } else {
            const r = (n = u(this, o)) == null ? void 0 : n.querySelectorAll("#ea-loading-icon");
            (r == null ? void 0 : r.length) > 0 && (r == null || r.forEach((g) => g.remove()));
          }
          this.computedClasslist();
        }
      }
    }));
    this.stylesheet = y, this.getAttribute("href") ? (this.shadowRoot.innerHTML = m, b(this, i, "a")) : (this.shadowRoot.innerHTML = h, b(this, i, "button")), b(this, o, this.shadowRoot.querySelector(".ea-button"));
  }
  // ------- 禁用 -------
  // #region
  get disabled() {
    return this.state.disabled;
  }
  set disabled(t) {
    this.state.disabled = t;
  }
  // #endregion
  // ------- end -------
  // ------- type属性 -------
  // #region
  get type() {
    return this.state.type;
  }
  set type(t) {
    this.state.type = t;
  }
  // #endregion
  // ------- end -------
  // ------- text 属性 -------
  // #region
  get text() {
    return this.state.text;
  }
  set text(t) {
    this.state.text = t;
  }
  // #endregion
  // ------- end -------
  // ------- plain 属性 -------
  // #region
  get plain() {
    return this.state.plain;
  }
  set plain(t) {
    this.state.plain = t;
  }
  // #endregion
  // ------- end -------
  // ------- round 属性 -------
  // #region
  get round() {
    return this.state.round;
  }
  set round(t) {
    this.state.round = t;
  }
  // #endregion
  // ------- end -------
  // ------- circle 属性 -------
  // #region
  get circle() {
    return this.state.circle;
  }
  set circle(t) {
    this.state.circle = t;
  }
  // #endregion
  // ------- end -------
  // ------- 图标按钮 -------
  // #region
  get icon() {
    return this.getAttribute("icon") || "";
  }
  set icon(t) {
    if (this.setAttribute("icon", t), t && !u(this, o).querySelector("ea-icon")) {
      const n = document.createElement("ea-icon");
      n.size = this.size, n.icon = t, n.part = "icon", u(this, o).insertBefore(n, u(this, o).firstChild);
    }
  }
  // #endregion
  // ------- end -------
  // ------- 链接按钮 -------
  // #region
  get link() {
    return this.state.link;
  }
  set link(t) {
    this.state.link = t;
  }
  get href() {
    return this.state.href;
  }
  set href(t) {
    u(this, i) !== "button" && (this.state.href = t);
  }
  // #endregion
  // ------- end -------
  // ------- 按钮大小 -------
  // #region
  get size() {
    return this.state.size;
  }
  set size(t) {
    this.state.size = t;
  }
  // #endregion
  // ------- end -------
  // ------- 按钮加载 -------
  // #region
  get loading() {
    return this.state.loading;
  }
  set loading(t) {
    this.state.loading = t;
  }
  // #endregion
  // ------- end -------
  $mounted() {
    this.plain = this.getAttribute("plain"), this.round = this.getAttribute("round"), this.text = this.getAttribute("text"), this.circle = this.getAttribute("circle"), this.type = this.getAttribute("type"), this.size = this.getAttribute("size"), this.icon && (this.icon = this.icon), this.link = this.getAttribute("link"), this.link && (this.href = this.getAttribute("href")), this.disabled = this.getAttrBoolean("disabled"), this.getAttrBoolean("loading") && (this.loading = this.getAttribute("loading"));
  }
}
i = new WeakMap(), o = new WeakMap(), s(l, "observedProps", ["disabled", "type", "text", "plain", "round", "cicle", "link", "icon", "loading"]);
window.customElements.get("ea-button") || window.customElements.define("ea-button", l);
export {
  l as EaButton
};
