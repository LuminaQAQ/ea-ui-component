// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-alert": EaAlertElement;
  }
}

/**
 * ea-alert 组件的 HTML 接口
 */
export interface EaAlertElement extends HTMLElement {
  /** 标题 */
  heading: string;
  /** 辅助性文字 */
  description: string;
  /** 主题类型 */
  type: "primary" | "success" | "warning" | "error" | "info";
  /** 主题样式 */
  effect: "light" | "dark";
  /** 关闭按钮自定义文本 */
  "close-text": string;
  /** 是否可关闭 */
  closable: boolean;
  /** 是否显示图标 */
  "show-icon": boolean;
  /** 文字是否居中 */
  center: boolean;
  /** 延迟显示时间（毫秒） */
  "show-after": number;
  /** 自动关闭时间（毫秒） */
  "auto-close": number;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-alert Vue 组件属性
 */
export interface EaAlertVueProps {
  heading?: string;
  description?: string;
  type?: "primary" | "success" | "warning" | "error" | "info";
  effect?: "light" | "dark";
  closeText?: string;
  closable?: boolean;
  showIcon?: boolean;
  center?: boolean;
  showAfter?: number;
  autoClose?: number;
}

/**
 * ea-alert Vue 组件事件
 */
export interface EaAlertVueEvents {
  /** 关闭动画开始时触发 */
  close: (event: CustomEvent<{ visible: false }>) => void;
  /** 组件显示后触发 */
  open: (event: CustomEvent) => void;
}

/**
 * ea-alert Vue 组件插槽
 */
export interface EaAlertVueSlots {
  /** 自定义图标 */
  icon?: () => any;
  /** 自定义标题 */
  heading?: () => any;
  /** 默认插槽，用于描述内容 */
  default?: () => any;
}

/**
 * ea-alert Vue 组件类型
 */
export type EaAlertVueComponent = DefineComponent<
  EaAlertVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaAlertVueEvents,
  {},
  {},
  EaAlertVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-alert": EaAlertVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-alert React 组件属性
 */
export interface EaAlertReactProps extends HTMLAttributes<HTMLElement> {
  /** 标题 */
  heading?: string;
  /** 辅助性文字 */
  description?: string;
  /** 主题类型 */
  type?: "primary" | "success" | "warning" | "error" | "info";
  /** 主题样式 */
  effect?: "light" | "dark";
  /** 关闭按钮自定义文本 */
  closeText?: string;
  /** 是否可关闭 */
  closable?: boolean;
  /** 是否显示图标 */
  showIcon?: boolean;
  /** 文字是否居中 */
  center?: boolean;
  /** 延迟显示时间（毫秒） */
  showAfter?: number;
  /** 自动关闭时间（毫秒） */
  autoClose?: number;
  /** 关闭动画开始时的回调 */
  onClose?: (event: CustomEvent<{ visible: false }>) => void;
  /** 组件显示后的回调 */
  onOpen?: (event: CustomEvent) => void;
  /** 自定义图标 */
  icon?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-alert": EaAlertReactProps;
    }
  }
}

export {};
