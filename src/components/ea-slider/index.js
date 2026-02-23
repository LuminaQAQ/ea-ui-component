import FormAssociatedBase from "@/core/FormBase";
import stylesheet from "./index.scss?inline";
import { EA_COMPONENT_SIZES } from "@/utils/Variables";
import "@/components/ea-tooltip";
import "@/components/ea-input-number";
import { namespace } from "@/directives/namespace";
import EaUtils from "@/utils/Utils";

export class EaSlider extends FormAssociatedBase {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #rail;
  /** @type {HTMLElement} */
  #trigger;
  /** @type {HTMLElement} */
  #thumb;
  /** @type {HTMLElement} */
  #tooltip;
  /** @type {HTMLElement} */
  #marks;
  /** @type {HTMLElement} */
  #input;

  /** @type {AbortController} */
  #abortController = new AbortController();
  #AbortControllerStates = {
    /** @type {AbortController} */
    input: null,
  };

  #states = {
    isInputNumberDefined: false,

    isDragging: false,
    startX: 0,
    startY: 0,
  };

  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      "value",
      "min",
      "max",
      "step",
      "disabled",
      "vertical",
      "show-tooltip",
      "placement",
      "size",
      "show-stops",
      "show-input",
    ];
  }

  state = this.properties({
    value: {
      type: Number,
      default: 0,
      observer: newVal => {
        const clampedValue = Math.max(this.min, Math.min(this.max, newVal));
        this.setValue(clampedValue);
        this.#updateSlider();
      },
    },
    min: {
      type: Number,
      default: 0,
      observer: () => {
        this.#updateSlider();
      },
    },
    max: {
      type: Number,
      default: 100,
      observer: () => {
        this.#updateSlider();
      },
    },
    "show-stops": {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.updateContainerClasslist();

        if (newVal) this.#renderStops();
      },
    },
    step: {
      type: Number,
      default: 1,
      observer: newVal => {
        this.#updateSlider();
      },
    },
    disabled: {
      type: Boolean,
      default: false,
      observer: newVal => {
        this.updateContainerClasslist();
      },
    },
    vertical: {
      type: Boolean,
      default: false,
      observer: () => {
        this.#updateSlider();
      },
    },
    "show-tooltip": {
      type: Boolean,
      default: true,
      observer: () => {
        this.updateContainerClasslist();
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
      default: "top",
      observer: newVal => {
        this.#trigger.setAttribute("placement", newVal);
      },
    },
    "show-input": {
      type: Boolean,
      default: false,
      observer: async newVal => {
        if (!this.#states.isInputNumberDefined) {
          await customElements.whenDefined("ea-input-number");
          this.#states.isInputNumberDefined = true;
        }

        this.#AbortControllerStates.input?.abort();

        this.#updateSlider();

        if (newVal) {
          this.#AbortControllerStates.input = new AbortController();
          this.#input.addEventListener("ea-change", this.#onInputChange, {
            signal: this.#AbortControllerStates.input.signal,
          });
        }
      },
    },
    size: {
      type: EA_COMPONENT_SIZES,
      default: "",
      observer: async newVal => {
        this.updateContainerClasslist();

        if (this["show-input"]) this.#input.setAttribute("size", newVal);
      },
    },
  });

  funcStates = this.properties({
    formatTooltip: {
      rawFunction: true,
      props: true,
      type: Function,
      default: value => value => value,
      observer: () => {
        this.#updateSlider();
      },
    },
    marks: {
      props: true,
      type: Object,
      default: null,
      observer: () => {
        this.#renderMarks();
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    const className = this.computedClasslist(
      "ea-slider",
      {
        ["--" + this.size]: this.size,
      },
      {
        disabled: this.disabled,
        vertical: this.vertical,
        "show-tooltip": this["show-tooltip"],
        "show-stops": this["show-stops"],
        "show-input": this["show-input"],
      }
    );

    this.#container.className = className;

    return className;
  }

  constructor() {
    super();

    this.stylesheet = stylesheet;

    this.$render();
  }

  $render() {
    const ns = namespace("slider");

    this.ns = ns;

    this.shadowRoot.innerHTML = `
      <div class='${ns.b()}' part='container'>
        <div class='${ns.e("runway")}' part='runway'>
          <div class='${ns.e("rail")}' part='rail'></div>
          <ea-tooltip class='${ns.e("trigger")}' part='trigger' flip="false" trigger="customized">
            <div class='${ns.e("thumb")}' part='thumb' slot="reference"></div>
            <div class='${ns.e("tooltip")}' part='tooltip'></div>
          </ea-tooltip>
          <div class='${ns.e("marks")}' part='marks'></div>
        </div>
        <ea-input-number class='${ns.e("input")}' part='input'></ea-input-number>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(ns.cb());
    this.#rail = this.shadowRoot.querySelector(ns.ce("rail"));
    this.#trigger = this.shadowRoot.querySelector(ns.ce("trigger"));
    this.#thumb = this.shadowRoot.querySelector(ns.ce("thumb"));
    this.#tooltip = this.shadowRoot.querySelector(ns.ce("tooltip"));
    this.#marks = this.shadowRoot.querySelector(ns.ce("marks"));
    this.#input = this.shadowRoot.querySelector(ns.ce("input"));
  }

  /**
   * 渲染 stop 元素（包括步长节点和 marks 节点）
   */
  #renderStops = () => {
    const stops = [];

    const step = this.step;
    const count = (this.max - this.min) / step + 1;

    if (this["show-stops"]) {
      for (let index = 0; index < count; index++) {
        const value = this.min + step * index;
        const percentage = ((value - this.min) / (this.max - this.min)) * 100;

        stops.push({
          value,
          percentage,
          type: "stop",
          className: this.ns.e("stop"),
          part: "stop",
        });
      }
    }

    if (this.marks) {
      for (const key in this.marks) {
        const value = parseFloat(key);
        if (isNaN(value) || value < this.min || value > this.max) continue;

        const percentage = ((value - this.min) / (this.max - this.min)) * 100;

        stops.push({
          value,
          percentage,
          type: "mark-stop",
          className: `${this.ns.e("stop")} ${this.ns.e("mark-stop")}`,
          part: "stop mark-stop",
          label: this.marks[key],
        });
      }
    }

    stops.sort((a, b) => a.value - b.value);

    const stopElements = stops.map(stop =>
      EaUtils.EaElement.h("div", stop.className, {
        part: stop.part,
        style: [`${this.vertical ? "top" : "left"}: ${stop.percentage}%;`],
      })
    );

    this.#rail.innerHTML = this.html(stopElements.join(""));
  };

  /**
   * 渲染 marks 标签
   */
  #renderMarkLabels = () => {
    if (!this.marks) {
      this.#marks.innerHTML = "";
      return;
    }

    let marksHtml = "";
    for (const key in this.marks) {
      const value = parseFloat(key);
      if (isNaN(value) || value < this.min || value > this.max) continue;

      const percentage = ((value - this.min) / (this.max - this.min)) * 100;
      const label = this.marks[key];

      if (this.vertical) {
        marksHtml += `
          <div class='${this.ns.e("mark")}' style="top: ${percentage}%;">
            <div class='${this.ns.e("mark-label")}'>${label}</div>
          </div>
        `;
      } else {
        marksHtml += `
          <div class='${this.ns.e("mark")}' style="left: ${percentage}%;">
            <div class='${this.ns.e("mark-label")}'>${label}</div>
          </div>
        `;
      }
    }

    this.#marks.innerHTML = this.html(marksHtml);
  };

  /**
   * 统一渲染 marks 和 stops
   */
  #renderMarks = () => {
    this.#renderStops();
    this.#renderMarkLabels();
  };

  /**
   * 根据鼠标位置计算滑块值
   * @param {number} position 鼠标位置
   * @returns {number} 滑块值
   */
  #getValueFromPosition = position => {
    const rect = this.#rail.getBoundingClientRect();
    const percentage = this.vertical
      ? (position - rect.top) / rect.height
      : (position - rect.left) / rect.width;
    const clampedPercentage = Math.max(0, Math.min(1, percentage));
    const value = this.min + clampedPercentage * (this.max - this.min);
    const steppedValue = Math.round(value / this.step) * this.step;
    return Math.max(this.min, Math.min(this.max, steppedValue));
  };

  /**
   * 更新滑块位置和 tooltip 内容
   */
  #updateSlider = () => {
    const value = this.value;
    const percentage = ((value - this.min) / (this.max - this.min)) * 100;

    if (this.vertical) {
      this.#trigger.style.top = `${percentage}%`;
      this.#trigger.style.left = "50%";
    } else {
      this.#trigger.style.left = `${percentage}%`;
      this.#trigger.style.top = "50%";
    }

    this.#tooltip.textContent = this.formatTooltip(value);
    this.#tooltip.style.display = this["show-tooltip"] ? "block" : "none";

    if (this["show-input"]) {
      this.#input.value = value;
      this.#input.min = this.min;
      this.#input.max = this.max;
      this.#input.step = this.step;
    }

    this.updateContainerClasslist();
  };

  /**
   * 鼠标按下时，更新滑块值
   * @param {MouseEvent} e
   */
  #onMouseDown = e => {
    if (this.disabled) return;

    e.preventDefault();
    e.stopPropagation();

    this.#states.isDragging = true;
    this.#states.startX = e.clientX;
    this.#states.startY = e.clientY;

    this.#trigger.setAttribute("visible", "true");

    const newValue = this.#getValueFromPosition(
      this.vertical ? e.clientY : e.clientX
    );
    this.value = newValue;

    this.emit("input", { detail: { value: this.value } });
  };

  /**
   * 鼠标移动时，更新滑块值
   * @param {MouseEvent} e
   */
  #onMouseMove = e => {
    if (!this.#states.isDragging || this.disabled) return;

    e.preventDefault();
    e.stopPropagation();

    const newValue = this.#getValueFromPosition(
      this.vertical ? e.clientY : e.clientX
    );

    this.value = newValue;

    this.emit("input", { detail: { value: this.value } });
  };

  /**
   * 鼠标松开时，更新滑块值
   */
  #onMouseUp = () => {
    if (!this.#states.isDragging) return;

    this.#states.isDragging = false;
    this.#trigger.setAttribute("visible", "false");
    this.emit("change", { detail: { value: this.value } });
  };

  /**
   * 输入框值改变时，更新滑块值
   * @param {CustomEvent} e
   */
  #onInputChange = e => {
    e.preventDefault();
    e.stopImmediatePropagation();

    const newValue = parseFloat(e.detail.currentValue);
    const clampedValue = Math.max(this.min, Math.min(this.max, newValue));
    this.value = clampedValue;
    this.emit("change", { detail: { value: this.value } });
  };

  /**
   * 鼠标进入滑块时，显示 tooltip 的 触发 元素
   */
  #onThumbMouseEnter = () => {
    if (this.disabled) return;
    this.#trigger.setAttribute("visible", "true");
  };

  /**
   * 鼠标离开滑块时，隐藏 tooltip 的 触发 元素
   */
  #onThumbMouseLeave = () => {
    if (this.disabled || this.#states.isDragging) return;
    this.#trigger.setAttribute("visible", "false");
  };

  #bindEvents = () => {
    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.#rail.addEventListener("mousedown", this.#onMouseDown, {
      signal: this.#abortController.signal,
    });
    this.#thumb.addEventListener("mousedown", this.#onMouseDown, {
      signal: this.#abortController.signal,
    });
    this.#thumb.addEventListener("mouseenter", this.#onThumbMouseEnter, {
      signal: this.#abortController.signal,
    });
    this.#thumb.addEventListener("mouseleave", this.#onThumbMouseLeave, {
      signal: this.#abortController.signal,
    });

    document.addEventListener("mousemove", this.#onMouseMove, {
      signal: this.#abortController.signal,
    });

    document.addEventListener("mouseup", this.#onMouseUp, {
      signal: this.#abortController.signal,
    });
  };

  connectedCallback() {
    super.connectedCallback();

    this.#bindEvents();
    this.#updateSlider();
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }
}

if (!window.customElements.get("ea-slider")) {
  window.customElements.define("ea-slider", EaSlider);
}
