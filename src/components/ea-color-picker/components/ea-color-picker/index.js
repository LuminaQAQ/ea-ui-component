import FormAssociatedBase from "@/core/FormBase";
import { namespace } from "@/directives/namespace";
import { Color } from "@/utils/Color";
import stylesheet from "./index.scss?inline";
import { EA_COMPONENT_SIZES } from "@/utils/Variables";

import "../ea-color-picker-panel/index";
import "@/common/ea-popper/index";

export class EaColorPicker extends FormAssociatedBase {
  #container;
  /** @type {import("@/common/ea-popper").EaPopper} */
  #popper;
  #trigger;
  #outer;
  #inner;
  /** @type {import("@/components/ea-icon").EaIcon} */
  #statusIcon;
  #panel;

  #abortController = new AbortController();

  #states = {
    isOpen: false,
    isFocus: false,
    color: new Color(),
    panel: null,

    isPanelDefined: false,
  };

  #AbortControllerStates = {
    /** @type {AbortController | null} */
    close: null,
  };

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "value",
      "disabled",
      "clearable",
      "size",
      "color-format",
      "predefine",
      "tabindex",
      "placement",
    ];
  }

  state = this.properties({
    value: {
      type: String,
      default: "",
      observer: newVal => {
        this.#updateTriggerColor();
        this.#updateStatusIcon(newVal);
        this.#panel.setAttribute("value", newVal);
      },
    },
    disabled: {
      type: Boolean,
      default: false,
      observer: newVal => {
        // this.#input.toggleAttribute("disabled", newVal);
        this.updateContainerClasslist();
      },
    },
    clearable: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.updateContainerClasslist();
      },
    },
    size: {
      type: EA_COMPONENT_SIZES,
      default: "",
      observer: newVal => {
        this.updateContainerClasslist();
      },
    },
    "color-format": {
      type: ["hsl", "hsv", "hex", "rgb"],
      default: "hex",
      observer: newVal => {
        this.#panel.setAttribute("color-format", newVal);
      },
    },
    tabindex: {
      type: Number,
      default: 0,
      observer: newVal => {
        // this.#container.tabIndex = newVal;
      },
    },
  });

  propState = this.properties({
    predefine: {
      props: true,
      type: Array,
      default: () => [],
      observer: newVal => {
        // if (this.#panel) {
        //   this.#panel.predefine = newVal;
        // }
      },
    },
  });

  popperState = this.properties({
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
      default: "bottom-start",
      observer: newVal => {
        this.#popper.setAttribute("placement", newVal);
      },
    },
  });

  constructor() {
    super();
    this.stylesheet = stylesheet;
    this.$render();
  }

  $render() {
    const ns = namespace("color-picker");
    this.ns = ns;

    this.shadowRoot.innerHTML = this.html(`
      <div class="${ns.b("container")}" part="container" tabindex="${this.tabindex}">
        <ea-popper 
          class="${ns.e("popper")}" 
          part="popper"
          show-arrow="false"
        >
          <div class="${ns.e("trigger")}" part="trigger" slot="reference">
            <div class="${ns.e("outer")}" part="outer">
              <div class="${ns.e("inner")}" part="inner"></div>
            </div>
            <div class="${ns.e("icon-wrapper")}" part="icon-wrapper">
              <ea-icon class="${ns.e("icon", "status")}" part="status-icon" icon="icon-cancel"></ea-icon>
            </div>
          </div>
          <ea-color-picker-panel class="${ns.e("panel")}" part="panel"></ea-color-picker-panel>
        </ea-popper>
      </div>
    `);

    this.#container = this.shadowRoot.querySelector(ns.cb());
    this.#popper = this.shadowRoot.querySelector(ns.ce("popper"));
    this.#trigger = this.shadowRoot.querySelector(ns.ce("trigger"));
    this.#outer = this.shadowRoot.querySelector(ns.ce("outer"));
    this.#inner = this.shadowRoot.querySelector(ns.ce("inner"));
    this.#statusIcon = this.shadowRoot.querySelector(ns.ce("icon", "status"));
    this.#panel = this.shadowRoot.querySelector(ns.ce("panel"));

    this.updateContainerClasslist();
  }

  connectedCallback() {
    super.connectedCallback();
    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.#bindEvents();
  }

  #bindEvents() {
    if (!this.#trigger || !this.#popper) return;

    this.#trigger.addEventListener("click", this.#onTriggerClick.bind(this), {
      signal: this.#abortController.signal,
    });

    this.#popper.addEventListener("show", this.#onPopperShow.bind(this), {
      signal: this.#abortController.signal,
    });

    this.#popper.addEventListener("hide", this.#onPopperHide.bind(this), {
      signal: this.#abortController.signal,
    });

    this.#panel.addEventListener("change", this.#onPanelChange.bind(this), {
      signal: this.#abortController.signal,
    });
  }

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist(
      this.ns.b("container"),
      {
        ["--" + this.size]: this.size,
      },
      {
        "has-value": this.value,
        // disabled: this.disabled,
        // focus: this.#states.isFocus,
        // clearable: this.clearable && this.value,
        // open: this.#states.isOpen,
      }
    );

    this.#container.className = className;

    return className;
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }

  #onTriggerClick(e) {
    if (this.disabled) return;
    e.stopPropagation();

    this.#AbortControllerStates.close?.abort();
    this.#AbortControllerStates.close = new AbortController();

    this.#showPopper();

    document.addEventListener("click", this.#onDocumentClick.bind(this), {
      signal: this.#AbortControllerStates.close.signal,
    });
  }

  #onPopperShow() {
    this.#states.isOpen = true;
    this.updateContainerClasslist();
    this.emit("show");
  }

  #onPopperHide() {
    this.#states.isOpen = false;
    this.updateContainerClasslist();
    this.emit("hide");
  }

  #onPanelChange(e) {
    const { value } = e.detail;
    this.value = value;
    this.#updateTriggerColor();
    this.#updateStatusIcon();
    this.emit("change", { detail: { value } });
  }

  #onDocumentClick(e) {
    if (!this.#states.isOpen) return;
    if (!this.contains(e.target) && e.target !== this) {
      this.#hidePopper();
    }
  }

  #showPopper() {
    if (this.#popper) {
      this.#popper.show();
    }
  }

  #hidePopper() {
    if (this.#popper) {
      this.#popper.hide();
    }
  }

  /**
   * 更新触发元素的背景颜色
   */
  #updateTriggerColor() {
    if (!this.#inner) return;

    if (!this.value) {
      this.#inner.style.setProperty(
        "--ea-color-picker-inner-background-color",
        "transparent"
      );
      return;
    }

    try {
      const color = new Color(this.value);
      this.#inner.style.setProperty(
        "--ea-color-picker-inner-background-color",
        color.toRgb(true)
      );
    } catch (error) {
      this.#inner.style.setProperty(
        "--ea-color-picker-inner-background-color",
        "transparent"
      );
    }
  }

  /**
   * 更新状态图标
   * @param {string} colorValue - 颜色值
   */
  #updateStatusIcon(colorValue = this.value) {
    if (!this.#statusIcon) return;

    if (colorValue) {
      this.#statusIcon.setAttribute("icon", "icon-angle-down");
    } else {
      this.#statusIcon.setAttribute("icon", "icon-cancel");
    }
  }
}

if (!customElements.get("ea-color-picker")) {
  customElements.define("ea-color-picker", EaColorPicker);
}
