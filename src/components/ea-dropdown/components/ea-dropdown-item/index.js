import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaDropdownItem extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {AbortController} */
  #abortController = new AbortController();

  static get observedAttributes() {
    return [...super.observedAttributes, "disabled", "divided", "command"];
  }

  state = this.properties({
    divided: {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        this.updateContainerClasslist();
      },
    },
    disabled: {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        this.setAttr("aria-disabled", newVal);
        this.updateContainerClasslist();
      },
    },
    command: {
      type: String,
      default: "",
      observer: (newVal) => {},
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist(
      "ea-dropdown-item",
      {
        ["--disabled"]: this.disabled,
      },
      {
        divided: this.divided,
      }
    );

    this.#container.className = className;

    return className;
  }

  constructor() {
    super();

    this.stylesheet = stylesheet;

    this.$render();
  }

  $render() {
    this.shadowRoot.innerHTML = `
      <div class='ea-dropdown-item' part='container'>
        <div class='ea-dropdown-item__divider' part='divider'></div>
        <div class='ea-dropdown-item__content' part='content'>
            <slot></slot>
        </div>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-dropdown-item");
    this.updateContainerClasslist();
  }

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener(
      "click",
      (e) => {
        if (this.hasAttribute("disabled")) {
          e.stopImmediatePropagation();
          e.preventDefault();
          return;
        }

        this.emit("ea-dropdown-item-click", {
          bubbles: true,
        });

        if (this.command) {
          this.emit("command", {
            detail: {
              command: this.command,
            },
            bubbles: true,
          });
        }
      },
      { signal: this.#abortController.signal }
    );
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }
}

if (!window.customElements.get("ea-dropdown-item")) {
  window.customElements.define("ea-dropdown-item", EaDropdownItem);
}
