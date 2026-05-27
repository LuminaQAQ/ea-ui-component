/**
 * 延迟执行函数
 * @param fn 要执行的函数
 * @param time 延迟时间（毫秒），默认为 0
 * @returns 定时器 ID
 */
export const timeout = (fn: () => void, time: number = 0): number => {
  let timer: number | null = window.setTimeout(() => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
    fn();
  }, time);

  return timer;
};
