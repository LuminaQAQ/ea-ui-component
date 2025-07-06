var N = (o) => {
  throw TypeError(o);
};
var C = (o, a, t) => a.has(o) || N("Cannot " + t);
var r = (o, a, t) => (C(o, a, "read from private field"), t ? t.call(o) : a.get(o)), l = (o, a, t) => a.has(o) ? N("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(o) : a.set(o, t), u = (o, a, t, i) => (C(o, a, "write to private field"), i ? i.call(o, t) : a.set(o, t), t), n = (o, a, t) => (C(o, a, "access private method"), t);
import { B as H } from "./Base.js";
import "./index3.js";
import { c as F } from "./createElement.js";
import { t as Y } from "./timeout.js";
import "./ea-input.js";
import "./ea-button.js";
const j = `
.ea-time-picker_wrap {
  position: relative;
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap {
  position: absolute;
  bottom: -12px;
  left: 0;
  transform-origin: center top;
  transform: translateY(100%) scaleY(0);
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 2;
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0.5rem;
  border: 0.5rem solid transparent;
  border-bottom-color: #fff;
  transform: translateY(-100%);
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap .ea-time-picker_dropdown-inner-wrap {
  display: flex;
  position: relative;
  margin: 1rem 0;
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap .ea-time-picker_dropdown-inner-wrap::before, .ea-time-picker_wrap .ea-time-picker_dropdown-wrap .ea-time-picker_dropdown-inner-wrap::after {
  content: "";
  position: absolute;
  left: 0;
  transform: translateY(-50%);
  width: 100%;
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap .ea-time-picker_dropdown-inner-wrap::before {
  top: calc(50% - 16px);
  border-bottom: 1px solid #e4e7ed;
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap .ea-time-picker_dropdown-inner-wrap::after {
  top: calc(50% + 16px);
  border-bottom: 1px solid #e4e7ed;
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap .ea-time-picker_dropdown-inner-wrap .ea-time-picker_dropdown-inner {
  flex: 1;
  max-height: 190px;
  box-sizing: border-box;
  padding: 5rem 0;
  text-align: center;
  overflow: auto;
  scrollbar-width: none;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
  list-style-type: none;
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap .ea-time-picker_dropdown-inner-wrap .ea-time-picker_dropdown-inner .ea-time-picker_dropdown-item {
  height: 32px;
  line-height: 32px;
  font-size: 12px;
  color: #606266;
  transition: color 0.3s;
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap .ea-time-picker_dropdown-inner-wrap .ea-time-picker_dropdown-inner .ea-time-picker_dropdown-item.is-active {
  color: #409eff;
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap .ea-time-picker_dropdown-inner-wrap .ea-time-picker_dropdown-inner .ea-time-picker_dropdown-item.is-disabled {
  color: #c0c4cc;
}
.ea-time-picker_wrap .ea-time-picker_dropdown-wrap .ea-time-picker_dropdown-button-group {
  text-align: right;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
.ea-time-picker_wrap.is-open .ea-time-picker_dropdown-wrap {
  transform: translateY(100%) scaleY(1);
}
.ea-time-picker_wrap.with-transition .ea-time-picker_dropdown-wrap {
  transition: transform 0.3s ease-in-out;
}
`;
var w, c, k, b, _, f, S, e, d, y, M, B, R, T, W;
class G extends H {
  constructor() {
    super();
    l(this, e);
    l(this, w);
    l(this, c);
    l(this, k);
    l(this, b);
    l(this, _);
    l(this, f);
    l(this, S, !1);
    const t = this.attachShadow({ mode: "open" });
    t.innerHTML = `
            <div class='ea-time-picker_wrap' part='container'>
                <ea-input part='input' autocomplete="off" readonly prefix-icon="icon-clock"></ea-input>
                <div class="ea-time-picker_dropdown-wrap" part='dropdown-wrap'>
                    <div class="ea-time-picker_dropdown-inner-wrap" part='dropdown-inner-wrap'>
                        <ul class="ea-time-picker_dropdown-inner ea-time-picker_dropdown-inner-hour" part='dropdown-time'>
                        </ul>
                        <ul class="ea-time-picker_dropdown-inner ea-time-picker_dropdown-inner-minute" part='dropdown-time'>
                        </ul>
                        <ul class="ea-time-picker_dropdown-inner ea-time-picker_dropdown-inner-second" part='dropdown-time'>
                        </ul>
                    </div>
                </div>
            </div>
        `, u(this, w, t.querySelector(".ea-time-picker_wrap")), u(this, c, t.querySelector("ea-input")), u(this, k, t.querySelector(".ea-time-picker_dropdown-wrap")), u(this, b, t.querySelector(".ea-time-picker_dropdown-inner-hour")), u(this, _, t.querySelector(".ea-time-picker_dropdown-inner-minute")), u(this, f, t.querySelector(".ea-time-picker_dropdown-inner-second")), this.build(t, j);
  }
  // ------- width 宽度 -------
  // #region
  get width() {
    return this.getAttribute("width") || "200px";
  }
  set width(t) {
    this.setAttribute("width", t), r(this, w).style.width = t;
  }
  // #endregion
  // ------- end -------
  // ------- time 时间 -------
  // #region
  get time() {
    return this.getAttribute("time") || "00:00:00";
  }
  set time(t) {
    this.setAttribute("time", t);
    const [i, s, p] = t.split(":");
    this.hour = i, this.minute = s, this.second = p;
  }
  // #endregion
  // ------- end -------
  // ------- name 属性 -------
  // #region
  get name() {
    return this.getAttribute("name") || "timePicker";
  }
  set name(t) {
    this.setAttribute("name", t);
  }
  // #endregion
  // ------- end -------
  // ------- hour 小时 -------
  // #region
  get hour() {
    const t = this.getAttrNumber("hour");
    return n(this, e, d).call(this, t);
  }
  set hour(t) {
    this.setAttribute("hour", t), n(this, e, y).call(this, r(this, b), t);
  }
  // #endregion
  // ------- end -------
  // ------- minute 分钟 -------
  // #region
  get minute() {
    const t = this.getAttrNumber("minute");
    return n(this, e, d).call(this, t);
  }
  set minute(t) {
    this.setAttribute("minute", t), n(this, e, y).call(this, r(this, _), t);
  }
  // #endregion
  // ------- end -------
  // ------- second 秒 -------
  // #region
  get second() {
    const t = this.getAttrNumber("second");
    return n(this, e, d).call(this, t);
  }
  set second(t) {
    this.setAttribute("second", t), n(this, e, y).call(this, r(this, f), t);
  }
  // #endregion
  // ------- end -------
  // ------- value 时间 -------
  // #region
  get value() {
    return this.time;
  }
  set value(t) {
    this.time = t;
  }
  // #endregion
  // ------- end -------
  // ------- disabled 禁用 -------
  // #region
  get disabled() {
    return this.getAttrBoolean("disabled") || !1;
  }
  set disabled(t) {
    this.setAttribute("disabled", t), r(this, c).disabled = t;
  }
  // #endregion
  // ------- end -------
  // ------- align 对齐方式 -------
  // #region
  get align() {
    return this.getAttribute("align") || "left";
  }
  set align(t) {
    this.setAttribute("align", t), r(this, c).shadowRoot.querySelector("input").style.textAlign = t;
  }
  // #endregion
  // ------- end -------
  // ------- limit-range-start 限制起始时间 -------
  // #region
  get limitRangeStart() {
    var i;
    if (this.getAttribute("limit-range-start")) {
      const [s, p, h] = (i = this.getAttribute("limit-range-start")) == null ? void 0 : i.split(":");
      return `${n(this, e, d).call(this, s)}:${n(this, e, d).call(this, p)}:${n(this, e, d).call(this, h)}`;
    } else
      return "00:00:00";
  }
  set limitRangeStart(t) {
    this.setAttribute("limit-range-start", t);
  }
  // #endregion
  // ------- end -------
  // ------- limit-range-end 限制结束时间 -------
  // #region
  get limitRangeEnd() {
    var i;
    if (this.getAttribute("limit-range-end")) {
      const [s, p, h] = (i = this.getAttribute("limit-range-end")) == null ? void 0 : i.split(":");
      return `${n(this, e, d).call(this, s)}:${n(this, e, d).call(this, p)}:${n(this, e, d).call(this, h)}`;
    } else
      return "23:59:59";
  }
  set limitRangeEnd(t) {
    this.setAttribute("limit-range-end", t);
  }
  connectedCallback() {
    this.setAttribute("data-ea-component", !0), this.name = this.name, this.width = this.width, this.disabled = this.disabled, this.align = this.align, this.limitRangeStart = this.limitRangeStart, this.limitRangeEnd = this.limitRangeEnd, n(this, e, M).call(this), n(this, e, T).call(this), this.time = this.time, r(this, c).value = `${this.hour}:${this.minute}:${this.second}`, n(this, e, W).call(this);
  }
}
w = new WeakMap(), c = new WeakMap(), k = new WeakMap(), b = new WeakMap(), _ = new WeakMap(), f = new WeakMap(), S = new WeakMap(), e = new WeakSet(), // #endregion
// ------- end -------
d = function(t, i = "00") {
  return t = Number(t), t < 10 ? `0${t}` : t || i;
}, y = function(t, i) {
  t.querySelectorAll("li").forEach((s) => {
    Number(s.innerText) === Number(n(this, e, d).call(this, i)) && s.click();
  });
}, M = function() {
  r(this, k).style.width = r(this, c).getBoundingClientRect().width + "px", Y(() => {
    r(this, w).classList.add("with-transition");
  }, 50);
}, B = function(t, i, s, p) {
  t.addEventListener("click", () => {
    s.querySelectorAll("li").forEach(($) => {
      $.classList.remove("is-active");
    }), t.classList.add("is-active");
    const x = n(this, e, d).call(this, i);
    switch (p) {
      case "hour":
        this.hour = x;
        break;
      case "minute":
        this.minute = x;
        break;
      case "second":
        this.second = x;
        break;
    }
    r(this, S) && this.dispatchEvent(new CustomEvent("change", { detail: { time: this.time } })), r(this, c).value = `${this.hour}:${this.minute}:${this.second}`, this.time = `${this.hour}:${this.minute}:${this.second}`;
    const m = t.getBoundingClientRect().height * i;
    s.scrollTo({
      top: m,
      behavior: "smooth"
    });
  });
}, R = function(t) {
  t.addEventListener("wheel", () => {
    Y(() => {
      const i = t.querySelectorAll("li"), s = i[0].getBoundingClientRect().height, { scrollTop: p } = t, h = Math.floor(p / s);
      i[h] && i[h].click();
    }, 100);
  });
}, T = function() {
  const [t, i, s] = this.limitRangeStart.split(":"), [p, h, x] = this.limitRangeEnd.split(":"), m = /* @__PURE__ */ new Date(), $ = new Date(m.getFullYear(), m.getMonth(), m.getDate(), t, i, s), z = new Date(m.getFullYear(), m.getMonth(), m.getDate(), p, h, x);
  if ($ > z) throw new Error("limit-range-start must be less than limit-range-end");
  const L = (v, g, D, I) => {
    v = Number(v), g = Number(g);
    let q = 0, P = 0;
    switch (I) {
      case "hour":
        q = 0, P = 23;
        break;
      default:
        q = 0, P = 59, !String(v).localeCompare(g) && t !== p && (g = g === 0 ? 59 : g);
    }
    for (let A = q; A <= P; A++) {
      const E = F("li", "ea-time-picker_dropdown-item");
      E.innerText = n(this, e, d).call(this, A), D.appendChild(E), A >= v && A <= g ? n(this, e, B).call(this, E, A, D, I) : E.classList.add("is-disabled");
    }
  };
  L(t, p, r(this, b), "hour"), L(i, h, r(this, _), "minute"), L(s, x, r(this, f), "second"), n(this, e, R).call(this, r(this, b)), n(this, e, R).call(this, r(this, _)), n(this, e, R).call(this, r(this, f));
}, W = function() {
  let t = !1;
  const i = () => {
    this.time = this.time, t = !0, u(this, S, !0), r(this, k).removeEventListener("transitionend", i);
  };
  r(this, c).addEventListener("focus", () => {
    r(this, w).classList.add("is-open"), t || r(this, k).addEventListener("transitionend", i);
  }), window.addEventListener("click", (s) => {
    this.contains(s.target) ? r(this, c).shadowRoot.querySelector(".ea-input_inner").focus() : r(this, w).classList.remove("is-open");
  });
};
customElements.get("ea-time-picker") || customElements.define("ea-time-picker", G);
export {
  G as EaTimePicker
};
