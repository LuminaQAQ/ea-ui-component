// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-avatar": EaAvatarElement;
  }
}

/**
 * ea-avatar 组件的 HTML 接口
 */
export interface EaAvatarElement extends HTMLElement {
  /** 图标类名 */
  icon: string;
  /** 头像形状 */
  shape: "circle" | "square";
  /** 头像尺寸 */
  size: string;
  /** 图片源地址 */
  src: string;
  /** 响应式图片源 */
  srcSet: string;
  /** 图片替代文本 */
  alt: string;
  /** 图片填充模式 */
  fit: "fill" | "contain" | "cover" | "none" | "scale-down";
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-avatar Vue 组件属性
 */
export interface EaAvatarVueProps {
  icon?: string;
  shape?: "circle" | "square";
  size?: string;
  src?: string;
  srcSet?: string;
  alt?: string;
  fit?: "fill" | "contain" | "cover" | "none" | "scale-down";
}

/**
 * ea-avatar Vue 组件事件
 */
export interface EaAvatarVueEvents {
  /** 图片加载失败时触发 */
  error: (event: CustomEvent) => void;
}

/**
 * ea-avatar Vue 组件插槽
 */
export interface EaAvatarVueSlots {
  /** 默认插槽，用于自定义内容 */
  default?: () => any;
}

/**
 * ea-avatar Vue 组件类型
 */
export type EaAvatarVueComponent = DefineComponent<
  EaAvatarVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaAvatarVueEvents,
  {},
  {},
  EaAvatarVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-avatar": EaAvatarVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-avatar React 组件属性
 */
export interface EaAvatarReactProps extends HTMLAttributes<HTMLElement> {
  icon?: string;
  shape?: "circle" | "square";
  size?: string;
  src?: string;
  srcSet?: string;
  alt?: string;
  fit?: "fill" | "contain" | "cover" | "none" | "scale-down";
  /** 图片加载失败时的回调 */
  onError?: (event: CustomEvent) => void;
  /** 自定义内容 */
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-avatar": EaAvatarReactProps;
    }
  }
}

export {};
