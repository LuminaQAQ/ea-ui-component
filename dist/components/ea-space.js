import { E as m } from "../core/EaBase.ts.js";
import { q as d, a as l, C as y } from "../core/decorator.js";
import { E as c } from "../utils/Enum.ts.js";
import { s as v } from "../css/ea-space.style.js";
import { c as C } from "../utils/bem.ts.js";
var b = Object.defineProperty, E = Object.getOwnPropertyDescriptor, r = (e, i, n, a) => {
  for (var s = a > 1 ? void 0 : a ? E(i, n) : i, o = e.length - 1, p; o >= 0; o--)
    (p = e[o]) && (s = (a ? p(i, n, s) : p(s)) || s);
  return a && s && b(i, n, s), s;
};
const u = "ea-space", f = C(u), S = ["horizontal", "vertical"], h = ["small", "default", "large"], g = [
  "",
  "center",
  "flex-start",
  "flex-end",
  "baseline",
  "stretch"
];
let t = class extends m {
  constructor() {
    super(...arguments), this.wrap = !1, this.alignment = "", this.direction = "horizontal", this.size = "default", this.spacer = "", this.fill = !1, this.fillRatio = 100;
  }
  updateContainerClasslist() {
    const e = h.includes(this.size), i = f(
      {
        [this.size]: e,
        vertical: this.direction === "vertical",
        fill: this.fill
      },
      { wrap: this.wrap }
    );
    return this._container && (this._container.className = i), i;
  }
  html() {
    return `
      <div class="${this.updateContainerClasslist()}" part="container">
        <slot></slot>
      </div>
    `;
  }
  $mount() {
    this.updateContainerClasslist();
  }
};
r([
  d(f.cb())
], t.prototype, "_container", 2);
r([
  l({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], t.prototype, "wrap", 2);
r([
  l({
    type: c(g),
    default: "",
    observer(e) {
      if (e && !CSS.supports("align-items", e)) {
        console.warn(`[ea-space] Invalid alignment value: ${e}`);
        return;
      }
      this.style.setProperty("--ea-space-alignment", e || "center");
    }
  })
], t.prototype, "alignment", 2);
r([
  l({
    type: c(S),
    default: "horizontal",
    observer() {
      this.updateContainerClasslist();
    }
  })
], t.prototype, "direction", 2);
r([
  l({
    type: String,
    default: "default",
    observer(e) {
      if (h.includes(e))
        this.updateContainerClasslist();
      else {
        if (!CSS.supports("gap", e)) {
          console.warn("[ea-space] Invalid size value");
          return;
        }
        this.style.setProperty("--ea-space-gap", e);
      }
    }
  })
], t.prototype, "size", 2);
r([
  l({
    type: String,
    default: "",
    observer(e) {
      if (this.querySelectorAll('[part="spacer"]').forEach((a) => a.remove()), !e) return;
      const n = [...this.children];
      n.forEach((a, s) => {
        if (s < n.length - 1) {
          const o = document.createElement("span");
          o.innerText = e, o.setAttribute("part", "spacer"), this.insertBefore(o, a.nextSibling);
        }
      });
    }
  })
], t.prototype, "spacer", 2);
r([
  l({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], t.prototype, "fill", 2);
r([
  l({
    type: Number,
    default: 100,
    observer(e) {
      Number.isNaN(Number(e)) || (this.fill = !0), this.style.setProperty("--ea-space-fill-ratio", `${e}%`);
    }
  })
], t.prototype, "fillRatio", 2);
t = r([
  y(u, { styles: [v] })
], t);
export {
  g as ALIGNMENT_TYPES,
  S as DIRECTION_TYPES,
  t as EaSpace,
  h as SIZE_TYPES
};
