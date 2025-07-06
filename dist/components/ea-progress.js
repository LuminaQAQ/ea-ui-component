var y = (s) => {
  throw TypeError(s);
};
var x = (s, a, t) => a.has(s) || y("Cannot " + t);
var e = (s, a, t) => (x(s, a, "read from private field"), t ? t.call(s) : a.get(s)), l = (s, a, t) => a.has(s) ? y("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(s) : a.set(s, t), p = (s, a, t, g) => (x(s, a, "write to private field"), g ? g.call(s, t) : a.set(s, t), t), c = (s, a, t) => (x(s, a, "access private method"), t);
import { B as u } from "./Base.js";
import "./index3.js";
const $ = `
.ea-progress_wrap {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  line-height: 1;
  height: 1rem;
}
.ea-progress_wrap .ea-progress_track,
.ea-progress_wrap .ea-progress_path {
  height: 0.5rem;
  line-height: 1;
  background-color: rgb(235, 238, 245);
  border-radius: 999px;
}
.ea-progress_wrap .ea-progress_track {
  width: 100%;
}
.ea-progress_wrap .ea-progress_track .ea-progress_path {
  box-sizing: border-box;
  padding-right: 0.5rem;
  color: aliceblue;
  font-size: 0.8rem;
  text-align: right;
  width: 0%;
  background-color: #409eff;
  transition: width 0.2s;
}
.ea-progress_wrap .ea-progress_text {
  margin-left: 0.5rem;
  font-size: 0.8rem;
  width: 3rem;
}
.ea-progress_wrap .ea-progress_text--circle,
.ea-progress_wrap .ea-progress_text--dashboard {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.ea-progress_wrap svg circle {
  stroke-width: 4px;
  transform-origin: center center;
  transition: stroke-dashoffset 0.2s;
}
.ea-progress_wrap svg .track--circle,
.ea-progress_wrap svg .path--circle {
  transform: rotate(-90deg);
}
.ea-progress_wrap svg .track--dashboard,
.ea-progress_wrap svg .path--dashboard {
  transform: rotate(161deg);
}
`, S = {
  dashboard: `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle class="track--dashboard" cx="50" cy="50" r="40" fill="none" stroke-dasharray="252px" stroke="aliceblue"
            stroke-width="4px" stroke-dashoffset="100" stroke-linecap="round" />
        <circle class="path--dashboard" cx="50" cy="50" r="40" fill="none" stroke-dasharray="252px" stroke="rgb(32, 160, 255)" stroke-width="4px"
            stroke-dashoffset="252" stroke-linecap="round" />
    </svg>
    <span class="ea-progress_text--dashboard"></span>
    `,
  circle: `
    <svg viewBox="0 0 100 100">
        <circle class="track--circle" cx="50" cy="50" r="48" fill="none" stroke="aliceblue" stroke-width="4" stroke-dasharray="302px" stroke-dashoffset="0" />
        <circle class="path--circle" cx="50" cy="50" r="48" fill="none" stroke="rgb(32, 160, 255)" stroke-width="4" stroke-dasharray="302px" stroke-dashoffset="0"  stroke-linecap="round" />
    </svg>
    <span class="ea-progress_text--circle"></span>
    `
};
var o, n, r, h, i, f, w, d, k, b;
class T extends u {
  constructor() {
    super();
    l(this, i);
    l(this, o);
    l(this, n);
    l(this, r);
    l(this, h);
    const t = this.attachShadow({ mode: "open" });
    t.innerHTML = `
            <div class="ea-progress_wrap" part="container">
                <section class="ea-progress_track" part="track-wrap">
                    <section class="ea-progress_path" part="path"></section>
                </section>
                <section class="ea-progress_text" part="text-wrap"></section>
            </div>
        `, p(this, o, t.querySelector(".ea-progress_wrap")), p(this, n, t.querySelector(".ea-progress_track")), p(this, r, t.querySelector(".ea-progress_path")), p(this, h, t.querySelector(".ea-progress_text")), this.build(t, $);
  }
  // ------- type 进度条类型 -------
  // #region
  get type() {
    return this.getAttribute("type");
  }
  set type(t) {
    if (t)
      switch (this.setAttribute("type", t), this.type) {
        case "circle":
          c(this, i, k).call(this, "circle");
          break;
        case "dashboard":
          c(this, i, k).call(this, "dashboard");
          break;
      }
  }
  // #endregion
  // ------- end -------
  // ------- percentage 进度百分比 -------
  // #region
  get percentage() {
    return this.getAttribute("percentage") || 0;
  }
  set percentage(t) {
    if (!isNaN(Number(t)))
      switch (Number(t) < 0 ? t = 0 : Number(t) > 100 && (t = 100), this.setAttribute("percentage", t), (this.textInside || this.type === "dashboard" || this.type === "circle") && (e(this, h).innerHTML = `${t}%`), this.type) {
        case "circle": {
          e(this, r).style.strokeDashoffset = `${c(this, i, f).call(this, t)}px`;
          break;
        }
        case "dashboard": {
          e(this, r).style.strokeDashoffset = `${c(this, i, w).call(this, t)}px`;
          break;
        }
        default: {
          e(this, r).style.width = `${t}%`, this.textInside && c(this, i, b).call(this, t);
          break;
        }
      }
  }
  // #endregion
  // ------- end -------
  // ------- status 进度条状态样式 -------
  // #region
  // 样式配置
  get statusList() {
    return {
      success: {
        icon: "icon-ok-circled",
        color: "#67c23a"
      },
      warning: {
        icon: "icon-attention-circled",
        color: "#e6a23c"
      },
      exception: {
        icon: "icon-cancel-circled",
        color: "#f56c6c"
      },
      primary: {}
    };
  }
  get status() {
    return this.getAttribute("status") || "primary";
  }
  set status(t) {
    switch (this.setAttribute("status", t), this.type) {
      case "circle":
        c(this, i, d).call(this, t, "ea-progress_text--circle"), e(this, r).style.stroke = this.statusList[t].color;
        break;
      case "dashboard":
        c(this, i, d).call(this, t, "ea-progress_text--dashboard"), e(this, r).style.stroke = this.statusList[t].color;
        break;
      default:
        c(this, i, d).call(this, t, "ea-progress_text"), e(this, r).style.backgroundColor = this.statusList[t].color;
        break;
    }
  }
  // #endregion
  // ------- end -------
  // ------- text-inside 进度文字内显 -------
  // #region
  get textInside() {
    return this.getAttrBoolean("text-inside");
  }
  set textInside(t) {
    this.type === "circle" || !t || (this.setAttribute("text-inside", t), c(this, i, b).call(this, t));
  }
  // #endregion
  // ------- end -------
  // ------- stroke-width 进度条高度 -------
  // #region
  get strokeWidth() {
    return this.getAttribute("stroke-width");
  }
  set strokeWidth(t) {
    t = t ? Number(t) : 4, this.toggleAttr("stroke-width", t), this.type === "circle" || this.type === "dashboard" ? (e(this, n).style.strokeWidth = `${t}px`, e(this, r).style.strokeWidth = `${t}px`) : (t = t + 4, e(this, n).style.height = `${t}px`, e(this, n).style.lineHeight = `${t}px`, e(this, r).style.height = `${t}px`, e(this, r).style.lineHeight = `${t}px`, e(this, o).style.height = `${t}px`, e(this, o).style.lineHeight = `${t}px`);
  }
  connectedCallback() {
    this.type = this.type, this.percentage = this.percentage, this.status = this.status, this.textInside = this.textInside, this.strokeWidth = this.strokeWidth;
  }
}
o = new WeakMap(), n = new WeakMap(), r = new WeakMap(), h = new WeakMap(), i = new WeakSet(), f = function(t) {
  return 302 * (100 - Number(t)) / 100;
}, w = function(t) {
  return 152 * (100 - Number(t)) / 100 + 100;
}, // 状态处理
d = function(t, g) {
  !this.type && this.textInside || this.type === "dashboard" || this.type === "circle" ? e(this, h).innerText = `${this.percentage}%` : e(this, h).innerText = "", e(this, h).className = `${g} ${this.statusList[t].icon || ""}`, e(this, h).style.color = this.statusList[t].color;
}, // #endregion
// ------- end -------
k = function(t) {
  e(this, o).style.height = "126px", e(this, o).style.width = "126px", e(this, o).innerHTML = S[t];
  const g = e(this, o).querySelector(`circle[class="track--${t}"]`), _ = e(this, o).querySelector(`circle[class="path--${t}"]`), m = e(this, o).querySelector(`span[class="ea-progress_text--${t}"]`);
  p(this, n, g), p(this, r, _), p(this, h, m);
}, b = function(t) {
  t ? (e(this, h).style.display = "none", e(this, r).innerText = `${this.percentage}%`) : (e(this, h).style.display = "block", e(this, r).innerText = "");
};
customElements.get("ea-progress") || customElements.define("ea-progress", T);
export {
  T as EaProgress
};
