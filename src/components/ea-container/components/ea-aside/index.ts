import EaBase, { createBEM } from "@core/EaBase";
import { attribute } from "@decorator/attribute";
import { CustomElement } from "@decorator/custom-element";
import { query } from "@decorator/query";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-aside" as const;
const bem = createBEM(TAG_NAME);

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaAside extends EaBase {
  @query(".ea-aside")
  private _container!: HTMLElement;

  @attribute({
    type: String,
    default: "300px",
    observer(this: EaAside, newVal: string) {
      this.style.setProperty("--ea-aside-width", newVal);
    },
  })
  width: string = "300px";

  html(): string {
    return `
      <aside class="${bem()}" part="container">
        <slot></slot>
      </aside>
    `;
  }
}
