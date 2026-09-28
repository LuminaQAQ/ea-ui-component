declare global {
  interface HTMLElementTagNameMap {
    "ea-select": EaSelectElement;
    "ea-option": EaOptionElement;
    "ea-option-group": EaOptionGroupElement;
  }
}

export interface EaSelectElement extends HTMLElement {
  label: string;
  name: string;
  placeholder: string;
  disabled: boolean;
  clearable: boolean;
  size: "large" | "default" | "small";
  multiple: boolean;
  collapseTags: boolean;
  maxCollapseTags: number;
  filterable: boolean;
  required: boolean;
  value: string | number | boolean | (string | number | boolean)[];
  show(): void;
  hide(): void;
  checkValidity(): boolean;
  reportValidity(): boolean;
}

export interface EaOptionElement extends HTMLElement {
  value: string | number | boolean;
  label: string;
  disabled: boolean;
  selected: boolean;
}

export interface EaOptionGroupElement extends HTMLElement {
  label: string;
  disabled: boolean;
}

import type { DefineComponent } from "vue";

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
  required?: boolean;
  value?: string | number | boolean | (string | number | boolean)[];
}

export interface EaOptionVueProps {
  value?: string | number | boolean;
  label?: string;
  disabled?: boolean;
  selected?: boolean;
}

export interface EaOptionGroupVueProps {
  label?: string;
  disabled?: boolean;
}

export interface EaSelectVueEvents {
  change: (
    event: CustomEvent<{
      value: string | number | boolean | (string | number | boolean)[];
    }>
  ) => void;
  "ea-visible-change": (event: CustomEvent<{ visible: boolean }>) => void;
  "ea-clear": (event: CustomEvent) => void;
  "ea-remove-tag": (
    event: CustomEvent<{ tag: HTMLElement; tagValue: string }>
  ) => void;
}

export interface EaOptionVueEvents {
  click: (event: CustomEvent<{ target: EaOptionElement }>) => void;
}

export interface EaSelectVueSlots {
  default?: () => any;
}

export interface EaOptionVueSlots {
  default?: () => any;
}

export interface EaOptionGroupVueSlots {
  default?: () => any;
}

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

import type { HTMLAttributes, ReactNode } from "react";

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
  required?: boolean;
  value?: string | number | boolean | (string | number | boolean)[];
  onChange?: (
    event: CustomEvent<{
      value: string | number | boolean | (string | number | boolean)[];
    }>
  ) => void;
  onEaVisibleChange?: (event: CustomEvent<{ visible: boolean }>) => void;
  onEaClear?: (event: CustomEvent) => void;
  onEaRemoveTag?: (
    event: CustomEvent<{ tag: HTMLElement; tagValue: string }>
  ) => void;
  children?: ReactNode;
}

export interface EaOptionReactProps extends HTMLAttributes<HTMLElement> {
  value?: string | number | boolean;
  label?: string;
  disabled?: boolean;
  selected?: boolean;
  children?: ReactNode;
}

export interface EaOptionGroupReactProps extends HTMLAttributes<HTMLElement> {
  label?: string;
  disabled?: boolean;
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
