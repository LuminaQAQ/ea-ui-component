declare global {
  interface HTMLElementTagNameMap {
    "ea-dialog": EaDialogElement;
  }
}

export interface EaDialogElement extends HTMLElement {
  heading: string;
  width: string;
  top: string;
  center: boolean;
  fullscreen: boolean;
  appendToBody: boolean;
  appendTo: string;
  showClose: boolean;
  modalPentrable: boolean;
  movable: boolean;
  visible: boolean;
  modal: boolean;
  closeOnClickModal: boolean;
  closeOnPressEscape: boolean;
  zIndex: string;
  backgroundColor: string;
  contentWidth: string;
  contentMaxWidth: string;
  contentHeight: string;
  beforeClose: ((done: (cancel?: boolean) => void) => void) | null;

  show(): void;
  hide(): void;
  resetPosition(): void;
}

import type { DefineComponent } from "vue";

export interface EaDialogVueProps {
  heading?: string;
  width?: string;
  top?: string;
  center?: boolean;
  fullscreen?: boolean;
  appendToBody?: boolean;
  appendTo?: string;
  showClose?: boolean;
  modalPentrable?: boolean;
  movable?: boolean;
  visible?: boolean;
  modal?: boolean;
  closeOnClickModal?: boolean;
  closeOnPressEscape?: boolean;
  zIndex?: string;
  backgroundColor?: string;
  contentWidth?: string;
  contentMaxWidth?: string;
  contentHeight?: string;
  beforeClose?: ((done: (cancel?: boolean) => void) => void) | null;
}

export interface EaDialogVueEvents {
  "ea-open": (event: CustomEvent) => void;
  "ea-opened": (event: CustomEvent) => void;
  "ea-close": (event: CustomEvent) => void;
  "ea-closed": (event: CustomEvent) => void;
}

export interface EaDialogVueSlots {
  default?: () => any;
  header?: () => any;
  footer?: () => any;
}

export type EaDialogVueComponent = DefineComponent<
  EaDialogVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaDialogVueEvents,
  {},
  {},
  EaDialogVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-dialog": EaDialogVueComponent;
  }
}

import type { HTMLAttributes, ReactNode } from "react";

export interface EaDialogReactProps extends HTMLAttributes<HTMLElement> {
  heading?: string;
  width?: string;
  top?: string;
  center?: boolean;
  fullscreen?: boolean;
  appendToBody?: boolean;
  appendTo?: string;
  showClose?: boolean;
  modalPentrable?: boolean;
  movable?: boolean;
  visible?: boolean;
  modal?: boolean;
  closeOnClickModal?: boolean;
  closeOnPressEscape?: boolean;
  zIndex?: string;
  backgroundColor?: string;
  contentWidth?: string;
  contentMaxWidth?: string;
  contentHeight?: string;
  beforeClose?: ((done: (cancel?: boolean) => void) => void) | null;
  onEaOpen?: (event: CustomEvent) => void;
  onEaOpened?: (event: CustomEvent) => void;
  onEaClose?: (event: CustomEvent) => void;
  onEaClosed?: (event: CustomEvent) => void;
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-dialog": EaDialogReactProps;
    }
  }
}

export {};
