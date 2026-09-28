declare global {
  interface HTMLElementTagNameMap {
    "ea-statistic": EaStatisticElement;
  }
}

export interface EaStatisticElement extends HTMLElement {
  heading: string;
  value: number;
}

import type { DefineComponent } from "vue";

export interface EaStatisticVueProps {
  heading?: string;
  value?: number;
}

export interface EaStatisticVueEvents {}

export interface EaStatisticVueSlots {
  default?: () => any;
  title?: () => any;
  prefix?: () => any;
  suffix?: () => any;
}

export type EaStatisticVueComponent = DefineComponent<
  EaStatisticVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaStatisticVueEvents,
  {},
  {},
  EaStatisticVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-statistic": EaStatisticVueComponent;
  }
}

import type { HTMLAttributes, ReactNode } from "react";

export interface EaStatisticReactProps extends HTMLAttributes<HTMLElement> {
  heading?: string;
  value?: number;
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-statistic": EaStatisticReactProps;
    }
  }
}

export {};
