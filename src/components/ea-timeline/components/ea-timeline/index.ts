import EaBase, { createBEM } from "@core/EaBase";
import { CustomElement } from "@decorator/custom-element";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-timeline" as const;
const bem = createBEM(TAG_NAME);

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaTimeline extends EaBase {
  html(): string {
    return `
      <div class="${bem()}" part="container">
        <slot></slot>
      </div>
    `;
  }
}

export default EaTimeline;
