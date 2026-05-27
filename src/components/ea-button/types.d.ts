// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-button": EaButtonElement;
    "ea-button-group": EaButtonGroupElement;
  }
}

export interface EaButtonElement extends HTMLElement {
  disabled: boolean;
  variant: "normal" | "primary" | "success" | "warning" | "danger" | "info";
  text: boolean;
  plain: boolean;
  round: boolean;
  circle: boolean;
  link: boolean;
  href: string;
  target: string;
  rel: string;
  download: string;
  size: "small" | "medium" | "large";
  loading: boolean;
  icon: string;
  type: "button" | "submit" | "reset";
}

export interface EaButtonGroupElement extends HTMLElement {
  disabled: boolean;
  size: "small" | "medium" | "large";
  variant: "normal" | "primary" | "success" | "warning" | "danger" | "info";
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

export interface EaButtonVueProps {
  disabled?: boolean;
  variant?: "normal" | "primary" | "success" | "warning" | "danger" | "info";
  text?: boolean;
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
  link?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  download?: string;
  size?: "small" | "medium" | "large";
  loading?: boolean;
  icon?: string;
  type?: "button" | "submit" | "reset";
}

export interface EaButtonGroupVueProps {
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  variant?: "normal" | "primary" | "success" | "warning" | "danger" | "info";
}

export interface EaButtonVueEvents {
  click: (event: CustomEvent) => void;
}

export interface EaButtonVueSlots {
  default?: () => any;
}

export interface EaButtonGroupVueSlots {
  default?: () => any;
}

export type EaButtonVueComponent = DefineComponent<
  EaButtonVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaButtonVueEvents,
  {},
  {},
  EaButtonVueSlots
>;

export type EaButtonGroupVueComponent = DefineComponent<
  EaButtonGroupVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaButtonGroupVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-button": EaButtonVueComponent;
    "ea-button-group": EaButtonGroupVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

export interface EaButtonReactProps extends HTMLAttributes<HTMLElement> {
  disabled?: boolean;
  variant?: "normal" | "primary" | "success" | "warning" | "danger" | "info";
  text?: boolean;
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
  link?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  download?: string;
  size?: "small" | "medium" | "large";
  loading?: boolean;
  icon?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (event: CustomEvent) => void;
  children?: ReactNode;
}

export interface EaButtonGroupReactProps extends HTMLAttributes<HTMLElement> {
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  variant?: "normal" | "primary" | "success" | "warning" | "danger" | "info";
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-button": EaButtonReactProps;
      "ea-button-group": EaButtonGroupReactProps;
    }
  }
}

export {};
