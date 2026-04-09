import type {
  ShadowRootElement,
  AttributeOptions,
  PropertyMap,
} from "@mytypes/index";

import { parseAttributeValue } from "@/utils/parseAttributeValue";
import EaUtils from "@/utils/Utils";

/**
 * 属性配置映射表 - 用于存储类级别的属性配置
 */
const propertyMap: PropertyMap = new Map();

export { propertyMap };

/**
 * 创建属性的 getter 函数
 */
function createGetter(
  valueRef: { value: any },
  name: string,
  type: AttributeOptions["type"]
) {
  return function (this: ShadowRootElement) {
    const val = valueRef.value;
    if (val !== undefined && val !== null && val !== "") {
      return val;
    }
    const attrValue = this.getAttribute(name);
    return parseAttributeValue(attrValue, type);
  };
}

/**
 * 创建属性的 setter 函数
 */
function createSetter(name: string) {
  return function (this: ShadowRootElement, newVal: any, oldVal: any) {
    if (this instanceof HTMLElement) {
      // if (newVal !== undefined && newVal !== null && newVal !== "") {
      //   this.setAttribute(name, String(newVal));
      // }

      // 触发 observer 回调
      const cb = this.constructor.__observedAttributesCallback[name];
      if (cb) {
        // console.log(name, convertedNewVal, convertedOldVal);

        cb.call(this, newVal, oldVal);
      }
    }
  };
}

/**
 * 注册属性观察者回调
 */
function registerObserver(
  constructor: any,
  name: string,
  observer?: (this: ShadowRootElement, newVal: any, oldVal: any) => void
) {
  if (observer && typeof observer === "function") {
    if (!constructor.__observedAttributesCallback) {
      constructor.__observedAttributesCallback = {};
    }
    constructor.__observedAttributesCallback[name] = observer;
  }
}

/**
 * 注册观察属性
 */
function registerObservedAttribute(constructor: any, name: string) {
  if (!constructor.__observedAttributes) {
    constructor.__observedAttributes = [];
  }
  if (!constructor.__observedAttributes.includes(name)) {
    constructor.__observedAttributes = [
      ...new Set([...constructor.__observedAttributes, name]),
    ];
  }
}

/**
 * 定义属性到目标对象
 */
async function defineAttributeProperty(
  target: ShadowRootElement,
  name: string,
  initialValue: any,
  type: AttributeOptions["type"]
): Promise<{ value: any }> {
  const valueRef = { value: initialValue };

  try {
    // const tagName = EaUtils.String.toLowerCamelCase(target.constructor.name);
    // await window.customElements.whenDefined(tagName);

    // Object.defineProperty(target, name, {
    //   get: createGetter(valueRef, name, type),
    //   set: createSetter(name),
    //   configurable: true,
    //   enumerable: true,
    // });
  } catch {}

  return valueRef;
}

/**
 * 注册属性到 propertyMap
 */
function registerPropertyMap(
  clsName: string,
  name: string,
  options: AttributeOptions
) {
  const existingOptions = propertyMap.get(clsName) || {};
  propertyMap.set(clsName, {
    ...existingOptions,
    [name]: options,
  });
}

/**
 * 初始化属性
 * 注册观察属性、定义 getter/setter、注册观察者回调
 */
function initializeAttribute(
  target: ShadowRootElement,
  constructor: any,
  name: string,
  initialValue: any,
  options: AttributeOptions
) {
  registerObservedAttribute(constructor, name);
  // defineAttributeProperty(target, name, initialValue, options.type);
  if (options.observer) {
    registerObserver(constructor, name, options.observer);
  }
}

/**
 * @attribute 装饰器 - 用于定义组件的响应式属性
 *
 * 实现 attribute 和 property 的双向绑定
 */
function attribute(options: AttributeOptions) {
  return function (this: any, initialValue: any, context?: any) {
    const isNewDecoratorApi =
      context && typeof context === "object" && "addInitializer" in context;

    if (isNewDecoratorApi) {
      const name = context.name as string;
      const clsName: string =
        (context as any).static?.name || this?.constructor?.name;

      registerPropertyMap(clsName, name, options);

      context.addInitializer(function (this: any) {
        initializeAttribute(
          this as ShadowRootElement,
          this.constructor,
          name,
          initialValue,
          options
        );
      });

      return initialValue;
    } else {
      const name = context as string;
      const target = initialValue as ShadowRootElement;
      const constructor = target.constructor;
      const clsName = constructor.name;

      registerPropertyMap(clsName, name, options);

      const descriptor = Object.getOwnPropertyDescriptor(target, name);
      const initialPropValue = descriptor?.value;

      if (Object.prototype.hasOwnProperty.call(target, name)) {
        delete (target as any)[name];
      }

      initializeAttribute(target, constructor, name, initialPropValue, options);
    }
  };
}

export { attribute };

export default attribute;
