/** 属性信息 */
export interface PropInfo {
  /** 属性名（驼峰命名） */
  name: string;
  /** 属性类型描述（如 "String"、"Boolean"、"Number"、"Enum"） */
  type: string;
  /** 默认值 */
  default?: string;
  /** 是否必填 */
  required: boolean;
  /** 属性描述 */
  description: string;
  /** 是否为 @attribute（映射 HTML attribute） */
  isAttribute: boolean;
  /** a11y 配置 */
  a11y?: {
    ariaAttr: string;
    target?: string;
  };
  /** Enum 类型的可选值列表 */
  enumValues?: string[];
}

/** 事件信息 */
export interface EventInfo {
  /** 事件名 */
  name: string;
  /** 事件参数/Detail 类型描述 */
  params: string;
  /** 事件描述 */
  description: string;
  /** 是否为自定义事件类（对外公开） */
  isCustomEventClass: boolean;
  /** 自定义事件类名 */
  className?: string;
}

/** 插槽信息 */
export interface SlotInfo {
  /** 插槽名（默认插槽为 "default"） */
  name: string;
  /** 插槽描述 */
  description: string;
}

/** CSS 自定义属性信息 */
export interface CSSVarInfo {
  /** 变量名（如 "--ea-alert-padding"） */
  name: string;
  /** 默认值 */
  default?: string;
  /** 描述 */
  description: string;
}

/** CSS Part 信息 */
export interface CSSPartInfo {
  /** Part 名 */
  name: string;
  /** 描述 */
  description: string;
}

/** 子组件信息 */
export interface SubComponentInfo {
  /** 子组件标签名 */
  name: string;
  /** 子组件描述 */
  description: string;
  /** 子组件源码路径（相对于 src/components/） */
  sourcePath: string;
}

/** 组件分类 */
export type ComponentCategory =
  | "basic"
  | "form"
  | "data-display"
  | "navigation"
  | "feedback"
  | "foundation";

/** 组件状态 */
export type ComponentStatus = "stable" | "experimental" | "deprecated";

/** 组件元数据 */
export interface ComponentMeta {
  /** 组件标签名（如 "ea-alert"） */
  name: string;
  /** 显示名称（中文，如 "警告提示"） */
  displayName: string;
  /** 组件分类 */
  category: ComponentCategory;
  /** 组件状态 */
  status: ComponentStatus;
  /** 首次引入版本 */
  since: string;
  /** 组件描述 */
  description: string;
  /** 源码路径（相对于项目根目录） */
  sourcePath: string;
  /** 属性列表 */
  props: PropInfo[];
  /** 事件列表 */
  events: EventInfo[];
  /** 插槽列表 */
  slots: SlotInfo[];
  /** CSS 自定义属性列表 */
  cssVars: CSSVarInfo[];
  /** CSS Part 列表 */
  cssParts: CSSPartInfo[];
  /** 子组件列表 */
  subComponents: SubComponentInfo[];
  /** 依赖的组件标签名列表 */
  dependencies: string[];
  /** 预提取的使用示例（构建时从 docs 中提取，运行时不再依赖 docs 目录） */
  examples?: ComponentExample[];
  /** 解析错误信息 */
  parseError?: string;
}

/** 组件列表项（轻量） */
export interface ComponentListItem {
  name: string;
  displayName: string;
  category: ComponentCategory;
  status: ComponentStatus;
  description: string;
}

/** 示例代码信息 */
export interface ComponentExample {
  /** 示例标题 */
  title: string;
  /** 示例描述 */
  description: string;
  /** 示例代码 */
  code: string;
  /** 示例类型 */
  type: "basic" | "advanced";
}
