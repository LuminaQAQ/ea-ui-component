// @ts-nocheck
import Base from '../Base';
import { createElement } from '../../utils/createElement.js';

const stylesheet = `
@import url('/ea_ui_component/icon/index.css');
`;

export class EaMessageElement extends Base {
    #wrap;

    #icon;

    #textContent;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        const wrap = document.createElement('div');
        wrap.className = 'ea-message_wrap';

        const icon = createElement('i', 'ea-icon-wrap');
        wrap.appendChild(icon);

        const textContent = createElement('div', 'ea-text-content');
        wrap.appendChild(textContent);

        this.#wrap = wrap;
        this.wrap = wrap;
        this.#icon = icon;
        this.#textContent = textContent;


        this.build(shadowRoot, stylesheet);
        this.shadowRoot.appendChild(wrap);
    }

    get attrs() {
        return ["show", "text", "icon", "type"];
    }

    get iconList() {
        return {
            "success": "icon-ok-circled",
            "error": "icon-cancel-circled",
            "warning": "icon-attention-alt",
            "info": "icon-info"
        };
    }

    // ------- show 提示框的显示状态 -------
    // #region
    get show() {
        return this.getAttrBoolean('show');
    }

    set show(value) {
        this.setAttribute('show', value);

        const eaMessageList = document.querySelectorAll('ea-message');

        if (value) {
            const length = eaMessageList.length - 1;
            const elementHeight = this.#wrap.getBoundingClientRect().height;
            let gap = length <= 0 ? 10 : (length + 1) * 10;

            this.#wrap.style.top = `${length * elementHeight + gap}px`;
            this.#wrap.style.opacity = 1;
        } else {
            const that = this;

            this.#wrap.style.top = `-100%`;
            this.#wrap.style.opacity = 0;

            let event = this.#wrap.addEventListener('transitionend', function () {
                this.removeEventListener('transitionend', event);
                that.remove();
            });
        }

    }
    // #endregion
    // ------- end -------

    // ------- text 提示框的文字 -------
    // #region
    get text() {
        return this.getAttribute('text');
    }

    set text(value) {
        this.setAttribute('text', value);

        this.#textContent.innerText = value;
    }
    // #endregion
    // ------- end -------

    // ------- type 提示框的类型 -------
    // #region
    get type() {
        return this.getAttribute('type') || "info";
    }

    set type(value) {
        this.setAttribute('type', value);

        this.#wrap.classList.add(`ea-message--${value}`);
        this.#icon.classList.add(`${this.iconList[value]}`);
    }
    // #endregion
    // ------- end -------

    init() {
        const that = this;
    }

    connectedCallback() {
        this.init();
    }

    disconnectedCallback() {
        const eaMessageList = document.querySelectorAll('ea-message');
        const length = eaMessageList.length;

        if (length > 0) {
            Array.from(eaMessageList).forEach((el, index) => {
                const elementHeight = el.wrap.getBoundingClientRect().height;
                el.wrap.style.top = `${index * elementHeight + (index * 10)}px`;
            });
        }
    }
}


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
    }

    /**
     * 处理消失的时长
     * @param {*} el EaMessage元素
     * @param {*} duration 时间间隔
     */
    handleDuration(el, duration = 30) {
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
    }
}