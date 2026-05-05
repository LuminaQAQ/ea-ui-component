// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-tour": EaTourElement;
    "ea-tour-step": EaTourStepElement;
  }
}

/**
 * ea-tour 组件的 HTML 接口
 */
export interface EaTourElement extends HTMLElement {
  /** 挂载容器选择器 */
  appendTo: string;
  /** 控制引导是否显示 */
  visible: boolean;
  /** 当前步骤索引 */
  current: number;
  /** 遮罩与目标元素间距（像素） */
  gap: number;
  /** 是否显示遮罩 */
  mask: boolean;
  /** 按钮等样式类型 */
  variant: "default" | "primary";
  /** 默认步骤弹出位置 */
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
}

/**
 * ea-tour-step 组件的 HTML 接口
 */
export interface EaTourStepElement extends HTMLElement {
  /** 步骤标题 */
  heading: string;
  /** 目标元素选择器 */
  target: string;
  /** 样式类型 */
  variant: "default" | "primary";
  /** 步骤弹出位置 */
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
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-tour Vue 组件属性
 */
export interface EaTourVueProps {
  appendTo?: string;
  visible?: boolean;
  current?: number;
  gap?: number;
  mask?: boolean;
  variant?: "default" | "primary";
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
}

/**
 * ea-tour-step Vue 组件属性
 */
export interface EaTourStepVueProps {
  heading?: string;
  target?: string;
  variant?: "default" | "primary";
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
}

/**
 * ea-tour Vue 组件事件
 */
export interface EaTourVueEvents {
  /** 引导关闭时触发 */
  close: (event: CustomEvent) => void;
  /** 步骤切换时触发 */
  change: (event: CustomEvent) => void;
  /** 完成引导时触发 */
  finish: (event: CustomEvent) => void;
}

/**
 * ea-tour Vue 组件插槽
 */
export interface EaTourVueSlots {
  /** 默认插槽，用于放置 ea-tour-step */
  default?: () => any;
}

/**
 * ea-tour-step Vue 组件插槽
 */
export interface EaTourStepVueSlots {
  /** 默认插槽，用于步骤内容 */
  default?: () => any;
  /** 头部插槽 */
  header?: () => any;
  /** 自定义指示器 */
  indicator?: () => any;
  /** 自定义底部按钮区域 */
  footer?: () => any;
}

/**
 * ea-tour Vue 组件类型
 */
export type EaTourVueComponent = DefineComponent<
  EaTourVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaTourVueEvents,
  {},
  {},
  EaTourVueSlots
>;

/**
 * ea-tour-step Vue 组件类型
 */
export type EaTourStepVueComponent = DefineComponent<
  EaTourStepVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaTourStepVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-tour": EaTourVueComponent;
    "ea-tour-step": EaTourStepVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-tour React 组件属性
 */
export interface EaTourReactProps extends HTMLAttributes<HTMLElement> {
  appendTo?: string;
  visible?: boolean;
  current?: number;
  gap?: number;
  mask?: boolean;
  variant?: "default" | "primary";
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
  /** 引导关闭时的回调 */
  onClose?: (event: CustomEvent) => void;
  /** 步骤切换时的回调 */
  onChange?: (event: CustomEvent) => void;
  /** 完成引导时的回调 */
  onFinish?: (event: CustomEvent) => void;
  /** 自定义内容 */
  children?: ReactNode;
}

/**
 * ea-tour-step React 组件属性
 */
export interface EaTourStepReactProps extends HTMLAttributes<HTMLElement> {
  heading?: string;
  target?: string;
  variant?: "default" | "primary";
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
  /** 自定义内容 */
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-tour": EaTourReactProps;
      "ea-tour-step": EaTourStepReactProps;
    }
  }
}

export {};
