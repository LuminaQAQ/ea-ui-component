import type { AttributeMeta, ComponentMeta } from "./types";

/** 属性的类型文本（枚举优先展开为字面量联合） */
function toTypeText(item: AttributeMeta): string {
  if (item.kind === "enum" && item.enumValues?.length) {
    return item.enumValues.map(value => `'${value}'`).join(" | ");
  }
  switch (item.kind) {
    case "boolean":
      return "boolean";
    case "number":
      return "number";
    case "string":
      return "string";
    default:
      return "unknown";
  }
}

/** 压平换行并转义落单的反引号，避免破坏 markdown 结构 */
function mdText(text: string): string {
  const flat = text.replace(/\s*\r?\n\s*/g, " ").trim();
  const count = (flat.match(/`/g) ?? []).length;
  return count % 2 === 0 ? flat : flat.replace(/`/g, "\\`");
}

/** 属性文档：说明 + 类型 + 默认值 + 可选值 */
function buildDoc(item: AttributeMeta): string {
  const lines: string[] = [];
  if (item.description) lines.push(mdText(item.description));
  lines.push(`类型：\`${toTypeText(item)}\``);
  if (item.defaultValue !== undefined) lines.push(`默认值：\`${item.defaultValue}\``);
  if (item.enumValues?.length) {
    lines.push(`可选值：${item.enumValues.map(value => `\`${value}\``).join(" ")}`);
  }
  if (item.a11y) {
    lines.push(`无障碍：同步到 \`${item.a11y.ariaAttr}\``);
  }
  return lines.join("\n");
}

/** 组件文档：属性 + 方法 + 事件 + 插槽 + CSS 变量 + CSS Part */
export function buildComponentDoc(
  component: ComponentMeta,
  level = 4
): string {
  const heading = `${"#".repeat(level)} `;
  const lines: string[] = [];
  if (component.summary) lines.push(mdText(component.summary));

  // 组件元信息：稳定性、起始版本、依赖标签
  const meta: string[] = [];
  if (component.status) meta.push(`\`${component.status}\``);
  if (component.since) meta.push(`自 ${component.since}`);
  if (component.dependencies.length) {
    meta.push(
      `依赖 ${component.dependencies.map(item => `\`${item}\``).join(" ")}`
    );
  }
  if (meta.length) lines.push("", meta.join(" · "));

  // 属性放在最前
  if (component.attributes.length) {
    lines.push("", `${heading}属性`);
    for (const attribute of component.attributes) {
      const value =
        attribute.defaultValue !== undefined
          ? ` = ${attribute.defaultValue}`
          : "";
      const note = attribute.description
        ? ` — ${mdText(attribute.description)}`
        : "";
      lines.push(
        `- \`${attribute.attributeName}: ${toTypeText(attribute)}${value}\`${note}`
      );
    }
  }

  if (component.methods.length) {
    lines.push("", `${heading}方法`);
    for (const method of component.methods) {
      const note = method.description ? ` — ${mdText(method.description)}` : "";
      lines.push(
        `- \`${method.name}(${method.params}): ${method.returnType}\`${note}`
      );
    }
  }

  if (component.events.length) {
    lines.push("", `${heading}事件`);
    for (const event of component.events) {
      lines.push(
        `- \`${event.name}\` — ${event.description ? mdText(event.description) : "—"}`
      );
    }
  }

  if (component.slots.length) {
    lines.push("", `${heading}插槽`);
    for (const slot of component.slots) {
      const desc = slot.description ? mdText(slot.description) : "—";
      lines.push(`- \`${slot.name || "(default)"}\` — ${desc}`);
    }
  }

  if (component.cssProperties.length) {
    lines.push("", `${heading}CSS 变量`);
    for (const item of component.cssProperties) {
      const def = item.defaultValue ? ` (默认 ${item.defaultValue})` : "";
      const desc = item.description ? mdText(item.description) : "—";
      lines.push(`- \`${item.name}\`${def} — ${desc}`);
    }
  }

  if (component.cssParts.length) {
    lines.push("", `${heading}CSS Part`);
    for (const item of component.cssParts) {
      const desc = item.description ? mdText(item.description) : "—";
      lines.push(`- \`${item.name}\` — ${desc}`);
    }
  }

  return lines.join("\n");
}

