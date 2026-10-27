import { collectPropNames, toEventPropName } from "./emit-vue";
import { formatImport, formatUnion } from "./format";
import type { ComponentMeta } from "./types";

/**
 * 生成 React JSX 类型声明
 *
 * 与 Vue 声明一样分两层：属性名联合类型 + 事件 interface，
 * 组合成 JSX.IntrinsicElements 的元素类型。
 */
export function emitJsxTypes(
  components: ComponentMeta[],
  typeIndex: Map<string, string>,
  packageName: string
): { content: string; skipped: string[] } {
  const usable: ComponentMeta[] = [];
  const skipped: string[] = [];
  const importGroups = new Map<string, string[]>();

  for (const component of components) {
    const specifier = typeIndex.get(component.className);
    if (!specifier) {
      skipped.push(
        `${component.tagName}: 产物中找不到类 ${component.className} 的声明`
      );
      continue;
    }
    usable.push(component);
    const names = importGroups.get(specifier) ?? [];
    names.push(component.className);
    importGroups.set(specifier, names);
  }

  const importLines = [...importGroups.entries()]
    .sort(([a], [b]) => {
      if (a === "./types/index") return -1;
      if (b === "./types/index") return 1;
      return a.localeCompare(b);
    })
    .map(([specifier, names]) => formatImport(specifier, [...new Set(names)].sort()));

  const attrAliases = usable.map(component => {
    const typeName = `${component.className}Props`;
    const names = collectPropNames(component);
    if (names.length === 0) return `type ${typeName} = never;`;
    const prefix = `type ${typeName} =`;
    return `${prefix}${formatUnion(names, "  ", prefix.length)};`;
  });

  const eventInterfaces = usable
    .filter(component => component.events.length > 0)
    .map(component => {
      const members = component.events
        .map(event => {
          const desc = event.description.replace(/\s*\r?\n\s*/g, " ").trim();
          const doc = desc
            ? `    /** ${desc.replace(/\*\//g, "*\\/")} */\n`
            : "";
          return `${doc}    ${toEventPropName(event.name)}?: (event: CustomEvent) => void;`;
        })
        .join("\n");
      return `/** ${component.tagName} 的事件 */\ninterface ${component.className}Events {\n${members}\n}`;
    });

  const entries = usable.map(component => {
    const propsType = `${component.className}Props`;
    const eventsType = component.events.length
      ? `, ${component.className}Events`
      : "";
    const comment = component.summary
      ? `  /** ${component.summary.replace(/\*\//g, "*\\/")} */\n`
      : "";
    return `${comment}  "${component.tagName}": EaJsxProps<${component.className}, ${propsType}${eventsType}>;`;
  });

  const content = `/**
 * 自定义元素在 React JSX 中的类型声明
 *
 * 由 scripts/gen-ide-metadata.ts 自动生成，请勿手动修改。
 *
 * 启用方式：在项目的类型声明文件（如 src/react-env.d.ts）中加入
 *   import "${packageName}/jsx";
 */
import type * as React from "react";
${importLines.join("\n")}
import "./events";

/** 各组件可用的属性名 */
${attrAliases.join("\n")}

${eventInterfaces.join("\n\n")}

/** 把自定义元素映射为 JSX 元素类型，自定义事件覆盖 React 同名属性 */
type EaJsxProps<
  ElementType extends HTMLElement,
  Attributes extends keyof ElementType = never,
  Extra = object,
> = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<ElementType>, ElementType>,
  keyof Extra
> &
  Partial<{ [K in Attributes]: ElementType[K] }> &
  Extra;

/** 各组件的 JSX 元素类型 */
type EaIntrinsicElements = {
${entries.join("\n")}
};

declare global {
  namespace JSX {
    interface IntrinsicElements extends EaIntrinsicElements {}
  }
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements extends EaIntrinsicElements {}
  }
}
`;

  return { content, skipped };
}
