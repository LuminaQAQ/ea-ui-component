declare global {
  interface HTMLElementTagNameMap {
    "ea-calendar": EaCalendarElement;
  }
}

export interface EaCalendarElement extends HTMLElement {
  value: string;
  controllerType: "button" | "select";
  readonly displayDate: import("dayjs").Dayjs;
}

import type { DefineComponent } from "vue";

export interface EaCalendarVueProps {
  value?: string;
  controllerType?: "button" | "select";
}

export interface EaCalendarVueEvents {
  "ea-select": (
    event: CustomEvent<{
      year: number;
      month: number;
      date: number;
      day: number;
      fullDate: string;
    }>
  ) => void;
}

export interface EaCalendarVueSlots {
  header?: () => any;
}

export type EaCalendarVueComponent = DefineComponent<
  EaCalendarVueProps,
  {},
  {},
  {},
  {},
  {},
  {},
  keyof EaCalendarVueEvents,
  {},
  {},
  EaCalendarVueSlots
>;

declare module "vue" {
  interface GlobalComponents {
    "ea-calendar": EaCalendarVueComponent;
  }
}

import type { HTMLAttributes, ReactNode } from "react";

export interface EaCalendarReactProps extends HTMLAttributes<HTMLElement> {
  value?: string;
  controllerType?: "button" | "select";
  onSelect?: (
    event: CustomEvent<{
      year: number;
      month: number;
      date: number;
      day: number;
      fullDate: string;
    }>
  ) => void;
  children?: ReactNode;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-calendar": EaCalendarReactProps;
    }
  }
}

export {};
