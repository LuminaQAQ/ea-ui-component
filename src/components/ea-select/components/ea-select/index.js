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
  #tagWrap;
  /** @type {HTMLElement} */
  #dropdown;
  /** @type {HTMLElement} */
  #dropdownIcon;

  /** @type {AbortController} */
  #abortController = new AbortController();

  #AbortControllerStates = {
    /** @type {AbortController|null} */
    closeAbortController: null,
    /** @type {AbortController|null} */
    tagRemoveAbortController: null,
    /** @type {AbortController|null} */
    inputClearAbortController: null,
  };

  #states = {
    isFocus: false,
    isTagImport: false,
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

      "multiple",
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
        this.#AbortControllerStates.inputClearAbortController?.abort();
        this.#input.toggleAttribute("clearable", newVal);
        this.updateContainerClasslist();

        if (newVal) {
          this.#AbortControllerStates.inputClearAbortController =
            new AbortController();

          this.#input.addEventListener(
            "ea-clear",
            () => {
              this.value = this.multiple ? [] : "";
            },
            {
              signal:
                this.#AbortControllerStates.inputClearAbortController.signal,
            }
          );
        }
      },
    },
    size: {
      type: String,
      default: "",
      observer: newVal => {
        this.#input.setAttribute("size", newVal);
        this.updateContainerClasslist();
      },
    },
    multiple: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.#AbortControllerStates.tagRemoveAbortController?.abort();

        if (newVal) {
          this.#AbortControllerStates.tagRemoveAbortController =
            new AbortController();

          this.#tagWrap.addEventListener(
            "ea-remove",
            this.#onMultipleTagRemoveEvent,
            {
              signal:
                this.#AbortControllerStates.tagRemoveAbortController.signal,
            }
          );
        }
      },
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
      observer: async newVal => {
        this.setValue(newVal);

        if (this.multiple) {
          if (!this.#states.isTagImport) {
            await import("@components/ea-tag/index.js");
            await customElements.whenDefined("ea-tag");
            this.#states.isTagImport = true;
          }

          this.#input.value = newVal?.length > 0 ? " " : "";

          this.#handleSelectValuesRender(newVal);
        } else {
          this.#input.value = newVal;
        }

        this.#handleSelectedValueStyle(newVal);

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
      "ea-select",
      {
        ["--" + this.size]: this.size,
      },
      {
        focus: this.#states.isFocus,
        disabled: this.disabled,
        multiple:
          this.multiple && this.value?.length > 0 && Array.isArray(this.value),
      }
    );

    this.#input.shadowRoot
      .querySelector(".ea-input")
      .classList.toggle("is-focus", this.#states.isFocus);

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
          <section slot="prefix" class="ea-select__tag-wrap" part="tag-wrap"></section>
          <ea-icon slot="suffix" class="ea-select__dropdown-icon" part="dropdown-icon" icon='icon-angle-down'></ea-icon>
        </ea-input>
        <section class="ea-select__dropdown" part="dropdown">
          <slot></slot>
        </section>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-select");
    this.#input = this.shadowRoot.querySelector(".ea-select__input");
    this.#tagWrap = this.shadowRoot.querySelector(".ea-select__tag-wrap");
    this.#dropdown = this.shadowRoot.querySelector(".ea-select__dropdown");
    this.#dropdownIcon = this.shadowRoot.querySelector(
      ".ea-select__dropdown-icon"
    );
  }

  /**
   * 设置已选项样式
   * @param {string | number | boolean | string[] | number[] | boolean[]} selectedValue
   */
  #handleSelectedValueStyle = selectedValue => {
    const options = this.querySelectorAll("ea-option");

    if (
      typeof selectedValue === "string" ||
      typeof selectedValue === "number" ||
      typeof selectedValue === "boolean"
    ) {
      options.forEach(option => {
        option.toggleAttribute("seleted", option.value === selectedValue);
      });
    } else if (Array.isArray(selectedValue)) {
      options.forEach(option => {
        option.toggleAttribute("seleted", selectedValue.includes(option.value));
      });
    }
  };

  /**
   * 渲染已选项
   * @param {string[] | number[]} selectValue
   */
  #handleSelectValuesRender = selectValue => {
    const docFrag = document.createDocumentFragment();

    this.#tagWrap.innerHTML = "";

    selectValue.forEach(v => {
      const option = this.querySelector(`ea-option[value="${v}"]`);

      if (!option) return;

      option.toggleAttribute("selected", true);

      const tag = document.createElement("ea-tag");
      tag.toggleAttribute("closable", true);
      tag.toggleAttribute("disable-transitions", true);
      tag.setAttribute("type", "info");
      tag.setAttribute("shape", "circle");
      tag.setAttribute("data-value", v);

      tag.innerText = option.label;

      docFrag.appendChild(tag);
    });

    this.#tagWrap.appendChild(docFrag);
  };

  /**
   * 下拉框折叠事件
   * @param {Event} e
   */
  #onDropdownVisibleChangeEvent = async e => {
    const target = e.target === this.#input.shadowRoot ? this.#input : e.target;

    if (
      target.classList?.contains("ea-input__clear-icon") ||
      target.closest("ea-tag")
    )
      return;

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
        this.value = target.value;
        this.#input.value = target.label || target.value;

        this.hide();
      } else {
        if (!Array.isArray(this.value)) this.value = [];

        if (this.value.includes(target.value)) {
          this.value = this.value.filter(v => v !== target.value);
        } else {
          this.value = [...this.value, target.value];
        }
      }
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

  #onMultipleTagRemoveEvent = e => {
    const target = e.target;
    const value = target.getAttribute("data-value");

    this.value = this.value.filter(v => v !== value);
  };

  /**
   * 显示下拉框
   */
  show = () => {
    this.#input.shadowRoot.dispatchEvent(new CustomEvent("click"));
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

    for (const key in this.#AbortControllerStates) {
      this.#AbortControllerStates[key]?.abort();
    }
  }
}

if (!window.customElements.get("ea-select")) {
  window.customElements.define("ea-select", EaSelect);
}
