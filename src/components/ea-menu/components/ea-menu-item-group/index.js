import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaMenuItemGroup extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLSlotElement} */
  #titleSlot;
  /** @type {AbortController} */
  #abortController = new AbortController();

  static get observedAttributes() {
    return [...super.observedAttributes, "title"];
  }

  state = this.properties({
    title: {
      type: String,
      default: "",
      observer: newVal => {
        this.#titleSlot.textContent = newVal;
      },
    },
  });

  constructor() {
    super();

    this.stylesheet = stylesheet;

    this.$render();
  }

  $render() {
    this.shadowRoot.innerHTML = `
      <div class='ea-menu-item-group' part='container'>
        <header class='ea-menu-item-group__title' part='title'>
          <slot name="title">${this.title}</slot>
        </header>
        <div class='ea-menu-item-group__content' part='content'>
          <slot></slot>
        </div>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-menu-item-group");
    this.#titleSlot = this.shadowRoot.querySelector("slot[name='title']");
  }

  connectedCallback() {
    super.connectedCallback();
  }
  $beforeUnmounted() {
    this.#abortController.abort();
  }
}

if (!window.customElements.get("ea-menu-item-group")) {
  window.customElements.define("ea-menu-item-group", EaMenuItemGroup);
}
