import { namespace } from "@/directives/namespace";
import { html } from "@/directives/html";
import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";

export class EaMessageElement extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #messageIcon;
  /** @type {HTMLElement} */
  #messageContent;
  /** @type {HTMLElement} */
  #messageCloseIcon;

  /** @type {AbortController} */
  #abortController;
  /** @type {AbortController} */
  #visibleAbortController;

  #states = {
    dangerouslyUseHTMLString: false,
  };

  // ------- dangerouslyUseHTMLString -------
  // #region
  get dangerouslyUseHTMLString() {
    return this.#states.dangerouslyUseHTMLString;
  }

  set dangerouslyUseHTMLString(value) {
    this.#states.dangerouslyUseHTMLString = value;
  }
  // #endregion
  // ------- end -------

  static get observedAttributes() {
    return [...super.observedAttributes, "placement"];
  }

  state = this.properties({
    type: {
      props: true,
      type: ["primary", "success", "warning", "info", "error"],
      default: "info",
      observer: newVal => {
        const iconTypes = {
          success: "circle-check",
          error: "circle-xmark",
          warning: "triangle-exclamation",
          info: "circle-info",
          primary: "circle-info",
        };

        this.#messageIcon.name = iconTypes[newVal];
        this.updateContainerClasslist();
      },
    },
    visible: {
      props: true,
      type: Boolean,
      default: false,
      observer: async newVal => {
        this.#visibleAbortController?.abort();
        this.#visibleAbortController = new AbortController();

        if (newVal) {
          this.#initPosition();
          this.updateContainerClasslist();
          this.#dispatchBubblesEvent("show");

          void this.#container.offsetWidth;

          this.#container.classList.add(this.ns.m("is-show"));

          this.#container.addEventListener(
            "transitionend",
            () => {
              this.#dispatchBubblesEvent("shown");
            },
            { once: true, signal: this.#visibleAbortController.signal }
          );
        } else {
          this.#handleHide();

          this.#container.classList.add(this.ns.m("before-hide"));
          this.#dispatchBubblesEvent("hide");

          this.#container.addEventListener(
            "transitionend",
            () => {
              this.updateContainerClasslist();
              this.#dispatchBubblesEvent("hidden");
            },
            { once: true, signal: this.#visibleAbortController.signal }
          );
        }
      },
    },
    message: {
      props: true,
      type: String,
      default: "",
      observer: newVal => {
        if (this.dangerouslyUseHTMLString) {
          this.#messageContent.innerHTML = newVal;
        } else {
          this.#messageContent.innerText = newVal;
        }
      },
    },
    showClose: {
      props: true,
      type: Boolean,
      default: false,
      observer: newVal => {
        this.updateContainerClasslist();

        this.#abortController?.abort();

        if (newVal) {
          this.#abortController = new AbortController();
          this.#messageCloseIcon.addEventListener("click", this.#onCloseClick, {
            signal: this.#abortController.signal,
          });
        }
      },
    },
    placement: {
      props: true,
      type: [
        "top",
        "top-left",
        "top-right",
        "bottom",
        "bottom-left",
        "bottom-right",
        "middle",
      ],
      default: "top",
      observer: () => {
        this.updateContainerClasslist();
      },
    },
    icon: {
      props: true,
      type: String,
      default: "",
      observer: newVal => {
        this.#messageIcon.name = newVal;
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
      this.ns.b(),
      {
        ["--" + this.type]: this.type,
        ["--" + this.placement]: this.placement,
        ["--visible"]: this.visible,
        ["--show-close"]: this.showClose,
      },
      {}
    );

    if (this.#container) this.#container.className = className;

    return className;
  }

  constructor() {
    super();

    this.stylesheet = stylesheet;

    this.$render();
  }

  $render() {
    const ns = namespace("message");
    this.ns = ns;

    this.shadowRoot.innerHTML = html(`
      <div class="${ns.b()}" part="container">
        <ea-icon class="${ns.e("icon")}" part="icon"></ea-icon>
        <div class="${ns.e("content")}" part="content-wrap"></div>
        <ea-icon class="${ns.e("icon-close")}" name="xmark" part="close-icon"></ea-icon>
      </div>
    `);

    this.#container = this.shadowRoot.querySelector(ns.cb());
    this.#messageIcon = this.shadowRoot.querySelector(ns.ce("icon"));
    this.#messageContent = this.shadowRoot.querySelector(ns.ce("content"));
    this.#messageCloseIcon = this.shadowRoot.querySelector(ns.ce("icon-close"));
  }

  /**
   * 触发冒泡事件
   * @param {string} customEventName - 自定义事件名称
   * @param {string} detail - 事件详情
   */
  #dispatchBubblesEvent = (customEventName, detail) => {
    this.emit(customEventName, {
      detail,
      bubbles: true,
      composed: true,
    });
  };

  /**
   * 关闭消息（公共方法）
   */
  close = () => {
    this.visible = false;
    this.#dispatchBubblesEvent("close");
  };

  /**
   * 关闭按钮点击事件处理
   */
  #onCloseClick = () => {
    this.close();
  };

  /**
   * 初始化消息位置
   */
  #initPosition = () => {
    /** @type {HTMLElement[]} */
    const eaMessageList = document.querySelectorAll(
      `ea-message[placement="${this.placement}"]`
    );

    if (eaMessageList.length <= 1) return;

    const lastEl = eaMessageList[eaMessageList.length - 2];
    /** @type {string} */
    const lastPosition = lastEl.style.getPropertyValue("--ea-message-y");

    const lastEaMessage = lastEl.shadowRoot.querySelector(this.ns.cb());
    const lastEaMessageRect = lastEaMessage.getBoundingClientRect();

    this.style.setProperty(
      "--ea-message-y",
      `${
        Number(lastPosition.replace("px", "")) + lastEaMessageRect.height + 8
      }px`
    );
  };

  /**
   * 隐藏消息
   */
  #handleHide = () => {
    const eaMessageList = [
      ...document.querySelectorAll(`ea-message[placement="${this.placement}"]`),
    ];
    const thisIndex = eaMessageList.findIndex(el => el === this);
    const els = eaMessageList.slice(thisIndex + 1);
    const height = this.#container.getBoundingClientRect().height;

    els.forEach(message => {
      const posi = Number(
        message.style.getPropertyValue("--ea-message-y").replace("px", "")
      );
      message.style.setProperty("--ea-message-y", `${posi - height - 8}px`);
    });
  };

  connectedCallback() {
    super.connectedCallback();
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
    this.#visibleAbortController?.abort();
  }
}

if (!window.customElements.get("ea-message")) {
  window.customElements.define("ea-message", EaMessageElement);
}
