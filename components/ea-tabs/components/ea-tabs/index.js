import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaTabs extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #nav;
  /** @type {HTMLSlotElement} */
  #navSlot;
  /** @type {HTMLElement} */
  #line;
  /** @type {HTMLElement} */
  #indicator;
  /** @type {HTMLElement} */
  #content;

  /** @type {AbortController} */
  #abortController = new AbortController();

  static get observedAttributes() {
    return [...super.observedAttributes, "type", "active"];
  }

  state = this.properties({
    type: {
      type: ["", "card", "border-card"],
      default: "",
      observer: (newVal) => {
        this.updateContainerClasslist();
        [
          ...this.querySelectorAll("ea-tab-panel"),
          ...this.querySelectorAll("ea-tab"),
        ].forEach((item) => item.setAttribute("type", newVal));
      },
    },
    active: {
      type: String,
      default: () => {
        const active = this.getAttrString("active");

        if (!active) {
          const firstTab = this.querySelector("ea-tab");
          return firstTab ? firstTab.getAttribute("panel") : "";
        } else {
          return active;
        }
      },
      observer: (newVal) => {
        this.#updateTabsActive(newVal);

        this.emit("tabs-change", {
          name: newVal,
        });
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist("ea-tabs", {
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
   * 更新 tab 激活状态
   * @param {String} activeName
   */
  #updateTabsActive = (activeName = this.active) => {
    /** @type {HTMLElement[]} */
    const panelEls = [...this.querySelectorAll("ea-tab-panel")];
    /** @type {HTMLElement[]} */
    const tabEls = [...this.querySelectorAll("ea-tab")];

    tabEls.forEach((tab, index) => {
      const isActive = tab.getAttribute("panel") === activeName;
      tab.toggleAttribute("active", isActive);

      if (isActive && this.type === "") {
        this.style.setProperty(
          "--ea-tabs-indicator-width",
          `${tab.offsetWidth}px`
        );
        this.style.setProperty(
          "--ea-tabs-indicator-x",
          `${tab.offsetLeft - this.#line.getBoundingClientRect().left}px`
        );
      }
    });

    panelEls.forEach((panel, index) => {
      panel.toggleAttribute(
        "active",
        activeName === panel.getAttribute("name")
      );
    });
  };

  /**
   * 当 tab slot 内容变化时触发
   * @param {Event} e
   */
  #onTabsSlotChange = (e) => {
    /** @type {HTMLElement[]} */
    const tabEls = [...this.querySelectorAll("ea-tab")];

    tabEls.forEach((tab, index) => {
      tab.setAttribute("slot", "nav");
    });

    this.#updateTabsActive(this.active);
  };

  /**
   * 标签切换事件
   * @param {MouseEvent} e
   */
  #onTabClick = (e) => {
    const target = e.target.closest("ea-tab");
    if (!target || target?.hasAttribute("disabled")) return;

    const panelName = target.getAttribute("panel");
    this.active = panelName;

    this.emit("tab-click", {
      detail: {
        name: panelName,
        panel: this.querySelector(`ea-tab-panel[name="${panelName}"]`),
      },
      bubbles: true,
    });
  };

  $render() {
    this.shadowRoot.innerHTML = `
      <div class='ea-tabs' part='container'>
        <nav class='ea-tabs__nav' part='nav'>
          <slot name='nav'></slot>
        </nav>
        <div class="ea-tabs__line" part="line">
            <span class="ea-tabs__indicator" part="indicator"></span>
        </div>
        <main class='ea-tabs__content' part='content'>
          <slot></slot>
        </main>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-tabs");
    this.#nav = this.shadowRoot.querySelector(".ea-tabs__nav");
    this.#navSlot = this.shadowRoot.querySelector(
      ".ea-tabs__nav > slot[name=nav]"
    );
    this.#line = this.shadowRoot.querySelector(".ea-tabs__line");
    this.#indicator = this.shadowRoot.querySelector(".ea-tabs__indicator");
    this.#content = this.shadowRoot.querySelector(".ea-tabs__content");

    this.#onTabsSlotChange();
  }

  connectedCallback() {
    super.connectedCallback();

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.#nav.addEventListener("click", this.#onTabClick, {
      signal: this.#abortController.signal,
    });

    this.#navSlot.addEventListener("slotchange", this.#onTabsSlotChange, {
      signal: this.#abortController.signal,
    });
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }
}

if (!window.customElements.get("ea-tabs")) {
  window.customElements.define("ea-tabs", EaTabs);
}
