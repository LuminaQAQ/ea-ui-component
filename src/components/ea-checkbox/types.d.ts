import type { EaCheckboxBlurEvent } from "./events/EaCheckboxBlurEvent";
import type { EaCheckboxChangeEvent } from "./events/EaCheckboxChangeEvent";
import type { EaCheckboxFocusEvent } from "./events/EaCheckboxFocusEvent";

declare global {
  interface HTMLElementTagNameMap {
    "ea-checkbox": EaCheckboxElement;
    "ea-checkbox-group": EaCheckboxGroupElement;
  }
}

export interface EaCheckboxElement extends HTMLElement {
  label: string;
  value: string;
  name: string;
  disabled: boolean;
  checked: boolean;
  indeterminate: boolean;
  size: "small" | "default" | "large";
  border: boolean;
  limitDisabled: boolean;
  required: boolean;
  focus(): void;
  blur(): void;
  toggle(): void;
}

export interface EaCheckboxGroupElement extends HTMLElement {
  label: string;
  name: string;
  value: any[];
  size: "small" | "default" | "large";
  disabled: boolean;
  min: number;
  max: number;
  required: boolean;
}

import type { DefineComponent } from "vue";

export interface EaCheckboxVueProps {
  label?: string;
  value?: string;
  name?: string;
  disabled?: boolean;
  checked?: boolean;
  indeterminate?: boolean;
  size?: "small" | "default" | "large";
  border?: boolean;
  limitDisabled?: boolean;
  required?: boolean;
}

export interface EaCheckboxGroupVueProps {
  label?: string;
  name?: string;
  value?: any[];
  size?: "small" | "default" | "large";
  disabled?: boolean;
  min?: number;
  max?: number;
  required?: boolean;
}

export interface EaCheckboxVueEvents {
  onChange?: (event: EaCheckboxChangeEvent) => void;
  onFocus?: (event: EaCheckboxFocusEvent) => void;
  onBlur?: (event: EaCheckboxBlurEvent) => void;
}

export interface EaCheckboxVueSlots {
  default?: () => any;
}

export interface EaCheckboxGroupVueSlots {
  default?: () => any;
}

export type EaCheckboxVueComponent = DefineComponent<
  EaCheckboxVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaCheckboxVueEvents,
  {},
  {},
  EaCheckboxVueSlots
>;

export type EaCheckboxGroupVueComponent = DefineComponent<
  EaCheckboxGroupVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaCheckboxGroupVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-checkbox": EaCheckboxVueComponent;
    "ea-checkbox-group": EaCheckboxGroupVueComponent;
  }
}

import type { HTMLAttributes, ReactNode } from "react";

export interface EaCheckboxReactProps extends HTMLAttributes<HTMLElement> {
  label?: string;
  value?: string;
  name?: string;
  disabled?: boolean;
  checked?: boolean;
  indeterminate?: boolean;
  size?: "small" | "default" | "large";
  border?: boolean;
  limitDisabled?: boolean;
  required?: boolean;
  onChange?: (event: EaCheckboxChangeEvent) => void;
  onFocus?: (event: EaCheckboxFocusEvent) => void;
  onBlur?: (event: EaCheckboxBlurEvent) => void;
  children?: ReactNode;
}

export interface EaCheckboxGroupReactProps extends HTMLAttributes<HTMLElement> {
  label?: string;
  name?: string;
  value?: any[];
  size?: "small" | "default" | "large";
  disabled?: boolean;
  min?: number;
  max?: number;
  required?: boolean;
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-checkbox": EaCheckboxReactProps;
      "ea-checkbox-group": EaCheckboxGroupReactProps;
    }
  }
}

export {};
