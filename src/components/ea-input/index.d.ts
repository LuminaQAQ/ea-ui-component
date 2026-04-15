// 类型声明文件，解决模块导入错误
declare module "@decorator/attribute" {
  export function attribute(options: any): any;
}

declare module "@decorator/custom-element" {
  export function CustomElement(tagName: string, options: any): any;
}

declare module "@decorator/query" {
  export function query(selector: string): any;
}

declare module "@decorator/listen" {
  export function listen(event: string, selector: string): any;
}

declare module "@utils/bem" {
  export function createBEM(tagName: string): any;
}

declare module "@utils/html" {
  export function html(template: string): string;
}

declare module "@/utils/Enum" {
  export function Enum(values: string[]): any;
}

declare module "*.scss?inline" {
  const content: string;
  export default content;
}

// 扩展 EaFormAssociatedBase 类型
declare class EaFormAssociatedBase extends HTMLElement {
  // 添加缺失的方法声明
  getAttribute(name: string): string | null;
  setAttribute(name: string, value: string): void;
  hasAttribute(name: string): boolean;
  dispatchEvent(event: Event): boolean;
  style: CSSStyleDeclaration;
  shadowRoot: ShadowRoot;
}

// 定义 AutoFill 类型
type AutoFill = "on" | "off" | "name" | "honorific-prefix" | "given-name" | "additional-name" | "family-name" | "honorific-suffix" | "nickname" | "email" | "username" | "new-password" | "current-password" | "one-time-code" | "organization-title" | "organization" | "street-address" | "address-line1" | "address-line2" | "address-line3" | "address-level4" | "address-level3" | "address-level2" | "address-level1" | "country" | "country-name" | "postal-code" | "cc-name" | "cc-given-name" | "cc-additional-name" | "cc-family-name" | "cc-number" | "cc-exp" | "cc-exp-month" | "cc-exp-year" | "cc-csc" | "cc-type" | "transaction-currency" | "transaction-amount" | "language" | "bday" | "bday-day" | "bday-month" | "bday-year" | "sex" | "tel" | "tel-country-code" | "tel-national" | "tel-area-code" | "tel-local" | "tel-extension" | "impp" | "url" | "photo";