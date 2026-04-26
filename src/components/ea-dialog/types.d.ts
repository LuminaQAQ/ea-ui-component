// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-dialog": EaDialogElement;
  }
}

/**
 * ea-dialog 组件的 HTML 接口
 */
export interface EaDialogElement extends HTMLElement {
  /** 标题 */
  heading: string;
  /** 宽度 */
  width: string;
  /** 顶部距离 */
  top: string;
  /** 内容是否居中 */
  center: boolean;
  /** 是否全屏 */
  fullscreen: boolean;
  /** 是否添加到 body */
  appendToBody: boolean;
  /** 添加到目标选择器 */
  appendTo: string;
  /** 是否显示关闭按钮 */
  showClose: boolean;
  /** 模态可穿透 */
  modalPentrable: boolean;
  /** 是否可拖拽 */
  movable: boolean;
  /** 是否可见 */
  visible: boolean;
  /** 是否显示遮罩层 */
  modal: boolean;
  /** 点击遮罩层是否关闭 */
  closeOnClickModal: boolean;
  /** 按 ESC 键是否关闭 */
  closeOnPressEscape: boolean;
  /** z-index 层级 */
  zIndex: string;
  /** 遮罩层背景色 */
  backgroundColor: string;
  /** 内容宽度 */
  contentWidth: string;
  /** 内容最大宽度 */
  contentMaxWidth: string;
  /** 内容高度 */
  contentHeight: string;
  /** 内容 left 定位 */
  contentLeft: string;
  /** 内容 top 定位 */
  contentTop: string;
  /** 内容 translate-x 偏移量 */
  contentTranslateX: string;
  /** 内容 translate-y 偏移量 */
  contentTranslateY: string;
  /** 内容 transform 属性 */
  contentTransform: string;
  /** 关闭前触发的回调函数 */
  beforeClose: ((done: () => void) => void) | null;

  /** 显示对话框 */
  show(): void;
  /** 隐藏对话框 */
  hide(): void;
  /** 重置对话框位置 */
  resetPosition(): void;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-dialog Vue 组件属性
 */
export interface EaDialogVueProps {
  heading?: string;
  width?: string;
  top?: string;
  center?: boolean;
  fullscreen?: boolean;
  appendToBody?: boolean;
  appendTo?: string;
  showClose?: boolean;
  modalPentrable?: boolean;
  movable?: boolean;
  visible?: boolean;
  modal?: boolean;
  closeOnClickModal?: boolean;
  closeOnPressEscape?: boolean;
  zIndex?: string;
  backgroundColor?: string;
  contentWidth?: string;
  contentMaxWidth?: string;
  contentHeight?: string;
  contentLeft?: string;
  contentTop?: string;
  contentTranslateX?: string;
  contentTranslateY?: string;
  contentTransform?: string;
  beforeClose?: ((done: () => void) => void) | null;
}

/**
 * ea-dialog Vue 组件事件
 */
export interface EaDialogVueEvents {
  /** 开启 Dialog 时触发 */
  open: (event: CustomEvent) => void;
  /** 开启 Dialog 的动画结束时触发 */
  opened: (event: CustomEvent) => void;
  /** 关闭 Dialog 时触发 */
  close: (event: CustomEvent) => void;
  /** 关闭 Dialog 的动画结束时触发 */
  closed: (event: CustomEvent) => void;
}

/**
 * ea-dialog Vue 组件插槽
 */
export interface EaDialogVueSlots {
  /** 默认插槽，用于对话框内容 */
  default?: () => any;
  /** 自定义头部 */
  header?: () => any;
  /** 自定义底部 */
  footer?: () => any;
}

/**
 * ea-dialog Vue 组件类型
 */
export type EaDialogVueComponent = DefineComponent<
  EaDialogVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaDialogVueEvents,
  {},
  {},
  EaDialogVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-dialog": EaDialogVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-dialog React 组件属性
 */
export interface EaDialogReactProps extends HTMLAttributes<HTMLElement> {
  heading?: string;
  width?: string;
  top?: string;
  center?: boolean;
  fullscreen?: boolean;
  appendToBody?: boolean;
  appendTo?: string;
  showClose?: boolean;
  modalPentrable?: boolean;
  movable?: boolean;
  visible?: boolean;
  modal?: boolean;
  closeOnClickModal?: boolean;
  closeOnPressEscape?: boolean;
  zIndex?: string;
  backgroundColor?: string;
  contentWidth?: string;
  contentMaxWidth?: string;
  contentHeight?: string;
  contentLeft?: string;
  contentTop?: string;
  contentTranslateX?: string;
  contentTranslateY?: string;
  contentTransform?: string;
  beforeClose?: ((done: () => void) => void) | null;
  /** 开启 Dialog 时的回调 */
  onOpen?: (event: CustomEvent) => void;
  /** 开启 Dialog 的动画结束时的回调 */
  onOpened?: (event: CustomEvent) => void;
  /** 关闭 Dialog 时的回调 */
  onClose?: (event: CustomEvent) => void;
  /** 关闭 Dialog 的动画结束时的回调 */
  onClosed?: (event: CustomEvent) => void;
  /** 对话框内容 */
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-dialog": EaDialogReactProps;
    }
  }
}

export {};
