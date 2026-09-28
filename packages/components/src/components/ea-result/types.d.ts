declare global {
  interface HTMLElementTagNameMap {
    "ea-result": EaResultElement;
  }
}

export interface EaResultElement extends HTMLElement {
  variant: "primary" | "success" | "warning" | "danger" | "info" | "";
  heading: string;
  subTitle: string;
  icon: string;
}

import type { DefineComponent } from "vue";

export interface EaResultVueProps {
  variant?: "primary" | "success" | "warning" | "danger" | "info" | "";
  heading?: string;
  subTitle?: string;
  icon?: string;
}

export interface EaResultVueSlots {
  icon?: () => any;
  title?: () => any;
  "sub-title"?: () => any;
  extra?: () => any;
}

export type EaResultVueComponent = DefineComponent<
  EaResultVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaResultVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-result": EaResultVueComponent;
  }
}

import type { HTMLAttributes, ReactNode } from "react";

export interface EaResultReactProps extends HTMLAttributes<HTMLElement> {
  variant?: "primary" | "success" | "warning" | "danger" | "info" | "";
  heading?: string;
  subTitle?: string;
  icon?: string;
  iconSlot?: ReactNode;
  titleSlot?: ReactNode;
  subTitleSlot?: ReactNode;
  extraSlot?: ReactNode;
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-result": EaResultReactProps;
    }
  }
}

export {};
