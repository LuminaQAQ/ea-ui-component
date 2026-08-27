import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, property, query } from "@decorator";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-watermark" as const;
const bem = createBEM(TAG_NAME);

/**
 * 水印文字样式配置
 */
export interface EaWatermarkFont {
  /** 字体颜色 */
  color?: string;
  /** 字体大小 */
  fontSize?: number | string;
  /** 字重 */
  fontWeight?: number | string;
  /** 字体 */
  fontFamily?: string;
  /** 字体间隙 */
  fontGap?: number;
  /** 字体样式 */
  fontStyle?: string;
  /** 文本对齐 */
  textAlign?: string;
  /** 文本基线 */
  textBaseline?: string;
}

const DEFAULT_FONT: Required<EaWatermarkFont> = {
  color: "rgba(0, 0, 0, 0.15)",
  fontSize: 16,
  fontWeight: "normal",
  fontFamily: "sans-serif",
  fontGap: 3,
  fontStyle: "normal",
  textAlign: "center",
  textBaseline: "hanging",
};

/**
 * @summary 水印组件，用于在容器上叠加文字或图片水印，防止内容被随意转载。
 * @status stable
 * @since 3.0
 *
 * @slot default - 默认插槽，需要叠加水印的内容。
 *
 * @csspart container - 容器元素。
 * @csspart content - 水印内容元素。
 *
 * @cssproperty --ea-watermark-border-radius - 组件边框圆角，默认值 `var(--border-radius-sm)`。
 * @cssproperty --ea-watermark-font-size - 组件字体大小，默认值 `var(--font-size-md)`。
 * @cssproperty --ea-watermark-transition - 组件过渡动画，默认值 `var(--transition-fast)`。
 * @cssproperty --ea-watermark-text - 文字颜色，默认值 `var(--grey-900)`。
 * @cssproperty --ea-watermark-bg - 背景颜色，默认值 `var(--color-white)`。
 * @cssproperty --ea-watermark-border-color - 边框颜色，默认值 `var(--grey-300)`。
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaWatermark extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @query(bem.ce("content"))
  private _content!: HTMLElement;

  @attribute({
    type: Number,
    default: 120,
    observer(this: EaWatermark) {
      this._renderWatermark();
    },
  })
  width: number = 120;

  @attribute({
    type: Number,
    default: 64,
    observer(this: EaWatermark) {
      this._renderWatermark();
    },
  })
  height: number = 64;

  @attribute({
    type: Number,
    default: -22,
    observer(this: EaWatermark) {
      this._renderWatermark();
    },
  })
  rotate: number = -22;

  @attribute({
    type: Number,
    default: 9,
    observer(this: EaWatermark, newVal: number) {
      if (this._content) this._content.style.zIndex = String(newVal);
    },
  })
  zIndex: number = 9;

  @attribute({
    type: String,
    default: "",
    observer(this: EaWatermark) {
      this._renderWatermark();
    },
  })
  image: string = "";

  @attribute({
    type: String,
    default: "watermark",
    observer(this: EaWatermark) {
      this._renderWatermark();
    },
  })
  content: string = "watermark";

  @property({
    type: Object,
    default: { ...DEFAULT_FONT },
    observer(this: EaWatermark) {
      this._renderWatermark();
    },
  })
  font: EaWatermarkFont = { ...DEFAULT_FONT };

  @property({
    type: Array,
    default: [100, 100],
    observer(this: EaWatermark) {
      this._renderWatermark();
    },
  })
  gap: number[] = [100, 100];

  @property({
    type: Array,
    default: null,
    observer(this: EaWatermark) {
      this._renderWatermark();
    },
  })
  offset: number[] | null = null;

  html(): string {
    return `
      <div class="${bem()}" part="container">
        <slot></slot>
        <div class="${bem.e("content")}" part="content"></div>
      </div>
    `;
  }

  $mount(): void {
    this.updateContainerClasslist();

    this._content.style.zIndex = String(this.zIndex);

    this._renderWatermark();
  }

  /**
   * 更新容器类名
   * @returns 更新后的类名字符串
   */
  updateContainerClasslist(): string {
    const className = bem();

    if (this._container) this._container.className = className;

    return className;
  }

  /**
   * 根据属性重新生成水印
   */
  private _renderWatermark(): void {
    if (!this._content) return;

    const [gapX, gapY] = this.gap;
    const [offsetX, offsetY] = this.offset ?? [gapX / 2, gapY / 2];

    if (this.image) {
      this._renderImageWatermark(offsetX, offsetY);
      return;
    }

    this._renderTextWatermark(offsetX, offsetY);
  }

  /**
   * 渲染文字水印
   * @param offsetX X 轴偏移
   * @param offsetY Y 轴偏移
   */
  private _renderTextWatermark(offsetX: number, offsetY: number): void {
    const surface = this._createWatermarkSurface();

    if (!surface) return;

    const font = { ...DEFAULT_FONT, ...this.font };
    const { fontSize } = font;

    surface.ctx.font = `${font.fontStyle} ${font.fontWeight} ${fontSize}px ${font.fontFamily}`;
    surface.ctx.fillStyle = font.color;
    surface.ctx.textAlign = font.textAlign as CanvasTextAlign;
    surface.ctx.textBaseline = font.textBaseline as CanvasTextBaseline;

    const contents = Array.isArray(this.content)
      ? this.content
      : [this.content];

    const lines = contents.flatMap(text => String(text).split("\n"));

    lines.forEach((text, index) => {
      surface.ctx.fillText(
        text,
        offsetX,
        offsetY + index * (Number(fontSize) + font.fontGap)
      );
    });

    this._applyWatermarkBackground(
      surface.canvas.toDataURL("image/png"),
      offsetX,
      offsetY
    );
  }

  /**
   * 应用水印背景样式
   * @param url 背景图地址
   * @param offsetX X 轴偏移
   * @param offsetY Y 轴偏移
   */
  private _applyWatermarkBackground(
    url: string,
    offsetX: number,
    offsetY: number
  ): void {
    this._content.style.backgroundImage = `url(${url})`;
    this._content.style.backgroundSize = `${this.width}px ${this.height}px`;
    this._content.style.backgroundPosition = `${offsetX}px ${offsetY}px`;
  }

  /**
   * 渲染图片水印
   * @returns {}
   */
  private _createWatermarkSurface(): {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
  } | null {
    const canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;

    const ctx = canvas.getContext("2d");

    if (!ctx) return null;

    ctx.rotate((Math.PI / 180) * this.rotate);

    return { canvas, ctx };
  }

  /**
   * 渲染图片水印，绘制到 canvas
   * @param offsetX X 轴偏移
   * @param offsetY Y 轴偏移
   */
  private _renderImageWatermark(offsetX: number, offsetY: number): void {
    const img = new Image();

    img.onload = () => {
      const surface = this._createWatermarkSurface();

      if (!surface) {
        this._applyWatermarkBackground(this.image, offsetX, offsetY);
        return;
      }

      const halfWidth = this.width / 2;
      const halfHeight = this.height / 2;

      surface.ctx.translate(halfWidth, halfHeight);
      surface.ctx.drawImage(
        img,
        -halfWidth,
        -halfHeight,
        this.width,
        this.height
      );

      this._applyWatermarkBackground(
        surface.canvas.toDataURL("image/png"),
        offsetX,
        offsetY
      );
    };

    img.onerror = () => {
      this._applyWatermarkBackground(this.image, offsetX, offsetY);
    };

    img.src = this.image;
  }
}
