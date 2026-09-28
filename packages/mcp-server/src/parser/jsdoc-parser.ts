import ts from "typescript";
import type {
  SlotInfo,
  EventInfo,
  CSSVarInfo,
  CSSPartInfo,
  ComponentStatus,
} from "../types.js";

/** JSDoc 解析结果 */
export interface JSDocParseResult {
  summary: string;
  status: ComponentStatus;
  since: string;
  slots: SlotInfo[];
  events: EventInfo[];
  cssParts: CSSPartInfo[];
  cssVars: CSSVarInfo[];
  dependencies: string[];
}

/**
 * 解析组件类的 JSDoc 注释，提取结构化元信息
 */
export function parseJSDoc(sourceFile: ts.SourceFile): JSDocParseResult {
  const result: JSDocParseResult = {
    summary: "",
    status: "stable",
    since: "",
    slots: [],
    events: [],
    cssParts: [],
    cssVars: [],
    dependencies: [],
  };

  ts.forEachChild(sourceFile, (node) => {
    if (!ts.isClassDeclaration(node)) return;

    const jsDocComments = (node as any).jsDoc as ts.JSDoc[] | undefined;
    if (!jsDocComments || jsDocComments.length === 0) return;

    for (const jsDoc of jsDocComments) {
      const fullText = jsDoc.getText
        ? jsDoc.getText()
        : sourceFile.text.substring(jsDoc.pos, jsDoc.end);

      parseJSDocText(fullText, result);
    }
  });

  return result;
}

/**
 * 解析 JSDoc 文本，提取标签信息
 */
function parseJSDocText(text: string, result: JSDocParseResult): void {
  const lines = text.split("\n").map((l) => l.replace(/^\s*\*\s?/, "").trim());

  for (const line of lines) {
    // @summary
    const summaryMatch = line.match(/^@summary\s+(.+)$/);
    if (summaryMatch) {
      result.summary = summaryMatch[1];
      continue;
    }

    // @status
    const statusMatch = line.match(/^@status\s+(stable|experimental|deprecated)$/);
    if (statusMatch) {
      result.status = statusMatch[1] as ComponentStatus;
      continue;
    }

    // @since
    const sinceMatch = line.match(/^@since\s+(.+)$/);
    if (sinceMatch) {
      result.since = sinceMatch[1];
      continue;
    }

    // @slot name - description
    const slotMatch = line.match(/^@slot\s+(\S+)\s*-\s*(.+)$/);
    if (slotMatch) {
      result.slots.push({
        name: slotMatch[1],
        description: slotMatch[2].trim(),
      });
      continue;
    }

    // @event name - description
    const eventMatch = line.match(/^@event\s+(\S+)\s*-\s*(.+)$/);
    if (eventMatch) {
      const eventName = eventMatch[1];
      const eventDesc = eventMatch[2].trim();
      const detailMatch = eventDesc.match(/detail:\s*(\{[^}]+\})/);
      result.events.push({
        name: eventName,
        params: detailMatch ? detailMatch[1] : "",
        description: detailMatch
          ? eventDesc.replace(/,\s*detail:\s*\{[^}]+\}/, "").trim()
          : eventDesc,
        isCustomEventClass: true,
      });
      continue;
    }

    // @csspart name - description
    const cssPartMatch = line.match(/^@csspart\s+(\S+)\s*-\s*(.+)$/);
    if (cssPartMatch) {
      result.cssParts.push({
        name: cssPartMatch[1],
        description: cssPartMatch[2].trim(),
      });
      continue;
    }

    // @cssproperty --name - description
    const cssPropMatch = line.match(
      /^@cssproperty\s+(--[\w-]+)\s*-\s*(.+)$/
    );
    if (cssPropMatch) {
      result.cssVars.push({
        name: cssPropMatch[1],
        description: cssPropMatch[2].trim(),
      });
      continue;
    }

    // @dependency tag-name
    const depMatch = line.match(/^@dependency\s+(ea-[\w-]+)$/);
    if (depMatch) {
      result.dependencies.push(depMatch[1]);
      continue;
    }
  }
}
