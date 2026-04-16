// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-select": EaSelectElement;
    "ea-option": EaOptionElement;
    "ea-option-group": EaOptionGroupElement;
  }
}

/**
 * ea-select 组件的 HTML 接口
 */
export interface EaSelectElement extends HTMLElement {
  /** 标签文本 */
  label: string;
  /** 表单字段名称 */
  name: string;
  /** 占位符文本 */
  placeholder: string;
  /** 是否禁用 */
  disabled: boolean;
  /** 是否可清空 */
  clearable: boolean;
  /** 选择器尺寸 */
  size: "large" | "default" | "small";
  /** 是否多选 */
  multiple: boolean;
  /** 是否折叠标签 */
  collapseTags: boolean;
  /** 最大折叠标签数量 */
  maxCollapseTags: number;
  /** 是否可筛选 */
  filterable: boolean;
  /** 当前选中的值 */
  value: string | number | boolean | (string | number | boolean)[];
  /** 是否必填 */
  required: boolean;
  /** 显示下拉框 */
  show(): void;
  /** 隐藏下拉框 */
  hide(): void;
}

/**
 * ea-option 组件的 HTML 接口
 */
export interface EaOptionElement extends HTMLElement {
  /** 选项值 */
  value: string | number | boolean;
  /** 选项标签文本 */
  label: string;
  /** 是否禁用 */
  disabled: boolean;
  /** 是否选中 */
  selected: boolean;
}

/**
 * ea-option-group 组件的 HTML 接口
 */
export interface EaOptionGroupElement extends HTMLElement {
  /** 分组标签 */
  label: string;
  /** 是否禁用 */
  disabled: boolean;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-select Vue 组件属性
 */
export interface EaSelectVueProps {
  label?: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  size?: "large" | "default" | "small";
  multiple?: boolean;
  collapseTags?: boolean;
  maxCollapseTags?: number;
  filterable?: boolean;
  value?: string | number | boolean | (string | number | boolean)[];
  required?: boolean;
}

/**
 * ea-option Vue 组件属性
 */
export interface EaOptionVueProps {
  value?: string | number | boolean;
  label?: string;
  disabled?: boolean;
  selected?: boolean;
}

/**
 * ea-option-group Vue 组件属性
 */
export interface EaOptionGroupVueProps {
  label?: string;
  disabled?: boolean;
}

/**
 * ea-select Vue 组件事件
 */
export interface EaSelectVueEvents {
  /** 值改变时触发 */
  change: (
    event: CustomEvent<{
      value: string | number | boolean | (string | number | boolean)[];
    }>
  ) => void;
  /** 下拉框显示/隐藏时触发 */
  "visible-change": (event: CustomEvent<{ visible: boolean }>) => void;
  /** 清除值时触发 */
  clear: (event: CustomEvent) => void;
  /** 移除标签时触发 */
  "remove-tag": (
    event: CustomEvent<{ tag: HTMLElement; tagValue: string }>
  ) => void;
}

/**
 * ea-option Vue 组件事件
 */
export interface EaOptionVueEvents {
  /** 点击选项时触发 */
  click: (event: CustomEvent<{ target: EaOptionElement }>) => void;
}

/**
 * ea-select Vue 组件插槽
 */
export interface EaSelectVueSlots {
  /** 默认插槽，用于放置 ea-option 或 ea-option-group */
  default?: () => any;
  /** 前缀插槽 */
  prefix?: () => any;
  /** 后缀插槽 */
  suffix?: () => any;
}

/**
 * ea-option Vue 组件插槽
 */
export interface EaOptionVueSlots {
  /** 默认插槽，用于选项内容 */
  default?: () => any;
}

/**
 * ea-option-group Vue 组件插槽
 */
export interface EaOptionGroupVueSlots {
  /** 默认插槽，用于放置 ea-option */
  default?: () => any;
}

/**
 * ea-select Vue 组件类型
 */
export type EaSelectVueComponent = DefineComponent<
  EaSelectVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaSelectVueEvents,
  {},
  {},
  EaSelectVueSlots
>;

/**
 * ea-option Vue 组件类型
 */
export type EaOptionVueComponent = DefineComponent<
  EaOptionVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaOptionVueEvents,
  {},
  {},
  EaOptionVueSlots
>;

/**
 * ea-option-group Vue 组件类型
 */
export type EaOptionGroupVueComponent = DefineComponent<
  EaOptionGroupVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaOptionGroupVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-select": EaSelectVueComponent;
    "ea-option": EaOptionVueComponent;
    "ea-option-group": EaOptionGroupVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-select React 组件属性
 */
export interface EaSelectReactProps extends HTMLAttributes<HTMLElement> {
  label?: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  size?: "large" | "default" | "small";
  multiple?: boolean;
  collapseTags?: boolean;
  maxCollapseTags?: number;
  filterable?: boolean;
  value?: string | number | boolean | (string | number | boolean)[];
  required?: boolean;
  /** 值改变时的回调 */
  onChange?: (
    event: CustomEvent<{
      value: string | number | boolean | (string | number | boolean)[];
    }>
  ) => void;
  /** 下拉框显示/隐藏时的回调 */
  onVisibleChange?: (event: CustomEvent<{ visible: boolean }>) => void;
  /** 清除值时的回调 */
  onClear?: (event: CustomEvent) => void;
  /** 移除标签时的回调 */
  onRemoveTag?: (
    event: CustomEvent<{ tag: HTMLElement; tagValue: string }>
  ) => void;
  /** 自定义内容 */
  children?: ReactNode;
}

/**
 * ea-option React 组件属性
 */
export interface EaOptionReactProps extends HTMLAttributes<HTMLElement> {
  value?: string | number | boolean;
  label?: string;
  disabled?: boolean;
  selected?: boolean;
  /** 点击选项时的回调 */
  onClick?: (event: CustomEvent<{ target: EaOptionElement }>) => void;
  /** 选项内容 */
  children?: ReactNode;
}

/**
 * ea-option-group React 组件属性
 */
export interface EaOptionGroupReactProps extends HTMLAttributes<HTMLElement> {
  label?: string;
  disabled?: boolean;
  /** 自定义内容 */
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-select": EaSelectReactProps;
      "ea-option": EaOptionReactProps;
      "ea-option-group": EaOptionGroupReactProps;
    }
  }
}

export {};
