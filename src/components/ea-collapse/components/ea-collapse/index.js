import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaCollapse extends Base {
  /** @type {HTMLElement} */
  #container;

  /** @type {AbortController} */
  #abortController;

  static get observedAttributes() {
    return [...super.observedAttributes, "accordion", "expand-icon-position"];
  }

  state = this.properties({
    accordion: {
      type: Boolean,
      default: false,
      observer: () => {},
    },
    active: {
      props: true,
      type: {
        String: () => this.accordion,
        Array: () => !this.accordion,
      },
      default: () => (this.accordion ? "" : []),
      observer: newVal => {
        this.setActiveNames(newVal);
      },
    },
    "expand-icon-position": {
      type: ["left", "right"],
      default: "right",
      observer: newVal => {
        this.querySelectorAll("ea-collapse-item").forEach(item => {
          item["expand-icon-position"] = newVal;
        });
      },
    },
  });

  fnState = this.properties({
    beforeCollapse: {
      props: true,
      rawFunction: true,
      type: Function,
      default: null,
      observer: () => {},
    },
  });

  constructor() {
    super();

    this.stylesheet = stylesheet;

    this.$render();
  }

  $render() {
    this.shadowRoot.innerHTML = `
      <div class='ea-collapse' part='container'>
        <slot></slot>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-collapse");
  }

  /**
   * 更新手风琴模式下的折叠状态
   * @param {string} [activeName]
   */
  #updateAccordionCollapse = (activeName = this.active) => {
    /** @type {HTMLElement[]} */
    const els = [...this.querySelectorAll("ea-collapse-item")];

    els.forEach(el =>
      el.toggleAttribute("active", el.getAttribute("name") === activeName)
    );
  };

  /**
   * 更新普通模式下的折叠状态
   * @param {string[]} [activeNames]
   */
  #updateNormalCollapse = (activeNames = this.active) => {
    /** @type {HTMLElement[]} */
    const els = [...this.querySelectorAll("ea-collapse-item")];

    els.forEach(el =>
      el.toggleAttribute(
        "active",
        activeNames.includes(el.getAttribute("name"))
      )
    );
  };

  /**
   * 折叠项点击事件处理
   * @param {CustomEvent} e
   */
  #onCollapseChangeEvent = async e => {
    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();

    /** @type {{name: string, el: HTMLElement}} */
    const { name, el } = e.detail;

    if (typeof this.beforeCollapse === "function") {
      try {
        const isContinue = await this.beforeCollapse({ name, el });
        if (!isContinue) return;
      } catch {
        return;
      }
    }

    if (this.accordion) {
      this.#updateAccordionCollapse(name);
      this.active = name;
    } else {
      try {
        if (this.active.includes(name)) {
          this.active = this.active.filter(item => item !== name);
          el.toggleAttribute("active", false);
        } else {
          this.active = [...this.active, name];
          el.toggleAttribute("active", this.active.includes(name));
        }
      } catch {
        console.error(
          `${this.tagName}: When 'accordion' is false, 'active' should be an Array type.`,
          this
        );
      }
    }

    this.emit("change", {
      detail: {
        name,
        target: el,
        active: this.active,
      },
      bubbles: true,
    });
  };

  /**
   * 初始化折叠项的唯一标识及折叠状态
   */
  #initCollapseStatus = () => {
    /** @type {HTMLElement[]} */
    const els = [...this.querySelectorAll("ea-collapse-item")];

    els.forEach((el, index) => {
      if (!el.getAttribute("name")) el.setAttribute("name", index);
    });
  };

  /**
   * 设置折叠项的展开状态
   * @param {string | string[]} newVal
   */
  setActiveNames = newVal => {
    if (this.accordion) {
      this.#updateAccordionCollapse(newVal);
    } else {
      this.#updateNormalCollapse(newVal);
    }
  };

  connectedCallback() {
    super.connectedCallback();

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.#initCollapseStatus();

    this.addEventListener("collapse-item-click", this.#onCollapseChangeEvent, {
      signal: this.#abortController.signal,
    });
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }
}

if (!window.customElements.get("ea-collapse")) {
  window.customElements.define("ea-collapse", EaCollapse);
}
