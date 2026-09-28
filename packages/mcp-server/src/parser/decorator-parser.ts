import ts from "typescript";
import type { PropInfo } from "../types.js";

/** 装饰器解析结果 */
export interface DecoratorParseResult {
  /** 组件标签名（从 @CustomElement 提取） */
  tagName: string;
  /** @attribute 属性列表 */
  attributes: PropInfo[];
  /** @property 属性列表 */
  properties: PropInfo[];
}

/** 全局常量映射（如 VARIANT_TYPES），由调用方注入 */
export type GlobalConstantsMap = Record<string, string[]>;

/**
 * 解析组件源码中的装饰器信息
 */
export function parseDecorators(
  sourceFile: ts.SourceFile,
  globalConstants?: GlobalConstantsMap
): DecoratorParseResult {
  const result: DecoratorParseResult = {
    tagName: "",
    attributes: [],
    properties: [],
  };

  ts.forEachChild(sourceFile, (node) => {
    if (!ts.isClassDeclaration(node)) return;

    // 解析 @CustomElement
    result.tagName = parseCustomElementDecorator(node, sourceFile);

    // 遍历类成员
    ts.forEachChild(node, (member) => {
      if (!ts.isPropertyDeclaration(member)) return;

      // 解析 @attribute
      const attrInfo = parseAttributeDecorator(member, sourceFile, globalConstants);
      if (attrInfo) {
        result.attributes.push(attrInfo);
        return;
      }

      // 解析 @property
      const propInfo = parsePropertyDecorator(member, sourceFile, globalConstants);
      if (propInfo) {
        result.properties.push(propInfo);
      }
    });
  });

  return result;
}

/**
 * 解析 @CustomElement 装饰器，提取标签名
 */
function parseCustomElementDecorator(
  classNode: ts.ClassDeclaration,
  sourceFile: ts.SourceFile
): string {
  const decorators = getDecorators(classNode);
  for (const dec of decorators) {
    const expr = ts.isCallExpression(dec.expression)
      ? dec.expression
      : null;
    if (!expr) continue;

    const decoratorName = getDecoratorName(dec);
    if (decoratorName !== "CustomElement") continue;

    // 第一个参数是标签名
    const firstArg = expr.arguments[0];
    if (firstArg && ts.isStringLiteral(firstArg)) {
      return firstArg.text;
    }

    // 可能是 TAG_NAME 常量引用，尝试解析
    if (firstArg && ts.isIdentifier(firstArg)) {
      const constValue = findConstValue(sourceFile, firstArg.text);
      if (constValue) return constValue;
    }
  }

  return "";
}

/**
 * 解析 @attribute 装饰器
 */
function parseAttributeDecorator(
  propNode: ts.PropertyDeclaration,
  sourceFile: ts.SourceFile,
  globalConstants?: GlobalConstantsMap
): PropInfo | null {
  const dec = findDecoratorByName(propNode, "attribute");
  if (!dec) return null;

  const options = extractDecoratorOptions(dec);
  const propName = propNode.name.getText(sourceFile);
  const typeInfo = extractTypeFromOptions(options, sourceFile, globalConstants);

  return {
    name: propName,
    type: typeInfo.type,
    default: extractDefaultFromOptions(options, sourceFile),
    required: false,
    description: extractJSDocFromProperty(propNode),
    isAttribute: true,
    a11y: extractA11yFromOptions(options),
    enumValues: typeInfo.enumValues,
  };
}

/**
 * 解析 @property 装饰器
 */
function parsePropertyDecorator(
  propNode: ts.PropertyDeclaration,
  sourceFile: ts.SourceFile,
  globalConstants?: GlobalConstantsMap
): PropInfo | null {
  const dec = findDecoratorByName(propNode, "property");
  if (!dec) return null;

  const options = extractDecoratorOptions(dec);
  const propName = propNode.name.getText(sourceFile);

  // 跳过以 _ 开头的私有属性
  if (propName.startsWith("_")) return null;

  const typeInfo = extractTypeFromOptions(options, sourceFile, globalConstants);

  return {
    name: propName,
    type: typeInfo.type,
    default: extractDefaultFromOptions(options, sourceFile),
    required: false,
    description: extractJSDocFromProperty(propNode),
    isAttribute: false,
    a11y: extractA11yFromOptions(options),
    enumValues: typeInfo.enumValues,
  };
}

// ===== 辅助函数 =====

/** 获取类的装饰器列表（兼容新旧 TS API） */
function getDecorators(node: ts.ClassDeclaration): ts.Decorator[] {
  // 旧版 TS：decorators 属性直接存在于节点上
  if ((node as any).decorators) {
    return [...(node as any).decorators];
  }
  // 新版 TS 5.0+：通过 ts.getDecorators 获取
  if (typeof ts.getDecorators === "function") {
    const result = ts.getDecorators(node);
    if (result) return [...result];
  }
  return [];
}

