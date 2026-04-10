import Base from "@components/Base";

import stylesheet from "./index.scss?inline";
import { timeout } from "@/utils/timeout";
import { CustomElement } from "@/decorator/custom-element";
import { attribute } from "@/decorator/attribute";

const faIconType: Record<string, string> = {
  primary: "circle-info",
  success: "circle-check",
  info: "circle-info",
  warning: "triangle-exclamation",
  error: "circle-xmark",
};

@CustomElement("ea-alert")
export class EaAlert extends Base {
  #container!: HTMLElement;
  #alertIcon!: HTMLElement;
  #alertContent!: HTMLElement;
  #alertHeading!: HTMLElement;
  #alertDescription!: HTMLElement;
  #alertCloseBtn!: HTMLElement;

  #abortController?: AbortController;

  @attribute({
    type: String,
    default: "",
    observer: function (this: EaAlert, newVal: string) {
      this.#alertHeading.innerHTML = newVal;
    },
  })
  heading: string = "";

  @attribute({
    type: String,
    default: "",
    observer: function (this: EaAlert, newVal: string) {
      this.#alertDescription.innerHTML = newVal ? newVal : `<slot></slot>`;
    },
  })
  description: string = "";

  @attribute({
    type: String,
    default: "info",
    observer: function (this: EaAlert, newVal: string) {
      this.updateContainerClasslist();

      if (this["show-icon"]) {
        this.#alertIcon.innerHTML = `<ea-icon class="ea-alert__icon" name="${
          faIconType[newVal]
        }" part="icon"></ea-icon>`;
      }
    },
  })
  type: string = "info";

  @attribute({
    type: String,
    default: "light",
    observer: function (this: EaAlert) {
      this.updateContainerClasslist();
    },
  })
  effect: string = "light";

  @attribute({
    type: String,
    default: "",
    observer: function (this: EaAlert, newVal: string) {
      try {
        this.#alertCloseBtn.textContent = newVal;
      } catch (error) {}
    },
  })
  "close-text": string = "";

  @attribute({
    type: Boolean,
    default: true,
    observer: function (this: EaAlert, newVal: boolean) {
      this.#abortController?.abort();

      this.#alertCloseBtn.innerHTML = newVal
        ? this["close-text"]
          ? this["close-text"]
          : `<ea-icon class="ea-alert__close-icon" name="xmark" part="close-icon"></ea-icon>`
        : "";

      if (newVal) {
        this.#abortController = new AbortController();
        this.#alertCloseBtn.addEventListener("click", this.#closeEvent, {
          signal: this.#abortController.signal,
        });
      }
    },
  })
  closable: boolean = true;

  @attribute({
    type: Boolean,
    default: false,
    observer: function (this: EaAlert) {
      this.#alertIcon.innerHTML = `<ea-icon class="ea-alert__icon" name="${
        faIconType[this.type]
      }" part="icon"></ea-icon>`;
    },
  })
  "show-icon": boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer: function (this: EaAlert) {
      this.updateContainerClasslist();
    },
  })
  center: boolean = false;

  @attribute({
    type: Number,
    default: 0,
    observer: function (this: EaAlert, newVal: number) {
      newVal = Math.abs(newVal);
      this.#container.classList.toggle("ea-alert--hide", newVal > 0);

      timeout(() => {
        this.emit("open");
        this.#container.classList.remove("ea-alert--hide");
      }, newVal);
    },
  })
  "show-after": number = 0;

  @attribute({
    type: Number,
    default: 300,
  })
  "hide-after": number = 300;

  @attribute({
    type: Number,
    default: 0,
    observer: function (this: EaAlert, newVal: number) {
      if (newVal && this.hasAttribute("auto-close")) {
        // timeout(() => this.#closeEvent(), this["auto-close"]);
      }
    },
  })
  "auto-close": number = 0;

  /**
   * 获取 classlist 列表
   */
  async updateContainerClasslist() {
    const className = this.computedClasslist("ea-alert", {
      ["--" + this.type]: this.type,
      ["--" + this.effect]: this.effect,
      ["--center"]: this.center,
    });

    this.#container.className = className;

    return className;
  }

  constructor() {
    super();

    this.stylesheet = stylesheet;
  }

  $render() {
    this.shadowRoot.innerHTML = `
      <div class='ea-alert' part='container'>
        <span class="ea-alert__icon-wrap" part='icon-wrap'>
          <slot name='icon'></slot>
        </span>
        <div class="ea-alert__content" part='content-wrap'>
          <span class="ea-alert__heading" part='heading'>
            <slot name="heading"></slot>
          </span>
          <p class="ea-alert__description" part='description'>
            <slot></slot>
          </p>
          <span class="ea-alert__close-btn" part="close-btn">
            ${
              this.closable
                ? this["close-text"]
                  ? this["close-text"]
                  : `<ea-icon class="ea-alert__close-icon" name="xmark" part="close-icon"></ea-icon>`
                : ""
            }
          </span>
        </div>
      </div>
    `;

    this.#container = this.shadowRoot.querySelector(".ea-alert")!;
    this.#alertIcon = this.shadowRoot.querySelector(
      ".ea-alert__icon-wrap slot[name=icon]"
    )!;
    this.#alertContent = this.shadowRoot.querySelector(".ea-alert__content")!;
    this.#alertHeading = this.shadowRoot.querySelector(
      ".ea-alert__heading slot[name=heading]"
    )!;
    this.#alertDescription = this.shadowRoot.querySelector(
      ".ea-alert__description slot"
    )!;
    this.#alertCloseBtn = this.shadowRoot.querySelector(
      ".ea-alert__close-btn"
    )!;
  }

  /**
   * 关闭事件
   */
  #closeEvent = () => {
    timeout(() => {
      this.#container.classList.add("ea-alert--before-close");

      const onTransitionEnd = () => {
        this.emit("close", {
          detail: {
            visible: false,
          },
        });
        this.remove();
      };

      this.#container.addEventListener("transitionend", onTransitionEnd, {
        once: true,
      });
    }, this["hide-after"]);
  };

  connectedCallback() {
    super.connectedCallback();

    this.updateContainerClasslist();

    this.#abortController?.abort();

    if (this.closable) {
      this.#abortController = new AbortController();
      this.#alertCloseBtn.addEventListener("click", this.#closeEvent, {
        signal: this.#abortController.signal,
      });
    }
  }

  $beforeUnmounted() {
    this.#abortController?.abort();
  }
}
