import { E as h } from "../core/EaBase.ts.js";
import { q as d, C as g, a as m } from "../core/decorator.js";
import { s as f } from "../css/ea-empty.style.js";
import { c as v } from "../utils/bem.ts.js";
const c = `
<svg viewBox="25 30 50 50" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 50v21.5a2 2 0 0 0 1 1h39a2 2 0 0 0 1-1V50H61a10 10 0 0 1-20 0h-6.5z" class="front" part="default-image-front" />
    <path d="M30.5 50.5L34 39h32.5l4 11.5" fill="none" class="border" part="default-image-border" />
</svg>
`;
var y = Object.defineProperty, _ = Object.getOwnPropertyDescriptor, o = (t, e, p, r) => {
  for (var a = r > 1 ? void 0 : r ? _(e, p) : e, n = t.length - 1, l; n >= 0; n--)
    (l = t[n]) && (a = (r ? l(e, p, a) : l(a)) || a);
  return r && a && y(e, p, a), a;
};
const u = "ea-empty", s = v(u);
let i = class extends h {
  constructor() {
    super(...arguments), this.image = "", this.imageSize = "", this.description = "";
  }
  /** 更新图片区域内容 */
  _updateImage(t) {
    if (!t) {
      this._imageSlot.innerHTML = `<section class="${s.e("default")}">${c}</section>`;
      return;
    }
    const e = document.createElement("img");
    e.className = s.e("image"), e.src = t, e.alt = "empty image", e.setAttribute("part", "image"), this._imageSlot.innerHTML = "", this._imageSlot.appendChild(e);
  }
  /** 更新描述文字内容 */
  _updateDescription(t) {
    this._descriptionSlot.textContent = t || "No Data";
  }
  html() {
    return `
      <div class="${s()}" part="container" role="status">
        <div class="${s.e("placeholder")}" part="placeholder">
          <slot name="image">
            <section class="${s.e("default")}">${c}</section>
          </slot>
        </div>
        <div class="${s.e("description")}" part="description">
          <slot name="description">No Data</slot>
        </div>
        <div class="${s.e("bottom")}" part="bottom">
          <slot></slot>
        </div>
      </div>
    `;
  }
  $mount() {
    this.image && this._updateImage(this.image), this.description && this._updateDescription(this.description);
  }
};
o([
  d(`${s.ce("placeholder")} slot[name="image"]`)
], i.prototype, "_imageSlot", 2);
o([
  d(`${s.ce("description")} slot[name="description"]`)
], i.prototype, "_descriptionSlot", 2);
o([
  m({
    type: String,
    default: "",
    observer(t) {
      this._updateImage(t);
    }
  })
], i.prototype, "image", 2);
o([
  m({
    type: String,
    default: "",
    observer(t) {
      if (!t) {
        this.style.removeProperty("--ea-empty-size");
        return;
      }
      if (!CSS.supports("width", t)) {
        console.warn(`[ea-empty] The size value ${t} is not supported.`);
        return;
      }
      this.style.setProperty("--ea-empty-size", t);
    }
  })
], i.prototype, "imageSize", 2);
o([
  m({
    type: String,
    default: "",
    observer(t) {
      this._updateDescription(t);
    }
  })
], i.prototype, "description", 2);
i = o([
  g(u, { styles: [f] })
], i);
const D = i;
export {
  i as EaEmpty,
  D as default
};
