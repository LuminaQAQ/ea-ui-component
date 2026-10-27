/** 把名字列表格式化为字符串字面量联合类型，超出列宽时改为多行 */
export function formatUnion(
  names: string[],
  indent: string,
  prefixLength: number
): string {
  const values = names.map(name => `"${name}"`);
  const singleLine = values.join(" | ");
  if (prefixLength + singleLine.length + 2 <= 80) return ` ${singleLine}`;
  return `\n${values.map(value => `${indent}| ${value}`).join("\n")}`;
}

/** 格式化单条 import 语句，过长时拆行 */
export function formatImport(specifier: string, names: string[]): string {
  const singleLine = `import type { ${names.join(", ")} } from "${specifier}";`;
  if (singleLine.length <= 80) return singleLine;
  return `import type {\n${names.map(name => `  ${name},`).join("\n")}\n} from "${specifier}";`;
}
