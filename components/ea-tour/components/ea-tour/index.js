import Base from "@components/Base.js";
import stylesheet from "./index.scss?inline";
import EaUtils from "@/utils/Utils";

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

  #states = {
    isChildrenLoaded: false,
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
        this.current = 0;
        this.updateContainerClasslist();
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

        this.#updateHollowPosition(newVal);
        this.#updateSwitchvisibleStatus(newVal);

        children.forEach((child, index) => {
          child.style.setProperty(
            "--ea-tour-step-visible",
            index === newVal ? "block" : "none"
          );
        });
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
   * 更新 提示容器 的位置
   * @param {number} [current] 当前步骤
   */
  #updateHollowPosition = (current = this.current) => {
    /** @type {HTMLElement[]} */
    const children = [...this.querySelectorAll("ea-tour-step")];
    const halfGap = this.gap / 2;

    const targetSelector = children[current].getAttribute("target");
    const target = document.querySelector(targetSelector);
    if (!target)
      return console.warn(
        `[EaTour] target ${targetSelector} not found`,
        children[current]
      );

    const { width, height, x, y, top, right, bottom, left } =
      target.getBoundingClientRect();
    const child = children[current];
    const childWidth =
      child.style.getPropertyValue("--ea-tour-step-width") || "520px";
    // console.log(left, childWidth);
    const computedChildLeft = (targetWidth, targetLeft) => {
      const windowWidth = window.innerWidth;
      const originLeft = targetLeft - targetWidth / 2;
      let left = 0;

      if (originLeft < 0) {
        left = 0;
      }

      if (originLeft > windowWidth) {
        left = windowWidth - targetWidth;
      }

      if (originLeft < windowWidth && originLeft > 0) {
        left = originLeft;
      }

      return left;

      // if (windowWidth - targetWidth < targetLeft) {
      //   // return Math.abs(windowWidth - (targetWidth + targetLeft));
      //   return Math.abs(windowWidth - targetWidth);
      // } else if (targetLeft + targetWidth > windowWidth) {
      //   return Math.abs(targetLeft - (windowWidth - targetWidth));
      // } else {
      //   return 0;
      // }
    };

    // 更新 提示容器 的位置
    child.style.top = `${top + height + 18}px`;
    child.style.left = `${computedChildLeft(
      EaUtils.CSS.px2num(childWidth),
      left
    )}px`;

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
  };

  #updateSwitchvisibleStatus = (current = this.current) => {
    // if (current === 0) {
    //   this.#previousBtn.style.display = "none";
    // }
  };

  connectedCallback() {
    super.connectedCallback();
  }
}

if (!window.customElements.get("ea-tour")) {
  window.customElements.define("ea-tour", EaTour);
}
