declare global {
  interface HTMLElementTagNameMap {
    "ea-card": EaCardElement;
  }
}

export interface EaCardElement extends HTMLElement {
  shadow: "always" | "hover" | "never";
  header: string;
  footer: string;
  updateContainerClasslist(): string;
}

import type { DefineComponent } from "vue";

export interface EaCardVueProps {
  shadow?: "always" | "hover" | "never";
  header?: string;
  footer?: string;
}

export interface EaCardVueSlots {
  default?: () => any;
  header?: () => any;
  footer?: () => any;
}

declare module "vue" {
  interface GlobalComponents {
    "ea-card": DefineComponent<EaCardVueProps>;
  }
}

import type { HTMLAttributes, ReactNode } from "react";

export interface EaCardReactProps extends HTMLAttributes<HTMLElement> {
  shadow?: "always" | "hover" | "never";
  header?: string;
  footer?: string;
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-card": EaCardReactProps;
    }
  }
}

export {};
