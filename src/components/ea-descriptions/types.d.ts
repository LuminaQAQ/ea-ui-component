// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-descriptions": EaDescriptionsElement;
    "ea-descriptions-item": EaDescriptionsItemElement;
  }
}

/**
 * ea-descriptions 组件的 HTML 接口
 */
export interface EaDescriptionsElement extends HTMLElement {
  /** 列数 */
  column: number;
  /** 标题 */
  caption: string;
  /** 是否带有边框 */
  border: boolean;
  /** 排列方向 */
  direction: "horizontal" | "vertical";
  /** 尺寸 */
  size: "large" | "default" | "small";
  /** 标签宽度 */
  labelWidth: string;
}

/**
 * ea-descriptions-item 组件的 HTML 接口
 */
export interface EaDescriptionsItemElement extends HTMLElement {
  /** 标签文本 */
  label: string;
  /** 跨列数 */
  colspan: number;
  /** 跨行数 */
  rowspan: number;
  /** 对齐方式 */
  align: string;
  /** 标签对齐方式 */
  labelAlign: string;
  /** 宽度 */
  width: string;
  /** 标签宽度 */
  labelWidth: string;
  /** 标签部分 */
  labelPart: string;
  /** 内容部分 */
  contentPart: string;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-descriptions Vue 组件属性
 */
export interface EaDescriptionsVueProps {
  /** 列数 */
  column?: number;
  /** 标题 */
  caption?: string;
  /** 是否带有边框 */
  border?: boolean;
  /** 排列方向 */
  direction?: "horizontal" | "vertical";
  /** 尺寸 */
  size?: "large" | "default" | "small";
  /** 标签宽度 */
  labelWidth?: string;
}

/**
 * ea-descriptions-item Vue 组件属性
 */
export interface EaDescriptionsItemVueProps {
  /** 标签文本 */
  label?: string;
  /** 跨列数 */
  colspan?: number;
  /** 跨行数 */
  rowspan?: number;
  /** 对齐方式 */
  align?: string;
  /** 标签对齐方式 */
  labelAlign?: string;
  /** 宽度 */
  width?: string;
  /** 标签宽度 */
  labelWidth?: string;
  /** 标签部分 */
  labelPart?: string;
  /** 内容部分 */
  contentPart?: string;
}

/**
 * ea-descriptions Vue 组件插槽
 */
export interface EaDescriptionsVueSlots {
  /** 默认插槽，用于放置 ea-descriptions-item */
  default?: () => any;
  /** 标题插槽 */
  header?: () => any;
  /** 额外内容插槽 */
  extra?: () => any;
}

/**
 * ea-descriptions-item Vue 组件插槽
 */
export interface EaDescriptionsItemVueSlots {
  /** 默认插槽，用于内容 */
  default?: () => any;
}

/**
 * ea-descriptions Vue 组件类型
 */
export type EaDescriptionsVueComponent = DefineComponent<
  EaDescriptionsVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaDescriptionsVueSlots
>;

/**
 * ea-descriptions-item Vue 组件类型
 */
export type EaDescriptionsItemVueComponent = DefineComponent<
  EaDescriptionsItemVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaDescriptionsItemVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-descriptions": EaDescriptionsVueComponent;
    "ea-descriptions-item": EaDescriptionsItemVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-descriptions React 组件属性
 */
export interface EaDescriptionsReactProps extends HTMLAttributes<HTMLElement> {
  /** 列数 */
  column?: number;
  /** 标题 */
  caption?: string;
  /** 是否带有边框 */
  border?: boolean;
  /** 排列方向 */
  direction?: "horizontal" | "vertical";
  /** 尺寸 */
  size?: "large" | "default" | "small";
  /** 标签宽度 */
  labelWidth?: string;
  /** 子元素 */
  children?: ReactNode;
}

/**
 * ea-descriptions-item React 组件属性
 */
export interface EaDescriptionsItemReactProps extends HTMLAttributes<HTMLElement> {
  /** 标签文本 */
  label?: string;
  /** 跨列数 */
  colspan?: number;
  /** 跨行数 */
  rowspan?: number;
  /** 对齐方式 */
  align?: string;
  /** 标签对齐方式 */
  labelAlign?: string;
  /** 宽度 */
  width?: string;
  /** 标签宽度 */
  labelWidth?: string;
  /** 标签部分 */
  labelPart?: string;
  /** 内容部分 */
  contentPart?: string;
  /** 子元素 */
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-descriptions": EaDescriptionsReactProps;
      "ea-descriptions-item": EaDescriptionsItemReactProps;
    }
  }
}

export {};
