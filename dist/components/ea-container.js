import { E as p } from "../core/EaBase.ts.js";
import { q as S, a as i, C as h, l as x } from "../core/decorator.js";
import { E as D } from "../utils/Enum.ts.js";
import { s as j } from "../css/ea-container.style.js";
import { c } from "../utils/bem.ts.js";
import { s as N } from "../css/ea-header.style.js";
import { s as w } from "../css/ea-main.style.js";
import { s as M } from "../css/ea-footer.style.js";
import { s as T } from "../css/ea-aside.style.js";
var G = Object.defineProperty, z = Object.getOwnPropertyDescriptor, y = (e, r, a, s) => {
  for (var t = s > 1 ? void 0 : s ? z(r, a) : r, o = e.length - 1, l; o >= 0; o--)
    (l = e[o]) && (t = (s ? l(r, a, t) : l(t)) || t);
  return s && t && G(r, a, t), t;
};
const g = "ea-container", $ = c(g), q = ["horizontal", "vertical"];
let n = class extends p {
  constructor() {
    super(...arguments), this.direction = "horizontal";
  }
  updateContainerClasslist() {
    const e = $({ [this.direction]: !0 });
    return this._container && (this._container.className = e), e;
  }
  html() {
    return `
      <div class="${this.updateContainerClasslist()}" part="container">
        <slot></slot>
      </div>
    `;
  }
  _handleSlotChange() {
    if (this.hasAttribute("direction")) return;
    const e = [...this.querySelectorAll("& > *")].map(
      (r) => r.tagName.toLowerCase()
    );
    e.includes("ea-header") || e.includes("ea-footer") ? this.direction = "vertical" : this.direction = "horizontal";
  }
  $mount() {
    this.updateContainerClasslist();
  }
};
y([
  S($.cb())
], n.prototype, "_container", 2);
y([
  i({
    type: D(q),
    default: "horizontal",
    observer() {
      this.updateContainerClasslist();
    }
  })
], n.prototype, "direction", 2);
y([
  x("slotchange", "slot")
], n.prototype, "_handleSlotChange", 1);
n = y([
  h(g, { styles: [j] })
], n);
var B = Object.defineProperty, I = Object.getOwnPropertyDescriptor, d = (e, r, a, s) => {
  for (var t = s > 1 ? void 0 : s ? I(r, a) : r, o = e.length - 1, l; o >= 0; o--)
    (l = e[o]) && (t = (s ? l(r, a, t) : l(t)) || t);
  return s && t && B(r, a, t), t;
};
const P = "ea-header", F = c(P);
let u = class extends p {
  constructor() {
    super(...arguments), this.label = "", this.height = "60px";
  }
  html() {
    return `
      <header class="${F()}" part="container">
        <slot></slot>
      </header>
    `;
  }
};
d([
  i({
    type: String,
    default: "",
    a11y: {
      ariaAttr: "aria-label",
      target: ".ea-header",
      map: (e) => e || null
    }
  })
], u.prototype, "label", 2);
d([
  i({
    type: String,
    default: "60px",
    observer(e) {
      e && CSS.supports("height", e) ? this.style.setProperty("--ea-header-height", e) : e ? this.style.setProperty("--ea-header-height", "60px") : this.style.setProperty("--ea-header-height", "auto");
    }
  })
], u.prototype, "height", 2);
u = d([
  h(P, { styles: [N] })
], u);
var H = Object.defineProperty, L = Object.getOwnPropertyDescriptor, C = (e, r, a, s) => {
  for (var t = s > 1 ? void 0 : s ? L(r, a) : r, o = e.length - 1, l; o >= 0; o--)
    (l = e[o]) && (t = (s ? l(r, a, t) : l(t)) || t);
  return s && t && H(r, a, t), t;
};
const O = "ea-main", R = c(O);
let _ = class extends p {
  constructor() {
    super(...arguments), this.label = "";
  }
  html() {
    return `
      <main class="${R()}" part="container">
        <slot></slot>
      </main>
    `;
  }
};
C([
  i({
    type: String,
    default: "",
    a11y: {
      ariaAttr: "aria-label",
      target: ".ea-main",
      map: (e) => e || null
    }
  })
], _.prototype, "label", 2);
_ = C([
  h(O, { styles: [w] })
], _);
var Y = Object.defineProperty, J = Object.getOwnPropertyDescriptor, v = (e, r, a, s) => {
  for (var t = s > 1 ? void 0 : s ? J(r, a) : r, o = e.length - 1, l; o >= 0; o--)
    (l = e[o]) && (t = (s ? l(r, a, t) : l(t)) || t);
  return s && t && Y(r, a, t), t;
};
const E = "ea-footer", K = c(E);
let f = class extends p {
  constructor() {
    super(...arguments), this.label = "", this.height = "60px";
  }
  html() {
    return `
      <footer class="${K()}" part="container">
        <slot></slot>
      </footer>
    `;
  }
};
v([
  i({
    type: String,
    default: "",
    a11y: {
      ariaAttr: "aria-label",
      target: ".ea-footer",
      map: (e) => e || null
    }
  })
], f.prototype, "label", 2);
v([
  i({
    type: String,
    default: "60px",
    observer(e) {
      e && CSS.supports("height", e) ? this.style.setProperty("--ea-footer-height", e) : e ? this.style.setProperty("--ea-footer-height", "60px") : this.style.setProperty("--ea-footer-height", "auto");
    }
  })
], f.prototype, "height", 2);
f = v([
  h(E, { styles: [M] })
], f);
var Q = Object.defineProperty, U = Object.getOwnPropertyDescriptor, b = (e, r, a, s) => {
  for (var t = s > 1 ? void 0 : s ? U(r, a) : r, o = e.length - 1, l; o >= 0; o--)
    (l = e[o]) && (t = (s ? l(r, a, t) : l(t)) || t);
  return s && t && Q(r, a, t), t;
};
const A = "ea-aside", W = c(A);
let m = class extends p {
  constructor() {
    super(...arguments), this.label = "", this.width = "300px";
  }
  html() {
    return `
      <aside class="${W()}" part="container">
        <slot></slot>
      </aside>
    `;
  }
};
b([
  i({
    type: String,
    default: "",
    a11y: {
      ariaAttr: "aria-label",
      target: ".ea-aside",
      map: (e) => e || null
    }
  })
], m.prototype, "label", 2);
b([
  i({
    type: String,
    default: "300px",
    observer(e) {
      this.style.setProperty("--ea-aside-width", e);
    }
  })
], m.prototype, "width", 2);
m = b([
  h(A, { styles: [T] })
], m);
