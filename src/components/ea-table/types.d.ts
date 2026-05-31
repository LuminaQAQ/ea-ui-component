import type { EaTableCellClickEvent } from "./events/EaTableCellClickEvent";
import type { EaTableCellContextmenuEvent } from "./events/EaTableCellContextmenuEvent";
import type { EaTableCellDBLClickEvent } from "./events/EaTableCellDBLClickEvent";
import type { EaTableCellMouseEnterEvent } from "./events/EaTableMouseEnterEvent";
import type { EaTableCellMouseLeaveEvent } from "./events/EaTableCellMouseLeaveEvent";
import type { EaTableCurrentChangeEvent } from "./events/EaTableCurrentChangeEvent";
import type { EaTableHeaderClickEvent } from "./events/EaTableHeaderClickEvent";
import type { EaTableHeaderContextmenuEvent } from "./events/EaTableHeaderContextmenuEvent";
import type { EaTableRowClickEvent } from "./events/EaTableRowClickEvent";
import type { EaTableRowContextmenuEvent } from "./events/EaTableRowContextmenuEvent";
import type { EaTableRowDBLClickEvent } from "./events/EaTableRowDBLClickEvent";
import type { EaTableSelectAllEvent } from "./events/EaTableSelectAllEvent";
import type { EaTableSelectEvent } from "./events/EaTableSelectEvent";
import type { EaTableSelectionChangeEvent } from "./events/EaTableSelectionChangeEvent";
import type { EaTableSortChangeEvent } from "./events/EaTableSortChangeEvent";
import type { EaTableTemplateCellClickEvent } from "./events/EaTableTemplateCellClickEvent";
import type { ColumnOption } from "./types";
import type { TableColumnCtx } from "./components/ea-table-column/index";

declare global {
  interface HTMLElementTagNameMap {
    "ea-table": EaTableElement;
    "ea-table-column": EaTableColumnElement;
  }
}

export interface EaTableElement extends HTMLElement {
  stripe: boolean;
  border: boolean;
  height: string;
  maxHeight: string;
  highlightCurrentRow: boolean;
  showSummary: boolean;
  data: unknown[];
  selectable: ((row: unknown) => boolean) | null;
  indexMethod: ((index: number) => number) | null;
  summaryMethod: ((param: { columns: ColumnOption[]; data: unknown[] }) => (string | number)[]) | null;

  setData(dataSource: unknown[]): Promise<void>;
  sort(prop: string, order?: "asc" | "desc"): void;
  setRowStylePart(handler: ((param: { row: unknown; rowIndex: number }) => string) | string): void;
  getCurrentRow(): { target: HTMLTableRowElement | null; value: unknown };
  setCurrentRow(row?: unknown): void;
  toggleRowSelection(row: unknown, selected?: boolean, ignoreSelectable?: boolean): void;
  clearSelection(): void;

  addEventListener(
    type: "ea-row-click",
    listener: (event: EaTableRowClickEvent) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: "ea-row-dblclick",
    listener: (event: EaTableRowDBLClickEvent) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: "ea-row-contextmenu",
    listener: (event: EaTableRowContextmenuEvent) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: "ea-cell-click",
    listener: (event: EaTableCellClickEvent) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: "ea-cell-dblclick",
    listener: (event: EaTableCellDBLClickEvent) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: "ea-cell-contextmenu",
    listener: (event: EaTableCellContextmenuEvent) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: "ea-cell-mouse-enter",
    listener: (event: EaTableCellMouseEnterEvent) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: "ea-cell-mouse-leave",
    listener: (event: EaTableCellMouseLeaveEvent) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: "ea-header-click",
    listener: (event: EaTableHeaderClickEvent) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: "ea-header-contextmenu",
    listener: (event: EaTableHeaderContextmenuEvent) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: "ea-sort-change",
    listener: (event: EaTableSortChangeEvent) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: "ea-current-change",
    listener: (event: EaTableCurrentChangeEvent) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: "ea-selection-change",
    listener: (event: EaTableSelectionChangeEvent) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: "ea-select",
    listener: (event: EaTableSelectEvent) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: "ea-select-all",
    listener: (event: EaTableSelectAllEvent) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: "ea-template-cell-click",
    listener: (event: EaTableTemplateCellClickEvent) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;
}

export interface EaTableColumnElement extends HTMLElement {
  type: string;
  align: string;
  label: string;
  prop: string;
  colspan: number | undefined;
  width: string;
  sortable: boolean;
  fixed: string;
  option: Record<string, unknown>;
  readonly getColumnTree: TableColumnCtx;
}

import type { DefineComponent } from "vue";

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
  summaryMethod?: ((param: { columns: ColumnOption[]; data: unknown[] }) => (string | number)[]) | null;
}

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

