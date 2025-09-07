import Base from "@components/Base.js";

import stylesheet from "./index.scss?inline";
import EaUtils from "@/utils/Utils";

export class EaInput extends Base {
  /** @type {HTMLElement} */
  #container;
  /** @type {HTMLElement} */
  #prepend;
  /** @type {HTMLElement} */
  #inner;
  /** @type {HTMLInputElement} */
  #original;
  /** @type {HTMLElement} */
  #append;

  /** @type {AbortController} */
  #abortController;

  static get observedAttributes() {
    return EaUtils.arrayToLowerCamelCase([
      "type",
      "value",
      "isFocus",
      "placeholder",
    ]);
  }

  state = this.properties({
    type: {
      type: [
        "textarea",
        "text",
        "button",
        "checkbox",
        "color",
        "date",
        "datetime-local",
        "email",
        "file",
        "hidden",
        "image",
        "month",
        "number",
        "password",
        "radio",
        "range",
        "reset",
        "search",
        "submit",
        "tel",
        "time",
        "url",
        "week",
      ],
      default: "text",
      observer: (newVal) => {
        if (newVal !== "textarea") this.#original.type = newVal;
        this.#container.className = this.updateContainerClasslist();
      },
    },
    value: {
      type: String,
      default: "",
      observer: (newVal) => {
        this.#original.value = newVal;
      },
    },
    placeholder: {
      type: String,
      default: "",
      observer: (newVal) => {
        this.#original.placeholder = newVal;
      },
    },
    isFocus: {
      type: Boolean,
      default: false,
      observer: (newVal) => {
        this.#container.className = this.updateContainerClasslist();
      },
    },
  });

  /**
   * 获取 classlist 列表
   * @return {string} 属性值
   */
  updateContainerClasslist() {
    return this.computedClasslist(
      "ea-input",
      {
        ["--textarea"]: this.type === "textarea",
      },
      {
        focus: this["is-focus"],
      }
    );
  }

  constructor() {
    super();

    this.stylesheet = stylesheet;

    this.$render();
  }

  $render() {
    this.shadowRoot.innerHTML = `
            <div class="ea-input" part="container">
                <div class="ea-input__prepend" part="prepend">
                    <slot name="prepend"></slot>
                </div>
                <div class="ea-input__inner" part="inner">
                    ${
                      this.type === "textarea"
                        ? '<textarea id="original" class="ea-input__original" part="original"></textarea>'
                        : '<input id="original" class="ea-input__original" type="text" part="original" autocomplete="off" />'
                    }
                </div>
                <div class="ea-input__append" part="append">
                    <slot name="append"></slot>
                </div>
            </div>
        `;

    this.#container = this.shadowRoot.querySelector(".ea-input");
    this.#prepend = this.shadowRoot.querySelector(".ea-input__prepend");
    this.#inner = this.shadowRoot.querySelector(".ea-input__inner");
    this.#original = this.shadowRoot.querySelector(".ea-input__original");
    this.#append = this.shadowRoot.querySelector(".ea-input__append");
  }

  focus() {
    this.#original.focus();
  }

  blur() {
    this.#original.blur();
  }

  clear() {
    this.#original.value = "";
  }

  select() {
    this.#original.select();
  }

  #initFocusEvent = (e) => {
    // this.#container.classList.add("is-focus");
    this["is-focus"] = true;
    this.dispatchEvent("focus");
  };

  #initBlurEvent = (e) => {
    // this.#container.classList.remove("is-focus");
    this["is-focus"] = false;
    this.dispatchEvent("blur");
  };

  #initInputEvent = (e) => {
    const { value } = e.target;
    this.value = value;
    this.dispatchEvent("input", {
      detail: {
        value,
      },
    });
  };

  #initKeydownEvent = (e) => {
    this.dispatchEvent("keydown", {
      detail: {
        value: e.target.value,
      },
    });
  };

  #initMouseenterEvent = (e) => {
    this.dispatchEvent("mouseenter");
  };

  #initMouseleaveEvent = (e) => {
    this.dispatchEvent("mouseleave");
  };

  #initCompositionstartEvent = (e) => {
    this.dispatchEvent("compositionstart", {
      detail: {
        value: e.target.value,
      },
    });
  };

  #initCompositionupdateEvent = (e) => {
    this.dispatchEvent("compositionupdate", {
      detail: {
        value: e.target.value,
      },
    });
  };

  #initCompositionendEvent = (e) => {
    this.dispatchEvent("compositionend", {
      detail: {
        value: e.target.value,
      },
    });
  };

  connectedCallback() {
    super.connectedCallback();
    this.#abortController = new AbortController();

    this.#original.addEventListener("focus", this.#initFocusEvent, {
      signal: this.#abortController.signal,
    });
    this.#original.addEventListener("blur", this.#initBlurEvent, {
      signal: this.#abortController.signal,
    });
    this.#original.addEventListener("input", this.#initInputEvent, {
      signal: this.#abortController.signal,
    });
    this.#original.addEventListener("keydown", this.#initKeydownEvent, {
      signal: this.#abortController.signal,
    });
    this.#original.addEventListener("mouseenter", this.#initMouseenterEvent, {
      signal: this.#abortController.signal,
    });
    this.#original.addEventListener("mouseleave", this.#initMouseleaveEvent, {
      signal: this.#abortController.signal,
    });
    this.#original.addEventListener(
      "compositionstart",
      this.#initCompositionstartEvent,
      {
        signal: this.#abortController.signal,
      }
    );
    this.#original.addEventListener(
      "compositionupdate",
      this.#initCompositionupdateEvent,
      {
        signal: this.#abortController.signal,
      }
    );
    this.#original.addEventListener(
      "compositionend",
      this.#initCompositionendEvent,
      {
        signal: this.#abortController.signal,
      }
    );
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }
}

if (!window.customElements.get("ea-input")) {
  window.customElements.define("ea-input", EaInput);
}
