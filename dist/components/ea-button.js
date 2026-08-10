import { E as y } from "../core/EaBase.ts.js";
import { q as u, a as r, C as m, l as b } from "../core/decorator.js";
import { E as f } from "../utils/Enum.ts.js";
import { V as _ } from "../core/constants.js";
import { s as A } from "../css/ea-button.style.js";
import "./ea-icon.js";
import { c as g } from "../utils/bem.ts.js";
import { s as $ } from "../css/ea-button-group.style.js";
var E = Object.defineProperty, w = Object.getOwnPropertyDescriptor, s = (t, e, o, n) => {
  for (var a = n > 1 ? void 0 : n ? w(e, o) : e, l = t.length - 1, h; l >= 0; l--)
    (h = t[l]) && (a = (n ? h(e, o, a) : h(a)) || a);
  return n && a && E(e, o, a), a;
};
const v = "ea-button", p = g(v);
let i = class extends y {
  constructor() {
    super(...arguments), this.disabled = !1, this.variant = "normal", this.text = !1, this.plain = !1, this.round = !1, this.circle = !1, this.link = !1, this.href = "", this.size = "medium", this.loading = !1, this.icon = "", this.type = "button", this.target = "", this.rel = "", this.download = "", this.toggle = !1;
  }
  /** 更新容器类名 */
  updateContainerClasslist() {
    const t = !!this.icon, e = this.disabled || this.loading, o = p(
      {
        [this.variant]: !0,
        text: this.text || this.link,
        plain: this.plain,
        round: this.round,
        circle: this.circle,
        link: this.link,
        [this.size]: !0
      },
      { icon: t, loading: this.loading, disabled: e }
    );
    return this._container && (this._container.className = o), o;
  }
  /** 重新渲染容器（link 切换时替换 button/a 标签） */
  _renderContainer() {
    const t = this._container;
    if (!t) return;
    const e = this.link ? "a" : "button";
    if (t.tagName.toLowerCase() === e) return;
    const o = document.createElement("template");
    o.innerHTML = this.html();
    const n = o.content.firstElementChild;
    n && t.replaceWith(n);
  }
  /** 渲染模板 */
  html() {
    const t = this.link ? "a" : "button", e = this.link && this.href ? `href="${this.href}"` : "", o = this.link && this.target ? `target="${this.target}"` : "", n = this.link && this.rel ? `rel="${this.rel}"` : "", a = this.link && this.hasAttribute("download") ? `download="${this.download}"` : "", l = this.link ? "" : `type="${this.type}"`;
    return `
      <${t} class="${p()}" part="container" ${e} ${o} ${n} ${a} ${l}>
        <ea-icon class="${p.e("loading-icon")}" name="spinner" spin part="loading-icon"></ea-icon>
        <ea-icon class="${p.e("icon")}" part="icon"></ea-icon>
        <slot></slot>
      </${t}>
    `;
  }
  _handleKeyDown(t) {
    var e;
    (t.key === "Enter" || t.key === " ") && (t.preventDefault(), (e = this._container) == null || e.click());
  }
  _handleClick(t) {
    if (this.type === "submit") {
      const e = this.closest("form");
      e && (t.preventDefault(), e.dispatchEvent(new Event("submit")));
    } else if (this.type === "reset") {
      const e = this.closest("form");
      e && (t.preventDefault(), e.reset());
    }
  }
  /** 同步链接属性到容器（处理 observer 在 _container 不存在时遗漏的情况） */
  _syncLinkAttributes() {
    if (!this._container || !this.link) return;
    const t = this._container;
    this.href && (t.href = this.href), this.target && (t.target = this.target), this.rel && (t.rel = this.rel), this.hasAttribute("download") && (t.download = this.download);
  }
  $mount() {
    this.updateContainerClasslist(), this._syncLinkAttributes();
  }
};
s([
  u(p.cb())
], i.prototype, "_container", 2);
s([
  u(p.ce("icon"))
], i.prototype, "_icon", 2);
s([
  u(p.ce("loading-icon"))
], i.prototype, "_loadingIcon", 2);
s([
  r({
    type: Boolean,
    default: !1,
    a11y: { ariaAttr: "aria-disabled", map: (t) => String(t) },
    observer() {
      this.updateContainerClasslist();
    }
  })
], i.prototype, "disabled", 2);
s([
  r({
    type: f([..._, "normal"]),
    default: "normal",
    observer() {
      this.updateContainerClasslist();
    }
  })
], i.prototype, "variant", 2);
s([
  r({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], i.prototype, "text", 2);
s([
  r({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], i.prototype, "plain", 2);
s([
  r({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], i.prototype, "round", 2);
s([
  r({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], i.prototype, "circle", 2);
s([
  r({
    type: Boolean,
    default: !1,
    observer() {
      this._renderContainer(), this.updateContainerClasslist();
    }
  })
], i.prototype, "link", 2);
s([
  r({
    type: String,
    default: "",
    observer(t) {
      this.updateContainerClasslist(), this._container && t && (this._container.href = t);
    }
  })
], i.prototype, "href", 2);
s([
  r({
    type: ["small", "medium", "large"],
    default: "medium",
    observer() {
      this._loadingIcon && this._loadingIcon.setAttribute("size", this.size), this.updateContainerClasslist();
    }
  })
], i.prototype, "size", 2);
s([
  r({
    type: Boolean,
    default: !1,
    a11y: { ariaAttr: "aria-busy", map: (t) => String(t) },
    observer(t) {
      this.toggleAttribute("disabled", t === !0), this._loadingIcon && this._loadingIcon.setAttribute("size", this.size), this.updateContainerClasslist();
    }
  })
], i.prototype, "loading", 2);
s([
  r({
    type: String,
    default: "",
    observer(t) {
      this._icon && (this._icon.setAttribute("name", t), this._icon.setAttribute("size", this.size)), this.updateContainerClasslist();
    }
  })
], i.prototype, "icon", 2);
s([
  r({
    type: f(["button", "submit", "reset"]),
    default: "button",
    observer(t) {
      this._container && !this.link && this._container.setAttribute("type", t);
    }
  })
], i.prototype, "type", 2);
s([
  r({
    type: String,
    default: "",
    observer(t) {
      this._container && this.link && (this._container.target = t);
    }
  })
], i.prototype, "target", 2);
s([
  r({
    type: String,
    default: "",
    observer(t) {
      this._container && this.link && (this._container.rel = t);
    }
  })
], i.prototype, "rel", 2);
s([
  r({
    type: String,
    default: "",
    observer(t) {
      this._container && this.link && (this._container.download = t);
    }
  })
], i.prototype, "download", 2);
s([
  r({
    type: Boolean,
    default: !1,
    a11y: {
      ariaAttr: "aria-pressed",
      map: (t) => String(t)
    }
  })
], i.prototype, "toggle", 2);
s([
  b("keydown")
], i.prototype, "_handleKeyDown", 1);
s([
  b("click")
], i.prototype, "_handleClick", 1);
i = s([
  m(v, { styles: [A] })
], i);
var k = Object.defineProperty, B = Object.getOwnPropertyDescriptor, d = (t, e, o, n) => {
  for (var a = n > 1 ? void 0 : n ? B(e, o) : e, l = t.length - 1, h; l >= 0; l--)
    (h = t[l]) && (a = (n ? h(e, o, a) : h(a)) || a);
  return n && a && k(e, o, a), a;
};
const C = "ea-button-group", S = g(C);
let c = class extends y {
  constructor() {
    super(...arguments), this.disabled = !1, this.size = "medium", this.variant = "normal";
  }
  /** 渲染模板 */
  html() {
    return `
      <div class="${S()}" part="container">
        <slot></slot>
      </div>
    `;
  }
};
d([
  u("slot")
], c.prototype, "_defaultSlot", 2);
d([
  r({
    type: Boolean,
    default: !1,
    observer(t) {
      var e;
      (e = this._defaultSlot) == null || e.assignedElements().forEach((o) => {
        o.tagName === "EA-BUTTON" && o.toggleAttribute("disabled", t);
      });
    }
  })
], c.prototype, "disabled", 2);
d([
  r({
    type: ["small", "medium", "large"],
    default: "medium",
    observer(t) {
      this.querySelectorAll("ea-button").forEach((e) => {
        e.setAttribute("size", t);
      });
    }
  })
], c.prototype, "size", 2);
d([
  r({
    type: f([..._, "normal"]),
    default: "normal",
    observer(t) {
      this.querySelectorAll("ea-button").forEach((e) => {
        e.setAttribute("variant", t);
      });
    }
  })
], c.prototype, "variant", 2);
c = d([
  m(C, { styles: [$] })
], c);
const j = { EaButton: i, EaButtonGroup: c };
export {
  i as EaButton,
  c as EaButtonGroup,
  j as default
};
