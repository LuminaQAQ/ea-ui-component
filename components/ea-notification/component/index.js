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
      "visible",
      "title",
      "message",
      "type",
      "icon",
      "duration",
      "placement",
      "showClose",
      "zIndex",
      "closeIcon",
    ]);
  }

  state = this.properties({
    // type: {
    //   type: ["primary", "success", "warning", "info", "error"],
    //   default: "info",
    //   observer: (newVal) => {
    //     const iconTypes = {
    //       success: "icon-ok-circled",
    //       error: "icon-cancel-circled",
    //       warning: "icon-attention-alt",
    //       info: "icon-info",
    //       primary: "icon-info",
    //     };
    //     this.#messageIcon.icon = iconTypes[newVal];
    //     this.#container.className = this.updateContainerClasslist();
    //   },
    // },
    // visible: {
    //   type: Boolean,
    //   default: false,
    //   observer: async (newVal) => {
    //     this.#visibleAbortController?.abort();
    //     this.#visibleAbortController = new AbortController();
    //     if (newVal) {
    //       this.#initPosition();
    //       this.#container.className = this.updateContainerClasslist();
    //       this.#dispatchBubblesEvent("show");
    //       void this.#container.offsetWidth;
    //       this.#container.classList.add("ea-message--is-show");
    //       this.#container.addEventListener(
    //         "transitionend",
    //         () => {
    //           this.#dispatchBubblesEvent("shown");
    //         },
    //         { once: true, signal: this.#visibleAbortController.signal }
    //       );
    //     } else {
    //       this.#handleHide();
    //       this.#container.classList.add("ea-message--before-hide");
    //       this.#dispatchBubblesEvent("hide");
    //       this.#container.addEventListener(
    //         "transitionend",
    //         () => {
    //           this.#container.className = this.updateContainerClasslist();
    //           this.#dispatchBubblesEvent("hidden");
    //         },
    //         { once: true, signal: this.#visibleAbortController.signal }
    //       );
    //     }
    //   },
    // },
    // message: {
    //   type: String,
    //   default: "",
    //   observer: (newVal) => {
    //     if (this.dangerouslyUseHTMLString) {
    //       this.#messageContent.innerHTML = newVal;
    //     } else {
    //       this.#messageContent.innerText = newVal;
    //     }
    //   },
    // },
    // showClose: {
    //   type: Boolean,
    //   default: false,
    //   observer: (newVal) => {
    //     this.#container.className = this.updateContainerClasslist();
    //   },
    // },
    // placement: {
    //   type: [
    //     "top",
    //     "top-left",
    //     "top-right",
    //     "bottom",
    //     "bottom-left",
    //     "bottom-right",
    //     "middle",
    //   ],
    //   default: "top",
    //   observer: (newVal) => {
    //     this.className = this.updateContainerClasslist();
    //   },
    // },
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

  #dispatchBubblesEvent = (customEventName, detail) => {
    this.dispatchEvent(customEventName, {
      detail,
      bubbles: true,
      composed: true,
    });
  };

  connectedCallback() {
    super.connectedCallback();
  }
}

if (!window.customElements.get("ea-notification")) {
  window.customElements.define("ea-notification", EaNotificationElement);
}
