import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";
import EaUtils from "@/utils/Utils";

export class EaCollapse extends Base {
  /** @type {HTMLElement} */
  #container;

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "active",
      "accordion",
      "expand-icon-position",
      "before-collapse",
    ];
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
    "expand-icon-position": {
      type: ["left", "right"],
      default: "right",
      observer: (newVal) => {
        this.querySelectorAll("ea-collapse-item").forEach((item) => {
          item["expand-icon-position"] = newVal;
        });
      },
    },
    "before-collapse": {
      type: Boolean,
      default: false,
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

    els.forEach((el, index) => {
      if (!el.name) el.name = index.toString();
    });

    if (this.accordion) {
      els.forEach((el) => (el.isActive = el.name === this.active));
    } else {
      els
        .filter((el) => this.active.includes(el.name))
        .forEach((el) => (el.isActive = true));
    }
  };

  #handleBeforeCollapse = (details) => {
    return new Promise((resolve, reject) => {
      if (this["before-collapse"])
        this.dispatchEvent("before-collapse", {
          detail: {
            resolve: () => resolve(details),
            reject: () => reject("Canceled collapse"),
            ...details,
          },
        });
      else resolve(details);
    });
  };

  #initChangeEvent = async (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    e.stopPropagation();

    const { name, el } = e.detail;

    await this.#handleBeforeCollapse({ name, el });

    if (this.accordion) {
      const items = [...this.querySelectorAll("ea-collapse-item")];
      items.forEach((item) => {
        item.isActive = item.name === name;
      });
      this.active = name;
    } else {
      if (this.active.includes(name)) {
        this.active = this.active.filter((item) => item !== name);
        el.isActive = false;
      } else {
        this.active = [...this.active, name];
        el.isActive = this.active.includes(name);
      }
    }

    this.dispatchEvent("change", {
      detail: {
        name,
        target: el,
        active: this.active,
      },
    });
  };

  setActiveNames = (newVal) => {
    try {
      const items = [...this.querySelectorAll("ea-collapse-item")];

      if (this.accordion) {
        items.forEach((item) => {
          item.isActive = item.name === newVal;
        });
      } else {
        items.forEach((item) => {
          item.isActive = newVal.includes(item.name);
        });
      }

      this.active = newVal;
    } catch (error) {}
  };

  async connectedCallback() {
    super.connectedCallback();

    this.#initCollapseStatus();

    this.addEventListener("collapse-item-click", this.#initChangeEvent);
  }
}

if (!window.customElements.get("ea-collapse")) {
  window.customElements.define("ea-collapse", EaCollapse);
}
