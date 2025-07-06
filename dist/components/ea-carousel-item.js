import { B as t } from "./Base.js";
const o = `
:host {
  --odd-bgc: #99a9bf;
}

.ea-carousel-item_wrap {
  display: inline-block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  background-color: var(--odd-bgc);
  display: flex;
  align-items: center;
  justify-content: center;
}
.ea-carousel-item_wrap ::slotted(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
`;
class s extends t {
  constructor() {
    super();
    const e = this.attachShadow({ mode: "open" });
    e.innerHTML = `
            <div class='ea-carousel-item_wrap' part='container'>
                <slot></slot>
            </div>
        `, this.build(e, o);
  }
}
customElements.get("ea-carousel-item") || customElements.define("ea-carousel-item", s);
export {
  s as EaCarouselItem
};
