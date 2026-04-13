import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import { listen } from "@decorator/listen";
import { Enum } from "@/utils/Enum";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-container" as const;
const bem = createBEM(TAG_NAME);

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaContainer extends EaBase {
  @query(".ea-container")
  private _container!: HTMLElement;

  @query("slot")
  private _defaultSlot!: HTMLSlotElement;

  private _slotChangeAbortController?: AbortController;

  @attribute({
    type: Enum(["horizontal", "vertical"] as const),
    default: "horizontal",
    observer(this: EaContainer) {
      this.updateContainerClasslist();
    },
  })
  direction: "horizontal" | "vertical" = "horizontal";

  updateContainerClasslist(): string {
    const className = bem({ [this.direction]: true });
    if (this._container) {
      this._container.className = className;
    }
    return className;
  }

  html(): string {
    return `
      <div class="${this.updateContainerClasslist()}" part="container">
        <slot></slot>
      </div>
    `;
  }

  @listen("slotchange", "slot")
  private _handleSlotChange(): void {
    if (this.hasAttribute("direction")) return;

    const children = [...this.querySelectorAll("& > *")].map(
      (item) => item.tagName.toLowerCase()
    );

    if (children.includes("ea-header") || children.includes("ea-footer")) {
      this.direction = "vertical";
    } else {
      this.direction = "horizontal";
    }
  }

  $mount(): void {
    this.updateContainerClasslist();
  }

  $beforeUnmount(): void {
    this._slotChangeAbortController?.abort();
  }
}
