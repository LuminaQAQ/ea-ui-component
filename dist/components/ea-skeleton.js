import { E as f } from "../core/EaBase.ts.js";
import { q as u, l as S, C as _, a as m } from "../core/decorator.js";
import { h as g } from "../utils/html.ts.js";
import { t as b } from "../utils/timeout.ts.js";
import { s as E } from "../css/ea-skeleton.style.js";
import { c as v } from "../utils/bem.ts.js";
import { E as N } from "../utils/Enum.ts.js";
import { s as $ } from "../css/ea-skeleton-item.style.js";
var A = Object.defineProperty, M = Object.getOwnPropertyDescriptor, n = (t, e, l, a) => {
  for (var s = a > 1 ? void 0 : a ? M(e, l) : e, i = t.length - 1, r; i >= 0; i--)
    (r = t[i]) && (s = (a ? r(e, l, s) : r(s)) || s);
  return a && s && A(e, l, s), s;
};
const y = "ea-skeleton", p = v(y);
let o = class extends f {
  constructor() {
    super(...arguments), this.rows = 4, this.animated = !1, this.count = 1, this.throttleLeading = 0, this.throttleTrailing = 0, this.loading = !0, this._loadingThrottle = void 0, this._templateNode = null;
  }
  /** 更新容器类名 */
  updateContainerClasslist() {
    const t = p({}, { loading: this.loading });
    return this._container.className = t, t;
  }
  /** 获取模板插槽中的元素，若无则返回插槽元素本身 */
  _getTemplateElements() {
    const t = [...this.querySelectorAll("[slot='template']")];
    return t.length ? t : [this._templateSlot];
  }
  /** 克隆模板元素并缓存 */
  _cloneTemplate(t) {
    if (this._templateNode) return this._templateNode;
    const e = document.createDocumentFragment();
    return t.forEach((l) => e.appendChild(l.cloneNode(!0))), this._templateNode = e, e;
  }
  /** 根据 count 渲染多份模板 */
  _renderTemplates(t, e) {
    const l = this._cloneTemplate(e), a = document.createDocumentFragment();
    for (let s = 0; s < t; s++)
      a.appendChild(l.cloneNode(!0));
    return a;
  }
  /** 初始化默认骨架屏段落 */
  _initDefaultSkeleton(t = this.rows) {
    this.querySelectorAll("ea-skeleton-item").length || (this._templateSlot.innerHTML = g(
      `${Array.from({ length: t }).map(
        () => `<ea-skeleton-item variant="p" ${this.animated ? "animated" : ""}></ea-skeleton-item>`
      ).join("")}`
    ));
  }
  /** 同步 animated 状态到所有子 skeleton-item */
  _updateAnimatedStatus(t) {
    const e = this._templateSlot.assignedElements();
    e.filter((a) => a.tagName.toLocaleLowerCase() === "ea-skeleton-item").concat(
      ...e.map((a) => [...a.querySelectorAll("ea-skeleton-item")])
    ).concat([...this._templateSlot.querySelectorAll("ea-skeleton-item")]).forEach((a) => a.toggleAttribute("animated", t));
  }
  /** 渲染模板 */
  html() {
    return `
      <div class="${p()}" part="container" aria-hidden="true" aria-busy="${this.loading}">
        <slot class="${p.e("default")}" part="default-slot"></slot>
        <slot class="${p.e("template")}" name="template" part="template-slot"></slot>
      </div>
    `;
  }
  _handleTemplateSlotChange() {
    this._updateAnimatedStatus(this.animated);
  }
  $mount() {
    this.updateContainerClasslist();
  }
  $mounted() {
    this._initDefaultSkeleton();
  }
  $beforeUnmount() {
    clearTimeout(this._loadingThrottle), this._loadingThrottle = void 0;
  }
};
n([
  u(p.cb())
], o.prototype, "_container", 2);
n([
  u(p.ce("template"))
], o.prototype, "_templateSlot", 2);
n([
  m({
    type: Number,
    default: 4,
    observer(t) {
      this._initDefaultSkeleton(t), this._updateAnimatedStatus(this.animated);
    }
  })
], o.prototype, "rows", 2);
n([
  m({
    type: Boolean,
    default: !1,
    observer(t) {
      this._updateAnimatedStatus(t);
    }
  })
], o.prototype, "animated", 2);
n([
  m({
    type: Number,
    default: 1,
    observer(t) {
      const e = this._getTemplateElements(), l = this._renderTemplates(t, e), [a] = e, s = e.length > 1, i = (a == null ? void 0 : a.tagName) === "EA-SKELETON-ITEM";
      s || i ? (e.forEach((r) => r.remove()), this.appendChild(l)) : (a.innerHTML = "", a.appendChild(l));
    }
  })
], o.prototype, "count", 2);
n([
  m({
    type: Number,
    default: 0
  })
], o.prototype, "throttleLeading", 2);
n([
  m({
    type: Number,
    default: 0
  })
], o.prototype, "throttleTrailing", 2);
n([
  m({
    type: Boolean,
    default: !0,
    observer(t) {
      clearTimeout(this._loadingThrottle), this._loadingThrottle = b(
        () => {
          this.updateContainerClasslist();
        },
        (t ? this.throttleTrailing : this.throttleLeading) || 0
      );
    }
  })
], o.prototype, "loading", 2);
n([
  S("slotchange", p.ce("template"))
], o.prototype, "_handleTemplateSlotChange", 1);
o = n([
  _(y, { styles: [E] })
], o);
const T = `
    <svg class="ea-skeleton-item__image-placeholder" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" part="image-svg">
        <path fill="#c0c4cc" d="M0 0h100v100H0z" />
        <path fill="#fff" d="M15 20h70v60H15z" />
        <circle r="8" cx="32" cy="35" fill="#c0c4cc" />
        <path d="M60 42.5L39 75h42z" fill="#c0c4cc" />
        <path d="M35 52.5L20 75h-4 32z" fill="#c0c4cc" />
    </svg>
`;
var w = Object.defineProperty, L = Object.getOwnPropertyDescriptor, h = (t, e, l, a) => {
  for (var s = a > 1 ? void 0 : a ? L(e, l) : e, i = t.length - 1, r; i >= 0; i--)
    (r = t[i]) && (s = (a ? r(e, l, s) : r(s)) || s);
  return a && s && w(e, l, s), s;
};
const C = "ea-skeleton-item", d = v(C), O = [
  "p",
  "text",
  "h1",
  "h3",
  "caption",
  "button",
  "image",
  "circle",
  "rect"
];
let c = class extends f {
  constructor() {
    super(...arguments), this.variant = "p", this.animated = !1;
  }
  /** 更新容器类名 */
  updateContainerClasslist() {
    const t = d(
      { [this.variant]: !0 },
      { animated: this.animated }
    );
    return this._container.className = t, t;
  }
  /** 渲染模板 */
  html() {
    const t = this.variant === "image" ? T : "";
    return `
      <div class="${d()}" part="container" aria-hidden="true">${t}</div>
    `;
  }
  $mount() {
    this.updateContainerClasslist();
  }
};
h([
  u(d.cb())
], c.prototype, "_container", 2);
h([
  m({
    type: N(O),
    default: "p",
    observer(t) {
      t === "image" ? this._container.innerHTML = g(T) : this._container.innerHTML = "", this.updateContainerClasslist();
    }
  })
], c.prototype, "variant", 2);
h([
  m({
    type: Boolean,
    default: !1,
    observer() {
      this.updateContainerClasslist();
    }
  })
], c.prototype, "animated", 2);
c = h([
  _(C, { styles: [$] })
], c);
const j = { EaSkeleton: o, EaSkeletonItem: c };
export {
  o as EaSkeleton,
  c as EaSkeletonItem,
  j as default
};
