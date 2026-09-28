declare global {
  interface HTMLElementTagNameMap {
    "ea-skeleton": EaSkeletonElement;
    "ea-skeleton-item": EaSkeletonItemElement;
  }
}

export interface EaSkeletonElement extends HTMLElement {
  rows: number;
  animated: boolean;
  count: number;
  loading: boolean;
  throttleLeading: number;
  throttleTrailing: number;
  updateContainerClasslist(): string;
}

export interface EaSkeletonItemElement extends HTMLElement {
  variant: "p" | "text" | "h1" | "h3" | "caption" | "button" | "image" | "circle" | "rect";
  animated: boolean;
  updateContainerClasslist(): string;
}

import type { DefineComponent } from "vue";

export interface EaSkeletonVueProps {
  rows?: number;
  animated?: boolean;
  count?: number;
  loading?: boolean;
  throttleLeading?: number;
  throttleTrailing?: number;
}

export interface EaSkeletonItemVueProps {
  variant?: "p" | "text" | "h1" | "h3" | "caption" | "button" | "image" | "circle" | "rect";
  animated?: boolean;
}

export interface EaSkeletonVueSlots {
  default?: () => any;
  template?: () => any;
}

export interface EaSkeletonItemVueSlots {
  default?: () => any;
}

export type EaSkeletonVueComponent = DefineComponent<
  EaSkeletonVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaSkeletonVueSlots
>;

export type EaSkeletonItemVueComponent = DefineComponent<
  EaSkeletonItemVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaSkeletonItemVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-skeleton": EaSkeletonVueComponent;
    "ea-skeleton-item": EaSkeletonItemVueComponent;
  }
}

import type { HTMLAttributes, ReactNode } from "react";

export interface EaSkeletonReactProps extends HTMLAttributes<HTMLElement> {
  rows?: number;
  animated?: boolean;
  count?: number;
  loading?: boolean;
  throttleLeading?: number;
  throttleTrailing?: number;
  children?: ReactNode;
}

export interface EaSkeletonItemReactProps extends HTMLAttributes<HTMLElement> {
  variant?: "p" | "text" | "h1" | "h3" | "caption" | "button" | "image" | "circle" | "rect";
  animated?: boolean;
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-skeleton": EaSkeletonReactProps;
      "ea-skeleton-item": EaSkeletonItemReactProps;
    }
  }
}

export {};
