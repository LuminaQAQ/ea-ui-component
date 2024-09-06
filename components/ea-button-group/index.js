// @ts-nocheck
import Base from "../Base.js";

import { stylesheet } from "./src/style/stylesheet.js";

export class EaButtonGroup extends Base {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });

    shadowRoot.innerHTML = `
      <div class="ea-button-group">
        <slot></slot>
      </div>
    `;

    this.build(shadowRoot, stylesheet);
  }

  // ------- disabled 禁用按钮 -------
  // #region
  get disabled() {
    return this.getAttrBoolean('disabled');
  }

  set disabled(value) {
    this.toggleAttr('disabled', value);

    Array.from(this.children).forEach(child => {
      child.disabled = value;
    });
  }
  // #endregion
  // ------- end -------

  connectedCallback() {
    this.disabled = this.disabled;
  }
}

if (!window.customElements.get("ea-button-group")) {
  window.customElements.define("ea-button-group", EaButtonGroup);
}