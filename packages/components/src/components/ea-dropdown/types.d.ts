export { EaDropdownCommandEvent, type EaDropdownCommandEventDetail } from "./events/EaDropdownCommandEvent";

// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-dropdown": EaDropdownElement;
    "ea-dropdown-item": EaDropdownItemElement;
    "ea-dropdown-menu": EaDropdownMenuElement;
  }
}

export interface EaDropdownElement extends HTMLElement {
  trigger: "click" | "hover" | "contextmenu";
  hideOnClick: boolean;
  size: "small" | "default" | "large" | "";
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
  showArrow: boolean;
  visible: boolean;
  width: number;
  offset: string;
  flip: boolean;

  show(): void;
  hide(): void;
  toggle(): void;
}

export interface EaDropdownItemElement extends HTMLElement {
  divided: boolean;
  disabled: boolean;
  command: string;
}

export interface EaDropdownMenuElement extends HTMLElement {}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

export interface EaDropdownVueProps {
  trigger?: "click" | "hover" | "contextmenu";
  hideOnClick?: boolean;
  size?: "small" | "default" | "large" | "";
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
  showArrow?: boolean;
  visible?: boolean;
  width?: number;
  offset?: string;
  flip?: boolean;
}

export interface EaDropdownItemVueProps {
  divided?: boolean;
  disabled?: boolean;
  command?: string;
}

export interface EaDropdownMenuVueProps {}

export interface EaDropdownVueEvents {
  "ea-command": (event: EaDropdownCommandEvent) => void;
  "ea-show": (event: CustomEvent) => void;
  "ea-shown": (event: CustomEvent) => void;
  "ea-hide": (event: CustomEvent) => void;
  "ea-hidden": (event: CustomEvent) => void;
}

export interface EaDropdownItemVueEvents {
  "ea-dropdown-item-click": (event: CustomEvent) => void;
  "ea-command": (event: EaDropdownCommandEvent) => void;
}

export interface EaDropdownVueSlots {
  default?: () => any;
  reference?: () => any;
}

export interface EaDropdownItemVueSlots {
  default?: () => any;
}

export interface EaDropdownMenuVueSlots {
  default?: () => any;
}

export type EaDropdownVueComponent = DefineComponent<
  EaDropdownVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaDropdownVueEvents,
  {},
  {},
  EaDropdownVueSlots
>;

export type EaDropdownItemVueComponent = DefineComponent<
  EaDropdownItemVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaDropdownItemVueEvents,
  {},
  {},
  EaDropdownItemVueSlots
>;

export type EaDropdownMenuVueComponent = DefineComponent<
  EaDropdownMenuVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaDropdownMenuVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-dropdown": EaDropdownVueComponent;
    "ea-dropdown-item": EaDropdownItemVueComponent;
    "ea-dropdown-menu": EaDropdownMenuVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

export interface EaDropdownReactProps extends HTMLAttributes<HTMLElement> {
  trigger?: "click" | "hover" | "contextmenu";
  hideOnClick?: boolean;
  size?: "small" | "default" | "large" | "";
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
  showArrow?: boolean;
  visible?: boolean;
  width?: number;
  offset?: string;
  flip?: boolean;
  onEaCommand?: (event: EaDropdownCommandEvent) => void;
  onEaShow?: (event: CustomEvent) => void;
  onEaShown?: (event: CustomEvent) => void;
  onEaHide?: (event: CustomEvent) => void;
  onEaHidden?: (event: CustomEvent) => void;
  children?: ReactNode;
}

export interface EaDropdownItemReactProps extends HTMLAttributes<HTMLElement> {
  divided?: boolean;
  disabled?: boolean;
  command?: string;
  onEaDropdownItemClick?: (event: CustomEvent) => void;
  onEaCommand?: (event: EaDropdownCommandEvent) => void;
  children?: ReactNode;
}

export interface EaDropdownMenuReactProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-dropdown": EaDropdownReactProps;
      "ea-dropdown-item": EaDropdownItemReactProps;
      "ea-dropdown-menu": EaDropdownMenuReactProps;
    }
  }
}

export {};
