var b = (i, a, e) => {
  if (!a.has(i))
    throw TypeError("Cannot " + e);
};
var t = (i, a, e) => (b(i, a, "read from private field"), e ? e.call(i) : a.get(i)), c = (i, a, e) => {
  if (a.has(i))
    throw TypeError("Cannot add the same private member more than once");
  a instanceof WeakSet ? a.add(i) : a.set(i, e);
}, h = (i, a, e, s) => (b(i, a, "write to private field"), s ? s.call(i, e) : a.set(i, e), e);
var f = (i, a, e) => (b(i, a, "access private method"), e);
import { B as _ } from "./Base.js";
import "./index3.js";
import "./ea-option.js";
import "./ea-option-gropu.js";
import "./ea-input.js";
import { t as y, w as A } from "./timeout.js";
const E = `
.ea-select_wrap {
  position: relative;
}
.ea-select_wrap .ea-select_input-wrap .ea-select_dropdown-icon {
  position: absolute;
  left: calc(100% - 24px);
  top: 50%;
  transform-origin: center;
  transform: translateY(-50%);
}
.ea-select_wrap .ea-select_input-wrap .ea-select_dropdown-icon.is-open {
  transform: translateY(-50%) rotate(180deg);
}
.ea-select_wrap .ea-select_dropdown-wrap {
  position: absolute;
  left: 0;
  bottom: -12px;
  transform: translateY(100%) scaleY(0);
  transform-origin: center top;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 2035;
}
.ea-select_wrap .ea-select_dropdown-wrap .ea-select_dropdown-empty {
  padding: 10px 0;
  margin: 0;
  text-align: center;
  color: #999;
  font-size: 14px;
}
.ea-select_wrap.is-open .ea-select_input-wrap .ea-select_dropdown-icon {
  transform: translateY(-50%) rotate(180deg);
}
.ea-select_wrap.is-open .ea-select_dropdown-wrap {
  transform: translateY(100%) scaleY(1);
}
.ea-select_wrap.is-disabled {
  pointer-events: none;
  cursor: not-allowed;
}
.ea-select_wrap.with-transition .ea-select_input-wrap .ea-select_dropdown-icon {
  transition: transform 0.3s;
}
.ea-select_wrap.with-transition .ea-select_dropdown-wrap {
  transition: transform 0.3s;
}
`;
var r, l, n, p, u, m, g;
class x extends _ {
  constructor() {
    super();
    // #endregion
    // ------- end -------
    c(this, m);
    c(this, r, void 0);
    c(this, l, void 0);
    c(this, n, void 0);
    c(this, p, void 0);
    c(this, u, void 0);
    const e = this.attachShadow({ mode: "open" });
    e.innerHTML = `
            <div class="ea-select_wrap" part="container">
                <div class="ea-select_input-wrap" part="input-wrap">
                    <ea-input type="text" part="input" readonly autocomplete="off"></ea-input>
                    <span class="ea-select_dropdown-icon" part="dropdown-icon-wrap">
                        <ea-icon part="icon" icon="icon-angle-down" color="#c0c4cc"></ea-icon>
                    </span>
                </div>
                <div class="ea-select_dropdown-wrap" part="dropdown-wrap">
                    <slot></slot>
                    <slot name="empty" class="ea-select_dropdown-empty" style="display: none;">
                        <p>暂无数据</p>
                    </slot>
                </div>
            </div>
        `, h(this, r, this.shadowRoot.querySelector(".ea-select_wrap")), h(this, l, this.shadowRoot.querySelector("ea-input")), h(this, n, this.shadowRoot.querySelector(".ea-select_dropdown-icon")), h(this, p, this.shadowRoot.querySelector(".ea-select_dropdown-wrap")), h(this, u, this.shadowRoot.querySelector(".ea-select_dropdown-empty")), this.build(e, E);
  }
  // ------- name 若与 form 组合使用，则 form 的返回值中. 该键名为该name -------
  // #region
  get name() {
    return this.getAttribute("name") || "select";
  }
  set name(e) {
    this.setAttribute("name", e);
  }
  // #endregion
  // ------- end -------
  // ------- width 输入框宽度 -------
  // #region
  get width() {
    return this.getAttribute("width") || "200px";
  }
  set width(e) {
    this.setAttribute("width", e), t(this, r).style.width = e;
  }
  // #endregion
  // ------- end -------
  // ------- value 选项值 -------
  // #region
  get value() {
    const e = this.selection;
    return this.multiple ? e.split(",") || [] : this.selection;
  }
  set value(e) {
    this.setAttribute("value", e), this.multiple ? this.selection = e.join(",") : this.selection = e;
  }
  // #endregion
  // ------- end -------
  // ------- selection 选中项 -------
  // #region
  get selection() {
    return this.getAttribute("selection") || "";
  }
  set selection(e) {
    this.setAttribute("selection", e), t(this, l).value = e;
  }
  // #endregion
  // ------- end -------
  // ------- palceholder 提示 -------
  // #region
  get placeholder() {
    return this.getAttribute("placeholder") || "";
  }
  set placeholder(e) {
    this.setAttribute("placeholder", e), t(this, l).placeholder = e;
  }
  // #endregion
  // ------- end -------
  // ------- disabled 禁用 -------
  // #region
  get disabled() {
    return this.getAttrBoolean("disabled") || !1;
  }
  set disabled(e) {
    this.toggleAttr("disabled", e), t(this, l).disabled = e;
  }
  // #endregion
  // ------- end -------
  // ------- clearable 是否可清除 -------
  // #region
  get clearable() {
    return this.getAttrBoolean("clearable") || !1;
  }
  set clearable(e) {
    if (this.setAttribute("clearable", e), e) {
      const s = t(this, n).querySelector("ea-icon");
      t(this, n).addEventListener("mouseenter", (d) => {
        s.icon = "icon-cancel-circled2";
      }), t(this, n).addEventListener("mouseleave", (d) => {
        s.icon = "icon-angle-down";
      }), t(this, n).addEventListener("click", (d) => {
        this.dispatchEvent(new CustomEvent("clear", {
          detail: {
            originValue: this.selection
          }
        })), this.querySelectorAll("ea-option").forEach((o) => {
          o.checked = !1;
        }), this.selection = "";
      });
    }
  }
  // #endregion
  // ------- end -------
  // ------- filterable 是否可搜索 -------
  // #region
  get filterable() {
    return this.getAttrBoolean("filterable") || !1;
  }
  set filterable(e) {
    this.setAttribute("filterable", e), t(this, l).readonly = e === !1, e && t(this, l).addEventListener("change", (s) => {
      const d = this.querySelectorAll("ea-option"), { value: o } = s.detail;
      d.forEach((w) => {
        w.style.display = w.value.includes(o) ? "block" : "none";
      });
      let v = Array.from(d).every((w) => w.style.display !== "block");
      t(this, u).style.display = v ? "block" : "none";
    });
  }
  // #endregion
  // ------- end -------
  // ------- multiple 是否多选 -------
  // #region
  get multiple() {
    return this.getAttrBoolean("multiple") || !1;
  }
  set multiple(e) {
    this.setAttribute("multiple", e);
  }
  // #endregion
  // ------- end -------
  // ------- is-invalid 是否校验失败 -------
  // #region
  get isInvalid() {
    return this.getAttrBoolean("is-invalid") || !1;
  }
  set isInvalid(e) {
    this.setAttribute("is-invalid", e), t(this, l).isInvalid = e;
  }
  connectedCallback() {
    this.setAttribute("data-ea-component", !0), t(this, p).style.width = this.width, this.name = this.name, this.width = this.width, this.selection = this.selection, this.placeholder = this.placeholder, this.disabled = this.disabled, this.clearable = this.clearable, this.filterable = this.filterable, this.multiple = this.multiple, f(this, m, g).call(this), t(this, l).addEventListener("focus", (e) => {
      t(this, r).classList.add("is-open"), this.dispatchEvent(new CustomEvent("visible-change", {
        detail: {
          visible: !0
        }
      }));
    }), t(this, l).addEventListener("blur", (e) => {
      y(() => {
        t(this, r).classList.remove("is-open");
      }, 100), this.dispatchEvent(new CustomEvent("visible-change", {
        detail: {
          visible: !1
        }
      }));
    }), A(t(this, r));
  }
}
r = new WeakMap(), l = new WeakMap(), n = new WeakMap(), p = new WeakMap(), u = new WeakMap(), m = new WeakSet(), g = function() {
  const e = this.querySelectorAll("ea-option");
  e.forEach((s) => {
    s.disabled || s.addEventListener("click", (d) => {
      if (this.multiple)
        if (s.checked = !s.checked, s.checked)
          this.selection = this.selection ? this.selection + "," + s.value : s.value;
        else {
          const o = this.selection.split(",");
          o.splice(o.indexOf(s.value), 1), this.selection = o.join(",");
        }
      else
        t(this, l).value = s.value, this.selection = s.value, e.forEach((o) => {
          o.checked = !1;
        }), s.checked = !0;
      this.dispatchEvent(new CustomEvent("change", {
        detail: {
          value: this.selection
        }
      }));
    });
  });
};
customElements.get("ea-select") || customElements.define("ea-select", x);
export {
  x as EaSelect
};
