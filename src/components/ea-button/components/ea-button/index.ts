import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query, listen } from "@decorator";
import { Enum } from "@utils/Enum";
import { VARIANT_TYPES, type VariantType } from "@constants/variant";
import stylesheet from "./index.scss?inline";
import "@/components/ea-icon/index";

const TAG_NAME = "ea-button" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 按钮组件，用于触发操作，支持多种变体、尺寸和状态。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-icon
 *
 * @slot default - 默认插槽，用于按钮内容。
 *
 * @csspart container - 按钮容器元素。
 * @csspart icon - 图标元素。
 * @csspart loading-icon - 加载图标元素。
 *
 * @cssproperty --ea-button-border-radius - 按钮圆角。
 * @cssproperty --ea-button-font-size - 按钮字体大小。
 * @cssproperty --ea-button-transition - 过渡动画时长。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaButton extends EaBase {
  @query(bem.cb())
  private _container!: HTMLButtonElement | HTMLAnchorElement;

  @query(bem.ce("icon"))
  private _icon!: HTMLElement;

  @query(bem.ce("loading-icon"))
  private _loadingIcon!: HTMLElement;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaButton) {
      this.updateContainerClasslist();
    },
  })
  disabled: boolean = false;

  @attribute({
    type: Enum([...VARIANT_TYPES, "normal"]),
    default: "normal",
    observer(this: EaButton) {
      this.updateContainerClasslist();
    },
  })
  variant: VariantType | "normal" = "normal";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaButton) {
      this.updateContainerClasslist();
    },
  })
  text: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaButton) {
      this.updateContainerClasslist();
    },
  })
  plain: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaButton) {
      this.updateContainerClasslist();
    },
  })
  round: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaButton) {
      this.updateContainerClasslist();
    },
  })
  circle: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaButton) {
      this._renderContainer();
      this.updateContainerClasslist();
    },
  })
  link: boolean = false;

  @attribute({
    type: String,
    default: "",
    observer(this: EaButton, newVal: string) {
      this.updateContainerClasslist();
      if (this._container && newVal) {
        (this._container as HTMLAnchorElement).href = newVal;
      }
    },
  })
  href: string = "";

  @attribute({
    type: ["small", "medium", "large"] as const,
    default: "medium",
    observer(this: EaButton) {
      if (this._loadingIcon) {
        this._loadingIcon.setAttribute("size", this.size);
      }
      this.updateContainerClasslist();
    },
  })
  size: "small" | "medium" | "large" = "medium";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaButton, newVal: boolean) {
      this.toggleAttribute("disabled", newVal === true);

      if (this._loadingIcon) {
        this._loadingIcon.setAttribute("size", this.size);
      }

      this.updateContainerClasslist();
    },
  })
  loading: boolean = false;

  @attribute({
    type: String,
    default: "",
    observer(this: EaButton, newVal: string) {
      if (this._icon) {
        this._icon.setAttribute("name", newVal);
        this._icon.setAttribute("size", this.size);
      }
      this.updateContainerClasslist();
    },
  })
  icon: string = "";

  @attribute({
    type: Enum(["button", "submit", "reset"]),
    default: "button",
    observer(this: EaButton, newVal: string) {
      if (this._container && !this.link) {
        this._container.setAttribute("type", newVal);
      }
    },
  })
  type: "button" | "submit" | "reset" = "button";

  @attribute({
    type: String,
    default: "",
    observer(this: EaButton, newVal: string) {
      if (this._container && this.link) {
        (this._container as HTMLAnchorElement).target = newVal;
      }
    },
  })
  target: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaButton, newVal: string) {
      if (this._container && this.link) {
        (this._container as HTMLAnchorElement).rel = newVal;
      }
    },
  })
  rel: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaButton, newVal: string) {
      if (this._container && this.link) {
        (this._container as HTMLAnchorElement).download = newVal;
      }
    },
  })
  download: string = "";

  /** 更新容器类名 */
  updateContainerClasslist(): string {
    const hasIcon = !!this.icon;
    const isDisabled = this.disabled || this.loading;
    const className = bem(
      {
        [this.variant]: true,
        text: this.text || this.link,
        plain: this.plain,
        round: this.round,
        circle: this.circle,
        link: this.link,
        [this.size]: true,
      },
      { icon: hasIcon, loading: this.loading, disabled: isDisabled }
    );

    if (this._container) {
      this._container.className = className;
    }

    return className;
  }

  /** 重新渲染容器（link 切换时替换 button/a 标签） */
  private _renderContainer(): void {
    const container = this._container;
    if (!container) return;

    const tag = this.link ? "a" : "button";
    if (container.tagName.toLowerCase() === tag) return;

    const templateEl = document.createElement("template");
    templateEl.innerHTML = this.html();
    const newContainer = templateEl.content.firstElementChild as HTMLElement;
    if (!newContainer) return;

    container.replaceWith(newContainer);
  }

  /** 渲染模板 */
  html(): string {
    const tag = this.link ? "a" : "button";
    const hrefAttr = this.link && this.href ? `href="${this.href}"` : "";
    const targetAttr =
      this.link && this.target ? `target="${this.target}"` : "";
    const relAttr = this.link && this.rel ? `rel="${this.rel}"` : "";
    const downloadAttr =
      this.link && this.download ? `download="${this.download}"` : "";
    const typeAttr = !this.link ? `type="${this.type}"` : "";

    return `
      <${tag} class="${bem()}" part="container" tabindex="-1" ${hrefAttr} ${targetAttr} ${relAttr} ${downloadAttr} ${typeAttr}>
        <ea-icon class="${bem.e("loading-icon")}" name="spinner" spin part="loading-icon"></ea-icon>
        <ea-icon class="${bem.e("icon")}" part="icon"></ea-icon>
        <slot></slot>
      </${tag}>
    `;
  }

  @listen("keypress")
  private _handleKeyPress(e: KeyboardEvent) {
    if (e.key === "Enter") {
      this.click();
    }
  }

  @listen("click")
  private _handleClick(e: Event) {
    if (this.type === "submit") {
      const form = this.closest("form");
      if (form) {
        e.preventDefault();
        form.dispatchEvent(new Event("submit"));
      }
    } else if (this.type === "reset") {
      const form = this.closest("form");
      if (form) {
        e.preventDefault();
        form.reset();
      }
    }
  }

  $mount(): void {
    this.updateContainerClasslist();
  }
}

export default EaButton;