export interface EaTableVueEvents {
  "ea-row-click": (event: EaTableRowClickEvent) => void;
  "ea-row-dblclick": (event: EaTableRowDBLClickEvent) => void;
  "ea-row-contextmenu": (event: EaTableRowContextmenuEvent) => void;
  "ea-cell-click": (event: EaTableCellClickEvent) => void;
  "ea-cell-dblclick": (event: EaTableCellDBLClickEvent) => void;
  "ea-cell-contextmenu": (event: EaTableCellContextmenuEvent) => void;
  "ea-cell-mouse-enter": (event: EaTableCellMouseEnterEvent) => void;
  "ea-cell-mouse-leave": (event: EaTableCellMouseLeaveEvent) => void;
  "ea-header-click": (event: EaTableHeaderClickEvent) => void;
  "ea-header-contextmenu": (event: EaTableHeaderContextmenuEvent) => void;
  "ea-sort-change": (event: EaTableSortChangeEvent) => void;
  "ea-current-change": (event: EaTableCurrentChangeEvent) => void;
  "ea-selection-change": (event: EaTableSelectionChangeEvent) => void;
  "ea-select": (event: EaTableSelectEvent) => void;
  "ea-select-all": (event: EaTableSelectAllEvent) => void;
  "ea-template-cell-click": (event: EaTableTemplateCellClickEvent) => void;
}

export interface EaTableVueSlots {
  default?: () => any;
  empty?: () => any;
}

export interface EaTableColumnVueSlots {
  default?: () => any;
  header?: () => any;
}

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

import type { HTMLAttributes, ReactNode } from "react";

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
  summaryMethod?: ((param: { columns: ColumnOption[]; data: unknown[] }) => (string | number)[]) | null;
  onEaRowClick?: (event: EaTableRowClickEvent) => void;
  onEaRowDblclick?: (event: EaTableRowDBLClickEvent) => void;
  onEaRowContextmenu?: (event: EaTableRowContextmenuEvent) => void;
  onEaCellClick?: (event: EaTableCellClickEvent) => void;
  onEaCellDblclick?: (event: EaTableCellDBLClickEvent) => void;
  onEaCellContextmenu?: (event: EaTableCellContextmenuEvent) => void;
  onEaCellMouseEnter?: (event: EaTableCellMouseEnterEvent) => void;
  onEaCellMouseLeave?: (event: EaTableCellMouseLeaveEvent) => void;
  onEaHeaderClick?: (event: EaTableHeaderClickEvent) => void;
  onEaHeaderContextmenu?: (event: EaTableHeaderContextmenuEvent) => void;
  onEaSortChange?: (event: EaTableSortChangeEvent) => void;
  onEaCurrentChange?: (event: EaTableCurrentChangeEvent) => void;
  onEaSelectionChange?: (event: EaTableSelectionChangeEvent) => void;
  onEaSelect?: (event: EaTableSelectEvent) => void;
  onEaSelectAll?: (event: EaTableSelectAllEvent) => void;
  onEaTemplateCellClick?: (event: EaTableTemplateCellClickEvent) => void;
  children?: ReactNode;
}

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
