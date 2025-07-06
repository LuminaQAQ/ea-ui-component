var c = (t) => {
  throw TypeError(t);
};
var g = (t, a, e) => a.has(t) || c("Cannot " + e);
var i = (t, a, e) => (g(t, a, "read from private field"), e ? e.call(t) : a.get(t)), r = (t, a, e) => a.has(t) ? c("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(t) : a.set(t, e), n = (t, a, e, d) => (g(t, a, "write to private field"), d ? d.call(t, e) : a.set(t, e), e);
import { B as w } from "./Base.js";
import "./index3.js";
const _ = `
.ea-page-header_wrap {
  display: flex;
  align-items: center;
  line-height: 24px;
}
.ea-page-header_wrap .ea-page-header_title-wrap,
.ea-page-header_wrap .ea-page-header_divider,
.ea-page-header_wrap .ea-page-header_content-wrap {
  line-height: 24px;
}
.ea-page-header_wrap .ea-page-header_title-wrap {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  cursor: pointer;
}
.ea-page-header_wrap .ea-page-header_divider {
  margin: 0 1rem;
  margin-bottom: 1px;
  font-size: 14px;
  height: 14px;
  overflow: hidden;
  color: #dcdfe6;
  line-height: 1;
  vertical-align: middle;
}
.ea-page-header_wrap .ea-page-header_content-wrap {
  font-size: 18px;
  color: #303133;
  line-height: 1;
}
`;
var h, p, l, s, o;
class m extends w {
  constructor() {
    super();
    r(this, h);
    r(this, p);
    r(this, l);
    r(this, s);
    r(this, o);
    const e = this.attachShadow({ mode: "open" });
    e.innerHTML = `
            <div class='ea-page-header_wrap' part='container'>
                <div class='ea-page-header_title-wrap' part='title-wrap'>
                    <ea-icon class='ea-page-header_back-icon' part='back-icon' icon="icon-angle-left"></ea-icon>
                    <slot name="title"></slot>
                </div>
                <div class='ea-page-header_divider' part='divider'>|</div>
                <div class='ea-page-header_content-wrap' part='content-wrap'>
                    <slot name="content"></slot>
                </div>
            </div>
        `, n(this, h, e.querySelector(".ea-page-header_wrap")), n(this, p, e.querySelector(".ea-page-header_title-wrap")), n(this, s, e.querySelector('slot[name="title"]')), n(this, l, e.querySelector(".ea-page-header_content-wrap")), n(this, o, e.querySelector('slot[name="content"]')), this.build(e, _);
  }
  // ------- title 返回区域的内容 -------
  // #region
  get title() {
    return this.getAttribute("title") || "";
  }
  set title(e) {
    e ? (this.setAttribute("title", e), i(this, s).innerText = e) : (this.setAttribute("title", "返回"), i(this, s).innerText = "返回");
  }
  // #endregion
  // ------- end -------
  // ------- content 页面标题 -------
  // #region
  get content() {
    return this.getAttribute("content") || "";
  }
  set content(e) {
    e ? (this.setAttribute("content", e), i(this, o).innerText = e) : (this.setAttribute("content", ""), i(this, o).innerText = "");
  }
  // #endregion
  // ------- end -------
  connectedCallback() {
    this.title = this.title, this.content = this.content, i(this, p).addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("back"));
    });
  }
}
h = new WeakMap(), p = new WeakMap(), l = new WeakMap(), s = new WeakMap(), o = new WeakMap();
customElements.get("ea-page-header") || customElements.define("ea-page-header", m);
export {
  m as EaPageHeader
};
