declare global {
  interface HTMLElementTagNameMap {
    "ea-transfer": EaTransferElement;
    "ea-transfer-panel": EaTransferPanelElement;
  }
}

export interface EaTransferElement extends HTMLElement {
  disabled: boolean;
  filterable: boolean;
  filterPlaceholder: string;
  data: any[];
  value: any[];
  dataProps: Record<string, string>;
  titles: string[];
  buttonTexts: string[];
  filterMethod: ((query: string, item: any) => boolean) | null;
  leftDefaultChecked: any[];
  rightDefaultChecked: any[];

  clearQuery(which: "left" | "right"): void;
  checkValidity(): boolean;
  reportValidity(): boolean;
}

export interface EaTransferPanelElement extends HTMLElement {
  dataTitle: string;
  type: "source" | "target";
  filterable: boolean;
  filterPlaceholder: string;
  data: HTMLElement[];
  filterMethod: ((query: string, item: any) => boolean) | null;
  dataProps: Record<string, string>;
  dataMap: Map<any, any>;

  clearList(): void;
  clearQuery(): void;
}

import type { DefineComponent } from "vue";

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

export interface EaTransferVueEvents {
  change: (event: CustomEvent<{ value: any[] }>) => void;
  "ea-left-check-change": (event: CustomEvent<{ value: any[]; movedKeys?: any[] }>) => void;
  "ea-right-check-change": (event: CustomEvent<{ value: any[]; movedKeys?: any[] }>) => void;
}

export interface EaTransferVueSlots {
  "left-empty"?: () => any;
  "left-footer"?: () => any;
  "right-empty"?: () => any;
  "right-footer"?: () => any;
}

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

import type { HTMLAttributes, ReactNode } from "react";

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
  onChange?: (event: CustomEvent<{ value: any[] }>) => void;
  onEaLeftCheckChange?: (event: CustomEvent<{ value: any[]; movedKeys?: any[] }>) => void;
  onEaRightCheckChange?: (event: CustomEvent<{ value: any[]; movedKeys?: any[] }>) => void;
  "left-empty"?: ReactNode;
  "left-footer"?: ReactNode;
  "right-empty"?: ReactNode;
  "right-footer"?: ReactNode;
}

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
