var r = (t) => {
  throw TypeError(t);
};
var o = (t, a, e) => a.has(t) || r("Cannot " + e);
var n = (t, a, e) => (o(t, a, "read from private field"), e ? e.call(t) : a.get(t)), l = (t, a, e) => a.has(t) ? r("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(t) : a.set(t, e), m = (t, a, e, s) => (o(t, a, "write to private field"), s ? s.call(t, e) : a.set(t, e), e);
import { B as h } from "./Base.js";
const k = `
<svg class="skeleton-image" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 20h70v60H15z" stroke="#c0c4cc" stroke-width="5px" fill="none" />
    <circle r="8" cx="32" cy="35" fill="#c0c4cc" />
    <path d="M60 42.5L39 75h42z" fill="#c0c4cc" />
    <path d="M35 52.5L20 75h-4 32z" fill="#c0c4cc" />
</svg>
`, c = `
:host {
  --p-width: 100%;
  --margin-top: 1rem;
}

@keyframes skeleton-loading {
  0% {
    background-position: 100% 50%;
  }
}
.ea-skeleton-item_wrap {
  position: relative;
  background-color: #f2f2f2;
  border-radius: 4px;
}
.ea-skeleton-item_wrap.animated {
  background-image: linear-gradient(90deg, #f6f6f6 25%, #e8e8e8 37%, #f6f6f6 63%);
  background-size: 400% 100%;
  animation: skeleton-loading 1.4s ease infinite;
}

.ea-skeleton-item_wrap.ea-skeleton_p, .ea-skeleton-item_wrap.ea-skeleton_image, .ea-skeleton-item_wrap.ea-skeleton_text, .ea-skeleton-item_wrap.ea-skeleton_h1, .ea-skeleton-item_wrap.ea-skeleton_h2, .ea-skeleton-item_wrap.ea-skeleton_h3, .ea-skeleton-item_wrap.ea-skeleton_h4, .ea-skeleton-item_wrap.ea-skeleton_h5, .ea-skeleton-item_wrap.ea-skeleton_h6 {
  width: 100%;
}
.ea-skeleton-item_wrap.ea-skeleton_p {
  width: var(--p-width);
  height: 16px;
  margin-top: var(--margin-top);
}
.ea-skeleton-item_wrap.ea-skeleton_image {
  width: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0;
  height: 100%;
}
.ea-skeleton-item_wrap.ea-skeleton_image .skeleton-image {
  width: 30%;
  height: 30%;
}
.ea-skeleton-item_wrap.ea-skeleton_text {
  height: 13px;
  margin: 2px 0;
}
.ea-skeleton-item_wrap.ea-skeleton_h1 {
  height: 2rem;
  margin-block: 0.67rem;
}
.ea-skeleton-item_wrap.ea-skeleton_h2 {
  height: 1.5rem;
  margin-block: 0.83rem;
}
.ea-skeleton-item_wrap.ea-skeleton_h3 {
  height: 1.17rem;
  margin-block: 1rem;
}
.ea-skeleton-item_wrap.ea-skeleton_h4 {
  height: 1rem;
  margin-block: 1.33rem;
}
.ea-skeleton-item_wrap.ea-skeleton_h5 {
  height: 0.83rem;
  margin-block: 1.67rem;
}
.ea-skeleton-item_wrap.ea-skeleton_h6 {
  height: 0.67rem;
  margin-block: 2.33rem;
}
`;
var i;
class g extends h {
  constructor() {
    super();
    l(this, i);
    const e = this.attachShadow({ mode: "open" });
    e.innerHTML = `
            <div class="ea-skeleton-item_wrap" part="container"></div>
        `, m(this, i, e.querySelector(".ea-skeleton-item_wrap")), this.build(e, c);
  }
  get variantOptions() {
    return ["text", "image", "p", "h1", "h2", "h3", "h4", "h5", "h6"];
  }
  // ------- style html标签上的样式 -------
  // #region
  get elementStyle() {
    return this.getAttribute("style");
  }
  set elementStyle(e) {
    e && n(this, i).setAttribute("style", e);
  }
  // #endregion
  // ------- end -------
  // ------- variant html标签标识 -------
  // #region
  get variant() {
    return this.getAttribute("variant");
  }
  set variant(e) {
    this.variantOptions.includes(e) ? this.setAttribute("variant", e) : this.setAttribute("variant", "text"), e === "image" && (n(this, i).innerHTML = k), n(this, i).classList.add("ea-skeleton_" + this.variant);
  }
  // #endregion
  // ------- end -------
  // ------- animated 是否带有动画 -------
  // #region
  get animated() {
    return this.getAttrBoolean("animated");
  }
  set animated(e) {
    e && (this.setAttribute("animated", e), n(this, i).classList.toggle("animated", e));
  }
  // #endregion
  // ------- end -------
  connectedCallback() {
    this.style.display = "block", this.variant = this.variant, this.animated = this.animated;
  }
}
i = new WeakMap();
customElements.get("ea-skeleton-item") || customElements.define("ea-skeleton-item", g);
export {
  g as EaSkeletonItem
};
