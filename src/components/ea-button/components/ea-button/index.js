import FormAssociatedBase from "@/core/FormBase/index.js";

import stylesheet from "./index.scss?inline";

export class EaButton extends FormAssociatedBase {
  /** @type {HTMLButtonElement | HTMLLinkElement} */
  #container;

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
    return this.computedClasslist("ea-button", {
      ["--" + this.type]: this.type,
      ["--disabled"]: this.disabled || this.loading,
      ["--text"]: this.text || this.link,
      ["--plain"]: this.plain,
      ["--round"]: this.round,
      ["--circle"]: this.circle,
      ["--" + this.size]: this.size,
    });
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
        this.#container.className = this.updateContainerClasslist();
      },
    },
    type: {
      type: ["normal", "primary", "success", "warning", "danger"],
      default: "normal",
      observer: newVal => {
        this.#container.className = this.updateContainerClasslist();
      },
    },
    text: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.#container.className = this.updateContainerClasslist();
      },
    },
    plain: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.#container.className = this.updateContainerClasslist();
      },
    },
    round: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.#container.className = this.updateContainerClasslist();
      },
    },
    circle: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.#container.className = this.updateContainerClasslist();
      },
    },
    link: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.#container.className = this.updateContainerClasslist();
      },
    },
    href: {
      type: String,
      default: "",
      observer: newVal => {
        this.#container.className = this.updateContainerClasslist();

        this.#container.setAttribute("href", newVal);
      },
    },
    size: {
      type: ["small", "medium", "large"],
      default: "medium",
      observer: newVal => {
        this.#container.className = this.updateContainerClasslist();
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
          i.icon = "icon-cw animate-spin";
          i.size = this.size;
          i.part = "loading-icon";

          this.#container.insertBefore(i, this.#container.firstChild);
        } else {
          const loadingIcon =
            this.#container?.querySelectorAll("#ea-loading-icon");
          if (loadingIcon?.length > 0) {
            loadingIcon?.forEach(item => item.remove());
          }
        }

        this.#container.className = this.updateContainerClasslist();
      },
    },
    icon: {
      type: String,
      default: "",
      observer: newVal => {
        if (newVal && !this.#container.querySelector("ea-icon")) {
          const eaIcon = document.createElement("ea-icon");
          eaIcon.size = this.size;
          eaIcon.icon = newVal;
          eaIcon.part = "icon";

          this.#container.insertBefore(eaIcon, this.#container.firstChild);
        }
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
        <slot></slot>
      </${tag}>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-button");
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

          // form.onsubmit = (e) => {
          //   e.preventDefault();
          // };
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

    this.emit("ea-button-ready");
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }
}

if (!window.customElements.get("ea-button")) {
  window.customElements.define("ea-button", EaButton);
}
