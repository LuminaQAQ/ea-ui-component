var u = (o, s, t) => {
  if (!s.has(o))
    throw TypeError("Cannot " + t);
};
var h = (o, s, t) => {
  if (s.has(o))
    throw TypeError("Cannot add the same private member more than once");
  s instanceof WeakSet ? s.add(o) : s.set(o, t);
};
var r = (o, s, t) => (u(o, s, "access private method"), t);
import { t as p } from "./timeout.js";
import { B as f } from "./Base.js";
import "./ea-collapse-item.js";
var i, n;
class v extends f {
  constructor() {
    super();
    // #endregion
    // ------- end -------
    /**
     * 处理折叠面板的展开/折叠状态。
     * 根据传入的标志位flag和激活项名称activeItemName，来决定哪些折叠项应该展开。
     * 当flag为true时，只允许一个折叠项展开，即单选模式；
     * 当flag为false时，可以允许多个折叠项展开，即多选模式。
     * 
     * @param {boolean} flag - 控制单选或多选模式的标志。true表示单选模式，false表示多选模式。
     * @param {string} activeItemName - 激活项的名称，用于决定哪些折叠项应该展开。
     */
    h(this, i);
    const t = this.attachShadow({ mode: "open" });
    t.innerHTML = `
            <div class="ea-collapse_wrap" part="container">
                <slot></slot>
            </div>
        `;
  }
  // ------- active 当前展开项 -------
  // #region
  get active() {
    return this.getAttribute("active") || 1;
  }
  set active(t) {
    this.setAttribute("active", t), p(() => {
      r(this, i, n).call(this, this.accordion, t);
    }, 20);
  }
  // #endregion
  // ------- end -------
  // ------- accordion 是否为手风琴模式 -------
  // #region
  get accordion() {
    return this.getAttrBoolean("accordion") || !1;
  }
  set accordion(t) {
    this.setAttribute("accordion", t), p(() => {
      r(this, i, n).call(this, t, this.active);
    }, 20);
  }
  connectedCallback() {
    this.accordion = this.accordion, this.active = this.active;
  }
}
i = new WeakSet(), n = function(t, l) {
  const a = Array.from(this.querySelectorAll("ea-collapse-item"));
  let c = t ? "" : [];
  a.forEach((e) => {
    e.addEventListener("change", (d) => {
      t && a.forEach((m) => {
        m.isOpen = !1;
      }), e.isOpen = !d.detail.isOpen;
    });
  }), t ? (c = l.toString().trim()[0], a.forEach((e) => {
    e.isOpen = e.name === c;
  })) : (c = l.split(",").map((e) => e.trim()).concat(), a.forEach((e) => {
    e.isOpen = c.includes(e.name);
  }));
};
customElements.get("ea-collapse") || customElements.define("ea-collapse", v);
export {
  v as EaCollapse
};
