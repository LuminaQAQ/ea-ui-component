import { EaPopper } from "@/common/ea-popper";

import stylesheet from "./index.scss?inline";

export class EaDropdown extends EaPopper {
  /** @type {HTMLElement} */
  #referenceEl;

  /** @type {AbortController} */
  #abortController = new AbortController();

  static get observedAttributes() {
    return [...super.observedAttributes, "trigger", "hide-on-click", "size"];
  }

  #states = {
    hasPlacement: true,
  };

  state = this.properties({
    trigger: {
      type: ["click", "hover", "contextmenu"],
      default: "hover",
      observer: () => {},
    },
    "hide-on-click": {
      type: Boolean,
      default: true,
      observer: () => {},
    },
    size: {
      type: ["small", "default", "large"],
      default: "",
      observer: () => {},
    },
  });

  constructor() {
    super();

    this.#referenceEl = this.shadowRoot.querySelector('slot[name="reference"]');

    if (!this.getAttrString("placement")) this.#states.hasPlacement = false;
  }

  /**
   * 触发事件
   */
  #triggerEventStrategies = {
    hover: () => {
      let abortController = new AbortController();

      this.addEventListener(
        "mouseover",
        () => {
          abortController?.abort();
          abortController = new AbortController();

          this.show();

          this.addEventListener(
            "mouseout",
            () => {
              this.hide();
            },
            { signal: abortController.signal, once: true }
          );

          if (!this.status) abortController.abort();
        },
        { signal: this.#abortController.signal }
      );
    },
    click: () => {
      this.#referenceEl.addEventListener(
        "click",
        () => {
          this.toggle();
        },
        { signal: this.#abortController.signal }
      );
    },
    contextmenu: () => {
      let abortController = new AbortController();

      /**
       * 关闭事件
       * @param {MouseEvent} e
       */
      const onCloseEvent = e => {
        const isThis = this.contains(e.target);

        if (!isThis) {
          abortController.abort();
          this.hide();
        }
      };

      /**
       * 打开事件（contextmenu）
       * @param {MouseEvent} e
       */
      const onContextmenuEvent = e => {
        e.preventDefault();
        abortController?.abort();
        abortController = new AbortController();

        this.toggle();

        window.addEventListener("click", onCloseEvent, {
          signal: abortController.signal,
          once: true,
        });

        if (!this.status) abortController.abort();
      };

      this.addEventListener("contextmenu", onContextmenuEvent, {
        signal: this.#abortController.signal,
      });
    },
  };

  connectedCallback() {
    super.connectedCallback();

    this.assignedStyle(stylesheet);

    if (!this.#states.hasPlacement) this.placement = "bottom";

    this.#triggerEventStrategies[this.trigger]();

    this.addEventListener(
      "ea-dropdown-item-click",
      e => {
        e.stopPropagation();

        if (this["hide-on-click"]) this.hide();
      },
      { signal: this.#abortController.signal }
    );
  }

  $beforeUnmounted() {
    this.#abortController.abort();
  }
}

if (!window.customElements.get("ea-dropdown")) {
  window.customElements.define("ea-dropdown", EaDropdown);
}
