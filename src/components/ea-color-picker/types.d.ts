// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-color-picker": EaColorPickerElement;
    "ea-color-picker-panel": EaColorPickerPanelElement;
  }
}

/**
 * ea-color-picker 组件的 HTML 接口
 */
export interface EaColorPickerElement extends HTMLElement {
  label: string;
  value: string;
  disabled: boolean;
  clearable: boolean;
  size: string;
  colorFormat: "hsl" | "hsv" | "hex" | "rgb" | "rgba";
  showAlpha: boolean;
  tabindex: number;
  required: boolean;
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
  predefine: string[];
  show(): void;
  hide(): void;
  focus(): void;
  blur(): void;
}

/**
 * ea-color-picker-panel 组件的 HTML 接口
 */
export interface EaColorPickerPanelElement extends HTMLElement {
  value: string;
  colorFormat: "hsl" | "hsv" | "hex" | "rgb" | "rgba";
  showAlpha: boolean;
  disabled: boolean;
  border: boolean;
  clearable: boolean;
  predefine: string[];
  resetCursorPosition(): void;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

export interface EaColorPickerVueProps {
  label?: string;
  value?: string;
  disabled?: boolean;
  clearable?: boolean;
  size?: string;
  colorFormat?: "hsl" | "hsv" | "hex" | "rgb" | "rgba";
  showAlpha?: boolean;
  tabindex?: number;
  required?: boolean;
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
  predefine?: string[];
}

export interface EaColorPickerPanelVueProps {
  value?: string;
  colorFormat?: "hsl" | "hsv" | "hex" | "rgb" | "rgba";
  showAlpha?: boolean;
  disabled?: boolean;
  border?: boolean;
  clearable?: boolean;
  predefine?: string[];
}

export interface EaColorPickerVueEvents {
  change: (event: CustomEvent) => void;
}

export interface EaColorPickerVueSlots {
  default?: () => any;
}

export interface EaColorPickerPanelVueSlots {
  footer?: () => any;
}

export type EaColorPickerVueComponent = DefineComponent<
  EaColorPickerVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaColorPickerVueEvents,
  {},
  {},
  EaColorPickerVueSlots
>;

export type EaColorPickerPanelVueComponent = DefineComponent<
  EaColorPickerPanelVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaColorPickerPanelVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-color-picker": EaColorPickerVueComponent;
    "ea-color-picker-panel": EaColorPickerPanelVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

export interface EaColorPickerReactProps extends HTMLAttributes<HTMLElement> {
  label?: string;
  value?: string;
  disabled?: boolean;
  clearable?: boolean;
  size?: string;
  colorFormat?: "hsl" | "hsv" | "hex" | "rgb" | "rgba";
  showAlpha?: boolean;
  tabindex?: number;
  required?: boolean;
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
  predefine?: string[];
  onChange?: (event: CustomEvent) => void;
  children?: ReactNode;
}

export interface EaColorPickerPanelReactProps extends HTMLAttributes<HTMLElement> {
  value?: string;
  colorFormat?: "hsl" | "hsv" | "hex" | "rgb" | "rgba";
  showAlpha?: boolean;
  disabled?: boolean;
  border?: boolean;
  clearable?: boolean;
  predefine?: string[];
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-color-picker": EaColorPickerReactProps;
      "ea-color-picker-panel": EaColorPickerPanelReactProps;
    }
  }
}

export {};
