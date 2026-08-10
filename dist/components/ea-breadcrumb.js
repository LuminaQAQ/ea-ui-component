import { E as f } from "../core/EaBase.ts.js";
import { q as u, C as d, a as _, l as y } from "../core/decorator.js";
import { s as v } from "../css/ea-breadcrumb.style.js";
import { c as b } from "../utils/bem.ts.js";
import { s as $ } from "../css/ea-breadcrumb-item.style.js";
var g = Object.defineProperty, E = Object.getOwnPropertyDescriptor, p = (t, r, s, a) => {
  for (var e = a > 1 ? void 0 : a ? E(r, s) : r, o = t.length - 1, l; o >= 0; o--)
    (l = t[o]) && (e = (a ? l(r, s, e) : l(e)) || e);
  return a && e && g(r, s, e), e;
};
const C = "ea-breadcrumb", m = b(C);
let i = class extends f {
  constructor() {
    super(...arguments), this.separator = "/";
  }
  updateContainerClasslist() {
    const t = m();
    return this._container && (this._container.className = t), t;
  }
  /**
   * 获取分隔符元素，优先使用 separator slot 中的自定义内容
   * @param defaultSeparator - 默认分隔符文本
   * @returns 分隔符 DOM 元素
   */
  _getSeparatorItem(t = this.separator) {
    const r = this.shadowRoot.querySelector("#separatorSlot");
    let s = r == null ? void 0 : r.assignedElements()[0];
    return s || (s = document.createElement("span"), s.setAttribute("slot", "separator"), s.innerText = t), s;
  }
  /**
   * 渲染分隔符到非末尾的面包屑项中，并标记最后一项为当前页
   */
  _renderSeparator() {
    const t = this.shadowRoot.querySelector("#defaultSlot");
    if (!t) return;
    const r = [...t.assignedElements()].filter(
      (a) => a.tagName.toLowerCase() === "ea-breadcrumb-item"
    ), s = this._getSeparatorItem(this.separator);
    r.forEach((a, e) => {
      const o = e === r.length - 1;
      !o && !a.querySelector("[slot='separator']") && a.appendChild(s.cloneNode(!0)), o ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current");
    });
  }
  html() {
    return `
      <nav aria-label="Breadcrumb">
        <ol class="${m()}" part="container" role="list">
          <slot id="defaultSlot"></slot>
        </ol>
      </nav>
      <slot id="separatorSlot" name="separator"></slot>
    `;
  }
  _handleSlotChange() {
    this._renderSeparator();
  }
  $mount() {
    this.updateContainerClasslist(), this._renderSeparator();
  }
};
p([
  u(m.cb())
], i.prototype, "_container", 2);
p([
  u("#defaultSlot")
], i.prototype, "_defaultSlot", 2);
p([
  _({
    type: String,
    default: "/",
    observer() {
      this._renderSeparator();
    }
  })
], i.prototype, "separator", 2);
p([
  y("slotchange", "#defaultSlot")
], i.prototype, "_handleSlotChange", 1);
i = p([
  d(C, { styles: [v] })
], i);
var N = Object.defineProperty, w = Object.getOwnPropertyDescriptor, h = (t, r, s, a) => {
  for (var e = a > 1 ? void 0 : a ? w(r, s) : r, o = t.length - 1, l; o >= 0; o--)
    (l = t[o]) && (e = (a ? l(r, s, e) : l(e)) || e);
  return a && e && N(r, s, e), e;
};
const S = "ea-breadcrumb-item", n = b(S);
let c = class extends f {
  constructor() {
    super(...arguments), this.href = "";
  }
  updateContainerClasslist() {
    const t = n();
    return this._container && (this._container.className = t), t;
  }
  /**
   * 根据 href 属性重新渲染内容元素，切换 a/span 标签
   */
  _renderContent() {
    if (!this._container) return;
    const t = !!this.href, r = t ? "a" : "span", s = t ? n.s("link") : "", a = this._container.querySelector(n.ce("content"));
    if (a) {
      const e = document.createElement(r);
      e.className = [n.e("content"), s].filter(Boolean).join(" "), e.setAttribute("part", "content"), t && (e.href = this.href), e.innerHTML = "<slot></slot>", a.replaceWith(e);
    }
  }
  html() {
    const t = !!this.href, r = t ? "a" : "span", s = t ? n.s("link") : "";
    return `
      <li class="${n()}" part="container" role="listitem">
        <${r} class="${n.e("content")} ${s}" part="content" ${t ? `href="${this.href}"` : ""}>
          <slot></slot>
        </${r}>
        <span class="${n.e("separator")}" part="separator" aria-hidden="true">
          <slot name="separator"></slot>
        </span>
      </li>
    `;
  }
  $mount() {
    this.updateContainerClasslist();
  }
};
h([
  u(n.cb())
], c.prototype, "_container", 2);
h([
  u(n.ce("content"))
], c.prototype, "_content", 2);
h([
  _({
    type: String,
    default: "",
    observer() {
      this._renderContent();
    }
  })
], c.prototype, "href", 2);
c = h([
  d(S, { styles: [$] })
], c);
const j = { EaBreadcrumb: i, EaBreadcrumbItem: c };
export {
  i as EaBreadcrumb,
  c as EaBreadcrumbItem,
  j as default
};
