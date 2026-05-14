const handleProps = (key: string, value: unknown): string => {
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
      .map(([k, v]) => handleProps(k, v))
      .join(" ");
  } else if (typeof value === "function") {
    return `${key}="${value()}"`;
  }

  return "";
};

const handleChildren = (children: unknown): string => {
  if (
    typeof children === "string" ||
    typeof children === "number" ||
    typeof children === "boolean"
  ) {
    return String(children);
  } else if (Array.isArray(children)) {
    return children.join("");
  }

  return "";
};

export const h = (
  tagName: string,
  className: string | string[] | null,
  props: Record<string, unknown> | null,
  children: string | unknown[] | null
): string => {
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