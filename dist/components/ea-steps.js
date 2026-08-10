import { E as y } from "../core/EaBase.ts.js";
import { q as d, a as o, C as g, l as v } from "../core/decorator.js";
import { E as f } from "../utils/Enum.ts.js";
import { s as b } from "../css/ea-step.style.js";
import "./ea-icon.js";
import { c as _ } from "../utils/bem.ts.js";
import { s as A } from "../css/ea-steps.style.js";
var E = Object.defineProperty, $ = Object.getOwnPropertyDescriptor, n = (t, s, e, r) => {
  for (var i = r > 1 ? void 0 : r ? $(s, e) : s, h = t.length - 1, u; h >= 0; h--)
    (u = t[h]) && (i = (r ? u(s, e, i) : u(i)) || i);
  return r && i && E(s, e, i), i;
};
const S = "ea-step", l = _(S);
let a = class extends y {
  constructor() {
    super(...arguments), this.heading = "", this.description = "", this.icon = "", this.status = "", this.index = 0, this.simple = !1, this.alignCenter = !1, this.direction = "horizontal";
  }
  get _hostContextSteps() {
    try {
      return this.closest("ea-steps");
    } catch {
      return null;
    }
  }
  /** 更新容器类名 */
  updateContainerClasslist() {
    var r;
    const t = (r = this._hostContextSteps) == null ? void 0 : r.querySelectorAll("ea-step"), s = t ? t.length - 1 === this.index : !1, e = l(
      {
        [this.direction]: !!this.direction
      },
      {
        [this.status]: !!this.status,
        "align-center": this.alignCenter,
        icon: !!this.icon,
        simple: this.simple,
        last: s,
        first: this.index === 0
      }
    );
    return this._container && (this._container.className = e), e;
  }
  /** 根据 status 更新图标显示 */
  _updateStatus(t = this.status) {
    var s;
    t === ((s = this._hostContextSteps) == null ? void 0 : s.getAttribute("finish-status")) ? (this._stepIcon.setAttribute("name", "check"), this._stepIcon.textContent = "") : (this._stepIcon.setAttribute("name", ""), this._stepIcon.textContent = String(this.index + 1));
  }
  /** 根据 status 更新 aria-current 属性 */
  _updateAriaCurrent(t = this.status) {
    this._container && (t === "process" ? this._container.setAttribute("aria-current", "step") : this._container.removeAttribute("aria-current"));
  }
  html() {
    return `
      <div class='${l()}' part='container' role='listitem'>
        <section class="${l.e("head")}" part="head">
          <div class="${l.e("icon-wrapper")}" part="icon-wrapper">
            <slot name="icon">
              <ea-icon class="${l.e("icon")}" part="icon"></ea-icon>
            </slot>
          </div>
          <div class="${l.e("tail")}" part="tail"></div>
        </section>
        <section class="${l.e("main")}" part="main">
          <div class="${l.e("heading")}" part="heading">
            <slot name="heading"></slot>
          </div>
          <div class="${l.e("description")}" part="description">
            <slot name="description"></slot>
          </div>
        </section>
        <span class="${l.e("simple-arrow")}" part="simple-arrow">
          <slot name="simple-arrow"></slot>
        </span>
      </div>
    `;
  }
  $mount() {
    this.updateContainerClasslist(), this._updateAriaCurrent();
  }
};
n([
  d(l.cb())
], a.prototype, "_container", 2);
n([
  d(l.ce("icon"))
], a.prototype, "_stepIcon", 2);
n([
  d('slot[name="heading"]')
], a.prototype, "_headingSlot", 2);
n([
  d('slot[name="description"]')
], a.prototype, "_descriptionSlot", 2);
n([
  o({
    type: String,
    default: "",
    observer(t) {
      this._headingSlot.textContent = t;
    }
  })
], a.prototype, "heading", 2);
n([
  o({
    type: String,
    default: "",
    observer(t) {
      this._descriptionSlot.textContent = t;
    }
  })
], a.prototype, "description", 2);
n([
  o({
    type: String,
    default: "",
    observer(t) {
      this._stepIcon.setAttribute("name", t);
    }
  })
], a.prototype, "icon", 2);
n([
  o({
    type: f(["", "wait", "process", "finish", "error", "success"]),
    default: "",
    observer(t) {
      this.updateContainerClasslist(), this._updateAriaCurrent(t), !this.icon && this._updateStatus(t);
    }
  })
], a.prototype, "status", 2);
n([
  o({
    type: Number,
    default: 0
  })
], a.prototype, "index", 2);
n([
  o({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], a.prototype, "simple", 2);
n([
  o({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], a.prototype, "alignCenter", 2);
n([
  o({
    type: String,
    default: "horizontal",
    observer() {
      this.updateContainerClasslist();
    }
  })
], a.prototype, "direction", 2);
a = n([
  g(S, { styles: [b] })
], a);
var x = Object.defineProperty, w = Object.getOwnPropertyDescriptor, c = (t, s, e, r) => {
  for (var i = r > 1 ? void 0 : r ? w(s, e) : s, h = t.length - 1, u; h >= 0; h--)
    (u = t[h]) && (i = (r ? u(s, e, i) : u(i)) || i);
  return r && i && x(s, e, i), i;
};
const C = "ea-steps", m = _(C);
let p = class extends y {
  constructor() {
    super(...arguments), this.space = "50%", this.active = 0, this.processStatus = "process", this.finishStatus = "finish", this.alignCenter = !1, this.simple = !1, this.direction = "horizontal", this._handleSlotChange = () => {
      const t = [...this.querySelectorAll("ea-step")];
      t.forEach((s, e) => {
        s.index = e, s.toggleAttribute("first", e === 0), s.toggleAttribute("last", e === t.length - 1), s.toggleAttribute("simple", this.simple), s.toggleAttribute("align-center", this.alignCenter), s.setAttribute("direction", this.direction);
      }), this._updateStepStatus(this.active), this._updateSimpleStatus();
    };
  }
  /** 更新容器类名 */
  updateContainerClasslist() {
    const t = m(
      {},
      {
        simple: this.simple,
        "align-center": this.alignCenter
      }
    );
    return this._container && (this._container.className = t), t;
  }
  /** 根据 active 更新子 step 的 status */
  _updateStepStatus(t = this.active) {
    [...this.querySelectorAll("ea-step")].forEach((e) => {
      e.index < t ? e.setAttribute("status", this.finishStatus) : e.index > t ? e.setAttribute("status", "wait") : e.setAttribute("status", this.processStatus);
    });
  }
  /** 更新简洁模式下的箭头图标 */
  _updateSimpleStatus(t = this.simple) {
    const s = [...this.querySelectorAll("ea-step")];
    t ? s.forEach((e) => {
      var r;
      try {
        (r = e.querySelector('[slot="simple-arrow"]')) == null || r.remove();
      } catch {
      }
      try {
        const i = document.createElement("ea-icon");
        i.setAttribute("slot", "simple-arrow"), i.setAttribute("name", "angle-right"), i.part = "simple-arrow", e.appendChild(i);
      } catch {
      }
    }) : s.forEach((e) => {
      var r;
      try {
        (r = e.querySelector('[slot="simple-arrow"]')) == null || r.remove();
      } catch {
      }
    });
  }
  html() {
    return `
      <div class='${m()}' part='container' role='list'>
        <slot></slot>
      </div>
    `;
  }
  _onSlotChange() {
    this._handleSlotChange();
  }
  $mount() {
    this.updateContainerClasslist();
  }
};
c([
  d(m.cb())
], p.prototype, "_container", 2);
c([
  o({
    type: String,
    default: "50%",
    observer(t) {
      this.style.setProperty("--ea-step-tail-spacing", t);
    }
  })
], p.prototype, "space", 2);
c([
  o({
    type: Number,
    default: 0,
    observer(t) {
      this._updateStepStatus(t);
    }
  })
], p.prototype, "active", 2);
c([
  o({
    type: f(["wait", "process", "finish", "error", "success"]),
    default: "process"
  })
], p.prototype, "processStatus", 2);
c([
  o({
    type: f(["wait", "process", "finish", "error", "success"]),
    default: "finish"
  })
], p.prototype, "finishStatus", 2);
c([
  o({
    type: Boolean,
    default: !1,
    observer(t) {
      [...this.querySelectorAll("ea-step")].forEach((e) => {
        e.toggleAttribute("align-center", t);
      }), this.updateContainerClasslist();
    }
  })
], p.prototype, "alignCenter", 2);
c([
  o({
    type: Boolean,
    default: !1,
    observer(t) {
      [...this.querySelectorAll("ea-step")].forEach((e) => {
        e.toggleAttribute("simple", t);
      }), this._updateSimpleStatus(t), this.updateContainerClasslist();
    }
  })
], p.prototype, "simple", 2);
c([
  o({
    type: f(["vertical", "horizontal"]),
    default: "horizontal",
    observer(t) {
      [...this.querySelectorAll("ea-step")].forEach((e) => {
        e.setAttribute("direction", t);
      });
    }
  })
], p.prototype, "direction", 2);
c([
  v("slotchange", "slot")
], p.prototype, "_onSlotChange", 1);
p = c([
  g(C, { styles: [A] })
], p);
const j = { EaStep: a, EaSteps: p };
export {
  a as EaStep,
  p as EaSteps,
  j as default
};
