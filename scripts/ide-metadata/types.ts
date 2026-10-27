/**
 * IDE 元数据统一模型
 *
 * 三种产物（Vue 类型增强 / CEM / web-types / VS Code custom data）共用同一份模型，
 * 保证各框架看到的组件信息永远一致。
 */

/** 属性类型分类 */
export type ValueKind = "boolean" | "number" | "string" | "enum" | "unknown";

/** 组件属性（@attribute，映射到 HTML attribute） */
export interface AttributeMeta {
  /** 源码属性名（驼峰），如 showIcon */
  name: string;
  /** HTML attribute 名（连字符），如 show-icon */
  attributeName: string;
  /** 类型分类 */
  kind: ValueKind;
  /** 枚举可选值（kind 为 enum 时存在） */
  enumValues?: string[];
  /** 默认值文本 */
  defaultValue?: string;
  /** 属性说明（来自 JSDoc 或类型信息补全） */
  description: string;
  /** 无障碍映射 */
  a11y?: {
    ariaAttr: string;
    target?: string;
  };
}

/** 纯 JS 属性（@property，不映射 HTML attribute） */
export interface PropertyMeta {
  /** 属性名 */
  name: string;
  /** 类型分类 */
  kind: ValueKind;
  /** 枚举可选值 */
  enumValues?: string[];
  /** 默认值文本 */
  defaultValue?: string;
  /** 属性说明 */
  description: string;
}

/** 方法参数 */
export interface MethodParameter {
  name: string;
  type: string;
  optional: boolean;
  defaultValue?: string;
}

/** 组件公开方法 */
export interface MethodMeta {
  /** 方法名 */
  name: string;
  /** 参数列表文本，如 `scope: "shadow" | "light" = "shadow"` */
  params: string;
  /** 结构化参数，供 CEM 使用 */
  parameters: MethodParameter[];
  /** 返回类型文本 */
  returnType: string;
  /** 方法说明 */
  description: string;
}

/** 事件 */
export interface EventMeta {
  /** 事件名，如 ea-close */
  name: string;
  /** 事件说明 */
  description: string;
  /** 独立事件类名，如 EaAlertCloseEvent（未单独定义类时为空） */
  className?: string;
  /** detail 类型文本，取自事件类的 detail 属性 */
  detailType?: string;
}

/** 插槽 */
export interface SlotMeta {
  /** 插槽名，默认插槽为空字符串 */
  name: string;
  /** 插槽说明 */
  description: string;
}

/** CSS 变量 / CSS Part */
export interface CssMeta {
  name: string;
  description: string;
  /** CSS 变量默认值 */
  defaultValue?: string;
}

/** 单个组件（一个自定义元素标签）的完整元数据 */
export interface ComponentMeta {
  /** 标签名，如 ea-button */
  tagName: string;
  /** 类名，如 EaButton */
  className: string;
  /** 组件说明（JSDoc @summary） */
  summary: string;
  /** 稳定性状态（@status） */
  status: string;
  /** 起始版本（@since） */
  since: string;
  /** 相对 dist/components 的产物文件路径，如 components/ea-button.js */
  modulePath: string;
  /** 相对组件源码根目录的文件路径，如 ea-button/components/ea-button/index.ts */
  sourceFile: string;
  /** 依赖的其他标签（@dependency） */
  dependencies: string[];
  attributes: AttributeMeta[];
  properties: PropertyMeta[];
  methods: MethodMeta[];
  events: EventMeta[];
  slots: SlotMeta[];
  cssProperties: CssMeta[];
  cssParts: CssMeta[];
}

/** 扫描结果汇总 */
export interface ScanResult {
  components: ComponentMeta[];
  /** 扫描过程中遇到的问题，便于构建时提示 */
  warnings: string[];
}
