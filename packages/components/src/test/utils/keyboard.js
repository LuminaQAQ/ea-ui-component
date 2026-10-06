/**
 * 派发 keydown 事件，默认冒泡且可取消
 * @param {Element} target - 目标元素
 * @param {string} key - 按键名，如 "Enter"、"ArrowDown"
 * @param {KeyboardEventInit} init - 额外的事件初始化参数
 * @returns {KeyboardEvent} 派发的事件对象
 */
export function fireKeydown(target, key, init = {}) {
  const event = new KeyboardEvent("keydown", {
    key,
    bubbles: true,
    composed: true,
    cancelable: true,
    ...init,
  });
  target.dispatchEvent(event);
  return event;
}

/**
 * 派发 focusin / focusout 事件
 * @param {Element} target - 目标元素
 * @param {"focusin" | "focusout"} type - 事件类型
 * @returns {FocusEvent} 派发的事件对象
 */
export function fireFocusEvent(target, type) {
  const event = new FocusEvent(type, {
    bubbles: true,
    composed: true,
  });
  target.dispatchEvent(event);
  return event;
}
