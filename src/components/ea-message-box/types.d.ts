// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-message-box": EaMessageBoxElement;
  }
}

/**
 * ea-message-box 组件的 HTML 接口
 */
export interface EaMessageBoxElement extends HTMLElement {
  /** 消息框类型 */
  boxType: "alert" | "confirm" | "prompt" | "personalized";
  /** 标题 */
  heading: string;
  /** 正文内容 */
  message: string;
  /** 消息框变体类型 */
  variant: "primary" | "success" | "info" | "warning" | "error" | "";
  /** 自定义图标 */
  icon: string;
  /** 关闭图标 */
  closeIcon: string;
  /** 是否显示关闭按钮 */
  showClose: boolean;
  /** 是否显示取消按钮 */
  showCancelButton: boolean;
  /** 是否显示确认按钮 */
  showConfirmButton: boolean;
  /** 确认按钮文本 */
  confirmButtonText: string;
  /** 取消按钮文本 */
  cancelButtonText: string;
  /** 按 ESC 键是否关闭 */
  closeOnPressEscape: boolean;
  /** 内容是否居中 */
  center: boolean;
  /** 是否使用圆角按钮 */
  roundButton: boolean;
  /** 按钮尺寸 */
  buttonSize: "small" | "medium" | "large";
  /** 是否显示输入框 */
  showInput: boolean;
  /** 输入框占位文本 */
  inputPlaceholder: string;
  /** 输入框类型 */
  inputType: string;
  /** 输入框初始值 */
  inputValue: string;
  /** 输入框校验错误信息 */
  inputErrorMessage: string;
  /** 是否可拖拽 */
  movable: boolean;
  /** 是否可见 */
  visible: boolean;
  /** 是否显示遮罩层 */
  modal: boolean;
  /** 点击遮罩层是否关闭 */
  closeOnClickModal: boolean;
  /** z-index 层级 */
  zIndex: string;
  /** 遮罩层背景色 */
  backgroundColor: string;
  /** 关闭前触发的回调函数 */
  beforeClose: ((done: () => void) => void) | null;
  /** 输入框校验正则 */
  inputPattern: RegExp | null;
  /** 是否将 message 作为 HTML 渲染 */
  dangerouslyUseHTMLString: boolean;
  /** 确认按钮是否加载中 */
  confirmButtonLoading: boolean;
  /** 是否区分取消和关闭操作 */
  distinguishCancelAndClose: boolean;

  /** 显示消息框 */
  show(): void;
  /** 隐藏消息框 */
  hide(): void;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-message-box Vue 组件属性
 */
export interface EaMessageBoxVueProps {
  boxType?: "alert" | "confirm" | "prompt" | "personalized";
  heading?: string;
  message?: string;
  variant?: "primary" | "success" | "info" | "warning" | "error" | "";
  icon?: string;
  closeIcon?: string;
  showClose?: boolean;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  closeOnPressEscape?: boolean;
  center?: boolean;
  roundButton?: boolean;
  buttonSize?: "small" | "medium" | "large";
  showInput?: boolean;
  inputPlaceholder?: string;
  inputType?: string;
  inputValue?: string;
  inputErrorMessage?: string;
  movable?: boolean;
  visible?: boolean;
  modal?: boolean;
  closeOnClickModal?: boolean;
  zIndex?: string;
  backgroundColor?: string;
  beforeClose?: ((done: () => void) => void) | null;
  inputPattern?: RegExp | null;
  dangerouslyUseHTMLString?: boolean;
  confirmButtonLoading?: boolean;
  distinguishCancelAndClose?: boolean;
}

/**
 * ea-message-box Vue 组件事件
 */
export interface EaMessageBoxVueEvents {
  /** 确认时触发 */
  confirm: (event: CustomEvent) => void;
  /** 取消时触发 */
  cancel: (event: CustomEvent) => void;
  /** 关闭时触发（区分取消和关闭时） */
  "message-close": (event: CustomEvent) => void;
  /** 开启时触发 */
  open: (event: CustomEvent) => void;
  /** 开启动画结束时触发 */
  opened: (event: CustomEvent) => void;
  /** 关闭时触发 */
  close: (event: CustomEvent) => void;
  /** 关闭动画结束时触发 */
  closed: (event: CustomEvent) => void;
}

/**
 * ea-message-box Vue 组件类型
 */
export type EaMessageBoxVueComponent = DefineComponent<
  EaMessageBoxVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaMessageBoxVueEvents,
  {},
  {},
  {}
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-message-box": EaMessageBoxVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-message-box React 组件属性
 */
export interface EaMessageBoxReactProps extends HTMLAttributes<HTMLElement> {
  boxType?: "alert" | "confirm" | "prompt" | "personalized";
  heading?: string;
  message?: string;
  variant?: "primary" | "success" | "info" | "warning" | "error" | "";
  icon?: string;
  closeIcon?: string;
  showClose?: boolean;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  closeOnPressEscape?: boolean;
  center?: boolean;
  roundButton?: boolean;
  buttonSize?: "small" | "medium" | "large";
  showInput?: boolean;
  inputPlaceholder?: string;
  inputType?: string;
  inputValue?: string;
  inputErrorMessage?: string;
  movable?: boolean;
  visible?: boolean;
  modal?: boolean;
  closeOnClickModal?: boolean;
  zIndex?: string;
  backgroundColor?: string;
  beforeClose?: ((done: () => void) => void) | null;
  inputPattern?: RegExp | null;
  dangerouslyUseHTMLString?: boolean;
  confirmButtonLoading?: boolean;
  distinguishCancelAndClose?: boolean;
  /** 确认时的回调 */
  onConfirm?: (event: CustomEvent) => void;
  /** 取消时的回调 */
  onCancel?: (event: CustomEvent) => void;
  /** 关闭时的回调（区分取消和关闭时） */
  onMessageClose?: (event: CustomEvent) => void;
  /** 开启时的回调 */
  onOpen?: (event: CustomEvent) => void;
  /** 开启动画结束时的回调 */
  onOpened?: (event: CustomEvent) => void;
  /** 关闭时的回调 */
  onClose?: (event: CustomEvent) => void;
  /** 关闭动画结束时的回调 */
  onClosed?: (event: CustomEvent) => void;
  /** 自定义内容 */
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-message-box": EaMessageBoxReactProps;
    }
  }
}

export {};
