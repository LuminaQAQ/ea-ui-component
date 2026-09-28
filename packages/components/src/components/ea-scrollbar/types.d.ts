declare global {
  interface HTMLElementTagNameMap {
    "ea-scrollbar": EaScrollbarElement;
  }
}

export interface EaScrollbarElement extends HTMLElement {
  height: string;
  native: boolean;
  noresize: boolean;
  always: boolean;
  scrollTo(options: ScrollToOptions): void;
  scrollTo(x: number, y: number): void;
}

import type { DefineComponent } from "vue";

export interface EaScrollbarVueProps {
  height?: string;
  native?: boolean;
  noresize?: boolean;
  always?: boolean;
}

export interface EaScrollbarVueEvents {
  "ea-scroll": (event: CustomEvent<{ scrollTop: number; scrollLeft: number }>) => void;
  "ea-end-reached": (event: CustomEvent<{ direction: "top" | "bottom" | "left" | "right"; scrollTop: number; scrollLeft: number }>) => void;
}

export interface EaScrollbarVueSlots {
  default?: () => any;
}

export type EaScrollbarVueComponent = DefineComponent<
  EaScrollbarVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaScrollbarVueEvents,
  {},
  {},
  EaScrollbarVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-scrollbar": EaScrollbarVueComponent;
  }
}

import type { HTMLAttributes, ReactNode } from "react";

export interface EaScrollbarReactProps extends HTMLAttributes<HTMLElement> {
  height?: string;
  native?: boolean;
  noresize?: boolean;
  always?: boolean;
  onEaScroll?: (event: CustomEvent<{ scrollTop: number; scrollLeft: number }>) => void;
  onEaEndReached?: (event: CustomEvent<{ direction: "top" | "bottom" | "left" | "right"; scrollTop: number; scrollLeft: number }>) => void;
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-scrollbar": EaScrollbarReactProps;
    }
  }
}

export {};
