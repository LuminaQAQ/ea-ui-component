import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaTableColumn extends Base {
  /** @type {HTMLElement} */
  #container;

  static get observedAttributes() {
    return [];
  }

  // state = this.properties({
  //   type: {
  //     // type: ,
  //     default: "",
  //     observer: (newVal) => {},
  //   },
  // });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    return this.computedClasslist("ea-table-column", {
      // ['--' + this.type]: this.type,
    });
  }

  constructor() {
    super();

    this.stylesheet = stylesheet;
  }

  $render() {
    if (this.innerHTML) {
      const template = document.createElement("template");
      template.innerHTML = this.innerHTML;
      this.template = template;
    } else {
      this.template = null;
    }

    this.dispatchEvent("ea-table-column-ready");
  }

  connectedCallback() {
    super.connectedCallback();

    this.$render();
  }
}

if (!window.customElements.get("ea-table-column")) {
  window.customElements.define("ea-table-column", EaTableColumn);
}
