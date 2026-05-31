declare global {
  interface HTMLElementTagNameMap {
    "ea-space": EaSpaceElement;
  }
}

export interface EaSpaceElement extends HTMLElement {
  wrap: boolean;
  alignment: "" | "center" | "flex-start" | "flex-end" | "baseline" | "stretch";
  direction: "horizontal" | "vertical";
  size: "small" | "default" | "large" | string;
  spacer: string;
  fill: boolean;
  fillRatio: number;
}

import type { DefineComponent } from "vue";

declare module "vue" {
  interface GlobalComponents {
    "ea-space": DefineComponent<{
      wrap?: boolean;
      alignment?: "" | "center" | "flex-start" | "flex-end" | "baseline" | "stretch";
      direction?: "horizontal" | "vertical";
      size?: "small" | "default" | "large" | string;
      spacer?: string;
      fill?: boolean;
      fillRatio?: number;
    }>;
  }
}

import type { HTMLAttributes, ReactNode } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-space": HTMLAttributes<HTMLElement> & {
        wrap?: boolean;
        alignment?: "" | "center" | "flex-start" | "flex-end" | "baseline" | "stretch";
        direction?: "horizontal" | "vertical";
        size?: "small" | "default" | "large" | string;
        spacer?: string;
        fill?: boolean;
        fillRatio?: number;
        children?: ReactNode;
      };
    }
  }
}

export {};
