/**
 * @typedef {Object} EaMessageOptions
 * @property {string} message - 消息文字
 * @property {'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right'} placement - 消息出现的位置，可选值为 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right'
 * @property {'primary' | 'success' | 'warning' | 'info' | 'error'} type - 主题类型，可选值为 'primary' | 'success' | 'warning' | 'info' | 'error'
 * @property {Boolean} dangerouslyUseHTMLString - 是否将 message 属性作为 HTML 片段处理
 * @property {Boolean} show-close - 是否显示关闭按钮
 * @property {Number} duration - 显示时间，毫秒。设为 0 则不会自动关闭
 * @property {Function} onClose - 	关闭时的回调函数, 参数为被关闭的 message 实例
 * @property {Boolean} offset - 设置到视口边缘的距离（当位置为'top'时为顶部，当位置为'bottom'时为底部）
 * @property {Boolean} appendTo - 设置 message 的根元素，默认为 `document.body`
 */

import { timeout } from "@/utils/timeout";

class EaMessageInstance {
  #includeTypes = [
    "dangerouslyUseHTMLString",
    "message",
    "placement",
    "type",
    "showClose",
    "duration",
    "offset",
    "icon",
  ];

  /**
   * @param {EaMessageOptions} options
   */
  constructor(options) {
    /** @type {EaMessageOptions} */
    this.options = this.#includeTypes.reduce((acc, cur) => {
      if (options[cur]) acc[cur] = options[cur];

      return acc;
    }, {});
    this.options.placement = this.options.placement || "top";

    const el = this.#renderer(this.options);
    this.#appendToHandler(el, options.appendTo);
    this.#durationHandler(el, options.duration);
    this.#hideHandler(el, options.onClose);
    el.visible = true;
  }

  /**
   * 渲染消息实例
   * @param {EaMessageOptions} options
   * @return {HTMLElement}
   */
  #renderer = options => {
    const el = document.createElement("ea-message");

    if (options instanceof String) {
      el.message = options;
    } else if (options instanceof Object) {
      for (const option in options) {
        el[option] = options[option];
      }
    } else {
      console.warn(
        "[EaMessage] TypeError: options must be a string or an object."
      );
    }

    return el;
  };

  /**
   * 处理 duration 属性
   */
  #durationHandler = (el, duration = 3000) => {
    if (duration <= 0) return;

    timeout(() => {
      el.visible = false;
    }, duration);
  };

  /**
   * 处理 appendTo 属性
   */
  #appendToHandler = (el, appendTo) => {
    if (appendTo instanceof HTMLElement) {
      appendTo.appendChild(el);
    } else {
      const parent = document.querySelector(appendTo);
      parent ? parent.appendChild(el) : document.body.appendChild(el);
    }
  };

  /**
   * 处理 hide 属性
   */
  #hideHandler = (el, closeFn) => {
    el.addEventListener(
      "hidden",
      e => {
        closeFn?.(e);
        el.remove();
      },
      { once: true }
    );
  };
}

/**
 * 创建消息实例
 * @param {EaMessageOptions} options
 */
export const EaMessage = options => {
  new EaMessageInstance(options);
};

EaMessage.primary = message =>
  new EaMessageInstance({
    message,
    type: "primary",
  });

EaMessage.success = message =>
  new EaMessageInstance({
    message,
    type: "success",
  });

EaMessage.warning = message =>
  new EaMessageInstance({
    message,
    type: "warning",
  });

EaMessage.info = message =>
  new EaMessageInstance({
    message,
    type: "info",
  });

EaMessage.error = message =>
  new EaMessageInstance({
    message,
    type: "error",
  });
