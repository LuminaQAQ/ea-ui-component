import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaSegmented extends Base {
  /** @type {HTMLElement} */
  #container;

  #props = {
    options: [],
  };

  static get observedAttributes() {
    return [...super.observedAttributes];
  }

  state = this.properties({
    type: {
      props: true,
      //   type: ,
      default: "",
      observer: (newVal) => {},
    },
  });

  // ------- options -------
  // #region
  get options() {
    return this.#props.options;
  }

  set options(value) {
    this.#props.options = value;
  }
  // #endregion
  // ------- end -------

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist("ea-segmented", {
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
      <div class='ea-segmented' part='container'>
        <slot></slot>
      </div>
        `;

    this.#container = this.shadowRoot.querySelector(".ea-segmented");
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

if (!window.customElements.get("ea-segmented")) {
  window.customElements.define("ea-segmented", EaSegmented);
}
