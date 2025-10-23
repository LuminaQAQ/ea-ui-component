import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";
import EaUtils from "@/utils/Utils";

export class EaTour extends Base {
  /** @type {HTMLElement} */
  #container;

  #states = {
    current: 0,
    isChildrenLoaded: false,
  };

  static get observedAttributes() {
    return [...super.observedAttributes, "visible"];
  }

  state = this.properties({
    visible: {
      type: Boolean,
      default: "",
      observer: async (newVal) => {
        if (!this.#states.isChildrenLoaded) {
          await Promise.all(
            [...this.children].map(async (child) =>
              EaUtils.EaElement.addAsyncEventListener(
                child,
                "ea-tour-step-ready"
              )
            )
          );
        }

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
          <rect class="ea-tour__divider" x="0" y="0" width="100%" height="50px"></rect>
          <rect class="ea-tour__divider" x="150px" y="0" width="100%" height="100%"></rect>
          <rect class="ea-tour__divider" x="0" y="150px" width="100%" height="100%"></rect>
          <rect class="ea-tour__divider" x="0" y="0" width="50px" height="100%"></rect>
        </svg>
      </div>
      <div class="ea-tour__content">
        <slot></slot>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-tour");
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

if (!window.customElements.get("ea-tour")) {
  window.customElements.define("ea-tour", EaTour);
}
