// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-skeleton": EaSkeletonElement;
    "ea-skeleton-item": EaSkeletonItemElement;
  }
}

/**
 * ea-skeleton 组件的 HTML 接口
 */
export interface EaSkeletonElement extends HTMLElement {
  /** 段落占位图行数 */
  rows: number;
  /** 是否开启动画 */
  animated: boolean;
  /** 渲染的骨架屏条目数量 */
  count: number;
  /** 是否显示骨架屏 */
  loading: boolean;
  /** 当 loading 由 true -> false 时的延迟（ms） */
  throttleLeading: number;
  /** 当 loading 由 false -> true 时的延迟（ms） */
  throttleTrailing: number;
}

/**
 * ea-skeleton-item 组件的 HTML 接口
 */
export interface EaSkeletonItemElement extends HTMLElement {
  /** 占位图类型 */
  variant: "p" | "text" | "h1" | "h3" | "caption" | "button" | "image" | "circle" | "rect";
  /** 是否开启动画 */
  animated: boolean;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-skeleton Vue 组件属性
 */
export interface EaSkeletonVueProps {
  rows?: number;
  animated?: boolean;
  count?: number;
  loading?: boolean;
  throttleLeading?: number;
  throttleTrailing?: number;
}

/**
 * ea-skeleton-item Vue 组件属性
 */
export interface EaSkeletonItemVueProps {
  variant?: "p" | "text" | "h1" | "h3" | "caption" | "button" | "image" | "circle" | "rect";
  animated?: boolean;
}

/**
 * ea-skeleton Vue 组件插槽
 */
export interface EaSkeletonVueSlots {
  /** 默认插槽，loading 结束后展示的真实内容 */
  default?: () => any;
  /** 骨架屏模板 */
  template?: () => any;
}

/**
 * ea-skeleton-item Vue 组件插槽
 */
export interface EaSkeletonItemVueSlots {
  /** 默认插槽 */
  default?: () => any;
}

/**
 * ea-skeleton Vue 组件类型
 */
export type EaSkeletonVueComponent = DefineComponent<
  EaSkeletonVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaSkeletonVueSlots
>;

/**
 * ea-skeleton-item Vue 组件类型
 */
export type EaSkeletonItemVueComponent = DefineComponent<
  EaSkeletonItemVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaSkeletonItemVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-skeleton": EaSkeletonVueComponent;
    "ea-skeleton-item": EaSkeletonItemVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-skeleton React 组件属性
 */
export interface EaSkeletonReactProps extends HTMLAttributes<HTMLElement> {
  rows?: number;
  animated?: boolean;
  count?: number;
  loading?: boolean;
  throttleLeading?: number;
  throttleTrailing?: number;
  /** 自定义内容 */
  children?: ReactNode;
}

/**
 * ea-skeleton-item React 组件属性
 */
export interface EaSkeletonItemReactProps extends HTMLAttributes<HTMLElement> {
  variant?: "p" | "text" | "h1" | "h3" | "caption" | "button" | "image" | "circle" | "rect";
  animated?: boolean;
  /** 自定义内容 */
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-skeleton": EaSkeletonReactProps;
      "ea-skeleton-item": EaSkeletonItemReactProps;
    }
  }
}

export {};
