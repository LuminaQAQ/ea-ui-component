// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-page-header": EaPageHeaderElement;
  }
}

/**
 * ea-page-header 组件的 HTML 接口
 */
export interface EaPageHeaderElement extends HTMLElement {
  /** 返回按钮使用的图标名称 */
  icon: string;
  /** 返回按钮文字 */
  heading: string;
  /** 页头右侧主要内容的文本 */
  content: string;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-page-header Vue 组件属性
 */
export interface EaPageHeaderVueProps {
  icon?: string;
  heading?: string;
  content?: string;
}

/**
 * ea-page-header Vue 组件事件
 */
export interface EaPageHeaderVueEvents {
  /** 点击返回按钮时触发 */
  back: (event: CustomEvent) => void;
}

/**
 * ea-page-header Vue 组件插槽
 */
export interface EaPageHeaderVueSlots {
  /** 面包屑插槽 */
  breadcrumb?: () => any;
  /** 自定义返回图标 */
  icon?: () => any;
  /** 返回按钮文字 */
  title?: () => any;
  /** 页头主要内容区 */
  content?: () => any;
  /** 额外操作区 */
  extra?: () => any;
  /** 默认插槽 */
  default?: () => any;
}

/**
 * ea-page-header Vue 组件类型
 */
export type EaPageHeaderVueComponent = DefineComponent<
  EaPageHeaderVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaPageHeaderVueEvents,
  {},
  {},
  EaPageHeaderVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-page-header": EaPageHeaderVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-page-header React 组件属性
 */
export interface EaPageHeaderReactProps extends HTMLAttributes<HTMLElement> {
  icon?: string;
  heading?: string;
  content?: string;
  /** 点击返回按钮时的回调 */
  onBack?: (event: CustomEvent) => void;
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-page-header": EaPageHeaderReactProps;
    }
  }
}

export {};
