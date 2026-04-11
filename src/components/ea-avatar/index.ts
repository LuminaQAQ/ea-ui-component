import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { html } from "@utils/html";
import { defaultAvatar, errorAvatar } from "./assets/avatarPlaceholder";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-avatar" as const;
const bem = createBEM(TAG_NAME);

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaAvatar extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(".ea-avatar")
  private _container!: HTMLElement;

  private _srcController?: AbortController;

  // ==================== 属性定义 ====================

  @attribute({
    type: String,
    default: "",
    observer(this: EaAvatar, newVal: string) {
      if (this.src) return;
      if (newVal) {
        this._container.innerHTML = html(
          `<ea-icon class="ea-avatar__icon" name="${newVal}" part="icon-avatar"></ea-icon>`
        );
      } else {
        this._container.innerHTML = html(`<slot>${defaultAvatar}</slot>`);
      }
    },
  })
  icon: string = "";

  @attribute({
    type: ["circle", "square"] as const,
    default: "circle",
    observer(this: EaAvatar) {
      this.updateContainerClasslist();
    },
  })
  shape: "circle" | "square" = "circle";

  @attribute({
    type: String,
    default: "default",
    observer(this: EaAvatar, newVal: string) {
      const enumValues = ["default", "small", "large"] as const;
      const isEnumValue = enumValues.includes(
        newVal as (typeof enumValues)[number]
      );
      const isCSSValue = CSS.supports("width", newVal);

      if (!isEnumValue && !isCSSValue) {
        console.warn(
          "[ea-avatar] Please set size to one of [default, small, large] or a valid CSS width value"
        );
        this.style.setProperty(
          "--ea-avatar-size",
          `var(--ea-avatar-size-default)`
        );
        return;
      }

      this.style.setProperty(
        "--ea-avatar-size",
        isEnumValue ? `var(--ea-avatar-size-${newVal})` : newVal
      );
    },
  })
  size: string = "default";

  @attribute({
    type: String,
    default: "",
    observer(this: EaAvatar, newVal: string) {
      if (newVal) {
        this._loadImage(newVal);
      }
    },
  })
  src: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaAvatar, newVal: string) {
      const img = this._container?.querySelector(
        ".ea-avatar__img"
      ) as HTMLImageElement | null;
      if (img) {
        img.srcset = newVal;
      }
    },
  })
  srcSet: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaAvatar, newVal: string) {
      const img = this._container?.querySelector(
        ".ea-avatar__img"
      ) as HTMLImageElement | null;
      if (img) {
        img.alt = newVal;
      }
    },
  })
  alt: string = "";

  @attribute({
    type: ["fill", "contain", "cover", "none", "scale-down"] as const,
    default: "cover",
    observer(this: EaAvatar, newVal: string) {
      this.style.setProperty("--ea-avatar-fit", newVal);
    },
  })
  fit: "fill" | "contain" | "cover" | "none" | "scale-down" = "cover";

  // ==================== 方法 ====================

  /**
   * 更新容器类名
   */
  updateContainerClasslist(): string {
    const className = bem({ [this.shape]: true });
    if (this._container) {
      this._container.className = className;
    }
    return className;
  }

  /**
   * 加载图片
   */
  private _loadImage(src: string): void {
    this._srcController?.abort();
    this._srcController = new AbortController();

    const image = new Image();
    image.src = src;

    image.addEventListener(
      "load",
      () => {
        this._renderImage(src);
        this._srcController?.abort();
      },
      { signal: this._srcController.signal }
    );

    image.addEventListener(
      "error",
      () => {
        this._container.innerHTML = html(`<slot>${errorAvatar}</slot>`);
        this.emit("error");
        this._srcController?.abort();
      },
      { signal: this._srcController.signal }
    );
  }

  /**
   * 渲染图片元素
   */
  private _renderImage(src: string): void {
    const img = document.createElement("img");
    img.className = "ea-avatar__img";
    img.src = src;
    img.alt = this.alt;
    img.srcset = this.srcSet;

    img.setAttribute("part", "img-avatar");

    this._container.innerHTML = "";
    this._container.appendChild(img);
  }

  /**
   * 获取内容 HTML
   * 图片模式返回空串，是由于 DOMPurify 的清洗
   * srcset 属性作为不安全的属性，因此会被清洗
   * 所以最后选择通过 DOM API 创建 img 元素，而不是直接设置属性值
   */
  private _getContentHtml(): string {
    if (this.src) {
      return "";
    }

    if (this.icon) {
      return `<ea-icon class="ea-avatar__icon" name="${this.icon}" part="icon-avatar"></ea-icon>`;
    }

    return `<slot>${defaultAvatar}</slot>`;
  }

  /**
   * 渲染模板
   */
  html(): string {
    const containerClass = this.updateContainerClasslist();
    const content = this._getContentHtml();

    return `
      <div class="${containerClass}" part="container">
        ${content}
      </div>
    `;
  }

  // ==================== 生命周期 ====================

  $mount(): void {
    if (this.src) {
      this._renderImage(this.src);
    }
  }

  $beforeUnmount(): void {
    this._srcController?.abort();
  }
}
