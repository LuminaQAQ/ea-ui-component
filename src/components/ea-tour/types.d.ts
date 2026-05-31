declare global {
  interface HTMLElementTagNameMap {
    "ea-tour": EaTourElement;
    "ea-tour-step": EaTourStepElement;
  }
}

export interface EaTourElement extends HTMLElement {
  appendTo: string;
  visible: boolean;
  current: number;
  gap: number;
  mask: boolean;
  variant: "default" | "primary";
  placement:
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end"
    | "right"
    | "right-start"
    | "right-end";
}

export interface EaTourStepElement extends HTMLElement {
  heading: string;
  target: string;
  variant: "default" | "primary";
  placement:
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end"
    | "right"
    | "right-start"
    | "right-end";
  updateIndicators(allSteps: HTMLElement[]): void;
}

import type { DefineComponent } from "vue";

export interface EaTourVueProps {
  appendTo?: string;
  visible?: boolean;
  current?: number;
  gap?: number;
  mask?: boolean;
  variant?: "default" | "primary";
  placement?:
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end"
    | "right"
    | "right-start"
    | "right-end";
}

export interface EaTourStepVueProps {
  heading?: string;
  target?: string;
  variant?: "default" | "primary";
  placement?:
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end"
    | "right"
    | "right-start"
    | "right-end";
}

export interface EaTourVueEvents {
  "ea-close": (event: CustomEvent) => void;
  "ea-tour-change": (event: CustomEvent) => void;
  "ea-tour-finish": (event: CustomEvent) => void;
}

export interface EaTourVueSlots {
  default?: () => any;
}

export interface EaTourStepVueSlots {
  default?: () => any;
  header?: () => any;
  indicator?: () => any;
  footer?: () => any;
}

export type EaTourVueComponent = DefineComponent<
  EaTourVueProps, {}, {}, {}, {}, {}, {},
  keyof EaTourVueEvents, {}, {},
  EaTourVueSlots
>;

export type EaTourStepVueComponent = DefineComponent<
  EaTourStepVueProps, {}, {}, {}, {}, {}, {},
  {}, {}, {},
  EaTourStepVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-tour": EaTourVueComponent;
    "ea-tour-step": EaTourStepVueComponent;
  }
}

import type { HTMLAttributes, ReactNode } from "react";

export interface EaTourReactProps extends HTMLAttributes<HTMLElement> {
  appendTo?: string;
  visible?: boolean;
  current?: number;
  gap?: number;
  mask?: boolean;
  variant?: "default" | "primary";
  placement?:
    | "top" | "top-start" | "top-end"
    | "bottom" | "bottom-start" | "bottom-end"
    | "left" | "left-start" | "left-end"
    | "right" | "right-start" | "right-end";
  onClose?: (event: CustomEvent) => void;
  onTourChange?: (event: CustomEvent) => void;
  onTourFinish?: (event: CustomEvent) => void;
  children?: ReactNode;
}

export interface EaTourStepReactProps extends HTMLAttributes<HTMLElement> {
  heading?: string;
  target?: string;
  variant?: "default" | "primary";
  placement?:
    | "top" | "top-start" | "top-end"
    | "bottom" | "bottom-start" | "bottom-end"
    | "left" | "left-start" | "left-end"
    | "right" | "right-start" | "right-end";
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-tour": EaTourReactProps;
      "ea-tour-step": EaTourStepReactProps;
    }
  }
}

export {};
