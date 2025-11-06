import Base from "@components/Base.js";
import stylesheet from "./index.scss?inline";
import EaUtils from "@/utils/Utils";

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

/**
 * 根据视口情况翻转 placement
 * @param {HTMLElement} el
 * @param {string} placement
 * @returns {string}
 */
const flipPlacement = (el, placement) => {
  const rect = el.getBoundingClientRect();
  const antiPlacement = {
    left: "right",
    right: "left",
    top: "bottom",
    bottom: "top",
  };
  const strategies = {
    top: rect.top < 0 && placement.includes("top"),
    bottom:
      rect.bottom + rect.height > window.innerHeight &&
      placement.includes("bottom"),
    left: rect.left < 0 && placement.includes("left"),
    right: rect.right > window.innerWidth && placement.includes("right"),
  };

  // if (isIntersecting(el)) return placement;

  for (const strategy in strategies) {
    if (strategies[strategy])
      return placement.replace(strategy, antiPlacement[strategy]);
  }

  return placement;
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
      observer: (newVal) => {},
    },
    visible: {
      type: Boolean,
      default: "",
      observer: async (newVal) => {
        this.#abortController?.abort();
        this.current = 0;
        this.updateContainerClasslist();

        if (newVal) {
          this.#abortController = new AbortController();

          if (this.mask) document.body.style.overflow = "hidden";

          this.#updateHollowPosition(this.current);

          window.addEventListener(
            "resize",
            () => {
              this.#updateHollowPosition(this.current);
            },
            { signal: this.#abortController.signal }
          );

          window.addEventListener(
            "scroll",
            (e) => {
              this.#updateHollowPosition(this.current);
            },
            { signal: this.#abortController.signal }
          );
        } else {
          if (this.mask) document.body.style.overflow = "auto";
        }
      },
    },
    gap: {
      type: Number,
      default: 6,
      observer: (newVal) => {},
    },
    current: {
      type: Number,
      default: 0,
      observer: async (newVal) => {
        /** @type {HTMLElement[]} */
        const children = [...this.querySelectorAll("ea-tour-step")];
        if (children.length === 0) return;
        if (newVal < 0) {
          return (this.current = 0);
        } else if (newVal >= children.length) {
          return (this.visible = false);
        }

        children.forEach((child, index) => {
          child.style.setProperty(
            "--ea-tour-step-visible",
            index === newVal ? "block" : "none"
          );
        });

        this.#updateHollowPosition(newVal);
        this.#updateSwitchvisibleStatus(newVal);
      },
    },
    mask: {
      type: Boolean,
      default: true,
      observer: (newVal) => {
        this.updateContainerClasslist();
      },
    },
    type: {
      type: ["default", "primary"],
      default: "default",
      observer: (newVal) => {
        if (newVal !== "default")
          this.querySelectorAll("ea-tour-step").forEach((item) => {
            item.setAttribute("type", newVal);
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
      observer: (newVal) => {
        this.querySelectorAll("ea-tour-step").forEach((item) => {
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
      {
        // ["--visible"]: this.visible,
      },
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

    this.addEventListener("close", (e) => {
      this.visible = false;
    });

    this.addEventListener("next", (e) => {
      this.current++;
    });
    this.addEventListener("previous", (e) => {
      this.current--;
    });
    this.addEventListener("finish", (e) => {
      this.visible = false;
    });
  }

  #handleAppendTo = (selector) => {
    const target = document.querySelector(selector);
    if (target) {
      target.appendChild(this);
    } else {
      document.body.appendChild(this);
      console.warn(`[EaTour] append-to ${selector} not found.`, this);
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
   * 根据视口情况翻转 placement
   * @param {HTMLElement} el
   * @param {string} placement
   * @returns {string}
   */
  #handleFlipPlacement = (el, placement) => {
    const rect = el.getBoundingClientRect();
    const antiPlacement = {
      left: "right",
      right: "left",
      top: "bottom",
      bottom: "top",
    };
    const strategies = {
      top: rect.top < 0 && placement.includes("top"),
      bottom:
        rect.bottom + rect.height > window.innerHeight &&
        placement.includes("bottom"),
      left: rect.left < 0 && placement.includes("left"),
      right: rect.right > window.innerWidth && placement.includes("right"),
    };

    for (const strategy in strategies) {
      if (strategies[strategy]) {
        let temp = placement.replace(strategy, antiPlacement[strategy]);

        return placement.replace(strategy, antiPlacement[strategy]);
      }
    }

    return placement;
  };

  #updateStepPosition = (target, step) => {
    const { width, height, x, y, top, right, bottom, left } =
      target.getBoundingClientRect();
    const gap = this.gap * 2;
    const childWidth = step.clientWidth || 520;
    const childHeight = step.clientHeight;

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
        left: left - childWidth - gap,
      },
      "left-start": {
        top: top - gap,
        left: left - childWidth - gap,
      },
      "left-end": {
        top: top - childHeight / 2 - gap,
        left: left - childWidth - gap,
      },
    };

    try {
      const [placement, direction] = step.placement.split("-");
      let realTop = placementStrategies[step.placement].top;
      let realLeft = placementStrategies[step.placement].left;

      if (realTop + childHeight > window.innerHeight) {
        realTop =
          placementStrategies[placement === "bottom" ? "top" : "bottom"];
        
        step.style.left = `${realLeft}px`;
        step.style.top = `${realTop}px`;
      }

      if (realLeft + childWidth > window.innerWidth) {
        realLeft =
          placementStrategies[placement === "right" ? "left" : "right"];
        
        step.style.left = `${realLeft}px`;
        step.style.top = `${realTop}px`;
      }

      if (realLeft < 0) {
        realLeft =
          placementStrategies[placement === "left" ? "right" : "left"];
        
        step.style.left = `${realLeft}px`;
        step.style.top = `${realTop}px`;
      }


        
    } catch (error) {
      console.warn(
        `[EaTourStep] placement ${step.placement} is not supported.`
      );
    }
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

    const { width, height, x, y, top, right, bottom, left } =
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

  #updateSwitchvisibleStatus = (current = this.current) => {
    // if (current === 0) {
    //   this.#previousBtn.style.display = "none";
    // }
  };

  #waitChildLoaded = async () => {
    if (this.#states.isChildrenLoaded) return;

    await Promise.all(
      [...this.querySelectorAll("ea-tour-step")].map((item) =>
        EaUtils.EaElement.addAsyncEventListener(item, "ea-tour-step-ready")
      )
    );
    this.#states.isChildrenLoaded = true;
  };

  connectedCallback() {
    super.connectedCallback();
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }
}

if (!window.customElements.get("ea-tour")) {
  window.customElements.define("ea-tour", EaTour);
}
