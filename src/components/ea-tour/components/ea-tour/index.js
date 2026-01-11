import Base from "@components/Base.js";
import stylesheet from "./index.scss?inline";

/**
 * 检查视口可见
 * @param {HTMLElement} el
 * @returns
 */
const isIntersecting = (el, scale = 0) => {
  const rect = el.getBoundingClientRect();

  return (
    rect.top > 0 &&
    rect.left > 0 &&
    rect.bottom <= window.innerHeight - scale &&
    rect.right <= window.innerWidth - scale
  );
};

export class EaTour extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #hollow;
  /** @type {HTMLElement} */
  #topMask;
  /** @type {HTMLElement} */
  #rightMask;
  /** @type {HTMLElement} */
  #bottomMask;
  /** @type {HTMLElement} */
  #leftMask;

  /** @type {AbortController} */
  #abortController;

  #AbortControllerStates = {
    /** @type {AbortController} */
    currentChangeAbortController: null,
  };

  #states = {
    isChildrenLoaded: false,
    isCenter: false,

    queueTask: [],

    originalPlacement: [],
  };

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "append-to",
      "visible",
      "current",
      "gap",
      "mask",
      "type",
      "placement",
    ];
  }

  state = this.properties({
    "append-to": {
      type: String,
      default: "body",
      observer: () => {},
    },
    visible: {
      type: Boolean,
      default: "",
      observer: async newVal => {
        if (!this.#states.isChildrenLoaded) {
          await customElements.whenDefined("ea-tour-step");
          this.#states.isChildrenLoaded = true;
        }

        this.#AbortControllerStates.currentChangeAbortController?.abort();
        this.current = 0;

        if (newVal) {
          this.#AbortControllerStates.currentChangeAbortController =
            new AbortController();

          /**
           * 更新可穿透位置
           */
          const onHollowShouldChangeEvent = () => {
            this.#updateHollowPosition(this.current);
          };

          if (this.mask) document.body.style.overflow = "hidden";

          this.#updateHollowPosition(this.current);

          window.addEventListener("resize", onHollowShouldChangeEvent, {
            signal:
              this.#AbortControllerStates.currentChangeAbortController.signal,
          });
          window.addEventListener("scroll", onHollowShouldChangeEvent, {
            signal:
              this.#AbortControllerStates.currentChangeAbortController.signal,
          });
        } else {
          if (this.mask) document.body.style.overflow = "auto";
        }

        this.updateContainerClasslist();
      },
    },
    gap: {
      type: Number,
      default: 6,
      observer: () => {},
    },
    current: {
      type: Number,
      default: 0,
      observer: async newVal => {
        if (!this.#states.isChildrenLoaded) {
          await customElements.whenDefined("ea-tour-step");
          this.#states.isChildrenLoaded = true;
        }

        /** @type {HTMLElement[]} */
        const children = [...this.querySelectorAll("ea-tour-step")];

        if (children.length === 0) return;
        if (newVal < 0) {
          this.current = 0;
          return;
        } else if (newVal >= children.length) {
          this.visible = false;
          return;
        }

        children.forEach((child, index) => {
          child.style.setProperty(
            "--ea-tour-step-visible",
            index === newVal ? "block" : "none"
          );
        });

        this.#updateHollowPosition(newVal);
      },
    },
    mask: {
      type: Boolean,
      default: true,
      observer: () => {
        this.updateContainerClasslist();
      },
    },
    type: {
      type: ["default", "primary"],
      default: "default",
      /** @param {"default" | "primary"} newVal */
      observer: newVal => {
        this.querySelectorAll("ea-tour-step").forEach(item => {
          if (newVal === "primary") item.setAttribute("type", newVal);
          else item.removeAttribute("type");
        });
      },
    },
    placement: {
      type: [
        "top",
        "top-start",
        "top-end",
        "bottom",
        "bottom-start",
        "bottom-end",
        "left",
        "left-start",
        "left-end",
        "right",
        "right-start",
        "right-end",
      ],
      default: "bottom",
      observer: newVal => {
        this.querySelectorAll("ea-tour-step").forEach(item => {
          if (!item.getAttribute("placement")) {
            item.setAttribute("placement", newVal);
          }
        });
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist(
      "ea-tour",
      {},
      {
        visible: this.visible,
        mask: this.mask,
        center: this.#states.isCenter,
      }
    );

    this.#container.className = className;

    return className;
  }

  constructor() {
    super();

    this.stylesheet = stylesheet;

    this.$render();

    this.#handleAppendTo(this["append-to"]);
  }

  $render() {
    this.shadowRoot.innerHTML = `
      <div class="ea-tour">
        <svg class="ea-tour__svg">
          <defs>
            <mask id="reverseMask">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              <rect class="ea-tour__hollow" part="hollow" x="50" y="50" width="100px" height="100px" fill="black" />
            </mask>
          </defs>
          <rect class='ea-tour__mask' x="0" y="0" width="100%" height="100%" mask="url(#reverseMask)"></rect>
          <rect class="ea-tour__divider top-mask" x="0" y="0" width="100%" height="50px"></rect>
          <rect class="ea-tour__divider right-mask" x="150px" y="0" width="100%" height="100%"></rect>
          <rect class="ea-tour__divider bottom-mask" x="0" y="150px" width="100%" height="100%"></rect>
          <rect class="ea-tour__divider left-mask" x="0" y="0" width="50px" height="100%"></rect>
        </svg>
      </div>
      <div class="ea-tour__content">
        <slot></slot>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-tour");
    this.#hollow = this.shadowRoot.querySelector(".ea-tour__hollow");
    this.#topMask = this.shadowRoot.querySelector(".ea-tour__divider.top-mask");
    this.#rightMask = this.shadowRoot.querySelector(
      ".ea-tour__divider.right-mask"
    );
    this.#bottomMask = this.shadowRoot.querySelector(
      ".ea-tour__divider.bottom-mask"
    );
    this.#leftMask = this.shadowRoot.querySelector(
      ".ea-tour__divider.left-mask"
    );
  }

  /**
   * 处理 append-to 属性
   * @param {string} selector
   */
  #handleAppendTo = async selector => {
    await customElements.whenDefined("ea-tour");

    const target = document.querySelector(selector);
    if (!target)
      console.warn(`[EaTour] append-to ${selector} not found.`, this);

    if (target) {
      target.appendChild(this);
    } else {
      document.body.appendChild(this);
    }
  };

  /**
   * 当未传入目标元素时，居中处理
   */
  #handleCenterPosition = () => {
    /** @type {HTMLElement[]} */
    const children = [...this.querySelectorAll("ea-tour-step")];

    this.#states.isCenter = true;
    children[this.current].setAttribute("center", true);

    this.#hollow.style.width = `0px`;
    this.#hollow.style.height = `0px`;
    this.#hollow.style.x = `0px`;
    this.#hollow.style.y = `0px`;

    this.#topMask.style.height = `100%`;
    this.#rightMask.style.x = `0`;
    this.#bottomMask.style.y = `0`;
    this.#leftMask.style.width = `100%`;

    this.updateContainerClasslist();
  };

  /**
   * 更新 提示元素 的位置
   * @param {HTMLElement} target 目标元素，即被聚焦的元素
   * @param {import("../ea-tour-step").EaTourStep} step 提示元素，即 step 元素
   * @returns {void}
   */
  #updateStepPosition = (target, step) => {
    const { width, height, x, y, top, bottom, left } =
      target.getBoundingClientRect();

    const gap = this.gap * 2;

    const childWidth = step.clientWidth || step.offsetWidth || 520;
    const childHeight = step.clientHeight || step.offsetHeight || 0;

    const innerW = window.innerWidth;
    const innerH = window.innerHeight;

    const placementStrategies = {
      top: {
        top: top - childHeight - gap,
        left: left - childWidth / 2 + gap,
      },
      "top-start": {
        top: top - childHeight - gap,
        left: left - gap,
      },
      "top-end": {
        top: top - childHeight - gap,
        left: left - childWidth + width + gap,
      },
      right: {
        top: top - gap - childHeight / 2 + height / 2,
        left: left + width + gap,
      },
      "right-start": {
        top: top - gap,
        left: left + width + gap,
      },
      "right-end": {
        top: top - childHeight / 2 - gap,
        left: left + width + gap,
      },
      bottom: {
        top: bottom + gap,
        left: left - childWidth / 2 + gap,
      },
      "bottom-start": {
        top: bottom + gap,
        left: left - gap,
      },
      "bottom-end": {
        top: bottom + gap,
        left: left - childWidth + width + gap,
      },
      left: {
        top: top - gap - childHeight / 2 + height / 2,
        left: left - childWidth - gap * 2,
      },
      "left-start": {
        top: top - gap,
        left: left - childWidth - gap * 2,
      },
      "left-end": {
        top: top - childHeight / 2 - gap,
        left: left - childWidth - gap * 2,
      },
    };

    const placement =
      step.placement || step.getAttribute?.("placement") || this.placement;
    const strategy = placementStrategies[placement];

    if (!strategy) {
      console.warn(`[EaTourStep] placement ${placement} is not supported.`);
      return;
    }

    let realTop = Number(strategy.top);
    let realLeft = Number(strategy.left);

    if (realTop < 0) {
      realTop = Math.max(realTop, y + gap + height);
    } else if (realTop + childHeight > innerH) {
      realTop = Math.min(realTop, y - childHeight - gap);
    }

    if (realLeft < 0) {
      realLeft = Math.max(realLeft, x + width + gap);
    } else if (realLeft + childWidth > innerW) {
      realLeft = Math.min(realLeft, x - childWidth - gap);
    }

    step.style.left = `${realLeft}px`;
    step.style.top = `${realTop}px`;
  };

  /**
   * 更新 提示容器 的位置
   * @param {number} [current] 当前步骤
   */
  #updateHollowPosition = (current = this.current) => {
    /** @type {HTMLElement[]} */
    const children = [...this.querySelectorAll("ea-tour-step")];
    const halfGap = this.gap / 2;

    const targetSelector = children[current].getAttribute("target");
    const target = document.querySelector(targetSelector);

    children[current].removeAttribute("center");
    this.#states.isCenter = false;

    if (!targetSelector) {
      return this.#handleCenterPosition();
    } else if (!target) {
      return console.warn(
        `[EaTour] target ${targetSelector} not found`,
        children[current]
      );
    }

    if (!isIntersecting(target)) {
      window.scrollTo({
        top: target.getBoundingClientRect().top,
      });
    }

    const { width, height, x, y, right, bottom } =
      target.getBoundingClientRect();

    // 更新 穿透部分 的位置
    this.#hollow.style.width = `${width + this.gap}px`;
    this.#hollow.style.height = `${height + this.gap}px`;
    this.#hollow.style.x = `${x - halfGap}px`;
    this.#hollow.style.y = `${y - halfGap}px`;

    // 更新 不可穿透的遮罩 的位置
    this.#topMask.style.height = `${y - halfGap}px`;
    this.#rightMask.style.x = `${right + halfGap}px`;
    this.#bottomMask.style.y = `${bottom + halfGap}px`;
    this.#leftMask.style.width = `${x - halfGap}px`;

    // 更新 步骤条 位置
    this.#updateStepPosition(target, children[current]);
  };

  connectedCallback() {
    super.connectedCallback();

    const dispatchChangeEvent = () => {
      this.emit("change", {
        detail: { current: this.current },
        bubbles: true,
        composed: true,
      });
    };

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.addEventListener(
      "ea-close",
      () => {
        this.visible = false;
      },
      { signal: this.#abortController.signal }
    );

    this.addEventListener(
      "next",
      e => {
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();

        this.current++;

        dispatchChangeEvent();
      },
      { signal: this.#abortController.signal }
    );
    this.addEventListener(
      "previous",
      e => {
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();

        this.current--;

        dispatchChangeEvent();
      },
      { signal: this.#abortController.signal }
    );
    this.addEventListener(
      "finish",
      () => {
        this.visible = false;
      },
      { signal: this.#abortController.signal }
    );
  }

  $beforeUnmounted() {
    this.#abortController?.abort();

    for (const key in this.#AbortControllerStates) {
      this.#AbortControllerStates[key] = null;
    }
  }
}

if (!window.customElements.get("ea-tour")) {
  window.customElements.define("ea-tour", EaTour);
}
