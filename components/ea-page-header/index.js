// @ts-nocheck
import Base from '../Base.js';
import '../ea-icon/index.js'
import { createSlotElement, createElement } from '../../utils/createElement.js';

import { stylesheet } from './src/style/stylesheet.js';

export class EaPageHeader extends Base {
    #wrap;

    #titleWrap;
    #contentWrap

    #titleSlot;
    #contentSlot;
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <div class='ea-page-header_wrap' part='container'>
                <div class='ea-page-header_title-wrap' part='title-wrap'>
                    <ea-icon class='ea-page-header_back-icon' part='back-icon' icon="icon-angle-left"></ea-icon>
                    <slot name="title"></slot>
                </div>
                <div class='ea-page-header_divider' part='divider'>|</div>
                <div class='ea-page-header_content-wrap' part='content-wrap'>
                    <slot name="content"></slot>
                </div>
            </div>
        `;

        this.#wrap = shadowRoot.querySelector('.ea-page-header_wrap');
        this.#titleWrap = shadowRoot.querySelector('.ea-page-header_title-wrap');
        this.#titleSlot = shadowRoot.querySelector('slot[name="title"]');
        this.#contentWrap = shadowRoot.querySelector('.ea-page-header_content-wrap');
        this.#contentSlot = shadowRoot.querySelector('slot[name="content"]');

        this.build(shadowRoot, stylesheet);
    }

    // ------- title 返回区域的内容 -------
    // #region
    get title() {
        return this.getAttribute('title') || '';
    }

    set title(value) {
        if (value) {
            this.setAttribute('title', value);
            this.#titleSlot.innerText = value;
        } else {
            this.setAttribute('title', '返回');
            this.#titleSlot.innerText = '返回';
        }
    }
    // #endregion
    // ------- end -------

    // ------- content 页面标题 -------
    // #region
    get content() {
        return this.getAttribute('content') || '';
    }

    set content(value) {
        if (value) {
            this.setAttribute('content', value);
            this.#contentSlot.innerText = value;
        } else {
            this.setAttribute('content', '');
            this.#contentSlot.innerText = '';
        }
    }
    // #endregion
    // ------- end -------

    connectedCallback() {
        this.title = this.title;

        this.content = this.content;

        this.#titleWrap.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('back'));
        });
    }
}

if (!customElements.get('ea-page-header')) {
    customElements.define('ea-page-header', EaPageHeader);
}