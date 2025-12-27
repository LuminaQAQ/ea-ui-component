import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaBacktop extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {AbortController} */
  #abortController;
  /** @type {AbortController} */
  #beforeLeaveAbortController;

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "target",
      "visibility-height",
      "right",
      "bottom",
      "smooth",
    ];
  }

  state = this.properties({
    target: {
      type: String,
      default: "window",
      observer: () => {},
    },
    "visibility-height": {
      type: Number,
      default: 200,
      observer: () => {},
    },
    right: {
      type: String,
      default: "40px",
      observer: newVal => {
        this.style.setProperty("--ea-backtop-right", newVal);
      },
    },
    bottom: {
      type: String,
      default: "40px",
      observer: newVal => {
        this.style.setProperty("--ea-backtop-bottom", newVal);
      },
    },
    smooth: {
      type: Boolean,
      default: true,
      observer: () => {},
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const scrollTop = this.#getCurrentScrollTop();

    const className = this.computedClasslist(
      "ea-backtop",
      {
        // ['--' + this.type]: this.type,
      },
      {
        visible: scrollTop > this["visibility-height"],
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

  /**
   * 获取当前滚动位置
   * @return {number} 滚动位置
   */
  #getCurrentScrollTop = () => {
    const el = document.querySelector(this.target);
    return el ? el.scrollTop : window.scrollY;
  };

  /**
   * 点击事件处理
   */
  #onClick = () => {
    const el = document.querySelector(this.target) || window;

    el.scrollTo({
      top: 0,
      behavior: this.smooth ? "smooth" : "auto",
    });
  };

  /**
   * 滚动事件处理
   */
  #onScroll = async () => {
    const scrollTop = this.#getCurrentScrollTop();

    if (scrollTop > this["visibility-height"]) {
      this.#container.classList.add("before-enter");

      void this.#container.offsetWidth;

      this.updateContainerClasslist();
    } else {
      this.#beforeLeaveAbortController?.abort();
      this.#beforeLeaveAbortController = new AbortController();

      this.#container.classList.add("before-leave");
      this.#container.addEventListener(
        "transitionend",
        () => {
          this.updateContainerClasslist();
        },
        { once: true, signal: this.#beforeLeaveAbortController.signal }
      );
    }
  };

  $render() {
    this.shadowRoot.innerHTML = `
      <div class='ea-backtop' part='container'>
        <slot></slot>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-backtop");
  }

  connectedCallback() {
    super.connectedCallback();

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.addEventListener("click", this.#onClick, {
      signal: this.#abortController.signal,
    });

    const el = document.querySelector(this.target) || window;
    el.addEventListener("scroll", this.#onScroll, {
      signal: this.#abortController.signal,
    });
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
    this.#beforeLeaveAbortController?.abort();
  }
}

if (!window.customElements.get("ea-backtop")) {
  window.customElements.define("ea-backtop", EaBacktop);
}
