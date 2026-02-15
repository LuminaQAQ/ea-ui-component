import Base from "@components/Base.js";
import { namespace } from "@/directives/namespace";
import { Color } from "@/utils/Color";
import stylesheet from "./index.scss?inline";
import "@components/ea-input/index";
import EaUtils from "@/utils/Utils";
import { EaColorPickerActiveChangeEvent } from "../../events/EaColorPickerActiveChangeEvent";
import { EaColorPickerPanelInvalidColorEvent } from "../../events/EaColorPickerPanelInvalidColorEvent";

export class EaColorPickerPanel extends Base {
  /** @type {HTMLDivElement} */
  #container;
  /** @type {HTMLDivElement} */
  #saturation;
  /** @type {HTMLDivElement} */
  #saturationThumb;
  /** @type {HTMLDivElement} */
  #hue;
  /** @type {HTMLDivElement} */
  #hueThumb;
  /** @type {HTMLDivElement} */
  #alpha;
  /** @type {HTMLDivElement} */
  #alphaGradient;
  /** @type {HTMLDivElement} */
  #alphaThumb;
  /** @type {HTMLDivElement} */
  #predefineList;
  /** @type {HTMLInputElement} */
  #colorInput;
  /** @type {HTMLDivElement} */
  #textDisplay;

  #abortController = new AbortController();

