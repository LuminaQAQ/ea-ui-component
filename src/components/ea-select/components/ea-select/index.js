import FormAssociatedBase from "@/core/FormBase";
import "@components/ea-input/index.js";

import stylesheet from "./index.scss?inline";
import EaUtils from "@/utils/Utils";

export class EaSelect extends FormAssociatedBase {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #input;
  /** @type {HTMLElement} */
  #dropdown;
  /** @type {HTMLElement} */
  #dropdownIcon;

  /** @type {AbortController} */
  #abortController = new AbortController();

  #AbortControllerStates = {
    /** @type {AbortController|null} */
    closeAbortController: null,
  };

  #states = {
    isFocus: false,
  };

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "name",
      "value",
      "placeholder",
      "disabled",
      "clearable",
      "size",
    ];
  }

  state = this.properties({
    name: {
      type: String,
      default: "",
      observer: newVal => {
        this.setAttribute("name", newVal);
      },
    },
    placeholder: {
      type: String,
      default: "",
      observer: async newVal => {
        await customElements.whenDefined("ea-input");

        this.#input.placeholder = newVal;
      },
    },
    disabled: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.#input.toggleAttribute("disabled", newVal);
        this.updateContainerClasslist();
      },
    },
    clearable: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.#input.toggleAttribute("clearable", newVal);
        this.updateContainerClasslist();
      },
    },
    size: {
      type: String,
      default: "",
      observer: newVal => {
        this.#input.setAttribute("size", newVal);
      },
    },
    multiple: {
      type: Boolean,
      default: false,
      observer: newVal => {},
    },
  });

  propStates = this.properties({
    value: {
      props: true,
      type: {
        String: () => typeof this.props?.value === "string",
        Number: () => typeof this.props?.value === "number",
        Boolean: () => typeof this.props?.value === "boolean",
        Array: () => this.multiple && Array.isArray(this.props?.value),
      },
      default: "",
      observer: newVal => {
        this.setValue(newVal);
        this.#input.value = newVal;
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist(
      "ea-select",
      {
        // ['--' + this.type]: this.type,
      },
      {
        focus: this.#states.isFocus,
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
      <div class='ea-select' part='container' tabindex='-1'>
        <ea-input class="ea-select__input" part="input" readonly>
          <span class="ea-select__icon-wrap" part="" slot="suffix">
            <ea-icon class="ea-select__dropdown-icon" part="dropdown-icon" icon='icon-angle-down'></ea-icon>
          </span>
        </ea-input>
        <section class="ea-select__dropdown" part="dropdown">
          <slot></slot>
        </section>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-select");
    this.#input = this.shadowRoot.querySelector(".ea-select__input");
    this.#dropdown = this.shadowRoot.querySelector(".ea-select__dropdown");
    this.#dropdownIcon = this.shadowRoot.querySelector(
      ".ea-select__dropdown-icon"
    );
  }

  /**
   * 下拉框折叠事件
   * @param {Event} e
   */
  #onDropdownVisibleChangeEvent = async e => {
    if (e.target.tagName !== "INPUT") return;

    this.#AbortControllerStates.closeAbortController?.abort();
    this.#AbortControllerStates.closeAbortController = new AbortController();

    /**
     * 选项点击事件
     * @param {Event} e
     */
    const onOptionClick = e => {
      const target = e.target.closest("ea-option");
      if (!target) return;
      if (target.disabled) return;

      if (!this.multiple) {
        this.hide();
      }

      this.value = target.value;
      this.#input.value = target.label || target.value;

      this.querySelectorAll("ea-option").forEach(option => {
        option.toggleAttribute("active", option === target);
      });
    };

    /**
     * 下拉框关闭事件
     * @param {Event} e
     */
    const onSelectClose = e => {
      if (this.contains(e.target)) return;

      this.hide();

      this.#AbortControllerStates.closeAbortController?.abort();
    };

    /**
     * 键盘事件
     * @param {Event} e
     */
    const onKeydown = e => {
      const arrows = new Set(["Escape", "ArrowUp", "ArrowDown"]);

      if (!arrows.has(e.key)) return;

      e.preventDefault();

      if (e.key === "Escape") {
        this.hide();
        this.#AbortControllerStates.closeAbortController?.abort();
      }
      // else if (e.key === "ArrowUp") {
      //   console.log(-1);
      // } else if (e.key === "ArrowDown") {
      //   console.log(1);
      // }
    };

    this.#states.isFocus = true;
    this.updateContainerClasslist();

    await EaUtils.sleep(100);

    this.addEventListener("ea-option-click", onOptionClick, {
      signal: this.#AbortControllerStates.closeAbortController.signal,
    });

    document.addEventListener("click", onSelectClose, {
      signal: this.#AbortControllerStates.closeAbortController.signal,
    });

    this.addEventListener("keydown", onKeydown, {
      signal: this.#AbortControllerStates.closeAbortController.signal,
    });
  };

  /**
   * 显示下拉框
   */
  show = () => {
    this.#input.click();
  };

  /**
   * 隐藏下拉框
   */
  hide = () => {
    this.#states.isFocus = false;
    this.updateContainerClasslist();
  };

  async connectedCallback() {
    super.connectedCallback();

    await customElements.whenDefined("ea-input");
    await customElements.whenDefined("ea-option");

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    if (!this.name) this.name = crypto.randomUUID();

    this.#input.shadowRoot.addEventListener(
      "click",
      this.#onDropdownVisibleChangeEvent,
      {
        signal: this.#abortController.signal,
      }
    );

    this.#input.addEventListener("change", () => {
      this.show();
    });

    this.addEventListener(
      "keydown",
      e => {
        if (e.key === "Enter") {
          this.click();
        }
      },
      { signal: this.#abortController.signal }
    );
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }
}

if (!window.customElements.get("ea-select")) {
  window.customElements.define("ea-select", EaSelect);
}
