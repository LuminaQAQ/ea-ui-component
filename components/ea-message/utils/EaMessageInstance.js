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

const includeTypes = ['message', 'placement', 'type', 'showClose', 'duration', 'offset'];

const appendToHandler = (el, appendTo) => {
    if (appendTo instanceof HTMLElement) {
        appendTo.appendChild(el);
    } else {
        const appendTo = document.querySelector(appendTo);
        appendTo ? appendTo.appendChild(el) : document.body.appendChild(el);
    }
}
const renderer = (options) => {
    const el = document.createElement('ea-message');

    if (options instanceof String) {
        el.message = options;
    } else if (options instanceof Object) {
        for (const option in options) {
            el[option] = options[option];
        }
    }

    return el;
}

/**
 * @param {EaMessageOptions} options
 */
const EaMessageInstance = (options) => {
    const messageOptions = includeTypes.reduce((acc, cur) => {
        if (options[cur]) acc[cur] = options[cur];

        return acc;
    }, {});
    const el = renderer(messageOptions);

    appendToHandler(el, options.appendTo);

    el.visible = true;
    if (options.duration > 0) {
        timeout(() => {
            el.visible = false;
        }, options.duration || 3000)
    }
    el.addEventListener('hidden', (e) => {
        options?.onClose?.(e);
        el.remove();
    }, { once: true })
}

export default EaMessageInstance;