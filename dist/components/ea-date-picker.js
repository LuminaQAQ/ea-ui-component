var g = (e, i, t) => {
  if (!i.has(e))
    throw TypeError("Cannot " + t);
};
var a = (e, i, t) => (g(e, i, "read from private field"), t ? t.call(e) : i.get(e)), d = (e, i, t) => {
  if (i.has(e))
    throw TypeError("Cannot add the same private member more than once");
  i instanceof WeakSet ? i.add(e) : i.set(e, t);
}, o = (e, i, t, s) => (g(e, i, "write to private field"), s ? s.call(e, t) : i.set(e, t), t);
var m = (e, i, t) => (g(e, i, "access private method"), t);
import { B as _ } from "./Base.js";
import "./index3.js";
import "./ea-calendar.js";
import "./ea-input.js";
import { t as y } from "./timeout.js";
const A = `
.ea-date-picker_wrap .ea-date-picker_input-wrap {
  position: relative;
}
.ea-date-picker_wrap .ea-date-picker_dropdown-wrap {
  position: absolute;
  background-color: #fff;
  transform-origin: top center;
  transform: scaleY(0);
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  z-index: 2;
}
.ea-date-picker_wrap.is-open .ea-date-picker_dropdown-wrap {
  transform: scaleY(1);
}
.ea-date-picker_wrap.with-transition .ea-date-picker_dropdown-wrap {
  transition: transform 0.3s;
}
`;
var n, l, p, r, u, k, w, b;
class v extends _ {
  constructor() {
    super();
    // #endregion
    // ------- end -------
    d(this, u);
    d(this, w);
    d(this, n, void 0);
    d(this, l, void 0);
    d(this, p, void 0);
    d(this, r, void 0);
    const t = this.attachShadow({ mode: "open" });
    t.innerHTML = `
            <div class='ea-date-picker_wrap' part='container'>
                <div class='ea-date-picker_input-wrap' part='input-wrap'>
                    <ea-input class="ea-date-picker_input" part='input' prefix-icon="icon-calendar-times-o" readonly></ea-input>
                </div>
                <div class='ea-date-picker_dropdown-wrap' part='dropdown-wrap'>
                    <ea-calendar class="ea-date-picker_calendar" size="mini" part='calendar'></ea-calendar>
                </div>
            </div>
        `, o(this, n, t.querySelector(".ea-date-picker_wrap")), o(this, l, t.querySelector(".ea-date-picker_dropdown-wrap")), o(this, p, t.querySelector(".ea-date-picker_calendar")), o(this, r, t.querySelector(".ea-date-picker_input")), this.build(t, A);
  }
  // ------- name 名称 -------
  // #region
  get name() {
    return this.getAttribute("name") || "datePicker";
  }
  set name(t) {
    this.setAttribute("name", t);
  }
  // #endregion
  // ------- end -------
  // ------- width 宽度 -------
  // #region
  get width() {
    return this.getAttribute("width") || "200px";
  }
  set width(t) {
    this.setAttribute("width", t), a(this, n).style.width = t, a(this, l).style.width = t, this.style.display = "inline-block", this.style.width = t;
  }
  // #endregion
  // ------- end -------
  // ------- value 日期值 -------
  // #region
  get value() {
    return this.getAttribute("value") || "";
  }
  set value(t) {
    if (isNaN(new Date(t)) && t !== "") {
      const s = new Date(Date.now());
      t = `${s.getFullYear()}-${s.getMonth() + 1}-${s.getDate()}`;
    }
    this.setAttribute("value", t), a(this, r).value = t;
  }
  // #endregion
  // ------- end -------
  // ------- placeholder 占位符 -------
  // #region
  get placeholder() {
    return this.getAttribute("placeholder") || "";
  }
  set placeholder(t) {
    this.setAttribute("placeholder", t), a(this, r).placeholder = t;
  }
  // #endregion
  // ------- end -------
  // ------- disabled 禁用 -------
  // #region
  get disabled() {
    return this.getAttrBoolean("disabled") || !1;
  }
  set disabled(t) {
    this.toggleAttr("disabled", t), a(this, r).disabled = t;
  }
  // #endregion
  // ------- end -------
  // ------- align 对齐方式 -------
  // #region
  get align() {
    return this.getAttribute("align") || "left";
  }
  set align(t) {
    this.setAttribute("align", t), a(this, r).shadowRoot.querySelector("input").style.textAlign = t;
  }
  connectedCallback() {
    this.setAttribute("data-ea-component", !0), this.name = this.name, this.width = this.width, this.value = this.value, this.placeholder = this.placeholder, this.disabled = this.disabled, this.align = this.align, m(this, u, k).call(this), m(this, w, b).call(this), y(() => {
      a(this, n).classList.add("with-transition");
    }, 300);
  }
}
n = new WeakMap(), l = new WeakMap(), p = new WeakMap(), r = new WeakMap(), u = new WeakSet(), k = function() {
  a(this, p).addEventListener("select", (t) => {
    const { year: s, month: c, date: h, day: f } = t.detail;
    this.value = `${s}-${c}-${h}`, a(this, r).value = `${s}-${c}-${h}`, this.dispatchEvent(new CustomEvent("change", {
      detail: {
        fulllDate: `${s}-${c}-${h}`,
        year: s,
        month: c,
        date: h,
        week: f
      }
    }));
  });
}, w = new WeakSet(), b = function() {
  a(this, r).addEventListener("focus", () => {
    a(this, n).classList.add("is-open");
  }), window.addEventListener("click", (t) => {
    this.contains(t.target) ? a(this, r).shadowRoot.querySelector(".ea-input_inner").focus() : a(this, n).classList.remove("is-open");
  });
};
customElements.get("ea-date-picker") || customElements.define("ea-date-picker", v);
export {
  v as EaDatePicker
};
