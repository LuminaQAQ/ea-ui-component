export const setAttribute = (attrName: string, value: unknown): string => {
  return attrName && value ? `${attrName}="${value}"` : "";
};