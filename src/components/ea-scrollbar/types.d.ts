// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-scrollbar": EaScrollbarElement;
  }
}

/**
 * ea-scrollbar 组件的 HTML 接口
 */
export interface EaScrollbarElement extends HTMLElement {
  /** 高度 */
  height: string;
  /** 是否使用浏览器原生滚动条样式 */
  native: boolean;
  /** 是否禁用滚动条的自动调整大小功能 */
  noresize: boolean;
  /** 是否始终显示滚动条 */
  always: boolean;
  /** 组件是否已挂载 */
  readonly isMounted: boolean;
  /** 滚动到指定位置 */
  scrollTo(options: ScrollToOptions): void;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-scrollbar Vue 组件属性
 */
export interface EaScrollbarVueProps {
  height?: string;
  native?: boolean;
  noresize?: boolean;
  always?: boolean;
}

/**
 * ea-scrollbar Vue 组件事件
 */
export interface EaScrollbarVueEvents {
  /** 滚动时触发 */
  scroll: (event: CustomEvent<{ scrollTop: number; scrollLeft: number }>) => void;
  /** 滚动到边界时触发 */
  "end-reached": (
    event: CustomEvent<{
      direction: "top" | "bottom" | "left" | "right";
      scrollTop: number;
      scrollLeft: number;
    }>
  ) => void;
}

/**
 * ea-scrollbar Vue 组件插槽
 */
export interface EaScrollbarVueSlots {
  /** 默认插槽，用于滚动内容 */
  default?: () => any;
}

/**
 * ea-scrollbar Vue 组件类型
 */
export type EaScrollbarVueComponent = DefineComponent<
  EaScrollbarVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaScrollbarVueEvents,
  {},
  {},
  EaScrollbarVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-scrollbar": EaScrollbarVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-scrollbar React 组件属性
 */
export interface EaScrollbarReactProps extends HTMLAttributes<HTMLElement> {
  height?: string;
  native?: boolean;
  noresize?: boolean;
  always?: boolean;
  /** 滚动时的回调 */
  onScroll?: (event: CustomEvent<{ scrollTop: number; scrollLeft: number }>) => void;
  /** 滚动到边界时的回调 */
  onEndReached?: (
    event: CustomEvent<{
      direction: "top" | "bottom" | "left" | "right";
      scrollTop: number;
      scrollLeft: number;
    }>
  ) => void;
  /** 滚动内容 */
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-scrollbar": EaScrollbarReactProps;
    }
  }
}

export {};
