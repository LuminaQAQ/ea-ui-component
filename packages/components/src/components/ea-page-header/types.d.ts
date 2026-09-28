declare global {
  interface HTMLElementTagNameMap {
    "ea-page-header": EaPageHeaderElement;
  }
}

export interface EaPageHeaderElement extends HTMLElement {
  icon: string;
  heading: string;
  content: string;
}

import type { EaPageHeaderBackEvent } from "./events/EaPageHeaderBackEvent";
import type { DefineComponent } from "vue";

export interface EaPageHeaderVueProps {
  icon?: string;
  heading?: string;
  content?: string;
}

export interface EaPageHeaderVueEvents {
  "ea-back": (event: EaPageHeaderBackEvent) => void;
}

export interface EaPageHeaderVueSlots {
  breadcrumb?: () => any;
  icon?: () => any;
  title?: () => any;
  content?: () => any;
  extra?: () => any;
  default?: () => any;
}

export type EaPageHeaderVueComponent = DefineComponent<
  EaPageHeaderVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaPageHeaderVueEvents,
  {},
  {},
  EaPageHeaderVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-page-header": EaPageHeaderVueComponent;
  }
}

import type { HTMLAttributes, ReactNode } from "react";

export interface EaPageHeaderReactProps extends HTMLAttributes<HTMLElement> {
  icon?: string;
  heading?: string;
  content?: string;
  onEaBack?: (event: EaPageHeaderBackEvent) => void;
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-page-header": EaPageHeaderReactProps;
    }
  }
}

export {};
