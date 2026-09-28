declare global {
  interface HTMLElementTagNameMap {
    "ea-row": EaRowElement;
    "ea-col": EaColElement;
  }
}

export interface EaRowElement extends HTMLElement {
  gutter: number;
  justify: "start" | "end" | "center" | "space-around" | "space-between" | "space-evenly";
  align: "top" | "middle" | "bottom";
  tag: string;
}

export interface EaColElement extends HTMLElement {
  span: number;
  offset: number;
  push: number;
  pull: number;
  tag: string;
}

import type { DefineComponent } from "vue";

export interface EaRowVueProps {
  gutter?: number;
  justify?: "start" | "end" | "center" | "space-around" | "space-between" | "space-evenly";
  align?: "top" | "middle" | "bottom";
  tag?: string;
}

export interface EaColVueProps {
  span?: number;
  offset?: number;
  push?: number;
  pull?: number;
  tag?: string;
}

export interface EaRowVueSlots {
  default?: () => any;
}

export interface EaColVueSlots {
  default?: () => any;
}

export type EaRowVueComponent = DefineComponent<
  EaRowVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaRowVueSlots
>;

export type EaColVueComponent = DefineComponent<
  EaColVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaColVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-row": EaRowVueComponent;
    "ea-col": EaColVueComponent;
  }
}

import type { HTMLAttributes, ReactNode } from "react";

export interface EaRowReactProps extends HTMLAttributes<HTMLElement> {
  gutter?: number;
  justify?: "start" | "end" | "center" | "space-around" | "space-between" | "space-evenly";
  align?: "top" | "middle" | "bottom";
  tag?: string;
  children?: ReactNode;
}

export interface EaColReactProps extends HTMLAttributes<HTMLElement> {
  span?: number;
  offset?: number;
  push?: number;
  pull?: number;
  tag?: string;
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-row": EaRowReactProps;
      "ea-col": EaColReactProps;
    }
  }
}

export {};
