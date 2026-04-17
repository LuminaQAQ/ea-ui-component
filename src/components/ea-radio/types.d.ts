// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-radio": EaRadioElement;
    "ea-radio-group": EaRadioGroupElement;
  }
}

/**
 * ea-radio 组件的 HTML 接口
 */
export interface EaRadioElement extends HTMLElement {
  /** 绑定的组名（提交或选择时的分组依据） */
  name: string;
  /** 选项的值 */
  value: string;
  /** 是否禁用 */
  disabled: boolean;
  /** 是否选中 */
  checked: boolean;
  /** 选项的显示文本 */
  label: string;
  /** 是否显示边框样式 */
  border: boolean;
  /** 组件尺寸 */
  size: "" | "large" | "default" | "small";
}

/**
 * ea-radio-group 组件的 HTML 接口
 */
export interface EaRadioGroupElement extends HTMLElement {
  /** 组名（表单提交时使用） */
  name: string;
  /** 当前选中值 */
  value: string;
  /** 是否整体禁用 */
  disabled: boolean;
  /** 组件尺寸 */
  size: "large" | "default" | "small";
  /** 是否显示边框样式 */
  border: boolean;
  /** 是否必填 */
  required: boolean;
  /** 表单标签文本 */
  label: string;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-radio Vue 组件属性
 */
export interface EaRadioVueProps {
  name?: string;
  value?: string;
  disabled?: boolean;
  checked?: boolean;
  label?: string;
  border?: boolean;
  size?: "" | "large" | "default" | "small";
}

/**
 * ea-radio-group Vue 组件属性
 */
export interface EaRadioGroupVueProps {
  name?: string;
  value?: string;
  disabled?: boolean;
  size?: "large" | "default" | "small";
  border?: boolean;
  required?: boolean;
  label?: string;
}

/**
 * ea-radio Vue 组件事件
 */
export interface EaRadioVueEvents {
  /** 选中值变化时触发 */
  change: (event: CustomEvent) => void;
}

/**
 * ea-radio-group Vue 组件事件
 */
export interface EaRadioGroupVueEvents {
  /** 组内选中值变化时触发 */
  change: (event: CustomEvent) => void;
}

/**
 * ea-radio Vue 组件插槽
 */
export interface EaRadioVueSlots {
  /** 默认插槽，用于选项内容（label） */
  default?: () => any;
}

/**
 * ea-radio-group Vue 组件插槽
 */
export interface EaRadioGroupVueSlots {
  /** 默认插槽，用于放置 ea-radio 子节点 */
  default?: () => any;
}

/**
 * ea-radio Vue 组件类型
 */
export type EaRadioVueComponent = DefineComponent<
  EaRadioVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaRadioVueEvents,
  {},
  {},
  EaRadioVueSlots
>;

/**
 * ea-radio-group Vue 组件类型
 */
export type EaRadioGroupVueComponent = DefineComponent<
  EaRadioGroupVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaRadioGroupVueEvents,
  {},
  {},
  EaRadioGroupVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-radio": EaRadioVueComponent;
    "ea-radio-group": EaRadioGroupVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-radio React 组件属性
 */
export interface EaRadioReactProps extends HTMLAttributes<HTMLElement> {
  name?: string;
  value?: string;
  disabled?: boolean;
  checked?: boolean;
  label?: string;
  border?: boolean;
  size?: "" | "large" | "default" | "small";
  /** 选中值变化时的回调 */
  onChange?: (event: CustomEvent) => void;
  /** 选项内容 */
  children?: ReactNode;
}

/**
 * ea-radio-group React 组件属性
 */
export interface EaRadioGroupReactProps extends HTMLAttributes<HTMLElement> {
  name?: string;
  value?: string;
  disabled?: boolean;
  size?: "large" | "default" | "small";
  border?: boolean;
  required?: boolean;
  label?: string;
  /** 组内选中值变化时的回调 */
  onChange?: (event: CustomEvent) => void;
  /** 子节点 */
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-radio": EaRadioReactProps;
      "ea-radio-group": EaRadioGroupReactProps;
    }
  }
}

export {};
