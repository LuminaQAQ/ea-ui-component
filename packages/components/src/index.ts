// ==================== 基类 ====================
export { default as EaBase, createBEM } from "@easy-component-ui/core/core/EaBase";

// ==================== 装饰器 ====================
export { attribute, CustomElement, listen, query } from "@easy-component-ui/core/decorator/index";

// ==================== 工具函数 ====================
export { html } from "@easy-component-ui/core/utils/html";
export { createBEM as createBem } from "@easy-component-ui/core/utils/bem";
export { timeout } from "@easy-component-ui/core/utils/timeout";

// ==================== 主题控制器 ====================
export {
  initTheme,
  setTheme,
  getCurrentTheme,
  toggleTheme,
} from "@easy-component-ui/themes/controller";
export type { ThemeMode, ThemeValue } from "@easy-component-ui/themes/controller";
