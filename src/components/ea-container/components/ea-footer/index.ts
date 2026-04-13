import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-footer" as const;
const bem = createBEM(TAG_NAME);

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaFooter extends EaBase {
  @attribute({
    type: String,
    default: "60px",
    observer(this: EaFooter, newVal: string) {
      if (newVal && CSS.supports("height", newVal)) {
        this.style.setProperty("--ea-footer-height", newVal);
      } else if (newVal) {
        this.style.setProperty("--ea-footer-height", "60px");
      } else {
        this.style.setProperty("--ea-footer-height", "auto");
      }
    },
  })
  height: string = "60px";

  html(): string {
    return `
      <footer class="${bem()}" part="container">
        <slot></slot>
      </footer>
    `;
  }
}
