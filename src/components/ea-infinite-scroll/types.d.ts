// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-infinite-scroll": EaInfiniteScrollElement;
  }
}

/**
 * ea-infinite-scroll 组件的 HTML 接口
 */
export interface EaInfiniteScrollElement extends HTMLElement {
  /** 当前状态 */
  status: "finished" | "loading" | "noMore";
  /** 触发距离 */
  distance: number;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-infinite-scroll Vue 组件属性
 */
export interface EaInfiniteScrollVueProps {
  status?: "finished" | "loading" | "noMore";
  distance?: number;
}

/**
 * ea-infinite-scroll Vue 组件插槽
 */
export interface EaInfiniteScrollVueSlots {
  /** 默认插槽，用于列表内容 */
  default?: () => any;
  /** 加载中插槽 */
  loading?: () => any;
  /** 无更多数据插槽 */
  noMore?: () => any;
}

/**
 * ea-infinite-scroll Vue 组件类型
 */
export type EaInfiniteScrollVueComponent = DefineComponent<
  EaInfiniteScrollVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaInfiniteScrollVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-infinite-scroll": EaInfiniteScrollVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-infinite-scroll React 组件属性
 */
export interface EaInfiniteScrollReactProps extends HTMLAttributes<HTMLElement> {
  status?: "finished" | "loading" | "noMore";
  distance?: number;
  /** 自定义内容 */
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-infinite-scroll": EaInfiniteScrollReactProps;
    }
  }
}

export {};
