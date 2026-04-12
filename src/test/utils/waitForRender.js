/**
 * 等待组件渲染完成
 * @param {number} ms - 等待时间（毫秒），默认 100ms
 * @returns {Promise<void>}
 */
export function waitForRender(ms = 100) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
