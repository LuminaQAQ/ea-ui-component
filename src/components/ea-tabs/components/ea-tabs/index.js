import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";
import { timeout } from "@/utils/timeout";

export class EaTabs extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #prevBtn;
  /** @type {HTMLElement} */
  #nextBtn;
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
  /** @type {HTMLSlotElement} */
  #defaultSlot;

  /** @type {AbortController} */
  #abortController = new AbortController();

  /** @type {ResizeObserver} */
  #resizeObserver;

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "type",
      "active",
      "tab-position",
      "editable",
    ];
  }

  state = this.properties({
    type: {
      type: ["", "card", "border-card"],
      default: "",
      observer: newVal => {
        this.updateContainerClasslist();

        [...this.#defaultSlot.assignedElements()]
          .filter(
            item =>
              item.tagName.toLowerCase() === "ea-tab-panel" ||
              item.tagName.toLowerCase() === "ea-tab"
          )
          .forEach(item => item.setAttribute("type", newVal));
      },
    },
    active: {
      type: String,
      default: () => {
        const active = this.getAttribute("active");

        if (!active) {
          const firstTab = this.querySelector("ea-tab");
          return firstTab ? firstTab.getAttribute("panel") : "";
        } else {
          return active;
        }
      },
      observer: newVal => {
        this.#updateTabsActive(newVal);

        this.emit("tabs-change", {
          name: newVal,
        });
      },
    },
    "tab-position": {
      type: ["top", "bottom", "left", "right"],
      default: "top",
      observer: newVal => {
        this.updateContainerClasslist();

        this.#updateTabNavigationPosition(newVal);
        this.#updateTabsActive(this.active);

        [...this.#navSlot.assignedElements()]
          .filter(
            item =>
              item.tagName.toLowerCase() === "ea-tab-panel" ||
              item.tagName.toLowerCase() === "ea-tab"
          )
          .forEach(item => item.setAttribute("tab-position", newVal));
      },
    },
    editable: {
      type: Boolean,
      default: false,
      observer: () => {},
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const isOverflow =
      this.#nav.scrollWidth > this.#nav.clientWidth ||
      this.#nav.scrollHeight > this.#nav.clientHeight;

    const className = this.computedClasslist(
      "ea-tabs",
      {
        ["--" + this.type]: this.type,
        ["--" + this["tab-position"]]: this["tab-position"],
      },
      {
        overflow: isOverflow,
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
   * 更新指示器位置
   * @param {HTMLElement} tabEl
   * @param {HTMLElement} lineEl
   * @param {HTMLElement} tabPosition
   */
  #updateIndicatorPosition = (
    tabEl,
    lineEl = this.#line,
    tabPosition = this["tab-position"]
  ) => {
    const isVertical = tabPosition === "top" || tabPosition === "bottom";
    const tabRect = tabEl.getBoundingClientRect();
    const lineRect = lineEl.getBoundingClientRect();

    this.style.setProperty(
      "--ea-tabs-indicator-size",
      `${isVertical ? tabEl.offsetWidth : tabEl.offsetHeight}px`
    );
    this.style.setProperty(
      "--ea-tabs-indicator-x",
      `${isVertical ? tabRect.x - lineRect.x : tabRect.y - lineRect.y}px`
    );
  };

  /**
   * 更新指示器位置
   * @param {HTMLElement} tabEl
   * @param {HTMLElement} [lineEl]
   * @param {HTMLElement} [tabPosition]
   */
  #updateNavPosition = (
    tabEl,
    lineEl = this.#line,
    tabPosition = this["tab-position"]
  ) => {
    const tabRect = tabEl.getBoundingClientRect();

    this.#nav.scrollTo({
      left: tabEl.offsetLeft + tabRect.width,
      top: tabEl.offsetTop + tabRect.height,
      behavior: "smooth",
    });
  };

  /**
   * 更新 tab 激活状态
   * @param {String} activeName
   */
  #updateTabsActive = (activeName = this.active) => {
    /** @type {HTMLElement[]} */
    const panelEls = [...this.querySelectorAll("ea-tab-panel")];
    /** @type {HTMLElement[]} */
    const tabEls = [...this.querySelectorAll("ea-tab")];

    tabEls.forEach(tab => {
      const isActive = tab.getAttribute("panel") === activeName;

      tab.toggleAttribute("active", isActive);

      if (isActive && this.type === "") this.#updateIndicatorPosition(tab);

      if (isActive) this.#updateNavPosition(tab);
    });

    panelEls.forEach(panel => {
      panel.toggleAttribute(
        "active",
        activeName === panel.getAttribute("name")
      );
    });
  };

  /**
   * 更新 tab 是否为可编辑状态
   * @param {Boolean} isEditable
   */
  #updateTabEditable = (isEditable = this.editable) => {
    this.querySelectorAll("ea-tab").forEach(tab => {
      tab.toggleAttribute("editable", isEditable);
    });
  };

  /**
   * @param {"top" | "bottom" | "left" | "right"} tabPosition
   */
  #updateTabNavigationPosition = (tabPosition = this["tab-position"]) => {
    if (tabPosition === "left" || tabPosition === "right") {
      this.#prevBtn.setAttribute("name", "arrow-left");
      this.#nextBtn.setAttribute("name", "arrow-right");
    } else if (tabPosition === "top" || tabPosition === "bottom") {
      this.#prevBtn.setAttribute("name", "arrow-up");
      this.#nextBtn.setAttribute("name", "arrow-down");
    }
  };

  /**
   * 当 tab slot 内容变化时触发
   * @param {Event} e
   */
  #onTabsSlotChange = () => {
    /** @type {HTMLElement[]} */
    const tabEls = [...this.querySelectorAll("ea-tab")];

    tabEls.forEach(tab => {
      tab.setAttribute("slot", "nav");
      try {
        tab.updateContainerClasslist();
      } catch {
        /* empty */
      }
    });

    this.#updateTabsActive(this.active);
    this.#updateTabEditable(this.editable);
    this.updateContainerClasslist();

    timeout(() => {
      /** @type {HTMLElement} */
      const activeTab = [...this.querySelectorAll("ea-tab")].find(tab =>
        tab.hasAttribute("active")
      );

      const tabRect = activeTab.getBoundingClientRect();

      this.#nav.scrollTo({
        left: activeTab.offsetLeft + tabRect.width,
        top: activeTab.offsetTop + tabRect.height,
        behavior: "smooth",
      });
    }, 0);
  };

  /**
   * 标签切换事件
   * @param {MouseEvent} e
   */
  #onTabClick = e => {
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

  /**
   * 滚动至上一视口
   */
  #onPrev = () => {
    this.#nav.scrollTo({
      left: this.#nav.scrollLeft - this.#nav.offsetWidth,
      top: this.#nav.scrollTop - this.#nav.offsetHeight,
      behavior: "smooth",
    });
  };

  /**
   * 滚动至下一视口
   */
  #onNext = () => {
    this.#nav.scrollTo({
      left: this.#nav.scrollLeft + this.#nav.offsetWidth,
      top: this.#nav.scrollTop + this.#nav.offsetHeight,
      behavior: "smooth",
    });
  };

  /**
   * 删除标签
   * @param {CustomEvent} e
   */
  #onTabRemove = e => {
    e.preventDefault();
    e.stopImmediatePropagation();

    const panelId = e.detail.panel;

    const tabEls = [...this.querySelectorAll("ea-tab")];
    const tab = e.target;
    const index = tabEls.indexOf(tab);
    const panel = this.querySelector(`ea-tab-panel[name="${panelId}"]`);
    const tabName = [...this.querySelectorAll("ea-tab")][
      index - 1 < 0 ? 0 : index - 1
    ].getAttribute("panel");

    this.setAttribute("active", tabName);

    panel.remove();
    tab.remove();

    this.emit("tab-remove", {
      detail: {
        name: tabName,
      },
    });
  };

  $render() {
    this.shadowRoot.innerHTML = `
      <div class='ea-tabs' part='container'>
        <nav class='ea-tabs__nav' part='nav'>
            <ea-icon name="angle-left" class="ea-tabs__prev ea-tabs__scroll" part='prev'></ea-icon>
            <slot name='nav'></slot>
            <ea-icon name="angle-right" class="ea-tabs__next ea-tabs__scroll" part='next'></ea-icon>
        </nav>
        <div class="ea-tabs__line" part="line" tabindex="-1">
            <span class="ea-tabs__indicator" part="indicator"></span>
        </div>
        <main class='ea-tabs__content' part='content'>
          <slot></slot>
        </main>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-tabs");
    this.#prevBtn = this.shadowRoot.querySelector(".ea-tabs__prev");
    this.#nextBtn = this.shadowRoot.querySelector(".ea-tabs__next");
    this.#nav = this.shadowRoot.querySelector(".ea-tabs__nav");
    this.#navSlot = this.shadowRoot.querySelector(
      ".ea-tabs__nav > slot[name=nav]"
    );
    this.#line = this.shadowRoot.querySelector(".ea-tabs__line");
    this.#indicator = this.shadowRoot.querySelector(".ea-tabs__indicator");
    this.#content = this.shadowRoot.querySelector(".ea-tabs__content");
    this.#defaultSlot = this.shadowRoot.querySelector(
      ".ea-tabs__content > slot"
    );

    this.#onTabsSlotChange();
  }

  connectedCallback() {
    super.connectedCallback();

    this.#abortController?.abort();
    this.#abortController = new AbortController();
    this.#resizeObserver?.unobserve();

    this.#nav.addEventListener("click", this.#onTabClick, {
      signal: this.#abortController.signal,
    });

    this.#navSlot.addEventListener("slotchange", this.#onTabsSlotChange, {
      signal: this.#abortController.signal,
    });

    this.#defaultSlot.addEventListener("slotchange", this.#onTabsSlotChange, {
      signal: this.#abortController.signal,
    });

    this.#prevBtn.addEventListener("click", this.#onPrev, {
      signal: this.#abortController.signal,
    });

    this.#nextBtn.addEventListener("click", this.#onNext, {
      signal: this.#abortController.signal,
    });

    this.addEventListener("ea-tab-close-icon-click", this.#onTabRemove, {
      signal: this.#abortController.signal,
    });

    this.#resizeObserver = new ResizeObserver(() => {
      this.updateContainerClasslist();
    }).observe(this.#nav);

    timeout(() => {
      this.updateContainerClasslist();
    }, 100);
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
    this.#resizeObserver?.unobserve();
  }
}

if (!window.customElements.get("ea-tabs")) {
  window.customElements.define("ea-tabs", EaTabs);
}
