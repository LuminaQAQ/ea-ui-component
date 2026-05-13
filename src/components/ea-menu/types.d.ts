// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-menu": EaMenuElement;
    "ea-menu-item": EaMenuItemElement;
    "ea-menu-item-group": EaMenuItemGroupElement;
    "ea-sub-menu": EaSubMenuElement;
  }
}

/**
 * ea-menu 组件的 HTML 接口
 */
export interface EaMenuElement extends HTMLElement {
  mode: "horizontal" | "vertical";
  backgroundColor: string;
  textColor: string;
  activeTextColor: string;
  defaultActive: string;
  active: string;
  collapse: boolean;
}

/**
 * ea-menu-item 组件的 HTML 接口
 */
export interface EaMenuItemElement extends HTMLElement {
  index: string;
  disabled: boolean;
  active: boolean;
}

/**
 * ea-menu-item-group 组件的 HTML 接口
 */
export interface EaMenuItemGroupElement extends HTMLElement {
  groupTitle: string;
}

/**
 * ea-sub-menu 组件的 HTML 接口
 */
export interface EaSubMenuElement extends HTMLElement {
  open: boolean;
  index: string;
  disabled: boolean;
  active: boolean;
  mode: "horizontal" | "vertical";
  label: string;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-menu Vue 组件属性
 */
export interface EaMenuVueProps {
  mode?: "horizontal" | "vertical";
  backgroundColor?: string;
  textColor?: string;
  activeTextColor?: string;
  defaultActive?: string;
  active?: string;
  collapse?: boolean;
}

/**
 * ea-menu-item Vue 组件属性
 */
export interface EaMenuItemVueProps {
  index?: string;
  disabled?: boolean;
  active?: boolean;
}

/**
 * ea-menu-item-group Vue 组件属性
 */
export interface EaMenuItemGroupVueProps {
  groupTitle?: string;
}

/**
 * ea-sub-menu Vue 组件属性
 */
export interface EaSubMenuVueProps {
  open?: boolean;
  index?: string;
  disabled?: boolean;
  active?: boolean;
  mode?: "horizontal" | "vertical";
  label?: string;
}

/**
 * ea-menu Vue 组件事件
 */
export interface EaMenuVueEvents {
  select: (event: CustomEvent) => void;
}

/**
 * ea-menu Vue 组件插槽
 */
export interface EaMenuVueSlots {
  default?: () => any;
}

/**
 * ea-menu-item Vue 组件插槽
 */
export interface EaMenuItemVueSlots {
  default?: () => any;
}

/**
 * ea-menu-item-group Vue 组件插槽
 */
export interface EaMenuItemGroupVueSlots {
  default?: () => any;
  title?: () => any;
}

/**
 * ea-sub-menu Vue 组件插槽
 */
export interface EaSubMenuVueSlots {
  default?: () => any;
  title?: () => any;
}

/**
 * ea-menu Vue 组件类型
 */
export type EaMenuVueComponent = DefineComponent<
  EaMenuVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaMenuVueEvents,
  {},
  {},
  EaMenuVueSlots
>;

/**
 * ea-menu-item Vue 组件类型
 */
export type EaMenuItemVueComponent = DefineComponent<
  EaMenuItemVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaMenuItemVueSlots
>;

/**
 * ea-menu-item-group Vue 组件类型
 */
export type EaMenuItemGroupVueComponent = DefineComponent<
  EaMenuItemGroupVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaMenuItemGroupVueSlots
>;

/**
 * ea-sub-menu Vue 组件类型
 */
export type EaSubMenuVueComponent = DefineComponent<
  EaSubMenuVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaSubMenuVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-menu": EaMenuVueComponent;
    "ea-menu-item": EaMenuItemVueComponent;
    "ea-menu-item-group": EaMenuItemGroupVueComponent;
    "ea-sub-menu": EaSubMenuVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-menu React 组件属性
 */
export interface EaMenuReactProps extends HTMLAttributes<HTMLElement> {
  mode?: "horizontal" | "vertical";
  backgroundColor?: string;
  textColor?: string;
  activeTextColor?: string;
  defaultActive?: string;
  collapse?: boolean;
  children?: ReactNode;
}

/**
 * ea-menu-item React 组件属性
 */
export interface EaMenuItemReactProps extends HTMLAttributes<HTMLElement> {
  index?: string;
  disabled?: boolean;
  active?: boolean;
  children?: ReactNode;
}

/**
 * ea-menu-item-group React 组件属性
 */
export interface EaMenuItemGroupReactProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  children?: ReactNode;
}

/**
 * ea-sub-menu React 组件属性
 */
export interface EaSubMenuReactProps extends HTMLAttributes<HTMLElement> {
  open?: boolean;
  index?: string;
  disabled?: boolean;
  active?: boolean;
  mode?: "horizontal" | "vertical";
  label?: string;
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-menu": EaMenuReactProps;
      "ea-menu-item": EaMenuItemReactProps;
      "ea-menu-item-group": EaMenuItemGroupReactProps;
      "ea-sub-menu": EaSubMenuReactProps;
    }
  }
}

export {};
