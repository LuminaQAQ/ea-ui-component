import { E as h } from "../core/EaBase.ts.js";
import { a as o, C as f } from "../core/decorator.js";
import { E as c } from "../utils/Enum.ts.js";
import { s as P } from "../css/ea-row.style.js";
import { c as g } from "../utils/bem.ts.js";
import { s as b } from "../css/ea-col.style.js";
var _ = Object.defineProperty, d = Object.getOwnPropertyDescriptor, n = (t, s, p, r) => {
  for (var e = r > 1 ? void 0 : r ? d(s, p) : s, a = t.length - 1, l; a >= 0; a--)
    (l = t[a]) && (e = (r ? l(s, p, e) : l(e)) || e);
  return r && e && _(s, p, e), e;
};
const m = "ea-row", $ = g(m), w = [
  "start",
  "end",
  "center",
  "space-around",
  "space-between",
  "space-evenly"
], S = ["top", "middle", "bottom"];
let y = class extends h {
  constructor() {
    super(...arguments), this.gutter = 0, this.justify = "start", this.align = "top", this.tag = "div";
  }
  html() {
    return `
      <${this.tag} class="${$()}" part="container">
        <slot></slot>
      </${this.tag}>
    `;
  }
  $mount() {
    this.style.setProperty("--ea-row-gutter", this.gutter / 2 + "px"), this.style.setProperty("--ea-row-justify", this.justify), this.style.setProperty("--ea-row-align", this.align);
  }
};
n([
  o({
    type: Number,
    default: 0,
    observer(t) {
      this.style.setProperty("--ea-row-gutter", t / 2 + "px");
    }
  })
], y.prototype, "gutter", 2);
n([
  o({
    type: c(w),
    default: "start",
    observer(t) {
      this.style.setProperty("--ea-row-justify", t);
    }
  })
], y.prototype, "justify", 2);
n([
  o({
    type: c(S),
    default: "top",
    observer(t) {
      this.style.setProperty("--ea-row-align", t);
    }
  })
], y.prototype, "align", 2);
n([
  o({
    type: String,
    default: "div"
  })
], y.prototype, "tag", 2);
y = n([
  f(m, { styles: [P] })
], y);
var E = Object.defineProperty, j = Object.getOwnPropertyDescriptor, u = (t, s, p, r) => {
  for (var e = r > 1 ? void 0 : r ? j(s, p) : s, a = t.length - 1, l; a >= 0; a--)
    (l = t[a]) && (e = (r ? l(s, p, e) : l(e)) || e);
  return r && e && E(s, p, e), e;
};
const v = "ea-col", N = g(v);
let i = class extends h {
  constructor() {
    super(...arguments), this.span = 24, this.offset = 0, this.push = 0, this.pull = 0, this.tag = "div";
  }
  html() {
    return `
      <${this.tag} class="${N()}" part="container">
        <slot></slot>
      </${this.tag}>
    `;
  }
  $mount() {
    this.style.setProperty("--ea-col-span", String(this.span)), this.style.setProperty("--ea-col-offset", String(this.offset)), this.style.setProperty("--ea-col-push", String(this.push)), this.style.setProperty("--ea-col-pull", String(this.pull));
  }
};
u([
  o({
    type: Number,
    default: 24,
    observer(t) {
      this.style.setProperty("--ea-col-span", String(t));
    }
  })
], i.prototype, "span", 2);
u([
  o({
    type: Number,
    default: 0,
    observer(t) {
      this.style.setProperty("--ea-col-offset", String(t));
    }
  })
], i.prototype, "offset", 2);
u([
  o({
    type: Number,
    default: 0,
    observer(t) {
      this.style.setProperty("--ea-col-push", String(t));
    }
  })
], i.prototype, "push", 2);
u([
  o({
    type: Number,
    default: 0,
    observer(t) {
      this.style.setProperty("--ea-col-pull", String(t));
    }
  })
], i.prototype, "pull", 2);
u([
  o({
    type: String,
    default: "div"
  })
], i.prototype, "tag", 2);
i = u([
  f(v, { styles: [b] })
], i);
export {
  i as EaCol,
  y as EaRow
};
