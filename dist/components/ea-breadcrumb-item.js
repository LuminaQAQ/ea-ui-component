import { B as t } from "./Base.js";
import "./index3.js";
const a = `
.ea-breadcrumb-item_wrap {
  font-size: 14px;
  color: #606266;
  line-height: 1;
}
.ea-breadcrumb-item_wrap ::slotted(a) {
  text-decoration: none;
  font-weight: 600;
  color: #303133;
}
`;
class o extends t {
  constructor() {
    super();
    const e = this.attachShadow({ mode: "open" });
    e.innerHTML = `
            <span class="ea-breadcrumb-item_wrap" part='container'>
                <slot></slot>
            </span>
        `, this.build(e, a);
  }
}
customElements.get("ea-breadcrumb-item") || customElements.define("ea-breadcrumb-item", o);
export {
  o as EaBreadcrumbItem
};
