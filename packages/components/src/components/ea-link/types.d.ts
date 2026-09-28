declare global {
  interface HTMLElementTagNameMap {
    "ea-link": EaLinkElement;
  }
}

export type UnderlineType = "always" | "hover" | "never";

export interface EaLinkElement extends HTMLElement {
  variant: "primary" | "success" | "info" | "warning" | "danger" | "normal";
  disabled: boolean;
  underline: UnderlineType | "";
  href: string;
  target: string;
  rel: string;
  download: string;
  icon: string;
}

import type { DefineComponent } from "vue";

declare module "vue" {
  interface GlobalComponents {
    "ea-link": DefineComponent<{
      variant?: "primary" | "success" | "info" | "warning" | "danger" | "normal";
      disabled?: boolean;
      underline?: UnderlineType;
      href?: string;
      target?: string;
      rel?: string;
      download?: string;
      icon?: string;
    }>;
  }
}

import type { HTMLAttributes } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-link": HTMLAttributes<HTMLElement> & {
        variant?: "primary" | "success" | "info" | "warning" | "danger" | "normal";
        disabled?: boolean;
        underline?: UnderlineType;
        href?: string;
        target?: string;
        rel?: string;
        download?: string;
        icon?: string;
      };
    }
  }
}

export {};
