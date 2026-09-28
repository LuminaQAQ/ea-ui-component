/**
 * 等待组件渲染完成
 * 使用 requestAnimationFrame 检测渲染完成，超时兜底
 * 在真实浏览器中，双 rAF 跨越真实帧边界后提前 resolve；
 * 在 jsdom 等测试环境中，rAF 不对应真实渲染，回退到超时等待
 * @param {number} timeout - 超时时间（毫秒），默认 100ms；传 0 时仅等待一帧
 * @returns {Promise<void>}
 */
const isJSDOM =
  typeof navigator !== "undefined" && /jsdom/i.test(navigator.userAgent);

export function waitForRender(timeout = 100) {
  return new Promise(resolve => {
    if (timeout === 0) {
      requestAnimationFrame(() => resolve());
    } else if (isJSDOM) {
      setTimeout(resolve, timeout);
    } else {
      let resolved = false;
      const timer = setTimeout(() => {
        if (!resolved) {
          resolved = true;
          resolve();
        }
      }, timeout);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!resolved) {
            resolved = true;
            clearTimeout(timer);
            resolve();
          }
        });
      });
    }
  });
}
