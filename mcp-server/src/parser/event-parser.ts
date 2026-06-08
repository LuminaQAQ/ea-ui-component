import ts from "typescript";
import fs from "node:fs";
import path from "node:path";
import type { EventInfo } from "../types.js";

/**
 * 解析组件的事件信息
 * 1. 扫描 events/ 子目录下的自定义事件类
 * 2. 扫描源码中的 this.emit() 调用
 */
export function parseEvents(
  componentDir: string,
  sourceFile: ts.SourceFile
): EventInfo[] {
  const events: EventInfo[] = [];
  const seenNames = new Set<string>();

  // 1. 解析 events/ 目录下的自定义事件类
  const customEvents = parseCustomEventClasses(componentDir);
  for (const evt of customEvents) {
    if (!seenNames.has(evt.name)) {
      seenNames.add(evt.name);
      events.push(evt);
    }
  }

  // 2. 解析 this.emit() 调用
  const emitEvents = parseEmitCalls(sourceFile);
  for (const evt of emitEvents) {
    if (!seenNames.has(evt.name)) {
      seenNames.add(evt.name);
      events.push(evt);
    }
  }

  return events;
}

/**
 * 扫描 events/ 子目录下的自定义事件类
 * 提取类名、事件名（super() 中的字符串）、Detail 接口字段
 */
function parseCustomEventClasses(componentDir: string): EventInfo[] {
  const eventsDir = path.join(componentDir, "events");
  const events: EventInfo[] = [];

  if (!fs.existsSync(eventsDir)) return events;

  const files = fs.readdirSync(eventsDir).filter((f) => f.endsWith(".ts"));

  for (const file of files) {
    const filePath = path.join(eventsDir, file);
    const content = fs.readFileSync(filePath, "utf-8");

    const sourceFile = ts.createSourceFile(
      filePath,
      content,
      ts.ScriptTarget.Latest,
      true
    );

    const eventInfo = parseEventClass(sourceFile, content);
    if (eventInfo) {
      events.push(eventInfo);
    }
  }

  return events;
}

/**
 * 解析单个事件类文件
 */
function parseEventClass(
  sourceFile: ts.SourceFile,
  content: string
): EventInfo | null {
  let className = "";
  let eventName = "";
  let detailFields = "";

  ts.forEachChild(sourceFile, (node) => {
    // 提取类名和事件名
    if (ts.isClassDeclaration(node) && node.name) {
      className = node.name.text;

      // 遍历构造函数，找 super("event-name", ...)
      ts.forEachChild(node, (member) => {
        if (!ts.isConstructorDeclaration(member)) return;

        const firstStmt = member.body?.statements[0];
        if (!firstStmt) return;

        // 查找 super() 调用
        const superCall = findSuperCall(member);
        if (superCall && superCall.arguments.length > 0) {
          const firstArg = superCall.arguments[0];
          if (ts.isStringLiteral(firstArg)) {
            eventName = firstArg.text;
          }
        }
      });
    }

    // 提取 Detail 接口字段
    if (ts.isInterfaceDeclaration(node)) {
      if (node.name.text.endsWith("EventDetail")) {
        const fields: string[] = [];
        for (const member of node.members) {
          if (ts.isPropertySignature(member) && member.name) {
            const name = member.name.getText(sourceFile);
            const type = member.type
              ? member.type.getText(sourceFile)
              : "any";
            fields.push(`${name}: ${type}`);
          }
        }
        detailFields = `{ ${fields.join(", ")} }`;
      }
    }
  });

  if (!eventName) return null;

  return {
    name: eventName,
    params: detailFields,
    description: "",
    isCustomEventClass: true,
    className,
  };
}

/**
 * 在构造函数中查找 super() 调用
 */
function findSuperCall(
  ctor: ts.ConstructorDeclaration
): ts.CallExpression | null {
  let result: ts.CallExpression | null = null;

  if (!ctor.body) return null;

  const visit = (node: ts.Node) => {
    if (
      ts.isCallExpression(node) &&
      node.expression.kind === ts.SyntaxKind.SuperKeyword
    ) {
      result = node;
      return;
    }
    ts.forEachChild(node, visit);
  };

  ts.forEachChild(ctor.body, visit);
  return result;
}

/**
 * 解析源码中的 this.emit() 调用
 */
function parseEmitCalls(sourceFile: ts.SourceFile): EventInfo[] {
  const events: EventInfo[] = [];
  const seenNames = new Set<string>();

  const visit = (node: ts.Node) => {
    if (
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression) &&
      node.expression.name.text === "emit"
    ) {
      // this.emit("event-name", ...)
      const firstArg = node.arguments[0];
      if (ts.isStringLiteral(firstArg)) {
        const eventName = firstArg.text;
        if (!seenNames.has(eventName)) {
          seenNames.add(eventName);
          events.push({
            name: eventName,
            params: "",
            description: "",
            isCustomEventClass: false,
          });
        }
      }
    }
    ts.forEachChild(node, visit);
  };

  ts.forEachChild(sourceFile, visit);
  return events;
}
