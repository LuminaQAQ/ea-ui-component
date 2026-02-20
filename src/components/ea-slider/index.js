import FormAssociatedBase from "@/core/FormBase";
import stylesheet from "./index.scss?inline";
import { EA_COMPONENT_SIZES } from "@/utils/Variables";

export class EaSlider extends FormAssociatedBase {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #rail;
  /** @type {HTMLElement} */
  #thumb;
  /** @type {HTMLElement} */
  #tooltip;

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
    step: {
      type: Number,
      default: 1,
      observer: () => {
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
        this.#updateSlider();
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

  updateContainerClasslist() {
    const className = this.computedClasslist(
      "ea-slider",
      {
        ["--" + this.size]: this.size,
      },
      {
        disabled: this.disabled,
        vertical: this.vertical,
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
    this.shadowRoot.innerHTML = `
      <div class='ea-slider' part='container'>
        <div class='ea-slider__runway' part='runway'>
          <div class='ea-slider__rail' part='rail'></div>
          <div class='ea-slider__thumb' part='thumb'>
            <div class='ea-slider__tooltip' part='tooltip'></div>
          </div>
        </div>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-slider");
    this.#rail = this.shadowRoot.querySelector(".ea-slider__rail");
    this.#thumb = this.shadowRoot.querySelector(".ea-slider__thumb");
    this.#tooltip = this.shadowRoot.querySelector(".ea-slider__tooltip");
  }

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
      this.#thumb.style.top = `${percentage}%`;
      this.#thumb.style.left = "50%";
    } else {
      this.#thumb.style.left = `${percentage}%`;
      this.#thumb.style.top = "50%";
    }

    this.#tooltip.textContent = value;
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
