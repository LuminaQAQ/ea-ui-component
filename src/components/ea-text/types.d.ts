declare global {
  interface HTMLElementTagNameMap {
    "ea-text": EaTextElement;
  }
}

export interface EaTextElement extends HTMLElement {
  variant: "normal" | "primary" | "success" | "warning" | "danger" | "info";
  size: "large" | "medium" | "small";
  truncated: boolean;
  lineClamp: number;
  tag: "span" | "p" | "b" | "i" | "sub" | "sup" | "ins" | "del" | "mark";
}

import type { DefineComponent } from "vue";

declare module "vue" {
  interface GlobalComponents {
    "ea-text": DefineComponent<{
      variant?: "normal" | "primary" | "success" | "warning" | "danger" | "info";
      size?: "large" | "medium" | "small";
      truncated?: boolean;
      lineClamp?: number;
      tag?: "span" | "p" | "b" | "i" | "sub" | "sup" | "ins" | "del" | "mark";
    }>;
  }
}

import type { HTMLAttributes } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-text": HTMLAttributes<HTMLElement> & {
        variant?: "normal" | "primary" | "success" | "warning" | "danger" | "info";
        size?: "large" | "medium" | "small";
        truncated?: boolean;
        lineClamp?: number;
        tag?: "span" | "p" | "b" | "i" | "sub" | "sup" | "ins" | "del" | "mark";
      };
    }
  }
}

export {};
