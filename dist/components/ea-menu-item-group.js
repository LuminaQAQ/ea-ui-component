var u = (e, o, t) => {
  if (!o.has(e))
    throw TypeError("Cannot " + t);
};
var r = (e, o, t) => (u(e, o, "read from private field"), t ? t.call(e) : o.get(e)), c = (e, o, t) => {
  if (o.has(e))
    throw TypeError("Cannot add the same private member more than once");
  o instanceof WeakSet ? o.add(e) : o.set(e, t);
}, l = (e, o, t, s) => (u(e, o, "write to private field"), s ? s.call(e, t) : o.set(e, t), t);
import { B as p } from "./Base.js";
import "./index3.js";
import { t as m } from "./timeout.js";
const d = `
.ea-menu-item-group_wrap {
  --normal-bgc: #fff;
  --normal-text-color: #303133;
  --actived-text-color: #409eff;
  --actived-bgc: #fff;
  width: 100%;
}
.ea-menu-item-group_wrap.is-actived .ea-submenu_title_wrap {
  color: var(--actived-text-color);
  border-color: var(--actived-text-color);
}
.ea-menu-item-group_wrap .ea-submenu_title_wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
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
.ea-menu-item-group_wrap .ea-submenu_items_wrap {
  margin: 0 20px;
  height: 0;
  overflow: hidden;
  transition: height 0.3s;
}
.ea-menu-item-group_wrap .ea-submenu_dropdown_icon {
  transform: rotate(-90deg);
  transition: transform 0.3s;
}
.ea-menu-item-group_wrap.is-open .ea-submenu_dropdown_icon {
  transform: rotate(0deg);
}
`;
var i, n, a;
class h extends p {
  constructor() {
    super();
    c(this, i, void 0);
    c(this, n, void 0);
    c(this, a, void 0);
    const t = this.attachShadow({ mode: "open" });
    t.innerHTML = `
            <div class="ea-menu-item-group_wrap" part="container">
                <div class="ea-submenu_title_wrap" part="title-wrap">
                    <slot name="title"></slot>
                    <ea-icon class="ea-submenu_dropdown_icon" icon="icon-angle-down" part="dropdown-icon"></ea-icon>
                </div>
                <div class="ea-submenu_items_wrap" part="dropdown-wrap">
                    <slot></slot>
                </div>
            </div>
        `, l(this, i, t.querySelector(".ea-menu-item-group_wrap")), l(this, n, t.querySelector(".ea-submenu_title_wrap")), l(this, a, t.querySelector(".ea-submenu_items_wrap")), this.build(t, d);
  }
  // ------- actived 菜单激活状态 -------
  // #region
  get actived() {
    return this.getAttrBoolean("actived");
  }
  set actived(t) {
    this.setAttribute("actived", t), r(this, i).classList.toggle("is-actived", t);
  }
  // #endregion
  // ------- end -------
  // ------- background-color 背景颜色 -------
  // #region
  get backgroundColor() {
    return this.getAttribute("background-color") || "#fff";
  }
  set backgroundColor(t) {
    this.setAttribute("background-color", t), r(this, i).style.setProperty("--normal-bgc", t);
  }
  // #endregion
  // ------- end -------
  // ------- text-color 文字颜色 -------
  // #region
  get textColor() {
    return this.getAttribute("text-color") || "#303133";
  }
  set textColor(t) {
    this.setAttribute("text-color", t), r(this, i).style.setProperty("--normal-text-color", t);
  }
  // #endregion
  // ------- end -------
  // ------- active-text-color 激活文字颜色 -------
  // #region
  get activeTextColor() {
    return this.getAttribute("active-text-color") || "#409eff";
  }
  set activeTextColor(t) {
    this.setAttribute("active-text-color", t), r(this, i).style.setProperty("--actived-text-color", t);
  }
  // #endregion
  // ------- end -------
  // ------- collapse 是否折叠 -------
  // #region
  get collapse() {
    return this.getAttrBoolean("collapse") || !1;
  }
  set collapse(t) {
    this.setAttribute("collapse", t), r(this, a).style.height = t ? r(this, a).scrollHeight + "px" : "0", r(this, i).classList.toggle("is-open", t);
  }
  // #endregion
  // ------- end -------
  connectedCallback() {
    this.style.width = "100%", this.querySelectorAll("ea-menu-item").forEach((s) => {
      s.isSubItem = !0, s.addEventListener("item-selected", (g) => {
        m(() => {
          this.actived = !0;
        }, 20);
      });
    }), r(this, n).addEventListener("click", (s) => {
      this.collapse = !this.collapse;
    });
  }
}
i = new WeakMap(), n = new WeakMap(), a = new WeakMap();
customElements.get("ea-menu-item-group") || customElements.define("ea-menu-item-group", h);
export {
  h as EaMenuItemGroup
};
