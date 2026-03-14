import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";
import EaUtils from "@/utils/Utils";
import { EaOptionClickEvent } from "../../events/EaOptionClickEvent";

export class EaOption extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {AbortController} */
  #abortController = new AbortController();

  static get observedAttributes() {
    return [...super.observedAttributes, "value", "selected", "disabled"];
  }

  state = this.properties({
    value: {
      type: {
        Number: () => this.getAttrNumber("value", null),
        Boolean: () =>
          EaUtils.Boolean.isBoolean(this.getAttrBoolean("value", null)),
        String: () => this.getAttrString("value", "") || true,
      },
      default: null,
      observer: () => {},
    },
    selected: {
      type: Boolean,
      default: false,
      observer: () => {
        this.updateContainerClasslist();
      },
    },
    disabled: {
      type: Boolean,
      default: false,
      observer: () => {
        this.setAttribute("tabindex", this.disabled ? "-1" : "0");
        this.updateContainerClasslist();
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist(
      "ea-option",
      {},
      {
        selected: this.selected,
        disabled: this.disabled,
      }
    );

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
      <div class='ea-option' part='container'>
        <slot></slot>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-option");
  }

  /**
   * 选项选择事件
   * @param {MouseEvent | KeyboardEvent} e
   */
  #onOptionSelectedEvent = e => {
    e.preventDefault();
    e.stopImmediatePropagation();
    if (this.disabled) return;

    this.dispatchEvent(
      new EaOptionClickEvent({
        value: this.value,
        target: e.target,
      })
    );
  };

  connectedCallback() {
    super.connectedCallback();

    this.removeAttribute("tabindex");

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    /**
     * 选项选择事件
     * @param {KeyboardEvent} e
     */
    const onEnterEvent = e => {
      if (e.key === "Enter") {
        this.#onOptionSelectedEvent(e);
      }
    };

    this.addEventListener("click", this.#onOptionSelectedEvent, {
      signal: this.#abortController.signal,
    });

    this.addEventListener("keydown", onEnterEvent, {
      signal: this.#abortController.signal,
    });
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }
}

if (!window.customElements.get("ea-option")) {
  window.customElements.define("ea-option", EaOption);
}
