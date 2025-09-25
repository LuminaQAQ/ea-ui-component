import Base from "@/components/Base";
import { h } from "@/components/ea-table/utils/h";

export default class EaUtils {
  static Array = {};
  static String = {};
  static Object = {};
  static Number = {};
  static RegExp = {};
  static Boolean = {};
  static Enum = {};
  static EaElement = {};
  static JSON = {};
}

EaUtils.Array.toLowerCamelCase = (arr) => {
  if (!Array.isArray(arr)) arr = Array.from(arr);

  return arr.map((item) => EaUtils.String.toLowerCamelCase(item));
};

EaUtils.String.toLowerCamelCase = (str) => {
  return str
    .toString()
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
};

EaUtils.Boolean.isBoolean = (value) => {
  return (
    typeof value === "boolean" ||
    rawValue === "" ||
    rawValue === "true" ||
    rawValue === true
  );
};

EaUtils.Number.isNumber = (value) => {
  value = Number(value);
  return typeof value === "number" && !isNaN(value);
};

EaUtils.Enum.isEnum = (value) => {
  return Array.isArray(value);
};

EaUtils.Enum.hasEnum = (enumAry, prop) => {
  return enumAry.includes(prop);
};

/**
 * @description 定义元素
 * @param {string} tagName 元素名称
 * @param {Base} EaElementClass 元素类
 */
EaUtils.EaElement.define = (tagName, EaElementClass) => {
  if (!customElements in window)
    return console.warn("当前浏览器不支持自定义元素");

  if (!window.customElements.get(tagName)) {
    window.customElements.define(tagName, EaElementClass);
  }
};

EaUtils.EaElement.addAsyncEventListener = (context, eventName, once = true) => {
  return new Promise((resolve) => {
    context.addEventListener(
      eventName,
      (e) => {
        e.preventDefault();
        e.stopPropagation();

        resolve(true);
      },
      { once }
    );
  });
};

EaUtils.EaElement.h = h;

EaUtils.JSON.parse = (json) => {
  try {
    return JSON.parse(json);
  } catch (error) {
    console.error(error);
    return null;
  }
};

EaUtils.JSON.stringify = (json) => {
  try {
    return JSON.stringify(json);
  } catch (error) {
    console.error(error);
    return null;
  }
};
