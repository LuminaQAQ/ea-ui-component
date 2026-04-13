// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-row": EaRowElement;
    "ea-col": EaColElement;
  }
}

/**
 * ea-row 组件的 HTML 接口
 */
export interface EaRowElement extends HTMLElement {
  /** 栅格间隔 */
  gutter: number;
  /** flex 布局下的水平排列方式 */
  justify: "start" | "end" | "center" | "space-around" | "space-between" | "space-evenly";
  /** flex 布局下的垂直排列方式 */
  align: "top" | "middle" | "bottom";
  /** 自定义元素标签 */
  tag: string;
}

/**
 * ea-col 组件的 HTML 接口
 */
export interface EaColElement extends HTMLElement {
  /** 栅格占据的列数 */
  span: number;
  /** 栅格左侧的间隔格数 */
  offset: number;
  /** 栅格向右移动格数 */
  push: number;
  /** 栅格向左移动格数 */
  pull: number;
  /** 自定义元素标签 */
  tag: string;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-row Vue 组件属性
 */
export interface EaRowVueProps {
  /** 栅格间隔 */
  gutter?: number;
  /** flex 布局下的水平排列方式 */
  justify?: "start" | "end" | "center" | "space-around" | "space-between" | "space-evenly";
  /** flex 布局下的垂直排列方式 */
  align?: "top" | "middle" | "bottom";
  /** 自定义元素标签 */
  tag?: string;
}

/**
 * ea-col Vue 组件属性
 */
export interface EaColVueProps {
  /** 栅格占据的列数 */
  span?: number;
  /** 栅格左侧的间隔格数 */
  offset?: number;
  /** 栅格向右移动格数 */
  push?: number;
  /** 栅格向左移动格数 */
  pull?: number;
  /** 自定义元素标签 */
  tag?: string;
}

/**
 * ea-row Vue 组件插槽
 */
export interface EaRowVueSlots {
  /** 默认插槽，用于放置 ea-col */
  default?: () => any;
}

/**
 * ea-col Vue 组件插槽
 */
export interface EaColVueSlots {
  /** 默认插槽，用于列内容 */
  default?: () => any;
}

/**
 * ea-row Vue 组件类型
 */
export type EaRowVueComponent = DefineComponent<
  EaRowVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaRowVueSlots
>;

/**
 * ea-col Vue 组件类型
 */
export type EaColVueComponent = DefineComponent<
  EaColVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaColVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-row": EaRowVueComponent;
    "ea-col": EaColVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-row React 组件属性
 */
export interface EaRowReactProps extends HTMLAttributes<HTMLElement> {
  /** 栅格间隔 */
  gutter?: number;
  /** flex 布局下的水平排列方式 */
  justify?: "start" | "end" | "center" | "space-around" | "space-between" | "space-evenly";
  /** flex 布局下的垂直排列方式 */
  align?: "top" | "middle" | "bottom";
  /** 自定义元素标签 */
  tag?: string;
  /** 子元素 */
  children?: ReactNode;
}

/**
 * ea-col React 组件属性
 */
export interface EaColReactProps extends HTMLAttributes<HTMLElement> {
  /** 栅格占据的列数 */
  span?: number;
  /** 栅格左侧的间隔格数 */
  offset?: number;
  /** 栅格向右移动格数 */
  push?: number;
  /** 栅格向左移动格数 */
  pull?: number;
  /** 自定义元素标签 */
  tag?: string;
  /** 子元素 */
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-row": EaRowReactProps;
      "ea-col": EaColReactProps;
    }
  }
}

export {};
