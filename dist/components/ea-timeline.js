import { E as f } from "../core/EaBase.ts.js";
import { C as u, q as h, a as i } from "../core/decorator.js";
import { s as C } from "../css/ea-timeline.style.js";
import { c as y } from "../utils/bem.ts.js";
import { h as b } from "../utils/html.ts.js";
import { E as d } from "../utils/Enum.ts.js";
import { V as $ } from "../core/constants.js";
import { s as T } from "../css/ea-timeline-item.style.js";
import "./ea-icon.js";
var E = Object.getOwnPropertyDescriptor, g = (t, a, m, l) => {
  for (var o = l > 1 ? void 0 : l ? E(a, m) : a, p = t.length - 1, n; p >= 0; p--)
    (n = t[p]) && (o = n(o) || o);
  return o;
};
const v = "ea-timeline", w = y(v);
let c = class extends f {
  html() {
    return `
      <div class="${w()}" part="container" role="list">
        <slot></slot>
      </div>
    `;
  }
};
c = g([
  u(v, { styles: [C] })
], c);
var P = Object.defineProperty, S = Object.getOwnPropertyDescriptor, s = (t, a, m, l) => {
  for (var o = l > 1 ? void 0 : l ? S(a, m) : a, p = t.length - 1, n; p >= 0; p--)
    (n = t[p]) && (o = (l ? n(a, m, o) : n(o)) || o);
  return l && o && P(a, m, o), o;
};
const _ = "ea-timeline-item", r = y(_);
let e = class extends f {
  constructor() {
    super(...arguments), this.variant = "", this.timestamp = "", this.hideTimestamp = !1, this.color = "", this.hollow = !1, this.icon = "", this.size = "", this.placement = "", this.center = !1;
  }
  /** 更新容器类名列表 */
  updateContainerClasslist() {
    const t = r(
      {
        [this.variant]: !!this.variant,
        [this.size]: !!this.size,
        [this.placement]: !!this.placement,
        center: this.center
      },
      {
        "hollow-dot": this.hollow,
        "hide-timestamp": this.hideTimestamp
      }
    );
    return this._container && (this._container.className = t), t;
  }
  html() {
    return `
      <div class="${r()}" part="container" role="listitem">
        <aside class="${r.e("wrapper")}" part="left-wrapper">
          <slot name="dot">
            <section class="${r.e("dot")}" part="dot"></section>
          </slot>
          <section class="${r.e("tail")}" part="tail"></section>
        </aside>
        <main class="${r.e("wrapper")} ${r.e("right-wrapper")}" part="right-wrapper">
          <header class="${r.e("content")}" part="content">
            <slot></slot>
          </header>
          <footer class="${r.e("timestamp")}" part="timestamp">
            <slot name="timestamp"></slot>
          </footer>
        </main>
      </div>
    `;
  }
  $mount() {
    this.updateContainerClasslist();
  }
};
s([
  h(r.cb())
], e.prototype, "_container", 2);
s([
  h(r.ce("dot"))
], e.prototype, "_dot", 2);
s([
  h('slot[name="timestamp"]')
], e.prototype, "_timestampSlot", 2);
s([
  i({
    type: d($),
    default: "",
    observer() {
      this.updateContainerClasslist();
    }
  })
], e.prototype, "variant", 2);
s([
  i({
    type: String,
    default: "",
    observer(t) {
      this._timestampSlot.textContent = t;
    }
  })
], e.prototype, "timestamp", 2);
s([
  i({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], e.prototype, "hideTimestamp", 2);
s([
  i({
    type: String,
    default: "",
    observer(t) {
      if (!t) {
        this.style.removeProperty("--ea-timeline-item-dot-color"), this._dot && (this._dot.style.borderColor = "");
        return;
      }
      if (!CSS.supports("color", t))
        return console.warn(
          `[EaTimelineItem] The color value ${t} is not supported.`
        );
      this._dot && (this.style.setProperty("--ea-timeline-item-dot-color", t), this._dot.style.borderColor = t);
    }
  })
], e.prototype, "color", 2);
s([
  i({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], e.prototype, "hollow", 2);
s([
  i({
    type: String,
    default: "",
    observer(t) {
      t ? this._dot.innerHTML = b(
        `<ea-icon class="${r.e("icon-dot")}" part="icon-dot" name="${t}"></ea-icon>`
      ) : this._dot.innerHTML = "";
    }
  })
], e.prototype, "icon", 2);
s([
  i({
    type: d(["normal", "large"]),
    default: "",
    observer() {
      this.updateContainerClasslist();
    }
  })
], e.prototype, "size", 2);
s([
  i({
    type: d(["top", "bottom"]),
    default: "",
    observer() {
      this.updateContainerClasslist();
    }
  })
], e.prototype, "placement", 2);
s([
  i({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], e.prototype, "center", 2);
e = s([
  u(_, { styles: [T] })
], e);
const I = { EaTimeline: c, EaTimelineItem: e };
export {
  c as EaTimeline,
  e as EaTimelineItem,
  I as default
};