/** 获取属性声明的装饰器列表 */
function getPropertyDecorators(node: ts.PropertyDeclaration): ts.Decorator[] {
  if ((node as any).decorators) {
    return [...(node as any).decorators];
  }
  if (typeof ts.getDecorators === "function") {
    const result = ts.getDecorators(node);
    if (result) return [...result];
  }
  return [];
}

/** 获取装饰器名称 */
function getDecoratorName(dec: ts.Decorator): string {
  const expr = dec.expression;
  if (ts.isIdentifier(expr)) return expr.text;
  if (ts.isCallExpression(expr) && ts.isIdentifier(expr.expression))
    return expr.expression.text;
  return "";
}

/** 按名称查找装饰器 */
function findDecoratorByName(
  node: ts.PropertyDeclaration,
  name: string
): ts.Decorator | null {
  const decorators = getPropertyDecorators(node);
  for (const dec of decorators) {
    if (getDecoratorName(dec) === name) return dec;
  }
  return null;
}

/** 提取装饰器的选项对象（第一个参数） */
function extractDecoratorOptions(
  dec: ts.Decorator
): ts.ObjectLiteralExpression | null {
  const expr = dec.expression;
  if (!ts.isCallExpression(expr)) return null;

  const firstArg = expr.arguments[0];
  if (firstArg && ts.isObjectLiteralExpression(firstArg)) {
    return firstArg;
  }
  return null;
}

/** 从选项对象中提取 type 字段和 enumValues */
function extractTypeFromOptions(
  options: ts.ObjectLiteralExpression | null,
  sourceFile: ts.SourceFile,
  globalConstants?: GlobalConstantsMap
): { type: string; enumValues?: string[] } {
  if (!options) return { type: "any" };

  const typeProp = options.properties.find(
    (p) =>
      ts.isPropertyAssignment(p) &&
      ts.isIdentifier(p.name) &&
      p.name.text === "type"
  ) as ts.PropertyAssignment | undefined;

  if (!typeProp || !typeProp.initializer) return { type: "any" };

  const init = typeProp.initializer;

  // 直接引用：String, Boolean, Number, Date, Array, Function, Object, RegExp
  if (ts.isIdentifier(init)) {
    const name = init.text;
    if (["String", "Boolean", "Number", "Date", "Array", "Function", "Object", "RegExp"].includes(name)) {
      return { type: name };
    }
    // 非 Enum 的标识符引用（如 VARIANT_TYPES 常量），尝试解析为数组
    const constArray = findConstArrayValue(sourceFile, name) ?? globalConstants?.[name];
    if (constArray) {
      return { type: "Enum", enumValues: constArray };
    }
    return { type: "Enum" };
  }

  // Enum(...) 调用
  if (ts.isCallExpression(init)) {
    if (ts.isIdentifier(init.expression) && init.expression.text === "Enum") {
      const firstArg = init.arguments[0];
      if (firstArg) {
        const values = extractArrayLiteral(firstArg, sourceFile, globalConstants);
        if (values && values.length > 0) return { type: "Enum", enumValues: values };
      }
      return { type: "Enum" };
    }
  }

  // 直接数组字面量（如 ["small", "medium", "large"] as const）
  if (ts.isArrayLiteralExpression(init) || ts.isAsExpression(init)) {
    let arrayNode: ts.Node = init;
    while (ts.isAsExpression(arrayNode)) {
      arrayNode = arrayNode.expression;
    }
    if (ts.isArrayLiteralExpression(arrayNode)) {
      const values = extractStringArrayFromLiteral(arrayNode, sourceFile, globalConstants);
      if (values.length > 0) return { type: "Enum", enumValues: values };
    }
  }

  return { type: "any" };
}

/** 从数组字面量或扩展表达式中提取字符串值 */
function extractArrayLiteral(
  node: ts.Node,
  sourceFile: ts.SourceFile,
  globalConstants?: GlobalConstantsMap
): string[] | null {
  // 直接数组字面量：["a", "b", "c"] 或 [...VARIANT_TYPES, "normal"]
  if (ts.isArrayLiteralExpression(node)) {
    return extractStringArrayFromLiteral(node, sourceFile, globalConstants);
  }

  // 标识符引用：VARIANT_TYPES
  if (ts.isIdentifier(node)) {
    return findConstArrayValue(sourceFile, node.text) ?? globalConstants?.[node.text] ?? null;
  }

  return null;
}

