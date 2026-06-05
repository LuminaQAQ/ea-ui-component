import type { EaTreeCheckChangeEvent } from "./events/EaTreeCheckChangeEvent";
import type { EaTreeCheckEvent } from "./events/EaTreeCheckEvent";
import type { EaTreeCurrentChangeEvent } from "./events/EaTreeCurrentChangeEvent";
import type { EaTreeNodeClickEvent } from "./events/EaTreeNodeClickEvent";
import type { EaTreeNodeCollapseEvent } from "./events/EaTreeNodeCollapseEvent";
import type { EaTreeNodeContextmenuEvent } from "./events/EaTreeNodeContextmenuEvent";
import type { EaTreeNodeExpandEvent } from "./events/EaTreeNodeExpandEvent";
import type { EaTreeNodeSelectEvent } from "./events/EaTreeNodeSelectEvent";

export {
  EaTreeCheckChangeEvent,
  type EaTreeCheckChangeEventDetail,
} from "./events/EaTreeCheckChangeEvent";
export {
  EaTreeCheckEvent,
  type EaTreeCheckEventDetail,
} from "./events/EaTreeCheckEvent";
export {
  EaTreeCurrentChangeEvent,
  type EaTreeCurrentChangeEventDetail,
} from "./events/EaTreeCurrentChangeEvent";
export {
  EaTreeNodeClickEvent,
  type EaTreeNodeClickEventDetail,
} from "./events/EaTreeNodeClickEvent";
export {
  EaTreeNodeCollapseEvent,
  type EaTreeNodeCollapseEventDetail,
} from "./events/EaTreeNodeCollapseEvent";
export {
  EaTreeNodeContextmenuEvent,
  type EaTreeNodeContextmenuEventDetail,
} from "./events/EaTreeNodeContextmenuEvent";
export {
  EaTreeNodeExpandEvent,
  type EaTreeNodeExpandEventDetail,
} from "./events/EaTreeNodeExpandEvent";
export {
  EaTreeNodeSelectEvent,
  type EaTreeNodeSelectEventDetail,
} from "./events/EaTreeNodeSelectEvent";

declare global {
  interface HTMLElementTagNameMap {
    "ea-tree": EaTreeElement;
  }
}

export interface EaTreeElement extends HTMLElement {
  showCheckbox: boolean;
  checkStrictly: boolean;
  nodeKey: string;
  label: string;
  expandOnIconClick: boolean;
  data: any[];
  dataProps: Record<string, string>;
  defaultExpandedKeys: any[];
  defaultCheckedKeys: any[];

  getHalfCheckedNodes(): any[];
  getHalfCheckedKeys(): any[];
  getCurrentKey(): any;
  getCurrentNode(): any;
  updateKeyChildren(key: any, data: any[]): boolean;
  getCheckedNodes(leafOnly?: boolean, includeHalfChecked?: boolean): any[];
  setCheckedNodes(nodes: any[]): boolean;
  getCheckedKeys(leafOnly?: boolean): any[];
  setCheckedKeys(keys: any[], leafOnly?: boolean): boolean;
  setChecked(keyOrData: any, checked: boolean): boolean;
  setCurrentKey(key: any, shouldAutoExpandParent?: boolean): boolean;
  setCurrentNode(node: any, shouldAutoExpandParent?: boolean): boolean;
  getNode(data: any): any;

  addEventListener(
    type: "ea-node-click",
    listener: (event: EaTreeNodeClickEvent) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: "ea-node-contextmenu",
    listener: (event: EaTreeNodeContextmenuEvent) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: "ea-node-select",
    listener: (event: EaTreeNodeSelectEvent) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: "ea-check-change",
    listener: (event: EaTreeCheckChangeEvent) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: "ea-check",
    listener: (event: EaTreeCheckEvent) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: "ea-current-change",
    listener: (event: EaTreeCurrentChangeEvent) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: "ea-node-expand",
    listener: (event: EaTreeNodeExpandEvent) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: "ea-node-collapse",
    listener: (event: EaTreeNodeCollapseEvent) => void,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;
}

import type { DefineComponent } from "vue";

export interface EaTreeVueProps {
  showCheckbox?: boolean;
  checkStrictly?: boolean;
  nodeKey?: string;
  label?: string;
  expandOnIconClick?: boolean;
  data?: any[];
  dataProps?: Record<string, string>;
  defaultExpandedKeys?: any[];
  defaultCheckedKeys?: any[];
}

export interface EaTreeVueEvents {
  "ea-node-click": (event: EaTreeNodeClickEvent) => void;
  "ea-node-contextmenu": (event: EaTreeNodeContextmenuEvent) => void;
  "ea-node-select": (event: EaTreeNodeSelectEvent) => void;
  "ea-check-change": (event: EaTreeCheckChangeEvent) => void;
  "ea-check": (event: EaTreeCheckEvent) => void;
  "ea-current-change": (event: EaTreeCurrentChangeEvent) => void;
  "ea-node-expand": (event: EaTreeNodeExpandEvent) => void;
  "ea-node-collapse": (event: EaTreeNodeCollapseEvent) => void;
}

export interface EaTreeVueSlots {
  default?: () => any;
}

export type EaTreeVueComponent = DefineComponent<
  EaTreeVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaTreeVueEvents,
  {},
  {},
  EaTreeVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-tree": EaTreeVueComponent;
  }
}

import type { HTMLAttributes, ReactNode } from "react";

export interface EaTreeReactProps extends HTMLAttributes<HTMLElement> {
  showCheckbox?: boolean;
  checkStrictly?: boolean;
  nodeKey?: string;
  label?: string;
  expandOnIconClick?: boolean;
  data?: any[];
  dataProps?: Record<string, string>;
  defaultExpandedKeys?: any[];
  defaultCheckedKeys?: any[];
  onEaNodeClick?: (event: EaTreeNodeClickEvent) => void;
  onEaNodeContextmenu?: (event: EaTreeNodeContextmenuEvent) => void;
  onEaNodeSelect?: (event: EaTreeNodeSelectEvent) => void;
  onEaCheckChange?: (event: EaTreeCheckChangeEvent) => void;
  onEaCheck?: (event: EaTreeCheckEvent) => void;
  onEaCurrentChange?: (event: EaTreeCurrentChangeEvent) => void;
  onEaNodeExpand?: (event: EaTreeNodeExpandEvent) => void;
  onEaNodeCollapse?: (event: EaTreeNodeCollapseEvent) => void;
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-tree": EaTreeReactProps;
    }
  }
}

export {};
