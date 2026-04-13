// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-link": EaLinkElement;
  }
}

/**
 * Link 类型
 */
export type LinkType = "normal" | "primary" | "success" | "info" | "warning" | "danger";

/**
 * Underline 类型
 */
export type UnderlineType = "always" | "hover" | "never";

/**
 * ea-link 组件的 HTML 接口
 */
export interface EaLinkElement extends HTMLElement {
  /** 类型 */
  type: LinkType;
  /** 是否禁用 */
  disabled: boolean;
  /** 下划线样式 */
  underline: UnderlineType | "";
  /** 链接地址 */
  href: string;
  /** 图标类名 */
  icon: string;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-link Vue 组件属性
 */
export interface EaLinkVueProps {
  type?: LinkType;
  disabled?: boolean;
  underline?: UnderlineType;
  href?: string;
  icon?: string;
}

/**
 * ea-link Vue 组件事件
 */
export interface EaLinkVueEvents {
  /** 点击链接时触发 */
  click: (event: MouseEvent) => void;
}

/**
 * ea-link Vue 组件插槽
 */
export interface EaLinkVueSlots {
  /** 默认插槽，用于链接内容 */
  default?: () => any;
}

/**
 * ea-link Vue 组件类型
 */
export type EaLinkVueComponent = DefineComponent<
  EaLinkVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaLinkVueEvents,
  {},
  {},
  EaLinkVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-link": EaLinkVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode, AnchorHTMLAttributes } from "react";

/**
 * ea-link React 组件属性
 */
export interface EaLinkReactProps extends AnchorHTMLAttributes<HTMLElement> {
  type?: LinkType;
  disabled?: boolean;
  underline?: UnderlineType;
  href?: string;
  icon?: string;
  /** 点击链接时的回调 */
  onClick?: (event: MouseEvent) => void;
  /** 链接内容 */
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-link": EaLinkReactProps;
    }
  }
}

export {};
