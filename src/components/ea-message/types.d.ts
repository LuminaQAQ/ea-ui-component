// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-message": EaMessageElement;
  }
}

/**
 * ea-message 组件的 HTML 接口
 */
export interface EaMessageElement extends HTMLElement {
  /** 主题类型 */
  type: "primary" | "success" | "warning" | "info" | "error";
  /** 是否显示 */
  visible: boolean;
  /** 消息文字 */
  message: string;
  /** 是否显示关闭按钮 */
  showClose: boolean;
  /** 消息出现的位置 */
  placement: "top" | "top-left" | "top-right" | "bottom" | "bottom-left" | "bottom-right" | "middle";
  /** 自定义图标 */
  icon: string;
  /** 是否将 message 作为 HTML 片段处理 */
  dangerouslyUseHTMLString: boolean;
  /** 关闭消息 */
  close(): void;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-message Vue 组件属性
 */
export interface EaMessageVueProps {
  type?: "primary" | "success" | "warning" | "info" | "error";
  visible?: boolean;
  message?: string;
  showClose?: boolean;
  placement?: "top" | "top-left" | "top-right" | "bottom" | "bottom-left" | "bottom-right" | "middle";
  icon?: string;
  dangerouslyUseHTMLString?: boolean;
}

/**
 * ea-message Vue 组件事件
 */
export interface EaMessageVueEvents {
  /** 显示消息时触发 */
  show: (event: CustomEvent) => void;
  /** 消息显示后触发 */
  shown: (event: CustomEvent) => void;
  /** 隐藏消息时触发 */
  hide: (event: CustomEvent) => void;
  /** 消息隐藏后触发 */
  hidden: (event: CustomEvent) => void;
  /** 关闭消息时触发 */
  close: (event: CustomEvent) => void;
}

/**
 * ea-message Vue 组件插槽
 */
export interface EaMessageVueSlots {
  /** 默认插槽 */
  default?: () => any;
}

/**
 * ea-message Vue 组件类型
 */
export type EaMessageVueComponent = DefineComponent<
  EaMessageVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaMessageVueEvents,
  {},
  {},
  EaMessageVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-message": EaMessageVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-message React 组件属性
 */
export interface EaMessageReactProps extends HTMLAttributes<HTMLElement> {
  type?: "primary" | "success" | "warning" | "info" | "error";
  visible?: boolean;
  message?: string;
  showClose?: boolean;
  placement?: "top" | "top-left" | "top-right" | "bottom" | "bottom-left" | "bottom-right" | "middle";
  icon?: string;
  dangerouslyUseHTMLString?: boolean;
  /** 显示消息时的回调 */
  onShow?: (event: CustomEvent) => void;
  /** 消息显示后的回调 */
  onShown?: (event: CustomEvent) => void;
  /** 隐藏消息时的回调 */
  onHide?: (event: CustomEvent) => void;
  /** 消息隐藏后的回调 */
  onHidden?: (event: CustomEvent) => void;
  /** 关闭消息时的回调 */
  onClose?: (event: CustomEvent) => void;
  /** 自定义内容 */
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-message": EaMessageReactProps;
    }
  }
}

export {};
