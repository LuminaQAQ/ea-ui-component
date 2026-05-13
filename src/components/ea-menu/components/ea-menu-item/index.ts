import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-menu-item" as const;
const bem = createBEM(TAG_NAME);

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaMenuItem extends EaBase {
  @query(bem.cb())
  private _container!: HTMLElement;

  @attribute({
    type: String,
    default: "",
  })
  index: string = "";

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaMenuItem) {
      this.updateContainerClasslist();
    },
  })
  disabled: boolean = false;

  @attribute({
    type: Boolean,
    default: false,
    observer(this: EaMenuItem) {
      this.updateContainerClasslist();
    },
  })
  active: boolean = false;

  updateContainerClasslist(): string {
    const className = bem(
      {},
      {
        disabled: this.disabled,
        active: this.active,
      }
    );

    if (this._container) {
      this._container.className = className;
    }

    return className;
  }

  html(): string {
    return `
      <li class="${bem()}" role="menuitem" part="container">
        <slot></slot>
      </li>
    `;
  }

  $mount(): void {
    this.updateContainerClasslist();
  }
}

export default EaMenuItem;