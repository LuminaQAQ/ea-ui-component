import { E as v } from "../core/EaBase.ts.js";
import { q as h, a as p, C, p as b } from "../core/decorator.js";
import { h as P } from "../utils/html.ts.js";
import { E as _ } from "../utils/Enum.ts.js";
import { c as g } from "../utils/bem.ts.js";
import "./ea-icon.js";
import { s as k } from "../css/ea-progress.style.js";
const u = g("ea-progress"), f = `
<svg viewBox="0 0 100 100">
    <circle class="${u.e("track")}" part="track" cx="50" cy="50" fill="none" stroke-dasharray="302px" stroke-dashoffset="0" />
    <circle class="${u.e("path")}" part="path" cx="50" cy="50" fill="none" stroke-dasharray="302px" stroke-dashoffset="0" />
</svg>
<section class="${u.e("percentage-wrapper")}" part="percentage">
    <slot class="${u.e("percentage")}"></slot>
</section>
`, y = g("ea-progress"), m = `
<svg viewBox="0 0 100 100">
    <mask id="myMask">
        <rect class="mask" width="100%" height="20%" fill="white" />
    </mask>
    <clipPath id="myClip">
        <rect class="mask" />
    </clipPath>
    <circle class="${y.e("track")}" part="track" cx="50" cy="50" fill="none" clip-path="url(#myClip)" />
    <circle class="${y.e("path")}" part="path" cx="50" cy="50" fill="none" clip-path="url(#myClip)" />
</svg>
<section class="${y.e("percentage-wrapper")}" part="percentage">
    <slot class="${y.e("percentage")}"></slot>
</section>
`;
class $ extends Event {
  constructor(e) {
    super("change", { bubbles: !0, composed: !0 }), this.detail = e;
  }
}
var w = Object.defineProperty, S = Object.getOwnPropertyDescriptor, r = (t, e, a, c) => {
  for (var i = c > 1 ? void 0 : c ? S(e, a) : e, l = t.length - 1, o; l >= 0; l--)
    (o = t[l]) && (i = (c ? o(e, a, i) : o(i)) || i);
  return c && i && w(e, a, i), i;
};
const x = "ea-progress", n = g(x), T = ["line", "circle", "dashboard"], E = ["success", "warning", "exception"], A = {
  success: "circle-check",
  warning: "triangle-exclamation",
  exception: "circle-xmark"
};
let s = class extends v {
  constructor() {
    super(...arguments), this.variant = "line", this.percentage = 0, this.status = "", this.strokeWidth = "8px", this.textInside = !1, this.indeterminate = !1, this.duration = 3, this.striped = !1, this.stripedFlow = !1, this.size = "126px", this.showText = !0, this.color = "";
  }
  updateContainerClasslist() {
    const t = n(
      {
        [this.status]: !!this.status,
        "text-inside": this.textInside,
        striped: this.striped
      },
      {
        [this.variant]: !0,
        indeterminate: this.indeterminate && this.variant === "line",
        "striped-flow": this.stripedFlow,
        "show-text": this.showText
      }
    );
    return this._container && (this._container.className = t), t;
  }
  /** 处理颜色变更，支持字符串、数组和函数三种格式 */
  _handleColorChange(t, e = this.percentage) {
    var a, c, i;
    if (!(!t || typeof t > "u"))
      if (Array.isArray(t)) {
        let l = t[0];
        for (let o = 0; o < t.length; o++) {
          const d = t[o];
          if (e <= d.percentage) {
            l = d;
            break;
          }
        }
        (a = this._path) == null || a.style.setProperty(
          "--ea-progress-path-color",
          l == null ? void 0 : l.color
        );
      } else typeof t == "string" ? (c = this._path) == null || c.style.setProperty("--ea-progress-path-color", t) : typeof t == "function" && ((i = this._path) == null || i.style.setProperty(
        "--ea-progress-path-color",
        t(e)
      ));
  }
  /** 更新状态文本或图标 */
  _updateStatusText() {
    ["success", "exception", "warning"].includes(this.status) && !this.textInside ? this._text.innerHTML = P(
      `<ea-icon class="${n.e("status")}" name="${A[this.status]}" part="status-icon"></ea-icon>`
    ) : this._text.textContent = this.percentage + "%";
  }
  /** 更新进度百分比相关的样式和事件 */
  _updatePercentage(t = this.percentage) {
    var c;
    if (t < 0) {
      this.percentage = 0;
      return;
    } else if (t > 100) {
      this.percentage = 100;
      return;
    }
    const e = this.querySelector("[data-percentage]"), a = {
      line: () => t + "%",
      circle: () => 302 * ((100 - t) / 100) + "px",
      dashboard: () => {
        const l = 49 - Number(this.strokeWidth.replace("px", "")) / 2, o = 2 * Math.PI * l, d = (100 - t) / 100;
        return this._path.style.strokeDasharray = o * (270 / 360) + "px", this._track.style.strokeDasharray = o * (270 / 360) + "px", o * (270 / 360) * d + "px";
      }
    };
    (c = this._container) == null || c.style.setProperty(
      "--ea-progress-percentage",
      a[this.variant]()
    ), this._updateStatusText(), e && (e.textContent = String(this.percentage)), this._handleColorChange(this.color, t), this.dispatchEvent(new $({ percentage: t }));
  }
  /** 根据 variant 重新渲染内部结构 */
  _render() {
    if (!this._container) return;
    const t = {
      line: this._lineTemplate(),
      circle: f,
      dashboard: m
    };
    this._container.innerHTML = t[this.variant], this.updateContainerClasslist();
  }
  /** 生成 line 类型的模板 */
  _lineTemplate() {
    return `
      <section class="${n.e("track")}" part="track">
        <section class="${n.e("path")}" part="path"></section>
      </section>
      <section class="${n.e("percentage-wrapper")}" part="percentage">
        <slot class="${n.e("percentage")}"></slot>
      </section>
    `;
  }
  html() {
    const t = {
      line: this._lineTemplate(),
      circle: f,
      dashboard: m
    };
    return `
      <div class="${this.updateContainerClasslist()}" part="container">
        ${t[this.variant]}
      </div>
    `;
  }
  $mount() {
    this.setAttribute("role", this.variant === "dashboard" ? "meter" : "progressbar"), this.setAttribute("aria-valuemin", "0"), this.setAttribute("aria-valuemax", "100");
    const t = this.getAttribute("color");
    t && !this.color && (this.color = t), this.updateContainerClasslist();
  }
};
r([
  h(n.cb())
], s.prototype, "_container", 2);
r([
  h(n.ce("track"))
], s.prototype, "_track", 2);
r([
  h(n.ce("path"))
], s.prototype, "_path", 2);
r([
  h(n.ce("percentage-wrapper"))
], s.prototype, "_percentageWrapper", 2);
r([
  h(n.ce("percentage"))
], s.prototype, "_text", 2);
r([
  p({
    type: _(T),
    default: "line",
    observer() {
      this._render(), this.updateContainerClasslist(), this._updatePercentage(), this.setAttribute("role", this.variant === "dashboard" ? "meter" : "progressbar");
    }
  })
], s.prototype, "variant", 2);
r([
  p({
    type: Number,
    default: 0,
    a11y: { ariaAttr: "aria-valuenow" },
    observer(t) {
      this._updatePercentage(t);
    }
  })
], s.prototype, "percentage", 2);
r([
  p({
    type: _(E),
    default: "",
    observer() {
      this.updateContainerClasslist(), this._updateStatusText();
    }
  })
], s.prototype, "status", 2);
r([
  p({
    type: String,
    default: "8px",
    observer(t) {
      var e;
      if (!CSS.supports("width", t))
        return console.warn(
          `[EaProgress] The width value ${t} is not supported.`
        );
      (e = this._container) == null || e.style.setProperty("--ea-progress-stroke-width", t);
    }
  })
], s.prototype, "strokeWidth", 2);
r([
  p({
    type: Boolean,
    default: !1,
    observer(t) {
      var e, a;
      try {
        t ? (e = this._path) == null || e.appendChild(this._text) : (a = this._percentageWrapper) == null || a.appendChild(this._text);
      } catch {
      }
      this.updateContainerClasslist();
    }
  })
], s.prototype, "textInside", 2);
r([
  p({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], s.prototype, "indeterminate", 2);
r([
  p({
    type: Number,
    default: 3,
    observer(t) {
      var e;
      (e = this._container) == null || e.style.setProperty(
        "--ea-progress-animation-duration",
        `${t}s`
      );
    }
  })
], s.prototype, "duration", 2);
r([
  p({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], s.prototype, "striped", 2);
r([
  p({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], s.prototype, "stripedFlow", 2);
r([
  p({
    type: String,
    default: "126px",
    observer(t) {
      var e;
      this.variant !== "line" && ((e = this._container) == null || e.style.setProperty("--ea-progress-size", t));
    }
  })
], s.prototype, "size", 2);
r([
  p({
    type: Boolean,
    default: !0,
    observer() {
      this.updateContainerClasslist();
    }
  })
], s.prototype, "showText", 2);
r([
  b({
    type: Object,
    default: "",
    observer(t) {
      this._handleColorChange(t, t);
    }
  })
], s.prototype, "color", 2);
s = r([
  C(x, { styles: [k] })
], s);
const D = s;
export {
  s as EaProgress,
  D as default
};
