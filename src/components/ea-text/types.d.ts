// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-text": EaTextElement;
  }
}

/**
 * ea-text 组件的 HTML 接口
 */
export interface EaTextElement extends HTMLElement {
  /** 文本类型 */
  type: "normal" | "primary" | "success" | "warning" | "danger" | "info";
  /** 文本大小 */
  size: "large" | "medium" | "small";
  /** 文本是否截断 */
  truncated: boolean;
  /** 截断的行数 */
  lineClamp: number;
  /** 文本标签 */
  tag: string;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-text Vue 组件属性
 */
export interface EaTextVueProps {
  /** 文本类型 */
  type?: "normal" | "primary" | "success" | "warning" | "danger" | "info";
  /** 文本大小 */
  size?: "large" | "medium" | "small";
  /** 文本是否截断 */
  truncated?: boolean;
  /** 截断的行数 */
  lineClamp?: number;
  /** 文本标签 */
  tag?: string;
}

/**
 * ea-text Vue 组件插槽
 */
export interface EaTextVueSlots {
  /** 默认插槽，用于文本内容 */
  default?: () => any;
}

/**
 * ea-text Vue 组件类型
 */
export type EaTextVueComponent = DefineComponent<
  EaTextVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaTextVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-text": EaTextVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-text React 组件属性
 */
export interface EaTextReactProps extends HTMLAttributes<HTMLElement> {
  /** 文本类型 */
  type?: "normal" | "primary" | "success" | "warning" | "danger" | "info";
  /** 文本大小 */
  size?: "large" | "medium" | "small";
  /** 文本是否截断 */
  truncated?: boolean;
  /** 截断的行数 */
  lineClamp?: number;
  /** 文本标签 */
  tag?: string;
  /** 文本内容 */
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-text": EaTextReactProps;
    }
  }
}

export {};
