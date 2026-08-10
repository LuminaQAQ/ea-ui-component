import { EaOverlay as m } from "./ea-overlay.js";
import { q as p, a as n, p as y, l as c, C as _ } from "../core/decorator.js";
import { c as u } from "../utils/bem.ts.js";
import { E as C } from "../utils/Enum.ts.js";
import { s as f } from "../css/ea-drawer.style.js";
import "./ea-icon.js";
var g = Object.defineProperty, v = Object.getOwnPropertyDescriptor, r = (e, s, o, l) => {
  for (var a = l > 1 ? void 0 : l ? v(s, o) : s, d = e.length - 1, h; d >= 0; d--)
    (h = e[d]) && (a = (l ? h(s, o, a) : h(a)) || a);
  return l && a && g(s, o, a), a;
};
const b = "ea-drawer", A = u(b), i = u("ea-drawer-main"), w = ["rtl", "ltr", "ttb", "btt"];
let t = class extends m {
  constructor() {
    super(...arguments), this.direction = "rtl", this.withHeader = !0, this.heading = "", this.showClose = !0, this.size = "30%", this.beforeClose = null, this.description = "";
  }
  html() {
    const e = document.createElement("template");
    e.innerHTML = super.html();
    const s = e.content.querySelector(".ea-overlay__content");
    return s.innerHTML = `
      <div class='${i()}' part='container'>
        <header class='${i.e("header")}' part='header'>
          <slot name="title">
            <span class='${i.e("heading")}' part='heading'></span>
            <ea-icon class='${i.e("close-icon")}' name='xmark' part='close-icon' tabindex='0' role='button' aria-label='Close'></ea-icon>
          </slot>
        </header>
        <main class='${i.e("content")}' part='content'>
          <slot></slot>
        </main>
        <footer class='${i.e("footer")}' part='footer'>
          <slot name='footer'></slot>
        </footer>
      </div>
    `, e.innerHTML;
  }
  /**
   * 更新容器类名
   */
  updateContainerClasslist() {
    const e = A(
      { [this.direction]: !0 },
      {
        "close-hidden": !this.showClose,
        "header-hidden": !this.withHeader
      }
    ), o = `${super.updateContainerClasslist()} ${e}`.trim();
    return this._container && (this._container.className = o), o;
  }
  _handleCloseIconClick() {
    this.showClose && this.hide();
  }
  _handleClosed(e) {
    e.target === this && this.hide();
  }
  // ==================== a11y 方法 ====================
  /** 更新 aria-labelledby 指向标题元素 */
  _updateAriaLabelledBy() {
    this._heading && this.heading ? (this._heading.id || (this._heading.id = `ea-drawer-heading-${t._idCounter++}`), this.setAttribute("aria-labelledby", this._heading.id)) : this.heading ? (this.setAttribute("aria-label", this.heading), this.removeAttribute("aria-labelledby")) : (this.removeAttribute("aria-label"), this.removeAttribute("aria-labelledby"));
  }
  /** 更新 aria-describedby 指向描述内容 */
  _updateAriaDescribedBy() {
    this.description && this._content ? (this._content.id || (this._content.id = `ea-drawer-desc-${t._idCounter++}`), this.setAttribute("aria-describedby", this._content.id)) : this.removeAttribute("aria-describedby");
  }
  // ==================== 生命周期 ====================
  $mount() {
    var e;
    (e = super.$mount) == null || e.call(this);
    try {
      this.setAttribute("role", "dialog");
    } catch {
      this.role = "dialog";
    }
    this.setAttribute("aria-modal", "true"), this.updateContainerClasslist();
  }
  $mounted() {
    this._updateAriaLabelledBy(), this._updateAriaDescribedBy();
  }
  $beforeUnmount() {
    var e;
    (e = super.$beforeUnmount) == null || e.call(this);
  }
};
t._idCounter = 0;
r([
  p(i.ce("header"))
], t.prototype, "_header", 2);
r([
  p(i.ce("heading"))
], t.prototype, "_heading", 2);
r([
  p(i.ce("content"))
], t.prototype, "_content", 2);
r([
  n({
    type: C(w),
    default: "rtl",
    observer() {
      this.updateContainerClasslist();
    }
  })
], t.prototype, "direction", 2);
r([
  n({
    type: Boolean,
    default: !0,
    observer() {
      this.updateContainerClasslist();
    }
  })
], t.prototype, "withHeader", 2);
r([
  n({
    type: String,
    default: "",
    observer(e) {
      this._heading && (this._heading.textContent = e), this._updateAriaLabelledBy();
    }
  })
], t.prototype, "heading", 2);
r([
  n({
    type: Boolean,
    default: !0,
    a11y: {
      ariaAttr: "inert",
      target: ".ea-drawer-main__close-icon",
      map: (e) => e ? null : ""
    },
    observer() {
      this.updateContainerClasslist();
    }
  })
], t.prototype, "showClose", 2);
r([
  n({
    type: String,
    default: "30%",
    observer(e) {
      this.style.setProperty("--ea-drawer-size", e);
    }
  })
], t.prototype, "size", 2);
r([
  y({
    type: Function,
    default: null
  })
], t.prototype, "beforeClose", 2);
r([
  n({
    type: String,
    default: "",
    observer() {
      this._updateAriaDescribedBy();
    }
  })
], t.prototype, "description", 2);
r([
  c("click", i.ce("close-icon"))
], t.prototype, "_handleCloseIconClick", 1);
r([
  c("ea-closed")
], t.prototype, "_handleClosed", 1);
t = r([
  _(b, { styles: [f] })
], t);
export {
  t as EaDrawer
};
