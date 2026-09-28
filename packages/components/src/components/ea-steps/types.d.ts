// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-step": EaStepElement;
    "ea-steps": EaStepsElement;
  }
}

export interface EaStepElement extends HTMLElement {
  heading: string;
  description: string;
  icon: string;
  status: "" | "wait" | "process" | "finish" | "error" | "success";
  index: number;
  simple: boolean;
  alignCenter: boolean;
  direction: "vertical" | "horizontal";
  updateContainerClasslist(): string;
}

export interface EaStepsElement extends HTMLElement {
  space: string;
  active: number;
  processStatus: "wait" | "process" | "finish" | "error" | "success";
  finishStatus: "wait" | "process" | "finish" | "error" | "success";
  alignCenter: boolean;
  simple: boolean;
  direction: "vertical" | "horizontal";
  updateContainerClasslist(): string;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

export interface EaStepVueProps {
  heading?: string;
  description?: string;
  icon?: string;
  status?: "" | "wait" | "process" | "finish" | "error" | "success";
  index?: number;
  simple?: boolean;
  alignCenter?: boolean;
  direction?: "vertical" | "horizontal";
}

export interface EaStepsVueProps {
  space?: string;
  active?: number;
  processStatus?: "wait" | "process" | "finish" | "error" | "success";
  finishStatus?: "wait" | "process" | "finish" | "error" | "success";
  alignCenter?: boolean;
  simple?: boolean;
  direction?: "vertical" | "horizontal";
}

export interface EaStepVueSlots {
  heading?: () => any;
  description?: () => any;
  icon?: () => any;
  "simple-arrow"?: () => any;
  default?: () => any;
}

export interface EaStepsVueSlots {
  default?: () => any;
}

export type EaStepVueComponent = DefineComponent<
  EaStepVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaStepVueSlots
>;

export type EaStepsVueComponent = DefineComponent<
  EaStepsVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaStepsVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-step": EaStepVueComponent;
    "ea-steps": EaStepsVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

export interface EaStepReactProps extends HTMLAttributes<HTMLElement> {
  heading?: string;
  description?: string;
  icon?: string;
  status?: "" | "wait" | "process" | "finish" | "error" | "success";
  index?: number;
  simple?: boolean;
  alignCenter?: boolean;
  direction?: "vertical" | "horizontal";
  children?: ReactNode;
}

export interface EaStepsReactProps extends HTMLAttributes<HTMLElement> {
  space?: string;
  active?: number;
  processStatus?: "wait" | "process" | "finish" | "error" | "success";
  finishStatus?: "wait" | "process" | "finish" | "error" | "success";
  alignCenter?: boolean;
  simple?: boolean;
  direction?: "vertical" | "horizontal";
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-step": EaStepReactProps;
      "ea-steps": EaStepsReactProps;
    }
  }
}

export {};
