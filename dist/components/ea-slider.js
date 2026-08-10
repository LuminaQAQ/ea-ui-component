import "./ea-input-number.js";
import "./ea-tooltip.js";
import "../core/EaBase.ts.js";
import { E as f } from "../core/EaFormAssociatedBase.ts.js";
import { q as p, a as h, l as u, C as y, p as b } from "../core/decorator.js";
import { E as g } from "../utils/Enum.ts.js";
import { h as v } from "../utils/html.ts.js";
import { s as w } from "../css/ea-slider.style.js";
import { c as x } from "../utils/bem.ts.js";
class d extends Event {
  constructor(e) {
    super("change", { bubbles: !0, cancelable: !0, composed: !0 }), this.detail = e;
  }
}
class c extends Event {
  constructor(e) {
    super("input", { bubbles: !0, cancelable: !0, composed: !0 }), this.detail = e;
  }
}
var M = Object.defineProperty, k = Object.getOwnPropertyDescriptor, i = (t, e, o, n) => {
  for (var r = n > 1 ? void 0 : n ? k(e, o) : e, l = t.length - 1, m; l >= 0; l--)
    (m = t[l]) && (r = (n ? m(e, o, r) : m(r)) || r);
  return n && r && M(e, o, r), r;
};
const _ = "ea-slider", a = x(_);
let s = class extends f {
  constructor() {
    super(...arguments), this._states = {
      isDragging: !1,
      startX: 0,
      startY: 0,
      isInputNumberDefined: !1
    }, this.label = "", this.value = 0, this.min = 0, this.max = 100, this.showStops = !1, this.step = 1, this.disabled = !1, this.vertical = !1, this.showTooltip = !0, this.placement = "top", this.showInput = !1, this.size = "", this.required = !1, this.marks = null, this.formatTooltip = (t) => t, this._onInputChange = (t) => {
      t.preventDefault(), t.stopImmediatePropagation();
      const e = parseFloat(t.detail.currentValue), o = Math.max(this.min, Math.min(this.max, e));
      o !== this.value && (this.value = o, this.dispatchEvent(new d({ value: this.value })));
    };
  }
  updateContainerClasslist() {
    const t = a(
      {
        [this.size]: !!this.size
      },
      {
        disabled: this.disabled,
        vertical: this.vertical,
        "show-tooltip": this.showTooltip,
        "show-stops": this.showStops,
        "show-input": this.showInput
      }
    );
    return this._container && (this._container.className = t), t;
  }
  html() {
    return `
      <label class='${a.e("form-label")}' part='form-label'></label>
      <div class='${a()}' part='container'>
        <div class='${a.e("runway")}' part='runway'>
          <div class='${a.e("rail")}' part='rail'></div>
          <div class='${a.e("bar")}' part='bar'></div>
          <ea-tooltip class='${a.e("trigger")}' part='trigger' flip="false" trigger="customized" placement="${this.placement}">
            <div class='${a.e("thumb")}' part='thumb' slot="reference"></div>
            <div class='${a.e("tooltip")}' part='tooltip'></div>
          </ea-tooltip>
          <div class='${a.e("marks")}' part='marks'></div>
        </div>
        <ea-input-number class='${a.e("input")}' part='input'></ea-input-number>
      </div>
    `;
  }
  /** 渲染 stops 和 mark-stop 节点到 rail 中 */
  _renderStops() {
    if (!this._rail) return;
    const t = [], e = (this.max - this.min) / this.step + 1;
    if (this.showStops)
      for (let r = 0; r < e; r++) {
        const l = this.min + this.step * r, m = (l - this.min) / (this.max - this.min) * 100;
        t.push({
          value: l,
          percentage: m,
          type: "stop",
          className: a.e("stop"),
          part: "stop"
        });
      }
    if (this.marks)
      for (const r in this.marks) {
        const l = parseFloat(r);
        if (isNaN(l) || l < this.min || l > this.max) continue;
        const m = (l - this.min) / (this.max - this.min) * 100;
        t.push({
          value: l,
          percentage: m,
          type: "mark-stop",
          className: `${a.e("stop")} ${a.e("mark-stop")}`,
          part: "stop mark-stop",
          label: this.marks[r]
        });
      }
    t.sort((r, l) => r.value - l.value);
    const o = this.vertical ? "top" : "left", n = t.map(
      (r) => `<div class="${r.className}" part="${r.part}" style="${o}: ${r.percentage}%;"></div>`
    );
    this._rail.innerHTML = v(n.join(""));
  }
  /** 渲染 mark 标签到 marks 容器中 */
  _renderMarkLabels() {
    if (!this._marks) return;
    if (!this.marks) {
      this._marks.innerHTML = "";
      return;
    }
    const t = this.vertical ? "top" : "left";
    let e = "";
    for (const o in this.marks) {
      const n = parseFloat(o);
      if (isNaN(n) || n < this.min || n > this.max) continue;
      const r = (n - this.min) / (this.max - this.min) * 100, l = this.marks[o];
      e += `
        <div class='${a.e("mark")}' style="${t}: ${r}%;">
          <div class='${a.e("mark-label")}'>${l}</div>
        </div>
      `;
    }
    this._marks.innerHTML = v(e);
  }
  /** 统一渲染 stops 和 marks */
  _renderMarks() {
    this._renderStops(), this._renderMarkLabels();
  }
  /**
   * 根据步长精度修正数值
   * @param value - 需要修正精度的数值
   * @returns 修正精度后的数值
   */
  _fixPrecision(t) {
    const e = this.step.toString(), o = e.includes(".") ? e.split(".")[1].length : 0;
    return parseFloat(t.toFixed(o));
  }
  /**
   * 根据鼠标位置计算滑块值
   * @param position - 鼠标的 clientX 或 clientY 坐标
   * @returns 计算并修正精度后的滑块值
   */
  _getValueFromPosition(t) {
    const e = this._rail.getBoundingClientRect(), o = this.vertical ? (t - e.top) / e.height : (t - e.left) / e.width, n = Math.max(0, Math.min(1, o)), r = this.min + n * (this.max - this.min), l = Math.round(r / this.step) * this.step;
    return this._fixPrecision(
      Math.max(this.min, Math.min(this.max, l))
    );
  }
  /** 更新滑块位置、bar 宽度、tooltip 内容、输入框值及容器类名 */
  _updateSlider() {
    if (!this._trigger) return;
    const t = this.value, e = (t - this.min) / (this.max - this.min) * 100;
    this.vertical ? (this._trigger.style.top = `${e}%`, this._trigger.style.left = "50%", this._bar.style.width = "", this._bar.style.height = `${e}%`) : (this._trigger.style.left = `${e}%`, this._trigger.style.top = "50%", this._bar.style.width = `${e}%`, this._bar.style.height = ""), this._tooltip.textContent = String(this.formatTooltip(t)), this.showInput && this._input && (this._input.value = t, this._input.min = this.min, this._input.max = this.max, this._input.step = this.step), this.updateContainerClasslist();
  }
  /**
   * 处理 showInput 属性变化，管理输入框事件监听
   * @param newVal - showInput 的新值
   */
  async _handleShowInputChange(t) {
    var e;
    this._states.isInputNumberDefined || (await customElements.whenDefined("ea-input-number"), this._states.isInputNumberDefined = !0), (e = this._inputAbortController) == null || e.abort(), this._updateSlider(), t && (this._inputAbortController = new AbortController(), this._input.addEventListener("ea-change", this._onInputChange, {
      signal: this._inputAbortController.signal
    }));
  }
  _onMouseDown(t) {
    if (this.disabled) return;
    t.preventDefault(), t.stopPropagation(), this._states.isDragging = !0, this._states.startX = t.clientX, this._states.startY = t.clientY, this._trigger.toggleAttribute("visible", !0);
    const e = this._getValueFromPosition(
      this.vertical ? t.clientY : t.clientX
    );
    this.value = e, this.dispatchEvent(new c({ value: this.value }));
  }
  _onThumbMouseDown(t) {
    if (this.disabled) return;
    t.preventDefault(), t.stopPropagation(), this._states.isDragging = !0, this._states.startX = t.clientX, this._states.startY = t.clientY, this._trigger.toggleAttribute("visible", !0);
    const e = this._getValueFromPosition(
      this.vertical ? t.clientY : t.clientX
    );
    this.value = e, this.dispatchEvent(new c({ value: this.value }));
  }
  _onMouseMove(t) {
    if (!this._states.isDragging || this.disabled) return;
    t.preventDefault(), t.stopPropagation();
    const e = this._getValueFromPosition(
      this.vertical ? t.clientY : t.clientX
    );
    this.value = e, this.dispatchEvent(new c({ value: this.value }));
  }
  _onMouseUp() {
    this._states.isDragging && (this._states.isDragging = !1, this._trigger.toggleAttribute("visible", !1), this.dispatchEvent(new d({ value: this.value })));
  }
  _onKeyDown(t) {
    if (this.disabled) return;
    let e = null;
    const o = this.step * 10;
    switch (t.key) {
      case "ArrowRight":
      case "ArrowUp":
        t.preventDefault(), e = this._fixPrecision(
          Math.min(this.max, this.value + this.step)
        );
        break;
      case "ArrowLeft":
      case "ArrowDown":
        t.preventDefault(), e = this._fixPrecision(
          Math.max(this.min, this.value - this.step)
        );
        break;
      case "Home":
        t.preventDefault(), e = this.min;
        break;
      case "End":
        t.preventDefault(), e = this.max;
        break;
      case "PageUp":
        t.preventDefault(), e = this._fixPrecision(Math.min(this.max, this.value + o));
        break;
      case "PageDown":
        t.preventDefault(), e = this._fixPrecision(Math.max(this.min, this.value - o));
        break;
      default:
        return;
    }
    e !== null && e !== this.value && (this.value = e, this._trigger.toggleAttribute("visible", !0), this.dispatchEvent(new c({ value: this.value })), this.dispatchEvent(new d({ value: this.value })));
  }
  _onBlur() {
    this._trigger.toggleAttribute("visible", !1);
  }
  _onThumbMouseEnter() {
    this.disabled || this._trigger.toggleAttribute("visible", !0);
  }
  _onThumbMouseLeave() {
    this.disabled || this._states.isDragging || this._trigger.toggleAttribute("visible", !1);
  }
  get validationTarget() {
    return this._input;
  }
  updateValidity() {
    const t = this.value !== null && this.value !== void 0;
    this.required && !t ? this.internals.setValidity({ valueMissing: !0 }, "请设置一个值", this) : this.internals.setValidity({}, "", this);
  }
  checkValidity() {
    return this.updateValidity(), this.internals.validity.valid;
  }
  reportValidity() {
    return this.updateValidity(), this.internals.reportValidity();
  }
  $mount() {
    this.setAttribute("role", "slider"), this.tabIndex = 0, this._updateSlider();
  }
  $beforeUnmount() {
    var t;
    (t = this._inputAbortController) == null || t.abort();
  }
};
i([
  p(a.ce("form-label"))
], s.prototype, "_label", 2);
i([
  p(a.cb())
], s.prototype, "_container", 2);
i([
  p(a.ce("rail"))
], s.prototype, "_rail", 2);
i([
  p(a.ce("bar"))
], s.prototype, "_bar", 2);
i([
  p(a.ce("trigger"))
], s.prototype, "_trigger", 2);
i([
  p(a.ce("thumb"))
], s.prototype, "_thumb", 2);
i([
  p(a.ce("tooltip"))
], s.prototype, "_tooltip", 2);
i([
  p(a.ce("marks"))
], s.prototype, "_marks", 2);
i([
  p(a.ce("input"))
], s.prototype, "_input", 2);
i([
  h({
    type: String,
    default: "",
    a11y: {
      ariaAttr: "aria-label",
      map: (t) => t || null
    },
    observer(t) {
      this._label && (this._label.textContent = t);
    }
  })
], s.prototype, "label", 2);
i([
  h({
    type: Number,
    default: 0,
    a11y: { ariaAttr: "aria-valuenow" },
    observer(t) {
      const e = Math.max(this.min, Math.min(this.max, t));
      this.setValue(String(e)), this._updateSlider();
    }
  })
], s.prototype, "value", 2);
i([
  h({
    type: Number,
    default: 0,
    a11y: { ariaAttr: "aria-valuemin" },
    observer() {
      this._updateSlider();
    }
  })
], s.prototype, "min", 2);
i([
  h({
    type: Number,
    default: 100,
    a11y: { ariaAttr: "aria-valuemax" },
    observer() {
      this._updateSlider();
    }
  })
], s.prototype, "max", 2);
i([
  h({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist(), this._renderStops();
    }
  })
], s.prototype, "showStops", 2);
i([
  h({
    type: Number,
    default: 1,
    observer() {
      this._updateSlider();
    }
  })
], s.prototype, "step", 2);
i([
  h({
    type: Boolean,
    default: !1,
    a11y: {
      ariaAttr: "aria-disabled",
      map: (t) => String(t)
    },
    observer() {
      this.updateContainerClasslist();
    }
  })
], s.prototype, "disabled", 2);
i([
  h({
    type: Boolean,
    default: !1,
    a11y: {
      ariaAttr: "aria-orientation",
      map: (t) => t ? "vertical" : null
    },
    observer() {
      this._updateSlider();
    }
  })
], s.prototype, "vertical", 2);
i([
  h({
    type: Boolean,
    default: !0,
    observer() {
      this._updateSlider();
    }
  })
], s.prototype, "showTooltip", 2);
i([
  h({
    type: g([
      "top",
      "top-start",
      "top-end",
      "bottom",
      "bottom-start",
      "bottom-end",
      "left",
      "left-start",
      "left-end",
      "right",
      "right-start",
      "right-end"
    ]),
    default: "top",
    observer(t) {
      this._trigger && this._trigger.setAttribute("placement", t);
    }
  })
], s.prototype, "placement", 2);
i([
  h({
    type: Boolean,
    default: !1,
    observer(t) {
      this._handleShowInputChange(t);
    }
  })
], s.prototype, "showInput", 2);
i([
  h({
    type: g(["large", "default", "small"]),
    default: "",
    observer(t) {
      this.updateContainerClasslist(), this.showInput && this._input && this._input.setAttribute("size", t);
    }
  })
], s.prototype, "size", 2);
i([
  h({
    type: Boolean,
    default: !1
  })
], s.prototype, "required", 2);
i([
  b({
    type: Object,
    default: null,
    observer() {
      this._renderMarks();
    }
  })
], s.prototype, "marks", 2);
i([
  b({
    type: Function,
    default: (t) => t,
    rawFunction: !0,
    observer() {
      this._updateSlider();
    }
  })
], s.prototype, "formatTooltip", 2);
i([
  u("mousedown", a.ce("rail"))
], s.prototype, "_onMouseDown", 1);
i([
  u("mousedown", a.ce("thumb"))
], s.prototype, "_onThumbMouseDown", 1);
i([
  u("mousemove", "document")
], s.prototype, "_onMouseMove", 1);
i([
  u("mouseup", "document")
], s.prototype, "_onMouseUp", 1);
i([
  u("keydown")
], s.prototype, "_onKeyDown", 1);
i([
  u("blur")
], s.prototype, "_onBlur", 1);
i([
  u("mouseenter", a.ce("thumb"))
], s.prototype, "_onThumbMouseEnter", 1);
i([
  u("mouseleave", a.ce("thumb"))
], s.prototype, "_onThumbMouseLeave", 1);
s = i([
  y(_, { styles: [w] })
], s);
export {
  s as EaSlider
};
