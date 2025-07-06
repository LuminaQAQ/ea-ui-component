var _ = (s) => {
  throw TypeError(s);
};
var m = (s, i, t) => i.has(s) || _("Cannot " + t);
var e = (s, i, t) => (m(s, i, "read from private field"), t ? t.call(s) : i.get(s)), p = (s, i, t) => i.has(s) ? _("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(s) : i.set(s, t), o = (s, i, t, r) => (m(s, i, "write to private field"), r ? r.call(s, t) : i.set(s, t), t);
import { B as f } from "./Base.js";
import "./index3.js";
import { t as x } from "./timeout.js";
const u = `
.ea-step_wrap {
  color: #c0c4cc;
  transition: color 0.3s;
}
.ea-step_wrap .ea-step_head-wrap {
  position: relative;
}
.ea-step_wrap .ea-step_head-wrap .ea-step_head-icon {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  background-color: #fff;
  font-size: 14px;
  z-index: 1;
}
.ea-step_wrap .ea-step_head-wrap .ea-step_head-icon.is-text {
  border-radius: 50%;
  border: 2px solid;
}
.ea-step_wrap .ea-step_head-wrap .ea-step_bar {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 2px;
  width: 100%;
  height: 2px;
  background-color: #c0c4cc;
}
.ea-step_wrap .ea-step_head-wrap.is-last {
  flex-basis: auto;
}
.ea-step_wrap .ea-step_head-wrap.is-last .ea-step_bar {
  display: none;
}
.ea-step_wrap .ea-step_main-wrap {
  white-space: normal;
  text-align: left;
}
.ea-step_wrap .ea-step_main-wrap .ea-step_title-wrap {
  font-size: 16px;
  line-height: 38px;
}
.ea-step_wrap .ea-step_main-wrap .ea-step_description-wrap {
  margin-top: -5px;
  font-size: 12px;
  line-height: 20px;
}
.ea-step_wrap.is-process {
  color: #303133;
  border-color: #303133;
}
.ea-step_wrap.is-finish {
  color: #67c23a;
  border-color: #67c23a;
}
.ea-step_wrap.is-finish .ea-step_head-wrap .ea-step_bar {
  background-color: #67c23a;
}
.ea-step_wrap.is-simple {
  display: flex;
  align-items: center;
}
.ea-step_wrap.is-simple .ea-step_head-wrap {
  position: relative;
}
.ea-step_wrap.is-simple .ea-step_head-wrap .ea-step_bar {
  position: relative;
  width: auto;
  height: auto;
  transform: translateY(0%);
  margin-left: 2px;
  flex: 1;
}
.ea-step_wrap.is-simple .ea-step_main-wrap {
  margin-left: 16px;
  line-height: 24px;
  height: 24px;
}
.ea-step_wrap.is-simple .ea-step_main-wrap .ea-step_title-wrap {
  line-height: 24px;
}
`;
var n, h, a, c, d, l, w, g;
class b extends f {
  constructor() {
    super();
    p(this, n);
    p(this, h);
    p(this, a);
    p(this, c);
    p(this, d);
    p(this, l);
    p(this, w);
    p(this, g);
    const t = this.attachShadow({ mode: "open" });
    t.innerHTML = `
      <div class="ea-step_wrap" part="container">
        <div class="ea-step_head-wrap" part="head-wrap">
          <div class="ea-step_bar" part="step-bar"></div>
          <div class="ea-step_head-icon" part="head-icon"></div>
        </div>
        <div class="ea-step_main-wrap" part="main-wrap">
          <div class="ea-step_title-wrap" part="title-wrap">
            <slot name="title"></slot>
          </div>
          <div class="ea-step_description-wrap" part="description-wrap">
            <slot name="description"></slot>
          </div>
        </div>
      </div>
    `, o(this, n, t.querySelector(".ea-step_wrap")), o(this, h, t.querySelector(".ea-step_head-wrap")), o(this, a, t.querySelector(".ea-step_head-icon")), o(this, c, t.querySelector(".ea-step_bar")), o(this, d, t.querySelector(".ea-step_title-wrap")), o(this, w, t.querySelector('slot[name="title"]')), o(this, l, t.querySelector(".ea-step_description-wrap")), o(this, g, t.querySelector('slot[name="description"]')), this.build(t, u);
  }
  // ------- title 步骤的标题(如:步骤一) -------
  // #region
  get title() {
    return this.getAttribute("title");
  }
  set title(t) {
    if (!t) return;
    const r = this.querySelector('[slot="title"]');
    r ? (t = r.innerHTML, e(this, w).innerHTML = t) : e(this, d).innerText = t, this.setAttribute("title", t);
  }
  // #endregion
  // ------- end -------
  // ------- description 步骤的描述 -------
  // #region
  get description() {
    return this.getAttribute("description");
  }
  set description(t) {
    if (!t) return;
    const r = this.querySelector('[slot="description"]');
    r ? (t = r.innerHTML, e(this, g).innerHTML = t) : e(this, l).innerText = t, this.setAttribute("description", t);
  }
  // #endregion
  // ------- end -------
  // ------- space 步骤之间的间距 -------
  // #region
  get space() {
    return this.getAttribute("space") || "50%";
  }
  set space(t) {
    this.setAttribute("space", t || "50%"), this.style.flexBasis = t || "50%";
  }
  // #endregion
  // ------- end -------
  // ------- icon 步骤的图标 -------
  // #region
  get icon() {
    return this.getAttribute("icon");
  }
  set icon(t) {
    t ? e(this, a).innerHTML = `
          <ea-icon icon="${t}" size="24"></ea-icon>
      ` : (e(this, a).innerHTML = this.index + 1, e(this, a).classList.add("is-text"), t = this.index + 1), this.setAttribute("icon", t);
  }
  // #endregion
  // ------- end -------
  // ------- active 当前的步骤 -------
  // #region
  get active() {
    return this.getAttrBoolean("active") || !1;
  }
  set active(t) {
    this.toggleAttr("active", t);
  }
  // #endregion
  // ------- end -------
  // ------- is-last 是否最后一个步骤 -------
  // #region
  get isLast() {
    return this.getAttrBoolean("is-last") || !1;
  }
  set isLast(t) {
    this.toggleAttr("is-last", t), e(this, h).classList.toggle("is-last", t);
  }
  // #endregion
  // ------- end -------
  // ------- status 步骤的状态 -------
  // #region
  get status() {
    return this.getAttribute("status");
  }
  set status(t) {
    this.setAttribute("status", t), e(this, n).classList.toggle("is-finish", t === "finish"), e(this, n).classList.toggle("is-process", t === "process"), e(this, n).classList.toggle("is-wait", t === "wait"), t === "finish" ? e(this, a).querySelector("ea-icon") || (e(this, a).innerHTML = `
          <ea-icon icon="icon-ok" color="#67c23a" style="font-size: 14px; line-height: 14px;"></ea-icon>
      `) : e(this, a).innerHTML = this.index + 1;
  }
  // #endregion
  // ------- end -------
  // ------- simple 简洁模式 -------
  // #region
  get simple() {
    return this.getAttrBoolean("simple") || !1;
  }
  set simple(t) {
    this.toggleAttr("simple", t), e(this, n).classList.toggle("is-simple", t), t && !this.isLast ? (e(this, c).innerHTML = `
        <ea-icon icon="icon-angle-right" color="#c0c4cc" style="font-size: 24px; line-height: 24px;"></ea-icon>
      `, e(this, c).style.flex = "1", e(this, c).style.textAlign = "center", e(this, l).remove(), e(this, n).appendChild(e(this, c))) : t && !this.isLast && (e(this, c).innerHTML = "");
  }
  // #endregion
  // ------- end -------
  connectedCallback() {
    this.title = this.title, this.description = this.description, this.simple = this.simple, x(() => {
      this.icon = this.icon;
    }, 20);
  }
}
n = new WeakMap(), h = new WeakMap(), a = new WeakMap(), c = new WeakMap(), d = new WeakMap(), l = new WeakMap(), w = new WeakMap(), g = new WeakMap();
customElements.get("ea-step") || customElements.define("ea-step", b);
export {
  b as EaStep
};
