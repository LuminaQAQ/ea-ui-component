import type { DirectionType, TriggerType, ArrowType, IndicatorPositionType } from "./components/ea-carousel/index";

export interface EaCarouselElement extends HTMLElement {
  height: string;
  direction: DirectionType;
  index: number;
  trigger: TriggerType;
  interval: number;
  arrow: ArrowType;
  autoplay: boolean;
  loop: boolean;
  pauseOnHover: boolean;
  indicatorPosition: IndicatorPositionType;

  prev(): void;
  next(): void;
}

export interface EaCarouselItemElement extends HTMLElement {}

declare global {
  interface HTMLElementTagNameMap {
    "ea-carousel": EaCarouselElement;
    "ea-carousel-item": EaCarouselItemElement;
  }
}

import type { DefineComponent } from "vue";

declare module "vue" {
  interface GlobalComponents {
    "ea-carousel": DefineComponent<{
      height?: string;
      direction?: DirectionType;
      index?: number;
      trigger?: TriggerType;
      interval?: number;
      arrow?: ArrowType;
      autoplay?: boolean;
      loop?: boolean;
      pauseOnHover?: boolean;
      indicatorPosition?: IndicatorPositionType;
    }>;
    "ea-carousel-item": DefineComponent<{}>;
  }
}

import type { HTMLAttributes } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-carousel": HTMLAttributes<HTMLElement> & {
        height?: string;
        direction?: DirectionType;
        index?: number;
        trigger?: TriggerType;
        interval?: number;
        arrow?: ArrowType;
        autoplay?: boolean;
        loop?: boolean;
        pauseOnHover?: boolean;
        indicatorPosition?: IndicatorPositionType;
      };
      "ea-carousel-item": HTMLAttributes<HTMLElement> & {};
    }
  }
}
