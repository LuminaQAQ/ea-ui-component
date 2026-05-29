declare module "@decorator" {
  export function CustomElement(tagName: string, options: any): any;
  export function attribute(options: any): any;
  export function property(options: any): any;
  export function query(selector: string): any;
  export function queryAll(selector: string): any;
  export function listen(event: string, selector?: string, options?: any): any;
  export function children(selector: string): any;
}

declare module "@utils/bem" {
  export function createBEM(tagName: string): any;
}

declare module "@utils/html" {
  export function html(template: string): string;
}

declare module "@utils/Enum" {
  export function Enum(values: readonly string[]): any;
}

declare module "*.scss?inline" {
  const content: string;
  export default content;
}

type AutoFill = "on" | "off" | "name" | "honorific-prefix" | "given-name" | "additional-name" | "family-name" | "honorific-suffix" | "nickname" | "email" | "username" | "new-password" | "current-password" | "one-time-code" | "organization-title" | "organization" | "street-address" | "address-line1" | "address-line2" | "address-line3" | "address-level4" | "address-level3" | "address-level2" | "address-level1" | "country" | "country-name" | "postal-code" | "cc-name" | "cc-given-name" | "cc-additional-name" | "cc-family-name" | "cc-number" | "cc-exp" | "cc-exp-month" | "cc-exp-year" | "cc-csc" | "cc-type" | "transaction-currency" | "transaction-amount" | "language" | "bday" | "bday-day" | "bday-month" | "bday-year" | "sex" | "tel" | "tel-country-code" | "tel-national" | "tel-area-code" | "tel-local" | "tel-extension" | "impp" | "url" | "photo";
