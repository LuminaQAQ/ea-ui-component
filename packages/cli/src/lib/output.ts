import pc from "picocolors";

/**
 * CLI 输出的单一出口：展示与提示内容统一由此发出。
 *
 * - 每个函数绑定一个色彩级别与一个输出流：info / success / warn / error 写 stdout，
 *   fail / dbg 写 stderr。其中 error 报告命令发现的违规（与其余结果同在 stdout），
 *   fail 报告程序级异常。
 * - 前缀符号（✓ / ⚠ / ✗）由调用方保留在消息文本内，此处只按级别上色、不追加符号。
 * - picocolors 依 TTY 与 NO_COLOR 自动决定是否上色，非彩色环境下原样返回。
 * - 仅负责输出，不控制流程、不缓冲、不退出进程（退出码交由调用点处理）。
 */

/** picocolors 透传别名：供多行卡片（如生成预览）在拼装时对符号与关键字段就地着色 */
export const c = pc;

/** 普通输出：无色、落 stdout（列表项、指引、预组装多行块） */
export function info(msg: string): void {
  console.log(msg);
}

/** 成功反馈：绿、落 stdout */
export function success(msg: string): void {
  console.log(c.green(msg));
}

/** 警告：黄、落 stdout */
export function warn(msg: string): void {
  console.log(c.yellow(msg));
}

/** 命令发现的违规/错误行：红、落 stdout（与其余命令输出同流，不进 stderr） */
export function error(msg: string): void {
  console.log(c.red(msg));
}

/** 程序级抛出/坏用法：红、落 stderr（退出码由调用点处理） */
export function fail(msg: string): void {
  console.error(c.red(msg));
}

/** 调试输出：当前为空实现，不产生任何输出 */
export function dbg(_msg: string): void {
  // 保留函数签名与调用点，暂不输出内容
}
