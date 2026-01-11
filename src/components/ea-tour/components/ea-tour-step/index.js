import Base from "@components/Base.js";
import { EaButton } from "@/components/ea-button";

import stylesheet from "./index.scss?inline";
import EaUtils from "@/utils/Utils";
import { EaTourCloseEvent } from "../../events/EaTourCloseEvent";

export class EaTourStep extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #title;
  /** @type {HTMLSlotElement} */
  #indicatorSlot;
  /** @type {EaButton} */
  #previousBtn;
  /** @type {EaButton} */
  #nextBtn;
  /** @type {EaButton} */
  #finishBtn;
  /** @type {EaButton} */
  #closeIcon;

  /** @type {AbortController} */
  #abortController;

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "title",
      "target",
      "type",
      "placement",
    ];
  }

  get #hostContentTour() {
    try {
      return this.closest("ea-tour");
    } catch {
      return null;
    }
  }

  state = this.properties({
    title: {
      type: String,
      default: "",
      observer: newVal => {
        this.#title.textContent = newVal;
      },
    },
    target: {
      type: String,
      default: "",
      observer: async newVal => {
        if (newVal === "") return;

        await customElements.whenDefined("ea-tour-step");

        if (!document.querySelector(newVal))
          return console.warn(
            `[EaTour] target ${newVal} not a valid element selector.`,
            this
          );
      },
    },
    type: {
      type: ["default", "primary"],
      default: "default",
      observer: newVal => {
        this.#handleBtnTypeChange(newVal);

        this.updateContainerClasslist();
      },
    },
    placement: {
      type: [
        "top",
        "top-start",
        "top-end",
        "bottom",
        "bottom-start",
        "bottom-end",
        "left",
        "left-start",
        "left-end",
        "right",
        "right-start",
        "right-end",
      ],
      default: "bottom",
      observer: newVal => {},
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist("ea-tour-step", {
      ["--" + this.type]: this.type,
    });

    this.#container.className = className;

    return className;
  }

  constructor() {
    super();

    this.stylesheet = stylesheet;

    this.$render();
  }

  /**
   * 渲染指示器节点的字符串
   * @param {HTMLElement[]} tourItems
   * @returns {string}
   */
  #renderIndicators(tourItems) {
    return Array.from(tourItems, item =>
      EaUtils.EaElement.h("span", null, {
        class: ["ea-tour-step__indicator", item === this ? "is-active" : ""],
        part: "indicator",
      })
    ).join("");
  }

  /**
   * 按钮类型切换
   * @param {'default' | 'primary'} type
   */
  #handleBtnTypeChange = type => {
    const btns = [this.#previousBtn, this.#nextBtn, this.#finishBtn];

    btns.forEach(btn => {
      if (type === "primary") {
        btn.setAttribute("type", "primary");
      } else {
        btn.removeAttribute("type");
      }
    });
  };

  $render() {
    this.shadowRoot.innerHTML = `
      <div class='ea-tour-step' part='container'>
        <header class='ea-tour-step__header' part='header'>
          <slot name='header'></slot>
          <ea-icon class='ea-tour-step__close-icon' part='close-icon' icon="icon-cancel"></ea-icon>
        </header>
        <main class='ea-tour-step__content' part='content'>
          <slot></slot>
        </main>
        <footer class='ea-tour-step__footer' part='footer'>
          <div class='ea-tour-step__indicator-group' part='indicator-group'>
            <slot name='indicator'></slot>
          </div>
          <div class='ea-tour-step__switch-group' part='switch-group'>
            <slot name='footer'>
              <ea-button class="ea-tour-step__btn ea-tour-step__previous" part="previous">Previous</ea-button>
              <ea-button class="ea-tour-step__btn ea-tour-step__next" part="next">Next</ea-button>
              <ea-button class="ea-tour-step__btn ea-tour-step__finish" part="finish">Finish</ea-button>
            </slot>
          </div>
        </footer>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-tour-step");
    this.#title = this.shadowRoot.querySelector(".ea-tour-step__header slot");

    this.#indicatorSlot = this.shadowRoot.querySelector(
      "slot[name='indicator']"
    );

    this.#nextBtn = this.shadowRoot.querySelector(".ea-tour-step__next");
    this.#previousBtn = this.shadowRoot.querySelector(
      ".ea-tour-step__previous"
    );
    this.#finishBtn = this.shadowRoot.querySelector(".ea-tour-step__finish");
    this.#closeIcon = this.shadowRoot.querySelector(
      ".ea-tour-step__close-icon"
    );
  }

  async connectedCallback() {
    super.connectedCallback();

    await customElements.whenDefined("ea-tour");

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.#indicatorSlot.innerHTML = this.#renderIndicators(
      this.#hostContentTour.querySelectorAll("ea-tour-step")
    );

    this.#closeIcon.addEventListener(
      "click",
      () => {
        const index = [...this.#hostContentTour.children].findIndex(
          item => item === this
        );
        this.dispatchEvent(
          new EaTourCloseEvent({
            current: index,
          })
        );
      },
      { signal: this.#abortController.signal }
    );

    this.#nextBtn.addEventListener(
      "click",
      () => {
        this.emit("next", { bubbles: true });
      },
      { signal: this.#abortController.signal }
    );
    this.#previousBtn.addEventListener(
      "click",
      () => {
        this.emit("previous", { bubbles: true });
      },
      { signal: this.#abortController.signal }
    );
    this.#finishBtn.addEventListener(
      "click",
      () => {
        this.emit("finish", { bubbles: true });
      },
      { signal: this.#abortController.signal }
    );
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }
}

if (!window.customElements.get("ea-tour-step")) {
  window.customElements.define("ea-tour-step", EaTourStep);
}
