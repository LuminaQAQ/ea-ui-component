var f = (t) => {
  throw TypeError(t);
};
var p = (t, r, e) => r.has(t) || f("Cannot " + e);
var o = (t, r, e) => (p(t, r, "read from private field"), e ? e.call(t) : r.get(t)), u = (t, r, e) => r.has(t) ? f("Cannot add the same private member more than once") : r instanceof WeakSet ? r.add(t) : r.set(t, e), w = (t, r, e, a) => (p(t, r, "write to private field"), a ? a.call(t, e) : r.set(t, e), e), h = (t, r, e) => (p(t, r, "access private method"), e);
import { B as L } from "./Base.js";
import "./ea-carousel-item.js";
import { c as v } from "./createElement.js";
function k(t, r) {
  return r < 0 ? r = t : r > t && (r = 0), r;
}
const E = `
.ea-carousel_wrap {
  position: relative;
  overflow: hidden;
}
.ea-carousel_wrap .ea-carousel_content-container {
  position: relative;
  display: flex;
  color: #fff;
  text-align: center;
  height: 300px;
  transition: transform 0.5s;
}
.ea-carousel_wrap .ea-carousel_content-container ::slotted(ea-carousel-item) {
  flex: 0 0 100%;
  width: 100%;
}
.ea-carousel_wrap .ea-carousel-item_arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  width: 1.5rem;
  height: 1.5rem;
  line-height: 1.5;
  font-weight: 800;
  text-align: center;
  border-radius: 50%;
  background-color: rgba(31, 45, 61, 0.11);
  color: #fff;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s, transform 0.3s, opacity 0.3s;
}
.ea-carousel_wrap .ea-carousel-item_arrow.ea-carousel-item_arrow--left {
  left: 0;
  transform: translate(-100%, -50%);
}
.ea-carousel_wrap .ea-carousel-item_arrow.ea-carousel-item_arrow--right {
  right: 0;
  transform: translate(100%, -50%);
}
.ea-carousel_wrap .ea-carousel-item_arrow:hover {
  background-color: rgba(31, 45, 61, 0.3);
}
.ea-carousel_wrap .ea-carousel-indicator_wrap {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
}
.ea-carousel_wrap .ea-carousel-indicator_wrap .ea-carousel-item_indicator {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.4);
  margin: 0.25rem;
  transition: background-color 0.3s;
}
.ea-carousel_wrap .ea-carousel-indicator_wrap .ea-carousel-item_indicator.ea-carousel-item_indicator--active {
  background-color: #fff;
}
.ea-carousel_wrap ::slotted(ea-carousel-item:nth-child(odd)) {
  --odd-bgc: #d3dce6;
}
.ea-carousel_wrap.hover-trigger:hover .ea-carousel-item_arrow.ea-carousel-item_arrow--left {
  left: 0;
  transform: translate(50%, -50%);
  opacity: 1;
}
.ea-carousel_wrap.hover-trigger:hover .ea-carousel-item_arrow.ea-carousel-item_arrow--right {
  right: 0;
  transform: translate(-50%, -50%);
  opacity: 1;
}
.ea-carousel_wrap.always-show-arrow .ea-carousel-item_arrow.ea-carousel-item_arrow--left {
  left: 0;
  transform: translate(50%, -50%);
  opacity: 1;
}
.ea-carousel_wrap.always-show-arrow .ea-carousel-item_arrow.ea-carousel-item_arrow--right {
  right: 0;
  transform: translate(-50%, -50%);
  opacity: 1;
}
.ea-carousel_wrap.ea-carousel--horizontal .ea-carousel_content-container {
  flex-direction: row;
}
.ea-carousel_wrap.ea-carousel--vertical .ea-carousel_content-container {
  flex-direction: column;
}
.ea-carousel_wrap.ea-carousel--vertical .ea-carousel-item_arrow {
  display: none;
}
.ea-carousel_wrap.ea-carousel--vertical .ea-carousel-indicator_wrap {
  left: 100%;
  bottom: 50%;
  flex-direction: column;
  transform: translate(-200%, 50%);
}
`;
var s, l, d, n, x, b, _;
class I extends L {
  constructor() {
    super();
    u(this, n);
    u(this, s);
    u(this, l);
    u(this, d);
    const e = this.attachShadow({ mode: "open" });
    e.innerHTML = `
            <div class='ea-carousel_wrap' part='container'>
                <div class='ea-carousel_content-container' part='content-wrap'>
                    <slot></slot>
                </div>
                <div class='ea-carousel-indicator_wrap' part='indicator-wrap'></div>
            </div>
        `, w(this, s, e.querySelector(".ea-carousel_wrap")), w(this, l, e.querySelector(".ea-carousel_content-container")), w(this, d, e.querySelector(".ea-carousel-indicator_wrap")), this.build(e, E);
  }
  // ------- direction 轮播图方向 -------
  // #region
  get direction() {
    const e = this.getAttribute("direction");
    return ["horizontal", "vertical"].includes(e) ? e : "horizontal";
  }
  set direction(e) {
    this.setAttribute("direction", e), o(this, s).classList.add(`ea-carousel--${e}`);
  }
  // #endregion
  // ------- end -------
  // ------- index 轮播图索引 -------
  // #region
  get index() {
    return this.getAttrNumber("index") || 0;
  }
  set index(e) {
    const a = this.querySelectorAll("ea-carousel-item").length - 1, i = k(a, e);
    this.setAttribute("index", i);
    const c = o(this, s).getBoundingClientRect(), m = this.direction === "horizontal" ? "X" : "Y", y = this.direction === "horizontal" ? c.width : c.height;
    o(this, l).style.transform = `translate${m}(-${i * y}px)`;
    try {
      const g = o(this, d).querySelectorAll(".ea-carousel-item_indicator");
      g.forEach((A) => {
        A.classList.remove("ea-carousel-item_indicator--active");
      }), g[i].classList.add("ea-carousel-item_indicator--active");
    } catch {
    }
  }
  // #endregion
  // ------- end -------
  // ------- trigger 轮播图指示器触发方式 -------
  // #region
  get trigger() {
    const e = this.getAttribute("trigger") || "hover";
    return ["click", "hover"].includes(e) ? e : "click";
  }
  set trigger(e) {
    this.setAttribute("trigger", e);
  }
  // #endregion
  // ------- end -------
  // ------- interval 轮播图自动播放间隔时间 -------
  // #region
  get interval() {
    return this.getAttrNumber("interval") || 3;
  }
  set interval(e) {
    this.setAttribute("interval", e);
  }
  // #endregion
  // ------- end -------
  // ------- arrow 轮播图是否一直显示箭头 -------
  // #region
  get arrow() {
    const e = this.getAttribute("arrow") || "hover";
    return ["always", "hover", "never"].includes(e) ? e : "hover";
  }
  set arrow(e) {
    this.setAttribute("arrow", e);
  }
  connectedCallback() {
    if (this.direction = this.direction, this.trigger = this.trigger, this.interval = this.interval, this.arrow = this.arrow, this.index = this.index, h(this, n, x).call(this), h(this, n, b).call(this), this.arrow !== "never" || this.direction !== "vertical") {
      const e = h(this, n, _).call(this, "left"), a = h(this, n, _).call(this, "right");
      o(this, s).appendChild(e), o(this, s).appendChild(a);
    }
    window.addEventListener("resize", () => {
      this.index = this.index;
    });
  }
}
s = new WeakMap(), l = new WeakMap(), d = new WeakMap(), n = new WeakSet(), // #endregion
// ------- end -------
x = function() {
  const e = this.querySelectorAll("ea-carousel-item").length;
  for (let i = 0; i < e; i++) {
    const c = v("div", "ea-carousel-item_indicator");
    c.part = "indicator", o(this, d).appendChild(c);
  }
  const a = o(this, d).querySelectorAll(".ea-carousel-item_indicator");
  a[0].classList.add("ea-carousel-item_indicator--active"), a.forEach((i, c) => {
    i.addEventListener(this.trigger === "click" ? "click" : "mouseenter", () => {
      this.index = c, a.forEach((m) => {
        m.classList.remove("ea-carousel-item_active");
      }), i.classList.add("ea-carousel-item_active");
    });
  });
}, b = function() {
  let e = setInterval(() => {
    this.index = this.index + 1;
  }, this.interval * 1e3);
  this.addEventListener("mouseenter", () => {
    clearInterval(e), e = null;
  }), this.addEventListener("mouseleave", () => {
    e = setInterval(() => {
      this.index = this.index + 1;
    }, this.interval * 1e3);
  });
}, _ = function(e) {
  let a = !1;
  const i = v("div", `ea-carousel-item_arrow ea-carousel-item_arrow--${e}`);
  switch (i.part = "arrow", i.innerHTML = e === "left" ? "&lt;" : "&gt;", this.arrow) {
    case "always":
      o(this, s).classList.add("always-show-arrow");
      break;
    case "hover":
      o(this, s).classList.add("hover-trigger");
      break;
  }
  return i.addEventListener("click", () => {
    a || (this.index = e === "left" ? --this.index : ++this.index);
  }), o(this, l).addEventListener("transitionstart", () => {
    a = !0;
  }), o(this, l).addEventListener("transitionend", () => {
    a = !1;
  }), i;
};
customElements.get("ea-carousel") || customElements.define("ea-carousel", I);
export {
  I as EaCarousel
};
