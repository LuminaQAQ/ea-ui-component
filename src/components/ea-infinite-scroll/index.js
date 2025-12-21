import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaInfiniteScroll extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #placeholder;

  #states = {
    /** @type {IntersectionObserver | null} */
    observer: null,
  };

  static get observedAttributes() {
    return [...super.observedAttributes, "distance", "status"];
  }

  state = this.properties({
    status: {
      type: ["finished", "loading", "noMore"],
      default: "finished",
      /** @param {"loading" | "finished" | "noMore"} newVal */
      observer: (newVal) => {
        this.updateContainerClasslist();
      },
    },
    distance: {
      type: Number,
      default: 0,
      observer: (newVal) => {},
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist(
      "ea-infinite-scroll",
      {
        // ['--' + this.type]: this.type,
      },
      {
        [this.status]: this.status,
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

  connectedCallback() {
    super.connectedCallback();

    this.#states.observer = new IntersectionObserver(
      (entries) => {
        if (this.status !== "finished") return;

        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            this.#states.observer.unobserve(entry.target);
            this.status = "loading";
            this.dispatchEvent("loadmore", {
              detail: {
                finished: () => {
                  this.status = "finished";
                  this.#states.observer.observe(entry.target);
                },
                noMore: () => {
                  this.status = "noMore";
                  this.#states.observer.observe(entry.target);
                },
              },
              bubbles: true,
            });
          }
        });
      },
      {
        rootMargin: this.distance + "px",
      }
    );

    this.#states.observer.observe(this.#placeholder);

    this.shadowRoot.addEventListener("slotchange", () => {
      this.dispatchEvent("slotchange", { bubbles: true });
    });
  }

  $beforeUnmounted() {
    this.#states.observer.disconnect();
  }
}

if (!window.customElements.get("ea-infinite-scroll")) {
  window.customElements.define("ea-infinite-scroll", EaInfiniteScroll);
}
