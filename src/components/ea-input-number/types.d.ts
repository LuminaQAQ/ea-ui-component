// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-input-number": EaInputNumberElement;
  }
}

export interface EaInputNumberElement extends HTMLElement {
  label: string;
  value: number;
  min: number;
  max: number;
  required: boolean;
  step: number;
  stepStrictly: boolean;
  precision: number;
  size: "large" | "default" | "small" | "";
  readonly: boolean;
  disabled: boolean;
  controls: boolean;
  valueOnClear: number | string;
  align: "left" | "center" | "right";
  name: string;
  placeholder: string;
  inputmode: string;

  focus(): void;
  blur(): void;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

export interface EaInputNumberVueProps {
  label?: string;
  value?: number;
  min?: number;
  max?: number;
  required?: boolean;
  step?: number;
  stepStrictly?: boolean;
  precision?: number;
  size?: "large" | "default" | "small" | "";
  readonly?: boolean;
  disabled?: boolean;
  controls?: boolean;
  valueOnClear?: number | string;
  align?: "left" | "center" | "right";
  name?: string;
  placeholder?: string;
  inputmode?: string;
}

export interface EaInputNumberVueEvents {
  "ea-change": (event: CustomEvent<{ currentValue: number; oldValue: number }>) => void;
  focus: (event: FocusEvent) => void;
  blur: (event: FocusEvent) => void;
}

export interface EaInputNumberVueSlots {
  prefix?: () => any;
  suffix?: () => any;
}

export type EaInputNumberVueComponent = DefineComponent<
  EaInputNumberVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaInputNumberVueEvents,
  {},
  {},
  EaInputNumberVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-input-number": EaInputNumberVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

export interface EaInputNumberReactProps extends HTMLAttributes<HTMLElement> {
  label?: string;
  value?: number;
  min?: number;
  max?: number;
  required?: boolean;
  step?: number;
  stepStrictly?: boolean;
  precision?: number;
  size?: "large" | "default" | "small" | "";
  readonly?: boolean;
  disabled?: boolean;
  controls?: boolean;
  valueOnClear?: number | string;
  align?: "left" | "center" | "right";
  name?: string;
  placeholder?: string;
  inputmode?: string;
  onEaChange?: (event: CustomEvent<{ currentValue: number; oldValue: number }>) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-input-number": EaInputNumberReactProps;
    }
  }
}

export {};
