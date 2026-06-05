import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query, listen } from "@decorator";
import { html } from "@utils/html";
import { timeout } from "@utils/timeout";
import { Enum } from "@utils/Enum";
import {
  VARIANT_TYPES,
  VARIANT_DEFAULT,
  VARIANT_ICON_MAP,
  type VariantType,
} from "@/constants/variant";
import { EaAlertCloseEvent } from "./events/EaAlertCloseEvent";
import { EaAlertOpenEvent } from "./events/EaAlertOpenEvent";
import stylesheet from "./index.scss?inline";
import "@/components/ea-icon/index";

const TAG_NAME = "ea-alert" as const;
const bem = createBEM(TAG_NAME);

const EFFECT_TYPES = ["light", "dark"] as const;
type EffectType = (typeof EFFECT_TYPES)[number];

/**
 * @summary 警告提示组件，用于展示重要的提示信息，支持多种类型和可关闭功能。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-icon
 *
 * @slot icon - 自定义图标内容。
 * @slot heading - 自定义标题内容。
 * @slot default - 默认插槽，用于描述内容。
 *
 * @event ea-close - 关闭时触发，detail: `{ visible: false }`。
 * @event ea-open - 组件显示后触发。
 *
 * @csspart container - 容器元素。
 * @csspart icon-wrap - 图标包裹元素。
 * @csspart content-wrap - 内容包裹元素。
 * @csspart heading - 标题元素。
 * @csspart description - 描述元素。
 * @csspart close-btn - 关闭按钮元素。
 * @csspart icon - 图标元素。
 * @csspart close-icon - 关闭图标元素。
 *
 * @cssproperty --ea-alert-padding - 组件内边距。
 * @cssproperty --ea-alert-border-radius - 组件圆角。
 * @cssproperty --ea-alert-transition - 过渡动画时长。
 * @cssproperty --ea-alert-icon-size - 图标尺寸。
 * @cssproperty --ea-alert-icon-margin-right - 图标右边距。
 * @cssproperty --ea-alert-content-gap - 内容间距。
 * @cssproperty --ea-alert-close-position-top - 关闭按钮顶部定位。
 * @cssproperty --ea-alert-close-position-right - 关闭按钮右侧定位。
 * @cssproperty --ea-alert-close-icon-size - 关闭图标尺寸。
 * @cssproperty --ea-alert-close-icon-color - 关闭图标颜色。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaAlert extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @query(`${bem.ce("icon-wrap")} slot[name="icon"]`)
  private _alertIcon!: HTMLElement;

  @query(`${bem.ce("heading")} slot[name="heading"]`)
  private _alertHeading!: HTMLElement;

  @query(`${bem.ce("description")} slot`)
  private _alertDescription!: HTMLElement;

  @query(bem.ce("close-btn"))
  private _alertCloseBtn!: HTMLButtonElement;

  private _transitionAbortController?: AbortController;

  private _closeFallbackTimer?: number;

  private _isHidden: boolean = false;

  private _hasDescription: boolean = false;

  private _showAfterTimer?: number;

  private _autoCloseTimer?: number;

  private _hideAfterTimer?: number;

  @attribute({
    type: String,
    default: "",
    observer(this: EaAlert) {
      this._updateHeading();
    },
  })
  heading: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaAlert) {
      this._updateDescription();
    },
  })
  description: string = "";

  @attribute({
    type: Enum(VARIANT_TYPES),
    default: VARIANT_DEFAULT,
    observer(this: EaAlert) {
      this.updateContainerClasslist();
      this._updateIcon();
    },
  })
  variant: VariantType = VARIANT_DEFAULT;

  @attribute({
    type: Enum(EFFECT_TYPES),
    default: "light",
    observer(this: EaAlert) {
      this.updateContainerClasslist();
    },
  })
  effect: EffectType = "light";

  @attribute({
    type: String,
    default: "",
    observer(this: EaAlert) {
      this._updateCloseBtn();
    },
  })
  closeText: string = "";

  @attribute({
    type: Boolean,
    default: true,
    a11y: {
      ariaAttr: "inert",
      target: ".ea-alert__close-btn",
      map: v => (v ? null : ""),
    },
    observer(this: EaAlert) {
      this._updateCloseBtn();
    },
  })
  closable: boolean = true;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaAlert) {
      this._updateIcon();
    },
  })
  showIcon: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaAlert) {
      this.updateContainerClasslist();
    },
  })
  center: boolean = false;

  @attribute({
    type: Number,
    default: 0,
    observer(this: EaAlert, newVal: number) {
      clearTimeout(this._showAfterTimer);
      newVal = Math.abs(newVal);
      this._isHidden = newVal > 0;
      this.updateContainerClasslist();

      this._showAfterTimer = timeout(() => {
        this._isHidden = false;
        this.dispatchEvent(new EaAlertOpenEvent());
        this.updateContainerClasslist();
      }, newVal);
    },
  })
  showAfter: number = 0;

  @attribute({
    type: Number,
    default: 0,
    observer(this: EaAlert, newVal: number) {
      clearTimeout(this._autoCloseTimer);
      if (newVal) {
        this._autoCloseTimer = timeout(() => this._handleClose(), newVal);
      }
    },
  })
  autoClose: number = 0;

  @attribute({
    type: Number,
    default: 0,
  })
  hideAfter: number = 0;

  /** 更新标题内容，为空时恢复 slot */
  private _updateHeading(): void {
    this._alertHeading.innerHTML =
      html(this.heading) || '<slot name="heading"></slot>';
  }

  /** 更新描述内容，为空时恢复 slot */
  private _updateDescription(): void {
    this._hasDescription = !!this.description;
    this._alertDescription.innerHTML =
      html(this.description) || "<slot></slot>";
    this.updateContainerClasslist();
  }

  /** 更新图标内容 */
  private _updateIcon(): void {
    this._alertIcon.innerHTML = this.showIcon
      ? html(
          `<ea-icon class="${bem.e("icon")}" name="${VARIANT_ICON_MAP[this.variant]}" part="icon"></ea-icon>`
        )
      : "";
  }

  /** 更新关闭按钮内容，closable 为 false 时清空，closeText 为空时恢复图标 */
  private _updateCloseBtn(): void {
    if (!this.closable) {
      this._alertCloseBtn.innerHTML = "";
      return;
    }
    this._alertCloseBtn.innerHTML = this.closeText
      ? html(this.closeText)
      : html(
          `<ea-icon class="${bem.e("close-icon")}" name="xmark" part="close-icon"></ea-icon>`
        );
  }

  /** 更新容器类名 */
  updateContainerClasslist(): string {
    const className = bem(
      { [this.variant]: true, [this.effect]: true },
      {
        center: this.center,
        hide: this._isHidden,
        "has-description": this._hasDescription,
      }
    );

    if (this._container) {
      this._container.className = className;
      if (this._isHidden) {
        this._container.setAttribute("inert", "");
      } else {
        this._container.removeAttribute("inert");
      }
    }

    return className;
  }

  /** 渲染模板 */
  html(): string {
    const iconContent = this.showIcon
      ? `<ea-icon class="${bem.e("icon")}" name="${VARIANT_ICON_MAP[this.variant]}" part="icon"></ea-icon>`
      : "";

    const closeContent = this.closable
      ? this.closeText
        ? html(this.closeText)
        : `<ea-icon class="${bem.e("close-icon")}" name="xmark" part="close-icon"></ea-icon>`
      : "";

    return `
      <div class="${this.updateContainerClasslist()}" part='container'>
        <span class="${bem.e("icon-wrap")}" part='icon-wrap'>
          <slot name='icon'>${iconContent}</slot>
        </span>
        <div class="${bem.e("content")}" part='content-wrap'>
          <span class="${bem.e("heading")}" part='heading'>
            <slot name="heading">${html(this.heading)}</slot>
          </span>
          <p class="${bem.e("description")}" part='description'>
            <slot>${html(this.description)}</slot>
          </p>
        </div>
        <button type="button" class="${bem.e("close-btn")}" part="close-btn" aria-label="Close">${closeContent}</button>
      </div>
    `;
  }

  /** 关闭事件处理 */
  @listen("click", bem.ce("close-btn"))
  private _handleClose() {
    if (!this.closable && this.autoClose <= 0) return;

    const doClose = () => {
      this._container.classList.add(bem.s("before-close"));

      this._transitionAbortController?.abort();
      this._transitionAbortController = new AbortController();

      const transitionDuration =
        parseFloat(getComputedStyle(this._container).transitionDuration) || 0.3;

      const doRemove = () => {
        clearTimeout(this._closeFallbackTimer);
        this._transitionAbortController?.abort();
        this.dispatchEvent(new EaAlertCloseEvent({ visible: false }));
        this.remove();
      };

      this._container.addEventListener(
        "transitionend",
        (e: TransitionEvent) => {
          if (e.target !== this._container || e.propertyName !== "filter")
            return;
          doRemove();
        },
        { signal: this._transitionAbortController.signal }
      );

      this._closeFallbackTimer = timeout(
        doRemove,
        (transitionDuration + 0.1) * 1000
      );
    };

    clearTimeout(this._hideAfterTimer);

    if (this.hideAfter > 0) {
      this._hideAfterTimer = timeout(doClose, this.hideAfter);
    } else {
      doClose();
    }
  }

  $mount(): void {
    this.setAttribute("role", "alert");
    this.updateContainerClasslist();
  }

  $beforeUnmount(): void {
    this._transitionAbortController?.abort();
    clearTimeout(this._closeFallbackTimer);
    clearTimeout(this._showAfterTimer);
    clearTimeout(this._autoCloseTimer);
    clearTimeout(this._hideAfterTimer);
  }
}
