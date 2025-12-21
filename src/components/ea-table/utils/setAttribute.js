export const setAttribute = (attrName, value) => {
  return attrName && value ? `${attrName}="${value}"` : "";
};
