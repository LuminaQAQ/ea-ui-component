// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-icon": EaIconElement;
  }
}

export type IconFamily = "classic" | "sharp" | "brands";
export type IconVariant = "solid" | "regular" | "light" | "thin" | "duotone";

/**
 * ea-icon 组件的 HTML 接口
 */
export interface EaIconElement extends HTMLElement {
  /** 图标名称 */
  name: string;
  /** 图标家族 */
  family: IconFamily;
  /** 图标变体 */
  variant: IconVariant;
  /** 图标颜色 */
  color: string;
  /** 图标大小 */
  size: string;
  /** 是否旋转 */
  spin: boolean;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-icon Vue 组件属性
 */
export interface EaIconVueProps {
  /** 图标名称 */
  name?: string;
  /** 图标家族 */
  family?: IconFamily;
  /** 图标变体 */
  variant?: IconVariant;
  /** 图标颜色 */
  color?: string;
  /** 图标大小 */
  size?: string;
  /** 是否旋转 */
  spin?: boolean;
}

/**
 * ea-icon Vue 组件插槽
 */
export interface EaIconVueSlots {
  /** 默认插槽，用于自定义内容 */
  default?: () => any;
}

/**
 * ea-icon Vue 组件类型
 */
export type EaIconVueComponent = DefineComponent<
  EaIconVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaIconVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-icon": EaIconVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-icon React 组件属性
 */
export interface EaIconReactProps extends HTMLAttributes<HTMLElement> {
  /** 图标名称 */
  name?: string;
  /** 图标家族 */
  family?: IconFamily;
  /** 图标变体 */
  variant?: IconVariant;
  /** 图标颜色 */
  color?: string;
  /** 图标大小 */
  size?: string;
  /** 是否旋转 */
  spin?: boolean;
  /** 子元素 */
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-icon": EaIconReactProps;
    }
  }
}

export {};
