// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-switch": EaSwitchElement;
  }
}

/**
 * ea-switch 组件的 HTML 接口
 */
export interface EaSwitchElement extends HTMLElement {
  /** 表单名称 */
  name: string;
  /** 当前开关的值 */
  value: string | number | boolean;
  /** 打开时的值 */
  activeValue: string | number | boolean;
  /** 关闭时的值 */
  inactiveValue: string | number | boolean;
  /** 开关的尺寸 */
  size: "large" | "default" | "small";
  /** 关闭时显示的文字 */
  inactiveText: string;
  /** 关闭时的背景色 */
  inactiveColor: string;
  /** 打开时显示的文字 */
  activeText: string;
  /** 打开时的背景色 */
  activeColor: string;
  /** 是否禁用 */
  disabled: boolean;
  /** 是否必填 */
  required: boolean;
  /** 标签文本 */
  label: string;
  /** 切换前的回调函数 */
  beforeChange: (() => Promise<boolean>) | null;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-switch Vue 组件属性
 */
export interface EaSwitchVueProps {
  name?: string;
  value?: string | number | boolean;
  activeValue?: string | number | boolean;
  inactiveValue?: string | number | boolean;
  size?: "large" | "default" | "small";
  inactiveText?: string;
  inactiveColor?: string;
  activeText?: string;
  activeColor?: string;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  beforeChange?: (() => Promise<boolean>) | null;
}

/**
 * ea-switch Vue 组件事件
 */
export interface EaSwitchVueEvents {
  /** 状态发生变化时触发 */
  change: (event: CustomEvent) => void;
}

/**
 * ea-switch Vue 组件插槽
 */
export interface EaSwitchVueSlots {
  /** 默认插槽 */
  default?: () => any;
  /** 打开状态时的内容 */
  active?: () => any;
  /** 关闭状态时的内容 */
  inactive?: () => any;
}

/**
 * ea-switch Vue 组件类型
 */
export type EaSwitchVueComponent = DefineComponent<
  EaSwitchVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaSwitchVueEvents,
  {},
  {},
  EaSwitchVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-switch": EaSwitchVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-switch React 组件属性
 */
export interface EaSwitchReactProps extends HTMLAttributes<HTMLElement> {
  name?: string;
  value?: string | number | boolean;
  activeValue?: string | number | boolean;
  inactiveValue?: string | number | boolean;
  size?: "large" | "default" | "small";
  inactiveText?: string;
  inactiveColor?: string;
  activeText?: string;
  activeColor?: string;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  beforeChange?: (() => Promise<boolean>) | null;
  /** 状态发生变化时的回调 */
  onChange?: (event: CustomEvent) => void;
  /** 组件内容 */
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-switch": EaSwitchReactProps;
    }
  }
}

export {};
