declare global {
  interface HTMLElementTagNameMap {
    "ea-input": EaInputElement;
  }
}

export interface EaInputElement extends HTMLElement {
  label: string;
  type: "textarea" | "text" | "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "time" | "url" | "week";
  size: "large" | "default" | "small";
  value: string;
  required: boolean;
  placeholder: string;
  maxlength: number | null;
  minlength: number | null;
  clearable: boolean;
  clearIcon: string;
  disabled: boolean;
  showPassword: boolean;
  prefixIcon: string;
  suffixIcon: string;
  showWordLimit: boolean;
  rows: number;
  autosize: boolean;
  minRows: number | string | null;
  maxRows: number | string | null;
  autocomplete: AutoFill;
  name: string;
  readonly: boolean;
  max: number | string | null;
  min: number | string | null;
  step: number | string;
  pattern: string | null;
  resize: "none" | "both" | "horizontal" | "vertical";
  autofocus: boolean;
  form: HTMLFormElement | null;
  ariaLabel: string;
  tabindex: string;
  inputmode: string;

  focus(options?: FocusOptions): void;
  blur(): void;
  clear(): void;
  select(): void;
  setRangeText(replacement: string, start: number, end: number, selectMode?: "select" | "start" | "end" | "preserve"): void;
  setSelectionRange(selectionStart: number, selectionEnd: number, selectionDirection?: "forward" | "backward" | "none"): void;
  showPicker(): void;
  stepDown(n?: number): void;
  stepUp(n?: number): void;
  checkValidity(): boolean;
  reportValidity(): boolean;
}

import type { DefineComponent } from "vue";

declare module "vue" {
  interface GlobalComponents {
    "ea-input": DefineComponent<{
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
      minRows?: number | string | null;
      maxRows?: number | string | null;
      autocomplete?: AutoFill;
      name?: string;
      readonly?: boolean;
      max?: number | string | null;
      min?: number | string | null;
      step?: number | string;
      pattern?: string | null;
      resize?: "none" | "both" | "horizontal" | "vertical";
      autofocus?: boolean;
      form?: HTMLFormElement | null;
      ariaLabel?: string;
      tabindex?: string;
      inputmode?: string;
    }>;
  }
}

import type { HTMLAttributes } from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "ea-input": HTMLAttributes<HTMLElement> & {
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
        minRows?: number | string | null;
        maxRows?: number | string | null;
        autocomplete?: AutoFill;
        name?: string;
        readonly?: boolean;
        max?: number | string | null;
        min?: number | string | null;
        step?: number | string;
        pattern?: string | null;
        resize?: "none" | "both" | "horizontal" | "vertical";
        autofocus?: boolean;
        form?: HTMLFormElement | null;
        ariaLabel?: string;
        tabindex?: string;
        inputmode?: string;
      };
    }
  }
}

export {};
