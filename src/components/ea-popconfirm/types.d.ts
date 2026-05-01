// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-popconfirm": EaPopconfirmElement;
  }
}

/**
 * ea-popconfirm 组件的 HTML 接口
 */
export interface EaPopconfirmElement extends HTMLElement {
  /** 标题 */
  heading: string;
  /** 是否可见 */
  visible: boolean;
  /** 图标名称 */
  icon: string;
  /** 图标颜色 */
  iconColor: string;
  /** 是否隐藏图标 */
  hideIcon: boolean;
  /** 确认按钮文字 */
  confirmButtonText: string;
  /** 取消按钮文字 */
  cancelButtonText: string;
  /** 确认按钮类型 */
  confirmButtonType: "normal" | "primary" | "success" | "warning" | "danger";
  /** 取消按钮类型 */
  cancelButtonType: "normal" | "primary" | "success" | "warning" | "danger";
  /** 宽度 */
  width: number;
  /** 展示位置 */
  placement:
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end"
    | "right"
    | "right-start"
    | "right-end";
  /** 是否显示箭头 */
  showArrow: boolean;
  /** 控制 Popconfirm 显隐的属性 */
  status: boolean;
  /** 偏移量 */
  offset: string;
  /** 是否翻转 */
  flip: boolean;

  /** 显示 Popconfirm */
  open(): void;
  /** 隐藏 Popconfirm */
  close(): void;
  /** 显示 Popper */
  show(): void;
  /** 隐藏 Popper */
  hide(): void;
  /** 切换 Popper 显示状态 */
  toggle(): void;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-popconfirm Vue 组件属性
 */
export interface EaPopconfirmVueProps {
  heading?: string;
  visible?: boolean;
  icon?: string;
  iconColor?: string;
  hideIcon?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonType?: "normal" | "primary" | "success" | "warning" | "danger";
  cancelButtonType?: "normal" | "primary" | "success" | "warning" | "danger";
  width?: number;
  placement?:
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end"
    | "right"
    | "right-start"
    | "right-end";
  showArrow?: boolean;
  status?: boolean;
  offset?: string;
  flip?: boolean;
}

/**
 * ea-popconfirm Vue 组件事件
 */
export interface EaPopconfirmVueEvents {
  /** 点击确认按钮时触发 */
  confirm: (event: CustomEvent) => void;
  /** 点击取消按钮时触发 */
  cancel: (event: CustomEvent) => void;
  /** 开启 Popper 时触发的事件 */
  show: (event: CustomEvent) => void;
  /** 开启 Popper 的动画结束时触发 */
  shown: (event: CustomEvent) => void;
  /** 关闭 Popper 时触发的事件 */
  hide: (event: CustomEvent) => void;
  /** 关闭 Popper 的动画结束时触发 */
  hidden: (event: CustomEvent) => void;
}

/**
 * ea-popconfirm Vue 组件插槽
 */
export interface EaPopconfirmVueSlots {
  /** 触发 Popconfirm 显示的 HTML 元素插槽 */
  reference?: () => any;
  /** 页脚的内容 */
  actions?: () => any;
}

/**
 * ea-popconfirm Vue 组件类型
 */
export type EaPopconfirmVueComponent = DefineComponent<
  EaPopconfirmVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaPopconfirmVueEvents,
  {},
  {},
  EaPopconfirmVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-popconfirm": EaPopconfirmVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-popconfirm React 组件属性
 */
export interface EaPopconfirmReactProps extends HTMLAttributes<HTMLElement> {
  heading?: string;
  visible?: boolean;
  icon?: string;
  iconColor?: string;
  hideIcon?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  confirmButtonType?: "normal" | "primary" | "success" | "warning" | "danger";
  cancelButtonType?: "normal" | "primary" | "success" | "warning" | "danger";
  width?: number;
  placement?:
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end"
    | "right"
    | "right-start"
    | "right-end";
  showArrow?: boolean;
  status?: boolean;
  offset?: string;
  flip?: boolean;
  /** 点击确认按钮时的回调 */
  onConfirm?: (event: CustomEvent) => void;
  /** 点击取消按钮时的回调 */
  onCancel?: (event: CustomEvent) => void;
  /** 开启 Popper 时触发的回调 */
  onShow?: (event: CustomEvent) => void;
  /** 开启 Popper 的动画结束时触发的回调 */
  onShown?: (event: CustomEvent) => void;
  /** 关闭 Popper 时触发的回调 */
  onHide?: (event: CustomEvent) => void;
  /** 关闭 Popper 的动画结束时触发的回调 */
  onHidden?: (event: CustomEvent) => void;
  /** 触发元素 */
  reference?: ReactNode;
  /** 页脚内容 */
  actions?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-popconfirm": EaPopconfirmReactProps;
    }
  }
}

export {};
