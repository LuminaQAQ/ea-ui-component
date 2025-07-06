var n = (e, r, t) => {
  if (!r.has(e))
    throw TypeError("Cannot " + t);
};
var o = (e, r, t) => {
  if (r.has(e))
    throw TypeError("Cannot add the same private member more than once");
  r instanceof WeakSet ? r.add(e) : r.set(e, t);
};
var i = (e, r, t) => (n(e, r, "access private method"), t);
import { B as h } from "./Base.js";
import "./index3.js";
import "./ea-breadcrumb-item.js";
import { c as m } from "./createElement.js";
const u = `
.ea-breadcrumb_wrap {
  display: flex;
}
.ea-breadcrumb_wrap .separator {
  margin: 0 10px;
}
`;
var s, p;
class b extends h {
  constructor() {
    super();
    // #endregion
    // ------- end -------
    o(this, s);
    const t = this.attachShadow({ mode: "open" });
    t.innerHTML = `
            <div class="ea-breadcrumb_wrap" part='container'>
                <slot></slot>
            </div>
        `, this.build(t, u);
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
    this.separator = this.separator, this.separatorClass = this.separatorClass, this.separatorColor = this.separatorColor, i(this, s, p).call(this);
  }
}
s = new WeakSet(), p = function() {
  const t = this.querySelectorAll("ea-breadcrumb-item");
  t.forEach((c, l) => {
    if (l < t.length - 1) {
      const a = m("ea-icon");
      a.color = this.separatorColor, this.separatorClass ? a.icon = this.separatorClass : (a.style.margin = "0 10px", a.innerText = this.separator), c.appendChild(a);
    }
  });
};
customElements.get("ea-breadcrumb") || customElements.define("ea-breadcrumb", b);
export {
  b as EaBreadcrumb
};
