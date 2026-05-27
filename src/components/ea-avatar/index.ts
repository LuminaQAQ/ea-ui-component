import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query } from "@decorator";
import { html } from "@utils/html";
import { defaultAvatar, errorAvatar } from "./assets/avatarPlaceholder";
import stylesheet from "./index.scss?inline";
import "@/components/ea-icon/index";

const TAG_NAME = "ea-avatar" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary 头像组件，以图标、图片或字符的形式展示用户或实体的标识信息。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-icon
 *
 * @slot default - 默认插槽，用于自定义内容。
 *
 * @event error - 图片加载失败时触发。
 *
 * @csspart container - 容器元素。
 * @csspart img-avatar - 图片元素。
 * @csspart icon-avatar - 图标元素。
 *
 * @cssproperty --ea-avatar-size - 头像尺寸。
 * @cssproperty --ea-avatar-square-border-radius - 方形圆角。
 * @cssproperty --ea-avatar-circle-border-radius - 圆形圆角。
 * @cssproperty --ea-avatar-fit - 图片适应方式。
 * @cssproperty --ea-avatar-color - 文字颜色。
 * @cssproperty --ea-avatar-font-size - 字体大小。
 * @cssproperty --ea-avatar-background-color - 背景颜色。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaAvatar extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(bem.cb())
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
          `<ea-icon class="${bem.e("icon")}" name="${newVal}" part="icon-avatar"></ea-icon>`
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
      } else {
        this._srcController?.abort();
        this._renderFallback();
      }
    },
  })
  src: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaAvatar, newVal: string) {
      const img = this._container?.querySelector(
        bem.ce("img")
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
        bem.ce("img")
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
   * 渲染回退内容（icon 或默认 slot）
   */
  private _renderFallback(): void {
    if (this.icon) {
      this._container.innerHTML = html(
        `<ea-icon class="${bem.e("icon")}" name="${this.icon}" part="icon-avatar"></ea-icon>`
      );
    } else {
      this._container.innerHTML = html(`<slot>${defaultAvatar}</slot>`);
    }
  }

  /**
   * 加载并渲染图片
   * 先通过隐藏 Image 预加载，成功后再插入 DOM，避免破图闪烁
   * @param src 图片源地址
   */
  private _loadImage(src: string): void {
    this._srcController?.abort();
    this._srcController = new AbortController();

    const preloader = new Image();
    preloader.src = src;

    preloader.addEventListener(
      "load",
      () => {
        this._renderImage(src);
        this._srcController?.abort();
      },
      { signal: this._srcController.signal }
    );

    preloader.addEventListener(
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
   * 渲染图片元素到 DOM
   * @param src 图片源地址
   */
  private _renderImage(src: string): void {
    const img = document.createElement("img");
    img.className = bem.e("img");
    img.src = src;
    img.alt = this.alt;
    img.srcset = this.srcSet;

    img.setAttribute("part", "img-avatar");

    this._container.innerHTML = "";
    this._container.appendChild(img);
  }

  /**
   * 获取内容 HTML
   */
  private _getContentHtml(): string {
    if (this.src) {
      return "";
    }

    if (this.icon) {
      return `<ea-icon class="${bem.e("icon")}" name="${this.icon}" part="icon-avatar"></ea-icon>`;
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
    this.updateContainerClasslist();

    if (this.src) {
      this._loadImage(this.src);
    }
  }

  $beforeUnmount(): void {
    this._srcController?.abort();
  }
}
