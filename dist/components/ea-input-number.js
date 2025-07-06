var N = (r) => {
  throw TypeError(r);
};
var x = (r, u, e) => u.has(r) || N("Cannot " + e);
var t = (r, u, e) => (x(r, u, "read from private field"), e ? e.call(r) : u.get(r)), d = (r, u, e) => u.has(r) ? N("Cannot add the same private member more than once") : u instanceof WeakSet ? u.add(r) : u.set(r, e), g = (r, u, e, a) => (x(r, u, "write to private field"), a ? a.call(r, e) : u.set(r, e), e), s = (r, u, e) => (x(r, u, "access private method"), e);
import { B as A } from "./Base.js";
const E = `
.ea-input-number_wrap {
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  border-radius: 3px;
  transition: border 0.2s;
}
.ea-input-number_wrap .ea-input-number_sign {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: 1px solid #dcdfe6;
  background-color: #f5f7fa;
  height: 2rem;
  width: 2rem;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  user-select: none;
}
.ea-input-number_wrap .ea-input-number_sign:first-child {
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  border-right: 0;
}
.ea-input-number_wrap .ea-input-number_sign:last-child {
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  border-left: 0;
}
.ea-input-number_wrap .ea-input-number_sign:hover {
  color: #409eff;
}
.ea-input-number_wrap .ea-input-number_sign.disabled {
  pointer-events: none;
  cursor: not-allowed;
  color: #c0c4cc;
}
.ea-input-number_wrap .ea-input-number_inner {
  box-sizing: border-box;
  box-shadow: none;
  border: 1px solid #dcdfe6;
  outline: 0;
  transition: border 0.2s;
  border-radius: 3px;
  padding: 0.5rem;
  line-height: 0.8;
  font-size: 0.8rem;
  scrollbar-width: none;
  width: 5rem;
  height: 2rem;
  border-radius: 0;
  text-align: center;
}
.ea-input-number_wrap .ea-input-number_inner:focus {
  border-color: #409eff;
}
.ea-input-number_wrap .ea-input-number_inner::placeholder {
  color: #c0c4cc;
}
.ea-input-number_wrap .ea-input-number_inner.invalid {
  border-color: #f56c6c;
}
.ea-input-number_wrap .ea-input-number_inner.disabled {
  background-color: #eeeeee;
  color: #c0c4cc;
}
.ea-input-number_wrap .ea-input-number_inner.ea-input_clear ::before {
  content: "e9c3";
  display: block;
}
.ea-input-number_wrap .ea-input-number_inner:focus {
  border-color: #dcdfe6;
}
.ea-input-number_wrap .ea-input-number_inner.disabled {
  pointer-events: none;
  cursor: not-allowed;
  color: #c0c4cc;
  background-color: #f5f7fa;
}
.ea-input-number_wrap.focus {
  border: 1px solid #409eff;
}
.ea-input-number_wrap.focus .ea-input-number_sign {
  border-color: transparent;
}
.ea-input-number_wrap.disabled {
  pointer-events: none;
  cursor: not-allowed;
}
.ea-input-number_wrap.disabled .ea-input-number_sign,
.ea-input-number_wrap.disabled .ea-input-number_inner {
  color: #c0c4cc;
  border-color: #dcdfe6;
}
.ea-input-number_wrap.ea-input-number--medium .ea-input-number_sign {
  height: 1.75rem;
  width: 1.75rem;
}
.ea-input-number_wrap.ea-input-number--medium .ea-input-number_inner {
  height: 1.75rem;
  line-height: 1.75rem;
}
.ea-input-number_wrap.ea-input-number--small .ea-input-number_sign {
  height: 1.5rem;
  width: 1.5rem;
}
.ea-input-number_wrap.ea-input-number--small .ea-input-number_inner {
  height: 1.5rem;
  line-height: 1.5rem;
}
.ea-input-number_wrap.ea-input-number--mini .ea-input-number_sign {
  height: 1.25rem;
  width: 1.25rem;
}
.ea-input-number_wrap.ea-input-number--mini .ea-input-number_inner {
  height: 1.25rem;
  line-height: 1.25rem;
}
`;
function L(r, u) {
  this.dispatchEvent(new CustomEvent(r, {
    detail: u
  }));
}
var h, i, p, m, n, v, y, b, c, f;
class z extends A {
  constructor() {
    super();
    d(this, n);
    d(this, h);
    d(this, i);
    d(this, p);
    d(this, m);
    const e = this.attachShadow({ mode: "open" });
    e.innerHTML = `
            <div class="ea-input-number_wrap" part="container">
                <span class="ea-input-number_sign minus" part="minus-wrap">-</span>
                <input class="ea-input-number_inner" part="input" type="text" />
                <span class="ea-input-number_sign plus" part="plus-wrap">+</span>
            </div>
        `, g(this, h, e.querySelector(".ea-input-number_wrap")), g(this, i, e.querySelector(".ea-input-number_inner")), g(this, p, e.querySelector(".minus")), g(this, m, e.querySelector(".plus")), this.build(e, E);
  }
  // ------- value 值 -------
  // #region
  get value() {
    return Number(this.getAttribute("value")) || 0;
  }
  set value(e) {
    e = this.precision ? Number(e).toFixed(this.precision) : Number(e), this.setAttribute("value", e), t(this, i).value = e;
  }
  // #endregion
  // ------- end -------
  // ------- disabled 禁用 -------
  // #region
  get disabled() {
    return this.getAttrBoolean("disabled");
  }
  set disabled(e) {
    this.toggleAttr("disabled", e), t(this, i).disabled = e, t(this, h).classList.toggle("disabled", e), this.style.cursor = e ? "not-allowed" : "pointer";
  }
  // #endregion
  // ------- end -------
  // ------- readonly 只读 -------
  // #region
  get readonly() {
    return this.getAttrBoolean("readonly");
  }
  set readonly(e) {
    e && (t(this, i).readOnly = e);
  }
  // #endregion
  // ------- end -------
  // ------- step 加减的步长 -------
  // #region
  get step() {
    return this.getAttrNumber("step") || 1;
  }
  set step(e) {
    e && this.setAttribute("step", e);
  }
  // #endregion
  // ------- end -------
  // ------- step-strictly 严格步长 -------
  // #region
  get stepStrictly() {
    return this.getAttrBoolean("step-strictly");
  }
  set stepStrictly(e) {
    this.toggleAttr("step-strictly", e);
  }
  // #endregion
  // ------- end -------
  // ------- min/max 限制最大/最小值 -------
  // #region
  get min() {
    return this.getAttrNumber("min") || -1 / 0;
  }
  set min(e) {
    !Number.isNaN(e) || Number.isFinite(e) || this.setAttribute("min", e);
  }
  get max() {
    return this.getAttrNumber("max") || 1 / 0;
  }
  set max(e) {
    e && this.setAttribute("max", e);
  }
  // #endregion
  // ------- end -------
  // ------- precision 精度 -------
  // #region
  get precision() {
    const e = this.getAttrNumber("precision");
    return e < 0 || !Number.isInteger(e) ? 0 : e;
  }
  set precision(e) {
    e && this.setAttribute("precision", e);
  }
  // #endregion
  // ------- end -------
  // ------- size 按钮大小(medium、small、mini) -------
  // #region
  get sizeType() {
    return ["medium", "small", "mini"];
  }
  get size() {
    const e = this.getAttribute("size");
    return this.sizeType.includes(e) ? e : "medium";
  }
  set size(e) {
    this.setAttribute("size", e), t(this, h).classList.add(`ea-input-number--${e}`);
  }
  // #endregion
  // ------- end -------
  connectedCallback() {
    this.style.display = "inline-block", this.disabled = this.disabled, this.readonly = this.readonly, this.size = this.size, this.value = this.value, this.min !== -1 / 0 && (this.value = this.min), s(this, n, b).call(this), t(this, i).addEventListener("focus", (e) => {
      t(this, h).classList.add("focus"), s(this, n, f).call(this, "focus");
    }), t(this, i).addEventListener("blur", (e) => {
      if (t(this, h).classList.remove("focus"), this.stepStrictly) {
        const a = that.step, o = Number(t(that, i).value), l = o % a;
        o < 0 && l !== 0 ? t(that, i).value = o - l - a : o < 0 && l === 0 || l === 0 ? t(that, i).value = o : t(this, i).value = o - l + a;
      }
      s(this, n, b).call(this), s(this, n, f).call(this, "blur");
    }), t(this, p).addEventListener("click", () => {
      s(this, n, c).call(this), s(this, n, v).call(this, "minus", this.precision, "minus");
    }), t(this, m).addEventListener("click", () => {
      s(this, n, c).call(this), s(this, n, v).call(this, "plus", this.precision, "plus");
    }), t(this, p).addEventListener("mousedown", () => {
      s(this, n, c).call(this), s(this, n, y).call(this, "minus", this.precision);
    }), t(this, m).addEventListener("mousedown", () => {
      s(this, n, c).call(this), s(this, n, y).call(this, "plus", this.precision);
    }), t(this, i).addEventListener("input", () => {
      s(this, n, c).call(this), s(this, n, b).call(this), s(this, n, f).call(this, "change");
    });
  }
}
h = new WeakMap(), i = new WeakMap(), p = new WeakMap(), m = new WeakMap(), n = new WeakSet(), // 处理输入框加减事件
v = function(e, a, o) {
  if (this.getAttrBoolean("disabled")) return;
  const l = Number(t(this, i).value), _ = t(this, i).value.split(".")[1], w = e === "minus" ? l - this.step : l + this.step;
  a ? t(this, i).value = w.toFixed(a) : _ != null && _.length ? t(this, i).value = w.toFixed(_.length) : t(this, i).value = w, s(this, n, b).call(this), o && s(this, n, f).call(this, "change", w);
}, // 处理连加连减事件
y = function(e) {
  let a = setInterval(() => {
    s(this, n, v).call(this, e, this.precision), s(this, n, b).call(this);
  }, 100);
  this.addEventListener("mouseup", function() {
    clearInterval(a), a = null;
  });
}, b = function() {
  this.min === !1 && this.max === !1 || (this.min !== void 0 && t(this, i).value < this.min ? t(this, i).value = this.min : this.max !== void 0 && t(this, i).value > this.max && (t(this, i).value = this.max), t(this, p).classList.toggle("disabled", t(this, i).value == this.min), t(this, m).classList.toggle("disabled", t(this, i).value == this.max));
}, c = function() {
  isNaN(Number(t(this, i).value)) ? t(this, i).value = this.value : this.value = Number(t(this, i).value);
}, f = function(e, a = this.value) {
  L.call(this, e, {
    value: a
  });
};
window.customElements.get("ea-input-number") || window.customElements.define("ea-input-number", z);
export {
  z as EaInputNumber
};
