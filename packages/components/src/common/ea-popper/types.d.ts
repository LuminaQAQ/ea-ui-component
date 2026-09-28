declare global {
  interface HTMLElementTagNameMap {
    "ea-popper": EaPopperElement;
  }
}

export type PlacementType =
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

export interface EaPopperElement extends HTMLElement {
  width: number;
  placement: PlacementType;
  showArrow: boolean;
  visible: boolean;
  offset: string;
  flip: boolean;

  show(): void;
  hide(): void;
  toggle(): void;
  updateContainerClasslist(): string;
}

import type { DefineComponent } from "vue";

export interface EaPopperVueProps {
  width?: number;
  placement?: PlacementType;
  showArrow?: boolean;
  visible?: boolean;
  offset?: string;
  flip?: boolean;
}

export interface EaPopperVueEvents {
  "ea-show": (event: CustomEvent) => void;
  "ea-shown": (event: CustomEvent) => void;
  "ea-hide": (event: CustomEvent) => void;
  "ea-hidden": (event: CustomEvent) => void;
}

export interface EaPopperVueSlots {
  default?: () => any;
  reference?: () => any;
}

export type EaPopperVueComponent = DefineComponent<
  EaPopperVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaPopperVueEvents,
  {},
  {},
  EaPopperVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-popper": EaPopperVueComponent;
  }
}

import type { HTMLAttributes, ReactNode } from "react";

export interface EaPopperReactProps extends HTMLAttributes<HTMLElement> {
  width?: number;
  placement?: PlacementType;
  showArrow?: boolean;
  visible?: boolean;
  offset?: string;
  flip?: boolean;
  onEaShow?: (event: CustomEvent) => void;
  onEaShown?: (event: CustomEvent) => void;
  onEaHide?: (event: CustomEvent) => void;
  onEaHidden?: (event: CustomEvent) => void;
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-popper": EaPopperReactProps;
    }
  }
}

export {};
