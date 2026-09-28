declare global {
  interface HTMLElementTagNameMap {
    "ea-empty": EaEmptyElement;
  }
}

export interface EaEmptyElement extends HTMLElement {
  image: string;
  imageSize: string;
  description: string;
}

import type { DefineComponent } from "vue";

declare module "vue" {
  interface GlobalComponents {
    "ea-empty": DefineComponent<{
      image?: string;
      imageSize?: string;
      description?: string;
    }>;
  }
}

import type { HTMLAttributes } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-empty": HTMLAttributes<HTMLElement> & {
        image?: string;
        imageSize?: string;
        description?: string;
      };
    }
  }
}

export {};
