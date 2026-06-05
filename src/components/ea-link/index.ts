import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query, listen } from "@decorator";
import { Enum } from "@utils/Enum";
import { VARIANT_TYPES, type VariantType } from "@constants/variant";
import stylesheet from "./index.scss?inline";
import "@/components/ea-icon/index";

const TAG_NAME = "ea-link" as const;
const bem = createBEM(TAG_NAME);

const UNDERLINE_TYPES = ["always", "hover", "never"] as const;
type UnderlineType = (typeof UNDERLINE_TYPES)[number];

/**
 * @summary 文字链接组件，用于文字超链接场景，支持多种类型、下划线控制、图标和原生链接属性。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-icon
 *
 * @slot default - 默认插槽，用于链接文本内容。
 *
 * @csspart container - 链接容器元素。
 * @csspart icon - 图标元素。
 *
 * @cssproperty --ea-link-font-size - 链接字体大小。
 * @cssproperty --ea-link-transition - 过渡动画时长。
 * @cssproperty --ea-link-icon-margin-right - 图标右边距。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaLink extends EaBase {
  @query(bem.cb())
  private _container!: HTMLAnchorElement;

  @query(bem.ce("icon"))
  private _icon!: HTMLElement;

  @attribute({
    type: Enum([...VARIANT_TYPES, "normal"]),
    default: "normal",
    observer(this: EaLink) {
      this.updateContainerClasslist();
    },
  })
  variant: VariantType | "normal" = "normal";

  @attribute({
    type: Boolean,
    default: false,
    a11y: {
      ariaAttr: "aria-disabled",
      map: v => String(v),
    },
    observer(this: EaLink) {
      this.updateContainerClasslist();
      this._updateTabindex();
    },
  })
  disabled: boolean = false;

  @attribute({
    type: Enum(UNDERLINE_TYPES),
    default: "",
    observer(this: EaLink) {
      this.updateContainerClasslist();
    },
  })
  underline: UnderlineType | "" = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaLink, newVal: string) {
      if (this._container) this._container.href = newVal;
      this._updateLinkRole();
      this._updateTabindex();
    },
  })
  href: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaLink, newVal: string) {
      if (this._container) this._container.target = newVal;
    },
  })
  target: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaLink, newVal: string) {
      if (this._container) this._container.rel = newVal;
    },
  })
  rel: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaLink, newVal: string) {
      if (this._container) this._container.download = newVal;
    },
  })
  download: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaLink, newVal: string) {
      if (this._icon) this._icon.setAttribute("name", newVal);
      this.updateContainerClasslist();
    },
  })
  icon: string = "";

  /** 更新容器类名 */
  updateContainerClasslist(): string {
    const className = bem(
      {
        [this.variant]: true,
        [`underline-${this.underline}`]: !!this.underline,
      },
      { disabled: this.disabled, icon: !!this.icon }
    );

    if (this._container) this._container.className = className;

    return className;
  }

  /** 同步原生链接属性到容器 */
  private _syncLinkAttributes(): void {
    if (!this._container) return;
    if (this.href) this._container.href = this.href;
    if (this.target) this._container.target = this.target;
    if (this.rel) this._container.rel = this.rel;
    if (this.hasAttribute("download")) this._container.download = this.download;
  }

  /** disabled 时或无 href 时更新 tabindex */
  private _updateTabindex(): void {
    if (!this._container) return;
    if (this.disabled) {
      this._container.setAttribute("tabindex", "-1");
    } else if (!this.href) {
      this._container.setAttribute("tabindex", "0");
    } else {
      this._container.removeAttribute("tabindex");
    }
  }

  /** 无 href 时添加 role="link" 保持链接语义 */
  private _updateLinkRole(): void {
    if (!this._container) return;
    if (!this.href) {
      this._container.setAttribute("role", "link");
    } else {
      this._container.removeAttribute("role");
    }
  }

  /** 渲染模板 */
  html(): string {
    const hrefAttr = this.href ? `href="${this.href}"` : "";
    const targetAttr = this.target ? `target="${this.target}"` : "";
    const relAttr = this.rel ? `rel="${this.rel}"` : "";
    const downloadAttr = this.hasAttribute("download")
      ? `download="${this.download}"`
      : "";
    const roleAttr = !this.href ? 'role="link"' : "";
    const tabindexAttr = this.disabled
      ? 'tabindex="-1"'
      : !this.href
        ? 'tabindex="0"'
        : "";

    return `
      <a class="${this.updateContainerClasslist()}" part="container" ${hrefAttr} ${targetAttr} ${relAttr} ${downloadAttr} ${roleAttr} ${tabindexAttr}>
        <ea-icon class="${bem.e("icon")}" part="icon"></ea-icon>
        <slot></slot>
      </a>
    `;
  }

  $mount(): void {
    this.updateContainerClasslist();
    this._syncLinkAttributes();
    this._updateTabindex();
    this._updateLinkRole();
  }

  /** 无 href 时按 Enter 触发点击，符合 WAI-ARIA link 键盘交互规范 */
  @listen("keydown", bem.cb())
  private _handleKeydown(e: KeyboardEvent): void {
    if (this.disabled) return;
    if (e.key === "Enter" && !this.href) {
      this._container.click();
    }
  }
}

export default EaLink;
