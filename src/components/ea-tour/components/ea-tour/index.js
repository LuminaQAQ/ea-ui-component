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
    return [...super.observedAttributes, "visible", "current", "gap"];
  }

  state = this.properties({
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
      }
    );

    this.#container.className = className;

    return className;
  }

  constructor() {
    super();

    this.stylesheet = stylesheet;

    this.$render();

    document.body.appendChild(this);
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
    // 更新 提示容器 的位置
    children[current].style.top = `${top + height + 18}px`;

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
