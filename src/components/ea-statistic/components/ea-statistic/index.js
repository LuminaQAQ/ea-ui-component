import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaStatistic extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #title;
  /** @type {HTMLElement} */
  #number;
  /** @type {HTMLElement} */
  #prefix;
  /** @type {HTMLElement} */
  #suffix;

  static get observedAttributes() {
    return [...super.observedAttributes, "title", "value"];
  }

  state = this.properties({
    title: {
      type: String,
      default: "",
      observer: (newVal) => {
        this.#title.textContent = newVal;
      },
    },
    value: {
      type: Number,
      default: 0,
      /**  @param {Number} newVal */
      observer: (newVal) => {
        this.#number.textContent = newVal.toLocaleString();
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist("ea-statistic", {
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
      <div class='ea-statistic' part='container'>
        <header class='ea-statistic__header' part='title'>
          <slot name='title'></slot>
        </header>
        <main class='ea-statistic__content' part='content'>
          <div class='ea-statistic__prefix' part='prefix'>
            <slot name='prefix'></slot>
          </div>
          <div class='ea-statistic__number' part='number'>
            <slot>
              <span></span>
            </slot>
          </div>
          <div class='ea-statistic__suffix' part='suffix'>
            <slot name='suffix'></slot>
          </div>
        </main>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-statistic");
    this.#title = this.shadowRoot.querySelector(".ea-statistic__header slot");
    this.#number = this.shadowRoot.querySelector(
      ".ea-statistic__number slot span"
    );
    this.#prefix = this.shadowRoot.querySelector(".ea-statistic__prefix slot");
    this.#suffix = this.shadowRoot.querySelector(".ea-statistic__suffix slot");
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

if (!window.customElements.get("ea-statistic")) {
  window.customElements.define("ea-statistic", EaStatistic);
}
