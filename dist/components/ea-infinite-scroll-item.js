import { B as t } from "./Base.js";
class i extends t {
  constructor() {
    super();
    const e = this.attachShadow({ mode: "open" });
    e.innerHTML = `
            <div class='ea-infinite-item_wrap' part='container'>
                <slot></slot>
            </div>
        `;
  }
}
customElements.get("ea-infinite-item") || customElements.define("ea-infinite-item", i);
export {
  i as EaInfiniteScrollItem
};
