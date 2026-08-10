import { E as m } from "../core/EaBase.ts.js";
import { C as v, q as d, b as w, a as u, l, c as y } from "../core/decorator.js";
import { s as I } from "../css/ea-carousel-item.style.js";
import { c as g } from "../utils/bem.ts.js";
import { h as _ } from "../utils/html.ts.js";
import { E as p } from "../utils/Enum.ts.js";
import { t as A } from "../utils/timeout.ts.js";
import "./ea-icon.js";
import { s as E } from "../css/ea-carousel.style.js";
var P = Object.getOwnPropertyDescriptor, T = (t, i, s, e) => {
  for (var a = e > 1 ? void 0 : e ? P(i, s) : i, h = t.length - 1, c; h >= 0; h--)
    (c = t[h]) && (a = c(a) || a);
  return a;
};
const b = "ea-carousel-item", O = g(b);
let f = class extends m {
  /** 渲染模板 */
  html() {
    return `
      <div class='${O()}' part='container' role="group" aria-roledescription="slide">
        <slot></slot>
      </div>
    `;
  }
};
f = T([
  v(b, { styles: [I] })
], f);
var x = Object.defineProperty, M = Object.getOwnPropertyDescriptor, o = (t, i, s, e) => {
  for (var a = e > 1 ? void 0 : e ? M(i, s) : i, h = t.length - 1, c; h >= 0; h--)
    (c = t[h]) && (a = (e ? c(i, s, a) : c(a)) || a);
  return e && a && x(i, s, a), a;
};
const C = "ea-carousel", n = g(C);
let r = class extends m {
  constructor() {
    super(...arguments), this._itemObserver = null, this._isMounted = !1, this._resizeTimeout = null, this._states = {
      prevIndex: 0,
      originLength: 0,
      timer: null,
      pause: !1,
      isMouseEnter: !1,
      isEnd: !1,
      isProcessingSlotChange: !1
    }, this.height = "100%", this.direction = "horizontal", this.index = 0, this.trigger = "hover", this.interval = 3e3, this.arrow = "hover", this.autoplay = !0, this.loop = !0, this.pauseOnHover = !0, this.indicatorPosition = "", this._handleIndexOverflow = () => this.index === this._indicatorNodes.length ? 0 : this.index === -1 ? this._indicatorNodes.length - 1 : this.index, this._renderIndicatorItems = () => {
      const t = this._carouselItems.length, i = Array.from(
        { length: t },
        (s, e) => `<button class='${n.e("indicator")}' part='indicator' role="tab" tabindex="${e === 0 ? 0 : -1}" data-index="${e}" aria-label="Slide ${e + 1}" aria-selected="${e === 0 ? "true" : "false"}" aria-controls="carousel-slide-${e}"></button>`
      ).join("");
      this._indicatorWrap.innerHTML = _(i);
    }, this._updateCarouselPosition = (t = 0) => {
      const { width: i, height: s } = this._container.getBoundingClientRect(), e = this.direction === "horizontal" ? "X" : "Y", a = this.direction === "horizontal" ? i : s;
      this.style.setProperty(
        "--ea-carousel-transform",
        `translate${e}(-${(t + 1) * a}px)`
      ), this._updateIndicatorPosition();
    }, this._updateIndicatorPosition = () => {
      const t = this._handleIndexOverflow();
      this._indicatorNodes.forEach((i, s) => {
        const e = s === t;
        i.classList.toggle("is-active", e), i.setAttribute("aria-selected", String(e)), i.setAttribute("tabindex", e ? "0" : "-1");
      }), this._updateSlideInert(t);
    }, this._turnOnTransition = () => {
      this.clientHeight, this.style.removeProperty("--ea-carousel-transition");
    }, this._turnOffTransition = () => {
      this.style.setProperty("--ea-carousel-transition", "none"), this.clientHeight;
    }, this._onIndicatorHandleEvent = (t) => {
      const i = t.target.closest(
        n.ce("indicator")
      );
      i && this._indicatorNodes.forEach((s, e) => {
        s.classList.toggle("is-active", s === i), s === i && (this.index = e);
      });
    }, this._onCarouselChangeEndEvent = () => {
      this._turnOffTransition(), this._handleTimerClear(), this.index = this._handleIndexOverflow(), this.autoplay && !this._states.isMouseEnter && this._handleAutoPlay(), A(() => {
        this._turnOnTransition(), this._states.pause = !1;
      }, 0);
    }, this._onArrowShowEvent = () => {
      this._states.isMouseEnter = !0, this.pauseOnHover && this._handleTimerClear(), this.updateContainerClasslist(), this._updateAriaLive(), this._updateRotationBtn(), this._updateArrowInert();
    }, this._onSlotChangeEvent = () => {
      this._isMounted && (this._states.isProcessingSlotChange || (this._states.isProcessingSlotChange = !0, this._turnOffTransition(), this._handleTimerClear(), this._states.prevIndex = 0, this._states.originLength = 0, this._states.pause = !1, this._states.isEnd = !1, this.index = 0, this._renderIndicatorItems(), this._initCarouselItem(), this._updateSlideLabels(), this._updateIndicatorPosition(), this.autoplay && this._handleAutoPlay(), queueMicrotask(() => {
        this._turnOnTransition(), this._states.isProcessingSlotChange = !1;
      })));
    }, this.prev = () => {
      this._states.pause || (this.index--, this._states.pause = !0);
    }, this.next = () => {
      this._states.pause || (this.index++, this._states.pause = !0);
    };
  }
  /** 更新容器类名 */
  updateContainerClasslist() {
    const t = n(
      { [this.direction]: !0 },
      {
        [`arrow-${this.arrow}`]: this.arrow === "always" || this.arrow === "never" || this._states.isMouseEnter,
        [`${this.indicatorPosition}-indicator`]: !!this.indicatorPosition
      }
    );
    return this._container.className = t, t;
  }
  /** 渲染模板 */
  html() {
    return `
      <div class='${n()}' part='container' role="region" aria-roledescription="carousel" aria-label="Carousel">
        <button class="${n.e("rotation")}" part="rotation" aria-label="Stop automatic slide show">
          <ea-icon name="pause" part="rotation-icon"></ea-icon>
        </button>
        <button class="${n.e("arrow")} arrow-left" part="arrow-left" aria-label="Previous Slide" aria-controls="carousel-content">
          <ea-icon name="angle-left" part="arrow-left-icon"></ea-icon>
        </button>
        <button class="${n.e("arrow")} arrow-right" part="arrow-right" aria-label="Next Slide" aria-controls="carousel-content">
          <ea-icon name="angle-right" part="arrow-right-icon"></ea-icon>
        </button>
        <ul class="${n.e("content")}" part="content" id="carousel-content" aria-live="off">
            <slot name="clone-last"></slot>
            <slot></slot>
            <slot name="clone-first"></slot>
        </ul>
        <footer class="${n.e("indicator-wrap")}" part="indicator-wrap" role="tablist" aria-label="Choose slide to display">
        </footer>
      </div>
    `;
  }
  /** 更新轮播项的 aria-label（"N of M" 格式） */
  _updateSlideLabels() {
    const t = this._carouselItems, i = t.length;
    t.forEach((s, e) => {
      s.setAttribute("aria-label", `${e + 1} of ${i}`), s.setAttribute("id", `carousel-slide-${e}`);
    });
  }
  /** 初始化轮播项，创建首尾克隆 */
  _initCarouselItem() {
    try {
      const t = this._carouselItems;
      if (t.length === 0) return;
      this._states.originLength = t.length, this._cloneItems.forEach((e) => e.remove());
      const i = t[0].cloneNode(!0), s = t[t.length - 1].cloneNode(!0);
      i.setAttribute("slot", "clone-first"), s.setAttribute("slot", "clone-last"), this.appendChild(i), this.appendChild(s), this._setupItemObserver(), queueMicrotask(() => {
        this._updateCarouselPosition(this.index);
      });
    } catch {
    }
  }
  /** 设置子元素变更观察器 */
  _setupItemObserver() {
    this._itemObserver && this._itemObserver.disconnect(), this._itemObserver = new MutationObserver((i) => {
      i.some((e) => e.type === "childList" && !!e.target.closest("ea-carousel-item:not([slot])")) && this._syncClonedItems();
    }), this._carouselItems.forEach((i) => {
      this._itemObserver.observe(i, {
        childList: !0,
        subtree: !0,
        characterData: !0
      });
    });
  }
  /** 同步克隆项内容 */
  _syncClonedItems() {
    const t = this._carouselItems;
    if (t.length === 0) return;
    const i = this.querySelector(
      'ea-carousel-item[slot="clone-first"]'
    ), s = this.querySelector('ea-carousel-item[slot="clone-last"]');
    i && t[0] && (i.innerHTML = _(t[0].innerHTML)), s && t[t.length - 1] && (s.innerHTML = _(t[t.length - 1].innerHTML));
  }
  /** 设置非当前轮播项为 inert，防止 Tab 聚焦到不可见内容 */
  _updateSlideInert(t) {
    var s;
    this._carouselItems.forEach((e, a) => {
      a === t ? e.removeAttribute("inert") : e.setAttribute("inert", "");
    }), (s = this._cloneItems) == null || s.forEach((e) => {
      e.setAttribute("inert", "");
    });
  }
  /** 根据方向和 arrow 属性更新箭头按钮的可交互性 */
  _updateArrowInert() {
    var s;
    const t = (s = this.shadowRoot) == null ? void 0 : s.querySelectorAll(
      n.ce("arrow")
    );
    if (!t) return;
    const i = this.direction === "vertical" || this.arrow === "never" || this.arrow === "hover" && !this._states.isMouseEnter;
    t.forEach((e) => {
      i ? e.setAttribute("inert", "") : e.removeAttribute("inert");
    });
  }
  /** none-indicator 模式下指示器容器设置 inert */
  _updateIndicatorInert() {
    this._indicatorWrap && (this.indicatorPosition === "none" ? this._indicatorWrap.setAttribute("inert", "") : this._indicatorWrap.removeAttribute("inert"));
  }
  /** 清除自动播放定时器 */
  _handleTimerClear() {
    this._states.timer && (clearInterval(this._states.timer), this._states.timer = null);
  }
  /** 启动自动播放 */
  _handleAutoPlay() {
    this.autoplay && (this._handleTimerClear(), this._states.timer = setInterval(this.next, this.interval), this._updateAriaLive());
  }
  /** 更新 aria-live 状态：自动播放时为 off，暂停时为 polite */
  _updateAriaLive() {
    this._content && this._content.setAttribute(
      "aria-live",
      this._states.timer !== null ? "off" : "polite"
    );
  }
  /** 更新旋转控制按钮的标签、图标和可见性 */
  _updateRotationBtn() {
    if (!this._rotationBtn || (this._rotationBtn.hidden = !this.autoplay, !this.autoplay)) return;
    const t = this._states.timer !== null;
    this._rotationBtn.setAttribute(
      "aria-label",
      t ? "Stop automatic slide show" : "Start automatic slide show"
    );
    const i = this._rotationBtn.querySelector("ea-icon");
    i && i.setAttribute("name", t ? "pause" : "play");
  }
  _onArrowLeftClick() {
    this.arrow === "never" || this.direction === "vertical" || this.prev();
  }
  _onArrowRightClick() {
    this.arrow === "never" || this.direction === "vertical" || this.next();
  }
  _onRotationClick() {
    this._states.timer ? this._handleTimerClear() : this._handleAutoPlay(), this._updateRotationBtn(), this._updateAriaLive();
  }
  _onFocusIn() {
    this.autoplay && (this._handleTimerClear(), this._updateAriaLive(), this._updateRotationBtn());
  }
  _onFocusOut() {
    this.autoplay && !this._states.isMouseEnter && (this._handleAutoPlay(), this._updateRotationBtn());
  }
  _onTransitionEnd() {
    this._onCarouselChangeEndEvent();
  }
  _onMouseEnter() {
    this._onArrowShowEvent();
  }
  _onMouseLeave() {
    this._states.isMouseEnter && (this._states.isMouseEnter = !1, this.pauseOnHover && this._handleAutoPlay(), this.updateContainerClasslist(), this._updateAriaLive(), this._updateRotationBtn(), this._updateArrowInert());
  }
  _handleIndicatorHover(t) {
    this.trigger === "hover" && t.target.closest(n.ce("indicator")) && this._onIndicatorHandleEvent(t);
  }
  _handleIndicatorClick(t) {
    this.trigger === "click" && t.target.closest(n.ce("indicator")) && this._onIndicatorHandleEvent(t);
  }
  _handleIndicatorKeydown(t) {
    const i = t.target;
    if (!i.closest(n.ce("indicator"))) return;
    const s = Array.from(this._indicatorNodes), e = s.indexOf(i);
    if (e === -1) return;
    let a = -1;
    const h = this.direction === "horizontal";
    switch (t.key) {
      case (h ? "ArrowRight" : "ArrowDown"):
        t.preventDefault(), a = e + 1, a >= s.length && (a = 0);
        break;
      case (h ? "ArrowLeft" : "ArrowUp"):
        t.preventDefault(), a = e - 1, a < 0 && (a = s.length - 1);
        break;
      case "Home":
        t.preventDefault(), a = 0;
        break;
      case "End":
        t.preventDefault(), a = s.length - 1;
        break;
      case "Enter":
      case " ":
        t.preventDefault(), this.index = e;
        return;
      default:
        return;
    }
    a >= 0 && a < s.length && (this.index = a, s[a].focus());
  }
  _handleResize() {
    this._resizeTimeout && clearTimeout(this._resizeTimeout), this._resizeTimeout = setTimeout(() => {
      this._updateCarouselPosition(this.index);
    }, 100);
  }
  _handleSlotChange() {
    this._onSlotChangeEvent();
  }
  $mount() {
    this.style.setProperty("--ea-carousel-height", this.height), this.updateContainerClasslist(), this._turnOffTransition(), this._handleTimerClear(), this._renderIndicatorItems(), this._initCarouselItem(), this._updateSlideLabels(), this.autoplay && this._handleAutoPlay(), queueMicrotask(() => {
      this._turnOnTransition();
    }), this._isMounted = !0, this._updateRotationBtn(), this._updateArrowInert(), this._updateIndicatorInert();
  }
  $beforeUnmount() {
    var t;
    this._handleTimerClear(), this._resizeTimeout && clearTimeout(this._resizeTimeout), (t = this._itemObserver) == null || t.disconnect(), this._itemObserver = null, this._isMounted = !1;
  }
};
o([
  d(n.cb())
], r.prototype, "_container", 2);
o([
  d(n.ce("content"))
], r.prototype, "_content", 2);
o([
  d(n.ce("indicator-wrap"))
], r.prototype, "_indicatorWrap", 2);
o([
  d(n.ce("rotation"))
], r.prototype, "_rotationBtn", 2);
o([
  w(n.ce("indicator"))
], r.prototype, "_indicatorNodes", 2);
o([
  y("ea-carousel-item:not([slot])")
], r.prototype, "_carouselItems", 2);
o([
  y('ea-carousel-item[slot^="clone-"]')
], r.prototype, "_cloneItems", 2);
o([
  u({
    type: String,
    default: "100%",
    observer(t) {
      this.style.setProperty("--ea-carousel-height", t);
    }
  })
], r.prototype, "height", 2);
o([
  u({
    type: p(["horizontal", "vertical"]),
    default: "horizontal",
    observer() {
      this.updateContainerClasslist(), this._updateArrowInert();
    }
  })
], r.prototype, "direction", 2);
o([
  u({
    type: Number,
    default: 0,
    observer(t, i) {
      if (this._updateCarouselPosition(t), this._states.isEnd) {
        this._states.isEnd = !1;
        return;
      }
      let s = t, e = i;
      t < 0 ? (s = this._indicatorNodes.length - 1, e = 0, this._states.isEnd = !0) : t > this._indicatorNodes.length - 1 && (e = this._indicatorNodes.length - 1, s = 0, this._states.isEnd = !0), this._states.prevIndex = e, this.emit("ea-change", {
        detail: {
          current: s,
          prev: e
        }
      });
    }
  })
], r.prototype, "index", 2);
o([
  u({
    type: p(["click", "hover"]),
    default: "hover"
  })
], r.prototype, "trigger", 2);
o([
  u({
    type: Number,
    default: 3e3,
    observer() {
      this._handleTimerClear(), this.autoplay && this._handleAutoPlay();
    }
  })
], r.prototype, "interval", 2);
o([
  u({
    type: p(["never", "always", "hover"]),
    default: "hover",
    observer() {
      this.updateContainerClasslist(), this._updateArrowInert();
    }
  })
], r.prototype, "arrow", 2);
o([
  u({
    type: Boolean,
    default: !0,
    observer(t) {
      this._handleTimerClear(), t && this._handleAutoPlay(), this._updateRotationBtn(), this._updateAriaLive();
    }
  })
], r.prototype, "autoplay", 2);
o([
  u({
    type: Boolean,
    default: !0
  })
], r.prototype, "loop", 2);
o([
  u({
    type: Boolean,
    default: !0
  })
], r.prototype, "pauseOnHover", 2);
o([
  u({
    type: p(["", "none", "outside"]),
    default: "",
    observer() {
      this.updateContainerClasslist(), this._updateIndicatorInert();
    }
  })
], r.prototype, "indicatorPosition", 2);
o([
  l("click", ".arrow-left")
], r.prototype, "_onArrowLeftClick", 1);
o([
  l("click", ".arrow-right")
], r.prototype, "_onArrowRightClick", 1);
o([
  l("click", n.ce("rotation"))
], r.prototype, "_onRotationClick", 1);
o([
  l("focusin", n.cb())
], r.prototype, "_onFocusIn", 1);
o([
  l("focusout", n.cb())
], r.prototype, "_onFocusOut", 1);
o([
  l("transitionend", n.ce("content"))
], r.prototype, "_onTransitionEnd", 1);
o([
  l("mouseenter", n.cb())
], r.prototype, "_onMouseEnter", 1);
o([
  l("mouseleave", n.cb())
], r.prototype, "_onMouseLeave", 1);
o([
  l("mouseover", "shadowRoot")
], r.prototype, "_handleIndicatorHover", 1);
o([
  l("click", "shadowRoot")
], r.prototype, "_handleIndicatorClick", 1);
o([
  l("keydown", n.ce("indicator-wrap"))
], r.prototype, "_handleIndicatorKeydown", 1);
o([
  l("resize", "window")
], r.prototype, "_handleResize", 1);
o([
  l("slotchange", "slot:not([name])")
], r.prototype, "_handleSlotChange", 1);
r = o([
  v(C, { styles: [E] })
], r);
export {
  r as EaCarousel,
  f as EaCarouselItem
};
