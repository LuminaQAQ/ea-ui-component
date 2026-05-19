// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-slider": EaSliderElement;
  }
}

/**
 * ea-slider 组件的 HTML 接口
 */
export interface EaSliderElement extends HTMLElement {
  /** 标签文本 */
  label: string;
  /** 绑定值 */
  value: number;
  /** 最小值 */
  min: number;
  /** 最大值 */
  max: number;
  /** 步长 */
  step: number;
  /** 是否禁用 */
  disabled: boolean;
  /** 是否垂直模式 */
  vertical: boolean;
  /** 是否显示提示框 */
  showTooltip: boolean;
  /** 提示框位置 */
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
  /** 是否显示步长节点 */
  showStops: boolean;
  /** 是否显示输入框 */
  showInput: boolean;
  /** 尺寸 */
  size: "large" | "default" | "small" | "";
  /** 是否必填 */
  required: boolean;
  /** 标记点 */
  marks: Record<string, string> | null;
  /** 自定义提示框内容格式 */
  formatTooltip: (value: number) => number | string;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-slider Vue 组件属性
 */
export interface EaSliderVueProps {
  label?: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  vertical?: boolean;
  showTooltip?: boolean;
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
  showStops?: boolean;
  showInput?: boolean;
  size?: "large" | "default" | "small" | "";
  required?: boolean;
  marks?: Record<string, string> | null;
  formatTooltip?: (value: number) => number | string;
}

/**
 * ea-slider Vue 组件事件
 */
export interface EaSliderVueEvents {
  /** 值改变时触发 */
  change: (event: CustomEvent<{ value: number }>) => void;
  /** 拖动时触发 */
  input: (event: CustomEvent<{ value: number }>) => void;
}

/**
 * ea-slider Vue 组件类型
 */
export type EaSliderVueComponent = DefineComponent<
  EaSliderVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaSliderVueEvents,
  {},
  {},
  {}
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-slider": EaSliderVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-slider React 组件属性
 */
export interface EaSliderReactProps extends HTMLAttributes<HTMLElement> {
  label?: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  vertical?: boolean;
  showTooltip?: boolean;
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
  showStops?: boolean;
  showInput?: boolean;
  size?: "large" | "default" | "small" | "";
  required?: boolean;
  marks?: Record<string, string> | null;
  formatTooltip?: (value: number) => number | string;
  /** 值改变时的回调 */
  onChange?: (event: CustomEvent<{ value: number }>) => void;
  /** 拖动时的回调 */
  onInput?: (event: CustomEvent<{ value: number }>) => void;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-slider": EaSliderReactProps;
    }
  }
}

export {};
