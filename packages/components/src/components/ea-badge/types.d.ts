declare global {
  interface HTMLElementTagNameMap {
    "ea-badge": EaBadgeElement;
  }
}

export interface EaBadgeElement extends HTMLElement {
  value: string;
  max: number;
  variant: "primary" | "success" | "warning" | "danger" | "info";
  color: string;
  isDot: boolean;
  dataHidden: boolean;
  offsetX: number;
  offsetY: number;
  showZero: boolean;
}

import type { DefineComponent } from "vue";

export interface EaBadgeVueProps {
  value?: string;
  max?: number;
  variant?: "primary" | "success" | "warning" | "danger" | "info";
  color?: string;
  isDot?: boolean;
  dataHidden?: boolean;
  offsetX?: number;
  offsetY?: number;
  showZero?: boolean;
}

export interface EaBadgeVueSlots {
  default?: () => any;
}

export type EaBadgeVueComponent = DefineComponent<
  EaBadgeVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaBadgeVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-badge": EaBadgeVueComponent;
  }
}

import type { HTMLAttributes, ReactNode } from "react";

export interface EaBadgeReactProps extends HTMLAttributes<HTMLElement> {
  value?: string;
  max?: number;
  variant?: "primary" | "success" | "warning" | "danger" | "info";
  color?: string;
  isDot?: boolean;
  dataHidden?: boolean;
  offsetX?: number;
  offsetY?: number;
  showZero?: boolean;
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-badge": EaBadgeReactProps;
    }
  }
}

export {};
