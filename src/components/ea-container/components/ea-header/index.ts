import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-header" as const;
const bem = createBEM(TAG_NAME);

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaHeader extends EaBase {
  @attribute({
    type: String,
    default: "60px",
    observer(this: EaHeader, newVal: string) {
      if (newVal && CSS.supports("height", newVal)) {
        this.style.setProperty("--ea-header-height", newVal);
      } else if (newVal) {
        this.style.setProperty("--ea-header-height", "60px");
      } else {
        this.style.setProperty("--ea-header-height", "auto");
      }
    },
  })
  height: string = "60px";

  html(): string {
    return `
      <header class="${bem()}" part="container">
        <slot></slot>
      </header>
    `;
  }
}
