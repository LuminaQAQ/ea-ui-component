var m = (e, i, t) => {
  if (!i.has(e))
    throw TypeError("Cannot " + t);
};
var s = (e, i, t) => (m(e, i, "read from private field"), t ? t.call(e) : i.get(e)), l = (e, i, t) => {
  if (i.has(e))
    throw TypeError("Cannot add the same private member more than once");
  i instanceof WeakSet ? i.add(e) : i.set(e, t);
}, o = (e, i, t, c) => (m(e, i, "write to private field"), c ? c.call(e, t) : i.set(e, t), t);
import { B as d } from "./Base.js";
const g = `
.ea-collapse-item_wrap .ea-collapse-item_title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ebeef5;
  height: 48px;
  line-height: 48px;
  font-size: 13px;
  font-weight: 700;
  color: #303133;
  cursor: pointer;
}
.ea-collapse-item_wrap .ea-collapse-item_title .ea-collapse-item_title-icon {
  width: 0.35rem;
  height: 0.35rem;
  margin-right: 1rem;
  border: 3px solid #9ca0a5;
  border-left-color: transparent;
  border-top-color: transparent;
  rotate: -45deg;
  transition: rotate 0.3s;
}
.ea-collapse-item_wrap .ea-collapse-item_content {
  will-change: height;
  overflow: hidden;
  height: 0;
  padding-bottom: 0;
  transition: height 0.3s, padding-bottom 0.3s;
  font-size: 13px;
  color: #303133;
}
`;
var h, r, p, n, a;
class u extends d {
  constructor() {
    super();
    l(this, h, void 0);
    l(this, r, void 0);
    l(this, p, void 0);
    l(this, n, void 0);
    l(this, a, void 0);
    const t = this.attachShadow({ mode: "open" });
    t.innerHTML = `
            <div class="ea-collapse-item_wrap" part="container">
                <div class="ea-collapse-item_title" part="title-wrap">
                    <span class="ea-collapse-item_title-content" part="title-content"></span>
                    <span class="ea-collapse-item_title-icon" part="title-icon"></span>
                </div>
                <div class="ea-collapse-item_content" part="content-wrap">
                    <slot></slot>
                </div>
            </div>
        `, o(this, h, t.querySelector(".ea-collapse-item_wrap")), o(this, r, t.querySelector(".ea-collapse-item_title")), o(this, p, t.querySelector(".ea-collapse-item_title-content")), o(this, n, t.querySelector(".ea-collapse-item_title-icon")), o(this, a, t.querySelector(".ea-collapse-item_content")), this.build(t, g);
  }
  // ------- title 标题 -------
  // #region
  get title() {
    return this.getAttribute("title");
  }
  set title(t) {
    this.setAttribute("title", t), s(this, p).innerHTML = t;
  }
  // #endregion
  // ------- end -------
  // ------- name 唯一标识符 -------
  // #region
  get name() {
    return this.getAttribute("name");
  }
  set name(t) {
    this.setAttribute("name", t);
  }
  // #endregion
  // ------- end -------
  // ------- isOpen 是否展开 -------
  // #region
  get isOpen() {
    return this.getAttrBoolean("is-open") || !1;
  }
  set isOpen(t) {
    if (t === this.isOpen)
      return;
    this.toggleAttr("is-open", t);
    const c = s(this, a).scrollHeight;
    this.isOpen ? (s(this, a).style.height = `${c}px`, s(this, a).style.paddingBottom = "20px", s(this, n).style.rotate = "45deg") : (s(this, a).style.height = "0px", s(this, a).style.paddingBottom = "0px", s(this, n).style.rotate = "-45deg");
  }
  // #endregion
  // ------- end -------
  connectedCallback() {
    this.title = this.title, this.name = this.name, s(this, r).addEventListener("click", (t) => {
      this.dispatchEvent(new CustomEvent("change", {
        detail: {
          name: this.name,
          isOpen: this.isOpen
        },
        bubbles: !0,
        composed: !0
      }));
    });
  }
}
h = new WeakMap(), r = new WeakMap(), p = new WeakMap(), n = new WeakMap(), a = new WeakMap();
customElements.get("ea-collapse-item") || customElements.define("ea-collapse-item", u);
export {
  u as EaCollapseItem
};
