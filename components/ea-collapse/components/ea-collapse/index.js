import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";
import EaUtils from "@/utils/Utils";

export class EaCollapse extends Base {
  /** @type {HTMLElement} */
  #container;

  static get observedAttributes() {
    return [...super.observedAttributes, "active", "accordion"];
  }

  state = this.properties({
    type: {
      //   type: ,
      default: "",
      observer: (newVal) => {},
    },
    accordion: {
      type: Boolean,
      default: false,
      observer: (newVal) => {},
    },
    active: {
      type: {
        String: () => this.accordion,
        Array: () => !this.accordion,
      },
      default: () => (this.accordion ? "" : []),
      observer: (newVal) => {},
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    return this.computedClasslist("ea-collapse", {
      // ['--' + this.type]: this.type,
    });
  }

  #handleCollapse(flag, activeItemName) {}

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

  #initCollapseStatus = async () => {
    const els = [...this.querySelectorAll("ea-collapse-item")];

    await Promise.all([
      ...els.map((el) =>
        EaUtils.EaElement.addAsyncEventListener(el, "ea-collapse-item-ready")
      ),
    ]);

    if (this.accordion) {
      els.forEach((el) => (el.isActive = el.name === this.active));
    } else {
      els
        .filter((el) => this.active.includes(el.name))
        .forEach((el) => (el.isActive = true));
    }
  };

  #initChangeEvent = (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();

    const { name, el } = e.detail;
    if (this.accordion) {
      const items = [...this.querySelectorAll("ea-collapse-item")];
      items.forEach((item) => {
        item.isActive = item.name === name;
      });
    } else {
      if (this.active.includes(name)) {
        this.active = this.active.filter((item) => item !== name);
        el.isActive = false;
        console.log(this.active.includes(name));
      } else {
        this.active = [...this.active, name];
        el.isActive = this.active.includes(name);
      }
    }
  };

  async connectedCallback() {
    super.connectedCallback();

    this.#initCollapseStatus();

    this.addEventListener("change", this.#initChangeEvent);
  }
}

if (!window.customElements.get("ea-collapse")) {
  window.customElements.define("ea-collapse", EaCollapse);
}
