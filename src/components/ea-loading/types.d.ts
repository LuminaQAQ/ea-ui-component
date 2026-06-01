declare global {
  interface HTMLElementTagNameMap {
    "ea-loading": EaLoadingElement;
  }
}

export interface EaLoadingElement extends HTMLElement {
  loading: boolean;
  spinner: string;
  spinnerSize: number;
  background: string;
  text: string;
  fullscreen: boolean;
  lock: boolean;
  close(): void;
  updateContainerClasslist(): string;
}

export interface EaLoadingOptions {
  lock?: boolean;
  text?: string;
  spinner?: string;
  background?: string;
  spinnerSize?: number;
  target?: HTMLElement | string;
}

export interface EaLoadingInstance {
  instance: EaLoadingElement;
  close(): void;
}

import type { DefineComponent } from "vue";

export interface EaLoadingVueProps {
  loading?: boolean;
  spinner?: string;
  spinnerSize?: number;
  background?: string;
  text?: string;
  fullscreen?: boolean;
  lock?: boolean;
}

export interface EaLoadingVueSlots {
  default?: () => any;
  spinner?: () => any;
}

declare module "vue" {
  interface GlobalComponents {
    "ea-loading": DefineComponent<EaLoadingVueProps>;
  }
}

import type { HTMLAttributes } from "react";

export interface EaLoadingReactProps extends HTMLAttributes<HTMLElement> {
  loading?: boolean;
  spinner?: string;
  spinnerSize?: number;
  background?: string;
  text?: string;
  fullscreen?: boolean;
  lock?: boolean;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-loading": EaLoadingReactProps;
    }
  }
}
