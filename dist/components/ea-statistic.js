import { E as m } from "../core/EaBase.ts.js";
import { q as o, C as h, a as u } from "../core/decorator.js";
import { s as _ } from "../css/ea-statistic.style.js";
import { c as d } from "../utils/bem.ts.js";
var x = Object.defineProperty, b = Object.getOwnPropertyDescriptor, a = (s, n, p, i) => {
  for (var r = i > 1 ? void 0 : i ? b(n, p) : n, l = s.length - 1, c; l >= 0; l--)
    (c = s[l]) && (r = (i ? c(n, p, r) : c(r)) || r);
  return i && r && x(n, p, r), r;
};
const f = "ea-statistic", t = d(f);
let e = class extends m {
  constructor() {
    super(...arguments), this.heading = "", this.value = 0;
  }
  updateContainerClasslist() {
    const s = t();
    return this._container.className = s, s;
  }
  html() {
    return `
      <div class='${t()}' part='container'>
        <header class='${t.e("header")}' part='title'>
          <slot name='title'></slot>
        </header>
        <main class='${t.e("content")}' part='content'>
          <span class='${t.e("prefix")}' part='prefix'>
            <slot name='prefix'></slot>
          </span>
          <span class='${t.e("number")}' part='number' aria-live="polite">
            <slot></slot>
          </span>
          <span class='${t.e("suffix")}' part='suffix'>
            <slot name='suffix'></slot>
          </span>
        </main>
      </div>
    `;
  }
  $mount() {
    this.updateContainerClasslist();
  }
};
a([
  o(t.cb())
], e.prototype, "_container", 2);
a([
  o(t.ce("header"))
], e.prototype, "_header", 2);
a([
  o(t.ce("number"))
], e.prototype, "_number", 2);
a([
  o(t.ce("prefix"))
], e.prototype, "_prefix", 2);
a([
  o(t.ce("suffix"))
], e.prototype, "_suffix", 2);
a([
  u({
    type: String,
    default: "",
    observer(s) {
      this._header.textContent = s;
    }
  })
], e.prototype, "heading", 2);
a([
  u({
    type: Number,
    default: 0,
    observer(s) {
      this._number.textContent = s.toLocaleString();
    }
  })
], e.prototype, "value", 2);
e = a([
  h(f, { styles: [_] })
], e);
const $ = e;
export {
  e as EaStatistic,
  $ as default
};
