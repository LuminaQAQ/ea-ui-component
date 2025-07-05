// @ts-nocheck
import Base from "../Base.js";

import stylesheet from "./index.scss?inline"

export class EaButtonGroup extends Base {
  static observedProps = ["disabled", "size", "type"];

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

    const shadowRoot = this.shadowRoot

    this.stylesheet = stylesheet;



    this.shadowRoot.innerHTML = `
      <div class="ea-button-group">
        <slot></slot>
      </div>
    `;
  }
  // ------- disabled 禁用子按钮 -------
  // #region
  get disabled() {
    return this.state.disabled;
  }

  set disabled(value) {
    this.state.disabled = value;
  }
  // #endregion
  // ------- end -------

  // ------- size 子按钮大小 -------
  // #region
  get size() {
    return this.state.size;
  }

  set size(value) {
    this.state.size = value;
  }
  // #endregion
  // ------- end -------

  // ------- size 子按钮大小 -------
  // #region
  get type() {
    return this.state.type;
  }

  set type(value) {
    this.state.type = value;
  }
  // #endregion
  // ------- end -------

  $mounted() {
    this.disabled = this.getAttribute("disabled")
    this.size = this.getAttribute('size');
    this.type = this.getAttribute('type');
  }

}

if (!window.customElements.get("ea-button-group")) {
  window.customElements.define("ea-button-group", EaButtonGroup);
}