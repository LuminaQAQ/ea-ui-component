import { E as S } from "../core/EaBase.ts.js";
import { q as c, a as f, C as P, l as v } from "../core/decorator.js";
import { E as C } from "../utils/Enum.ts.js";
import { s as N } from "../css/ea-tour.style.js";
import { c as $ } from "../utils/bem.ts.js";
import { h as I } from "../utils/html.ts.js";
import "./ea-icon.js";
import "./ea-button.js";
import { s as q } from "../css/ea-tour-step.style.js";
var D = Object.defineProperty, O = Object.getOwnPropertyDescriptor, u = (t, e, o, i) => {
  for (var s = i > 1 ? void 0 : i ? O(e, o) : e, d = t.length - 1, a; d >= 0; d--)
    (a = t[d]) && (s = (i ? a(e, o, s) : a(s)) || s);
  return i && s && D(e, o, s), s;
};
const T = "ea-tour", x = $(T), W = [
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
], j = (t, e = 0) => {
  const o = t.getBoundingClientRect();
  return o.top > 0 && o.left > 0 && o.bottom <= window.innerHeight - e && o.right <= window.innerWidth - e;
};
let l = class extends S {
  constructor() {
    super(...arguments), this._currentChangeAbortController = null, this._appendHandled = !1, this._states = {
      isChildrenLoaded: !1,
      isCenter: !1
    }, this.appendTo = "body", this.visible = !1, this.gap = 6, this.current = 0, this.mask = !0, this.variant = "default", this.placement = "bottom";
  }
  /** 更新容器类名 */
  updateContainerClasslist() {
    const t = x(
      {},
      {
        visible: this.visible,
        mask: this.mask,
        center: this._states.isCenter
      }
    );
    return this._container.className = t, t;
  }
  /** 渲染模板 */
  html() {
    return `
      <div class='${x()}'>
        <svg class='ea-tour__svg'>
          <defs>
            <mask id="reverseMask">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              <rect class="ea-tour__hollow" part="hollow" x="50" y="50" width="100px" height="100px" fill="black" />
            </mask>
          </defs>
          <rect class='ea-tour__mask' x="0" y="0" width="100%" height="100%" mask="url(#reverseMask)"></rect>
          <rect class="ea-tour__divider top-mask" x="0" y="0" width="100%" height="50px"></rect>
          <rect class="ea-tour__divider right-mask" x="150px" y="0" width="100%" height="100%"></rect>
          <rect class="ea-tour__divider bottom-mask" x="0" y="150px" width="100%" height="100%"></rect>
          <rect class="ea-tour__divider left-mask" x="0" y="0" width="50px" height="100%"></rect>
        </svg>
      </div>
      <div class="ea-tour__content">
        <slot></slot>
      </div>
    `;
  }
  /** 将组件挂载到指定容器 */
  _handleAppendTo(t) {
    if (this._appendHandled) return;
    const e = document.querySelector(t);
    e || console.warn(`[EaTour] append-to ${t} not found.`, this), e && e !== this.parentElement ? (this._appendHandled = !0, e.appendChild(this)) : e || (this._appendHandled = !0, document.body.appendChild(this));
  }
  /** 处理居中显示模式 */
  _handleCenterPosition() {
    const t = [
      ...this.querySelectorAll("ea-tour-step")
    ];
    this._states.isCenter = !0, t[this.current].setAttribute("center", "true"), this._hollow.style.width = "0px", this._hollow.style.height = "0px", this._hollow.setAttribute("x", "0px"), this._hollow.setAttribute("y", "0px"), this._topMask.setAttribute("height", "100%"), this._rightMask.setAttribute("x", "0"), this._bottomMask.setAttribute("y", "0"), this._leftMask.setAttribute("width", "100%"), this.updateContainerClasslist();
  }
  /**
   * 更新步骤弹出位置
   * @param target - 目标元素
   * @param step - 步骤元素
   */
  _updateStepPosition(t, e) {
    var k;
    const { width: o, height: i, x: s, y: d, top: a, bottom: y, left: p } = t.getBoundingClientRect(), r = this.gap * 2, _ = e.clientWidth || e.offsetWidth || 520, m = e.clientHeight || e.offsetHeight || 0, B = window.innerWidth, H = window.innerHeight, L = {
      top: {
        top: a - m - r,
        left: p - _ / 2 + r
      },
      "top-start": {
        top: a - m - r,
        left: p - r
      },
      "top-end": {
        top: a - m - r,
        left: p - _ + o + r
      },
      right: {
        top: a - r - m / 2 + i / 2,
        left: p + o + r
      },
      "right-start": {
        top: a - r,
        left: p + o + r
      },
      "right-end": {
        top: a - m / 2 - r,
        left: p + o + r
      },
      bottom: {
        top: y + r,
        left: p - _ / 2 + r
      },
      "bottom-start": {
        top: y + r,
        left: p - r
      },
      "bottom-end": {
        top: y + r,
        left: p - _ + o + r
      },
      left: {
        top: a - r - m / 2 + i / 2,
        left: p - _ - r * 2
      },
      "left-start": {
        top: a - r,
        left: p - _ - r * 2
      },
      "left-end": {
        top: a - m / 2 - r,
        left: p - _ - r * 2
      }
    }, E = e.placement || ((k = e.getAttribute) == null ? void 0 : k.call(e, "placement")) || this.placement, w = L[E];
    if (!w) {
      console.warn(`[EaTourStep] placement ${E} is not supported.`);
      return;
    }
    let b = Number(w.top), g = Number(w.left);
    b < 0 ? b = Math.max(b, d + r + i) : b + m > H && (b = Math.min(b, d - m - r)), g < 0 ? g = Math.max(g, s + o + r) : g + _ > B && (g = Math.min(g, s - _ - r)), e.style.left = `${g}px`, e.style.top = `${b}px`;
  }
  /**
   * 更新镂空区域位置
   * @param current - 当前步骤索引
   */
  _updateHollowPosition(t = this.current) {
    const e = [
      ...this.querySelectorAll("ea-tour-step")
    ], o = this.gap / 2, i = e[t].getAttribute("target"), s = document.querySelector(
      i
    );
    if (e[t].removeAttribute("center"), this._states.isCenter = !1, i) {
      if (!s)
        return console.warn(
          `[EaTour] target ${i} not found`,
          e[t]
        );
    } else return this._handleCenterPosition();
    j(s) || window.scrollTo({
      top: s.getBoundingClientRect().top
    });
    const { width: d, height: a, x: y, y: p, right: r, bottom: _ } = s.getBoundingClientRect();
    this._hollow.style.width = `${d + this.gap}px`, this._hollow.style.height = `${a + this.gap}px`, this._hollow.setAttribute("x", `${y - o}px`), this._hollow.setAttribute("y", `${p - o}px`), this._topMask.setAttribute("height", `${p - o}px`), this._rightMask.setAttribute("x", `${r + o}px`), this._bottomMask.setAttribute("y", `${_ + o}px`), this._leftMask.setAttribute("width", `${y - o}px`), this._updateStepPosition(s, e[t]);
  }
  /** 更新所有步骤的指示器 */
  _updateStepIndicators() {
    const t = [...this.querySelectorAll("ea-tour-step")];
    t.forEach((e) => {
      typeof e.updateIndicators == "function" && e.updateIndicators(t);
    });
  }
  async _handleSlotChange() {
    await customElements.whenDefined("ea-tour-step"), this._updateStepIndicators();
  }
  $mount() {
    var e;
    this._handleAppendTo(this.appendTo), this.updateContainerClasslist();
    const t = () => {
      this.emit("ea-tour-change", {
        detail: { current: this.current }
      });
    };
    (e = this._abortController) == null || e.abort(), this._abortController = new AbortController(), this.addEventListener(
      "ea-close",
      () => {
        this.visible = !1;
      },
      { signal: this._abortController.signal }
    ), this.addEventListener(
      "ea-tour-step-next",
      (o) => {
        o.preventDefault(), o.stopImmediatePropagation(), o.stopPropagation(), this.current++, t();
      },
      { signal: this._abortController.signal }
    ), this.addEventListener(
      "ea-tour-step-previous",
      (o) => {
        o.preventDefault(), o.stopImmediatePropagation(), o.stopPropagation(), this.current--, t();
      },
      { signal: this._abortController.signal }
    ), this.addEventListener(
      "ea-show",
      () => {
        var i;
        const o = [...this.querySelectorAll("ea-tour-step")];
        if (o[this.current]) {
          const s = (i = o[this.current].shadowRoot) == null ? void 0 : i.querySelector(".ea-tour-step");
          s && s.focus();
        }
      },
      { signal: this._abortController.signal }
    ), this.addEventListener(
      "ea-tour-step-finish",
      () => {
        this.visible = !1, this.emit("ea-tour-finish");
      },
      { signal: this._abortController.signal }
    );
  }
  $beforeUnmount() {
    var t, e;
    (t = this._abortController) == null || t.abort(), (e = this._currentChangeAbortController) == null || e.abort(), this._currentChangeAbortController = null;
  }
};
u([
  c(x.cb())
], l.prototype, "_container", 2);
u([
  c(".ea-tour__hollow")
], l.prototype, "_hollow", 2);
u([
  c(".ea-tour__divider.top-mask")
], l.prototype, "_topMask", 2);
u([
  c(".ea-tour__divider.right-mask")
], l.prototype, "_rightMask", 2);
u([
  c(".ea-tour__divider.bottom-mask")
], l.prototype, "_bottomMask", 2);
u([
  c(".ea-tour__divider.left-mask")
], l.prototype, "_leftMask", 2);
u([
  f({
    type: String,
    default: "body",
    observer(t) {
      this._handleAppendTo(t);
    }
  })
], l.prototype, "appendTo", 2);
u([
  f({
    type: Boolean,
    default: !1,
    observer(t) {
      var e;
      if (this._states.isChildrenLoaded || customElements.whenDefined("ea-tour-step").then(() => {
        this._states.isChildrenLoaded = !0;
      }), (e = this._currentChangeAbortController) == null || e.abort(), this.current = 0, t) {
        this._currentChangeAbortController = new AbortController();
        const o = () => {
          this._updateHollowPosition(this.current);
        };
        this.mask && (document.body.style.overflow = "hidden"), this._updateHollowPosition(this.current), window.addEventListener("resize", o, {
          signal: this._currentChangeAbortController.signal
        }), window.addEventListener("scroll", o, {
          signal: this._currentChangeAbortController.signal
        });
      } else
        this.mask && (document.body.style.overflow = "auto");
      this.updateContainerClasslist();
    }
  })
], l.prototype, "visible", 2);
u([
  f({
    type: Number,
    default: 6
  })
], l.prototype, "gap", 2);
u([
  f({
    type: Number,
    default: 0,
    observer(t) {
      this._states.isChildrenLoaded || customElements.whenDefined("ea-tour-step").then(() => {
        this._states.isChildrenLoaded = !0;
      });
      const e = [
        ...this.querySelectorAll("ea-tour-step")
      ];
      if (e.length !== 0) {
        if (t < 0) {
          this.current = 0;
          return;
        } else if (t >= e.length) {
          this.visible = !1;
          return;
        }
        e.forEach((o, i) => {
          o.style.setProperty(
            "--ea-tour-step-visible",
            i === t ? "block" : "none"
          );
        }), this._updateHollowPosition(t);
      }
    }
  })
], l.prototype, "current", 2);
u([
  f({
    type: Boolean,
    default: !0,
    observer() {
      this.updateContainerClasslist();
    }
  })
], l.prototype, "mask", 2);
u([
  f({
    type: C(["default", "primary"]),
    default: "default",
    observer(t) {
      this.querySelectorAll("ea-tour-step").forEach((e) => {
        t === "primary" ? e.setAttribute("variant", t) : e.removeAttribute("variant");
      });
    }
  })
], l.prototype, "variant", 2);
u([
  f({
    type: C(W),
    default: "bottom",
    observer(t) {
      this.querySelectorAll("ea-tour-step").forEach((e) => {
        e.getAttribute("placement") || e.setAttribute("placement", t);
      });
    }
  })
], l.prototype, "placement", 2);
u([
  v("slotchange", ".ea-tour__content slot")
], l.prototype, "_handleSlotChange", 1);
l = u([
  P(T, { styles: [N] })
], l);
class R extends Event {
  constructor(e) {
    super("ea-close", { bubbles: !0, cancelable: !0, composed: !0 }), this.detail = e;
  }
}
var F = Object.defineProperty, G = Object.getOwnPropertyDescriptor, h = (t, e, o, i) => {
  for (var s = i > 1 ? void 0 : i ? G(e, o) : e, d = t.length - 1, a; d >= 0; d--)
    (a = t[d]) && (s = (i ? a(e, o, s) : a(s)) || s);
  return i && s && F(e, o, s), s;
};
const M = "ea-tour-step", A = $(M), U = [
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
];
let n = class extends S {
  constructor() {
    super(...arguments), this.heading = "", this.target = "", this.variant = "default", this.placement = "bottom";
  }
  get _hostContentTour() {
    try {
      return this.closest("ea-tour");
    } catch {
      return null;
    }
  }
  /** 更新容器类名 */
  updateContainerClasslist() {
    const t = A({
      primary: this.variant === "primary"
    });
    return this._container.className = t, t;
  }
  /**
   * 渲染指示器 HTML
   * @param tourItems - 所有步骤元素数组
   * @returns 指示器 HTML 字符串
   */
  _renderIndicators(t) {
    return I(
      Array.from(t, (e) => `<span class="ea-tour-step__indicator ${e === this ? "is-active" : ""}" part="indicator"></span>`).join("")
    );
  }
  /**
   * 更新按钮类型
   * @param type - 按钮样式类型
   */
  _handleBtnTypeChange(t) {
    [this._previousBtn, this._nextBtn, this._finishBtn].forEach((o) => {
      t === "primary" ? o.setAttribute("variant", "primary") : o.removeAttribute("variant");
    });
  }
  /** 渲染模板 */
  html() {
    return `
      <div class='${A()}' part='container' role='dialog' aria-modal='true' tabindex='-1'>
        <header class='ea-tour-step__header' part='header'>
          <slot name='header'></slot>
          <ea-icon class='ea-tour-step__close-icon' part='close-icon' name="xmark" aria-label="close"></ea-icon>
        </header>
        <main class='ea-tour-step__content' part='content'>
          <slot></slot>
        </main>
        <footer class='ea-tour-step__footer' part='footer'>
          <div class='ea-tour-step__indicator-group' part='indicator-group'>
            <slot name='indicator'></slot>
          </div>
          <div class='ea-tour-step__switch-group' part='switch-group'>
            <slot name='footer'>
              <ea-button class="ea-tour-step__btn ea-tour-step__previous" part="previous">Previous</ea-button>
              <ea-button class="ea-tour-step__btn ea-tour-step__next" part="next">Next</ea-button>
              <ea-button class="ea-tour-step__btn ea-tour-step__finish" part="finish">Finish</ea-button>
            </slot>
          </div>
        </footer>
      </div>
    `;
  }
  _handleCloseIconClick() {
    var e;
    const t = [...((e = this._hostContentTour) == null ? void 0 : e.children) || []].findIndex(
      (o) => o === this
    );
    this.dispatchEvent(
      new R({
        current: t
      })
    );
  }
  _handleNextClick() {
    this.emit("ea-tour-step-next", { bubbles: !0 });
  }
  _handlePreviousClick() {
    this.emit("ea-tour-step-previous", { bubbles: !0 });
  }
  _handleFinishClick() {
    this.emit("ea-tour-step-finish", { bubbles: !0 });
  }
  /**
   * 更新步骤指示器
   * @param allSteps - 所有步骤元素数组
   */
  updateIndicators(t) {
    this._indicatorSlot && (this._indicatorSlot.innerHTML = this._renderIndicators(t));
  }
  async $mount() {
    var t;
    await customElements.whenDefined("ea-tour"), (t = this._abortController) == null || t.abort(), this._abortController = new AbortController();
  }
  $beforeUnmount() {
    var t;
    (t = this._abortController) == null || t.abort();
  }
};
h([
  c(A.cb())
], n.prototype, "_container", 2);
h([
  c(".ea-tour-step__header slot")
], n.prototype, "_title", 2);
h([
  c("slot[name='indicator']")
], n.prototype, "_indicatorSlot", 2);
h([
  c(".ea-tour-step__next")
], n.prototype, "_nextBtn", 2);
h([
  c(".ea-tour-step__previous")
], n.prototype, "_previousBtn", 2);
h([
  c(".ea-tour-step__finish")
], n.prototype, "_finishBtn", 2);
h([
  c(".ea-tour-step__close-icon")
], n.prototype, "_closeIcon", 2);
h([
  f({
    type: String,
    default: "",
    observer(t) {
      this._title.textContent = t;
    }
  })
], n.prototype, "heading", 2);
h([
  f({
    type: String,
    default: "",
    observer(t) {
      t !== "" && customElements.whenDefined("ea-tour-step").then(() => {
        if (!document.querySelector(t))
          return console.warn(
            `[EaTour] target ${t} not a valid element selector.`,
            this
          );
      });
    }
  })
], n.prototype, "target", 2);
h([
  f({
    type: C(["default", "primary"]),
    default: "default",
    observer(t) {
      this._handleBtnTypeChange(t), this.updateContainerClasslist();
    }
  })
], n.prototype, "variant", 2);
h([
  f({
    type: C(U),
    default: "bottom"
  })
], n.prototype, "placement", 2);
h([
  v("click", ".ea-tour-step__close-icon")
], n.prototype, "_handleCloseIconClick", 1);
h([
  v("click", ".ea-tour-step__next")
], n.prototype, "_handleNextClick", 1);
h([
  v("click", ".ea-tour-step__previous")
], n.prototype, "_handlePreviousClick", 1);
h([
  v("click", ".ea-tour-step__finish")
], n.prototype, "_handleFinishClick", 1);
n = h([
  P(M, { styles: [q] })
], n);
const et = { EaTour: l, EaTourStep: n };
export {
  l as EaTour,
  n as EaTourStep,
  et as default
};
