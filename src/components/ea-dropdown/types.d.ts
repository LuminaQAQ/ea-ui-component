// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-dropdown": EaDropdownElement;
    "ea-dropdown-item": EaDropdownItemElement;
    "ea-dropdown-menu": EaDropdownMenuElement;
  }
}

/**
 * ea-dropdown 组件的 HTML 接口
 */
export interface EaDropdownElement extends HTMLElement {
  /** 触发方式 */
  trigger: "click" | "hover" | "contextmenu";
  /** 点击菜单项后是否隐藏 */
  hideOnClick: boolean;
  /** 尺寸 */
  size: "small" | "default" | "large" | "";
  /** 菜单位置 */
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
  /** 控制显隐的属性 */
  visible: boolean;
  /** 宽度 */
  width: number;
  /** 偏移量 */
  offset: string;
  /** 是否翻转 */
  flip: boolean;

  /** 显示下拉菜单 */
  show(): void;
  /** 隐藏下拉菜单 */
  hide(): void;
  /** 切换下拉菜单显示状态 */
  toggle(): void;
}

/**
 * ea-dropdown-item 组件的 HTML 接口
 */
export interface EaDropdownItemElement extends HTMLElement {
  /** 是否显示分割线 */
  divided: boolean;
  /** 是否禁用 */
  disabled: boolean;
  /** 命令标识 */
  command: string;
}

/**
 * ea-dropdown-menu 组件的 HTML 接口
 */
export interface EaDropdownMenuElement extends HTMLElement {}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-dropdown Vue 组件属性
 */
export interface EaDropdownVueProps {
  trigger?: "click" | "hover" | "contextmenu";
  hideOnClick?: boolean;
  size?: "small" | "default" | "large" | "";
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
  visible?: boolean;
  width?: number;
  offset?: string;
  flip?: boolean;
}

/**
 * ea-dropdown-item Vue 组件属性
 */
export interface EaDropdownItemVueProps {
  divided?: boolean;
  disabled?: boolean;
  command?: string;
}

/**
 * ea-dropdown-menu Vue 组件属性
 */
export interface EaDropdownMenuVueProps {}

/**
 * ea-dropdown Vue 组件事件
 */
export interface EaDropdownVueEvents {
  /** 显示时触发 */
  show: (event: CustomEvent) => void;
  /** 显示动画结束时触发 */
  shown: (event: CustomEvent) => void;
  /** 隐藏时触发 */
  hide: (event: CustomEvent) => void;
  /** 隐藏动画结束时触发 */
  hidden: (event: CustomEvent) => void;
  /** 点击菜单项时触发 */
  command: (event: CustomEvent<{ command: string }>) => void;
}

/**
 * ea-dropdown-item Vue 组件事件
 */
export interface EaDropdownItemVueEvents {
  /** 点击菜单项时触发 */
  "ea-dropdown-item-click": (event: CustomEvent) => void;
  /** 点击菜单项时触发（当设置了 command 属性） */
  command: (event: CustomEvent<{ command: string }>) => void;
}

/**
 * ea-dropdown Vue 组件插槽
 */
export interface EaDropdownVueSlots {
  /** 默认插槽，用于下拉内容 */
  default?: () => any;
  /** 触发元素插槽 */
  reference?: () => any;
}

/**
 * ea-dropdown-item Vue 组件插槽
 */
export interface EaDropdownItemVueSlots {
  /** 默认插槽 */
  default?: () => any;
}

/**
 * ea-dropdown-menu Vue 组件插槽
 */
export interface EaDropdownMenuVueSlots {
  /** 默认插槽 */
  default?: () => any;
}

/**
 * ea-dropdown Vue 组件类型
 */
export type EaDropdownVueComponent = DefineComponent<
  EaDropdownVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaDropdownVueEvents,
  {},
  {},
  EaDropdownVueSlots
>;

/**
 * ea-dropdown-item Vue 组件类型
 */
export type EaDropdownItemVueComponent = DefineComponent<
  EaDropdownItemVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaDropdownItemVueEvents,
  {},
  {},
  EaDropdownItemVueSlots
>;

/**
 * ea-dropdown-menu Vue 组件类型
 */
export type EaDropdownMenuVueComponent = DefineComponent<
  EaDropdownMenuVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaDropdownMenuVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-dropdown": EaDropdownVueComponent;
    "ea-dropdown-item": EaDropdownItemVueComponent;
    "ea-dropdown-menu": EaDropdownMenuVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-dropdown React 组件属性
 */
export interface EaDropdownReactProps extends HTMLAttributes<HTMLElement> {
  trigger?: "click" | "hover" | "contextmenu";
  hideOnClick?: boolean;
  size?: "small" | "default" | "large" | "";
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
  visible?: boolean;
  width?: number;
  offset?: string;
  flip?: boolean;
  /** 显示时的回调 */
  onShow?: (event: CustomEvent) => void;
  /** 显示动画结束时的回调 */
  onShown?: (event: CustomEvent) => void;
  /** 隐藏时的回调 */
  onHide?: (event: CustomEvent) => void;
  /** 隐藏动画结束时的回调 */
  onHidden?: (event: CustomEvent) => void;
  /** 点击菜单项时的回调 */
  onCommand?: (event: CustomEvent<{ command: string }>) => void;
  /** 自定义内容 */
  children?: ReactNode;
}

/**
 * ea-dropdown-item React 组件属性
 */
export interface EaDropdownItemReactProps extends HTMLAttributes<HTMLElement> {
  divided?: boolean;
  disabled?: boolean;
  command?: string;
  /** 点击菜单项时的回调 */
  onEaDropdownItemClick?: (event: CustomEvent) => void;
  /** 点击菜单项时的回调（当设置了 command 属性） */
  onCommand?: (event: CustomEvent<{ command: string }>) => void;
  /** 自定义内容 */
  children?: ReactNode;
}

/**
 * ea-dropdown-menu React 组件属性
 */
export interface EaDropdownMenuReactProps extends HTMLAttributes<HTMLElement> {
  /** 自定义内容 */
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-dropdown": EaDropdownReactProps;
      "ea-dropdown-item": EaDropdownItemReactProps;
      "ea-dropdown-menu": EaDropdownMenuReactProps;
    }
  }
}

export {};
