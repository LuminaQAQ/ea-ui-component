// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-checkbox": EaCheckboxElement;
    "ea-checkbox-group": EaCheckboxGroupElement;
  }
}

/**
 * ea-checkbox 组件的 HTML 接口
 */
export interface EaCheckboxElement extends HTMLElement {
  /** 通过属性设置的文本 */
  label: string;
  /** 绑定值 */
  value: string;
  /** 原生的 name 属性 */
  name: string;
  /** 是否禁用 */
  disabled: boolean;
  /** 是否选中 */
  checked: boolean;
  /** 是否为半选状态 */
  indeterminate: boolean;
  /** 组件尺寸 */
  size: "small" | "default" | "large";
  /** 是否带边框样式 */
  border: boolean;
  /** 是否被限制禁用 */
  limitDisabled: boolean;
  /** 是否必填 */
  required: boolean;
}

/**
 * ea-checkbox-group 组件的 HTML 接口
 */
export interface EaCheckboxGroupElement extends HTMLElement {
  /** 表单标签 */
  label: string;
  /** 若该组件位于表单内，则该 name 将作为该组值的键名 */
  name: string;
  /** 当前选中的值 */
  value: any[];
  /** 尺寸 */
  size: "small" | "default" | "large";
  /** 是否禁用 */
  disabled: boolean;
  /** 最少可选数量 */
  min: number;
  /** 最多可选数量 */
  max: number;
  /** 是否必填 */
  required: boolean;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-checkbox Vue 组件属性
 */
export interface EaCheckboxVueProps {
  label?: string;
  value?: string;
  name?: string;
  disabled?: boolean;
  checked?: boolean;
  indeterminate?: boolean;
  size?: "small" | "default" | "large";
  border?: boolean;
  limitDisabled?: boolean;
  required?: boolean;
}

/**
 * ea-checkbox-group Vue 组件属性
 */
export interface EaCheckboxGroupVueProps {
  label?: string;
  name?: string;
  value?: any[];
  size?: "small" | "default" | "large";
  disabled?: boolean;
  min?: number;
  max?: number;
  required?: boolean;
}

/**
 * ea-checkbox Vue 组件事件
 */
export interface EaCheckboxVueEvents {
  /** 状态发生变化时触发 */
  change: (event: CustomEvent) => void;
}

/**
 * ea-checkbox Vue 组件插槽
 */
export interface EaCheckboxVueSlots {
  /** 默认插槽，用于 checkbox 内容 */
  default?: () => any;
}

/**
 * ea-checkbox-group Vue 组件插槽
 */
export interface EaCheckboxGroupVueSlots {
  /** 默认插槽，用于放置 ea-checkbox */
  default?: () => any;
}

/**
 * ea-checkbox Vue 组件类型
 */
export type EaCheckboxVueComponent = DefineComponent<
  EaCheckboxVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaCheckboxVueEvents,
  {},
  {},
  EaCheckboxVueSlots
>;

/**
 * ea-checkbox-group Vue 组件类型
 */
export type EaCheckboxGroupVueComponent = DefineComponent<
  EaCheckboxGroupVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaCheckboxGroupVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-checkbox": EaCheckboxVueComponent;
    "ea-checkbox-group": EaCheckboxGroupVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-checkbox React 组件属性
 */
export interface EaCheckboxReactProps extends HTMLAttributes<HTMLElement> {
  label?: string;
  value?: string;
  name?: string;
  disabled?: boolean;
  checked?: boolean;
  indeterminate?: boolean;
  size?: "small" | "default" | "large";
  border?: boolean;
  limitDisabled?: boolean;
  required?: boolean;
  /** 状态发生变化时的回调 */
  onChange?: (event: CustomEvent) => void;
  /** checkbox 内容 */
  children?: ReactNode;
}

/**
 * ea-checkbox-group React 组件属性
 */
export interface EaCheckboxGroupReactProps extends HTMLAttributes<HTMLElement> {
  label?: string;
  name?: string;
  value?: any[];
  size?: "small" | "default" | "large";
  disabled?: boolean;
  min?: number;
  max?: number;
  required?: boolean;
  /** 自定义内容 */
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-checkbox": EaCheckboxReactProps;
      "ea-checkbox-group": EaCheckboxGroupReactProps;
    }
  }
}

export {};
