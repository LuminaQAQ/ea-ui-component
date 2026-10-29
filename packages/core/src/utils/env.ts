export type GlobalHTMLElement = globalThis.HTMLElement;
export type GlobalHTMLFormElement = globalThis.HTMLFormElement;
export type GlobalValidityState = globalThis.ValidityState;

export interface GlobalCustomElements {
  new (): globalThis.CustomElementRegistry;
}
export type GlobalLocalStorage = globalThis.Storage;

export const GlobalHTMLElement =
  typeof globalThis.HTMLElement !== "undefined"
    ? globalThis.HTMLElement
    : (class {} as unknown as typeof HTMLElement);

export const GlobalHTMLFormElement =
  typeof globalThis.HTMLFormElement !== "undefined"
    ? globalThis.HTMLFormElement
    : (class {} as unknown as typeof HTMLFormElement);

export const GlobalValidityState =
  typeof globalThis.ValidityState !== "undefined"
    ? globalThis.ValidityState
    : (class {} as unknown as typeof ValidityState);

export const GlobalCustomElements =
  typeof globalThis.customElements !== "undefined"
    ? globalThis.customElements
    : (new (class {
        define = () => undefined;
        get = () => undefined;
        getName = () => undefined;
        upgrade = () => undefined;
        whenDefined = () => undefined;
      })() as unknown as CustomElementRegistry);

export const GlobalLocalStorage: globalThis.Storage =
  typeof globalThis.localStorage !== "undefined"
    ? globalThis.localStorage
    : (new (class {
        readonly length: number = 0;
        clear = () => undefined;
        getItem = () => undefined;
        key = () => undefined;
        removeItem = () => undefined;
        setItem = () => undefined;
        [key: string]: any;
      })() as unknown as Storage);

/**
 * @description 是否为开发环境
 * @returns 读到 NODE_ENV 且为 development 时返回 true
 */
export const isDevelopment = (): boolean => {
  const env = (
    globalThis as { process?: { env?: Record<string, string | undefined> } }
  ).process?.env;

  return env?.NODE_ENV === "development";
};
