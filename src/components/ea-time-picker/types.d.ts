declare global {
  interface HTMLElementTagNameMap {
    "ea-time-picker": EaTimePickerElement;
  }
}

export interface EaTimePickerElement extends HTMLElement {
  label: string;
  width: string;
  value: string;
  placeholder: string;
  disabled: boolean;
  align: "left" | "center" | "right";
  size: "large" | "default" | "small";
  limitRangeStart: string;
  limitRangeEnd: string;
  required: boolean;

  focus(): void;
  blur(): void;
  handleOpen(): void;
  handleClose(): void;
  checkValidity(): boolean;
  reportValidity(): boolean;
}

import type { DefineComponent } from "vue";

export interface EaTimePickerVueProps {
  label?: string;
  width?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  align?: "left" | "center" | "right";
  size?: "large" | "default" | "small";
  limitRangeStart?: string;
  limitRangeEnd?: string;
  required?: boolean;
}

export interface EaTimePickerVueEvents {
  change: (event: CustomEvent<{ value: string }>) => void;
  focus: (event: FocusEvent) => void;
  blur: (event: FocusEvent) => void;
  "ea-visible-change": (event: CustomEvent<{ visible: boolean }>) => void;
}

export interface EaTimePickerVueSlots {}

export type EaTimePickerVueComponent = DefineComponent<
  EaTimePickerVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaTimePickerVueEvents,
  {},
  {},
  EaTimePickerVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-time-picker": EaTimePickerVueComponent;
  }
}

import type { HTMLAttributes, ReactNode } from "react";

export interface EaTimePickerReactProps extends HTMLAttributes<HTMLElement> {
  label?: string;
  width?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  align?: "left" | "center" | "right";
  size?: "large" | "default" | "small";
  limitRangeStart?: string;
  limitRangeEnd?: string;
  required?: boolean;
  onChange?: (event: CustomEvent<{ value: string }>) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  onEaVisibleChange?: (event: CustomEvent<{ visible: boolean }>) => void;
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-time-picker": EaTimePickerReactProps;
    }
  }
}

export {};
