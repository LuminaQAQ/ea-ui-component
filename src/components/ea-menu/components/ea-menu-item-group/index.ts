import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-menu-item-group" as const;
const bem = createBEM(TAG_NAME);

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaMenuItemGroup extends EaBase {
  @attribute({
    type: String,
    default: "",
    observer(this: EaMenuItemGroup, newVal: string) {
      const titleSlot = this.shadowRoot?.querySelector(
        'slot[name="title"]'
      ) as HTMLSlotElement | null;
      if (titleSlot) {
        titleSlot.textContent = newVal;
      }
    },
  })
  groupTitle: string = "";

  html(): string {
    return `
      <div class="${bem()}" part="container">
        <header class="${bem.e("title")}" part="title">
          <slot name="title">${this.groupTitle}</slot>
        </header>
        <div class="${bem.e("content")}" part="content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

export default EaMenuItemGroup;
