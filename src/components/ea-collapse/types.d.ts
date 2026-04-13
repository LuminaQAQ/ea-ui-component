// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-collapse": EaCollapseElement;
    "ea-collapse-item": EaCollapseItemElement;
  }
}

/**
 * ea-collapse 组件的 HTML 接口
 */
export interface EaCollapseElement extends HTMLElement {
  /** 是否手风琴模式 */
  accordion: boolean;
  /** 当前激活的面板 */
  active: string | string[];
  /** 展开图标位置 */
  expandIconPosition: "left" | "right";
  /** 折叠前的回调函数 */
  beforeCollapse:
    | ((params: {
        name: string;
        el: EaCollapseItemElement;
      }) => boolean | Promise<boolean>)
    | null;
  /** 设置激活的面板 */
  setActiveNames(value: string | string[]): void;
}

/**
 * ea-collapse-item 组件的 HTML 接口
 */
export interface EaCollapseItemElement extends HTMLElement {
  /** 面板标题 */
  header: string;
  /** 唯一标识 */
  name: string;
  /** 展开图标位置 */
  expandIconPosition: "left" | "right";
  /** 是否禁用 */
  disabled: boolean;
  /** 是否展开 */
  active: boolean;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-collapse Vue 组件属性
 */
export interface EaCollapseVueProps {
  accordion?: boolean;
  active?: string | string[];
  expandIconPosition?: "left" | "right";
  beforeCollapse?: (params: {
    name: string;
    el: EaCollapseItemElement;
  }) => boolean | Promise<boolean>;
}

/**
 * ea-collapse-item Vue 组件属性
 */
export interface EaCollapseItemVueProps {
  header?: string;
  name?: string;
  expandIconPosition?: "left" | "right";
  disabled?: boolean;
  active?: boolean;
}

/**
 * ea-collapse Vue 组件事件
 */
export interface EaCollapseVueEvents {
  /** 面板切换时触发 */
  change: (
    event: CustomEvent<{
      name: string;
      target: EaCollapseItemElement;
      active: string | string[];
    }>
  ) => void;
}

/**
 * ea-collapse Vue 组件插槽
 */
export interface EaCollapseVueSlots {
  /** 默认插槽，用于放置 ea-collapse-item */
  default?: () => any;
}

/**
 * ea-collapse-item Vue 组件插槽
 */
export interface EaCollapseItemVueSlots {
  /** 默认插槽，用于面板内容 */
  default?: () => any;
  /** 标题插槽 */
  header?: () => any;
  /** 图标插槽 */
  icon?: () => any;
}

/**
 * ea-collapse Vue 组件类型
 */
export type EaCollapseVueComponent = DefineComponent<
  EaCollapseVueProps,
  {},
  {},
  {},
  {
    setActiveNames(value: string | string[]): void;
  },
  {},
  {},
  keyof EaCollapseVueEvents,
  {},
  {},
  EaCollapseVueSlots
>;

/**
 * ea-collapse-item Vue 组件类型
 */
export type EaCollapseItemVueComponent = DefineComponent<
  EaCollapseItemVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaCollapseItemVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-collapse": EaCollapseVueComponent;
    "ea-collapse-item": EaCollapseItemVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-collapse React 组件属性
 */
export interface EaCollapseReactProps extends HTMLAttributes<HTMLElement> {
  accordion?: boolean;
  active?: string | string[];
  expandIconPosition?: "left" | "right";
  beforeCollapse?: (params: {
    name: string;
    el: EaCollapseItemElement;
  }) => boolean | Promise<boolean>;
  /** 切换时的回调 */
  onChange?: (
    event: CustomEvent<{
      name: string;
      target: EaCollapseItemElement;
      active: string | string[];
    }>
  ) => void;
  /** 子元素 */
  children?: ReactNode;
}

/**
 * ea-collapse-item React 组件属性
 */
export interface EaCollapseItemReactProps extends HTMLAttributes<HTMLElement> {
  header?: string;
  name?: string;
  expandIconPosition?: "left" | "right";
  disabled?: boolean;
  active?: boolean;
  /** 子元素 */
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-collapse": EaCollapseReactProps;
      "ea-collapse-item": EaCollapseItemReactProps;
    }
  }
}

export {};
