import Base from "@components/Base.js";
import stylesheet from "./index.scss?inline";

export class EaCarouselItem extends Base {
  static get observedAttributes() {
    return [...super.observedAttributes];
  }

  constructor() {
    super();

    this.stylesheet = stylesheet;

    this.$render();
  }

  $render() {
    this.shadowRoot.innerHTML = `
      <div class='ea-carousel-item' part='container'>
        <slot></slot>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    // queueMicrotask(() => {
    //   this.emit("ea-load", {
    //     bubbles: true,
    //     cancelable: false,
    //     composed: true,
    //   });
    // });
  }
}

if (!window.customElements.get("ea-carousel-item")) {
  window.customElements.define("ea-carousel-item", EaCarouselItem);
}
