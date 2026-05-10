// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-step": EaStepElement;
    "ea-steps": EaStepsElement;
  }
}

/**
 * ea-step 组件的 HTML 接口
 */
export interface EaStepElement extends HTMLElement {
  /** 标题 */
  heading: string;
  /** 步骤的详细描述 */
  description: string;
  /** 图标类名 */
  icon: string;
  /** 步骤的状态 */
  status: "" | "wait" | "process" | "finish" | "error" | "success";
  /** 当前步骤的索引 */
  index: number;
  /** 是否为简洁模式 */
  simple: boolean;
  /** 是否居中对齐 */
  alignCenter: boolean;
  /** 步骤方向 */
  direction: "vertical" | "horizontal";
}

/**
 * ea-steps 组件的 HTML 接口
 */
export interface EaStepsElement extends HTMLElement {
  /** 每个 step 的间距 */
  space: string;
  /** 当前激活步骤的 index */
  active: number;
  /** 正在进行中的步骤状态展示 */
  processStatus: "wait" | "process" | "finish" | "error" | "success";
  /** 已完成步骤的状态展示 */
  finishStatus: "wait" | "process" | "finish" | "error" | "success";
  /** 是否居中对齐步骤内容 */
  alignCenter: boolean;
  /** 简洁模式 */
  simple: boolean;
  /** 步骤方向 */
  direction: "vertical" | "horizontal";
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-step Vue 组件属性
 */
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

/**
 * ea-steps Vue 组件属性
 */
export interface EaStepsVueProps {
  space?: string;
  active?: number;
  processStatus?: "wait" | "process" | "finish" | "error" | "success";
  finishStatus?: "wait" | "process" | "finish" | "error" | "success";
  alignCenter?: boolean;
  simple?: boolean;
  direction?: "vertical" | "horizontal";
}

/**
 * ea-step Vue 组件插槽
 */
export interface EaStepVueSlots {
  /** 步骤标题 */
  heading?: () => any;
  /** 步骤描述 */
  description?: () => any;
  /** 步骤图标 */
  icon?: () => any;
  /** 简洁模式下的箭头 */
  "simple-arrow"?: () => any;
  /** 默认插槽 */
  default?: () => any;
}

/**
 * ea-steps Vue 组件插槽
 */
export interface EaStepsVueSlots {
  /** 默认插槽，用于放置 ea-step */
  default?: () => any;
}

/**
 * ea-step Vue 组件类型
 */
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

/**
 * ea-steps Vue 组件类型
 */
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

/**
 * ea-step React 组件属性
 */
export interface EaStepReactProps extends HTMLAttributes<HTMLElement> {
  heading?: string;
  description?: string;
  icon?: string;
  status?: "" | "wait" | "process" | "finish" | "error" | "success";
  index?: number;
  simple?: boolean;
  alignCenter?: boolean;
  direction?: "vertical" | "horizontal";
  /** 自定义内容 */
  children?: ReactNode;
}

/**
 * ea-steps React 组件属性
 */
export interface EaStepsReactProps extends HTMLAttributes<HTMLElement> {
  space?: string;
  active?: number;
  processStatus?: "wait" | "process" | "finish" | "error" | "success";
  finishStatus?: "wait" | "process" | "finish" | "error" | "success";
  alignCenter?: boolean;
  simple?: boolean;
  direction?: "vertical" | "horizontal";
  /** 自定义内容 */
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
