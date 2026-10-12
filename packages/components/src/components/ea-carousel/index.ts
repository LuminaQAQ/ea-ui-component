import { EaCarouselItem } from "./components/ea-carousel-item/index.js";
import { EaCarousel } from "./components/ea-carousel/index.js";

export { EaCarousel, EaCarouselItem };

declare global {
  interface HTMLElementTagNameMap {
    "ea-carousel": EaCarousel;
    "ea-carousel-item": EaCarouselItem;
  }
}