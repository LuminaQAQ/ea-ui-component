declare global {
  interface HTMLElementTagNameMap {
    "ea-infinite-scroll": EaInfiniteScrollElement;
  }
}

export interface EaInfiniteScrollElement extends HTMLElement {
  status: "finished" | "loading" | "noMore";
  distance: number;
}

import type { DefineComponent } from "vue";

export interface EaInfiniteScrollVueProps {
  status?: "finished" | "loading" | "noMore";
  distance?: number;
}

export interface EaInfiniteScrollVueSlots {
  default?: () => any;
  loading?: () => any;
  noMore?: () => any;
}

export type EaInfiniteScrollVueComponent = DefineComponent<
  EaInfiniteScrollVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaInfiniteScrollVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-infinite-scroll": EaInfiniteScrollVueComponent;
  }
}

import type { HTMLAttributes, ReactNode } from "react";

export interface EaInfiniteScrollReactProps extends HTMLAttributes<HTMLElement> {
  status?: "finished" | "loading" | "noMore";
  distance?: number;
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-infinite-scroll": EaInfiniteScrollReactProps;
    }
  }
}

export {};
