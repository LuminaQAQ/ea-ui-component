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

/**
 * 解析组件源码中的装饰器信息
 */
export function parseDecorators(sourceFile: ts.SourceFile): DecoratorParseResult {
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
      const attrInfo = parseAttributeDecorator(member, sourceFile);
      if (attrInfo) {
        result.attributes.push(attrInfo);
        return;
      }

      // 解析 @property
      const propInfo = parsePropertyDecorator(member, sourceFile);
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
  sourceFile: ts.SourceFile
): PropInfo | null {
  const dec = findDecoratorByName(propNode, "attribute");
  if (!dec) return null;

  const options = extractDecoratorOptions(dec);
  const propName = propNode.name.getText(sourceFile);

  return {
    name: propName,
    type: extractTypeFromOptions(options),
    default: extractDefaultFromOptions(options, sourceFile),
    required: false,
    description: extractJSDocFromProperty(propNode),
    isAttribute: true,
    a11y: extractA11yFromOptions(options),
  };
}

/**
 * 解析 @property 装饰器
 */
function parsePropertyDecorator(
  propNode: ts.PropertyDeclaration,
  sourceFile: ts.SourceFile
): PropInfo | null {
  const dec = findDecoratorByName(propNode, "property");
  if (!dec) return null;

  const options = extractDecoratorOptions(dec);
  const propName = propNode.name.getText(sourceFile);

  // 跳过以 _ 开头的私有属性
  if (propName.startsWith("_")) return null;

  return {
    name: propName,
    type: extractTypeFromOptions(options),
    default: extractDefaultFromOptions(options, sourceFile),
    required: false,
    description: extractJSDocFromProperty(propNode),
    isAttribute: false,
    a11y: extractA11yFromOptions(options),
  };
}

// ===== 辅助函数 =====

/** 获取类的装饰器列表（兼容新旧 TS API） */
function getDecorators(node: ts.ClassDeclaration): ts.Decorator[] {
  return (node as any).decorators
    ? [...(node as any).decorators]
    : ts.canHaveDecorators(node)
      ? [...ts.getDecorators(node)!]
      : [];
}

/** 获取属性声明的装饰器列表 */
function getPropertyDecorators(node: ts.PropertyDeclaration): ts.Decorator[] {
  return (node as any).decorators
    ? [...(node as any).decorators]
    : ts.canHaveDecorators(node)
      ? [...ts.getDecorators(node)!]
      : [];
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

/** 从选项对象中提取 type 字段 */
function extractTypeFromOptions(
  options: ts.ObjectLiteralExpression | null
): string {
  if (!options) return "any";

  const typeProp = options.properties.find(
    (p) =>
      ts.isPropertyAssignment(p) &&
      ts.isIdentifier(p.name) &&
      p.name.text === "type"
  ) as ts.PropertyAssignment | undefined;

  if (!typeProp || !typeProp.initializer) return "any";

  const init = typeProp.initializer;

  // 直接引用：String, Boolean, Number, Date
  if (ts.isIdentifier(init)) {
    const name = init.text;
    if (["String", "Boolean", "Number", "Date", "Array", "Function", "Object", "RegExp"].includes(name)) {
      return name;
    }
    // Enum() 调用
    return "Enum";
  }

  // Enum(...) 调用
  if (ts.isCallExpression(init)) {
    if (ts.isIdentifier(init.expression) && init.expression.text === "Enum") {
      return "Enum";
    }
  }

  return "any";
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
