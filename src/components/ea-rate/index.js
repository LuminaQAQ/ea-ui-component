import FormAssociatedBase from "@/core/FormBase";

import stylesheet from "./index.scss?inline";
import { EA_COMPONENT_SIZES } from "@/utils/Variables";

export class EaRate extends FormAssociatedBase {
  /** @type {HTMLElement} */
  #container;

  /** @type {AbortController} */
  #abortController = new AbortController();
  /** @type {AbortController} */
  #hoverAbortController = new AbortController();

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "label",
      "value",
      "max",
      "size",
      "readonly",
      "disabled",
    ];
  }

  state = this.properties({
    label: {
      type: String,
      default: "",
      observer: () => {},
    },
    value: {
      type: Number,
      default: 0,
      observer: newVal => {
        const displayValue = Math.max(newVal - 1, 0);

        this.setValue(displayValue);
        this.#setRateStatus(displayValue);
      },
    },
    max: {
      type: Number,
      default: 5,
      observer: () => {},
    },
    size: {
      type: EA_COMPONENT_SIZES,
      default: "",
      observer: () => {
        this.updateContainerClasslist();
      },
    },

    readonly: {
      type: Boolean,
      default: false,
      observer: () => {},
    },
    disabled: {
      type: Boolean,
      default: false,
      observer: () => {
        this.updateContainerClasslist();
      },
    },
  });

  funcStates = this.properties({
    getSymbol: {
      props: true,
      type: Function,
      rawFunction: true,
      /**
       * 获取图标
       * @param {string} [value]
       * @param {boolean} [isSelected]
       * @returns {string}
       */
      default: () => () => `<ea-icon icon="icon-star" part="icon"></ea-icon>`,
      /** @param {Function} cb */
      observer: cb => {
        if (!cb || typeof cb !== "function") return;

        this.#container.innerHTML = this.#renderRateEl(cb);
        this.#setRateStatus(this.value - 1);
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist(
      "ea-rate",
      {
        ["--" + this.size]: this.size,
      },
      {
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
      <div class='ea-rate' part='container'></div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-rate");

    this.#renderRateEl(this.getSymbol);

    this.updateContainerClasslist();
  }

  /**
   * 渲染 rate 元素
   * @param {(value: Number, isSelected: Boolean) => String} renderer
   * @param {Number} activeValue
   * @return {String}
   */
  #renderRateEl = (renderer, activeValue = this.value, length = this.max) => {
    if (!renderer) return;

    const tpl = Array.from({ length })
      .map(
        (value, index) => `
          <span class='ea-rate__symbol' part='symbol-wrap'>
              ${renderer(index, activeValue)}
          </span>`
      )
      .join("");

    this.#container.innerHTML = tpl;

    return tpl;
  };

  /**
   * 设置 rate 元素选中状态
   * @param {Number} index
   */
  #setRateStatus = (index = this.value - 1) => {
    const children = [...this.#container.children];

    children.forEach((el, i) => {
      el.classList.toggle("is-selected", i <= index);
    });
  };

  /**
   * 取消 rate 元素选中状态
   * @param {Number} [currentValue]
   */
  #unsetRateStatus = (currentValue = this.value - 1) => {
    /** @type {HTMLElement[]} */
    const children = [...this.#container.children];

    children.forEach((el, i) => {
      el.classList.toggle("is-selected", i <= currentValue);
    });
  };

  /**
   * 触发 hover 事件
   * @param {Number} [value]
   * @param {HTMLElement} [target]
   */
  #emitHoverEvent = (value = this.value, target = null) => {
    this.emit("hover", {
      detail: {
        value,
        target,
      },
    });
  };

  /**
   * 当鼠标移入父元素时，设置子元素的选中状态
   */
  #onMousemove = () => {
    if (this.readonly || this.disabled) return;

    this.#hoverAbortController?.abort();
    this.#hoverAbortController = new AbortController();

    const onMousemove = e => {
      const target = e.target.closest(".ea-rate__symbol");
      const children = [...this.#container.children];
      const index = children.indexOf(target);

      this.#setRateStatus(index);

      if (target) this.#emitHoverEvent(index, target);
    };

    const onMouseout = () => {
      const value = this.hasAttribute("value") ? this.value - 1 : null;
      const target = this.children[value];

      this.#unsetRateStatus();

      this.#emitHoverEvent(value, target);
    };

    this.#container.addEventListener("mousemove", onMousemove, {
      signal: this.#hoverAbortController.signal,
    });
    this.#container.addEventListener("mouseout", onMouseout, {
      signal: this.#hoverAbortController.signal,
    });
  };

  /**
   * 通过监听父元素的点击事件，设置子元素的选中状态
   */
  #onClick = e => {
    if (this.readonly || this.disabled) return;

    const target = e.target.closest(".ea-rate__symbol");
    const children = [...this.#container.children];
    const index = children.indexOf(target);
    const displayValue = index + 1;

    if (this.value === displayValue) {
      this.value = 0;
      this.#unsetRateStatus(0);
    } else {
      this.value = displayValue;
    }

    this.emit("change", { detail: { value: displayValue } });
  };

  connectedCallback() {
    super.connectedCallback();

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.#container.addEventListener("mouseover", this.#onMousemove, {
      signal: this.#abortController.signal,
    });

    this.#container.addEventListener("click", this.#onClick, {
      signal: this.#abortController.signal,
    });
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
    this.#hoverAbortController?.abort();
  }
}

if (!window.customElements.get("ea-rate")) {
  window.customElements.define("ea-rate", EaRate);
}
