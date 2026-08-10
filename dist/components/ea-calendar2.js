import { E as dt } from "../core/EaBase.ts.js";
import { q as U, a as st, l as it, C as ht } from "../core/decorator.js";
import { h as X } from "../utils/html.ts.js";
import { E as ft } from "../utils/Enum.ts.js";
import { i as v } from "../utils/I18nManager.ts.js";
import { s as pt } from "../css/ea-calendar.style.js";
import { c as yt } from "../utils/bem.ts.js";
var lt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function mt(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var tt = { exports: {} }, at;
function ct() {
  return at || (at = 1, function(t, s) {
    (function(i, a) {
      t.exports = a();
    })(lt, function() {
      var i = 1e3, a = 6e4, d = 36e5, _ = "millisecond", c = "second", y = "minute", m = "hour", D = "day", M = "week", u = "month", S = "quarter", w = "year", A = "date", H = "Invalid Date", F = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, Z = /\[([^\]]+)]|YYYY|YY|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, K = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(h) {
        var n = ["th", "st", "nd", "rd"], e = h % 100;
        return "[" + h + (n[(e - 20) % 10] || n[e] || n[0]) + "]";
      } }, j = function(h, n, e) {
        var o = String(h);
        return !o || o.length >= n ? h : "" + Array(n + 1 - o.length).join(e) + h;
      }, ut = { s: j, z: function(h) {
        var n = -h.utcOffset(), e = Math.abs(n), o = Math.floor(e / 60), r = e % 60;
        return (n <= 0 ? "+" : "-") + j(o, 2, "0") + ":" + j(r, 2, "0");
      }, m: function h(n, e) {
        if (n.date() < e.date()) return -h(e, n);
        var o = 12 * (e.year() - n.year()) + (e.month() - n.month()), r = n.clone().add(o, u), f = e - r < 0, p = n.clone().add(o + (f ? -1 : 1), u);
        return +(-(o + (e - r) / (f ? r - p : p - r)) || 0);
      }, a: function(h) {
        return h < 0 ? Math.ceil(h) || 0 : Math.floor(h);
      }, p: function(h) {
        return { M: u, y: w, w: M, d: D, D: A, h: m, m: y, s: c, ms: _, Q: S }[h] || String(h || "").toLowerCase().replace(/s$/, "");
      }, u: function(h) {
        return h === void 0;
      } }, z = "en", R = {};
      R[z] = K;
      var rt = "$isDayjsObject", Q = function(h) {
        return h instanceof J || !(!h || !h[rt]);
      }, G = function h(n, e, o) {
        var r;
        if (!n) return z;
        if (typeof n == "string") {
          var f = n.toLowerCase();
          R[f] && (r = f), e && (R[f] = e, r = f);
          var p = n.split("-");
          if (!r && p.length > 1) return h(p[0]);
        } else {
          var g = n.name;
          R[g] = n, r = g;
        }
        return !o && r && (z = r), r || !o && z;
      }, C = function(h, n) {
        if (Q(h)) return h.clone();
        var e = typeof n == "object" ? n : {};
        return e.date = h, e.args = arguments, new J(e);
      }, $ = ut;
      $.l = G, $.i = Q, $.w = function(h, n) {
        return C(h, { locale: n.$L, utc: n.$u, x: n.$x, $offset: n.$offset });
      };
      var J = function() {
        function h(e) {
          this.$L = G(e.locale, null, !0), this.parse(e), this.$x = this.$x || e.x || {}, this[rt] = !0;
        }
        var n = h.prototype;
        return n.parse = function(e) {
          this.$d = function(o) {
            var r = o.date, f = o.utc;
            if (r === null) return /* @__PURE__ */ new Date(NaN);
            if ($.u(r)) return /* @__PURE__ */ new Date();
            if (r instanceof Date) return new Date(r);
            if (typeof r == "string" && !/Z$/i.test(r)) {
              var p = r.match(F);
              if (p) {
                var g = p[2] - 1 || 0, b = (p[7] || "0").substring(0, 3);
                return f ? new Date(Date.UTC(p[1], g, p[3] || 1, p[4] || 0, p[5] || 0, p[6] || 0, b)) : new Date(p[1], g, p[3] || 1, p[4] || 0, p[5] || 0, p[6] || 0, b);
              }
            }
            return new Date(r);
          }(e), this.init();
        }, n.init = function() {
          var e = this.$d;
          this.$y = e.getFullYear(), this.$M = e.getMonth(), this.$D = e.getDate(), this.$W = e.getDay(), this.$H = e.getHours(), this.$m = e.getMinutes(), this.$s = e.getSeconds(), this.$ms = e.getMilliseconds();
        }, n.$utils = function() {
          return $;
        }, n.isValid = function() {
          return this.$d.toString() !== H;
        }, n.isSame = function(e, o) {
          var r = C(e);
          return this.startOf(o) <= r && r <= this.endOf(o);
        }, n.isAfter = function(e, o) {
          return C(e) < this.startOf(o);
        }, n.isBefore = function(e, o) {
          return this.endOf(o) < C(e);
        }, n.$g = function(e, o, r) {
          return $.u(e) ? this[o] : this.set(r, e);
        }, n.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, n.valueOf = function() {
          return this.$d.getTime();
        }, n.startOf = function(e, o) {
          var r = this, f = !!$.u(o) || o, p = $.p(e), g = function(W, O) {
            var I = $.w(r.$u ? Date.UTC(r.$y, O, W) : new Date(r.$y, O, W), r);
            return f ? I : I.endOf(D);
          }, b = function(W, O) {
            return $.w(r.toDate()[W].apply(r.toDate("s"), (f ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(O)), r);
          }, Y = this.$W, x = this.$M, E = this.$D, B = "set" + (this.$u ? "UTC" : "");
          switch (p) {
            case w:
              return f ? g(1, 0) : g(31, 11);
            case u:
              return f ? g(1, x) : g(0, x + 1);
            case M:
              var q = this.$locale().weekStart || 0, P = (Y < q ? Y + 7 : Y) - q;
              return g(f ? E - P : E + (6 - P), x);
            case D:
            case A:
              return b(B + "Hours", 0);
            case m:
              return b(B + "Minutes", 1);
            case y:
              return b(B + "Seconds", 2);
            case c:
              return b(B + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, n.endOf = function(e) {
          return this.startOf(e, !1);
        }, n.$set = function(e, o) {
          var r, f = $.p(e), p = "set" + (this.$u ? "UTC" : ""), g = (r = {}, r[D] = p + "Date", r[A] = p + "Date", r[u] = p + "Month", r[w] = p + "FullYear", r[m] = p + "Hours", r[y] = p + "Minutes", r[c] = p + "Seconds", r[_] = p + "Milliseconds", r)[f], b = f === D ? this.$D + (o - this.$W) : o;
          if (f === u || f === w) {
            var Y = this.clone().set(A, 1);
            Y.$d[g](b), Y.init(), this.$d = Y.set(A, Math.min(this.$D, Y.daysInMonth())).$d;
          } else g && this.$d[g](b);
          return this.init(), this;
        }, n.set = function(e, o) {
          return this.clone().$set(e, o);
        }, n.get = function(e) {
          return this[$.p(e)]();
        }, n.add = function(e, o) {
          var r, f = this;
          e = Number(e);
          var p = $.p(o), g = function(x) {
            var E = C(f);
            return $.w(E.date(E.date() + Math.round(x * e)), f);
          };
          if (p === u) return this.set(u, this.$M + e);
          if (p === w) return this.set(w, this.$y + e);
          if (p === D) return g(1);
          if (p === M) return g(7);
          var b = (r = {}, r[y] = a, r[m] = d, r[c] = i, r)[p] || 1, Y = this.$d.getTime() + e * b;
          return $.w(Y, this);
        }, n.subtract = function(e, o) {
          return this.add(-1 * e, o);
        }, n.format = function(e) {
          var o = this, r = this.$locale();
          if (!this.isValid()) return r.invalidDate || H;
          var f = e || "YYYY-MM-DDTHH:mm:ssZ", p = $.z(this), g = this.$H, b = this.$m, Y = this.$M, x = r.weekdays, E = r.months, B = r.meridiem, q = function(O, I, N, V) {
            return O && (O[I] || O(o, f)) || N[I].slice(0, V);
          }, P = function(O) {
            return $.s(g % 12 || 12, O, "0");
          }, W = B || function(O, I, N) {
            var V = O < 12 ? "AM" : "PM";
            return N ? V.toLowerCase() : V;
          };
          return f.replace(Z, function(O, I) {
            return I || function(N) {
              switch (N) {
                case "YY":
                  return String(o.$y).slice(-2);
                case "YYYY":
                  return $.s(o.$y, 4, "0");
                case "M":
                  return Y + 1;
                case "MM":
                  return $.s(Y + 1, 2, "0");
                case "MMM":
                  return q(r.monthsShort, Y, E, 3);
                case "MMMM":
                  return q(E, Y);
                case "D":
                  return o.$D;
                case "DD":
                  return $.s(o.$D, 2, "0");
                case "d":
                  return String(o.$W);
                case "dd":
                  return q(r.weekdaysMin, o.$W, x, 2);
                case "ddd":
                  return q(r.weekdaysShort, o.$W, x, 3);
                case "dddd":
                  return x[o.$W];
                case "H":
                  return String(g);
                case "HH":
                  return $.s(g, 2, "0");
                case "h":
                  return P(1);
                case "hh":
                  return P(2);
                case "a":
                  return W(g, b, !0);
                case "A":
                  return W(g, b, !1);
                case "m":
                  return String(b);
                case "mm":
                  return $.s(b, 2, "0");
                case "s":
                  return String(o.$s);
                case "ss":
                  return $.s(o.$s, 2, "0");
                case "SSS":
                  return $.s(o.$ms, 3, "0");
                case "Z":
                  return p;
              }
              return null;
            }(O) || p.replace(":", "");
          });
        }, n.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, n.diff = function(e, o, r) {
          var f, p = this, g = $.p(o), b = C(e), Y = (b.utcOffset() - this.utcOffset()) * a, x = this - b, E = function() {
            return $.m(p, b);
          };
          switch (g) {
            case w:
              f = E() / 12;
              break;
            case u:
              f = E();
              break;
            case S:
              f = E() / 3;
              break;
            case M:
              f = (x - Y) / 6048e5;
              break;
            case D:
              f = (x - Y) / 864e5;
              break;
            case m:
              f = x / d;
              break;
            case y:
              f = x / a;
              break;
            case c:
              f = x / i;
              break;
            default:
              f = x;
          }
          return r ? f : $.a(f);
        }, n.daysInMonth = function() {
          return this.endOf(u).$D;
        }, n.$locale = function() {
          return R[this.$L];
        }, n.locale = function(e, o) {
          if (!e) return this.$L;
          var r = this.clone(), f = G(e, o, !0);
          return f && (r.$L = f), r;
        }, n.clone = function() {
          return $.w(this.$d, this);
        }, n.toDate = function() {
          return new Date(this.valueOf());
        }, n.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, n.toISOString = function() {
          return this.$d.toISOString();
        }, n.toString = function() {
          return this.$d.toUTCString();
        }, h;
      }(), nt = J.prototype;
      return C.prototype = nt, [["$ms", _], ["$s", c], ["$m", y], ["$H", m], ["$W", D], ["$M", u], ["$y", w], ["$D", A]].forEach(function(h) {
        nt[h[1]] = function(n) {
          return this.$g(n, h[0], h[1]);
        };
      }), C.extend = function(h, n) {
        return h.$i || (h(n, J, C), h.$i = !0), C;
      }, C.locale = G, C.isDayjs = Q, C.unix = function(h) {
        return C(1e3 * h);
      }, C.en = R[z], C.Ls = R, C.p = {}, C;
    });
  }(tt)), tt.exports;
}
var _t = ct();
const k = /* @__PURE__ */ mt(_t);
var $t = { exports: {} };
(function(t, s) {
  (function(i, a) {
    t.exports = a(ct());
  })(lt, function(i) {
    function a(c) {
      return c && typeof c == "object" && "default" in c ? c : { default: c };
    }
    var d = a(i), _ = { name: "zh-cn", weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"), weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"), weekdaysMin: "日_一_二_三_四_五_六".split("_"), months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"), monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"), ordinal: function(c, y) {
      return y === "W" ? c + "周" : c + "日";
    }, weekStart: 1, yearStart: 4, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "YYYY/MM/DD", LL: "YYYY年M月D日", LLL: "YYYY年M月D日Ah点mm分", LLLL: "YYYY年M月D日ddddAh点mm分", l: "YYYY/M/D", ll: "YYYY年M月D日", lll: "YYYY年M月D日 HH:mm", llll: "YYYY年M月D日dddd HH:mm" }, relativeTime: { future: "%s内", past: "%s前", s: "几秒", m: "1 分钟", mm: "%d 分钟", h: "1 小时", hh: "%d 小时", d: "1 天", dd: "%d 天", M: "1 个月", MM: "%d 个月", y: "1 年", yy: "%d 年" }, meridiem: function(c, y) {
      var m = 100 * c + y;
      return m < 600 ? "凌晨" : m < 900 ? "早上" : m < 1100 ? "上午" : m < 1300 ? "中午" : m < 1800 ? "下午" : "晚上";
    } };
    return d.default.locale(_, null, !0), _;
  });
})($t);
class gt extends Event {
  constructor(s) {
    super("ea-select", { bubbles: !0, composed: !0 }), this.detail = s;
  }
}
var Dt = Object.defineProperty, vt = Object.getOwnPropertyDescriptor, T = (t, s, i, a) => {
  for (var d = a > 1 ? void 0 : a ? vt(s, i) : s, _ = t.length - 1, c; _ >= 0; _--)
    (c = t[_]) && (d = (a ? c(s, i, d) : c(d)) || d);
  return a && d && Dt(s, i, d), d;
};
async function ot() {
  await import("./ea-button.js");
}
async function bt() {
  await import("./ea-select.js");
}
const et = "ea-calendar", l = yt(et);
let L = class extends dt {
  constructor() {
    super(...arguments), this._isEaSelectImported = !1, this._isEaButtonImported = !1, this._displayDate = k(), this.value = "", this.controllerType = "button", this._handleTodayClick = () => {
      v.locale = this.locale, k.locale(this.locale.toLowerCase());
      const t = k();
      this._displayDate = t, this._title.textContent = `${t.get("year")} ${v.t("calendar.months")[t.get("month")]}`, this.value = t.format("YYYY-MM-DD");
    }, this._handleControllerRender = async (t = this.controllerType) => {
      var d, _;
      v.locale = this.locale, k.locale(this.locale.toLowerCase());
      const s = this._displayDate.get("year"), i = {
        button: () => X(`
        <ea-button-group class='${l.e("controller-group")}' part='controller-group' size="small">
          <ea-button class='${l.e("controller")} ${l.e("controller-prev")}' part='controller prev'>
            ${v.t("calendar.prevMonth")}
          </ea-button>
          <ea-button class='${l.e("controller")} ${l.e("controller-today")}' part='controller current'>
            ${v.t("calendar.today")}
          </ea-button>
          <ea-button class='${l.e("controller")} ${l.e("controller-next")}' part='controller next'>
            ${v.t("calendar.nextMonth")}
          </ea-button>
        </ea-button-group>
      `),
        select: () => {
          const c = Array.from(
            { length: 20 },
            (m, D) => `<ea-option value="${s - 10 + D}">${s - 10 + D}</ea-option>`
          ).join(""), y = Array.from(
            { length: 12 },
            (m, D) => `<ea-option value="${D + 1}">${D + 1}</ea-option>`
          ).join("");
          return X(`
          <section class='${l.e("controller-group")}' part='controller-group'>
            <ea-select class='${l.e("controller")} ${l.e("controller-year")}' part='controller year' placeholder='${v.t("calendar.selectYear")}' size="small">
              ${c}
            </ea-select>
            <ea-select class='${l.e("controller")} ${l.e("controller-month")}' part='controller month' placeholder='${v.t("calendar.selectMonth")}' size="small">
              ${y}
            </ea-select>
            <ea-button class='${l.e("controller")} ${l.e("controller-today")}' part='controller current' size="small">
              ${v.t("calendar.today")}
            </ea-button>
          </section>
        `);
        }
      };
      (d = this._dateChangeAbortController) == null || d.abort(), this._dateChangeAbortController = new AbortController(), t === "select" ? (await bt(), await ot()) : await ot(), this._controllerWrapper.innerHTML = X(
        i[t]()
      ), t === "select" ? await this._initSelectControllerEvent() : await this._initButtonControllerEvent();
      const a = (_ = this.shadowRoot) == null ? void 0 : _.querySelector(l.ce("controller-today"));
      a && a.addEventListener("click", this._handleTodayClick, {
        signal: this._dateChangeAbortController.signal
      });
    }, this._initButtonControllerEvent = async () => {
      var d, _, c, y;
      this._isEaButtonImported || (await customElements.whenDefined("ea-button"), this._isEaButtonImported = !0);
      const t = (d = this.shadowRoot) == null ? void 0 : d.querySelector(l.ce("controller-prev")), s = (_ = this.shadowRoot) == null ? void 0 : _.querySelector(l.ce("controller-next")), i = () => {
        this.displayDate = this._displayDate.subtract(1, "month").set("date", 1);
      }, a = () => {
        this.displayDate = this._displayDate.add(1, "month").set("date", 1);
      };
      t && t.addEventListener("click", i, {
        signal: (c = this._dateChangeAbortController) == null ? void 0 : c.signal
      }), s && s.addEventListener("click", a, {
        signal: (y = this._dateChangeAbortController) == null ? void 0 : y.signal
      });
    }, this._initSelectControllerEvent = async () => {
      var c, y, m, D;
      this._isEaSelectImported || (await customElements.whenDefined("ea-select"), this._isEaSelectImported = !0);
      const t = this._displayDate.get("year"), s = this._displayDate.get("month") + 1, i = (c = this.shadowRoot) == null ? void 0 : c.querySelector(
        l.ce("controller-year")
      ), a = (y = this.shadowRoot) == null ? void 0 : y.querySelector(
        l.ce("controller-month")
      ), d = (M) => {
        M.stopImmediatePropagation();
        const u = parseInt(M.target.value), S = this._displayDate.get("month") + 1;
        this.displayDate = k(`${u}-${S}-01`);
      }, _ = (M) => {
        M.stopImmediatePropagation();
        const u = this._displayDate.get("year"), S = M.target.value.padStart(2, "0");
        this.displayDate = k(`${u}-${S}-01`);
      };
      i && (i.value = String(t)), a && (a.value = String(s)), await new Promise((M) => setTimeout(M, 0)), i == null || i.addEventListener("change", d, {
        signal: (m = this._dateChangeAbortController) == null ? void 0 : m.signal
      }), a == null || a.addEventListener("change", _, {
        signal: (D = this._dateChangeAbortController) == null ? void 0 : D.signal
      });
    };
  }
  get displayDate() {
    return this._displayDate;
  }
  set displayDate(t) {
    const s = typeof t == "string" ? k(t) : t;
    this._displayDate = s, this.value = s.format("YYYY-MM-DD");
  }
  updateContainerClasslist() {
    const t = l();
    return this._container && (this._container.className = t), t;
  }
  /** @param weekList - 星期名称列表 @param weekFullList - 完整星期名称列表 @returns 星期行 HTML 字符串 */
  _renderWeekHeader(t, s) {
    return t.map(
      (i, a) => `<th class='${l.e("th")}' part='th' scope='col' role='columnheader' aria-colindex='${a + 1}' abbr='${s[a] || i}'>${i}</th>`
    ).join("");
  }
  /** @param date - 要渲染的日期 */
  _updateCalendarDays(t) {
    var _, c;
    v.locale = this.locale, k.locale(this.locale.toLowerCase());
    const s = t.get("year"), i = t.get("month"), a = !!((c = (_ = this.shadowRoot) == null ? void 0 : _.activeElement) != null && c.closest(
      l.ce("tbody")
    ));
    this._title.textContent = `${s} ${v.t("calendar.months")[i]}`, this._tbody.innerHTML = this._renderDayCells();
    const d = this._container.querySelector("table");
    if (d) {
      const y = 1 + this._tbody.querySelectorAll("tr").length;
      d.setAttribute("aria-rowcount", String(y));
    }
    if (a) {
      const y = this._tbody.querySelector(
        "td[role='gridcell'][tabindex='0']"
      );
      y == null || y.focus();
    }
  }
  _handleDayCellClick(t) {
    const s = t.target.closest(l.ce("day"));
    if (!s || s === this._tbody) return;
    const i = parseInt(s.dataset.year || "0"), a = parseInt(s.dataset.month || "0"), d = parseInt(s.dataset.date || "0"), _ = k(`${i}-${a}-${d}`);
    this.displayDate = _;
    const c = s.closest(
      "td[role='gridcell']"
    );
    if (c) {
      const y = this._tbody.querySelector(
        "td[role='gridcell'][tabindex='0']"
      );
      y && y !== c && y.setAttribute("tabindex", "-1"), c.setAttribute("tabindex", "0");
    }
    this.dispatchEvent(
      new gt({
        year: i,
        month: a,
        date: d,
        day: _.day(),
        fullDate: `${i}-${a}-${d}`
      })
    );
  }
  _handleGridKeydown(t) {
    const s = t.target.closest("td[role='gridcell']");
    if (!s) return;
    const i = [
      ...this._tbody.querySelectorAll("td[role='gridcell']")
    ], a = i.indexOf(s);
    if (a === -1) return;
    const d = 7, _ = Math.ceil(i.length / d), c = Math.floor(a / d), y = a % d;
    let m = -1;
    switch (t.key) {
      case "ArrowRight":
        y < d - 1 && (m = a + 1);
        break;
      case "ArrowLeft":
        y > 0 && (m = a - 1);
        break;
      case "ArrowDown":
        c < _ - 1 && (m = a + d);
        break;
      case "ArrowUp":
        c > 0 && (m = a - d);
        break;
      case "Home":
        m = c * d;
        break;
      case "End":
        m = c * d + d - 1;
        break;
      case "Enter":
      case " ":
        t.preventDefault(), s.click();
        return;
      default:
        return;
    }
    m >= 0 && m < i.length && (t.preventDefault(), this._moveFocus(i[a], i[m]));
  }
  /** @param fromCell - 当前聚焦单元格 @param toCell - 目标聚焦单元格 */
  _moveFocus(t, s) {
    t.setAttribute("tabindex", "-1"), s.setAttribute("tabindex", "0"), s.focus();
  }
  /** @param refDate - 参考日期 @returns 日期数组选项 */
  _getDayOption(t = k()) {
    const i = t.subtract(1, "month").daysInMonth(), a = t.startOf("month").day(), d = t.endOf("month").day(), _ = t.daysInMonth(), c = t.startOf("week").get("day"), y = Array.from(
      { length: a - c },
      (M, u) => i - u
    ).reverse(), m = Array.from(
      { length: _ },
      (M, u) => u + 1
    ), D = Array.from(
      { length: 6 - d + c },
      (M, u) => u + 1
    );
    return { prevMonthRemainingDays: y, currentMonthDays: m, nextMonthRemainingDays: D };
  }
  /** @param year - 年份 @param month - 月份 @param date - 日期 @returns 是否是今天 */
  _isToday(t, s, i) {
    const a = k();
    return t === a.get("year") && s === a.get("month") + 1 && i === a.get("date");
  }
  /** @returns 日历天数的 HTML 字符串 */
  _renderDayCells() {
    const t = this._displayDate, s = t.get("year"), i = t.get("month") + 1, a = t.get("date"), { prevMonthRemainingDays: d, currentMonthDays: _, nextMonthRemainingDays: c } = this._getDayOption(t), y = (u, S, w = {}) => {
      let A, H;
      if (u === "prev-month") {
        const j = t.subtract(1, "month");
        A = j.get("year"), H = j.get("month") + 1;
      } else if (u === "current-month")
        A = s, H = i;
      else {
        const j = t.add(1, "month");
        A = j.get("year"), H = j.get("month") + 1;
      }
      const F = [l.e("day"), l.s(u)];
      w.isToday && F.push(l.s("today")), w.isActive && F.push(l.s("active"));
      const Z = ["day", u], K = [
        'role="gridcell"',
        w.isActive ? 'aria-selected="true"' : "",
        w.isToday ? 'aria-current="date"' : "",
        u !== "current-month" ? 'aria-disabled="true"' : "",
        `tabindex="${w.isActive ? 0 : -1}"`
      ].filter(Boolean).join(" ");
      return `<td class="${F.join(" ")}" part="${Z.join(" ")}" data-year="${A}" data-month="${H}" data-date="${S}" ${K}>${S}</td>`;
    }, m = d.map(
      (u) => y("prev-month", u, {
        isActive: this._isActiveDate(
          t.subtract(1, "month").get("year"),
          t.subtract(1, "month").get("month") + 1,
          u
        )
      })
    ), D = _.map(
      (u) => y("current-month", u, {
        isToday: this._isToday(s, i, u),
        isActive: u === a
      })
    ), M = c.map(
      (u) => y("next-month", u, {
        isActive: this._isActiveDate(
          t.add(1, "month").get("year"),
          t.add(1, "month").get("month") + 1,
          u
        )
      })
    );
    return m.concat(D).concat(M).reduce((u, S, w) => (w % 7 === 0 && u.push([]), u[u.length - 1].push(S), u), []).map((u, S) => {
      const w = u.map(
        (A, H) => A.replace(
          'role="gridcell"',
          `role="gridcell" aria-colindex="${H + 1}"`
        )
      );
      return `<tr class="${l.e("row")}" role="row" aria-rowindex="${S + 2}">${w.join("")}</tr>`;
    }).join("");
  }
  /** @param year - 年份 @param month - 月份 @param date - 日期 @returns 是否是选中日期 */
  _isActiveDate(t, s, i) {
    return t === this._displayDate.get("year") && s === this._displayDate.get("month") + 1 && i === this._displayDate.get("date");
  }
  html() {
    const t = /* @__PURE__ */ new Date(), s = t.getFullYear(), i = t.getMonth();
    v.locale = this.locale, k.locale(this.locale);
    const a = `${et}-title`;
    return `
      <div class="${l.b()}" part="container">
        <header class="${l.e("header")}" part="header">
          <slot name="header">
            <span class="${l.e("title")}" part="title" id="${a}">
              ${s} ${v.t("calendar.months")[i]}
            </span>
            <section class="${l.e("controller-wrapper")}" part="controller-wrapper">
            </section>
          </slot>
        </header>
        <table class="${l.e("body")}" part="body" role="grid" aria-labelledby="${a}" aria-colcount="7">
          <thead class="${l.e("thead")}" part="thead">
            <tr class="${l.e("week")}" part="thead-tr tr" role="row" aria-rowindex="1">
              ${this._renderWeekHeader(v.t("calendar.weekDays"), v.t("calendar.weekDaysFull") || v.t("calendar.weekDays"))}
            </tr>
          </thead>
          <tbody class="${l.e("tbody")}" part="tbody">${this._renderDayCells()}</tbody>
        </table>
      </div>
    `;
  }
  $updateLocalization(t) {
    var m, D, M, u, S;
    v.locale = t, k.locale(this.locale.toLowerCase()), this._displayDate = this._displayDate.locale(this.locale.toLowerCase());
    const s = (m = this.shadowRoot) == null ? void 0 : m.querySelector(l.ce("controller-prev")), i = (D = this.shadowRoot) == null ? void 0 : D.querySelector(l.ce("controller-today")), a = (M = this.shadowRoot) == null ? void 0 : M.querySelector(l.ce("controller-next")), d = (u = this.shadowRoot) == null ? void 0 : u.querySelector(l.ce("controller-year")), _ = (S = this.shadowRoot) == null ? void 0 : S.querySelector(l.ce("controller-month"));
    s && (s.textContent = v.t("calendar.prevMonth")), i && (i.textContent = v.t("calendar.today")), a && (a.textContent = v.t("calendar.nextMonth")), d && (d.placeholder = v.t("calendar.selectYear")), _ && (_.placeholder = v.t("calendar.selectMonth"));
    const c = v.t("calendar.weekDays");
    this._thead.querySelectorAll(`.${l.e("th")}`).forEach((w, A) => {
      w.textContent = c[A];
    }), this._updateCalendarDays(this._displayDate);
  }
  $mount() {
    this._handleControllerRender(), this.value && (this._displayDate = k(this.value), this._updateCalendarDays(this._displayDate));
  }
  $beforeUnmount() {
    var t;
    (t = this._dateChangeAbortController) == null || t.abort();
  }
};
T([
  U(l.cb())
], L.prototype, "_container", 2);
T([
  U(l.ce("title"))
], L.prototype, "_title", 2);
T([
  U(l.ce("controller-wrapper"))
], L.prototype, "_controllerWrapper", 2);
T([
  U(l.ce("thead"))
], L.prototype, "_thead", 2);
T([
  U(l.ce("tbody"))
], L.prototype, "_tbody", 2);
T([
  st({
    type: String,
    default: "",
    observer(t) {
      t && (this._displayDate = k(t), this._updateCalendarDays(this._displayDate));
    }
  })
], L.prototype, "value", 2);
T([
  st({
    type: ft(["button", "select"]),
    default: "button",
    observer(t) {
      this._handleControllerRender(t);
    }
  })
], L.prototype, "controllerType", 2);
T([
  it("click", l.ce("tbody"))
], L.prototype, "_handleDayCellClick", 1);
T([
  it("keydown", l.ce("tbody"))
], L.prototype, "_handleGridKeydown", 1);
L = T([
  ht(et, { styles: [pt] })
], L);
const kt = L;
export {
  L as E,
  kt as a,
  lt as c,
  k as d,
  mt as g
};
