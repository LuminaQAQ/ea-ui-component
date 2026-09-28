declare global {
  interface HTMLElementTagNameMap {
    "ea-container": EaContainerElement;
    "ea-header": EaHeaderElement;
    "ea-main": EaMainElement;
    "ea-footer": EaFooterElement;
    "ea-aside": EaAsideElement;
  }
}

export interface EaContainerElement extends HTMLElement {
  direction: "horizontal" | "vertical";
  updateContainerClasslist(): string;
}

export interface EaHeaderElement extends HTMLElement {
  height: string;
}

export interface EaMainElement extends HTMLElement {}

export interface EaFooterElement extends HTMLElement {
  height: string;
}

export interface EaAsideElement extends HTMLElement {
  width: string;
}

import type { DefineComponent } from "vue";

export interface EaContainerVueProps {
  direction?: "horizontal" | "vertical";
}

export interface EaHeaderVueProps {
  height?: string;
}

export interface EaMainVueProps {}

export interface EaFooterVueProps {
  height?: string;
}

export interface EaAsideVueProps {
  width?: string;
}

export interface EaContainerVueSlots {
  default?: () => any;
}

export interface EaHeaderVueSlots {
  default?: () => any;
}

export interface EaMainVueSlots {
  default?: () => any;
}

export interface EaFooterVueSlots {
  default?: () => any;
}

export interface EaAsideVueSlots {
  default?: () => any;
}

declare module "vue" {
  interface GlobalComponents {
    "ea-container": DefineComponent<EaContainerVueProps>;
    "ea-header": DefineComponent<EaHeaderVueProps>;
    "ea-main": DefineComponent<EaMainVueProps>;
    "ea-footer": DefineComponent<EaFooterVueProps>;
    "ea-aside": DefineComponent<EaAsideVueProps>;
  }
}

import type { HTMLAttributes, ReactNode } from "react";

export interface EaContainerReactProps extends HTMLAttributes<HTMLElement> {
  direction?: "horizontal" | "vertical";
  children?: ReactNode;
}

export interface EaHeaderReactProps extends HTMLAttributes<HTMLElement> {
  height?: string;
  children?: ReactNode;
}

export interface EaMainReactProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

export interface EaFooterReactProps extends HTMLAttributes<HTMLElement> {
  height?: string;
  children?: ReactNode;
}

export interface EaAsideReactProps extends HTMLAttributes<HTMLElement> {
  width?: string;
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-container": EaContainerReactProps;
      "ea-header": EaHeaderReactProps;
      "ea-main": EaMainReactProps;
      "ea-footer": EaFooterReactProps;
      "ea-aside": EaAsideReactProps;
    }
  }
}

export {};
