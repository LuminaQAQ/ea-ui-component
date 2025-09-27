import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaCollapseItem extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #titleWrap;
  /** @type {HTMLElement} */
  #title;
  /** @type {HTMLElement} */
  #titleIcon;
  /** @type {HTMLElement} */
  #content;

  #states = {
    isActive: false,
  };

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "title",
      "name",
      "disabled",
      "expand-icon-position",
    ];
  }

  state = this.properties({
    type: {
      //   type: ,
      default: "",
      observer: (newVal) => {},
    },
    title: {
      type: String,
      default: "",
      observer: (newVal) => {
        this.#title.textContent = newVal;
      },
    },
    name: {
      type: String,
      default: "",
      observer: (newVal) => {},
    },
    active: {
      type: Boolean,
      default: false,
      observer: (newVal) => {},
    },
    "expand-icon-position": {
      type: ["left", "right"],
      default: "right",
      observer: (newVal) => {
        this.#container.className = this.updateContainerClasslist();
      },
    },
    disabled: {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        this.#container.className = this.updateContainerClasslist();
      },
    },
  });

  // ------- isActive -------
  // #region
  get isActive() {
    return this.#states.isActive;
  }

  set isActive(value) {
    if (this.#states.isActive === value) return;

    this.active = value;
    this.#states.isActive = value;

    this.#container.style.setProperty(
      "--ea-collapse-item-content-height",
      value ? this.#content.scrollHeight + "px" : "0"
    );
  }
  // #endregion
  // ------- end -------

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    return this.computedClasslist(
      "ea-collapse-item",
      {
        [`--indicator-` + this["expand-icon-position"]]:
          this["expand-icon-position"],
      },
      {
        disabled: this.disabled,
      }
    );
  }

  constructor() {
    super();

    this.stylesheet = stylesheet;

    this.$render();
  }

  $render() {
    this.shadowRoot.innerHTML = `
      <div class='ea-collapse-item' part='container'>
        <div class="ea-collapse-item__title-wrap" part="title-wrap">
            <span class="ea-collapse-item__title" part="title">
                <slot name="title"></slot>
            </span>
            <span class="ea-collapse-item__indicator" part="indicator">
                <slot name="icon">
                    <ea-icon class="default-expand-icon" icon="icon-angle-down" part="icon"></ea-icon>
                </slot>
            </span>
        </div>
        <div class="ea-collapse-item__content" part="content-wrap">
            <slot></slot>
        </div>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-collapse-item");
    this.#titleWrap = this.shadowRoot.querySelector(
      ".ea-collapse-item__title-wrap"
    );
    this.#title = this.shadowRoot.querySelector(".ea-collapse-item__title");
    this.#titleIcon = this.shadowRoot.querySelector(
      ".ea-collapse-item__title-icon"
    );
    this.#content = this.shadowRoot.querySelector(".ea-collapse-item__content");
  }

  connectedCallback() {
    super.connectedCallback();

    this.#container.className = this.updateContainerClasslist();

    this.#titleWrap.addEventListener("click", () => {
      if (this.disabled) return;

      this.dispatchEvent("collapse-item-click", {
        detail: {
          name: this.name,
          el: this,
        },
        bubbles: true,
        cancelable: true,
      });
    });

    this.dispatchEvent("ea-collapse-item-ready");
  }
}

if (!window.customElements.get("ea-collapse-item")) {
  window.customElements.define("ea-collapse-item", EaCollapseItem);
}
