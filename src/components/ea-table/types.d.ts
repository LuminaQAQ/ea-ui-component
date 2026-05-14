// ==================== HTML 全局类型声明 ====================

declare global {
  interface HTMLElementTagNameMap {
    "ea-table": EaTableElement;
    "ea-table-column": EaTableColumnElement;
  }
}

/**
 * ea-table 组件的 HTML 接口
 */
export interface EaTableElement extends HTMLElement {
  /** 是否为斑马纹表格 */
  stripe: boolean;
  /** 是否为带边框表格 */
  border: boolean;
  /** 表格高度 */
  height: string;
  /** 表格最大高度 */
  maxHeight: string;
  /** 是否高亮当前行 */
  highlightCurrentRow: boolean;
  /** 是否显示合计行 */
  showSummary: boolean;
  /** 表格数据 */
  data: unknown[];
  /** 行是否可选的判断函数 */
  selectable: ((row: unknown) => boolean) | null;
  /** 自定义索引方法 */
  indexMethod: ((index: number) => number) | null;
  /** 自定义合计方法 */
  summaryMethod: ((param: { columns: unknown[]; data: unknown[] }) => (string | number)[]) | null;

  /** 设置表格数据 */
  setData(dataSource: unknown[]): Promise<void>;
  /** 排序 */
  sort(prop: string, order?: "asc" | "desc"): void;
  /** 设置行样式 */
  setRowStylePart(handler: ((param: { row: unknown; rowIndex: number }) => string) | string): void;
  /** 获取当前行数据 */
  getCurrentRow(): { target: HTMLTableRowElement | null; value: unknown };
  /** 设置当前行数据 */
  setCurrentRow(row?: unknown): void;
  /** 切换行选择状态 */
  toggleRowSelection(row: unknown, selected?: boolean, ignoreSelectable?: boolean): void;
  /** 清空选择 */
  clearSelection(): void;
}

/**
 * ea-table-column 组件的 HTML 接口
 */
export interface EaTableColumnElement extends HTMLElement {
  /** 列类型 */
  type: string;
  /** 对齐方式 */
  align: string;
  /** 列标签 */
  label: string;
  /** 列属性名 */
  prop: string;
  /** 列跨度 */
  colspan: number | undefined;
  /** 列宽度 */
  width: string;
  /** 是否可排序 */
  sortable: boolean;
  /** 固定列 */
  fixed: string;
  /** 额外选项 */
  option: Record<string, unknown>;
}

// ==================== Vue 类型声明 ====================

import type { DefineComponent } from "vue";

/**
 * ea-table Vue 组件属性
 */
export interface EaTableVueProps {
  stripe?: boolean;
  border?: boolean;
  height?: string;
  maxHeight?: string;
  highlightCurrentRow?: boolean;
  showSummary?: boolean;
  data?: unknown[];
  selectable?: ((row: unknown) => boolean) | null;
  indexMethod?: ((index: number) => number) | null;
  summaryMethod?: ((param: { columns: unknown[]; data: unknown[] }) => (string | number)[]) | null;
}

/**
 * ea-table-column Vue 组件属性
 */
export interface EaTableColumnVueProps {
  type?: string;
  align?: string;
  label?: string;
  prop?: string;
  colspan?: number;
  width?: string;
  sortable?: boolean;
  fixed?: string;
  option?: Record<string, unknown>;
}

/**
 * ea-table Vue 组件事件
 */
export interface EaTableVueEvents {
  /** 行点击时触发 */
  "row-click": (event: CustomEvent) => void;
  /** 单元格点击时触发 */
  "cell-click": (event: CustomEvent) => void;
  /** 当前行变化时触发 */
  "current-change": (event: CustomEvent) => void;
  /** 选择变化时触发 */
  "selection-change": (event: CustomEvent) => void;
  /** 排序变化时触发 */
  "sort-change": (event: CustomEvent) => void;
  /** 表头点击时触发 */
  "header-click": (event: CustomEvent) => void;
  /** 数据渲染完成时触发 */
  "data-rendered": (event: CustomEvent) => void;
}

/**
 * ea-table Vue 组件插槽
 */
export interface EaTableVueSlots {
  /** 默认插槽，用于放置 ea-table-column */
  default?: () => any;
  /** 空数据插槽 */
  empty?: () => any;
}

/**
 * ea-table-column Vue 组件插槽
 */
export interface EaTableColumnVueSlots {
  /** 默认插槽，用于自定义列模板 */
  default?: () => any;
  /** 表头插槽 */
  header?: () => any;
}

/**
 * ea-table Vue 组件类型
 */
export type EaTableVueComponent = DefineComponent<
  EaTableVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaTableVueEvents,
  {},
  {},
  EaTableVueSlots
>;

/**
 * ea-table-column Vue 组件类型
 */
export type EaTableColumnVueComponent = DefineComponent<
  EaTableColumnVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  EaTableColumnVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-table": EaTableVueComponent;
    "ea-table-column": EaTableColumnVueComponent;
  }
}

// ==================== React 类型声明 ====================

import type { HTMLAttributes, ReactNode } from "react";

/**
 * ea-table React 组件属性
 */
export interface EaTableReactProps extends HTMLAttributes<HTMLElement> {
  stripe?: boolean;
  border?: boolean;
  height?: string;
  maxHeight?: string;
  highlightCurrentRow?: boolean;
  showSummary?: boolean;
  data?: unknown[];
  selectable?: ((row: unknown) => boolean) | null;
  indexMethod?: ((index: number) => number) | null;
  summaryMethod?: ((param: { columns: unknown[]; data: unknown[] }) => (string | number)[]) | null;
  /** 行点击时的回调 */
  onRowClick?: (event: CustomEvent) => void;
  /** 单元格点击时的回调 */
  onCellClick?: (event: CustomEvent) => void;
  /** 当前行变化时的回调 */
  onCurrentChange?: (event: CustomEvent) => void;
  /** 选择变化时的回调 */
  onSelectionChange?: (event: CustomEvent) => void;
  /** 排序变化时的回调 */
  onSortChange?: (event: CustomEvent) => void;
  /** 表头点击时的回调 */
  onHeaderClick?: (event: CustomEvent) => void;
  /** 自定义内容 */
  children?: ReactNode;
}

/**
 * ea-table-column React 组件属性
 */
export interface EaTableColumnReactProps extends HTMLAttributes<HTMLElement> {
  type?: string;
  align?: string;
  label?: string;
  prop?: string;
  colspan?: number;
  width?: string;
  sortable?: boolean;
  fixed?: string;
  option?: Record<string, unknown>;
  /** 自定义内容 */
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-table": EaTableReactProps;
      "ea-table-column": EaTableColumnReactProps;
    }
  }
}

export {};