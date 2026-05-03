// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-tooltip": EaTooltipElement;
  }
}

/**
 * ea-tooltip 组件的 HTML 接口
 */
export interface EaTooltipElement extends HTMLElement {
  /** 触发方式 */
  trigger: "click" | "focus" | "hover" | "contextmenu" | "customized";
  /** 显示效果 */
  effect: "dark" | "light" | "customized";
  /** 显示的内容，也可以通过写入默认 slot 修改显示内容 */
  content: string;
  /** 控制 Tooltip 显隐的属性 */
  visible: boolean;
  /** 宽度，单位 px */
  width: number;
  /** 气泡的出现位置 */
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
  /** 气泡出现的位置偏移量 */
  offset: string;
  /** 是否在超过原 placement 视口时进行翻转 */
  flip: boolean;

  /** 显示 Tooltip */
  show(): void;
  /** 隐藏 Tooltip */
  hide(): void;
  /** 切换 Tooltip 显示状态 */
  toggle(): void;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-tooltip Vue 组件属性
 */
export interface EaTooltipVueProps {
  trigger?: "click" | "focus" | "hover" | "contextmenu" | "customized";
  effect?: "dark" | "light" | "customized";
  content?: string;
  visible?: boolean;
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
  offset?: string;
  flip?: boolean;
}

/**
 * ea-tooltip Vue 组件事件
 */
export interface EaTooltipVueEvents {
  /** 开启 Tooltip 时触发的事件 */
  show: (event: CustomEvent) => void;
  /** 开启 Tooltip 的动画结束时触发 */
  shown: (event: CustomEvent) => void;
  /** 关闭 Tooltip 时触发的事件 */
  hide: (event: CustomEvent) => void;
  /** 关闭 Tooltip 的动画结束时触发 */
  hidden: (event: CustomEvent) => void;
}

/**
 * ea-tooltip Vue 组件插槽
 */
export interface EaTooltipVueSlots {
  /** Tooltip 内容插槽 */
  default?: () => any;
  /** 触发 Tooltip 显示的 HTML 元素插槽 */
  reference?: () => any;
}

/**
 * ea-tooltip Vue 组件类型
 */
export type EaTooltipVueComponent = DefineComponent<
  EaTooltipVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaTooltipVueEvents,
  {},
  {},
  EaTooltipVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-tooltip": EaTooltipVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-tooltip React 组件属性
 */
export interface EaTooltipReactProps extends HTMLAttributes<HTMLElement> {
  trigger?: "click" | "focus" | "hover" | "contextmenu" | "customized";
  effect?: "dark" | "light" | "customized";
  content?: string;
  visible?: boolean;
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
  offset?: string;
  flip?: boolean;
  /** 开启 Tooltip 时触发的回调 */
  onShow?: (event: CustomEvent) => void;
  /** 开启 Tooltip 的动画结束时触发的回调 */
  onShown?: (event: CustomEvent) => void;
  /** 关闭 Tooltip 时触发的回调 */
  onHide?: (event: CustomEvent) => void;
  /** 关闭 Tooltip 的动画结束时触发的回调 */
  onHidden?: (event: CustomEvent) => void;
  /** Tooltip 内容 */
  children?: ReactNode;
  /** 触发元素 */
  reference?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-tooltip": EaTooltipReactProps;
    }
  }
}

export {};
