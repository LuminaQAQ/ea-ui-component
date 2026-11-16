import baseStyles from "@easy-component-ui/themes/base";
import { setBaseStyles } from "@easy-component-ui/core";

/**
 * 组件样式基线：语义变量层由 components 替用户决定
 *
 * 每个组件入口都会引入本模块，保证按需引入单个组件时也能拿到变量；
 * `setBaseStyles` 幂等，多次执行结果一致
 */
setBaseStyles(baseStyles);
