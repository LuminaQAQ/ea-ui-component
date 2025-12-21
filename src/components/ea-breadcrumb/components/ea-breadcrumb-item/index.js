import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";
import EaUtils from "@/utils/Utils";

export class EaBreadcrumbItem extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #content;

  static get observedAttributes() {
    return [...super.observedAttributes, "href"];
  }

  state = this.properties({
    href: {
      type: String,
      default: "",
      observer: (newVal) => {
        this.#content.setAttribute("href", newVal);
        this.#content.classList.add("is-link");
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist("ea-breadcrumb-item", {
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
    const contentTemplate = EaUtils.EaElement.h(
      this.href ? "a" : "span",
      "ea-breadcrumb-item__content",
      {
        part: "content",
        [this.href ? "href" : ""]: this.href,
        class: ["ea-breadcrumb-item__content", this.href ? "is-link" : ""],
      },
      "<slot></slot>"
    );
    this.shadowRoot.innerHTML = `
      <div class='ea-breadcrumb-item' part='container'>
        ${contentTemplate}
        <span class="ea-breadcrumb-item__separator" part='separator'>
            <slot name="separator"></slot>
        </span>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-breadcrumb-item");
    this.#content = this.shadowRoot.querySelector(
      ".ea-breadcrumb-item__content"
    );
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

if (!window.customElements.get("ea-breadcrumb-item")) {
  window.customElements.define("ea-breadcrumb-item", EaBreadcrumbItem);
}
