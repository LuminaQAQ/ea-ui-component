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
  #input;

  /** @type {AbortController} */
  #abortController = new AbortController();

  #states = {
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
      "size",
      "show-stops",
      "show-input",
    ];
  }

  state = this.properties({
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

        if (newVal) this.#updateStepNodes(this.step);
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
    "show-input": {
      type: Boolean,
      default: false,
      observer: async () => {

        await 
        this.updateContainerClasslist();
      },
    },
    size: {
      type: EA_COMPONENT_SIZES,
      default: "",
      observer: () => {
        this.updateContainerClasslist();
      },
    },
  });

  propStates = this.properties({
    value: {
      // props: true,
      type: Number,
      default: 0,
      observer: newVal => {
        const clampedValue = Math.max(this.min, Math.min(this.max, newVal));
        this.setValue(clampedValue);
        this.#updateSlider();
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
  });

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
          <ea-tooltip class='${ns.e("trigger")}' part='trigger'>
            <div class='${ns.e("thumb")}' part='thumb' slot="reference"></div>
            <div class='${ns.e("tooltip")}' part='tooltip'></div>
          </ea-tooltip>
        </div>
        <ea-input-number class='${ns.e("input")}' part='input'></ea-input-number>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(ns.cb());
    this.#rail = this.shadowRoot.querySelector(ns.ce("rail"));
    this.#trigger = this.shadowRoot.querySelector(ns.ce("trigger"));
    this.#thumb = this.shadowRoot.querySelector(ns.ce("thumb"));
    this.#tooltip = this.shadowRoot.querySelector(ns.ce("tooltip"));
    this.#input = this.shadowRoot.querySelector(ns.ce("input"));
  }

  #updateStepNodes = (step = this.step) => {
    this.#rail.innerHTML = this.html(
      Array.from({ length: (this.max - this.min) / step + 1 }, (_, index) =>
        EaUtils.EaElement.h("div", this.ns.e("stop"), {
          part: "stop",
          style: [`left: ${(100 / step) * index}%;`],
        })
      ).join("")
    );
  };

  #getValueFromPosition = position => {
    const rect = this.#rail.getBoundingClientRect();
    const percentage = this.vertical
      ? 1 - (position - rect.top) / rect.height
      : (position - rect.left) / rect.width;
    const clampedPercentage = Math.max(0, Math.min(1, percentage));
    const value = this.min + clampedPercentage * (this.max - this.min);
    const steppedValue = Math.round(value / this.step) * this.step;
    return Math.max(this.min, Math.min(this.max, steppedValue));
  };

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

    this.updateContainerClasslist();
  };

  #onMouseDown = e => {
    if (this.disabled) return;

    e.preventDefault();
    e.stopPropagation();

    this.#states.isDragging = true;
    this.#states.startX = e.clientX;
    this.#states.startY = e.clientY;

    const newValue = this.#getValueFromPosition(
      this.vertical ? e.clientY : e.clientX
    );
    this.value = newValue;

    this.emit("input", { detail: { value: this.value } });
  };

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

  #onMouseUp = () => {
    if (!this.#states.isDragging) return;

    this.#states.isDragging = false;
    this.emit("change", { detail: { value: this.value } });
  };

  connectedCallback() {
    super.connectedCallback();

    this.#abortController?.abort();
    this.#abortController = new AbortController();

    this.#rail.addEventListener("mousedown", this.#onMouseDown, {
      signal: this.#abortController.signal,
    });
    this.#thumb.addEventListener("mousedown", this.#onMouseDown, {
      signal: this.#abortController.signal,
    });

    document.addEventListener("mousemove", this.#onMouseMove, {
      signal: this.#abortController.signal,
    });

    document.addEventListener("mouseup", this.#onMouseUp, {
      signal: this.#abortController.signal,
    });

    this.#updateSlider();
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }
}

if (!window.customElements.get("ea-slider")) {
  window.customElements.define("ea-slider", EaSlider);
}
