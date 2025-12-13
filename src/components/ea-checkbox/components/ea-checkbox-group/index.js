import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaCheckboxGroup extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLSlotElement} */
  #defaultSlot;

  /** @type {AbortController} */
  #abortController = new AbortController();

  static get observedAttributes() {
    return [...super.observedAttributes, "name", "value"];
  }

  state = this.properties({
    name: {
      type: String,
      default: "",
      observer: (newVal) => {
        this.#updateCheckboxChildrenName();
      },
    },
    value: {
      props: true,
      type: Array,
      default: [],
      observer: (newVal) => {
        this.#updateCheckboxChildrenValue();
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist("ea-checkbox-group", {
      // ['--' + this.type]: this.type,
    });

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
      <div class='ea-checkbox-group' part='container'>
        <slot></slot>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-checkbox-group");
    this.#defaultSlot = this.shadowRoot.querySelector("slot");
  }

  #updateCheckboxChildrenName = () => {
    this.querySelectorAll("ea-checkbox").forEach((checkbox) => {
      checkbox.setAttribute("name", this.name);
    });
  };

  #updateCheckboxChildrenValue = () => {
    this.querySelectorAll("ea-checkbox").forEach((checkbox) => {
      const isChecked = this.value.includes(checkbox.getAttribute("value"));
      checkbox.toggleAttribute("checked", isChecked);
    });
  };

  connectedCallback() {
    super.connectedCallback();
    this.#abortController?.abort();
    this.#abortController = new AbortController();

    if (!this.name) this.name = Math.random().toString(36).substring(2, 15);

    this.#defaultSlot.addEventListener(
      "slotchange",
      this.#updateCheckboxChildrenName,
      {
        signal: this.#abortController.signal,
      }
    );
  }

  $beforeUnmounted() {
    this.#abortController.abort();
  }
}

if (!window.customElements.get("ea-checkbox-group")) {
  window.customElements.define("ea-checkbox-group", EaCheckboxGroup);
}
