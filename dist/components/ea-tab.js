var l = (e, a, t) => {
  if (!a.has(e))
    throw TypeError("Cannot " + t);
};
var i = (e, a, t) => (l(e, a, "read from private field"), t ? t.call(e) : a.get(e)), s = (e, a, t) => {
  if (a.has(e))
    throw TypeError("Cannot add the same private member more than once");
  a instanceof WeakSet ? a.add(e) : a.set(e, t);
}, h = (e, a, t, o) => (l(e, a, "write to private field"), o ? o.call(e, t) : a.set(e, t), t);
var n = (e, a, t) => (l(e, a, "access private method"), t);
import { B as w } from "./Base.js";
import "./index3.js";
import "./ea-pane.js";
import { c as g } from "./createElement.js";
const m = `
.ea-tab_wrap {
  --border-radius-top-left: 0;
  --border-radius-top-right: 0;
  --border-right-width: 0;
  position: relative;
  box-sizing: border-box;
  padding: 0 1.25rem;
  height: 40px;
  line-height: 40px;
  min-width: 1rem;
  font-size: 14px;
  font-weight: 500;
  color: #303133;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  transition: color 0.3s, background-color 0.3s, width 0.3s, min-width 0.3s;
}
.ea-tab_wrap:hover {
  color: #409eff;
}
.ea-tab_wrap.ea-tab_wrap--normal.is-actived {
  color: #409eff;
}
.ea-tab_wrap.ea-tabs_wrap--card {
  border-bottom: 1px solid #e4e7ed;
}
.ea-tab_wrap.ea-tabs_wrap--card .ea-tabs_tab-bottom-bar {
  height: 1px;
  bottom: -1px;
  background-color: white;
}
.ea-tab_wrap.ea-tab_wrap--card {
  border-top-left-radius: var(--border-radius-top-left);
  border-top-right-radius: var(--border-radius-top-right);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-right-width: var(--border-right-width);
}
.ea-tab_wrap.ea-tab_wrap--card.is-actived {
  border-bottom-color: white;
  color: #409eff;
}
.ea-tab_wrap.ea-tab_wrap--border-card {
  border-top-left-radius: var(--border-radius-top-left);
  border-top-right-radius: var(--border-radius-top-right);
  border: 0px solid rgba(0, 0, 0, 0.1);
  border-right-width: var(--border-right-width);
}
.ea-tab_wrap.ea-tab_wrap--border-card.is-actived {
  border-bottom-color: white;
  color: #409eff;
  background-color: white;
}
.ea-tab_wrap.ea-tab_wrap--editable .ea-tab_wrap--editable-sign {
  display: block;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
  user-select: none;
  width: 0;
  overflow: hidden;
  transition: width 0.3s;
}
.ea-tab_wrap.ea-tab_wrap--editable:hover .ea-tab_wrap--editable-sign {
  width: 14px;
}
`;
var r, d, p, b, c;
class u extends w {
  constructor() {
    super();
    // #endregion
    // ------- end -------
    s(this, d);
    s(this, b);
    s(this, r, void 0);
    const t = this.attachShadow({ mode: "open" });
    t.innerHTML = `
            <div class="ea-tab_wrap" part="container">
                <slot></slot>
            </div>
        `, h(this, r, t.querySelector(".ea-tab_wrap")), this.build(t, m);
  }
  // ------- name 唯一标识 -------
  // #region
  get name() {
    return this.getAttribute("name");
  }
  set name(t) {
    this.setAttribute("name", t);
  }
  // #endregion
  // ------- end -------
  // ------- type 标签样式类型 -------
  // #region
  get type() {
    return this.getAttrBoolean("type") || "normal";
  }
  set type(t) {
    this.setAttribute("type", t), i(this, r).classList.add(`ea-tab_wrap--${t}`);
  }
  // #endregion
  // ------- end -------
  // ------- actived 标签是否被选中 -------
  // #region
  get actived() {
    return this.getAttrBoolean("actived");
  }
  set actived(t) {
    this.toggleAttr("actived", t), i(this, r).classList.toggle("is-actived", t);
  }
  // #endregion
  // ------- end -------
  // ------- editable 是否可关闭 -------
  // #region
  get editable() {
    return this.getAttrBoolean("editable");
  }
  set editable(t) {
    this.setAttribute("editable", t), i(this, r).classList.toggle("ea-tab_wrap--editable", t), t && n(this, b, c).call(this);
  }
  handleBorderRadius(t) {
    i(this, r).style.setProperty(t, "3px");
  }
  handleBorderRightWidth() {
    i(this, r).style.setProperty("--border-right-width", "1px");
  }
  connectedCallback() {
    this.editable = this.editable, this.label = this.label, n(this, d, p).call(this);
  }
}
r = new WeakMap(), d = new WeakSet(), p = function() {
  this.addEventListener("click", (t) => {
    const o = t.detail.value === this.getAttrBoolean("selected");
    this.toggleAttr("selected", o), this.dispatchEvent(new CustomEvent("tab-click", {
      detail: {
        name: this.name,
        event: this
      },
      bubbles: !0
    }));
  });
}, b = new WeakSet(), c = function() {
  const t = g("span", "ea-tab_wrap--editable-sign");
  t.innerText = "x", i(this, r).appendChild(t), t.addEventListener("click", (o) => {
    o.stopPropagation(), this.dispatchEvent(new CustomEvent("tab-close", {
      detail: {
        event: this,
        name: this.name,
        index: this.index
      },
      bubbles: !0
    }));
  });
};
customElements.get("ea-tab") || customElements.define("ea-tab", u);
export {
  u as EaTab
};
