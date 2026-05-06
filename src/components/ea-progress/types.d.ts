// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-progress": EaProgressElement;
  }
}

/**
 * ea-progress 组件的 HTML 接口
 */
export interface EaProgressElement extends HTMLElement {
  /** 进度条类型 */
  type: "line" | "circle" | "dashboard";
  /** 进度百分比（0-100） */
  percentage: number;
  /** 进度条当前状态 */
  status: "success" | "warning" | "exception" | "";
  /** 进度条的宽度 */
  strokeWidth: string;
  /** 进度条显示文字内置在进度条内（仅 type 为 line 时可用） */
  textInside: boolean;
  /** 是否为动画进度条 */
  indeterminate: boolean;
  /** 动画持续时间（秒） */
  duration: number;
  /** 是否为条纹样式 */
  striped: boolean;
  /** 条纹是否流动 */
  stripedFlow: boolean;
  /** 环形/仪表盘进度条大小 */
  size: string;
  /** 是否显示进度条文字内容 */
  showText: boolean;
  /** 进度条背景色（会覆盖 status 状态颜色） */
  color: string | { color: string; percentage: number }[] | ((percentage: number) => string);
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-progress Vue 组件属性
 */
export interface EaProgressVueProps {
  type?: "line" | "circle" | "dashboard";
  percentage?: number;
  status?: "success" | "warning" | "exception" | "";
  strokeWidth?: string;
  textInside?: boolean;
  indeterminate?: boolean;
  duration?: number;
  striped?: boolean;
  stripedFlow?: boolean;
  size?: string;
  showText?: boolean;
  color?: string | { color: string; percentage: number }[] | ((percentage: number) => string);
}

/**
 * ea-progress Vue 组件事件
 */
export interface EaProgressVueEvents {
  /** 进度百分比变化时触发 */
  change: (event: CustomEvent<{ percentage: number }>) => void;
}

/**
 * ea-progress Vue 组件插槽
 */
export interface EaProgressVueSlots {
  /** 默认插槽，用于自定义进度条内容 */
  default?: () => any;
}

/**
 * ea-progress Vue 组件类型
 */
export type EaProgressVueComponent = DefineComponent<
  EaProgressVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaProgressVueEvents,
  {},
  {},
  EaProgressVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-progress": EaProgressVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-progress React 组件属性
 */
export interface EaProgressReactProps extends HTMLAttributes<HTMLElement> {
  type?: "line" | "circle" | "dashboard";
  percentage?: number;
  status?: "success" | "warning" | "exception" | "";
  strokeWidth?: string;
  textInside?: boolean;
  indeterminate?: boolean;
  duration?: number;
  striped?: boolean;
  stripedFlow?: boolean;
  size?: string;
  showText?: boolean;
  color?: string | { color: string; percentage: number }[] | ((percentage: number) => string);
  /** 进度百分比变化时的回调 */
  onChange?: (event: CustomEvent<{ percentage: number }>) => void;
  /** 自定义内容 */
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-progress": EaProgressReactProps;
    }
  }
}

export {};
