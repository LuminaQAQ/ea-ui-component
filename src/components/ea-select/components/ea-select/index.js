import FormAssociatedBase from "@/core/FormBase";
import "@components/ea-input/index.js";

import stylesheet from "./index.scss?inline";
import EaUtils from "@/utils/Utils";
import { EaSelectVisibleChangeEvent } from "../../events/EaSelectVisibleChangeEvent";
import { EaSelectRemoveTagEvent } from "../../events/EaSelectRemoveTagEvent";
import { EaSelectClearEvent } from "../../events/EaSelectClearEvent";
import { EA_COMPONENT_SIZES } from "@/utils/Variables";

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
  /** @type {HTMLElement} */
  #clearIcon;

  /** @type {AbortController} */
  #abortController = new AbortController();

  #AbortControllerStates = {
    /** @type {AbortController|null} */
    closeAbortController: null,
    /** @type {AbortController|null} */
    tagRemoveAbortController: null,
    /** @type {AbortController|null} */
    inputClearAbortController: null,
    /** @type {AbortController|null} */
    inputFilterAbortController: null,
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
      "collapse-tags",
      "max-collapse-tags",

      "filterable",
    ];
  }

  state = this.properties({
    name: {
      type: String,
      default: "",
      observer: newVal => {
        this.#input.setAttribute("name", newVal);
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
        this.updateContainerClasslist();

        if (newVal) {
          /**
           * 处理清除事件
           */
          const onClearEvent = () => {
            this.value = this.multiple ? [] : "";
            this.dispatchEvent(new EaSelectClearEvent());
          };

          this.#AbortControllerStates.inputClearAbortController =
            new AbortController();

          this.#clearIcon.addEventListener("click", onClearEvent, {
            signal:
              this.#AbortControllerStates.inputClearAbortController.signal,
          });
        }
      },
    },
    size: {
      type: EA_COMPONENT_SIZES,
      default: "",
      observer: newVal => {
        this.#input.setAttribute("size", newVal);
        this.updateContainerClasslist();
      },
    },

    multiple: {
      type: Boolean,
      default: false,
      observer: async newVal => {
        this.#AbortControllerStates.tagRemoveAbortController?.abort();

        await customElements.whenDefined("ea-input");

        const innerWrap =
          this.#input.shadowRoot.querySelector(".ea-input__inner");
        const prefix =
          this.#input.shadowRoot.querySelector(".ea-input__prefix");
        const input = this.#input.shadowRoot.querySelector(
          ".ea-input__original-wrapper"
        );

        if (newVal) {
          prefix.appendChild(input);
        } else {
          innerWrap.insertBefore(input, prefix.nextSibling);
        }

        this.updateContainerClasslist();

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

          if (!this.#states.isTagImport) {
            await import("@components/ea-tag/index.js");
            await customElements.whenDefined("ea-tag");
            this.#states.isTagImport = true;
          }
        }
      },
    },
    "collapse-tags": {
      type: Boolean,
      default: false,
      observer: () => {},
    },
    "max-collapse-tags": {
      type: Number,
      default: 1,
      observer: () => {},
    },

    filterable: {
      type: Boolean,
      default: false,
      observer: async newVal => {
        /**
         * 处理筛选事件
         * @param {Event} e
         */
        const onFilterEvent = e => {
          const { value } = e.detail;
          if (typeof value === "string") {
            this.querySelectorAll("ea-option").forEach(option => {
              option.style.display = option.innerText.includes(value)
                ? "block"
                : "none";
            });
          }
        };

        /**
         * 处理多选标签删除事件
         * @param {Event} e
         */
        const onMultipleDeleteEvent = e => {
          const { key } = e;

          if (key === "Backspace" && this.#input.value === "") {
            this.value = this.value?.slice(0, this.value.length - 1);
          }
        };

        this.#AbortControllerStates.inputFilterAbortController?.abort();

        this.#input.toggleAttribute("readonly", !newVal);

        this.updateContainerClasslist();

        await customElements.whenDefined("ea-input");

        const innerWrap =
          this.#input.shadowRoot.querySelector(".ea-input__inner");
        const prefix =
          this.#input.shadowRoot.querySelector(".ea-input__prefix");
        const input = this.#input.shadowRoot.querySelector(
          ".ea-input__original-wrapper"
        );

        if (newVal) {
          this.#AbortControllerStates.inputFilterAbortController =
            new AbortController();

          this.#input.addEventListener("input", onFilterEvent, {
            signal:
              this.#AbortControllerStates.inputFilterAbortController.signal,
          });
        }

        if (this.multiple && newVal) {
          prefix.appendChild(input);

          this.#input.addEventListener("keydown", onMultipleDeleteEvent, {
            signal:
              this.#AbortControllerStates.inputFilterAbortController.signal,
          });
        } else {
          innerWrap.insertBefore(input, prefix.nextSibling);
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
          if (this.filterable) {
            this.#input.focus();
          } else {
            this.#input.value = newVal?.length > 0 ? " " : "";
          }

          this.#handleSelectValuesRender(newVal || []);
        } else {
          if (this.filterable) {
            this.#input.value = "";
            this.#input.setAttribute(
              "placeholder",
              newVal?.length > 0 ? newVal : this.placeholder
            );

            this.#handleFilteredOptionStyle("");
          } else {
            this.#input.value = this.#findDisplayValue(newVal);
          }
        }

        this.#handleSelectedValueStyle(newVal);

        this.emit("change", {
          detail: { value: newVal },
          bubbles: true,
          composed: true,
        });

        this.updateContainerClasslist();
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const input = this.#input.shadowRoot.querySelector(".ea-input");
    const className = this.computedClasslist(
      "ea-select",
      {
        ["--" + this.size]: this.size,
      },
      {
        focus: this.#states.isFocus,
        disabled: this.disabled,
        clearable: this.clearable && this.value?.length > 0,
        multiple:
          this.multiple && this.value?.length > 0 && Array.isArray(this.value),
        filterable: this.filterable,
        "has-value": this.value?.toString().length > 0,
      }
    );

    input.classList.toggle("is-focus", this.#states.isFocus);

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
          <ea-icon slot="suffix" class="ea-select__clear-icon" part="clear-icon" icon='icon-cancel'></ea-icon>
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
    this.#clearIcon = this.shadowRoot.querySelector(".ea-select__clear-icon");
  }

  /**
   * 获取当前选中值对应的标签
   * @param {string} value
   */
  #findDisplayValue = value => {
    const option = [...this.querySelectorAll("ea-option")].find(
      item => item.value === value
    );

    return option ? option.textContent.trim() : value;
  };

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
        option.toggleAttribute("selected", option.value === selectedValue);
      });
    } else if (Array.isArray(selectedValue)) {
      options.forEach(option => {
        option.toggleAttribute(
          "selected",
          selectedValue.includes(option.value)
        );
      });
    }
  };

  /**
   * 渲染已选项
   * @param {string[] | number[]} selectValue
   */
  #handleSelectValuesRender = selectValue => {
    let template = "";
    /**
     * 渲染tag标签
     * @param {boolean} isClosable
     * @param {string} label
     * @param {string | number | boolean} value
     * @returns
     */
    const tagRenderer = (isClosable, label, value) => {
      return EaUtils.EaElement.h(
        "ea-tag",
        "ea-select__tag",
        {
          closable: isClosable,
          "disable-transitions": true,
          type: "info",
          "data-value": isClosable ? value : null,
        },
        label
      );
    };
    /**
     * 渲染所有tag的模板
     * @param {string[] | number[] | boolean[]} selectValue
     * @returns
     */
    const templateRenderer = selectValue => {
      let template = "";

      selectValue.forEach(v => {
        const option = this.querySelector(`ea-option[value="${v}"]`);
        if (!option) return;

        option.toggleAttribute("selected", true);

        template += tagRenderer(true, option.innerText, option.value);
      });

      return template;
    };

    this.#tagWrap.innerHTML = "";

    if (this["collapse-tags"] && Array.isArray(selectValue)) {
      const max = Math.max(0, Number(this["max-collapse-tags"]) || 1);
      const remaining = Math.max(0, selectValue.length - max);

      if (max > 0) {
        template += templateRenderer(selectValue.slice(0, max));
      }

      if (remaining > 0) {
        template += tagRenderer(false, `+${remaining}`, null);
      }
    } else {
      template += templateRenderer(selectValue);
    }

    this.#tagWrap.innerHTML = template;
  };

  /**
   * 处理过滤选项样式
   * @param {string} filterValue
   */
  #handleFilteredOptionStyle = filterValue => {
    this.querySelectorAll("ea-option").forEach(option => {
      this.filterMethod(option, filterValue);
    });
  };

  /**
   * 下拉框折叠事件
   * @param {Event} e
   */
  #onDropdownVisibleChangeEvent = async e => {
    const target = e.target === this.#input.shadowRoot ? this.#input : e.target;

    if (
      target.classList?.contains("ea-select__clear-icon") ||
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
    this.dispatchEvent(new EaSelectVisibleChangeEvent({ visible: true }));

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
   * 移除选中标签事件
   * @param {Event} e
   */
  #onMultipleTagRemoveEvent = e => {
    const target = e.target;
    const value = target.getAttribute("data-value");

    this.value = this.value.filter(v => v !== value);

    this.dispatchEvent(
      new EaSelectRemoveTagEvent({ tag: target, tagValue: value })
    );
  };

  /**
   * 过滤选项
   * @param {import("../ea-option/index.js").EaOption} option
   * @param {string} query
   */
  filterMethod = (option, query) => {
    option.style.display = option.innerText?.includes(query) ? "block" : "none";
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
    this.dispatchEvent(new EaSelectVisibleChangeEvent({ visible: false }));
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

    this.#input.addEventListener(
      "change",
      e => {
        e.stopImmediatePropagation();

        this.show();
      },
      { signal: this.#abortController.signal }
    );

    this.addEventListener(
      "keydown",
      e => {
        if (e.key === "Enter") {
          this.#input.shadowRoot.dispatchEvent(new CustomEvent("click"));
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
