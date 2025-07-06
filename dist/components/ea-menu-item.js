var a = (e) => {
  throw TypeError(e);
};
var c = (e, o, t) => o.has(e) || a("Cannot " + t);
var r = (e, o, t) => (c(e, o, "read from private field"), t ? t.call(e) : o.get(e)), l = (e, o, t) => o.has(e) ? a("Cannot add the same private member more than once") : o instanceof WeakSet ? o.add(e) : o.set(e, t), n = (e, o, t, s) => (c(e, o, "write to private field"), s ? s.call(e, t) : o.set(e, t), t);
import { B as d } from "./Base.js";
import "./index3.js";
const m = `
.ea-menu-item_wrap {
  --normal-bgc: #fff;
  --normal-text-color: #303133;
  --actived-text-color: #409eff;
  --actived-bgc: #fff;
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
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;
}
.ea-menu-item_wrap.is-actived {
  color: var(--actived-text-color);
  border-color: var(--actived-text-color);
}
.ea-menu-item_wrap.is-actived ::slotted(a) {
  color: var(--actived-text-color);
}
.ea-menu-item_wrap.is-sub-actived {
  color: var(--actived-text-color);
}
.ea-menu-item_wrap.is-sub-actived ::slotted(a) {
  color: var(--actived-text-color);
}
.ea-menu-item_wrap.is-disabled {
  color: #c0c4cc;
  pointer-events: none;
  cursor: not-allowed;
}
.ea-menu-item_wrap.is-disabled ::slotted(a) {
  color: #c0c4cc;
}
.ea-menu-item_wrap ::slotted(a) {
  color: var(--normal-text-color);
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
`;
var i;
class b extends d {
  constructor() {
    super();
    l(this, i);
    const t = this.attachShadow({ mode: "open" });
    t.innerHTML = `
            <div class="ea-menu-item_wrap" part="container">
                <slot></slot>
            </div>
        `, n(this, i, t.querySelector(".ea-menu-item_wrap")), this.build(t, m);
  }
  // ------- actived 菜单激活状态 -------
  // #region
  get actived() {
    return this.getAttrBoolean("actived");
  }
  set actived(t) {
    this.setAttribute("actived", t), this.isSubItem ? r(this, i).classList.toggle("is-sub-actived", t) : r(this, i).classList.toggle("is-actived", t);
  }
  // #endregion
  // ------- end -------
  // ------- isSubItem 是否为子菜单 -------
  // #region
  get isSubItem() {
    return this.getAttrBoolean("is-sub-item");
  }
  set isSubItem(t) {
    t && this.setAttribute("is-sub-item", t);
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
  // ------- disabled 禁用 -------
  // #region
  get disabled() {
    return this.getAttrBoolean("disabled");
  }
  set disabled(t) {
    this.setAttribute("disabled", t), r(this, i).classList.toggle("is-disabled", t);
  }
  // #endregion
  // ------- end -------
  connectedCallback() {
    this.actived = this.actived, this.disabled = this.disabled, r(this, i).addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("item-selected", {
        detail: {
          index: this.index,
          title: this.textContent
        }
      }));
    });
  }
}
i = new WeakMap();
customElements.get("ea-menu-item") || customElements.define("ea-menu-item", b);
export {
  b as EaMenuItem
};
