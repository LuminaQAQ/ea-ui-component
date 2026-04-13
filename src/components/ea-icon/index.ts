import { CustomElement } from "@decorator/custom-element";
import { attribute } from "@decorator/attribute";
import { query } from "@decorator/query";
import { Enum } from "@/utils/Enum";
import stylesheet from "./index.css?inline";
import faStylesheet from "@fortawesome/fontawesome-free/css/all.min.css?inline";
import variable from "@/themes/variables.scss?inline";
import host from "./host.scss?inline";

const TAG_NAME = "ea-icon" as const;

// 动态注入 Font Awesome 到 document head（只执行一次）
const injectFontAwesome = () => {
  if (document.querySelector("style[data-ea-icon-fontawesome]")) return;

  const style = document.createElement("style");
  style.textContent = faStylesheet;
  style.setAttribute("data-ea-icon-fontawesome", "");
  document.head.appendChild(style);
};

// family 映射
const FAMILY_MAP = {
  classic: "fa-classic",
  sharp: "fa-sharp",
  brands: "fa-brands",
} as const;

// variant 映射
const VARIANT_MAP = {
  solid: "fa-solid",
  regular: "fa-regular",
  light: "fa-light",
  thin: "fa-thin",
  duotone: "fa-duotone",
} as const;

export type IconFamily = keyof typeof FAMILY_MAP;
export type IconVariant = keyof typeof VARIANT_MAP;

@CustomElement(TAG_NAME, { styles: [stylesheet, variable, faStylesheet, host] })
export class EaIcon extends HTMLElement {
  // ==================== DOM 元素引用 ====================

  @query(".ea-icon")
  private _container!: HTMLElement;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  // ==================== 属性定义 ====================

  @attribute({
    type: String,
    default: "",
    observer(this: EaIcon) {
      this._updateIconClass();
    },
  })
  name: string = "";

  @attribute({
    type: Enum(["classic", "sharp", "brands"] as const),
    default: "classic",
    observer(this: EaIcon) {
      this._updateIconClass();
    },
  })
  family: IconFamily = "classic";

  @attribute({
    type: Enum(["solid", "regular", "light", "thin", "duotone"] as const),
    default: "solid",
    observer(this: EaIcon) {
      this._updateIconClass();
    },
  })
  variant: IconVariant = "solid";

  @attribute({
    type: String,
    default: "",
    observer(this: EaIcon, newVal: string) {
      this.style.setProperty("--ea-icon-color", newVal);
    },
  })
  color: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaIcon, newVal: string) {
      const sizeMap: Record<string, string> = {
        large: "14px",
        medium: "12px",
        small: "10px",
      };
      const sizeValue = sizeMap[newVal] || (newVal ? `${newVal}px` : "1rem");
      this.style.setProperty("--ea-icon-size", sizeValue);
    },
  })
  size: string = "";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaIcon, newVal: boolean) {
      this._container?.classList.toggle("fa-spin", newVal);
    },
  })
  spin: boolean = false;

  // ==================== 方法 ====================

  /**
   * 获取 Font Awesome 类名
   */
  private _getFontAwesomeClass(
    name: string,
    family: IconFamily,
    variant: IconVariant,
    spin: boolean
  ): string {
    if (!name) return "ea-icon";

    // 如果用户已经提供了完整的 Font Awesome 类名，直接使用
    if (name.startsWith("fa-")) {
      return `ea-icon ${name}${spin ? " fa-spin" : ""}`;
    }

    const faFamily = FAMILY_MAP[family];
    const faVariant = VARIANT_MAP[variant] || "fa-solid";
    const spinClass = spin ? " fa-spin" : "";

    // 使用对象映射替代条件判断
    const classMap: Record<string, string> = {
      brands: `ea-icon fa-brands fa-${name}${spinClass}`,
      classic: `ea-icon ${faVariant} fa-${name}${spinClass}`,
      sharp: `ea-icon ${faFamily} ${faVariant} fa-${name}${spinClass}`,
    };

    return classMap[family] || classMap.classic;
  }

  /**
   * 更新图标类名
   */
  private _updateIconClass(): void {
    if (!this._container) return;

    this._container.className = this._getFontAwesomeClass(
      this.name,
      this.family,
      this.variant,
      this.spin
    );
  }

  /**
   * 渲染模板
   */
  html(): string {
    const iconClass = this._getFontAwesomeClass(
      this.name,
      this.family,
      this.variant,
      this.spin
    );

    return `
      <i class="${iconClass}" part="container">
        <slot></slot>
      </i>
    `;
  }

  // ==================== 生命周期 ====================

  connectedCallback(): void {
    // 注入 Font Awesome 样式
    injectFontAwesome();

    // 初始化样式
    if (this.color) {
      this.style.setProperty("--ea-icon-color", this.color);
    }

    if (this.size) {
      const sizeMap: Record<string, string> = {
        large: "14px",
        medium: "12px",
        small: "10px",
      };
      const sizeValue =
        sizeMap[this.size] || (this.size ? `${this.size}px` : "1rem");
      this.style.setProperty("--ea-icon-size", sizeValue);
    }
  }
}

export default EaIcon;
