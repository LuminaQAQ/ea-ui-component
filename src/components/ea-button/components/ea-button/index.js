import FormAssociatedBase from "@/core/FormBase/index.js";

import stylesheet from "./index.scss?inline";

export class EaButton extends FormAssociatedBase {
  /** @type {HTMLButtonElement | HTMLLinkElement} */
  #container;
  /** @type {HTMLIconElement} */
  #icon;

  /** @type {AbortController} */
  #abortController;

  static get observedAttributes() {
    return [
      "disabled",
      "type",
      "button-type", // 暂定为原生 type 属性
      "text",
      "plain",
      "round",
      "circle",
      "link",
      "href",
      "size",
      "loading",
      "icon",
    ];
  }

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist(
      "ea-button",
      {
        ["--" + this.type]: this.type,
        ["--disabled"]: this.disabled || this.loading,
        ["--text"]: this.text || this.link,
        ["--plain"]: this.plain,
        ["--round"]: this.round,
        ["--circle"]: this.circle,
        ["--" + this.size]: this.size,
      },
      { icon: this.icon?.length }
    );

    this.#container.className = className;

    return className;
  }

  /**
   * @typedef {Object} state
   * @property {boolean} disabled
   * @property {string} type
   * @property {string} text
   * @property {boolean} plain
   * @property {boolean} round
   * @property {boolean} circle
   * @property {boolean} link
   * @property {string} href
   * @property {string} size
   * @property {boolean} loading
   * @property {string} icon
   */

  /** @type {state} */
  state = this.properties({
    disabled: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.updateContainerClasslist();
      },
    },
    type: {
      type: ["normal", "primary", "success", "warning", "danger"],
      default: "normal",
      observer: newVal => {
        this.updateContainerClasslist();
      },
    },
    text: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.updateContainerClasslist();
      },
    },
    plain: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.updateContainerClasslist();
      },
    },
    round: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.updateContainerClasslist();
      },
    },
    circle: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.updateContainerClasslist();
      },
    },
    link: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.$render();
        this.#container.href = this.getAttribute("href");
        this.updateContainerClasslist();
      },
    },
    href: {
      type: String,
      default: "",
      observer: newVal => {
        this.updateContainerClasslist();

        this.#container.setAttribute("href", newVal);
      },
    },
    size: {
      type: ["small", "medium", "large"],
      default: "medium",
      observer: newVal => {
        this.updateContainerClasslist();
      },
    },
    loading: {
      type: Boolean,
      default: false,
      observer: newVal => {
        newVal = newVal === "true" || newVal === true;
        this.toggleAttribute("disabled", newVal);

        if (newVal) {
          const i = document.createElement("ea-icon");
          i.id = "ea-loading-icon";
          i.setAttribute("name", "spinner");
          i.toggleAttribute("spin", true);
          i.setAttribute("size", this.size);
          i.setAttribute("part", "loading-icon");

          this.#container.insertBefore(i, this.#container.firstChild);
        } else {
          const loadingIcon =
            this.#container?.querySelectorAll("#ea-loading-icon");
          if (loadingIcon?.length > 0) {
            loadingIcon?.forEach(item => item.remove());
          }
        }

        this.updateContainerClasslist();
      },
    },
    icon: {
      type: String,
      default: "",
      observer: newVal => {
        this.#icon.setAttribute("name", newVal);
        this.#icon.setAttribute("size", this.size);

        this.updateContainerClasslist();
      },
    },
    "button-type": {
      type: ["button", "submit", "reset"],
      default: "button",
      observer: newVal => {
        this.#container.type = newVal;
      },
    },
  });

  constructor() {
    super();

    this.stylesheet = stylesheet;

    this.$render();
  }

  $render() {
    const tag = this.getAttrBoolean("link") ? "a" : "button";
    this.shadowRoot.innerHTML = `
      <${tag} class="ea-button" part="container" tabindex="-1">
        <ea-icon class="ea-button__icon" part="icon"></ea-icon>
        <slot></slot>
      </${tag}>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-button");
    this.#icon = this.shadowRoot.querySelector(".ea-button__icon");

    this.updateContainerClasslist();
  }

  /**
   * @param {KeyboardEvent} e
   */
  #onEnterKeyPress = e => {
    if (e.key === "Enter") {
      this.click();
    }
  };

  connectedCallback() {
    super.connectedCallback();

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.addEventListener("keypress", this.#onEnterKeyPress, {
      signal: this.#abortController.signal,
    });

    this.addEventListener("click", e => {
      if (this["button-type"] === "submit") {
        const form = this.getForm();
        if (form) {
          e.preventDefault();

          form.dispatchEvent(new Event("submit"));
        }
      } else if (this["button-type"] === "reset") {
        const form = this.getForm();
        if (form) {
          e.preventDefault();
          form.reset();
        }
      }
    });
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }
}

if (!window.customElements.get("ea-button")) {
  window.customElements.define("ea-button", EaButton);
}
