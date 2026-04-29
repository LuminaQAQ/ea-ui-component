// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-drawer": EaDrawerElement;
  }
}

/**
 * ea-drawer 组件的 HTML 接口
 */
export interface EaDrawerElement extends HTMLElement {
  /** 抽屉方向 */
  direction: "rtl" | "ltr" | "ttb" | "btt";
  /** 是否显示头部 */
  withHeader: boolean;
  /** 标题文本 */
  heading: string;
  /** 是否显示关闭按钮 */
  showClose: boolean;
  /** 抽屉尺寸 */
  size: string;
  /** 指定挂载宿主元素的选择器 */
  appendTo: string;
  /** 是否可见 */
  visible: boolean;
  /** 是否显示遮罩层 */
  modal: boolean;
  /** 点击遮罩层是否关闭 */
  closeOnClickModal: boolean;
  /** 按 ESC 键是否关闭 */
  closeOnPressEscape: boolean;
  /** 是否添加到 body */
  appendToBody: boolean;
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

  /** 显示抽屉 */
  show(): void;
  /** 隐藏抽屉 */
  hide(): void;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-drawer Vue 组件属性
 */
export interface EaDrawerVueProps {
  direction?: "rtl" | "ltr" | "ttb" | "btt";
  withHeader?: boolean;
  heading?: string;
  showClose?: boolean;
  size?: string;
  appendTo?: string;
  visible?: boolean;
  modal?: boolean;
  closeOnClickModal?: boolean;
  closeOnPressEscape?: boolean;
  appendToBody?: boolean;
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
 * ea-drawer Vue 组件事件
 */
export interface EaDrawerVueEvents {
  /** 打开抽屉时触发 */
  open: (event: CustomEvent) => void;
  /** 打开抽屉的动画结束时触发 */
  opened: (event: CustomEvent) => void;
  /** 关闭抽屉时触发 */
  close: (event: CustomEvent) => void;
  /** 关闭抽屉的动画结束时触发 */
  closed: (event: CustomEvent) => void;
}

/**
 * ea-drawer Vue 组件插槽
 */
export interface EaDrawerVueSlots {
  /** 默认插槽，用于抽屉内容 */
  default?: () => any;
  /** 自定义标题 */
  title?: () => any;
  /** 自定义底部 */
  footer?: () => any;
}

/**
 * ea-drawer Vue 组件类型
 */
export type EaDrawerVueComponent = DefineComponent<
  EaDrawerVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaDrawerVueEvents,
  {},
  {},
  EaDrawerVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-drawer": EaDrawerVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-drawer React 组件属性
 */
export interface EaDrawerReactProps extends HTMLAttributes<HTMLElement> {
  direction?: "rtl" | "ltr" | "ttb" | "btt";
  withHeader?: boolean;
  heading?: string;
  showClose?: boolean;
  size?: string;
  appendTo?: string;
  visible?: boolean;
  modal?: boolean;
  closeOnClickModal?: boolean;
  closeOnPressEscape?: boolean;
  appendToBody?: boolean;
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
  /** 打开抽屉时的回调 */
  onOpen?: (event: CustomEvent) => void;
  /** 打开抽屉的动画结束时的回调 */
  onOpened?: (event: CustomEvent) => void;
  /** 关闭抽屉时的回调 */
  onClose?: (event: CustomEvent) => void;
  /** 关闭抽屉的动画结束时的回调 */
  onClosed?: (event: CustomEvent) => void;
  /** 抽屉内容 */
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-drawer": EaDrawerReactProps;
    }
  }
}

export {};
