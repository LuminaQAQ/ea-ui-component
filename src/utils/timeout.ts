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

/**
 * 在指定时间后添加过渡类名
 * @param container 目标元素
 * @param time 延迟时间（毫秒），默认为 300
 * @returns 定时器 ID
 */
export const withTransitionTimeOut = (
  container: HTMLElement,
  time: number = 300
): number => {
  let timer: number | null = window.setTimeout(() => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }

    container.classList.add("with-transition");
  }, time);

  return timer;
};
