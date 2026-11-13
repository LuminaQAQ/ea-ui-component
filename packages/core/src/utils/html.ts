import { reportWarnOnce } from "./diagnostics";

/** HTML 转义映射表 */
const ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** 模板里的可疑片段，出现即说明有未转义的动态内容 */
const SUSPICIOUS_TEMPLATE =
  /<script[\s>]|<iframe[\s>]|<object[\s>]|<embed[\s>]|\son[a-z]+\s*=|\bjavascript:/i;

/**
 * 转义动态值，供模板插值使用
 * @param value 任意值，`null` / `undefined` 视为空串
 * @returns 可安全插入 HTML 的字符串
 */
export const escapeHTML = (value: unknown): string =>
  value == null ? "" : String(value).replace(/[&<>"']/g, ch => ESCAPE_MAP[ch]);

/**
 * 把 HTML 字符串写入目标，全库唯一的 HTML 写入口
 * @param target 写入目标，空目标直接忽略
 * @param content HTML 字符串
 */
export const setHTML = (
  target: Element | ShadowRoot | null | undefined,
  content: string
): void => {
  if (!target) return;

  target.innerHTML = content;
};

/**
 * 在目标元素的指定位置插入 HTML，与 `setHTML` 共用同一信任契约
 * @param target 插入位置的参照元素，空目标直接忽略
 * @param content HTML 字符串
 * @param position 插入位置，默认插到末尾
 */
export const insertHTML = (
  target: Element | null | undefined,
  content: string,
  position: InsertPosition = "beforeend"
): void => {
  if (!target) return;

  target.insertAdjacentHTML(position, content);
};

/**
 * 声明模板为可信 HTML
 *
 * 不做运行期清洗：模板由组件作者编写，动态值必须用 `escapeHTML()` 转义后再插入
 * @param template 模板字符串
 * @returns 原样返回的模板
 */
export const html = (template: string): string => {
  if (SUSPICIOUS_TEMPLATE.test(template)) {
    reportWarnOnce(
      "html.unsafe-template",
      "模板中出现 script / iframe / 内联事件等片段，确认动态值已用 escapeHTML() 转义"
    );
  }

  return template;
};

export default html;
