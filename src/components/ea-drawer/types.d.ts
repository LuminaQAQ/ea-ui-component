declare global {
  interface HTMLElementTagNameMap {
    "ea-drawer": EaDrawerElement;
  }
}

export type DirectionType = "rtl" | "ltr" | "ttb" | "btt";

export interface EaDrawerElement extends HTMLElement {
  direction: DirectionType;
  withHeader: boolean;
  heading: string;
  showClose: boolean;
  size: string;
  closeOnClickModal: boolean;
  appendTo: string;
  visible: boolean;
  modal: boolean;
  closeOnPressEscape: boolean;
  appendToBody: boolean;
  zIndex: string;
  backgroundColor: string;
  contentWidth: string;
  contentMaxWidth: string;
  contentHeight: string;
  contentLeft: string;
  contentTop: string;
  contentTranslateX: string;
  contentTranslateY: string;
  contentTransform: string;
  beforeClose: ((done: () => void) => void) | null;

  show(): void;
  hide(): void;
}

import type { DefineComponent } from "vue";

export interface EaDrawerVueProps {
  direction?: DirectionType;
  withHeader?: boolean;
  heading?: string;
  showClose?: boolean;
  size?: string;
  closeOnClickModal?: boolean;
  appendTo?: string;
  visible?: boolean;
  modal?: boolean;
  closeOnPressEscape?: boolean;
  appendToBody?: boolean;
  zIndex?: string;
  backgroundColor?: string;
  contentWidth?: string;
  contentMaxWidth?: string;
  contentHeight?: string;
  contentLeft?: string;
  contentTop?: string;
  contentTranslateX?: string;
  contentTranslateY?: string;
  contentTransform?: string;
  beforeClose?: ((done: () => void) => void) | null;
}

export interface EaDrawerVueEvents {
  open: (event: CustomEvent) => void;
  opened: (event: CustomEvent) => void;
  close: (event: CustomEvent) => void;
  closed: (event: CustomEvent) => void;
}

export interface EaDrawerVueSlots {
  default?: () => any;
  title?: () => any;
  footer?: () => any;
}

export type EaDrawerVueComponent = DefineComponent<
  EaDrawerVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaDrawerVueEvents,
  {},
  {},
  EaDrawerVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-drawer": EaDrawerVueComponent;
  }
}

import type { HTMLAttributes, ReactNode } from "react";

export interface EaDrawerReactProps extends HTMLAttributes<HTMLElement> {
  direction?: DirectionType;
  withHeader?: boolean;
  heading?: string;
  showClose?: boolean;
  size?: string;
  closeOnClickModal?: boolean;
  appendTo?: string;
  visible?: boolean;
  modal?: boolean;
  closeOnPressEscape?: boolean;
  appendToBody?: boolean;
  zIndex?: string;
  backgroundColor?: string;
  contentWidth?: string;
  contentMaxWidth?: string;
  contentHeight?: string;
  contentLeft?: string;
  contentTop?: string;
  contentTranslateX?: string;
  contentTranslateY?: string;
  contentTransform?: string;
  beforeClose?: ((done: () => void) => void) | null;
  onOpen?: (event: CustomEvent) => void;
  onOpened?: (event: CustomEvent) => void;
  onClose?: (event: CustomEvent) => void;
  onClosed?: (event: CustomEvent) => void;
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-drawer": EaDrawerReactProps;
    }
  }
}

export {};
