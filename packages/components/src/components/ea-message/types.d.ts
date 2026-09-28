declare global {
  interface HTMLElementTagNameMap {
    "ea-message": EaMessageElement;
  }
}

export interface EaMessageElement extends HTMLElement {
  variant: "primary" | "success" | "warning" | "danger" | "info";
  visible: boolean;
  message: string;
  showClose: boolean;
  placement: "top" | "top-left" | "top-right" | "bottom" | "bottom-left" | "bottom-right" | "middle";
  icon: string;
  offset: number;
  dangerouslyUseHTMLString: boolean;
  close(): void;
}

import type { DefineComponent } from "vue";

export interface EaMessageVueProps {
  variant?: "primary" | "success" | "warning" | "danger" | "info";
  visible?: boolean;
  message?: string;
  showClose?: boolean;
  placement?: "top" | "top-left" | "top-right" | "bottom" | "bottom-left" | "bottom-right" | "middle";
  icon?: string;
  offset?: number;
  dangerouslyUseHTMLString?: boolean;
}

export interface EaMessageVueEvents {
  "ea-close": (event: CustomEvent) => void;
  "ea-show": (event: CustomEvent) => void;
  "ea-shown": (event: CustomEvent) => void;
  "ea-hide": (event: CustomEvent) => void;
  "ea-hidden": (event: CustomEvent) => void;
}

export interface EaMessageVueSlots {
  default?: () => any;
}

export type EaMessageVueComponent = DefineComponent<
  EaMessageVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaMessageVueEvents,
  {},
  {},
  EaMessageVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-message": EaMessageVueComponent;
  }
}

import type { HTMLAttributes, ReactNode } from "react";

export interface EaMessageReactProps extends HTMLAttributes<HTMLElement> {
  variant?: "primary" | "success" | "warning" | "danger" | "info";
  visible?: boolean;
  message?: string;
  showClose?: boolean;
  placement?: "top" | "top-left" | "top-right" | "bottom" | "bottom-left" | "bottom-right" | "middle";
  icon?: string;
  offset?: number;
  dangerouslyUseHTMLString?: boolean;
  onEaClose?: (event: CustomEvent) => void;
  onEaShow?: (event: CustomEvent) => void;
  onEaShown?: (event: CustomEvent) => void;
  onEaHide?: (event: CustomEvent) => void;
  onEaHidden?: (event: CustomEvent) => void;
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-message": EaMessageReactProps;
    }
  }
}

export {};
