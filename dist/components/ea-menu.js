var u = (e) => {
  throw TypeError(e);
};
var h = (e, o, t) => o.has(e) || u("Cannot " + t);
var c = (e, o, t) => (h(e, o, "read from private field"), t ? t.call(e) : o.get(e)), d = (e, o, t) => o.has(e) ? u("Cannot add the same private member more than once") : o instanceof WeakSet ? o.add(e) : o.set(e, t), m = (e, o, t, r) => (h(e, o, "write to private field"), r ? r.call(e, t) : o.set(e, t), t);
import { B as p } from "./Base.js";
import "./index3.js";
import "./ea-menu-item.js";
import "./ea-submenu.js";
import "./ea-menu-item-group.js";
const n = (e) => {
  e.actived = !1;
};
function g(e, o, t) {
  e.forEach(n), o.forEach(n), t.forEach(n);
}
function b(e, o, t) {
  e.forEach((r, s) => {
    r.itemIndex = s, r.addEventListener("item-selected", (l) => {
      const a = l.detail.title;
      g(e, o, t), r.actived = !0, this.dispatchEvent(new CustomEvent("select", {
        detail: {
          index: s,
          title: a
        }
      }));
    });
  });
}
const f = `
.ea-menu_wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
}
.ea-menu_wrap.is-vertical {
  flex-direction: column;
  align-items: flex-start;
  border-right: 1px solid #e6e6e6;
  overflow: auto;
}
.ea-menu_wrap.is-vertical ::slotted(ea-menu-item),
.ea-menu_wrap.is-vertical ::slotted(ea-submenu) {
  width: 100%;
}
.ea-menu_wrap.is-vertical ::slotted(ea-submenu) {
  width: 100%;
}
`;
var i;
class x extends p {
  constructor() {
    super();
    d(this, i);
    const t = this.attachShadow({ mode: "open" });
    t.innerHTML = `
            <div class="ea-menu_wrap" part="container">
                <slot></slot>
            </div>
        `, m(this, i, t.querySelector(".ea-menu_wrap")), this.build(t, f);
  }
  // ------- mode 顶栏排列方式 -------
  // #region
  get mode() {
    return this.getAttribute("mode") || "vertical";
  }
  set mode(t) {
    this.setAttribute("mode", t), c(this, i).classList.toggle("is-vertical", t === "vertical"), this.querySelectorAll("ea-submenu").forEach((r) => {
      r.mode = t;
    });
  }
  // #endregion
  // ------- end -------
  // ------- background-color 背景颜色 -------
  // #region
  get backgroundColor() {
    return this.getAttribute("background-color") || "#fff";
  }
  set backgroundColor(t) {
    this.setAttribute("background-color", t), c(this, i).style.backgroundColor = t;
  }
  // #endregion
  // ------- end -------
  // ------- text-color 文字颜色 -------
  // #region
  get textColor() {
    return this.getAttribute("text-color") || "#303133";
  }
  set textColor(t) {
    this.setAttribute("text-color", t);
  }
  // #endregion
  // ------- end -------
  // ------- active-text-color 激活文字颜色 -------
  // #region
  get activeTextColor() {
    return this.getAttribute("active-text-color") || "#409eff";
  }
  set activeTextColor(t) {
    this.setAttribute("active-text-color", t);
  }
  // #endregion
  // ------- end -------
  // ------- collapse 是否折叠 -------
  // #region
  get collapse() {
    return this.getAttrBoolean("collapse");
  }
  set collapse(t) {
    this.toggleAttr("collapse", t), this.querySelectorAll("ea-menu-item-group").forEach((r) => {
      this.mode === "vertical" && (r.collapse = !t);
    });
  }
  // #endregion
  // ------- end -------
  connectedCallback() {
    this.mode = this.mode, this.collapse = !0, this.backgroundColor = this.backgroundColor, this.textColor = this.textColor, this.activeTextColor = this.activeTextColor;
    const t = this.querySelectorAll("ea-menu-item"), r = this.querySelectorAll("ea-submenu"), s = this.querySelectorAll("ea-menu-item-group");
    b.call(this, t, r, s);
    const l = (a, v) => {
      a.backgroundColor = this.backgroundColor, a.textColor = this.textColor, a.activeTextColor = this.activeTextColor;
    };
    t.forEach(l), r.forEach(l), s.forEach(l);
  }
}
i = new WeakMap();
customElements.get("ea-menu") || customElements.define("ea-menu", x);
export {
  x as EaMenu
};
