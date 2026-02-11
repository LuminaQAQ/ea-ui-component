import FormAssociatedBase from "@/core/FormBase";
import { namespace } from "@/directives/namespace";
import { Color } from "@/utils/Color";
import stylesheet from "./index.scss?inline";
import { EA_COMPONENT_SIZES } from "@/utils/Variables";

export class EaColorPicker extends FormAssociatedBase {
  #container;
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
    ];
  }

  state = this.properties({
    value: {
      type: String,
      default: "",
      observer: newVal => {
        this.#updateTriggerColor();
        this.#updateStatusIcon(newVal);
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
        // this.#updateInputValue();
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
        // if (this.#states.panel) {
        //   this.#states.panel.predefine = newVal;
        // }
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
        <div class="${ns.e("outer")}" part="outer">
          <div class="${ns.e("inner")}" part="inner"></div>
        </div>
        <div class="${ns.e("icon-wrapper")}" part="icon-wrapper">
          <ea-icon class="${ns.e("icon", "status")}" part="status-icon" icon="icon-cancel"></ea-icon>
        </div>
        <div class="${ns.e("panel")}" part="panel"></div>
      </div>
    `);

    this.#container = this.shadowRoot.querySelector(ns.cb());
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
  }

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
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
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
      // 无效颜色值时内部方框背景色为透明
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
