import pc from "picocolors";

/**
 * info / success / warn / error 写 stdout，
 * fail / dbg 写 stderr。
 */

/** picocolors 透传别名：供多行卡片（如生成预览）在拼装时对符号与关键字段就地着色 */
export const c = pc;

/** 普通输出：无色 */
export function info(msg: string): void {
  console.log(msg);
}

/** 成功反馈：绿 */
export function success(msg: string): void {
  console.log(c.green(msg));
}

/** 警告：黄 */
export function warn(msg: string): void {
  console.log(c.yellow(msg));
}

/** 命令发现的违规/错误行：红 */
export function error(msg: string): void {
  console.log(c.red(msg));
}

/** 程序级抛出/坏用法：红 */
export function fail(msg: string): void {
  console.error(c.red(msg));
}

/** 调试输出：当前为空实现，不产生任何输出 */
export function dbg(_msg: string): void {
  // 保留函数签名与调用点，暂不输出内容
}
