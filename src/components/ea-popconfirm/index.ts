import { EaPopper } from "@common/ea-popper/index";
import { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { listen } from "@decorator/listen";
import { query } from "@decorator/query";
import { Enum } from "@/utils/Enum";
import "@/components/ea-icon/index";
import "@/components/ea-button/index";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-popconfirm" as const;
const bem = createBEM(TAG_NAME);

const BUTTON_TYPE_OPTIONS = [
  "normal",
  "primary",
  "success",
  "warning",
  "danger",
] as const;

type ButtonType = (typeof BUTTON_TYPE_OPTIONS)[number];

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaPopconfirm extends EaPopper {
  // ==================== DOM 元素引用 ====================

  @query(`.${bem.e("title")} ea-icon`)
  private _titleIcon!: HTMLElement;

  @query(`.${bem.e("title-content")}`)
  private _titleContent!: HTMLElement;

  @query(`.${bem.e("cancel")}`)
  private _cancelButton!: HTMLElement;

  @query(`.${bem.e("confirm")}`)
  private _confirmButton!: HTMLElement;

  private _globalCloseAbortController?: AbortController;

  // ==================== 属性定义 ====================

  @attribute({
    type: String,
    default: "",
    observer(this: EaPopconfirm, newVal: string) {
      if (this._titleContent) {
        this._titleContent.innerText = newVal;
      }
    },
  })
  heading: string = "";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaPopconfirm, newVal: boolean) {
      this.status = newVal;
    },
  })
  visible: boolean = false;

  @attribute({
    type: String,
    default: "circle-question",
    observer(this: EaPopconfirm, newVal: string) {
      if (this._titleIcon) {
        this._titleIcon.setAttribute("name", newVal);
      }
    },
  })
  icon: string = "circle-question";

  @attribute({
    type: String,
    default: "rgb(255, 153, 0)",
    observer(this: EaPopconfirm, newVal: string) {
      if (!CSS.supports("color", newVal))
        return console.warn(
          `[EaPopconfirm] The color value ${newVal} is not supported.`
        );

      this.style.setProperty("--ea-popconfirm-title-icon-color", newVal);
    },
  })
  iconColor: string = "rgb(255, 153, 0)";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaPopconfirm) {
      this.updateContainerClasslist();
    },
  })
  hideIcon: boolean = false;

  @attribute({
    type: String,
    default: "确定",
    observer(this: EaPopconfirm, newVal: string) {
      if (this._confirmButton) {
        this._confirmButton.textContent = newVal;
      }
    },
  })
  confirmButtonText: string = "确定";

  @attribute({
    type: String,
    default: "取消",
    observer(this: EaPopconfirm, newVal: string) {
      if (this._cancelButton) {
        this._cancelButton.textContent = newVal;
      }
    },
  })
  cancelButtonText: string = "取消";

  @attribute({
    type: Enum(BUTTON_TYPE_OPTIONS),
    default: "primary",
    observer(this: EaPopconfirm, newVal: string) {
      if (this._confirmButton) {
        this._confirmButton.setAttribute("variant", newVal);
      }
    },
  })
  confirmButtonType: ButtonType = "primary";

  @attribute({
    type: Enum(BUTTON_TYPE_OPTIONS),
    default: "normal",
    observer(this: EaPopconfirm, newVal: string) {
      if (this._cancelButton) {
        this._cancelButton.setAttribute("variant", newVal);
      }
    },
  })
  cancelButtonType: ButtonType = "normal";

  // ==================== 方法 ====================

  updateContainerClasslist(): string {
    const className = super.updateContainerClasslist();

    if (this._container) {
      if (this.hideIcon) {
        this._container.classList.add("is-icon-hidden");
      } else {
        this._container.classList.remove("is-icon-hidden");
      }
    }

    return this._container?.className || className;
  }

  html(): string {
    return `
      <div class="${this.updateContainerClasslist()}" part="container" tabindex="-1">
        <div class="ea-popper__reference" part="reference" tabindex="-1">
          <div class="ea-popper__original" part="original" tabindex="0">
            <section class="${bem.e("title")}" part="title">
              <ea-icon name="${this.icon}" part="icon"></ea-icon>
              <span class="${bem.e("title-content")}" part="title-content">${this.heading}</span>
            </section>
            <footer class="${bem.e("footer")}" part="footer">
              <slot name="actions">
                <ea-button variant="${this.cancelButtonType}" class="${bem.e("cancel")}" size="small" part="cancel-button" text>${this.cancelButtonText}</ea-button>
                <ea-button variant="${this.confirmButtonType}" class="${bem.e("confirm")}" part="confirm-button" size="small">${this.confirmButtonText}</ea-button>
              </slot>
            </footer>
          </div>
          <slot name="reference"></slot>
        </div>
      </div>
    `;
  }

  // ==================== 事件处理 ====================

  @listen("click", `.${bem.e("cancel")}`)
  private _onCancelClick(): void {
    this.emit("cancel");
    this.hide();
  }

  @listen("click", `.${bem.e("confirm")}`)
  private _onConfirmClick(): void {
    this.emit("confirm");
    this.hide();
  }

  @listen("click", 'slot[name="reference"]')
  private _onReferenceClick(): void {
    this.open();
  }

  // ==================== 方法 ====================

  open(): void {
    const onClose = (e: MouseEvent) => {
      const isThis = this.contains(e.target as Node);

      if (!isThis) {
        this._globalCloseAbortController?.abort();
        this.hide();
      }
    };

    this.show();

    this._globalCloseAbortController?.abort();
    this._globalCloseAbortController = new AbortController();

    window.addEventListener("click", onClose, {
      signal: this._globalCloseAbortController.signal,
    });
  }

  close(): void {
    this.hide();
    this._globalCloseAbortController?.abort();
  }

  // ==================== 生命周期 ====================

  $mount(): void {
    super.$mount();
  }

  $beforeUnmount(): void {
    super.$beforeUnmount();
    this._globalCloseAbortController?.abort();
  }
}
