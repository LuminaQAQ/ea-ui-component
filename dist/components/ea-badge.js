var c = (e) => {
  throw TypeError(e);
};
var g = (e, a, t) => a.has(e) || c("Cannot " + t);
var r = (e, a, t) => (g(e, a, "read from private field"), t ? t.call(e) : a.get(e)), o = (e, a, t) => a.has(e) ? c("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(e) : a.set(e, t), n = (e, a, t, d) => (g(e, a, "write to private field"), d ? d.call(e, t) : a.set(e, t), t);
import { B as h } from "./Base.js";
const l = `
.ea-badge_wrap {
  position: relative;
  vertical-align: middle;
  display: inline-block;
}
.ea-badge_wrap .ea-badge_content {
  display: inline-block;
  padding: 0 0.375rem;
  border-radius: 0.625rem;
  border: 1px solid #fff;
  height: 1.125rem;
  line-height: 1.125rem;
  position: absolute;
  right: 0.625rem;
  top: 0;
  transform: translate(100%, -50%);
  color: #fff;
  font-size: 0.75rem;
  text-align: center;
  white-space: nowrap;
  background-color: #f56c6c;
}
.ea-badge_wrap .ea-badge_content.primary {
  background-color: #409eff;
}
.ea-badge_wrap .ea-badge_content.success {
  background-color: #67c23a;
}
.ea-badge_wrap .ea-badge_content.warning {
  background-color: #e6a23c;
}
.ea-badge_wrap .ea-badge_content.info {
  background-color: #909399;
}
.ea-badge_wrap .ea-badge_content.dot {
  right: 0.3125rem;
  padding: 0;
  border-radius: 50%;
  width: 0.5rem;
  height: 0.5rem;
}
`;
var s, i;
class b extends h {
  constructor() {
    super();
    o(this, s);
    o(this, i);
    const t = this.attachShadow({ mode: "open" });
    t.innerHTML = `
        <div class="ea-badge_wrap" part='container'>
            <slot></slot>
            <sup class="ea-badge_content" part='content'></sup>
        </div>
    `, n(this, s, t.querySelector(".ea-badge_wrap")), n(this, i, t.querySelector(".ea-badge_content")), this.build(t, l);
  }
  // ------- value 徽章内的值 -------
  // #region
  get value() {
    return this.getAttribute("value") || "";
  }
  set value(t) {
    this.setAttribute("value", t), r(this, i).innerHTML = t;
  }
  // #endregion
  // ------- end -------
  // ------- type 样式类型 -------
  // #region
  get type() {
    return this.getAttribute("type") || "normal";
  }
  set type(t) {
    this.setAttribute("type", t), r(this, i).classList.add(t);
  }
  // #endregion
  // ------- end -------
  // ------- max 最大值 -------
  // #region
  get max() {
    return this.getAttrNumber("max") || 1 / 0;
  }
  set max(t) {
    t !== 1 / 0 && (t = parseInt(t), this.setAttribute("max", t), this.value > t && (this.value = t + "+"));
  }
  // #endregion
  // ------- end -------
  // ------- is-dot 是否为点状徽章 -------
  // #region
  get isDot() {
    return this.getAttrBoolean("is-dot") || !1;
  }
  set isDot(t) {
    this.toggleAttr("is-dot", t), r(this, i).innerText = t ? "" : this.value, r(this, i).classList.toggle("dot", t);
  }
  // #endregion
  // ------- end -------
  connectedCallback() {
    this.value = this.value, this.type = this.type, this.max = this.max, this.isDot = this.isDot;
  }
}
s = new WeakMap(), i = new WeakMap();
customElements.get("ea-badge") || customElements.define("ea-badge", b);
export {
  b as EaBadge
};
