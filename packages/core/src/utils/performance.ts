/**
 * @description 防抖：延迟 delay 毫秒执行回调，期间重复调用会重新计时
 * @param fn 要执行的回调
 * @param delay 延迟时间（毫秒），默认 300
 * @returns 防抖后的函数，附带 `cancel` 方法用于取消尚未执行的调用
 *
 * @example
 * ```ts
 * const onSearch = debounce((keyword: string) => {
 *   // ...
 * }, 300);
 * onSearch("ea");
 * onSearch.cancel();
 * ```
 */
export const debounce = <T extends (...args: any[]) => void>(
  fn: T,
  delay: number = 300
): ((...args: Parameters<T>) => void) & { cancel: () => void } => {
  let timer: number | null = null;

  const cancel = (): void => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  };

  const debounced = function (this: unknown, ...args: Parameters<T>): void {
    cancel();
    timer = window.setTimeout(() => {
      timer = null;
      fn.apply(this, args);
    }, delay);
  };

  return Object.assign(debounced, { cancel });
};

/**
 * @description 节流：首次调用立即执行，间隔内的重复调用合并为一次尾调用
 * @param fn 要执行的回调
 * @param wait 间隔时间（毫秒），默认 300
 * @returns 节流后的函数，附带 `cancel` 方法用于取消尚未执行的尾调用
 *
 * @example
 * ```ts
 * const onScroll = throttle(() => {
 *   // ...
 * }, 200);
 * onScroll();
 * onScroll.cancel();
 * ```
 */
export const throttle = <T extends (...args: any[]) => void>(
  fn: T,
  wait: number = 300
): ((...args: Parameters<T>) => void) & { cancel: () => void } => {
  const state: {
    timer: number | null;
    args: Parameters<T> | null;
    ctx: unknown;
  } = {
    timer: null,
    args: null,
    ctx: null,
  };

  const cancel = (): void => {
    if (state.timer !== null) {
      clearTimeout(state.timer);
      state.timer = null;
    }
    state.args = null;
  };

  const throttled = function (this: unknown, ...args: Parameters<T>): void {
    if (state.timer !== null) {
      state.args = args;
      state.ctx = this;
      return;
    }

    fn.apply(this, args);
    state.timer = window.setTimeout(() => {
      state.timer = null;
      if (state.args) {
        const pendingArgs = state.args;
        const pendingCtx = state.ctx;
        state.args = null;
        throttled.apply(pendingCtx, pendingArgs);
      }
    }, wait);
  };

  return Object.assign(throttled, { cancel });
};
