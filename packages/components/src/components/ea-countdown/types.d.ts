import type { EaCountdownChangeEvent } from "./events/EaCountdownChangeEvent";
import type { EaCountdownFinishEvent } from "./events/EaCountdownFinishEvent";

declare global {
  interface HTMLElementTagNameMap {
    "ea-countdown": EaCountdownElement;
  }
}

export interface EaCountdownElement extends HTMLElement {
  value: string;
  format: string;
  refreshInterval: number;
  heading: string;
  displayValue: string;
}

import type { DefineComponent } from "vue";

export interface EaCountdownVueProps {
  value?: string;
  format?: string;
  refreshInterval?: number;
  heading?: string;
}

export interface EaCountdownVueEvents {
  "ea-change": (event: EaCountdownChangeEvent) => void;
  "ea-finish": (event: EaCountdownFinishEvent) => void;
}

export interface EaCountdownVueSlots {
  default?: () => any;
  title?: () => any;
  prefix?: () => any;
  suffix?: () => any;
}

export type EaCountdownVueComponent = DefineComponent<
  EaCountdownVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaCountdownVueEvents,
  {},
  {},
  EaCountdownVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-countdown": EaCountdownVueComponent;
  }
}

import type { HTMLAttributes, ReactNode } from "react";

export interface EaCountdownReactProps extends HTMLAttributes<HTMLElement> {
  value?: string;
  format?: string;
  refreshInterval?: number;
  heading?: string;
  onEaChange?: (event: EaCountdownChangeEvent) => void;
  onEaFinish?: (event: EaCountdownFinishEvent) => void;
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-countdown": EaCountdownReactProps;
    }
  }
}

export {};
