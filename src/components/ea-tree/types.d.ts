declare global {
  interface HTMLElementTagNameMap {
    "ea-tree": EaTreeElement;
  }
}

export interface EaTreeElement extends HTMLElement {
  showCheckbox: boolean;
  checkStrictly: boolean;
  nodeKey: string;
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
  setCheckedNodes(nodes: any[], leafOnly?: boolean): boolean;
  getCheckedKeys(leafOnly?: boolean): any[];
  setCheckedKeys(keys: any[], leafOnly?: boolean): boolean;
  setChecked(keyOrData: any, checked: boolean): boolean;
  setCurrentKey(key: any, shouldAutoExpandParent?: boolean): boolean;
  setCurrentNode(node: any, shouldAutoExpandParent?: boolean): boolean;
  getNode(data: any): any;
}

import type { DefineComponent } from "vue";

export interface EaTreeVueProps {
  showCheckbox?: boolean;
  checkStrictly?: boolean;
  nodeKey?: string;
  expandOnIconClick?: boolean;
  data?: any[];
  dataProps?: Record<string, string>;
  defaultExpandedKeys?: any[];
  defaultCheckedKeys?: any[];
}

export interface EaTreeVueEvents {
  "ea-node-click": (event: CustomEvent<{ data: any }>) => void;
  "ea-node-contextmenu": (event: CustomEvent<{ data: any; node: any }>) => void;
  "ea-node-select": (event: CustomEvent<{ node: any; selected: boolean }>) => void;
  "ea-check-change": (event: CustomEvent<{ data: any; checked: boolean; hasCheckedChildren: boolean }>) => void;
  "ea-check": (event: CustomEvent<{ data: any; checkedState: any }>) => void;
  "ea-current-change": (event: CustomEvent<{ data: any; node: any }>) => void;
  "ea-node-expand": (event: CustomEvent<{ data: any; node: any; expanded: boolean }>) => void;
  "ea-node-collapse": (event: CustomEvent<{ data: any; node: any; expanded: boolean }>) => void;
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
  expandOnIconClick?: boolean;
  data?: any[];
  dataProps?: Record<string, string>;
  defaultExpandedKeys?: any[];
  defaultCheckedKeys?: any[];
  onEaNodeClick?: (event: CustomEvent<{ data: any }>) => void;
  onEaNodeContextmenu?: (event: CustomEvent<{ data: any; node: any }>) => void;
  onEaNodeSelect?: (event: CustomEvent<{ node: any; selected: boolean }>) => void;
  onEaCheckChange?: (event: CustomEvent<{ data: any; checked: boolean; hasCheckedChildren: boolean }>) => void;
  onEaCheck?: (event: CustomEvent<{ data: any; checkedState: any }>) => void;
  onEaCurrentChange?: (event: CustomEvent<{ data: any; node: any }>) => void;
  onEaNodeExpand?: (event: CustomEvent<{ data: any; node: any; expanded: boolean }>) => void;
  onEaNodeCollapse?: (event: CustomEvent<{ data: any; node: any; expanded: boolean }>) => void;
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
