import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query } from "@decorator";
import { Enum } from "@utils/Enum";
import { VARIANT_TYPES } from "@constants/variant";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-text" as const;
const bem = createBEM(TAG_NAME);

const TEXT_VARIANT_TYPES = [...VARIANT_TYPES, "normal"] as const;
type TextVariantType = (typeof TEXT_VARIANT_TYPES)[number];

const TEXT_SIZE_TYPES = ["large", "medium", "small"] as const;
type TextSizeType = (typeof TEXT_SIZE_TYPES)[number];

const ALLOWED_TAGS = [
  "span",
  "p",
  "b",
  "i",
  "sub",
  "sup",
  "ins",
  "del",
  "mark",
] as const;

/**
 * @summary 文本组件，用于文本的常见操作，支持多种类型、尺寸、截断和标签覆盖。
 * @status stable
 * @since 3.0
 *
 * @slot default - 默认插槽，用于文本内容。
 *
 * @csspart container - 容器元素。
 *
 * @cssproperty --ea-text-line-clamp - 截断行数，默认为 0。
 * @cssproperty --ea-text-primary-color - 主色文本颜色。
 * @cssproperty --ea-text-success-color - 成功文本颜色。
 * @cssproperty --ea-text-info-color - 信息文本颜色。
 * @cssproperty --ea-text-warning-color - 警告文本颜色。
 * @cssproperty --ea-text-danger-color - 危险文本颜色。
 * @cssproperty --ea-text-small-font-size - 小号字体大小。
 * @cssproperty --ea-text-medium-font-size - 中号字体大小。
 * @cssproperty --ea-text-large-font-size - 大号字体大小。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaText extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @attribute({
    type: Enum(TEXT_VARIANT_TYPES),
    default: "normal",
    observer(this: EaText) {
      this.updateContainerClasslist();
    },
  })
  variant: TextVariantType = "normal";

  @attribute({
    type: Enum(TEXT_SIZE_TYPES),
    default: "medium",
    observer(this: EaText) {
      this.updateContainerClasslist();
    },
  })
  size: TextSizeType = "medium";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaText) {
      this.updateContainerClasslist();
      this._updateTitle();
    },
  })
  truncated: boolean = false;

  @attribute({
    type: Number,
    default: 0,
    observer(this: EaText, newVal: number) {
      this.style.setProperty("--ea-text-line-clamp", String(newVal));
      this.updateContainerClasslist();
      this._updateTitle();
    },
  })
  lineClamp: number = 0;

  @attribute({
    type: Enum(ALLOWED_TAGS),
    default: "span",
    observer(this: EaText) {
      this._reRender();
    },
  })
  tag: string = "span";

  updateContainerClasslist(): string {
    const className = bem({
      [this.variant]: true,
      [this.size]: true,
      truncated: this.truncated,
      "line-clamp": this.lineClamp > 0,
    });

    if (this._container) {
      this._container.className = className;
    }

    return className;
  }

  /**
   * 重新渲染组件模板
   */
  private _reRender(): void {
    if (!this.shadowRoot) return;

    const usesAdoptedStyleSheets =
      this.shadowRoot.adoptedStyleSheets?.length > 0;

    this.shadowRoot.innerHTML = "";

    if (!usesAdoptedStyleSheets) {
      const styleEl = document.createElement("style");
      styleEl.textContent = stylesheet;
      this.shadowRoot.appendChild(styleEl);
    }

    const templateEl = document.createElement("template");
    templateEl.innerHTML = this.html();
    this.shadowRoot.appendChild(templateEl.content);

    if (this.lineClamp > 0) {
      this.style.setProperty("--ea-text-line-clamp", String(this.lineClamp));
    }

    this.updateContainerClasslist();
    this._updateTitle();
  }

  /**
   * 当 truncated 或 line-clamp 启用时，自动将文本内容设置为容器 title
   */
  private _updateTitle(): void {
    if (!this._container) return;

    const userTitle = this.getAttribute("title");

    if (userTitle) {
      this._container.title = userTitle;
      return;
    }

    if (this.truncated || this.lineClamp > 0) {
      this._container.title = this.textContent || "";
    } else {
      this._container.title = "";
    }
  }

  html(): string {
    return `
      <${this.tag} class="${this.updateContainerClasslist()}" part="container">
        <slot></slot>
      </${this.tag}>
    `;
  }

  $mount(): void {
    this.updateContainerClasslist();
    this._updateTitle();
  }
}

export default EaText;