/** 生成 Custom Elements Manifest（CEM 1.0） */
export function emitCustomElementsManifest(
  components: ComponentMeta[]
): unknown {
  return {
    schemaVersion: "1.0.0",
    modules: components.map(component => ({
      kind: "javascript-module",
      path: component.modulePath,
      declarations: [
        {
          kind: "class",
          name: component.className,
          tagName: component.tagName,
          customElement: true,
          description: component.summary,
          attributes: component.attributes.map(attribute => ({
            name: attribute.attributeName,
            fieldName: attribute.name,
            type: { text: toTypeText(attribute) },
            ...(attribute.defaultValue !== undefined
              ? { default: attribute.defaultValue }
              : {}),
            description: attribute.description || undefined,
          })),
          members: [
            ...component.attributes.map(attribute => ({
              kind: "field",
              name: attribute.name,
              type: { text: toTypeText(attribute) },
              ...(attribute.defaultValue !== undefined
                ? { default: attribute.defaultValue }
                : {}),
              description: attribute.description || undefined,
            })),
            ...component.properties.map(property => ({
              kind: "field",
              name: property.name,
              type: {
                text:
                  property.kind === "enum" && property.enumValues?.length
                    ? property.enumValues.map(v => `'${v}'`).join(" | ")
                    : property.kind === "unknown"
                      ? "unknown"
                      : property.kind,
              },
              ...(property.defaultValue !== undefined
                ? { default: property.defaultValue }
                : {}),
              description: property.description || undefined,
            })),
            ...component.methods.map(method => ({
              kind: "method",
              name: method.name,
              description: method.description || undefined,
              return: { type: { text: method.returnType } },
              ...(method.parameters.length
                ? {
                    parameters: method.parameters.map(param => ({
                      name: param.name,
                      type: { text: param.type },
                      ...(param.optional ? { optional: true } : {}),
                      ...(param.defaultValue
                        ? { default: param.defaultValue }
                        : {}),
                    })),
                  }
                : {}),
            })),
          ],
          events: component.events.map(event => ({
            name: event.name,
            type: {
              text: event.detailType
                ? `CustomEvent<${event.detailType}>`
                : "CustomEvent",
            },
            description: event.description || undefined,
          })),
          slots: component.slots.map(slot => ({
            name: slot.name,
            description: slot.description || undefined,
          })),
          cssProperties: component.cssProperties.map(item => ({
            name: item.name,
            ...(item.defaultValue ? { default: item.defaultValue } : {}),
            description: item.description || undefined,
          })),
          cssParts: component.cssParts.map(item => ({
            name: item.name,
            description: item.description || undefined,
          })),
        },
      ],
    })),
  };
}

/** 生成 VS Code HTML custom data（供 html.customData 使用） */
export function emitVscodeCustomData(components: ComponentMeta[]): unknown {
  return {
    $schema:
      "https://raw.githubusercontent.com/microsoft/vscode-html-languageservice/main/docs/customData.schema.json",
    version: 1.1,
    tags: components.map(component => {
      const tag: Record<string, unknown> = {
        name: component.tagName,
        description: buildComponentDoc(component),
      };
      if (component.attributes.length) {
        tag.attributes = component.attributes.map(attribute => {
          const entry: Record<string, unknown> = {
            name: attribute.attributeName,
            description: buildDoc(attribute),
          };
          // 布尔属性在 HTML 中以存在性表达，无需值提示
          if (attribute.kind === "enum" && attribute.enumValues?.length) {
            entry.values = attribute.enumValues
              .filter(value => value !== "")
              .map(value => ({ name: value }));
          }
          return entry;
        });
      }
      return tag;
    }),
  };
}

/** 生成 JetBrains web-types（WebStorm / IDEA 自动读取） */
export function emitWebTypes(
  components: ComponentMeta[],
  meta: { name: string; version: string; description: string }
): unknown {
  return {
    $schema: "https://json.schemastore.org/web-types",
    name: meta.name,
    version: meta.version,
    description: meta.description,
    contributions: {
      html: {
        elements: components.map(component => ({
          name: component.tagName,
          description: buildComponentDoc(component),
          ...(component.attributes.length
            ? {
                attributes: component.attributes.map(attribute => ({
                  name: attribute.attributeName,
                  description: buildDoc(attribute),
                  value: {
                    kind: "plain",
                    type: attribute.kind === "boolean" ? "boolean" : "string",
                  },
                })),
              }
            : {}),
        })),
      },
    },
  };
}
