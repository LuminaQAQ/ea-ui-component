import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query, listen } from "@decorator";
import { Enum } from "@utils/Enum";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-watermark" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary
 * @status stable
 * @since 3.0
 *
 * @slot default - default slot.
 *
 * @csspart container - container element.
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaWatermark extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @query(bem.ce("content"))
  private _content!: HTMLElement;

  private _mark: Base64URLString = "";

  //   @attribute({
  //     type: String,
  //     default: "",
  //     observer(this: EaWatermark, newVal: string) {
  //       this.updateContainerClasslist();
  //     },
  //   })
  //   type: string = "";

  updateContainerClasslist(): string {
    const className = bem({
      // [this.type]: this.type,
    });

    if (this._container) this._container.className = className;

    return className;
  }

  html(): string {
    return `
      <div class="${bem()}" part="container">
        <slot></slot>
        <div class="${bem.e("content")}" part="content"></div>
      </div>
    `;
  }

  private generateWatermark(): void {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;

    const markWidth = 120;
    const markHeight = 64;
    const gap = [100, 100];
    const color = "rgba(0,0,0,0.15)";
    const textAlign = "center";
    const content = "watermark";
    const { fontSize, fontBaseline, fontFamily, fontStyle } = {
      fontSize: 16,
      fontFamily: "sans-serif",
      fontBaseline: "middle",
      fontStyle: "normal",
    };

    canvas.width = markWidth;
    canvas.height = markHeight;

    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.textAlign = textAlign;
    ctx.fillStyle = color;
    ctx.textBaseline = fontBaseline as CanvasTextBaseline;

      ctx.rotate((Math.PI / 180) * -22);
    //   ctx.translate(markWidth / 2, markHeight / 2);

    ctx.fillText(content, gap[0] / 2, gap[1] / 2);
    // ctx.fillText(content, markWidth / 2, markHeight / 2);
    // ctx.fillText(content, fontSize * content.length / 2, markHeight / 2);

    this._mark = canvas.toDataURL("image/png");
    this._content.style.backgroundImage = `url(${this._mark})`;
    this._content.style.backgroundSize = `${markWidth}px ${markHeight}px`;
  }

  $mount(): void {
    this.updateContainerClasslist();

    this.generateWatermark();
  }

  $beforeUnmount(): void {
    URL.revokeObjectURL(this._mark);
  }
}
