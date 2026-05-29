import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query } from "@decorator";
import { Enum } from "@utils/Enum";
import stylesheet from "./index.scss?inline";
import faStylesheet from "@fortawesome/fontawesome-free/css/all.min.css?inline";

const TAG_NAME = "ea-icon" as const;
const bem = createBEM(TAG_NAME);

const injectFontAwesome = () => {
  if (document.querySelector("style[data-ea-icon-fontawesome]")) return;

  const style = document.createElement("style");
  style.textContent = faStylesheet;
  style.setAttribute("data-ea-icon-fontawesome", "");
  document.head.appendChild(style);
};

const FAMILY_MAP = {
  classic: "fa-classic",
  sharp: "fa-sharp",
  brands: "fa-brands",
} as const;

const VARIANT_MAP = {
  solid: "fa-solid",
  regular: "fa-regular",
  light: "fa-light",
  thin: "fa-thin",
  duotone: "fa-duotone",
} as const;

export type IconFamily = keyof typeof FAMILY_MAP;
export type IconVariant = keyof typeof VARIANT_MAP;

/**
 * @summary 图标组件，基于 Font Awesome 提供常用图标集合，支持多种家族、样式、颜色和大小配置。
 * @status stable
 * @since 3.0
 *
 * @slot default - 默认插槽，用于自定义内容。
 *
 * @csspart container - 图标容器元素。
 *
 * @cssproperty --ea-icon-size - 图标大小。
 * @cssproperty --ea-icon-color - 图标颜色。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet, faStylesheet] })
export class EaIcon extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

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
    observer(this: EaIcon) {
      this._updateIconClass();
    },
  })
  spin: boolean = false;

  /**
   * 获取 Font Awesome 类名
   * @param name 图标名称
   * @param family 图标家族
   * @param variant 图标样式
   * @param spin 是否旋转
   * @returns 类名字符串
   */
  private _getFontAwesomeClass(
    name: string,
    family: IconFamily,
    variant: IconVariant,
    spin: boolean
  ): string {
    if (!name) return bem();

    const spinClass = spin ? " fa-spin" : "";

    if (name.startsWith("fa-")) {
      return `${bem()} ${name}${spinClass}`;
    }

    const faFamily = FAMILY_MAP[family];
    const faVariant = VARIANT_MAP[variant] || "fa-solid";

    const classMap: Record<string, string> = {
      brands: `${bem()} fa-brands fa-${name}${spinClass}`,
      classic: `${bem()} ${faVariant} fa-${name}${spinClass}`,
      sharp: `${bem()} ${faFamily} ${faVariant} fa-${name}${spinClass}`,
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

  $mount(): void {
    injectFontAwesome();

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
