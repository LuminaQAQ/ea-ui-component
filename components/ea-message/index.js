// @ts-nocheck
import Base from '../Base.js';
import { createElement } from '../../utils/createElement.js';
import "../ea-icon/index.js"

import { EaMessage } from "./src/utils/MessageClass.js"

import { stylesheet } from './src/style/stylesheet.js';

export class EaMessageElement extends Base {
    #wrap;

    #icon;

    #textContent;

    #closeWrap;

    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <div class="ea-message_wrap" part="container">
                <ea-icon class="ea-icon-wrap" part="icon"></ea-icon>
                <div class="ea-text-content" part="content"></div>
                <ea-icon class="ea-close-icon" icon="icon-cancel"></ea-icon>
            </div>
        `;

        this.#wrap = shadowRoot.querySelector('.ea-message_wrap');
        this.wrap = this.#wrap;
        this.#icon = shadowRoot.querySelector('.ea-icon-wrap');
        this.#textContent = shadowRoot.querySelector('.ea-text-content');
        this.#closeWrap = shadowRoot.querySelector('.ea-close-icon');
        this.closeWrap = this.#closeWrap;

        this.build(shadowRoot, stylesheet);
    }

    get attrs() {
        return ["show", "text", "icon", "type", "showClose", "center"];
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
            this.#wrap.style.top = `-100%`;
            this.#wrap.style.opacity = 0;

            let event = this.#wrap.addEventListener('transitionend', () => {
                this.removeEventListener('transitionend', event);
                this.remove();
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
        if (!value) return;
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
        this.#icon.icon = this.iconList[value];
    }
    // #endregion
    // ------- end -------

    // ------- showClose 提示框的关闭按钮 -------
    // #region
    get showClose() {
        return this.getAttrBoolean('showClose') || false;
    }

    set showClose(value) {
        if (!value) return;

        this.setAttribute('showClose', value);

        this.#closeWrap.style.display = value ? "block" : "none";
    }
    // #endregion
    // ------- end -------

    // ------- center 提示框是否居中 -------
    // #region
    get center() {
        return this.getAttrBoolean('center') || false;
    }

    set center(value) {
        if (!value) return;

        this.setAttribute('center', value);

        this.#icon.style.marginLeft = value ? `auto` : `0`;
    }
    // #endregion
    // ------- end -------

    connectedCallback() {
        this.#closeWrap.addEventListener('click', () => {
            this.show = false;
        });
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

if (!customElements.get('ea-message')) {
    customElements.define('ea-message', EaMessageElement);
}

window.$message = new EaMessage();