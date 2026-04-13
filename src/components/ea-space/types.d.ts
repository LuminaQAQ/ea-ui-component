// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-space": EaSpaceElement;
  }
}

/**
 * ea-space 组件的 HTML 接口
 */
export interface EaSpaceElement extends HTMLElement {
  /** 是否自动换行 */
  wrap: boolean;
  /** 对齐方式 */
  alignment: "" | "center" | "flex-start" | "flex-end" | "baseline" | "stretch";
  /** 排列方向 */
  direction: "horizontal" | "vertical";
  /** 间隔大小 */
  size: "small" | "default" | "large" | string;
  /** 分隔符 */
  spacer: string;
  /** 子元素是否填充父容器 */
  fill: boolean;
  /** 填充父容器的比例 */
  fillRatio: number;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-space Vue 组件属性
 */
export interface EaSpaceVueProps {
  wrap?: boolean;
  alignment?: "" | "center" | "flex-start" | "flex-end" | "baseline" | "stretch";
  direction?: "horizontal" | "vertical";
  size?: "small" | "default" | "large" | string;
  spacer?: string;
  fill?: boolean;
  fillRatio?: number;
}

/**
 * ea-space Vue 组件插槽
 */
export interface EaSpaceVueSlots {
  /** 默认插槽 */
  default?: () => any;
}

/**
 * ea-space Vue 组件类型
 */
export type EaSpaceVueComponent = DefineComponent<
  EaSpaceVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaSpaceVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-space": EaSpaceVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-space React 组件属性
 */
export interface EaSpaceReactProps extends HTMLAttributes<HTMLElement> {
  wrap?: boolean;
  alignment?: "" | "center" | "flex-start" | "flex-end" | "baseline" | "stretch";
  direction?: "horizontal" | "vertical";
  size?: "small" | "default" | "large" | string;
  spacer?: string;
  fill?: boolean;
  fillRatio?: number;
  /** 自定义内容 */
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-space": EaSpaceReactProps;
    }
  }
}

export {};
