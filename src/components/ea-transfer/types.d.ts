// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-transfer": EaTransferElement;
    "ea-transfer-panel": EaTransferPanelElement;
  }
}

/**
 * ea-transfer 组件的 HTML 接口
 */
export interface EaTransferElement extends HTMLElement {
  /** 是否禁用 */
  disabled: boolean;
  /** 是否可搜索 */
  filterable: boolean;
  /** 搜索框占位符 */
  filterPlaceholder: string;
  /** 穿梭框数据 */
  data: any[];
  /** 右侧面板中的值（已选中项） */
  value: any[];
  /** 数据字段映射 */
  dataProps: Record<string, string>;
  /** 面板标题，长度为 2 的数组 */
  titles: string[];
  /** 按钮文本，长度为 2 的数组 */
  buttonTexts: string[];
  /** 自定义筛选方法 */
  filterMethod: ((query: string, item: any) => boolean) | null;
  /** 左侧面板默认选中项 */
  leftDefaultChecked: any[];
  /** 右侧面板默认选中项 */
  rightDefaultChecked: any[];

  /** 清空面板搜索内容 */
  clearQuery(which: "left" | "right"): void;
  /** 检查表单字段的有效性 */
  checkValidity(): boolean;
  /** 报告表单字段的有效性（显示验证提示） */
  reportValidity(): boolean;
}

/**
 * ea-transfer-panel 组件的 HTML 接口
 */
export interface EaTransferPanelElement extends HTMLElement {
  /** 面板标题 */
  dataTitle: string;
  /** 面板类型 */
  type: "source" | "target";
  /** 是否可搜索 */
  filterable: boolean;
  /** 搜索框占位符 */
  filterPlaceholder: string;
  /** 数据列表 */
  data: HTMLElement[];
  /** 自定义筛选方法 */
  filterMethod: ((query: string, item: any) => boolean) | null;
  /** 数据字段映射 */
  dataProps: Record<string, string>;
  /** 数据映射表 */
  dataMap: Map<any, any>;

  /** 清空列表项 */
  clearList(): void;
  /** 清空搜索关键词 */
  clearQuery(): void;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-transfer Vue 组件属性
 */
export interface EaTransferVueProps {
  disabled?: boolean;
  filterable?: boolean;
  filterPlaceholder?: string;
  data?: any[];
  value?: any[];
  dataProps?: Record<string, string>;
  titles?: string[];
  buttonTexts?: string[];
  filterMethod?: ((query: string, item: any) => boolean) | null;
  leftDefaultChecked?: any[];
  rightDefaultChecked?: any[];
}

/**
 * ea-transfer-panel Vue 组件属性
 */
export interface EaTransferPanelVueProps {
  dataTitle?: string;
  type?: "source" | "target";
  filterable?: boolean;
  filterPlaceholder?: string;
  data?: HTMLElement[];
  filterMethod?: ((query: string, item: any) => boolean) | null;
  dataProps?: Record<string, string>;
  dataMap?: Map<any, any>;
}

/**
 * ea-transfer Vue 组件事件
 */
export interface EaTransferVueEvents {
  /** 右侧面板值改变时触发 */
  change: (event: CustomEvent<{ value: any[] }>) => void;
  /** 左侧面板选中项改变时触发 */
  "ea-left-check-change": (event: CustomEvent<{ value: any[]; movedKeys: any[] }>) => void;
  /** 右侧面板选中项改变时触发 */
  "ea-right-check-change": (event: CustomEvent<{ value: any[]; movedKeys: any[] }>) => void;
}

/**
 * ea-transfer Vue 组件插槽 */
export interface EaTransferVueSlots {
  /** 左侧面板空状态插槽 */
  "left-empty"?: () => any;
  /** 左侧面板底部插槽 */
  "left-footer"?: () => any;
  /** 右侧面板空状态插槽 */
  "right-empty"?: () => any;
  /** 右侧面板底部插槽 */
  "right-footer"?: () => any;
}

/**
 * ea-transfer Vue 组件类型
 */
export type EaTransferVueComponent = DefineComponent<
  EaTransferVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaTransferVueEvents,
  {},
  {},
  EaTransferVueSlots
>;

/**
 * ea-transfer-panel Vue 组件类型
 */
export type EaTransferPanelVueComponent = DefineComponent<
  EaTransferPanelVueProps,
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
    "ea-transfer": EaTransferVueComponent;
    "ea-transfer-panel": EaTransferPanelVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-transfer React 组件属性
 */
export interface EaTransferReactProps extends HTMLAttributes<HTMLElement> {
  disabled?: boolean;
  filterable?: boolean;
  filterPlaceholder?: string;
  data?: any[];
  value?: any[];
  dataProps?: Record<string, string>;
  titles?: string[];
  buttonTexts?: string[];
  filterMethod?: ((query: string, item: any) => boolean) | null;
  leftDefaultChecked?: any[];
  rightDefaultChecked?: any[];
  /** 右侧面板值改变时的回调 */
  onChange?: (event: CustomEvent<{ value: any[] }>) => void;
  /** 左侧面板选中项改变时的回调 */
  onEaLeftCheckChange?: (event: CustomEvent<{ value: any[]; movedKeys: any[] }>) => void;
  /** 右侧面板选中项改变时的回调 */
  onEaRightCheckChange?: (event: CustomEvent<{ value: any[]; movedKeys: any[] }>) => void;
  /** 左侧面板空内容 */
  "left-empty"?: ReactNode;
  /** 左侧面板底部内容 */
  "left-footer"?: ReactNode;
  /** 右侧面板空内容 */
  "right-empty"?: ReactNode;
  /** 右侧面板底部内容 */
  "right-footer"?: ReactNode;
}

/**
 * ea-transfer-panel React 组件属性
 */
export interface EaTransferPanelReactProps extends HTMLAttributes<HTMLElement> {
  dataTitle?: string;
  type?: "source" | "target";
  filterable?: boolean;
  filterPlaceholder?: string;
  data?: HTMLElement[];
  filterMethod?: ((query: string, item: any) => boolean) | null;
  dataProps?: Record<string, string>;
  dataMap?: Map<any, any>;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-transfer": EaTransferReactProps;
      "ea-transfer-panel": EaTransferPanelReactProps;
    }
  }
}

export {};