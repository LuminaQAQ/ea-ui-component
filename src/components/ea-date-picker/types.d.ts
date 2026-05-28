declare global {
  interface HTMLElementTagNameMap {
    "ea-date-picker": EaDatePickerElement;
  }
}

export interface EaDatePickerElement extends HTMLElement {
  label: string;
  width: string;
  value: string;
  placeholder: string;
  disabled: boolean;
  align: "left" | "center" | "right";
  displayFormat: string;
  valueFormat: string;
  variant: "date" | "month" | "year";
  size: "large" | "default" | "small";
  required: boolean;

  focus(): void;
  blur(): void;
  handleOpen(): void;
  handleClose(): void;
  checkValidity(): boolean;
  reportValidity(): boolean;
  $updateLocalization(locale: string): void;
}

import type { DefineComponent } from "vue";

export interface EaDatePickerVueProps {
  label?: string;
  width?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  align?: "left" | "center" | "right";
  displayFormat?: string;
  valueFormat?: string;
  variant?: "date" | "month" | "year";
  size?: "large" | "default" | "small";
  required?: boolean;
}

export interface EaDatePickerVueEvents {
  "ea-change": (event: CustomEvent<{ fullDate: string; year: number | null; month: number | null; date: number | null; week: number | null }>) => void;
  focus: (event: FocusEvent) => void;
  blur: (event: FocusEvent) => void;
  "ea-panel-change": (event: CustomEvent<{ date: Date; mode: "month" | "year"; view?: string }>) => void;
  "ea-visible-change": (event: CustomEvent<{ visible: boolean }>) => void;
}

export interface EaDatePickerVueSlots {}

export type EaDatePickerVueComponent = DefineComponent<
  EaDatePickerVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaDatePickerVueEvents,
  {},
  {},
  EaDatePickerVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-date-picker": EaDatePickerVueComponent;
  }
}

import type { HTMLAttributes, ReactNode } from "react";

export interface EaDatePickerReactProps extends HTMLAttributes<HTMLElement> {
  label?: string;
  width?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  align?: "left" | "center" | "right";
  displayFormat?: string;
  valueFormat?: string;
  variant?: "date" | "month" | "year";
  size?: "large" | "default" | "small";
  required?: boolean;
  onEaChange?: (event: CustomEvent<{ fullDate: string; year: number | null; month: number | null; date: number | null; week: number | null }>) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  onEaPanelChange?: (event: CustomEvent<{ date: Date; mode: "month" | "year"; view?: string }>) => void;
  onEaVisibleChange?: (event: CustomEvent<{ visible: boolean }>) => void;
  children?: ReactNode;
}

export type EaDatePickerReactComponent = (props: EaDatePickerReactProps) => JSX.Element;

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-date-picker": EaDatePickerReactProps;
    }
  }
}

export {};
