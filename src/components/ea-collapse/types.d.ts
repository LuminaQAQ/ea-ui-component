declare global {
  interface HTMLElementTagNameMap {
    "ea-collapse": EaCollapseElement;
    "ea-collapse-item": EaCollapseItemElement;
  }
}

export interface EaCollapseElement extends HTMLElement {
  accordion: boolean;
  active: string | string[];
  expandIconPosition: "left" | "right";
  beforeCollapse:
    | ((params: {
        name: string;
        target: EaCollapseItemElement;
      }) => boolean | Promise<boolean>)
    | null;
  setActiveNames(value: string | string[]): void;
}

export interface EaCollapseItemElement extends HTMLElement {
  header: string;
  name: string;
  expandIconPosition: "left" | "right";
  disabled: boolean;
  active: boolean;
}

import type { DefineComponent } from "vue";

export interface EaCollapseVueProps {
  accordion?: boolean;
  active?: string | string[];
  expandIconPosition?: "left" | "right";
  beforeCollapse?: (params: {
    name: string;
    target: EaCollapseItemElement;
  }) => boolean | Promise<boolean>;
}

export interface EaCollapseItemVueProps {
  header?: string;
  name?: string;
  expandIconPosition?: "left" | "right";
  disabled?: boolean;
  active?: boolean;
}

export interface EaCollapseVueEvents {
  change: (
    event: CustomEvent<{
      name: string;
      target: EaCollapseItemElement;
      active: string | string[];
    }>
  ) => void;
}

export interface EaCollapseVueSlots {
  default?: () => any;
}

export interface EaCollapseItemVueSlots {
  default?: () => any;
  header?: () => any;
  icon?: () => any;
}

export type EaCollapseVueComponent = DefineComponent<
  EaCollapseVueProps,
  {},
  {},
  {},
  {
    setActiveNames(value: string | string[]): void;
  },
  {},
  {},
  keyof EaCollapseVueEvents,
  {},
  {},
  EaCollapseVueSlots
>;

export type EaCollapseItemVueComponent = DefineComponent<
  EaCollapseItemVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaCollapseItemVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-collapse": EaCollapseVueComponent;
    "ea-collapse-item": EaCollapseItemVueComponent;
  }
}

import type { HTMLAttributes, ReactNode } from "react";

export interface EaCollapseReactProps extends HTMLAttributes<HTMLElement> {
  accordion?: boolean;
  active?: string | string[];
  expandIconPosition?: "left" | "right";
  beforeCollapse?: (params: {
    name: string;
    target: EaCollapseItemElement;
  }) => boolean | Promise<boolean>;
  onChange?: (
    event: CustomEvent<{
      name: string;
      target: EaCollapseItemElement;
      active: string | string[];
    }>
  ) => void;
  children?: ReactNode;
}

export interface EaCollapseItemReactProps extends HTMLAttributes<HTMLElement> {
  header?: string;
  name?: string;
  expandIconPosition?: "left" | "right";
  disabled?: boolean;
  active?: boolean;
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-collapse": EaCollapseReactProps;
      "ea-collapse-item": EaCollapseItemReactProps;
    }
  }
}

export {};
