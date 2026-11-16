import baseCss from "../styles/base.scss?inline";

/**
 * 基础样式：语义变量层（:host, :root）+ Shadow 内元素基线（:host）
 * 交给 `setBaseStyles` 注入 Shadow，或用作 `base.css` 的文档级等价物
 */
export const baseStyles: string = baseCss;

export default baseStyles;
