/**
 * SCSS 文件以 ?inline 后缀导入时，返回字符串
 */
declare module "*.scss?inline" {
  const content: string;
  export default content;
}

/**
 * CSS 文件以 ?inline 后缀导入时，返回字符串
 */
declare module "*.css?inline" {
  const content: string;
  export default content;
}

/**
 * SCSS 文件 side-effect 导入
 */
declare module "*.scss";

/**
 * CSS 文件 side-effect 导入
 */
declare module "*.css";
