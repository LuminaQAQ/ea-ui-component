import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaRadioGroup extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLSlotElement} */
  #defaultSlot;

  /** @type {AbortController} */
  #abortController;

  static get observedAttributes() {
    return [...super.observedAttributes, "name", "value", "border", "disabled"];
  }

  state = this.properties({
    name: {
      type: String,
      default: "",
      observer: () => {
        this.#updateGroupName();
      },
    },
    value: {
      type: String,
      default: "",
      observer: newVal => {
        this.#updateCurrentValue(newVal);
      },
    },
    border: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.#updateGroupBorder(newVal);
      },
    },
    disabled: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.#updateGroupDisabled(newVal);
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    return this.computedClasslist("ea-radio-group", {});
  }

  constructor() {
    super();

    this.stylesheet = stylesheet;

    this.$render();
  }

  $render() {
    this.shadowRoot.innerHTML = `
      <div class='ea-radio-group' part='container' role='radiogroup'>
        <slot></slot>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-radio-group");
    this.#defaultSlot = this.#container.querySelector("slot");
  }

  /**
   * 更新 radios name 属性
   */
  #updateGroupName = () => {
    this.querySelectorAll("ea-radio").forEach(radio => {
      radio.setAttribute("name", this.name);
    });
  };

  /**
   * 更新当前选项
   * @param {any} currentValue
   */
  #updateCurrentValue = currentValue => {
    this.querySelectorAll("ea-radio").forEach(radio => {
      const radioValue = radio.getAttribute("value");
      radio.toggleAttribute("checked", currentValue === radioValue);
    });
  };

  /**
   * 更新 radios border 属性
   * @param {Boolean} isBorder
   */
  #updateGroupBorder = isBorder => {
    this.querySelectorAll("ea-radio").forEach(radio => {
      radio.toggleAttribute("border", isBorder);
    });
  };

  /**
   * 更新 radios disabled 属性
   * @param {Boolean} isDisabled
   */
  #updateGroupDisabled = isDisabled => {
    this.querySelectorAll("ea-radio").forEach(radio => {
      radio.toggleAttribute("disabled", isDisabled);
    });
  };

  connectedCallback() {
    super.connectedCallback();

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.addEventListener(
      "change",
      e => {
        this.value = e.detail.value;
      },
      { signal: this.#abortController.signal }
    );

    this.#defaultSlot.addEventListener(
      "slotchange",
      () => {
        this.#updateCurrentValue(this.value);

        if (this.name) this.#updateGroupName();
        if (this.border) this.#updateGroupBorder(this.border);
        if (this.disabled) this.#updateGroupDisabled(this.disabled);
      },
      { signal: this.#abortController.signal }
    );
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }
}

if (!window.customElements.get("ea-radio-group")) {
  window.customElements.define("ea-radio-group", EaRadioGroup);
}