  #AbortControllerStates = {
    /** @type {AbortController | null} 饱和度拖拽控制器 */
    saturationMove: null,
    /** @type {AbortController | null} 色调拖拽控制器 */
    hueMove: null,
    /** @type {AbortController | null} 透明度拖拽控制器 */
    alphaMove: null,
  };

  #states = {
    /** @type {boolean} 是否首次更新值 */
    isFirstValueUpdate: false,
    /** @type {number} 色调值 (0-360) */
    hue: 0,
    /** @type {number} 饱和度值 (0-1) */
    saturation: 1,
    /** @type {number} 亮度值 (0-1) */
    value: 1,
    /** @type {number} 透明度值 (0-1) */
    alpha: 1,
    /** @type {import("@/utils/Color").Color} 当前颜色对象 */
    color: new Color(),
    /** @type {boolean} 是否正在拖拽 */
    isDragging: false,
    /** @type {string} 上一个验证通过的颜色值 */
    lastValidValue: "",
  };

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "value",
      "color-format",
      "predefine",
      "show-alpha",
      "disabled",
      "border",
      "clearable",
    ];
  }

  state = this.properties({
    value: {
      type: String,
      default: "",
      observer: newVal => {
        this.#states.lastValidValue = newVal;
        this.#updateCursorPosition();
        this.#updateSvpanelStatus();
        this.#updateColorInputValue();
      },
    },
    "color-format": {
      type: ["hsl", "hsv", "hex", "rgb", "rgba"],
      default: () => (this.hasAttribute("show-alpha") ? "rgba" : "hex"),
      observer: newVal => {
        if (this.value) {
          this.value = this.#states.color.toString(newVal);
        }
      },
    },
    "show-alpha": {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.updateContainerClasslist();
      },
    },
    disabled: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.updateContainerClasslist();
      },
    },
    border: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.updateContainerClasslist();
      },
    },
    clearable: {
      type: Boolean,
      default: true,
      observer: newVal => {
        this.#updateTextDisplayMode();
      },
    },
  });

  propStates = this.properties({
    predefine: {
      props: true,
      type: Array,
      default: [],
      observer: newVal => {
        this.#renderPredefineColors(newVal);
      },
    },
  });

  constructor() {
    super();
    this.stylesheet = stylesheet;
    this.$render();
  }

  $render() {
    const ns = namespace("color-picker-panel");
    this.ns = ns;

    this.shadowRoot.innerHTML = this.html(`
      <div class="${ns.b()}" part="container">
        <div class="${ns.e("wrapper")}" part="wrapper">
          <div class="${ns.e("svpanel")}" part="svpanel">
            <div class="${ns.e("cursor")} ${ns.e("svpanel-cursor")}" part="svpanel-cursor"></div>
          </div>
          <div class="${ns.e("hue-slider")} ${ns.m("vertical")}" part="hue-slider">
            <div class="${ns.e("thumb")} ${ns.e("hue-slider-thumb")}" part="hue-slider-thumb"></div>
          </div>
        </div>
        <div class="${ns.e("alpha-slider")}" part="alpha-slider">
          <div class="${ns.e("thumb")} ${ns.e("alpha-slider-thumb")}" part="alpha-slider-thumb"></div>
        </div>
        <div class="${ns.e("predefine")}" part="predefine">
          <div class="${ns.e("colors")}" part="predefine-colors"></div>
        </div>
        <div class="${ns.e("footer")}" part="footer">
          <div class="${ns.e("text-display")}" part="text-display"></div>
          <ea-input class="${ns.e("color-input")}" part="color-input" type="text" size="small"></ea-input>
          <section class="${ns.e("append")}" part="append">
            <slot name="footer"></slot>
          </section>
        </div>
      </div>
    `);

    this.#container = this.shadowRoot.querySelector(ns.cb());
    this.#saturation = this.shadowRoot.querySelector(ns.ce("svpanel"));
    this.#saturationThumb = this.shadowRoot.querySelector(
      ns.ce("svpanel-cursor")
    );
    this.#hue = this.shadowRoot.querySelector(ns.ce("hue-slider"));
    this.#hueThumb = this.shadowRoot.querySelector(ns.ce("hue-slider-thumb"));
    this.#alpha = this.shadowRoot.querySelector(ns.ce("alpha-slider"));
    this.#alphaGradient = this.shadowRoot.querySelector(
      ns.ce("alpha-slider-bar")
    );
    this.#alphaThumb = this.shadowRoot.querySelector(
      ns.ce("alpha-slider-thumb")
    );
    this.#predefineList = this.shadowRoot.querySelector(ns.ce("predefine"));
    this.#colorInput = this.shadowRoot.querySelector(ns.ce("color-input"));
    this.#textDisplay = this.shadowRoot.querySelector(ns.ce("text-display"));

    this.updateContainerClasslist();
    this.#updateTextDisplayMode();
  }

  connectedCallback() {
    super.connectedCallback();
    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.#bindEvents();
  }

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist(
      this.ns.b("container"),
      {},
      {
        disabled: this.disabled,
        border: this.border,
        "show-alpha": this["show-alpha"],
        clearable: this.clearable,
      }
    );

    this.#container.className = className;

    return className;
  }

  /**
   * 绑定组件事件监听器
   */
  #bindEvents() {
    this.#saturation.addEventListener(
      "mousedown",
      this.#onSaturationMouseDown.bind(this),
      {
        signal: this.#abortController.signal,
      }
    );

    this.#hue.addEventListener("mousedown", this.#onHueMouseDown.bind(this), {
      signal: this.#abortController.signal,
    });

    this.#alpha.addEventListener(
      "mousedown",
      this.#onAlphaMouseDown.bind(this),
      {
        signal: this.#abortController.signal,
      }
    );

    this.#colorInput.addEventListener(
      "change",
      this.#onColorInputChange.bind(this),
      {
        signal: this.#abortController.signal,
      }
    );

    this.#colorInput.addEventListener(
      "blur",
      this.#onColorInputBlur.bind(this),
      {
        signal: this.#abortController.signal,
      }
    );

    if (this.#predefineList) {
      this.#predefineList.addEventListener(
        "click",
        this.#onPredefineListClick.bind(this),
        {
          signal: this.#abortController.signal,
        }
      );
    }
  }

  /**
   * 处理饱和度和值的更新
   * @param {MouseEvent} e - 鼠标事件对象
   */
  #onSaturationMouseDown(e) {
    this.#AbortControllerStates.saturationMove?.abort();
    this.#AbortControllerStates.hueMove?.abort();
    if (this.disabled) return;

    e.preventDefault();

    this.#AbortControllerStates.saturationMove = new AbortController();
    this.#states.isDragging = true;

    /**
     * 处理饱和度和值的更新
     * @param {MouseEvent} e - 鼠标事件对象
     */
    const handleValueUpdate = e => {
      const rect = this.#saturation.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));

      const saturation = x / rect.width;
      const value = 1 - y / rect.height;

      this.#states.saturation = saturation;
      this.#states.value = value;

      this.#states.color.setValue({
        h: this.#states.hue,
        s: saturation,
        v: value,
        a: this.#states.alpha,
      });

      this.value = this.#states.color.toString(this["color-format"]);
      this.#emitChangeEvent();

      this.#saturationThumb.style.left = saturation * rect.width + "px";
      this.#saturationThumb.style.top = (1 - value) * rect.height + "px";
    };

    handleValueUpdate(e);
    window.addEventListener("mousemove", handleValueUpdate, {
      signal: this.#AbortControllerStates.saturationMove.signal,
    });

    window.addEventListener(
      "mouseup",
      () => {
        this.#AbortControllerStates.saturationMove?.abort();
        this.#states.isDragging = false;
      },
      {
        signal: this.#AbortControllerStates.saturationMove.signal,
      }
    );
  }

  /**
   * 处理色调的更新
   * @param {MouseEvent} e - 鼠标事件对象
   */
  #onHueMouseDown(e) {
    this.#AbortControllerStates.hueMove?.abort();
    this.#AbortControllerStates.saturationMove?.abort();
    if (this.disabled) return;

    e.preventDefault();

    this.#AbortControllerStates.hueMove = new AbortController();
    this.#states.isDragging = true;

    /**
     * 处理色调的更新
     * @param {MouseEvent} e - 鼠标事件对象
     */
    const handleHueUpdate = e => {
      const rect = this.#hue.getBoundingClientRect();
      const y = Math.max(0.01, Math.min(e.clientY - rect.top, rect.height));

      const hue = (1 - y / rect.height) * 360;

      this.#states.hue = hue;

      this.#states.color.setValue({
        h: hue,
        s: this.#states.saturation,
        v: this.#states.value,
        a: this.#states.alpha,
      });

      this.value = this.#states.color.toString(this["color-format"]);
      this.#emitChangeEvent();

      this.#hueThumb.style.top = (1 - hue / 360) * rect.height + "px";

      this.#updateSvpanelStatus();
    };

    handleHueUpdate(e);
    window.addEventListener("mousemove", handleHueUpdate, {
      signal: this.#AbortControllerStates.hueMove.signal,
    });

    window.addEventListener(
      "mouseup",
      () => {
        this.#AbortControllerStates.hueMove?.abort();
        this.#states.isDragging = false;
      },
      {
        signal: this.#AbortControllerStates.hueMove.signal,
      }
    );
  }

  /**
   * 处理透明度的更新
   * @param {MouseEvent} e - 鼠标事件对象
   */
  #onAlphaMouseDown(e) {
    this.#AbortControllerStates.alphaMove?.abort();
    this.#AbortControllerStates.saturationMove?.abort();
    this.#AbortControllerStates.hueMove?.abort();
    if (this.disabled) return;

    e.preventDefault();

    this.#AbortControllerStates.alphaMove = new AbortController();
    this.#states.isDragging = true;

    /**
     * 处理透明度的更新
     * @param {MouseEvent} e - 鼠标事件对象
     */
    const handleAlphaUpdate = e => {
      const rect = this.#alpha.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));

      const alpha = Number((x / rect.width).toFixed(2));

      if (Math.abs(this.#states.alpha - alpha) > 0.001) {
        this.#states.alpha = alpha;

        this.#states.color.setValue({
          h: this.#states.hue,
          s: this.#states.saturation,
          v: this.#states.value,
          a: alpha,
        });

        this.value = this.#states.color.toString(this["color-format"]);
        this.#emitChangeEvent();

        this.#alphaThumb.style.left = alpha * rect.width + "px";
      }
    };

    handleAlphaUpdate(e);
    window.addEventListener("mousemove", handleAlphaUpdate, {
      signal: this.#AbortControllerStates.alphaMove.signal,
    });

    window.addEventListener(
      "mouseup",
      () => {
        this.#AbortControllerStates.alphaMove?.abort();
        this.#states.isDragging = false;
      },
      {
        signal: this.#AbortControllerStates.alphaMove.signal,
      }
    );
  }

  /**
   * 更新光标位置
   */
  #updateCursorPosition() {
    if (!this.#states.isFirstValueUpdate) {
      this.#states.color.setValue(this.value);

      const match = this.#states.color.hsvStrToHsvObject(
        this.#states.color.toHsv(true)
      );

      if (match) {
        const h = parseInt(match.h);
        const s = match.s;
        const v = match.v;
        const a = match.a ? parseFloat(match.a) : 1;

        this.#states.hue = h;
        this.#states.saturation = s;
        this.#states.value = v;
        this.#states.alpha = a;
      }

      this.#states.isFirstValueUpdate = true;
    }

    if (this.#saturationThumb && this.#saturation) {
      const saturation = this.#states.saturation;
      const value = this.#states.value;

      const rect = this.#saturation.getBoundingClientRect();
      const svpanelWidth =
        EaUtils.CSS.px2num(
          this.style.getPropertyValue("--ea-color-picker-panel-svpanel-width")
        ) || 280;
      const svpanelHeight =
        EaUtils.CSS.px2num(
          this.style.getPropertyValue("--ea-color-picker-panel-svpanel-height")
        ) || 180;
      const width = Math.max(
        0,
        Math.min(rect.width, svpanelWidth),
        svpanelWidth
      );
      const height = Math.max(
        0,
        Math.min(rect.height, svpanelHeight),
        svpanelHeight
      );
      const x = saturation * width;
      const y = (1 - value) * height;

      this.#saturationThumb.style.left = x + "px";
      this.#saturationThumb.style.top = y + "px";
    }

    if (this.#hueThumb && this.#hue) {
      const hue = this.#states.hue;

      const rect = this.#hue.getBoundingClientRect();
      const hueHeight =
        EaUtils.CSS.px2num(
          this.style.getPropertyValue(
            "--ea-color-picker-panel-hue-slider-height"
          )
        ) || 180;
      const height = Math.max(0, Math.min(rect.height, hueHeight), hueHeight);
      const y = (1 - hue / 360) * height;

      this.#hueThumb.style.top = y + "px";
    }

    if (this.#alphaThumb && this.#alpha) {
      const alpha = this.#states.alpha;

      const rect = this.#alpha.getBoundingClientRect();
      const alphaWidth =
        EaUtils.CSS.px2num(
          this.style.getPropertyValue(
            "--ea-color-picker-panel-alpha-slider-width"
          )
        ) || 280;
      const width = Math.max(0, Math.min(rect.width, alphaWidth), alphaWidth);
      const x = alpha * width;

      this.#alphaThumb.style.left = x + "px";
    }
  }

  /**
   * 更新饱和度面板的背景颜色
   */
  #updateSvpanelStatus = () => {
    const color = new Color({
      h: this.#states.hue,
      s: 1,
      v: 1,
      a: 1,
    });

    this.#saturation.style.setProperty(
      "--ea-color-picker-panel-background-color",
      color.toString(this["color-format"])
    );
  };

  $beforeUnmounted() {
    this.#abortController?.abort();
  }

  /**
   * 处理颜色输入框变化事件
   * @param {Event} e - 事件对象
   */
  #onColorInputChange(e) {
    const value = e.target.value;
    try {
      const color = new Color(value);
      this.value = color.toString(this["color-format"]);
      this.#emitChangeEvent();
    } catch (error) {
      this.#colorInput.value = this.value;
    }
  }

  /**
   * 触发颜色变化事件
   */
  #emitChangeEvent() {
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: {
          value: this.value,
          color: this.#states.color,
        },
        bubbles: true,
        composed: true,
      })
    );

    this.dispatchEvent(
      new EaColorPickerActiveChangeEvent({ value: this.value })
    );
  }

  /**
   * 渲染预设颜色列表
   * @param {Array} list - 预设颜色列表
   */
  #renderPredefineColors(list) {
    if (!list || list.length === 0) {
      return;
    }

    this.#predefineList.innerHTML = this.html(
      list
        .map(
          color => `
          <div class="${this.ns.e("predefine-color")}" 
            part="predefine-color" 
            style="background-color: ${color}"
            data-color="${color}"
          ></div>
        `
        )
        .join("")
    );
  }

  /**
   * 处理预设颜色点击事件
   * @param {MouseEvent} e - 鼠标事件对象
   */
  #onPredefineListClick(e) {
    if (this.disabled) return;

    const colorElement = e.target.closest(this.ns.ce("predefine-color"));
    if (!colorElement) return;

    const colorValue = colorElement.getAttribute("data-color");
    if (colorValue) {
      this.#updateColorFromValue(colorValue);
    }
  }

  /**
   * 根据颜色值更新所有相关状态
   * @param {string} colorValue - 颜色值字符串
   */
  #updateColorFromValue(colorValue) {
    this.#updateColorInputValue();

    this.value = colorValue;

    this.#states.color.setValue(colorValue);

    const match = this.#states.color.hsvStrToHsvObject(
      this.#states.color.toHsv(true)
    );

    if (match) {
      const h = parseInt(match.h);
      const s = match.s;
      const v = match.v;
      const a = match.a ? parseFloat(match.a) : 1;

      this.#states.hue = h;
      this.#states.saturation = s;
      this.#states.value = v;
      this.#states.alpha = a;
    }

    this.#updateCursorPosition();
    this.#updateSvpanelStatus();

    this.#emitChangeEvent();
  }

  /**
   * 更新文字展示模式
   */
  #updateTextDisplayMode() {
    if (!this.#colorInput || !this.#textDisplay) return;

    this.#updateColorInputValue();

    this.updateContainerClasslist();
  }

  /**
   * 更新颜色输入框的值
   */
  #updateColorInputValue() {
    if (this.clearable && this.#colorInput) {
      this.#colorInput.setAttribute("value", this.value);
    } else if (!this.clearable && this.#textDisplay) {
      this.#textDisplay.textContent = this.value;
    }
  }

  /**
   * 处理颜色输入框blur事件
   * @param {FocusEvent} e - 焦点事件对象
   */
  #onColorInputBlur(e) {
    if (!this.#colorInput) return;

    const inputValue = this.#colorInput.getAttribute("value") || "";

    if (!inputValue) {
      this.value = "";
      this.#states.lastValidValue = "";
      return;
    }

    const isValid = this.#validateColor(inputValue);

    if (isValid) {
      this.#states.lastValidValue = inputValue;
      this.#updateColorFromValue(inputValue);
    } else {
      this.#colorInput.setAttribute("value", this.#states.lastValidValue || "");

      this.dispatchEvent(
        new EaColorPickerPanelInvalidColorEvent({ value: inputValue })
      );
    }
  }

  /**
   * 验证颜色格式是否合法
   * @param {string} colorValue - 颜色值
   * @returns {boolean} 是否合法
   */
  #validateColor(colorValue) {
    return Color.isValidColor(colorValue);
  }
}

if (!customElements.get("ea-color-picker-panel")) {
  customElements.define("ea-color-picker-panel", EaColorPickerPanel);
}
