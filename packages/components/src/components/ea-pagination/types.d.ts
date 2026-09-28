declare global {
  interface HTMLElementTagNameMap {
    "ea-pagination": EaPaginationElement;
  }
}

export interface EaPaginationElement extends HTMLElement {
  defaultPageSize: number;
  pageSize: number;
  pagerCount: number;
  total: number;
  currentPage: number;
  background: boolean;
  size: "large" | "default" | "small" | "";
  hideOnSinglePage: boolean;
  disabled: boolean;
  pageSizes: number[];
  layout: Array<"prev" | "pager" | "next" | "jumper" | "total" | "sizes" | "->">;
}

import type { DefineComponent } from "vue";

export interface EaPaginationVueProps {
  defaultPageSize?: number;
  pageSize?: number;
  pagerCount?: number;
  total?: number;
  currentPage?: number;
  background?: boolean;
  size?: "large" | "default" | "small" | "";
  hideOnSinglePage?: boolean;
  disabled?: boolean;
}

export interface EaPaginationVueEvents {
  "ea-current-change": (event: CustomEvent<{ value: number }>) => void;
  "ea-prev-click": (event: CustomEvent<{ value: number }>) => void;
  "ea-next-click": (event: CustomEvent<{ value: number }>) => void;
  "ea-size-change": (event: CustomEvent<{ pageSize: number }>) => void;
}

export interface EaPaginationVueSlots {
  default?: () => any;
}

export type EaPaginationVueComponent = DefineComponent<
  EaPaginationVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  "ea-current-change" | "ea-prev-click" | "ea-next-click" | "ea-size-change",
  {},
  {},
  EaPaginationVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-pagination": EaPaginationVueComponent;
  }
}

import type { HTMLAttributes, ReactNode } from "react";

export interface EaPaginationReactProps extends HTMLAttributes<HTMLElement> {
  defaultPageSize?: number;
  pageSize?: number;
  pagerCount?: number;
  total?: number;
  currentPage?: number;
  background?: boolean;
  size?: "large" | "default" | "small" | "";
  hideOnSinglePage?: boolean;
  disabled?: boolean;
  pageSizes?: number[];
  layout?: Array<"prev" | "pager" | "next" | "jumper" | "total" | "sizes" | "->">;
  onEaCurrentChange?: (event: CustomEvent<{ value: number }>) => void;
  onEaPrevClick?: (event: CustomEvent<{ value: number }>) => void;
  onEaNextClick?: (event: CustomEvent<{ value: number }>) => void;
  onEaSizeChange?: (event: CustomEvent<{ pageSize: number }>) => void;
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-pagination": EaPaginationReactProps;
    }
  }
}

export {};
