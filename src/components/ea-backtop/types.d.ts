// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-backtop": EaBacktopElement;
  }
}

/**
 * ea-backtop 组件的 HTML 接口
 */
export interface EaBacktopElement extends HTMLElement {
  /** 触发滚动的目标对象 */
  target: string;
  /** 滚动高度达到此参数值才出现 */
  visibilityHeight: number;
  /** 控制其显示位置，距离页面右边距 */
  right: string;
  /** 控制其显示位置，距离页面底部距离 */
  bottom: string;
  /** 滚动动画是否平滑 */
  smooth: boolean;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-backtop Vue 组件属性
 */
export interface EaBacktopVueProps {
  target?: string;
  visibilityHeight?: number;
  right?: string;
  bottom?: string;
  smooth?: boolean;
}

/**
 * ea-backtop Vue 组件事件
 */
export interface EaBacktopVueEvents {
  /** 点击按钮时触发 */
  click: (event: CustomEvent) => void;
}

/**
 * ea-backtop Vue 组件插槽
 */
export interface EaBacktopVueSlots {
  /** 默认插槽，用于自定义内容 */
  default?: () => any;
}

/**
 * ea-backtop Vue 组件类型
 */
export type EaBacktopVueComponent = DefineComponent<
  EaBacktopVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaBacktopVueEvents,
  {},
  {},
  EaBacktopVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-backtop": EaBacktopVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-backtop React 组件属性
 */
export interface EaBacktopReactProps extends HTMLAttributes<HTMLElement> {
  target?: string;
  visibilityHeight?: number;
  right?: string;
  bottom?: string;
  smooth?: boolean;
  /** 点击按钮时的回调 */
  onClick?: (event: CustomEvent) => void;
  /** 自定义内容 */
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-backtop": EaBacktopReactProps;
    }
  }
}

export {};
