// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-countdown": EaCountdownElement;
  }
}

/**
 * ea-countdown 组件的 HTML 接口
 */
export interface EaCountdownElement extends HTMLElement {
  /** 倒计时目标值，可为时间戳（ms）或日期字符串 */
  value: string;
  /** 显示格式，如 HH:mm:ss */
  format: string;
  /** 刷新间隔（ms） */
  refreshInterval: number;
  /** 标题文本 */
  heading: string;
  /** 当前显示值 */
  displayValue: string;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-countdown Vue 组件属性
 */
export interface EaCountdownVueProps {
  /** 倒计时目标值 */
  value?: string;
  /** 显示格式 */
  format?: string;
  /** 刷新间隔（ms） */
  refreshInterval?: number;
  /** 标题文本 */
  heading?: string;
}

/**
 * ea-countdown Vue 组件事件
 */
export interface EaCountdownVueEvents {
  /** 倒计时变化时触发 */
  change: (event: CustomEvent) => void;
  /** 倒计时结束时触发 */
  "ea-finish": (event: CustomEvent) => void;
}

/**
 * ea-countdown Vue 组件插槽
 */
export interface EaCountdownVueSlots {
  /** 默认插槽 */
  default?: () => any;
  /** 自定义标题插槽 */
  title?: () => any;
  /** 自定义前缀插槽 */
  prefix?: () => any;
  /** 自定义后缀插槽 */
  suffix?: () => any;
}

/**
 * ea-countdown Vue 组件类型
 */
export type EaCountdownVueComponent = DefineComponent<
  EaCountdownVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaCountdownVueEvents,
  {},
  {},
  EaCountdownVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-countdown": EaCountdownVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-countdown React 组件属性
 */
export interface EaCountdownReactProps extends HTMLAttributes<HTMLElement> {
  /** 倒计时目标值 */
  value?: string;
  /** 显示格式 */
  format?: string;
  /** 刷新间隔（ms） */
  refreshInterval?: number;
  /** 标题文本 */
  heading?: string;
  /** 倒计时变化时触发 */
  onChange?: (event: CustomEvent) => void;
  /** 倒计时结束时触发 */
  onEaFinish?: (event: CustomEvent) => void;
  /** 自定义内容 */
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-countdown": EaCountdownReactProps;
    }
  }
}

export {};
