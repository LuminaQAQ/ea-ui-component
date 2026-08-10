import { E as m } from "../core/EaBase.ts.js";
import { q as n, a as l, C as _ } from "../core/decorator.js";
import { E as d } from "../utils/Enum.ts.js";
import { V as b, b as v } from "../core/constants.js";
import { s as f } from "../css/ea-result.style.js";
import "./ea-icon.js";
import { c as y } from "../utils/bem.ts.js";
var C = Object.defineProperty, S = Object.getOwnPropertyDescriptor, s = (i, o, p, r) => {
  for (var a = r > 1 ? void 0 : r ? S(o, p) : o, c = i.length - 1, u; c >= 0; c--)
    (u = i[c]) && (a = (r ? u(o, p, a) : u(a)) || a);
  return r && a && C(o, p, a), a;
};
const h = "ea-result", t = y(h);
let e = class extends m {
  constructor() {
    super(...arguments), this.variant = "", this.heading = "", this.subTitle = "", this.icon = "";
  }
  /** 更新图标，icon 属性优先于 variant 默认图标 */
  _updateIcon() {
    const i = this.icon || v[this.variant] || "";
    this._icon.setAttribute("name", i);
  }
  /** 更新标题内容，设置 slot 的 fallback */
  _updateHeading() {
    this._titleSlot && (this._titleSlot.textContent = this.heading);
  }
  /** 更新副标题内容，设置 slot 的 fallback */
  _updateSubTitle() {
    this._subTitleSlot && (this._subTitleSlot.textContent = this.subTitle);
  }
  updateContainerClasslist() {
    const i = t({ [this.variant]: !!this.variant });
    return this._container && (this._container.className = i), i;
  }
  html() {
    return `
      <div class="${t()}" part="container" role="status">
        <div class="${t.e("icon-wrap")}" part="icon-wrap"><slot name="icon"><ea-icon class="${t.e("icon")}" part="icon"></ea-icon></slot></div>
        <h3 class="${t.e("title")}" part="title"><slot name="title"></slot></h3>
        <div class="${t.e("sub-title")}" part="sub-title"><slot name="sub-title"></slot></div>
        <div class="${t.e("extra")}" part="extra"><slot name="extra"></slot></div>
      </div>
    `;
  }
  $mount() {
    this.updateContainerClasslist();
  }
};
s([
  n(t.cb())
], e.prototype, "_container", 2);
s([
  n(`${t.ce("icon-wrap")} ea-icon`)
], e.prototype, "_icon", 2);
s([
  n(`${t.ce("title")} slot[name="title"]`)
], e.prototype, "_titleSlot", 2);
s([
  n(`${t.ce("sub-title")} slot[name="sub-title"]`)
], e.prototype, "_subTitleSlot", 2);
s([
  l({
    type: d(b),
    default: "",
    observer() {
      this.updateContainerClasslist(), this._updateIcon();
    }
  })
], e.prototype, "variant", 2);
s([
  l({
    type: String,
    default: "",
    observer() {
      this._updateHeading();
    }
  })
], e.prototype, "heading", 2);
s([
  l({
    type: String,
    default: "",
    observer() {
      this._updateSubTitle();
    }
  })
], e.prototype, "subTitle", 2);
s([
  l({
    type: String,
    default: "",
    observer() {
      this._updateIcon();
    }
  })
], e.prototype, "icon", 2);
e = s([
  _(h, { styles: [f] })
], e);
export {
  e as EaResult
};
