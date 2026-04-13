import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { Enum } from "@utils/Enum";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-text" as const;
const bem = createBEM(TAG_NAME);

/**
 * Text 类型
 */
export type TextType =
  | "normal"
  | "primary"
  | "success"
  | "info"
  | "warning"
  | "danger";

/**
 * Text 尺寸
 */
export type TextSize = "large" | "medium" | "small";

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaText extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(".ea-text")
  private _container!: HTMLElement;

  // ==================== 属性定义 ====================

  @attribute({
    type: Enum(["normal", "primary", "success", "info", "warning", "danger"]),
    default: "normal",
    observer(this: EaText) {
      this.updateContainerClasslist();
    },
  })
  type: TextType = "normal";

  @attribute({
    type: Enum(["large", "medium", "small"]),
    default: "medium",
    observer(this: EaText) {
      this.updateContainerClasslist();
    },
  })
  size: TextSize = "medium";

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
      this._container?.style.setProperty(
        "--ea-text-line-clamp",
        String(newVal)
      );
      this.updateContainerClasslist();
      this._updateTitle();
    },
  })
  lineClamp: number = 0;

  @attribute({
    type: String,
    default: "span",
    observer(this: EaText) {
      // 重新渲染模板
      this._reRender();

      if (this.hasAttribute("line-clamp")) {
        this._container?.style.setProperty(
          "--ea-text-line-clamp",
          String(this.lineClamp)
        );
      }

      this.updateContainerClasslist();
      this._updateTitle();
    },
  })
  tag: string = "span";

  // ==================== 方法 ====================

  /**
   * 更新容器类名
   */
  updateContainerClasslist(): string {
    const className = bem({
      [this.type]: true,
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
   * 重新渲染组件
   */
  private _reRender(): void {
    if (!this.shadowRoot) return;

    // 清空 shadowRoot
    this.shadowRoot.innerHTML = "";

    // 重新应用样式
    const styleEl = document.createElement("style");
    styleEl.textContent = stylesheet;
    this.shadowRoot.appendChild(styleEl);

    // 渲染模板
    const templateEl = document.createElement("template");
    templateEl.innerHTML = this.html();
    this.shadowRoot.appendChild(templateEl.content);
  }

  /**
   * 更新 title 属性
   * 当 truncated 或 line-clamp 启用时，如果未设置 title，则自动使用文本内容
   */
  private _updateTitle(): void {
    if (!this._container) return;

    const userTitle = this.getAttribute("title");

    if (userTitle) {
      this._container.title = userTitle;
      return;
    }

    if (this.truncated || this.lineClamp > 0) {
      const textContent = this.textContent || "";
      this._container.title = textContent;
    } else {
      this._container.title = "";
    }
  }

  /**
   * 渲染模板
   */
  html(): string {
    return `
      <${this.tag} class="${this.updateContainerClasslist()}" part="container">
        <slot></slot>
      </${this.tag}>
    `;
  }

  // ==================== 生命周期 ====================

  $mount(): void {
    this.updateContainerClasslist();
    this._updateTitle();
  }
}

export default EaText;
