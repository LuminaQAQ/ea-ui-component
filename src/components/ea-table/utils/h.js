const handleProps = (key, value) => {
  if (
    key &&
    (typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean")
  ) {
    return `${key}="${value}"`;
  } else if (Array.isArray(value)) {
    return `${key}="${value.join(" ")}"`;
  } else if (typeof value === "object" && value) {
    return Object.entries(value)
      .map(([key, value]) => handleProps(key, value))
      .join(" ");
  } else if (typeof value === "function") {
    return `${key}="${value()}"`;
  }

  return "";
};

const handleChildren = children => {
  if (
    typeof children === "string" ||
    typeof children === "number" ||
    typeof children === "boolean"
  ) {
    return children;
  } else if (Array.isArray(children)) {
    return children.join("");
  }

  return "";
};

/**
 * @param { String } tagName
 * @param { string | string[]} className
 * @param { import("../components/ea-table").CulumnOption } props
 * @param { String | Object } children
 * @returns
 */
export const h = (tagName, className, props, children) => {
  const notEndTag = ["input"];

  return `<${tagName} ${handleProps("class", className)} ${
    props
      ? Object.entries(props)
          .map(([key, value]) => handleProps(key, value))
          .join(" ")
      : ""
  }${
    notEndTag.includes(tagName)
      ? "/>"
      : `${`>
    ${handleChildren(children)}
  </${tagName}>`}`
  }`;
};
