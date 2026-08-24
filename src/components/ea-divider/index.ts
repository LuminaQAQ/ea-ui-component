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
    type: Enum(["dashed", "dotted", "solid"]),
    default: "",
    observer(this: EaDivider, newVal: string) {
      this.updateContainerClasslist();
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
  titlePlacement: "start" | "end" | "center" = "center";

  updateContainerClasslist(): string {
    const className = bem(
      {
        [this.variant]: !!this.variant,
        [this.titlePlacement]: !!this.titlePlacement,
      },
      {
        "no-content": this._defaultSlot.assignedNodes().length <= 0,
      }
    );

    if (this._container) this._container.className = className;

    return className;
  }

  html(): string {
    return `
      <div class="${bem()}" part="container" role="separator">
        <span class="${bem.e("line")}" part="line"></span>
        <span class="${bem.e("content")}" part="content">
          <slot id="defaultSlot"></slot>
        </span>
        <span class="${bem.e("line")}" part="line"></span>
      </div>
    `;
  }

  @listen("slotchange", "#defaultSlot")
  private _handleSlotChange(e: Event): void {
    // console.log(e);
    this.updateContainerClasslist();
  }

  $mount(): void {
    this.updateContainerClasslist();
  }
}
