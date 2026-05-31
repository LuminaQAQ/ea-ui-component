// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-timeline": EaTimelineElement;
    "ea-timeline-item": EaTimelineItemElement;
  }
}

/**
 * ea-timeline 组件的 HTML 接口
 */
export interface EaTimelineElement extends HTMLElement {}

/**
 * ea-timeline-item 组件的 HTML 接口
 */
export interface EaTimelineItemElement extends HTMLElement {
  /** 节点类型 */
  variant: "primary" | "success" | "warning" | "danger" | "info" | "";
  /** 时间戳 */
  timestamp: string;
  /** 是否隐藏时间戳 */
  hideTimestamp: boolean;
  /** 自定义颜色（支持任意 CSS 颜色值） */
  color: string;
  /** 是否为空心节点 */
  hollow: boolean;
  /** 节点图标名称 */
  icon: string;
  /** 节点大小 */
  size: "normal" | "large" | "";
  /** 时间戳位置 */
  placement: "top" | "bottom" | "";
  /** 是否垂直居中对齐 */
  center: boolean;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-timeline Vue 组件属性
 */
export interface EaTimelineVueProps {}

/**
 * ea-timeline-item Vue 组件属性
 */
export interface EaTimelineItemVueProps {
  /** 节点类型 */
  variant?: "primary" | "success" | "warning" | "danger" | "info" | "";
  /** 时间戳 */
  timestamp?: string;
  /** 是否隐藏时间戳 */
  hideTimestamp?: boolean;
  /** 自定义颜色（支持任意 CSS 颜色值） */
  color?: string;
  /** 是否为空心节点 */
  hollow?: boolean;
  /** 节点图标名称 */
  icon?: string;
  /** 节点大小 */
  size?: "normal" | "large" | "";
  /** 时间戳位置 */
  placement?: "top" | "bottom" | "";
  /** 是否垂直居中对齐 */
  center?: boolean;
}

/**
 * ea-timeline Vue 组件插槽
 */
export interface EaTimelineVueSlots {
  /** 默认插槽，放置 ea-timeline-item 子节点 */
  default?: () => any;
}

/**
 * ea-timeline-item Vue 组件插槽
 */
export interface EaTimelineItemVueSlots {
  /** 默认插槽，放置时间线项的主内容 */
  default?: () => any;
  /** 自定义节点内容（覆盖 icon 属性） */
  dot?: () => any;
  /** 自定义时间戳内容（覆盖 timestamp 属性） */
  timestamp?: () => any;
}

/**
 * ea-timeline Vue 组件类型
 */
export type EaTimelineVueComponent = DefineComponent<
  EaTimelineVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaTimelineVueSlots
>;

/**
 * ea-timeline-item Vue 组件类型
 */
export type EaTimelineItemVueComponent = DefineComponent<
  EaTimelineItemVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaTimelineItemVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-timeline": EaTimelineVueComponent;
    "ea-timeline-item": EaTimelineItemVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-timeline React 组件属性
 */
export interface EaTimelineReactProps extends HTMLAttributes<HTMLElement> {
  /** 子内容 */
  children?: ReactNode;
}

/**
 * ea-timeline-item React 组件属性
 */
export interface EaTimelineItemReactProps extends HTMLAttributes<HTMLElement> {
  /** 节点类型 */
  variant?: "primary" | "success" | "warning" | "danger" | "info" | "";
  /** 时间戳 */
  timestamp?: string;
  /** 是否隐藏时间戳 */
  hideTimestamp?: boolean;
  /** 自定义颜色（支持任意 CSS 颜色值） */
  color?: string;
  /** 是否为空心节点 */
  hollow?: boolean;
  /** 节点图标名称 */
  icon?: string;
  /** 节点大小 */
  size?: "normal" | "large" | "";
  /** 时间戳位置 */
  placement?: "top" | "bottom" | "";
  /** 是否垂直居中对齐 */
  center?: boolean;
  /** 子内容 */
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-timeline": EaTimelineReactProps;
      "ea-timeline-item": EaTimelineItemReactProps;
    }
  }
}

export {};
