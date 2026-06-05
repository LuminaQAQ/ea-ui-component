import type { EaSplitterPanelResizeStartEvent } from "./components/ea-splitter/events/EaSplitterPanelResizeStartEvent";
import type { EaSplitterPanelResizeEvent } from "./components/ea-splitter/events/EaSplitterPanelResizeEvent";
import type { EaSplitterPanelResizeEndEvent } from "./components/ea-splitter/events/EaSplitterPanelResizeEndEvent";

// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-splitter": EaSplitterElement;
    "ea-splitter-panel": EaSplitterPanelElement;
    "ea-splitter-bar": EaSplitterBarElement;
  }
}

/**
 * ea-splitter 组件的 HTML 接口
 */
export interface EaSplitterElement extends HTMLElement {
  /** 分隔面板的布局方向 */
  layout: "horizontal" | "vertical";

  addEventListener(
    type: "ea-panel-resize-start",
    listener: (event: EaSplitterPanelResizeStartEvent) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: "ea-panel-resize",
    listener: (event: EaSplitterPanelResizeEvent) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: "ea-panel-resize-end",
    listener: (event: EaSplitterPanelResizeEndEvent) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;
}

/**
 * ea-splitter-panel 组件的 HTML 接口
 */
export interface EaSplitterPanelElement extends HTMLElement {
  /** 面板大小(像素或百分比) */
  size: string;
  /** 面板最小尺寸(像素或百分比) */
  min: string;
  /** 布局方向 */
  layout: "horizontal" | "vertical";
}

/**
 * ea-splitter-bar 组件的 HTML 接口
 */
export interface EaSplitterBarElement extends HTMLElement {
  /** 布局方向 */
  layout: "horizontal" | "vertical";
  /** 可访问名称 */
  label: string;
  /** 键盘步进步长（像素） */
  step: number;
  /** 当前值（主面板占比百分比） */
  valuenow: number;
  /** 最小值 */
  valuemin: number;
  /** 最大值 */
  valuemax: number;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-splitter Vue 组件属性
 */
export interface EaSplitterVueProps {
  /** 分隔面板的布局方向 */
  layout?: "horizontal" | "vertical";
}

/**
 * ea-splitter-panel Vue 组件属性
 */
export interface EaSplitterPanelVueProps {
  /** 面板大小(像素或百分比) */
  size?: string;
  /** 面板最小尺寸(像素或百分比) */
  min?: string;
  /** 布局方向 */
  layout?: "horizontal" | "vertical";
}

/**
 * ea-splitter-bar Vue 组件属性
 */
export interface EaSplitterBarVueProps {
  /** 布局方向 */
  layout?: "horizontal" | "vertical";
  /** 可访问名称 */
  label?: string;
  /** 键盘步进步长（像素） */
  step?: number;
}

/**
 * ea-splitter Vue 组件事件
 */
export interface EaSplitterVueEvents {
  /** 开始调整面板大小时触发 */
  "ea-panel-resize-start": (event: EaSplitterPanelResizeStartEvent) => void;
  /** 调整面板大小时触发 */
  "ea-panel-resize": (event: EaSplitterPanelResizeEvent) => void;
  /** 面板调整大小结束时触发 */
  "ea-panel-resize-end": (event: EaSplitterPanelResizeEndEvent) => void;
}

/**
 * ea-splitter Vue 组件插槽
 */
export interface EaSplitterVueSlots {
  /** 默认插槽，用于放置 ea-splitter-panel */
  default?: () => any;
}

/**
 * ea-splitter-panel Vue 组件插槽
 */
export interface EaSplitterPanelVueSlots {
  /** 默认插槽，用于面板内容 */
  default?: () => any;
}

/**
 * ea-splitter-bar Vue 组件插槽
 */
export interface EaSplitterBarVueSlots {
  /** 默认插槽 */
  default?: () => any;
}

/**
 * ea-splitter Vue 组件类型
 */
export type EaSplitterVueComponent = DefineComponent<
  EaSplitterVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaSplitterVueEvents,
  {},
  {},
  EaSplitterVueSlots
>;

/**
 * ea-splitter-panel Vue 组件类型
 */
export type EaSplitterPanelVueComponent = DefineComponent<
  EaSplitterPanelVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaSplitterPanelVueSlots
>;

/**
 * ea-splitter-bar Vue 组件类型
 */
export type EaSplitterBarVueComponent = DefineComponent<
  EaSplitterBarVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaSplitterBarVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-splitter": EaSplitterVueComponent;
    "ea-splitter-panel": EaSplitterPanelVueComponent;
    "ea-splitter-bar": EaSplitterBarVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-splitter React 组件属性
 */
export interface EaSplitterReactProps extends HTMLAttributes<HTMLElement> {
  /** 分隔面板的布局方向 */
  layout?: "horizontal" | "vertical";
  /** 开始调整面板大小时触发 */
  onEaPanelResizeStart?: (event: EaSplitterPanelResizeStartEvent) => void;
  /** 调整面板大小时触发 */
  onEaPanelResize?: (event: EaSplitterPanelResizeEvent) => void;
  /** 面板调整大小结束时触发 */
  onEaPanelResizeEnd?: (event: EaSplitterPanelResizeEndEvent) => void;
  /** 子元素 */
  children?: ReactNode;
}

/**
 * ea-splitter-panel React 组件属性
 */
export interface EaSplitterPanelReactProps extends HTMLAttributes<HTMLElement> {
  /** 面板大小(像素或百分比) */
  size?: string;
  /** 面板最小尺寸(像素或百分比) */
  min?: string;
  /** 布局方向 */
  layout?: "horizontal" | "vertical";
  /** 子元素 */
  children?: ReactNode;
}

/**
 * ea-splitter-bar React 组件属性
 */
export interface EaSplitterBarReactProps extends HTMLAttributes<HTMLElement> {
  /** 布局方向 */
  layout?: "horizontal" | "vertical";
  /** 可访问名称 */
  label?: string;
  /** 键盘步进步长（像素） */
  step?: number;
  /** 子元素 */
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-splitter": EaSplitterReactProps;
      "ea-splitter-panel": EaSplitterPanelReactProps;
      "ea-splitter-bar": EaSplitterBarReactProps;
    }
  }
}

export {};
