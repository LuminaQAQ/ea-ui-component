import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaRadioGroup extends Base {
  /** @type {HTMLElement} */
  #container;

  static get observedAttributes() {
    return [...super.observedAttributes, "name", "value", "border", "disabled"];
  }

  state = this.properties({
    name: {
      type: String,
      default: "",
      observer: (newVal) => {
        this.querySelectorAll("ea-radio").forEach((radio) => {
          radio.setAttribute("name", newVal);
        });
      },
    },
    value: {
      type: String,
      default: "",
      observer: (newVal) => {},
    },
    border: {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        this.querySelectorAll("ea-radio").forEach((radio) => {
          radio.setAttribute("border", newVal);
        });
      },
    },
    disabled: {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        this.querySelectorAll("ea-radio").forEach((radio) => {
          radio.setAttribute("disabled", newVal);
        });
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    return this.computedClasslist("ea-radio-group", {
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
            <div class='ea-radio-group' part='container' role='radiogroup'>
                <slot></slot>
            </div>
        `;

    this.#container = this.shadowRoot.querySelector(".ea-radio-group");
  }

  #handleInitialValue = () => {
    const radios = this.querySelectorAll("ea-radio");
    if (this.value) {
      radios.forEach((radio) =>
        radio.toggleAttribute("checked", this.value === radio.value)
      );
    } else {
      const checkedRadio = Array.from(radios).find((radio) => radio.checked);
      this.value = checkedRadio ? checkedRadio.value : "";
    }
  };

  connectedCallback() {
    super.connectedCallback();

    this.name = this.name;
    this.value = this.value;
    this.disabled = this.disabled;
    this.border = this.border;

    this.#handleInitialValue();

    this.addEventListener("change", (e) => {
      e.preventDefault();
      e.stopPropagation();

      this.value = e.detail.value;
    });
  }
}

if (!window.customElements.get("ea-radio-group")) {
  window.customElements.define("ea-radio-group", EaRadioGroup);
}
