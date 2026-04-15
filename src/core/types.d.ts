// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-form-associated-base": EaFormAssociatedBaseElement;
  }
}

/**
 * ea-form-associated-base 组件的 HTML 接口
 */
export interface EaFormAssociatedBaseElement extends HTMLElement {
  /** 字段名称 */
  name: string;
  /** 字段值 */
  value: string;
  /** 禁用状态 */
  disabled: boolean;
  /** 必填状态 */
  required: boolean;
  /** 最小长度 */
  minlength: number;
  /** 最大长度 */
  maxlength: number;
  /** 最小值 */
  min: number;
  /** 最大值 */
  max: number;
  /** 模式匹配 */
  pattern: string;
  /** 内部验证消息（只读） */
  readonly internalValidationMessage: string;
  /** 自定义验证消息 */
  customValidationMessage: string;
  /** 关联的表单元素 */
  readonly form: HTMLFormElement | null;
  /** 组件类型 */
  readonly type: string;
  /** 验证状态 */
  readonly validity: ValidityState | null;
  /** 是否将参与验证 */
  readonly willValidate: boolean;
  /** 关联的标签元素列表 */
  readonly labels: NodeListOf<HTMLLabelElement> | null;

  /**
   * 获取关联的表单元素
   * @returns 表单元素或 null
   */
  getForm(): HTMLFormElement | null;

  /**
   * 设置表单值
   * @param value - 表单值
   */
  setValue(value: string | File | FormData | null): void;

  /**
   * 移除表单值
   */
  removeValue(): void;

  /**
   * 更新表单验证状态
   */
  updateValidity(): void;

  /**
   * 检查表单字段是否有效
   * @returns 如果字段有效返回 true，否则返回 false
   */
  checkValidity(): boolean;

  /**
   * 报告表单字段的验证状态
   * @returns 如果字段有效返回 true，否则返回 false
   */
  reportValidity(): boolean;

  /**
   * 设置自定义验证错误消息
   * @param flags - 验证状态标志
   * @param message - 自定义错误消息
   */
  setValidity(flags?: Record<string, boolean>, message?: string): void;

  /**
   * 设置自定义验证错误消息
   * @param message - 自定义错误消息，空字符串表示清除错误
   */
  setCustomValidity(message: string): void;

  /**
   * 重置自定义验证错误消息
   */
  resetCustomValidity(): void;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-form-associated-base Vue 组件属性
 */
export interface EaFormAssociatedBaseVueProps {
  /** 字段名称 */
  name?: string;
  /** 字段值 */
  value?: string;
  /** 禁用状态 */
  disabled?: boolean;
  /** 必填状态 */
  required?: boolean;
  /** 最小长度 */
  minlength?: number;
  /** 最大长度 */
  maxlength?: number;
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
  /** 模式匹配 */
  pattern?: string;
  /** 自定义验证消息 */
  customValidationMessage?: string;
}

/**
 * ea-form-associated-base Vue 组件类型
 */
export type EaFormAssociatedBaseVueComponent = DefineComponent<
  EaFormAssociatedBaseVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {}
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-form-associated-base": EaFormAssociatedBaseVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes } from "react";

/**
 * ea-form-associated-base React 组件属性
 */
export interface EaFormAssociatedBaseReactProps extends HTMLAttributes<HTMLElement> {
  /** 字段名称 */
  name?: string;
  /** 字段值 */
  value?: string;
  /** 禁用状态 */
  disabled?: boolean;
  /** 必填状态 */
  required?: boolean;
  /** 最小长度 */
  minlength?: number;
  /** 最大长度 */
  maxlength?: number;
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
  /** 模式匹配 */
  pattern?: string;
  /** 自定义验证消息 */
  customValidationMessage?: string;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-form-associated-base": EaFormAssociatedBaseReactProps;
    }
  }
}

export {};
