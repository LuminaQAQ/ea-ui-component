import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { listen } from "@decorator/listen";
import { query } from "@decorator/query";
import { Enum } from "@/utils/Enum";
import { VARIANT_TYPES, type VariantType } from "@/constants/variant";
import stylesheet from "./index.scss?inline";
import "@/components/ea-icon/index";

const TAG_NAME = "ea-button" as const;
const bem = createBEM(TAG_NAME);

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaButton extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(bem.cb())
  private _container!: HTMLButtonElement | HTMLAnchorElement;

  @query(bem.ce("icon"))
  private _icon!: HTMLElement;

  @query(bem.ce("loading-icon"))
  private _loadingIcon!: HTMLElement;

  // ==================== 属性定义 ====================

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
  buttonType: "button" | "submit" | "reset" = "button";

  // ==================== 私有属性 ====================

  private _abortController?: AbortController;

  // ==================== 方法 ====================

  /**
   * 更新容器类名
   */
  updateContainerClasslist(): string {
    const hasIcon = !!this.icon;
    const className = bem(
      {
        [this.variant]: true,
        disabled: this.disabled || this.loading,
        text: this.text || this.link,
        plain: this.plain,
        round: this.round,
        circle: this.circle,
        [this.size]: true,
      },
      { icon: hasIcon, loading: this.loading }
    );

    if (this._container) {
      this._container.className = className;
    }

    return className;
  }

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

  html(): string {
    const tag = this.link ? "a" : "button";
    const hrefAttr = this.link && this.href ? `href="${this.href}"` : "";
    const typeAttr = !this.link ? `type="${this.buttonType}"` : "";

    return `
      <${tag} class="${bem()}" part="container" tabindex="-1" ${hrefAttr} ${typeAttr}>
        <ea-icon class="${bem.e("loading-icon")}" name="spinner" spin part="loading-icon"></ea-icon>
        <ea-icon class="${bem.e("icon")}" part="icon"></ea-icon>
        <slot></slot>
      </${tag}>
    `;
  }

  // ==================== 事件处理 ====================

  @listen("keypress")
  private _handleKeyPress(e: KeyboardEvent) {
    if (e.key === "Enter") {
      this.click();
    }
  }

  @listen("click")
  private _handleClick(e: Event) {
    if (this.buttonType === "submit") {
      const form = this.closest("form");
      if (form) {
        e.preventDefault();
        form.dispatchEvent(new Event("submit"));
      }
    } else if (this.buttonType === "reset") {
      const form = this.closest("form");
      if (form) {
        e.preventDefault();
        form.reset();
      }
    }
  }

  // ==================== 生命周期 ====================

  $mount(): void {
    this.updateContainerClasslist();
    this._abortController = new AbortController();
  }

  $beforeUnmount(): void {
    this._abortController?.abort();
  }
}

export default EaButton;
