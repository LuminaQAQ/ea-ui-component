// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-calendar": EaCalendarElement;
  }
}

/**
 * ea-calendar 组件的 HTML 接口
 */
export interface EaCalendarElement extends HTMLElement {
  /** 当前选中的日期值 (YYYY-MM-DD 格式) */
  value: string;
  /** 控制器类型 */
  controllerType: "button" | "select";
  /** 当前显示的日期 */
  readonly displayDate: import("dayjs").Dayjs;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-calendar Vue 组件属性
 */
export interface EaCalendarVueProps {
  /** 当前选中的日期值 (YYYY-MM-DD 格式) */
  value?: string;
  /** 控制器类型 */
  controllerType?: "button" | "select";
}

/**
 * ea-calendar Vue 组件事件
 */
export interface EaCalendarVueEvents {
  /** 选择日期时触发 */
  select: (
    event: CustomEvent<{
      year: number;
      month: number;
      date: number;
      day: number;
      fullDate: string;
    }>
  ) => void;
  /** 日期值变化时触发 */
  change: (event: CustomEvent<{ value: string }>) => void;
}

/**
 * ea-calendar Vue 组件插槽
 */
export interface EaCalendarVueSlots {
  /** 头部插槽，用于自定义头部内容 */
  header?: () => any;
}

/**
 * ea-calendar Vue 组件类型
 */
export type EaCalendarVueComponent = DefineComponent<
  EaCalendarVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaCalendarVueEvents,
  {},
  {},
  EaCalendarVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-calendar": EaCalendarVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-calendar React 组件属性
 */
export interface EaCalendarReactProps extends HTMLAttributes<HTMLElement> {
  /** 当前选中的日期值 (YYYY-MM-DD 格式) */
  value?: string;
  /** 控制器类型 */
  controllerType?: "button" | "select";
  /** 选择日期时的回调 */
  onSelect?: (
    event: CustomEvent<{
      year: number;
      month: number;
      date: number;
      day: number;
      fullDate: string;
    }>
  ) => void;
  /** 日期值变化时的回调 */
  onChange?: (event: CustomEvent<{ value: string }>) => void;
  /** 子元素 */
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-calendar": EaCalendarReactProps;
    }
  }
}

export {};
