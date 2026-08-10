import { E as u } from "../core/EaBase.ts.js";
import { q as p, l as _, C as v, a as d } from "../core/decorator.js";
import { h } from "../utils/html.ts.js";
import { s as b } from "../css/ea-page-header.style.js";
import "./ea-icon.js";
import { c as g } from "../utils/bem.ts.js";
class f extends Event {
  constructor(s = {}) {
    super("ea-back", { bubbles: !0, composed: !0 }), this.detail = s;
  }
}
var C = Object.defineProperty, y = Object.getOwnPropertyDescriptor, n = (o, s, r, i) => {
  for (var a = i > 1 ? void 0 : i ? y(s, r) : s, c = o.length - 1, l; c >= 0; c--)
    (l = o[c]) && (a = (i ? l(s, r, a) : l(a)) || a);
  return i && a && C(s, r, a), a;
};
const m = "ea-page-header", e = g(m);
let t = class extends u {
  constructor() {
    super(...arguments), this.icon = "angle-left", this.heading = "", this.content = "";
  }
  /** 更新图标内容，icon 为空字符串时隐藏图标 */
  _updateIcon() {
    this.icon ? (this._iconContainer.classList.remove(e.s("hidden")), this._iconContainer.innerHTML = `<slot name="icon"><ea-icon name="${this.icon}" part="back-icon"></ea-icon></slot>`) : (this._iconContainer.classList.add(e.s("hidden")), this._iconContainer.innerHTML = '<slot name="icon"></slot>');
  }
  /** 更新标题内容，为空时恢复 slot */
  _updateHeading() {
    this._headingContainer.innerHTML = h(this.heading) || '<slot name="title">Back</slot>';
  }
  /** 更新内容区域，为空时恢复 slot */
  _updateContent() {
    this._contentContainer.innerHTML = h(this.content) || '<slot name="content"></slot>';
  }
  /** 渲染模板 */
  html() {
    return `
      <div class='${e()}' part='container'>
        <section class="${e.e("breadcrumb")}" part="breadcrumb">
          <slot name="breadcrumb"></slot>
        </section>
        <section class="${e.e("wrapper")}" part="header-wrapper">
          <div class="${e.e("back")}" part="back">
            <span class="${e.e("icon")}" part="icon">
              <slot name="icon">
                <ea-icon name="angle-left" part="back-icon"></ea-icon>
              </slot>
            </span>
            <span class="${e.e("heading")}" part="title">
              <slot name="title">Back</slot>
            </span>
          </div>
          <span class="${e.e("divider")}" part="divider">|</span>
          <div class="${e.e("content")}" part="content">
            <slot name="content"></slot>
          </div>
          <div class="${e.e("extra")}" part="extra">
            <slot name="extra"></slot>
          </div>
        </section>
        <slot></slot>
      </div>
    `;
  }
  _handleBackClick(o) {
    this.dispatchEvent(new f());
  }
  $mount() {
    this._updateIcon();
  }
};
n([
  p(e.ce("icon"))
], t.prototype, "_iconContainer", 2);
n([
  p(e.ce("heading"))
], t.prototype, "_headingContainer", 2);
n([
  p(e.ce("content"))
], t.prototype, "_contentContainer", 2);
n([
  d({
    type: String,
    default: "angle-left",
    observer() {
      this._updateIcon();
    }
  })
], t.prototype, "icon", 2);
n([
  d({
    type: String,
    default: "",
    observer() {
      this._updateHeading();
    }
  })
], t.prototype, "heading", 2);
n([
  d({
    type: String,
    default: "",
    observer() {
      this._updateContent();
    }
  })
], t.prototype, "content", 2);
n([
  _("click", e.ce("back"))
], t.prototype, "_handleBackClick", 1);
t = n([
  v(m, { styles: [b] })
], t);
export {
  t as EaPageHeader
};
