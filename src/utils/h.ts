/**
 * HTML 元素创建工具函数
 * 用于在组件中创建 HTML 字符串
 *
 * @example
 * h("div", "class-name", { id: "test" }, "内容")
 * // <div class="class-name" id="test">内容</div>
 */

interface Props {
  [key: string]: any;
}

type Children = string | number | boolean | null | undefined | Children[];

/**
 * 处理属性值
 */
function handleProps(key: string, value: any): string {
  if (!key) return "";

  // 过滤事件处理器
  if (key.startsWith("on")) {
    return "";
  }

  // 处理字符串、数字、布尔值
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return `${key}="${value}"`;
  }

  // 处理数组
  if (Array.isArray(value)) {
    return `${key}="${value.join(" ")}"`;
  }

  // 处理对象（递归）
  if (typeof value === "object" && value !== null) {
    return Object.entries(value)
      .map(([k, v]) => handleProps(k, v))
      .join(" ");
  }

  // 处理函数
  if (typeof value === "function") {
    return `${key}="${value()}"`;
  }

  return "";
}

/**
 * 处理子元素
 */
function handleChildren(children: Children): string {
  if (children === null || children === undefined) {
    return "";
  }

  if (
    typeof children === "string" ||
    typeof children === "number" ||
    typeof children === "boolean"
  ) {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(handleChildren).join("");
  }

  return "";
}

/**
 * 创建 HTML 元素字符串
 *
 * @param tagName 标签名
 * @param className 类名
 * @param props 属性对象
 * @param children 子元素
 * @returns HTML 字符串
 */
export function h(
  tagName: string,
  className: string,
  props?: Props,
  children?: Children
): string {
  // 过滤危险标签
  if (tagName === "script" || tagName === "style") {
    return "";
  }

  const notEndTag = ["input", "img", "br", "hr", "meta", "link"];

  const propsStr = props
    ? Object.entries(props)
        .map(([key, value]) => handleProps(key, value))
        .filter(Boolean)
        .join(" ")
    : "";

  const classAttr = className ? ` class="${className}"` : "";

  if (notEndTag.includes(tagName)) {
    return `<${tagName}${classAttr} ${propsStr}/>`;
  }

  const childrenStr = handleChildren(children);

  return `<${tagName}${classAttr} ${propsStr}>${childrenStr}</${tagName}>`;
}

export default h;
