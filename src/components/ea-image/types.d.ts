declare global {
  interface HTMLElementTagNameMap {
    "ea-image": EaImageElement;
    "ea-image-preview": EaImagePreviewElement;
  }
}

export interface EaImageElement extends HTMLElement {
  src: string;
  width: string;
  height: string;
  fit: "" | "fill" | "contain" | "cover" | "none" | "scale-down";
  alt: string;
  loading: "lazy" | "eager";
  referrerpolicy: string;
  crossorigin: string;
  lazy: boolean;
  preview: boolean;
  hideOnClickModal: boolean;
  zIndex: number;
  initialIndex: number;
  closeOnPressEscape: boolean;
  infinite: boolean;
  zoomRate: number;
  scale: number;
  minScale: number;
  maxScale: number;
  showProgress: boolean;
  previewSrcList: string[];
  showPreview(): void;
  setActiveItem(index: number): void;
  reset(): void;
  updateContainerClasslist(): string;
}

export interface EaImagePreviewElement extends HTMLElement {
  visible: boolean;
  modal: boolean;
  closeOnClickModal: boolean;
  closeOnPressEscape: boolean;
  appendToBody: boolean;
  appendTo: string;
  zIndex: string;
  initialIndex: number;
  index: number;
  infinite: boolean;
  zoom: number;
  zoomRate: number;
  scale: number;
  minScale: number;
  maxScale: number;
  showProgress: boolean;
  urlList: string[];
  status: "loading" | "error" | "success";
  setActiveItem(index: number): void;
  reset(): void;
  show(): void;
  hide(): void;
  updateContainerClasslist(): string;
}

import type { DefineComponent } from "vue";

export interface EaImageVueProps {
  src?: string;
  width?: string;
  height?: string;
  fit?: "" | "fill" | "contain" | "cover" | "none" | "scale-down";
  alt?: string;
  loading?: "lazy" | "eager";
  referrerpolicy?: string;
  crossorigin?: string;
  lazy?: boolean;
  preview?: boolean;
  hideOnClickModal?: boolean;
  zIndex?: number;
  initialIndex?: number;
  closeOnPressEscape?: boolean;
  infinite?: boolean;
  zoomRate?: number;
  scale?: number;
  minScale?: number;
  maxScale?: number;
  showProgress?: boolean;
  previewSrcList?: string[];
}

export interface EaImagePreviewVueProps {
  visible?: boolean;
  modal?: boolean;
  closeOnClickModal?: boolean;
  closeOnPressEscape?: boolean;
  appendToBody?: boolean;
  appendTo?: string;
  zIndex?: string;
  initialIndex?: number;
  index?: number;
  infinite?: boolean;
  zoom?: number;
  zoomRate?: number;
  scale?: number;
  minScale?: number;
  maxScale?: number;
  showProgress?: boolean;
  urlList?: string[];
}

export interface EaImageVueEvents {
  load: (event: CustomEvent) => void;
  error: (event: CustomEvent) => void;
}

export interface EaImagePreviewVueEvents {
  "ea-preview-error": (event: CustomEvent) => void;
  "ea-switch": (event: CustomEvent) => void;
  "ea-rotate": (event: CustomEvent) => void;
  "ea-open": (event: CustomEvent) => void;
  "ea-opened": (event: CustomEvent) => void;
  "ea-close": (event: CustomEvent) => void;
  "ea-closed": (event: CustomEvent) => void;
}

export interface EaImageVueSlots {
  default?: () => any;
  error?: () => any;
  placeholder?: () => any;
  progress?: () => any;
  toolbar?: () => any;
}

export interface EaImagePreviewVueSlots {
  default?: () => any;
  progress?: () => any;
  toolbar?: () => any;
  "viewer-error"?: () => any;
}

export type EaImageVueComponent = DefineComponent<
  EaImageVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaImageVueEvents,
  {},
  {},
  EaImageVueSlots
>;

export type EaImagePreviewVueComponent = DefineComponent<
  EaImagePreviewVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaImagePreviewVueEvents,
  {},
  {},
  EaImagePreviewVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-image": EaImageVueComponent;
    "ea-image-preview": EaImagePreviewVueComponent;
  }
}

import type { HTMLAttributes, ReactNode } from "react";

export interface EaImageReactProps extends HTMLAttributes<HTMLElement> {
  src?: string;
  width?: string;
  height?: string;
  fit?: "" | "fill" | "contain" | "cover" | "none" | "scale-down";
  alt?: string;
  loading?: "lazy" | "eager";
  referrerpolicy?: string;
  crossorigin?: string;
  lazy?: boolean;
  preview?: boolean;
  hideOnClickModal?: boolean;
  zIndex?: number;
  initialIndex?: number;
  closeOnPressEscape?: boolean;
  infinite?: boolean;
  zoomRate?: number;
  scale?: number;
  minScale?: number;
  maxScale?: number;
  showProgress?: boolean;
  previewSrcList?: string[];
  onLoad?: (event: CustomEvent) => void;
  onError?: (event: CustomEvent) => void;
  children?: ReactNode;
}

export interface EaImagePreviewReactProps extends HTMLAttributes<HTMLElement> {
  visible?: boolean;
  modal?: boolean;
  closeOnClickModal?: boolean;
  closeOnPressEscape?: boolean;
  appendToBody?: boolean;
  appendTo?: string;
  zIndex?: string;
  initialIndex?: number;
  index?: number;
  infinite?: boolean;
  zoom?: number;
  zoomRate?: number;
  scale?: number;
  minScale?: number;
  maxScale?: number;
  showProgress?: boolean;
  urlList?: string[];
  onEaPreviewError?: (event: CustomEvent) => void;
  onEaSwitch?: (event: CustomEvent) => void;
  onEaRotate?: (event: CustomEvent) => void;
  onEaOpen?: (event: CustomEvent) => void;
  onEaOpened?: (event: CustomEvent) => void;
  onEaClose?: (event: CustomEvent) => void;
  onEaClosed?: (event: CustomEvent) => void;
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-image": EaImageReactProps;
      "ea-image-preview": EaImagePreviewReactProps;
    }
  }
}

export {};
