// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-input": EaInputElement;
  }
}

/**
 * ea-input 组件的 HTML 接口
 */
export interface EaInputElement extends HTMLElement {
  /** 标签文本 */
  label: string;
  /** 输入类型 */
  type: "textarea" | "text" | "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "time" | "url" | "week";
  /** 输入框尺寸 */
  size: "large" | "default" | "small";
  /** 输入值 */
  value: string;
  /** 是否必填 */
  required: boolean;
  /** 占位符文本 */
  placeholder: string;
  /** 最大长度 */
  maxlength: number | null;
  /** 最小长度 */
  minlength: number | null;
  /** 是否可清空 */
  clearable: boolean;
  /** 清空按钮图标 */
  clearIcon: string;
  /** 是否禁用 */
  disabled: boolean;
  /** 是否显示密码切换按钮 */
  showPassword: boolean;
  /** 前缀图标 */
  prefixIcon: string;
  /** 后缀图标 */
  suffixIcon: string;
  /** 是否显示字数统计 */
  showWordLimit: boolean;
  /** 文本域行数 */
  rows: number;
  /** 是否自动调整高度 */
  autosize: boolean;
  /** 最小行数 */
  minRows: number | null;
  /** 最大行数 */
  maxRows: number | null;
  /** 自动完成设置 */
  autocomplete: "off" | "on" | "name" | "email" | "username" | "new-password" | "current-password" | "one-time-code";
  /** 输入框名称 */
  name: string;
  /** 是否只读 */
  readonly: boolean;
  /** 最大值 */
  max: number | string | null;
  /** 最小值 */
  min: number | string | null;
  /** 步长 */
  step: number | string;
  /** 正则表达式模式 */
  pattern: string | null;
  /** 调整大小方式 */
  resize: "none" | "both" | "horizontal" | "vertical";
  /** 是否自动聚焦 */
  autofocus: boolean;
  /** 关联的表单 */
  form: HTMLFormElement | null;
  /** ARIA 标签 */
  ariaLabel: string | null;
  /** Tab 索引 */
  tabindex: string | null;
  /** 输入模式 */
  inputmode: string;
  
  /** 获取焦点 */
  focus(): void;
  /** 失去焦点 */
  blur(): void;
  /** 清空输入框内容 */
  clear(): void;
  /** 选中输入框内容 */
  select(): void;
  /** 检查表单字段的有效性 */
  checkValidity(): boolean;
  /** 报告表单字段的有效性 */
  reportValidity(): boolean;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-input Vue 组件属性
 */
export interface EaInputVueProps {
  label?: string;
  type?: "textarea" | "text" | "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "time" | "url" | "week";
  size?: "large" | "default" | "small";
  value?: string;
  required?: boolean;
  placeholder?: string;
  maxlength?: number | null;
  minlength?: number | null;
  clearable?: boolean;
  clearIcon?: string;
  disabled?: boolean;
  showPassword?: boolean;
  prefixIcon?: string;
  suffixIcon?: string;
  showWordLimit?: boolean;
  rows?: number;
  autosize?: boolean;
  minRows?: number | null;
  maxRows?: number | null;
  autocomplete?: "off" | "on" | "name" | "email" | "username" | "new-password" | "current-password" | "one-time-code";
  name?: string;
  readonly?: boolean;
  max?: number | string | null;
  min?: number | string | null;
  step?: number | string;
  pattern?: string | null;
  resize?: "none" | "both" | "horizontal" | "vertical";
  autofocus?: boolean;
  form?: HTMLFormElement | null;
  ariaLabel?: string | null;
  tabindex?: string | null;
  inputmode?: string;
}

/**
 * ea-input Vue 组件事件
 */
export interface EaInputVueEvents {
  /** 输入框获得焦点时触发 */
  focus: (event: CustomEvent) => void;
  /** 输入框失去焦点时触发 */
  blur: (event: CustomEvent) => void;
  /** 输入框内容改变时触发 */
  input: (event: CustomEvent<{ value: string }>) => void;
  /** 输入框内容改变时触发 */
  change: (event: CustomEvent<{ value: string }>) => void;
  /** 清空按钮点击时触发 */
  clear: (event: CustomEvent<{ oldValue: string }>) => void;
}

/**
 * ea-input Vue 组件插槽
 */
export interface EaInputVueSlots {
  /** 默认插槽，用于输入框内容 */
  default?: () => any;
  /** 前置内容插槽 */
  prepend?: () => any;
  /** 前置图标插槽 */
  prefix?: () => any;
  /** 后置图标插槽 */
  suffix?: () => any;
  /** 后置内容插槽 */
  append?: () => any;
}

/**
 * ea-input Vue 组件类型
 */
export type EaInputVueComponent = DefineComponent<
  EaInputVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaInputVueEvents,
  {},
  {},
  EaInputVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-input": EaInputVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-input React 组件属性
 */
export interface EaInputReactProps extends HTMLAttributes<HTMLElement> {
  label?: string;
  type?: "textarea" | "text" | "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "time" | "url" | "week";
  size?: "large" | "default" | "small";
  value?: string;
  required?: boolean;
  placeholder?: string;
  maxlength?: number | null;
  minlength?: number | null;
  clearable?: boolean;
  clearIcon?: string;
  disabled?: boolean;
  showPassword?: boolean;
  prefixIcon?: string;
  suffixIcon?: string;
  showWordLimit?: boolean;
  rows?: number;
  autosize?: boolean;
  minRows?: number | null;
  maxRows?: number | null;
  autocomplete?: "off" | "on" | "name" | "email" | "username" | "new-password" | "current-password" | "one-time-code";
  name?: string;
  readonly?: boolean;
  max?: number | string | null;
  min?: number | string | null;
  step?: number | string;
  pattern?: string | null;
  resize?: "none" | "both" | "horizontal" | "vertical";
  autofocus?: boolean;
  form?: HTMLFormElement | null;
  ariaLabel?: string | null;
  tabindex?: string | null;
  inputmode?: string;
  /** 输入框获得焦点时的回调 */
  onFocus?: (event: CustomEvent) => void;
  /** 输入框失去焦点时的回调 */
  onBlur?: (event: CustomEvent) => void;
  /** 输入框内容改变时的回调 */
  onInput?: (event: CustomEvent<{ value: string }>) => void;
  /** 输入框内容改变时的回调 */
  onChange?: (event: CustomEvent<{ value: string }>) => void;
  /** 清空按钮点击时的回调 */
  onClear?: (event: CustomEvent<{ oldValue: string }>) => void;
  /** 自定义内容 */
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-input": EaInputReactProps;
    }
  }
}

export {};