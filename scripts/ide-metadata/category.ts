import type { ComponentMeta } from "./types";

/** 组件分类 */
export type ComponentCategory =
  | "basic"
  | "form"
  | "data-display"
  | "navigation"
  | "feedback"
  | "foundation";

/** 分类中文名 */
export const CATEGORY_LABELS: Record<ComponentCategory, string> = {
  basic: "基础",
  form: "表单",
  "data-display": "数据展示",
  navigation: "导航",
  feedback: "反馈",
  foundation: "布局与容器",
};

/** 按顶层组件目录名归档的组件分类 */
const CATEGORY_MAP: Record<string, ComponentCategory> = {
  "ea-button": "basic",
  "ea-link": "basic",
  "ea-icon": "basic",
  "ea-text": "basic",
  "ea-scrollbar": "basic",
  "ea-space": "basic",
  "ea-divider": "basic",

  "ea-input": "form",
  "ea-input-number": "form",
  "ea-select": "form",
  "ea-checkbox": "form",
  "ea-radio": "form",
  "ea-switch": "form",
  "ea-slider": "form",
  "ea-rate": "form",
  "ea-color-picker": "form",
  "ea-date-picker": "form",
  "ea-time-picker": "form",
  "ea-transfer": "form",
  "ea-upload": "form",

  "ea-table": "data-display",
  "ea-tag": "data-display",
  "ea-badge": "data-display",
  "ea-progress": "data-display",
  "ea-avatar": "data-display",
  "ea-descriptions": "data-display",
  "ea-statistic": "data-display",
  "ea-skeleton": "data-display",
  "ea-empty": "data-display",
  "ea-image": "data-display",
  "ea-image-preview": "data-display",
  "ea-tree": "data-display",
  "ea-calendar": "data-display",
  "ea-countdown": "data-display",

  "ea-menu": "navigation",
  "ea-tabs": "navigation",
  "ea-breadcrumb": "navigation",
  "ea-pagination": "navigation",
  "ea-steps": "navigation",
  "ea-dropdown": "navigation",
  "ea-page-header": "navigation",
  "ea-anchor": "navigation",

  "ea-alert": "feedback",
  "ea-dialog": "feedback",
  "ea-drawer": "feedback",
  "ea-message": "feedback",
  "ea-message-box": "feedback",
  "ea-notification": "feedback",
  "ea-popconfirm": "feedback",
  "ea-popover": "feedback",
  "ea-tooltip": "feedback",
  "ea-loading": "feedback",
  "ea-result": "feedback",
  "ea-tour": "feedback",

  "ea-layout": "foundation",
  "ea-container": "foundation",
  "ea-card": "foundation",
  "ea-carousel": "foundation",
  "ea-collapse": "foundation",
  "ea-timeline": "foundation",
  "ea-splitter": "foundation",
  "ea-segmented": "foundation",
  "ea-backtop": "foundation",
  "ea-infinite-scroll": "foundation",
  "ea-theme-toggle": "foundation",
  "ea-affix": "foundation",
  "ea-effects": "foundation",
  "ea-border-beam": "foundation",
  "ea-watermark": "foundation",
};

/** 组件源码路径的顶层目录名 */
export function topLevelOf(component: ComponentMeta): string {
  return component.sourceFile.split("/")[0] ?? component.tagName;
}

/** 推断组件分类 */
export function resolveCategory(component: ComponentMeta): ComponentCategory {
  return CATEGORY_MAP[topLevelOf(component)] ?? "basic";
}
