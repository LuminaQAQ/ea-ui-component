export {
  EaAlertCloseEvent,
  type EaAlertCloseEventDetail,
} from "./events/EaAlertCloseEvent";
export {
  EaAlertOpenEvent,
  type EaAlertOpenEventDetail,
} from "./events/EaAlertOpenEvent";

declare global {
  interface HTMLElementTagNameMap {
    "ea-alert": EaAlertElement;
  }
}

export interface EaAlertElement extends HTMLElement {
  heading: string;
  description: string;
  variant: "primary" | "success" | "warning" | "danger" | "info";
  effect: "light" | "dark";
  closeText: string;
  closable: boolean;
  showIcon: boolean;
  center: boolean;
  showAfter: number;
  hideAfter: number;
  autoClose: number;
  updateContainerClasslist(): string;
}

import type { DefineComponent } from "vue";

export interface EaAlertVueProps {
  heading?: string;
  description?: string;
  variant?: "primary" | "success" | "warning" | "danger" | "info";
  effect?: "light" | "dark";
  closeText?: string;
  closable?: boolean;
  showIcon?: boolean;
  center?: boolean;
  showAfter?: number;
  hideAfter?: number;
  autoClose?: number;
}

export interface EaAlertVueEvents {
  "ea-alert-close": (event: EaAlertCloseEvent) => void;
  "ea-alert-open": (event: EaAlertOpenEvent) => void;
}

export interface EaAlertVueSlots {
  icon?: () => any;
  heading?: () => any;
  default?: () => any;
}

declare module "vue" {
  interface GlobalComponents {
    "ea-alert": DefineComponent<EaAlertVueProps>;
  }
}

import type { HTMLAttributes, ReactNode } from "react";

export interface EaAlertReactProps extends HTMLAttributes<HTMLElement> {
  heading?: string;
  description?: string;
  variant?: "primary" | "success" | "warning" | "danger" | "info";
  effect?: "light" | "dark";
  closeText?: string;
  closable?: boolean;
  showIcon?: boolean;
  center?: boolean;
  showAfter?: number;
  hideAfter?: number;
  autoClose?: number;
  onEaAlertClose?: (event: EaAlertCloseEvent) => void;
  onEaAlertOpen?: (event: EaAlertOpenEvent) => void;
  icon?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-alert": EaAlertReactProps;
    }
  }
}
