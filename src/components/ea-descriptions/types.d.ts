declare global {
  interface HTMLElementTagNameMap {
    "ea-descriptions": EaDescriptionsElement;
    "ea-descriptions-item": EaDescriptionsItemElement;
  }
}

export interface EaDescriptionsElement extends HTMLElement {
  column: number;
  caption: string;
  border: boolean;
  direction: "horizontal" | "vertical";
  size: "large" | "default" | "small";
  labelWidth: string;
}

export interface EaDescriptionsItemElement extends HTMLElement {
  label: string;
  colspan: number;
  rowspan: number;
  align: "left" | "center" | "right" | "";
  labelAlign: "left" | "center" | "right" | "";
  width: string;
  labelWidth: string;
  labelPart: string;
  contentPart: string;
}

import type { DefineComponent } from "vue";

export interface EaDescriptionsVueProps {
  column?: number;
  caption?: string;
  border?: boolean;
  direction?: "horizontal" | "vertical";
  size?: "large" | "default" | "small";
  labelWidth?: string;
}

export interface EaDescriptionsItemVueProps {
  label?: string;
  colspan?: number;
  rowspan?: number;
  align?: "left" | "center" | "right" | "";
  labelAlign?: "left" | "center" | "right" | "";
  width?: string;
  labelWidth?: string;
  labelPart?: string;
  contentPart?: string;
}

export interface EaDescriptionsVueSlots {
  default?: () => any;
  header?: () => any;
  extra?: () => any;
}

export interface EaDescriptionsItemVueSlots {
  default?: () => any;
}

export type EaDescriptionsVueComponent = DefineComponent<
  EaDescriptionsVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaDescriptionsVueSlots
>;

export type EaDescriptionsItemVueComponent = DefineComponent<
  EaDescriptionsItemVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaDescriptionsItemVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-descriptions": EaDescriptionsVueComponent;
    "ea-descriptions-item": EaDescriptionsItemVueComponent;
  }
}

import type { HTMLAttributes, ReactNode } from "react";

export interface EaDescriptionsReactProps extends HTMLAttributes<HTMLElement> {
  column?: number;
  caption?: string;
  border?: boolean;
  direction?: "horizontal" | "vertical";
  size?: "large" | "default" | "small";
  labelWidth?: string;
  children?: ReactNode;
}

export interface EaDescriptionsItemReactProps extends HTMLAttributes<HTMLElement> {
  label?: string;
  colspan?: number;
  rowspan?: number;
  align?: "left" | "center" | "right" | "";
  labelAlign?: "left" | "center" | "right" | "";
  width?: string;
  labelWidth?: string;
  labelPart?: string;
  contentPart?: string;
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-descriptions": EaDescriptionsReactProps;
      "ea-descriptions-item": EaDescriptionsItemReactProps;
    }
  }
}

export {};
