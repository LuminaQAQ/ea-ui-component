import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { Enum } from "@utils/Enum";
import stylesheet from "./index.scss?inline";
import "@/components/ea-icon/index";

const TAG_NAME = "ea-link" as const;
const bem = createBEM(TAG_NAME);

/**
 * Link 类型
 */
export type LinkType =
  | "normal"
  | "primary"
  | "success"
  | "info"
  | "warning"
  | "danger";

/**
 * Underline 类型
 */
export type UnderlineType = "always" | "hover" | "never";

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaLink extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(".ea-link")
  private _container!: HTMLAnchorElement;

  @query(".ea-link__icon")
  private _icon!: HTMLElement;

  // ==================== 属性定义 ====================

  @attribute({
    type: Enum(["normal", "primary", "success", "info", "warning", "danger"]),
    default: "normal",
    observer(this: EaLink) {
      this._container.className = this.updateContainerClasslist();
    },
  })
  type: LinkType = "normal";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaLink) {
      this._container.className = this.updateContainerClasslist();
    },
  })
  disabled: boolean = false;

  @attribute({
    type: Enum(["always", "hover", "never"]),
    default: "",
    observer(this: EaLink) {
      this._container.className = this.updateContainerClasslist();
    },
  })
  underline: UnderlineType | "" = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaLink, newVal: string) {
      this._container.href = newVal;
    },
  })
  href: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaLink, newVal: string) {
      this._icon.setAttribute("name", newVal);
      this._container.className = this.updateContainerClasslist();
    },
  })
  icon: string = "";

  // ==================== 方法 ====================

  /**
   * 更新容器类名
   */
  updateContainerClasslist(): string {
    const className = bem(
      {
        [this.type]: true,
        [`underline-${this.underline}`]: !!this.underline,
      },
      { disabled: this.disabled, icon: this.icon.length > 0 }
    );

    return className;
  }

  /**
   * 渲染模板
   */
  html(): string {
    return `
      <a class="${this.updateContainerClasslist()}" part="container" tabindex="-1">
        <ea-icon class="ea-link__icon" part="icon"></ea-icon>
        <slot></slot>
      </a>
    `;
  }

  // ==================== 生命周期 ====================

  $mount(): void {
    this._container.className = this.updateContainerClasslist();
  }
}

export default EaLink;
