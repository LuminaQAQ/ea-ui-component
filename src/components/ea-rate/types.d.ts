// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-rate": EaRateElement;
  }
}

/**
 * ea-rate 组件的 HTML 接口
 */
export interface EaRateElement extends HTMLElement {
  /** 辅助文字 */
  label: string;
  /** 当前评分值 */
  value: number;
  /** 最大评分长度 */
  max: number;
  /** 组件尺寸 */
  size: "large" | "default" | "small" | "";
  /** 是否只读 */
  readonly: boolean;
  /** 是否禁用 */
  disabled: boolean;
  /** 自定义图标渲染函数 */
  getSymbol: (value?: number, isSelected?: number) => string;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-rate Vue 组件属性
 */
export interface EaRateVueProps {
  /** 辅助文字 */
  label?: string;
  /** 当前评分值 */
  value?: number;
  /** 最大评分长度 */
  max?: number;
  /** 组件尺寸 */
  size?: "large" | "default" | "small";
  /** 是否只读 */
  readonly?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义图标渲染函数 */
  getSymbol?: (value?: number, isSelected?: number) => string;
}

/**
 * ea-rate Vue 组件事件
 */
export interface EaRateVueEvents {
  /** 评分值变化时触发 */
  change: (event: CustomEvent<{ value: number }>) => void;
  /** 鼠标移动到某项时触发 */
  hover: (
    event: CustomEvent<{ value: number | null; target: HTMLElement | null }>
  ) => void;
}

/**
 * ea-rate Vue 组件插槽
 */
export interface EaRateVueSlots {
  /** 默认插槽 */
  default?: () => any;
}

/**
 * ea-rate Vue 组件类型
 */
export type EaRateVueComponent = DefineComponent<
  EaRateVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaRateVueEvents,
  {},
  {},
  EaRateVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-rate": EaRateVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-rate React 组件属性
 */
export interface EaRateReactProps extends HTMLAttributes<HTMLElement> {
  /** 辅助文字 */
  label?: string;
  /** 当前评分值 */
  value?: number;
  /** 最大评分长度 */
  max?: number;
  /** 组件尺寸 */
  size?: "large" | "default" | "small";
  /** 是否只读 */
  readonly?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义图标渲染函数 */
  getSymbol?: (value?: number, isSelected?: number) => string;
  /** 评分值变化时的回调 */
  onChange?: (event: CustomEvent<{ value: number }>) => void;
  /** 鼠标移动到某项时的回调 */
  onHover?: (
    event: CustomEvent<{ value: number | null; target: HTMLElement | null }>
  ) => void;
  /** 自定义内容 */
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-rate": EaRateReactProps;
    }
  }
}

export {};
