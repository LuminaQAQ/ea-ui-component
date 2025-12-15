import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaCheckboxGroup extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLSlotElement} */
  #defaultSlot;

  /** @type {AbortController} */
  #abortController = new AbortController();

  static get observedAttributes() {
    return [...super.observedAttributes, "name", "value", "min", "max", "size"];
  }

  state = this.properties({
    name: {
      type: String,
      default: "",
      observer: newVal => {
        this.#updateCheckboxChildrenName();
      },
    },
    value: {
      props: true,
      type: Array,
      default: [],
      observer: newVal => {
        this.#updateCheckboxChildrenValue();
        this.#updateLimitStatus();
      },
    },
    min: {
      type: Number,
      default: 0,
      observer: newVal => {
        this.#updateLimitStatus();
      },
    },
    max: {
      type: Number,
      default: Infinity,
      observer: newVal => {
        this.#updateLimitStatus();
      },
    },
    size: {
      type: ["small", "default", "large"],
      default: "",
      observer: newVal => {
        this.#updateChildrenSize();
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist("ea-checkbox-group", {
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
      <div class='ea-checkbox-group' part='container'>
        <slot></slot>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-checkbox-group");
    this.#defaultSlot = this.shadowRoot.querySelector("slot");
  }

  /**
   * 更新子组件的 name 属性，因为没有限制 name 必填
   */
  #updateCheckboxChildrenName = () => {
    this.querySelectorAll("ea-checkbox").forEach(checkbox => {
      checkbox.setAttribute("name", this.name);
    });
  };

  /**
   * 更新子组件的初始勾选状态
   */
  #updateCheckboxChildrenValue = () => {
    this.querySelectorAll("ea-checkbox").forEach(checkbox => {
      const isChecked = this.value.includes(checkbox.getAttribute("value"));
      checkbox.toggleAttribute("checked", isChecked);
    });
  };

  /**
   * 更新子组件
   * @param {Boolean} isChecked
   * @param {any} updateValue
   */
  #updateGroupValue = (isChecked, updateValue) => {
    if (isChecked) {
      const hasValue = this.value.some(
        checkbox => checkbox.value === updateValue
      );

      if (!hasValue) this.value.push(updateValue);
    } else {
      this.value = this.value.filter(item => item !== updateValue);
    }
  };

  /**
   * 更新子组件在带有 Min 下的禁用状态
   */
  #updateMinValueStatus = () => {
    this.querySelectorAll("ea-checkbox").forEach(item => {
      const isChecked = item.hasAttribute("checked");
      item.toggleAttribute("limit-disabled", isChecked);
    });
  };

  /**
   * 更新子组件在带有 Max 下的禁用状态
   */
  #updateMaxValueStatus = () => {
    this.querySelectorAll("ea-checkbox").forEach(item => {
      const isChecked = item.hasAttribute("checked");
      item.toggleAttribute("limit-disabled", !isChecked);
    });
  };

  /**
   * 还原子组件的禁用状态
   */
  #restoreLimitValueStatus = () => {
    this.querySelectorAll("ea-checkbox").forEach(item => {
      item.toggleAttribute("limit-disabled", false);
    });
  };

  /**
   * 更新子组件的禁用状态
   */
  #updateLimitStatus = () => {
    if (this.value.length <= this.min) {
      this.#updateMinValueStatus();
    } else if (this.value.length >= this.max) {
      this.#updateMaxValueStatus();
    } else if (this.max < Infinity && this.min === 0) {
      this.#restoreLimitValueStatus();
    } else {
      this.#restoreLimitValueStatus();
    }
  };

  /**
   * 更新子组件的尺寸
   */
  #updateChildrenSize = () => {
    this.querySelectorAll("ea-checkbox").forEach(checkbox => {
      checkbox.setAttribute("size", this.size);
    });
  };

  connectedCallback() {
    super.connectedCallback();
    this.#abortController?.abort();
    this.#abortController = new AbortController();

    if (!this.name) this.name = Math.random().toString(36).substring(2, 15);

    const slotChangeEvent = () => {
      this.#updateCheckboxChildrenName();
      this.#updateCheckboxChildrenValue();
      this.#updateLimitStatus();
    };

    const changeEvent = e => {
      const { checked, value } = e.detail;

      this.#updateGroupValue(checked, value);
      this.#updateLimitStatus();
    };

    this.#defaultSlot.addEventListener("slotchange", slotChangeEvent, {
      signal: this.#abortController.signal,
    });

    this.addEventListener("change", changeEvent, {
      signal: this.#abortController.signal,
    });
  }

  $beforeUnmounted() {
    this.#abortController.abort();
  }
}

if (!window.customElements.get("ea-checkbox-group")) {
  window.customElements.define("ea-checkbox-group", EaCheckboxGroup);
}
