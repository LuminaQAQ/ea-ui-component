import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { listen } from "@decorator/listen";
import { query } from "@decorator/query";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-dropdown-item" as const;
const bem = createBEM(TAG_NAME);

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaDropdownItem extends EaBase {
  @query(".ea-dropdown-item")
  private _container!: HTMLElement;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaDropdownItem) {
      this.updateContainerClasslist();
    },
  })
  divided: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaDropdownItem, newVal: boolean) {
      this.toggleAttribute("aria-disabled", newVal);
      this.updateContainerClasslist();
    },
  })
  disabled: boolean = false;

  @attribute({
    type: String,
    default: "",
    observer() {},
  })
  command: string = "";

  updateContainerClasslist(): string {
    const className = bem(
      { disabled: this.disabled },
      { divided: this.divided }
    );

    if (this._container) this._container.className = className;

    return className;
  }

  html(): string {
    return `
      <div class="${this.updateContainerClasslist()}" part="container">
        <div class="ea-dropdown-item__divider" part="divider"></div>
        <div class="ea-dropdown-item__content" part="content">
          <slot></slot>
        </div>
      </div>
    `;
  }

  @listen("click")
  private _onClickEvent(e: Event) {
    if (this.disabled) {
      e.stopImmediatePropagation();
      e.preventDefault();
      return;
    }

    this.emit("ea-dropdown-item-click", {
      bubbles: true,
    });

    if (this.command) {
      this.emit("command", {
        detail: {
          command: this.command,
        },
        bubbles: true,
      });
    }
  }

  $mount(): void {
    this.updateContainerClasslist();
  }
}
