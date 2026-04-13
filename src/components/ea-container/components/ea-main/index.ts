import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement } from "@decorator/custom-element";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-main" as const;
const bem = createBEM(TAG_NAME);

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaMain extends EaBase {
  html(): string {
    return `
      <main class="${bem()}" part="container">
        <slot></slot>
      </main>
    `;
  }
}
