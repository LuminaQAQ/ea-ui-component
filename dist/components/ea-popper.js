import { E as f } from "../core/EaBase.ts.js";
import { q as h, a as p, C as b } from "../core/decorator.js";
import { E as g } from "../utils/Enum.ts.js";
import { s as m } from "../css/ea-popper.style.js";
import { c as _ } from "../utils/bem.ts.js";
class v extends Event {
  constructor(t) {
    super("ea-show", { bubbles: !0, composed: !0 }), this.detail = t ?? {};
  }
}
class w extends Event {
  constructor(t) {
    super("ea-shown", { bubbles: !0, composed: !0 }), this.detail = t ?? {};
  }
}
class E extends Event {
  constructor(t) {
    super("ea-hide", { bubbles: !0, composed: !0 }), this.detail = t ?? {};
  }
}
class y extends Event {
  constructor(t) {
    super("ea-hidden", { bubbles: !0, composed: !0 }), this.detail = t ?? {};
  }
}
var C = Object.defineProperty, P = Object.getOwnPropertyDescriptor, o = (e, t, i, r) => {
  for (var n = r > 1 ? void 0 : r ? P(t, i) : t, a = e.length - 1, d; a >= 0; a--)
    (d = e[a]) && (n = (r ? d(t, i, n) : d(n)) || n);
  return r && n && C(t, i, n), n;
};
const c = "ea-popper", l = _(c), x = [
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
], u = (e, t = 0) => {
  const i = e.getBoundingClientRect();
  return i.top >= t && i.left >= t && i.bottom <= window.innerHeight - t && i.right <= window.innerWidth - t;
}, A = (e, t) => {
  const i = {
    left: "right",
    right: "left",
    top: "bottom",
    bottom: "top"
  }, r = e.getBoundingClientRect(), n = {
    top: r.top < 0 && t.includes("top"),
    bottom: r.bottom > window.innerHeight && t.includes("bottom"),
    left: r.left < 0 && t.includes("left"),
    right: r.right > window.innerWidth && t.includes("right")
  };
  if (u(e)) return t;
  for (const a in n)
    if (n[a])
      return t.replace(a, i[a]);
  return t;
};
let s = class extends f {
  constructor() {
    super(...arguments), this._uniqueId = s._instanceCount++, this.width = 150, this.placement = "top", this.showArrow = !0, this.visible = !1, this.offset = "0 0", this.flip = !0;
  }
  updateContainerClasslist() {
    const e = l(
      {
        [this.placement]: !0
      },
      {
        show: this.visible,
        "show-arrow": this.showArrow
      }
    );
    return this._container && (this._container.className = e), e;
  }
  /** 处理显示过渡动画 */
  _handleShowTransition() {
    if (this._container.classList.add("is-before-show"), this.dispatchEvent(new v()), this.flip) {
      const e = this._originalPopper.getBoundingClientRect(), t = u(
        this,
        Math.max(e.width, e.height)
      );
      this._originPlacement === this.placement ? this.placement = A(
        this._originalPopper,
        this.placement
      ) : t && (this.placement = this._originPlacement);
    }
    this._container.offsetWidth, this._container.classList.add("is-show"), this._container.addEventListener(
      "transitionend",
      () => {
        this.dispatchEvent(new w()), this.updateContainerClasslist();
      },
      { once: !0, signal: this._visibleAbortController.signal }
    );
  }
  /** 处理隐藏过渡动画 */
  _handleHideTransition() {
    this._container.classList.add("is-before-hide"), this.dispatchEvent(new E()), this._container.addEventListener(
      "transitionend",
      () => {
        this.updateContainerClasslist(), this.dispatchEvent(new y());
      },
      { once: !0, signal: this._visibleAbortController.signal }
    );
  }
  html() {
    return `
      <div class="${this.updateContainerClasslist()}" part="container" tabindex="-1">
        <div class="${l.e("reference")}" part="reference" tabindex="-1">
          <div class="${l.e("original")}" part="original" tabindex="-1">
            <slot></slot>
          </div>
          <slot name="reference"></slot>
        </div>
      </div>
    `;
  }
  show() {
    this.visible = !0;
  }
  hide() {
    this.visible = !1;
  }
  toggle() {
    this.visible = !this.visible;
  }
  /** 获取 reference 插槽中的第一个已分配元素 */
  _getReferenceTrigger() {
    return this._referenceSlot && this._referenceSlot.assignedElements()[0] || null;
  }
  /** 设置 ARIA 关联属性：为 original 添加 id，为触发器添加 aria-controls */
  _setupAria() {
    const e = `ea-popper-${this._uniqueId}`;
    this._originalPopper.setAttribute("id", `${e}-content`);
    const t = this._getReferenceTrigger();
    t && (t.setAttribute("aria-controls", `${e}-content`), t.setAttribute("aria-expanded", String(this.visible)));
  }
  /** 更新触发器的 aria-expanded 状态 */
  _updateAriaExpanded() {
    const e = this._getReferenceTrigger();
    e && e.setAttribute("aria-expanded", String(this.visible));
  }
  $mount() {
    this.updateContainerClasslist(), this._originPlacement = this.placement, this._setupAria();
  }
  $beforeUnmount() {
    var e;
    (e = this._visibleAbortController) == null || e.abort();
  }
};
s._instanceCount = 0;
o([
  h(l.cb())
], s.prototype, "_container", 2);
o([
  h(l.ce("original"))
], s.prototype, "_originalPopper", 2);
o([
  h(l.ce("reference"))
], s.prototype, "_referenceElement", 2);
o([
  h('slot[name="reference"]')
], s.prototype, "_referenceSlot", 2);
o([
  p({
    type: Number,
    default: 150,
    observer(e) {
      this.style.setProperty("--ea-popper-width", `${e}px`);
    }
  })
], s.prototype, "width", 2);
o([
  p({
    type: g(x),
    default: "top",
    observer() {
      this._container && this.updateContainerClasslist();
    }
  })
], s.prototype, "placement", 2);
o([
  p({
    type: Boolean,
    default: !0,
    observer() {
      this._container && this.updateContainerClasslist();
    }
  })
], s.prototype, "showArrow", 2);
o([
  p({
    type: Boolean,
    default: !1,
    observer(e) {
      var t;
      (t = this._visibleAbortController) == null || t.abort(), this._visibleAbortController = new AbortController(), e ? this._handleShowTransition() : this._handleHideTransition(), this._updateAriaExpanded();
    }
  })
], s.prototype, "visible", 2);
o([
  p({
    type: String,
    default: "0 0",
    observer(e) {
      try {
        let [t, i] = e.split(" ").map((r) => Number(r.trim()));
        if (t && typeof i > "u")
          i = t;
        else if (!(t && i || `${t} ${i}` == "0 0"))
          throw new RangeError(
            `[ea-popper] Invalid offset value: ${e}, expected format: "x(Number) y(Number)"`
          );
        this.style.setProperty("--ea-popper-transform-x", `${t}px`), this.style.setProperty("--ea-popper-transform-y", `${i}px`);
      } catch (t) {
        console.error(t);
      }
    }
  })
], s.prototype, "offset", 2);
o([
  p({
    type: Boolean,
    default: !0
  })
], s.prototype, "flip", 2);
s = o([
  b(c, { styles: [m] })
], s);
export {
  s as EaPopper
};
