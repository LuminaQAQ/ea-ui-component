import FormAssociatedBase from "@/core/FormBase";

import stylesheet from "./index.scss?inline";

export class EaRate extends FormAssociatedBase {
  /** @type {HTMLElement} */
  #container;
  /** @type {AbortController} */
  #abortController = new AbortController();

  static get observedAttributes() {
    return [...super.observedAttributes, "label", "value", "max"];
  }

  state = this.properties({
    label: {
      type: String,
      default: "",
      observer: newVal => {},
    },
    value: {
      type: Number,
      default: 0,
      observer: newVal => {
        this.setValue(newVal);
      },
    },
    max: {
      type: Number,
      default: 5,
      observer: newVal => {},
    },
    type: {
      // type: ,
      default: "",
      observer: newVal => {},
    },
  });

  funcStates = this.properties({
    getSymbol: {
      props: true,
      type: Function,
      default: (value, isSelected) =>
        `<ea-icon icon="icon-star-empty"></ea-icon>`,
      /** @param {Function} cb */
      observer: cb => {
        if (cb) this.#container.innerHTML = this.#renderRateEl(cb);
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist("ea-rate", {
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
      <div class='ea-rate' part='container'></div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-rate");

    this.#renderRateEl(this.getSymbol);
  }

  /**
   * 渲染 rate 元素
   * @param {(value: Number, isSelected: Boolean) => String} renderer
   * @param {Number} activeValue
   * @return {String}
   */
  #renderRateEl = (renderer, activeValue = this.value, length = this.max) => {
    if (!renderer) return;

    const tpl = Array.from({ length })
      .map(
        (value, index) => `
            <span class='ea-rate__symbol' part='symbol-wrap'>
                ${renderer(index, activeValue)}
            </span>`
      )
      .join("");

    this.#container.innerHTML = tpl;

    return tpl;
  };

  connectedCallback() {
    super.connectedCallback();
    this.#abortController?.abort();
    this.#abortController = new AbortController();

    // this.#container.addEventListener("mousemove", e => {
    //   console.log(e.target);
    // });
  }

  $beforeUnmounted() {
    this.#abortController.abort();
  }
}

if (!window.customElements.get("ea-rate")) {
  window.customElements.define("ea-rate", EaRate);
}
