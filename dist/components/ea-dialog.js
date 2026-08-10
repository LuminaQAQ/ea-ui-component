import { EaOverlay as f } from "./ea-overlay.js";
import { q as p, a as r, l as c, C as b } from "../core/decorator.js";
import { c as _ } from "../utils/bem.ts.js";
import { s as m } from "../css/ea-dialog.style.js";
import "./ea-icon.js";
var g = Object.defineProperty, C = Object.getOwnPropertyDescriptor, o = (e, a, i, n) => {
  for (var l = n > 1 ? void 0 : n ? C(a, i) : a, d = e.length - 1, h; d >= 0; d--)
    (h = e[d]) && (l = (n ? h(a, i, l) : h(l)) || l);
  return n && l && g(a, i, l), l;
};
const y = "ea-dialog", s = _(y);
let t = class extends f {
  constructor() {
    super(...arguments), this.heading = "", this.width = "50%", this.top = "50%", this.center = !1, this.fullscreen = !1, this.appendToBody = !1, this.showClose = !0, this.modalPentrable = !1, this.movable = !1, this.alertdialog = !1, this.description = "";
  }
  // ==================== 方法 ====================
  html() {
    const e = document.createElement("template");
    e.innerHTML = super.html();
    const a = e.content.querySelector(".ea-overlay__content");
    return a.innerHTML = `
      <div class='${s()}' part='container'>
        <header class='${s.e("header")}' part='header'>
          <slot name="header">
            <span class='${s.e("heading")}' part='heading'></span>
            <ea-icon class='${s.e("close-icon")}' name='xmark' part='close-icon' tabindex='0' role='button' aria-label='Close'></ea-icon>
          </slot>
        </header>
        <main class='${s.e("content")}' part='content'>
          <slot></slot>
        </main>
        <footer class='${s.e("footer")}' part='footer'>
          <slot name='footer'></slot>
        </footer>
      </div>
    `, e.innerHTML;
  }
  /**
   * 更新容器类名
   */
  updateContainerClasslist() {
    const e = s(
      {
        center: this.center,
        draggable: this.movable,
        fullscreen: this.fullscreen
      },
      {
        "modal-penetrable": this.modalPentrable,
        "close-hidden": !this.showClose
      }
    ), i = `${super.updateContainerClasslist()} ${e}`.trim();
    return this._container && (this._container.className = i), i;
  }
  /**
   * 重置对话框位置
   */
  resetPosition() {
    this._overlayContent.style.left = "", this._overlayContent.style.top = "", this.style.removeProperty("--ea-overlay-content-left"), this.style.removeProperty("--ea-overlay-content-top");
  }
  _handleDragStart(e) {
    if (!this.movable || this.fullscreen || !this._header.contains(e.target) || this._closeIcon.contains(e.target)) return;
    const a = new AbortController(), i = this._overlayContent.getBoundingClientRect(), n = e.clientX - i.left, l = e.clientY - i.top, d = (u) => {
      this._overlayContent.style.left = u.clientX - n + "px", this._overlayContent.style.top = u.clientY - l + "px";
    }, h = () => {
      a.abort();
    };
    window.addEventListener("mousemove", d, {
      signal: a.signal
    }), window.addEventListener("mouseup", h, {
      signal: a.signal
    });
  }
  _handleCloseIconClick() {
    this.showClose && (this.visible = !1);
  }
  // ==================== 生命周期 ====================
  /** 根据 alertdialog 属性更新 role */
  _updateRole() {
    const e = this.alertdialog ? "alertdialog" : "dialog";
    try {
      this.setAttribute("role", e);
    } catch {
      this.role = e;
    }
  }
  /** 更新 aria-labelledby 指向标题元素 */
  _updateAriaLabelledBy() {
    this._heading && this.heading ? (this._heading.id || (this._heading.id = `ea-dialog-heading-${t._idCounter++}`), this.setAttribute("aria-labelledby", this._heading.id)) : this.heading ? (this.setAttribute("aria-label", this.heading), this.removeAttribute("aria-labelledby")) : (this.removeAttribute("aria-label"), this.removeAttribute("aria-labelledby"));
  }
  /** 更新 aria-describedby 指向描述内容 */
  _updateAriaDescribedBy() {
    this.description && this._content ? (this._content.id || (this._content.id = `ea-dialog-desc-${t._idCounter++}`), this.setAttribute("aria-describedby", this._content.id)) : this.removeAttribute("aria-describedby");
  }
  $mount() {
    var e;
    (e = super.$mount) == null || e.call(this), this._updateRole(), this.setAttribute("aria-modal", "true"), this.updateContainerClasslist();
  }
  $mounted() {
    this._updateAriaLabelledBy(), this._updateAriaDescribedBy();
  }
  _handleClosed(e) {
    e.target === this && this.hide();
  }
};
t._idCounter = 0;
o([
  p(s.ce("header"))
], t.prototype, "_header", 2);
o([
  p(s.ce("heading"))
], t.prototype, "_heading", 2);
o([
  p(s.ce("close-icon"))
], t.prototype, "_closeIcon", 2);
o([
  p(s.ce("content"))
], t.prototype, "_content", 2);
o([
  r({
    type: String,
    default: "",
    observer(e) {
      this._heading && (this._heading.textContent = e), this._updateAriaLabelledBy();
    }
  })
], t.prototype, "heading", 2);
o([
  r({
    type: String,
    default: "50%",
    observer(e) {
      this.style.setProperty("--ea-overlay-content-width", e);
    }
  })
], t.prototype, "width", 2);
o([
  r({
    type: String,
    default: "50%",
    observer(e) {
      this.style.setProperty("--ea-overlay-content-top", e);
    }
  })
], t.prototype, "top", 2);
o([
  r({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], t.prototype, "center", 2);
o([
  r({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], t.prototype, "fullscreen", 2);
o([
  r({
    type: Boolean,
    default: !1
  })
], t.prototype, "appendToBody", 2);
o([
  r({
    type: Boolean,
    default: !0,
    a11y: {
      ariaAttr: "inert",
      target: ".ea-dialog__close-icon",
      map: (e) => e ? null : ""
    },
    observer() {
      this.updateContainerClasslist();
    }
  })
], t.prototype, "showClose", 2);
o([
  r({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], t.prototype, "modalPentrable", 2);
o([
  r({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], t.prototype, "movable", 2);
o([
  r({
    type: Boolean,
    default: !1,
    observer() {
      this._updateRole();
    }
  })
], t.prototype, "alertdialog", 2);
o([
  r({
    type: String,
    default: "",
    observer() {
      this._updateAriaDescribedBy();
    }
  })
], t.prototype, "description", 2);
o([
  c("mousedown", s.ce("header"))
], t.prototype, "_handleDragStart", 1);
o([
  c("click", s.ce("close-icon"))
], t.prototype, "_handleCloseIconClick", 1);
o([
  c("ea-closed")
], t.prototype, "_handleClosed", 1);
t = o([
  b(y, { styles: [m] })
], t);
export {
  t as EaDialog
};
