import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";
import { componentTypes } from "@/utils/Variables";

export class EaTimelineItem extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #dotSlot;
  /** @type {HTMLElement} */
  #dot;
  /** @type {HTMLElement} */
  #tail;
  /** @type {HTMLElement} */
  #content;
  /** @type {HTMLElement} */
  #timestamp;
  /** @type {HTMLElement} */
  #timestampSlot;

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "type",
      "timestamp",
      "hide-timestamp",
      "color",
      "hollow",
    ];
  }

  state = this.properties({
    type: {
      type: componentTypes,
      default: "",
      observer: (newVal) => {
        this.updateContainerClasslist();
      },
    },
    timestamp: {
      type: String,
      default: "",
      observer: (newVal) => {
        this.#timestampSlot.textContent = newVal;
      },
    },
    "hide-timestamp": {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        this.#timestampSlot.style.display = newVal ? "none" : "block";
      },
    },
    color: {
      type: String,
      default: "",
      observer: (newVal) => {
        if (!CSS.supports("color", newVal))
          return console.warn(
            `[EaTag] The color value ${newVal} is not supported.`
          );

        this.#dot.style.backgroundColor = newVal;
      },
    },
    hollow: {
      type: Boolean,
      default: false,
      observer: (newVal) => {
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
      "ea-timeline-item",
      {
        ["--" + this.type]: this.type,
      },
      {
        "hollow-dot": this.hollow,
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
      <div class='ea-timeline-item' part='container'>
        <aside class="ea-timeline-item__wrapper" part='left-wrapper'>
          <slot name="dot">
            <section class="ea-timeline-item__dot" part='dot'></section>
          </slot>
          <section class="ea-timeline-item__tail" part='tail'></section>
        </aside>
        <main class="ea-timeline-item__wrapper" part='right-wrapper'>
          <header class="ea-timeline-item__content" part='content'>
            <slot></slot>
          </header>
          <footer class='ea-timeline-item__timestamp' part='timestamp'>
            <slot name="timestamp"></slot>
          </footer>
        </main>
      </div>
        `;

    this.#container = this.shadowRoot.querySelector(".ea-timeline-item");
    this.#dotSlot = this.shadowRoot.querySelector("slot[name='dot']");
    this.#dot = this.shadowRoot.querySelector(".ea-timeline-item__dot");
    this.#tail = this.shadowRoot.querySelector(".ea-timeline-item__tail");
    this.#content = this.shadowRoot.querySelector(".ea-timeline-item__content");
    this.#timestamp = this.shadowRoot.querySelector(
      ".ea-timeline-item__timestamp"
    );
    this.#timestampSlot = this.shadowRoot.querySelector(
      `slot[name="timestamp"]`
    );

    this.updateContainerClasslist();
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

if (!window.customElements.get("ea-timeline-item")) {
  window.customElements.define("ea-timeline-item", EaTimelineItem);
}
