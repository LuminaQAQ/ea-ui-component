import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaInfiniteScroll extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #placeholder;

  #states = {
    /** @type {"loading" | "finished" | "noMore"} */
    status: "finished",
    /** @type {IntersectionObserver | null} */
    observer: null,
  };

  // ------- status -------
  // #region
  get status() {
    return this.#states.status;
  }

  set status(value) {
    this.#states.status = value;
  }
  // #endregion
  // ------- end -------

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "disabled",
      "delay",
      "distance",
      "immediate",
      "status",
    ];
  }

  state = this.properties({
    disabled: {
      type: Boolean,
      default: false,
      observer: (newVal) => {},
    },
    delay: {
      type: Number,
      default: 200,
      observer: (newVal) => {},
    },
    distance: {
      type: Number,
      default: 0,
      observer: (newVal) => {},
    },
    immediate: {
      type: Boolean,
      default: true,
      observer: (newVal) => {},
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist("ea-infinite-scroll", {
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
        <section class='ea-infinite-scroll' part='container'>
            <slot></slot>
            <div class='ea-infinite-scroll__placeholder' part='placeholder'></div>
            <section class='ea-infinite-scroll__loading' part='loading'>
                <slot name='loading'></slot>
            </section>
            <section class='ea-infinite-scroll__noMore' part='noMore'>
                <slot name='noMore'></slot>
            </section>
        </section>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-infinite-scroll");
    this.#placeholder = this.shadowRoot.querySelector(
      ".ea-infinite-scroll__placeholder"
    );
  }

  #setObserver = () => {
    this.#states.observer?.disconnect();

    this.#states.observer = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          this.#states.observer.disconnect();

          this.dispatchEvent("loadmore", {
            bubbles: true,
          });

          this.#setObserver();

          //   await new Promise((resolve) => {
          //     if (this.status === "finished") {
          //       resolve();
          //     }

          //     this.dispatchEvent("loadmore", {
          //       detail: {
          //         done: () => {
          //           this.status = "finished";
          //           resolve();
          //         },
          //         noMore: () => {
          //           this.status = "noMore";
          //           resolve();
          //         },
          //       },
          //       bubbles: true,
          //     });
          //   });
        }
      });
    });

    this.#states.observer.observe(this.#placeholder);
  };

  connectedCallback() {
    super.connectedCallback();

    this.#setObserver();

    this.shadowRoot.addEventListener("slotchange", () => {
      this.dispatchEvent("slotchange", { bubbles: true });
    });
  }
}

if (!window.customElements.get("ea-infinite-scroll")) {
  window.customElements.define("ea-infinite-scroll", EaInfiniteScroll);
}
