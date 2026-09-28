import type { EaMessageBoxConfirmEvent } from "./events/EaMessageBoxConfirmEvent";
import type { EaMessageBoxCancelEvent } from "./events/EaMessageBoxCancelEvent";
import type { EaMessageBoxMessageCloseEvent } from "./events/EaMessageBoxMessageCloseEvent";

declare global {
  interface HTMLElementTagNameMap {
    "ea-message-box": EaMessageBoxElement;
  }
}

export interface EaMessageBoxElement extends HTMLElement {
  boxType: "alert" | "confirm" | "prompt" | "personalized";
  heading: string;
  message: string;
  variant: "primary" | "success" | "info" | "warning" | "error" | "";
  icon: string;
  closeIcon: string;
  showClose: boolean;
  showCancelButton: boolean;
  showConfirmButton: boolean;
  confirmButtonText: string;
  cancelButtonText: string;
  center: boolean;
  roundButton: boolean;
  buttonSize: "small" | "medium" | "large";
  showInput: boolean;
  inputPlaceholder: string;
  inputType: string;
  inputValue: string;
  inputPattern: string;
  inputErrorMessage: string;
  inputValidator: ((value: string) => boolean | string | Promise<boolean | string>) | null;
  movable: boolean;
  visible: boolean;
  modal: boolean;
  closeOnClickModal: boolean;
  closeOnPressEscape: boolean;
  appendToBody: boolean;
  appendTo: string;
  zIndex: string;
  backgroundColor: string;
  contentWidth: string;
  contentMaxWidth: string;
  contentHeight: string;
  beforeClose: ((done: (cancel?: boolean) => void) => void) | null;
  dangerouslyUseHTMLString: boolean;
  confirmButtonLoading: boolean;
  distinguishCancelAndClose: boolean;

  show(): void;
  hide(): void;

  addEventListener(
    type: "ea-confirm",
    listener: (event: EaMessageBoxConfirmEvent) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: "ea-cancel",
    listener: (event: EaMessageBoxCancelEvent) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: "ea-message-close",
    listener: (event: EaMessageBoxMessageCloseEvent) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: "ea-open",
    listener: (event: Event) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: "ea-opened",
    listener: (event: Event) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: "ea-close",
    listener: (event: Event) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: "ea-closed",
    listener: (event: Event) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;
}

import type { DefineComponent } from "vue";

export interface EaMessageBoxVueProps {
  boxType?: "alert" | "confirm" | "prompt" | "personalized";
  heading?: string;
  message?: string;
  variant?: "primary" | "success" | "info" | "warning" | "error" | "";
  icon?: string;
  closeIcon?: string;
  showClose?: boolean;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  closeOnPressEscape?: boolean;
  center?: boolean;
  roundButton?: boolean;
  buttonSize?: "small" | "medium" | "large";
  showInput?: boolean;
  inputPlaceholder?: string;
  inputType?: string;
  inputValue?: string;
  inputPattern?: string;
  inputErrorMessage?: string;
  inputValidator?: ((value: string) => boolean | string | Promise<boolean | string>) | null;
  movable?: boolean;
  visible?: boolean;
  modal?: boolean;
  closeOnClickModal?: boolean;
  appendToBody?: boolean;
  appendTo?: string;
  zIndex?: string;
  backgroundColor?: string;
  contentWidth?: string;
  contentMaxWidth?: string;
  contentHeight?: string;
  beforeClose?: ((done: (cancel?: boolean) => void) => void) | null;
  dangerouslyUseHTMLString?: boolean;
  confirmButtonLoading?: boolean;
  distinguishCancelAndClose?: boolean;
}

export interface EaMessageBoxVueEvents {
  "ea-confirm": (event: EaMessageBoxConfirmEvent) => void;
  "ea-cancel": (event: EaMessageBoxCancelEvent) => void;
  "ea-message-close": (event: EaMessageBoxMessageCloseEvent) => void;
  "ea-open": (event: Event) => void;
  "ea-opened": (event: Event) => void;
  "ea-close": (event: Event) => void;
  "ea-closed": (event: Event) => void;
}

export type EaMessageBoxVueComponent = DefineComponent<
  EaMessageBoxVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaMessageBoxVueEvents,
  {},
  {},
  {}
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-message-box": EaMessageBoxVueComponent;
  }
}

import type { HTMLAttributes, ReactNode } from "react";

export interface EaMessageBoxReactProps extends HTMLAttributes<HTMLElement> {
  boxType?: "alert" | "confirm" | "prompt" | "personalized";
  heading?: string;
  message?: string;
  variant?: "primary" | "success" | "info" | "warning" | "error" | "";
  icon?: string;
  closeIcon?: string;
  showClose?: boolean;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  closeOnPressEscape?: boolean;
  center?: boolean;
  roundButton?: boolean;
  buttonSize?: "small" | "medium" | "large";
  showInput?: boolean;
  inputPlaceholder?: string;
  inputType?: string;
  inputValue?: string;
  inputPattern?: string;
  inputErrorMessage?: string;
  inputValidator?: ((value: string) => boolean | string | Promise<boolean | string>) | null;
  movable?: boolean;
  visible?: boolean;
  modal?: boolean;
  closeOnClickModal?: boolean;
  appendToBody?: boolean;
  appendTo?: string;
  zIndex?: string;
  backgroundColor?: string;
  contentWidth?: string;
  contentMaxWidth?: string;
  contentHeight?: string;
  beforeClose?: ((done: (cancel?: boolean) => void) => void) | null;
  dangerouslyUseHTMLString?: boolean;
  confirmButtonLoading?: boolean;
  distinguishCancelAndClose?: boolean;
  onEaConfirm?: (event: EaMessageBoxConfirmEvent) => void;
  onEaCancel?: (event: EaMessageBoxCancelEvent) => void;
  onEaMessageClose?: (event: EaMessageBoxMessageCloseEvent) => void;
  onEaOpen?: (event: Event) => void;
  onEaOpened?: (event: Event) => void;
  onEaClose?: (event: Event) => void;
  onEaClosed?: (event: Event) => void;
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-message-box": EaMessageBoxReactProps;
    }
  }
}

export {};
