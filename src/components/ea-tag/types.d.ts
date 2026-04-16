// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-tag": EaTagElement;
    "ea-check-tag": EaCheckTagElement;
  }
}

/**
 * ea-tag 组件的 HTML 接口
 */
export interface EaTagElement extends HTMLElement {
  /** 主题类型 */
  type: "primary" | "info" | "success" | "warning" | "danger";
  /** 组件尺寸 */
  size: "large" | "default" | "small";
  /** 主题效果 */
  effect: "dark" | "light" | "plain";
  /** 是否显示关闭图标 */
  closable: boolean;
  /** 自定义背景色或文字色 */
  color: string;
  /** 是否为圆角/圆形样式 */
  round: boolean;
  /** 是否禁用移除时的动画过渡 */
  disableTransitions: boolean;
}

/**
 * ea-check-tag 组件的 HTML 接口
 */
export interface EaCheckTagElement extends HTMLElement {
  /** 是否选中状态 */
  checked: boolean;
  /** 是否禁用交互 */
  disabled: boolean;
  /** 选中状态的主题样式 */
  type: "primary" | "info" | "success" | "warning" | "danger";
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-tag Vue 组件属性
 */
export interface EaTagVueProps {
  type?: "primary" | "info" | "success" | "warning" | "danger";
  size?: "large" | "default" | "small";
  effect?: "dark" | "light" | "plain";
  closable?: boolean;
  color?: string;
  round?: boolean;
  disableTransitions?: boolean;
}

/**
 * ea-check-tag Vue 组件属性
 */
export interface EaCheckTagVueProps {
  checked?: boolean;
  disabled?: boolean;
  type?: "primary" | "info" | "success" | "warning" | "danger";
}

/**
 * ea-tag Vue 组件事件
 */
export interface EaTagVueEvents {
  /** 标签被移除后触发 */
  "ea-remove": (event: CustomEvent<{ text: string }>) => void;
}

/**
 * ea-check-tag Vue 组件事件
 */
export interface EaCheckTagVueEvents {
  /** 选中状态改变时触发 */
  change: (event: CustomEvent<{ checked: boolean }>) => void;
}

/**
 * ea-tag Vue 组件插槽
 */
export interface EaTagVueSlots {
  /** 默认插槽，用于放置标签文本或自定义内容 */
  default?: () => any;
}

/**
 * ea-check-tag Vue 组件插槽
 */
export interface EaCheckTagVueSlots {
  /** 默认插槽，用于放置标签文本或自定义内容 */
  default?: () => any;
}

/**
 * ea-tag Vue 组件类型
 */
export type EaTagVueComponent = DefineComponent<
  EaTagVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaTagVueEvents,
  {},
  {},
  EaTagVueSlots
>;

/**
 * ea-check-tag Vue 组件类型
 */
export type EaCheckTagVueComponent = DefineComponent<
  EaCheckTagVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaCheckTagVueEvents,
  {},
  {},
  EaCheckTagVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-tag": EaTagVueComponent;
    "ea-check-tag": EaCheckTagVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-tag React 组件属性
 */
export interface EaTagReactProps extends HTMLAttributes<HTMLElement> {
  type?: "primary" | "info" | "success" | "warning" | "danger";
  size?: "large" | "default" | "small";
  effect?: "dark" | "light" | "plain";
  closable?: boolean;
  color?: string;
  round?: boolean;
  disableTransitions?: boolean;
  /** 标签被移除后的回调 */
  onEaRemove?: (event: CustomEvent<{ text: string }>) => void;
  /** 标签内容 */
  children?: ReactNode;
}

/**
 * ea-check-tag React 组件属性
 */
export interface EaCheckTagReactProps extends HTMLAttributes<HTMLElement> {
  checked?: boolean;
  disabled?: boolean;
  type?: "primary" | "info" | "success" | "warning" | "danger";
  /** 选中状态改变时的回调 */
  onChange?: (event: CustomEvent<{ checked: boolean }>) => void;
  /** 标签内容 */
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-tag": EaTagReactProps;
      "ea-check-tag": EaCheckTagReactProps;
    }
  }
}

export {};
