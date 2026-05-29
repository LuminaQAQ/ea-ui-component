import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, property, query, listen } from "@decorator";
import { Enum } from "@utils/Enum";
import { EaImageLoadEvent } from "./events/EaImageLoadEvent";
import { EaImageErrorEvent } from "./events/EaImageErrorEvent";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-image" as const;
const bem = createBEM(TAG_NAME);

export type ImageFit =
  | ""
  | "fill"
  | "contain"
  | "cover"
  | "none"
  | "scale-down";
export type ImageLoading = "lazy" | "eager";
export type ImageStatus = "loading" | "error" | "success";

/**
 * @summary 图片组件，在保留原生 img 特性下，支持懒加载、自定义占位、加载失败和图片预览功能。
 * @status stable
 * @since 3.0
 *
 * @dependency ea-image-preview
 *
 * @slot error - 图片加载失败时显示的内容。
 * @slot placeholder - 图片未加载时的占位内容。
 * @slot progress - 图片预览时的进度显示（需启用 preview）。
 * @slot toolbar - 图片预览工具栏（需启用 preview）。
 *
 * @event load - 图片加载成功时触发。
 * @event error - 图片加载失败时触发。
 *
 * @csspart container - 外层容器。
 * @csspart image - 图片元素。
 * @csspart error - 加载失败区域。
 * @csspart placeholder - 占位内容区域。
 * @csspart preview - 预览容器。
 *
 * @cssproperty --ea-image-width - 图片宽度。
 * @cssproperty --ea-image-height - 图片高度。
 * @cssproperty --ea-image-fit - 图片填充模式。
 * @cssproperty --ea-image-background - 图片背景颜色。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaImage extends EaBase {
  // ==================== DOM 元素引用 ====================

  @query(".ea-image")
  private _container!: HTMLElement;

  @query(".ea-image__image")
  private _image!: HTMLImageElement;

  @query(".ea-image__error")
  private _error!: HTMLElement;

  @query(".ea-image__placeholder")
  private _placeholder!: HTMLElement;

  @query(".ea-image-preview")
  private _imagePreview!: any;

  @query('slot[name="progress"]')
  private _progressSlot!: HTMLSlotElement;

  @query('slot[name="toolbar"]')
  private _toolbarSlot!: HTMLSlotElement;

  // ==================== 私有属性 ====================

  private _abortController?: AbortController;

  private _lazyObserver: IntersectionObserver | null = null;

  private _states = {
    imageStatus: "loading" as ImageStatus,
  };

  // ==================== 属性定义 ====================

  @attribute({
    type: String,
    default: "",
    async observer(this: EaImage, newVal: string) {
      this._loadImage(newVal);
    },
  })
  src: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaImage, newVal: string) {
      if (!CSS.supports("width", newVal))
        return console.warn(
          `[EaImage] The width value ${newVal} is not supported.`
        );

      this.style.setProperty("--ea-image-width", newVal);
    },
  })
  width: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaImage, newVal: string) {
      if (!CSS.supports("height", newVal))
        return console.warn(
          `[EaImage] The height value ${newVal} is not supported.`
        );

      this.style.setProperty("--ea-image-height", newVal);
    },
  })
  height: string = "";

  @attribute({
    type: Enum(["", "fill", "contain", "cover", "none", "scale-down"]),
    default: "",
    observer(this: EaImage, newVal: ImageFit) {
      if (!CSS.supports("object-fit", newVal))
        return console.warn(
          `[EaImage] The object-fit value ${newVal} is not supported.`
        );

      this.style.setProperty("--ea-image-fit", newVal);
    },
  })
  fit: ImageFit = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaImage, newVal: string) {
      this._image.alt = newVal;
    },
  })
  alt: string = "";

  @attribute({
    type: Enum(["lazy", "eager"]),
    default: "eager",
    observer(this: EaImage, newVal: ImageLoading) {
      this._image.setAttribute("loading", newVal);
    },
  })
  loading: ImageLoading = "eager";

  @attribute({
    type: String,
    default: "",
    observer(this: EaImage, newVal: string) {
      this._image.setAttribute("referrerpolicy", newVal);
    },
  })
  referrerpolicy: string = "";

  @attribute({
    type: String,
    default: "",
    observer(this: EaImage, newVal: string) {
      this._image.setAttribute("crossorigin", newVal);
    },
  })
  crossorigin: string = "";

  @attribute({
    type: Boolean,
    default: false,
  })
  lazy: boolean = false;

  // ==================== 预览属性 ====================

  @attribute({
    type: Boolean,
    default: false,
    async observer(this: EaImage, newVal: boolean) {
      if (newVal) {
        await import("@/components/ea-image-preview/index.js");
      }
    },
  })
  preview: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    async observer(this: EaImage, newVal: boolean) {
      await this._updatePreviewProperty("closeOnClickModal", !newVal);
    },
  })
  hideOnClickModal: boolean = false;

  @attribute({
    type: Number,
    default: 2000,
    async observer(this: EaImage, newVal: number) {
      await this._updatePreviewProperty("zIndex", String(newVal));
    },
  })
  zIndex: number = 2000;

  @attribute({
    type: Number,
    default: 0,
    async observer(this: EaImage, newVal: number) {
      await this._updatePreviewProperty("initialIndex", newVal);
    },
  })
  initialIndex: number = 0;

  @attribute({
    type: Boolean,
    default: true,
    async observer(this: EaImage, newVal: boolean) {
      await this._updatePreviewProperty("closeOnPressEscape", newVal);
    },
  })
  closeOnPressEscape: boolean = true;

  @attribute({
    type: Boolean,
    default: true,
    async observer(this: EaImage, newVal: boolean) {
      await this._updatePreviewProperty("infinite", newVal);
    },
  })
  infinite: boolean = true;

  @attribute({
    type: Number,
    default: 1.2,
    async observer(this: EaImage, newVal: number) {
      await this._updatePreviewProperty("zoomRate", newVal);
    },
  })
  zoomRate: number = 1.2;

  @attribute({
    type: Number,
    default: 1,
    async observer(this: EaImage, newVal: number) {
      await this._updatePreviewProperty("scale", newVal);
    },
  })
  scale: number = 1;

  @attribute({
    type: Number,
    default: 0.2,
    async observer(this: EaImage, newVal: number) {
      await this._updatePreviewProperty("minScale", newVal);
    },
  })
  minScale: number = 0.2;

  @attribute({
    type: Number,
    default: 7,
    async observer(this: EaImage, newVal: number) {
      await this._updatePreviewProperty("maxScale", newVal);
    },
  })
  maxScale: number = 7;

  @attribute({
    type: Boolean,
    default: false,
    async observer(this: EaImage, newVal: boolean) {
      await this._updatePreviewProperty("showProgress", newVal);
    },
  })
  showProgress: boolean = false;

  // ==================== @property 属性（JS-only） ====================

  @property({
    type: Array,
    default: [],
    async observer(this: EaImage, newVal: string[]) {
      if (!this.preview)
        return console.warn("[EaImage] Preview is not enabled.");

      await customElements.whenDefined("ea-image-preview");

      this._imagePreview.urlList = newVal;
    },
  })
  previewSrcList: string[] = [];

  // ==================== 方法 ====================

  updateContainerClasslist(): string {
    if (!this.src) {
      this._states.imageStatus = "error";
    }

    const className = bem({ [this._states.imageStatus]: true }, {});

    if (this._container) this._container.className = className;

    return className;
  }

  /**
   * 处理插槽内容变化，有内容时添加 slot 属性以转发到 preview
   * @param slotElement - 插槽元素
   * @param slotName - 插槽名称
   */
  private _handleSlotChange(
    slotElement: HTMLSlotElement,
    slotName: string
  ): void {
    const assignedNodes = slotElement.assignedNodes({ flatten: true });
    const hasContent = assignedNodes.some(
      node =>
        node.nodeType === Node.ELEMENT_NODE ||
        (node.nodeType === Node.TEXT_NODE && node.textContent?.trim())
    );

    if (hasContent) {
      slotElement.setAttribute("slot", slotName);
    } else {
      slotElement.removeAttribute("slot");
    }
  }

  /**
   * 更新 preview 子组件的属性
   * @param prop - 属性名
   * @param value - 属性值
   */
  private async _updatePreviewProperty(
    prop: string,
    value: any
  ): Promise<void> {
    if (!this.preview) return;

    await customElements.whenDefined("ea-image-preview");

    this._imagePreview[prop] = value;
  }

  /**
   * 加载图片
   * @param src - 图片地址
   */
  private _loadImage(src: string): void {
    this.updateContainerClasslist();

    if (!src) return;

    const img = new Image();

    if (this.lazy) {
      this._setupLazyLoad(img);
    } else {
      img.src = src;
    }

    img.onload = () => {
      this._image.setAttribute("src", src);
      this._states.imageStatus = "success";
      this.updateContainerClasslist();

      this.dispatchEvent(new EaImageLoadEvent());
    };

    img.onerror = () => {
      this._states.imageStatus = "error";
      this.updateContainerClasslist();

      this.dispatchEvent(new EaImageErrorEvent());
    };
  }

  /**
   * 设置懒加载观察器
   * @param img - 图片元素
   */
  private _setupLazyLoad(img: HTMLImageElement): void {
    this._lazyObserver?.disconnect();

    this._lazyObserver = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;

      this._lazyObserver?.disconnect();
      this._lazyObserver = null;
      img.src = this.src;
    });

    this._lazyObserver.observe(this);
  }

  /** 切换预览图片到指定索引 */
  setActiveItem(index: number): void {
    if (!this.preview) return;

    this._imagePreview.setActiveItem(index);
  }

  /** 重置图片预览状态 */
  reset(): void {
    if (!this.preview) return;

    this._imagePreview.reset();
  }

  /** 显示图片预览 */
  showPreview(): void {
    this._imagePreview.visible = true;
  }

  html(): string {
    return `
      <div class="${bem()}" part="container">
        <img class="${bem.e("image")}" part="image" />
        <section class="${bem.e("error")}" part="error">
          <slot name="error">FAILED</slot>
        </section>
        <section class="${bem.e("placeholder")}" part="placeholder">
          <slot name="placeholder"></slot>
        </section>
      </div>
      <ea-image-preview class="ea-image-preview" part="preview">
        <slot name="progress"></slot>
        <slot name="toolbar"></slot>
      </ea-image-preview>
    `;
  }

  // ==================== 事件处理 ====================

  @listen("click", ".ea-image")
  private _handleImageClick(): void {
    if (!this.preview) return;

    this.showPreview();
  }

  @listen("slotchange", 'slot[name="progress"]')
  private _handleProgressSlotChange(): void {
    this._handleSlotChange(this._progressSlot, "progress");
  }

  @listen("slotchange", 'slot[name="toolbar"]')
  private _handleToolbarSlotChange(): void {
    this._handleSlotChange(this._toolbarSlot, "toolbar");
  }

  // ==================== 生命周期 ====================

  $mount(): void {
    this._abortController?.abort();
    this._abortController = new AbortController();

    this._image.addEventListener(
      "load",
      (e: Event) => {
        e.stopPropagation();
      },
      { signal: this._abortController.signal }
    );

    this._image.addEventListener(
      "error",
      (e: Event) => {
        e.stopPropagation();
      },
      { signal: this._abortController.signal }
    );

    this.updateContainerClasslist();
  }

  $beforeUnmount(): void {
    this._abortController?.abort();
    this._lazyObserver?.disconnect();
    this._lazyObserver = null;
  }
}
