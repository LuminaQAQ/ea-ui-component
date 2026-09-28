declare global {
  interface HTMLElementTagNameMap {
    "ea-icon": EaIconElement;
  }
}

export type IconFamily = "classic" | "sharp" | "brands";
export type IconVariant = "solid" | "regular" | "light" | "thin" | "duotone";

export interface EaIconElement extends HTMLElement {
  name: string;
  family: IconFamily;
  variant: IconVariant;
  color: string;
  size: string;
  spin: boolean;
}

import type { DefineComponent } from "vue";

export interface EaIconVueProps {
  name?: string;
  family?: IconFamily;
  variant?: IconVariant;
  color?: string;
  size?: string;
  spin?: boolean;
}

export interface EaIconVueSlots {
  default?: () => any;
}

export type EaIconVueComponent = DefineComponent<
  EaIconVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaIconVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-icon": EaIconVueComponent;
  }
}

import type { HTMLAttributes, ReactNode } from "react";

export interface EaIconReactProps extends HTMLAttributes<HTMLElement> {
  name?: string;
  family?: IconFamily;
  variant?: IconVariant;
  color?: string;
  size?: string;
  spin?: boolean;
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-icon": EaIconReactProps;
    }
  }
}

export {};
