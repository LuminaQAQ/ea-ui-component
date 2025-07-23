// @ts-nocheck
import Base from "../Base.js";

import stylesheet from "./index.scss?inline"

export class EaButtonGroup extends Base {
  static get observedAttributes() {
    return ["disabled", "size", "type"];
  }

  /**
   * @typedef {object} Properties
   * @property {boolean} disabled
   * @property {string} size
   * @property {string} type
   */

  /** @type {Properties}   */
  state = this.properties({
    disabled: {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        this.querySelectorAll("ea-button").forEach((button) => {
          button.disabled = newVal;
        });
      }
    },
    size: {
      type: ["small", "normal", "large"],
      default: "normal",
      observer: (newVal) => {
        this.querySelectorAll("ea-button").forEach((button) => {
          button.size = newVal;
        });
      }
    },
    type: {
      type: ["primary", "success", "warning", "danger", "normal", ''],
      default: "",
      observer: (newVal) => {
        if (!newVal) return;

        this.querySelectorAll("ea-button").forEach((button) => {
          button.type = newVal;
        });
      }
    }
  })

  constructor() {
    super();
    this.stylesheet = stylesheet;

    this.$render()
  }

  $render() {
    this.shadowRoot.innerHTML = `
      <div class="ea-button-group">
        <slot></slot>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    this.disabled = this.disabled;
    this.size = this.size;
    this.type = this.type;
  }

}

if (!window.customElements.get("ea-button-group")) {
  window.customElements.define("ea-button-group", EaButtonGroup);
}