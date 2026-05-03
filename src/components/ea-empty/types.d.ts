// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-empty": EaEmptyElement;
  }
}

/**
 * ea-empty 组件的 HTML 接口
 */
export interface EaEmptyElement extends HTMLElement {
  /** 图片 URL */
  image: string;
  /** 图片大小 */
  imageSize: string;
  /** 描述文字 */
  description: string;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-empty Vue 组件属性
 */
export interface EaEmptyVueProps {
  image?: string;
  imageSize?: string;
  description?: string;
}

/**
 * ea-empty Vue 组件插槽
 */
export interface EaEmptyVueSlots {
  /** 默认插槽，用于底部内容 */
  default?: () => any;
  /** 图片插槽 */
  image?: () => any;
  /** 描述插槽 */
  description?: () => any;
}

/**
 * ea-empty Vue 组件类型
 */
export type EaEmptyVueComponent = DefineComponent<
  EaEmptyVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaEmptyVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-empty": EaEmptyVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-empty React 组件属性
 */
export interface EaEmptyReactProps extends HTMLAttributes<HTMLElement> {
  image?: string;
  imageSize?: string;
  description?: string;
  /** 自定义内容 */
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-empty": EaEmptyReactProps;
    }
  }
}

export {};
