var a = Object.defineProperty;
var l = (s, e, t) => e in s ? a(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var r = (s, e, t) => l(s, typeof e != "symbol" ? e + "" : e, t);
import { B as u } from "./Base.js";
const d = ".ea-button-group{display:flex;align-items:center}.ea-button-group ::slotted(ea-button){--border-radius: 0}.ea-button-group ::slotted(ea-button:not([type=normal])){border-right:1px solid rgba(255,255,255,.3)}.ea-button-group ::slotted(ea-button:first-of-type){--border-radius: 4px 0 0 4px}.ea-button-group ::slotted(ea-button:last-of-type){--border-radius: 0 4px 4px 0}";
class i extends u {
  constructor() {
    super();
    /**
     * @typedef {object} Properties
     * @property {boolean} disabled
     * @property {string} size
     * @property {string} type
     */
    /** @type {Properties}   */
    r(this, "state", this.properties({
      disabled: {
        type: Boolean,
        default: !1,
        observer: (t) => {
          this.querySelectorAll("ea-button").forEach((o) => {
            o.disabled = t;
          });
        }
      },
      size: {
        type: ["small", "normal", "large"],
        default: "normal",
        observer: (t) => {
          this.querySelectorAll("ea-button").forEach((o) => {
            o.size = t;
          });
        }
      },
      type: {
        type: ["primary", "success", "warning", "danger", "normal", ""],
        default: "",
        observer: (t) => {
          t && this.querySelectorAll("ea-button").forEach((o) => {
            o.type = t;
          });
        }
      }
    }));
    this.stylesheet = d, this.shadowRoot.innerHTML = `
      <div class="ea-button-group">
        <slot></slot>
      </div>
    `;
  }
  // ------- disabled 禁用子按钮 -------
  // #region
  get disabled() {
    return this.state.disabled;
  }
  set disabled(t) {
    this.state.disabled = t;
  }
  // #endregion
  // ------- end -------
  // ------- size 子按钮大小 -------
  // #region
  get size() {
    return this.state.size;
  }
  set size(t) {
    this.state.size = t;
  }
  // #endregion
  // ------- end -------
  // ------- size 子按钮大小 -------
  // #region
  get type() {
    return this.state.type;
  }
  set type(t) {
    this.state.type = t;
  }
  // #endregion
  // ------- end -------
  $mounted() {
    this.disabled = this.getAttribute("disabled"), this.size = this.getAttribute("size"), this.type = this.getAttribute("type");
  }
}
r(i, "observedProps", ["disabled", "size", "type"]);
window.customElements.get("ea-button-group") || window.customElements.define("ea-button-group", i);
export {
  i as EaButtonGroup
};
