import { E as u } from "../core/EaBase.ts.js";
import { C as v, a as g, l as p } from "../core/decorator.js";
import { getCurrentTheme as n, setTheme as l } from "../themes/controller.js";
import "./ea-switch.js";
import "./ea-icon.js";
import { s as d } from "../css/ea-theme-toggle.style.js";
import { c as _ } from "../utils/bem.ts.js";
var f = Object.defineProperty, b = Object.getOwnPropertyDescriptor, h = (e, t, a, s) => {
  for (var o = s > 1 ? void 0 : s ? b(t, a) : t, i = e.length - 1, c; i >= 0; i--)
    (c = e[i]) && (o = (s ? c(t, a, o) : c(o)) || o);
  return s && o && f(t, a, o), o;
};
const m = "ea-theme-toggle", w = _(m);
let r = class extends u {
  constructor() {
    super(...arguments), this._observer = null, this.mode = "auto";
  }
  /**
   * 同步内部 ea-switch 的选中状态与当前主题一致
   */
  _syncSwitchState() {
    var t;
    const e = (t = this.shadowRoot) == null ? void 0 : t.querySelector("ea-switch");
    e && (e.value = String(n() === "dark"));
  }
  _handleSwitchChange(e) {
    e.stopPropagation();
    const t = n() !== "dark";
    l(t ? "dark" : "light"), this.mode = t ? "dark" : "light", this.emit("ea-theme-toggle-change", { detail: { mode: this.mode } });
  }
  html() {
    const e = n() === "dark";
    return `
      <ea-switch
        class="${w.e("switch")}"
        part="switch"
        value="${e}"
        active-color="var(--ea-theme-toggle-active-color, var(--blue-500))"
        inactive-color="var(--ea-theme-toggle-inactive-color, var(--grey-300))"
      >
        <ea-icon slot="active" name="fa-solid fa-moon"></ea-icon>
        <ea-icon slot="inactive" name="fa-solid fa-sun"></ea-icon>
      </ea-switch>
    `;
  }
  $mount() {
    this._syncSwitchState(), this._observer = new MutationObserver(() => {
      this._syncSwitchState();
    }), this._observer.observe(document.documentElement, {
      attributes: !0,
      attributeFilter: ["class"]
    });
  }
  $beforeUnmount() {
    this._observer && (this._observer.disconnect(), this._observer = null);
  }
};
h([
  g({
    type: String,
    default: "auto",
    observer(e) {
      l(e), this._syncSwitchState();
    }
  })
], r.prototype, "mode", 2);
h([
  p("change", "ea-switch")
], r.prototype, "_handleSwitchChange", 1);
r = h([
  v(m, { styles: [d] })
], r);
export {
  r as EaThemeToggle
};
