// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-button": EaButtonElement;
    "ea-button-group": EaButtonGroupElement;
  }
}

/**
 * ea-button 组件的 HTML 接口
 */
export interface EaButtonElement extends HTMLElement {
  /** 是否禁用 */
  disabled: boolean;
  /** 按钮类型 */
  variant: "normal" | "primary" | "success" | "warning" | "danger" | "text" | "link";
  /** 是否为文字按钮 */
  text: boolean;
  /** 是否为朴素按钮 */
  plain: boolean;
  /** 是否为圆角按钮 */
  round: boolean;
  /** 是否为圆形按钮 */
  circle: boolean;
  /** 是否为链接按钮 */
  link: boolean;
  /** 链接地址 */
  href: string;
  /** 按钮尺寸 */
  size: "small" | "medium" | "large";
  /** 是否加载中 */
  loading: boolean;
  /** 图标类名 */
  icon: string;
  /** 原生按钮类型 */
  buttonType: "button" | "submit" | "reset";
}

/**
 * ea-button-group 组件的 HTML 接口
 */
export interface EaButtonGroupElement extends HTMLElement {
  /** 是否禁用 */
  disabled: boolean;
  /** 按钮尺寸 */
  size: "small" | "medium" | "large";
  /** 按钮类型 */
  type: "normal" | "primary" | "success" | "warning" | "danger";
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-button Vue 组件属性
 */
export interface EaButtonVueProps {
  disabled?: boolean;
  variant?: "normal" | "primary" | "success" | "warning" | "danger" | "text" | "link";
  text?: boolean;
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
  link?: boolean;
  href?: string;
  size?: "small" | "medium" | "large";
  loading?: boolean;
  icon?: string;
  buttonType?: "button" | "submit" | "reset";
}

/**
 * ea-button-group Vue 组件属性
 */
export interface EaButtonGroupVueProps {
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  type?: "normal" | "primary" | "success" | "warning" | "danger";
}

/**
 * ea-button Vue 组件事件
 */
export interface EaButtonVueEvents {
  /** 点击按钮时触发 */
  click: (event: CustomEvent) => void;
}

/**
 * ea-button Vue 组件插槽
 */
export interface EaButtonVueSlots {
  /** 默认插槽，用于按钮内容 */
  default?: () => any;
}

/**
 * ea-button-group Vue 组件插槽
 */
export interface EaButtonGroupVueSlots {
  /** 默认插槽，用于放置 ea-button */
  default?: () => any;
}

/**
 * ea-button Vue 组件类型
 */
export type EaButtonVueComponent = DefineComponent<
  EaButtonVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaButtonVueEvents,
  {},
  {},
  EaButtonVueSlots
>;

/**
 * ea-button-group Vue 组件类型
 */
export type EaButtonGroupVueComponent = DefineComponent<
  EaButtonGroupVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaButtonGroupVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-button": EaButtonVueComponent;
    "ea-button-group": EaButtonGroupVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-button React 组件属性
 */
export interface EaButtonReactProps extends HTMLAttributes<HTMLElement> {
  disabled?: boolean;
  variant?: "normal" | "primary" | "success" | "warning" | "danger" | "text" | "link";
  text?: boolean;
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
  link?: boolean;
  href?: string;
  size?: "small" | "medium" | "large";
  loading?: boolean;
  icon?: string;
  buttonType?: "button" | "submit" | "reset";
  /** 点击按钮时的回调 */
  onClick?: (event: CustomEvent) => void;
  /** 按钮内容 */
  children?: ReactNode;
}

/**
 * ea-button-group React 组件属性
 */
export interface EaButtonGroupReactProps extends HTMLAttributes<HTMLElement> {
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  type?: "normal" | "primary" | "success" | "warning" | "danger";
  /** 自定义内容 */
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-button": EaButtonReactProps;
      "ea-button-group": EaButtonGroupReactProps;
    }
  }
}

export {};
