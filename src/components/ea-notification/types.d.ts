// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-notification": EaNotificationElement;
  }
}

/**
 * ea-notification 组件的 HTML 接口
 */
export interface EaNotificationElement extends HTMLElement {
  /** 通知类型 */
  type: "primary" | "success" | "warning" | "info" | "error";
  /** 标题 */
  heading: string;
  /** 是否显示 */
  visible: boolean;
  /** 正文内容 */
  message: string;
  /** 是否显示关闭按钮 */
  showClose: boolean;
  /** 关闭按钮图标 */
  closeIcon: string;
  /** 出现位置 */
  placement: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  /** z-index 值 */
  zIndex: number;
  /** 自定义图标 */
  icon: string;
  /** 是否将 message 作为 HTML 片段处理 */
  dangerouslyUseHTMLString: boolean;
  /** 关闭通知 */
  close(): void;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-notification Vue 组件属性
 */
export interface EaNotificationVueProps {
  type?: "primary" | "success" | "warning" | "info" | "error";
  heading?: string;
  visible?: boolean;
  message?: string;
  showClose?: boolean;
  closeIcon?: string;
  placement?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  zIndex?: number;
  icon?: string;
  dangerouslyUseHTMLString?: boolean;
}

/**
 * ea-notification Vue 组件事件
 */
export interface EaNotificationVueEvents {
  /** 显示通知时触发 */
  show: (event: CustomEvent) => void;
  /** 通知显示完毕时触发 */
  shown: (event: CustomEvent) => void;
  /** 隐藏通知时触发 */
  hide: (event: CustomEvent) => void;
  /** 通知隐藏完毕时触发 */
  hidden: (event: CustomEvent) => void;
  /** 关闭通知时触发 */
  close: (event: CustomEvent) => void;
}

/**
 * ea-notification Vue 组件插槽
 */
export interface EaNotificationVueSlots {
  /** 默认插槽 */
  default?: () => any;
}

/**
 * ea-notification Vue 组件类型
 */
export type EaNotificationVueComponent = DefineComponent<
  EaNotificationVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaNotificationVueEvents,
  {},
  {},
  EaNotificationVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-notification": EaNotificationVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-notification React 组件属性
 */
export interface EaNotificationReactProps extends HTMLAttributes<HTMLElement> {
  type?: "primary" | "success" | "warning" | "info" | "error";
  heading?: string;
  visible?: boolean;
  message?: string;
  showClose?: boolean;
  closeIcon?: string;
  placement?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  zIndex?: number;
  icon?: string;
  dangerouslyUseHTMLString?: boolean;
  /** 显示通知时的回调 */
  onShow?: (event: CustomEvent) => void;
  /** 通知显示完毕时的回调 */
  onShown?: (event: CustomEvent) => void;
  /** 隐藏通知时的回调 */
  onHide?: (event: CustomEvent) => void;
  /** 通知隐藏完毕时的回调 */
  onHidden?: (event: CustomEvent) => void;
  /** 关闭通知时的回调 */
  onClose?: (event: CustomEvent) => void;
  /** 自定义内容 */
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-notification": EaNotificationReactProps;
    }
  }
}

export {};
