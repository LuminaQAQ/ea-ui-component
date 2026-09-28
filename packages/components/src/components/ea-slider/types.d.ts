declare global {
  interface HTMLElementTagNameMap {
    "ea-slider": EaSliderElement;
  }
}

export interface EaSliderElement extends HTMLElement {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  disabled: boolean;
  vertical: boolean;
  showTooltip: boolean;
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
  showStops: boolean;
  showInput: boolean;
  size: "large" | "default" | "small" | "";
  required: boolean;
  marks: Record<string, string> | null;
  formatTooltip: (value: number) => number | string;
}

import type { DefineComponent } from "vue";

export interface EaSliderVueProps {
  label?: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  vertical?: boolean;
  showTooltip?: boolean;
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
  showStops?: boolean;
  showInput?: boolean;
  size?: "large" | "default" | "small" | "";
  required?: boolean;
  marks?: Record<string, string> | null;
  formatTooltip?: (value: number) => number | string;
}

export interface EaSliderVueEvents {
  change: (event: CustomEvent<{ value: number }>) => void;
  input: (event: CustomEvent<{ value: number }>) => void;
}

export type EaSliderVueComponent = DefineComponent<
  EaSliderVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaSliderVueEvents,
  {},
  {},
  {}
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-slider": EaSliderVueComponent;
  }
}

import type { HTMLAttributes } from "react";

export interface EaSliderReactProps extends HTMLAttributes<HTMLElement> {
  label?: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  vertical?: boolean;
  showTooltip?: boolean;
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
  showStops?: boolean;
  showInput?: boolean;
  size?: "large" | "default" | "small" | "";
  required?: boolean;
  marks?: Record<string, string> | null;
  formatTooltip?: (value: number) => number | string;
  onChange?: (event: CustomEvent<{ value: number }>) => void;
  onInput?: (event: CustomEvent<{ value: number }>) => void;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-slider": EaSliderReactProps;
    }
  }
}

export {};
