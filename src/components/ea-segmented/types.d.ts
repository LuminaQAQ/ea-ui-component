// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-segmented": EaSegmentedElement;
  }
}

/**
 * ea-segmented 组件的 HTML 接口
 */
export interface EaSegmentedElement extends HTMLElement {
  /** 当前选中值 */
  value: string;
  /** 选项列表（可为字符串数组或对象数组） */
  options: string[] | { label: string; value: string; disabled?: boolean; checked?: boolean; [key: string]: any }[];
  /** 自定义选项字段映射 */
  propsConfiguration: { label: string; value: string; disabled: string };
  /** 组件尺寸 */
  size: "large" | "default" | "small" | "";
  /** 排列方向 */
  direction: "horizontal" | "vertical" | "";
  /** 是否在父容器内占满宽度（块级） */
  block: boolean;
  /** 是否禁用整个组件 */
  disabled: boolean;
  /** 表单字段名称 */
  name: string;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-segmented Vue 组件属性
 */
export interface EaSegmentedVueProps {
  value?: string;
  options?: string[] | { label: string; value: string; disabled?: boolean; checked?: boolean; [key: string]: any }[];
  propsConfiguration?: { label: string; value: string; disabled: string };
  size?: "large" | "default" | "small" | "";
  direction?: "horizontal" | "vertical" | "";
  block?: boolean;
  disabled?: boolean;
  name?: string;
}

/**
 * ea-segmented Vue 组件事件
 */
export interface EaSegmentedVueEvents {
  /** 选项改变时触发 */
  change: (event: CustomEvent<{ value: string }>) => void;
}

/**
 * ea-segmented Vue 组件类型
 */
export type EaSegmentedVueComponent = DefineComponent<
  EaSegmentedVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaSegmentedVueEvents,
  {},
  {},
  {}
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-segmented": EaSegmentedVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-segmented React 组件属性
 */
export interface EaSegmentedReactProps extends HTMLAttributes<HTMLElement> {
  value?: string;
  options?: string[] | { label: string; value: string; disabled?: boolean; checked?: boolean; [key: string]: any }[];
  propsConfiguration?: { label: string; value: string; disabled: string };
  size?: "large" | "default" | "small" | "";
  direction?: "horizontal" | "vertical" | "";
  block?: boolean;
  disabled?: boolean;
  name?: string;
  /** 选项改变时的回调 */
  onChange?: (event: CustomEvent<{ value: string }>) => void;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-segmented": EaSegmentedReactProps;
    }
  }
}

export {};
