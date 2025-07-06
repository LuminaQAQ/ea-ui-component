var o = (r) => {
  throw TypeError(r);
};
var h = (r, e, t) => e.has(r) || o("Cannot " + t);
var i = (r, e, t) => e.has(r) ? o("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(r) : e.set(r, t);
var p = (r, e, t) => (h(r, e, "access private method"), t);
import { B as m } from "./Base.js";
import "./index3.js";
import "./ea-breadcrumb-item.js";
import { c as u } from "./createElement.js";
const b = `
.ea-breadcrumb_wrap {
  display: flex;
}
.ea-breadcrumb_wrap .separator {
  margin: 0 10px;
}
`;
var s, c;
class d extends m {
  constructor() {
    super();
    i(this, s);
    const t = this.attachShadow({ mode: "open" });
    t.innerHTML = `
            <div class="ea-breadcrumb_wrap" part='container'>
                <slot></slot>
            </div>
        `, this.build(t, b);
  }
  // ------- separator 分隔符 -------
  // #region
  get separator() {
    return this.getAttribute("separator") || "/";
  }
  set separator(t) {
    this.setAttribute("separator", t);
  }
  // #endregion
  // ------- end -------
  // ------- separator-class 分隔符的图标类名 -------
  // #region
  get separatorClass() {
    return this.getAttribute("separator-class") || "";
  }
  set separatorClass(t) {
    this.setAttribute("separator-class", t);
  }
  // #endregion
  // ------- end -------
  // ------- separator-color 分隔符的图标颜色 -------
  // #region
  get separatorColor() {
    return this.getAttribute("separator-color") || "#c0c4cc";
  }
  set separatorColor(t) {
    this.setAttribute("separator-color", t);
  }
  connectedCallback() {
    this.separator = this.separator, this.separatorClass = this.separatorClass, this.separatorColor = this.separatorColor, p(this, s, c).call(this);
  }
}
s = new WeakSet(), // #endregion
// ------- end -------
c = function() {
  const t = this.querySelectorAll("ea-breadcrumb-item");
  t.forEach((l, n) => {
    if (n < t.length - 1) {
      const a = u("ea-icon");
      a.color = this.separatorColor, this.separatorClass ? a.icon = this.separatorClass : (a.style.margin = "0 10px", a.innerText = this.separator), l.appendChild(a);
    }
  });
};
customElements.get("ea-breadcrumb") || customElements.define("ea-breadcrumb", d);
export {
  d as EaBreadcrumb
};
