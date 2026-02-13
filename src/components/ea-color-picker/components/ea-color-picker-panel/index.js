import Base from "@components/Base.js";
import { namespace } from "@/directives/namespace";
import { Color } from "@/utils/Color";
import stylesheet from "./index.scss?inline";
import "@components/ea-input/index";

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

  #abortController = new AbortController();

  #AbortControllerStates = {
    /** @type {AbortController | null} */
    saturationMove: null,
    /** @type {AbortController | null} */
    hueMove: null,
  };

  #states = {
    isEaInputDefined: false,
    isFirstValueUpdate: false,

    hue: 0,
    saturation: 1,
    value: 1,
    alpha: 1,
    color: new Color(),
    format: "hex",
    isDragging: false,
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
    ];
  }

  state = this.properties({
    value: {
      type: String,
      default: "",
      observer: async newVal => {
        this.#updateCursorPosition();
        this.#updateSvpanelStatus();

        if (!this.#states.isEaInputDefined) {
          await customElements.whenDefined("ea-input");
          this.#states.isEaInputDefined = true;
        }

        this.#colorInput.value = newVal;
      },
    },
    "color-format": {
      type: ["hsl", "hsv", "hex", "rgb", "rgba"],
      default: () => (this.hasAttribute("show-alpha") ? "rgba" : "hex"),
      observer: newVal => {
        this.value = this.#states.color.toString(newVal);
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
  });

  propStates = this.properties({
    predefine: {
      props: true,
      type: Array,
      default: () => [],
      observer: newVal => {},
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
    this.#predefineList = this.shadowRoot.querySelector(
      ns.ce("predefine-colors")
    );
    this.#colorInput = this.shadowRoot.querySelector(ns.ce("color-input"));
  }

  connectedCallback() {
    super.connectedCallback();
    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.#bindEvents();
    this.#updateCursorPosition();
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
      }
    );

    this.#container.className = className;

    return className;
  }

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
  }

  /**
   * 处理饱和度和值的更新
   * @param {MouseEvent} e
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
     * @param {MouseEvent} e
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
   * @param {MouseEvent} e
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
     * @param {MouseEvent} e
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
   * @param {MouseEvent} e
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
     * @param {MouseEvent} e
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
      const x = saturation * rect.width;
      const y = (1 - value) * rect.height;

      this.#saturationThumb.style.left = x + "px";
      this.#saturationThumb.style.top = y + "px";
    }

    if (this.#hueThumb && this.#hue) {
      const hue = this.#states.hue;

      const rect = this.#hue.getBoundingClientRect();

      const y = (1 - hue / 360) * rect.height;

      this.#hueThumb.style.top = y + "px";
    }

    if (this.#alphaThumb && this.#alpha) {
      const alpha = this.#states.alpha;

      const rect = this.#alpha.getBoundingClientRect();
      const x = alpha * rect.width;

      this.#alphaThumb.style.left = x + "px";
    }
  }

  /**
   * 更新饱和度面板的背景颜色
   * @param {string} color - 颜色值
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
}

if (!customElements.get("ea-color-picker-panel")) {
  customElements.define("ea-color-picker-panel", EaColorPickerPanel);
}
