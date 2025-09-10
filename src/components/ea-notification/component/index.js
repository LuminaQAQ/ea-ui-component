import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";
import EaUtils from "@/utils/Utils";

export class EaNotificationElement extends Base {
  /** @type {HTMLElement} */
  #container;

  #states = {
    dangerouslyUseHTMLString: false,
    appendTo: "body",
  };

  // ------- dangerouslyUseHTMLString -------
  // #region
  get dangerouslyUseHTMLString() {
    return this.#states.dangerouslyUseHTMLString;
  }

  set dangerouslyUseHTMLString(value) {
    this.#states.dangerouslyUseHTMLString = value;
  }
  // #endregion
  // ------- end -------

  // ------- appendTo -------
  // #region
  get appendTo() {
    return this.#states.appendTo;
  }

  set appendTo(value) {
    this.#states.appendTo = value;
  }
  // #endregion
  // ------- end -------

  static get observedAttributes() {
    return EaUtils.Array.toLowerCamelCase([
      "title",
      "message",
      "type",
      "icon",
      "duration",
      "position",
      "showClose",
      "zIndex",
      "closeIcon",
    ]);
  }

  state = this.properties({
    type: {
      //   type: ,
      default: "",
      observer: (newVal) => {},
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    return this.computedClasslist("ea-notification", {
      // ['--' + this.type]: this.type,
    });
  }

  constructor() {
    super();

    this.stylesheet = stylesheet;

    this.$render();
  }

  $render() {
    this.shadowRoot.innerHTML = `
      <div class='ea-notification' part='container'>
        <slot></slot>
      </div>
        `;

    this.#container = this.shadowRoot.querySelector(".ea-notification");
  }

  close() {}

  connectedCallback() {
    super.connectedCallback();
  }
}

if (!window.customElements.get("ea-notification")) {
  window.customElements.define("ea-notification", EaNotificationElement);
}
