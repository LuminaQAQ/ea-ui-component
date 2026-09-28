import type { EaRadioBlurEvent } from "./events/EaRadioBlurEvent";
import type { EaRadioChangeEvent } from "./events/EaRadioChangeEvent";
import type { EaRadioFocusEvent } from "./events/EaRadioFocusEvent";

export {
  EaRadioBlurEvent,
  type EaRadioBlurEventDetail,
} from "./events/EaRadioBlurEvent";
export {
  EaRadioChangeEvent,
  type EaRadioChangeEventDetail,
} from "./events/EaRadioChangeEvent";
export {
  EaRadioFocusEvent,
  type EaRadioFocusEventDetail,
} from "./events/EaRadioFocusEvent";

declare global {
  interface HTMLElementTagNameMap {
    "ea-radio": EaRadioElement;
    "ea-radio-group": EaRadioGroupElement;
  }
}

export interface EaRadioElement extends HTMLElement {
  name: string;
  value: string;
  disabled: boolean;
  checked: boolean;
  label: string;
  border: boolean;
  size: "small" | "default" | "large";
  focus(): void;
  blur(): void;

  addEventListener(
    type: "change",
    listener: (event: EaRadioChangeEvent) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: "focus",
    listener: (event: EaRadioFocusEvent) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: "blur",
    listener: (event: EaRadioBlurEvent) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;
}

export interface EaRadioGroupElement extends HTMLElement {
  label: string;
  name: string;
  value: string;
  size: "" | "small" | "default" | "large";
  disabled: boolean;
  border: boolean;
  required: boolean;

  addEventListener(
    type: "change",
    listener: (event: EaRadioChangeEvent) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;
}

import type { DefineComponent } from "vue";

export interface EaRadioVueProps {
  name?: string;
  value?: string;
  disabled?: boolean;
  checked?: boolean;
  label?: string;
  border?: boolean;
  size?: "small" | "default" | "large";
}

export interface EaRadioGroupVueProps {
  label?: string;
  name?: string;
  value?: string;
  size?: "" | "small" | "default" | "large";
  disabled?: boolean;
  border?: boolean;
  required?: boolean;
}

export interface EaRadioVueEvents {
  onChange?: (event: EaRadioChangeEvent) => void;
  onFocus?: (event: EaRadioFocusEvent) => void;
  onBlur?: (event: EaRadioBlurEvent) => void;
}

export interface EaRadioGroupVueEvents {
  onChange?: (event: EaRadioChangeEvent) => void;
}

export interface EaRadioVueSlots {
  default?: () => any;
}

export interface EaRadioGroupVueSlots {
  default?: () => any;
}

export type EaRadioVueComponent = DefineComponent<
  EaRadioVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaRadioVueEvents,
  {},
  {},
  EaRadioVueSlots
>;

export type EaRadioGroupVueComponent = DefineComponent<
  EaRadioGroupVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaRadioGroupVueEvents,
  {},
  {},
  EaRadioGroupVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-radio": EaRadioVueComponent;
    "ea-radio-group": EaRadioGroupVueComponent;
  }
}

import type { HTMLAttributes, ReactNode } from "react";

export interface EaRadioReactProps extends HTMLAttributes<HTMLElement> {
  name?: string;
  value?: string;
  disabled?: boolean;
  checked?: boolean;
  label?: string;
  border?: boolean;
  size?: "small" | "default" | "large";
  onChange?: (event: EaRadioChangeEvent) => void;
  onFocus?: (event: EaRadioFocusEvent) => void;
  onBlur?: (event: EaRadioBlurEvent) => void;
  children?: ReactNode;
}

export interface EaRadioGroupReactProps extends HTMLAttributes<HTMLElement> {
  label?: string;
  name?: string;
  value?: string;
  size?: "" | "small" | "default" | "large";
  disabled?: boolean;
  border?: boolean;
  required?: boolean;
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-radio": EaRadioReactProps;
      "ea-radio-group": EaRadioGroupReactProps;
    }
  }
}

export {};
