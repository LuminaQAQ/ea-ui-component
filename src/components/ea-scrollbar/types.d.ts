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
  updateContainerClasslist(): string;
}

import type { DefineComponent } from "vue";

export interface EaScrollbarVueProps {
  height?: string;
  native?: boolean;
  noresize?: boolean;
  always?: boolean;
}

export interface EaScrollbarVueEvents {
  scroll: (event: CustomEvent<{ scrollTop: number; scrollLeft: number }>) => void;
  "end-reached": (event: CustomEvent<{ direction: string; scrollTop: number; scrollLeft: number }>) => void;
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
  onScroll?: (event: CustomEvent<{ scrollTop: number; scrollLeft: number }>) => void;
  onEndReached?: (event: CustomEvent<{ direction: string; scrollTop: number; scrollLeft: number }>) => void;
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
