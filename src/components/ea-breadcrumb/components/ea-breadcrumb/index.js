import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaBreadcrumb extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLSlotElement} */
  #defaultSlot;
  /** @type {AbortController} */
  #abortController = new AbortController();

  static get observedAttributes() {
    return [...super.observedAttributes, "separator"];
  }

  state = this.properties({
    separator: {
      type: String,
      default: "/",
      observer: (newVal) => {},
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist("ea-breadcrumb", {
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
        <nav class='ea-breadcrumb' part='container'>
            <slot id="defaultSlot"></slot>
        </nav>
        <slot id="separatorSlot" name="separator"></slot>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-breadcrumb");
    this.#defaultSlot = this.shadowRoot.querySelector("#defaultSlot");
  }

  /**
   * 获取分隔符
   * @param {string} defaultSeparator
   * @returns {HTMLElement}
   */
  #getSeparatorItem = (defaultSeparator = this.separator) => {
    /** @type {HTMLSlotElement} */
    const separatorSlot = this.shadowRoot.querySelector("#separatorSlot");
    /** @type {HTMLElement | null | undefined} */
    let separator = separatorSlot.assignedElements()[0];
    if (!separator) {
      separator = document.createElement("span");
      separator.setAttribute("slot", "separator");
      separator.innerText = defaultSeparator;
    }

    return separator;
  };

  /**
   * 渲染分隔符
   */
  #renderSeparator = () => {
    /** @type {HTMLSlotElement} */
    const defaultSlot = this.shadowRoot.querySelector("#defaultSlot");
    /** @type {import("../ea-breadcrumb-item/index.js").EaBreadcrumbItem[]} */
    const breadcrumbItems = [...defaultSlot.assignedElements()].filter(
      (item) => item.tagName.toLowerCase() === "ea-breadcrumb-item"
    );
    const separator = this.#getSeparatorItem(this.separator);

    breadcrumbItems.forEach((item, index) => {
      if (
        index < breadcrumbItems.length - 1 &&
        !item.querySelector("[slot='separator']")
      ) {
        item.appendChild(separator.cloneNode(true));
      }
    });
  };

  connectedCallback() {
    super.connectedCallback();

    this.#defaultSlot.addEventListener("slotchange", this.#renderSeparator, {
      signal: this.#abortController.signal,
    });
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }
}

if (!window.customElements.get("ea-breadcrumb")) {
  window.customElements.define("ea-breadcrumb", EaBreadcrumb);
}
