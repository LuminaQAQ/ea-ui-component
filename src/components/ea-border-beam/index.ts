import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query, listen, queryAll } from "@decorator";
import { Enum } from "@utils/Enum";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-border-beam" as const;
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
export class EaBorderBeam extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @query(bem.ce("indicator-wrap"))
  private _indicatorWrap!: HTMLElement;

  @queryAll(bem.ce("indicator"))
  private _indicators!: HTMLElement[];

  @attribute({
    type: Number,
    default: 1,
    observer(this: EaBorderBeam, newVal: number) {
      this._indicators.forEach((indicator, index) => {
        indicator.style.setProperty(
          `--${TAG_NAME}-initial-distance`,
          `${(100 / newVal) * index}%`
        );
      });
    },
  })
  count: number = 1;

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
        ${this._getIndicatorHtml()}
      </div>
    `;
  }

  @listen("click")
  private _handleClick(e: Event): void {
    // TODO
  }

  private _getIndicatorHtml(count = this.count): string {
    return Array.from({ length: count })
      .map((_, index) => `<div class="${bem.e("indicator")}"></div>`)
      .join("");
  }

  $mount(): void {
    this.updateContainerClasslist();
  }
}
