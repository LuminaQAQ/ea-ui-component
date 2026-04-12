// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-badge": EaBadgeElement;
  }
}

/**
 * ea-badge 组件的 HTML 接口
 */
export interface EaBadgeElement extends HTMLElement {
  /** 显示值 */
  value: string;
  /** 最大值，超过显示 max+ */
  max: number;
  /** 主题类型 */
  variant: "primary" | "success" | "warning" | "danger" | "info";
  /** 背景颜色 */
  color: string;
  /** 是否显示小圆点 */
  isDot: boolean;
  /** 是否隐藏徽章 */
  dataHidden: boolean;
  /** 水平偏移量 */
  offsetX: number;
  /** 垂直偏移量 */
  offsetY: number;
  /** 值为 0 时是否显示 */
  showZero: boolean;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-badge Vue 组件属性
 */
export interface EaBadgeVueProps {
  value?: string;
  max?: number;
  variant?: "primary" | "success" | "warning" | "danger" | "info";
  color?: string;
  isDot?: boolean;
  dataHidden?: boolean;
  offsetX?: number;
  offsetY?: number;
  showZero?: boolean;
}

/**
 * ea-badge Vue 组件插槽
 */
export interface EaBadgeVueSlots {
  /** 默认插槽，用于自定义内容 */
  default?: () => any;
}

/**
 * ea-badge Vue 组件类型
 */
export type EaBadgeVueComponent = DefineComponent<
  EaBadgeVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaBadgeVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-badge": EaBadgeVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-badge React 组件属性
 */
export interface EaBadgeReactProps extends HTMLAttributes<HTMLElement> {
  value?: string;
  max?: number;
  variant?: "primary" | "success" | "warning" | "danger" | "info";
  color?: string;
  isDot?: boolean;
  dataHidden?: boolean;
  offsetX?: number;
  offsetY?: number;
  showZero?: boolean;
  /** 自定义内容 */
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-badge": EaBadgeReactProps;
    }
  }
}

export {};
