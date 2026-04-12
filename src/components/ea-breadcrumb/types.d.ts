// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-breadcrumb": EaBreadcrumbElement;
    "ea-breadcrumb-item": EaBreadcrumbItemElement;
  }
}

/**
 * ea-breadcrumb 组件的 HTML 接口
 */
export interface EaBreadcrumbElement extends HTMLElement {
  /** 分隔符字符串 */
  separator: string;
}

/**
 * ea-breadcrumb-item 组件的 HTML 接口
 */
export interface EaBreadcrumbItemElement extends HTMLElement {
  /** 链接地址 */
  href: string;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-breadcrumb Vue 组件属性
 */
export interface EaBreadcrumbVueProps {
  separator?: string;
}

/**
 * ea-breadcrumb-item Vue 组件属性
 */
export interface EaBreadcrumbItemVueProps {
  href?: string;
}

/**
 * ea-breadcrumb Vue 组件插槽
 */
export interface EaBreadcrumbVueSlots {
  /** 默认插槽，用于放置 ea-breadcrumb-item */
  default?: () => any;
  /** 分隔符插槽 */
  separator?: () => any;
}

/**
 * ea-breadcrumb-item Vue 组件插槽
 */
export interface EaBreadcrumbItemVueSlots {
  /** 默认插槽，用于内容 */
  default?: () => any;
  /** 分隔符插槽 */
  separator?: () => any;
}

/**
 * ea-breadcrumb Vue 组件类型
 */
export type EaBreadcrumbVueComponent = DefineComponent<
  EaBreadcrumbVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaBreadcrumbVueSlots
>;

/**
 * ea-breadcrumb-item Vue 组件类型
 */
export type EaBreadcrumbItemVueComponent = DefineComponent<
  EaBreadcrumbItemVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaBreadcrumbItemVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-breadcrumb": EaBreadcrumbVueComponent;
    "ea-breadcrumb-item": EaBreadcrumbItemVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-breadcrumb React 组件属性
 */
export interface EaBreadcrumbReactProps extends HTMLAttributes<HTMLElement> {
  separator?: string;
  /** 自定义内容 */
  children?: ReactNode;
}

/**
 * ea-breadcrumb-item React 组件属性
 */
export interface EaBreadcrumbItemReactProps extends HTMLAttributes<HTMLElement> {
  href?: string;
  /** 自定义内容 */
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-breadcrumb": EaBreadcrumbReactProps;
      "ea-breadcrumb-item": EaBreadcrumbItemReactProps;
    }
  }
}

export {};
