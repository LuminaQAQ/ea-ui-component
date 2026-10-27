import type { ComponentMeta } from "./types";

/**
 * 生成事件类型增强
 *
 * 事件类通过 `declare global` 扩展 `GlobalEventHandlersEventMap`，
 * 但只有模块被加载时才生效。这里以副作用导入的方式引用全部事件类，
 * 使 addEventListener 能推断事件对象类型。
 */
export function emitEventTypes(
  components: ComponentMeta[],
  typeIndex: Map<string, string>
): { content: string; missing: string[] } {
  const specifiers = new Set<string>();
  const missing: string[] = [];

  for (const component of components) {
    for (const event of component.events) {
      if (!event.className) continue;
      const specifier = typeIndex.get(event.className);
      if (!specifier) {
        missing.push(
          `${component.tagName}: 找不到事件类 ${event.className} 的声明`
        );
        continue;
      }
      specifiers.add(specifier);
    }
  }

  const imports = [...specifiers].sort().map(item => `import "${item}";`);

  const content = `/**
 * 组件事件类型增强
 *
 * 由 scripts/gen-ide-metadata.ts 自动生成，请勿手动修改。
 *
 * 引入后 addEventListener 可推断事件对象类型。
 */
${imports.join("\n")}
`;

  return { content, missing };
}
