declare global {
  interface HTMLElementTagNameMap {
    "ea-tooltip": EaTooltipElement;
  }
}

export interface EaTooltipElement extends HTMLElement {
  trigger: "click" | "focus" | "hover" | "contextmenu" | "customized";
  effect: "dark" | "light" | "customized";
  content: string;
  visible: boolean;
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

export interface EaTooltipVueProps {
  trigger?: "click" | "focus" | "hover" | "contextmenu" | "customized";
  effect?: "dark" | "light" | "customized";
  content?: string;
  visible?: boolean;
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

export interface EaTooltipVueEvents {
  "ea-show": (event: CustomEvent) => void;
  "ea-shown": (event: CustomEvent) => void;
  "ea-hide": (event: CustomEvent) => void;
  "ea-hidden": (event: CustomEvent) => void;
}

export interface EaTooltipVueSlots {
  default?: () => any;
  reference?: () => any;
}

export type EaTooltipVueComponent = DefineComponent<
  EaTooltipVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaTooltipVueEvents,
  {},
  {},
  EaTooltipVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-tooltip": EaTooltipVueComponent;
  }
}

import type { HTMLAttributes, ReactNode } from "react";

export interface EaTooltipReactProps extends HTMLAttributes<HTMLElement> {
  trigger?: "click" | "focus" | "hover" | "contextmenu" | "customized";
  effect?: "dark" | "light" | "customized";
  content?: string;
  visible?: boolean;
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
      "ea-tooltip": EaTooltipReactProps;
    }
  }
}

export {};
