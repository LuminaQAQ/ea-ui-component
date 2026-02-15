import FormAssociatedBase from "@/core/FormBase";
import { namespace } from "@/directives/namespace";
import { Color } from "@/utils/Color";
import stylesheet from "./index.scss?inline";
import { EA_COMPONENT_SIZES } from "@/utils/Variables";

import "../ea-color-picker-panel/index";
import "@/common/ea-popper/index";
import "@components/ea-button/index";
import { EaColorPickerClearEvent } from "../../events/EaColorPickerClearEvent";

export class EaColorPicker extends FormAssociatedBase {
  /** @type {HTMLDivElement} */
  #container;
  /** @type {import("@/common/ea-popper").EaPopper} */
  #popper;
  /** @type {HTMLDivElement} */
  #trigger;
  /** @type {HTMLDivElement} */
  #outer;
  /** @type {HTMLDivElement} */
  #inner;
  /** @type {import("@/components/ea-icon").EaIcon} */
  #statusIcon;
  /** @type {import("@/components/ea-color-picker-panel").EaColorPickerPanel} */
  #panel;

  /** @type {import("@/components/ea-button").EaButton} */
  #clearBtn;
  /** @type {import("@/components/ea-button").EaButton} */
  #confirmBtn;

  #abortController = new AbortController();

  #states = {
    /** @type {boolean} 弹窗是否打开 */
    isOpen: false,
    /** @type {import("@/utils/Color").Color} 当前颜色对象 */
    color: new Color(),

    isPanelDefined: false,
    /** @type {string} 打开面板前的颜色值 */
    previousValue: "",
  };

  #AbortControllerStates = {
    /** @type {AbortController | null} 关闭弹窗的控制器 */
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
      "show-alpha",
      "clearable",
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
    "show-alpha": {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.#panel.setAttribute("show-alpha", newVal);
      },
    },
    clearable: {
      type: Boolean,
      default: true,
      observer: newVal => {
        this.#panel.setAttribute("clearable", newVal);
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
      default: [],
      observer: async newVal => {
        if (!this.#states.isPanelDefined) {
          await customElements.whenDefined("ea-color-picker-panel");
          this.#states.isPanelDefined = true;
        }

        this.#panel.predefine = newVal;
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
      default: "bottom",
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
          <ea-color-picker-panel class="${ns.e("panel")}" part="panel">
            <div slot="footer" class="${ns.e("footer-actions")}" part="footer-actions">
              <ea-button class="${ns.e("clear-btn")}" part="clear-btn" plain text>clear</ea-button>
              <ea-button class="${ns.e("confirm-btn")}" part="confirm-btn" plain>ok</ea-button>
            </div>
          </ea-color-picker-panel>
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
    this.#clearBtn = this.shadowRoot.querySelector(this.ns.ce("clear-btn"));
    this.#confirmBtn = this.shadowRoot.querySelector(this.ns.ce("confirm-btn"));

    this.updateContainerClasslist();
  }

  connectedCallback() {
    super.connectedCallback();
    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.#bindEvents();
  }

  /**
   * 绑定组件事件监听器
   */
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

    this.#clearBtn.addEventListener("click", this.#onClearClick.bind(this), {
      signal: this.#abortController.signal,
    });

    this.#confirmBtn.addEventListener(
      "click",
      this.#onConfirmClick.bind(this),
      {
        signal: this.#abortController.signal,
      }
    );
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
        disabled: this.disabled,
      }
    );

    this.#container.className = className;

    return className;
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }

  /**
   * 处理触发器点击事件
   * @param {MouseEvent} e - 鼠标事件对象
   */
  #onTriggerClick(e) {
    if (this.disabled) return;

    this.#AbortControllerStates.close?.abort();
    this.#AbortControllerStates.close = new AbortController();

    this.#states.previousValue = this.value;

    this.#showPopper();

    document.addEventListener("click", this.#onDocumentClick.bind(this), {
      signal: this.#AbortControllerStates.close.signal,
    });
  }

  /**
   * 处理弹窗显示事件
   */
  #onPopperShow() {
    this.#states.isOpen = true;
    this.updateContainerClasslist();
  }

  /**
   * 处理弹窗隐藏事件
   */
  #onPopperHide() {
    this.#states.isOpen = false;
    this.updateContainerClasslist();

    if (
      this.#states.previousValue !== undefined &&
      this.#states.previousValue !== this.value
    ) {
      this.value = this.#states.previousValue;
      this.#updateTriggerColor();
      this.#updateStatusIcon();
    }
  }

  /**
   * 处理面板颜色变化事件
   * @param {CustomEvent} e - 自定义事件对象
   */
  #onPanelChange(e) {
    const { value } = e.detail;
    this.value = value;
    this.#updateTriggerColor();
    this.#updateStatusIcon();
  }

  /**
   * 处理文档点击事件（用于关闭弹窗）
   * @param {MouseEvent} e - 鼠标事件对象
   */
  #onDocumentClick(e) {
    if (!this.#states.isOpen) return;
    if (!this.contains(e.target) || e.target !== this) {
      this.#hidePopper();
    }
  }

  /**
   * 显示颜色选择器弹窗
   */
  #showPopper() {
    if (this.#popper) {
      this.#popper.show();
    }
  }

  /**
   * 隐藏颜色选择器弹窗
   */
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

    this.#statusIcon.setAttribute(
      "icon",
      colorValue ? "icon-angle-down" : "icon-cancel"
    );
  }

  /**
   * 处理清除按钮点击事件
   */
  #onClearClick() {
    this.value = "";
    this.#updateTriggerColor();
    this.#updateStatusIcon();
    this.emit("change", { detail: { value: "" } });
    this.dispatchEvent(new EaColorPickerClearEvent());

    this.#states.previousValue = "";
    this.#hidePopper();
  }

  /**
   * 处理确认按钮点击事件
   */
  #onConfirmClick() {
    this.#states.previousValue = this.value;
    this.#hidePopper();
  }

  /**
   * 手动显示颜色选择器面板
   */
  show() {
    this.#showPopper();
  }

  /**
   * 手动隐藏颜色选择器面板
   */
  hide() {
    this.#hidePopper();
  }

  /**
   * 使颜色选择器获得焦点
   */
  focus() {
    if (this.#container) {
      this.#container.focus();
    }
  }

  /**
   * 使颜色选择器失去焦点
   */
  blur() {
    if (this.#container) {
      this.#container.blur();
    }
  }
}

if (!customElements.get("ea-color-picker")) {
  customElements.define("ea-color-picker", EaColorPicker);
}
