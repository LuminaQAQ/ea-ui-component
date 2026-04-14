// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-overlay": EaOverlayElement;
  }
}

/**
 * ea-overlay 组件的 HTML 接口
 */
export interface EaOverlayElement extends HTMLElement {
  /** 控制 Overlay 显隐的属性 */
  status: boolean;
  /** 是否显示遮罩层 */
  modal: boolean;
  /** 点击遮罩层是否关闭 */
  closeOnClickModal: boolean;
  /** z-index */
  zIndex: string;
  /** 背景颜色 */
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
  /** 显示遮罩层 */
  show(): void;
  /** 隐藏遮罩层 */
  hide(): void;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-overlay Vue 组件属性
 */
export interface EaOverlayVueProps {
  status?: boolean;
  modal?: boolean;
  closeOnClickModal?: boolean;
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
  beforeClose?: (done: () => void) => void;
}

/**
 * ea-overlay Vue 组件事件
 */
export interface EaOverlayVueEvents {
  /** 打开时触发 */
  open: () => void;
  /** 打开动画结束后触发 */
  opened: () => void;
  /** 关闭时触发 */
  close: () => void;
  /** 关闭动画结束后触发 */
  closed: () => void;
}

/**
 * ea-overlay Vue 组件插槽
 */
export interface EaOverlayVueSlots {
  /** 默认插槽，用于遮罩层内容 */
  default?: () => any;
}

/**
 * ea-overlay Vue 组件类型
 */
export type EaOverlayVueComponent = DefineComponent<
  EaOverlayVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaOverlayVueEvents,
  {},
  {},
  EaOverlayVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-overlay": EaOverlayVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-overlay React 组件属性
 */
export interface EaOverlayReactProps extends HTMLAttributes<HTMLElement> {
  status?: boolean;
  modal?: boolean;
  closeOnClickModal?: boolean;
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
  beforeClose?: (done: () => void) => void;
  /** 打开时触发 */
  onOpen?: () => void;
  /** 打开动画结束后触发 */
  onOpened?: () => void;
  /** 关闭时触发 */
  onClose?: () => void;
  /** 关闭动画结束后触发 */
  onClosed?: () => void;
  /** 自定义内容 */
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-overlay": EaOverlayReactProps;
    }
  }
}

export {};
