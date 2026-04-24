declare global {
  interface HTMLElementTagNameMap {
    "ea-overlay": EaOverlayElement;
  }
}

export interface EaOverlayElement extends HTMLElement {
  status: boolean;
  modal: boolean;
  closeOnClickModal: boolean;
  visible: boolean;
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

export interface EaOverlayVueProps {
  status?: boolean;
  modal?: boolean;
  closeOnClickModal?: boolean;
  visible?: boolean;
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

export interface EaOverlayVueEvents {
  open: () => void;
  opened: () => void;
  close: () => void;
  closed: () => void;
}

export interface EaOverlayVueSlots {
  default?: () => any;
}

export type EaOverlayVueComponent = DefineComponent<
  EaOverlayVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaOverlayVueEvents,
  {},
  {},
  EaOverlayVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-overlay": EaOverlayVueComponent;
  }
}

import type { HTMLAttributes, ReactNode } from "react";

export interface EaOverlayReactProps extends HTMLAttributes<HTMLElement> {
  status?: boolean;
  modal?: boolean;
  closeOnClickModal?: boolean;
  visible?: boolean;
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
  onOpen?: () => void;
  onOpened?: () => void;
  onClose?: () => void;
  onClosed?: () => void;
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-overlay": EaOverlayReactProps;
    }
  }
}

export {};
