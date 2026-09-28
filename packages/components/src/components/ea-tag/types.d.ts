declare global {
  interface HTMLElementTagNameMap {
    "ea-tag": EaTagElement;
    "ea-check-tag": EaCheckTagElement;
  }
}

export interface EaTagElement extends HTMLElement {
  variant: "primary" | "info" | "success" | "warning" | "danger";
  size: "large" | "default" | "small";
  effect: "dark" | "light" | "plain";
  closable: boolean;
  color: string;
  round: boolean;
  disableTransitions: boolean;
}

export interface EaCheckTagElement extends HTMLElement {
  checked: boolean;
  disabled: boolean;
  variant: "primary" | "info" | "success" | "warning" | "danger";
}

import type { DefineComponent } from "vue";

export interface EaTagVueProps {
  variant?: "primary" | "info" | "success" | "warning" | "danger";
  size?: "large" | "default" | "small";
  effect?: "dark" | "light" | "plain";
  closable?: boolean;
  color?: string;
  round?: boolean;
  disableTransitions?: boolean;
}

export interface EaCheckTagVueProps {
  checked?: boolean;
  disabled?: boolean;
  variant?: "primary" | "info" | "success" | "warning" | "danger";
}

export interface EaTagVueEvents {
  "ea-remove": (event: CustomEvent<{ text: string | null }>) => void;
}

export interface EaCheckTagVueEvents {
  change: (event: CustomEvent<{ checked: boolean }>) => void;
}

export interface EaTagVueSlots {
  default?: () => any;
}

export interface EaCheckTagVueSlots {
  default?: () => any;
}

export type EaTagVueComponent = DefineComponent<
  EaTagVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaTagVueEvents,
  {},
  {},
  EaTagVueSlots
>;

export type EaCheckTagVueComponent = DefineComponent<
  EaCheckTagVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaCheckTagVueEvents,
  {},
  {},
  EaCheckTagVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-tag": EaTagVueComponent;
    "ea-check-tag": EaCheckTagVueComponent;
  }
}

import type { HTMLAttributes, ReactNode } from "react";

export interface EaTagReactProps extends HTMLAttributes<HTMLElement> {
  variant?: "primary" | "info" | "success" | "warning" | "danger";
  size?: "large" | "default" | "small";
  effect?: "dark" | "light" | "plain";
  closable?: boolean;
  color?: string;
  round?: boolean;
  disableTransitions?: boolean;
  onEaRemove?: (event: CustomEvent<{ text: string | null }>) => void;
  children?: ReactNode;
}

export interface EaCheckTagReactProps extends HTMLAttributes<HTMLElement> {
  checked?: boolean;
  disabled?: boolean;
  variant?: "primary" | "info" | "success" | "warning" | "danger";
  onChange?: (event: CustomEvent<{ checked: boolean }>) => void;
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-tag": EaTagReactProps;
      "ea-check-tag": EaCheckTagReactProps;
    }
  }
}

export {};
