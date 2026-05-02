// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-popper": EaPopperElement;
  }
}

/**
 * Placement 类型
 */
export type PlacementType =
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

/**
 * ea-popper 组件的 HTML 接口
 */
export interface EaPopperElement extends HTMLElement {
  /** 宽度，单位 px */
  width: number;
  /** 气泡的出现位置 */
  placement: PlacementType;
  /** 是否显示箭头 */
  showArrow: boolean;
  /** 控制 Popper 显隐的属性 */
  visible: boolean;
  /** 气泡出现的位置偏移量 */
  offset: string;
  /** 是否在超过原 placement 视口时，进行翻转 */
  flip: boolean;

  /** 显示 popper */
  show(): void;
  /** 隐藏 popper */
  hide(): void;
  /** 切换 popper 显示状态 */
  toggle(): void;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-popper Vue 组件属性
 */
export interface EaPopperVueProps {
  /** 宽度，单位 px */
  width?: number;
  /** 气泡的出现位置 */
  placement?: PlacementType;
  /** 是否显示箭头 */
  showArrow?: boolean;
  /** 控制 Popper 显隐的属性 */
  visible?: boolean;
  /** 气泡出现的位置偏移量 */
  offset?: string;
  /** 是否在超过原 placement 视口时，进行翻转 */
  flip?: boolean;
}

/**
 * ea-popper Vue 组件事件
 */
export interface EaPopperVueEvents {
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
 * ea-popper Vue 组件插槽
 */
export interface EaPopperVueSlots {
  /** 默认插槽，用于 Popper 内容 */
  default?: () => any;
  /** reference 插槽，用于触发 Popper 显示的 HTML 元素 */
  reference?: () => any;
}

/**
 * ea-popper Vue 组件类型
 */
export type EaPopperVueComponent = DefineComponent<
  EaPopperVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaPopperVueEvents,
  {},
  {},
  EaPopperVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-popper": EaPopperVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-popper React 组件属性
 */
export interface EaPopperReactProps extends HTMLAttributes<HTMLElement> {
  /** 宽度，单位 px */
  width?: number;
  /** 气泡的出现位置 */
  placement?: PlacementType;
  /** 是否显示箭头 */
  showArrow?: boolean;
  /** 控制 Popper 显隐的属性 */
  visible?: boolean;
  /** 气泡出现的位置偏移量 */
  offset?: string;
  /** 是否在超过原 placement 视口时，进行翻转 */
  flip?: boolean;
  /** 开启 Popper 时触发的回调 */
  onShow?: (event: CustomEvent) => void;
  /** 开启 Popper 的动画结束时触发的回调 */
  onShown?: (event: CustomEvent) => void;
  /** 关闭 Popper 时触发的回调 */
  onHide?: (event: CustomEvent) => void;
  /** 关闭 Popper 的动画结束时触发的回调 */
  onHidden?: (event: CustomEvent) => void;
  /** 自定义内容 */
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-popper": EaPopperReactProps;
    }
  }
}

export {};
