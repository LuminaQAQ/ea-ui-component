// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-tabs": EaTabsElement;
    "ea-tab": EaTabElement;
    "ea-tab-panel": EaTabPanelElement;
  }
}

/**
 * ea-tabs 组件的 HTML 接口
 */
export interface EaTabsElement extends HTMLElement {
  /** 当前激活的标签页 */
  active: string;
  /** 标签页风格 */
  type: "" | "card" | "border-card";
  /** 是否启用可编辑模式 */
  editable: boolean;
  /** 标签栏的位置 */
  tabPosition: "top" | "bottom" | "left" | "right";
}

/**
 * ea-tab 组件的 HTML 接口
 */
export interface EaTabElement extends HTMLElement {
  /** 面板标识 */
  panel: string;
  /** 标签页风格 */
  type: "" | "card" | "border-card";
  /** 是否禁用 */
  disabled: boolean;
  /** 是否激活 */
  active: boolean;
  /** 标签位置 */
  tabPosition: string;
  /** 是否可编辑 */
  editable: boolean;
  /** 是否可关闭 */
  closable: boolean;
}

/**
 * ea-tab-panel 组件的 HTML 接口
 */
export interface EaTabPanelElement extends HTMLElement {
  /** 面板名称 */
  name: string;
  /** 标签页风格 */
  type: "" | "card" | "border-card";
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-tabs Vue 组件属性
 */
export interface EaTabsVueProps {
  active?: string;
  type?: "" | "card" | "border-card";
  editable?: boolean;
  tabPosition?: "top" | "bottom" | "left" | "right";
}

/**
 * ea-tab Vue 组件属性
 */
export interface EaTabVueProps {
  panel?: string;
  type?: "" | "card" | "border-card";
  disabled?: boolean;
  active?: boolean;
  tabPosition?: string;
  editable?: boolean;
  closable?: boolean;
}

/**
 * ea-tab-panel Vue 组件属性
 */
export interface EaTabPanelVueProps {
  name?: string;
  type?: "" | "card" | "border-card";
}

/**
 * ea-tabs Vue 组件事件
 */
export interface EaTabsVueEvents {
  /** 点击切换标签时触发 */
  tabClick: (event: CustomEvent) => void;
  /** 标签页切换时触发 */
  tabsChange: (event: CustomEvent) => void;
  /** 点击删除标签时触发 */
  tabRemove: (event: CustomEvent) => void;
}

/**
 * ea-tab Vue 组件事件
 */
export interface EaTabVueEvents {
  /** 点击关闭图标时触发 */
  "ea-tab-close-icon-click": (event: CustomEvent) => void;
}

/**
 * ea-tabs Vue 组件插槽
 */
export interface EaTabsVueSlots {
  /** 导航插槽，用于放置 ea-tab */
  nav?: () => any;
  /** 默认插槽，用于放置 ea-tab-panel */
  default?: () => any;
}

/**
 * ea-tab Vue 组件插槽
 */
export interface EaTabVueSlots {
  /** 默认插槽，用于标签内容 */
  default?: () => any;
}

/**
 * ea-tab-panel Vue 组件插槽
 */
export interface EaTabPanelVueSlots {
  /** 默认插槽，用于面板内容 */
  default?: () => any;
}

/**
 * ea-tabs Vue 组件类型
 */
export type EaTabsVueComponent = DefineComponent<
  EaTabsVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaTabsVueEvents,
  {},
  {},
  EaTabsVueSlots
>;

/**
 * ea-tab Vue 组件类型
 */
export type EaTabVueComponent = DefineComponent<
  EaTabVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaTabVueEvents,
  {},
  {},
  EaTabVueSlots
>;

/**
 * ea-tab-panel Vue 组件类型
 */
export type EaTabPanelVueComponent = DefineComponent<
  EaTabPanelVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaTabPanelVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-tabs": EaTabsVueComponent;
    "ea-tab": EaTabVueComponent;
    "ea-tab-panel": EaTabPanelVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-tabs React 组件属性
 */
export interface EaTabsReactProps extends HTMLAttributes<HTMLElement> {
  active?: string;
  type?: "" | "card" | "border-card";
  editable?: boolean;
  tabPosition?: "top" | "bottom" | "left" | "right";
  /** 点击切换标签时的回调 */
  onTabClick?: (event: CustomEvent) => void;
  /** 标签页切换时的回调 */
  onTabsChange?: (event: CustomEvent) => void;
  /** 点击删除标签时的回调 */
  onTabRemove?: (event: CustomEvent) => void;
  /** 自定义内容 */
  children?: ReactNode;
}

/**
 * ea-tab React 组件属性
 */
export interface EaTabReactProps extends HTMLAttributes<HTMLElement> {
  panel?: string;
  type?: "" | "card" | "border-card";
  disabled?: boolean;
  active?: boolean;
  tabPosition?: string;
  editable?: boolean;
  closable?: boolean;
  /** 点击关闭图标时的回调 */
  onEaTabCloseIconClick?: (event: CustomEvent) => void;
  /** 标签内容 */
  children?: ReactNode;
}

/**
 * ea-tab-panel React 组件属性
 */
export interface EaTabPanelReactProps extends HTMLAttributes<HTMLElement> {
  name?: string;
  type?: "" | "card" | "border-card";
  /** 面板内容 */
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-tabs": EaTabsReactProps;
      "ea-tab": EaTabReactProps;
      "ea-tab-panel": EaTabPanelReactProps;
    }
  }
}

export {};
