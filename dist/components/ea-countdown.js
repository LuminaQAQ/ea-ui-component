import { E } from "../core/EaBase.ts.js";
import { q as y, C as M, a as c, p as D } from "../core/decorator.js";
import { d as g } from "./ea-calendar2.js";
import { t as x } from "../utils/timeout.ts.js";
import { p as w } from "../utils/parseTime.ts.js";
import { s as S } from "../css/ea-countdown.style.js";
import { c as H } from "../utils/bem.ts.js";
class $ extends Event {
  constructor(t) {
    super("ea-change", { bubbles: !0, composed: !0 }), this.detail = t;
  }
}
class O extends Event {
  constructor(t) {
    super("ea-finish", { bubbles: !0, composed: !0 }), this.detail = t;
  }
}
var V = Object.defineProperty, I = Object.getOwnPropertyDescriptor, d = (a, t, i, e) => {
  for (var n = e > 1 ? void 0 : e ? I(t, i) : t, r = a.length - 1, l; r >= 0; r--)
    (l = a[r]) && (n = (e ? l(t, i, n) : l(n)) || n);
  return e && n && V(t, i, n), n;
};
const T = "ea-countdown", u = H(T);
let o = class extends E {
  constructor() {
    super(...arguments), this._timer = null, this._alignTimeout = null, this.value = "", this.format = "HH:mm:ss", this.refreshInterval = 1e3, this.heading = "", this.displayValue = "", this._getDiffTime = (a, t) => {
      const i = g(), e = g(a), n = e.valueOf() - i.valueOf(), r = (b, C = 2) => `${b}`.padStart(C, "0");
      if (n <= 0 || e.isBefore(i) || !n)
        return {
          currentTime: i.valueOf(),
          diff: n,
          displayValue: "00:00:00"
        };
      let l = e.diff(i, "year"), s = i.add(l, "year");
      s.isAfter(e) && (l -= 1, s = i.add(l, "year"));
      let f = e.diff(s, "month");
      s = s.add(f, "month");
      let h = e.diff(s, "day");
      s = s.add(h, "day");
      let m = e.diff(s, "hour");
      s = s.add(m, "hour");
      let p = e.diff(s, "minute");
      s = s.add(p, "minute");
      let _ = e.diff(s, "second");
      s = s.add(_, "second");
      let v = e.diff(s, "millisecond");
      return !t.includes("YY") && t.includes("MM") && (f = Math.floor(e.diff(i, "month", !0))), !t.includes("MM") && t.includes("DD") && (h = Math.floor(e.diff(i, "day", !0))), !t.includes("DD") && t.includes("HH") && (m = Math.floor(e.diff(i, "hour", !0))), !t.includes("HH") && t.includes("mm") && (p = Math.floor(e.diff(i, "minute", !0))), !t.includes("mm") && t.includes("ss") && (_ = Math.floor(e.diff(i, "second", !0))), !t.includes("ss") && t.includes("SSS") && (v = Math.floor(e.diff(i, "millisecond", !0))), {
        currentTime: i.valueOf(),
        diff: n,
        displayValue: t.replace("YYYY", r(l)).replace("MM", r(f)).replace("DD", r(h)).replace("HH", r(m)).replace("mm", r(p)).replace("ss", r(_)).replace("SSS", r(v, 3)).replace(/\[|\]/g, "")
      };
    };
  }
  /** 处理 value 属性变化，清理旧定时器并启动新倒计时 */
  _handleValueChange(a) {
    this._timer && (clearInterval(this._timer), this._timer = null), this._alignTimeout && (clearTimeout(this._alignTimeout), this._alignTimeout = null);
    const t = w(a) || a, i = () => {
      const { diff: l, currentTime: s, displayValue: f } = this._getDiffTime(
        t,
        this.format
      );
      this._number.textContent = f, this.displayValue = f, this.dispatchEvent(
        new $({ value: s, displayValue: f })
      ), (l <= 0 || !l) && (this._alignTimeout && (clearTimeout(this._alignTimeout), this._alignTimeout = null), this._timer && (clearInterval(this._timer), this._timer = null), this.dispatchEvent(
        new O({ value: s, displayValue: f })
      ));
    };
    i();
    const e = Number(this.refreshInterval) || 1e3, n = Date.now();
    let r = e - n % e;
    r === 0 && (r = e), this._alignTimeout = x(() => {
      this._alignTimeout = null, i(), this._timer = setInterval(i, e);
    }, r);
  }
  updateContainerClasslist() {
    const a = u();
    return this._container.className = a, a;
  }
  html() {
    return `
      <div class='${u()}' part='container'>
        <header class='${u.e("header")}' part='title'>
          <slot name='title'></slot>
        </header>
        <main class='${u.e("content")}' part='content'>
          <span class='${u.e("prefix")}' part='prefix'>
            <slot name='prefix'></slot>
          </span>
          <span class='${u.e("number")}' part='number' aria-live="polite" aria-atomic="true">
            <slot></slot>
          </span>
          <span class='${u.e("suffix")}' part='suffix'>
            <slot name='suffix'></slot>
          </span>
        </main>
      </div>
    `;
  }
  $mount() {
    this.updateContainerClasslist();
  }
  $beforeUnmount() {
    this._timer && (clearInterval(this._timer), this._timer = null), this._alignTimeout && (clearTimeout(this._alignTimeout), this._alignTimeout = null);
  }
};
d([
  y(u.cb())
], o.prototype, "_container", 2);
d([
  y(u.ce("header"))
], o.prototype, "_header", 2);
d([
  y(u.ce("number"))
], o.prototype, "_number", 2);
d([
  c({
    type: String,
    default: "",
    observer(a) {
      this._handleValueChange(a);
    }
  })
], o.prototype, "value", 2);
d([
  c({
    type: String,
    default: "HH:mm:ss"
  })
], o.prototype, "format", 2);
d([
  c({
    type: Number,
    default: 1e3
  })
], o.prototype, "refreshInterval", 2);
d([
  c({
    type: String,
    default: "",
    observer(a) {
      this._header.textContent = a;
    }
  })
], o.prototype, "heading", 2);
d([
  D({ type: String, default: "" })
], o.prototype, "displayValue", 2);
o = d([
  M(T, { styles: [S] })
], o);
const U = o;
export {
  o as EaCountdown,
  U as default
};
