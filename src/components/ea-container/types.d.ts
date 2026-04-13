// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-container": EaContainerElement;
    "ea-header": EaHeaderElement;
    "ea-main": EaMainElement;
    "ea-footer": EaFooterElement;
    "ea-aside": EaAsideElement;
  }
}

/**
 * ea-container 组件的 HTML 接口
 */
export interface EaContainerElement extends HTMLElement {
  /** 布局方向 */
  direction: "horizontal" | "vertical";
}

/**
 * ea-header 组件的 HTML 接口
 */
export interface EaHeaderElement extends HTMLElement {
  /** 高度 */
  height: string;
}

/**
 * ea-main 组件的 HTML 接口
 */
export interface EaMainElement extends HTMLElement {}

/**
 * ea-footer 组件的 HTML 接口
 */
export interface EaFooterElement extends HTMLElement {
  /** 高度 */
  height: string;
}

/**
 * ea-aside 组件的 HTML 接口
 */
export interface EaAsideElement extends HTMLElement {
  /** 宽度 */
  width: string;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-container Vue 组件属性
 */
export interface EaContainerVueProps {
  direction?: "horizontal" | "vertical";
}

/**
 * ea-header Vue 组件属性
 */
export interface EaHeaderVueProps {
  height?: string;
}

/**
 * ea-main Vue 组件属性
 */
export interface EaMainVueProps {}

/**
 * ea-footer Vue 组件属性
 */
export interface EaFooterVueProps {
  height?: string;
}

/**
 * ea-aside Vue 组件属性
 */
export interface EaAsideVueProps {
  width?: string;
}

/**
 * ea-container Vue 组件类型
 */
export type EaContainerVueComponent = DefineComponent<EaContainerVueProps>;

/**
 * ea-header Vue 组件类型
 */
export type EaHeaderVueComponent = DefineComponent<EaHeaderVueProps>;

/**
 * ea-main Vue 组件类型
 */
export type EaMainVueComponent = DefineComponent<EaMainVueProps>;

/**
 * ea-footer Vue 组件类型
 */
export type EaFooterVueComponent = DefineComponent<EaFooterVueProps>;

/**
 * ea-aside Vue 组件类型
 */
export type EaAsideVueComponent = DefineComponent<EaAsideVueProps>;

declare module "vue" {
  interface GlobalComponents {
    "ea-container": EaContainerVueComponent;
    "ea-header": EaHeaderVueComponent;
    "ea-main": EaMainVueComponent;
    "ea-footer": EaFooterVueComponent;
    "ea-aside": EaAsideVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-container React 组件属性
 */
export interface EaContainerReactProps extends HTMLAttributes<HTMLElement> {
  direction?: "horizontal" | "vertical";
  /** 子元素 */
  children?: ReactNode;
}

/**
 * ea-header React 组件属性
 */
export interface EaHeaderReactProps extends HTMLAttributes<HTMLElement> {
  height?: string;
  /** 子元素 */
  children?: ReactNode;
}

/**
 * ea-main React 组件属性
 */
export interface EaMainReactProps extends HTMLAttributes<HTMLElement> {
  /** 子元素 */
  children?: ReactNode;
}

/**
 * ea-footer React 组件属性
 */
export interface EaFooterReactProps extends HTMLAttributes<HTMLElement> {
  height?: string;
  /** 子元素 */
  children?: ReactNode;
}

/**
 * ea-aside React 组件属性
 */
export interface EaAsideReactProps extends HTMLAttributes<HTMLElement> {
  width?: string;
  /** 子元素 */
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-container": EaContainerReactProps;
      "ea-header": EaHeaderReactProps;
      "ea-main": EaMainReactProps;
      "ea-footer": EaFooterReactProps;
      "ea-aside": EaAsideReactProps;
    }
  }
}

export {};
