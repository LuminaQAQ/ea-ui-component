import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaDropdownMenu extends Base {
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
      <div class='ea-dropdown-menu' part='container'>
        <slot></slot>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

if (!window.customElements.get("ea-dropdown-menu")) {
  window.customElements.define("ea-dropdown-menu", EaDropdownMenu);
}
