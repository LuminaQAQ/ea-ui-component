declare global {
  interface HTMLElementTagNameMap {
    "ea-progress": EaProgressElement;
  }
}

export interface EaProgressElement extends HTMLElement {
  variant: "line" | "circle" | "dashboard";
  percentage: number;
  status: "success" | "warning" | "exception" | "";
  strokeWidth: string;
  textInside: boolean;
  indeterminate: boolean;
  duration: number;
  striped: boolean;
  stripedFlow: boolean;
  size: string;
  showText: boolean;
  color: string | { color: string; percentage: number }[] | ((percentage: number) => string);
}

import type { DefineComponent } from "vue";

export interface EaProgressVueProps {
  variant?: "line" | "circle" | "dashboard";
  percentage?: number;
  status?: "success" | "warning" | "exception" | "";
  strokeWidth?: string;
  textInside?: boolean;
  indeterminate?: boolean;
  duration?: number;
  striped?: boolean;
  stripedFlow?: boolean;
  size?: string;
  showText?: boolean;
  color?: string | { color: string; percentage: number }[] | ((percentage: number) => string);
}

export interface EaProgressVueEvents {
  change: (event: CustomEvent<{ percentage: number }>) => void;
}

export interface EaProgressVueSlots {
  default?: () => any;
}

export type EaProgressVueComponent = DefineComponent<
  EaProgressVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaProgressVueEvents,
  {},
  {},
  EaProgressVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-progress": EaProgressVueComponent;
  }
}

import type { HTMLAttributes, ReactNode } from "react";

export interface EaProgressReactProps extends HTMLAttributes<HTMLElement> {
  variant?: "line" | "circle" | "dashboard";
  percentage?: number;
  status?: "success" | "warning" | "exception" | "";
  strokeWidth?: string;
  textInside?: boolean;
  indeterminate?: boolean;
  duration?: number;
  striped?: boolean;
  stripedFlow?: boolean;
  size?: string;
  showText?: boolean;
  color?: string | { color: string; percentage: number }[] | ((percentage: number) => string);
  onChange?: (event: CustomEvent<{ percentage: number }>) => void;
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-progress": EaProgressReactProps;
    }
  }
}

export {};
