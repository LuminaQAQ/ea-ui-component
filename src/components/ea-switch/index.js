import FormAssociatedBase from "@/core/FormBase";

import stylesheet from "./index.scss?inline";
import { EA_COMPONENT_SIZES } from "@/utils/Variables";

export class EaSwitch extends FormAssociatedBase {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLInputElement} */
  #originalInput;
  /** @type {HTMLElement} */
  #innerInput;
  /** @type {HTMLElement} */
  #labelRightSlot;
  /** @type {HTMLElement} */
  #labelLeftSlot;
  /** @type {HTMLElement} */
  #label;

  /** @type {AbortController} */
  #abortController;
  /** @type {AbortController} */
  #beforeChangeAbortController;

  static get observedAttributes() {
    return [
      ...super.observedAttributes,

      "name",
      "value",
      "active-value",
      "inactive-value",
      "label",

      "size",
      "inactive-text",
      "inactive-color",
      "active-text",
      "active-color",

      "disabled",
    ];
  }

  state = this.properties({
    label: {
      type: String,
      default: "",
      observer: async newVal => {
        this.#label.textContent = newVal;
      },
    },
    name: {
      type: String,
      default: "",
      observer: newVal => {
        this.#container.setAttribute("for", newVal);
        this.#originalInput.setAttribute("name", newVal);
        this.#originalInput.setAttribute("id", newVal);
      },
    },
    value: {
      type: {
        Number: () =>
          this.hasAttribute("active-value") &&
          (this.getAttrNumber("active-value") ||
            this.getAttrNumber("active-value") === 0 ||
            this.getAttrNumber("inactive-value") ||
            this.getAttrNumber("inactive-value") === 0),
        String: () =>
          this.hasAttribute("active-value") &&
          (this.getAttrString("active-value") ||
            this.getAttrString("active-value") === "" ||
            this.getAttrString("inactive-value") ||
            this.getAttrString("inactive-value") === ""),
        Boolean: () =>
          this.hasAttribute("active-value") ||
          !this.hasAttribute("active-value") ||
          this.hasAttribute("inactive-value") ||
          !this.hasAttribute("inactive-value"),
      },
      default: () => false,
      observer: newVal => {
        const realValue =
          newVal === this["active-value"]
            ? this["active-value"]
            : this["inactive-value"];

        this.#originalInput.value = realValue;
        this.#originalInput.toggleAttribute("checked", realValue);

        this.setValue(realValue);

        this.updateContainerClasslist();
      },
    },
    "active-value": {
      type: {
        Number: () =>
          this.hasAttribute("active-value") &&
          (this.getAttrNumber("active-value") ||
            this.getAttrNumber("active-value") === 0),
        String: () =>
          this.hasAttribute("active-value") &&
          (this.getAttrString("active-value") ||
            this.getAttrString("active-value") === ""),
        Boolean: () =>
          this.hasAttribute("active-value") ||
          !this.hasAttribute("active-value"),
      },
      default: true,
      observer: () => {},
    },
    "inactive-value": {
      type: {
        Number: () =>
          this.hasAttribute("inactive-value") &&
          (this.getAttrNumber("inactive-value") ||
            this.getAttrNumber("inactive-value") === 0),
        String: () =>
          this.hasAttribute("inactive-value") &&
          (this.getAttrString("inactive-value") ||
            this.getAttrString("inactive-value") === ""),
        Boolean: () =>
          this.hasAttribute("inactive-value") ||
          !this.hasAttribute("inactive-value"),
      },
      default: () => false,
      observer: () => {},
    },

    size: {
      type: EA_COMPONENT_SIZES,
      default: "default",
      observer: () => {
        this.updateContainerClasslist();
      },
    },
    "inactive-text": {
      type: String,
      default: "",
      observer: newVal => {
        this.#labelLeftSlot.innerText = newVal;
      },
    },
    "inactive-color": {
      type: String,
      default: "",
      observer: newVal => {
        this.style.setProperty("--ea-switch-inactive-bg-color", newVal);
      },
    },
    "active-text": {
      type: String,
      default: "",
      observer: newVal => {
        this.#labelRightSlot.innerText = newVal;
      },
    },
    "active-color": {
      type: String,
      default: "",
      observer: newVal => {
        this.style.setProperty("--ea-switch-active-bg-color", newVal);
      },
    },

    disabled: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.#originalInput.toggleAttribute("disabled", newVal);
        this.updateContainerClasslist();
      },
    },
  });

  funcState = this.properties({
    beforeChange: {
      props: true,
      type: Function,
      default: null,
      /**
       * @param {() => Promise} cb
       */
      observer: cb => {
        this.#beforeChangeAbortController?.abort();
        this.#beforeChangeAbortController = new AbortController();

        this.#originalInput.addEventListener(
          "click",
          async e => {
            e.preventDefault();
            e.stopImmediatePropagation();

            if (cb) {
              cb()
                .then(() => {
                  this.#originalInput.checked = !this.value;
                  this.#originalInput.dispatchEvent(new CustomEvent("change"));
                })
                .catch(() => {});
            }
          },
          { signal: this.#beforeChangeAbortController.signal }
        );
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist(
      "ea-switch",
      {
        [`--${this.size}`]: this.size,
      },
      {
        checked: this.value === this["active-value"],
        disabled: this.disabled || this.loading,
        loading: this.loading,
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
      <label class="ea-switch-wrapper" part="wrapper">
        <span class="ea-switch__form-label" part="label form-label"></span>
        <section class="ea-switch" part="container">
          <input class="ea-switch__original" type="checkbox" part="original" />
          <span class="ea-switch__label label-left" part="label-left">
            <slot name="inactive"></slot>
          </span>
          <span class="ea-switch__inner" part="switch"></span>
          <span class="ea-switch__label label-right" part="label-right">
            <slot name="active"></slot>
          </span>
        </section>
      </label>
    `;

    this.#label = this.shadowRoot.querySelector(".ea-switch__form-label");
    this.#container = this.shadowRoot.querySelector(".ea-switch");
    this.#originalInput = this.shadowRoot.querySelector(".ea-switch__original");
    this.#innerInput = this.shadowRoot.querySelector(".ea-switch__inner");
    this.#labelLeftSlot = this.shadowRoot.querySelector(
      ".ea-switch__label.label-left > slot[name='inactive']"
    );
    this.#labelRightSlot = this.shadowRoot.querySelector(
      ".ea-switch__label.label-right slot[name='active']"
    );

    this.updateContainerClasslist();
  }

  /**
   * 改变事件
   * @param {Event} e
   */
  #changeEvent = e => {
    e.preventDefault();
    e.stopPropagation();

    const value = e.target.checked
      ? this["active-value"]
      : this["inactive-value"];

    this.setAttribute("value", value);

    this.emit("change", {
      detail: { value },
      bubbles: true,
    });
  };

  connectedCallback() {
    super.connectedCallback();

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    if (!this.name)
      this.setAttribute("name", Math.random().toString(36).substring(2, 15));

    this.setValue(
      this.#originalInput.checked
        ? this["active-value"]
        : this["inactive-value"]
    );

    this.#originalInput.addEventListener("change", this.#changeEvent, {
      signal: this.#abortController.signal,
    });
  }

  $unmounted() {
    this.#abortController?.abort();
    this.#beforeChangeAbortController?.abort();
  }

  /**
   * 获取验证目标元素
   * @returns {HTMLInputElement}
   */
  get validationTarget() {
    return this.#originalInput;
  }

  /**
   * 检查表单字段的有效性
   * @returns {boolean} 如果字段有效返回 true，否则返回 false
   */
  checkValidity() {
    return this.#originalInput.checkValidity();
  }

  /**
   * 报告表单字段的有效性（显示验证提示）
   * @returns {boolean} 如果字段有效返回 true，否则返回 false
   */
  reportValidity() {
    return this.#originalInput.reportValidity();
  }
}

if (!window.customElements.get("ea-switch")) {
  window.customElements.define("ea-switch", EaSwitch);
}
