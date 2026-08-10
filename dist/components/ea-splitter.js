import { E as P } from "../core/EaBase.ts.js";
import { q as R, a as g, C as N, l as $, p as B } from "../core/decorator.js";
import { E as D } from "../utils/Enum.ts.js";
import { s as I } from "../css/ea-splitter.style.js";
import { c as H } from "../utils/bem.ts.js";
import { s as V } from "../css/ea-splitter-panel.style.js";
import { s as X } from "../css/ea-splitter-bar.style.js";
class y extends Event {
  constructor(i) {
    super("ea-panel-resize-start", { bubbles: !0, composed: !0 }), this.detail = i;
  }
}
class b extends Event {
  constructor(i) {
    super("ea-panel-resize", { bubbles: !0, composed: !0 }), this.detail = i;
  }
}
class E extends Event {
  constructor(i) {
    super("ea-panel-resize-end", { bubbles: !0, composed: !0 }), this.detail = i;
  }
}
var Y = Object.defineProperty, q = Object.getOwnPropertyDescriptor, w = (t, i, s, e) => {
  for (var n = e > 1 ? void 0 : e ? q(i, s) : i, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (e ? a(i, s, n) : a(n)) || n);
  return e && n && Y(i, s, n), n;
};
const W = "ea-splitter", M = H(W), c = (t) => {
  if (!t || t.trim() === "") return 0;
  if (t.endsWith("px")) return parseInt(t.replace("px", ""));
  if (t.endsWith("%")) return Number(t.replace("%", "")) / 100;
  const i = parseInt(t);
  return isNaN(i) ? 0 : i;
};
let S = class extends P {
  constructor() {
    super(...arguments), this.layout = "horizontal", this._handleHorizontalResize = (t, i) => {
      const s = new AbortController(), e = this.children[i - 1], n = this.children[i + 1], r = this.children[i], a = t.clientX, o = e.getBoundingClientRect().width, l = n.getBoundingClientRect().width;
      this._dispatchResizeEvent(y);
      const h = (f) => {
        t.preventDefault(), t.stopPropagation();
        const m = f.clientX - a, v = o + m, C = l - m;
        let z = 0, _ = 0;
        e.min.endsWith("%") ? (z = this._container.clientWidth * c(e.min), _ = this._container.clientWidth * c(n.min)) : e.min.endsWith("px") && (z = c(e.min), _ = c(n.min)), !(v <= z || C <= _) && (e.size = v + "px", n.size = C + "px", this._updateBarA11y(r, e), this._dispatchResizeEvent(b));
      }, u = () => {
        s.abort(), this._dispatchResizeEvent(E);
      };
      window.addEventListener("mousemove", h, {
        signal: s.signal
      }), window.addEventListener("mouseup", u, {
        signal: s.signal
      });
    }, this._handleVerticalResize = (t, i) => {
      const s = new AbortController(), e = this.children[i - 1], n = this.children[i + 1], r = this.children[i], a = t.clientY, o = e.getBoundingClientRect().height, l = n.getBoundingClientRect().height;
      this._dispatchResizeEvent(y);
      const h = (f) => {
        t.preventDefault(), t.stopPropagation();
        const m = f.clientY - a, v = o + m, C = l - m;
        let z = 0, _ = 0;
        e.min.endsWith("%") ? (z = this._container.clientHeight * c(e.min), _ = this._container.clientHeight * c(n.min)) : e.min.endsWith("px") && (z = c(e.min), _ = c(n.min)), !(v <= z || C <= _) && (e.size = v + "px", n.size = C + "px", this._updateBarA11y(r, e), this._dispatchResizeEvent(b));
      }, u = () => {
        s.abort(), this._dispatchResizeEvent(E);
      };
      window.addEventListener("mousemove", h, {
        signal: s.signal
      }), window.addEventListener("mouseup", u, {
        signal: s.signal
      });
    }, this._panelIdCounter = 0;
  }
  /** 更新容器类名 */
  updateContainerClasslist() {
    return M({ [this.layout]: !0 });
  }
  /**
   * 派发 resize 事件
   * @param EventClass 事件类构造函数
   */
  _dispatchResizeEvent(t) {
    const i = [...this.children].filter((s) => s.tagName === "EA-SPLITTER-PANEL").map(
      (s) => {
        var e;
        return (e = s.getBoundingClientRect()) == null ? void 0 : e[this.layout === "vertical" ? "height" : "width"];
      }
    );
    this.dispatchEvent(new t({ size: i }));
  }
  /**
   * 更新分隔条的 a11y 属性
   * @param bar 分隔条元素
   * @param prePanel 前一个面板元素
   */
  _updateBarA11y(t, i) {
    const s = this.layout === "vertical" ? this._container.clientHeight : this._container.clientWidth, e = i.getBoundingClientRect()[this.layout === "vertical" ? "height" : "width"], n = s > 0 ? Math.round(e / s * 100) : 50;
    t.valuenow = n;
  }
  /**
   * 获取面板的最小尺寸（像素）
   * @param panel 面板元素
   * @param containerSize 容器尺寸
   */
  _getMinSize(t, i) {
    return t.min ? t.min.endsWith("%") ? i * c(t.min) : c(t.min) : 0;
  }
  /**
   * 对指定 bar 相邻的面板执行步进调整
   * @param barIndex bar 的索引
   * @param delta 像素增量（正数增大主面板，负数缩小主面板）
   */
  _resizeByStep(t, i) {
    const s = this.children[t - 1], e = this.children[t + 1], n = this.children[t];
    if (!s || !e) return;
    const r = this.layout === "vertical", a = r ? this._container.clientHeight : this._container.clientWidth, o = r ? "height" : "width", l = s.getBoundingClientRect()[o], h = e.getBoundingClientRect()[o], u = l + i, f = h - i, m = this._getMinSize(s, a), v = this._getMinSize(e, a);
    u <= m || f <= v || (this._dispatchResizeEvent(y), s.size = u + "px", e.size = f + "px", this._updateBarA11y(n, s), this._dispatchResizeEvent(b), this._dispatchResizeEvent(E));
  }
  /**
   * 将主面板折叠到最小尺寸或恢复到之前的位置
   * @param barIndex bar 的索引
   */
  _toggleCollapse(t) {
    const i = this.children[t - 1], s = this.children[t + 1], e = this.children[t];
    if (!i || !s) return;
    const n = this.layout === "vertical", r = n ? this._container.clientHeight : this._container.clientWidth, a = n ? "height" : "width", o = this._getMinSize(i, r), l = i.getBoundingClientRect()[a];
    if (l > o)
      e._prevPreSize = l, e._prevNextSize = s.getBoundingClientRect()[a], this._dispatchResizeEvent(y), i.size = o + "px", s.size = r - o + "px", this._updateBarA11y(e, i), this._dispatchResizeEvent(b), this._dispatchResizeEvent(E);
    else {
      const h = e._prevPreSize, u = e._prevNextSize;
      if (h == null) return;
      this._dispatchResizeEvent(y), i.size = h + "px", s.size = u + "px", this._updateBarA11y(e, i), this._dispatchResizeEvent(b), this._dispatchResizeEvent(E);
    }
  }
  /**
   * 将主面板调整到最小或最大尺寸
   * @param barIndex bar 的索引
   * @param toMin 是否调整到最小尺寸
   */
  _resizeToExtent(t, i) {
    const s = this.children[t - 1], e = this.children[t + 1], n = this.children[t];
    if (!s || !e) return;
    const a = this.layout === "vertical" ? this._container.clientHeight : this._container.clientWidth, o = this._getMinSize(s, a), l = this._getMinSize(e, a);
    if (this._dispatchResizeEvent(y), i)
      s.size = o + "px", e.size = a - o + "px";
    else {
      const h = a - l;
      s.size = h + "px", e.size = l + "px";
    }
    this._updateBarA11y(n, s), this._dispatchResizeEvent(b), this._dispatchResizeEvent(E);
  }
  html() {
    return `
      <div class="${this.updateContainerClasslist()}" part="container">
        <slot></slot>
      </div>
    `;
  }
  _handleMouseDown(t) {
    const s = t.target.closest("ea-splitter-bar");
    if (!s) return;
    t.preventDefault(), t.stopPropagation();
    const e = Number(s.getAttribute("data-index"));
    isNaN(e) || (this.layout === "horizontal" ? this._handleHorizontalResize(t, e) : this._handleVerticalResize(t, e));
  }
  _handleKeyDown(t) {
    const s = t.target.closest("ea-splitter-bar");
    if (!s) return;
    const e = Number(s.getAttribute("data-index"));
    if (isNaN(e)) return;
    const n = s.step || 10, r = this.layout === "horizontal";
    switch (t.key) {
      case "ArrowLeft":
        r && (t.preventDefault(), this._resizeByStep(e, -n));
        break;
      case "ArrowRight":
        r && (t.preventDefault(), this._resizeByStep(e, n));
        break;
      case "ArrowUp":
        r || (t.preventDefault(), this._resizeByStep(e, -n));
        break;
      case "ArrowDown":
        r || (t.preventDefault(), this._resizeByStep(e, n));
        break;
      case "Enter":
        t.preventDefault(), this._toggleCollapse(e);
        break;
      case "Home":
        t.preventDefault(), this._resizeToExtent(e, !0);
        break;
      case "End":
        t.preventDefault(), this._resizeToExtent(e, !1);
        break;
    }
  }
  $mount() {
    queueMicrotask(() => {
      const t = [...this.children].filter(
        (i) => i.tagName === "EA-SPLITTER-PANEL"
      );
      t.forEach((i, s) => {
        if (i.setAttribute("layout", this.layout), i.setAttribute("data-panel-index", String(s)), i.id || (i.id = `${W}-panel-${this._panelIdCounter++}`), s < t.length - 1) {
          const e = document.createElement("ea-splitter-bar");
          this.insertBefore(e, i.nextSibling);
          const n = [...this.children].indexOf(e);
          e.setAttribute("data-index", String(n)), e.setAttribute("layout", this.layout), e.setAttribute("aria-controls", i.id), this._updateBarA11y(e, i);
        }
      });
    });
  }
};
w([
  R(M.cb())
], S.prototype, "_container", 2);
w([
  g({
    type: D(["horizontal", "vertical"]),
    default: "horizontal",
    observer(t) {
      this._container.style.setProperty(
        "--ea-splitter-direction",
        t === "vertical" ? "column" : "row"
      ), this._container.className = this.updateContainerClasslist(), [...this.children].forEach((i) => {
        (i.tagName === "EA-SPLITTER-PANEL" || i.tagName === "EA-SPLITTER-BAR") && i.setAttribute("layout", t);
      });
    }
  })
], S.prototype, "layout", 2);
w([
  $("mousedown")
], S.prototype, "_handleMouseDown", 1);
w([
  $("keydown")
], S.prototype, "_handleKeyDown", 1);
S = w([
  N(W, { styles: [I] })
], S);
var G = Object.defineProperty, K = Object.getOwnPropertyDescriptor, A = (t, i, s, e) => {
  for (var n = e > 1 ? void 0 : e ? K(i, s) : i, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (e ? a(i, s, n) : a(n)) || n);
  return e && n && G(i, s, n), n;
};
const T = "ea-splitter-panel", O = H(T);
let x = class extends P {
  constructor() {
    super(...arguments), this.size = "", this.min = "", this.layout = "horizontal";
  }
  /** 更新容器类名 */
  updateContainerClasslist() {
    return O();
  }
  /** 渲染模板 */
  html() {
    return `
      <div class="${this.updateContainerClasslist()}" part="container">
        <slot></slot>
      </div>
    `;
  }
};
A([
  R(O.cb())
], x.prototype, "_container", 2);
A([
  g({
    type: String,
    default: "",
    observer(t) {
      CSS.supports("width", t) && this.style.setProperty("--ea-splitter-panel-size", t);
    }
  })
], x.prototype, "size", 2);
A([
  g({
    type: String,
    default: "",
    observer(t) {
      CSS.supports("width", t) && this.style.setProperty("--ea-splitter-panel-min-size", t);
    }
  })
], x.prototype, "min", 2);
A([
  g({
    type: D(["horizontal", "vertical"]),
    default: "horizontal"
  })
], x.prototype, "layout", 2);
x = A([
  N(T, { styles: [V] })
], x);
var U = Object.defineProperty, F = Object.getOwnPropertyDescriptor, d = (t, i, s, e) => {
  for (var n = e > 1 ? void 0 : e ? F(i, s) : i, r = t.length - 1, a; r >= 0; r--)
    (a = t[r]) && (n = (e ? a(i, s, n) : a(n)) || n);
  return e && n && U(i, s, n), n;
};
const L = "ea-splitter-bar", j = H(L);
let p = class extends P {
  constructor() {
    super(...arguments), this.layout = "horizontal", this.label = "", this.step = 10, this.valuenow = 50, this.valuemin = 0, this.valuemax = 100;
  }
  /** 更新容器类名 */
  updateContainerClasslist() {
    return j({ [this.layout]: !0 });
  }
  /** 渲染模板 */
  html() {
    return `
      <div class="${this.updateContainerClasslist()}" part="container"></div>
    `;
  }
  $mount() {
    this.setAttribute("role", "separator"), this.tabIndex = 0, this.setAttribute("aria-valuenow", String(this.valuenow)), this.setAttribute("aria-valuemin", String(this.valuemin)), this.setAttribute("aria-valuemax", String(this.valuemax));
  }
};
d([
  R(j.cb())
], p.prototype, "_container", 2);
d([
  g({
    type: D(["horizontal", "vertical"]),
    default: "horizontal",
    a11y: {
      ariaAttr: "aria-orientation",
      map: (t) => t === "horizontal" ? "vertical" : "horizontal"
    },
    observer() {
      this._container.className = this.updateContainerClasslist();
    }
  })
], p.prototype, "layout", 2);
d([
  g({
    type: String,
    default: "",
    a11y: {
      ariaAttr: "aria-label",
      map: (t) => t || null
    }
  })
], p.prototype, "label", 2);
d([
  g({
    type: Number,
    default: 10
  })
], p.prototype, "step", 2);
d([
  B({
    type: Number,
    default: 50,
    observer(t) {
      this.setAttribute("aria-valuenow", String(t));
    }
  })
], p.prototype, "valuenow", 2);
d([
  B({
    type: Number,
    default: 0,
    observer(t) {
      this.setAttribute("aria-valuemin", String(t));
    }
  })
], p.prototype, "valuemin", 2);
d([
  B({
    type: Number,
    default: 100,
    observer(t) {
      this.setAttribute("aria-valuemax", String(t));
    }
  })
], p.prototype, "valuemax", 2);
p = d([
  N(L, { styles: [X] })
], p);
export {
  S as EaSplitter,
  p as EaSplitterBar,
  x as EaSplitterPanel,
  E as EaSplitterPanelResizeEndEvent,
  b as EaSplitterPanelResizeEvent,
  y as EaSplitterPanelResizeStartEvent
};
