import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";
import EaUtils from "@/utils/Utils";

export class EaSegmented extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {AbortController} */
  #abortController;

  static get observedAttributes() {
    return [...super.observedAttributes, "value", "size", "direction"];
  }

  state = this.properties({
    options: {
      props: true,
      type: Array,
      default: [],
      observer: (newVal) => {
        if (!this.getAttrString("name"))
          console.warn(`[${this.tagName}] name attribute is required.`, this);

        this.#renderOptions(newVal);
      },
    },
    value: {
      type: String,
      default: "",
      observer: (newVal) => {
        this.#updateIndicatorPosition(newVal);
      },
    },
    size: {
      type: ["large", "default", "small"],
      default: "",
      observer: (newVal) => {
        this.updateContainerClasslist();
        this.#updateIndicatorPosition(this.value);
      },
    },
    direction: {
      type: ["horizontal", "vertical"],
      default: "",
      observer: (newVal) => {
        this.updateContainerClasslist();
        this.#updateIndicatorPosition(this.value);
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist(
      "ea-segmented",
      {
        ["--" + this.size]: this.size,
      },
      { [this.direction]: this.direction }
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
      <div class='ea-segmented' part='container'></div>
      <slot id="defaultSlot"></slot>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-segmented");
    this.updateContainerClasslist();
  }

  /**
   * 渲染选项
   * @param {Array<{label: string, value: string, disabled: Boolean}> | Array<String>} options
   */
  #renderOptions(options) {
    this.#abortController?.abort();
    this.#abortController = new AbortController();

    const optionsTemplate = options
      .map((item) =>
        EaUtils.EaElement.h(
          "label",
          null,
          {
            class: [
              "ea-segmented__item",
              item.disabled || this.disabled ? "is-disabled" : "",
              item.checked || this.value === (item.value || item)
                ? "is-checked"
                : "",
            ],
            part: "item",
            for: item.label || item.value || item,
          },
          [
            EaUtils.EaElement.h(
              "input",
              "ea-segmented__original",
              {
                part: "input",
                type: "radio",
                name: this.name || this.getAttrString("name"),
                id: item.label || item.value || item,
                value: item.value || item,
                checked: item.checked,
                disabled: item.disabled || this.disabled,
              },
              ""
            ),
            EaUtils.EaElement.h(
              "span",
              "ea-segmented__label",
              {
                part: "label",
                "aria-label": item.label || item.value || item,
              },
              item.label || item.value || item
            ),
          ]
        )
      )
      .join("");

    const indicatorTemplate = EaUtils.EaElement.h(
      "span",
      "ea-segmented__indicator",
      null,
      null
    );

    this.#container.innerHTML = [optionsTemplate, indicatorTemplate].join("");
    this.#updateIndicatorPosition(this.value);

    this.#container.addEventListener("change", this.#onChange, {
      signal: this.#abortController.signal,
    });
  }

  /**
   * @param {Event} e
   */
  #onChange = (e) => {
    const value = e.target.value;

    this.value = value;

    this.emit("change", { detail: { value } });
  };

  /**
   *
   * @param {string} value
   */
  #updateIndicatorPosition = (value) => {
    if (
      this.options?.includes(value) ||
      this.options.some((item) => item.value === value)
    ) {
      /** @type {HTMLLabelElement[]} */
      const children = [
        ...this.#container.querySelectorAll(".ea-segmented__item"),
      ];
      children.forEach((child) => {
        const input = child.querySelector(".ea-segmented__original");
        child.classList.toggle("is-checked", input?.value === value);

        if (input?.value === value) {
          const rect = child.getBoundingClientRect();
          this.style.setProperty(
            "--ea-segmented-indicator-width",
            `${rect.width}px`
          );
          this.style.setProperty(
            "--ea-segmented-indicator-height",
            `${rect.height}px`
          );
          this.style.setProperty(
            "--ea-segmented-indicator-position-x",
            `${child.offsetLeft}px`
          );
          this.style.setProperty(
            "--ea-segmented-indicator-position-y",
            `${child.offsetTop}px`
          );
        }
      });
    }
  };

  connectedCallback() {
    super.connectedCallback();
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }
}

if (!window.customElements.get("ea-segmented")) {
  window.customElements.define("ea-segmented", EaSegmented);
}
