import EaBase from "@core/EaBase";
import { CustomElement } from "@decorator/custom-element";
import stylesheet from "./index.scss?inline";

const TAG_NAME = "ea-carousel-item" as const;

@CustomElement(TAG_NAME, { styles: [stylesheet] })
export class EaCarouselItem extends EaBase {
  html(): string {
    return `
      <div class='ea-carousel-item' part='container'>
        <slot></slot>
      </div>
    `;
  }
}