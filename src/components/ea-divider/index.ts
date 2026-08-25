import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement, attribute, query, listen } from "@decorator";
import { Enum } from "@utils/Enum";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-divider" as const;
const bem = createBEM(TAG_NAME);

/**
 * @summary Divider
 * @status stable
 * @since 3.0
 *
 * @slot default - default slot.
 *
 * @csspart container - container element.
 */
@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaDivider extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @query("#defaultSlot")
  private _defaultSlot!: HTMLSlotElement;

  @attribute({
    type: String,
    default: "",
    observer(this: EaDivider, newVal: string) {
      this._container.style.setProperty(`--${TAG_NAME}-border-style`, newVal);
    },
  })
  variant: string = "";

  @attribute({
    type: Enum(["start", "end", "center"]),
    default: "center",
    observer(this: EaDivider, newVal: string) {
      this.updateContainerClasslist();
    },
  })
  contentPosition: "start" | "end" | "center" = "center";

  @attribute({
    type: Enum(["horizontal", "vertical"]),
    default: "horizontal",
    observer(this: EaDivider, newVal: string) {
      this.updateContainerClasslist();
    },
  })
  direction: "horizontal" | "vertical" = "horizontal";

  updateContainerClasslist(): string {
    const className = bem(
      {
        [this.contentPosition]: !!this.contentPosition,
        [this.direction]: !!this.direction,
      },
      {
        empty: this._defaultSlot.assignedNodes().length <= 0,
      }
    );

    if (this._container) this._container.className = className;

    return className;
  }

  html(): string {
    return `
      <div class="${bem()}" part="container" role="separator">
        <span class="${bem.e("line")} ${bem.m("line-start")}" part="line"></span>
        <span class="${bem.e("content")}" part="content">
          <slot id="defaultSlot"></slot>
        </span>
        <span class="${bem.e("line")} ${bem.m("line-end")}" part="line"></span>
      </div>
    `;
  }

  @listen("slotchange", "#defaultSlot")
  private _handleSlotChange(e: Event): void {
    this.updateContainerClasslist();
  }

  $mount(): void {
    this.updateContainerClasslist();
  }
}
