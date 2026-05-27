import { EaOverlay } from "@/common/ea-overlay";
import "@/components/ea-input/index";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { listen } from "@decorator/listen";
import { property } from "@decorator/property";
import { createBEM } from "@utils/bem";
import { Enum } from "@/utils/Enum";
import { VARIANT_ICON_MAP } from "@/constants/variant";
import stylesheet from "./index.scss?inline";
import "@/components/ea-icon/index";

const TAG_NAME = "ea-message-box" as const;
const bem = createBEM(TAG_NAME);

const BOX_TYPES = Enum(["alert", "confirm", "prompt", "personalized"] as const);
const MESSAGE_VARIANT_TYPES = Enum([
  "primary",
  "success",
  "info",
  "warning",
  "error",
] as const);
const BUTTON_SIZES = Enum(["small", "medium", "large"] as const);

type BoxType = (typeof BOX_TYPES)[number];
type MessageVariantType = (typeof MESSAGE_VARIANT_TYPES)[number];
type ButtonSize = (typeof BUTTON_SIZES)[number];

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaMessageBoxElement extends EaOverlay {
  // ==================== DOM 元素引用 ====================

  @query(".ea-overlay")
  private _container!: HTMLElement;

  @query(".ea-overlay__content")
  private _overlayContent!: HTMLElement;

  @query(".ea-message-box-main__header")
  private _header!: HTMLElement;

  @query(".ea-message-box-main__title")
  private _title!: HTMLElement;

  @query(".ea-message-box-main__type-icon")
  private _typeIcon!: HTMLElement;

  @query(".ea-message-box-main__icon-close")
  private _closeIcon!: HTMLElement;

  @query(".ea-message-box-main__content")
  private _content!: HTMLElement;

  @query(".ea-message-box-main__description")
  private _description!: HTMLElement;

  @query(".ea-message-box-main__input")
  private _input!: HTMLInputElement & { invalid?: boolean };

  @query(".ea-message-box-main__invalid-message")
  private _invalidMessage!: HTMLElement;

  @query(".ea-message-box-main__footer")
  private _footer!: HTMLElement;

  @query(".ea-message-box-main__cancel-button")
  private _cancelButton!: HTMLElement;

  @query(".ea-message-box-main__confirm-button")
  private _confirmButton!: HTMLElement;

  // ==================== 属性定义 ====================

  @attribute({
    type: BOX_TYPES,
    default: "personalized",
    observer(this: EaMessageBoxElement, newVal: string) {
      this.updateContainerClasslist();
    },
  })
  boxType: BoxType = "personalized";

  @attribute({
    type: String,
    default: "",
    observer(this: EaMessageBoxElement, newVal: string) {
      if (this._title) this._title.textContent = newVal;
    },
  })
  heading: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaMessageBoxElement, newVal: string) {
      if (this.dangerouslyUseHTMLString) {
        if (this._description) this._description.innerHTML = newVal;
      } else {
        if (this._description) this._description.textContent = newVal;
      }
    },
  })
  message: string = "";

  @attribute({
    type: MESSAGE_VARIANT_TYPES,
    default: "",
    observer(this: EaMessageBoxElement, newVal: string) {
      if (newVal && VARIANT_ICON_MAP[newVal]) {
        this.icon = VARIANT_ICON_MAP[newVal];
      }
      this.updateContainerClasslist();
    },
  })
  variant: MessageVariantType | "" = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaMessageBoxElement, newVal: string) {
      if (this._typeIcon) this._typeIcon.setAttribute("name", newVal);
    },
  })
  icon: string = "";

  @attribute({
    type: String,
    default: "xmark",
    observer(this: EaMessageBoxElement, newVal: string) {
      if (this._closeIcon) this._closeIcon.setAttribute("name", newVal);
    },
  })
  closeIcon: string = "xmark";

  @attribute({
    type: Boolean,
    default: true,
    observer(this: EaMessageBoxElement) {
      this.updateContainerClasslist();
    },
  })
  showClose: boolean = true;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaMessageBoxElement) {
      this.updateContainerClasslist();
    },
  })
  showCancelButton: boolean = false;

  @attribute({
    type: Boolean,
    default: true,
    observer(this: EaMessageBoxElement) {
      this.updateContainerClasslist();
    },
  })
  showConfirmButton: boolean = true;

  @attribute({
    type: String,
    default: "OK",
    observer(this: EaMessageBoxElement, newVal: string) {
      if (this._confirmButton) this._confirmButton.textContent = newVal;
    },
  })
  confirmButtonText: string = "OK";

  @attribute({
    type: String,
    default: "Cancel",
    observer(this: EaMessageBoxElement, newVal: string) {
      if (this._cancelButton) this._cancelButton.textContent = newVal;
    },
  })
  cancelButtonText: string = "Cancel";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaMessageBoxElement) {
      this.updateContainerClasslist();
    },
  })
  center: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaMessageBoxElement, newVal: boolean) {
      if (this._confirmButton)
        this._confirmButton.setAttribute("round", String(newVal));
      if (this._cancelButton)
        this._cancelButton.setAttribute("round", String(newVal));
    },
  })
  roundButton: boolean = false;

  @attribute({
    type: BUTTON_SIZES,
    default: "medium",
    observer(this: EaMessageBoxElement, newVal: string) {
      if (this._confirmButton) this._confirmButton.setAttribute("size", newVal);
      if (this._cancelButton) this._cancelButton.setAttribute("size", newVal);
    },
  })
  buttonSize: ButtonSize = "medium";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaMessageBoxElement) {
      this.updateContainerClasslist();
    },
  })
  showInput: boolean = false;

  @attribute({
    type: String,
    default: "",
    observer(this: EaMessageBoxElement, newVal: string) {
      if (this._input) this._input.setAttribute("placeholder", newVal);
    },
  })
  inputPlaceholder: string = "";

  @attribute({
    type: String,
    default: "text",
    observer(this: EaMessageBoxElement, newVal: string) {
      if (this._input) this._input.setAttribute("type", newVal);
    },
  })
  inputType: string = "text";

  @attribute({
    type: String,
    default: "",
    observer(this: EaMessageBoxElement, newVal: string) {
      if (this._input) this._input.setAttribute("value", newVal);
    },
  })
  inputValue: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaMessageBoxElement, newVal: string) {
      if (this._input && this.inputPattern && this._invalidMessage)
        this._invalidMessage.textContent = newVal;
    },
  })
  inputErrorMessage: string = "";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaMessageBoxElement) {
      this.updateContainerClasslist();
    },
  })
  movable: boolean = false;

  // ==================== @property 属性（不映射到 HTML attribute） ====================

  @property({
    type: RegExp,
    default: null,
  })
  inputPattern: RegExp | null = null;

  @property({
    type: Boolean,
    default: false,
  })
  dangerouslyUseHTMLString: boolean = false;

  @property({
    type: Boolean,
    default: false,
    observer(this: EaMessageBoxElement, newVal: boolean) {
      if (this._confirmButton) {
        if (this._input) this._input.disabled = newVal;
        this._confirmButton.setAttribute("loading", String(newVal));
      }
    },
  })
  confirmButtonLoading: boolean = false;

  @property({
    type: Boolean,
    default: false,
  })
  distinguishCancelAndClose: boolean = false;

  // ==================== 方法 ====================

  updateContainerClasslist(): string {
    const parentClassName = super.updateContainerClasslist();

    const className = bem(
      {
        [this.variant]: !!this.variant,
        center: this.center,
        draggable: this.movable,
      },
      {
        "close-hidden": !this.showClose,
        "cancel-hidden": !this.showCancelButton,
        "confirm-hidden": !this.showConfirmButton,
        "input-visible": this.showInput,
        invalid: this.showInput && !!this._input?.invalid,
        [`${this.boxType}-box`]: !!this.boxType,
      }
    );

    const fullClassName = `${parentClassName} ${className}`.trim();

    if (this._container) this._container.className = fullClassName;

    return fullClassName;
  }

  html(): string {
    const tpl = document.createElement("template");
    tpl.innerHTML = super.html();

    const contentContainer = tpl.content.querySelector(".ea-overlay__content")!;

    contentContainer.innerHTML = `
      <div class="ea-message-box-main" part="container">
        <header class="ea-message-box-main__header" part="header">
          <div class="ea-message-box-main__title-container" part="title-wrap">
            <ea-icon class="ea-message-box-main__type-icon" part="type-icon"></ea-icon>
            <span class="ea-message-box-main__title" part="title"></span>
          </div>
          <ea-icon class="ea-message-box-main__icon-close" name="xmark" part="close-icon"></ea-icon>
        </header>
        <main class="ea-message-box-main__content" part="content">
          <div class="ea-message-box-main__description" part="description"></div>
          <ea-input class="ea-message-box-main__input" part="input"></ea-input>
          <div class="ea-message-box-main__invalid-message" part="invalid-message"></div>
        </main>
        <footer class="ea-message-box-main__footer" part="footer">
          <ea-button class="ea-message-box-main__cancel-button" part="cancel-button">Cancel</ea-button>
          <ea-button class="ea-message-box-main__confirm-button" variant="primary" part="confirm-button">OK</ea-button>
        </footer>
      </div>
    `;

    return tpl.innerHTML;
  }

  private _dispatchBubblesEvent(customEventName: string, detail?: any): void {
    this.emit(customEventName, {
      detail,
      bubbles: true,
      composed: true,
    });
  }

  private _handleInputPattern(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!this._input || !this.inputPattern) return resolve(true);

      const isValid = this.inputPattern.test(
        (this._input as any).value || this._input.getAttribute("value") || ""
      );
      this._container.classList.toggle("is-invalid", !isValid);

      if (isValid) resolve(true);
      else
        reject(
          new Error(
            `[EaMessageBox] ${this.inputErrorMessage || "input pattern is not valid."}`
          )
        );
    });
  }

  /**
   * 初始化 区分取消和关闭 的事件
   */
  private _initDistinguishCancelAndCloseEvent(): void {
    if (!this.distinguishCancelAndClose) {
      this._dispatchBubblesEvent("cancel");
    } else {
      this._dispatchBubblesEvent("message-close");
    }
  }

  // ==================== 事件处理 ====================

  @listen("click", ".ea-message-box-main__confirm-button")
  private _handleConfirmClick(): void {
    this._handleInputPattern()
      .then(() => {
        this._dispatchBubblesEvent("confirm");
      })
      .catch(() => {});
  }

  @listen("click", ".ea-message-box-main__cancel-button")
  private _handleCancelClick(): void {
    this._dispatchBubblesEvent("cancel");
  }

  @listen("click", ".ea-message-box-main__icon-close")
  private _handleCloseIconClick(): void {
    if (!this.showClose) return;
    this._initDistinguishCancelAndCloseEvent();
  }

  @listen("mousedown", ".ea-message-box-main__header")
  private _handleDragStart(mousedownEvent: MouseEvent): void {
    if (!this.movable) return;
    if (!this._header.contains(mousedownEvent.target as Node)) return;
    if (this._closeIcon.contains(mousedownEvent.target as Node)) return;

    const controller = new AbortController();

    const rect = this._overlayContent.getBoundingClientRect();
    const offsetX = mousedownEvent.clientX - rect.left;
    const offsetY = mousedownEvent.clientY - rect.top;

    const onMousemove = (e: MouseEvent) => {
      this._overlayContent.style.left = e.clientX - offsetX + "px";
      this._overlayContent.style.top = e.clientY - offsetY + "px";
    };

    const onMouseup = () => {
      controller.abort();
    };

    window.addEventListener("mousemove", onMousemove, {
      signal: controller.signal,
    });
    window.addEventListener("mouseup", onMouseup, {
      signal: controller.signal,
    });
  }

  @listen("keydown", "document")
  private _handleKeyDown(e: KeyboardEvent): void {
    if (!this.visible || !this.closeOnPressEscape || e.key !== "Escape") return;
    e.stopImmediatePropagation();
    e.preventDefault();
    this._initDistinguishCancelAndCloseEvent();
  }

  @listen("click", ".ea-overlay__mask")
  private _handleMaskClick(e: Event): void {
    if (!this.closeOnClickModal && e.target !== this._overlayContent) return;

    const isContent =
      [...this.children].find(
        child => child === e.target || child.contains(e.target as Node)
      ) ||
      this._overlayContent === e.target ||
      this._overlayContent.contains(e.target as Node);
    if (isContent) return;

    this._initDistinguishCancelAndCloseEvent();
  }

  @listen("close")
  private _handleCloseEvent(e: CustomEvent): void {
    if (e.target !== this) return;
    this._initDistinguishCancelAndCloseEvent();
  }

  // ==================== 生命周期 ====================

  $mount(): void {
    super.$mount?.();

    try {
      this.setAttribute("role", "dialog");
    } catch {
      this.role = "dialog";
    }

    this.style.setProperty("--ea-overlay-content-width", "100%");
    this.style.setProperty("--ea-overlay-content-max-width", "420px");
    this.style.setProperty("--ea-overlay-content-height", "auto");

    this.updateContainerClasslist();
  }

  $beforeUnmount(): void {
    super.$beforeUnmount?.();
  }
}
