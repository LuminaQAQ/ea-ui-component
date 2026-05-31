declare global {
  interface HTMLElementTagNameMap {
    "ea-tabs": EaTabsElement;
    "ea-tab": EaTabElement;
    "ea-tab-panel": EaTabPanelElement;
  }
}

export interface EaTabsElement extends HTMLElement {
  active: string;
  type: "" | "card" | "border-card";
  editable: boolean;
  tabPosition: "top" | "bottom" | "left" | "right";
  updateContainerClasslist(): string;
}

export interface EaTabElement extends HTMLElement {
  panel: string;
  type: "" | "card" | "border-card";
  disabled: boolean;
  active: boolean;
  tabPosition: string;
  editable: boolean;
  closable: boolean;
  updateContainerClasslist(): string;
}

export interface EaTabPanelElement extends HTMLElement {
  name: string;
  type: "" | "card" | "border-card";
  updateContainerClasslist(): string;
}

import type { DefineComponent } from "vue";

export interface EaTabsVueProps {
  active?: string;
  type?: "" | "card" | "border-card";
  editable?: boolean;
  tabPosition?: "top" | "bottom" | "left" | "right";
}

export interface EaTabVueProps {
  panel?: string;
  type?: "" | "card" | "border-card";
  disabled?: boolean;
  active?: boolean;
  tabPosition?: string;
  editable?: boolean;
  closable?: boolean;
}

export interface EaTabPanelVueProps {
  name?: string;
  type?: "" | "card" | "border-card";
}

export interface EaTabsVueEvents {
  "ea-tab-click": (event: CustomEvent) => void;
  "ea-tabs-change": (event: CustomEvent) => void;
  "ea-tab-remove": (event: CustomEvent) => void;
}

export interface EaTabVueEvents {
  "ea-tab-close-icon-click": (event: CustomEvent) => void;
}

export interface EaTabsVueSlots {
  nav?: () => any;
  default?: () => any;
}

export interface EaTabVueSlots {
  default?: () => any;
}

export interface EaTabPanelVueSlots {
  default?: () => any;
}

export type EaTabsVueComponent = DefineComponent<
  EaTabsVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaTabsVueEvents,
  {},
  {},
  EaTabsVueSlots
>;

export type EaTabVueComponent = DefineComponent<
  EaTabVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaTabVueEvents,
  {},
  {},
  EaTabVueSlots
>;

export type EaTabPanelVueComponent = DefineComponent<
  EaTabPanelVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaTabPanelVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-tabs": EaTabsVueComponent;
    "ea-tab": EaTabVueComponent;
    "ea-tab-panel": EaTabPanelVueComponent;
  }
}

import type { HTMLAttributes, ReactNode } from "react";

export interface EaTabsReactProps extends HTMLAttributes<HTMLElement> {
  active?: string;
  type?: "" | "card" | "border-card";
  editable?: boolean;
  tabPosition?: "top" | "bottom" | "left" | "right";
  onEaTabClick?: (event: CustomEvent) => void;
  onEaTabsChange?: (event: CustomEvent) => void;
  onEaTabRemove?: (event: CustomEvent) => void;
  children?: ReactNode;
}

export interface EaTabReactProps extends HTMLAttributes<HTMLElement> {
  panel?: string;
  type?: "" | "card" | "border-card";
  disabled?: boolean;
  active?: boolean;
  tabPosition?: string;
  editable?: boolean;
  closable?: boolean;
  onEaTabCloseIconClick?: (event: CustomEvent) => void;
  children?: ReactNode;
}

export interface EaTabPanelReactProps extends HTMLAttributes<HTMLElement> {
  name?: string;
  type?: "" | "card" | "border-card";
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-tabs": EaTabsReactProps;
      "ea-tab": EaTabReactProps;
      "ea-tab-panel": EaTabPanelReactProps;
    }
  }
}

export {};
