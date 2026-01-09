import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaTimeline extends Base {
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
      <div class='ea-timeline' part='container'>
        <slot></slot>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

if (!window.customElements.get("ea-timeline")) {
  window.customElements.define("ea-timeline", EaTimeline);
}
