declare global {
  interface HTMLElementTagNameMap {
    "ea-overlay": EaOverlayElement;
  }
}

export interface EaOverlayElement extends HTMLElement {
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

  show(): void;
  hide(): void;
}

export class EaOverlayOpenEvent extends Event {}
export class EaOverlayOpenedEvent extends Event {}
export class EaOverlayCloseEvent extends Event {}
export class EaOverlayClosedEvent extends Event {}

import type { DefineComponent } from "vue";

declare module "vue" {
  interface GlobalComponents {
    "ea-overlay": DefineComponent<{
      visible?: boolean;
      modal?: boolean;
      closeOnClickModal?: boolean;
      closeOnPressEscape?: boolean;
      appendToBody?: boolean;
      appendTo?: string;
      zIndex?: string;
      backgroundColor?: string;
      contentWidth?: string;
      contentMaxWidth?: string;
      contentHeight?: string;
      beforeClose?: ((done: (cancel?: boolean) => void) => void) | null;
    }>;
  }
}

import type { HTMLAttributes } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-overlay": HTMLAttributes<HTMLElement> & {
        visible?: boolean;
        modal?: boolean;
        closeOnClickModal?: boolean;
        closeOnPressEscape?: boolean;
        appendToBody?: boolean;
        appendTo?: string;
        zIndex?: string;
        backgroundColor?: string;
        contentWidth?: string;
        contentMaxWidth?: string;
        contentHeight?: string;
        beforeClose?: ((done: (cancel?: boolean) => void) => void) | null;
        onEaOpen?: (event: EaOverlayOpenEvent) => void;
        onEaOpened?: (event: EaOverlayOpenedEvent) => void;
        onEaClose?: (event: EaOverlayCloseEvent) => void;
        onEaClosed?: (event: EaOverlayClosedEvent) => void;
      };
    }
  }
}

export {};
