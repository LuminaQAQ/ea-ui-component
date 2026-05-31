declare global {
  interface HTMLElementTagNameMap {
    "ea-segmented": EaSegmentedElement;
  }
}

export interface EaSegmentedElement extends HTMLElement {
  value: string;
  options: string[] | { label: string; value: string; disabled?: boolean; checked?: boolean; [key: string]: any }[];
  propsConfiguration: { label: string; value: string; disabled: string };
  size: "large" | "default" | "small" | "";
  direction: "horizontal" | "vertical" | "";
  block: boolean;
  disabled: boolean;
  name: string;
}

import type { DefineComponent } from "vue";

declare module "vue" {
  interface GlobalComponents {
    "ea-segmented": DefineComponent<{
      value?: string;
      options?: string[] | { label: string; value: string; disabled?: boolean; checked?: boolean; [key: string]: any }[];
      propsConfiguration?: { label: string; value: string; disabled: string };
      size?: "large" | "default" | "small" | "";
      direction?: "horizontal" | "vertical" | "";
      block?: boolean;
      disabled?: boolean;
      name?: string;
    }>;
  }
}

import type { HTMLAttributes } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-segmented": HTMLAttributes<HTMLElement> & {
        value?: string;
        options?: string[] | { label: string; value: string; disabled?: boolean; checked?: boolean; [key: string]: any }[];
        propsConfiguration?: { label: string; value: string; disabled: string };
        size?: "large" | "default" | "small" | "";
        direction?: "horizontal" | "vertical" | "";
        block?: boolean;
        disabled?: boolean;
        name?: string;
        onChange?: (event: CustomEvent<{ value: string }>) => void;
      };
    }
  }
}

export {};
