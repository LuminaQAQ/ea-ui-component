import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaText extends Base {
  /** @type {HTMLElement} */
  #container;

  static get observedAttributes() {
    return ["title", "type", "size", "truncated", "line-clamp", "tag"];
  }

  #states = {
    isOriginalRendered: false,
  };

  #isOriginalRenderedPromise = new Promise(resolve => {
    this.#states = new Proxy(this.#states, {
      set: (target, key, value) => {
        if (key === "isOriginalRendered" && value) {
          resolve(true);
        }
        return Reflect.set(target, key, value);
      },
    });
  });

  /**
   * @typedef {Object} State
   * @property {string} title - 标题
   * @property {string} type - 文本类型
   * @property {string} size - 文本大小
   * @property {boolean} truncated - 文本是否截断
   * @property {number} line-clamp - 截断的行数
   * @property {string} tag - 文本标签
   */

  /** @type {State} */
  state = this.properties({
    title: {
      type: String,
      default: "",
      observer: newVal => {},
    },
    type: {
      type: ["normal", "primary", "success", "warning", "danger", "info"],
      default: "normal",
      observer: async newVal => {
        await this.#isOriginalRenderedPromise;
        this.updateContainerClasslist();
      },
    },
    size: {
      type: ["large", "medium", "small"],
      default: "medium",
      observer: async newVal => {
        await this.#isOriginalRenderedPromise;
        this.updateContainerClasslist();
      },
    },
    truncated: {
      type: Boolean,
      default: false,
      observer: async newVal => {
        await this.#isOriginalRenderedPromise;
        this.title = this.innerText || "";
        this.updateContainerClasslist();
      },
    },
    "line-clamp": {
      type: Number,
      default: 0,
      observer: async newVal => {
        await this.#isOriginalRenderedPromise;
        this.#container.style.setProperty("--ea-text-line-clamp", newVal);
        this.title = this.innerText || "";

        this.updateContainerClasslist();
      },
    },
    tag: {
      type: String,
      default: "span",
      observer: newVal => {
        this.$render();

        if (this.hasAttribute("line-clamp")) {
          this.#container.style.setProperty("--ea-text-line-clamp", newVal);
        }

        if (this.hasAttribute("truncated") || this.hasAttribute("line-clamp")) {
          this.title = this.innerText || "";
        }

        this.updateContainerClasslist();
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist("ea-text", {
      ["--" + this.type]: this.type,
      ["--" + this.size]: this.size,
      ["--truncated"]: this.truncated,
      ["--line-clamp"]: this["line-clamp"] > 0,
    });

    this.#container.className = className;

    return className;
  }

  constructor() {
    super();

    this.stylesheet = stylesheet;
  }

  $render() {
    this.shadowRoot.innerHTML = `
      <${this.tag} class="ea-text" part="container">
        <slot></slot>
      </${this.tag}>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-text");

    this.updateContainerClasslist();

    this.#states.isOriginalRendered = true;
  }

  connectedCallback() {
    super.connectedCallback();

    this.$render();
  }
}

if (!window.customElements.get("ea-text")) {
  window.customElements.define("ea-text", EaText);
}
