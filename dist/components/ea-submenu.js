var d = (e) => {
  throw TypeError(e);
};
var u = (e, o, t) => o.has(e) || d("Cannot " + t);
var s = (e, o, t) => (u(e, o, "read from private field"), t ? t.call(e) : o.get(e)), n = (e, o, t) => o.has(e) ? d("Cannot add the same private member more than once") : o instanceof WeakSet ? o.add(e) : o.set(e, t), c = (e, o, t, a) => (u(e, o, "write to private field"), a ? a.call(e, t) : o.set(e, t), t);
import { t as b } from "./timeout.js";
import { B as p } from "./Base.js";
import "./index3.js";
const m = `
.ea-submenu_wrap {
  --normal-bgc: #fff;
  --normal-text-color: #303133;
  --actived-text-color: #409eff;
  --actived-bgc: #fff;
  position: relative;
  box-sizing: border-box;
  padding: 0 20px;
  border-bottom: 2px solid;
  border-color: transparent;
  height: 60px;
  line-height: 60px;
  font-size: 14px;
  color: var(--normal-text-color);
  background-color: var(--normal-bgc);
  white-space: nowrap;
  cursor: pointer;
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;
}
.ea-submenu_wrap .ea-submenu_title_wrap {
  display: flex;
  justify-content: space-between;
}
.ea-submenu_wrap .ea-submenu_title_wrap .ea-submenu_dropdown_icon {
  rotate: -90deg;
  transition: rotate 0.3s;
}
.ea-submenu_wrap .ea-submenu_items_wrap {
  display: none;
  position: absolute;
  left: 0;
  margin-top: 3px;
  border-radius: 8px;
  overflow: hidden;
  min-width: 200px;
  z-index: 100;
  opacity: 0;
  transform-origin: left top;
  transform: scale(0);
  transition: opacity 0.3s, transform 0.3s;
}
.ea-submenu_wrap:hover .ea-submenu_items_wrap {
  opacity: 1;
  transform: scale(1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
.ea-submenu_wrap:hover .ea-submenu_title_wrap .ea-submenu_dropdown_icon {
  rotate: 0deg;
}
.ea-submenu_wrap.is-actived {
  color: var(--actived-text-color);
  border-color: var(--actived-text-color);
}
.ea-submenu_wrap.is-sub-actived {
  color: var(--actived-text-color);
}
.ea-submenu_wrap.is-disabled {
  color: #c0c4cc;
  pointer-events: none;
  cursor: not-allowed;
}
.ea-submenu_wrap ::slotted(a) {
  color: var(--normal-text-color);
  text-decoration: none;
}
`;
var r, l, i;
class h extends p {
  constructor() {
    super();
    n(this, r);
    n(this, l);
    n(this, i);
    const t = this.attachShadow({ mode: "open" });
    t.innerHTML = `
            <div class="ea-submenu_wrap" part="container">
                <div class="ea-submenu_title_wrap" part="title-wrap">
                    <slot name="title"></slot>
                    <ea-icon class="ea-submenu_dropdown_icon" icon="icon-angle-down" part="dropdown-icon"></ea-icon>
                </div>
                <div class="ea-submenu_items_wrap" part="dropdown-wrap">
                    <slot></slot>
                </div>
            </div>
        `, c(this, r, t.querySelector(".ea-submenu_wrap")), c(this, l, t.querySelector(".ea-submenu_title_wrap")), c(this, i, t.querySelector(".ea-submenu_items_wrap")), this.build(t, m);
  }
  // ------- actived 菜单激活状态 -------
  // #region
  get actived() {
    return this.getAttrBoolean("actived");
  }
  set actived(t) {
    this.setAttribute("actived", t), s(this, r).classList.toggle("is-actived", t);
  }
  // #endregion
  // ------- end -------
  // ------- background-color 背景颜色 -------
  // #region
  get backgroundColor() {
    return this.getAttribute("background-color") || "#fff";
  }
  set backgroundColor(t) {
    this.setAttribute("background-color", t), s(this, r).style.setProperty("--normal-bgc", t);
  }
  // #endregion
  // ------- end -------
  // ------- text-color 文字颜色 -------
  // #region
  get textColor() {
    return this.getAttribute("text-color") || "#303133";
  }
  set textColor(t) {
    this.setAttribute("text-color", t), s(this, r).style.setProperty("--normal-text-color", t);
  }
  // #endregion
  // ------- end -------
  // ------- active-text-color 激活文字颜色 -------
  // #region
  get activeTextColor() {
    return this.getAttribute("active-text-color") || "#409eff";
  }
  set activeTextColor(t) {
    this.setAttribute("active-text-color", t), s(this, r).style.setProperty("--actived-text-color", t);
  }
  // #endregion
  // ------- end -------
  // ------- disabled 禁用 -------
  // #region
  get disabled() {
    return this.getAttrBoolean("disabled");
  }
  set disabled(t) {
    this.setAttribute("disabled", t), s(this, r).classList.toggle("is-disabled", t);
  }
  // #endregion
  // ------- end -------
  // ------- mode 菜单模式 -------
  // #region
  get mode() {
    return this.getAttribute("mode") || "horizontal";
  }
  set mode(t) {
    this.setAttribute("mode", t), s(this, r).classList.toggle("is-vertical", t === "vertical");
  }
  // #endregion
  // ------- end -------
  connectedCallback() {
    this.disabled = this.disabled, this.querySelectorAll("ea-menu-item").forEach((a, g) => {
      a.isSubItem = !0, a.addEventListener("item-selected", (w) => {
        this.actived = !0;
      });
    }), b(() => {
      s(this, i).style.display = "block";
    }, 20);
  }
}
r = new WeakMap(), l = new WeakMap(), i = new WeakMap();
customElements.get("ea-submenu") || customElements.define("ea-submenu", h);
export {
  h as EaSubmenu
};
