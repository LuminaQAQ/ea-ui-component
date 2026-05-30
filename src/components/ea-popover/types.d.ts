declare global {
  interface HTMLElementTagNameMap {
    "ea-popover": EaPopoverElement;
  }
}

export interface EaPopoverElement extends HTMLElement {
  trigger: "click" | "focus" | "hover" | "contextmenu" | "customized";
  visible: boolean;
  heading: string;
  content: string;
  width: number;
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
  offset: string;
  flip: boolean;

  show(): void;
  hide(): void;
  toggle(): void;
}

import type { DefineComponent } from "vue";

export interface EaPopoverVueProps {
  trigger?: "click" | "focus" | "hover" | "contextmenu" | "customized";
  visible?: boolean;
  heading?: string;
  content?: string;
  width?: number;
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
  offset?: string;
  flip?: boolean;
}

export interface EaPopoverVueEvents {
  "ea-show": (event: CustomEvent) => void;
  "ea-shown": (event: CustomEvent) => void;
  "ea-hide": (event: CustomEvent) => void;
  "ea-hidden": (event: CustomEvent) => void;
}

export interface EaPopoverVueSlots {
  default?: () => any;
  reference?: () => any;
}

export type EaPopoverVueComponent = DefineComponent<
  EaPopoverVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaPopoverVueEvents,
  {},
  {},
  EaPopoverVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-popover": EaPopoverVueComponent;
  }
}

import type { HTMLAttributes, ReactNode } from "react";

export interface EaPopoverReactProps extends HTMLAttributes<HTMLElement> {
  trigger?: "click" | "focus" | "hover" | "contextmenu" | "customized";
  visible?: boolean;
  heading?: string;
  content?: string;
  width?: number;
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
  offset?: string;
  flip?: boolean;
  onEaShow?: (event: CustomEvent) => void;
  onEaShown?: (event: CustomEvent) => void;
  onEaHide?: (event: CustomEvent) => void;
  onEaHidden?: (event: CustomEvent) => void;
  children?: ReactNode;
  reference?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-popover": EaPopoverReactProps;
    }
  }
}

export {};
