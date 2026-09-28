declare global {
  interface HTMLElementTagNameMap {
    "ea-backtop": EaBacktopElement;
  }
}

export interface EaBacktopElement extends HTMLElement {
  target: string;
  visibilityHeight: number;
  right: string;
  bottom: string;
  smooth: boolean;
  updateContainerClasslist(): string;
}

import type { DefineComponent } from "vue";

export interface EaBacktopVueProps {
  target?: string;
  visibilityHeight?: number;
  right?: string;
  bottom?: string;
  smooth?: boolean;
}

export interface EaBacktopVueSlots {
  default?: () => any;
}

declare module "vue" {
  interface GlobalComponents {
    "ea-backtop": DefineComponent<EaBacktopVueProps>;
  }
}

import type { HTMLAttributes, ReactNode } from "react";

export interface EaBacktopReactProps extends HTMLAttributes<HTMLElement> {
  target?: string;
  visibilityHeight?: number;
  right?: string;
  bottom?: string;
  smooth?: boolean;
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-backtop": EaBacktopReactProps;
    }
  }
}

export {};
