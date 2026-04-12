// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-card": EaCardElement;
  }
}

/**
 * ea-card 组件的 HTML 接口
 */
export interface EaCardElement extends HTMLElement {
  /** 卡片阴影 */
  shadow: "always" | "hover" | "never";
  /** 卡片标题 */
  header: string;
  /** 卡片页脚 */
  footer: string;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-card Vue 组件属性
 */
export interface EaCardVueProps {
  shadow?: "always" | "hover" | "never";
  header?: string;
  footer?: string;
}

/**
 * ea-card Vue 组件插槽
 */
export interface EaCardVueSlots {
  /** 默认插槽，用于卡片内容 */
  default?: () => any;
  /** 标题插槽 */
  header?: () => any;
  /** 页脚插槽 */
  footer?: () => any;
}

/**
 * ea-card Vue 组件类型
 */
export type EaCardVueComponent = DefineComponent<
  EaCardVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaCardVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-card": EaCardVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-card React 组件属性
 */
export interface EaCardReactProps extends HTMLAttributes<HTMLElement> {
  shadow?: "always" | "hover" | "never";
  header?: string;
  footer?: string;
  /** 卡片内容 */
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-card": EaCardReactProps;
    }
  }
}

export {};
