import fs from "node:fs";
import path from "node:path";
import { formatImport, formatUnion } from "./format";
import type { ComponentMeta } from "./types";

/** 从构建产物的类型声明建立「类名 → 导入路径」索引，同类名取最短路径 */
export function collectTypeExports(typesDir: string): Map<string, string> {
  const index = new Map<string, string>();
  // 导入路径以 dist 为基准（vue.d.ts 与 types/ 同级）
  const distDir = path.dirname(typesDir);

  const register = (className: string, specifier: string): void => {
    const existing = index.get(className);
    if (!existing || specifier.length < existing.length) {
      index.set(className, specifier);
    }
  };

  const walk = (dir: string): void => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      if (!entry.name.endsWith(".d.ts")) continue;

      const specifier = `./${path
        .relative(distDir, full)
        .replace(/\\/g, "/")
        .replace(/\.d\.ts$/, "")}`;
      const source = fs.readFileSync(full, "utf-8");

      // export declare class X / export abstract class X
      for (const match of source.matchAll(
        /export\s+(?:declare\s+)?(?:abstract\s+)?class\s+(\w+)/g
      )) {
        if (match[1]) register(match[1], specifier);
      }

      // export { A, B as C } from "..."
      for (const match of source.matchAll(/export\s+(?:type\s+)?\{([^}]+)\}/g)) {
        for (const part of (match[1] ?? "").split(",")) {
          const name = part.trim().split(/\s+as\s+/).pop()?.trim();
          if (name) register(name, specifier);
        }
      }
    }
  };

  walk(typesDir);
  return index;
}

/** 事件名转 Vue 事件 prop 名：`ea-close` → `onEaClose` */
export function toEventPropName(eventName: string): string {
  const pascal = eventName
    .split(/[-_:]/)
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
  return `on${pascal}`;
}

/** 组件的 HTML 属性名（@attribute + @property） */
export function collectPropNames(component: ComponentMeta): string[] {
  return [
    ...component.attributes.map(item => item.name),
    ...component.properties.map(item => item.name),
  ];
}

/**
 * 生成 Vue SFC 模板类型增强文件
 *
 * 同时输出 GlobalComponents 与类接口两层增强，覆盖是否显式 import 组件的两种写法。
 */
export function emitVueTypes(
  components: ComponentMeta[],
  typeIndex: Map<string, string>,
  packageName: string
): { content: string; skipped: string[] } {
  const usable: ComponentMeta[] = [];
  const skipped: string[] = [];
  /** 导入路径 → 从该路径导入的类名 */
  const importGroups = new Map<string, string[]>();

  for (const component of components) {
    const specifier = typeIndex.get(component.className);
    if (!specifier) {
      skipped.push(`${component.tagName}: 产物中找不到类 ${component.className} 的声明`);
      continue;
    }
    usable.push(component);
    const names = importGroups.get(specifier) ?? [];
    names.push(component.className);
    importGroups.set(specifier, names);
  }

  // 根入口优先，其余按路径排序，保证产物稳定
  const importLines = [...importGroups.entries()]
    .sort(([a], [b]) => {
      if (a === "./types/index") return -1;
      if (b === "./types/index") return 1;
      return a.localeCompare(b);
    })
    .map(([specifier, names]) => formatImport(specifier, [...new Set(names)].sort()));

  // 属性名联合类型别名，类增强与 GlobalComponents 共用
  const attrAliases = usable.map(component => {
    const typeName = `${component.className}Props`;
    const names = collectPropNames(component);
    if (names.length === 0) return `type ${typeName} = never;`;
    const prefix = `type ${typeName} =`;
    return `${prefix}${formatUnion(names, "  ", prefix.length)};`;
  });

  // 类接口增强：给组件类补 $props
  const classAugment = usable.map(component => {
    const propsType = `${component.className}Props`;
    const eventsType = component.events.length
      ? `, ${component.className}Events`
      : "";
    return `  interface ${component.className} {
    /** @deprecated 仅用于模板类型检查，运行时不存在 */
    $props: EaVueProps<${component.className}, ${propsType}${eventsType}>;
  }`;
  });

  const globalEntries = usable.map(component => {
    const propsType = `${component.className}Props`;
    const eventsType = component.events.length
      ? `, ${component.className}Events`
      : "";
    const comment = component.summary
      ? `    /** ${component.summary.replace(/\*\//g, "*\\/")} */\n`
      : "";
    return `${comment}    "${component.tagName}": EaVueElement<${component.className}, ${propsType}${eventsType}>;`;
  });

  // 事件以 onXxx prop 形式声明
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
      return `/** ${component.tagName} 的事件（模板中写作 @xxx） */\ninterface ${component.className}Events {\n${members}\n}`;
    });

  const content = `/**
 * EA UI 组件在 Vue SFC 模板中的类型增强
 *
 * 启用方式：在项目的类型声明文件（如 env.d.ts / shims-vue.d.ts）中加入
 *   import "${packageName}/vue";
 */
${importLines.join("\n")}
import "./events";

/** 各组件在模板中可绑定的属性名 */
${attrAliases.join("\n")}

${eventInterfaces.join("\n\n")}

/**
 * 把属性名联合类型与事件声明组合为可选的 props 结构。
 * $props 仅参与模板类型检查，运行时不存在。
 */
type EaVueProps<
  ElementType extends HTMLElement,
  Attributes extends keyof ElementType,
  Extra = object,
> = Partial<{ [K in Attributes]: ElementType[K] }> & Extra;

/** 把自定义元素包装成 Vue 模板可检查的组件类型 */
type EaVueElement<
  ElementType extends HTMLElement,
  Attributes extends keyof ElementType = never,
  Extra = object,
> = new () => ElementType & {
  /** @deprecated 仅用于模板类型检查，运行时不存在 */
  $props: EaVueProps<ElementType, Attributes, Extra>;
};

/**
 * 类接口增强：给组件类补 $props，使模板中显式 import 的组件同样能推断属性。
 */
declare module "${packageName}" {
${classAugment.join("\n")}
}

declare module "vue" {
  interface GlobalComponents {
${globalEntries.join("\n")}
  }
}
`;

  return { content, skipped };
}
