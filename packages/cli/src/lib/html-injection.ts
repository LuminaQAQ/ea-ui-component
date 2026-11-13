import * as ts from "typescript";

import { parseSource } from "./source";

/** 一条 HTML 注入风险记录 */
export interface HtmlInjectionViolation {
  /** 行号，1 起 */
  line: number;
  /** 触发风险的插值表达式 */
  expression: string;
  /** 说明与修法 */
  message: string;
}

/** 豁免标记：出现在该行或上一行的注释里时跳过检查 */
const SAFE_COMMENT = "@ea-html-safe";

/** 内联转义或可信模板声明，直接视为安全 */
const SAFE_CALLEE = /^(escapeHTML|html)\(/;

/** 基类模板方法 */
const SAFE_TEMPLATE_METHOD = /^(this|super)\.html\(/;

/** 内部生成的选择器与文案，含自己创建的局部 bem 实例 */
const SAFE_INTERNAL = /^(?:\w*[bB]em\w*(?:\.[a-z]+)?|i18nManager\.t)\(/;

/** 内部渲染方法，其方法体在本次扫描中同样会被检查 */
const SAFE_RENDERER = /^this\._?(?:render|get|build|create)\w*\(/;

/** 回调式渲染，函数体由调用方传入（如虚拟滚动） */
const SAFE_RENDERER_NAME = /^(?:renderer|renderCallback)(?:\(|$)/;

/** 三元分支里已使用可信模板或绑定 */
const SAFE_SEGMENT = /\bhtml\(|\.bind\(/;

/** 内部渲染产物：以这些后缀结尾的局部变量或方法 */
const SAFE_ARTIFACT =
  /(?:Html|HTML|SVG|Template|Options|Buttons|Callbacks?|Renderer|Nodes)$/;

/** 固定的内部产物名 */
const SAFE_ARTIFACT_NAMES =
  /^(template|tpl|colgroup|thead|tfoot|defaultAvatar|errorAvatar)$/;

/** 布尔三元只会产出字面量属性的有无 */
const SAFE_BOOLEAN_TERNARY = /^[\w.$()!&\s]+ \? "[^"]*" : "[^"]*"$/;

/** 以字面量键查表后调用 */
const SAFE_LOOKUP_CALL = /\w+\[[^\]]+\]\??\.\(/;

/** 从已渲染 DOM 取内容再插回，同源不受外部输入影响 */
const SAFE_CLONE = /\.innerHTML\b/;

/** 已转义或内部数组生成 */
const SAFE_INLINE = /(?:escapeHTML\(|^Array\.from\()/;

/** 以字面量键查常量表 */
const SAFE_LOOKUP =
  /^(?:[A-Z][A-Z0-9_]*|itemOptions|controllerTypeStrategies)\[/;

/** 数组链式方法，其回调体会被展开后逐个检查 */
const CHAIN_METHODS = new Set(["join", "map", "filter", "flatMap"]);

/** 纯字面量 */
const SAFE_LITERAL =
  /^(\d+|true|false|null|undefined|"[^"]*"|'[^']*'|`[^`$]*`)$/;

/**
 * 判断一段插值表达式是否可安全写入 HTML
 * @param expression 表达式源码
 * @returns 是否安全
 */
export function isSafeInterpolation(expression: string): boolean {
  const text = expression.replace(/\s+/g, " ").trim();

  return (
    SAFE_LITERAL.test(text) ||
    SAFE_CALLEE.test(text) ||
    SAFE_TEMPLATE_METHOD.test(text) ||
    SAFE_INTERNAL.test(text) ||
    SAFE_RENDERER.test(text) ||
    SAFE_RENDERER_NAME.test(text) ||
    SAFE_SEGMENT.test(text) ||
    SAFE_ARTIFACT.test(text) ||
    SAFE_ARTIFACT_NAMES.test(text) ||
    SAFE_BOOLEAN_TERNARY.test(text) ||
    SAFE_LOOKUP_CALL.test(text) ||
    SAFE_CLONE.test(text) ||
    SAFE_INLINE.test(text) ||
    SAFE_LOOKUP.test(text)
  );
}

/** 收集模板与字符串拼接里的动态部分 */
function collectDynamic(node: ts.Node, out: ts.Node[]): void {
  if (ts.isTemplateExpression(node)) {
    node.templateSpans.forEach(span => out.push(span.expression));
    return;
  }

  if (
    ts.isStringLiteral(node) ||
    ts.isNoSubstitutionTemplateLiteral(node) ||
    ts.isNumericLiteral(node)
  ) {
    return;
  }

  if (
    ts.isBinaryExpression(node) &&
    node.operatorToken.kind === ts.SyntaxKind.PlusToken
  ) {
    collectDynamic(node.left, out);
    collectDynamic(node.right, out);
    return;
  }

  if (ts.isParenthesizedExpression(node)) {
    collectDynamic(node.expression, out);
    return;
  }

  if (
    ts.isCallExpression(node) &&
    ts.isPropertyAccessExpression(node.expression) &&
    CHAIN_METHODS.has(node.expression.name.text)
  ) {
    node.arguments.forEach(arg => collectDynamic(arg, out));

    const receiver = node.expression.expression;
    if (
      ts.isCallExpression(receiver) &&
      ts.isPropertyAccessExpression(receiver.expression) &&
      CHAIN_METHODS.has(receiver.expression.name.text)
    ) {
      collectDynamic(receiver, out);
    }
    return;
  }

  if (ts.isArrowFunction(node) || ts.isFunctionExpression(node)) {
    collectDynamic(node.body, out);
    return;
  }

  out.push(node);
}

/** 判断节点所在行或上一行是否有豁免标记 */
function isExempt(sf: ts.SourceFile, node: ts.Node): boolean {
  const line = sf.getLineAndCharacterOfPosition(node.getStart(sf)).line;
  const lines = sf.text.split("\n");

  return [lines[line], lines[line - 1]].some(
    text => !!text && text.includes(SAFE_COMMENT)
  );
}

/**
 * 扫描源码里的 HTML 注入风险
 *
 * 只检查两个写入上下文：`setHTML(...)` / `insertHTML(...)` 的内容参数与
 * `html(...)` 的参数；其余 `innerHTML` 直接赋值已被写入口收敛规则排除
 * @param src 源码
 * @param fileName 文件名，仅用于诊断
 * @returns 风险列表
 */
export function scanHtmlInjection(
  src: string,
  fileName = "source.ts"
): HtmlInjectionViolation[] {
  const sf = parseSource(src, fileName);
  const violations: HtmlInjectionViolation[] = [];

  const check = (nodes: ts.Node[]): void => {
    nodes.forEach(raw => {
      const wrapped =
        ts.isCallExpression(raw) &&
        ts.isIdentifier(raw.expression) &&
        raw.expression.text === "html";
      const node = wrapped ? raw.arguments[0] : raw;
      if (!node) return;

      const inline =
        ts.isTemplateExpression(node) ||
        (ts.isBinaryExpression(node) &&
          node.operatorToken.kind === ts.SyntaxKind.PlusToken);

      if (wrapped && !inline) return;

      const dynamic: ts.Node[] = [];
      collectDynamic(node, dynamic);

      dynamic.forEach(item => {
        const expression = item.getText(sf).replace(/\s+/g, " ").trim();

        if (isSafeInterpolation(expression) || isExempt(sf, item)) return;

        violations.push({
          line: sf.getLineAndCharacterOfPosition(item.getStart(sf)).line + 1,
          expression,
          message: `模板插值需用 escapeHTML() 转义或标注 ${SAFE_COMMENT}：${expression}`,
        });
      });
    });
  };

  const visit = (node: ts.Node): void => {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression)) {
      const name = node.expression.text;
      if (name === "setHTML" || name === "insertHTML") {
        check(node.arguments.slice(1, 2));
      }
      if (name === "html") {
        const arg = node.arguments[0];
        const inline =
          !!arg &&
          (ts.isTemplateExpression(arg) ||
            (ts.isBinaryExpression(arg) &&
              arg.operatorToken.kind === ts.SyntaxKind.PlusToken));
        if (inline) check([arg]);
      }
    }

    ts.forEachChild(node, visit);
  };

  visit(sf);

  return violations;
}
