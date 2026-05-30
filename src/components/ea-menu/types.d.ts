declare global {
  interface HTMLElementTagNameMap {
    "ea-menu": EaMenuElement;
    "ea-menu-item": EaMenuItemElement;
    "ea-menu-item-group": EaMenuItemGroupElement;
    "ea-sub-menu": EaSubMenuElement;
  }
}

export interface EaMenuElement extends HTMLElement {
  mode: "horizontal" | "vertical";
  backgroundColor: string;
  textColor: string;
  activeTextColor: string;
  defaultActive: string;
  active: string;
  collapse: boolean;
  updateContainerClasslist(): string;
}

export interface EaMenuItemElement extends HTMLElement {
  index: string;
  disabled: boolean;
  active: boolean;
  updateContainerClasslist(): string;
}

export interface EaMenuItemGroupElement extends HTMLElement {
  groupTitle: string;
}

export interface EaSubMenuElement extends HTMLElement {
  open: boolean;
  index: string;
  disabled: boolean;
  active: boolean;
  mode: "horizontal" | "vertical";
  label: string;
  updateContainerClasslist(): string;
}

import type { DefineComponent } from "vue";

export interface EaMenuVueProps {
  mode?: "horizontal" | "vertical";
  backgroundColor?: string;
  textColor?: string;
  activeTextColor?: string;
  defaultActive?: string;
  active?: string;
  collapse?: boolean;
}

export interface EaMenuItemVueProps {
  index?: string;
  disabled?: boolean;
  active?: boolean;
}

export interface EaMenuItemGroupVueProps {
  groupTitle?: string;
}

export interface EaSubMenuVueProps {
  open?: boolean;
  index?: string;
  disabled?: boolean;
  active?: boolean;
  mode?: "horizontal" | "vertical";
  label?: string;
}

export interface EaMenuVueEvents {
  select: (event: CustomEvent<{ index: string; target: HTMLElement }>) => void;
}

export interface EaMenuVueSlots {
  default?: () => any;
}

export interface EaMenuItemVueSlots {
  default?: () => any;
}

export interface EaMenuItemGroupVueSlots {
  default?: () => any;
  title?: () => any;
}

export interface EaSubMenuVueSlots {
  default?: () => any;
  title?: () => any;
}

export type EaMenuVueComponent = DefineComponent<
  EaMenuVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaMenuVueEvents,
  {},
  {},
  EaMenuVueSlots
>;

export type EaMenuItemVueComponent = DefineComponent<
  EaMenuItemVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaMenuItemVueSlots
>;

export type EaMenuItemGroupVueComponent = DefineComponent<
  EaMenuItemGroupVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaMenuItemGroupVueSlots
>;

export type EaSubMenuVueComponent = DefineComponent<
  EaSubMenuVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaSubMenuVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-menu": EaMenuVueComponent;
    "ea-menu-item": EaMenuItemVueComponent;
    "ea-menu-item-group": EaMenuItemGroupVueComponent;
    "ea-sub-menu": EaSubMenuVueComponent;
  }
}

import type { HTMLAttributes, ReactNode } from "react";

export interface EaMenuReactProps extends HTMLAttributes<HTMLElement> {
  mode?: "horizontal" | "vertical";
  backgroundColor?: string;
  textColor?: string;
  activeTextColor?: string;
  defaultActive?: string;
  active?: string;
  collapse?: boolean;
  children?: ReactNode;
}

export interface EaMenuItemReactProps extends HTMLAttributes<HTMLElement> {
  index?: string;
  disabled?: boolean;
  active?: boolean;
  children?: ReactNode;
}

export interface EaMenuItemGroupReactProps extends HTMLAttributes<HTMLElement> {
  groupTitle?: string;
  children?: ReactNode;
}

export interface EaSubMenuReactProps extends HTMLAttributes<HTMLElement> {
  open?: boolean;
  index?: string;
  disabled?: boolean;
  active?: boolean;
  mode?: "horizontal" | "vertical";
  label?: string;
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-menu": EaMenuReactProps;
      "ea-menu-item": EaMenuItemReactProps;
      "ea-menu-item-group": EaMenuItemGroupReactProps;
      "ea-sub-menu": EaSubMenuReactProps;
    }
  }
}

export {};
