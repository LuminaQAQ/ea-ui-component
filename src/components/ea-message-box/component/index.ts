import { EaOverlay } from "@common/ea-overlay";
import "@/components/ea-input/index";
import { CustomElement, attribute, property, query, listen } from "@decorator";
import { createBEM } from "@utils/bem";
import { html } from "@utils/html";
import { Enum } from "@utils/Enum";
import { VARIANT_ICON_MAP } from "@constants/variant";
import { EaMessageBoxConfirmEvent } from "../events/EaMessageBoxConfirmEvent";
import { EaMessageBoxCancelEvent } from "../events/EaMessageBoxCancelEvent";
import { EaMessageBoxMessageCloseEvent } from "../events/EaMessageBoxMessageCloseEvent";
import stylesheet from "./index.scss?inline";
import "@/components/ea-icon/index";

const TAG_NAME = "ea-message-box" as const;
const bem = createBEM(TAG_NAME);
const bemMain = createBEM("ea-message-box-main");

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

/**
 * @summary 模态消息框组件，用于消息提示（alert）、确认（confirm）和提交（prompt），支持拖拽、HTML 内容和关闭拦截。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-overlay
 * @dependency ea-icon
 * @dependency ea-input
 * @dependency ea-button
 *
 * @slot default - 默认插槽。
 *
 * @event ea-confirm - 点击确认按钮时触发。
 * @event ea-cancel - 点击取消按钮时触发。
 * @event ea-message-close - 当 distinguishCancelAndClose 为 true 时，用户点击关闭按钮触发。
 *
 * @csspart container - 容器元素。
 * @csspart header - 头部区域。
 * @csspart title-wrap - 标题包裹元素。
 * @csspart type-icon - 类型图标元素。
 * @csspart close-icon - 关闭图标元素。
 * @csspart content - 内容区域。
 * @csspart description - 描述内容元素。
 * @csspart input - 输入框元素。
 * @csspart footer - 底部区域。
 * @csspart confirm-button - 确认按钮元素。
 * @csspart cancel-button - 取消按钮元素。
 *
 * @cssproperty --ea-message-box-padding - 组件内边距。
 * @cssproperty --ea-message-box-border-radius - 组件圆角。
 * @cssproperty --ea-message-box-box-shadow - 组件阴影。
 * @cssproperty --ea-message-box-title-font-size - 标题字号。
 * @cssproperty --ea-message-box-close-icon-size - 关闭图标字号。
 * @cssproperty --ea-message-box-content-font-size - 内容字号。
 * @cssproperty --ea-message-box-title-color - 标题颜色。
 * @cssproperty --ea-message-box-close-icon-color - 关闭图标颜色。
 * @cssproperty --ea-message-box-content-color - 内容颜色。
 * @cssproperty --ea-message-box-section-gap - 区域间距。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaMessageBoxElement extends EaOverlay {
  @query(bemMain.ce("header"))
  private _header!: HTMLElement;

  @query(bemMain.ce("title"))
  private _title!: HTMLElement;

  @query(bemMain.ce("type-icon"))
  private _typeIcon!: HTMLElement;

  @query(bemMain.ce("icon-close"))
  private _closeIcon!: HTMLElement;

  @query(bemMain.ce("content"))
  private _content!: HTMLElement;

  @query(bemMain.ce("description"))
  private _description!: HTMLElement;

  @query(bemMain.ce("input"))
  private _input!: any;

  @query(bemMain.ce("form"))
  private _form!: HTMLFormElement;

  @query(bemMain.ce("cancel-button"))
  private _cancelButton!: HTMLElement;

  @query(bemMain.ce("confirm-button"))
  private _confirmButton!: HTMLElement;

  @attribute({
    type: BOX_TYPES,
    default: "personalized",
    observer(this: EaMessageBoxElement) {
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
      if (!this._description) return;
      if (this.dangerouslyUseHTMLString) {
        this._description.innerHTML = html(newVal);
      } else {
        this._description.textContent = newVal;
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
      this._syncInputProps();
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
  })
  inputPattern: string = "";

  @attribute({
    type: String,
    default: "",
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

  @property({
    type: Function,
    default: null,
  })
  inputValidator:
    | ((value: string) => boolean | string | Promise<boolean | string>)
    | null = null;

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

  /** 同步输入框属性 */
  private _syncInputProps(): void {
    if (!this._input) return;

    if (this.inputPlaceholder)
      this._input.setAttribute("placeholder", this.inputPlaceholder);
    if (this.inputType) this._input.setAttribute("type", this.inputType);
    if (this.inputValue) this._input.setAttribute("value", this.inputValue);
  }

  /** 执行输入验证 */
  private async _validateInput(): Promise<boolean> {
    if (!this.showInput || !this._input) return true;

    this._input.setCustomValidity?.("");

    const value = this._input.value || this._input.getAttribute("value") || "";

    if (this.inputValidator) {
      try {
        const result = await this.inputValidator(value);
        if (result === true) {
          const isValid = this._input.checkValidity?.() ?? true;
          if (!isValid) this._input.reportValidity?.();
          return isValid;
        }
        const message =
          typeof result === "string"
            ? result
            : this.inputErrorMessage || "Validation failed";
        this._input.setCustomValidity?.(message);
        this._input.reportValidity?.();
        return false;
      } catch {
        return false;
      }
    }

    if (this.inputPattern) {
      try {
        const regex = new RegExp(this.inputPattern);
        if (!regex.test(value)) {
          this._input.setCustomValidity?.(
            this.inputErrorMessage || "Invalid input"
          );
          this._input.reportValidity?.();
          return false;
        }
      } catch {
        this._input.setCustomValidity?.(
          this.inputErrorMessage || "Invalid pattern"
        );
        this._input.reportValidity?.();
        return false;
      }
    }

    const isValid = this._input.checkValidity?.() ?? true;
    if (!isValid) {
      this._input.reportValidity?.();
    }

    return isValid;
  }

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
      <div class='${bemMain()}' part='container'>
        <header class='${bemMain.e("header")}' part='header'>
          <div class='${bemMain.e("title-container")}' part='title-wrap'>
            <ea-icon class='${bemMain.e("type-icon")}' part='type-icon'></ea-icon>
            <span class='${bemMain.e("title")}' part='title'></span>
          </div>
          <ea-icon class='${bemMain.e("icon-close")}' name='xmark' part='close-icon'></ea-icon>
        </header>
        <form class='${bemMain.e("form")}' part='content'>
          <div class='${bemMain.e("description")}' part='description'></div>
          <ea-input class='${bemMain.e("input")}' part='input'></ea-input>
          <footer class='${bemMain.e("footer")}' part='footer'>
            <ea-button class='${bemMain.e("cancel-button")}' part='cancel-button'>Cancel</ea-button>
            <ea-button class='${bemMain.e("confirm-button")}' variant='primary' type='submit' part='confirm-button'>OK</ea-button>
          </footer>
        </form>
      </div>
    `;

    return tpl.innerHTML;
  }

  /** 根据 distinguishCancelAndClose 设置派发关闭类事件 */
  private _dispatchCloseEvent(): void {
    if (!this.distinguishCancelAndClose) {
      this.dispatchEvent(new EaMessageBoxCancelEvent());
    } else {
      this.dispatchEvent(new EaMessageBoxMessageCloseEvent());
    }
  }

  @listen("submit", bemMain.ce("form"))
  private _handleFormSubmit(e: Event): void {
    e.preventDefault();

    this._validateInput().then(isValid => {
      if (isValid) {
        const value =
          this.showInput && this._input
            ? this._input.value || this._input.getAttribute("value") || ""
            : undefined;
        this.dispatchEvent(new EaMessageBoxConfirmEvent({ value }));
      }
    });
  }

  @listen("click", bemMain.ce("cancel-button"))
  private _handleCancelClick(): void {
    this.dispatchEvent(new EaMessageBoxCancelEvent());
  }

  @listen("click", bemMain.ce("icon-close"))
  private _handleCloseIconClick(): void {
    if (!this.showClose) return;
    this._dispatchCloseEvent();
  }

  @listen("mousedown", bemMain.ce("header"))
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
  protected _handleKeyDown(e: KeyboardEvent): void {
    if (!this.visible || !this.closeOnPressEscape || e.key !== "Escape") return;
    e.stopImmediatePropagation();
    e.preventDefault();
    this._dispatchCloseEvent();
  }

  @listen("click", ".ea-overlay__mask")
  protected _handleMaskClick(e: Event): void {
    if (!this.closeOnClickModal && e.target !== this._overlayContent) return;

    const isContent =
      [...this.children].find(
        child => child === e.target || child.contains(e.target as Node)
      ) ||
      this._overlayContent === e.target ||
      this._overlayContent.contains(e.target as Node);
    if (isContent) return;

    this._dispatchCloseEvent();
  }

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

    this._syncInputProps();
    this.updateContainerClasslist();
  }

  $beforeUnmount(): void {
    super.$beforeUnmount?.();
  }
}
