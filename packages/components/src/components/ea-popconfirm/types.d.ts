declare global {
  interface HTMLElementTagNameMap {
    "ea-popconfirm": EaPopconfirmElement;
  }
}

export interface EaPopconfirmElement extends HTMLElement {
  heading: string;
  visible: boolean;
  icon: string;
  iconColor: string;
  hideIcon: boolean;
  confirmButtonText: string;
  cancelButtonText: string;
  confirmButtonType: "normal" | "primary" | "success" | "warning" | "danger";
  cancelButtonType: "normal" | "primary" | "success" | "warning" | "danger";
  width: number;
  placement:
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end"
    | "right"
    | "right-start"
    | "right-end";
  showArrow: boolean;
  offset: string;
  flip: boolean;

  open(): void;
  close(): void;
  show(): void;
  hide(): void;
  toggle(): void;
}

import type { DefineComponent } from "vue";

export interface EaPopconfirmVueProps {
  heading?: string;
  visible?: boolean;
  icon?: string;
  iconColor?: string;
  hideIcon?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonType?: "normal" | "primary" | "success" | "warning" | "danger";
  cancelButtonType?: "normal" | "primary" | "success" | "warning" | "danger";
  width?: number;
  placement?:
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end"
    | "right"
    | "right-start"
    | "right-end";
  showArrow?: boolean;
  offset?: string;
  flip?: boolean;
}

export interface EaPopconfirmVueEvents {
  "ea-confirm": (event: CustomEvent) => void;
  "ea-cancel": (event: CustomEvent) => void;
  "ea-show": (event: CustomEvent) => void;
  "ea-shown": (event: CustomEvent) => void;
  "ea-hide": (event: CustomEvent) => void;
  "ea-hidden": (event: CustomEvent) => void;
}

export interface EaPopconfirmVueSlots {
  reference?: () => any;
  actions?: () => any;
}

export type EaPopconfirmVueComponent = DefineComponent<
  EaPopconfirmVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaPopconfirmVueEvents,
  {},
  {},
  EaPopconfirmVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-popconfirm": EaPopconfirmVueComponent;
  }
}

import type { HTMLAttributes, ReactNode } from "react";

export interface EaPopconfirmReactProps extends HTMLAttributes<HTMLElement> {
  heading?: string;
  visible?: boolean;
  icon?: string;
  iconColor?: string;
  hideIcon?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonType?: "normal" | "primary" | "success" | "warning" | "danger";
  cancelButtonType?: "normal" | "primary" | "success" | "warning" | "danger";
  width?: number;
  placement?:
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end"
    | "right"
    | "right-start"
    | "right-end";
  showArrow?: boolean;
  offset?: string;
  flip?: boolean;
  onEaConfirm?: (event: CustomEvent) => void;
  onEaCancel?: (event: CustomEvent) => void;
  onEaShow?: (event: CustomEvent) => void;
  onEaShown?: (event: CustomEvent) => void;
  onEaHide?: (event: CustomEvent) => void;
  onEaHidden?: (event: CustomEvent) => void;
  reference?: ReactNode;
  actions?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-popconfirm": EaPopconfirmReactProps;
    }
  }
}

export {};
