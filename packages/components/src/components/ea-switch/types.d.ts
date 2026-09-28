declare global {
  interface HTMLElementTagNameMap {
    "ea-switch": EaSwitchElement;
  }
}

export interface EaSwitchElement extends HTMLElement {
  label: string;
  name: string;
  value: string | number | boolean;
  activeValue: string | number | boolean;
  inactiveValue: string | number | boolean;
  size: "large" | "default" | "small";
  inactiveText: string;
  inactiveColor: string;
  activeText: string;
  activeColor: string;
  disabled: boolean;
  required: boolean;
  beforeChange: (() => Promise<boolean>) | null;
  updateContainerClasslist(): string;
  checkValidity(): boolean;
  reportValidity(): boolean;
}

import type { DefineComponent } from "vue";

export interface EaSwitchVueProps {
  label?: string;
  name?: string;
  value?: string | number | boolean;
  activeValue?: string | number | boolean;
  inactiveValue?: string | number | boolean;
  size?: "large" | "default" | "small";
  inactiveText?: string;
  inactiveColor?: string;
  activeText?: string;
  activeColor?: string;
  disabled?: boolean;
  required?: boolean;
  beforeChange?: (() => Promise<boolean>) | null;
}

export interface EaSwitchVueEvents {
  change: (event: CustomEvent) => void;
}

export interface EaSwitchVueSlots {
  default?: () => any;
  active?: () => any;
  inactive?: () => any;
}

export type EaSwitchVueComponent = DefineComponent<
  EaSwitchVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaSwitchVueEvents,
  {},
  {},
  EaSwitchVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-switch": EaSwitchVueComponent;
  }
}

import type { HTMLAttributes, ReactNode } from "react";

export interface EaSwitchReactProps extends HTMLAttributes<HTMLElement> {
  label?: string;
  name?: string;
  value?: string | number | boolean;
  activeValue?: string | number | boolean;
  inactiveValue?: string | number | boolean;
  size?: "large" | "default" | "small";
  inactiveText?: string;
  inactiveColor?: string;
  activeText?: string;
  activeColor?: string;
  disabled?: boolean;
  required?: boolean;
  beforeChange?: (() => Promise<boolean>) | null;
  onChange?: (event: CustomEvent) => void;
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-switch": EaSwitchReactProps;
    }
  }
}

export {};
