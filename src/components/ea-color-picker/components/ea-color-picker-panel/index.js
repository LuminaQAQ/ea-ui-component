import Base from "@components/Base.js";
import { namespace } from "@/directives/namespace";
import { Color } from "@/utils/Color";
import stylesheet from "./index.scss?inline";

export class EaColorPickerPanel extends Base {
  #container;
  #saturation;
  #saturationThumb;
  #hue;
  #hueThumb;
  #alpha;
  #alphaGradient;
  #alphaThumb;
  #predefineList;
  #colorPreview;
  #hexInput;
  #rgbInputs;
  #hslInputs;
  #hsvInputs;

  #abortController = new AbortController();

  #states = {
    hue: 0,
    saturation: 1,
    value: 1,
    alpha: 1,
    color: new Color(),
    format: "hex",
    isDragging: false,
    dragType: null,
  };

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "value",
      "color-format",
      "predefine",
      "show-alpha",
      "disabled",
    ];
  }

  state = this.properties({
    value: {
      type: String,
      default: "#409eff",
      observer: newVal => {
        this.#updateColorFromValue(newVal);
      },
    },
    "color-format": {
      type: ["hsl", "hsv", "hex", "rgb"],
      default: "hex",
      observer: newVal => {
        this.#states.format = newVal;
        this.#updateInputs();
      },
    },
    predefine: {
      props: true,
      type: Array,
      default: () => [],
      observer: newVal => {
        this.#renderPredefineColors(newVal);
      },
    },
    "show-alpha": {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.#updateAlphaVisibility(newVal);
      },
    },
    disabled: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.updateContainerClasslist();
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
      <div class="${ns.b("container")}" part="container">
        <!-- 饱和度选择区域 -->
        <div class="${ns.e("saturation")}" part="saturation">
          <div class="${ns.e("saturation", "white")}" part="saturation-white"></div>
          <div class="${ns.e("saturation", "black")}" part="saturation-black"></div>
          <div class="${ns.e("saturation", "thumb")}" part="saturation-thumb"></div>
        </div>
        
        <!-- 色相选择条 -->
        <div class="${ns.e("hue")}" part="hue">
          <div class="${ns.e("hue", "thumb")}" part="hue-thumb"></div>
        </div>
        
        <!-- 透明度选择条 -->
        <div class="${ns.e("alpha")}" part="alpha">
          <div class="${ns.e("alpha", "gradient")}" part="alpha-gradient"></div>
          <div class="${ns.e("alpha", "thumb")}" part="alpha-thumb"></div>
        </div>
        
        <!-- 预定义颜色 -->
        <div class="${ns.e("predefine")}" part="predefine">
          <div class="${ns.e("predefine", "title")}" part="predefine-title">预定义颜色</div>
          <div class="${ns.e("predefine", "list")}" part="predefine-list"></div>
        </div>
        
        <!-- 颜色输入区域 -->
        <div class="${ns.e("inputs")}" part="inputs">
          <div class="${ns.e("inputs", "color")}" part="color-preview"></div>
          <div class="${ns.e("inputs", "format")}" part="format-inputs">
            <input class="${ns.e("inputs", "input")}" part="hex-input" type="text" placeholder="HEX" />
            <input class="${ns.e("inputs", "input")}" part="rgb-input" type="text" placeholder="RGB" />
            <input class="${ns.e("inputs", "input")}" part="hsl-input" type="text" placeholder="HSL" />
            <input class="${ns.e("inputs", "input")}" part="hsv-input" type="text" placeholder="HSV" />
          </div>
        </div>
      </div>
    `);

    this.#container = this.shadowRoot.querySelector(ns.cb("container"));
    this.#saturation = this.shadowRoot.querySelector(ns.cb("saturation"));
    this.#saturationThumb = this.shadowRoot.querySelector(
      ns.cb("saturation", "thumb")
    );
    this.#hue = this.shadowRoot.querySelector(ns.cb("hue"));
    this.#hueThumb = this.shadowRoot.querySelector(ns.cb("hue", "thumb"));
    this.#alpha = this.shadowRoot.querySelector(ns.cb("alpha"));
    this.#alphaGradient = this.shadowRoot.querySelector(
      ns.cb("alpha", "gradient")
    );
    this.#alphaThumb = this.shadowRoot.querySelector(ns.cb("alpha", "thumb"));
    this.#predefineList = this.shadowRoot.querySelector(
      ns.cb("predefine", "list")
    );
    this.#colorPreview = this.shadowRoot.querySelector(
      ns.cb("inputs", "color")
    );
    this.#hexInput = this.shadowRoot.querySelector(ns.cb("inputs", "input"));
    this.#rgbInputs = this.shadowRoot.querySelectorAll(
      ns.cb("inputs", "input")
    )[1];
    this.#hslInputs = this.shadowRoot.querySelectorAll(
      ns.cb("inputs", "input")
    )[2];
    this.#hsvInputs = this.shadowRoot.querySelectorAll(
      ns.cb("inputs", "input")
    )[3];
  }

  connectedCallback() {
    super.connectedCallback();
    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.#bindEvents();
    this.#updateColorFromValue(this.value);
    this.#updateAlphaVisibility(this.showAlpha);
    this.#renderPredefineColors(this.predefine);
  }

  #bindEvents() {
    const signal = this.#abortController.signal;

    // 饱和度区域事件
    if (this.#saturation) {
      this.#saturation.addEventListener(
        "mousedown",
        this.#onSaturationMouseDown.bind(this),
        { signal }
      );
    }

    // 色相条事件
    if (this.#hue) {
      this.#hue.addEventListener("mousedown", this.#onHueMouseDown.bind(this), {
        signal,
      });
    }

    // 透明度条事件
    if (this.#alpha) {
      this.#alpha.addEventListener(
        "mousedown",
        this.#onAlphaMouseDown.bind(this),
        { signal }
      );
    }

    // 输入框事件
    if (this.#hexInput) {
      this.#hexInput.addEventListener("input", this.#onHexInput.bind(this), {
        signal,
      });
    }
    if (this.#rgbInputs) {
      this.#rgbInputs.addEventListener("input", this.#onRgbInput.bind(this), {
        signal,
      });
    }
    if (this.#hslInputs) {
      this.#hslInputs.addEventListener("input", this.#onHslInput.bind(this), {
        signal,
      });
    }
    if (this.#hsvInputs) {
      this.#hsvInputs.addEventListener("input", this.#onHsvInput.bind(this), {
        signal,
      });
    }

    // 全局鼠标事件
    document.addEventListener("mousemove", this.#onMouseMove.bind(this), {
      signal,
    });
    document.addEventListener("mouseup", this.#onMouseUp.bind(this), {
      signal,
    });
  }

  #onSaturationMouseDown(e) {
    if (this.disabled) return;

    this.#states.isDragging = true;
    this.#states.dragType = "saturation";
    this.#updateSaturationPosition(e);
  }

  #onHueMouseDown(e) {
    if (this.disabled) return;

    this.#states.isDragging = true;
    this.#states.dragType = "hue";
    this.#updateHuePosition(e);
  }

  #onAlphaMouseDown(e) {
    if (this.disabled) return;

    this.#states.isDragging = true;
    this.#states.dragType = "alpha";
    this.#updateAlphaPosition(e);
  }

  #onMouseMove(e) {
    if (!this.#states.isDragging) return;

    switch (this.#states.dragType) {
      case "saturation":
        this.#updateSaturationPosition(e);
        break;
      case "hue":
        this.#updateHuePosition(e);
        break;
      case "alpha":
        this.#updateAlphaPosition(e);
        break;
    }
  }

  #onMouseUp() {
    this.#states.isDragging = false;
    this.#states.dragType = null;
  }

  #updateSaturationPosition(e) {
    const rect = this.#saturation.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

    this.#states.saturation = x;
    this.#states.value = 1 - y;
    this.#updateColorFromHsv();
  }

  #updateHuePosition(e) {
    const rect = this.#hue.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));

    this.#states.hue = x * 360;
    this.#updateColorFromHsv();
  }

  #updateAlphaPosition(e) {
    const rect = this.#alpha.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));

    this.#states.alpha = x;
    this.#updateColorFromHsv();
  }

  #updateColorFromHsv() {
    const { h, s, v, a } = this.#states;
    const color = new Color({ h, s, v, a });
    this.#states.color = color;
    this.#updateVisuals();
    this.#updateInputs();
    this.#emitActiveChange();
  }

  #updateColorFromValue(value) {
    if (!value) return;

    const color = new Color(value);
    this.#states.color = color;

    // 转换为 HSV 格式
    const hsv = color._rgbToHsv();
    this.#states.hue = hsv.h;
    this.#states.saturation = hsv.s / 100;
    this.#states.value = hsv.v / 100;
    this.#states.alpha = color.getValue().a;

    this.#updateVisuals();
    this.#updateInputs();
  }

  #updateVisuals() {
    const { color, hue, saturation, value, alpha } = this.#states;

    // 更新饱和度区域背景
    if (this.#saturation) {
      this.#saturation.style.background = `hsl(${hue}, 100%, 50%)`;
    }

    // 更新饱和度滑块位置
    if (this.#saturationThumb) {
      const saturationX = saturation * 100;
      const valueY = (1 - value) * 100;
      this.#saturationThumb.style.left = `${saturationX}%`;
      this.#saturationThumb.style.top = `${valueY}%`;
    }

    // 更新色相滑块位置
    if (this.#hueThumb) {
      const hueX = (hue / 360) * 100;
      this.#hueThumb.style.left = `${hueX}%`;
    }

    // 更新透明度条和滑块
    if (this.#alphaGradient && this.#alphaThumb) {
      const alphaColor = color.toHex();
      this.#alphaGradient.style.background = `linear-gradient(to right, rgba(0,0,0,0), ${alphaColor})`;
      this.#alphaThumb.style.left = `${alpha * 100}%`;
    }

    // 更新颜色预览
    if (this.#colorPreview) {
      this.#colorPreview.style.background = color.toRgb(true);
    }
  }

  #updateInputs() {
    const { color, format } = this.#states;

    // 更新输入框值（如果输入框存在）
    if (this.#hexInput) {
      this.#hexInput.value = color.toHex();
    }
    if (this.#rgbInputs) {
      this.#rgbInputs.value = color.toRgb();
    }
    if (this.#hslInputs) {
      this.#hslInputs.value = color.toHsl();
    }
    if (this.#hsvInputs) {
      this.#hsvInputs.value = color.toHsv();
    }

    // 根据当前格式高亮对应的输入框
    [this.#hexInput, this.#rgbInputs, this.#hslInputs, this.#hsvInputs].forEach(
      input => {
        if (input) {
          input.style.borderColor = "var(--grey-300)";
        }
      }
    );

    // 高亮当前格式的输入框
    switch (format) {
      case "hex":
        if (this.#hexInput) {
          this.#hexInput.style.borderColor = "var(--primary-color)";
        }
        break;
      case "rgb":
        if (this.#rgbInputs) {
          this.#rgbInputs.style.borderColor = "var(--primary-color)";
        }
        break;
      case "hsl":
        if (this.#hslInputs) {
          this.#hslInputs.style.borderColor = "var(--primary-color)";
        }
        break;
      case "hsv":
        if (this.#hsvInputs) {
          this.#hsvInputs.style.borderColor = "var(--primary-color)";
        }
        break;
    }
  }

  #onHexInput(e) {
    const value = e.target.value;
    if (this.#isValidHex(value)) {
      this.#updateColorFromValue(value);
    }
  }

  #onRgbInput(e) {
    const value = e.target.value;
    if (this.#isValidRgb(value)) {
      this.#updateColorFromValue(value);
    }
  }

  #onHslInput(e) {
    const value = e.target.value;
    if (this.#isValidHsl(value)) {
      this.#updateColorFromValue(value);
    }
  }

  #onHsvInput(e) {
    const value = e.target.value;
    if (this.#isValidHsv(value)) {
      this.#updateColorFromValue(value);
    }
  }

  #isValidHex(value) {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}|[A-Fa-f0-9]{8})$/.test(value);
  }

  #isValidRgb(value) {
    return /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*\d*\.?\d+\s*)?\)$/.test(
      value
    );
  }

  #isValidHsl(value) {
    return /^hsla?\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*(?:,\s*\d*\.?\d+\s*)?\)$/.test(
      value
    );
  }

  #isValidHsv(value) {
    return /^hsv\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*(?:,\s*\d*\.?\d+\s*)?\)$/.test(
      value
    );
  }

  #renderPredefineColors(colors) {
    if (!this.#predefineList) return;

    this.#predefineList.innerHTML = "";

    colors.forEach((color, index) => {
      const item = document.createElement("div");
      item.className = this.ns.ce("predefine", "item");
      item.style.background = color;
      item.setAttribute("data-color", color);

      item.addEventListener("click", () => {
        if (this.disabled) return;
        this.#updateColorFromValue(color);
      });

      this.#predefineList.appendChild(item);
    });
  }

  #updateAlphaVisibility(showAlpha) {
    if (this.#alpha) {
      this.#alpha.style.display = showAlpha ? "block" : "none";
    }
  }

  #emitActiveChange() {
    const value = this.#states.color.toString(this.colorFormat);
    this.emit("ea-active-change", { detail: { value } });
  }

  updateContainerClasslist() {
    const className = this.computedClasslist(
      this.ns.b("container"),
      {},
      {
        disabled: this.disabled,
      }
    );
    this.#container.className = className;
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }

  /**
   * 获取当前颜色对象
   * @returns {Color} 颜色对象
   */
  color() {
    return this.#states.color;
  }

  /**
   * 设置颜色值
   * @param {string} value - 颜色值
   */
  setValue(value) {
    this.value = value;
  }
}

if (!customElements.get("ea-color-picker-panel")) {
  customElements.define("ea-color-picker-panel", EaColorPickerPanel);
}
