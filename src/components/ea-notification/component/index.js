import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";
import EaUtils from "@/utils/Utils";

export class EaNotificationElement extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #header;
  /** @type {HTMLElement} */
  #notificationIcon;
  /** @type {HTMLElement} */
  #title;
  /** @type {HTMLElement} */
  #closeIcon;
  /** @type {HTMLElement} */
  #main;
  /** @type {AbortController} */
  #visibleAbortController;

  #states = {
    dangerouslyUseHTMLString: false,
    message: "",
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

  // ------- message -------
  // #region
  get message() {
    return this.#states.message;
  }

  set message(value) {
    this.#states.message = value;

    if (this.dangerouslyUseHTMLString) {
      this.#main.innerHTML = value;
    } else {
      this.#main.innerText = value;
    }
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
    type: {
      type: ["primary", "success", "warning", "info", "error"],
      default: "info",
      observer: (newVal) => {
        const iconTypes = {
          success: "icon-ok-circled",
          error: "icon-cancel-circled",
          warning: "icon-attention-alt",
          info: "icon-info",
          primary: "icon-info",
        };

        this.#notificationIcon.icon = iconTypes[newVal];
        this.#container.className = this.updateContainerClasslist();
      },
    },
    title: {
      type: String,
      default: "",
      observer: (newVal) => {
        this.#title.textContent = newVal;
      },
    },
    visible: {
      type: Boolean,
      default: false,
      observer: async (newVal) => {
        this.#visibleAbortController?.abort();
        this.#visibleAbortController = new AbortController();

        if (newVal) {
          this.#initPosition();
          this.#container.className = this.updateContainerClasslist();
          this.#dispatchBubblesEvent("show");

          void this.#container.offsetWidth;

          this.#container.classList.add("is-show");

          this.#container.addEventListener(
            "transitionend",
            () => {
              this.#dispatchBubblesEvent("shown");
            },
            { once: true, signal: this.#visibleAbortController.signal }
          );
        } else {
          this.#handleHide();

          this.#container.classList.add("is-before-hide");
          this.#dispatchBubblesEvent("hide");

          this.#container.addEventListener(
            "transitionend",
            () => {
              this.#container.className = this.updateContainerClasslist();
              this.#dispatchBubblesEvent("hidden");
            },
            { once: true, signal: this.#visibleAbortController.signal }
          );
        }
      },
    },
    showClose: {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        this.#container.className = this.updateContainerClasslist();
      },
    },
    placement: {
      type: ["top-right", "top-left", "bottom-right", "bottom-left"],
      default: "top-right",
      observer: (newVal) => {
        this.#container.className = this.updateContainerClasslist();
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    return this.computedClasslist("ea-notification", {
      ["--visible"]: this.visible,
      ["--" + this.type]: this.type,
      ["--show-close"]: this.showClose,
      ["--" + this.placement]: this.placement,
    });
  }

  constructor() {
    super();

    this.stylesheet = stylesheet;

    this.$render();
  }

  $render() {
    this.shadowRoot.innerHTML = `
      <div class="ea-notification" part='container'>
        <header class="ea-notification__header" part='header'>
          <ea-icon class="ea-notification__icon" part="icon"></ea-icon>
          <span class="ea-notification__title" part="title"> </span>
          <ea-icon class="ea-notification__close-icon" part='close-icon'></ea-icon>
        </header>
        <main class="ea-notification__main" part='main'> </main>
      </div>
        `;

    this.#container = this.shadowRoot.querySelector(".ea-notification");
    this.#header = this.shadowRoot.querySelector(".ea-notification__header");
    this.#notificationIcon = this.shadowRoot.querySelector(".ea-notification__icon");
    this.#title = this.shadowRoot.querySelector(".ea-notification__title");
    this.#closeIcon = this.shadowRoot.querySelector(
      ".ea-notification__close-icon"
    );
    this.#main = this.shadowRoot.querySelector(".ea-notification__main");
  }

  #dispatchBubblesEvent = (customEventName, detail) => {
    this.dispatchEvent(customEventName, {
      detail,
      bubbles: true,
      composed: true,
    });
  };

  close = () => {
    this.visible = false;
    this.#dispatchBubblesEvent("close");
  };

  #initPosition = () => {
    /** @type {HTMLElement[]} */
    const eaNotificationList = document.querySelectorAll(
      `ea-notification[placement="${this.placement}"]`
    );
    if (eaNotificationList.length <= 1) return;

    const lastEl = eaNotificationList[eaNotificationList.length - 2];
    /** @type {string} */
    const lastPosition = lastEl.style.getPropertyValue("--ea-notification-y");

    const lastEaMessage = lastEl.shadowRoot.querySelector(".ea-notification");
    const lastEaMessageRect = lastEaMessage.getBoundingClientRect();

    this.style.setProperty(
      "--ea-notification-y",
      `${
        Number(lastPosition.replace("px", "")) + lastEaMessageRect.height + 8
      }px`
    );
  };

  #handleHide = () => {
    const eaNotificationList = [
      ...document.querySelectorAll(
        `ea-notification[placement="${this.placement}"]`
      ),
    ];
    const thisIndex = eaNotificationList.findIndex((el) => el === this);
    const els = eaNotificationList.slice(thisIndex + 1);
    const height = this.#container.getBoundingClientRect().height;

    els.forEach((message, i) => {
      const posi = Number(
        message.style.getPropertyValue("--ea-notification-y").replace("px", "")
      );
      message.style.setProperty(
        "--ea-notification-y",
        `${posi - height - 8}px`
      );
    });
  };

  connectedCallback() {
    super.connectedCallback();
  }

  $beforeUnmounted() {
    this.#visibleAbortController?.abort();
  }
}

if (!window.customElements.get("ea-notification")) {
  window.customElements.define("ea-notification", EaNotificationElement);
}
