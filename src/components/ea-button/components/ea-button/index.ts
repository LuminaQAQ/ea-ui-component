import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { listen } from "@decorator/listen";
import { Enum } from "@/utils/Enum";
import { VARIANT_TYPES, type VariantType } from "@/constants/variant";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-button" as const;
const bem = createBEM(TAG_NAME);

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaButton extends EaBase {
  // ==================== DOM 元素引用 ====================

  private _container!: HTMLButtonElement | HTMLAnchorElement;
  private _icon!: HTMLElement;

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
      this._render();
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
      this.updateContainerClasslist();
    },
  })
  size: "small" | "medium" | "large" = "medium";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaButton, newVal: boolean) {
      const isLoading = newVal === true;
      this.toggleAttribute("disabled", isLoading);

      if (isLoading && this._container) {
        const i = document.createElement("ea-icon");
        i.id = "ea-loading-icon";
        i.setAttribute("name", "spinner");
        i.toggleAttribute("spin", true);
        i.setAttribute("size", this.size);
        i.setAttribute("part", "loading-icon");
        this._container.insertBefore(i, this._container.firstChild);
      } else if (this._container) {
        const loadingIcon =
          this._container?.querySelectorAll("#ea-loading-icon");
        if (loadingIcon?.length > 0) {
          loadingIcon.forEach(item => item.remove());
        }
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
      { icon: hasIcon }
    );

    if (this._container) {
      this._container.className = className;
    }

    return className;
  }

  /**
   * 渲染模板
   */
  private _render(): void {
    const tag = this.link ? "a" : "button";
    const hrefAttr = this.link && this.href ? `href="${this.href}"` : "";
    const typeAttr = !this.link ? `type="${this.buttonType}"` : "";

    (this.shadowRoot as ShadowRoot).innerHTML = `
      <${tag} class="${bem()}" part="container" tabindex="-1" ${hrefAttr} ${typeAttr}>
        <ea-icon class="${bem.e("icon")}" part="icon"></ea-icon>
        <slot></slot>
      </${tag}>
    `;

    // 重新查询 DOM 元素
    this._container = (this.shadowRoot as ShadowRoot).querySelector(
      bem.cb()
    ) as HTMLButtonElement | HTMLAnchorElement;
    this._icon = (this.shadowRoot as ShadowRoot).querySelector(
      bem.ce("icon")
    ) as HTMLElement;

    // 初始化属性
    if (this.icon && this._icon) {
      this._icon.setAttribute("name", this.icon);
      this._icon.setAttribute("size", this.size);
    }
  }

  html(): string {
    const tag = this.link ? "a" : "button";
    const hrefAttr = this.link && this.href ? `href="${this.href}"` : "";
    const typeAttr = !this.link ? `type="${this.buttonType}"` : "";

    return `
      <${tag} class="${bem()}" part="container" tabindex="-1" ${hrefAttr} ${typeAttr}>
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
    this._render();
    this.updateContainerClasslist();

    // 初始化 AbortController
    this._abortController = new AbortController();
  }

  $beforeUnmount(): void {
    this._abortController?.abort();
  }
}

export default EaButton;
