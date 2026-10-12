import { EaImage } from "./components/ea-image";

export { EaImage };

declare global {
  interface HTMLElementTagNameMap {
    "ea-image": EaImage;
  }
}
