declare global {
  interface HTMLElementTagNameMap {
    "ea-notification": EaNotificationElement;
  }
}

export interface EaNotificationElement extends HTMLElement {
  variant: "primary" | "success" | "warning" | "info" | "error";
  heading: string;
  visible: boolean;
  message: string;
  showClose: boolean;
  closeIcon: string;
  placement: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  zIndex: number;
  icon: string;
  dangerouslyUseHTMLString: boolean;
  close(): void;
  updateContainerClasslist(): string;
}

import type { DefineComponent } from "vue";

export interface EaNotificationVueProps {
  variant?: "primary" | "success" | "warning" | "info" | "error";
  heading?: string;
  visible?: boolean;
  message?: string;
  showClose?: boolean;
  closeIcon?: string;
  placement?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  zIndex?: number;
  icon?: string;
  dangerouslyUseHTMLString?: boolean;
}

export interface EaNotificationVueEvents {
  "ea-show": (event: CustomEvent) => void;
  "ea-shown": (event: CustomEvent) => void;
  "ea-hide": (event: CustomEvent) => void;
  "ea-hidden": (event: CustomEvent) => void;
  "ea-close": (event: CustomEvent) => void;
}

export interface EaNotificationVueSlots {
  default?: () => any;
}

export type EaNotificationVueComponent = DefineComponent<
  EaNotificationVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaNotificationVueEvents,
  {},
  {},
  EaNotificationVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-notification": EaNotificationVueComponent;
  }
}

import type { HTMLAttributes, ReactNode } from "react";

export interface EaNotificationReactProps extends HTMLAttributes<HTMLElement> {
  variant?: "primary" | "success" | "warning" | "info" | "error";
  heading?: string;
  visible?: boolean;
  message?: string;
  showClose?: boolean;
  closeIcon?: string;
  placement?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  zIndex?: number;
  icon?: string;
  dangerouslyUseHTMLString?: boolean;
  onEaShow?: (event: CustomEvent) => void;
  onEaShown?: (event: CustomEvent) => void;
  onEaHide?: (event: CustomEvent) => void;
  onEaHidden?: (event: CustomEvent) => void;
  onEaClose?: (event: CustomEvent) => void;
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-notification": EaNotificationReactProps;
    }
  }
}

export {};
