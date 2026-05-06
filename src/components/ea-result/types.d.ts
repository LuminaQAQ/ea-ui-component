// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-result": EaResultElement;
  }
}

/**
 * ea-result 组件的 HTML 接口
 */
export interface EaResultElement extends HTMLElement {
  /** 结果类型 */
  variant: "primary" | "success" | "warning" | "danger" | "info" | "error" | "";
  /** 标题 */
  heading: string;
  /** 副标题 */
  subTitle: string;
  /** 图标名称 */
  icon: string;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-result Vue 组件属性
 */
export interface EaResultVueProps {
  /** 结果类型 */
  variant?: "primary" | "success" | "warning" | "danger" | "info" | "error" | "";
  /** 标题 */
  heading?: string;
  /** 副标题 */
  subTitle?: string;
  /** 图标名称 */
  icon?: string;
}

/**
 * ea-result Vue 组件插槽
 */
export interface EaResultVueSlots {
  /** 图标插槽 */
  icon?: () => any;
  /** 标题插槽 */
  title?: () => any;
  /** 副标题插槽 */
  "sub-title"?: () => any;
  /** 额外内容插槽 */
  extra?: () => any;
}

/**
 * ea-result Vue 组件类型
 */
export type EaResultVueComponent = DefineComponent<
  EaResultVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaResultVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-result": EaResultVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-result React 组件属性
 */
export interface EaResultReactProps extends HTMLAttributes<HTMLElement> {
  /** 结果类型 */
  variant?: "primary" | "success" | "warning" | "danger" | "info" | "error" | "";
  /** 标题 */
  heading?: string;
  /** 副标题 */
  subTitle?: string;
  /** 图标名称 */
  icon?: string;
  /** 图标插槽内容 */
  iconSlot?: ReactNode;
  /** 标题插槽内容 */
  titleSlot?: ReactNode;
  /** 副标题插槽内容 */
  subTitleSlot?: ReactNode;
  /** 额外内容插槽 */
  extraSlot?: ReactNode;
  /** 子元素 */
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-result": EaResultReactProps;
    }
  }
}

export {};