/** 从 ArrayLiteralExpression 中提取字符串元素（支持 SpreadElement 解析） */
function extractStringArrayFromLiteral(
  node: ts.ArrayLiteralExpression,
  sourceFile: ts.SourceFile,
  globalConstants?: GlobalConstantsMap
): string[] {
  const values: string[] = [];

  for (const elem of node.elements) {
    // 普通字符串元素："primary"
    if (ts.isStringLiteral(elem)) {
      values.push(elem.text);
    }
    // SpreadElement：...VARIANT_TYPES
    else if (ts.isSpreadElement(elem)) {
      const spreadExpr = elem.expression;
      if (ts.isIdentifier(spreadExpr)) {
        // 先在当前文件中查找，再查全局常量
        const constArray = findConstArrayValue(sourceFile, spreadExpr.text) ?? globalConstants?.[spreadExpr.text];
        if (constArray) {
          values.push(...constArray);
        }
      }
    }
  }

  return values;
}

/** 从选项对象中提取 default 字段 */
function extractDefaultFromOptions(
  options: ts.ObjectLiteralExpression | null,
  sourceFile: ts.SourceFile
): string | undefined {
  if (!options) return undefined;

  const defaultProp = options.properties.find(
    (p) =>
      ts.isPropertyAssignment(p) &&
      ts.isIdentifier(p.name) &&
      p.name.text === "default"
  ) as ts.PropertyAssignment | undefined;

  if (!defaultProp || !defaultProp.initializer) return undefined;

  return defaultProp.initializer.getText(sourceFile);
}

/** 从选项对象中提取 a11y 配置 */
function extractA11yFromOptions(
  options: ts.ObjectLiteralExpression | null
): { ariaAttr: string; target?: string } | undefined {
  if (!options) return undefined;

  const a11yProp = options.properties.find(
    (p) =>
      ts.isPropertyAssignment(p) &&
      ts.isIdentifier(p.name) &&
      p.name.text === "a11y"
  ) as ts.PropertyAssignment | undefined;

  if (!a11yProp || !a11yProp.initializer) return undefined;
  if (!ts.isObjectLiteralExpression(a11yProp.initializer)) return undefined;

  const a11yObj = a11yProp.initializer;

  const ariaAttrProp = a11yObj.properties.find(
    (p) =>
      ts.isPropertyAssignment(p) &&
      ts.isIdentifier(p.name) &&
      p.name.text === "ariaAttr"
  ) as ts.PropertyAssignment | undefined;

  if (!ariaAttrProp || !ts.isStringLiteral(ariaAttrProp.initializer))
    return undefined;

  const targetProp = a11yObj.properties.find(
    (p) =>
      ts.isPropertyAssignment(p) &&
      ts.isIdentifier(p.name) &&
      p.name.text === "target"
  ) as ts.PropertyAssignment | undefined;

  const result: { ariaAttr: string; target?: string } = {
    ariaAttr: ariaAttrProp.initializer.text,
  };

  if (targetProp && ts.isStringLiteral(targetProp.initializer)) {
    result.target = targetProp.initializer.text;
  }

  return result;
}

/** 提取属性声明的 JSDoc 注释 */
function extractJSDocFromProperty(
  node: ts.PropertyDeclaration
): string {
  const jsDocComments = (node as any).jsDoc as ts.JSDoc[] | undefined;
  if (!jsDocComments || jsDocComments.length === 0) return "";

  const comment = jsDocComments[0].comment;
  if (typeof comment === "string") return comment;
  if (Array.isArray(comment)) {
    return comment
      .map((c: any) => c.text ?? "")
      .join("")
      .trim();
  }
  return "";
}

/** 在源文件中查找 const 声明的字面量值 */
function findConstValue(sourceFile: ts.SourceFile, name: string): string | null {
  let value: string | null = null;

  ts.forEachChild(sourceFile, (node) => {
    if (
      ts.isVariableStatement(node) &&
      node.declarationList.flags & ts.NodeFlags.Const
    ) {
      for (const decl of node.declarationList.declarations) {
        if (
          ts.isIdentifier(decl.name) &&
          decl.name.text === name &&
          decl.initializer &&
          ts.isStringLiteral(decl.initializer)
        ) {
          value = decl.initializer.text;
        }
      }
    }
  });

  return value;
}

/** 在源文件中查找 const 声明的字符串数组值 */
function findConstArrayValue(sourceFile: ts.SourceFile, name: string): string[] | null {
  let value: string[] | null = null;

  ts.forEachChild(sourceFile, (node) => {
    if (value) return;
    if (
      ts.isVariableStatement(node) &&
      node.declarationList.flags & ts.NodeFlags.Const
    ) {
      for (const decl of node.declarationList.declarations) {
        if (value) break;
        if (
          ts.isIdentifier(decl.name) &&
          decl.name.text === name &&
          decl.initializer
        ) {
          let init: ts.Expression = decl.initializer;
          // 处理 as const
          while (ts.isAsExpression(init)) {
            init = init.expression;
          }
          if (ts.isArrayLiteralExpression(init)) {
            const items = extractStringArrayFromLiteral(init, sourceFile);
            if (items.length > 0) {
              value = items;
            }
          }
        }
      }
    }
  });

  return value;
}
