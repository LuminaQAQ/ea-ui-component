// @ts-nocheck
export class EaMessage {
    constructor() {
    }

    /**
     * 处理字符串型消息
     * @param {Element} el EaMessage元素
     * @param {String} tip 文本
     */
    handleStringMsg(el, tip) {
        el.text = tip;
        el.type = "info";
        el.hasClose = false;
    }

    /**
     * 处理对象型消息
     * @param {Element} el EaMessage元素
     * @param {String} tips 文本
     * @param {*} attrs 属性列表
     */
    handleObjectMsg(el, tips, attrs) {
        for (const k in tips) {
            if (attrs.includes(k)) el[k] = tips[k];
        }

        if (!Object.keys(tips).includes("type")) el.type = "info";
    }

    /**
     * 处理消失的时长
     * @param {*} el EaMessage元素
     * @param {*} duration 时间间隔
     */
    handleDuration(el, duration = 3) {
        if (duration === 0) return;

        let timer = setTimeout(() => {
            el.show = false;

            clearTimeout(timer);
            timer = null;
        }, duration * 1000 + 40);
    }

    open(tip) {
        const eaMessage = document.createElement('ea-message');
        document.body.appendChild(eaMessage);

        if (typeof tip === 'string') {
            this.handleStringMsg(eaMessage, tip);
            this.handleDuration(eaMessage);
        } else if (typeof tip === 'object') {
            this.handleObjectMsg(eaMessage, tip, eaMessage.attrs);
            this.handleDuration(eaMessage, tip.duration);
        }

        setTimeout(() => {
            eaMessage.show = true;
        }, 20);

        return {
            onClose(fn) {
                if (typeof fn === 'function') eaMessage.addEventListener('click', function () {
                    fn();
                })
            }
        }
    }
}